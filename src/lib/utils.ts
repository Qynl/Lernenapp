export function todayISO(d = new Date()) {
  const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return x.toISOString().slice(0, 10)
}

export function daysBetween(a: string, b: string) {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

export function cls(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function shuffle<T>(arr: T[], seed?: number): T[] {
  const a = [...arr]
  let random = Math.random
  if (seed !== undefined) {
    let s = seed
    random = () => {
      s = (s * 1664525 + 1013904223) % 4294967296
      return s / 4294967296
    }
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

/** Normalisiert Eingaben für den Vergleich (Groß/Klein, Akzente, Artikel, Satzzeichen) */
export function normalize(s: string, strictAccents = false) {
  let x = s.trim().toLowerCase()
  x = x.replace(/[.!?;:"']/g, '')
  x = x.replace(/\s+/g, ' ')
  if (!strictAccents) {
    x = x.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    x = x.replace(/ß/g, 'ss')
  }
  return x
}

/** Levenshtein-Distanz für „fast richtig“-Feedback */
export function levenshtein(a: string, b: string) {
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[m][n]
}

export function answerMatch(input: string, accepted: string[], strictAccents = false) {
  const ni = normalize(input, strictAccents)
  if (!ni) return 'wrong' as const
  for (const a of accepted) {
    const na = normalize(a, strictAccents)
    if (ni === na) return 'correct' as const
    // Artikel tolerieren: "le chien" vs "chien"
    const stripped = na.replace(/^(le |la |les |l'|un |une |des |der |die |das |the |el |il )/, '')
    const si = ni.replace(/^(le |la |les |l'|un |une |des |der |die |das |the |el |il )/, '')
    if (si === stripped) return 'correct' as const
  }
  for (const a of accepted) {
    const na = normalize(a, strictAccents)
    const d = levenshtein(ni, na)
    if (d <= (na.length > 7 ? 2 : 1)) return 'almost' as const
  }
  return 'wrong' as const
}

export function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function fmtTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Bayerischer Notenschlüssel (Punkte-Prozent -> Note) */
export function noteFromPercent(p: number) {
  if (p >= 0.85) return 1
  if (p >= 0.7) return 2
  if (p >= 0.55) return 3
  if (p >= 0.4) return 4
  if (p >= 0.2) return 5
  return 6
}

/** Oberstufe: Notenpunkte 0–15 */
export function pointsFromPercent(p: number) {
  const table: [number, number][] = [
    [0.95, 15], [0.9, 14], [0.85, 13], [0.8, 12], [0.75, 11], [0.7, 10], [0.65, 9], [0.6, 8],
    [0.55, 7], [0.5, 6], [0.45, 5], [0.4, 4], [0.33, 3], [0.27, 2], [0.2, 1],
  ]
  for (const [th, pts] of table) if (p >= th) return pts
  return 0
}

export function noteColor(note: number) {
  if (note <= 1.5) return 'text-emerald-500'
  if (note <= 2.5) return 'text-lime-500'
  if (note <= 3.5) return 'text-amber-500'
  if (note <= 4.5) return 'text-orange-500'
  return 'text-rose-500'
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-3)}`
}

export function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`
}
