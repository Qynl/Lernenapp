# 🎓 Lernstoff – Lern-App für das bayerische Gymnasium (5.–12. Klasse)

Eine komplette, offline-fähige Lern-Web-App: **alle Hauptfächer ausführlich erklärt**, mit Übungsaufgaben,
Prüfungssimulation, Formelsammlung und einem Vokabeltrainer mit Spaced Repetition. Kein Konto, keine Cloud,
keine Werbung – dein Fortschritt bleibt im Browser.

![Fächer](https://img.shields.io/badge/F%C3%A4cher-16-blue) ![Themen](https://img.shields.io/badge/Themen-77-green) ![Fragen](https://img.shields.io/badge/%C3%9Cbungsfragen-272-orange) ![Vokabeln](https://img.shields.io/badge/Vokabeln-330-violet)

---

## Was drin ist

### 📚 16 Fächer, 77 ausgearbeitete Themen
Mathematik · Deutsch · Englisch · Französisch · Latein · Spanisch · Physik · Chemie · Biologie ·
Geschichte · Geographie · Informatik · Wirtschaft & Recht · Politik & Gesellschaft · Ethik/Religion · Natur & Technik

Jedes Thema enthält:

| Baustein | Beschreibung |
|---|---|
| **Erklärung** | verständlicher Fließtext, kein Lexikon-Deutsch |
| **Formelkarten** | hervorgehobene Formeln mit Erläuterung |
| **Merksätze & Eselsbrücken** | z. B. „GAGA HHAG", „DR & MRS VANDERTRAMP" |
| **Stolperfallen** | die Fehler, die in Schulaufgaben wirklich Punkte kosten |
| **Rechenbeispiele** | Schritt-für-Schritt-Lösungswege zum Mitmachen |
| **Vergleichstabellen** | z. B. Klassik vs. Romantik, Mitose vs. Meiose |
| **Übungsfragen** | Multiple Choice, Mehrfachauswahl, Freitext, Wahr/Falsch – jede mit Erklärung |

Inhalte reichen von Bruchrechnen (5. Klasse) bis Integralrechnung, Binomialverteilung, Quantenphysik und
Dramenanalyse (Abitur). Abiturrelevante Themen sind markiert.

### 🗂️ Vokabeltrainer mit Leitner-System
- **9 fertige Pakete** (Französisch Grundwortschatz & unregelmäßige Verben, Englisch Irregular Verbs & Abiturwortschatz,
  Latein, Spanisch, rhetorische Mittel, Bio- und Geschichts-Fachbegriffe) – insgesamt 330 Karten
- **Eigene Vokabeln eintragen**: einzeln oder als Massen-Import per Copy-Paste (`vocable = Übersetzung`, auch Tab/Semikolon)
- **Drei Abfragemodi**: Karte umdrehen · Tippen (mit Tippfehler-Toleranz und „fast richtig"-Erkennung) · Multiple Choice
- **Richtung wählbar**: Fremdsprache → Deutsch, umgekehrt oder gemischt
- **Spaced Repetition**: 6 Leitner-Fächer mit Intervallen 1 / 2 / 4 / 8 / 16 / 32 Tage; falsche Karten kommen sofort zurück

### 📝 Prüfungssimulation
Fach, Jahrgangsstufe und Aufgabenzahl wählen → Test mit Timer, Aufgabennavigation und Abgabe.
Bewertung nach **bayerischem Notenschlüssel (1–6)**, in der Oberstufe zusätzlich **Notenpunkte 0–15**.
Danach vollständige Auswertung mit Erklärung und direktem Link zum passenden Thema.

### 📐 Formelsammlung
77 Formeln aus Mathe, Physik, Chemie, Biologie, Geographie und Wirtschaft – durchsuchbar und nach
Fach **und Jahrgangsstufe** filterbar.

### 📈 Motivation & Fortschritt
XP, Level mit 13 Rängen („Formelfuchs", „Abi-Aspirant", „Lernlegende"), Tagesziel-Ring, Streak-Zähler,
10 Abzeichen, 12-Wochen-Heatmap, Fortschritt pro Fach und eine Übersicht der Leitner-Fächer.

### Außerdem
Volltextsuche über alle Inhalte · eigene Notizen pro Thema · Merkliste · Dark/Light Mode ·
Backup-Export und -Import als JSON · vollständig responsiv (Mobile-Bottom-Nav + Desktop-Sidebar).

---

## Starten

```bash
npm install
npm run dev        # http://localhost:5173
```

Weitere Befehle:

```bash
npm run build      # Produktions-Build
npm run validate   # prüft alle Lerninhalte auf Konsistenz (IDs, Antwortindizes, Verweise)
npm run smoke      # rendert jede Seite serverseitig und findet Laufzeitfehler
npm run check      # build + validate + smoke
```

---

## Technik

- **React 19 + TypeScript + Vite**
- **Tailwind CSS** (Dark Mode über Klasse)
- **React Router** für die Navigation
- **localStorage** als einzige Datenhaltung – kein Backend, komplett offline nutzbar
- Leitner-Algorithmus in `src/lib/srs.ts`, Antwortvergleich mit Levenshtein-Distanz in `src/lib/utils.ts`

### Projektstruktur

```
src/
├── data/
│   ├── subjects.ts          Fächerdefinition
│   ├── topics/              die Lerninhalte (nach Fach/Jahrgangsstufe getrennt)
│   ├── vocab.ts             fertige Vokabelpakete
│   └── formulas.ts          Formelsammlung
├── components/              Layout, Quiz-Engine, Block-Renderer, UI-Bausteine
├── pages/                   Dashboard, Fächer, Thema, Vokabeln, Trainer, Test, Formeln, Statistik
├── lib/                     Store (Context + localStorage), SRS, Hilfsfunktionen
└── types.ts                 Datenmodell
```

### Eigene Inhalte ergänzen

Ein Thema ist ein reines Datenobjekt – neue Themen brauchen keinen neuen Code:

```ts
{
  id: 'ma-9-neu',
  subjectId: 'mathe',
  grade: 9,
  title: 'Mein Thema',
  teaser: 'Kurzbeschreibung für die Kachel.',
  minutes: 15,
  tags: ['Algebra'],
  blocks: [
    { type: 'text', md: 'Erklärung mit **Fettdruck** und `Code`.' },
    { type: 'formula', tex: 'a² + b² = c²', caption: 'Nur im rechtwinkligen Dreieck' },
    { type: 'merksatz', md: 'Die Eselsbrücke.' },
    { type: 'example', title: 'Beispiel', task: 'Aufgabe', steps: ['Schritt 1'], result: 'Lösung' },
  ],
  questions: [
    { id: 'q1', type: 'mc', q: 'Frage?', options: ['A', 'B'], answer: 0, explain: 'Warum A richtig ist.' },
  ],
}
```

Verfügbare Block-Typen: `text`, `formula`, `merksatz`, `warn`, `example`, `steps`, `list`, `table`,
`compare`, `vocabhint`. Fragetypen: `mc`, `multi`, `input`, `truefalse`.
Nach dem Ergänzen `npm run validate` laufen lassen.

---

## Hinweis

Die Inhalte orientieren sich am LehrplanPLUS des bayerischen Gymnasiums, ersetzen aber weder Unterricht
noch Schulbuch. Sie sollen erklären, üben und wiederholen helfen.
