import type { JSX } from 'react'

/**
 * Sehr leichter Markdown-Renderer: **fett**, *kursiv*, `code`, Zeilenumbrüche.
 * Bewusst minimal gehalten – keine externe Abhängigkeit, kein dangerouslySetInnerHTML.
 */
export function MD({ text, className = '' }: { text: string; className?: string }) {
  return <span className={className}>{renderInline(text)}</span>
}

export function renderInline(text: string): JSX.Element[] {
  const out: JSX.Element[] = []
  const lines = text.split('\n')
  lines.forEach((line, li) => {
    if (li > 0) out.push(<br key={`br${li}`} />)
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
    const parts = line.split(re).filter((p) => p !== '')
    parts.forEach((p, i) => {
      const key = `${li}-${i}`
      if (p.startsWith('**') && p.endsWith('**')) {
        out.push(
          <strong key={key} className="font-semibold text-ink-900 dark:text-white">
            {p.slice(2, -2)}
          </strong>,
        )
      } else if (p.startsWith('`') && p.endsWith('`')) {
        out.push(
          <code
            key={key}
            className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-700 dark:bg-ink-800 dark:text-brand-300"
          >
            {p.slice(1, -1)}
          </code>,
        )
      } else if (p.startsWith('*') && p.endsWith('*') && p.length > 2) {
        out.push(
          <em key={key} className="italic">
            {p.slice(1, -1)}
          </em>,
        )
      } else {
        out.push(<span key={key}>{p}</span>)
      }
    })
  })
  return out
}
