import type { Topic } from '../../types'

export const deutsch2: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'de-5-satzglieder',
    subjectId: 'deutsch',
    grade: 5,
    title: 'Satzglieder bestimmen – mit der Umstellprobe',
    teaser: 'Subjekt, Prädikat, Objekte und adverbiale Bestimmungen sicher erkennen – mit Proben statt Bauchgefühl.',
    minutes: 16,
    tags: ['Grammatik', 'Satzglieder', 'Proben'],
    blocks: [
      {
        type: 'text',
        md: 'Ein **Satzglied** ist ein Baustein, den man als Ganzes verschieben kann. Genau das ist der Trick: Wenn du einen Teil des Satzes an den Anfang stellen kannst und der Satz noch stimmt, ist es ein Satzglied.',
      },
      {
        type: 'table',
        head: ['Satzglied', 'Frage', 'Beispiel'],
        rows: [
          ['Subjekt', 'Wer oder was?', '**Der Hund** bellt laut.'],
          ['Prädikat', 'Was tut / geschieht?', 'Der Hund **bellt** laut.'],
          ['Genitivobjekt', 'Wessen?', 'Wir gedenken **der Opfer**.'],
          ['Dativobjekt', 'Wem?', 'Ich helfe **meiner Schwester**.'],
          ['Akkusativobjekt', 'Wen oder was?', 'Ich sehe **den Film**.'],
          ['Adverbiale des Ortes', 'Wo? Wohin?', 'Wir treffen uns **am Bahnhof**.'],
          ['Adverbiale der Zeit', 'Wann? Wie lange?', '**Morgen früh** fahren wir los.'],
          ['Adverbiale der Art', 'Wie?', 'Sie singt **wunderschön**.'],
          ['Adverbiale des Grundes', 'Warum?', 'Er blieb **wegen der Grippe** zu Hause.'],
        ],
      },
      {
        type: 'steps',
        title: 'Die drei Proben',
        items: [
          '**Umstellprobe**: Verschiebe den Teil an den Satzanfang. Bleibt der Satz korrekt, ist es ein Satzglied.',
          '**Ersatzprobe**: Ersetze den Teil durch ein einzelnes Wort (z. B. „dort", „ihm"). Geht das, ist es ein Satzglied.',
          '**Weglassprobe**: Was man streichen kann, ohne dass der Satz kaputtgeht, ist meist eine adverbiale Bestimmung – Subjekt und Prädikat lassen sich nie streichen.',
        ],
      },
      {
        type: 'example',
        title: 'Satz komplett zerlegen',
        task: '„Gestern hat mein Bruder mir im Garten einen Vogel gezeigt."',
        steps: [
          'Prädikat zuerst suchen: *hat … gezeigt* (zweiteilig!)',
          'Wer hat gezeigt? → *mein Bruder* = Subjekt',
          'Wem? → *mir* = Dativobjekt',
          'Wen oder was? → *einen Vogel* = Akkusativobjekt',
          'Wann? → *gestern* = adverbiale Bestimmung der Zeit',
          'Wo? → *im Garten* = adverbiale Bestimmung des Ortes',
        ],
        result: '6 Satzglieder – das Prädikat zählt trotz zweier Teile nur einmal.',
      },
      {
        type: 'merksatz',
        title: 'Immer mit dem Prädikat anfangen',
        md: 'Das Prädikat ist der Anker. Erst wenn du es hast, funktionieren die Fragen „Wer?", „Wen?", „Wem?" zuverlässig.',
      },
      {
        type: 'warn',
        title: 'Typische Fehler',
        md: '**Ein Satzglied kann aus mehreren Wörtern bestehen** – „mein kleiner Bruder" ist *ein* Subjekt, nicht drei Satzglieder. Und: Ein Satzglied bleibt beim Umstellen immer zusammen.',
      },
    ],
    questions: [
      { id: 'de5s-q1', type: 'mc', q: 'Welches Satzglied ist „dem Nachbarn" in „Ich schenke dem Nachbarn Blumen."?', options: ['Subjekt', 'Dativobjekt', 'Akkusativobjekt', 'Adverbiale'], answer: 1, explain: 'Frage: Wem schenke ich? → Dativobjekt.' },
      { id: 'de5s-q2', type: 'input', q: 'Wie viele Satzglieder hat „Am Morgen liest Lena im Bett ein Buch."?', accept: ['5', 'fünf'], explain: 'Am Morgen | liest | Lena | im Bett | ein Buch = 5.' },
      { id: 'de5s-q3', type: 'truefalse', q: 'Mit der Umstellprobe prüft man, ob ein Wortblock ein Satzglied ist.', answer: true, explain: 'Nur vollständige Satzglieder lassen sich als Ganzes an den Satzanfang stellen.' },
      { id: 'de5s-q4', type: 'mc', q: '„Wegen des Regens" antwortet auf welche Frage?', options: ['Wann?', 'Wo?', 'Warum?', 'Wie?'], answer: 2, explain: 'Adverbiale Bestimmung des Grundes (kausal).' },
      { id: 'de5s-q5', type: 'multi', q: 'Welche Satzglieder sind in jedem vollständigen Satz enthalten?', options: ['Subjekt', 'Prädikat', 'Akkusativobjekt', 'Adverbiale'], answers: [0, 1], explain: 'Objekte und Adverbiale sind optional – Subjekt und Prädikat nicht.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-6-rechtschreibung',
    subjectId: 'deutsch',
    grade: 6,
    title: 'das oder dass? Und die Groß- und Kleinschreibung',
    teaser: 'Die zwei Fehlerquellen, die in jedem Aufsatz Punkte kosten – mit wasserdichten Testverfahren.',
    minutes: 15,
    tags: ['Rechtschreibung', 'das/dass', 'Großschreibung'],
    blocks: [
      {
        type: 'merksatz',
        title: 'Der Ersatzprobe-Trick',
        md: 'Kannst du **dieses, jenes oder welches** einsetzen? Dann schreibt man **das** mit einem s. Geht das nicht, ist es **dass** mit Doppel-s.',
      },
      {
        type: 'example',
        title: 'Ersatzprobe anwenden',
        task: 'Das / Dass Buch, ___ ich gelesen habe, war spannend. Ich glaube, ___ es dir gefällt.',
        steps: [
          '„Das Buch" → „Dieses Buch" funktioniert → **das**',
          '„das ich gelesen habe" → „welches ich gelesen habe" funktioniert → **das** (Relativpronomen)',
          '„___ es dir gefällt" → „dieses es dir gefällt" ergibt Unsinn → **dass** (Konjunktion)',
        ],
        result: 'Das Buch, das ich gelesen habe, war spannend. Ich glaube, dass es dir gefällt.',
      },
      {
        type: 'text',
        md: '**dass** leitet immer einen Nebensatz ein und steht nach Verben des Sagens, Denkens und Fühlens (ich denke, dass …; er sagt, dass …) oder nach Ausdrücken wie *so …, dass* und *ohne dass*.',
      },
      {
        type: 'list',
        title: 'Großschreibung: Diese Signale verraten ein Nomen',
        items: [
          '**Artikel davor**: das Laufen, ein Lächeln, beim Schwimmen (auch verschmolzen: zum, beim, im, vom, ans)',
          '**Adjektiv davor**: das schnelle Laufen, lautes Rufen',
          '**Mengenangabe**: viel Neues, nichts Wichtiges, etwas Schönes, alles Gute',
          '**Endungen** wie -ung, -heit, -keit, -nis, -schaft, -tum sind immer Nomen',
          '**Tageszeit nach Zeitangabe**: heute Abend, gestern Mittag (aber: abends, mittags)',
        ],
      },
      {
        type: 'table',
        head: ['Klein', 'Groß', 'Warum'],
        rows: [
          ['wir gehen heute schwimmen', 'das Schwimmen macht Spaß', 'Artikel → Nomen'],
          ['er ist am besten', 'er gibt sein Bestes', 'Possessivpronomen → Nomen'],
          ['sie kommt morgen früh', 'am frühen Morgen', 'Artikel + Adjektiv'],
          ['im Allgemeinen', 'allgemein bekannt', 'feste Wendung mit Artikel'],
        ],
      },
      {
        type: 'warn',
        title: 'Die Klassiker',
        md: '**seit/seid**: *seit* = Zeit (seit gestern), *seid* = ihr-Form von sein (ihr seid).\n**wider/wieder**: *wider* = gegen (widersprechen), *wieder* = nochmal.\n**Standart** gibt es nicht – es heißt **Standard**.',
      },
      {
        type: 'steps',
        title: 'Selbstkontrolle im Aufsatz',
        items: [
          'Nach dem Schreiben gezielt nur nach „das/dass" suchen und jedes Vorkommen mit der Ersatzprobe testen.',
          'Dann alle großgeschriebenen Wörter prüfen: Steht ein Artikel oder Adjektiv davor?',
          'Zum Schluss laut lesen – fehlende Wörter und Satzbaufehler hört man besser, als man sie sieht.',
        ],
      },
    ],
    questions: [
      { id: 'de6r-q1', type: 'mc', q: '„Ich hoffe, ___ du kommst." Was ist richtig?', options: ['das', 'dass', 'beides möglich', 'daß'], answer: 1, explain: '„dieses du kommst" ergibt keinen Sinn → Konjunktion dass.' },
      { id: 'de6r-q2', type: 'mc', q: '„Das Hemd, ___ ich gekauft habe." Was ist richtig?', options: ['das', 'dass', 'was', 'welche'], answer: 0, explain: 'Ersetzbar durch „welches" → Relativpronomen das.' },
      { id: 'de6r-q3', type: 'input', q: 'Schreibe korrekt: „beim laufen"', accept: ['beim Laufen'], explain: 'Verschmolzener Artikel (bei + dem) → Nomen → Großschreibung.' },
      { id: 'de6r-q4', type: 'truefalse', q: '„Etwas Schönes" wird großgeschrieben.', answer: true, explain: 'Nach Mengenwörtern wie etwas, nichts, viel, alles wird das folgende Adjektiv nominalisiert.' },
      { id: 'de6r-q5', type: 'mc', q: 'Welcher Satz ist korrekt?', options: ['Ihr seit spät dran.', 'Seid gestern regnet es.', 'Ihr seid spät dran.', 'Ihr seid gestern.'], answer: 2, explain: '„seid" ist die ihr-Form von sein; „seit" bezeichnet Zeit.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-7-kommasetzung',
    subjectId: 'deutsch',
    grade: 7,
    title: 'Kommasetzung: die sechs Regeln, die reichen',
    teaser: 'Kein Bauchgefühl mehr – Kommas setzt man nach klaren Regeln, nicht nach Sprechpausen.',
    minutes: 16,
    tags: ['Zeichensetzung', 'Nebensatz', 'Grammatik'],
    blocks: [
      {
        type: 'text',
        md: 'Der häufigste Irrtum: „Komma kommt dahin, wo man Luft holt." Falsch. Kommas markieren **grammatische Grenzen**. Wer die sechs Grundregeln kennt, setzt über 95 % aller Kommas richtig.',
      },
      {
        type: 'list',
        title: 'Die sechs Regeln',
        ordered: true,
        items: [
          '**Aufzählungen**: Äpfel, Birnen und Pflaumen. (Vor *und/oder* steht **kein** Komma.)',
          '**Nebensatz von Hauptsatz trennen**: Ich weiß, dass du kommst. Erkennungszeichen: Das Verb steht am Ende.',
          '**Eingeschobene Nebensätze** werden beidseitig eingeschlossen: Das Buch, das ich las, war gut.',
          '**Entgegensetzung**: aber, sondern, doch, jedoch, allerdings – davor steht ein Komma.',
          '**Erweiterter Infinitiv mit zu** bei um, ohne, statt, anstatt, außer: Er ging, um zu lernen.',
          '**Appositionen und Einschübe**: Herr Müller, unser Lehrer, erklärt das gut.',
        ],
      },
      {
        type: 'example',
        title: 'Satz analysieren',
        task: 'Wo kommen Kommas hin? „Obwohl es regnete gingen wir spazieren denn wir brauchten frische Luft."',
        steps: [
          '„Obwohl es regnete" – Nebensatz (Verb am Ende) → Komma dahinter',
          '„denn" verbindet zwei Hauptsätze → Komma davor',
        ],
        result: 'Obwohl es regnete, gingen wir spazieren, denn wir brauchten frische Luft.',
      },
      {
        type: 'compare',
        title: 'Komma ja oder nein?',
        left: {
          head: 'Komma steht',
          items: ['vor aber, sondern, doch', 'vor denn, weil, dass, obwohl', 'um Relativsätze herum', 'vor „um … zu"'],
        },
        right: {
          head: 'Kein Komma',
          items: ['vor und, oder in Aufzählungen', 'zwischen Subjekt und Prädikat', 'vor Vergleichen mit „als/wie" ohne Satz (größer als ich)', 'bei einfachem Infinitiv ohne Erweiterung (Er beginnt zu lesen)'],
        },
      },
      {
        type: 'merksatz',
        title: 'Verb-am-Ende-Test',
        md: 'Steht in einem Teilsatz das gebeugte Verb ganz hinten, ist es ein **Nebensatz** – und Nebensätze werden immer mit Komma abgetrennt.',
      },
      {
        type: 'warn',
        title: 'Beliebte Falle',
        md: 'Bei eingeschobenen Nebensätzen wird das **zweite** Komma oft vergessen: „Der Schüler, der zu spät kam ⟵ hier fehlt es, entschuldigte sich."',
      },
    ],
    questions: [
      { id: 'de7k-q1', type: 'mc', q: 'Welcher Satz ist richtig?', options: ['Ich glaube dass du recht hast.', 'Ich glaube, dass du recht hast.', 'Ich glaube, dass, du recht hast.', 'Ich, glaube dass du recht hast.'], answer: 1, explain: 'Nebensatz mit „dass" wird durch ein Komma abgetrennt.' },
      { id: 'de7k-q2', type: 'truefalse', q: 'Vor „und" in einer Aufzählung steht ein Komma.', answer: false, explain: 'Im Deutschen nicht – anders als das englische „Oxford comma".' },
      { id: 'de7k-q3', type: 'mc', q: 'Wie viele Kommas fehlen? „Der Hund der im Garten schläft gehört meiner Tante."', options: ['0', '1', '2', '3'], answer: 2, explain: 'Der eingeschobene Relativsatz wird beidseitig abgetrennt: „Der Hund, der im Garten schläft, gehört …"' },
      { id: 'de7k-q4', type: 'mc', q: 'Wo steht das Komma? „Er lernte viel ___ um die Prüfung zu bestehen."', options: ['kein Komma', 'Komma vor „um"', 'Komma vor „zu"', 'Komma nach „Prüfung"'], answer: 1, explain: 'Erweiterter Infinitiv mit „um … zu" wird abgetrennt.' },
      { id: 'de7k-q5', type: 'input', q: 'Welches Signalwort verrät fast immer einen Nebensatz: dass, und oder aber?', accept: ['dass'], explain: 'Nach „dass" steht das Verb am Ende – klares Nebensatzsignal.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-7-inhaltsangabe',
    subjectId: 'deutsch',
    grade: 7,
    title: 'Die Inhaltsangabe schreiben',
    teaser: 'Präsens, sachlich, kein Zitat – und der Basissatz, der schon die halbe Note bringt.',
    minutes: 18,
    tags: ['Aufsatz', 'Inhaltsangabe', 'Methode'],
    blocks: [
      {
        type: 'text',
        md: 'Eine Inhaltsangabe fasst einen Text **knapp, sachlich und in eigenen Worten** zusammen. Sie beantwortet: Wer? Was? Wann? Wo? Warum? – und verrät auch das Ende, denn sie ist keine Werbung.',
      },
      {
        type: 'steps',
        title: 'Aufbau in drei Teilen',
        items: [
          '**Einleitung (Basissatz)**: Textart, Titel, Autor, Erscheinungsjahr, Thema – in *einem* Satz.',
          '**Hauptteil**: Handlung in der richtigen Reihenfolge, nur das Wesentliche, in Sinnabschnitten.',
          '**Schluss (optional)**: Ein bis zwei Sätze zur Aussageabsicht oder Wirkung – nur, wenn verlangt.',
        ],
      },
      {
        type: 'example',
        title: 'Basissatz-Bauplan',
        task: 'Formuliere die Einleitung zu einer Kurzgeschichte.',
        steps: [
          'Textart + Titel + Autor: „In der Kurzgeschichte ‚Das Brot‘ von Wolfgang Borchert …"',
          '… Erscheinungsjahr: „… aus dem Jahr 1946 …"',
          '… Thema in Kurzform: „… geht es um ein Ehepaar in der Nachkriegszeit, das mit Hunger und einer Lüge umgeht."',
        ],
        result: 'In der Kurzgeschichte „Das Brot" von Wolfgang Borchert aus dem Jahr 1946 geht es um ein Ehepaar in der Nachkriegszeit, das mit Hunger und einer Lüge umgeht.',
      },
      {
        type: 'table',
        head: ['Regel', 'Falsch', 'Richtig'],
        rows: [
          ['Präsens verwenden', 'Der Mann ging in die Küche.', 'Der Mann geht in die Küche.'],
          ['Sachlich bleiben', 'Total spannend ist, dass …', 'Der Text schildert, dass …'],
          ['Indirekte Rede', 'Er sagt: „Ich habe nichts gehört."', 'Er behauptet, er habe nichts gehört.'],
          ['Keine wörtlichen Zitate', '„Es war halb drei."', 'Die Szene spielt nachts.'],
          ['Eigene Worte', 'Textteile abschreiben', 'umformulieren und raffen'],
        ],
      },
      {
        type: 'list',
        title: 'Formulierungsbausteine für den Hauptteil',
        items: [
          'Zu Beginn / Zunächst schildert der Text …',
          'Im weiteren Verlauf wird deutlich, dass …',
          'Daraufhin entschließt sich die Hauptfigur, …',
          'Als Wendepunkt erweist sich …',
          'Am Ende / Schließlich zeigt sich, dass …',
        ],
      },
      {
        type: 'merksatz',
        title: 'Faustregel Länge',
        md: 'Eine Inhaltsangabe ist etwa **ein Fünftel bis ein Drittel** des Originaltexts. Wer alles erwähnt, hat nicht zusammengefasst.',
      },
      {
        type: 'warn',
        title: 'Punkteverlust garantiert',
        md: 'Präteritum statt Präsens, eigene Wertungen („Ich finde …"), Spannung aufbauen wollen oder wörtliche Rede übernehmen – jeder dieser Punkte kostet in der Bewertung.',
      },
    ],
    questions: [
      { id: 'de7i-q1', type: 'mc', q: 'In welcher Zeitform schreibt man eine Inhaltsangabe?', options: ['Präteritum', 'Präsens', 'Perfekt', 'Futur'], answer: 1, explain: 'Immer Präsens – das sogenannte „szenische Präsens".' },
      { id: 'de7i-q2', type: 'multi', q: 'Was gehört in den Basissatz?', options: ['Textart', 'Titel', 'Lieblingsstelle', 'Autor', 'Thema'], answers: [0, 1, 3, 4], explain: 'Persönliche Vorlieben haben in der Inhaltsangabe nichts zu suchen.' },
      { id: 'de7i-q3', type: 'truefalse', q: 'Der Schluss einer Geschichte darf in der Inhaltsangabe weggelassen werden, um die Spannung zu erhalten.', answer: false, explain: 'Eine Inhaltsangabe informiert vollständig – Spannung erzeugen ist nicht ihre Aufgabe.' },
      { id: 'de7i-q4', type: 'mc', q: 'Wie gibt man wörtliche Rede korrekt wieder?', options: ['als Zitat in Anführungszeichen', 'in indirekter Rede mit Konjunktiv I', 'gar nicht erwähnen', 'in Klammern'], answer: 1, explain: 'Beispiel: Er erklärt, er habe nichts gewusst.' },
      { id: 'de7i-q5', type: 'input', q: 'Welche Zeitform nutzt man für Vorzeitigkeit innerhalb der Inhaltsangabe (z. B. Rückblenden)?', accept: ['Perfekt'], explain: 'Grundzeit Präsens, Vorzeitiges im Perfekt: „Nachdem er den Brief gelesen hat, …"' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-9-rhetorische-mittel',
    subjectId: 'deutsch',
    grade: 9,
    title: 'Rhetorische Mittel erkennen und deuten',
    teaser: 'Nicht nur benennen – erklären, was ein Stilmittel im Text bewirkt. Genau dafür gibt es die Punkte.',
    minutes: 20,
    tags: ['Stilmittel', 'Analyse', 'Rhetorik'],
    blocks: [
      {
        type: 'warn',
        title: 'Der wichtigste Satz dieses Themas',
        md: 'Ein Stilmittel **benennen** bringt einen halben Punkt. Die Punkte gibt es für die **Wirkung**: „Die Metapher *Meer aus Tränen* steigert das Leid ins Unermessliche und macht die Trauer körperlich erfahrbar."',
      },
      {
        type: 'table',
        head: ['Stilmittel', 'Definition', 'Beispiel', 'Typische Wirkung'],
        rows: [
          ['Metapher', 'bildhafter Ausdruck ohne „wie"', 'Meer aus Tränen', 'veranschaulicht, verdichtet Gefühl'],
          ['Vergleich', 'Bild mit „wie" oder „als"', 'stark wie ein Bär', 'macht abstrakt Begreifbares konkret'],
          ['Personifikation', 'Unbelebtes handelt menschlich', 'Die Sonne lacht', 'belebt, schafft Nähe'],
          ['Alliteration', 'gleicher Anlaut', 'Milch macht müde Männer munter', 'einprägsam, klangvoll'],
          ['Anapher', 'Wiederholung am Satzanfang', 'Ich kam, ich sah, ich siegte', 'verstärkt, beschwört'],
          ['Klimax', 'Steigerung', 'kam, sah, siegte', 'baut Spannung auf'],
          ['Antithese', 'Gegensatzpaar', 'heiß und kalt', 'betont Widerspruch'],
          ['Oxymoron', 'Widerspruch in sich', 'beredtes Schweigen', 'zeigt Zerrissenheit'],
          ['Hyperbel', 'starke Übertreibung', 'Tausend Grüße', 'dramatisiert, emotionalisiert'],
          ['Ironie', 'Gegenteil des Gemeinten', '„Na großartig!"', 'kritisiert, distanziert'],
          ['Rhetorische Frage', 'Frage ohne Antwortabsicht', 'Wer will das schon?', 'bindet Leser ein, suggeriert Zustimmung'],
          ['Ellipse', 'Auslassung von Satzteilen', 'Ende gut, alles gut', 'wirkt knapp, umgangssprachlich'],
          ['Parallelismus', 'gleicher Satzbau', 'Heiß ist die Liebe, kalt ist der Schnee', 'schafft Ordnung, Gegenüberstellung'],
          ['Chiasmus', 'Überkreuzstellung', 'Die Kunst ist lang, kurz ist das Leben', 'betont Umkehrung'],
          ['Euphemismus', 'beschönigende Umschreibung', 'Freisetzung statt Entlassung', 'verharmlost, manipuliert'],
          ['Neologismus', 'Wortneuschöpfung', 'Herbstzeitlosigkeit', 'erregt Aufmerksamkeit'],
        ],
      },
      {
        type: 'steps',
        title: 'Der Dreischritt in jeder Analyse',
        items: [
          '**Benennen**: „In Vers 4 findet sich eine Personifikation …"',
          '**Belegen**: „… ‚der Wind flüstert Geheimnisse‘ (V. 4) …"',
          '**Deuten**: „… dadurch wird die Natur zum vertrauten Gegenüber des lyrischen Ichs, was dessen Einsamkeit unter Menschen umso stärker hervorhebt."',
        ],
      },
      {
        type: 'example',
        title: 'Formulierung üben',
        task: 'Deute die Anapher in einer politischen Rede: „Wir werden kämpfen. Wir werden bestehen. Wir werden gewinnen."',
        steps: [
          'Benennen: Anapher (Wiederholung von „Wir werden")',
          'Belegen: dreifache Wiederholung am Satzanfang',
          'Deuten: erzeugt Rhythmus wie ein Trommelschlag, schweißt Sprecher und Publikum zu einem „Wir" zusammen und steigert die Aussage bis zum Sieg (zugleich Klimax)',
        ],
        result: 'Ein Beleg, zwei Mittel, klare Wirkungsbeschreibung – so sieht eine volle Punktzahl aus.',
      },
      {
        type: 'merksatz',
        title: 'Metapher oder Vergleich?',
        md: 'Steht ein **„wie"** oder **„als"** dabei, ist es ein Vergleich. Ohne Vergleichswort ist es eine Metapher.',
      },
    ],
    questions: [
      { id: 'de9rh-q1', type: 'mc', q: '„Der Wald schweigt." – Welches Stilmittel liegt vor?', options: ['Metapher', 'Personifikation', 'Hyperbel', 'Ellipse'], answer: 1, explain: 'Dem Wald wird eine menschliche Fähigkeit (schweigen) zugeschrieben.' },
      { id: 'de9rh-q2', type: 'mc', q: '„Beredtes Schweigen" ist ein …', options: ['Euphemismus', 'Oxymoron', 'Pleonasmus', 'Chiasmus'], answer: 1, explain: 'Zwei sich widersprechende Begriffe werden verbunden.' },
      { id: 'de9rh-q3', type: 'input', q: 'Wie heißt die Wiederholung gleicher Wörter am Satz- oder Versanfang?', accept: ['Anapher'], explain: 'Das Gegenstück am Ende heißt Epipher.' },
      { id: 'de9rh-q4', type: 'multi', q: 'Welche Stilmittel dienen typischerweise der Steigerung/Verstärkung?', options: ['Klimax', 'Hyperbel', 'Euphemismus', 'Anapher'], answers: [0, 1, 3], explain: 'Der Euphemismus schwächt ab, statt zu verstärken.' },
      { id: 'de9rh-q5', type: 'truefalse', q: 'Es genügt in einer Analyse, das Stilmittel korrekt zu benennen.', answer: false, explain: 'Ohne Deutung der Wirkung gibt es kaum Punkte – Benennen, Belegen, Deuten.' },
      { id: 'de9rh-q6', type: 'mc', q: '„Freisetzung" statt „Entlassung" ist ein Beispiel für …', options: ['Ironie', 'Euphemismus', 'Neologismus', 'Antithese'], answer: 1, explain: 'Ein beschönigender Ausdruck, der die negative Realität verschleiert.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-10-kurzgeschichte',
    subjectId: 'deutsch',
    grade: 10,
    title: 'Kurzgeschichten analysieren',
    teaser: 'Offener Anfang, offenes Ende, Alltagssprache – und wie man daraus eine vollständige Analyse baut.',
    minutes: 20,
    tags: ['Epik', 'Analyse', 'Erzählperspektive'],
    blocks: [
      {
        type: 'list',
        title: 'Merkmale der Kurzgeschichte',
        items: [
          '**Unvermittelter Einstieg** (in medias res) – keine Einleitung, keine Vorgeschichte.',
          '**Offenes Ende** – der Leser muss selbst weiterdenken.',
          '**Wenige Figuren**, meist ohne Namen, oft ohne Beschreibung.',
          '**Kurzer Zeitraum**, ein Ort, ein Ausschnitt aus dem Alltag.',
          '**Alltagssprache**, knappe Sätze, wenig Beschreibung.',
          '**Wendepunkt** – ein Moment, der alles verändert (oft ein kleines Detail).',
          '**Symbolik** – Gegenstände stehen für mehr, als sie sind.',
        ],
      },
      {
        type: 'table',
        head: ['Erzählform', 'Merkmal', 'Wirkung'],
        rows: [
          ['Auktorial', 'allwissend, kommentiert, kennt alle Gedanken', 'Überblick, Distanz, Wertung möglich'],
          ['Personal', 'folgt einer Figur, kennt nur deren Innenleben', 'Nähe zur Figur, begrenzter Blick, Spannung'],
          ['Ich-Erzähler', 'erzählt aus eigener Sicht', 'höchste Unmittelbarkeit, aber unzuverlässig'],
          ['Neutral', 'reine Außensicht, wie eine Kamera', 'kühl, der Leser muss selbst deuten'],
        ],
      },
      {
        type: 'steps',
        title: 'Aufbau der Analyse',
        items: [
          '**Einleitung**: Basissatz (Textart, Titel, Autor, Jahr, Thema) + Deutungshypothese.',
          '**Inhaltsangabe**: kurz, im Präsens, maximal ein Absatz.',
          '**Hauptteil – Aufbau**: Handlungsverlauf, Wendepunkt, Zeitgestaltung (Zeitraffung, Zeitdehnung).',
          '**Hauptteil – Figuren**: Charakterisierung durch Handlung, Sprache, Gedanken; Beziehungen.',
          '**Hauptteil – Sprache**: Satzbau, Wortwahl, Stilmittel, Symbole – jeweils mit Wirkung.',
          '**Schluss**: Deutungshypothese aufgreifen, Aussageabsicht, ggf. historischer Bezug oder eigene Wertung.',
        ],
      },
      {
        type: 'example',
        title: 'Deutungshypothese formulieren',
        task: 'Wie klingt eine gute Hypothese in der Einleitung?',
        steps: [
          'Schwach: „Ich werde die Geschichte analysieren."',
          'Besser: „Die Geschichte thematisiert Einsamkeit."',
          'Stark: „Die Kurzgeschichte zeigt am Beispiel einer scheinbar belanglosen Alltagslüge, wie zwei Menschen ihre Würde schützen, indem sie einander die Wahrheit ersparen."',
        ],
        result: 'Eine Hypothese ist eine überprüfbare Behauptung über die Aussageabsicht – sie wird im Schluss bestätigt oder differenziert.',
      },
      {
        type: 'merksatz',
        title: 'Zitieren nach Zeilen',
        md: 'Bei Prosa zitiert man mit Zeilenangabe: (Z. 14 f.) für Zeile 14 und die folgende, (Z. 14 ff.) für mehrere folgende. Bei Lyrik: (V. 3) für Vers 3.',
      },
      {
        type: 'warn',
        title: 'Nacherzählen ist kein Analysieren',
        md: 'Die häufigste Fehlnote entsteht, wenn der Hauptteil nur die Handlung wiedergibt. Jeder Absatz braucht: Beobachtung → Beleg → **Deutung**.',
      },
    ],
    questions: [
      { id: 'de10kg-q1', type: 'mc', q: 'Was bedeutet „in medias res"?', options: ['ins Reine schreiben', 'mitten hinein in die Handlung', 'am Ende beginnen', 'ohne Erzähler'], answer: 1, explain: 'Der Text startet ohne Vorgeschichte mitten im Geschehen.' },
      { id: 'de10kg-q2', type: 'mc', q: 'Der Erzähler kennt nur die Gedanken einer einzigen Figur. Welche Erzählform liegt vor?', options: ['auktorial', 'personal', 'neutral', 'Ich-Erzähler'], answer: 1, explain: 'Personales Erzählen – der Leser sieht die Welt durch die Augen dieser Figur.' },
      { id: 'de10kg-q3', type: 'truefalse', q: 'Ein offenes Ende ist ein typisches Merkmal der Kurzgeschichte.', answer: true, explain: 'Die Deutung wird bewusst dem Leser überlassen.' },
      { id: 'de10kg-q4', type: 'input', q: 'Wie zitiert man Zeile 22 und die folgende Zeile korrekt in Kurzform?', accept: ['Z. 22 f.', 'Z.22f.', 'Z. 22f.', '(Z. 22 f.)'], explain: '„f." = folgende Zeile, „ff." = mehrere folgende.' },
      { id: 'de10kg-q5', type: 'multi', q: 'Was gehört in den Hauptteil einer Kurzgeschichtenanalyse?', options: ['Aufbau und Wendepunkt', 'Figurencharakterisierung', 'vollständige Nacherzählung', 'sprachliche Gestaltung mit Deutung'], answers: [0, 1, 3], explain: 'Die Inhaltsangabe steht knapp vor dem Hauptteil – nicht als dessen Ersatz.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-11-materialgestuetzt',
    subjectId: 'deutsch',
    grade: 11,
    title: 'Materialgestütztes Schreiben (Abitur Bayern)',
    teaser: 'Aus fünf Materialien einen eigenen Text bauen – informierend oder argumentierend, mit korrekten Verweisen.',
    minutes: 22,
    tags: ['Abitur', 'Aufsatz', 'Materialien'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Beim materialgestützten Schreiben bekommst du eine **Schreibaufgabe mit Adressat und Textsorte** (z. B. ein Kommentar für die Schülerzeitung) sowie mehrere **Materialien** – Sachtexte, Statistiken, Karikaturen. Die Aufgabe ist nicht, die Materialien zusammenzufassen, sondern aus ihnen einen **eigenen, adressatengerechten Text** zu formen.',
      },
      {
        type: 'compare',
        title: 'Die zwei Varianten',
        left: {
          head: 'Informierend',
          items: ['Ziel: sachlich erklären', 'neutraler, objektiver Ton', 'Textsorten: Informationsartikel, Lexikonartikel, Handout', 'keine eigene Meinung'],
        },
        right: {
          head: 'Argumentierend',
          items: ['Ziel: eine Position begründen', 'wertend, aber sachlich', 'Textsorten: Kommentar, Leserbrief, Rede', 'klare These + Gegenargumente entkräften'],
        },
      },
      {
        type: 'steps',
        title: 'Vorgehen in sechs Schritten',
        items: [
          '**Aufgabe genau lesen**: Textsorte, Adressat, Thema, Umfang markieren. Das steuert alles Weitere.',
          '**Material sichten**: Jedes Material in einem Satz zusammenfassen und mit M1, M2 … beschriften.',
          '**Material ordnen**: Nach Aspekten gruppieren (pro/contra oder Themenfelder) – nicht nach Reihenfolge der Blätter.',
          '**Gliederung schreiben**: Welcher Aspekt in welchem Absatz? Welches Material stützt welchen Punkt?',
          '**Schreiben**: Eigene Sprache, Materialien nur als Beleg. Jeder Absatz = ein Gedanke.',
          '**Überarbeiten**: Verweise vollständig? Adressat durchgängig angesprochen? Textsorte erkennbar?',
        ],
      },
      {
        type: 'list',
        title: 'Korrekt auf Material verweisen',
        items: [
          'Paraphrase: „Wie der Artikel des Bayerischen Rundfunks zeigt, ist die Zahl … gestiegen (vgl. M2)."',
          'Zitat: „Die Studie spricht von einer ‚stillen Epidemie‘ (M3, Z. 14)."',
          'Statistik: „Laut der Erhebung von 2023 nutzen 78 % der Jugendlichen … (M4)."',
          'Nie: Material einfach abschreiben oder wortwörtlich aneinanderreihen.',
          'Nie: „In M1 steht, dass …" – das ist zu schlicht. Besser: inhaltlich integrieren.',
        ],
      },
      {
        type: 'example',
        title: 'Aufbau eines argumentierenden Textes',
        task: 'Kommentar: „Sollen Handys an Schulen verboten werden?"',
        steps: [
          'Einleitung: aktueller Aufhänger + eigene These („Ein pauschales Verbot geht am Problem vorbei.")',
          'Gegenposition zuerst darstellen und mit Material belegen (M1: Ablenkung im Unterricht)',
          'Gegenposition entkräften (M3: Studien zeigen geringen Effekt auf Noten)',
          'Eigene Argumente steigernd anordnen: schwächstes zuerst, stärkstes zuletzt',
          'Schluss: Forderung oder Ausblick, der über das Referierte hinausgeht',
        ],
        result: 'Struktur: These – Gegenargument – Entkräftung – eigene Argumente (steigernd) – Fazit.',
      },
      {
        type: 'merksatz',
        title: 'Die Faustregel',
        md: '**Du schreibst den Text – die Materialien liefern nur die Belege.** Wenn man deinen Text liest und die Materialien nicht kennt, muss er trotzdem verständlich sein.',
      },
      {
        type: 'warn',
        title: 'Typische Abzüge',
        md: 'Materialien nacheinander abarbeiten statt thematisch zu ordnen · Adressat und Textsorte vergessen (ein Kommentar klingt anders als ein Handout) · fehlende Materialverweise (gilt als Täuschung) · keine erkennbare eigene Position im argumentierenden Text.',
      },
    ],
    questions: [
      { id: 'de11m-q1', type: 'mc', q: 'Was ist das Hauptziel des materialgestützten Schreibens?', options: ['die Materialien zusammenfassen', 'aus Materialien einen eigenen adressatengerechten Text erstellen', 'Materialien sprachlich analysieren', 'die Materialien bewerten'], answer: 1, explain: 'Der eigene Text steht im Zentrum, die Materialien sind Werkzeug.' },
      { id: 'de11m-q2', type: 'truefalse', q: 'Die Materialien sollten in der Reihenfolge abgearbeitet werden, in der sie vorliegen.', answer: false, explain: 'Sie werden thematisch geordnet – die Blattreihenfolge ist willkürlich.' },
      { id: 'de11m-q3', type: 'multi', q: 'Was kennzeichnet einen argumentierenden materialgestützten Text?', options: ['klare eigene These', 'Auseinandersetzung mit Gegenargumenten', 'streng neutrale Haltung', 'steigernde Anordnung der Argumente'], answers: [0, 1, 3], explain: 'Neutralität gehört zur informierenden Variante.' },
      { id: 'de11m-q4', type: 'input', q: 'Mit welcher Abkürzung leitet man eine sinngemäße Übernahme aus einem Material ein?', accept: ['vgl.', 'vgl', 'vergleiche'], explain: '„vgl. M2" kennzeichnet die Paraphrase, ein wörtliches Zitat steht in Anführungszeichen.' },
      { id: 'de11m-q5', type: 'mc', q: 'Wo im Aufsatz platziert man das stärkste eigene Argument?', options: ['ganz am Anfang', 'in der Mitte', 'am Ende des Argumentationsteils', 'in der Einleitung'], answer: 2, explain: 'Steigernde Anordnung – der letzte Eindruck bleibt haften.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'de-12-lyrikvergleich',
    subjectId: 'deutsch',
    grade: 12,
    title: 'Gedichtvergleich im Abitur',
    teaser: 'Zwei Gedichte, eine Analyse: Aufbau nach Aspekten, Epochenwissen und die richtigen Vergleichsformulierungen.',
    minutes: 24,
    tags: ['Abitur', 'Lyrik', 'Epochen'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Im Abitur wird häufig ein **Gedichtvergleich** verlangt: zwei Gedichte, meist aus unterschiedlichen Epochen, zum selben Motiv (Liebe, Natur, Stadt, Vergänglichkeit). Entscheidend ist die **Gliederung nach Vergleichsaspekten** – nicht zwei Analysen hintereinander.',
      },
      {
        type: 'compare',
        title: 'Zwei mögliche Gliederungen',
        left: {
          head: 'Aspektorientiert (empfohlen)',
          items: ['Absatz 1: Thema/Motiv in beiden Texten', 'Absatz 2: Form & Metrum im Vergleich', 'Absatz 3: Bildsprache im Vergleich', 'Absatz 4: lyrisches Ich & Haltung', 'zeigt Analysefähigkeit, wirkt souverän'],
        },
        right: {
          head: 'Nacheinander (riskant)',
          items: ['erst Gedicht A vollständig', 'dann Gedicht B vollständig', 'am Ende ein Vergleichsabsatz', 'nur zulässig, wenn der Vergleich wirklich trägt', 'oft bleibt der Vergleich zu dünn'],
        },
      },
      {
        type: 'table',
        head: ['Epoche', 'Zeitraum', 'Zentrale Motive', 'Formmerkmale'],
        rows: [
          ['Barock', '1600–1720', 'Vergänglichkeit, carpe diem, memento mori', 'Sonett, Alexandriner, Antithesen'],
          ['Aufklärung', '1720–1785', 'Vernunft, Toleranz, Bildung', 'Lehrgedicht, Fabel, klarer Bau'],
          ['Sturm und Drang', '1765–1785', 'Gefühl, Genie, Natur, Rebellion', 'freie Rhythmen, Ausrufe, Hymne'],
          ['Klassik', '1786–1832', 'Humanität, Harmonie, Maß', 'strenge Form, Ballade, Distichon'],
          ['Romantik', '1795–1848', 'Sehnsucht, Nacht, Ferne, Volkslied', 'Volksliedstrophe, Kreuzreim, Symbole'],
          ['Realismus', '1848–1890', 'Alltag, Bürgertum, nüchterner Blick', 'Dinggedicht, schlichte Sprache'],
          ['Naturalismus', '1880–1900', 'Elend, Großstadt, Milieu', 'Sekundenstil, Umgangssprache'],
          ['Expressionismus', '1910–1925', 'Ich-Zerfall, Krieg, Großstadt, Untergang', 'Reihungsstil, Neologismen, Farbsymbolik'],
          ['Nachkriegszeit', '1945–1960', 'Trümmer, Schuld, Kahlschlag', 'Kahlschlaglyrik, schlichte Sprache'],
        ],
      },
      {
        type: 'steps',
        title: 'Metrum bestimmen',
        items: [
          'Gedicht laut lesen und betonte Silben markieren (x = unbetont, X = betont).',
          '**Jambus** x X („verSTEHN") – fließend, vorwärtsdrängend.',
          '**Trochäus** X x („REgen") – fallend, wuchtig, oft im Volkslied.',
          '**Daktylus** X x x („HERRliche") – tänzerisch, schwungvoll.',
          '**Anapäst** x x X („Paradies") – drängend, steigernd.',
          'Kadenz prüfen: männlich (betonte Endsilbe) wirkt hart, weiblich (unbetont) wirkt weich.',
        ],
      },
      {
        type: 'list',
        title: 'Formulierungen für den Vergleich',
        items: [
          'Während in Eichendorffs Gedicht … dominiert, tritt bei Heym … an dessen Stelle.',
          'Beide Texte greifen das Motiv der … auf, deuten es jedoch gegensätzlich.',
          'Im Unterschied zu … verzichtet … bewusst auf …',
          'Diese Parallele lässt sich mit dem gemeinsamen epochalen Hintergrund erklären.',
          'Auffällig ist, dass beide Gedichte … – ein Hinweis darauf, dass …',
        ],
      },
      {
        type: 'merksatz',
        title: 'Reimschemata',
        md: '**Paarreim** aabb · **Kreuzreim** abab · **umarmender Reim** abba · **Schweifreim** aabccb · **Haufenreim** aaaa. Ein Sonett hat 14 Verse in 4-4-3-3.',
      },
      {
        type: 'warn',
        title: 'Epochenwissen dosiert einsetzen',
        md: 'Ein Absatz Epochenreferat ohne Textbezug bringt keine Punkte. Richtig: „Die Reihung zusammenhangloser Bilder (V. 5–8) ist typisch für den expressionistischen Reihungsstil und spiegelt hier den Zerfall der Wahrnehmung im Großstadtlärm."',
      },
    ],
    questions: [
      { id: 'de12lv-q1', type: 'mc', q: 'Welche Gliederung wird für den Gedichtvergleich empfohlen?', options: ['erst Gedicht A, dann B komplett', 'nach Vergleichsaspekten verschränkt', 'nur Gemeinsamkeiten', 'chronologisch nach Erscheinungsjahr'], answer: 1, explain: 'Aspektorientiertes Vorgehen zeigt echte Vergleichsleistung.' },
      { id: 'de12lv-q2', type: 'mc', q: 'Welches Reimschema hat abba?', options: ['Paarreim', 'Kreuzreim', 'umarmender Reim', 'Schweifreim'], answer: 2, explain: 'Der äußere Reim „umarmt" den inneren.' },
      { id: 'de12lv-q3', type: 'input', q: 'Wie heißt das Versmaß mit der Betonungsfolge unbetont–betont?', accept: ['Jambus', 'jambisch', 'der Jambus'], explain: 'x X – das häufigste Versmaß der deutschen Lyrik.' },
      { id: 'de12lv-q4', type: 'mc', q: 'Reihungsstil, Ich-Zerfall und Großstadtmotive kennzeichnen welche Epoche?', options: ['Romantik', 'Realismus', 'Expressionismus', 'Barock'], answer: 2, explain: 'Expressionismus (1910–1925), z. B. Heym, Stadler, van Hoddis.' },
      { id: 'de12lv-q5', type: 'multi', q: 'Welche Motive sind typisch barock?', options: ['Vergänglichkeit', 'carpe diem', 'Maschinenlärm', 'memento mori'], answers: [0, 1, 3], explain: 'Vanitas-Denken prägt den Barock; Maschinen gehören zum Naturalismus/Expressionismus.' },
      { id: 'de12lv-q6', type: 'truefalse', q: 'Ein Sonett besteht aus zwei Quartetten und zwei Terzetten.', answer: true, explain: '4 + 4 + 3 + 3 = 14 Verse, typisch für Barock und Romantik.' },
    ],
  },
]
