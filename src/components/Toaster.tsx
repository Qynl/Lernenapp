import { useEffect, useState } from 'react'
import { on } from '../lib/bus'
import { cls } from '../lib/utils'

interface Item {
  id: number
  text: string
  icon: string
  tone: 'info' | 'good' | 'bad' | 'xp' | 'level'
  big?: boolean
}

let counter = 0

export function Toaster() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const push = (it: Omit<Item, 'id'>) => {
      const id = ++counter
      setItems((x) => [...x.slice(-4), { ...it, id }])
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), it.big ? 4200 : 2400)
    }
    const offs = [
      on('xp', ({ amount, reason }) => push({ text: reason ? `+${amount} XP · ${reason}` : `+${amount} XP`, icon: '⚡', tone: 'xp' })),
      on('toast', ({ text, icon, tone }) => push({ text, icon: icon ?? '✨', tone: tone ?? 'info' })),
      on('levelup', ({ level, rank }) => push({ text: `Level ${level} erreicht – ${rank}!`, icon: '🎉', tone: 'level', big: true })),
      on('badge', ({ icon, name }) => push({ text: `Abzeichen freigeschaltet: ${name}`, icon, tone: 'good', big: true })),
    ]
    return () => offs.forEach((f) => f())
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2 lg:bottom-6">
      {items.map((i) => (
        <div
          key={i.id}
          className={cls(
            'animate-pop flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-sm font-bold shadow-xl backdrop-blur',
            i.tone === 'xp' && 'border-brand-300 bg-brand-50/95 text-brand-800 dark:border-brand-500/40 dark:bg-brand-950/90 dark:text-brand-200',
            i.tone === 'good' && 'border-emerald-300 bg-emerald-50/95 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/90 dark:text-emerald-200',
            i.tone === 'bad' && 'border-rose-300 bg-rose-50/95 text-rose-800 dark:border-rose-500/40 dark:bg-rose-950/90 dark:text-rose-200',
            i.tone === 'level' && 'border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-900 dark:border-amber-500/40 dark:from-amber-900/80 dark:to-yellow-900/70 dark:text-amber-100',
            i.tone === 'info' && 'border-ink-200 bg-white/95 text-ink-700 dark:border-ink-700 dark:bg-ink-900/95 dark:text-ink-200',
            i.big && 'text-base',
          )}
        >
          <span className={cls(i.big ? 'text-2xl' : 'text-lg')}>{i.icon}</span>
          {i.text}
        </div>
      ))}
    </div>
  )
}
