import { useState } from 'react'
import { Link } from 'react-router-dom'
import { subjects, topics } from '../data'
import { useStore } from '../lib/storage'
import { Chip } from '../components/ui'
import type { Grade } from '../types'

export default function Subjects() {
  const { store } = useStore()
  const [grade, setGrade] = useState<Grade | 'alle'>('alle')

  const list = subjects.filter((s) => grade === 'alle' || s.grades.includes(grade))

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Fächer</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Alle Fächer des bayerischen Gymnasiums – ausführlich erklärt, mit Beispielen und Übungsfragen.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-bold uppercase text-ink-400">Klasse</span>
        {(['alle', 5, 6, 7, 8, 9, 10, 11, 12] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGrade(g as Grade | 'alle')}
            className={
              grade === g
                ? 'rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white'
                : 'rounded-xl bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-600 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
            }
          >
            {g === 'alle' ? 'Alle' : g}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((s) => {
          const sTopics = topics.filter((t) => t.subjectId === s.id && (grade === 'alle' || t.grade === grade))
          const done = sTopics.filter((t) => (store.topics[t.id]?.bestScore ?? 0) >= 0.8).length
          return (
            <Link key={s.id} to={`/fach/${s.id}`} className="card card-hover overflow-hidden">
              <div className={`h-1.5 w-full bg-gradient-to-r ${s.gradient}`} />
              <div className="flex gap-4 p-5">
                <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${s.gradient}`}>
                  {s.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold">{s.name}</h2>
                    {s.language && <Chip tone="brand">Vokabeln</Chip>}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-400">{s.description}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-ink-400">
                    <span>📘 {sTopics.length} Themen</span>
                    <span>✅ {done} gemeistert</span>
                    <span>🎓 Klasse {s.grades[0]}–{s.grades[s.grades.length - 1]}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
