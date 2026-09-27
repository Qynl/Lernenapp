import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './lib/storage'
import { Layout } from './components/Layout'
import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import SubjectPage from './pages/SubjectPage'
import TopicPage from './pages/TopicPage'
import Vocab from './pages/Vocab'
import DeckPage from './pages/DeckPage'
import Trainer from './pages/Trainer'
import TestCenter from './pages/TestCenter'
import Formulas from './pages/Formulas'
import Stats from './pages/Stats'
import Settings from './pages/Settings'
import Planner from './pages/Planner'
import Tools from './pages/Tools'
import Arena from './pages/Arena'
import Daily from './pages/Daily'
import Glossary from './pages/Glossary'
import Cheatsheet from './pages/Cheatsheet'
import { Toaster } from './components/Toaster'
import { Confetti } from './components/Confetti'
import { CommandPalette } from './components/CommandPalette'
import { EmptyState } from './components/ui'
import { Link } from 'react-router-dom'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/faecher" element={<Subjects />} />
            <Route path="/fach/:id" element={<SubjectPage />} />
            <Route path="/thema/:id" element={<TopicPage />} />
            <Route path="/vokabeln" element={<Vocab />} />
            <Route path="/vokabeln/:id" element={<DeckPage />} />
            <Route path="/karteikarten" element={<Trainer />} />
            <Route path="/test" element={<TestCenter />} />
            <Route path="/taeglich" element={<Daily />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/lernplan" element={<Planner />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/formeln" element={<Formulas />} />
            <Route path="/glossar" element={<Glossary />} />
            <Route path="/spickzettel" element={<Cheatsheet />} />
            <Route path="/spickzettel/:subjectId" element={<Cheatsheet />} />
            <Route path="/statistik" element={<Stats />} />
            <Route path="/einstellungen" element={<Settings />} />
            <Route
              path="*"
              element={
                <EmptyState
                  icon="🧭"
                  title="Seite nicht gefunden"
                  text="Diese Adresse gibt es nicht. Vielleicht hilft die Suche mit Strg + K weiter."
                  action={
                    <Link to="/" className="btn-primary">
                      Zur Übersicht
                    </Link>
                  }
                />
              }
            />
          </Routes>
        </Layout>
        <CommandPalette />
        <Toaster />
        <Confetti />
      </BrowserRouter>
    </StoreProvider>
  )
}
