/* Rechen-Werkzeuge, die nicht nur Ergebnisse, sondern den Rechenweg liefern. */

export interface Solution {
  steps: string[]
  result: string
  error?: string
}

const n = (x: number, d = 4) => {
  if (!isFinite(x)) return '—'
  const r = Math.round(x * 10 ** d) / 10 ** d
  return String(r).replace('.', ',')
}

/* ----------------------- Quadratische Gleichung ----------------------- */
export function solveQuadratic(a: number, b: number, c: number): Solution {
  if (a === 0) {
    if (b === 0) return { steps: [], result: '', error: 'a und b sind 0 – das ist keine Gleichung mit x.' }
    const x = -c / b
    return {
      steps: [`a = 0 → die Gleichung ist linear: ${n(b)}x + ${n(c)} = 0`, `x = −c / b = ${n(-c)} / ${n(b)}`],
      result: `x = ${n(x)}`,
    }
  }
  const d = b * b - 4 * a * c
  const steps = [
    `Gleichung: ${n(a)}x² + ${n(b)}x + ${n(c)} = 0`,
    `Diskriminante: D = b² − 4ac = ${n(b)}² − 4·${n(a)}·${n(c)} = ${n(d)}`,
  ]
  if (d < 0) {
    steps.push('D < 0 → die Wurzel aus einer negativen Zahl existiert in ℝ nicht.')
    return { steps, result: 'Keine reelle Lösung (L = { })' }
  }
  const w = Math.sqrt(d)
  steps.push(`√D = ${n(w)}`)
  if (d === 0) {
    const x = -b / (2 * a)
    steps.push(`D = 0 → genau eine (doppelte) Lösung: x = −b / (2a) = ${n(-b)} / ${n(2 * a)}`)
    return { steps, result: `x = ${n(x)} (doppelte Nullstelle)` }
  }
  const x1 = (-b + w) / (2 * a)
  const x2 = (-b - w) / (2 * a)
  steps.push(`x₁ = (−b + √D) / (2a) = (${n(-b)} + ${n(w)}) / ${n(2 * a)} = ${n(x1)}`)
  steps.push(`x₂ = (−b − √D) / (2a) = (${n(-b)} − ${n(w)}) / ${n(2 * a)} = ${n(x2)}`)
  steps.push(`Scheitelpunkt: S(${n(-b / (2 * a))} | ${n(c - (b * b) / (4 * a))})`)
  steps.push(`Faktorisiert: ${n(a)}·(x − ${n(x1)})·(x − ${n(x2)}) = 0`)
  return { steps, result: `x₁ = ${n(x1)} ; x₂ = ${n(x2)}` }
}

/* ------------------------------- Brüche ------------------------------- */
function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}

export function solveFraction(a: number, b: number, c: number, d: number, op: '+' | '-' | '*' | ':'): Solution {
  if (b === 0 || d === 0) return { steps: [], result: '', error: 'Ein Nenner darf nicht 0 sein.' }
  const steps: string[] = [`Aufgabe: ${a}/${b} ${op} ${c}/${d}`]
  let z = 0
  let nn = 1
  if (op === '+' || op === '-') {
    const hn = (b * d) / gcd(b, d)
    steps.push(`Hauptnenner: kgV(${b}, ${d}) = ${hn}`)
    const za = a * (hn / b)
    const zc = c * (hn / d)
    steps.push(`Erweitern: ${za}/${hn} ${op} ${zc}/${hn}`)
    z = op === '+' ? za + zc : za - zc
    nn = hn
    steps.push(`Zähler verrechnen: ${z}/${nn}`)
  } else if (op === '*') {
    z = a * c
    nn = b * d
    steps.push(`Zähler mal Zähler, Nenner mal Nenner: (${a}·${c}) / (${b}·${d}) = ${z}/${nn}`)
  } else {
    if (c === 0) return { steps: [], result: '', error: 'Division durch den Bruch 0/x ist nicht möglich.' }
    z = a * d
    nn = b * c
    steps.push(`Mit dem Kehrbruch multiplizieren: ${a}/${b} · ${d}/${c} = ${z}/${nn}`)
  }
  const g = gcd(z, nn)
  if (g > 1) steps.push(`Kürzen mit ${g}: ${z / g}/${nn / g}`)
  z /= g
  nn /= g
  if (nn < 0) {
    z = -z
    nn = -nn
    steps.push('Minuszeichen in den Zähler ziehen')
  }
  const dez = z / nn
  const whole = Math.trunc(z / nn)
  const rest = Math.abs(z % nn)
  let res = `${z}/${nn}`
  if (nn === 1) res = `${z}`
  else if (Math.abs(z) > nn) res += `  =  ${whole} ${rest}/${nn}`
  steps.push(`Als Dezimalzahl: ${n(dez, 6)}`)
  return { steps, result: res }
}

/* ------------------------------ Prozent ------------------------------- */
export function solvePercent(mode: 'value' | 'base' | 'rate', x: number, y: number): Solution {
  if (mode === 'value') {
    return {
      steps: [`Gesucht: Prozentwert P`, `P = G · p% = ${n(x)} · ${n(y)} / 100`, `P = ${n((x * y) / 100)}`],
      result: `${n((x * y) / 100)}`,
    }
  }
  if (mode === 'base') {
    if (y === 0) return { steps: [], result: '', error: 'Der Prozentsatz darf nicht 0 sein.' }
    return {
      steps: [`Gesucht: Grundwert G`, `G = P : p% = ${n(x)} : (${n(y)}/100)`, `G = ${n((x * 100) / y)}`],
      result: `${n((x * 100) / y)}`,
    }
  }
  if (y === 0) return { steps: [], result: '', error: 'Der Grundwert darf nicht 0 sein.' }
  return {
    steps: [`Gesucht: Prozentsatz p%`, `p% = P : G = ${n(x)} : ${n(y)} = ${n(x / y, 6)}`, `In Prozent: · 100`],
    result: `${n((x / y) * 100)} %`,
  }
}

export function solveInterest(k: number, p: number, months: number, compound: boolean): Solution {
  if (compound) {
    const years = months / 12
    const end = k * Math.pow(1 + p / 100, years)
    return {
      steps: [
        `Zinseszins: Kₙ = K₀ · (1 + p%)ⁿ`,
        `n = ${n(months)} Monate = ${n(years)} Jahre`,
        `Kₙ = ${n(k)} · (1 + ${n(p)}/100)^${n(years)}`,
        `Kₙ = ${n(end, 2)}`,
      ],
      result: `Endkapital ${n(end, 2)} €  (Zinsertrag ${n(end - k, 2)} €)`,
    }
  }
  const yearly = (k * p) / 100
  const z = (yearly * months) / 12
  return {
    steps: [`Jahreszinsen: Z = K · p% = ${n(k)} · ${n(p)}/100 = ${n(yearly, 2)} €`, `Anteilig für ${n(months)} Monate: · ${n(months)}/12`, `Z = ${n(z, 2)} €`],
    result: `Zinsen ${n(z, 2)} € · Endkapital ${n(k + z, 2)} €`,
  }
}

/* --------------------------- Zahlentheorie ---------------------------- */
export function solveNumberTheory(a: number, b: number): Solution {
  if (a < 1 || b < 1 || !Number.isInteger(a) || !Number.isInteger(b))
    return { steps: [], result: '', error: 'Bitte zwei natürliche Zahlen ≥ 1 eingeben.' }
  const fa = primeFactors(a)
  const fb = primeFactors(b)
  const g = gcd(a, b)
  const l = (a * b) / g
  return {
    steps: [
      `Primfaktorzerlegung von ${a}: ${fmtFactors(fa)}`,
      `Primfaktorzerlegung von ${b}: ${fmtFactors(fb)}`,
      `ggT = Produkt der gemeinsamen Faktoren (kleinster Exponent) = ${g}`,
      `kgV = a · b / ggT = ${a} · ${b} / ${g} = ${l}`,
      `Gekürzter Bruch: ${a}/${b} = ${a / g}/${b / g}`,
    ],
    result: `ggT(${a}, ${b}) = ${g} · kgV(${a}, ${b}) = ${l}`,
  }
}

export function primeFactors(x: number) {
  const out: number[] = []
  let v = x
  for (let p = 2; p * p <= v; p++) while (v % p === 0) (out.push(p), (v /= p))
  if (v > 1) out.push(v)
  return out
}

function fmtFactors(f: number[]) {
  if (!f.length) return '1'
  const m = new Map<number, number>()
  for (const p of f) m.set(p, (m.get(p) ?? 0) + 1)
  return [...m.entries()].map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(' · ')
}

/* -------------------------- Lineare Funktion -------------------------- */
export function solveLine(x1: number, y1: number, x2: number, y2: number): Solution {
  if (x1 === x2) return { steps: [], result: '', error: 'Die Punkte haben dieselbe x-Koordinate – das ist eine senkrechte Gerade.' }
  const m = (y2 - y1) / (x2 - x1)
  const t = y1 - m * x1
  const zero = -t / m
  return {
    steps: [
      `Steigung: m = (y₂ − y₁)/(x₂ − x₁) = (${n(y2)} − ${n(y1)}) / (${n(x2)} − ${n(x1)}) = ${n(m)}`,
      `y-Achsenabschnitt: t = y₁ − m·x₁ = ${n(y1)} − ${n(m)}·${n(x1)} = ${n(t)}`,
      `Funktionsgleichung aufstellen`,
      m !== 0 ? `Nullstelle: 0 = m·x + t → x = −t/m = ${n(zero)}` : 'Die Gerade ist waagrecht und hat keine Nullstelle (außer t = 0).',
      `Steigungswinkel: α = arctan(m) = ${n((Math.atan(m) * 180) / Math.PI, 2)}°`,
    ],
    result: `f(x) = ${n(m)}x ${t >= 0 ? '+' : '−'} ${n(Math.abs(t))}`,
  }
}

/* ------------------------------ Dreieck ------------------------------- */
export function solveTriangle(a: number, b: number, c: number): Solution {
  const given = [a, b, c].filter((x) => x > 0).length
  if (given < 2) return { steps: [], result: '', error: 'Bitte mindestens zwei Seiten angeben (0 = unbekannt).' }
  const steps: string[] = []
  let A = a
  let B = b
  let C = c
  if (c === 0) {
    C = Math.sqrt(a * a + b * b)
    steps.push(`Hypotenuse gesucht: c = √(a² + b²) = √(${n(a * a)} + ${n(b * b)}) = ${n(C)}`)
  } else if (a === 0) {
    if (c <= b) return { steps: [], result: '', error: 'Die Hypotenuse muss die längste Seite sein.' }
    A = Math.sqrt(c * c - b * b)
    steps.push(`Kathete gesucht: a = √(c² − b²) = √(${n(c * c)} − ${n(b * b)}) = ${n(A)}`)
  } else if (b === 0) {
    if (c <= a) return { steps: [], result: '', error: 'Die Hypotenuse muss die längste Seite sein.' }
    B = Math.sqrt(c * c - a * a)
    steps.push(`Kathete gesucht: b = √(c² − a²) = ${n(B)}`)
  } else {
    steps.push(`Prüfung: a² + b² = ${n(a * a + b * b)} , c² = ${n(c * c)} → ${Math.abs(a * a + b * b - c * c) < 1e-9 ? 'rechtwinklig ✓' : 'nicht rechtwinklig'}`)
  }
  const alpha = (Math.asin(Math.min(1, A / C)) * 180) / Math.PI
  const beta = 90 - alpha
  steps.push(`Winkel α: sin α = a/c = ${n(A)}/${n(C)} → α = ${n(alpha, 2)}°`)
  steps.push(`Winkel β = 90° − α = ${n(beta, 2)}°`)
  steps.push(`Flächeninhalt: A = ½·a·b = ${n((A * B) / 2)}`)
  steps.push(`Umfang: U = a + b + c = ${n(A + B + C)}`)
  return { steps, result: `a = ${n(A)} · b = ${n(B)} · c = ${n(C)} · A = ${n((A * B) / 2)}` }
}

/* ------------------------------ Statistik ----------------------------- */
export function solveStats(input: string): Solution {
  const values = input
    .split(/[\s,;]+/)
    .map((x) => Number(x.replace(',', '.')))
    .filter((x) => !isNaN(x))
  if (values.length < 2) return { steps: [], result: '', error: 'Bitte mindestens zwei Zahlen eingeben (durch Komma oder Leerzeichen getrennt).' }
  const sorted = [...values].sort((x, y) => x - y)
  const sum = values.reduce((p, q) => p + q, 0)
  const mean = sum / values.length
  const mid = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  const variance = values.reduce((p, q) => p + (q - mean) ** 2, 0) / (values.length - 1)
  const sd = Math.sqrt(variance)
  const q1 = quantile(sorted, 0.25)
  const q3 = quantile(sorted, 0.75)
  return {
    steps: [
      `Geordnet: ${sorted.map((v) => n(v, 3)).join(' · ')}`,
      `Anzahl n = ${values.length}, Summe = ${n(sum, 3)}`,
      `Arithmetisches Mittel: x̄ = ${n(sum, 3)} / ${values.length} = ${n(mean, 4)}`,
      `Median = ${n(median, 4)}${sorted.length % 2 ? ' (mittlerer Wert)' : ' (Mittel der beiden mittleren Werte)'}`,
      `Spannweite = ${n(sorted[sorted.length - 1], 3)} − ${n(sorted[0], 3)} = ${n(sorted[sorted.length - 1] - sorted[0], 3)}`,
      `Quartile: Q₁ = ${n(q1, 3)} , Q₃ = ${n(q3, 3)} → Quartilsabstand ${n(q3 - q1, 3)}`,
      `Standardabweichung (Stichprobe): s = ${n(sd, 4)}`,
    ],
    result: `x̄ = ${n(mean, 3)} · Median = ${n(median, 3)} · s = ${n(sd, 3)}`,
  }
}

function quantile(sorted: number[], p: number) {
  const idx = (sorted.length - 1) * p
  const lo = Math.floor(idx)
  const hi = Math.ceil(idx)
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}

/* ------------------------------ Einheiten ----------------------------- */
export const UNIT_GROUPS: Record<string, Record<string, number>> = {
  Länge: { mm: 0.001, cm: 0.01, dm: 0.1, m: 1, km: 1000 },
  Fläche: { 'mm²': 1e-6, 'cm²': 1e-4, 'dm²': 0.01, 'm²': 1, a: 100, ha: 10000, 'km²': 1e6 },
  Volumen: { ml: 1e-6, 'cm³': 1e-6, l: 0.001, 'dm³': 0.001, 'm³': 1 },
  Masse: { mg: 1e-6, g: 0.001, kg: 1, t: 1000 },
  Zeit: { s: 1, min: 60, h: 3600, d: 86400 },
  Energie: { J: 1, kJ: 1000, Wh: 3600, kWh: 3.6e6 },
}

export function convertUnit(group: string, from: string, to: string, value: number): Solution {
  const g = UNIT_GROUPS[group]
  if (!g || !g[from] || !g[to]) return { steps: [], result: '', error: 'Unbekannte Einheit.' }
  const base = value * g[from]
  const out = base / g[to]
  const factor = g[from] / g[to]
  return {
    steps: [
      `Umrechnung ${from} → ${to}`,
      `1 ${from} = ${n(g[from], 9)} (Basiseinheit)`,
      `1 ${to} = ${n(g[to], 9)} (Basiseinheit)`,
      `Faktor = ${n(factor, 9)} → ${n(value, 6)} · ${n(factor, 9)}`,
    ],
    result: `${n(value, 6)} ${from} = ${n(out, 8)} ${to}`,
  }
}
