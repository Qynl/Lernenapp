import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Store, TestResult, Deck, Grade } from '../types'
import { todayISO, daysBetween } from './utils'

const KEY = 'lernstoff.store.v1'

export const emptyStore: Store = {
  version: 1,
  profile: { name: '', grade: 8, school: 'Gymnasium (Bayern)', avatar: '🦊' },
  xp: 0,
  streak: 0,
  lastActive: '',
  dailyGoal: 60,
  topics: {},
  cards: {},
  decks: [],
  results: [],
  log: {},
  badges: [],
  favorites: [],
  notes: {},
  theme: 'dark',
  settings: { vocabDirection: 'front-back', typeMode: false, sound: true, strictAccents: false },
}

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...emptyStore }
    const parsed = JSON.parse(raw)
    return { ...emptyStore, ...parsed, settings: { ...emptyStore.settings, ...(parsed.settings ?? {}) } }
  } catch {
    return { ...emptyStore }
  }
}

interface Ctx {
  store: Store
  set: (fn: (s: Store) => void) => void
  addXp: (amount: number, kind?: 'cards' | 'questions' | 'minutes') => void
  reset: () => void
  importJSON: (json: string) => boolean
}

const StoreContext = createContext<Ctx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>(() => load())
  const ref = useRef(store)
  ref.current = store

  /* Persistieren */
  useEffect(() => {
    const t = setTimeout(() => localStorage.setItem(KEY, JSON.stringify(store)), 120)
    return () => clearTimeout(t)
  }, [store])

  /* Theme */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', store.theme === 'dark')
  }, [store.theme])

  /* Streak beim Start prüfen */
  useEffect(() => {
    setStore((s) => {
      const today = todayISO()
      if (!s.lastActive) return { ...s, lastActive: today }
      const diff = daysBetween(s.lastActive, today)
      if (diff >= 2) return { ...s, streak: 0, lastActive: today }
      return s
    })
  }, [])

  const set = useCallback((fn: (s: Store) => void) => {
    setStore((prev) => {
      const next: Store = structuredClone(prev)
      fn(next)
      return next
    })
  }, [])

  const addXp = useCallback(
    (amount: number, kind: 'cards' | 'questions' | 'minutes' = 'questions') => {
      setStore((prev) => {
        const next: Store = structuredClone(prev)
        const today = todayISO()
        next.xp += amount
        const entry = next.log[today] ?? { xp: 0, cards: 0, questions: 0, minutes: 0 }
        entry.xp += amount
        if (kind === 'cards') entry.cards += 1
        if (kind === 'questions') entry.questions += 1
        next.log[today] = entry
        if (next.lastActive !== today) {
          const diff = next.lastActive ? daysBetween(next.lastActive, today) : 99
          next.streak = diff === 1 ? next.streak + 1 : 1
          next.lastActive = today
        } else if (next.streak === 0) {
          next.streak = 1
        }
        return next
      })
    },
    [],
  )

  const reset = useCallback(() => {
    localStorage.removeItem(KEY)
    setStore({ ...emptyStore })
  }, [])

  const importJSON = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json)
      if (typeof parsed !== 'object' || parsed === null) return false
      setStore({ ...emptyStore, ...parsed })
      return true
    } catch {
      return false
    }
  }, [])

  const value = useMemo(() => ({ store, set, addXp, reset, importJSON }), [store, set, addXp, reset, importJSON])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore außerhalb des StoreProvider')
  return ctx
}

/* -------------------------- Hilfsfunktionen ------------------------ */

export function saveResult(set: Ctx['set'], r: TestResult) {
  set((s) => {
    s.results.unshift(r)
    s.results = s.results.slice(0, 80)
  })
}

export function upsertDeck(set: Ctx['set'], deck: Deck) {
  set((s) => {
    const i = s.decks.findIndex((d) => d.id === deck.id)
    if (i >= 0) s.decks[i] = deck
    else s.decks.unshift(deck)
  })
}

export const LEVELS = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000, 6200, 7600, 9200, 11000, 13000, 15500, 18500, 22000,
]

export function levelOf(xp: number) {
  let level = 1
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i]) level = i + 1
  const cur = LEVELS[level - 1] ?? 0
  const next = LEVELS[level] ?? cur + 5000
  return { level, cur, next, pct: Math.min(100, Math.round(((xp - cur) / (next - cur)) * 100)) }
}

export const RANKS = [
  'Neuling',
  'Schulanfänger',
  'Fleißbiene',
  'Heftführer',
  'Formelfuchs',
  'Vokabelheld',
  'Streberlein',
  'Klassenbester',
  'Notenjäger',
  'Einserkandidat',
  'Abi-Aspirant',
  'Wissensmeister',
  'Lernlegende',
]

export function rankOf(level: number) {
  return RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 1.6))]
}

export type { Grade }
