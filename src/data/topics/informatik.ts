import type { Topic } from '../../types'

export const informatik: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'inf-6-information',
    subjectId: 'informatik',
    grade: 6,
    title: 'Bits, Bytes und das Binärsystem',
    teaser: 'Warum ein Computer nur 0 und 1 kennt – und wie daraus Texte, Bilder und Musik werden.',
    minutes: 16,
    tags: ['Binärsystem', 'Codierung', 'Speichergrößen'],
    blocks: [
      {
        type: 'text',
        md: 'Ein Computer ist im Kern ein riesiges Feld winziger Schalter. Ein Schalter kennt nur zwei Zustände: **aus (0)** oder **an (1)**. Diese kleinste Informationseinheit heißt **Bit** (binary digit). Acht Bits ergeben ein **Byte** – und mit einem Byte kann man bereits 2⁸ = 256 verschiedene Dinge unterscheiden, zum Beispiel alle Buchstaben, Ziffern und Satzzeichen einer Tastatur.',
      },
      {
        type: 'formula',
        tex: 'Mit n Bits sind 2ⁿ verschiedene Zustände darstellbar.',
        caption: '1 Bit → 2, 2 Bit → 4, 4 Bit → 16, 8 Bit → 256, 10 Bit → 1024',
      },
      {
        type: 'example',
        title: 'Dezimal 13 in Binär umwandeln',
        task: 'Schreibe 13 als Binärzahl.',
        steps: [
          'Stellenwerte notieren: 8 | 4 | 2 | 1',
          'Passt 8 in 13? Ja → 1, Rest 5',
          'Passt 4 in 5? Ja → 1, Rest 1',
          'Passt 2 in 1? Nein → 0, Rest 1',
          'Passt 1 in 1? Ja → 1, Rest 0',
        ],
        result: '13 = 1101₂',
      },
      {
        type: 'example',
        title: 'Binär 10110 in Dezimal',
        task: 'Wandle 10110₂ ins Zehnersystem um.',
        steps: [
          'Stellenwerte von rechts: 1, 2, 4, 8, 16',
          'Nur Stellen mit einer 1 zählen: 16 + 0 + 4 + 2 + 0',
        ],
        result: '10110₂ = 22',
      },
      {
        type: 'table',
        head: ['Einheit', 'Entspricht', 'Beispiel'],
        rows: [
          ['1 Byte', '8 Bit', 'ein Buchstabe'],
          ['1 Kilobyte (kB)', '1 000 Byte', 'eine kurze E-Mail'],
          ['1 Megabyte (MB)', '1 000 kB', 'ein Foto vom Handy (komprimiert)'],
          ['1 Gigabyte (GB)', '1 000 MB', 'ein Film in mittlerer Qualität'],
          ['1 Terabyte (TB)', '1 000 GB', 'eine große Festplatte'],
        ],
      },
      {
        type: 'text',
        md: '**Wie wird ein Bild zu Zahlen?** Man zerlegt es in ein Raster aus **Pixeln**. Jedes Pixel bekommt drei Zahlen für Rot, Grün und Blau (je 0–255, also je 1 Byte). Ein Bild mit 1000 × 1000 Pixeln braucht damit roh 3 Millionen Byte = 3 MB. Deshalb gibt es Kompressionsverfahren wie JPEG.',
      },
      {
        type: 'merksatz',
        title: 'Zweierpotenzen auswendig',
        md: '1 – 2 – 4 – 8 – 16 – 32 – 64 – 128 – 256 – 512 – 1024. Wer diese Reihe kann, rechnet Binärzahlen im Kopf um.',
      },
      {
        type: 'warn',
        title: 'Typische Verwechslung',
        md: 'Ein **Bit** (b) ist nicht ein **Byte** (B). Internetgeschwindigkeiten werden in Megabit pro Sekunde angegeben: 100 Mbit/s sind nur etwa 12,5 MB/s Download.',
      },
    ],
    questions: [
      { id: 'inf6i-q1', type: 'input', q: 'Wie lautet die Dezimalzahl 25 im Binärsystem?', accept: ['11001', '11001₂', '11001_2'], explain: '16 + 8 + 1 = 25, also 11001₂.' },
      { id: 'inf6i-q2', type: 'mc', q: 'Wie viele verschiedene Zustände lassen sich mit 6 Bit darstellen?', options: ['12', '36', '64', '128'], answer: 2, explain: '2⁶ = 64.' },
      { id: 'inf6i-q3', type: 'input', q: 'Welche Dezimalzahl ist 100101₂?', accept: ['37'], explain: '32 + 4 + 1 = 37.', hint: 'Stellenwerte: 32 16 8 4 2 1' },
      { id: 'inf6i-q4', type: 'truefalse', q: 'Ein Byte besteht aus 8 Bit.', answer: true, explain: 'Genau – und kann damit 256 Werte annehmen (0 bis 255).' },
      { id: 'inf6i-q5', type: 'mc', q: 'Ein Foto ist 2400 × 1600 Pixel groß und speichert 3 Byte pro Pixel. Wie groß ist es unkomprimiert etwa?', options: ['1,2 MB', '11,5 MB', '115 MB', '3,8 GB'], answer: 1, explain: '2400 · 1600 · 3 ≈ 11,5 Millionen Byte ≈ 11,5 MB.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-7-algorithmen-basics',
    subjectId: 'informatik',
    grade: 7,
    title: 'Algorithmen verstehen und aufschreiben',
    teaser: 'Sequenz, Verzweigung, Wiederholung – die drei Bausteine, aus denen jedes Programm besteht.',
    minutes: 18,
    tags: ['Algorithmus', 'Struktogramm', 'Schleife'],
    blocks: [
      {
        type: 'text',
        md: 'Ein **Algorithmus** ist eine eindeutige, endliche Handlungsvorschrift, die aus einer Eingabe eine Ausgabe erzeugt. Ein Kochrezept ist fast ein Algorithmus – aber „etwas Salz" ist nicht eindeutig, und genau das darf in der Informatik nicht passieren.',
      },
      {
        type: 'list',
        title: 'Eigenschaften eines guten Algorithmus',
        items: [
          '**Eindeutig**: Jeder Schritt ist klar, es gibt keinen Interpretationsspielraum.',
          '**Endlich**: Er hört irgendwann auf (Terminierung).',
          '**Allgemeingültig**: Er löst nicht nur einen Fall, sondern eine ganze Aufgabenklasse.',
          '**Ausführbar**: Jeder Schritt ist mit den vorhandenen Mitteln machbar.',
        ],
      },
      {
        type: 'compare',
        title: 'Die drei Kontrollstrukturen',
        left: {
          head: 'Sequenz & Verzweigung',
          items: [
            'Sequenz: Schritte nacheinander',
            'Verzweigung: WENN Bedingung DANN … SONST …',
            'Beispiel: WENN Note < 5 DANN "bestanden"',
            'Mehrfachverzweigung mit SONST WENN',
          ],
        },
        right: {
          head: 'Wiederholung',
          items: [
            'Zählschleife: WIEDERHOLE 10 MAL',
            'Kopfgesteuert: SOLANGE Bedingung TUE …',
            'Fußgesteuert: TUE … BIS Bedingung',
            'Achtung: Endlosschleife, wenn sich nichts ändert!',
          ],
        },
      },
      {
        type: 'example',
        title: 'Algorithmus: Größte von drei Zahlen',
        task: 'Finde die größte der Zahlen a, b, c.',
        steps: [
          'max ← a',
          'WENN b > max DANN max ← b',
          'WENN c > max DANN max ← c',
          'Gib max aus',
        ],
        result: 'Funktioniert für beliebige Zahlen – auch bei Gleichheit.',
      },
      {
        type: 'steps',
        title: 'Struktogramm (Nassi-Shneiderman) zeichnen',
        items: [
          'Jeder Schritt ist ein waagrechter Kasten – von oben nach unten gelesen.',
          'Eine Verzweigung wird als Dreieck mit zwei Spalten (Ja / Nein) dargestellt.',
          'Eine Schleife umrahmt die wiederholten Schritte links mit einem Balken.',
          'Es gibt keine Pfeile – der Ablauf ergibt sich allein aus der Form.',
        ],
      },
      {
        type: 'merksatz',
        md: 'Jedes Programm der Welt lässt sich aus nur drei Bausteinen zusammensetzen: **Sequenz, Verzweigung, Wiederholung** (Satz von Böhm-Jacopini).',
      },
      {
        type: 'warn',
        title: 'Stolperfalle Zuweisung',
        md: 'In der Informatik bedeutet `x ← x + 1` nicht „x ist gleich x plus 1" (das wäre falsch), sondern: **nimm den alten Wert, addiere 1, speichere das Ergebnis wieder in x**.',
      },
    ],
    questions: [
      { id: 'inf7a-q1', type: 'mc', q: 'Was passiert bei `zahl ← 5`, danach `zahl ← zahl * 2`, danach `zahl ← zahl - 3`?', options: ['zahl = 4', 'zahl = 7', 'zahl = 10', 'zahl = 13'], answer: 1, explain: '5 · 2 = 10, 10 − 3 = 7.' },
      { id: 'inf7a-q2', type: 'multi', q: 'Welche Eigenschaften muss ein Algorithmus haben?', options: ['eindeutig', 'möglichst lang', 'endlich', 'ausführbar'], answers: [0, 2, 3], explain: 'Kürze ist nett, aber kein Kriterium. Eindeutigkeit, Endlichkeit und Ausführbarkeit sind Pflicht.' },
      { id: 'inf7a-q3', type: 'truefalse', q: 'Eine fußgesteuerte Schleife wird immer mindestens einmal durchlaufen.', answer: true, explain: 'Die Bedingung wird erst am Ende geprüft – der Rumpf läuft also garantiert einmal.' },
      { id: 'inf7a-q4', type: 'input', q: 'Wie oft wird der Rumpf ausgeführt? i ← 1; SOLANGE i ≤ 10 TUE { … ; i ← i + 3 }', accept: ['4', 'vier'], explain: 'i nimmt die Werte 1, 4, 7, 10 an – danach ist i = 13 > 10. Also 4 Durchläufe.' },
      { id: 'inf7a-q5', type: 'mc', q: 'Welcher Fehler erzeugt eine Endlosschleife?', options: ['Die Zählvariable wird nie verändert', 'Die Bedingung steht am Ende', 'Es fehlt eine Ausgabe', 'Die Schleife ist eingerückt'], answer: 0, explain: 'Wenn sich nichts ändert, wird die Abbruchbedingung nie wahr.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-9-internet',
    subjectId: 'informatik',
    grade: 9,
    title: 'Wie das Internet funktioniert',
    teaser: 'IP-Adressen, Pakete, DNS und HTTPS – der Weg einer Webseite von Kalifornien in dein Zimmer.',
    minutes: 20,
    tags: ['Netzwerk', 'Internet', 'Protokolle', 'Sicherheit'],
    blocks: [
      {
        type: 'text',
        md: 'Das Internet ist kein einzelner Computer, sondern ein **Netz aus Netzen**. Damit Geräte weltweit miteinander reden können, halten sich alle an dieselben Regeln – die **Protokolle**. Sie sind in Schichten organisiert: Je höher die Schicht, desto näher an der Anwendung.',
      },
      {
        type: 'table',
        head: ['Schicht', 'Aufgabe', 'Protokolle'],
        rows: [
          ['Anwendung', 'Was der Nutzer sieht', 'HTTP(S), SMTP, DNS'],
          ['Transport', 'Zuverlässige Übertragung, Ports', 'TCP, UDP'],
          ['Internet', 'Wegfindung zwischen Netzen', 'IP, ICMP'],
          ['Netzzugang', 'Physische Übertragung', 'Ethernet, WLAN'],
        ],
        caption: 'Das TCP/IP-Schichtenmodell',
      },
      {
        type: 'steps',
        title: 'Was passiert, wenn du „lernstoff.de" eingibst?',
        items: [
          '**DNS-Anfrage**: Der Browser fragt einen Namensserver nach der IP-Adresse zum Namen – etwa 93.184.216.34.',
          '**TCP-Verbindung**: Über den Drei-Wege-Handschlag (SYN → SYN/ACK → ACK) wird eine Verbindung zu Port 443 aufgebaut.',
          '**TLS-Handschlag**: Server zeigt sein Zertifikat, beide einigen sich auf einen geheimen Sitzungsschlüssel.',
          '**HTTP-Anfrage**: `GET / HTTP/1.1` – der Server antwortet mit Statuscode 200 und dem HTML-Dokument.',
          '**Darstellung**: Der Browser lädt Bilder, CSS und Skripte nach und rendert die Seite.',
        ],
      },
      {
        type: 'text',
        md: 'Daten werden nicht am Stück verschickt, sondern in **Pakete** zerlegt. Jedes Paket findet seinen eigenen Weg durch das Netz (Router entscheiden Sprung für Sprung) und wird am Ziel wieder zusammengesetzt. Geht ein Paket verloren, fordert **TCP** es erneut an. **UDP** verzichtet darauf – deshalb nutzt man es für Videotelefonie, wo Tempo wichtiger ist als Vollständigkeit.',
      },
      {
        type: 'compare',
        title: 'TCP vs. UDP',
        left: { head: 'TCP', items: ['verbindungsorientiert', 'Reihenfolge garantiert', 'verlorene Pakete werden neu gesendet', 'für Web, E-Mail, Dateien'] },
        right: { head: 'UDP', items: ['verbindungslos', 'keine Garantie', 'kein Nachsenden', 'für Streaming, Spiele, Videochat'] },
      },
      {
        type: 'text',
        md: 'Eine **IPv4-Adresse** besteht aus 4 Bytes (z. B. 192.168.0.12) – das reicht für „nur" rund 4,3 Milliarden Geräte. Deshalb gibt es **IPv6** mit 128 Bit und etwa 3,4 · 10³⁸ Adressen. Adressen, die mit 192.168., 10. oder 172.16.–172.31. beginnen, sind **private Adressen** und existieren nur im Heimnetz.',
      },
      {
        type: 'warn',
        title: 'Das Schloss im Browser',
        md: 'HTTPS garantiert, dass niemand mitliest und die Seite echt ist – aber **nicht**, dass die Seite seriös ist. Auch Betrugsseiten haben Zertifikate. Immer die Domain selbst prüfen!',
      },
      {
        type: 'merksatz',
        title: 'Statuscodes merken',
        md: '**2xx** = alles gut · **3xx** = woanders gucken (Weiterleitung) · **4xx** = dein Fehler (404 nicht gefunden) · **5xx** = Fehler des Servers.',
      },
    ],
    questions: [
      { id: 'inf9n-q1', type: 'mc', q: 'Welchen Dienst fragt der Browser zuerst, um aus einem Domainnamen eine IP-Adresse zu machen?', options: ['HTTP', 'DNS', 'FTP', 'TLS'], answer: 1, explain: 'Das Domain Name System ist das Telefonbuch des Internets.' },
      { id: 'inf9n-q2', type: 'mc', q: 'Welches Protokoll ist die bessere Wahl für eine Videokonferenz?', options: ['TCP, weil zuverlässig', 'UDP, weil schnell und ohne Nachsenden', 'HTTP, weil universal', 'SMTP, weil für Live-Daten gedacht'], answer: 1, explain: 'Ein neu gesendetes Videobild von vor 2 Sekunden nützt nichts – Tempo schlägt Vollständigkeit.' },
      { id: 'inf9n-q3', type: 'input', q: 'Welcher HTTP-Statuscode bedeutet „Seite nicht gefunden"?', accept: ['404'], explain: '404 Not Found – ein 4xx-Code, also ein Fehler auf Seiten der Anfrage.' },
      { id: 'inf9n-q4', type: 'truefalse', q: 'Die Adresse 192.168.1.5 ist im Internet weltweit eindeutig erreichbar.', answer: false, explain: 'Das ist eine private Adresse – sie existiert in Millionen Heimnetzen gleichzeitig und wird per NAT übersetzt.' },
      { id: 'inf9n-q5', type: 'multi', q: 'Was leistet HTTPS gegenüber HTTP?', options: ['Verschlüsselung der Inhalte', 'Nachweis der Identität des Servers', 'Schutz vor unseriösen Anbietern', 'Schutz vor Veränderung der Daten unterwegs'], answers: [0, 1, 3], explain: 'Vertraulichkeit, Authentizität und Integrität – aber keine inhaltliche Bewertung der Seite.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-10-sortieren-suchen',
    subjectId: 'informatik',
    grade: 10,
    title: 'Sortieren, Suchen und Laufzeit',
    teaser: 'Warum binäre Suche bei einer Million Einträgen nur 20 Schritte braucht – und Bubblesort eine Million mal zu langsam ist.',
    minutes: 22,
    tags: ['Sortieralgorithmen', 'Komplexität', 'O-Notation'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Zwei Algorithmen können dieselbe Aufgabe lösen und sich trotzdem um Stunden unterscheiden. Die **Laufzeitkomplexität** beschreibt, wie stark der Aufwand wächst, wenn die Datenmenge n wächst – unabhängig von der Geschwindigkeit des Rechners.',
      },
      {
        type: 'table',
        head: ['Komplexität', 'Name', 'n = 1 000 000 bedeutet ca.'],
        rows: [
          ['O(1)', 'konstant', '1 Schritt'],
          ['O(log n)', 'logarithmisch', '20 Schritte'],
          ['O(n)', 'linear', '1 Million Schritte'],
          ['O(n log n)', 'linear-logarithmisch', '20 Millionen Schritte'],
          ['O(n²)', 'quadratisch', '1 Billion Schritte (Stunden!)'],
        ],
      },
      {
        type: 'compare',
        title: 'Lineare vs. binäre Suche',
        left: {
          head: 'Lineare Suche – O(n)',
          items: ['Prüft jedes Element von vorne', 'Funktioniert auf unsortierten Daten', 'Bei 1 Mio. Einträgen: bis zu 1 Mio. Vergleiche'],
        },
        right: {
          head: 'Binäre Suche – O(log n)',
          items: ['Halbiert den Suchbereich in jedem Schritt', 'Setzt **sortierte** Daten voraus', 'Bei 1 Mio. Einträgen: höchstens 20 Vergleiche'],
        },
      },
      {
        type: 'example',
        title: 'Binäre Suche nach 23',
        task: 'Sortierte Liste: 3, 7, 12, 18, 23, 31, 44, 56, 70. Gesucht: 23',
        steps: [
          'Mitte prüfen (Position 5): 23 – Treffer!',
          'Gegenbeispiel Suche nach 44: Mitte = 23 < 44 → rechte Hälfte (31, 44, 56, 70)',
          'Mitte der Hälfte = 44 → gefunden nach 2 Vergleichen statt 7',
        ],
        result: 'Jeder Schritt halbiert den Suchraum: log₂(9) ≈ 3,2 → höchstens 4 Schritte.',
      },
      {
        type: 'steps',
        title: 'Bubblesort – Schritt für Schritt',
        items: [
          'Vergleiche zwei benachbarte Elemente.',
          'Ist das linke größer, vertausche sie.',
          'Gehe ein Element weiter, bis das Ende erreicht ist – das größte Element „blubbert" ans Ende.',
          'Wiederhole das Ganze für den Rest der Liste (n − 1 Durchläufe).',
        ],
      },
      {
        type: 'text',
        md: '**Bessere Verfahren**: *Mergesort* teilt die Liste rekursiv in Hälften, sortiert diese und fügt sie zusammen – O(n log n) in jedem Fall. *Quicksort* wählt ein Pivot-Element, teilt in „kleiner" und „größer" und sortiert beide Teile – im Mittel ebenfalls O(n log n), im schlechtesten Fall O(n²).',
      },
      {
        type: 'merksatz',
        md: 'Für den Aufwand zählt nur der am stärksten wachsende Term, Konstanten fallen weg: 5n² + 300n + 7000 ist einfach **O(n²)**.',
      },
      {
        type: 'warn',
        title: 'Häufiger Fehler',
        md: 'Binäre Suche auf einer **unsortierten** Liste liefert falsche Ergebnisse. Erst sortieren (O(n log n)), dann suchen – lohnt sich, sobald man oft sucht.',
      },
    ],
    questions: [
      { id: 'inf10s-q1', type: 'mc', q: 'Wie viele Vergleiche braucht die binäre Suche höchstens bei 1024 sortierten Einträgen?', options: ['10', '32', '512', '1024'], answer: 0, explain: 'log₂(1024) = 10 – jeder Schritt halbiert.' },
      { id: 'inf10s-q2', type: 'mc', q: 'Welche Komplexität hat Bubblesort im schlechtesten Fall?', options: ['O(1)', 'O(log n)', 'O(n log n)', 'O(n²)'], answer: 3, explain: 'n Durchläufe mit jeweils bis zu n Vergleichen.' },
      { id: 'inf10s-q3', type: 'input', q: 'Vereinfache die Laufzeit 8n² + 1000n + 50 in O-Notation (Form: O(...)).', accept: ['O(n²)', 'O(n^2)', 'O(n2)', 'n²', 'n^2'], explain: 'Nur der stärkste Term zählt, Konstanten werden weggelassen.' },
      { id: 'inf10s-q4', type: 'truefalse', q: 'Mergesort hat auch im schlechtesten Fall die Laufzeit O(n log n).', answer: true, explain: 'Das Teilen erfolgt immer exakt hälftig – anders als bei Quicksort.' },
      { id: 'inf10s-q5', type: 'multi', q: 'Welche Aussagen über Quicksort stimmen?', options: ['Es arbeitet mit einem Pivot-Element', 'Es ist im Mittel O(n log n)', 'Es ist immer schneller als Mergesort', 'Der schlechteste Fall ist O(n²)'], answers: [0, 1, 3], explain: 'Bei ungünstiger Pivotwahl (z. B. schon sortierte Liste, Pivot = erstes Element) entartet Quicksort zu O(n²).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-11-programmieren',
    subjectId: 'informatik',
    grade: 11,
    title: 'Programmieren lernen: Variablen, Schleifen, Funktionen',
    teaser: 'Die Grundbausteine in Python-ähnlichem Code – mit typischen Anfängerfehlern und ihren Gegenmitteln.',
    minutes: 24,
    tags: ['Python', 'Variablen', 'Funktionen', 'Listen'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Eine **Variable** ist ein benannter Speicherplatz. Der Name sollte sagen, was drin ist: `anzahl_schueler` statt `x`. Jede Variable hat einen **Datentyp**: ganze Zahl (`int`), Kommazahl (`float`), Text (`str`), Wahrheitswert (`bool`) oder eine Sammlung wie eine Liste.',
      },
      {
        type: 'table',
        head: ['Typ', 'Beispielwert', 'Typische Operationen'],
        rows: [
          ['int', '42', '+ − * // % **'],
          ['float', '3.14', '+ − * /'],
          ['str', "'Hallo'", 'Verkettung +, len(), .upper()'],
          ['bool', 'True / False', 'and, or, not'],
          ['list', '[1, 2, 3]', '.append(), len(), Index [0]'],
        ],
      },
      {
        type: 'example',
        title: 'Summe der Zahlen 1 bis 100',
        task: 'Schreibe ein Programm, das 1 + 2 + … + 100 berechnet.',
        steps: [
          'summe = 0',
          'for i in range(1, 101):',
          '    summe = summe + i',
          'print(summe)',
        ],
        result: '5050 – `range(1, 101)` läuft von 1 bis 100, die obere Grenze ist nicht enthalten.',
      },
      {
        type: 'example',
        title: 'Funktion mit Rückgabewert',
        task: 'Eine Funktion soll prüfen, ob eine Zahl eine Primzahl ist.',
        steps: [
          'def ist_prim(n):',
          '    if n < 2: return False',
          '    for t in range(2, int(n**0.5) + 1):',
          '        if n % t == 0: return False',
          '    return True',
        ],
        result: 'Es genügt, bis zur Wurzel von n zu testen – größere Teiler hätten einen kleineren Partner.',
      },
      {
        type: 'list',
        title: 'Funktionen: warum überhaupt?',
        items: [
          '**Wiederverwendung**: einmal schreiben, überall aufrufen.',
          '**Lesbarkeit**: `ist_prim(97)` sagt mehr als zehn Zeilen Schleife.',
          '**Testbarkeit**: Eine Funktion lässt sich isoliert prüfen.',
          '**Parameter** sind die Eingaben, `return` liefert das Ergebnis zurück (und beendet die Funktion sofort).',
        ],
      },
      {
        type: 'warn',
        title: 'Die vier klassischen Anfängerfehler',
        md: '1. `=` (zuweisen) mit `==` (vergleichen) verwechseln.\n2. Off-by-one: `range(1, 100)` endet bei 99, nicht bei 100.\n3. Vergessen, das Ergebnis zurückzugeben – die Funktion liefert dann `None`.\n4. Gleitkommazahlen exakt vergleichen: `0.1 + 0.2 == 0.3` ist **False**! Besser mit Toleranz prüfen.',
      },
      {
        type: 'merksatz',
        title: 'Debugging-Strategie',
        md: 'Wenn nichts geht: **Ausgabe einbauen**. `print(i, summe)` in der Schleife zeigt sofort, ab welchem Durchlauf die Werte abweichen. Das findet mehr Fehler als langes Draufstarren.',
      },
      {
        type: 'text',
        md: '**Listen** sind der Arbeitspferd-Datentyp. `zahlen[0]` ist das *erste* Element (die Zählung beginnt bei 0!), `zahlen[-1]` das letzte. `len(zahlen)` gibt die Länge. Mit `for z in zahlen:` läuft man direkt über die Elemente, ohne Index – das ist weniger fehleranfällig.',
      },
    ],
    questions: [
      { id: 'inf11p-q1', type: 'input', q: 'Was gibt `print(len(range(3, 12)))` aus?', accept: ['9'], explain: 'Von 3 bis einschließlich 11 sind das 9 Zahlen (12 ist ausgeschlossen).' },
      { id: 'inf11p-q2', type: 'mc', q: 'Welchen Wert hat `17 % 5`?', options: ['2', '3', '3.4', '85'], answer: 0, explain: 'Der Modulo-Operator liefert den Rest: 17 = 3·5 + 2.' },
      { id: 'inf11p-q3', type: 'mc', q: 'Eine Funktion ohne `return` liefert …', options: ['0', 'None', 'einen Fehler', 'den letzten berechneten Wert'], answer: 1, explain: 'In Python ist der Rückgabewert dann None – ein häufiger Grund für „TypeError".' },
      { id: 'inf11p-q4', type: 'truefalse', q: '`zahlen[0]` liefert das zweite Element einer Liste.', answer: false, explain: 'Die Indizierung beginnt bei 0, also ist [0] das erste Element.' },
      { id: 'inf11p-q5', type: 'multi', q: 'Welche Vorteile haben Funktionen?', options: ['Wiederverwendbarkeit', 'bessere Lesbarkeit', 'automatisch schnellerer Code', 'einfachere Tests'], answers: [0, 1, 3], explain: 'Schneller wird der Code dadurch nicht – aber deutlich wartbarer.' },
      { id: 'inf11p-q6', type: 'input', q: 'Bis zu welcher Zahl (gerundet) muss man höchstens testen, um zu prüfen, ob 97 eine Primzahl ist?', accept: ['9', '10', '9,8', '9.8'], explain: '√97 ≈ 9,85 – es genügt, Teiler bis 9 zu prüfen.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-12-kryptographie',
    subjectId: 'informatik',
    grade: 12,
    title: 'Kryptographie: von Caesar bis RSA',
    teaser: 'Wie man Nachrichten geheim hält, obwohl der Schlüssel öffentlich ist.',
    minutes: 22,
    tags: ['Verschlüsselung', 'RSA', 'Sicherheit'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Kryptographie verfolgt vier Ziele: **Vertraulichkeit** (niemand liest mit), **Integrität** (nichts wird verändert), **Authentizität** (der Absender ist echt) und **Verbindlichkeit** (er kann es nicht abstreiten).',
      },
      {
        type: 'example',
        title: 'Caesar-Verschlüsselung',
        task: 'Verschlüssele "INFO" mit Schlüssel 3.',
        steps: [
          'Jeder Buchstabe wird um 3 Stellen im Alphabet verschoben.',
          'I → L, N → Q, F → I, O → R',
        ],
        result: 'LQIR – der Schlüsselraum ist mit 25 Möglichkeiten winzig, ein Rechner knackt das sofort.',
      },
      {
        type: 'text',
        md: 'Besser wird es mit der **Vigenère-Chiffre** (Schlüsselwort verschiebt jeden Buchstaben unterschiedlich) – aber auch sie fällt durch **Häufigkeitsanalyse**, wenn der Text lang genug ist. Wirklich unknackbar ist nur das **One-Time-Pad**: ein zufälliger Schlüssel, so lang wie die Nachricht, der nur einmal benutzt wird. Unpraktisch, weil der Schlüssel selbst sicher übertragen werden muss.',
      },
      {
        type: 'compare',
        title: 'Symmetrisch vs. asymmetrisch',
        left: {
          head: 'Symmetrisch (z. B. AES)',
          items: ['Ein Schlüssel zum Ver- und Entschlüsseln', 'Sehr schnell, auch für große Datenmengen', 'Problem: Wie kommt der Schlüssel sicher zum Partner?', 'Bei n Personen: n(n−1)/2 Schlüssel nötig'],
        },
        right: {
          head: 'Asymmetrisch (z. B. RSA)',
          items: ['Öffentlicher Schlüssel verschlüsselt, privater entschlüsselt', 'Kein geheimer Austausch nötig', 'Deutlich langsamer', 'Bei n Personen: nur 2n Schlüssel'],
        },
      },
      {
        type: 'steps',
        title: 'RSA in fünf Schritten',
        items: [
          'Zwei große Primzahlen p und q wählen, n = p · q berechnen.',
          'φ(n) = (p − 1)(q − 1) bestimmen.',
          'Öffentlichen Exponenten e wählen, teilerfremd zu φ(n).',
          'Privaten Exponenten d berechnen mit e · d ≡ 1 (mod φ(n)).',
          'Verschlüsseln: c = mᵉ mod n · Entschlüsseln: m = c^d mod n',
        ],
      },
      {
        type: 'example',
        title: 'Mini-RSA zum Nachrechnen',
        task: 'p = 3, q = 11, e = 7. Verschlüssele m = 5.',
        steps: [
          'n = 3 · 11 = 33, φ(n) = 2 · 10 = 20',
          'd mit 7·d ≡ 1 (mod 20): d = 3, denn 21 mod 20 = 1',
          'c = 5⁷ mod 33 = 78125 mod 33 = 14',
          'Probe: 14³ mod 33 = 2744 mod 33 = 5 ✓',
        ],
        result: 'Geheimtext 14, korrekt entschlüsselt zu 5.',
      },
      {
        type: 'text',
        md: 'Die Sicherheit von RSA beruht darauf, dass das **Faktorisieren** großer Zahlen extrem aufwendig ist: n = p · q auszurechnen dauert Millisekunden, aus n wieder p und q zu gewinnen bei 2048 Bit praktisch ewig. In der Praxis kombiniert man beides – ein **Hybridverfahren**: RSA überträgt einen zufälligen AES-Schlüssel, danach läuft alles symmetrisch und schnell.',
      },
      {
        type: 'merksatz',
        title: 'Kerckhoffs’ Prinzip',
        md: 'Die Sicherheit eines Verfahrens darf **nur vom Schlüssel** abhängen, nie von der Geheimhaltung des Algorithmus. „Security by obscurity" ist keine Sicherheit.',
      },
      {
        type: 'warn',
        title: 'Hashfunktion ≠ Verschlüsselung',
        md: 'Ein Hash (SHA-256) ist eine **Einbahnstraße** – man kann ihn nicht zurückrechnen. Er dient der Integritätsprüfung und der Passwortspeicherung, nicht der Geheimhaltung von Nachrichten.',
      },
    ],
    questions: [
      { id: 'inf12k-q1', type: 'input', q: 'Caesar mit Schlüssel 4: Wie lautet der Geheimtext von "ABI"?', accept: ['EFM'], explain: 'A→E, B→F, I→M.' },
      { id: 'inf12k-q2', type: 'mc', q: 'Worauf beruht die Sicherheit von RSA?', options: ['auf der Geheimhaltung des Algorithmus', 'auf der Schwierigkeit, große Zahlen zu faktorisieren', 'auf der Länge des Klartexts', 'darauf, dass niemand den öffentlichen Schlüssel kennt'], answer: 1, explain: 'Der öffentliche Schlüssel darf jeder kennen – nur die Primfaktoren bleiben geheim.' },
      { id: 'inf12k-q3', type: 'input', q: 'RSA mit p = 5 und q = 11: Wie groß ist φ(n)?', accept: ['40'], explain: 'φ(n) = (5−1)(11−1) = 4 · 10 = 40.' },
      { id: 'inf12k-q4', type: 'truefalse', q: 'Ein SHA-256-Hash lässt sich mit dem passenden Schlüssel wieder entschlüsseln.', answer: false, explain: 'Hashfunktionen sind Einwegfunktionen – es gibt keinen Schlüssel und keine Umkehrung.' },
      { id: 'inf12k-q5', type: 'mc', q: 'Warum nutzt HTTPS ein Hybridverfahren?', options: ['weil RSA unsicher ist', 'weil AES keinen Schlüsselaustausch erlaubt und RSA zu langsam für große Datenmengen ist', 'weil Browser kein AES können', 'weil es gesetzlich vorgeschrieben ist'], answer: 1, explain: 'RSA löst den Schlüsselaustausch, AES erledigt die schnelle Massenverschlüsselung.' },
      { id: 'inf12k-q6', type: 'multi', q: 'Welche Schutzziele erfüllt eine digitale Signatur?', options: ['Authentizität', 'Vertraulichkeit', 'Integrität', 'Verbindlichkeit'], answers: [0, 2, 3], explain: 'Eine Signatur verschlüsselt den Inhalt nicht – sie beweist Urheberschaft und Unverändertheit.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-12-ki',
    subjectId: 'informatik',
    grade: 12,
    title: 'Künstliche Intelligenz & maschinelles Lernen',
    teaser: 'Was ein neuronales Netz wirklich tut, warum Trainingsdaten alles entscheiden und wo die Grenzen liegen.',
    minutes: 20,
    tags: ['KI', 'Machine Learning', 'Ethik'],
    blocks: [
      {
        type: 'text',
        md: 'Klassische Programme bekommen **Regeln** und Daten und liefern Antworten. Beim **maschinellen Lernen** dreht man das um: Man gibt Daten *und* Antworten hinein und lässt den Rechner die Regeln selbst finden. Das Ergebnis heißt **Modell**.',
      },
      {
        type: 'table',
        head: ['Lernart', 'Prinzip', 'Beispiel'],
        rows: [
          ['Überwachtes Lernen', 'Daten mit richtigen Antworten (Labels)', 'Spam-Erkennung, Notenvorhersage'],
          ['Unüberwachtes Lernen', 'nur Daten, System findet Strukturen', 'Kundengruppen (Clustering)'],
          ['Bestärkendes Lernen', 'Belohnung für gute Aktionen', 'Schach, Robotersteuerung'],
        ],
      },
      {
        type: 'text',
        md: 'Ein **künstliches Neuron** berechnet eine gewichtete Summe seiner Eingaben, addiert einen Bias und schickt das Ergebnis durch eine **Aktivierungsfunktion** (z. B. ReLU). Viele solcher Neuronen in Schichten ergeben ein **neuronales Netz**. Beim Training wird der Fehler gemessen (Loss) und die Gewichte werden per **Gradientenabstieg** ein kleines Stück in die richtige Richtung geschoben – millionenfach.',
      },
      {
        type: 'formula',
        tex: 'y = f( w₁x₁ + w₂x₂ + … + wₙxₙ + b )',
        caption: 'Ein einzelnes Neuron: Gewichte w, Eingaben x, Bias b, Aktivierungsfunktion f',
      },
      {
        type: 'example',
        title: 'Overfitting erkennen',
        task: 'Ein Modell erreicht 99 % Trefferquote auf den Trainingsdaten, aber nur 62 % auf neuen Daten. Was ist los?',
        steps: [
          'Die Lücke zwischen Trainings- und Testgenauigkeit ist riesig.',
          'Das Modell hat die Trainingsbeispiele *auswendig gelernt* statt das Muster zu verstehen.',
          'Gegenmittel: mehr Daten, einfacheres Modell, Regularisierung, früheres Abbrechen des Trainings.',
        ],
        result: 'Klassisches Overfitting – deshalb trennt man immer Trainings-, Validierungs- und Testdaten.',
      },
      {
        type: 'list',
        title: 'Warum Trainingsdaten so kritisch sind',
        items: [
          '**Bias in den Daten wird zu Bias im Modell**: Bewerbungs-KIs haben Frauen benachteiligt, weil die historischen Daten das taten.',
          '**Repräsentativität**: Ein Gesichtserkenner, der fast nur helle Hauttöne gesehen hat, versagt bei dunklen.',
          '**Datenmenge**: Große Sprachmodelle brauchen Milliarden von Textbausteinen.',
          '**Urheberrecht & Datenschutz**: Woher stammen die Daten, und durften sie verwendet werden?',
        ],
      },
      {
        type: 'warn',
        title: 'Was KI nicht tut',
        md: 'Ein Sprachmodell „versteht" nichts im menschlichen Sinn – es sagt das wahrscheinlichste nächste Textstück voraus. Deshalb kann es überzeugend klingende **Falschaussagen** erzeugen. Quellen immer prüfen, besonders bei Hausaufgaben.',
      },
      {
        type: 'merksatz',
        md: '**Garbage in, garbage out.** Die Qualität eines Modells kann niemals besser sein als die Qualität seiner Trainingsdaten.',
      },
    ],
    questions: [
      { id: 'inf12ki-q1', type: 'mc', q: 'Was kennzeichnet überwachtes Lernen?', options: ['Ein Mensch schaut beim Rechnen zu', 'Die Trainingsdaten enthalten die richtigen Antworten', 'Das Modell erhält Belohnungen', 'Es werden keine Daten benötigt'], answer: 1, explain: 'Gelabelte Daten – jedes Beispiel kommt mit der gewünschten Ausgabe.' },
      { id: 'inf12ki-q2', type: 'mc', q: 'Ein Modell ist auf Trainingsdaten fast perfekt, auf Testdaten schlecht. Das nennt man …', options: ['Underfitting', 'Overfitting', 'Clustering', 'Regularisierung'], answer: 1, explain: 'Overfitting: Das Modell hat auswendig gelernt statt verallgemeinert.' },
      { id: 'inf12ki-q3', type: 'truefalse', q: 'Ein neuronales Netz trifft Entscheidungen, die immer nachvollziehbar begründbar sind.', answer: false, explain: 'Große Netze sind Blackboxes – „Explainable AI" ist ein eigenes Forschungsgebiet.' },
      { id: 'inf12ki-q4', type: 'multi', q: 'Welche Probleme können durch verzerrte Trainingsdaten entstehen?', options: ['Diskriminierung einzelner Gruppen', 'schlechtere Erkennung bei unterrepräsentierten Merkmalen', 'automatisch geringere Rechenzeit', 'falsches Vertrauen in objektive Ergebnisse'], answers: [0, 1, 3], explain: 'Verzerrte Daten machen ein Modell nicht schneller, aber unfair und trügerisch.' },
      { id: 'inf12ki-q5', type: 'input', q: 'Wie heißt das Verfahren, mit dem die Gewichte eines Netzes schrittweise in Richtung kleineren Fehlers verändert werden?', accept: ['Gradientenabstieg', 'Gradient Descent', 'Gradientenverfahren'], explain: 'Der Gradient zeigt die Richtung des steilsten Anstiegs – man geht das Gegenteil.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'inf-9-webseiten',
    subjectId: 'informatik',
    grade: 9,
    title: 'Eine Webseite bauen: HTML & CSS',
    teaser: 'Struktur mit HTML, Aussehen mit CSS – und warum man beides strikt trennt.',
    minutes: 18,
    tags: ['HTML', 'CSS', 'Webentwicklung'],
    blocks: [
      {
        type: 'text',
        md: '**HTML** beschreibt die *Struktur* eines Dokuments: Was ist eine Überschrift, was ein Absatz, was ein Link? **CSS** beschreibt die *Darstellung*: Farben, Abstände, Schriftgrößen. Diese Trennung ist keine Formsache – sie macht Seiten wartbar, barrierefrei und durchsuchbar.',
      },
      {
        type: 'example',
        title: 'Ein minimales HTML-Dokument',
        task: 'Die Grundstruktur jeder Seite',
        steps: [
          '<!DOCTYPE html>',
          '<html lang="de"><head><meta charset="UTF-8"><title>Meine Seite</title></head>',
          '<body><h1>Überschrift</h1><p>Ein Absatz mit <a href="/info">Link</a>.</p></body>',
          '</html>',
        ],
        result: 'Jedes Element besteht aus Start-Tag, Inhalt und End-Tag.',
      },
      {
        type: 'table',
        head: ['Element', 'Bedeutung'],
        rows: [
          ['<h1> … <h6>', 'Überschriften – nur eine h1 pro Seite'],
          ['<p>', 'Textabsatz'],
          ['<ul> / <ol> / <li>', 'unsortierte / sortierte Liste mit Einträgen'],
          ['<a href="…">', 'Hyperlink'],
          ['<img src="…" alt="…">', 'Bild – alt-Text ist Pflicht für Screenreader'],
          ['<div> / <span>', 'neutrale Container (Block / inline)'],
          ['<header> <nav> <main> <footer>', 'semantische Bereiche'],
        ],
      },
      {
        type: 'example',
        title: 'CSS anwenden',
        task: 'Alle Absätze in Dunkelgrau, Überschriften zentriert',
        steps: [
          'p { color: #333; line-height: 1.6; }',
          'h1 { text-align: center; font-size: 2rem; }',
          '.hinweis { background: #fffbe6; padding: 12px; border-radius: 8px; }',
          '#kopf { position: sticky; top: 0; }',
        ],
        result: 'Selektoren: Element (p), Klasse (.hinweis, mehrfach verwendbar), ID (#kopf, nur einmal).',
      },
      {
        type: 'text',
        md: 'Das **Box-Modell** erklärt, warum Elemente breiter sind als gedacht: Inhalt + `padding` (Innenabstand) + `border` + `margin` (Außenabstand). Mit `box-sizing: border-box;` rechnet der Browser Padding und Border in die angegebene Breite ein – deshalb setzt man das fast immer global.',
      },
      {
        type: 'merksatz',
        title: 'Spezifität von CSS',
        md: 'Wer gewinnt bei widersprüchlichen Regeln? **ID (100) > Klasse (10) > Element (1)**. Bei Gleichstand gewinnt die später notierte Regel.',
      },
      {
        type: 'warn',
        title: 'Barrierefreiheit nicht vergessen',
        md: 'Überschriftenebenen nicht überspringen, `alt`-Texte setzen, ausreichenden Farbkontrast wählen und die Seite mit der Tastatur bedienbar halten. In Prüfungen wird das gerne abgefragt.',
      },
    ],
    questions: [
      { id: 'inf9w-q1', type: 'mc', q: 'Welche Aufgabe hat CSS?', options: ['Die Struktur des Dokuments festlegen', 'Die Darstellung festlegen', 'Daten auf dem Server speichern', 'Interaktive Logik programmieren'], answer: 1, explain: 'Struktur = HTML, Darstellung = CSS, Verhalten = JavaScript.' },
      { id: 'inf9w-q2', type: 'mc', q: 'Welcher Selektor hat die höchste Spezifität?', options: ['p', '.text', '#haupttext', 'body p'], answer: 2, explain: 'IDs schlagen Klassen, Klassen schlagen Elemente.' },
      { id: 'inf9w-q3', type: 'input', q: 'Welches HTML-Attribut beschreibt ein Bild für Screenreader?', accept: ['alt', 'alt-Attribut', 'alt=""'], explain: 'Der alt-Text ist für Barrierefreiheit und SEO entscheidend.' },
      { id: 'inf9w-q4', type: 'truefalse', q: 'Eine Klasse (.hinweis) darf mehrfach auf einer Seite verwendet werden, eine ID nicht.', answer: true, explain: 'IDs müssen pro Dokument eindeutig sein.' },
      { id: 'inf9w-q5', type: 'multi', q: 'Was gehört zum CSS-Box-Modell?', options: ['content', 'padding', 'border', 'margin'], answers: [0, 1, 2, 3], explain: 'Von innen nach außen: content, padding, border, margin.' },
    ],
  },
]
