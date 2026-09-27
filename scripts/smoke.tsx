/* Rendert jede Route serverseitig, um Laufzeitfehler früh zu finden. */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from '../src/lib/storage'
import { Layout } from '../src/components/Layout'
import Dashboard from '../src/pages/Dashboard'
import Subjects from '../src/pages/Subjects'
import SubjectPage from '../src/pages/SubjectPage'
import TopicPage from '../src/pages/TopicPage'
import Vocab from '../src/pages/Vocab'
import DeckPage from '../src/pages/DeckPage'
import Trainer from '../src/pages/Trainer'
import TestCenter from '../src/pages/TestCenter'
import Formulas from '../src/pages/Formulas'
import Stats from '../src/pages/Stats'
import Settings from '../src/pages/Settings'

/* Minimale Browser-Stubs */
const store = new Map<string, string>()
// @ts-expect-error – Test-Stub
globalThis.localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
}
// @ts-expect-error – Test-Stub
globalThis.document = { documentElement: { classList: { toggle: () => {} } } }
// @ts-expect-error – Test-Stub
globalThis.window = { scrollTo: () => {}, setInterval: () => 0, clearInterval: () => {} }

const routes = [
  ['/', <Dashboard />],
  ['/faecher', <Subjects />],
  ['/fach/mathe', <SubjectPage />],
  ['/fach/franzoesisch', <SubjectPage />],
  ['/thema/ma-9-pythagoras', <TopicPage />],
  ['/thema/fr-8-vergangenheit', <TopicPage />],
  ['/thema/bio-10-neuro', <TopicPage />],
  ['/vokabeln', <Vocab />],
  ['/vokabeln/fr-basis', <DeckPage />],
  ['/karteikarten', <Trainer />],
  ['/test', <TestCenter />],
  ['/formeln', <Formulas />],
  ['/statistik', <Stats />],
  ['/einstellungen', <Settings />],
] as const

let fails = 0
for (const [path, element] of routes) {
  try {
    const html = renderToString(
      <StoreProvider>
        <MemoryRouter initialEntries={[path]}>
          <Layout>
            <Routes>
              <Route path={path.replace(/\/(mathe|franzoesisch)$/, '/:id').replace(/\/(ma-|fr-|bio-)[\w-]+$/, '/:id').replace(/\/fr-basis$/, '/:id')} element={element} />
            </Routes>
          </Layout>
        </MemoryRouter>
      </StoreProvider>,
    )
    if (html.length < 500) throw new Error('verdächtig wenig HTML')
    console.log(`✓ ${path.padEnd(28)} ${html.length} Zeichen`)
  } catch (e) {
    fails++
    console.error(`✗ ${path}:`, (e as Error).message)
  }
}
console.log(fails ? `\n${fails} Seiten mit Fehlern.` : '\n✓ Alle Seiten rendern fehlerfrei.')
process.exit(fails ? 1 : 0)
