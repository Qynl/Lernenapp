import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Store, TestResult, Deck, Grade, Exam, PlanTask } from '../types'
import { todayISO, daysBetween } from './utils'
import { emit } from './bus'
import { newlyEarned } from '../data/badges'

const KEY = 'lernstoff.store.v1'

export const emptyStore: Store = {
  version: 2,
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
  exams: [],
  tasks: [],
  arena: { best: 0, games: 0, correct: 0, wrong: 0 },
  daily: {},
  focus: { sessions: 0, minutes: 0 },
  settings: {
    vocabDirection: 'front-back',
    typeMode: false,
    sound: true,
    strictAccents: false,
    effects: true,
    fontSize: 'normal',
    quickTestCount: 10,
  },
}

/** Migriert ältere Stände und füllt fehlende Felder auf. */
export function migrate(parsed: Partial<Store>): Store {
  return {
    ...emptyStore,
    ...parsed,
    version: emptyStore.version,
    profile: { ...emptyStore.profile, ...(parsed.profile ?? {}) },
    arena: { ...emptyStore.arena, ...(parsed.arena ?? {}) },
    focus: { ...emptyStore.focus, ...(parsed.focus ?? {}) },
    daily: parsed.daily ?? {},
    exams: parsed.exams ?? [],
    tasks: parsed.tasks ?? [],
    settings: { ...emptyStore.settings, ...(parsed.settings ?? {}) },
  }
}

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...emptyStore }
    return migrate(JSON.parse(raw))
  } catch {
    return { ...emptyStore }
  }
}

interface Ctx {
  store: Store
  set: (fn: (s: Store) => void) => void
  addXp: (amount: number, kind?: 'cards' | 'questions' | 'minutes', reason?: string) => void
  reset: () => void
  importJSON: (json: string) => boolean
}

const StoreContext = createContext<Ctx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>(() => load())
  const ref = useRef(store)
  ref.current = store

  /* Persistieren (leicht verzögert, damit schnelles Tippen nicht bremst) */
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(store))
      } catch {
        /* Speicher voll – Fortschritt bleibt zumindest in der Sitzung erhalten */
      }
    }, 120)
    return () => clearTimeout(t)
  }, [store])

  /* Theme + Schriftgröße */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', store.theme === 'dark')
  }, [store.theme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('text-sm', 'text-base', 'text-lg')
    root.dataset.fontsize = store.settings.fontSize
  }, [store.settings.fontSize])

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

  /* Abzeichen automatisch verleihen */
  useEffect(() => {
    const earned = newlyEarned(store)
    if (!earned.length) return
    const ids = earned.map((b) => b.id)
    setStore((s) => ({ ...s, badges: [...s.badges, ...ids.filter((i) => !s.badges.includes(i))] }))
    earned.forEach((b, i) => setTimeout(() => emit('badge', { id: b.id, icon: b.icon, name: b.name }), i * 600))
    if (store.settings.effects) emit('confetti', { power: 70 })
  }, [store])

  const set = useCallback((fn: (s: Store) => void) => {
    setStore((prev) => {
      const next: Store = structuredClone(prev)
      fn(next)
      return next
    })
  }, [])

  const addXp = useCallback((amount: number, kind: 'cards' | 'questions' | 'minutes' = 'questions', reason?: string) => {
    setStore((prev) => {
      const next: Store = structuredClone(prev)
      const today = todayISO()
      const beforeLevel = levelOf(next.xp).level
      next.xp += amount
      const entry = next.log[today] ?? { xp: 0, cards: 0, questions: 0, minutes: 0 }
      entry.xp += amount
      if (kind === 'cards') entry.cards += 1
      if (kind === 'questions') entry.questions += 1
      if (kind === 'minutes') entry.minutes += amount
      next.log[today] = entry

      if (next.lastActive !== today) {
        const diff = next.lastActive ? daysBetween(next.lastActive, today) : 99
        next.streak = diff === 1 ? next.streak + 1 : 1
        next.lastActive = today
      } else if (next.streak === 0) {
        next.streak = 1
      }

      /* Tageszeit-Abzeichen */
      const h = new Date().getHours()
      if (h >= 22 && !next.badges.includes('nachteule')) next.badges.push('nachteule')
      if (h < 7 && !next.badges.includes('fruehaufsteher')) next.badges.push('fruehaufsteher')

      const afterLevel = levelOf(next.xp).level
      if (afterLevel > beforeLevel) {
        setTimeout(() => {
          emit('levelup', { level: afterLevel, rank: rankOf(afterLevel) })
          if (next.settings.effects) emit('confetti', { power: 140 })
        }, 250)
      }
      /* Tagesziel gerade erreicht? */
      if (entry.xp >= next.dailyGoal && entry.xp - amount < next.dailyGoal) {
        setTimeout(() => {
          emit('toast', { text: 'Tagesziel erreicht! 🎉', icon: '🏁', tone: 'good' })
          if (next.settings.effects) emit('confetti', { power: 90 })
        }, 400)
      }
      return next
    })
    if (amount > 0) emit('xp', { amount, reason })
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(KEY)
    setStore({ ...emptyStore })
  }, [])

  const importJSON = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json)
      if (typeof parsed !== 'object' || parsed === null) return false
      setStore(migrate(parsed))
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

export function upsertExam(set: Ctx['set'], exam: Exam, tasks: PlanTask[]) {
  set((s) => {
    const i = s.exams.findIndex((e) => e.id === exam.id)
    if (i >= 0) s.exams[i] = exam
    else s.exams.push(exam)
    s.tasks = [...s.tasks.filter((t) => t.examId !== exam.id), ...tasks]
  })
}

export function removeExam(set: Ctx['set'], examId: string) {
  set((s) => {
    s.exams = s.exams.filter((e) => e.id !== examId)
    s.tasks = s.tasks.filter((t) => t.examId !== examId)
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
