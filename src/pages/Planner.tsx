import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, upsertExam, removeExam } from '../lib/storage'
import { subjects, subjectById, topicsBySubject, builtinDecks } from '../data'
import { buildPlan, KIND_META, taskLink } from '../lib/plan'
import { cls, todayISO, daysBetween, uid, plural } from '../lib/utils'
import { Progress, SectionTitle, EmptyState, Chip } from '../components/ui'
import { Pomodoro } from '../components/Pomodoro'
import { toast } from '../lib/bus'
import type { Exam } from '../types'

export default function Planner() {
  const { store, set, addXp } = useStore()
  const [open, setOpen] = useState(false)

  const exams = useMemo(() => [...store.exams].sort((a, b) => a.date.localeCompare(b.date)), [store.exams])
  const today = todayISO()

  const todayTasks = store.tasks.filter((t) => t.date <= today && !t.done)
  const doneToday = store.tasks.filter((t) => t.done && t.date === today).length

  function toggleTask(id: string) {
    const task = store.tasks.find((t) => t.id === id)
    if (!task) return
    set((s) => {
      const t = s.tasks.find((x) => x.id === id)
      if (t) t.done = !t.done
    })
    if (!task.done) addXp(5, 'minutes', 'Lernplan-Aufgabe')
  }

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Lernplaner</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Trag deine Schulaufgaben ein – die App baut dir daraus einen Tag-für-Tag-Plan.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setOpen((o) => !o)}>
          {open ? 'Abbrechen' : '+ Prüfung anlegen'}
        </button>
      </header>

      {open && <ExamForm onDone={() => setOpen(false)} />}

      {/* Heute */}
      <section>
        <SectionTitle hint={doneToday ? `${doneToday} heute erledigt ✓` : undefined}>Heute zu tun</SectionTitle>
        {todayTasks.length === 0 ? (
          <div className="card p-5 text-sm text-ink-500 dark:text-ink-400">
            {store.exams.length === 0
              ? 'Noch kein Termin angelegt. Leg oben deine nächste Schulaufgabe an – dann erscheint hier dein Tagesplan.'
              : 'Alles erledigt für heute. Stark! 🎉'}
          </div>
        ) : (
          <div className="card divide-y divide-ink-200 dark:divide-ink-800">
            {todayTasks.slice(0, 12).map((t) => {
              const meta = KIND_META[t.kind]
              const exam = store.exams.find((e) => e.id === t.examId)
              const overdue = t.date < today
              return (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                  <button
                    onClick={() => toggleTask(t.id)}
                    className="h-5 w-5 flex-none rounded-md border-2 border-ink-300 transition hover:border-brand-500 dark:border-ink-600"
                    aria-label="Als erledigt markieren"
                  />
                  <span className="text-lg">{meta.icon}</span>
                  <div className="min-w-0 flex-1">
                    <Link to={taskLink(t)} className="block truncate text-sm font-semibold hover:underline">
                      {t.label}
                    </Link>
                    <div className="text-xs text-ink-400">
                      {exam ? `${exam.title} · ` : ''}
                      {t.minutes} Min
                      {overdue && <span className="ml-1 font-bold text-rose-500">· nachholen</span>}
                    </div>
                  </div>
                  <Link to={taskLink(t)} className="btn-soft !px-3 !py-1.5 text-xs">
                    Los
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Pomodoro />

      {/* Termine */}
      <section>
        <SectionTitle hint={store.exams.length ? plural(store.exams.length, 'Termin', 'Termine') : undefined}>
          Deine Prüfungen
        </SectionTitle>
        {exams.length === 0 ? (
          <EmptyState
            icon="📅"
            title="Noch keine Prüfung geplant"
            text="Trage Fach, Datum und Themen ein – die App verteilt den Stoff automatisch auf die verbleibenden Tage."
          />
        ) : (
          <div className="space-y-4">
            {exams.map((e) => {
              const tasks = store.tasks.filter((t) => t.examId === e.id)
              const done = tasks.filter((t) => t.done).length
              const pct = tasks.length ? (done / tasks.length) * 100 : 0
              const rest = daysBetween(today, e.date)
              const s = subjectById[e.subjectId]
              return (
                <div key={e.id} className="card overflow-hidden">
                  <div className={cls('flex flex-wrap items-center gap-3 bg-gradient-to-r p-4 text-white', s?.gradient ?? 'from-ink-500 to-ink-700')}>
                    <span className="text-2xl">{s?.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold">{e.title}</div>
                      <div className="text-xs opacity-90">
                        {new Date(e.date + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/20 px-3 py-1.5 text-center">
                      <div className="text-xl font-black leading-none">{rest > 0 ? rest : rest === 0 ? '!' : '–'}</div>
                      <div className="text-[10px] font-bold uppercase">{rest > 0 ? 'Tage' : rest === 0 ? 'heute' : 'vorbei'}</div>
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <div className="mb-1 flex justify-between text-xs font-semibold text-ink-500">
                        <span>
                          {done}/{tasks.length} Aufgaben erledigt
                        </span>
                        <span>{Math.round(pct)} %</span>
                      </div>
                      <Progress value={pct} tone={pct >= 80 ? 'green' : pct >= 40 ? 'amber' : 'brand'} />
                    </div>

                    <details className="text-sm">
                      <summary className="cursor-pointer font-semibold text-brand-600 dark:text-brand-400">
                        Kompletten Plan anzeigen
                      </summary>
                      <div className="mt-3 space-y-3">
                        {groupByDate(tasks).map(([date, items]) => (
                          <div key={date}>
                            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-400">
                              {new Date(date + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                              {date === today && <span className="ml-1 text-brand-500">· heute</span>}
                            </div>
                            <ul className="space-y-1">
                              {items.map((t) => (
                                <li key={t.id} className="flex items-center gap-2">
                                  <input type="checkbox" checked={!!t.done} onChange={() => toggleTask(t.id)} className="h-4 w-4 accent-brand-600" />
                                  <span className={cls('text-xs', t.done && 'text-ink-400 line-through')}>
                                    {KIND_META[t.kind].icon} {t.label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        className="btn-ghost !px-3 !py-1.5 text-xs"
                        onClick={() => {
                          upsertExam(set, e, buildPlan(e))
                          toast('Plan neu berechnet', '🔄', 'good')
                        }}
                      >
                        Plan neu berechnen
                      </button>
                      <button
                        className="btn-ghost !px-3 !py-1.5 text-xs text-rose-600"
                        onClick={() => {
                          if (confirm('Diesen Termin und den zugehörigen Plan löschen?')) removeExam(set, e.id)
                        }}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

function groupByDate<T extends { date: string }>(items: T[]) {
  const m = new Map<string, T[]>()
  for (const i of items) m.set(i.date, [...(m.get(i.date) ?? []), i])
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]))
}

function ExamForm({ onDone }: { onDone: () => void }) {
  const { store, set } = useStore()
  const [subjectId, setSubjectId] = useState('mathe')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    return todayISO(d)
  })
  const [picked, setPicked] = useState<string[]>([])
  const [pickedDecks, setPickedDecks] = useState<string[]>([])

  const available = topicsBySubject(subjectId).filter((t) => Math.abs(t.grade - store.profile.grade) <= 1)
  const list = available.length ? available : topicsBySubject(subjectId)
  const decks = builtinDecks.filter((d) => d.subjectId === subjectId)

  function save() {
    if (!picked.length) {
      toast('Wähle mindestens ein Thema aus', '⚠️', 'bad')
      return
    }
    const exam: Exam = {
      id: uid('exam'),
      subjectId,
      title: title.trim() || `${subjectById[subjectId]?.name}-Schulaufgabe`,
      date,
      topicIds: picked,
      deckIds: pickedDecks,
      createdAt: Date.now(),
    }
    upsertExam(set, exam, buildPlan(exam))
    toast('Lernplan erstellt 🎯', '📅', 'good')
    onDone()
  }

  return (
    <section className="card animate-fade-up space-y-4 p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Fach</label>
          <select
            className="input"
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value)
              setPicked([])
              setPickedDecks([])
            }}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.emoji} {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Bezeichnung</label>
          <input className="input" placeholder="z. B. 2. Schulaufgabe" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="label">Datum</label>
          <input className="input" type="date" value={date} min={todayISO()} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="label">
          Themen auswählen{' '}
          <span className="font-normal text-ink-400">({picked.length} gewählt)</span>
        </label>
        <div className="max-h-56 space-y-1 overflow-auto rounded-xl border border-ink-200 p-2 dark:border-ink-800">
          {list.length === 0 && <p className="p-2 text-xs text-ink-400">Für dieses Fach gibt es noch keine Themen.</p>}
          {list.map((t) => (
            <label key={t.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-ink-100 dark:hover:bg-ink-800">
              <input
                type="checkbox"
                className="h-4 w-4 accent-brand-600"
                checked={picked.includes(t.id)}
                onChange={(e) => setPicked((p) => (e.target.checked ? [...p, t.id] : p.filter((x) => x !== t.id)))}
              />
              <span className="flex-1">{t.title}</span>
              <Chip>{t.grade}</Chip>
            </label>
          ))}
        </div>
      </div>

      {decks.length > 0 && (
        <div>
          <label className="label">Vokabelpakete einbeziehen</label>
          <div className="flex flex-wrap gap-1.5">
            {decks.map((d) => (
              <button
                key={d.id}
                onClick={() => setPickedDecks((p) => (p.includes(d.id) ? p.filter((x) => x !== d.id) : [...p, d.id]))}
                className={
                  pickedDecks.includes(d.id)
                    ? 'rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white'
                    : 'rounded-xl bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-600 dark:bg-ink-800 dark:text-ink-300'
                }
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button className="btn-primary" onClick={save}>
          Lernplan erstellen
        </button>
        <button className="btn-ghost" onClick={onDone}>
          Abbrechen
        </button>
      </div>
    </section>
  )
}
