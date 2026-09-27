/* Datenintegrität prüfen: Fächer, IDs, Vokabelverweise, Tabellen */
import { topics, subjectById, builtinDecks, formulas } from '../src/data'

let errors = 0
const fail = (m: string) => {
  console.error('✗', m)
  errors++
}

const topicIds = new Set<string>()
const questionIds = new Set<string>()
const deckIds = new Set(builtinDecks.map((d) => d.id))

for (const t of topics) {
  if (topicIds.has(t.id)) fail(`Doppelte Themen-ID: ${t.id}`)
  topicIds.add(t.id)
  if (!subjectById[t.subjectId]) fail(`Unbekanntes Fach "${t.subjectId}" in ${t.id}`)
  if (!subjectById[t.subjectId]?.grades.includes(t.grade)) fail(`Klasse ${t.grade} nicht im Fach ${t.subjectId} (${t.id})`)
  if (!t.questions.length) fail(`Keine Fragen in ${t.id}`)
  if (!t.blocks.length) fail(`Keine Inhalte in ${t.id}`)
  for (const b of t.blocks) {
    if (b.type === 'vocabhint' && !deckIds.has(b.deckId)) fail(`Unbekanntes Vokabelpaket "${b.deckId}" in ${t.id}`)
    if (b.type === 'table' && b.rows.some((r) => r.length !== b.head.length))
      fail(`Tabellenzeile mit falscher Spaltenzahl in ${t.id}`)
  }
  for (const q of t.questions) {
    if (questionIds.has(q.id)) fail(`Doppelte Frage-ID: ${q.id}`)
    questionIds.add(q.id)
    if (q.type === 'mc' && (q.answer < 0 || q.answer >= q.options.length)) fail(`Ungültiger Antwortindex in ${q.id}`)
    if (q.type === 'multi' && q.answers.some((a) => a < 0 || a >= q.options.length)) fail(`Ungültiger Antwortindex in ${q.id}`)
    if (q.type === 'input' && !q.accept.length) fail(`Keine akzeptierte Antwort in ${q.id}`)
    if (!q.explain) fail(`Keine Erklärung in ${q.id}`)
  }
}

const cardIds = new Set<string>()
for (const d of builtinDecks) {
  if (!subjectById[d.subjectId]) fail(`Unbekanntes Fach im Deck ${d.id}`)
  for (const c of d.cards) {
    if (cardIds.has(c.id)) fail(`Doppelte Karten-ID: ${c.id}`)
    cardIds.add(c.id)
    if (!c.front || !c.back) fail(`Leere Karte in ${d.id}`)
  }
}

for (const f of formulas) if (!subjectById[f.subjectId]) fail(`Unbekanntes Fach in Formel ${f.id}`)

console.log(
  `\nThemen: ${topics.length} · Fragen: ${questionIds.size} · Vokabeln: ${cardIds.size} · Formeln: ${formulas.length}`,
)
console.log(errors ? `\n${errors} Fehler gefunden.` : '\n✓ Alle Daten sind konsistent.')
process.exit(errors ? 1 : 0)
