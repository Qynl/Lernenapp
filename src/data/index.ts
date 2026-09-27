import type { Topic, Grade } from '../types'
import { mathe58 } from './topics/mathe-5-8'
import { mathe910 } from './topics/mathe-9-10'
import { mathe1112 } from './topics/mathe-11-12'
import { matheExtra } from './topics/mathe-extra'
import { deutsch } from './topics/deutsch'
import { deutsch2 } from './topics/deutsch-2'
import { sprachen } from './topics/sprachen'
import { sprachen2 } from './topics/sprachen-2'
import { naturwissenschaften } from './topics/naturwissenschaften'
import { gesellschaft } from './topics/gesellschaft'
import { gesellschaft2 } from './topics/gesellschaft-2'
import { informatik } from './topics/informatik'
import { lernen } from './topics/lernen'
import { builtinDecks } from './vocab'
import { formulas } from './formulas'
import { glossary } from './glossary'
import { subjectById } from './subjects'

export const topics: Topic[] = [
  ...mathe58,
  ...mathe910,
  ...mathe1112,
  ...matheExtra,
  ...deutsch,
  ...deutsch2,
  ...sprachen,
  ...sprachen2,
  ...naturwissenschaften,
  ...gesellschaft,
  ...gesellschaft2,
  ...informatik,
  ...lernen,
].sort((a, b) => a.grade - b.grade)

export const topicById = Object.fromEntries(topics.map((t) => [t.id, t])) as Record<string, Topic>

export const topicsBySubject = (subjectId: string) => topics.filter((t) => t.subjectId === subjectId)

export const topicsByGrade = (grade: Grade) => topics.filter((t) => t.grade === grade)

export const abiTopics = topics.filter((t) => t.abi)

export const allTags = [...new Set(topics.flatMap((t) => t.tags))].sort()

export const allQuestions = topics.flatMap((t) =>
  t.questions.map((q) => ({ ...q, topicId: t.id, subjectId: t.subjectId, grade: t.grade })),
)

export type QuestionWithMeta = (typeof allQuestions)[number]

/* ------------------------------ Statistik ----------------------------- */

export const contentStats = {
  subjects: new Set(topics.map((t) => t.subjectId)).size,
  topics: topics.length,
  questions: allQuestions.length,
  cards: builtinDecks.reduce((a, d) => a + d.cards.length, 0),
  decks: builtinDecks.length,
  formulas: formulas.length,
  glossary: glossary.length,
  minutes: topics.reduce((a, t) => a + t.minutes, 0),
}

/* -------------------------- Universelle Suche -------------------------- */

export type SearchHit =
  | { kind: 'topic'; id: string; title: string; sub: string; to: string; score: number; emoji: string }
  | { kind: 'deck'; id: string; title: string; sub: string; to: string; score: number; emoji: string }
  | { kind: 'formula'; id: string; title: string; sub: string; to: string; score: number; emoji: string }
  | { kind: 'glossary'; id: string; title: string; sub: string; to: string; score: number; emoji: string }

function scoreOf(needle: string, title: string, body: string) {
  const t = title.toLowerCase()
  if (t === needle) return 100
  if (t.startsWith(needle)) return 80
  if (t.includes(needle)) return 60
  if (body.toLowerCase().includes(needle)) return 25
  return 0
}

/** Durchsucht Themen, Vokabelpakete, Formeln und Glossar auf einmal. */
export function searchEverything(query: string, limit = 24): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const hits: SearchHit[] = []

  for (const t of topics) {
    const body = `${t.teaser} ${t.tags.join(' ')} ${JSON.stringify(t.blocks)}`
    const score = scoreOf(q, t.title, body)
    if (score)
      hits.push({
        kind: 'topic',
        id: t.id,
        title: t.title,
        sub: `${subjectById[t.subjectId]?.name ?? ''} · ${t.grade}. Klasse`,
        to: `/thema/${t.id}`,
        score: score + (t.abi ? 2 : 0),
        emoji: subjectById[t.subjectId]?.emoji ?? '📘',
      })
  }

  for (const d of builtinDecks) {
    const body = `${d.description ?? ''} ${d.cards.slice(0, 40).map((c) => `${c.front} ${c.back}`).join(' ')}`
    const score = scoreOf(q, d.name, body)
    if (score) hits.push({ kind: 'deck', id: d.id, title: d.name, sub: `${d.cards.length} Karten`, to: `/vokabeln/${d.id}`, score, emoji: '🗂️' })
  }

  for (const f of formulas) {
    const score = scoreOf(q, f.name, `${f.area} ${f.tex} ${f.note ?? ''}`)
    if (score) hits.push({ kind: 'formula', id: f.id, title: f.name, sub: `Formel · ${f.area}`, to: `/formeln?q=${encodeURIComponent(f.name)}`, score, emoji: '📐' })
  }

  for (const e of glossary) {
    const score = scoreOf(q, e.term, `${e.short} ${e.long ?? ''}`)
    if (score) hits.push({ kind: 'glossary', id: e.term, title: e.term, sub: `Glossar · ${e.short.slice(0, 60)}`, to: `/glossar?q=${encodeURIComponent(e.term)}`, score, emoji: '📔' })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}

/** Kompatibilität: reine Themensuche. */
export function searchAll(query: string) {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return [] as Topic[]
  return topics
    .filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.teaser.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.blocks.some((b) => JSON.stringify(b).toLowerCase().includes(q)),
    )
    .slice(0, 25)
}

/** Deterministische Tagesauswahl – jeder Tag liefert dieselben Fragen. */
export function dailySeed(dateISO: string) {
  let h = 0
  for (let i = 0; i < dateISO.length; i++) h = (h * 31 + dateISO.charCodeAt(i)) % 2147483647
  return h
}

export * from './subjects'
export * from './vocab'
export * from './formulas'
export * from './glossary'
export * from './badges'
