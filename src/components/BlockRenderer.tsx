import { Link } from 'react-router-dom'
import type { Block } from '../types'
import { MD } from './Markdownish'

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} index={i} />
      ))}
    </div>
  )
}

function BlockView({ block: b, index }: { block: Block; index: number }) {
  switch (b.type) {
    case 'text':
      return (
        <p className="text-[15px] leading-7 text-ink-700 dark:text-ink-300">
          <MD text={b.md} />
        </p>
      )

    case 'formula':
      return (
        <figure className="overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white dark:border-brand-500/25 dark:from-brand-500/10 dark:to-ink-900">
          <pre className="formula overflow-x-auto whitespace-pre-wrap px-5 py-4 text-center text-base font-semibold text-brand-800 dark:text-brand-200">
            {b.tex}
          </pre>
          {b.caption && (
            <figcaption className="border-t border-brand-200/70 px-5 py-2.5 text-xs text-ink-600 dark:border-brand-500/20 dark:text-ink-400">
              <MD text={b.caption} />
            </figcaption>
          )}
        </figure>
      )

    case 'merksatz':
      return (
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/70 p-4 dark:bg-emerald-500/10">
          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
            <span>💡</span>
            {b.title ?? 'Merksatz'}
          </div>
          <p className="text-sm leading-6 text-ink-700 dark:text-ink-200">
            <MD text={b.md} />
          </p>
        </div>
      )

    case 'warn':
      return (
        <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/70 p-4 dark:bg-amber-500/10">
          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300">
            <span>⚠️</span>
            {b.title ?? 'Achtung, Stolperfalle'}
          </div>
          <p className="text-sm leading-6 text-ink-700 dark:text-ink-200">
            <MD text={b.md} />
          </p>
        </div>
      )

    case 'example':
      return (
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-50 px-4 py-2.5 text-sm font-bold dark:border-ink-800 dark:bg-ink-950/60">
            <span>✏️</span>
            {b.title}
          </div>
          <div className="space-y-3 p-4">
            <p className="rounded-xl bg-ink-100/70 p-3 text-sm font-medium dark:bg-ink-800/50">
              <MD text={b.task} />
            </p>
            <ol className="space-y-2">
              {b.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                    {i + 1}
                  </span>
                  <span className="font-mono text-[13px] text-ink-700 dark:text-ink-300">
                    <MD text={s} />
                  </span>
                </li>
              ))}
            </ol>
            {b.result && (
              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                ✓ Ergebnis: <MD text={b.result} />
              </div>
            )}
          </div>
        </div>
      )

    case 'steps':
      return (
        <div>
          {b.title && <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-500">{b.title}</h4>}
          <ol className="space-y-2">
            {b.items.map((s, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-ink-100/60 p-3 text-sm leading-6 dark:bg-ink-800/40">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-ink-700 dark:text-ink-200">
                  <MD text={s} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'list':
      return (
        <div>
          {b.title && <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-500">{b.title}</h4>}
          <ul className="space-y-1.5">
            {b.items.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-6 text-ink-700 dark:text-ink-300">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                <span>
                  {b.ordered && <strong className="mr-1 text-brand-600 dark:text-brand-400">{i + 1}.</strong>}
                  <MD text={s} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'table':
      return (
        <div>
          <div className="overflow-x-auto rounded-2xl border border-ink-200 dark:border-ink-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-100 text-xs uppercase tracking-wide text-ink-600 dark:bg-ink-800/70 dark:text-ink-300">
                <tr>
                  {b.head.map((h, i) => (
                    <th key={i} className="whitespace-nowrap px-3.5 py-2.5 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
                {b.rows.map((r, i) => (
                  <tr key={i} className="bg-white transition hover:bg-brand-50/40 dark:bg-ink-900 dark:hover:bg-ink-800/40">
                    {r.map((cell, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? 'px-3.5 py-2.5 font-semibold text-ink-800 dark:text-ink-100'
                            : 'px-3.5 py-2.5 text-ink-600 dark:text-ink-300'
                        }
                      >
                        <MD text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caption && <p className="mt-1.5 text-xs text-ink-500 dark:text-ink-400"><MD text={b.caption} /></p>}
        </div>
      )

    case 'compare':
      return (
        <div>
          {b.title && <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink-500">{b.title}</h4>}
          <div className="grid gap-3 sm:grid-cols-2">
            {[b.left, b.right].map((side, idx) => (
              <div
                key={idx}
                className={
                  idx === 0
                    ? 'rounded-2xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-500/25 dark:bg-brand-500/10'
                    : 'rounded-2xl border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-500/25 dark:bg-violet-500/10'
                }
              >
                <h5
                  className={
                    idx === 0
                      ? 'mb-2 text-sm font-bold text-brand-700 dark:text-brand-300'
                      : 'mb-2 text-sm font-bold text-violet-700 dark:text-violet-300'
                  }
                >
                  {side.head}
                </h5>
                <ul className="space-y-1.5">
                  {side.items.map((it, i) => (
                    <li key={i} className="flex gap-2 text-[13px] leading-6 text-ink-700 dark:text-ink-300">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-current opacity-50" />
                      <span>
                        <MD text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )

    case 'vocabhint':
      return (
        <Link
          to={`/vokabeln/${b.deckId}`}
          key={index}
          className="card card-hover flex items-center gap-3 p-4 text-sm font-semibold"
        >
          <span className="text-xl">🗂️</span>
          <span className="flex-1">{b.label ?? 'Passendes Vokabelpaket öffnen'}</span>
          <span className="text-brand-600 dark:text-brand-400">Trainieren →</span>
        </Link>
      )

    default:
      return null
  }
}
