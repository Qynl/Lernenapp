import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allQuestions, dailySeed, topicById, glossary, formulas } from '../data'
import type { Question } from '../types'
import { useStore } from '../lib/storage'
import { Quiz } from '../components/Quiz'
import { cls, todayISO, fmtDate } from '../lib/utils'
import { emit, toast } from '../lib/bus'
import { SectionTitle } from '../components/ui'

const DAILY_COUNT = 8

/** Deterministischer Zufallsgenerator, damit alle am selben Tag dieselben Fragen bekommen. */
function rng(seed: number) {
  let s = seed || 1
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

function pickDaily<T>(arr: T[], count: number, seed: number): T[] {
  const rand = rng(seed)
  const idx = new Set<number>()
  let guard = 0
  while (idx.size < Math.min(count, arr.length) && guard++ < count * 50) {
    idx.add(Math.floor(rand() * arr.length))
  }
  return [...idx].map((i) => arr[i])
}

export default function Daily() {
  const { store, set, addXp } = useStore()
  const today = todayISO()
  const seed = dailySeed(today)
  const done = store.daily[today]
  const [started, setStarted] = useState(false)

  const questions = useMemo(() => pickDaily<Question>(allQuestions, DAILY_COUNT, seed), [seed])
  const factOfDay = useMemo(() => pickDaily(glossary, 1, seed + 7)[0], [seed])
  const formulaOfDay = useMemo(() => pickDaily(formulas, 1, seed + 13)[0], [seed])
  const topicOfDay = useMemo(() => {
    const q = pickDaily(allQuestions, 1, seed + 21)[0]
    return q ? Object.values(topicById).find((t) => t.questions.some((x) => x.id === q.id)) : undefined
  }, [seed])

  const history = useMemo(() => {
    const days: { date: string; res?: { correct: number; total: number } }[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = d.toISOString().slice(0, 10)
      days.push({ date: iso, res: store.daily[iso] })
    }
    return days
  }, [store.daily])

  const solvedDays = Object.keys(store.daily).length
  const dailyStreak = useMemo(() => {
    let c = 0
    for (let i = 0; ; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = d.toISOString().slice(0, 10)
      if (store.daily[iso]) c++
      else if (i > 0) break
      else continue
    }
    return c
  }, [store.daily])

  function finish(correct: number, total: number) {
    const xp = correct * 15 + (correct === total ? 50 : 0)
    set((s) => {
      s.daily[today] = { correct, total, xp }
    })
    addXp(xp, 'questions', 'Tagesquiz')
    if (correct === total) {
      toast('Perfektes Tagesquiz! +50 Bonus-XP', '🌟', 'good')
      if (store.settings.effects) emit('confetti', { power: 160 })
    } else {
      toast(`Tagesquiz erledigt: ${correct}/${total}`, '📅', 'good')
    }
    setStarted(false)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Tägliche Challenge 📅</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
          Jeden Tag {DAILY_COUNT} gemischte Fragen aus allen Fächern – dieselben für den ganzen Tag. Fünf Minuten
          reichen, und das verteilte Wiederholen bringt nachweislich mehr als stundenlanges Bulimielernen.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <div className="text-[11px] font-bold uppercase text-ink-400">Heute</div>
          <div className="mt-1 text-xl font-black">{fmtDate(today)}</div>
        </div>
        <div className="card p-4">
          <div className="text-[11px] font-bold uppercase text-ink-400">Challenge-Serie</div>
          <div className="mt-1 text-xl font-black">{dailyStreak} Tage 🔥</div>
        </div>
        <div className="card p-4">
          <div className="text-[11px] font-bold uppercase text-ink-400">Insgesamt gelöst</div>
          <div className="mt-1 text-xl font-black">{solvedDays} Challenges</div>
        </div>
      </div>

      {done && !started ? (
        <section className="card p-6 text-center">
          <div className="text-5xl">{done.correct === done.total ? '🌟' : '✅'}</div>
          <h2 className="mt-2 text-xl font-black">
            Heute schon erledigt: {done.correct} / {done.total}
          </h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">+{done.xp} XP · morgen gibt es neue Fragen.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button className="btn-ghost" onClick={() => setStarted(true)}>
              Nochmal üben (ohne Bonus)
            </button>
            <Link to="/test" className="btn-soft">Eigenen Test bauen</Link>
          </div>
        </section>
      ) : started ? (
        <section className="card p-5">
          <Quiz questions={questions} mode="practice" onFinish={finish} />
        </section>
      ) : (
        <section className="card p-6">
          <h2 className="text-lg font-bold">Bereit?</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {DAILY_COUNT} Fragen · ca. 5 Minuten · bis zu {DAILY_COUNT * 15 + 50} XP
          </p>
          <button className="btn-primary mt-4" onClick={() => setStarted(true)}>
            Challenge starten →
          </button>
        </section>
      )}

      <section>
        <SectionTitle hint="letzte 14 Tage">Deine Challenge-Historie</SectionTitle>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {history.map((d) => {
            const pct = d.res ? d.res.correct / d.res.total : -1
            return (
              <div
                key={d.date}
                title={`${fmtDate(d.date)}${d.res ? `: ${d.res.correct}/${d.res.total}` : ': nicht gespielt'}`}
                className={cls(
                  'grid h-10 w-10 place-items-center rounded-lg text-[10px] font-black',
                  pct < 0 && 'bg-ink-100 text-ink-400 dark:bg-ink-800',
                  pct >= 0 && pct < 0.5 && 'bg-rose-500/25 text-rose-700 dark:text-rose-300',
                  pct >= 0.5 && pct < 1 && 'bg-amber-500/25 text-amber-700 dark:text-amber-300',
                  pct === 1 && 'bg-emerald-500/30 text-emerald-700 dark:text-emerald-300',
                )}
              >
                {d.date.slice(8)}
              </div>
            )
          })}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {factOfDay && (
          <article className="card p-5">
            <div className="text-[11px] font-bold uppercase text-ink-400">Begriff des Tages</div>
            <h3 className="mt-1 text-lg font-black">{factOfDay.term}</h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{factOfDay.short}</p>
            <Link to={`/glossar?q=${encodeURIComponent(factOfDay.term)}`} className="mt-3 inline-block text-xs font-bold text-brand-600 dark:text-brand-300">
              Im Glossar ansehen →
            </Link>
          </article>
        )}
        {formulaOfDay && (
          <article className="card p-5">
            <div className="text-[11px] font-bold uppercase text-ink-400">Formel des Tages</div>
            <h3 className="mt-1 text-sm font-black">{formulaOfDay.name}</h3>
            <div className="formula mt-2 text-sm">{formulaOfDay.tex}</div>
            <Link to={`/formeln?q=${encodeURIComponent(formulaOfDay.name)}`} className="mt-3 inline-block text-xs font-bold text-brand-600 dark:text-brand-300">
              Zur Formelsammlung →
            </Link>
          </article>
        )}
        {topicOfDay && (
          <article className="card p-5">
            <div className="text-[11px] font-bold uppercase text-ink-400">Thema des Tages</div>
            <h3 className="mt-1 text-lg font-black">{topicOfDay.title}</h3>
            <p className="mt-1 line-clamp-3 text-sm text-ink-600 dark:text-ink-300">{topicOfDay.teaser}</p>
            <Link to={`/thema/${topicOfDay.id}`} className="mt-3 inline-block text-xs font-bold text-brand-600 dark:text-brand-300">
              Thema öffnen →
            </Link>
          </article>
        )}
      </div>
    </div>
  )
}
