import { useMemo, useState } from 'react'
import { formulas, subjects, subjectById } from '../data'
import { MD } from '../components/Markdownish'
import { EmptyState } from '../components/ui'
import type { Grade } from '../types'

export default function Formulas() {
  const [q, setQ] = useState('')
  const [subject, setSubject] = useState('alle')
  const [grade, setGrade] = useState<Grade | 'alle'>('alle')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return formulas.filter((f) => {
      if (subject !== 'alle' && f.subjectId !== subject) return false
      if (grade !== 'alle' && !f.grades.includes(grade)) return false
      if (needle && !(f.name.toLowerCase().includes(needle) || f.area.toLowerCase().includes(needle) || f.tex.toLowerCase().includes(needle)))
        return false
      return true
    })
  }, [q, subject, grade])

  const grouped = useMemo(() => {
    const m = new Map<string, typeof list>()
    for (const f of list) {
      const key = `${subjectById[f.subjectId]?.name ?? f.subjectId} · ${f.area}`
      m.set(key, [...(m.get(key) ?? []), f])
    }
    return [...m.entries()]
  }, [list])

  const subjectsWithFormulas = subjects.filter((s) => formulas.some((f) => f.subjectId === s.id))

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Formelsammlung</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Alle Formeln aus Mathematik, Physik, Chemie, Biologie, Geographie und Wirtschaft – gefiltert nach deiner
          Jahrgangsstufe.
        </p>
      </header>

      <div className="card space-y-3 p-4">
        <input className="input" placeholder="Formel suchen – z. B. Pythagoras, Ableitung, pH …" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="flex flex-wrap gap-1.5">
          <Btn active={subject === 'alle'} onClick={() => setSubject('alle')}>
            Alle Fächer
          </Btn>
          {subjectsWithFormulas.map((s) => (
            <Btn key={s.id} active={subject === s.id} onClick={() => setSubject(s.id)}>
              {s.emoji} {s.name}
            </Btn>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Btn active={grade === 'alle'} onClick={() => setGrade('alle')}>
            Alle Klassen
          </Btn>
          {([5, 6, 7, 8, 9, 10, 11, 12] as Grade[]).map((g) => (
            <Btn key={g} active={grade === g} onClick={() => setGrade(g)}>
              {g}
            </Btn>
          ))}
        </div>
      </div>

      {grouped.length === 0 && <EmptyState icon="🔍" title="Nichts gefunden" text="Probiere einen anderen Suchbegriff oder andere Filter." />}

      {grouped.map(([group, items]) => (
        <section key={group}>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-500">{group}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((f) => (
              <div key={f.id} className="card overflow-hidden">
                <div className="flex items-center justify-between gap-2 border-b border-ink-200 px-4 py-2.5 dark:border-ink-800">
                  <span className="text-sm font-bold">{f.name}</span>
                  <span className="text-[10px] font-semibold text-ink-400">Kl. {f.grades.join(', ')}</span>
                </div>
                <pre className="formula whitespace-pre-wrap px-4 py-3.5 text-center text-[15px] font-semibold text-brand-700 dark:text-brand-300">
                  {f.tex}
                </pre>
                {f.note && (
                  <div className="border-t border-ink-200 px-4 py-2 text-xs text-ink-500 dark:border-ink-800 dark:text-ink-400">
                    <MD text={f.note} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? 'rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white'
          : 'rounded-xl bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-600 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
      }
    >
      {children}
    </button>
  )
}
