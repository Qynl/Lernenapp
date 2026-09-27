import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useStore, levelOf, rankOf } from '../lib/storage'
import { cls } from '../lib/utils'
import { emit } from '../lib/bus'

const navGroups: { title: string; items: { to: string; label: string; icon: string; end?: boolean }[] }[] = [
  {
    title: 'Lernen',
    items: [
      { to: '/', label: 'Übersicht', icon: '🏠', end: true },
      { to: '/faecher', label: 'Fächer', icon: '📚' },
      { to: '/vokabeln', label: 'Vokabeln', icon: '🗂️' },
      { to: '/karteikarten', label: 'Karteikarten', icon: '🎴' },
    ],
  },
  {
    title: 'Üben',
    items: [
      { to: '/test', label: 'Test & Prüfung', icon: '📝' },
      { to: '/taeglich', label: 'Tägliche Challenge', icon: '📅' },
      { to: '/arena', label: 'Kopfrechen-Arena', icon: '⚡' },
    ],
  },
  {
    title: 'Nachschlagen',
    items: [
      { to: '/formeln', label: 'Formelsammlung', icon: '📐' },
      { to: '/glossar', label: 'Glossar', icon: '📖' },
      { to: '/spickzettel', label: 'Spickzettel', icon: '🗒️' },
      { to: '/tools', label: 'Werkzeugkasten', icon: '🧰' },
    ],
  },
  {
    title: 'Organisieren',
    items: [
      { to: '/lernplan', label: 'Lernplan', icon: '🗓️' },
      { to: '/statistik', label: 'Fortschritt', icon: '📈' },
      { to: '/einstellungen', label: 'Einstellungen', icon: '⚙️' },
    ],
  },
]

const mobileNav = [
  { to: '/', label: 'Start', icon: '🏠', end: true },
  { to: '/faecher', label: 'Fächer', icon: '📚' },
  { to: '/taeglich', label: 'Täglich', icon: '📅' },
  { to: '/karteikarten', label: 'Karten', icon: '🎴' },
  { to: '/lernplan', label: 'Plan', icon: '🗓️' },
]

export function Layout({ children }: { children: ReactNode }) {
  const { store, set } = useStore()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const lvl = levelOf(store.xp)

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0 })
  }, [loc.pathname])

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar Desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-none flex-col border-r border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900 lg:flex">
        <Brand />
        <nav className="mt-5 flex-1 space-y-4 overflow-y-auto no-scrollbar">
          {navGroups.map((g) => (
            <div key={g.title}>
              <div className="mb-1 px-3 text-[10px] font-black uppercase tracking-wider text-ink-400">{g.title}</div>
              <div className="space-y-0.5">
                {g.items.map((n) => (
                  <NavItem key={n.to} {...n} />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <LevelCard xp={store.xp} streak={store.streak} lvl={lvl} />
      </aside>

      {/* Hauptbereich */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink-200 bg-white/85 px-4 py-3 backdrop-blur dark:border-ink-800 dark:bg-ink-950/85">
          <button className="btn-ghost !px-2.5 !py-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Menü öffnen">
            ☰
          </button>
          <Link to="/" className="lg:hidden">
            <span className="font-extrabold tracking-tight">Lernstoff</span>
          </Link>

          <button
            onClick={() => emit('palette', undefined)}
            className="ml-auto flex w-full max-w-md items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 px-3 py-2 text-left text-sm text-ink-400 transition hover:border-brand-400 dark:border-ink-800 dark:bg-ink-900"
          >
            <span className="opacity-60">🔍</span>
            <span className="truncate">Suchen: Themen, Formeln, Vokabeln, Begriffe …</span>
            <kbd className="ml-auto hidden shrink-0 rounded border border-ink-300 px-1.5 py-0.5 text-[10px] font-bold dark:border-ink-700 sm:block">
              ⌘K
            </kbd>
          </button>

          <button
            className="btn-ghost !px-2.5 !py-2"
            title="Design wechseln"
            onClick={() => set((s) => void (s.theme = s.theme === 'dark' ? 'light' : 'dark'))}
          >
            {store.theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="hidden items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 sm:flex">
            🔥 {store.streak}
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 lg:pb-10">{children}</main>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-ink-200 bg-white/95 backdrop-blur dark:border-ink-800 dark:bg-ink-950/95 lg:hidden">
          {mobileNav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cls(
                  'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold',
                  isActive ? 'text-brand-600 dark:text-brand-400' : 'text-ink-500',
                )
              }
            >
              <span className="text-lg">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <aside
            className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-4 dark:bg-ink-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Brand />
            <nav className="mt-6 space-y-4">
              {navGroups.map((g) => (
                <div key={g.title}>
                  <div className="mb-1 px-3 text-[10px] font-black uppercase tracking-wider text-ink-400">{g.title}</div>
                  <div className="space-y-0.5">
                    {g.items.map((n) => (
                      <NavItem key={n.to} {...n} />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mt-4">
              <LevelCard xp={store.xp} streak={store.streak} lvl={lvl} />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-lg shadow-lg shadow-brand-500/25">
        🎓
      </div>
      <div className="leading-tight">
        <div className="text-[15px] font-extrabold tracking-tight">Lernstoff</div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Gymnasium Bayern 5–12</div>
      </div>
    </Link>
  )
}

function NavItem({ to, label, icon, end }: { to: string; label: string; icon: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cls(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
          isActive
            ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25'
            : 'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
        )
      }
    >
      <span className="text-base">{icon}</span>
      {label}
    </NavLink>
  )
}

function LevelCard({ xp, streak, lvl }: { xp: number; streak: number; lvl: ReturnType<typeof levelOf> }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-gradient-to-br from-ink-50 to-white p-3.5 dark:border-ink-800 dark:from-ink-800/50 dark:to-ink-900">
      <div className="flex items-center justify-between text-xs font-bold">
        <span>Level {lvl.level}</span>
        <span className="text-amber-600 dark:text-amber-400">🔥 {streak} Tage</span>
      </div>
      <div className="mt-1 text-[11px] text-ink-500">{rankOf(lvl.level)}</div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-200 dark:bg-ink-700">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: `${lvl.pct}%` }} />
      </div>
      <div className="mt-1.5 text-[10px] text-ink-400">
        {xp} XP · noch {Math.max(0, lvl.next - xp)} bis Level {lvl.level + 1}
      </div>
    </div>
  )
}
