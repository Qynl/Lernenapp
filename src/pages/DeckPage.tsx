import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { builtinDecks } from '../data'
import { useStore, upsertDeck } from '../lib/storage'
import { dueLabel, isDue, masteryOf } from '../lib/srs'
import { uid } from '../lib/utils'
import { Chip, EmptyState, Progress } from '../components/ui'
import { parseBulk } from './Vocab'
import type { VocabCard } from '../types'

export default function DeckPage() {
  const { id = '' } = useParams()
  const { store, set } = useStore()
  const navigate = useNavigate()
  const custom = store.decks.find((d) => d.id === id)
  const deck = custom ?? builtinDecks.find((d) => d.id === id)

  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [hint, setHint] = useState('')
  const [filter, setFilter] = useState('')
  const [showImport, setShowImport] = useState(false)
  const [bulk, setBulk] = useState('')
  const [editing, setEditing] = useState<string | null>(null)

  const cards = useMemo(() => {
    if (!deck) return []
    const f = filter.trim().toLowerCase()
    return f ? deck.cards.filter((c) => c.front.toLowerCase().includes(f) || c.back.toLowerCase().includes(f)) : deck.cards
  }, [deck, filter])

  if (!deck) return <EmptyState icon="🗂️" title="Paket nicht gefunden" text="Vielleicht wurde es gelöscht?" />

  const due = deck.cards.filter((c) => isDue(store.cards[c.id])).length
  const mastery = deck.cards.length ? deck.cards.reduce((a, c) => a + masteryOf(store.cards[c.id]), 0) / deck.cards.length : 0

  function addCard() {
    if (!front.trim() || !back.trim() || !custom) return
    const card: VocabCard = { id: uid('c'), front: front.trim(), back: back.trim(), hint: hint.trim() || undefined }
    upsertDeck(set, { ...custom, cards: [card, ...custom.cards] })
    setFront('')
    setBack('')
    setHint('')
  }

  function removeCard(cardId: string) {
    if (!custom) return
    upsertDeck(set, { ...custom, cards: custom.cards.filter((c) => c.id !== cardId) })
  }

  function updateCard(cardId: string, patch: Partial<VocabCard>) {
    if (!custom) return
    upsertDeck(set, { ...custom, cards: custom.cards.map((c) => (c.id === cardId ? { ...c, ...patch } : c)) })
  }

  function importBulk() {
    if (!custom) return
    const neu = parseBulk(bulk)
    if (!neu.length) return
    upsertDeck(set, { ...custom, cards: [...neu, ...custom.cards] })
    setBulk('')
    setShowImport(false)
  }

  function copyAsMine() {
    const copy = {
      ...deck!,
      id: uid('deck'),
      name: `${deck!.name} (Kopie)`,
      custom: true,
      createdAt: Date.now(),
      cards: deck!.cards.map((c) => ({ ...c, id: uid('c') })),
    }
    upsertDeck(set, copy)
    navigate(`/vokabeln/${copy.id}`)
  }

  return (
    <div className="space-y-6">
      <nav className="text-xs font-semibold text-ink-500">
        <Link to="/vokabeln" className="hover:text-brand-600">
          ← Alle Vokabelpakete
        </Link>
      </nav>

      <header className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold">{deck.name}</h1>
              {deck.custom ? <Chip tone="violet">eigenes Paket</Chip> : <Chip tone="brand">vorgefertigt</Chip>}
            </div>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{deck.description}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-[11px] font-semibold text-ink-400">
              <span>{deck.cards.length} Vokabeln</span>
              <span>{due} jetzt fällig</span>
              <span>{Math.round(mastery * 100)} % beherrscht</span>
            </div>
            <Progress value={mastery * 100} className="mt-3 max-w-xs" tone="green" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to={`/karteikarten?deck=${deck.id}`} className="btn-primary">
              ⚡ Trainieren
            </Link>
            <Link to={`/karteikarten?deck=${deck.id}&mode=type`} className="btn-ghost">
              ⌨️ Tipp-Modus
            </Link>
            {!custom && (
              <button className="btn-ghost" onClick={copyAsMine}>
                📋 Kopie zum Bearbeiten
              </button>
            )}
          </div>
        </div>
      </header>

      {custom && (
        <section className="card space-y-3 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Neue Vokabel eintragen</h2>
            <button className="text-xs font-semibold text-brand-600 hover:underline" onClick={() => setShowImport((v) => !v)}>
              {showImport ? 'Einzeleingabe' : '📥 Mehrere auf einmal einfügen'}
            </button>
          </div>

          {!showImport ? (
            <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <input
                className="input"
                placeholder="Fremdsprache (z. B. la fenêtre)"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCard()}
              />
              <input
                className="input"
                placeholder="Deutsch (z. B. das Fenster)"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCard()}
              />
              <input
                className="input"
                placeholder="Hinweis (Genus, Formen …)"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCard()}
              />
              <button className="btn-primary" onClick={addCard} disabled={!front.trim() || !back.trim()}>
                ＋
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                className="input min-h-[130px] font-mono text-[13px]"
                placeholder={'la fenêtre = das Fenster\nle livre = das Buch'}
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <button className="btn-primary" onClick={importBulk} disabled={!parseBulk(bulk).length}>
                  {parseBulk(bulk).length} Vokabeln importieren
                </button>
                <span className="text-xs text-ink-400">Trennzeichen: = ; | Tab</span>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="card overflow-hidden">
        <div className="flex items-center gap-3 border-b border-ink-200 p-3 dark:border-ink-800">
          <input
            className="input !py-2"
            placeholder="In diesem Paket suchen …"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="whitespace-nowrap text-xs text-ink-400">{cards.length} Einträge</span>
        </div>

        <ul className="divide-y divide-ink-200 dark:divide-ink-800">
          {cards.map((c) => {
            const st = store.cards[c.id]
            const m = masteryOf(st)
            return (
              <li key={c.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
                {editing === c.id && custom ? (
                  <>
                    <input
                      className="input !py-1.5 flex-1"
                      defaultValue={c.front}
                      onBlur={(e) => updateCard(c.id, { front: e.target.value })}
                    />
                    <input
                      className="input !py-1.5 flex-1"
                      defaultValue={c.back}
                      onBlur={(e) => updateCard(c.id, { back: e.target.value })}
                    />
                    <button className="btn-ghost !py-1.5" onClick={() => setEditing(null)}>
                      Fertig
                    </button>
                  </>
                ) : (
                  <>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{c.front}</div>
                      {c.hint && <div className="text-[11px] text-ink-400">{c.hint}</div>}
                    </div>
                    <div className="min-w-0 flex-1 text-ink-600 dark:text-ink-300">{c.back}</div>
                    <div className="flex w-28 flex-none items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${m * 100}%` }} />
                      </div>
                      <span className="w-14 text-[10px] text-ink-400">{st ? dueLabel(st) : 'neu'}</span>
                    </div>
                    {custom && (
                      <div className="flex gap-1">
                        <button className="rounded-lg px-2 py-1 text-xs hover:bg-ink-100 dark:hover:bg-ink-800" onClick={() => setEditing(c.id)}>
                          ✏️
                        </button>
                        <button
                          className="rounded-lg px-2 py-1 text-xs hover:bg-rose-50 dark:hover:bg-rose-500/10"
                          onClick={() => removeCard(c.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            )
          })}
        </ul>
        {cards.length === 0 && <div className="p-8 text-center text-sm text-ink-400">Noch keine Vokabeln in diesem Paket.</div>}
      </section>

      {custom && (
        <button
          className="text-xs font-semibold text-rose-600 hover:underline"
          onClick={() => {
            if (confirm(`Paket „${deck.name}" wirklich löschen?`)) {
              set((s) => void (s.decks = s.decks.filter((d) => d.id !== deck.id)))
              navigate('/vokabeln')
            }
          }}
        >
          Paket löschen
        </button>
      )}
    </div>
  )
}
