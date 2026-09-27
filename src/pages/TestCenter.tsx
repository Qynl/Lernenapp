import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { allQuestions, subjects, subjectById, topicById } from '../data'
import { useStore, saveResult } from '../lib/storage'
import { answerMatch, cls, fmtDate, fmtTime, noteColor, noteFromPercent, pointsFromPercent, shuffle, uid } from '../lib/utils'
import { MD } from '../components/Markdownish'
import { Progress } from '../components/ui'
import type { Grade, Question } from '../types'

type Phase = 'setup' | 'running' | 'result'

export default function TestCenter() {
  const { store, set, addXp } = useStore()
  const [phase, setPhase] = useState<Phase>('setup')
  const [subject, setSubject] = useState<string>('alle')
  const [grade, setGrade] = useState<Grade | 'alle'>(store.profile.grade)
  const [count, setCount] = useState(12)
  const [timed, setTimed] = useState(true)
  const [abiOnly, setAbiOnly] = useState(false)

  const [questions, setQuestions] = useState<(Question & { topicId: string; subjectId: string; grade: Grade })[]>([])
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [idx, setIdx] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [result, setResult] = useState<{ points: number; max: number; note: number; pts15: number } | null>(null)
  const timer = useRef<number | null>(null)

  const available = useMemo(
    () =>
      allQuestions.filter((q) => {
        if (subject !== 'alle' && q.subjectId !== subject) return false
        if (grade !== 'alle' && q.grade !== grade) return false
        if (abiOnly && !topicById[q.topicId]?.abi) return false
        return true
      }),
    [subject, grade, abiOnly],
  )

  useEffect(() => {
    if (phase === 'running' && timed) {
      timer.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
      return () => {
        if (timer.current) window.clearInterval(timer.current)
      }
    }
  }, [phase, timed])

  function start() {
    const q = shuffle(available).slice(0, count)
    if (!q.length) return
    setQuestions(q)
    setAnswers({})
    setIdx(0)
    setSeconds(0)
    setResult(null)
    setPhase('running')
  }

  function evaluate() {
    let points = 0
    for (const q of questions) {
      const a = answers[q.id]
      if (a === undefined) continue
      if (q.type === 'mc' && a === q.answer) points++
      else if (q.type === 'truefalse' && a === q.answer) points++
      else if (q.type === 'input' && answerMatch(String(a), q.accept) === 'correct') points++
      else if (q.type === 'multi') {
        const arr = (a as number[]) ?? []
        if (arr.length === q.answers.length && q.answers.every((x) => arr.includes(x))) points++
      }
    }
    const max = questions.length
    const pct = max ? points / max : 0
    const note = noteFromPercent(pct)
    const pts15 = pointsFromPercent(pct)
    setResult({ points, max, note, pts15 })
    setPhase('result')
    addXp(points * 12, 'questions')
    saveResult(set, {
      id: uid('res'),
      date: Date.now(),
      subjectId: subject,
      grade,
      points,
      max,
      grade_note: note,
      seconds,
    })
  }

  /* ------------------------------- Setup ------------------------------- */
  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight">Test & Prüfungssimulation</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
            Stell dir eine Probe-Schulaufgabe zusammen: Fach, Jahrgangsstufe und Umfang wählen, dann geht es unter
            Zeitdruck los. Am Ende bekommst du eine Note nach bayerischem Schlüssel – in der Oberstufe zusätzlich
            Notenpunkte.
          </p>
        </header>

        <section className="card space-y-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Fach</label>
              <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="alle">Alle Fächer gemischt</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.emoji} {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Jahrgangsstufe</label>
              <select
                className="input"
                value={String(grade)}
                onChange={(e) => setGrade(e.target.value === 'alle' ? 'alle' : (Number(e.target.value) as Grade))}
              >
                <option value="alle">Alle Klassen</option>
                {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    {g}. Klasse
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Anzahl der Aufgaben: {count}</label>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={count}
              className="w-full accent-brand-600"
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2.5 text-sm font-medium">
              <input type="checkbox" className="h-4 w-4 accent-brand-600" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
              Zeit mitlaufen lassen
            </label>
            <label className="flex items-center gap-2.5 text-sm font-medium">
              <input type="checkbox" className="h-4 w-4 accent-brand-600" checked={abiOnly} onChange={(e) => setAbiOnly(e.target.checked)} />
              Nur abiturrelevante Themen
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-ink-100/70 p-4 dark:bg-ink-800/40">
            <div className="flex-1 text-xs text-ink-500">
              {available.length} passende Aufgaben im Pool
              {available.length < count && ' – es werden alle verfügbaren genommen.'}
            </div>
            <button className="btn-primary" onClick={start} disabled={!available.length}>
              ▶ Test starten
            </button>
          </div>
        </section>

        {store.results.length > 0 && (
          <section className="card overflow-hidden">
            <h2 className="border-b border-ink-200 px-5 py-3 text-sm font-bold dark:border-ink-800">Deine letzten Tests</h2>
            <ul className="divide-y divide-ink-200 text-sm dark:divide-ink-800">
              {store.results.slice(0, 8).map((r) => (
                <li key={r.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1">
                    <div className="font-semibold">
                      {r.subjectId === 'alle' ? 'Gemischt' : subjectById[r.subjectId]?.name} ·{' '}
                      {r.grade === 'mix' || r.grade === 'alle' ? 'alle Klassen' : `${r.grade}. Klasse`}
                    </div>
                    <div className="text-xs text-ink-400">
                      {fmtDate(r.date)} · {r.points}/{r.max} Punkte · {fmtTime(r.seconds)} min
                    </div>
                  </div>
                  <div className={cls('text-2xl font-extrabold', noteColor(r.grade_note))}>{r.grade_note}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  /* ------------------------------ Laufender Test ----------------------- */
  if (phase === 'running') {
    const q = questions[idx]
    const answered = Object.keys(answers).length
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="card sticky top-16 z-20 flex items-center gap-3 p-3">
          <span className="chip bg-ink-100 dark:bg-ink-800">
            {idx + 1} / {questions.length}
          </span>
          <Progress value={(answered / questions.length) * 100} className="flex-1" />
          {timed && <span className="font-mono text-sm font-bold">{fmtTime(seconds)}</span>}
          <button className="btn-primary !py-1.5 !px-3 text-xs" onClick={evaluate}>
            Abgeben
          </button>
        </div>

        <div className="card p-5">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-400">
            {subjectById[q.subjectId]?.name} · {q.grade}. Klasse
          </div>
          <h3 className="text-base font-semibold leading-6">
            <MD text={q.q} />
          </h3>

          <div className="mt-4 space-y-2">
            {q.type === 'mc' &&
              q.options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, [q.id]: i })}
                  className={pick(answers[q.id] === i)}
                >
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-current text-[11px] font-bold opacity-70">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <MD text={o} />
                </button>
              ))}
            {q.type === 'multi' &&
              q.options.map((o, i) => {
                const arr = (answers[q.id] as number[]) ?? []
                return (
                  <button
                    key={i}
                    onClick={() =>
                      setAnswers({ ...answers, [q.id]: arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i] })
                    }
                    className={pick(arr.includes(i))}
                  >
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 border-current text-[11px]">
                      {arr.includes(i) ? '✓' : ''}
                    </span>
                    <MD text={o} />
                  </button>
                )
              })}
            {q.type === 'truefalse' && (
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map((v) => (
                  <button key={String(v)} onClick={() => setAnswers({ ...answers, [q.id]: v })} className={pick(answers[q.id] === v)}>
                    <span className="mx-auto font-bold">{v ? '✓ Richtig' : '✗ Falsch'}</span>
                  </button>
                ))}
              </div>
            )}
            {q.type === 'input' && (
              <input
                className="input"
                placeholder="Antwort eingeben …"
                value={(answers[q.id] as string) ?? ''}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button className="btn-ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>
            ← Zurück
          </button>
          <div className="flex flex-wrap justify-center gap-1">
            {questions.map((qq, i) => (
              <button
                key={qq.id}
                onClick={() => setIdx(i)}
                className={cls(
                  'h-7 w-7 rounded-lg text-[11px] font-bold transition',
                  i === idx
                    ? 'bg-brand-600 text-white'
                    : answers[qq.id] !== undefined
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : 'bg-ink-100 text-ink-500 dark:bg-ink-800',
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {idx + 1 < questions.length ? (
            <button className="btn-primary" onClick={() => setIdx(idx + 1)}>
              Weiter →
            </button>
          ) : (
            <button className="btn-primary" onClick={evaluate}>
              Abgeben
            </button>
          )}
        </div>
      </div>
    )
  }

  /* ------------------------------- Ergebnis ---------------------------- */
  const pct = result ? Math.round((result.points / result.max) * 100) : 0
  return (
    <div className="space-y-5">
      <div className="card p-6 text-center">
        <div className="text-sm font-bold uppercase tracking-wide text-ink-400">Dein Ergebnis</div>
        <div className={cls('mt-1 text-6xl font-black', noteColor(result?.note ?? 6))}>{result?.note}</div>
        <div className="mt-1 text-sm text-ink-500">
          {result?.points} von {result?.max} Punkten ({pct} %)
          {(grade === 11 || grade === 12) && ` · ${result?.pts15} Notenpunkte`}
        </div>
        <Progress value={pct} className="mx-auto mt-4 max-w-md" tone={pct >= 70 ? 'green' : pct >= 40 ? 'amber' : 'rose'} />
        <div className="mt-2 text-xs text-ink-400">Bearbeitungszeit: {fmtTime(seconds)} · +{(result?.points ?? 0) * 12} XP</div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button className="btn-primary" onClick={() => setPhase('setup')}>
            Neuen Test starten
          </button>
        </div>
      </div>

      <h2 className="text-base font-bold">Auswertung im Detail</h2>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const a = answers[q.id]
          let right = false
          if (q.type === 'mc') right = a === q.answer
          if (q.type === 'truefalse') right = a === q.answer
          if (q.type === 'input') right = a !== undefined && answerMatch(String(a), q.accept) === 'correct'
          if (q.type === 'multi') {
            const arr = (a as number[]) ?? []
            right = arr.length === q.answers.length && q.answers.every((x) => arr.includes(x))
          }
          const topic = topicById[q.topicId]
          return (
            <div
              key={q.id}
              className={cls(
                'card border-l-4 p-4',
                right ? 'border-l-emerald-500' : 'border-l-rose-500',
              )}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-bold">{right ? '✓' : '✗'}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">
                    {i + 1}. <MD text={q.q} />
                  </div>
                  {!right && (
                    <div className="mt-1 text-xs text-ink-600 dark:text-ink-300">
                      Richtig wäre:{' '}
                      <strong>
                        {q.type === 'mc'
                          ? q.options[q.answer]
                          : q.type === 'multi'
                            ? q.answers.map((x) => q.options[x]).join(', ')
                            : q.type === 'input'
                              ? q.accept[0]
                              : q.answer
                                ? 'Richtig'
                                : 'Falsch'}
                      </strong>
                    </div>
                  )}
                  <p className="mt-1.5 text-xs leading-5 text-ink-500 dark:text-ink-400">
                    <MD text={q.explain} />
                  </p>
                  {topic && (
                    <Link to={`/thema/${topic.id}`} className="mt-1.5 inline-block text-xs font-semibold text-brand-600 hover:underline">
                      → Thema wiederholen: {topic.title}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function pick(selected: boolean) {
  return cls(
    'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition',
    selected
      ? 'border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-500/20 dark:bg-brand-500/15 dark:text-brand-200'
      : 'border-ink-200 hover:border-brand-300 hover:bg-brand-50/40 dark:border-ink-800 dark:hover:bg-ink-800/60',
  )
}
