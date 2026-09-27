import type { Topic } from '../../types'

export const matheExtra: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'ma-6-flaechen',
    subjectId: 'mathe',
    grade: 6,
    title: 'Flächeninhalt und Umfang',
    teaser: 'Rechteck, Dreieck, Parallelogramm, Trapez – und der Unterschied, den viele verwechseln.',
    minutes: 16,
    tags: ['Geometrie', 'Fläche', 'Umfang'],
    blocks: [
      {
        type: 'merksatz',
        title: 'Umfang oder Fläche?',
        md: '**Umfang** = einmal außen herumlaufen (Meter). **Fläche** = wie viel Farbe man zum Ausmalen braucht (Quadratmeter). Wenn die Einheit ein „²" hat, ist es eine Fläche.',
      },
      {
        type: 'table',
        head: ['Figur', 'Flächeninhalt', 'Umfang'],
        rows: [
          ['Rechteck', 'A = a · b', 'U = 2 · (a + b)'],
          ['Quadrat', 'A = a²', 'U = 4 · a'],
          ['Dreieck', 'A = ½ · g · h', 'U = a + b + c'],
          ['Parallelogramm', 'A = g · h', 'U = 2 · (a + b)'],
          ['Trapez', 'A = ½ · (a + c) · h', 'U = a + b + c + d'],
          ['Raute', 'A = ½ · e · f', 'U = 4 · a'],
        ],
      },
      {
        type: 'warn',
        title: 'Die Höhe ist nicht die Seite!',
        md: 'Beim Parallelogramm und Dreieck muss die Höhe **senkrecht** auf der Grundseite stehen. Die schräge Seite ist länger – wer sie einsetzt, rechnet zu viel Fläche aus.',
      },
      {
        type: 'example',
        title: 'Zusammengesetzte Figur',
        task: 'Ein L-förmiges Zimmer: Ein Rechteck 6 m × 4 m, an dessen rechter Seite ein Rechteck 3 m × 2 m fehlt. Wie groß ist die Fläche?',
        steps: [
          'Gesamtrechteck: A₁ = 6 · 4 = 24 m²',
          'Fehlendes Stück: A₂ = 3 · 2 = 6 m²',
          'Restfläche: A = 24 − 6 = 18 m²',
        ],
        result: 'A = 18 m² – Zerlegen oder Ergänzen ist bei jeder krummen Figur die Lösung.',
      },
      {
        type: 'table',
        head: ['Umrechnung', 'Faktor'],
        rows: [
          ['1 cm² = 100 mm²', '· 100'],
          ['1 dm² = 100 cm²', '· 100'],
          ['1 m² = 100 dm²', '· 100'],
          ['1 a (Ar) = 100 m²', '· 100'],
          ['1 ha = 100 a = 10 000 m²', '· 100'],
          ['1 km² = 100 ha = 1 000 000 m²', '· 100'],
        ],
        caption: 'Bei Flächen ist der Umrechnungsfaktor immer 100 – nicht 10!',
      },
      {
        type: 'example',
        title: 'Rückwärts rechnen',
        task: 'Ein Rechteck hat A = 48 cm² und a = 6 cm. Wie lang ist b, wie groß ist U?',
        steps: [
          'A = a · b → b = A : a = 48 : 6 = 8 cm',
          'U = 2 · (6 + 8) = 2 · 14 = 28 cm',
        ],
        result: 'b = 8 cm, U = 28 cm',
      },
    ],
    questions: [
      { id: 'ma6f-q1', type: 'input', q: 'Ein Dreieck hat g = 12 cm und h = 5 cm. Wie groß ist die Fläche in cm²?', accept: ['30', '30 cm²', '30cm2'], explain: 'A = ½ · 12 · 5 = 30 cm².' },
      { id: 'ma6f-q2', type: 'input', q: 'Wie viele m² sind 3 ha?', accept: ['30000', '30 000', '30000 m²'], explain: '1 ha = 10 000 m², also 3 ha = 30 000 m².' },
      { id: 'ma6f-q3', type: 'mc', q: 'Ein Quadrat hat den Umfang 36 cm. Wie groß ist seine Fläche?', options: ['36 cm²', '81 cm²', '144 cm²', '9 cm²'], answer: 1, explain: 'a = 36 : 4 = 9 cm, A = 9² = 81 cm².' },
      { id: 'ma6f-q4', type: 'truefalse', q: 'Zwei Figuren mit gleichem Umfang haben immer auch die gleiche Fläche.', answer: false, explain: 'Ein 1×9-Rechteck und ein 5×5-Quadrat haben beide U = 20, aber A = 9 bzw. A = 25.' },
      { id: 'ma6f-q5', type: 'input', q: 'Ein Trapez: a = 10 cm, c = 6 cm, h = 4 cm. Flächeninhalt in cm²?', accept: ['32'], explain: 'A = ½ · (10 + 6) · 4 = ½ · 16 · 4 = 32 cm².' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-7-prozent-zins',
    subjectId: 'mathe',
    grade: 7,
    title: 'Prozent- und Zinsrechnung',
    teaser: 'Grundwert, Prozentwert, Prozentsatz – ein Dreisatz, drei Formeln und der Trick mit dem Faktor.',
    minutes: 20,
    tags: ['Prozent', 'Zinsen', 'Dreisatz', 'Alltag'],
    blocks: [
      {
        type: 'formula',
        tex: 'P = G · p%      G = P : p%      p% = P : G',
        caption: 'G = Grundwert (das Ganze, 100 %) · P = Prozentwert · p% = Prozentsatz als Dezimalzahl',
      },
      {
        type: 'steps',
        title: 'Die drei Fragen sicher unterscheiden',
        items: [
          '**Prozentwert gesucht**: „Wie viel sind 15 % von 240 €?" → P = 240 · 0,15 = 36 €',
          '**Grundwert gesucht**: „36 € sind 15 %. Wie viel ist das Ganze?" → G = 36 : 0,15 = 240 €',
          '**Prozentsatz gesucht**: „36 € von 240 € sind wie viel Prozent?" → 36 : 240 = 0,15 = 15 %',
        ],
      },
      {
        type: 'merksatz',
        title: 'Der Faktortrick',
        md: '**+19 %** bedeutet **· 1,19** · **−30 %** bedeutet **· 0,70**. Damit werden Zu- und Abschläge zu einer einzigen Multiplikation – und mehrere Änderungen multipliziert man einfach hintereinander.',
      },
      {
        type: 'example',
        title: 'Rabatt und Mehrwertsteuer',
        task: 'Ein Fahrrad kostet 480 €. Es gibt 25 % Rabatt. Wie viel zahlt man?',
        steps: [
          'Faktor bilden: 100 % − 25 % = 75 % = 0,75',
          '480 · 0,75 = 360 €',
          'Gegenprobe: 25 % von 480 = 120 €, und 480 − 120 = 360 € ✓',
        ],
        result: 'Endpreis 360 €',
      },
      {
        type: 'example',
        title: 'Vom verminderten Grundwert zurück',
        task: 'Nach 20 % Rabatt kostet eine Jacke 68 €. Was war der ursprüngliche Preis?',
        steps: [
          '68 € entsprechen 80 % des Originalpreises',
          'G = 68 : 0,80 = 85 €',
          'Probe: 85 · 0,8 = 68 ✓',
        ],
        result: 'Ursprünglich 85 € – nicht 68 · 1,2 = 81,60 €! Das ist der klassische Denkfehler.',
      },
      {
        type: 'formula',
        tex: 'Z = K · p% · t/12     (t = Laufzeit in Monaten)',
        caption: 'Jahreszinsen: Z = K · p%. Für Monate anteilig, für Tage mit t/360.',
      },
      {
        type: 'example',
        title: 'Zinsen für Teiljahre',
        task: '2 400 € werden für 7 Monate zu 3 % p. a. angelegt. Wie hoch sind die Zinsen?',
        steps: [
          'Jahreszinsen: 2400 · 0,03 = 72 €',
          'Anteil für 7 Monate: 72 · 7/12 = 42 €',
        ],
        result: 'Z = 42 €',
      },
      {
        type: 'text',
        md: 'Bei **Zinseszins** wird der Zins mitverzinst. Nach n Jahren gilt K_n = K₀ · (1 + p%)ⁿ. Aus 1 000 € bei 4 % werden nach 10 Jahren 1 000 · 1,04¹⁰ ≈ 1 480,24 € – deutlich mehr als die 1 400 € bei einfacher Verzinsung.',
      },
      {
        type: 'warn',
        title: 'Prozent ≠ Prozentpunkte',
        md: 'Steigt ein Zinssatz von 2 % auf 3 %, ist das eine Erhöhung um **1 Prozentpunkt**, aber um **50 Prozent**. In Zeitungen wird das ständig verwechselt – in der Schulaufgabe zählt es als Fehler.',
      },
    ],
    questions: [
      { id: 'ma7pz-q1', type: 'input', q: 'Wie viel sind 12 % von 350 €? (nur Zahl)', accept: ['42', '42 €', '42€'], explain: '350 · 0,12 = 42.' },
      { id: 'ma7pz-q2', type: 'input', q: 'Ein Preis wird um 20 % gesenkt und kostet dann 96 €. Wie hoch war der alte Preis in €?', accept: ['120', '120 €'], explain: '96 : 0,8 = 120 €.' },
      { id: 'ma7pz-q3', type: 'mc', q: 'Mit welchem Faktor multipliziert man bei einer Erhöhung um 7 %?', options: ['0,07', '0,93', '1,07', '7'], answer: 2, explain: '100 % + 7 % = 107 % = 1,07.' },
      { id: 'ma7pz-q4', type: 'mc', q: 'Ein Preis steigt um 10 % und fällt danach um 10 %. Was gilt?', options: ['Er ist wieder gleich', 'Er ist um 1 % niedriger', 'Er ist um 1 % höher', 'Er ist um 10 % niedriger'], answer: 1, explain: '1,10 · 0,90 = 0,99 – also 1 % unter dem Ausgangswert.' },
      { id: 'ma7pz-q5', type: 'input', q: '1 500 € zu 4 % für 9 Monate: Wie hoch sind die Zinsen in €?', accept: ['45', '45 €'], explain: '1500 · 0,04 = 60 € pro Jahr, davon 9/12 = 45 €.' },
      { id: 'ma7pz-q6', type: 'truefalse', q: 'Eine Steigerung von 4 % auf 6 % ist eine Steigerung um 2 %.', answer: false, explain: 'Es sind 2 Prozentpunkte, aber 50 Prozent Steigerung.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-8-kreis',
    subjectId: 'mathe',
    grade: 8,
    title: 'Der Kreis: Umfang, Fläche und Kreisteile',
    teaser: 'Woher π kommt, wie man Sektoren berechnet und warum doppelter Radius die vierfache Fläche bedeutet.',
    minutes: 18,
    tags: ['Geometrie', 'Kreis', 'Pi'],
    blocks: [
      {
        type: 'text',
        md: 'Teilt man bei **jedem** Kreis den Umfang durch den Durchmesser, kommt immer dieselbe Zahl heraus: **π ≈ 3,14159…** Diese Konstanz ist der Kern der Kreisgeometrie.',
      },
      {
        type: 'formula',
        tex: 'U = 2 · π · r = π · d        A = π · r²',
        caption: 'r = Radius, d = Durchmesser = 2r',
      },
      {
        type: 'example',
        title: 'Vom Umfang zur Fläche',
        task: 'Ein Kreis hat den Umfang 31,4 cm. Wie groß ist seine Fläche?',
        steps: [
          'U = 2πr → r = U : (2π) = 31,4 : 6,283 ≈ 5 cm',
          'A = π · r² = π · 25 ≈ 78,54 cm²',
        ],
        result: 'A ≈ 78,5 cm²',
      },
      {
        type: 'formula',
        tex: 'Kreissektor:  A = (α/360°) · π r²      Bogenlänge:  b = (α/360°) · 2π r',
        caption: 'Ein Sektor ist ein „Tortenstück" – man nimmt den Anteil α/360° vom ganzen Kreis.',
      },
      {
        type: 'example',
        title: 'Kreissektor berechnen',
        task: 'Ein Sektor mit r = 6 cm und α = 120°. Fläche und Bogenlänge?',
        steps: [
          'Anteil: 120/360 = 1/3',
          'A = ⅓ · π · 36 = 12π ≈ 37,70 cm²',
          'b = ⅓ · 2π · 6 = 4π ≈ 12,57 cm',
          'Umfang des Sektors (mit beiden Radien): 12,57 + 6 + 6 = 24,57 cm',
        ],
        result: 'A ≈ 37,7 cm², b ≈ 12,6 cm',
      },
      {
        type: 'merksatz',
        title: 'Verdopplungsregel',
        md: 'Verdoppelt man den Radius, **verdoppelt** sich der Umfang, aber die Fläche **vervierfacht** sich (weil r quadriert wird). Bei dreifachem Radius: neunfache Fläche.',
      },
      {
        type: 'warn',
        title: 'Radius oder Durchmesser?',
        md: 'Die häufigste Fehlerquelle: In der Aufgabe steht der **Durchmesser**, in der Formel steht der **Radius**. Immer zuerst halbieren – und die Einheit prüfen.',
      },
      {
        type: 'steps',
        title: 'Zusammengesetzte Flächen',
        items: [
          'Figur in bekannte Teile zerlegen: Halbkreise, Viertelkreise, Rechtecke.',
          'Jede Teilfläche einzeln berechnen und notieren.',
          'Addieren oder subtrahieren – ein Loch wird abgezogen.',
          'Beim Umfang nur die **tatsächlichen Randstücke** zählen, nicht die inneren Hilfslinien!',
        ],
      },
    ],
    questions: [
      { id: 'ma8kr-q1', type: 'input', q: 'Kreis mit r = 7 cm: Fläche in cm² (auf 1 Stelle gerundet)?', accept: ['153,9', '153.9', '153,94', '153,938'], explain: 'A = π · 49 ≈ 153,94 cm².' },
      { id: 'ma8kr-q2', type: 'mc', q: 'Ein Kreis hat d = 10 cm. Wie groß ist der Umfang?', options: ['≈ 15,7 cm', '≈ 31,4 cm', '≈ 62,8 cm', '≈ 78,5 cm'], answer: 1, explain: 'U = π · d = π · 10 ≈ 31,42 cm.' },
      { id: 'ma8kr-q3', type: 'mc', q: 'Der Radius wird verdreifacht. Wie ändert sich die Fläche?', options: ['·3', '·6', '·9', '·27'], answer: 2, explain: 'A ~ r², also (3r)² = 9r².' },
      { id: 'ma8kr-q4', type: 'input', q: 'Halbkreis mit r = 4 cm: Fläche in cm² (auf 2 Stellen)?', accept: ['25,13', '25.13', '25,12', '25,132'], explain: '½ · π · 16 = 8π ≈ 25,13 cm².' },
      { id: 'ma8kr-q5', type: 'input', q: 'Welchen Winkel hat ein Kreissektor, dessen Fläche ein Viertel des Kreises ist? (in Grad)', accept: ['90', '90°'], explain: '¼ von 360° = 90°.' },
      { id: 'ma8kr-q6', type: 'truefalse', q: 'Der Umfang eines Halbkreises ist die halbe Kreislinie plus der Durchmesser.', answer: true, explain: 'Die gerade Kante gehört zum Rand und muss mitgezählt werden.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-8-statistik',
    subjectId: 'mathe',
    grade: 8,
    title: 'Daten auswerten: Mittelwert, Median, Boxplot',
    teaser: 'Warum das arithmetische Mittel manchmal lügt – und welche Kennzahl dann besser ist.',
    minutes: 18,
    tags: ['Statistik', 'Median', 'Boxplot', 'Daten'],
    blocks: [
      {
        type: 'table',
        head: ['Kennzahl', 'Berechnung', 'Eigenschaft'],
        rows: [
          ['Arithmetisches Mittel', 'Summe : Anzahl', 'nutzt alle Werte, reagiert stark auf Ausreißer'],
          ['Median (Zentralwert)', 'mittlerer Wert der geordneten Liste', 'robust gegen Ausreißer'],
          ['Modalwert', 'häufigster Wert', 'auch bei Nicht-Zahlen möglich'],
          ['Spannweite', 'Maximum − Minimum', 'sehr grob, nur zwei Werte'],
          ['Quartilsabstand', 'Q₃ − Q₁', 'Streuung der mittleren 50 %'],
        ],
      },
      {
        type: 'example',
        title: 'Wenn das Mittel lügt',
        task: 'Gehälter in einer kleinen Firma (in T€): 30, 32, 33, 35, 36, 38, 400',
        steps: [
          'Mittelwert: (30+32+33+35+36+38+400) : 7 = 604 : 7 ≈ 86,3 T€',
          'Median: der 4. von 7 geordneten Werten = 35 T€',
          'Kein einziger normaler Angestellter verdient in der Nähe des Mittelwerts!',
        ],
        result: 'Bei Ausreißern ist der **Median** die ehrlichere Kennzahl.',
      },
      {
        type: 'steps',
        title: 'Median bestimmen',
        items: [
          'Alle Werte der Größe nach ordnen.',
          'Bei **ungerader** Anzahl: Der mittlere Wert ist der Median.',
          'Bei **gerader** Anzahl: Mittelwert der beiden mittleren Werte.',
          'Beispiel: 2, 4, 7, 9 → Median = (4 + 7) : 2 = 5,5',
        ],
      },
      {
        type: 'steps',
        title: 'Boxplot zeichnen',
        items: [
          'Minimum und Maximum bestimmen → die „Antennen" (Whisker).',
          'Median bestimmen → Strich in der Box.',
          'Unteres Quartil Q₁ = Median der unteren Hälfte, oberes Quartil Q₃ = Median der oberen Hälfte.',
          'Box von Q₁ bis Q₃ zeichnen – darin liegen die mittleren 50 % aller Daten.',
        ],
      },
      {
        type: 'example',
        title: 'Boxplot-Werte berechnen',
        task: 'Datensatz: 3, 5, 6, 8, 9, 11, 14, 15, 18',
        steps: [
          'Anzahl n = 9, geordnet ✓',
          'Median = 5. Wert = 9',
          'Untere Hälfte (3, 5, 6, 8) → Q₁ = (5+6)/2 = 5,5',
          'Obere Hälfte (11, 14, 15, 18) → Q₃ = (14+15)/2 = 14,5',
          'Spannweite = 18 − 3 = 15, Quartilsabstand = 14,5 − 5,5 = 9',
        ],
        result: 'Min 3 | Q₁ 5,5 | Median 9 | Q₃ 14,5 | Max 18',
      },
      {
        type: 'warn',
        title: 'Diagramme kritisch lesen',
        md: 'Beginnt die y-Achse nicht bei 0, wirken kleine Unterschiede riesig. Bei 3D-Tortendiagrammen erscheinen vordere Stücke größer. Immer Achsenbeschriftung, Skala und Datenquelle prüfen.',
      },
      {
        type: 'merksatz',
        md: '**Symmetrische Daten → Mittelwert.** **Schiefe Daten oder Ausreißer → Median.** Deshalb spricht man beim Einkommen immer vom Median.',
      },
    ],
    questions: [
      { id: 'ma8st-q1', type: 'input', q: 'Median von 4, 8, 15, 16, 23, 42?', accept: ['15,5', '15.5'], explain: 'Gerade Anzahl → (15 + 16) : 2 = 15,5.' },
      { id: 'ma8st-q2', type: 'mc', q: 'Welche Kennzahl reagiert am stärksten auf einen extremen Ausreißer?', options: ['Median', 'Modalwert', 'arithmetisches Mittel', 'Quartilsabstand'], answer: 2, explain: 'Der Mittelwert nutzt alle Werte – ein Extremwert zieht ihn mit.' },
      { id: 'ma8st-q3', type: 'input', q: 'Arithmetisches Mittel von 12, 15, 18, 15?', accept: ['15'], explain: '(12+15+18+15) : 4 = 60 : 4 = 15.' },
      { id: 'ma8st-q4', type: 'truefalse', q: 'Die Box eines Boxplots enthält die mittleren 50 % der Daten.', answer: true, explain: 'Sie reicht von Q₁ bis Q₃.' },
      { id: 'ma8st-q5', type: 'mc', q: 'Bei Einkommensstatistiken nutzt man meist den Median. Warum?', options: ['er ist leichter zu berechnen', 'er ist robust gegen sehr hohe Einkommen', 'er ist immer größer', 'er berücksichtigt alle Werte'], answer: 1, explain: 'Wenige Spitzenverdiener würden den Mittelwert stark verzerren.' },
      { id: 'ma8st-q6', type: 'input', q: 'Spannweite von 7, 3, 19, 11, 5?', accept: ['16'], explain: '19 − 3 = 16.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-9-bruchgleichungen',
    subjectId: 'mathe',
    grade: 9,
    title: 'Bruchterme und Bruchgleichungen',
    teaser: 'Definitionsmenge, Hauptnenner, Scheinlösungen – der sicherste Weg durch Brüche mit x im Nenner.',
    minutes: 20,
    tags: ['Algebra', 'Bruchterme', 'Gleichungen'],
    blocks: [
      {
        type: 'warn',
        title: 'Immer zuerst: Definitionsmenge!',
        md: 'Durch null darf man nicht teilen. Setze jeden Nenner gleich null und schließe diese x-Werte aus. Wer die Definitionsmenge vergisst, verliert auch bei richtiger Rechnung Punkte.',
      },
      {
        type: 'steps',
        title: 'Bruchgleichung lösen – die Reihenfolge',
        items: [
          '**Nenner faktorisieren** (oft mit binomischen Formeln oder Ausklammern).',
          '**Definitionsmenge bestimmen**: alle Nullstellen der Nenner ausschließen.',
          '**Hauptnenner** bilden (kleinstes gemeinsames Vielfaches aller Nenner).',
          'Gleichung **mit dem Hauptnenner multiplizieren** – alle Brüche verschwinden.',
          'Die entstandene Gleichung normal lösen.',
          '**Probe gegen die Definitionsmenge**: Lösungen, die ausgeschlossen sind, streichen (Scheinlösungen).',
        ],
      },
      {
        type: 'example',
        title: 'Komplette Musterlösung',
        task: 'Löse: 3/(x−2) = 5/(x+2)',
        steps: [
          'Nenner: x − 2 = 0 → x = 2 ; x + 2 = 0 → x = −2',
          'D = ℝ \\ {2; −2}',
          'Hauptnenner: (x−2)(x+2) – beide Seiten damit multiplizieren',
          '3(x+2) = 5(x−2)',
          '3x + 6 = 5x − 10  |−3x, +10',
          '16 = 2x → x = 8',
          'x = 8 liegt in D ✓',
        ],
        result: 'L = {8}',
      },
      {
        type: 'example',
        title: 'Scheinlösung entlarven',
        task: 'Löse: x/(x−3) = 3/(x−3) + 2',
        steps: [
          'D = ℝ \\ {3}',
          'Mit (x−3) multiplizieren: x = 3 + 2(x−3)',
          'x = 3 + 2x − 6 → x = 2x − 3 → x = 3',
          'Aber x = 3 ist ausgeschlossen!',
        ],
        result: 'L = { } – die Gleichung hat keine Lösung. Genau dafür macht man die Definitionsmenge.',
      },
      {
        type: 'list',
        title: 'Bruchterme kürzen',
        items: [
          'Nur **Faktoren** dürfen gekürzt werden, niemals Summanden: (x+2)/(x+3) lässt sich **nicht** kürzen.',
          'Zuerst Zähler und Nenner faktorisieren: (x²−4)/(x+2) = (x−2)(x+2)/(x+2) = x − 2',
          'Die Definitionsmenge bleibt trotz Kürzen bestehen: x ≠ −2!',
          'Merksatz: **„Aus Summen kürzen nur die Dummen."**',
        ],
      },
      {
        type: 'text',
        md: '**Addieren und Subtrahieren**: erst auf den Hauptnenner erweitern, dann Zähler verrechnen. **Multiplizieren**: Zähler mal Zähler, Nenner mal Nenner (vorher kürzen spart Arbeit). **Dividieren**: mit dem Kehrbruch multiplizieren.',
      },
    ],
    questions: [
      { id: 'ma9bg-q1', type: 'input', q: 'Bestimme die Definitionsmenge von 5/(x−4): Welcher Wert muss ausgeschlossen werden?', accept: ['4', 'x = 4', 'x=4'], explain: 'Der Nenner x − 4 wird für x = 4 null.' },
      { id: 'ma9bg-q2', type: 'input', q: 'Löse: 2/x = 8. (nur Zahl)', accept: ['0,25', '0.25', '1/4'], explain: '2 = 8x → x = 0,25, liegt in D = ℝ\\{0}.' },
      { id: 'ma9bg-q3', type: 'mc', q: 'Was ergibt (x² − 9)/(x − 3) gekürzt?', options: ['x − 3', 'x + 3', 'x² − 3', 'nicht kürzbar'], answer: 1, explain: 'x² − 9 = (x−3)(x+3); der Faktor (x−3) kürzt sich weg.' },
      { id: 'ma9bg-q4', type: 'truefalse', q: '(x + 5)/(x + 2) lässt sich zu 5/2 kürzen.', answer: false, explain: 'Aus Summen darf man nicht kürzen – nur gemeinsame Faktoren.' },
      { id: 'ma9bg-q5', type: 'mc', q: 'Warum muss man am Ende die Probe machen?', options: ['zur Kontrolle der Rechnung', 'weil Scheinlösungen außerhalb der Definitionsmenge liegen können', 'weil der Taschenrechner rundet', 'das ist nicht nötig'], answer: 1, explain: 'Das Multiplizieren mit dem Hauptnenner kann Lösungen erzeugen, die ursprünglich verboten sind.' },
      { id: 'ma9bg-q6', type: 'input', q: 'Welchen Hauptnenner haben 1/(x−1) und 1/(x+1)?', accept: ['(x-1)(x+1)', '(x−1)(x+1)', 'x²-1', 'x^2-1', 'x²−1'], explain: 'Das Produkt der teilerfremden Nenner – gleich x² − 1.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-10-trigonometrische-funktionen',
    subjectId: 'mathe',
    grade: 10,
    title: 'Sinus- und Kosinusfunktion',
    teaser: 'Vom Einheitskreis zur Welle: Amplitude, Periode, Verschiebung – und wie man Gleichungen mit sin/cos löst.',
    minutes: 22,
    tags: ['Trigonometrie', 'Funktionen', 'Bogenmaß'],
    blocks: [
      {
        type: 'text',
        md: 'Am **Einheitskreis** (r = 1) ist sin α die y-Koordinate und cos α die x-Koordinate des Punktes zum Winkel α. Lässt man α wachsen, entsteht eine Welle – die Sinusfunktion. Sie beschreibt alles Periodische: Töne, Wechselstrom, Gezeiten, Tageslängen.',
      },
      {
        type: 'table',
        head: ['Winkel (Grad)', 'Bogenmaß', 'sin', 'cos'],
        rows: [
          ['0°', '0', '0', '1'],
          ['30°', 'π/6', '½', '√3/2'],
          ['45°', 'π/4', '√2/2', '√2/2'],
          ['60°', 'π/3', '√3/2', '½'],
          ['90°', 'π/2', '1', '0'],
          ['180°', 'π', '0', '−1'],
          ['270°', '3π/2', '−1', '0'],
          ['360°', '2π', '0', '1'],
        ],
        caption: 'Diese Werte sollte man auswendig kennen – sie kommen in jeder Prüfung vor.',
      },
      {
        type: 'formula',
        tex: 'f(x) = a · sin( b · (x − c) ) + d',
        caption: 'a = Amplitude · Periode = 2π/b · c = Verschiebung nach rechts · d = Verschiebung nach oben',
      },
      {
        type: 'example',
        title: 'Parameter ablesen',
        task: 'f(x) = 3 · sin(2x − π) + 1 – beschreibe den Graphen.',
        steps: [
          'Erst ausklammern: 2x − π = 2(x − π/2)',
          'a = 3 → Amplitude 3, Werte zwischen −2 und 4',
          'b = 2 → Periode = 2π/2 = π (doppelt so schnell)',
          'c = π/2 → um π/2 nach rechts verschoben',
          'd = 1 → Mittellinie bei y = 1',
        ],
        result: 'Wertebereich [−2; 4], Periode π, Nulldurchgang der Mittellinie bei x = π/2.',
      },
      {
        type: 'steps',
        title: 'Gleichung sin(x) = k lösen',
        items: [
          'Hauptlösung mit dem Taschenrechner: x₁ = arcsin(k).',
          'Zweite Lösung im Intervall [0; 2π]: x₂ = π − x₁ (für sin).',
          'Bei cos gilt stattdessen: x₂ = 2π − x₁.',
          'Alle weiteren Lösungen durch Addition der Periode: x = x₁ + k·2π, k ∈ ℤ.',
          'Zum Schluss prüfen, welche Lösungen im geforderten Intervall liegen.',
        ],
      },
      {
        type: 'example',
        title: 'Gleichung im Intervall lösen',
        task: 'Löse sin(x) = 0,5 für x ∈ [0; 2π].',
        steps: [
          'x₁ = arcsin(0,5) = π/6 ≈ 0,524',
          'x₂ = π − π/6 = 5π/6 ≈ 2,618',
          'Weitere Lösungen lägen außerhalb des Intervalls',
        ],
        result: 'L = {π/6; 5π/6}',
      },
      {
        type: 'merksatz',
        title: 'Umrechnung Grad ↔ Bogenmaß',
        md: '**Bogenmaß = Grad · π/180** und **Grad = Bogenmaß · 180/π**. Eselsbrücke: 180° entspricht π – der halbe Kreis.',
      },
      {
        type: 'warn',
        title: 'Taschenrechner-Modus',
        md: 'DEG oder RAD? Der häufigste Fehler in Trigonometrie-Aufgaben ist der falsche Winkelmodus. In der Oberstufe rechnet man fast immer im **Bogenmaß (RAD)**.',
      },
    ],
    questions: [
      { id: 'ma10tf-q1', type: 'input', q: 'Welche Periode hat f(x) = sin(4x)? (als Vielfaches von π, z. B. "pi/2")', accept: ['pi/2', 'π/2', '0,5pi', 'π:2'], explain: 'Periode = 2π/b = 2π/4 = π/2.' },
      { id: 'ma10tf-q2', type: 'mc', q: 'Welchen Wertebereich hat f(x) = 2·sin(x) − 3?', options: ['[−2; 2]', '[−5; −1]', '[−1; 5]', '[−3; 3]'], answer: 1, explain: 'Amplitude 2 um die Mittellinie −3: von −5 bis −1.' },
      { id: 'ma10tf-q3', type: 'input', q: 'Wandle 135° ins Bogenmaß um (als Vielfaches von π).', accept: ['3pi/4', '3π/4', '0,75pi', '3/4 pi'], explain: '135 · π/180 = 3π/4.' },
      { id: 'ma10tf-q4', type: 'mc', q: 'Wie viele Lösungen hat cos(x) = 0,3 im Intervall [0; 2π]?', options: ['0', '1', '2', '4'], answer: 2, explain: 'Eine im ersten und eine im vierten Quadranten.' },
      { id: 'ma10tf-q5', type: 'input', q: 'Wie groß ist sin(90°)?', accept: ['1'], explain: 'Am Einheitskreis ist die y-Koordinate bei 90° gleich 1.' },
      { id: 'ma10tf-q6', type: 'truefalse', q: 'Der Graph von cos(x) entsteht aus sin(x) durch Verschiebung um π/2 nach links.', answer: true, explain: 'cos(x) = sin(x + π/2).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-11-grenzwerte',
    subjectId: 'mathe',
    grade: 11,
    title: 'Grenzwerte und Stetigkeit',
    teaser: 'Verhalten im Unendlichen, Polstellen, hebbare Lücken – die Sprache der Analysis.',
    minutes: 22,
    tags: ['Analysis', 'Grenzwert', 'Stetigkeit'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Ein **Grenzwert** beschreibt, welchem Wert sich eine Funktion nähert, wenn x gegen eine Stelle oder gegen unendlich läuft. Erreicht werden muss dieser Wert nicht – es geht um die Tendenz.',
      },
      {
        type: 'steps',
        title: 'Verhalten für x → ±∞ bei rationalen Funktionen',
        items: [
          'Zählergrad **kleiner** als Nennergrad → Grenzwert 0 (waagrechte Asymptote y = 0).',
          'Zählergrad **gleich** Nennergrad → Grenzwert = Quotient der Leitkoeffizienten.',
          'Zählergrad **genau 1 größer** → schiefe Asymptote (Polynomdivision durchführen).',
          'Zählergrad **mehr als 1 größer** → Funktion wächst über alle Grenzen.',
        ],
      },
      {
        type: 'example',
        title: 'Grenzwerte im Unendlichen',
        task: 'Bestimme lim (3x² + 5x) / (2x² − 7) für x → ∞.',
        steps: [
          'Höchste Potenz im Nenner ausklammern und kürzen: x²(3 + 5/x) / x²(2 − 7/x²)',
          'Für x → ∞ gehen 5/x und 7/x² gegen 0',
          'Übrig bleibt 3/2',
        ],
        result: 'Der Grenzwert ist 1,5 – die Gerade y = 1,5 ist waagrechte Asymptote.',
      },
      {
        type: 'compare',
        title: 'Polstelle oder hebbare Lücke?',
        left: {
          head: 'Polstelle',
          items: ['Nennernullstelle bleibt nach dem Kürzen', 'Funktion strebt gegen ±∞', 'senkrechte Asymptote', 'Beispiel: 1/(x−2) bei x = 2'],
        },
        right: {
          head: 'Hebbare Lücke',
          items: ['Nullstelle kürzt sich weg', 'Grenzwert existiert und ist endlich', 'nur ein „Loch" im Graphen', 'Beispiel: (x²−4)/(x−2) bei x = 2 → Lücke bei (2|4)'],
        },
      },
      {
        type: 'text',
        md: 'Eine Funktion heißt an einer Stelle x₀ **stetig**, wenn drei Bedingungen gelten: f(x₀) ist definiert, der Grenzwert existiert (links- und rechtsseitiger Grenzwert stimmen überein) und beide sind gleich. Anschaulich: Man kann den Graphen zeichnen, ohne den Stift abzusetzen.',
      },
      {
        type: 'example',
        title: 'Stetigkeit einer abschnittsweisen Funktion prüfen',
        task: 'f(x) = x + 1 für x < 2 und f(x) = a·x für x ≥ 2. Für welches a ist f stetig?',
        steps: [
          'Linksseitiger Grenzwert: lim(x→2⁻) (x+1) = 3',
          'Rechtsseitiger Grenzwert und Funktionswert: a · 2',
          'Gleichsetzen: 2a = 3 → a = 1,5',
        ],
        result: 'Für a = 1,5 ist die Funktion an der Nahtstelle stetig.',
      },
      {
        type: 'warn',
        title: 'Unbestimmte Ausdrücke',
        md: '0/0 und ∞/∞ sind **keine Ergebnisse**, sondern Aufforderungen zum Umformen: kürzen, faktorisieren, höchste Potenz ausklammern oder (in der Oberstufe) l’Hospital anwenden.',
      },
      {
        type: 'merksatz',
        title: 'Merkspruch',
        md: '„**Konstante durch Riesig ist Null, Riesig durch Konstante ist Riesig.**" Damit lässt sich fast jeder Grenzwert im Unendlichen abschätzen.',
      },
    ],
    questions: [
      { id: 'ma11gw-q1', type: 'input', q: 'Bestimme lim (4x³ − x)/(2x³ + 5) für x → ∞.', accept: ['2'], explain: 'Gleicher Grad → Quotient der Leitkoeffizienten 4/2 = 2.' },
      { id: 'ma11gw-q2', type: 'mc', q: 'Welchen Grenzwert hat (2x + 3)/(x² − 1) für x → ∞?', options: ['0', '2', '∞', 'existiert nicht'], answer: 0, explain: 'Nennergrad größer → Grenzwert 0.' },
      { id: 'ma11gw-q3', type: 'mc', q: 'Bei f(x) = (x² − 9)/(x − 3) liegt bei x = 3 …', options: ['eine Polstelle', 'eine hebbare Lücke', 'eine Nullstelle', 'ein Sprung'], answer: 1, explain: 'Der Faktor (x−3) kürzt sich – der Grenzwert ist 6, es bleibt ein Loch.' },
      { id: 'ma11gw-q4', type: 'truefalse', q: 'Eine Funktion ist an einer Polstelle stetig fortsetzbar.', answer: false, explain: 'Nur hebbare Lücken lassen sich stetig schließen; an Polstellen geht die Funktion gegen ±∞.' },
      { id: 'ma11gw-q5', type: 'input', q: 'f(x) = x² für x < 1, f(x) = c für x ≥ 1. Für welches c ist f stetig?', accept: ['1', 'c = 1', 'c=1'], explain: 'Der linksseitige Grenzwert ist 1² = 1.' },
      { id: 'ma11gw-q6', type: 'mc', q: 'Zählergrad ist genau um 1 größer als Nennergrad. Was folgt?', options: ['waagrechte Asymptote', 'schiefe Asymptote', 'Grenzwert 0', 'keine Asymptote'], answer: 1, explain: 'Die Polynomdivision liefert eine lineare Funktion als Asymptote.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-12-extremwertaufgaben',
    subjectId: 'mathe',
    grade: 12,
    title: 'Extremwertaufgaben (Optimierung)',
    teaser: 'Die größte Dose mit dem wenigsten Blech: Zielfunktion, Nebenbedingung, Randwerte – das feste Schema.',
    minutes: 24,
    tags: ['Analysis', 'Optimierung', 'Abitur'],
    abi: true,
    blocks: [
      {
        type: 'steps',
        title: 'Das Schema – jede Extremwertaufgabe, immer gleich',
        items: [
          '**Skizze** anfertigen und alle Größen benennen.',
          '**Zielfunktion** aufstellen: Was soll maximal/minimal werden? (z. B. A, V, Kosten)',
          '**Nebenbedingung** finden: Welche Größe ist fest vorgegeben? (z. B. Umfang, Materialmenge)',
          'Nebenbedingung nach einer Variablen auflösen und **einsetzen** – die Zielfunktion hat danach nur noch **eine** Variable.',
          '**Definitionsbereich** angeben (Längen sind positiv!).',
          '**Ableiten und null setzen**, Lösungen bestimmen.',
          '**Art des Extremums nachweisen** (Vorzeichenwechsel oder zweite Ableitung).',
          '**Randwerte prüfen** und Ergebnis im Sachzusammenhang mit Einheit angeben.',
        ],
      },
      {
        type: 'example',
        title: 'Klassiker: größte Rechteckfläche',
        task: 'Ein Rechteck hat den Umfang 40 m. Wann ist die Fläche maximal?',
        steps: [
          'Zielfunktion: A = a · b',
          'Nebenbedingung: 2a + 2b = 40 → b = 20 − a',
          'Einsetzen: A(a) = a(20 − a) = 20a − a², D = ]0; 20[',
          "A'(a) = 20 − 2a = 0 → a = 10",
          "A''(a) = −2 < 0 → Maximum",
          'b = 20 − 10 = 10',
        ],
        result: 'Das Quadrat mit 10 m × 10 m hat mit 100 m² die größte Fläche.',
      },
      {
        type: 'example',
        title: 'Klassiker: Dose mit minimalem Materialverbrauch',
        task: 'Eine zylindrische Dose soll 1 Liter (1000 cm³) fassen. Welche Maße minimieren die Oberfläche?',
        steps: [
          'Zielfunktion: O = 2πr² + 2πrh',
          'Nebenbedingung: V = πr²h = 1000 → h = 1000/(πr²)',
          'Einsetzen: O(r) = 2πr² + 2000/r',
          "O'(r) = 4πr − 2000/r² = 0 → 4πr³ = 2000 → r³ = 500/π",
          'r ≈ 5,42 cm, daraus h ≈ 10,84 cm',
        ],
        result: 'Optimal ist **h = 2r** – die Dose ist so hoch wie breit. (Reale Dosen sind schlanker, weil Deckel teurer sind als Mantelblech.)',
      },
      {
        type: 'text',
        md: '**Abstandsprobleme** löst man mit demselben Schema. Trick: Statt d = √(…) minimiert man **d²** – die Wurzel ändert die Lage des Minimums nicht, spart aber die Kettenregel und vermeidet Rechenfehler.',
      },
      {
        type: 'warn',
        title: 'Typische Punkteverluste',
        md: 'Definitionsbereich vergessen · Randwerte nicht geprüft (das Maximum kann am Rand liegen!) · Art des Extremums nicht nachgewiesen · Antwortsatz ohne Einheit · nach a gefragt, aber nur A(a) angegeben.',
      },
      {
        type: 'merksatz',
        title: 'Zwei Variablen, eine Gleichung zu wenig?',
        md: 'Dann fehlt die Nebenbedingung. **Jede Extremwertaufgabe enthält genau eine feste Vorgabe** – sie steht meist im ersten Satz („mit einem Zaun von 100 m Länge …").',
      },
    ],
    questions: [
      { id: 'ma12ex-q1', type: 'mc', q: 'Welche Funktion leitet man bei einer Extremwertaufgabe ab?', options: ['die Nebenbedingung', 'die Zielfunktion nach dem Einsetzen', 'beide gleichzeitig', 'die Umkehrfunktion'], answer: 1, explain: 'Erst einsetzen, damit nur noch eine Variable übrig ist, dann ableiten.' },
      { id: 'ma12ex-q2', type: 'input', q: 'Rechteck mit Umfang 24 cm: Welche Seitenlänge a maximiert die Fläche? (in cm)', accept: ['6'], explain: 'Das Quadrat ist optimal: a = 24/4 = 6 cm.' },
      { id: 'ma12ex-q3', type: 'truefalse', q: 'Bei Abstandsaufgaben darf man statt d auch d² minimieren.', answer: true, explain: 'Die Wurzelfunktion ist streng monoton – die Minimumstelle bleibt gleich.' },
      { id: 'ma12ex-q4', type: 'mc', q: 'Wie weist man nach, dass eine Stelle ein Maximum ist?', options: ["f'(x) = 0 genügt", "f''(x) < 0 oder Vorzeichenwechsel von + nach −", "f(x) > 0", 'durch Einsetzen in die Nebenbedingung'], answer: 1, explain: 'Notwendig ist f\'(x) = 0, hinreichend ist f\'\'(x) < 0.' },
      { id: 'ma12ex-q5', type: 'multi', q: 'Was gehört zur vollständigen Lösung dazu?', options: ['Definitionsbereich', 'Prüfung der Randwerte', 'Antwortsatz mit Einheit', 'Skizze der Umkehrfunktion'], answers: [0, 1, 2], explain: 'Die Umkehrfunktion spielt keine Rolle.' },
      { id: 'ma12ex-q6', type: 'input', q: 'Bei der optimalen 1-Liter-Dose gilt h = ? · r', accept: ['2', '2r', 'zwei'], explain: 'Die materialsparendste Dose ist so hoch wie ihr Durchmesser: h = 2r.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ma-12-hypothesentest',
    subjectId: 'mathe',
    grade: 12,
    title: 'Signifikanztest / Hypothesentest',
    teaser: 'Nullhypothese, Ablehnungsbereich, Fehler 1. und 2. Art – Stochastik-Aufgaben souverän lösen.',
    minutes: 26,
    tags: ['Stochastik', 'Hypothesentest', 'Abitur'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Ein Hypothesentest beantwortet die Frage: **Ist ein beobachtetes Ergebnis noch Zufall – oder spricht es gegen eine Annahme?** Man geht dabei immer von der **Nullhypothese H₀** aus und prüft, ob die Daten stark genug dagegen sprechen.',
      },
      {
        type: 'steps',
        title: 'Der Ablauf eines einseitigen Tests',
        items: [
          '**Hypothesen formulieren**: H₀ (Status quo) und H₁ (Vermutung, die man belegen will).',
          '**Testgröße** festlegen: X = Anzahl der Treffer, binomialverteilt mit n und p aus H₀.',
          '**Signifikanzniveau α** ablesen (meist 5 % oder 1 %).',
          '**Ablehnungsbereich bestimmen**: kleinste Zahl k, sodass die kumulierte Wahrscheinlichkeit ≤ α ist.',
          '**Entscheidung**: Liegt der beobachtete Wert im Ablehnungsbereich, wird H₀ verworfen.',
          '**Interpretation im Sachzusammenhang** – nie nur „H₀ wird abgelehnt" schreiben!',
        ],
      },
      {
        type: 'example',
        title: 'Linksseitiger Test',
        task: 'Ein Hersteller behauptet, mindestens 80 % seiner Samen keimen. Bei 100 Samen keimen nur 71. Teste auf dem Niveau α = 5 %.',
        steps: [
          'H₀: p ≥ 0,8 · H₁: p < 0,8 (linksseitiger Test)',
          'X ~ B(100; 0,8), Erwartungswert μ = 80, σ = √(100·0,8·0,2) = 4',
          'Gesucht: größtes k mit P(X ≤ k) ≤ 0,05',
          'Aus der Tabelle: P(X ≤ 73) ≈ 0,0469 ≤ 0,05 · P(X ≤ 74) ≈ 0,0804 > 0,05',
          'Ablehnungsbereich A = {0, 1, …, 73}',
          '71 ∈ A → H₀ wird abgelehnt',
        ],
        result: 'Die Behauptung des Herstellers wird auf dem 5 %-Niveau verworfen: Die Keimrate ist signifikant niedriger als 80 %.',
      },
      {
        type: 'table',
        head: ['', 'H₀ ist wahr', 'H₀ ist falsch'],
        rows: [
          ['H₀ wird abgelehnt', '**Fehler 1. Art** (α) – falscher Alarm', 'richtige Entscheidung'],
          ['H₀ wird beibehalten', 'richtige Entscheidung', '**Fehler 2. Art** (β) – übersehen'],
        ],
        caption: 'α wird vorgegeben und kontrolliert; β hängt vom tatsächlichen p ab und ist meist unbekannt.',
      },
      {
        type: 'warn',
        title: 'Die drei häufigsten Denkfehler',
        md: '1. „H₀ wird beibehalten" heißt **nicht** „H₀ ist bewiesen" – es fehlt nur der Gegenbeweis.\n2. α ist die Wahrscheinlichkeit, H₀ **fälschlich abzulehnen**, nicht die Wahrscheinlichkeit, dass H₀ falsch ist.\n3. Ein kleineres α macht den Test **vorsichtiger**, erhöht aber den Fehler 2. Art.',
      },
      {
        type: 'text',
        md: 'Beim **zweiseitigen Test** (H₁: p ≠ p₀) teilt man α auf beide Seiten auf: je α/2 links und rechts. Der Ablehnungsbereich besteht dann aus zwei Randbereichen. Bei großem n darf man mit der **Sigma-Regel** näherungsweise arbeiten: Der Bereich μ ± 1,96σ enthält etwa 95 % aller Werte.',
      },
      {
        type: 'merksatz',
        title: 'Welche Hypothese ist H₀?',
        md: 'In H₀ steht immer das **Gleichheitszeichen** (=, ≤, ≥) und das, was man **widerlegen** möchte. Die Behauptung, die man zeigen will, gehört in H₁.',
      },
    ],
    questions: [
      { id: 'ma12ht-q1', type: 'mc', q: 'Was bezeichnet der Fehler 1. Art?', options: ['H₀ wird abgelehnt, obwohl H₀ wahr ist', 'H₀ wird beibehalten, obwohl H₀ falsch ist', 'die Stichprobe ist zu klein', 'die Testgröße ist falsch gewählt'], answer: 0, explain: 'Falscher Alarm – seine Wahrscheinlichkeit ist höchstens α.' },
      { id: 'ma12ht-q2', type: 'input', q: 'X ~ B(100; 0,8). Wie groß ist der Erwartungswert μ?', accept: ['80'], explain: 'μ = n · p = 100 · 0,8 = 80.' },
      { id: 'ma12ht-q3', type: 'input', q: 'X ~ B(100; 0,8). Wie groß ist die Standardabweichung σ?', accept: ['4'], explain: 'σ = √(n·p·(1−p)) = √16 = 4.' },
      { id: 'ma12ht-q4', type: 'truefalse', q: 'Wird H₀ nicht abgelehnt, ist damit bewiesen, dass H₀ stimmt.', answer: false, explain: 'Es konnte lediglich kein ausreichender Gegenbeweis gefunden werden.' },
      { id: 'ma12ht-q5', type: 'mc', q: 'Wie verändert sich der Fehler 2. Art, wenn man α von 5 % auf 1 % senkt?', options: ['er sinkt ebenfalls', 'er steigt', 'er bleibt gleich', 'er wird zu 0'], answer: 1, explain: 'Ein strengerer Test lehnt seltener ab – dadurch übersieht er häufiger echte Abweichungen.' },
      { id: 'ma12ht-q6', type: 'mc', q: 'Bei einem zweiseitigen Test mit α = 5 % gilt für jede Seite …', options: ['5 %', '2,5 %', '10 %', '1 %'], answer: 1, explain: 'α wird gleichmäßig auf beide Ablehnungsbereiche verteilt.' },
    ],
  },
]
