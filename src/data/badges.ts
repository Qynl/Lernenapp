import type { Badge, Store } from '../types'

const pct = (a: number, b: number) => Math.max(0, Math.min(1, a / b))
const readTopics = (s: Store) => Object.values(s.topics).filter((t) => t.read).length
const masteredTopics = (s: Store) => Object.values(s.topics).filter((t) => (t.bestScore ?? 0) >= 0.8).length
const trainedCards = (s: Store) => Object.keys(s.cards).length
const boxedCards = (s: Store) => Object.values(s.cards).filter((c) => c.box >= 5).length
const totalQuestions = (s: Store) => Object.values(s.log).reduce((a, b) => a + b.questions, 0)
const goalDays = (s: Store) => Object.values(s.log).filter((d) => d.xp >= s.dailyGoal).length
const bestNote = (s: Store) => (s.results.length ? Math.min(...s.results.map((r) => r.grade_note)) : 6)
const dailyDone = (s: Store) => Object.keys(s.daily).length

/** Alle Abzeichen der App. `progress` liefert Fortschritt (0..1) und einen Zwischenstand-Text. */
export const BADGES: Badge[] = [
  {
    id: 'start',
    icon: '🌱',
    name: 'Erster Schritt',
    desc: 'Sammle deine ersten 10 XP.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(s.xp, 10), label: `${Math.min(s.xp, 10)}/10 XP` }),
  },
  {
    id: 'streak3',
    icon: '🔥',
    name: 'Dranbleiber',
    desc: 'Lerne 3 Tage in Folge.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(s.streak, 3), label: `${Math.min(s.streak, 3)}/3 Tage` }),
  },
  {
    id: 'streak7',
    icon: '🏃',
    name: 'Wochenheld',
    desc: '7 Tage Streak am Stück.',
    tier: 'silber',
    progress: (s) => ({ value: pct(s.streak, 7), label: `${Math.min(s.streak, 7)}/7 Tage` }),
  },
  {
    id: 'streak30',
    icon: '🗓️',
    name: 'Monatsmarathon',
    desc: '30 Tage ohne Unterbrechung.',
    tier: 'gold',
    progress: (s) => ({ value: pct(s.streak, 30), label: `${Math.min(s.streak, 30)}/30 Tage` }),
  },
  {
    id: 'xp500',
    icon: '⭐',
    name: 'Fleißstern',
    desc: 'Sammle 500 XP.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(s.xp, 500), label: `${Math.min(s.xp, 500)}/500 XP` }),
  },
  {
    id: 'xp2000',
    icon: '💎',
    name: 'Diamantschädel',
    desc: 'Sammle 2 000 XP.',
    tier: 'silber',
    progress: (s) => ({ value: pct(s.xp, 2000), label: `${Math.min(s.xp, 2000)}/2000 XP` }),
  },
  {
    id: 'xp10000',
    icon: '👑',
    name: 'Zehntausender',
    desc: 'Sammle 10 000 XP.',
    tier: 'platin',
    progress: (s) => ({ value: pct(s.xp, 10000), label: `${Math.min(s.xp, 10000)}/10000 XP` }),
  },
  {
    id: 'perfekt',
    icon: '🎯',
    name: 'Volltreffer',
    desc: 'Löse ein Quiz zu 100 %.',
    tier: 'silber',
    progress: (s) => ({ value: s.badges.includes('perfekt') ? 1 : 0, label: s.badges.includes('perfekt') ? 'geschafft' : 'offen' }),
  },
  {
    id: 'themen10',
    icon: '📖',
    name: 'Vielleser',
    desc: 'Arbeite 10 Themen durch.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(readTopics(s), 10), label: `${Math.min(readTopics(s), 10)}/10 Themen` }),
  },
  {
    id: 'themen40',
    icon: '📚',
    name: 'Bücherwurm',
    desc: 'Arbeite 40 Themen durch.',
    tier: 'gold',
    progress: (s) => ({ value: pct(readTopics(s), 40), label: `${Math.min(readTopics(s), 40)}/40 Themen` }),
  },
  {
    id: 'meister20',
    icon: '🧠',
    name: 'Sitzt, passt, wackelt nicht',
    desc: 'Beherrsche 20 Themen mit ≥ 80 %.',
    tier: 'gold',
    progress: (s) => ({ value: pct(masteredTopics(s), 20), label: `${Math.min(masteredTopics(s), 20)}/20 Themen` }),
  },
  {
    id: 'vokabel100',
    icon: '🗂️',
    name: 'Vokabelprofi',
    desc: 'Trainiere 100 verschiedene Karten.',
    tier: 'silber',
    progress: (s) => ({ value: pct(trainedCards(s), 100), label: `${Math.min(trainedCards(s), 100)}/100 Karten` }),
  },
  {
    id: 'vokabel50box',
    icon: '📦',
    name: 'Langzeitgedächtnis',
    desc: 'Bringe 50 Karten in Fach 5 oder 6.',
    tier: 'gold',
    progress: (s) => ({ value: pct(boxedCards(s), 50), label: `${Math.min(boxedCards(s), 50)}/50 Karten` }),
  },
  {
    id: 'fragen500',
    icon: '❓',
    name: 'Fragenfresser',
    desc: 'Beantworte 500 Übungsfragen.',
    tier: 'gold',
    progress: (s) => ({ value: pct(totalQuestions(s), 500), label: `${Math.min(totalQuestions(s), 500)}/500 Fragen` }),
  },
  {
    id: 'test1',
    icon: '📝',
    name: 'Prüfungsreif',
    desc: 'Schreibe deinen ersten Test.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(s.results.length, 1), label: `${Math.min(s.results.length, 1)}/1 Test` }),
  },
  {
    id: 'test10',
    icon: '🏅',
    name: 'Testerprobt',
    desc: 'Schreibe 10 Tests.',
    tier: 'silber',
    progress: (s) => ({ value: pct(s.results.length, 10), label: `${Math.min(s.results.length, 10)}/10 Tests` }),
  },
  {
    id: 'einser',
    icon: '💯',
    name: 'Einserkandidat',
    desc: 'Schreibe einen Test mit Note 1.',
    tier: 'gold',
    progress: (s) => ({ value: bestNote(s) <= 1 ? 1 : 0, label: s.results.length ? `beste Note ${bestNote(s)}` : 'noch kein Test' }),
  },
  {
    id: 'eigen',
    icon: '✍️',
    name: 'Eigeninitiative',
    desc: 'Lege ein eigenes Vokabelpaket an.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(s.decks.length, 1), label: `${Math.min(s.decks.length, 1)}/1 Paket` }),
  },
  {
    id: 'notizen5',
    icon: '🗒️',
    name: 'Mitschreiber',
    desc: 'Schreibe Notizen zu 5 Themen.',
    tier: 'bronze',
    progress: (s) => {
      const n = Object.values(s.notes).filter((x) => x.trim().length > 10).length
      return { value: pct(n, 5), label: `${Math.min(n, 5)}/5 Notizen` }
    },
  },
  {
    id: 'ziel7',
    icon: '🎯',
    name: 'Zielstrebig',
    desc: 'Erreiche an 7 Tagen dein Tagesziel.',
    tier: 'silber',
    progress: (s) => ({ value: pct(goalDays(s), 7), label: `${Math.min(goalDays(s), 7)}/7 Tage` }),
  },
  {
    id: 'planer',
    icon: '📅',
    name: 'Gut geplant',
    desc: 'Lege eine Prüfung im Lernplaner an.',
    tier: 'bronze',
    progress: (s) => ({ value: pct(s.exams.length, 1), label: `${Math.min(s.exams.length, 1)}/1 Termin` }),
  },
  {
    id: 'plan20',
    icon: '✅',
    name: 'Plan erfüllt',
    desc: 'Hake 20 Lernplan-Aufgaben ab.',
    tier: 'silber',
    progress: (s) => {
      const n = s.tasks.filter((t) => t.done).length
      return { value: pct(n, 20), label: `${Math.min(n, 20)}/20 Aufgaben` }
    },
  },
  {
    id: 'arena50',
    icon: '⚡',
    name: 'Blitzrechner',
    desc: 'Erreiche 50 Punkte in der Kopfrechen-Arena.',
    tier: 'silber',
    progress: (s) => ({ value: pct(s.arena.best, 50), label: `Bestwert ${s.arena.best}/50` }),
  },
  {
    id: 'daily7',
    icon: '☀️',
    name: 'Tagesroutine',
    desc: 'Löse das Tagesquiz an 7 Tagen.',
    tier: 'gold',
    progress: (s) => ({ value: pct(dailyDone(s), 7), label: `${Math.min(dailyDone(s), 7)}/7 Tage` }),
  },
  {
    id: 'fokus10',
    icon: '⏳',
    name: 'Tiefenfokus',
    desc: 'Schließe 10 Fokus-Einheiten ab.',
    tier: 'silber',
    progress: (s) => ({ value: pct(s.focus.sessions, 10), label: `${Math.min(s.focus.sessions, 10)}/10 Einheiten` }),
  },
  {
    id: 'allrounder',
    icon: '🌈',
    name: 'Allrounder',
    desc: 'Lerne in 8 verschiedenen Fächern.',
    tier: 'gold',
    progress: (s) => {
      const n = new Set(Object.keys(s.topics).map((id) => id.split('-')[0])).size
      return { value: pct(n, 8), label: `${Math.min(n, 8)}/8 Fächer` }
    },
  },
  {
    id: 'nachteule',
    icon: '🦉',
    name: 'Nachteule',
    desc: 'Lerne nach 22 Uhr.',
    tier: 'bronze',
    progress: (s) => ({ value: s.badges.includes('nachteule') ? 1 : 0, label: s.badges.includes('nachteule') ? 'erledigt' : 'offen' }),
  },
  {
    id: 'fruehaufsteher',
    icon: '🐓',
    name: 'Frühaufsteher',
    desc: 'Lerne vor 7 Uhr morgens.',
    tier: 'bronze',
    progress: (s) => ({ value: s.badges.includes('fruehaufsteher') ? 1 : 0, label: s.badges.includes('fruehaufsteher') ? 'erledigt' : 'offen' }),
  },
]

export const badgeById = Object.fromEntries(BADGES.map((b) => [b.id, b])) as Record<string, Badge>

export const TIER_STYLE: Record<Badge['tier'], string> = {
  bronze: 'from-amber-600/20 to-amber-500/5 border-amber-600/30',
  silber: 'from-slate-400/20 to-slate-300/5 border-slate-400/30',
  gold: 'from-yellow-400/25 to-amber-300/5 border-yellow-500/40',
  platin: 'from-cyan-300/25 to-violet-300/10 border-cyan-400/40',
}

/** Prüft, welche Abzeichen neu verdient wurden (nur solche mit Fortschritt = 1). */
export function newlyEarned(s: Store): Badge[] {
  return BADGES.filter((b) => !s.badges.includes(b.id) && b.progress(s).value >= 1)
}
