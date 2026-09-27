import { useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from '../lib/storage'
import { cls } from '../lib/utils'
import { emit, toast } from '../lib/bus'
import { Ring } from '../components/ui'

type Level = 'leicht' | 'mittel' | 'schwer' | 'profi'

const LEVELS: Record<Level, { label: string; grades: string; make: () => Task }> = {
  leicht: { label: 'Leicht', grades: 'Klasse 5–6', make: () => makeTask(1) },
  mittel: { label: 'Mittel', grades: 'Klasse 6–8', make: () => makeTask(2) },
  schwer: { label: 'Schwer', grades: 'Klasse 8–10', make: () => makeTask(3) },
  profi: { label: 'Profi', grades: 'Oberstufe', make: () => makeTask(4) },
}

interface Task {
  q: string
  a: number
  hint: string
}

const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const pickOne = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

function makeTask(level: number): Task {
  if (level === 1) {
    const kind = pickOne(['+', '-', '·', ':'])
    if (kind === '+') { const a = r(12, 89), b = r(12, 89); return { q: `${a} + ${b}`, a: a + b, hint: 'Erst Zehner, dann Einer addieren.' } }
    if (kind === '-') { const a = r(40, 99), b = r(11, 39); return { q: `${a} − ${b}`, a: a - b, hint: 'Ergänze vom kleineren zum größeren Wert.' } }
    if (kind === '·') { const a = r(3, 12), b = r(3, 12); return { q: `${a} · ${b}`, a: a * b, hint: 'Kleines Einmaleins.' } }
    const b = r(2, 12), res = r(2, 12); return { q: `${b * res} : ${b}`, a: res, hint: 'Division ist die Umkehrung des Malnehmens.' }
  }
  if (level === 2) {
    const kind = pickOne(['·', '%', 'q', ':'])
    if (kind === '·') { const a = r(12, 25), b = r(11, 19); return { q: `${a} · ${b}`, a: a * b, hint: 'Zerlege: a·b = a·10 + a·(b−10).' } }
    if (kind === '%') { const g = r(2, 40) * 10, p = pickOne([5, 10, 20, 25, 50]); return { q: `${p} % von ${g}`, a: (g * p) / 100, hint: '10 % = durch 10 teilen.' } }
    if (kind === 'q') { const a = r(11, 25); return { q: `${a}²`, a: a * a, hint: 'Binomisch: (a±b)² nutzen, z. B. 23² = 20² + 2·20·3 + 3².' } }
    const b = r(3, 9), res = r(11, 30); return { q: `${b * res} : ${b}`, a: res, hint: 'Zerlege den Dividenden in bequeme Summanden.' }
  }
  if (level === 3) {
    const kind = pickOne(['pot', 'wurzel', 'gl', 'neg'])
    if (kind === 'pot') { const a = r(2, 6), b = r(2, 4); return { q: `${a}^${b}`, a: a ** b, hint: 'Schrittweise multiplizieren.' } }
    if (kind === 'wurzel') { const a = r(4, 20); return { q: `√${a * a}`, a, hint: 'Welche Zahl mit sich selbst ergibt das?' } }
    if (kind === 'gl') { const m = r(2, 9), x = r(2, 15), t = r(-20, 20); return { q: `Löse: ${m}x + ${t} = ${m * x + t}  →  x =`, a: x, hint: 'Erst t auf beiden Seiten abziehen, dann durch m teilen.' } }
    const a = r(-30, -5), b = r(-15, 15); return { q: `(${a}) · (${b})`, a: a * b, hint: 'Minus mal Minus ergibt Plus.' }
  }
  const kind = pickOne(['abl', 'log', 'sin', 'proz'])
  if (kind === 'abl') { const a = r(2, 9), e = r(2, 5), x = r(1, 4); return { q: `f(x) = ${a}x^${e} → f'(${x}) =`, a: a * e * x ** (e - 1), hint: 'Potenzregel: Exponent vorziehen, Exponent minus 1.' } }
  if (kind === 'log') { const b = pickOne([2, 3, 5, 10]), e = r(2, 5); return { q: `log_${b}(${b ** e})`, a: e, hint: 'Wie oft muss die Basis multipliziert werden?' } }
  if (kind === 'sin') { const deg = pickOne([0, 30, 90, 180]); const vals: Record<number, number> = { 0: 0, 30: 0.5, 90: 1, 180: 0 }; return { q: `sin(${deg}°) · 2`, a: vals[deg] * 2, hint: 'Merke die Werte am Einheitskreis.' } }
  const g = r(20, 90) * 10, p = r(2, 18); return { q: `${p} % von ${g}`, a: Math.round((g * p) / 100), hint: '1 % berechnen, dann mal p.' }
}

const GAME_SECONDS = 60

export default function Arena() {
  const { store, set, addXp } = useStore()
  const [level, setLevel] = useState<Level>('mittel')
  const [phase, setPhase] = useState<'idle' | 'run' | 'over'>('idle')
  const [task, setTask] = useState<Task>(() => LEVELS.mittel.make())
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [hits, setHits] = useState(0)
  const [miss, setMiss] = useState(0)
  const [left, setLeft] = useState(GAME_SECONDS)
  const [flash, setFlash] = useState<'' | 'ok' | 'bad'>('')
  const [showHint, setShowHint] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const end = useCallback(() => {
    setPhase('over')
  }, [])

  useEffect(() => {
    if (phase !== 'run') return
    const stop = Date.now() + left * 1000
    const id = setInterval(() => {
      const rest = Math.max(0, Math.round((stop - Date.now()) / 1000))
      setLeft(rest)
      if (rest === 0) end()
    }, 200)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'over') return
    const xp = Math.round(score / 4)
    set((s) => {
      s.arena.games += 1
      s.arena.correct += hits
      s.arena.wrong += miss
      if (score > s.arena.best) s.arena.best = score
    })
    if (xp > 0) addXp(xp, 'questions', 'Kopfrechen-Arena')
    if (score > store.arena.best) {
      toast(`Neuer Rekord: ${score} Punkte!`, '🏆', 'good')
      if (store.settings.effects) emit('confetti', { power: 140 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function start() {
    setScore(0); setCombo(0); setMaxCombo(0); setHits(0); setMiss(0)
    setLeft(GAME_SECONDS); setInput(''); setShowHint(false)
    setTask(LEVELS[level].make())
    setPhase('run')
    setTimeout(() => ref.current?.focus(), 30)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (phase !== 'run' || input.trim() === '') return
    const val = Number(input.replace(',', '.'))
    const ok = Math.abs(val - task.a) < 1e-6
    if (ok) {
      const base = { leicht: 8, mittel: 12, schwer: 18, profi: 25 }[level]
      const bonus = Math.min(combo, 10) * 2
      setScore((s) => s + base + bonus)
      setCombo((c) => { const nc = c + 1; setMaxCombo((m) => Math.max(m, nc)); return nc })
      setHits((h) => h + 1)
      setFlash('ok')
    } else {
      setCombo(0)
      setMiss((m) => m + 1)
      setLeft((l) => Math.max(1, l - 3))
      setFlash('bad')
    }
    setShowHint(false)
    setInput('')
    setTask(LEVELS[level].make())
    setTimeout(() => setFlash(''), 220)
  }

  const acc = hits + miss > 0 ? Math.round((hits / (hits + miss)) * 100) : 0
  const allAcc = store.arena.correct + store.arena.wrong > 0
    ? Math.round((store.arena.correct / (store.arena.correct + store.arena.wrong)) * 100)
    : 0

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Kopfrechen-Arena ⚡</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
          60 Sekunden, so viele Aufgaben wie möglich. Jede richtige Antwort in Serie erhöht den Combo-Bonus, jeder
          Fehler kostet 3 Sekunden. Kopfrechnen ist Training – nicht Talent.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Rekord" value={store.arena.best} icon="🏆" />
        <Stat label="Runden" value={store.arena.games} icon="🎮" />
        <Stat label="Richtig gesamt" value={store.arena.correct} icon="✅" />
        <Stat label="Trefferquote" value={`${allAcc} %`} icon="🎯" />
      </div>

      {phase === 'idle' && (
        <section className="card p-6">
          <h2 className="text-lg font-bold">Schwierigkeit wählen</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            {(Object.keys(LEVELS) as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cls(
                  'rounded-xl border p-3 text-left transition',
                  level === l ? 'border-brand-500 bg-brand-500/10' : 'border-ink-200 hover:border-brand-400 dark:border-ink-800',
                )}
              >
                <div className="text-sm font-bold">{LEVELS[l].label}</div>
                <div className="text-[11px] text-ink-500">{LEVELS[l].grades}</div>
              </button>
            ))}
          </div>
          <button className="btn-primary mt-4 w-full sm:w-auto" onClick={start}>
            Runde starten →
          </button>
        </section>
      )}

      {phase === 'run' && (
        <section
          className={cls(
            'card p-6 transition-colors duration-150',
            flash === 'ok' && 'ring-2 ring-emerald-500',
            flash === 'bad' && 'ring-2 ring-rose-500 animate-shake',
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Ring value={(left / GAME_SECONDS) * 100} size={76} tone={left <= 10 ? '#f43f5e' : '#3388fb'}>
              <span className="font-mono text-lg font-black">{left}</span>
            </Ring>
            <div className="text-center">
              <div className="text-3xl font-black tabular-nums">{score}</div>
              <div className="text-[11px] font-bold uppercase text-ink-400">Punkte</div>
            </div>
            <div className="text-center">
              <div className={cls('text-3xl font-black tabular-nums', combo >= 3 && 'text-amber-500')}>×{combo}</div>
              <div className="text-[11px] font-bold uppercase text-ink-400">Combo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black tabular-nums">{acc}%</div>
              <div className="text-[11px] font-bold uppercase text-ink-400">Quote</div>
            </div>
          </div>

          <div className="my-7 text-center">
            <div className="font-mono text-4xl font-black tracking-tight sm:text-5xl">{task.q}</div>
          </div>

          <form onSubmit={submit} className="mx-auto flex max-w-sm gap-2">
            <input
              ref={ref}
              className="input text-center font-mono text-xl"
              inputMode="decimal"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ergebnis"
            />
            <button className="btn-primary" type="submit">OK</button>
          </form>

          <div className="mt-3 text-center">
            {showHint ? (
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-300">💡 {task.hint}</p>
            ) : (
              <button className="text-xs font-bold text-ink-400 hover:text-brand-500" onClick={() => setShowHint(true)}>
                Tipp anzeigen (kostet keine Punkte)
              </button>
            )}
          </div>
        </section>
      )}

      {phase === 'over' && (
        <section className="card p-6 text-center">
          <div className="text-5xl">{score >= store.arena.best ? '🏆' : score > 100 ? '🔥' : '💪'}</div>
          <h2 className="mt-2 text-2xl font-black">{score} Punkte</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {hits} richtig · {miss} falsch · beste Serie ×{maxCombo} · Quote {acc} %
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-600 dark:text-ink-300">
            {acc >= 90
              ? 'Stark! Nimm die nächsthöhere Stufe – Schwierigkeit macht schneller als Wiederholung.'
              : acc >= 70
                ? 'Solide Quote. Arbeite an Tempo: erst Zehner rechnen, dann Einer.'
                : 'Lieber langsamer und richtig: eine falsche Antwort kostet mehr Zeit als drei Sekunden Nachdenken.'}
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <button className="btn-primary" onClick={start}>Nochmal</button>
            <button className="btn-ghost" onClick={() => setPhase('idle')}>Stufe wechseln</button>
          </div>
        </section>
      )}
    </div>
  )
}

function Stat({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-xl font-black tabular-nums">{value}</div>
        <div className="text-[11px] font-bold uppercase text-ink-400">{label}</div>
      </div>
    </div>
  )
}
