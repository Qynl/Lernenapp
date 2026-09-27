import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useStore, levelOf, rankOf } from '../lib/storage'
import { topics, subjects, subjectById, builtinDecks } from '../data'
import { isDue } from '../lib/srs'
import { todayISO, shuffle, plural, cls, daysBetween } from '../lib/utils'
import { Progress, Ring, Chip, SectionTitle } from '../components/ui'
import { KIND_META, taskLink } from '../lib/plan'
import type { Grade } from '../types'

const QUICK = [
  { to: '/taeglich', icon: '📅', label: 'Tägliche Challenge', sub: '8 Fragen, jeden Tag neu' },
  { to: '/arena', icon: '⚡', label: 'Kopfrechen-Arena', sub: '60 Sekunden Sprint' },
  { to: '/tools', icon: '🧰', label: 'Werkzeugkasten', sub: 'Rechner mit Rechenweg' },
  { to: '/spickzettel', icon: '🗒️', label: 'Spickzettel', sub: 'Fach auf einer Seite' },
]

const GREETINGS = ['Servus', 'Hallo', 'Hi', 'Grüß dich']

export default function Dashboard() {
  const { store, set } = useStore()
  const lvl = levelOf(store.xp)
  const today = store.log[todayISO()] ?? { xp: 0, cards: 0, questions: 0, minutes: 0 }
  const goalPct = Math.min(100, Math.round((today.xp / store.dailyGoal) * 100))

  const dueCards = useMemo(() => {
    const all = [...builtinDecks, ...store.decks].flatMap((d) => d.cards.map((c) => c.id))
    return all.filter((id) => isDue(store.cards[id])).length
  }, [store.cards, store.decks])

  const myTopics = useMemo(() => topics.filter((t) => t.grade === store.profile.grade), [store.profile.grade])
  const started = useMemo(
    () =>
      Object.entries(store.topics)
        .filter(([, p]) => p.lastSeen)
        .sort((a, b) => (b[1].lastSeen ?? 0) - (a[1].lastSeen ?? 0))
        .slice(0, 3)
        .map(([id]) => topics.find((t) => t.id === id))
        .filter(Boolean),
    [store.topics],
  )
  const suggestions = useMemo(() => {
    const untouched = myTopics.filter((t) => !store.topics[t.id]?.read)
    return shuffle(untouched.length ? untouched : myTopics).slice(0, 4)
  }, [myTopics, store.topics])

  const mastered = Object.values(store.topics).filter((p) => (p.bestScore ?? 0) >= 0.8).length
  const iso = todayISO()
  const dailyDone = store.daily[iso]
  const todayTasks = useMemo(() => store.tasks.filter((t) => t.date <= iso && !t.done), [store.tasks, iso])
  const nextExam = useMemo(
    () => [...store.exams].filter((e) => daysBetween(iso, e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))[0],
    [store.exams, iso],
  )
  const greeting = GREETINGS[new Date().getDay() % GREETINGS.length]

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 p-6 text-white shadow-xl shadow-brand-900/20 sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-brand-300/20 blur-2xl" />
        <div className="relative flex flex-wrap items-center gap-6">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-brand-100">
              {greeting}
              {store.profile.name ? `, ${store.profile.name}` : ''} 👋
            </p>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">
              {today.xp === 0 ? 'Bereit für heute?' : goalPct >= 100 ? 'Tagesziel geschafft! 🎉' : 'Weiter so – du bist dran!'}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-brand-100">
              {dueCards > 0
                ? `${plural(dueCards, 'Vokabel ist', 'Vokabeln sind')} zur Wiederholung fällig. 5 Minuten reichen schon.`
                : 'Alle Vokabeln sind aktuell. Schnapp dir ein neues Thema oder mach einen Übungstest.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/karteikarten" className="btn bg-white text-brand-700 hover:bg-brand-50">
                ⚡ Jetzt {dueCards > 0 ? `${dueCards} Karten` : 'trainieren'}
              </Link>
              <Link to="/test" className="btn bg-white/15 text-white ring-1 ring-inset ring-white/25 hover:bg-white/25">
                📝 Test simulieren
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <Ring value={goalPct} size={92} stroke={9} tone="#ffffff">
                <span className="text-white">{goalPct}%</span>
              </Ring>
              <div className="mt-1 text-[11px] font-semibold text-brand-100">
                {today.xp} / {store.dailyGoal} XP heute
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistikkacheln */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon="🔥" label="Streak" value={`${store.streak}`} sub={store.streak === 1 ? 'Tag' : 'Tage in Folge'} />
        <Stat icon="⭐" label="Level" value={`${lvl.level}`} sub={rankOf(lvl.level)} />
        <Stat icon="🧠" label="Themen sicher" value={`${mastered}`} sub={`von ${topics.length}`} />
        <Stat icon="🗂️" label="Fällige Karten" value={`${dueCards}`} sub="zur Wiederholung" />
      </section>

      {/* Heute zu tun */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <SectionTitle hint={todayTasks.length ? `${todayTasks.length} offen` : 'alles erledigt'}>
            Heute auf dem Plan
          </SectionTitle>
          {todayTasks.length === 0 ? (
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              {store.exams.length === 0
                ? 'Noch kein Prüfungstermin eingetragen. Der Lernplaner verteilt den Stoff automatisch auf die Tage bis zur Schulaufgabe.'
                : 'Alle Aufgaben für heute sind abgehakt. Stark! 🎉'}
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {todayTasks.slice(0, 5).map((t) => {
                const m = KIND_META[t.kind]
                return (
                  <li key={t.id}>
                    <Link
                      to={taskLink(t)}
                      className="flex items-center gap-3 rounded-xl border border-ink-200 px-3 py-2 transition hover:border-brand-400 dark:border-ink-800"
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold">{t.label}</span>
                        <span className="block text-[11px] text-ink-500">{m.label} · ca. {t.minutes} Min</span>
                      </span>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-300">Los →</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          <Link to="/lernplan" className="mt-3 inline-block text-xs font-bold text-brand-600 dark:text-brand-300">
            Lernplaner öffnen →
          </Link>
        </div>

        <div className="space-y-4">
          <Link
            to="/taeglich"
            className={cls(
              'card card-hover block p-5',
              dailyDone && 'ring-1 ring-emerald-500/40',
            )}
          >
            <div className="text-2xl">{dailyDone ? '✅' : '📅'}</div>
            <div className="mt-1 text-sm font-black">Tägliche Challenge</div>
            <div className="text-[11px] text-ink-500">
              {dailyDone ? `Heute: ${dailyDone.correct}/${dailyDone.total} richtig` : 'Heute noch offen – 5 Minuten'}
            </div>
          </Link>
          {nextExam ? (
            <Link to="/lernplan" className="card card-hover block p-5">
              <div className="text-[10px] font-black uppercase text-ink-400">Nächste Prüfung</div>
              <div className="mt-0.5 text-sm font-black">{nextExam.title}</div>
              <div className="mt-1 text-2xl font-black text-brand-600 dark:text-brand-300">
                {daysBetween(iso, nextExam.date) === 0
                  ? 'Heute!'
                  : `noch ${daysBetween(iso, nextExam.date)} Tage`}
              </div>
            </Link>
          ) : (
            <Link to="/lernplan" className="card card-hover block p-5">
              <div className="text-2xl">🗓️</div>
              <div className="mt-1 text-sm font-black">Schulaufgabe eintragen</div>
              <div className="text-[11px] text-ink-500">Wir bauen dir automatisch einen Lernplan.</div>
            </Link>
          )}
        </div>
      </section>

      {/* Schnellzugriff */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {QUICK.map((q) => (
          <Link key={q.to} to={q.to} className="card card-hover flex items-center gap-3 p-4">
            <span className="text-2xl">{q.icon}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">{q.label}</span>
              <span className="block truncate text-[11px] text-ink-500">{q.sub}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* Klassenstufe */}
      <section className="card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold">Meine Jahrgangsstufe:</span>
          <div className="flex flex-wrap gap-1.5">
            {([5, 6, 7, 8, 9, 10, 11, 12] as Grade[]).map((g) => (
              <button
                key={g}
                onClick={() => set((s) => void (s.profile.grade = g))}
                className={
                  store.profile.grade === g
                    ? 'h-9 w-9 rounded-xl bg-brand-600 text-sm font-bold text-white'
                    : 'h-9 w-9 rounded-xl bg-ink-100 text-sm font-bold text-ink-600 transition hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
                }
              >
                {g}
              </button>
            ))}
          </div>
          <span className="text-xs text-ink-500">
            {myTopics.length} Themen für die {store.profile.grade}. Klasse
          </span>
        </div>
      </section>

      {/* Weitermachen */}
      {started.length > 0 && (
        <section>
          <SectionTitle hint="Zuletzt angesehen">Weitermachen</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-3">
            {started.map((t) => {
              const s = subjectById[t!.subjectId]
              const p = store.topics[t!.id]
              return (
                <Link key={t!.id} to={`/thema/${t!.id}`} className="card card-hover p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink-500">
                    <span>{s?.emoji}</span> {s?.name} · {t!.grade}. Kl.
                  </div>
                  <h3 className="mt-1.5 text-sm font-bold leading-snug">{t!.title}</h3>
                  <Progress value={(p?.bestScore ?? 0) * 100} className="mt-3" tone="green" />
                  <div className="mt-1.5 text-[11px] text-ink-500">
                    {p?.bestScore ? `Bestes Quiz: ${Math.round(p.bestScore * 100)} %` : 'Noch kein Quiz gemacht'}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Empfehlungen */}
      <section>
        <SectionTitle hint={`für die ${store.profile.grade}. Klasse`}>Für dich empfohlen</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {suggestions.map((t) => {
            const s = subjectById[t.subjectId]
            return (
              <Link key={t.id} to={`/thema/${t.id}`} className="card card-hover flex gap-3 p-4">
                <div
                  className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br text-xl ${s?.gradient}`}
                >
                  {s?.emoji}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="text-sm font-bold">{t.title}</h3>
                    {t.abi && <Chip tone="rose">Abi</Chip>}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink-500 dark:text-ink-400">{t.teaser}</p>
                  <div className="mt-1.5 text-[11px] font-semibold text-ink-400">
                    {s?.name} · ⏱ {t.minutes} Min · {t.questions.length} Fragen
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Merkliste */}
      {store.favorites.length > 0 && (
        <section>
          <SectionTitle hint="mit ☆ markiert">Deine Merkliste</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {store.favorites.map((fid) => {
              const t = topics.find((x) => x.id === fid)
              if (!t) return null
              return (
                <Link
                  key={fid}
                  to={`/thema/${fid}`}
                  className="card card-hover flex items-center gap-2 px-3.5 py-2 text-xs font-semibold"
                >
                  <span>{subjectById[t.subjectId]?.emoji}</span>
                  {t.title}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Fächer-Schnellzugriff */}
      <section>
        <SectionTitle hint={`${subjects.length} Fächer`}>Alle Fächer</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((s) => (
            <Link
              key={s.id}
              to={`/fach/${s.id}`}
              className="card card-hover group flex flex-col items-start gap-2 overflow-hidden p-4"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg ${s.gradient}`}>
                {s.emoji}
              </div>
              <div className="text-sm font-bold">{s.name}</div>
              <div className="text-[11px] text-ink-500">
                {topics.filter((t) => t.subjectId === s.id).length} Themen
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function Stat({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-400">
        <span className="text-base">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-extrabold">{value}</div>
      <div className="text-[11px] text-ink-500">{sub}</div>
    </div>
  )
}
