import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { subjectById, topicsBySubject, builtinDecks } from '../data'
import { useStore } from '../lib/storage'
import { Chip, EmptyState, Progress } from '../components/ui'
import { gradeLabel } from '../data/subjects'
import type { Grade } from '../types'

export default function SubjectPage() {
  const { id = '' } = useParams()
  const { store } = useStore()
  const subject = subjectById[id]
  const all = topicsBySubject(id)
  const grades = [...new Set(all.map((t) => t.grade))].sort((a, b) => a - b)
  const [grade, setGrade] = useState<Grade | 'alle'>('alle')
  const decks = builtinDecks.filter((d) => d.subjectId === id)

  if (!subject) return <EmptyState icon="🤷" title="Fach nicht gefunden" text="Dieses Fach gibt es (noch) nicht." />

  const list = grade === 'alle' ? all : all.filter((t) => t.grade === grade)
  const byGrade = grades
    .filter((g) => grade === 'alle' || g === grade)
    .map((g) => ({ g, items: list.filter((t) => t.grade === g) }))
    .filter((x) => x.items.length)

  return (
    <div className="space-y-6">
      <header className={`overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-lg ${subject.gradient}`}>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur">
            {subject.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{subject.name}</h1>
            <p className="mt-1 max-w-xl text-sm text-white/85">{subject.description}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/20 px-3 py-1">{all.length} Themen</span>
          <span className="rounded-full bg-white/20 px-3 py-1">
            {all.reduce((s, t) => s + t.questions.length, 0)} Übungsfragen
          </span>
          <span className="rounded-full bg-white/20 px-3 py-1">Klasse {grades[0]}–{grades[grades.length - 1]}</span>
        </div>
      </header>

      {decks.length > 0 && (
        <section className="grid gap-3 sm:grid-cols-2">
          {decks.map((d) => (
            <Link key={d.id} to={`/vokabeln/${d.id}`} className="card card-hover flex items-center gap-3 p-4">
              <span className="text-2xl">🗂️</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold">{d.name}</div>
                <div className="text-xs text-ink-500">{d.cards.length} Vokabeln · {d.description}</div>
              </div>
              <span className="text-brand-600 dark:text-brand-400">→</span>
            </Link>
          ))}
        </section>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setGrade('alle')}
          className={
            grade === 'alle'
              ? 'rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white'
              : 'rounded-xl bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-600 dark:bg-ink-800 dark:text-ink-300'
          }
        >
          Alle Klassen
        </button>
        {grades.map((g) => (
          <button
            key={g}
            onClick={() => setGrade(g)}
            className={
              grade === g
                ? 'rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-bold text-white'
                : 'rounded-xl bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-600 dark:bg-ink-800 dark:text-ink-300'
            }
          >
            {g}. Klasse
          </button>
        ))}
      </div>

      {byGrade.length === 0 && (
        <EmptyState icon="📝" title="Noch keine Inhalte" text="Für diese Klassenstufe kommen die Themen bald dazu." />
      )}

      {byGrade.map(({ g, items }) => (
        <section key={g}>
          <h2 className="mb-2.5 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink-500">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-ink-200 text-[11px] dark:bg-ink-800">{g}</span>
            {gradeLabel(g)}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((t) => {
              const p = store.topics[t.id]
              const score = p?.bestScore ?? 0
              return (
                <Link key={t.id} to={`/thema/${t.id}`} className="card card-hover p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold leading-snug">{t.title}</h3>
                    <div className="flex flex-none gap-1">
                      {t.abi && <Chip tone="rose">Abi</Chip>}
                      {score >= 0.8 && <Chip tone="green">✓</Chip>}
                    </div>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink-500 dark:text-ink-400">{t.teaser}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-ink-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-500 dark:bg-ink-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Progress value={score * 100} className="mt-3" tone={score >= 0.8 ? 'green' : 'brand'} />
                  <div className="mt-1.5 flex justify-between text-[11px] text-ink-400">
                    <span>⏱ {t.minutes} Min · {t.questions.length} Fragen</span>
                    <span>{score > 0 ? `${Math.round(score * 100)} %` : 'neu'}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
