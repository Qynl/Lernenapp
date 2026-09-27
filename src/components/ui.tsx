import type { ReactNode } from 'react'
import { cls } from '../lib/utils'

export function Progress({ value, className = '', tone = 'brand' }: { value: number; className?: string; tone?: string }) {
  const tones: Record<string, string> = {
    brand: 'bg-brand-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  }
  return (
    <div className={cls('h-2 w-full overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800', className)}>
      <div
        className={cls('h-full rounded-full transition-all duration-500', tones[tone] ?? tones.brand)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

export function Ring({
  value,
  size = 72,
  stroke = 7,
  children,
  tone = '#3388fb',
}: {
  value: number
  size?: number
  stroke?: number
  children?: ReactNode
  tone?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (Math.max(0, Math.min(100, value)) / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="stroke-ink-200 dark:stroke-ink-800" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          stroke={tone}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">{children}</div>
    </div>
  )
}

export function Chip({ children, tone = 'ink', className = '' }: { children: ReactNode; tone?: string; className?: string }) {
  const tones: Record<string, string> = {
    ink: 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    violet: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  }
  return <span className={cls('chip', tones[tone] ?? tones.ink, className)}>{children}</span>
}

export function EmptyState({ icon, title, text, action }: { icon: string; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-3 p-10 text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="max-w-md text-sm text-ink-500 dark:text-ink-400">{text}</p>
      {action}
    </div>
  )
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-lg font-bold tracking-tight">{children}</h2>
      {hint && <span className="text-xs text-ink-500 dark:text-ink-400">{hint}</span>}
    </div>
  )
}
