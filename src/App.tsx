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
import { EmptyState } from './components/ui'

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
            <Route path="/formeln" element={<Formulas />} />
            <Route path="/statistik" element={<Stats />} />
            <Route path="/einstellungen" element={<Settings />} />
            <Route
              path="*"
              element={<EmptyState icon="🧭" title="Seite nicht gefunden" text="Diese Adresse gibt es nicht." />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  )
}
