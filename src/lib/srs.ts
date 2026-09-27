import type { CardState } from '../types'

/**
 * Leitner-System mit 6 Fächern.
 * Intervalle in Tagen – bewährt für Vokabeln (verteiltes Wiederholen).
 */
export const BOX_INTERVALS = [0, 1, 2, 4, 8, 16, 32]

export function newCardState(): CardState {
  return { box: 1, due: Date.now(), correct: 0, wrong: 0, lapses: 0 }
}

export function review(state: CardState | undefined, quality: 'again' | 'hard' | 'good' | 'easy'): CardState {
  const s = state ? { ...state } : newCardState()
  s.lastSeen = Date.now()
  switch (quality) {
    case 'again':
      s.box = 1
      s.wrong += 1
      s.lapses = (s.lapses ?? 0) + 1
      break
    case 'hard':
      s.box = Math.max(1, s.box - 1)
      s.correct += 1
      break
    case 'good':
      s.box = Math.min(6, s.box + 1)
      s.correct += 1
      break
    case 'easy':
      s.box = Math.min(6, s.box + 2)
      s.correct += 1
      break
  }
  const days = BOX_INTERVALS[s.box] ?? 1
  const jitter = quality === 'again' ? 0 : Math.random() * 0.2 - 0.1
  s.due = Date.now() + Math.max(0.006, days * (1 + jitter)) * 86400000
  if (quality === 'again') s.due = Date.now() + 60_000 // in 1 Minute nochmal
  return s
}

export function isDue(s: CardState | undefined) {
  if (!s) return true
  return s.due <= Date.now()
}

export function masteryOf(s: CardState | undefined) {
  if (!s) return 0
  return Math.min(1, (s.box - 1) / 5)
}

export function dueLabel(s: CardState | undefined) {
  if (!s || s.due <= Date.now()) return 'jetzt fällig'
  const d = Math.ceil((s.due - Date.now()) / 86400000)
  if (d <= 1) return 'morgen'
  return `in ${d} Tagen`
}
