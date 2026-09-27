import type { Topic, Grade } from '../types'
import { mathe58 } from './topics/mathe-5-8'
import { mathe910 } from './topics/mathe-9-10'
import { mathe1112 } from './topics/mathe-11-12'
import { deutsch } from './topics/deutsch'
import { sprachen } from './topics/sprachen'
import { naturwissenschaften } from './topics/naturwissenschaften'
import { gesellschaft } from './topics/gesellschaft'

export const topics: Topic[] = [
  ...mathe58,
  ...mathe910,
  ...mathe1112,
  ...deutsch,
  ...sprachen,
  ...naturwissenschaften,
  ...gesellschaft,
]

export const topicById = Object.fromEntries(topics.map((t) => [t.id, t])) as Record<string, Topic>

export const topicsBySubject = (subjectId: string) => topics.filter((t) => t.subjectId === subjectId)

export const topicsByGrade = (grade: Grade) => topics.filter((t) => t.grade === grade)

export const allQuestions = topics.flatMap((t) =>
  t.questions.map((q) => ({ ...q, topicId: t.id, subjectId: t.subjectId, grade: t.grade })),
)

export type QuestionWithMeta = (typeof allQuestions)[number]

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

export * from './subjects'
export * from './vocab'
export * from './formulas'
