import { useRef, useState } from 'react'
import { useStore } from '../lib/storage'
import { topics } from '../data'
import type { Grade } from '../types'

const AVATARS = ['🦊', '🐼', '🦉', '🐙', '🦄', '🐧', '🦁', '🐝', '🚀', '🧠']

export default function Settings() {
  const { store, set, reset, importJSON } = useStore()
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function exportData() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lernstoff-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Backup heruntergeladen ✓')
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const ok = importJSON(String(reader.result))
      setMsg(ok ? 'Daten importiert ✓' : 'Datei konnte nicht gelesen werden ✗')
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Einstellungen</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Alle Daten liegen ausschließlich lokal in deinem Browser – kein Konto, keine Cloud, keine Werbung.
        </p>
      </header>

      <section className="card space-y-4 p-5">
        <h2 className="text-base font-bold">Profil</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Name (optional)</label>
            <input
              className="input"
              placeholder="Wie sollen wir dich nennen?"
              value={store.profile.name}
              onChange={(e) => set((s) => void (s.profile.name = e.target.value))}
            />
          </div>
          <div>
            <label className="label">Jahrgangsstufe</label>
            <select
              className="input"
              value={store.profile.grade}
              onChange={(e) => set((s) => void (s.profile.grade = Number(e.target.value) as Grade))}
            >
              {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  {g}. Klasse
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Avatar</label>
          <div className="flex flex-wrap gap-1.5">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => set((s) => void (s.profile.avatar = a))}
                className={
                  store.profile.avatar === a
                    ? 'h-10 w-10 rounded-xl bg-brand-600 text-xl'
                    : 'h-10 w-10 rounded-xl bg-ink-100 text-xl transition hover:bg-ink-200 dark:bg-ink-800 dark:hover:bg-ink-700'
                }
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card space-y-4 p-5">
        <h2 className="text-base font-bold">Lernen</h2>
        <div>
          <label className="label">Tagesziel: {store.dailyGoal} XP</label>
          <input
            type="range"
            min={20}
            max={300}
            step={10}
            value={store.dailyGoal}
            className="w-full accent-brand-600"
            onChange={(e) => set((s) => void (s.dailyGoal = Number(e.target.value)))}
          />
          <p className="mt-1 text-xs text-ink-400">
            Richtwert: 10 XP pro richtiger Quizfrage, 8 XP pro Vokabel, 15 XP pro gelesenem Thema.
            {store.dailyGoal <= 60 ? ' Ein realistisches Ziel für jeden Tag.' : ' Ambitioniert – ideal vor Schulaufgaben.'}
          </p>
        </div>

        <Toggle
          label="Akzente und Umlaute streng prüfen"
          desc={'Wenn aktiv, zählt „cafe" statt „café" als Fehler.'}
          checked={store.settings.strictAccents}
          onChange={(v) => set((s) => void (s.settings.strictAccents = v))}
        />
        <Toggle
          label="Dunkles Design"
          desc="Schont die Augen beim Lernen am Abend."
          checked={store.theme === 'dark'}
          onChange={(v) => set((s) => void (s.theme = v ? 'dark' : 'light'))}
        />
      </section>

      <section className="card space-y-4 p-5">
        <h2 className="text-base font-bold">Daten</h2>
        <div className="grid gap-2 text-sm text-ink-500 sm:grid-cols-3">
          <Info label="Themen im Angebot" value={`${topics.length}`} />
          <Info label="Bearbeitete Themen" value={`${Object.keys(store.topics).length}`} />
          <Info label="Trainierte Karten" value={`${Object.keys(store.cards).length}`} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost" onClick={exportData}>
            ⬇️ Backup speichern
          </button>
          <button className="btn-ghost" onClick={() => fileRef.current?.click()}>
            ⬆️ Backup laden
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onFile} />
          <button
            className="btn bg-rose-600 text-white hover:bg-rose-700"
            onClick={() => {
              if (confirm('Wirklich ALLE Lerndaten löschen? Das kann nicht rückgängig gemacht werden.')) {
                reset()
                setMsg('Alle Daten wurden gelöscht.')
              }
            }}
          >
            🗑️ Alles zurücksetzen
          </button>
        </div>
        {msg && <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{msg}</p>}
      </section>

      <section className="card p-5 text-xs leading-6 text-ink-500 dark:text-ink-400">
        <h2 className="mb-1.5 text-base font-bold text-ink-800 dark:text-ink-100">Über Lernstoff</h2>
        <p>
          Lernstoff ist eine offline-fähige Lern-App für das bayerische Gymnasium (Jahrgangsstufen 5 bis 12). Die Inhalte
          orientieren sich am LehrplanPLUS, ersetzen aber weder Unterricht noch Schulbuch – sie sollen erklären, üben und
          wiederholen helfen.
        </p>
        <p className="mt-2">
          Keine Anmeldung, keine Tracker: Dein Fortschritt wird nur im <code>localStorage</code> deines Browsers
          gespeichert. Wenn du das Gerät wechselst, nimm ein Backup mit.
        </p>
      </section>
    </div>
  )
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string
  desc: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" className="mt-1 h-4 w-4 accent-brand-600" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-ink-400">{desc}</span>
      </span>
    </label>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-ink-100/70 p-3 dark:bg-ink-800/40">
      <div className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{label}</div>
      <div className="text-lg font-extrabold text-ink-800 dark:text-ink-100">{value}</div>
    </div>
  )
}
