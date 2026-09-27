import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  solveQuadratic,
  solveFraction,
  solvePercent,
  solveInterest,
  solveNumberTheory,
  solveLine,
  solveTriangle,
  solveStats,
  convertUnit,
  UNIT_GROUPS,
  type Solution,
} from '../lib/solvers'
import { cls } from '../lib/utils'
import { SectionTitle } from '../components/ui'

const TOOLS = [
  { id: 'quad', icon: '📈', name: 'Quadratische Gleichung', hint: 'Mitternachtsformel mit Diskriminante & Scheitelpunkt' },
  { id: 'frac', icon: '½', name: 'Bruchrechner', hint: 'Addieren, subtrahieren, multiplizieren, dividieren – mit Hauptnenner' },
  { id: 'perc', icon: '％', name: 'Prozent & Zinsen', hint: 'Grundwert, Prozentwert, Prozentsatz, Zins & Zinseszins' },
  { id: 'num', icon: '🔢', name: 'ggT, kgV & Primfaktoren', hint: 'Zerlegung und Kürzen Schritt für Schritt' },
  { id: 'line', icon: '📐', name: 'Geradengleichung', hint: 'Aus zwei Punkten: m, t, Nullstelle, Steigungswinkel' },
  { id: 'tri', icon: '🔺', name: 'Rechtwinkliges Dreieck', hint: 'Pythagoras, Winkel, Fläche, Umfang' },
  { id: 'stat', icon: '📊', name: 'Statistik', hint: 'Mittelwert, Median, Quartile, Standardabweichung' },
  { id: 'unit', icon: '📏', name: 'Einheiten umrechnen', hint: 'Länge, Fläche, Volumen, Masse, Zeit, Energie' },
] as const

type ToolId = (typeof TOOLS)[number]['id']

export default function Tools() {
  const [tool, setTool] = useState<ToolId>('quad')

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Werkzeugkasten 🧰</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
          Rechner, die nicht nur das Ergebnis ausspucken, sondern den kompletten Rechenweg zeigen – so, wie du ihn in
          der Schulaufgabe aufschreiben würdest.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={cls(
              'shrink-0 rounded-xl border px-3 py-2 text-left text-xs font-bold transition',
              tool === t.id
                ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-300'
                : 'border-ink-200 hover:border-brand-400 dark:border-ink-800',
            )}
          >
            <span className="mr-1.5">{t.icon}</span>
            {t.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-ink-500 dark:text-ink-400">{TOOLS.find((t) => t.id === tool)!.hint}</p>

      {tool === 'quad' && <QuadTool />}
      {tool === 'frac' && <FracTool />}
      {tool === 'perc' && <PercTool />}
      {tool === 'num' && <NumTool />}
      {tool === 'line' && <LineTool />}
      {tool === 'tri' && <TriTool />}
      {tool === 'stat' && <StatTool />}
      {tool === 'unit' && <UnitTool />}

      <section className="card p-5">
        <SectionTitle hint="Warum Rechenweg?">Lerntipp</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          In bayerischen Schulaufgaben gibt es Punkte für den <strong>Ansatz</strong> – oft mehr als für die Zahl am
          Ende. Nutze die Rechner deshalb so: Rechne die Aufgabe erst selbst, vergleiche danach Schritt für Schritt und
          markiere die Zeile, an der dein Weg abgebogen ist. Genau dort liegt die Lücke.
        </p>
      </section>
    </div>
  )
}

/* --------------------------------- UI --------------------------------- */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  )
}

function NumInput({ value, onChange, step = 'any' }: { value: string; onChange: (v: string) => void; step?: string }) {
  return (
    <input className="input" inputMode="decimal" step={step} value={value} onChange={(e) => onChange(e.target.value)} />
  )
}

function Result({ sol }: { sol: Solution }) {
  if (sol.error)
    return (
      <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm font-semibold text-amber-700 dark:text-amber-300">
        ⚠ {sol.error}
      </div>
    )
  if (!sol.steps.length && !sol.result) return null
  return (
    <div className="mt-4 space-y-3">
      <ol className="space-y-1.5">
        {sol.steps.map((s, i) => (
          <li key={i} className="flex gap-2.5 text-sm">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-ink-100 text-[10px] font-black text-ink-500 dark:bg-ink-800 dark:text-ink-400">
              {i + 1}
            </span>
            <span className="font-mono text-[13px] leading-6 text-ink-700 dark:text-ink-200">{s}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-emerald-500/10 px-4 py-3 text-base font-black text-emerald-700 dark:text-emerald-300">
        = {sol.result}
      </div>
    </div>
  )
}

function num(v: string) {
  const x = Number(v.replace(',', '.'))
  return isNaN(x) ? 0 : x
}

/* ------------------------------- Rechner ------------------------------- */

function QuadTool() {
  const [a, setA] = useState('1')
  const [b, setB] = useState('-5')
  const [c, setC] = useState('6')
  const sol = useMemo(() => solveQuadratic(num(a), num(b), num(c)), [a, b, c])
  return (
    <section className="card p-5">
      <div className="font-mono text-sm font-bold text-ink-500">a·x² + b·x + c = 0</div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label="a"><NumInput value={a} onChange={setA} /></Field>
        <Field label="b"><NumInput value={b} onChange={setB} /></Field>
        <Field label="c"><NumInput value={c} onChange={setC} /></Field>
      </div>
      <Result sol={sol} />
    </section>
  )
}

function FracTool() {
  const [a, setA] = useState('3')
  const [b, setB] = useState('4')
  const [c, setC] = useState('5')
  const [d, setD] = useState('6')
  const [op, setOp] = useState<'+' | '-' | '*' | ':'>('+')
  const sol = useMemo(() => solveFraction(num(a), num(b), num(c), num(d), op), [a, b, c, d, op])
  return (
    <section className="card p-5">
      <div className="flex flex-wrap items-center gap-3">
        <FracInput z={a} nn={b} setZ={setA} setN={setB} />
        <div className="flex gap-1">
          {(['+', '-', '*', ':'] as const).map((o) => (
            <button
              key={o}
              onClick={() => setOp(o)}
              className={cls(
                'h-9 w-9 rounded-lg font-black transition',
                op === o ? 'bg-brand-600 text-white' : 'bg-ink-100 dark:bg-ink-800',
              )}
            >
              {o === '*' ? '·' : o}
            </button>
          ))}
        </div>
        <FracInput z={c} nn={d} setZ={setC} setN={setD} />
      </div>
      <Result sol={sol} />
    </section>
  )
}

function FracInput({ z, nn, setZ, setN }: { z: string; nn: string; setZ: (v: string) => void; setN: (v: string) => void }) {
  return (
    <div className="w-20 text-center">
      <input className="input !px-2 text-center" value={z} onChange={(e) => setZ(e.target.value)} />
      <div className="my-1 h-px bg-ink-400" />
      <input className="input !px-2 text-center" value={nn} onChange={(e) => setN(e.target.value)} />
    </div>
  )
}

function PercTool() {
  const [tab, setTab] = useState<'p' | 'z'>('p')
  const [mode, setMode] = useState<'value' | 'base' | 'rate'>('value')
  const [x, setX] = useState('250')
  const [y, setY] = useState('19')
  const [k, setK] = useState('2000')
  const [p, setP] = useState('3,5')
  const [m, setM] = useState('12')
  const [comp, setComp] = useState(false)
  const sol = useMemo(
    () => (tab === 'p' ? solvePercent(mode, num(x), num(y)) : solveInterest(num(k), num(p), num(m), comp)),
    [tab, mode, x, y, k, p, m, comp],
  )
  const labels =
    mode === 'value'
      ? ['Grundwert G', 'Prozentsatz p in %']
      : mode === 'base'
        ? ['Prozentwert P', 'Prozentsatz p in %']
        : ['Prozentwert P', 'Grundwert G']
  return (
    <section className="card p-5">
      <div className="mb-3 flex gap-1.5">
        <button onClick={() => setTab('p')} className={cls('chip', tab === 'p' && '!bg-brand-600 !text-white')}>Prozentrechnung</button>
        <button onClick={() => setTab('z')} className={cls('chip', tab === 'z' && '!bg-brand-600 !text-white')}>Zinsrechnung</button>
      </div>
      {tab === 'p' ? (
        <>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {([['value', 'Prozentwert gesucht'], ['base', 'Grundwert gesucht'], ['rate', 'Prozentsatz gesucht']] as const).map(([k2, l]) => (
              <button key={k2} onClick={() => setMode(k2)} className={cls('chip', mode === k2 && '!bg-ink-900 !text-white dark:!bg-white dark:!text-ink-900')}>
                {l}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={labels[0]}><NumInput value={x} onChange={setX} /></Field>
            <Field label={labels[1]}><NumInput value={y} onChange={setY} /></Field>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Kapital K₀ in €"><NumInput value={k} onChange={setK} /></Field>
            <Field label="Zinssatz p in % p. a."><NumInput value={p} onChange={setP} /></Field>
            <Field label="Laufzeit in Monaten"><NumInput value={m} onChange={setM} /></Field>
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={comp} onChange={(e) => setComp(e.target.checked)} className="h-4 w-4 accent-brand-600" />
            Mit Zinseszins rechnen
          </label>
        </>
      )}
      <Result sol={sol} />
    </section>
  )
}

function NumTool() {
  const [a, setA] = useState('84')
  const [b, setB] = useState('360')
  const sol = useMemo(() => solveNumberTheory(num(a), num(b)), [a, b])
  return (
    <section className="card p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Zahl a"><NumInput value={a} onChange={setA} step="1" /></Field>
        <Field label="Zahl b"><NumInput value={b} onChange={setB} step="1" /></Field>
      </div>
      <Result sol={sol} />
    </section>
  )
}

function LineTool() {
  const [x1, setX1] = useState('1')
  const [y1, setY1] = useState('2')
  const [x2, setX2] = useState('4')
  const [y2, setY2] = useState('11')
  const sol = useMemo(() => solveLine(num(x1), num(y1), num(x2), num(y2)), [x1, y1, x2, y2])
  return (
    <section className="card p-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <Field label="x₁"><NumInput value={x1} onChange={setX1} /></Field>
        <Field label="y₁"><NumInput value={y1} onChange={setY1} /></Field>
        <Field label="x₂"><NumInput value={x2} onChange={setX2} /></Field>
        <Field label="y₂"><NumInput value={y2} onChange={setY2} /></Field>
      </div>
      <Result sol={sol} />
    </section>
  )
}

function TriTool() {
  const [a, setA] = useState('3')
  const [b, setB] = useState('4')
  const [c, setC] = useState('0')
  const sol = useMemo(() => solveTriangle(num(a), num(b), num(c)), [a, b, c])
  return (
    <section className="card p-5">
      <p className="text-xs font-semibold text-ink-500">Unbekannte Seite als 0 eintragen. c ist die Hypotenuse.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label="Kathete a"><NumInput value={a} onChange={setA} /></Field>
        <Field label="Kathete b"><NumInput value={b} onChange={setB} /></Field>
        <Field label="Hypotenuse c"><NumInput value={c} onChange={setC} /></Field>
      </div>
      <Result sol={sol} />
    </section>
  )
}

function StatTool() {
  const [v, setV] = useState('12; 15; 9; 21; 15; 7; 18')
  const sol = useMemo(() => solveStats(v), [v])
  return (
    <section className="card p-5">
      <Field label="Datenreihe (mit Komma, Semikolon oder Leerzeichen trennen)">
        <textarea className="input min-h-[80px]" value={v} onChange={(e) => setV(e.target.value)} />
      </Field>
      <Result sol={sol} />
    </section>
  )
}

function UnitTool() {
  const groups = Object.keys(UNIT_GROUPS)
  const [group, setGroup] = useState(groups[0])
  const units = Object.keys(UNIT_GROUPS[group])
  const [from, setFrom] = useState(units[0])
  const [to, setTo] = useState(units[units.length - 1])
  const [val, setVal] = useState('1')
  const sol = useMemo(() => convertUnit(group, from, to, num(val)), [group, from, to, val])
  return (
    <section className="card p-5">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => {
              const u = Object.keys(UNIT_GROUPS[g])
              setGroup(g)
              setFrom(u[0])
              setTo(u[u.length - 1])
            }}
            className={cls('chip', group === g && '!bg-brand-600 !text-white')}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Wert"><NumInput value={val} onChange={setVal} /></Field>
        <Field label="von">
          <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
            {units.map((u) => <option key={u}>{u}</option>)}
          </select>
        </Field>
        <Field label="nach">
          <select className="input" value={to} onChange={(e) => setTo(e.target.value)}>
            {units.map((u) => <option key={u}>{u}</option>)}
          </select>
        </Field>
      </div>
      <Result sol={sol} />
    </section>
  )
}
