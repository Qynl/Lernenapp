import type { Exam, PlanTask, Topic } from '../types'
import { topicById, deckById } from '../data'
import { todayISO, daysBetween, uid } from './utils'

/** Alle Tage (ISO) von heute bis einschließlich Prüfungstag − 1. */
export function daysUntil(dateISO: string) {
  const today = todayISO()
  const n = daysBetween(today, dateISO)
  const out: string[] = []
  for (let i = 0; i < Math.max(0, n); i++) {
    const d = new Date(today + 'T00:00:00')
    d.setDate(d.getDate() + i)
    out.push(todayISO(d))
  }
  return out
}

/**
 * Erzeugt einen Lernplan nach dem Prinzip „erst verstehen, dann üben, dann wiederholen":
 * Die verfügbare Zeit wird in drei Phasen geteilt.
 */
export function buildPlan(exam: Exam): PlanTask[] {
  const days = daysUntil(exam.date)
  if (!days.length) return []

  const topics = exam.topicIds.map((id) => topicById[id]).filter(Boolean) as Topic[]
  const decks = exam.deckIds.map((id) => deckById[id]).filter(Boolean)

  type Draft = Omit<PlanTask, 'id' | 'date' | 'examId'>
  const queue: Draft[] = []

  /* Phase 1 – Durcharbeiten */
  for (const t of topics) queue.push({ kind: 'read', label: `„${t.title}" durcharbeiten`, topicId: t.id, minutes: t.minutes })
  /* Phase 2 – Üben */
  for (const t of topics) queue.push({ kind: 'quiz', label: `Übungsfragen zu „${t.title}"`, topicId: t.id, minutes: 10 })
  /* Vokabeln laufend */
  for (const d of decks) {
    queue.push({ kind: 'vocab', label: `Vokabeln: ${d.name}`, deckId: d.id, minutes: 15 })
    queue.push({ kind: 'vocab', label: `Vokabeln wiederholen: ${d.name}`, deckId: d.id, minutes: 10 })
  }
  /* Phase 3 – Wiederholen */
  for (const t of topics) queue.push({ kind: 'review', label: `Wiederholung: „${t.title}"`, topicId: t.id, minutes: 8 })
  /* Generalprobe */
  queue.push({ kind: 'test', label: 'Probetest unter Zeitdruck schreiben', minutes: 25 })

  /* gleichmäßig auf die Tage verteilen, letzter Tag bleibt für Wiederholung frei(er) */
  const perDay = Math.max(1, Math.ceil(queue.length / days.length))
  const tasks: PlanTask[] = []
  queue.forEach((d, i) => {
    const day = days[Math.min(days.length - 1, Math.floor(i / perDay))]
    tasks.push({ ...d, id: uid('task'), examId: exam.id, date: day })
  })
  return tasks
}

export const KIND_META: Record<PlanTask['kind'], { icon: string; label: string; tone: string }> = {
  read: { icon: '📖', label: 'Lesen', tone: 'text-blue-600 dark:text-blue-400' },
  quiz: { icon: '❓', label: 'Üben', tone: 'text-violet-600 dark:text-violet-400' },
  vocab: { icon: '🗂️', label: 'Vokabeln', tone: 'text-amber-600 dark:text-amber-400' },
  review: { icon: '🔁', label: 'Wiederholen', tone: 'text-emerald-600 dark:text-emerald-400' },
  test: { icon: '📝', label: 'Probetest', tone: 'text-rose-600 dark:text-rose-400' },
}

export function taskLink(t: PlanTask) {
  if (t.kind === 'vocab' && t.deckId) return `/karteikarten?deck=${t.deckId}`
  if (t.kind === 'test') return '/test'
  if (t.topicId) return `/thema/${t.topicId}`
  return '/faecher'
}
