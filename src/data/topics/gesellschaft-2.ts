import type { Topic } from '../../types'

export const gesellschaft2: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'ge-7-mittelalter',
    subjectId: 'geschichte',
    grade: 7,
    title: 'Das Mittelalter: Lehnswesen, Stände, Städte',
    teaser: 'Wer wem Treue schwor, warum Stadtluft frei machte und was der Investiturstreit mit Macht zu tun hat.',
    minutes: 20,
    tags: ['Mittelalter', 'Lehnswesen', 'Kirche'],
    blocks: [
      {
        type: 'text',
        md: 'Das mittelalterliche Europa kannte keinen Staat im heutigen Sinn. Herrschaft beruhte auf **persönlichen Treueverhältnissen**: Der König vergab Land (**Lehen**) an Große des Reiches, diese schuldeten ihm dafür Rat und Waffenhilfe. Dieses Geflecht nennt man **Lehnswesen**.',
      },
      {
        type: 'table',
        head: ['Beteiligter', 'Gibt', 'Erhält'],
        rows: [
          ['Lehnsherr (König)', 'Lehen (Land, Rechte), Schutz', 'Treue, Heeresfolge, Rat'],
          ['Lehnsmann (Vasall)', 'Treueeid, Kriegsdienst', 'Land und Einkünfte'],
          ['Grundherr', 'Schutz, Land zur Bewirtschaftung', 'Abgaben, Frondienste'],
          ['Bauer (hörig)', 'Abgaben (meist ein Zehnt), Arbeitsdienste', 'Schutz, Nutzungsrecht am Land'],
        ],
      },
      {
        type: 'list',
        title: 'Die drei Stände',
        items: [
          '**Klerus** (Betende, oratores): Bischöfe, Mönche – zugleich Bildungsträger und Großgrundbesitzer.',
          '**Adel** (Kämpfende, bellatores): König, Herzöge, Ritter – Schutz gegen Abgaben.',
          '**Bauern und später Bürger** (Arbeitende, laboratores): über 90 % der Bevölkerung.',
          'Der Stand war **von Geburt festgelegt** – Aufstieg war nur über Kirche oder Stadt möglich.',
        ],
      },
      {
        type: 'text',
        md: 'Ab dem 11. Jahrhundert wuchsen die **Städte**. Handwerker organisierten sich in **Zünften**, Kaufleute in Gilden. Wer ein Jahr und einen Tag unentdeckt in der Stadt lebte, wurde frei – daher der Satz **„Stadtluft macht frei"**. Städte errangen Marktrecht, Münzrecht und eigene Gerichtsbarkeit; einige wurden als **Reichsstädte** nur dem Kaiser unterstellt.',
      },
      {
        type: 'example',
        title: 'Der Investiturstreit (1076–1122)',
        task: 'Warum stritten Kaiser und Papst?',
        steps: [
          'Streitfrage: Wer setzt Bischöfe ein (Investitur)? Bischöfe waren zugleich weltliche Machthaber.',
          '1076: Papst Gregor VII. belegt Heinrich IV. mit dem Kirchenbann; die Fürsten drohen mit Absetzung.',
          '1077: **Gang nach Canossa** – Heinrich tut Buße und erreicht die Lösung vom Bann.',
          '1122: **Wormser Konkordat** – geistliche Einsetzung durch die Kirche, weltliche Belehnung durch den König.',
        ],
        result: 'Ergebnis: Die Kirche emanzipiert sich vom Kaisertum – ein Grundstein der Trennung von geistlicher und weltlicher Macht.',
      },
      {
        type: 'warn',
        title: 'Klischee-Check',
        md: 'Das „finstere Mittelalter" ist ein Zerrbild der Aufklärung. Tatsächlich entstanden in dieser Zeit Universitäten (Bologna 1088), gotische Kathedralen, Brille, Buchdruck-Vorläufer und ein reger Fernhandel.',
      },
      {
        type: 'merksatz',
        title: 'Jahreszahlen-Anker',
        md: '**800** Kaiserkrönung Karls des Großen · **1077** Canossa · **1096** Erster Kreuzzug · **1241** Hanse-Vorläufer · **1348** Pest in Europa · **1356** Goldene Bulle · **1492** Ende des Mittelalters (Entdeckung Amerikas).',
      },
    ],
    questions: [
      { id: 'ge7m-q1', type: 'mc', q: 'Was erhielt ein Vasall von seinem Lehnsherrn?', options: ['Geld als Sold', 'ein Lehen (Land und Rechte)', 'einen Adelstitel auf Zeit', 'das Stimmrecht im Reichstag'], answer: 1, explain: 'Grundlage war die Vergabe von Land gegen Treue und Heeresfolge.' },
      { id: 'ge7m-q2', type: 'input', q: 'In welchem Jahr fand der Gang nach Canossa statt?', accept: ['1077'], explain: 'Heinrich IV. tat dort Buße, um den Kirchenbann zu lösen.' },
      { id: 'ge7m-q3', type: 'mc', q: 'Was bedeutet „Stadtluft macht frei"?', options: ['Städte hatten bessere Luft', 'Wer ein Jahr und einen Tag in der Stadt lebte, wurde von der Hörigkeit frei', 'Stadtbewohner zahlten keine Steuern', 'In Städten gab es keine Gesetze'], answer: 1, explain: 'Die Stadt bot Hörigen einen realen Ausweg aus der Grundherrschaft.' },
      { id: 'ge7m-q4', type: 'multi', q: 'Welche Stände kennt die mittelalterliche Ordnung?', options: ['Klerus', 'Adel', 'Bauern', 'Beamte'], answers: [0, 1, 2], explain: 'Ein Berufsbeamtentum entstand erst in der Neuzeit.' },
      { id: 'ge7m-q5', type: 'truefalse', q: 'Im Wormser Konkordat wurde die Frage der Bischofseinsetzung geregelt.', answer: true, explain: '1122: geistliche Weihe durch die Kirche, weltliche Belehnung durch den König.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'geo-10-stadt',
    subjectId: 'geographie',
    grade: 10,
    title: 'Stadtgeographie: Wie Städte wachsen',
    teaser: 'Stadtmodelle, Suburbanisierung, Gentrifizierung und die Frage, wem die Stadt gehört.',
    minutes: 20,
    tags: ['Stadt', 'Urbanisierung', 'Gentrifizierung'],
    blocks: [
      {
        type: 'table',
        head: ['Stadtmodell', 'Grundidee', 'Beispiel'],
        rows: [
          ['Ringmodell (Burgess)', 'konzentrische Ringe um das Zentrum', 'klassische Industriestadt'],
          ['Sektorenmodell (Hoyt)', 'keilförmige Sektoren entlang Verkehrsachsen', 'Städte mit Bahn-/Straßenachsen'],
          ['Mehrkernmodell (Harris/Ullman)', 'mehrere Zentren mit eigenen Funktionen', 'moderne Großstadtregionen'],
          ['Europäische Stadt', 'kompakt, historischer Kern, öffentlicher Raum', 'München, Regensburg'],
          ['Nordamerikanische Stadt', 'Downtown mit Hochhäusern, Schachbrett, starke Segregation', 'Chicago'],
        ],
      },
      {
        type: 'steps',
        title: 'Phasen der Stadtentwicklung',
        items: [
          '**Urbanisierung**: Zuwanderung in die Kernstadt (19. Jh., Industrialisierung).',
          '**Suburbanisierung**: Wohnen und Gewerbe wandern ins Umland – „Speckgürtel", Flächenverbrauch, Pendlerverkehr.',
          '**Desurbanisierung**: Auch das Umland verliert, ländliche Räume wachsen (selten in Deutschland).',
          '**Reurbanisierung**: Rückkehr in die Stadt – Nachverdichtung, steigende Mieten, Wohnraummangel.',
        ],
      },
      {
        type: 'text',
        md: '**Gentrifizierung** beschreibt die Aufwertung eines günstigen Viertels: Zuerst ziehen Studierende und Kreative zu (Pioniere), das Viertel wird „angesagt", Cafés und Galerien folgen. Investoren sanieren, Mieten steigen, und die ursprüngliche Bevölkerung wird **verdrängt** (Displacement). Der Prozess läuft typischerweise in vier Phasen ab und ist in Städten wie München, Berlin oder Leipzig gut zu beobachten.',
      },
      {
        type: 'compare',
        title: 'Gentrifizierung – zwei Perspektiven',
        left: {
          head: 'Positiv',
          items: ['Sanierung heruntergekommener Bausubstanz', 'weniger Leerstand und Kriminalität', 'bessere Infrastruktur und Nahversorgung', 'höhere Steuereinnahmen der Kommune'],
        },
        right: {
          head: 'Kritisch',
          items: ['Verdrängung einkommensschwacher Haushalte', 'Verlust gewachsener Nachbarschaften', 'soziale Entmischung (Segregation)', 'Mietpreisspirale im ganzen Stadtgebiet'],
        },
      },
      {
        type: 'list',
        title: 'Steuerungsinstrumente der Stadtplanung',
        items: [
          '**Flächennutzungs- und Bebauungsplan**: legt fest, wo was gebaut werden darf.',
          '**Milieuschutzsatzung**: begrenzt Luxussanierung und Umwandlung in Eigentumswohnungen.',
          '**Sozialer Wohnungsbau und Erbbaurecht**: hält Boden in öffentlicher Hand.',
          '**Innenentwicklung vor Außenentwicklung**: Nachverdichten statt neue Flächen versiegeln.',
          '**Verkehrswende**: ÖPNV-Ausbau, Radwege, autoarme Quartiere, Stadt der kurzen Wege.',
        ],
      },
      {
        type: 'warn',
        title: 'Begriffe sauber trennen',
        md: '**Segregation** = räumliche Trennung von Bevölkerungsgruppen. **Fragmentierung** = Zerfall in abgeschottete Teilräume (z. B. Gated Communities). **Gentrifizierung** = Aufwertung mit Verdrängung. In Prüfungen werden diese Begriffe gern verwechselt.',
      },
    ],
    questions: [
      { id: 'geo10s-q1', type: 'mc', q: 'Welche Phase beschreibt die Abwanderung ins Umland?', options: ['Urbanisierung', 'Suburbanisierung', 'Reurbanisierung', 'Segregation'], answer: 1, explain: 'Der „Speckgürtel" wächst, die Kernstadt verliert Einwohner.' },
      { id: 'geo10s-q2', type: 'mc', q: 'Was kennzeichnet Gentrifizierung?', options: ['Abriss von Altbauten', 'Aufwertung eines Viertels mit Verdrängung der alten Bewohner', 'Zuzug von Industriebetrieben', 'Rückbau von Infrastruktur'], answer: 1, explain: 'Aufwertung plus Verdrängung ist die Kernkombination.' },
      { id: 'geo10s-q3', type: 'truefalse', q: 'Das Ringmodell von Burgess beschreibt konzentrische Zonen um das Stadtzentrum.', answer: true, explain: 'Vom Central Business District nach außen in Ringen.' },
      { id: 'geo10s-q4', type: 'multi', q: 'Welche Instrumente kann eine Stadt gegen Verdrängung einsetzen?', options: ['Milieuschutzsatzung', 'sozialer Wohnungsbau', 'Ausweisung neuer Gewerbegebiete', 'Erbbaurecht statt Grundstücksverkauf'], answers: [0, 1, 3], explain: 'Gewerbegebiete am Stadtrand lösen das Wohnproblem nicht.' },
      { id: 'geo10s-q5', type: 'input', q: 'Wie nennt man die räumliche Trennung von Bevölkerungsgruppen in einer Stadt?', accept: ['Segregation'], explain: 'Sie kann sozial, ethnisch oder demographisch begründet sein.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'eth-7-weltreligionen',
    subjectId: 'ethik',
    grade: 7,
    title: 'Die fünf Weltreligionen im Überblick',
    teaser: 'Ursprung, Kernaussagen, heilige Schriften und Feste – kompakt gegenübergestellt.',
    minutes: 20,
    tags: ['Religion', 'Weltreligionen', 'Vergleich'],
    blocks: [
      {
        type: 'table',
        head: ['Religion', 'Entstehung', 'Zentrale Schrift', 'Gottesbild'],
        rows: [
          ['Judentum', 'ca. 1200 v. Chr., Vorderer Orient', 'Tora / Tanach, Talmud', 'ein Gott (JHWH), Bund mit dem Volk Israel'],
          ['Christentum', '1. Jh. n. Chr., Palästina', 'Bibel (AT und NT)', 'ein Gott in drei Personen, Jesus als Sohn Gottes'],
          ['Islam', '7. Jh. n. Chr., Arabien', 'Koran, Sunna', 'ein Gott (Allah), Mohammed als letzter Prophet'],
          ['Hinduismus', 'ab ca. 1500 v. Chr., Indien', 'Veden, Upanishaden, Bhagavadgita', 'viele Gottheiten als Erscheinungen des Brahman'],
          ['Buddhismus', '5. Jh. v. Chr., Indien', 'Pali-Kanon', 'keine Gottesverehrung im Zentrum, Erleuchtung als Ziel'],
        ],
      },
      {
        type: 'list',
        title: 'Die fünf Säulen des Islam',
        ordered: true,
        items: [
          '**Schahada** – Glaubensbekenntnis',
          '**Salat** – fünfmal täglich beten',
          '**Zakat** – Abgabe für Bedürftige',
          '**Saum** – Fasten im Ramadan',
          '**Haddsch** – Pilgerfahrt nach Mekka (einmal im Leben, wenn möglich)',
        ],
      },
      {
        type: 'list',
        title: 'Vier edle Wahrheiten des Buddhismus',
        ordered: true,
        items: [
          'Das Leben ist von Leiden (dukkha) geprägt.',
          'Die Ursache des Leidens ist das Begehren.',
          'Das Leiden kann durch Überwindung des Begehrens enden.',
          'Der Weg dorthin ist der Achtfache Pfad (rechte Erkenntnis, Gesinnung, Rede, Handeln, Lebenserwerb, Streben, Achtsamkeit, Versenkung).',
        ],
      },
      {
        type: 'text',
        md: 'Judentum, Christentum und Islam heißen **abrahamitische Religionen**, weil sie sich alle auf Abraham berufen. Alle drei sind **monotheistisch**, kennen heilige Schriften, Propheten und eine ethische Grundorientierung – und teilen zentrale Figuren wie Moses. Die Unterschiede liegen vor allem im Verständnis Jesu und in der Bedeutung der jeweiligen Offenbarung.',
      },
      {
        type: 'table',
        head: ['Religion', 'Wichtige Feste', 'Gotteshaus'],
        rows: [
          ['Judentum', 'Pessach, Jom Kippur, Chanukka', 'Synagoge'],
          ['Christentum', 'Weihnachten, Ostern, Pfingsten', 'Kirche'],
          ['Islam', 'Ramadan/Id al-Fitr, Id al-Adha', 'Moschee'],
          ['Hinduismus', 'Diwali, Holi', 'Mandir (Tempel)'],
          ['Buddhismus', 'Vesakh', 'Tempel, Kloster'],
        ],
      },
      {
        type: 'merksatz',
        title: 'Goldene Regel',
        md: 'Fast alle Religionen kennen dieselbe Grundregel: **„Was du nicht willst, dass man dir tu, das füg auch keinem andern zu."** Sie findet sich im Judentum, Christentum, Islam, Hinduismus, Buddhismus und bei Konfuzius – ein starkes Argument für interreligiösen Dialog.',
      },
      {
        type: 'warn',
        title: 'Respektvoll sprechen',
        md: 'Keine Religion ist ein Block: Es gibt liberale und strenge Strömungen in jeder. Aussagen wie „Die Muslime glauben …" sind Verallgemeinerungen. Besser: „Nach der Lehre des Islam …" oder „Viele gläubige Muslime …".',
      },
    ],
    questions: [
      { id: 'eth7w-q1', type: 'input', q: 'Wie viele Säulen hat der Islam?', accept: ['5', 'fünf'], explain: 'Schahada, Salat, Zakat, Saum, Haddsch.' },
      { id: 'eth7w-q2', type: 'mc', q: 'Welche Religionen zählen zu den abrahamitischen?', options: ['Hinduismus, Buddhismus, Islam', 'Judentum, Christentum, Islam', 'Christentum, Buddhismus, Judentum', 'Islam, Hinduismus, Christentum'], answer: 1, explain: 'Alle drei berufen sich auf Abraham.' },
      { id: 'eth7w-q3', type: 'mc', q: 'Was ist das Ziel des buddhistischen Weges?', options: ['Erlösung durch Gott', 'das Paradies', 'Erleuchtung und Ende des Leidens (Nirwana)', 'Wiedergeburt als Mensch'], answer: 2, explain: 'Das Leiden endet mit dem Überwinden des Begehrens.' },
      { id: 'eth7w-q4', type: 'input', q: 'Wie heißt das Gotteshaus im Judentum?', accept: ['Synagoge'], explain: 'Im Islam Moschee, im Christentum Kirche.' },
      { id: 'eth7w-q5', type: 'truefalse', q: 'Die „Goldene Regel" findet sich in mehreren Religionen.', answer: true, explain: 'Sie ist ein zentrales gemeinsames ethisches Prinzip.' },
      { id: 'eth7w-q6', type: 'mc', q: 'Welche Schrift ist im Islam zentral?', options: ['Tora', 'Veden', 'Koran', 'Pali-Kanon'], answer: 2, explain: 'Der Koran gilt als wörtliche Offenbarung Gottes an Mohammed.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'eth-11-digitale-ethik',
    subjectId: 'ethik',
    grade: 11,
    title: 'Digitale Ethik: KI, Daten und Verantwortung',
    teaser: 'Wer haftet für einen Algorithmus? Dilemmata des autonomen Fahrens, Datenschutz und Meinungsfreiheit im Netz.',
    minutes: 22,
    tags: ['Ethik', 'Digitalisierung', 'KI', 'Verantwortung'],
    abi: true,
    blocks: [
      {
        type: 'text',
        md: 'Technik ist nie neutral: Jede Gestaltungsentscheidung enthält Wertungen. Die **digitale Ethik** fragt deshalb nicht „Was ist technisch möglich?", sondern „Was sollen wir wollen?" – und wer die Verantwortung trägt, wenn Maschinen entscheiden.',
      },
      {
        type: 'example',
        title: 'Das Dilemma des autonomen Fahrens',
        task: 'Ein selbstfahrendes Auto kann einem Unfall nicht mehr ausweichen: geradeaus sterben fünf Personen, beim Ausweichen eine. Wie soll es programmiert werden?',
        steps: [
          '**Utilitaristische Sicht**: Das Auto soll den Gesamtschaden minimieren – also ausweichen (1 statt 5 Opfer).',
          '**Deontologische Sicht (Kant)**: Niemand darf als bloßes Mittel benutzt werden. Eine Person gezielt zu töten, um andere zu retten, ist unzulässig.',
          '**Deutsche Ethikkommission (2017)**: Eine Aufrechnung von Menschenleben nach Zahl, Alter oder Geschlecht ist **verboten**; Sachschaden geht immer vor Personenschaden.',
          '**Praktische Konsequenz**: Das Auto darf nicht selektieren – es muss bremsen und darf nicht gezielt Opfer auswählen.',
        ],
        result: 'Das Beispiel zeigt: Ethische Theorien liefern unterschiedliche Antworten; Recht und Menschenwürde setzen den Rahmen.',
      },
      {
        type: 'table',
        head: ['Prinzip', 'Bedeutung', 'Beispielkonflikt'],
        rows: [
          ['Autonomie', 'selbstbestimmt entscheiden können', 'personalisierte Werbung, Nudging, Dark Patterns'],
          ['Transparenz', 'nachvollziehbare Entscheidungen', 'Blackbox-Algorithmen bei Kreditvergabe'],
          ['Gerechtigkeit', 'keine Diskriminierung', 'Bias in Bewerbungs-KIs'],
          ['Verantwortung', 'jemand muss haften', 'Unfall eines autonomen Systems'],
          ['Privatheit', 'Kontrolle über eigene Daten', 'Tracking, Gesichtserkennung im öffentlichen Raum'],
        ],
      },
      {
        type: 'compare',
        title: 'Datenschutz vs. Sicherheit',
        left: {
          head: 'Für mehr Überwachung',
          items: ['Aufklärung schwerer Straftaten', 'Prävention von Anschlägen', '„Wer nichts zu verbergen hat …"', 'Effizienz staatlichen Handelns'],
        },
        right: {
          head: 'Dagegen',
          items: ['Unschuldsvermutung gilt für alle', 'Chilling Effect: Überwachte verhalten sich angepasster', 'Missbrauchsrisiko bei Machtwechseln', 'Grundrecht auf informationelle Selbstbestimmung'],
        },
      },
      {
        type: 'list',
        title: 'Verantwortungsdiffusion bei KI',
        items: [
          'Die **Entwickler** sagen: Wir haben nur das Modell gebaut.',
          'Das **Unternehmen** sagt: Wir haben es nur eingesetzt.',
          'Die **Nutzer** sagen: Der Computer hat es so entschieden.',
          'Die **KI** selbst kann keine Verantwortung tragen – sie hat kein Bewusstsein und keine Absicht.',
          'Lösungsansatz: klare rechtliche Zuordnung (EU AI Act), Dokumentationspflichten, menschliche Letztentscheidung bei gravierenden Folgen.',
        ],
      },
      {
        type: 'merksatz',
        title: 'Kants Prüffrage – digital gewendet',
        md: 'Frage bei jeder digitalen Anwendung: **Behandelt sie Menschen als Zweck oder nur als Mittel (als Datenlieferanten, als Klickvieh)?** Diese Frage trifft den Kern fast jeder digitalen Debatte.',
      },
      {
        type: 'warn',
        title: 'Meinungsfreiheit ist nicht grenzenlos',
        md: 'Art. 5 GG schützt Meinungen, aber nicht Beleidigung, Volksverhetzung oder Falschtatsachenbehauptungen. Ein privates Netzwerk darf zudem eigene Regeln setzen – eine Löschung ist keine staatliche Zensur, wirft aber die Frage nach der Macht privater Plattformen auf.',
      },
    ],
    questions: [
      { id: 'eth11d-q1', type: 'mc', q: 'Was sagt die deutsche Ethikkommission zum autonomen Fahren?', options: ['Es soll immer die kleinere Zahl an Opfern gewählt werden', 'Eine Aufrechnung von Menschenleben ist unzulässig', 'Der Fahrzeughalter entscheidet vorab', 'Kinder sind bevorzugt zu schützen'], answer: 1, explain: 'Die Menschenwürde verbietet die Qualifizierung nach persönlichen Merkmalen oder Zahl.' },
      { id: 'eth11d-q2', type: 'multi', q: 'Welche Prinzipien nennt die digitale Ethik typischerweise?', options: ['Transparenz', 'Autonomie', 'Gewinnmaximierung', 'Gerechtigkeit'], answers: [0, 1, 3], explain: 'Gewinn ist ein ökonomisches, kein ethisches Prinzip.' },
      { id: 'eth11d-q3', type: 'truefalse', q: 'Eine KI kann moralische Verantwortung tragen.', answer: false, explain: 'Verantwortung setzt Bewusstsein, Absicht und Zurechnungsfähigkeit voraus – die hat ein Modell nicht.' },
      { id: 'eth11d-q4', type: 'mc', q: 'Was bezeichnet der „Chilling Effect"?', options: ['Abkühlung von Rechenzentren', 'Menschen verhalten sich angepasster, weil sie sich beobachtet fühlen', 'Rückgang der Internetnutzung', 'Verlangsamung von Netzwerken'], answer: 1, explain: 'Überwachung verändert Verhalten – auch bei völlig legalem Handeln.' },
      { id: 'eth11d-q5', type: 'mc', q: 'Nach Kant ist eine Handlung problematisch, wenn sie Menschen …', options: ['nur als Mittel behandelt', 'glücklich macht', 'Geld kostet', 'überrascht'], answer: 0, explain: 'Selbstzweckformel: Der Mensch darf nie bloß als Mittel gebraucht werden.' },
      { id: 'eth11d-q6', type: 'truefalse', q: 'Meinungsfreiheit schützt auch bewusste Falschbehauptungen über Tatsachen.', answer: false, explain: 'Unwahre Tatsachenbehauptungen fallen nicht unter den Schutz von Art. 5 GG.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'wr-11-unternehmen',
    subjectId: 'wr',
    grade: 11,
    title: 'Unternehmensformen und Haftung',
    teaser: 'Einzelunternehmen, OHG, GmbH, AG – wer haftet womit und warum die Rechtsform über alles entscheidet.',
    minutes: 20,
    tags: ['Recht', 'Unternehmen', 'Haftung'],
    abi: true,
    blocks: [
      {
        type: 'table',
        head: ['Rechtsform', 'Gründer', 'Mindestkapital', 'Haftung'],
        rows: [
          ['Einzelunternehmen', '1 Person', '—', 'unbeschränkt mit Privatvermögen'],
          ['GbR', 'ab 2 Personen', '—', 'alle unbeschränkt und gesamtschuldnerisch'],
          ['OHG', 'ab 2 Personen', '—', 'alle unbeschränkt'],
          ['KG', 'Komplementär + Kommanditist', '—', 'Komplementär unbeschränkt, Kommanditist nur mit Einlage'],
          ['GmbH', 'ab 1 Person', '25 000 €', 'nur Gesellschaftsvermögen'],
          ['UG (haftungsbeschränkt)', 'ab 1 Person', '1 €', 'nur Gesellschaftsvermögen, Rücklagenpflicht'],
          ['AG', 'ab 1 Person', '50 000 €', 'nur Gesellschaftsvermögen'],
        ],
      },
      {
        type: 'compare',
        title: 'Personen- vs. Kapitalgesellschaft',
        left: {
          head: 'Personengesellschaft (GbR, OHG, KG)',
          items: ['Personen stehen im Mittelpunkt', 'kein Mindestkapital', 'persönliche Haftung (mind. eines Gesellschafters)', 'einfache und günstige Gründung', 'Gewinn wird direkt den Gesellschaftern zugerechnet'],
        },
        right: {
          head: 'Kapitalgesellschaft (GmbH, AG)',
          items: ['Kapital steht im Mittelpunkt', 'Mindestkapital erforderlich', 'Haftung auf Gesellschaftsvermögen begrenzt', 'notarielle Gründung, Handelsregister', 'eigene juristische Person, Körperschaftsteuer'],
        },
      },
      {
        type: 'example',
        title: 'Welche Rechtsform passt?',
        task: 'Drei Freunde gründen ein Software-Start-up und brauchen Investorengeld.',
        steps: [
          'Risiko: Softwarefehler können hohe Schadensersatzforderungen auslösen → Haftungsbeschränkung wichtig.',
          'Kapitalbedarf: Investoren sollen Anteile erwerben können → Anteile müssen übertragbar sein.',
          'GbR/OHG scheiden aus (volle Privathaftung), AG ist für den Start zu aufwendig.',
          'GmbH passt: 25 000 € Stammkapital (die Hälfte sofort einzuzahlen), Anteile übertragbar, Haftung begrenzt.',
        ],
        result: 'Ergebnis: GmbH – oder zunächst UG mit späterem Wechsel zur GmbH.',
      },
      {
        type: 'text',
        md: 'Die **AG** hat drei Organe: Die **Hauptversammlung** (Aktionäre) wählt den **Aufsichtsrat**, dieser bestellt und kontrolliert den **Vorstand**, der das Unternehmen leitet. Aktionäre haben Stimmrecht, Anspruch auf Dividende und ein Bezugsrecht bei Kapitalerhöhungen – aber keinen Anspruch auf Rückzahlung ihrer Einlage.',
      },
      {
        type: 'warn',
        title: 'Haftungsbeschränkung hat Grenzen',
        md: 'Banken verlangen von GmbH-Gesellschaftern oft **persönliche Bürgschaften** – die Haftungsbeschränkung ist dann faktisch ausgehebelt. Bei **Insolvenzverschleppung** oder Vermischung von Privat- und Firmenvermögen haftet der Geschäftsführer zudem persönlich („Durchgriffshaftung").',
      },
      {
        type: 'merksatz',
        title: 'Merkformel',
        md: '**Haftung folgt der Kapitalbindung**: Wer der Gesellschaft festes Kapital zur Verfügung stellt und es dort belässt (GmbH, AG), darf sein Privatvermögen schützen. Wer kein Kapital bindet (GbR, OHG), haftet persönlich.',
      },
    ],
    questions: [
      { id: 'wr11u-q1', type: 'input', q: 'Wie hoch ist das Mindeststammkapital einer GmbH in Euro?', accept: ['25000', '25.000', '25 000', '25000 €'], explain: '25 000 €, davon müssen bei Gründung mindestens 12 500 € eingezahlt werden.' },
      { id: 'wr11u-q2', type: 'mc', q: 'Wer haftet bei einer KG unbeschränkt?', options: ['der Kommanditist', 'der Komplementär', 'beide gleich', 'niemand'], answer: 1, explain: 'Der Kommanditist haftet nur bis zur Höhe seiner Einlage.' },
      { id: 'wr11u-q3', type: 'mc', q: 'Welches Organ der AG bestellt den Vorstand?', options: ['Hauptversammlung', 'Aufsichtsrat', 'Betriebsrat', 'Wirtschaftsprüfer'], answer: 1, explain: 'Die Hauptversammlung wählt den Aufsichtsrat, dieser bestellt den Vorstand.' },
      { id: 'wr11u-q4', type: 'truefalse', q: 'Bei der OHG haften die Gesellschafter auch mit ihrem Privatvermögen.', answer: true, explain: 'Unbeschränkt, unmittelbar und gesamtschuldnerisch.' },
      { id: 'wr11u-q5', type: 'multi', q: 'Welche Formen sind Kapitalgesellschaften?', options: ['GmbH', 'AG', 'OHG', 'UG'], answers: [0, 1, 3], explain: 'Die OHG ist eine Personengesellschaft.' },
      { id: 'wr11u-q6', type: 'mc', q: 'Warum verlangen Banken von GmbH-Gesellschaftern oft Bürgschaften?', options: ['gesetzliche Pflicht', 'um die Haftungsbeschränkung faktisch zu umgehen', 'um Steuern zu sparen', 'zur Erhöhung des Stammkapitals'], answer: 1, explain: 'Sonst könnte die Bank bei Insolvenz nur auf das Gesellschaftsvermögen zugreifen.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'pug-11-eu',
    subjectId: 'pug',
    grade: 11,
    title: 'Die Europäische Union verstehen',
    teaser: 'Organe, Gesetzgebung, Binnenmarkt – und die Frage nach dem Demokratiedefizit.',
    minutes: 22,
    tags: ['EU', 'Politik', 'Institutionen'],
    abi: true,
    blocks: [
      {
        type: 'table',
        head: ['Organ', 'Zusammensetzung', 'Funktion'],
        rows: [
          ['Europäisches Parlament', '720 direkt gewählte Abgeordnete', 'Gesetzgebung (mit dem Rat), Haushalt, Kontrolle'],
          ['Rat der EU (Ministerrat)', 'Fachminister der Mitgliedstaaten', 'Gesetzgebung gemeinsam mit dem Parlament'],
          ['Europäischer Rat', 'Staats- und Regierungschefs', 'politische Leitlinien, keine Gesetzgebung'],
          ['Europäische Kommission', 'ein Mitglied je Staat', 'Initiativrecht, „Hüterin der Verträge", Verwaltung'],
          ['Europäischer Gerichtshof', 'Richter aus allen Staaten', 'Auslegung des EU-Rechts, Vertragsverletzungsverfahren'],
          ['Europäische Zentralbank', 'unabhängig, Sitz Frankfurt', 'Geldpolitik im Euroraum, Preisstabilität'],
        ],
      },
      {
        type: 'steps',
        title: 'Wie ein EU-Gesetz entsteht (ordentliches Gesetzgebungsverfahren)',
        items: [
          'Die **Kommission** legt einen Vorschlag vor – nur sie hat das Initiativrecht.',
          'Das **Parlament** berät in Ausschüssen, ändert und stimmt ab (1. Lesung).',
          'Der **Rat** stimmt ebenfalls ab – meist mit qualifizierter Mehrheit (55 % der Staaten, die 65 % der Bevölkerung vertreten).',
          'Bei Uneinigkeit: 2. Lesung, danach **Vermittlungsausschuss**.',
          'Nach Einigung: Veröffentlichung im Amtsblatt. **Verordnungen** gelten unmittelbar, **Richtlinien** müssen national umgesetzt werden.',
        ],
      },
      {
        type: 'list',
        title: 'Die vier Grundfreiheiten des Binnenmarkts',
        items: [
          '**Warenverkehrsfreiheit** – keine Zölle und mengenmäßigen Beschränkungen',
          '**Personenfreizügigkeit** – überall leben und arbeiten dürfen',
          '**Dienstleistungsfreiheit** – grenzüberschreitend Leistungen anbieten',
          '**Kapitalverkehrsfreiheit** – Geld und Investitionen frei bewegen',
        ],
      },
      {
        type: 'compare',
        title: 'Die Debatte um das Demokratiedefizit',
        left: {
          head: 'Kritik',
          items: ['Nur die nicht gewählte Kommission hat das Initiativrecht', 'Parlament kann keine Gesetze einbringen', 'Ratssitzungen sind teils intransparent', 'Europawahl gilt vielen als „Nebenwahl"', 'Stimmengewicht pro Einwohner ist ungleich (degressive Proportionalität)'],
        },
        right: {
          head: 'Gegenargumente',
          items: ['Parlament wurde in jeder Vertragsreform gestärkt', 'Doppelte Legitimation: Bürger (Parlament) und Staaten (Rat)', 'Nationale Parlamente haben Subsidiaritätsrüge', 'EuGH sichert Rechtsstaatlichkeit', 'Kein Gesetz gegen das Parlament möglich'],
        },
      },
      {
        type: 'text',
        md: 'Das **Subsidiaritätsprinzip** besagt: Die EU wird nur tätig, wenn ein Ziel auf nationaler oder regionaler Ebene nicht ausreichend erreicht werden kann. Nationale Parlamente können binnen acht Wochen eine **Subsidiaritätsrüge** erheben („gelbe Karte"), wenn sie eine Zuständigkeitsüberschreitung sehen.',
      },
      {
        type: 'merksatz',
        title: 'Verordnung, Richtlinie, Beschluss',
        md: '**Verordnung** = gilt sofort in allen Staaten (wie ein Bundesgesetz). **Richtlinie** = gibt ein Ziel vor, der nationale Gesetzgeber bestimmt den Weg. **Beschluss** = gilt nur für konkrete Adressaten.',
      },
      {
        type: 'warn',
        title: 'Verwechslungsgefahr',
        md: '**Europäischer Rat** (Staats- und Regierungschefs, gibt Leitlinien) ≠ **Rat der EU** (Fachminister, Gesetzgebung) ≠ **Europarat** (gar keine EU-Institution, 46 Staaten, Sitz Straßburg, zuständig für die Europäische Menschenrechtskonvention).',
      },
    ],
    questions: [
      { id: 'pug11e-q1', type: 'mc', q: 'Welches Organ besitzt in der EU das Initiativrecht für Gesetze?', options: ['Europäisches Parlament', 'Europäische Kommission', 'Rat der EU', 'Europäischer Gerichtshof'], answer: 1, explain: 'Nur die Kommission kann Gesetzesvorschläge einbringen – ein Kernpunkt der Demokratiedefizit-Debatte.' },
      { id: 'pug11e-q2', type: 'mc', q: 'Was gilt in allen Mitgliedstaaten unmittelbar, ohne nationale Umsetzung?', options: ['Richtlinie', 'Verordnung', 'Empfehlung', 'Stellungnahme'], answer: 1, explain: 'Die Verordnung wirkt direkt, die Richtlinie muss umgesetzt werden.' },
      { id: 'pug11e-q3', type: 'multi', q: 'Welche sind Grundfreiheiten des Binnenmarkts?', options: ['freier Warenverkehr', 'Personenfreizügigkeit', 'Pressefreiheit', 'freier Kapitalverkehr'], answers: [0, 1, 3], explain: 'Pressefreiheit ist ein Grundrecht, aber keine Binnenmarktfreiheit.' },
      { id: 'pug11e-q4', type: 'truefalse', q: 'Der Europarat ist ein Organ der Europäischen Union.', answer: false, explain: 'Er ist eine eigenständige Organisation mit 46 Mitgliedern und für die EMRK zuständig.' },
      { id: 'pug11e-q5', type: 'input', q: 'Wie heißt das Prinzip, nach dem die EU nur handelt, wenn nationale Ebenen ein Ziel nicht besser erreichen können?', accept: ['Subsidiaritätsprinzip', 'Subsidiarität'], explain: 'Verankert in Art. 5 EUV.' },
      { id: 'pug11e-q6', type: 'mc', q: 'Wer wählt das Europäische Parlament?', options: ['die nationalen Parlamente', 'die Bürgerinnen und Bürger der EU direkt', 'der Europäische Rat', 'die Kommission'], answer: 1, explain: 'Seit 1979 wird das EP alle fünf Jahre direkt gewählt.' },
    ],
  },
]
