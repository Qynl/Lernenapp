import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { topicById, subjectById, topicsBySubject } from '../data'
import { useStore } from '../lib/storage'
import { BlockRenderer } from '../components/BlockRenderer'
import { Quiz } from '../components/Quiz'
import { Chip, EmptyState } from '../components/ui'

export default function TopicPage() {
  const { id = '' } = useParams()
  const { store, set, addXp } = useStore()
  const topic = topicById[id]
  const subject = topic ? subjectById[topic.subjectId] : undefined
  const [tab, setTab] = useState<'lernen' | 'quiz' | 'notiz'>('lernen')
  const [note, setNote] = useState('')

  useEffect(() => {
    setTab('lernen')
    setNote(store.notes[id] ?? '')
    if (topic) set((s) => void (s.topics[id] = { ...(s.topics[id] ?? {}), lastSeen: Date.now() }))
    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const siblings = useMemo(() => (topic ? topicsBySubject(topic.subjectId).filter((t) => t.grade === topic.grade) : []), [topic])
  const pos = siblings.findIndex((t) => t.id === id)
  const prev = siblings[pos - 1]
  const next = siblings[pos + 1]

  if (!topic || !subject)
    return <EmptyState icon="🔍" title="Thema nicht gefunden" text="Schau in der Fächerübersicht nach dem passenden Thema." />

  const progress = store.topics[id] ?? {}

  function markRead() {
    if (!progress.read) {
      set((s) => void (s.topics[id] = { ...(s.topics[id] ?? {}), read: true, lastSeen: Date.now() }))
      addXp(15, 'minutes')
    }
    setTab('quiz')
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ink-500">
        <Link to="/faecher" className="hover:text-brand-600">
          Fächer
        </Link>
        <span>›</span>
        <Link to={`/fach/${subject.id}`} className="hover:text-brand-600">
          {subject.emoji} {subject.name}
        </Link>
        <span>›</span>
        <span className="text-ink-700 dark:text-ink-300">{topic.grade}. Klasse</span>
      </nav>

      <header className="card overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${subject.gradient}`} />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            {topic.tags.map((t) => (
              <Chip key={t} tone="brand">
                {t}
              </Chip>
            ))}
            {topic.abi && <Chip tone="rose">Abiturrelevant</Chip>}
            {progress.read && <Chip tone="green">gelesen</Chip>}
          </div>
          <h1 className="mt-2.5 text-2xl font-extrabold leading-tight">{topic.title}</h1>
          <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400">{topic.teaser}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-ink-400">
            <span>⏱ ca. {topic.minutes} Minuten</span>
            <span>❓ {topic.questions.length} Übungsfragen</span>
            {progress.bestScore !== undefined && <span>🏅 Bestwert {Math.round(progress.bestScore * 100)} %</span>}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 rounded-2xl bg-ink-100 p-1 dark:bg-ink-800/70">
        {(
          [
            ['lernen', '📖 Erklärung'],
            ['quiz', '✍️ Übungen'],
            ['notiz', '📝 Meine Notizen'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={
              tab === key
                ? 'flex-1 rounded-xl bg-white px-3 py-2 text-sm font-bold shadow-sm dark:bg-ink-900'
                : 'flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-ink-500 transition hover:text-ink-700 dark:hover:text-ink-200'
            }
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'lernen' && (
        <>
          <article className="card p-5 sm:p-6">
            <BlockRenderer blocks={topic.blocks} />
          </article>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button className="btn-primary" onClick={markRead}>
              {progress.read ? '✍️ Zu den Übungen' : '✓ Verstanden – weiter zu den Übungen (+15 XP)'}
            </button>
            <button
              className="btn-ghost"
              onClick={() =>
                set((s) => {
                  const i = s.favorites.indexOf(id)
                  if (i >= 0) s.favorites.splice(i, 1)
                  else s.favorites.push(id)
                })
              }
            >
              {store.favorites.includes(id) ? '★ Gemerkt' : '☆ Merken'}
            </button>
          </div>
        </>
      )}

      {tab === 'quiz' && (
        <Quiz
          questions={topic.questions}
          onFinish={(correct, total) => {
            const score = correct / total
            set((s) => {
              const p = s.topics[id] ?? {}
              s.topics[id] = {
                ...p,
                attempts: (p.attempts ?? 0) + 1,
                bestScore: Math.max(p.bestScore ?? 0, score),
                lastSeen: Date.now(),
                read: true,
              }
              if (score === 1 && !s.badges.includes('perfekt')) s.badges.push('perfekt')
            })
          }}
        />
      )}

      {tab === 'notiz' && (
        <div className="card p-5">
          <label className="label">Deine Notizen zu diesem Thema</label>
          <textarea
            className="input min-h-[220px] resize-y font-mono text-[13px]"
            placeholder="Eigene Merksätze, Fragen an die Lehrkraft, Hausaufgaben …"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={() => set((s) => void (s.notes[id] = note))}
          />
          <p className="mt-2 text-xs text-ink-400">Wird automatisch gespeichert, sobald du das Feld verlässt.</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-wrap gap-3">
        {prev && (
          <Link to={`/thema/${prev.id}`} className="card card-hover flex-1 p-3.5">
            <div className="text-[11px] font-bold text-ink-400">← Vorheriges Thema</div>
            <div className="text-sm font-semibold">{prev.title}</div>
          </Link>
        )}
        {next && (
          <Link to={`/thema/${next.id}`} className="card card-hover flex-1 p-3.5 text-right">
            <div className="text-[11px] font-bold text-ink-400">Nächstes Thema →</div>
            <div className="text-sm font-semibold">{next.title}</div>
          </Link>
        )}
      </nav>
    </div>
  )
}
