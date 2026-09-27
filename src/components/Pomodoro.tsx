import { useEffect, useRef, useState } from 'react'
import { useStore } from '../lib/storage'
import { cls } from '../lib/utils'
import { Ring } from './ui'
import { emit, toast } from '../lib/bus'

const MODES = {
  focus: { label: 'Fokus', minutes: 25, tone: '#3388fb' },
  short: { label: 'Kurze Pause', minutes: 5, tone: '#10b981' },
  long: { label: 'Lange Pause', minutes: 20, tone: '#a855f7' },
} as const

type Mode = keyof typeof MODES

/** Fokus-Timer nach der Pomodoro-Technik – zählt abgeschlossene Einheiten mit. */
export function Pomodoro() {
  const { store, set, addXp } = useStore()
  const [mode, setMode] = useState<Mode>('focus')
  const [left, setLeft] = useState(MODES.focus.minutes * 60)
  const [running, setRunning] = useState(false)
  const endRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    endRef.current = Date.now() + left * 1000
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round(((endRef.current ?? 0) - Date.now()) / 1000))
      setLeft(remaining)
      if (remaining === 0) {
        setRunning(false)
        finish()
      }
    }, 250)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  function finish() {
    if (mode === 'focus') {
      set((s) => {
        s.focus.sessions += 1
        s.focus.minutes += MODES.focus.minutes
      })
      addXp(20, 'minutes', 'Fokus-Einheit')
      toast('Fokus-Einheit geschafft – Pause verdient!', '⏳', 'good')
      if (store.settings.effects) emit('confetti', { power: 60 })
      switchTo(store.focus.sessions > 0 && (store.focus.sessions + 1) % 4 === 0 ? 'long' : 'short')
    } else {
      toast('Pause vorbei – weiter geht\'s!', '⚡')
      switchTo('focus')
    }
  }

  function switchTo(m: Mode) {
    setMode(m)
    setLeft(MODES[m].minutes * 60)
    setRunning(false)
  }

  const total = MODES[mode].minutes * 60
  const pct = ((total - left) / total) * 100
  const mm = Math.floor(left / 60)
  const ss = left % 60

  return (
    <section className="card flex flex-wrap items-center gap-5 p-5">
      <Ring value={pct} size={104} stroke={9} tone={MODES[mode].tone}>
        <div className="text-center">
          <div className="font-mono text-lg font-black leading-none">
            {mm}:{String(ss).padStart(2, '0')}
          </div>
          <div className="text-[9px] font-bold uppercase text-ink-400">{MODES[mode].label}</div>
        </div>
      </Ring>

      <div className="min-w-[220px] flex-1">
        <h3 className="text-base font-bold">Fokus-Timer</h3>
        <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
          25 Minuten konzentriert, 5 Minuten Pause. Handy weglegen – nach vier Einheiten gibt es eine lange Pause.
        </p>
        <div className="mt-2 text-xs font-semibold text-ink-400">
          Bisher {store.focus.sessions} Einheiten · {store.focus.minutes} Minuten Fokuszeit
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-1.5">
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchTo(m)}
              className={cls(
                'rounded-lg px-2.5 py-1 text-[11px] font-bold transition',
                mode === m ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
              )}
            >
              {MODES[m].label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="btn-primary !px-4" onClick={() => setRunning((r) => !r)}>
            {running ? '⏸ Pause' : '▶ Start'}
          </button>
          <button className="btn-ghost !px-3" onClick={() => switchTo(mode)}>
            ↺
          </button>
        </div>
      </div>
    </section>
  )
}
