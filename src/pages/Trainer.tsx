import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { builtinDecks } from '../data'
import { useStore } from '../lib/storage'
import { isDue, review, dueLabel, masteryOf } from '../lib/srs'
import { answerMatch, cls, shuffle } from '../lib/utils'
import { Chip, Progress } from '../components/ui'
import type { Deck, VocabCard } from '../types'

type Mode = 'flip' | 'type' | 'choice'
type Dir = 'front-back' | 'back-front' | 'mixed'

export default function Trainer() {
  const { store, set, addXp } = useStore()
  const [params, setParams] = useSearchParams()
  const deckParam = params.get('deck') ?? 'alle'
  const [mode, setMode] = useState<Mode>((params.get('mode') as Mode) ?? 'flip')
  const [dir, setDir] = useState<Dir>(store.settings.vocabDirection)
  const [onlyDue, setOnlyDue] = useState(true)
  const [running, setRunning] = useState(false)

  const allDecks: Deck[] = useMemo(() => [...store.decks, ...builtinDecks], [store.decks])
  const pool = useMemo(() => {
    const decks = deckParam === 'alle' ? allDecks : allDecks.filter((d) => d.id === deckParam)
    const cards = decks.flatMap((d) => d.cards.map((c) => ({ card: c, deck: d })))
    return onlyDue ? cards.filter(({ card }) => isDue(store.cards[card.id])) : cards
  }, [allDecks, deckParam, onlyDue, store.cards])

  const [queue, setQueue] = useState<{ card: VocabCard; deck: Deck }[]>([])
  const [pos, setPos] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'correct' | 'almost' | 'wrong' | null>(null)
  const [choices, setChoices] = useState<string[]>([])
  const [picked, setPicked] = useState<string | null>(null)
  const [session, setSession] = useState({ right: 0, wrong: 0 })

  const current = queue[pos]
  const reversed = dir === 'back-front' || (dir === 'mixed' && pos % 2 === 1)
  const question = current ? (reversed ? current.card.back : current.card.front) : ''
  const solution = current ? (reversed ? current.card.front : current.card.back) : ''

  useEffect(() => {
    if (running && current && mode === 'choice') {
      const others = shuffle(
        allDecks
          .flatMap((d) => d.cards)
          .filter((c) => c.id !== current.card.id)
          .map((c) => (reversed ? c.front : c.back)),
      ).slice(0, 3)
      setChoices(shuffle([solution, ...others]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, running, mode])

  function start() {
    const q = shuffle(pool).slice(0, 40)
    if (!q.length) return
    setQueue(q)
    setPos(0)
    setRevealed(false)
    setInput('')
    setResult(null)
    setPicked(null)
    setSession({ right: 0, wrong: 0 })
    setRunning(true)
  }

  function grade(q: 'again' | 'hard' | 'good' | 'easy') {
    if (!current) return
    const id = current.card.id
    set((s) => void (s.cards[id] = review(s.cards[id], q)))
    addXp(q === 'again' ? 2 : 8, 'cards')
    setSession((x) => (q === 'again' ? { ...x, wrong: x.wrong + 1 } : { ...x, right: x.right + 1 }))
    // „Nochmal" hängt die Karte hinten an
    if (q === 'again') setQueue((x) => [...x, current])
    setPos((p) => p + 1)
    setRevealed(false)
    setInput('')
    setResult(null)
    setPicked(null)
  }

  function checkTyped() {
    if (!current) return
    const r = answerMatch(input, [solution], store.settings.strictAccents)
    setResult(r)
    setRevealed(true)
  }

  /* --------------------------- Setup-Ansicht --------------------------- */
  if (!running) {
    const deckName = deckParam === 'alle' ? 'Alle Pakete' : allDecks.find((d) => d.id === deckParam)?.name
    const dueCount = pool.length
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight">Karteikarten-Training</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
            Verteiltes Wiederholen nach dem Leitner-Prinzip: Jede Karte wandert bei richtiger Antwort ein Fach weiter und
            taucht dann erst nach 1, 2, 4, 8, 16 oder 32 Tagen wieder auf. Das ist nachweislich effektiver als Pauken am
            Vorabend.
          </p>
        </header>

        <section className="card space-y-5 p-5">
          <div>
            <label className="label">Paket</label>
            <select
              className="input"
              value={deckParam}
              onChange={(e) => setParams({ deck: e.target.value, mode })}
            >
              <option value="alle">Alle Pakete zusammen</option>
              {allDecks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.cards.length})
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Abfragemodus</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    ['flip', '🔄 Umdrehen'],
                    ['type', '⌨️ Tippen'],
                    ['choice', '🔢 Auswahl'],
                  ] as const
                ).map(([m, l]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cls(
                      'rounded-xl px-2 py-2 text-xs font-bold transition',
                      mode === m ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Richtung</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    ['front-back', 'FR → DE'],
                    ['back-front', 'DE → FR'],
                    ['mixed', 'Gemischt'],
                  ] as const
                ).map(([d, l]) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDir(d)
                      set((s) => void (s.settings.vocabDirection = d))
                    }}
                    className={cls(
                      'rounded-xl px-2 py-2 text-xs font-bold transition',
                      dir === d ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm font-medium">
            <input type="checkbox" className="h-4 w-4 accent-brand-600" checked={onlyDue} onChange={(e) => setOnlyDue(e.target.checked)} />
            Nur fällige Karten üben (empfohlen)
          </label>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-ink-100/70 p-4 dark:bg-ink-800/40">
            <div className="flex-1">
              <div className="text-sm font-bold">{deckName}</div>
              <div className="text-xs text-ink-500">
                {dueCount} Karten in dieser Runde {onlyDue ? '(fällig)' : '(alle)'} · max. 40 pro Session
              </div>
            </div>
            <button className="btn-primary" onClick={start} disabled={!dueCount}>
              ▶ Training starten
            </button>
          </div>

          {dueCount === 0 && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              🎉 Alles wiederholt! Schalte „Nur fällige Karten" aus, um trotzdem zu üben.
            </p>
          )}
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {allDecks.slice(0, 6).map((d) => {
            const due = d.cards.filter((c) => isDue(store.cards[c.id])).length
            const m = d.cards.length ? d.cards.reduce((a, c) => a + masteryOf(store.cards[c.id]), 0) / d.cards.length : 0
            return (
              <Link key={d.id} to={`/vokabeln/${d.id}`} className="card card-hover p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{d.name}</span>
                  {due > 0 && <Chip tone="amber">{due}</Chip>}
                </div>
                <Progress value={m * 100} className="mt-2" tone="green" />
              </Link>
            )
          })}
        </section>
      </div>
    )
  }

  /* ---------------------------- Session-Ende --------------------------- */
  if (!current) {
    const total = session.right + session.wrong
    const pct = total ? Math.round((session.right / total) * 100) : 0
    return (
      <div className="card animate-pop p-8 text-center">
        <div className="text-5xl">{pct >= 80 ? '🎉' : '👏'}</div>
        <h2 className="mt-3 text-xl font-extrabold">Session beendet!</h2>
        <p className="mt-1 text-sm text-ink-500">
          {session.right} richtig · {session.wrong} nochmal · {pct} % Trefferquote
        </p>
        <Progress value={pct} className="mx-auto mt-4 max-w-sm" tone={pct >= 80 ? 'green' : 'amber'} />
        <div className="mt-5 flex justify-center gap-2">
          <button className="btn-primary" onClick={start}>
            Weiter üben
          </button>
          <button className="btn-ghost" onClick={() => setRunning(false)}>
            Zurück zur Auswahl
          </button>
        </div>
      </div>
    )
  }

  /* ------------------------------ Training ----------------------------- */
  const state = store.cards[current.card.id]
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <button className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => setRunning(false)}>
          ✕ Beenden
        </button>
        <Progress value={(pos / queue.length) * 100} className="flex-1" />
        <span className="text-xs font-bold text-ink-500">
          {pos + 1}/{queue.length}
        </span>
      </div>

      <div className="card relative overflow-hidden p-8 text-center">
        <div className="absolute left-4 top-4 flex gap-1.5">
          <Chip tone="ink">{current.deck.name}</Chip>
          {state && <Chip tone="brand">Fach {state.box}</Chip>}
        </div>

        <div className="mt-8 text-[11px] font-bold uppercase tracking-widest text-ink-400">
          {reversed ? 'Deutsch' : 'Fremdsprache'}
        </div>
        <div className="mt-2 text-2xl font-extrabold leading-snug">{question}</div>
        {current.card.hint && !revealed && mode === 'flip' && (
          <div className="mt-2 text-xs text-ink-400">Hinweis: {current.card.hint}</div>
        )}

        {/* Modus: Tippen */}
        {mode === 'type' && (
          <div className="mx-auto mt-6 max-w-sm">
            <input
              className={cls(
                'input text-center text-base',
                result === 'correct' && 'border-emerald-500 ring-4 ring-emerald-500/15',
                result === 'wrong' && 'animate-shake border-rose-500 ring-4 ring-rose-500/15',
                result === 'almost' && 'border-amber-500 ring-4 ring-amber-500/15',
              )}
              placeholder="Übersetzung eingeben …"
              value={input}
              disabled={revealed}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!revealed) checkTyped()
                  else grade(result === 'correct' ? 'good' : result === 'almost' ? 'hard' : 'again')
                }
              }}
            />
            {!revealed && (
              <button className="btn-primary mt-3 w-full" onClick={checkTyped} disabled={!input.trim()}>
                Prüfen
              </button>
            )}
          </div>
        )}

        {/* Modus: Auswahl */}
        {mode === 'choice' && !revealed && (
          <div className="mx-auto mt-6 grid max-w-md gap-2">
            {choices.map((ch) => (
              <button
                key={ch}
                className="rounded-xl border border-ink-200 px-4 py-3 text-sm font-medium transition hover:border-brand-400 hover:bg-brand-50/50 dark:border-ink-800 dark:hover:bg-ink-800/60"
                onClick={() => {
                  setPicked(ch)
                  setRevealed(true)
                  setResult(ch === solution ? 'correct' : 'wrong')
                }}
              >
                {ch}
              </button>
            ))}
          </div>
        )}

        {/* Lösung */}
        {(revealed || (mode === 'flip' && revealed)) && (
          <div className="animate-fade-up mt-6 border-t border-dashed border-ink-200 pt-5 dark:border-ink-700">
            <div className="text-[11px] font-bold uppercase tracking-widest text-ink-400">Lösung</div>
            <div
              className={cls(
                'mt-1 text-2xl font-extrabold',
                result === 'correct' ? 'text-emerald-600 dark:text-emerald-400' : result === 'wrong' ? 'text-rose-600 dark:text-rose-400' : '',
              )}
            >
              {solution}
            </div>
            {result === 'almost' && <div className="mt-1 text-xs font-semibold text-amber-600">Fast! Achte auf die Schreibweise.</div>}
            {picked && picked !== solution && <div className="mt-1 text-xs text-rose-500">Deine Wahl: {picked}</div>}
            {current.card.hint && <div className="mt-2 text-xs text-ink-400">{current.card.hint}</div>}
            {current.card.example && <div className="mt-1 text-xs italic text-ink-400">„{current.card.example}"</div>}
          </div>
        )}

        {mode === 'flip' && !revealed && (
          <button className="btn-primary mt-8" onClick={() => setRevealed(true)}>
            Lösung zeigen
          </button>
        )}
      </div>

      {/* Bewertung */}
      {revealed && (
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              ['again', 'Nochmal', 'bg-rose-500', '1 Min'],
              ['hard', 'Schwer', 'bg-amber-500', 'bald'],
              ['good', 'Gut', 'bg-emerald-500', 'später'],
              ['easy', 'Einfach', 'bg-brand-600', 'viel später'],
            ] as const
          ).map(([q, label, color, sub]) => (
            <button
              key={q}
              onClick={() => grade(q)}
              className={cls('rounded-xl px-2 py-3 text-xs font-bold text-white transition hover:brightness-110', color)}
            >
              {label}
              <div className="mt-0.5 text-[10px] font-medium opacity-80">{sub}</div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between text-xs text-ink-400">
        <span>✓ {session.right} · ✗ {session.wrong}</span>
        <span>{state ? `Nächste Wiederholung: ${dueLabel(state)}` : 'Neue Karte'}</span>
      </div>
    </div>
  )
}
