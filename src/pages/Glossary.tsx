import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { glossary, searchGlossary, subjectById, topicById } from '../data'
import { cls } from '../lib/utils'
import { EmptyState } from '../components/ui'

export default function Glossary() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [subject, setSubject] = useState<string>('alle')
  const [letter, setLetter] = useState<string>('alle')

  useEffect(() => {
    const p = params.get('q')
    if (p !== null && p !== q) setQ(p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const subjects = useMemo(() => {
    const ids = [...new Set(glossary.map((g) => g.subjectId))]
    return ids.map((id) => subjectById[id]).filter(Boolean)
  }, [])

  const letters = useMemo(
    () => [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort((a, b) => a.localeCompare(b, 'de')),
    [],
  )

  const list = useMemo(() => {
    let res = q.trim() ? searchGlossary(q) : [...glossary]
    if (subject !== 'alle') res = res.filter((g) => g.subjectId === subject)
    if (letter !== 'alle') res = res.filter((g) => g.term[0].toUpperCase() === letter)
    return res.sort((a, b) => a.term.localeCompare(b.term, 'de'))
  }, [q, subject, letter])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof list>()
    for (const e of list) {
      const k = e.term[0].toUpperCase()
      if (!map.has(k)) map.set(k, [])
      map.get(k)!.push(e)
    }
    return [...map.entries()]
  }, [list])

  function update(v: string) {
    setQ(v)
    if (v) setParams({ q: v }, { replace: true })
    else setParams({}, { replace: true })
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">Glossar 📖</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
          {glossary.length} Fachbegriffe aus allen Fächern – kurz erklärt, ohne Lehrbuchgeschwurbel. Ideal zum
          Nachschlagen mitten in den Hausaufgaben.
        </p>
      </header>

      <div className="card space-y-3 p-4">
        <input
          className="input"
          placeholder="Begriff suchen … (z. B. Ableitung, Metapher, Osmose)"
          value={q}
          onChange={(e) => update(e.target.value)}
          autoFocus
        />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setSubject('alle')} className={cls('chip', subject === 'alle' && '!bg-brand-600 !text-white')}>
            Alle Fächer
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              className={cls('chip', subject === s.id && '!bg-brand-600 !text-white')}
            >
              {s.emoji} {s.short}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setLetter('alle')}
            className={cls(
              'h-7 w-7 rounded-md text-[11px] font-black',
              letter === 'alle' ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-ink-100 dark:bg-ink-800',
            )}
          >
            *
          </button>
          {letters.map((l) => (
            <button
              key={l}
              onClick={() => setLetter(l)}
              className={cls(
                'h-7 w-7 rounded-md text-[11px] font-black',
                letter === l ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-ink-100 dark:bg-ink-800',
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-bold uppercase text-ink-400">{list.length} Treffer</p>

      {list.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Nichts gefunden"
          text="Versuche einen anderen Begriff oder entferne die Filter."
          action={
            <button
              className="btn-soft"
              onClick={() => {
                update('')
                setSubject('alle')
                setLetter('alle')
              }}
            >
              Filter zurücksetzen
            </button>
          }
        />
      ) : (
        <div className="space-y-6">
          {grouped.map(([l, entries]) => (
            <section key={l}>
              <h2 className="mb-2 text-lg font-black text-brand-600 dark:text-brand-300">{l}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {entries.map((e) => {
                  const s = subjectById[e.subjectId]
                  const t = e.topicId ? topicById[e.topicId] : undefined
                  return (
                    <article key={e.term + e.subjectId} className="card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-black">{e.term}</h3>
                        {s && (
                          <Link to={`/fach/${s.id}`} className="chip shrink-0 !text-[10px]">
                            {s.emoji} {s.short}
                          </Link>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{e.short}</p>
                      {e.long && (
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-500 dark:text-ink-400">{e.long}</p>
                      )}
                      {e.synonyms?.length ? (
                        <p className="mt-2 text-[11px] font-semibold text-ink-400">
                          auch: {e.synonyms.join(' · ')}
                        </p>
                      ) : null}
                      {t && (
                        <Link
                          to={`/thema/${t.id}`}
                          className="mt-2 inline-block text-xs font-bold text-brand-600 dark:text-brand-300"
                        >
                          Thema {'„'}{t.title}{'“'} öffnen →
                        </Link>
                      )}
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
