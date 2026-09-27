import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { subjects, subjectById, topicsBySubject, formulas, glossaryBySubject } from '../data'
import type { Grade } from '../types'
import { cls, gradeRange } from '../lib/utils'
import { MD } from '../components/Markdownish'
import { EmptyState } from '../components/ui'

/** Verdichtete, druckbare Zusammenfassung eines Fachs: Merksätze, Formeln, Begriffe. */
export default function Cheatsheet() {
  const { subjectId } = useParams()
  const subject = subjectId ? subjectById[subjectId] : undefined
  const [grades, setGrades] = useState<Grade[]>([])

  const topics = useMemo(() => {
    if (!subject) return []
    const all = topicsBySubject(subject.id)
    return grades.length ? all.filter((t) => grades.includes(t.grade)) : all
  }, [subject, grades])

  const merksaetze = useMemo(
    () =>
      topics.flatMap((t) =>
        t.blocks
          .filter((b) => b.type === 'merksatz' || b.type === 'warn')
          .map((b) => ({ topic: t, block: b as Extract<typeof b, { md: string }> })),
      ),
    [topics],
  )

  const steps = useMemo(
    () =>
      topics.flatMap((t) =>
        t.blocks.filter((b) => b.type === 'steps').map((b) => ({ topic: t, block: b as Extract<typeof b, { type: 'steps' }> })),
      ),
    [topics],
  )

  const subFormulas = useMemo(
    () => (subject ? formulas.filter((f) => f.subjectId === subject.id) : []),
    [subject],
  )
  const terms = useMemo(() => (subject ? glossaryBySubject(subject.id) : []), [subject])

  if (!subject) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-black tracking-tight">Spickzettel 🗒️</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
            Alle Merksätze, Formeln und Fachbegriffe eines Fachs auf einer Seite – zum Durchlesen am Abend vor der
            Schulaufgabe oder zum Ausdrucken. (Erlaubt ist das Ding im Unterricht natürlich nicht. 😉)
          </p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <Link key={s.id} to={`/spickzettel/${s.id}`} className="card card-hover flex items-center gap-3 p-4">
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <div className="font-bold">{s.name}</div>
                <div className="text-xs text-ink-500">
                  {topicsBySubject(s.id).length} Themen · {formulas.filter((f) => f.subjectId === s.id).length} Formeln
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const availableGrades = [...new Set(topicsBySubject(subject.id).map((t) => t.grade))].sort((a, b) => a - b)

  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <Link to="/spickzettel" className="text-xs font-bold text-ink-400 hover:text-brand-500">
          ← Alle Spickzettel
        </Link>
      </div>

      <header className={cls('rounded-2xl p-6 text-white', 'bg-gradient-to-br', subject.gradient)}>
        <div className="text-4xl">{subject.emoji}</div>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Spickzettel {subject.name}</h1>
        <p className="mt-1 text-sm text-white/85">
          {topics.length} Themen · {merksaetze.length} Merksätze · {subFormulas.length} Formeln · {terms.length} Begriffe
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-1.5 print:hidden">
        <button onClick={() => setGrades([])} className={cls('chip', !grades.length && '!bg-brand-600 !text-white')}>
          Alle Klassen
        </button>
        {availableGrades.map((g) => (
          <button
            key={g}
            onClick={() => setGrades((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]))}
            className={cls('chip', grades.includes(g) && '!bg-brand-600 !text-white')}
          >
            Klasse {g}
          </button>
        ))}
        <button className="btn-soft ml-auto !py-1.5 !text-xs" onClick={() => window.print()}>
          🖨️ Drucken / als PDF speichern
        </button>
      </div>

      {topics.length === 0 && (
        <EmptyState icon="🗒️" title="Keine Inhalte" text="Für diese Auswahl gibt es noch nichts. Wähle andere Klassenstufen." />
      )}

      {merksaetze.length > 0 && (
        <section className="card p-5">
          <h2 className="text-lg font-black">💡 Merksätze &amp; Stolperfallen</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {merksaetze.map(({ topic, block }, i) => (
              <div
                key={i}
                className={cls(
                  'rounded-xl border-l-4 p-3',
                  block.type === 'warn'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-brand-500 bg-brand-500/10',
                )}
              >
                <div className="text-[10px] font-black uppercase text-ink-400">
                  Klasse {topic.grade} · {topic.title}
                </div>
                {'title' in block && block.title && <div className="mt-0.5 text-sm font-bold">{block.title}</div>}
                <div className="mt-1 text-[13px] leading-relaxed">
                  <MD text={block.md} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {subFormulas.length > 0 && (
        <section className="card p-5">
          <h2 className="text-lg font-black">∑ Formeln</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {subFormulas.map((f) => (
              <div key={f.id} className="rounded-xl bg-ink-50 p-3 dark:bg-ink-900">
                <div className="text-[10px] font-black uppercase text-ink-400">{f.area}</div>
                <div className="text-sm font-bold">{f.name}</div>
                <div className="formula mt-1 text-[13px]">{f.tex}</div>
                <div className="mt-1 text-[11px] text-ink-500">Klassen {gradeRange(f.grades)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="card p-5">
          <h2 className="text-lg font-black">🪜 Rezepte Schritt für Schritt</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {steps.map(({ topic, block }, i) => (
              <div key={i}>
                <div className="text-[10px] font-black uppercase text-ink-400">{topic.title}</div>
                <div className="text-sm font-bold">{block.title ?? 'Vorgehen'}</div>
                <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-[13px] leading-relaxed">
                  {block.items.map((it, j) => (
                    <li key={j}><MD text={it} /></li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {terms.length > 0 && (
        <section className="card p-5">
          <h2 className="text-lg font-black">📖 Begriffe</h2>
          <dl className="mt-3 grid gap-x-6 gap-y-2 md:grid-cols-2">
            {terms.map((t) => (
              <div key={t.term} className="border-b border-ink-100 pb-1.5 dark:border-ink-800">
                <dt className="text-[13px] font-bold">{t.term}</dt>
                <dd className="text-[13px] text-ink-600 dark:text-ink-300">{t.short}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="card p-5 print:hidden">
        <h2 className="text-lg font-black">Themen in diesem Fach</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <Link key={t.id} to={`/thema/${t.id}`} className="chip hover:!bg-brand-600 hover:!text-white">
              {t.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
