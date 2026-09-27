import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore, levelOf, rankOf } from '../lib/storage'
import { topics, subjects, subjectById, builtinDecks, BADGES, TIER_STYLE } from '../data'
import { masteryOf } from '../lib/srs'
import { todayISO, fmtDate, cls, noteColor } from '../lib/utils'
import { Progress, Ring, SectionTitle, EmptyState } from '../components/ui'


export default function Stats() {
  const { store } = useStore()
  const lvl = levelOf(store.xp)

  const days = useMemo(() => {
    const out: { date: string; xp: number }[] = []
    for (let i = 83; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = todayISO(d)
      out.push({ date: iso, xp: store.log[iso]?.xp ?? 0 })
    }
    return out
  }, [store.log])

  const last7 = days.slice(-7)
  const maxXp = Math.max(30, ...last7.map((d) => d.xp))

  const subjectStats = useMemo(
    () =>
      subjects
        .map((s) => {
          const ts = topics.filter((t) => t.subjectId === s.id)
          const done = ts.filter((t) => (store.topics[t.id]?.bestScore ?? 0) >= 0.8).length
          const read = ts.filter((t) => store.topics[t.id]?.read).length
          return { s, total: ts.length, done, read, pct: ts.length ? (done / ts.length) * 100 : 0 }
        })
        .filter((x) => x.total > 0)
        .sort((a, b) => b.pct - a.pct),
    [store.topics],
  )

  const cardStats = useMemo(() => {
    const all = [...builtinDecks, ...store.decks].flatMap((d) => d.cards)
    const boxes = [0, 0, 0, 0, 0, 0, 0]
    for (const c of all) {
      const st = store.cards[c.id]
      boxes[st?.box ?? 0]++
    }
    const mastered = all.filter((c) => masteryOf(store.cards[c.id]) >= 0.8).length
    return { total: all.length, boxes, mastered }
  }, [store.cards, store.decks])

  const totalQuestions = Object.values(store.log).reduce((a, b) => a + b.questions, 0)
  const totalCards = Object.values(store.log).reduce((a, b) => a + b.cards, 0)
  const avgNote = store.results.length
    ? (store.results.reduce((a, r) => a + r.grade_note, 0) / store.results.length).toFixed(1)
    : '–'

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Dein Fortschritt</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Alles, was du geschafft hast – auf einen Blick.</p>
      </header>

      <section className="card flex flex-wrap items-center gap-6 p-5">
        <Ring value={lvl.pct} size={96} stroke={9}>
          <div className="text-center">
            <div className="text-lg font-black leading-none">{lvl.level}</div>
            <div className="text-[9px] font-bold uppercase text-ink-400">Level</div>
          </div>
        </Ring>
        <div className="min-w-[200px] flex-1">
          <div className="text-lg font-extrabold">{rankOf(lvl.level)}</div>
          <div className="text-sm text-ink-500">
            {store.xp} XP · noch {Math.max(0, lvl.next - store.xp)} XP bis Level {lvl.level + 1}
          </div>
          <Progress value={lvl.pct} className="mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-4">
          <Mini label="Streak" value={`${store.streak} 🔥`} />
          <Mini label="Fragen" value={`${totalQuestions}`} />
          <Mini label="Karten" value={`${totalCards}`} />
          <Mini label="Ø Note" value={avgNote} />
        </div>
      </section>

      <section className="card p-5">
        <SectionTitle hint="letzte 7 Tage">Aktivität</SectionTitle>
        <div className="flex h-36 items-end gap-2">
          {last7.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="text-[10px] font-bold text-ink-400">{d.xp || ''}</div>
              <div
                className={cls(
                  'w-full rounded-t-lg transition-all',
                  d.xp >= store.dailyGoal ? 'bg-emerald-500' : d.xp > 0 ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-800',
                )}
                style={{ height: `${Math.max(4, (d.xp / maxXp) * 100)}%` }}
              />
              <div className="text-[10px] font-semibold text-ink-400">
                {new Date(d.date + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">Letzte 12 Wochen</div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {days.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.xp} XP`}
                className={cls(
                  'h-3 w-3 rounded-[3px]',
                  d.xp === 0
                    ? 'bg-ink-200 dark:bg-ink-800'
                    : d.xp < 30
                      ? 'bg-brand-200 dark:bg-brand-900'
                      : d.xp < 60
                        ? 'bg-brand-400 dark:bg-brand-700'
                        : d.xp < 120
                          ? 'bg-brand-500'
                          : 'bg-emerald-500',
                )}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle hint="Themen mit Quiz ≥ 80 %">Fächer</SectionTitle>
        <div className="card divide-y divide-ink-200 dark:divide-ink-800">
          {subjectStats.map(({ s, total, done, read, pct }) => (
            <Link key={s.id} to={`/fach/${s.id}`} className="flex items-center gap-3 px-4 py-3 transition hover:bg-ink-50 dark:hover:bg-ink-800/40">
              <span className="text-lg">{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-xs text-ink-400">
                    {done}/{total} sicher · {read} gelesen
                  </span>
                </div>
                <Progress value={pct} className="mt-1.5" tone={pct >= 66 ? 'green' : pct >= 33 ? 'amber' : 'brand'} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle hint={`${cardStats.mastered} von ${cardStats.total} sitzen`}>Vokabel-Fächer (Leitner)</SectionTitle>
        <div className="card flex items-end gap-2 p-5">
          {cardStats.boxes.map((n, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="text-[11px] font-bold">{n}</div>
              <div
                className={cls('w-full rounded-t-lg', i === 0 ? 'bg-ink-300 dark:bg-ink-700' : 'bg-gradient-to-t from-brand-600 to-brand-400')}
                style={{ height: `${Math.max(4, (n / Math.max(1, cardStats.total)) * 120)}px` }}
              />
              <div className="text-[10px] text-ink-400">{i === 0 ? 'neu' : `Fach ${i}`}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle hint={`${store.badges.length}/${BADGES.length} freigeschaltet`}>Abzeichen</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[...BADGES]
            .map((b) => ({ b, p: b.progress(store) }))
            .sort((x, y) => (y.p.value >= 1 ? 1 : 0) - (x.p.value >= 1 ? 1 : 0) || y.p.value - x.p.value)
            .map(({ b, p }) => {
              const got = p.value >= 1
              return (
                <div
                  key={b.id}
                  className={cls(
                    'rounded-2xl border bg-gradient-to-br p-4 text-center transition',
                    TIER_STYLE[b.tier],
                    got ? '' : 'opacity-60',
                  )}
                  title={b.desc}
                >
                  <div className={cls('text-3xl', got ? '' : 'grayscale')}>{b.icon}</div>
                  <div className="mt-1.5 text-xs font-black">{b.name}</div>
                  <div className="mt-0.5 text-[10px] leading-tight text-ink-500 dark:text-ink-400">{b.desc}</div>
                  <div className="mt-2">
                    <Progress value={p.value * 100} tone={got ? 'green' : 'brand'} />
                    <div className="mt-1 text-[10px] font-bold text-ink-400">{got ? 'Geschafft ✓' : p.label}</div>
                  </div>
                  <div className="mt-1 text-[9px] font-black uppercase tracking-wider text-ink-400">{b.tier}</div>
                </div>
              )
            })}
        </div>
      </section>

      <section>
        <SectionTitle>Testergebnisse</SectionTitle>
        {store.results.length === 0 ? (
          <EmptyState
            icon="📝"
            title="Noch keine Tests"
            text="Simuliere eine Schulaufgabe und sieh, wo du stehst."
            action={
              <Link to="/test" className="btn-primary">
                Test starten
              </Link>
            }
          />
        ) : (
          <div className="card divide-y divide-ink-200 dark:divide-ink-800">
            {store.results.slice(0, 12).map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                <div className="flex-1">
                  <div className="font-semibold">
                    {r.subjectId === 'alle' ? 'Gemischt' : subjectById[r.subjectId]?.name ?? r.subjectId}
                  </div>
                  <div className="text-xs text-ink-400">
                    {fmtDate(r.date)} · {r.points}/{r.max} Punkte
                  </div>
                </div>
                <span className={cls('text-xl font-extrabold', noteColor(r.grade_note))}>{r.grade_note}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{label}</div>
      <div className="text-base font-extrabold">{value}</div>
    </div>
  )
}
