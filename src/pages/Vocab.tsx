import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { builtinDecks, subjectById } from '../data'
import { useStore, upsertDeck } from '../lib/storage'
import { isDue, masteryOf } from '../lib/srs'
import { uid } from '../lib/utils'
import { Chip, Progress, SectionTitle } from '../components/ui'
import type { Deck, VocabCard } from '../types'

const LANGS = [
  { id: 'fr', label: 'Französisch', subject: 'franzoesisch' },
  { id: 'en', label: 'Englisch', subject: 'englisch' },
  { id: 'la', label: 'Latein', subject: 'latein' },
  { id: 'es', label: 'Spanisch', subject: 'spanisch' },
  { id: 'de', label: 'Deutsch / Fachbegriffe', subject: 'deutsch' },
]

export default function Vocab() {
  const { store, set } = useStore()
  const navigate = useNavigate()
  const [showNew, setShowNew] = useState(false)
  const [name, setName] = useState('')
  const [lang, setLang] = useState('fr')
  const [bulk, setBulk] = useState('')

  const allDecks = [...store.decks, ...builtinDecks]

  const stats = useMemo(() => {
    const map: Record<string, { due: number; learned: number; mastery: number }> = {}
    for (const d of allDecks) {
      let due = 0
      let learned = 0
      let m = 0
      for (const c of d.cards) {
        const st = store.cards[c.id]
        if (isDue(st)) due++
        if (st) learned++
        m += masteryOf(st)
      }
      map[d.id] = { due, learned, mastery: d.cards.length ? m / d.cards.length : 0 }
    }
    return map
  }, [allDecks, store.cards])

  const totalDue = Object.values(stats).reduce((a, b) => a + b.due, 0)

  function createDeck() {
    if (!name.trim()) return
    const cards: VocabCard[] = parseBulk(bulk)
    const deck: Deck = {
      id: uid('deck'),
      name: name.trim(),
      lang,
      subjectId: LANGS.find((l) => l.id === lang)?.subject ?? 'deutsch',
      description: 'Eigenes Vokabelpaket',
      cards,
      custom: true,
      createdAt: Date.now(),
    }
    upsertDeck(set, deck)
    setName('')
    setBulk('')
    setShowNew(false)
    navigate(`/vokabeln/${deck.id}`)
  }

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Vokabeln</h1>
          <p className="mt-1 max-w-xl text-sm text-ink-500 dark:text-ink-400">
            Trainiere mit dem Leitner-System: Was du kannst, kommt seltener – was hakt, öfter. Eigene Listen kannst du
            jederzeit anlegen oder per Copy-Paste importieren.
          </p>
        </div>
        <div className="flex gap-2">
          {totalDue > 0 && (
            <Link to="/karteikarten" className="btn-primary">
              ⚡ {totalDue} fällige Karten
            </Link>
          )}
          <button className="btn-ghost" onClick={() => setShowNew((v) => !v)}>
            ＋ Neues Paket
          </button>
        </div>
      </header>

      {showNew && (
        <section className="card animate-fade-up space-y-4 p-5">
          <h2 className="text-base font-bold">Eigenes Vokabelpaket anlegen</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Name des Pakets</label>
              <input className="input" placeholder="z. B. Französisch Unité 4" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Sprache / Fach</label>
              <select className="input" value={lang} onChange={(e) => setLang(e.target.value)}>
                {LANGS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Vokabeln (optional gleich einfügen)</label>
            <textarea
              className="input min-h-[140px] font-mono text-[13px]"
              placeholder={'Eine Vokabel pro Zeile, getrennt mit  =  oder Tab oder Semikolon:\n\nla fenêtre = das Fenster\nle livre = das Buch\nécouter = zuhören'}
              value={bulk}
              onChange={(e) => setBulk(e.target.value)}
            />
            <p className="mt-1 text-xs text-ink-400">
              Erkannt: {parseBulk(bulk).length} Vokabeln. Trennzeichen: <code>=</code>, <code>;</code>, <code>-</code> oder Tabulator.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={createDeck} disabled={!name.trim()}>
              Paket erstellen
            </button>
            <button className="btn-ghost" onClick={() => setShowNew(false)}>
              Abbrechen
            </button>
          </div>
        </section>
      )}

      {store.decks.length > 0 && (
        <section>
          <SectionTitle hint="von dir erstellt">Meine Pakete</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {store.decks.map((d) => (
              <DeckCard key={d.id} deck={d} stat={stats[d.id]} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionTitle hint={`${builtinDecks.length} Pakete`}>Fertige Pakete</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {builtinDecks.map((d) => (
            <DeckCard key={d.id} deck={d} stat={stats[d.id]} />
          ))}
        </div>
      </section>
    </div>
  )
}

function DeckCard({ deck, stat }: { deck: Deck; stat?: { due: number; learned: number; mastery: number } }) {
  const subject = subjectById[deck.subjectId]
  return (
    <Link to={`/vokabeln/${deck.id}`} className="card card-hover p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{subject?.emoji ?? '🗂️'}</span>
          <h3 className="text-sm font-bold">{deck.name}</h3>
        </div>
        {stat && stat.due > 0 && <Chip tone="amber">{stat.due} fällig</Chip>}
        {deck.custom && <Chip tone="violet">eigen</Chip>}
      </div>
      {deck.description && <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{deck.description}</p>}
      <Progress value={(stat?.mastery ?? 0) * 100} className="mt-3" tone="green" />
      <div className="mt-1.5 flex justify-between text-[11px] text-ink-400">
        <span>{deck.cards.length} Vokabeln</span>
        <span>{Math.round((stat?.mastery ?? 0) * 100)} % beherrscht</span>
      </div>
    </Link>
  )
}

export function parseBulk(text: string): VocabCard[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\t|\s*[=;|]\s*|\s+–\s+|\s+-\s+/).filter(Boolean)
      if (parts.length < 2) return null
      return { id: uid('c'), front: parts[0].trim(), back: parts.slice(1).join(', ').trim() }
    })
    .filter(Boolean) as VocabCard[]
}
