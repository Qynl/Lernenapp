import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchEverything, type SearchHit } from '../data'
import { cls } from '../lib/utils'
import { on } from '../lib/bus'

interface Action {
  label: string
  sub: string
  icon: string
  to: string
}

const ACTIONS: Action[] = [
  { label: 'Übersicht', sub: 'Dashboard mit Tagesziel', icon: '🏠', to: '/' },
  { label: 'Fächer', sub: 'Alle 17 Fächer durchstöbern', icon: '📚', to: '/faecher' },
  { label: 'Vokabeln', sub: 'Decks verwalten & eigene anlegen', icon: '🗂️', to: '/vokabeln' },
  { label: 'Karteikarten', sub: 'Leitner-Trainer starten', icon: '🎴', to: '/karteikarten' },
  { label: 'Tests', sub: 'Probeschulaufgabe generieren', icon: '📝', to: '/test' },
  { label: 'Tägliche Challenge', sub: '8 Fragen, jeden Tag neu', icon: '📅', to: '/taeglich' },
  { label: 'Kopfrechen-Arena', sub: '60 Sekunden Rechen-Sprint', icon: '⚡', to: '/arena' },
  { label: 'Lernplan', sub: 'Schulaufgaben-Countdown', icon: '🗓️', to: '/lernplan' },
  { label: 'Werkzeugkasten', sub: 'Rechner mit Rechenweg', icon: '🧰', to: '/tools' },
  { label: 'Formelsammlung', sub: 'Alle Formeln durchsuchen', icon: '∑', to: '/formeln' },
  { label: 'Glossar', sub: 'Fachbegriffe nachschlagen', icon: '📖', to: '/glossar' },
  { label: 'Spickzettel', sub: 'Fach-Zusammenfassungen drucken', icon: '🗒️', to: '/spickzettel' },
  { label: 'Statistik', sub: 'XP, Abzeichen, Heatmap', icon: '📊', to: '/statistik' },
  { label: 'Einstellungen', sub: 'Profil, Design, Datensicherung', icon: '⚙️', to: '/einstellungen' },
]

const KIND_ICON: Record<SearchHit['kind'], string> = {
  topic: '📘',
  deck: '🗂️',
  formula: '∑',
  glossary: '📖',
}

const KIND_LABEL: Record<SearchHit['kind'], string> = {
  topic: 'Thema',
  deck: 'Vokabeldeck',
  formula: 'Formel',
  glossary: 'Begriff',
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const nav = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    const off = on('palette', () => setOpen(true))
    return () => {
      window.removeEventListener('keydown', handler)
      off()
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const actions = (term
      ? ACTIONS.filter((a) => a.label.toLowerCase().includes(term) || a.sub.toLowerCase().includes(term))
      : ACTIONS
    ).slice(0, term ? 4 : 8)
    const hits = term.length >= 2 ? searchEverything(q, 14) : []
    return { actions, hits, total: actions.length + hits.length }
  }, [q])

  const flat = useMemo(
    () => [
      ...results.actions.map((a) => ({ to: a.to, label: a.label, sub: a.sub, icon: a.icon, tag: 'Seite' })),
      ...results.hits.map((h) => ({ to: h.to, label: h.title, sub: h.sub, icon: KIND_ICON[h.kind], tag: KIND_LABEL[h.kind] })),
    ],
    [results],
  )

  useEffect(() => setSel(0), [q])

  if (!open) return null

  function go(to: string) {
    setOpen(false)
    nav(to)
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-950/60 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl animate-fade-up dark:border-ink-800 dark:bg-ink-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-ink-100 px-4 dark:border-ink-800">
          <span className="text-ink-400">🔍</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, flat.length - 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
              if (e.key === 'Enter' && flat[sel]) { e.preventDefault(); go(flat[sel].to) }
            }}
            placeholder="Suche Themen, Formeln, Vokabeln, Begriffe oder Seiten …"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-ink-400"
          />
          <kbd className="rounded border border-ink-200 px-1.5 py-0.5 text-[10px] font-bold text-ink-400 dark:border-ink-700">ESC</kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {flat.length === 0 && (
            <div className="p-6 text-center text-sm text-ink-400">
              Nichts gefunden für {'„'}{q}{'“'}.
            </div>
          )}
          {flat.map((item, i) => (
            <button
              key={item.to + i}
              onMouseEnter={() => setSel(i)}
              onClick={() => go(item.to)}
              className={cls(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                i === sel ? 'bg-brand-500/15' : 'hover:bg-ink-50 dark:hover:bg-ink-800/60',
              )}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-100 text-sm dark:bg-ink-800">
                {item.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{item.label}</span>
                <span className="block truncate text-[11px] text-ink-500 dark:text-ink-400">{item.sub}</span>
              </span>
              <span className="shrink-0 text-[10px] font-black uppercase text-ink-300 dark:text-ink-600">{item.tag}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 px-4 py-2 text-[10px] font-semibold text-ink-400 dark:border-ink-800">
          <span>↑↓ navigieren · ⏎ öffnen</span>
          <span>Strg/⌘ + K</span>
        </div>
      </div>
    </div>
  )
}
