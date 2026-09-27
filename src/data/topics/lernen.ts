import type { Topic } from '../../types'

export const lernen: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'll-5-lerntechniken',
    subjectId: 'lernen',
    grade: 5,
    title: 'Richtig lernen: Was wirklich funktioniert',
    teaser: 'Die Lernforschung ist sich einig – und fast alle machen es trotzdem falsch. Hier sind die Methoden, die belegt wirken.',
    minutes: 18,
    tags: ['Methode', 'Gedächtnis', 'Lerntipps'],
    blocks: [
      {
        type: 'warn',
        title: 'Die große Lernlüge',
        md: 'Texte **mehrfach durchlesen** und **markieren** fühlt sich produktiv an – gehört aber laut Studien zu den **wirkungslosesten** Methoden. Man verwechselt Vertrautheit („das kenne ich doch") mit Können.',
      },
      {
        type: 'table',
        head: ['Methode', 'Wirksamkeit', 'Warum'],
        rows: [
          ['Selbstabfragen (Testing)', '⭐⭐⭐⭐⭐', 'Abrufen stärkt die Gedächtnisspur weit mehr als Wiederlesen'],
          ['Verteiltes Lernen (Spacing)', '⭐⭐⭐⭐⭐', 'Pausen zwingen das Gehirn zum aktiven Rekonstruieren'],
          ['Erklären in eigenen Worten', '⭐⭐⭐⭐', 'Deckt Verständnislücken sofort auf'],
          ['Verschachteln (Interleaving)', '⭐⭐⭐⭐', 'Trainiert das Unterscheiden von Aufgabentypen'],
          ['Konkrete Beispiele bilden', '⭐⭐⭐', 'Verankert Abstraktes im Vorwissen'],
          ['Markieren / Unterstreichen', '⭐', 'Passiv, erzeugt nur Wiedererkennen'],
          ['Text mehrfach lesen', '⭐', 'Gefühlte Sicherheit ohne echten Lerneffekt'],
        ],
      },
      {
        type: 'steps',
        title: 'Aktives Abrufen in vier Schritten',
        items: [
          'Heft **zuklappen** – das ist der wichtigste Schritt.',
          'Auf ein leeres Blatt schreiben, was du noch weißt (Stichworte, Skizzen, Formeln).',
          'Erst **danach** nachschlagen und mit einer anderen Farbe ergänzen, was gefehlt hat.',
          'Die Lücken am nächsten Tag zuerst wiederholen.',
        ],
      },
      {
        type: 'text',
        md: 'Die **Vergessenskurve** von Ebbinghaus zeigt: Nach einem Tag sind ohne Wiederholung rund 60 % des Gelernten weg. Jede Wiederholung macht die Kurve flacher. Optimal liegen die Wiederholungen nach **1 Tag, 3 Tagen, 1 Woche, 2 Wochen, 1 Monat** – genau nach diesem Prinzip arbeitet der Karteikasten dieser App.',
      },
      {
        type: 'list',
        title: 'Sofort umsetzbare Tricks',
        items: [
          '**Feynman-Technik**: Erkläre das Thema so, dass es ein Fünftklässler versteht. Wo du stockst, sitzt die Lücke.',
          '**Selbst Fragen schreiben**: Wer Prüfungsfragen erfindet, denkt wie der Lehrer.',
          '**Loci-Methode**: Verknüpfe Begriffe mit Orten in deinem Zimmer und gehe sie in Gedanken ab.',
          '**Merksätze und Reime**: Je alberner, desto besser erinnerbar.',
          '**Handschriftlich mitschreiben**: Wer tippt, protokolliert. Wer schreibt, muss zusammenfassen – und lernt dabei.',
          '**Vor dem Schlafen wiederholen**: Im Schlaf werden Inhalte ins Langzeitgedächtnis übertragen.',
        ],
      },
      {
        type: 'merksatz',
        title: 'Der wichtigste Satz',
        md: '**Lernen fühlt sich anstrengend an, wenn es wirkt.** Wenn es leicht und angenehm ist, passiert meist nichts. Diese „wünschenswerten Schwierigkeiten" sind der Kern guten Lernens.',
      },
    ],
    questions: [
      { id: 'll5-q1', type: 'mc', q: 'Welche Lernmethode ist laut Forschung am wirksamsten?', options: ['Text mehrfach lesen', 'wichtige Stellen markieren', 'sich selbst abfragen', 'Zusammenfassung abschreiben'], answer: 2, explain: 'Aktives Abrufen (retrieval practice) schlägt alle passiven Methoden deutlich.' },
      { id: 'll5-q2', type: 'truefalse', q: 'Wenn sich Lernen leicht anfühlt, ist es besonders effektiv.', answer: false, explain: 'Leichtigkeit bedeutet meist Wiedererkennen statt Können – „wünschenswerte Schwierigkeiten" sind nötig.' },
      { id: 'll5-q3', type: 'input', q: 'Wie heißt die Kurve, die das Vergessen über die Zeit beschreibt?', accept: ['Vergessenskurve', 'Ebbinghaus-Kurve', 'Ebbinghaus'], explain: 'Hermann Ebbinghaus hat sie 1885 experimentell bestimmt.' },
      { id: 'll5-q4', type: 'multi', q: 'Welche Methoden gelten als hochwirksam?', options: ['verteiltes Lernen', 'Selbstabfragen', 'Markieren mit Textmarker', 'Erklären in eigenen Worten'], answers: [0, 1, 3], explain: 'Markieren ist passiv und bringt kaum Lerneffekt.' },
      { id: 'll5-q5', type: 'mc', q: 'Was macht man bei der Feynman-Technik?', options: ['Formeln auswendig lernen', 'den Stoff möglichst einfach erklären', 'Karteikarten schreiben', 'Aufgaben rückwärts rechnen'], answer: 1, explain: 'Beim Vereinfachen fallen Verständnislücken sofort auf.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'll-7-zeitmanagement',
    subjectId: 'lernen',
    grade: 7,
    title: 'Zeitmanagement & Aufschieberitis besiegen',
    teaser: 'Pomodoro, Zwei-Minuten-Regel, Eisenhower-Matrix – und was gegen das ewige „Ich fang gleich an" hilft.',
    minutes: 16,
    tags: ['Organisation', 'Prokrastination', 'Pomodoro'],
    blocks: [
      {
        type: 'text',
        md: 'Aufschieben ist kein Faulheitsproblem, sondern ein **Gefühlsproblem**: Das Gehirn weicht der unangenehmen Emotion aus, die mit der Aufgabe verbunden ist. Deshalb helfen keine Appelle („streng dich an"), sondern Techniken, die den Einstieg erleichtern.',
      },
      {
        type: 'steps',
        title: 'Die Pomodoro-Technik',
        items: [
          '**25 Minuten** konzentriert an genau einer Aufgabe arbeiten – Handy außer Reichweite.',
          '**5 Minuten Pause**: aufstehen, trinken, Fenster auf. Kein Bildschirm!',
          'Nach **vier Durchgängen** eine längere Pause von 20–30 Minuten.',
          'Vor dem Start aufschreiben, **was genau** in dieser Einheit fertig werden soll.',
          'Unterbrechungen notieren statt sofort zu erledigen – nach dem Timer abarbeiten.',
        ],
      },
      {
        type: 'list',
        title: 'Anti-Aufschiebe-Tricks',
        items: [
          '**Zwei-Minuten-Regel**: Alles, was unter zwei Minuten dauert, sofort erledigen.',
          '**Fünf-Minuten-Trick**: Nimm dir vor, nur fünf Minuten anzufangen. Meist macht man danach weiter – der Einstieg war die Hürde.',
          '**Aufgaben zerlegen**: „Referat machen" lähmt. „Drei Quellen suchen" ist machbar.',
          '**Wenn-Dann-Plan**: „Wenn ich nach Hause komme, setze ich mich sofort 25 Minuten an Mathe." Konkrete Auslöser verdoppeln die Umsetzungsquote.',
          '**Ablenkung physisch entfernen**: Handy in einen anderen Raum – nicht nur umdrehen.',
          '**Öffentlich machen**: Erzähle jemandem, was du heute schaffen willst.',
        ],
      },
      {
        type: 'table',
        head: ['', 'dringend', 'nicht dringend'],
        rows: [
          ['**wichtig**', 'sofort erledigen (Test morgen)', 'einplanen (langfristig vorbereiten) ← hier entsteht Erfolg'],
          ['**unwichtig**', 'abgeben oder schnell abhaken', 'weglassen (Zeitfresser)'],
        ],
        caption: 'Eisenhower-Matrix: Wer nur im Feld „dringend & wichtig" lebt, lernt immer unter Druck.',
      },
      {
        type: 'example',
        title: 'Realistischer Wochenplan',
        task: 'Wie plant man eine Lernwoche, ohne sich zu überfordern?',
        steps: [
          'Feste Termine zuerst eintragen (Schule, Sport, Musik) – der Rest ist verfügbare Zeit.',
          'Pro Tag höchstens **2–3 Lernblöcke** einplanen, keine 6-Stunden-Marathons.',
          'Fächer **abwechseln** statt einen Tag nur Mathe (Interleaving-Effekt).',
          'Einen **Pufferblock** pro Woche freilassen – irgendetwas kommt immer dazwischen.',
          'Sonntagabend: 10 Minuten Rückblick – was hat geklappt, was verschiebe ich?',
        ],
        result: 'Ein Plan, den man zu 80 % einhält, schlägt einen perfekten Plan, den man nach zwei Tagen wegwirft.',
      },
      {
        type: 'merksatz',
        title: 'Parkinsons Gesetz',
        md: '„**Arbeit dehnt sich in dem Maß aus, wie Zeit zur Verfügung steht.**" Deshalb: Setze dir bewusst enge Zeitfenster – eine Stunde mit Timer bringt oft mehr als ein ganzer freier Nachmittag.',
      },
    ],
    questions: [
      { id: 'll7-q1', type: 'input', q: 'Wie lange dauert eine klassische Pomodoro-Einheit in Minuten?', accept: ['25'], explain: '25 Minuten Arbeit, dann 5 Minuten Pause.' },
      { id: 'll7-q2', type: 'mc', q: 'Was besagt die Zwei-Minuten-Regel?', options: ['Nur zwei Minuten am Stück lernen', 'Aufgaben unter zwei Minuten sofort erledigen', 'Alle zwei Minuten Pause machen', 'Zwei Minuten vor dem Test wiederholen'], answer: 1, explain: 'So sammeln sich keine Kleinstaufgaben zu einem lähmenden Berg an.' },
      { id: 'll7-q3', type: 'mc', q: 'In welchem Feld der Eisenhower-Matrix entsteht langfristiger Erfolg?', options: ['dringend & wichtig', 'nicht dringend & wichtig', 'dringend & unwichtig', 'nicht dringend & unwichtig'], answer: 1, explain: 'Vorbereitung und regelmäßiges Wiederholen sind wichtig, aber nie dringend – genau deshalb fallen sie aus.' },
      { id: 'll7-q4', type: 'truefalse', q: 'Prokrastination ist vor allem ein Problem mangelnder Zeitplanung.', answer: false, explain: 'Sie ist in erster Linie Emotionsvermeidung – deshalb helfen Einstiegstricks besser als Pläne.' },
      { id: 'll7-q5', type: 'multi', q: 'Was macht einen guten Wochenplan aus?', options: ['Pufferzeiten', 'Fächerwechsel', 'möglichst lange Blöcke ohne Pause', 'feste Termine zuerst eintragen'], answers: [0, 1, 3], explain: 'Marathonblöcke ohne Pause senken die Konzentration drastisch.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'll-9-pruefungsangst',
    subjectId: 'lernen',
    grade: 9,
    title: 'Prüfungsangst und Blackout in den Griff bekommen',
    teaser: 'Warum das Gehirn unter Stress blockiert – und was in der Nacht davor, am Morgen und im Blackout wirklich hilft.',
    minutes: 16,
    tags: ['Psychologie', 'Prüfung', 'Stress'],
    blocks: [
      {
        type: 'text',
        md: 'Ein bisschen Aufregung ist **nützlich** – sie macht wach und fokussiert. Erst wenn die Anspannung zu groß wird, kippt die Leistung (Yerkes-Dodson-Gesetz). Bei einem **Blackout** blockiert das Stresshormon Cortisol den Zugriff auf das Gedächtnis: Das Wissen ist da, nur die Tür klemmt.',
      },
      {
        type: 'steps',
        title: 'Soforthilfe im Blackout',
        items: [
          '**Stift weglegen und ausatmen** – doppelt so lang ausatmen wie einatmen (4 Sekunden ein, 8 Sekunden aus). Das senkt den Puls messbar.',
          '**Aufgabe wechseln**: Beginne mit der leichtesten Frage. Ein erster Erfolg löst die Blockade.',
          '**Schreib irgendetwas auf**: Stichworte, Formeln, eine Skizze. Der Abruf startet oft über die Hand.',
          '**Schulter- und Kieferspannung lösen** – Körper und Kopf hängen zusammen.',
          '**Kurz aus dem Fenster schauen** und den Blick weit machen; das beendet den Tunnelblick.',
        ],
      },
      {
        type: 'list',
        title: 'Vorher: Angst abbauen',
        items: [
          '**Unter Prüfungsbedingungen üben**: Zeit stoppen, keine Hilfsmittel, am Schreibtisch. Der Ernstfall fühlt sich dann vertraut an.',
          '**Kein Stoff mehr am Abend davor** – lieber früh schlafen. Schlaf konsolidiert das Gelernte.',
          '**Realistische Gedanken üben**: Statt „Ich blamiere mich" → „Ich kann das meiste; eine schlechte Note ist ärgerlich, aber kein Weltuntergang."',
          '**Angstgespräche vermeiden**: Die Panikrunde vor dem Klassenzimmer steckt an.',
          '**Ritual entwickeln**: dieselbe Frühstücksroutine, dieselbe Musik, derselbe Stift – Vertrautheit beruhigt.',
        ],
      },
      {
        type: 'table',
        head: ['Phase', 'Was hilft'],
        rows: [
          ['1 Woche vorher', 'Lernplan abarbeiten, Probeklausur unter Zeit schreiben'],
          ['1 Tag vorher', 'nur noch grob wiederholen, Material packen, Bewegung, früh ins Bett'],
          ['Morgens', 'frühstücken, kein Koffein-Overkill, pünktlich da sein, kein Last-Minute-Stoff'],
          ['In der Prüfung', 'erst alles durchlesen, Zeit einteilen, mit Leichtem beginnen'],
          ['Danach', 'keine Fehleranalyse auf dem Gang – das raubt Energie für die nächste Prüfung'],
        ],
      },
      {
        type: 'merksatz',
        title: 'Die 4-7-8-Atmung',
        md: '**4 Sekunden einatmen – 7 Sekunden halten – 8 Sekunden ausatmen.** Dreimal wiederholen. Funktioniert unauffällig am Platz und wirkt innerhalb einer Minute.',
      },
      {
        type: 'warn',
        title: 'Wann man sich Hilfe holen sollte',
        md: 'Wenn Prüfungsangst zu Schlafstörungen, Panikattacken oder Vermeidung (Krankmelden) führt, ist das kein Charakterfehler, sondern etwas, wobei Schulpsychologen und Beratungslehrkräfte wirksam helfen können. Das Gespräch ist vertraulich.',
      },
    ],
    questions: [
      { id: 'll9-q1', type: 'mc', q: 'Was passiert bei einem Blackout im Gehirn?', options: ['Das Wissen ist gelöscht', 'Stresshormone blockieren den Zugriff auf Gespeichertes', 'Das Kurzzeitgedächtnis ist voll', 'Die Sprachzentren sind überlastet'], answer: 1, explain: 'Das Wissen bleibt vorhanden – nur der Abruf ist kurzzeitig gehemmt.' },
      { id: 'll9-q2', type: 'mc', q: 'Wie sollte man unmittelbar vor einer Prüfung atmen?', options: ['schnell und flach', 'länger ausatmen als einatmen', 'Luft anhalten', 'möglichst tief einatmen und halten'], answer: 1, explain: 'Verlängertes Ausatmen aktiviert den beruhigenden Teil des Nervensystems.' },
      { id: 'll9-q3', type: 'truefalse', q: 'Ein wenig Aufregung verbessert die Leistung.', answer: true, explain: 'Mittlere Erregung ist optimal – zu wenig und zu viel schaden gleichermaßen.' },
      { id: 'll9-q4', type: 'multi', q: 'Was hilft am Abend vor der Prüfung?', options: ['früh schlafen gehen', 'noch bis Mitternacht neuen Stoff lernen', 'Material bereitlegen', 'Bewegung an der frischen Luft'], answers: [0, 2, 3], explain: 'Neuer Stoff in letzter Minute verdrängt Gelerntes und kostet Schlaf.' },
      { id: 'll9-q5', type: 'mc', q: 'Womit beginnt man eine Prüfung am besten?', options: ['mit der schwierigsten Aufgabe', 'mit einer Aufgabe, die man sicher kann', 'in der vorgegebenen Reihenfolge, egal wie', 'mit der längsten Aufgabe'], answer: 1, explain: 'Ein früher Erfolg beruhigt und öffnet den Zugriff aufs Gedächtnis.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'll-10-recherche',
    subjectId: 'lernen',
    grade: 10,
    title: 'Recherchieren, Quellen prüfen, richtig zitieren',
    teaser: 'Für Referate, Seminararbeit und W-Seminar: Wie man gute Quellen findet, bewertet und korrekt angibt.',
    minutes: 18,
    tags: ['Methode', 'Quellen', 'Zitieren', 'W-Seminar'],
    blocks: [
      {
        type: 'steps',
        title: 'Effizient recherchieren',
        items: [
          '**Fragestellung zuerst**: Eine präzise Frage („Wie wirkt sich X auf Y aus?") filtert automatisch die passenden Quellen.',
          '**Vom Allgemeinen zum Speziellen**: Lexikonartikel für den Überblick, dann Fachliteratur für die Tiefe.',
          '**Literaturverzeichnisse nutzen**: Die Quellen guter Texte führen zu weiteren guten Quellen (Schneeballsystem).',
          '**Suchoperatoren einsetzen**: Anführungszeichen für exakte Phrasen, Minuszeichen zum Ausschließen, site: für eine bestimmte Domain, filetype:pdf für Fachtexte.',
          '**Bibliothekskataloge und Fachportale** statt nur Suchmaschine – Stadtbibliotheken bieten oft kostenlose Datenbankzugänge.',
        ],
      },
      {
        type: 'list',
        title: 'Quellenkritik – fünf Prüffragen',
        items: [
          '**Wer** ist der Autor? Fachliche Qualifikation? Impressum vorhanden?',
          '**Wann** entstand der Text? Bei Technik und Politik altert Wissen schnell.',
          '**Wozu** wurde er geschrieben? Informieren, überzeugen oder verkaufen?',
          '**Woher** stammen die Angaben? Sind Quellen und Studien benannt und überprüfbar?',
          '**Wie** ist der Ton? Starke Emotionalisierung, fehlende Gegenargumente und Verallgemeinerungen sind Warnzeichen.',
        ],
      },
      {
        type: 'table',
        head: ['Quelle', 'Eignung', 'Hinweis'],
        rows: [
          ['Fachbuch / Fachzeitschrift', 'sehr gut', 'begutachtet, zitierfähig'],
          ['Wikipedia', 'nur als Einstieg', 'nicht zitieren, aber die Einzelnachweise unten sind Gold wert'],
          ['Seriöse Medien', 'gut für Aktuelles', 'Autor und Datum prüfen'],
          ['Behörden, Statistikämter', 'sehr gut für Zahlen', 'Primärquelle, meist gut dokumentiert'],
          ['Blogs, Foren, Social Media', 'kaum', 'höchstens als Beleg für Meinungen'],
          ['KI-Chatbots', 'nicht zitierfähig', 'können Fakten und Quellen erfinden – immer gegenprüfen'],
        ],
      },
      {
        type: 'example',
        title: 'Richtig zitieren',
        task: 'Die drei Zitierformen im Vergleich',
        steps: [
          '**Direktes Zitat**: „Die Digitalisierung verändert das Lernen grundlegend" (Müller 2021, S. 14).',
          '**Indirektes Zitat (Paraphrase)**: Müller zufolge verändert die Digitalisierung das Lernen grundlegend (vgl. Müller 2021, S. 14).',
          '**Internetquelle**: Bayerisches Staatsministerium für Unterricht und Kultus: LehrplanPLUS Gymnasium. URL: https://… (abgerufen am 12.03.2026).',
        ],
        result: 'Jede fremde Idee braucht einen Nachweis – auch sinngemäß übernommene.',
      },
      {
        type: 'warn',
        title: 'Plagiat',
        md: 'Wer Text ohne Kennzeichnung übernimmt – auch umformuliert oder aus einer KI – begeht ein **Plagiat**. In der Seminararbeit führt das zur Note 0 Punkte und kann das Abitur gefährden. Lieber eine Quelle zu viel angeben als eine zu wenig.',
      },
      {
        type: 'merksatz',
        title: 'Notizen mit Quellenangabe',
        md: 'Schreibe die Quelle **sofort** zu jeder Notiz – inklusive Seitenzahl. Das Nachträgliche Suchen kostet am Ende mehr Zeit als das gesamte Schreiben.',
      },
    ],
    questions: [
      { id: 'll10-q1', type: 'mc', q: 'Wie geht man mit Wikipedia in einer Seminararbeit um?', options: ['gar nicht verwenden', 'als Einstieg nutzen, aber die Einzelnachweise weiterverfolgen', 'direkt zitieren', 'nur die englische Version zitieren'], answer: 1, explain: 'Wikipedia ist ein Wegweiser, keine zitierfähige Quelle.' },
      { id: 'll10-q2', type: 'multi', q: 'Welche Fragen gehören zur Quellenkritik?', options: ['Wer hat es geschrieben?', 'Wann entstand der Text?', 'Wie schön ist die Webseite gestaltet?', 'Welche Absicht verfolgt der Autor?'], answers: [0, 1, 3], explain: 'Design sagt nichts über Zuverlässigkeit aus – im Gegenteil.' },
      { id: 'll10-q3', type: 'truefalse', q: 'Auch sinngemäß übernommene Gedanken müssen belegt werden.', answer: true, explain: 'Paraphrasen werden mit „vgl." gekennzeichnet.' },
      { id: 'll10-q4', type: 'input', q: 'Mit welcher Abkürzung kennzeichnet man ein indirektes Zitat?', accept: ['vgl.', 'vgl'], explain: '„vgl." = vergleiche.' },
      { id: 'll10-q5', type: 'mc', q: 'Was gilt für Texte aus KI-Chatbots?', options: ['sie sind zitierfähig wie Fachbücher', 'sie dürfen ungekennzeichnet übernommen werden', 'sie sind nicht zitierfähig und müssen überprüft werden', 'sie ersetzen die Recherche'], answer: 2, explain: 'KI-Systeme können Quellen und Fakten erfinden – Inhalte immer an Primärquellen prüfen und die Nutzung kennzeichnen.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'll-11-referat',
    subjectId: 'lernen',
    grade: 11,
    title: 'Referate und Präsentationen, die hängen bleiben',
    teaser: 'Struktur, Folien, Sprechtechnik und der Umgang mit Nachfragen – mit Bewertungskriterien im Blick.',
    minutes: 18,
    tags: ['Präsentation', 'Rhetorik', 'Methode'],
    blocks: [
      {
        type: 'steps',
        title: 'Aufbau eines Vortrags',
        items: [
          '**Einstieg (10 %)**: Zitat, überraschende Zahl, kurze Geschichte oder Frage ans Publikum. Nie mit „Ähm, also, mein Thema ist …" beginnen.',
          '**Orientierung**: Fragestellung nennen und den Ablauf in drei Punkten ankündigen.',
          '**Hauptteil (75 %)**: Maximal **drei Kernbotschaften**. Jede mit Erklärung, Beispiel und Beleg.',
          '**Zusammenfassung**: Die drei Kernbotschaften noch einmal in einem Satz.',
          '**Schluss (15 %)**: Ausblick, Frage oder Rückbezug auf den Einstieg – das schließt den Kreis.',
        ],
      },
      {
        type: 'list',
        title: 'Foliengestaltung',
        items: [
          '**Eine Aussage pro Folie** – die Überschrift ist die Botschaft, nicht das Thema.',
          '**Maximal 6 Zeilen, keine ganzen Sätze** – Folien sind nicht dein Manuskript.',
          '**Schrift ≥ 24 pt**, hoher Kontrast, höchstens zwei Schriftarten.',
          '**Bilder und Diagramme** statt Textwüsten – ein gutes Schaubild ersetzt zehn Zeilen.',
          '**Quellen** auf der Folie klein vermerken, Literaturverzeichnis am Ende.',
          '**Keine Animationseffekte** um ihrer selbst willen.',
        ],
      },
      {
        type: 'table',
        head: ['Bewertungskriterium', 'Worauf Lehrkräfte achten'],
        rows: [
          ['Inhalt', 'Sachrichtigkeit, Tiefe, eigene Durchdringung, Quellen'],
          ['Struktur', 'roter Faden, Überleitungen, Zeitrahmen eingehalten'],
          ['Medien', 'Folien lesbar, sinnvoll eingesetzt, fehlerfrei'],
          ['Vortrag', 'frei gesprochen, Blickkontakt, Tempo, Lautstärke'],
          ['Fachgespräch', 'Nachfragen souverän beantworten'],
        ],
      },
      {
        type: 'list',
        title: 'Sprechtechnik',
        items: [
          '**Langsamer als gewohnt** sprechen – bei Aufregung wird man automatisch schnell.',
          '**Pausen** setzen: nach jeder Kernbotschaft zwei Sekunden Stille. Das wirkt souverän.',
          '**Blickkontakt** wandern lassen, jeweils einen Satz lang bei einer Person bleiben.',
          '**Füllwörter** („ähm", „halt", „sozusagen") durch eine kurze Pause ersetzen.',
          '**Hände sichtbar** halten und zum Zeigen nutzen, nicht in die Taschen.',
          '**Karteikarten** statt DIN-A4-Blatt – sie zittern nicht so sichtbar und zwingen zu Stichworten.',
        ],
      },
      {
        type: 'example',
        title: 'Mit Nachfragen umgehen',
        task: 'Was tun, wenn man die Antwort nicht weiß?',
        steps: [
          'Frage zunächst **wiederholen** – das verschafft Denkzeit und zeigt Wertschätzung.',
          'Ehrlich bleiben: „Das habe ich nicht recherchiert, meine Vermutung wäre … weil …"',
          'Nie raten und als Fakt verkaufen – das fällt im Fachgespräch sofort auf.',
          'Angebot machen: „Ich schaue das nach und bringe es in der nächsten Stunde mit."',
        ],
        result: 'Souveränität bedeutet nicht Allwissen, sondern einen klaren Umgang mit Wissenslücken.',
      },
      {
        type: 'merksatz',
        title: 'Die 10-20-30-Regel',
        md: 'Höchstens **10 Folien**, maximal **20 Minuten**, mindestens **30 pt Schriftgröße**. Eine gute Orientierung für fast jedes Schulreferat.',
      },
    ],
    questions: [
      { id: 'll11-q1', type: 'mc', q: 'Wie viele Kernbotschaften sollte ein Vortrag höchstens haben?', options: ['1', '3', '7', 'so viele wie möglich'], answer: 1, explain: 'Drei Botschaften kann ein Publikum behalten – mehr verschwimmen.' },
      { id: 'll11-q2', type: 'truefalse', q: 'Folien sollten den gesprochenen Text möglichst vollständig enthalten.', answer: false, explain: 'Dann liest das Publikum statt zuzuhören. Folien unterstützen, sie ersetzen nicht.' },
      { id: 'll11-q3', type: 'mc', q: 'Was tut man bei einer Nachfrage, die man nicht beantworten kann?', options: ['schnell etwas erfinden', 'die Frage ignorieren', 'ehrlich sagen, dass man es nicht recherchiert hat, und eine begründete Vermutung anbieten', 'das Thema wechseln'], answer: 2, explain: 'Ehrlichkeit plus fachliche Einordnung wirkt souveräner als geraten.' },
      { id: 'll11-q4', type: 'input', q: 'Wie heißt die Faustregel 10 Folien / 20 Minuten / 30 pt?', accept: ['10-20-30-Regel', '10/20/30', '10-20-30'], explain: 'Ursprünglich von Guy Kawasaki für Pitches formuliert.' },
      { id: 'll11-q5', type: 'multi', q: 'Was verbessert die Vortragswirkung?', options: ['Pausen nach Kernaussagen', 'Blickkontakt', 'schnelles Sprechen, um alles unterzubringen', 'frei sprechen mit Stichwortkarten'], answers: [0, 1, 3], explain: 'Tempo ist der häufigste Fehler – lieber weniger Inhalt, dafür verständlich.' },
    ],
  },
]
