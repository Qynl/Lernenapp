import { useMemo, useState } from 'react'
import type { Question } from '../types'
import { useStore } from '../lib/storage'
import { answerMatch, cls, shuffle } from '../lib/utils'
import { MD } from './Markdownish'
import { Progress } from './ui'

interface Props {
  questions: Question[]
  /** test = kein Sofort-Feedback, alles am Ende */
  mode?: 'practice' | 'test'
  onFinish?: (correct: number, total: number) => void
  compact?: boolean
}

export function Quiz({ questions, mode = 'practice', onFinish, compact }: Props) {
  const { addXp } = useStore()
  const [pool, setPool] = useState<Question[] | null>(null)
  const list = useMemo(() => pool ?? questions, [pool, questions])
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState<number | number[] | string | boolean | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [almost, setAlmost] = useState(false)

  const q = list[idx]

  if (!q) return null

  const isCorrect = (() => {
    if (answer === null) return false
    switch (q.type) {
      case 'mc':
        return answer === q.answer
      case 'multi': {
        const a = (answer as number[]) ?? []
        return a.length === q.answers.length && q.answers.every((x) => a.includes(x))
      }
      case 'input':
        return answerMatch(String(answer), q.accept) === 'correct'
      case 'truefalse':
        return answer === q.answer
    }
  })()

  function check() {
    if (answer === null || (typeof answer === 'string' && !answer.trim())) return
    if (q.type === 'input') {
      setAlmost(answerMatch(String(answer), q.accept) === 'almost')
    }
    setChecked(true)
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      addXp(10, 'questions')
    } else {
      setWrongIds((w) => [...w, q.id])
      addXp(2, 'questions')
    }
  }

  function next() {
    if (idx + 1 >= list.length) {
      setDone(true)
      onFinish?.(correctCount, list.length)
    } else {
      setIdx(idx + 1)
      setAnswer(null)
      setChecked(false)
      setShowHint(false)
      setAlmost(false)
    }
  }

  function restart(onlyWrong = false) {
    if (onlyWrong) {
      const again = list.filter((x) => wrongIds.includes(x.id))
      setPool(again.length ? again : questions)
    } else {
      setPool(shuffle(questions))
    }
    setIdx(0)
    setAnswer(null)
    setChecked(false)
    setCorrectCount(0)
    setWrongIds([])
    setDone(false)
    setShowHint(false)
    setAlmost(false)
  }

  if (done) {
    const pct = Math.round((correctCount / list.length) * 100)
    return (
      <div className="card animate-pop p-6 text-center">
        <div className="text-5xl">{pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚'}</div>
        <h3 className="mt-3 text-xl font-bold">
          {correctCount} von {list.length} richtig
        </h3>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          {pct >= 80
            ? 'Stark! Das sitzt. Wiederhole in ein paar Tagen, damit es im Langzeitgedächtnis bleibt.'
            : pct >= 50
              ? 'Solide Basis – schau dir die Fehler noch einmal an und probiere es gleich nochmal.'
              : 'Kein Problem: Lies die Erklärungen oben nochmal in Ruhe und starte dann neu.'}
        </p>
        <Progress value={pct} className="mx-auto mt-4 max-w-sm" tone={pct >= 80 ? 'green' : pct >= 50 ? 'amber' : 'rose'} />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button className="btn-primary" onClick={() => restart()}>
            🔁 Nochmal alle
          </button>
          {wrongIds.length > 0 && (
            <button
              className="btn-ghost"
              onClick={() => {
                restart(true)
              }}
            >
              ❌ Nur Fehler wiederholen ({wrongIds.length})
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cls('card overflow-hidden', compact ? '' : '')}>
      {/* Kopf */}
      <div className="flex items-center gap-3 border-b border-ink-200 px-4 py-3 dark:border-ink-800">
        <span className="text-xs font-bold text-ink-500">
          Frage {idx + 1} / {list.length}
        </span>
        <Progress value={((idx + (checked ? 1 : 0)) / list.length) * 100} className="flex-1" />
        <span className="chip bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          ✓ {correctCount}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-[15px] font-semibold leading-6">
          <MD text={q.q} />
        </h3>

        {/* Antwortbereiche */}
        {q.type === 'mc' && (
          <div className="grid gap-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                disabled={checked}
                onClick={() => setAnswer(i)}
                className={optionClass(checked, answer === i, i === q.answer, mode)}
              >
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-current text-[11px] font-bold opacity-70">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-left">
                  <MD text={opt} />
                </span>
              </button>
            ))}
          </div>
        )}

        {q.type === 'multi' && (
          <div className="grid gap-2">
            <p className="text-xs text-ink-500">Mehrfachauswahl möglich</p>
            {q.options.map((opt, i) => {
              const sel = Array.isArray(answer) && (answer as number[]).includes(i)
              return (
                <button
                  key={i}
                  disabled={checked}
                  onClick={() => {
                    const cur = Array.isArray(answer) ? [...(answer as number[])] : []
                    setAnswer(cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i])
                  }}
                  className={optionClass(checked, sel, q.answers.includes(i), mode)}
                >
                  <span
                    className={cls(
                      'flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 text-[11px] font-bold',
                      sel ? 'border-current' : 'border-ink-300 dark:border-ink-600',
                    )}
                  >
                    {sel ? '✓' : ''}
                  </span>
                  <span className="text-left">
                    <MD text={opt} />
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {q.type === 'truefalse' && (
          <div className="grid grid-cols-2 gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                disabled={checked}
                onClick={() => setAnswer(v)}
                className={optionClass(checked, answer === v, v === q.answer, mode)}
              >
                <span className="mx-auto font-bold">{v ? '✓ Richtig' : '✗ Falsch'}</span>
              </button>
            ))}
          </div>
        )}

        {q.type === 'input' && (
          <div className="flex gap-2">
            <input
              className="input"
              placeholder="Deine Antwort …"
              value={typeof answer === 'string' ? answer : ''}
              disabled={checked}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (checked ? next() : check())
              }}
              autoFocus
            />
            {q.unit && (
              <span className="flex items-center rounded-xl bg-ink-100 px-3 text-sm font-semibold text-ink-500 dark:bg-ink-800">
                {q.unit}
              </span>
            )}
          </div>
        )}

        {/* Hinweis */}
        {!checked && q.hint && (
          <button className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400" onClick={() => setShowHint(true)}>
            {showHint ? '' : '💡 Tipp anzeigen'}
          </button>
        )}
        {showHint && q.hint && (
          <p className="rounded-xl bg-brand-50 p-3 text-xs text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
            💡 <MD text={q.hint} />
          </p>
        )}

        {/* Feedback */}
        {checked && (
          <div
            className={cls(
              'animate-fade-up rounded-xl p-4 text-sm',
              isCorrect
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200'
                : 'bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-200',
            )}
          >
            <div className="mb-1 font-bold">
              {isCorrect ? '✓ Richtig! +10 XP' : almost ? '⚠️ Fast! Nur ein Tippfehler?' : '✗ Leider falsch'}
            </div>
            {q.type === 'input' && !isCorrect && (
              <div className="mb-1">
                Richtige Antwort: <strong>{q.accept[0]}</strong>
              </div>
            )}
            <MD text={q.explain} />
          </div>
        )}

        <div className="flex justify-end gap-2">
          {!checked ? (
            <button className="btn-primary" onClick={check} disabled={answer === null || answer === ''}>
              Prüfen
            </button>
          ) : (
            <button className="btn-primary" onClick={next}>
              {idx + 1 >= list.length ? 'Auswertung' : 'Weiter →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function optionClass(checked: boolean, selected: boolean, isRight: boolean, mode: string) {
  const base =
    'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition disabled:cursor-default'
  if (!checked)
    return cls(
      base,
      selected
        ? 'border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-500/20 dark:bg-brand-500/15 dark:text-brand-200'
        : 'border-ink-200 bg-white hover:border-brand-300 hover:bg-brand-50/40 dark:border-ink-800 dark:bg-ink-900 dark:hover:bg-ink-800/60',
    )
  if (mode === 'test')
    return cls(base, selected ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/15' : 'border-ink-200 dark:border-ink-800 opacity-60')
  if (isRight) return cls(base, 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200')
  if (selected) return cls(base, 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-500/15 dark:text-rose-200')
  return cls(base, 'border-ink-200 opacity-50 dark:border-ink-800')
}

export { }
