/* ------------------------------------------------------------------ *
 *  Datenmodell der Lern-App
 * ------------------------------------------------------------------ */

export type Grade = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Subject {
  id: string
  name: string
  short: string
  emoji: string
  /** Tailwind-Gradient für Karten */
  gradient: string
  accent: string
  grades: Grade[]
  description: string
  /** Sprachfach? -> eigener Vokabelbereich */
  language?: 'fr' | 'en' | 'la' | 'es' | 'it'
}

/* ----------------------------- Inhalte ---------------------------- */

export type Block =
  | { type: 'text'; md: string }
  | { type: 'formula'; tex: string; caption?: string }
  | { type: 'merksatz'; title?: string; md: string }
  | { type: 'warn'; title?: string; md: string }
  | { type: 'example'; title: string; task: string; steps: string[]; result?: string }
  | { type: 'steps'; title?: string; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'list'; title?: string; items: string[]; ordered?: boolean }
  | { type: 'compare'; title?: string; left: { head: string; items: string[] }; right: { head: string; items: string[] } }
  | { type: 'vocabhint'; deckId: string; label?: string }

export type Question =
  | {
      id: string
      type: 'mc'
      q: string
      options: string[]
      answer: number
      explain: string
      hint?: string
    }
  | {
      id: string
      type: 'multi'
      q: string
      options: string[]
      answers: number[]
      explain: string
      hint?: string
    }
  | {
      id: string
      type: 'input'
      q: string
      /** akzeptierte Antworten (normalisiert verglichen) */
      accept: string[]
      explain: string
      hint?: string
      unit?: string
    }
  | {
      id: string
      type: 'truefalse'
      q: string
      answer: boolean
      explain: string
      hint?: string
    }

export interface Topic {
  id: string
  subjectId: string
  grade: Grade
  title: string
  /** Kurzbeschreibung für Karten */
  teaser: string
  /** Lernzeit in Minuten */
  minutes: number
  tags: string[]
  blocks: Block[]
  questions: Question[]
  /** Abiturrelevant? */
  abi?: boolean
}

/* ---------------------------- Vokabeln ---------------------------- */

export interface VocabCard {
  id: string
  front: string // Fremdsprache
  back: string // Deutsch
  hint?: string // z.B. Artikel, Genus, Stammformen
  example?: string
  tags?: string[]
}

export interface Deck {
  id: string
  name: string
  lang: string // 'fr' | 'en' | 'la' | 'es' | ...
  subjectId: string
  grade?: Grade
  description?: string
  cards: VocabCard[]
  custom?: boolean
  createdAt?: number
}

/* --------------------------- Formeln ------------------------------ */

export interface FormulaEntry {
  id: string
  subjectId: string
  area: string
  name: string
  tex: string
  note?: string
  grades: Grade[]
}

/* -------------------------- Fortschritt --------------------------- */

export interface TopicProgress {
  read?: boolean
  bestScore?: number // 0..1
  attempts?: number
  lastSeen?: number
}

export interface CardState {
  box: number // Leitner 1..6
  due: number // timestamp
  correct: number
  wrong: number
  lastSeen?: number
  lapses?: number
}

export interface TestResult {
  id: string
  date: number
  subjectId: string
  grade: Grade | 'mix' | 'alle'
  points: number
  max: number
  grade_note: number
  seconds: number
}

export interface DayLog {
  /** ISO Datum YYYY-MM-DD */
  [date: string]: { xp: number; cards: number; questions: number; minutes: number }
}

export interface Profile {
  name: string
  grade: Grade
  school: string
  avatar: string
}

/* --------------------------- Lernplaner --------------------------- */

export interface Exam {
  id: string
  subjectId: string
  title: string
  /** ISO-Datum YYYY-MM-DD */
  date: string
  topicIds: string[]
  deckIds: string[]
  note?: string
  createdAt: number
}

export interface PlanTask {
  id: string
  examId: string
  date: string
  label: string
  kind: 'read' | 'quiz' | 'vocab' | 'review' | 'test'
  topicId?: string
  deckId?: string
  minutes: number
  done?: boolean
}

/* ---------------------------- Glossar ----------------------------- */

export interface GlossaryEntry {
  term: string
  subjectId: string
  short: string
  long?: string
  synonyms?: string[]
  topicId?: string
}

/* --------------------------- Abzeichen ---------------------------- */

export interface Badge {
  id: string
  icon: string
  name: string
  desc: string
  tier: 'bronze' | 'silber' | 'gold' | 'platin'
  /** Fortschritt 0..1 und Textform */
  progress: (s: Store) => { value: number; label: string }
}

export interface Store {
  version: number
  profile: Profile
  xp: number
  streak: number
  lastActive: string
  dailyGoal: number
  topics: Record<string, TopicProgress>
  cards: Record<string, CardState>
  decks: Deck[] // nur eigene
  results: TestResult[]
  log: DayLog
  badges: string[]
  favorites: string[]
  notes: Record<string, string>
  theme: 'dark' | 'light'
  /** Prüfungstermine des Lernplaners */
  exams: Exam[]
  /** generierte Lernplan-Aufgaben */
  tasks: PlanTask[]
  /** Kopfrechen-Arena */
  arena: { best: number; games: number; correct: number; wrong: number }
  /** Tagesquiz: Datum -> Ergebnis */
  daily: Record<string, { correct: number; total: number; xp: number }>
  /** Fokus-Timer */
  focus: { sessions: number; minutes: number }
  settings: {
    vocabDirection: 'front-back' | 'back-front' | 'mixed'
    typeMode: boolean
    sound: boolean
    strictAccents: boolean
    /** Animationen & Konfetti */
    effects: boolean
    /** Schriftgröße im Lesebereich */
    fontSize: 'klein' | 'normal' | 'gross'
    /** Anzahl Fragen im Schnelltest */
    quickTestCount: number
  }
}
