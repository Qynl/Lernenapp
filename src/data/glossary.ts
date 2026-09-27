import type { GlossaryEntry } from '../types'

const g = (term: string, subjectId: string, short: string, long?: string, topicId?: string, synonyms?: string[]): GlossaryEntry => ({
  term,
  subjectId,
  short,
  long,
  topicId,
  synonyms,
})

/** Nachschlagewerk: kurze, präzise Definitionen aller Fachbegriffe der App. */
export const glossary: GlossaryEntry[] = [
  /* ------------------------------ Mathematik ---------------------------- */
  g('Term', 'mathe', 'Sinnvolle Rechenvorschrift ohne Gleichheitszeichen.', 'Beispiele: 3x + 5, a², (x−1)(x+2). Ein Term hat einen Wert, sobald man Zahlen einsetzt.', 'ma-7-terme'),
  g('Variable', 'mathe', 'Platzhalter für eine Zahl, meist x, y oder a.', 'Variablen erlauben allgemeine Aussagen statt einzelner Rechnungen.', 'ma-7-terme'),
  g('Definitionsmenge', 'mathe', 'Menge aller Zahlen, die man einsetzen darf.', 'Ausgeschlossen werden z. B. Nenner, die null werden, oder negative Radikanden.', 'ma-9-bruchgleichungen'),
  g('Lösungsmenge', 'mathe', 'Menge aller Zahlen, die eine Gleichung erfüllen.', 'Schreibweise L = {…}. Bei keiner Lösung schreibt man L = { }.', 'ma-7-gleichungen'),
  g('Binomische Formeln', 'mathe', 'Drei Formeln zum schnellen Ausmultiplizieren und Faktorisieren.', '(a+b)² = a²+2ab+b²; (a−b)² = a²−2ab+b²; (a+b)(a−b) = a²−b²'),
  g('Mitternachtsformel', 'mathe', 'Lösungsformel für ax² + bx + c = 0.', 'x₁,₂ = (−b ± √(b²−4ac))/(2a). Die Diskriminante b²−4ac entscheidet über die Anzahl der Lösungen.', 'ma-9-quadratische-gleichungen'),
  g('Diskriminante', 'mathe', 'Der Ausdruck D = b² − 4ac unter der Wurzel.', 'D > 0 → zwei Lösungen, D = 0 → eine, D < 0 → keine reelle Lösung.', 'ma-9-quadratische-gleichungen'),
  g('Scheitelpunkt', 'mathe', 'Höchster oder tiefster Punkt einer Parabel.', 'Aus der Scheitelform f(x) = a(x−d)²+e liest man S(d|e) direkt ab.', 'ma-9-quadratische-funktionen'),
  g('Steigung', 'mathe', 'Maß für die Änderung einer Funktion.', 'Bei Geraden m = Δy/Δx, bei krummen Graphen die Ableitung f′(x).', 'ma-8-lineare-funktionen'),
  g('Ableitung', 'mathe', 'Momentane Änderungsrate, Steigung der Tangente.', 'f′(x) = lim_(h→0) (f(x+h) − f(x))/h', 'ma-11-ableitung'),
  g('Stammfunktion', 'mathe', 'Funktion F, deren Ableitung f ist.', 'Sie ist nur bis auf eine additive Konstante C eindeutig.', 'ma-12-integral'),
  g('Integral', 'mathe', 'Orientierter Flächeninhalt zwischen Graph und x-Achse.', 'Flächen unterhalb der Achse zählen negativ – bei Flächenberechnungen deshalb Nullstellen bestimmen.', 'ma-12-integral'),
  g('Asymptote', 'mathe', 'Gerade, der sich ein Graph beliebig annähert.', 'Senkrecht an Polstellen, waagrecht oder schief im Unendlichen.', 'ma-11-grenzwerte'),
  g('Polstelle', 'mathe', 'Definitionslücke, an der die Funktion gegen ±∞ geht.', 'Im Gegensatz zur hebbaren Lücke lässt sie sich nicht stetig schließen.', 'ma-11-grenzwerte'),
  g('Erwartungswert', 'mathe', 'Durchschnittliches Ergebnis auf lange Sicht.', 'E(X) = Σ xᵢ·P(X = xᵢ); bei Binomialverteilung μ = n·p.', 'ma-12-binomialverteilung'),
  g('Signifikanzniveau', 'mathe', 'Maximale Wahrscheinlichkeit für einen Fehler 1. Art.', 'Üblich sind 5 % oder 1 %. Es wird vor dem Test festgelegt.', 'ma-12-hypothesentest'),
  g('Median', 'mathe', 'Mittlerer Wert einer geordneten Datenreihe.', 'Robuster gegen Ausreißer als das arithmetische Mittel.', 'ma-8-statistik'),
  g('Skalarprodukt', 'mathe', 'Produkt zweier Vektoren, das eine Zahl liefert.', 'a⃗·b⃗ = 0 bedeutet: Die Vektoren stehen senkrecht aufeinander.', 'ma-11-vektoren'),
  g('Kongruenz', 'mathe', 'Deckungsgleichheit zweier Figuren.', 'Kongruenzsätze: SSS, SWS, WSW, SsW.', 'ma-7-dreiecke'),
  g('Strahlensätze', 'mathe', 'Verhältnisgleichungen bei parallelen Geraden.', 'Grundlage für Ähnlichkeit und viele Anwendungsaufgaben.', 'ma-8-strahlensaetze'),

  /* -------------------------------- Deutsch ----------------------------- */
  g('Metapher', 'deutsch', 'Bildhafter Ausdruck ohne Vergleichswort.', 'Beispiel: „Meer aus Tränen". Anders als beim Vergleich fehlt „wie".', 'de-9-rhetorische-mittel'),
  g('Anapher', 'deutsch', 'Wiederholung eines Wortes am Satz- oder Versanfang.', 'Verstärkt und rhythmisiert; Gegenstück ist die Epipher am Ende.', 'de-9-rhetorische-mittel'),
  g('Oxymoron', 'deutsch', 'Verbindung zweier sich widersprechender Begriffe.', '„beredtes Schweigen", „bittersüß"', 'de-9-rhetorische-mittel'),
  g('Euphemismus', 'deutsch', 'Beschönigende Umschreibung.', '„Freisetzung" für Entlassung – oft ein Hinweis auf manipulative Absicht.', 'de-9-rhetorische-mittel'),
  g('Lyrisches Ich', 'deutsch', 'Die Sprechinstanz eines Gedichts.', 'Nicht mit dem Autor gleichsetzen – es ist eine Rolle im Text.', 'de-9-gedichtanalyse'),
  g('Jambus', 'deutsch', 'Versmaß mit der Folge unbetont–betont.', 'Wirkt fließend und vorwärtsdrängend; häufigstes Versmaß der deutschen Lyrik.', 'de-12-lyrikvergleich'),
  g('Sonett', 'deutsch', 'Gedichtform aus 14 Versen in 4-4-3-3.', 'Zwei Quartette, zwei Terzette; beliebt in Barock und Romantik.', 'de-12-lyrikvergleich'),
  g('In medias res', 'deutsch', 'Einstieg mitten in die Handlung.', 'Typisch für Kurzgeschichten – ohne Exposition oder Vorgeschichte.', 'de-10-kurzgeschichte'),
  g('Personaler Erzähler', 'deutsch', 'Erzählt aus der Perspektive einer Figur.', 'Kennt nur deren Gedanken – erzeugt Nähe und begrenzte Sicht.', 'de-10-kurzgeschichte'),
  g('Deutungshypothese', 'deutsch', 'Vermutung über die Aussageabsicht eines Textes.', 'Steht in der Einleitung und wird im Schluss bestätigt oder differenziert.', 'de-10-kurzgeschichte'),
  g('Erörterung', 'deutsch', 'Aufsatzform zur Abwägung einer Streitfrage.', 'Steigernde Anordnung der Argumente: das stärkste kommt zuletzt.', 'de-8-eroerterung'),
  g('Konjunktiv I', 'deutsch', 'Modus der indirekten Rede.', '„Er sagt, er habe nichts gewusst."', 'de-7-inhaltsangabe'),
  g('Apposition', 'deutsch', 'Nachgestellte Erläuterung zu einem Nomen.', 'Wird in Kommas eingeschlossen: „Herr Müller, unser Lehrer, …"', 'de-7-kommasetzung'),

  /* ------------------------------- Englisch ----------------------------- */
  g('Past Participle', 'englisch', 'Dritte Verbform, u. a. für Perfekt und Passiv.', 'gone, written, done – bei regelmäßigen Verben mit -ed.', 'en-8-passive'),
  g('Backshift', 'englisch', 'Zeitenverschiebung in der indirekten Rede.', 'Nur nötig, wenn das einleitende Verb in der Vergangenheit steht.', 'en-9-reported-speech'),
  g('Gerund', 'englisch', 'Die -ing-Form als Substantiv.', 'Steht nach Präpositionen und bestimmten Verben wie enjoy, avoid, suggest.', 'en-10-gerund-infinitive'),
  g('Conditional Sentences', 'englisch', 'if-Sätze in drei Typen.', 'Typ I real, Typ II hypothetisch, Typ III unmöglich (Vergangenheit).', 'en-9-conditionals'),
  g('Mediation', 'englisch', 'Sinngemäße Vermittlung zwischen zwei Sprachen.', 'Keine Übersetzung – Inhalte werden adressatengerecht zusammengefasst.', 'en-11-mediation'),
  g('False Friend', 'englisch', 'Wort, das ähnlich klingt, aber anderes bedeutet.', '„become" heißt werden, nicht bekommen.'),

  /* ----------------------------- Französisch ---------------------------- */
  g('Passé composé', 'franzoesisch', 'Vollendete Vergangenheit für abgeschlossene Handlungen.', 'avoir/être + participe passé; 17 Bewegungsverben und alle Reflexiven mit être.', 'fr-8-vergangenheit'),
  g('Imparfait', 'franzoesisch', 'Vergangenheit für Zustände, Gewohnheiten und Beschreibungen.', 'Signalwörter: souvent, toujours, chaque jour, pendant que.', 'fr-8-vergangenheit'),
  g('Subjonctif', 'franzoesisch', 'Modus nach Ausdrücken des Wunsches, Zweifels und Gefühls.', 'Ausgelöst z. B. durch il faut que, bien que, vouloir que.', 'fr-10-subjonctif'),
  g('Objektpronomen', 'franzoesisch', 'Ersetzen direkte und indirekte Objekte.', 'Reihenfolge: me/te/se/nous/vous → le/la/les → lui/leur → y → en.', 'fr-9-pronomen'),

  /* -------------------------------- Latein ------------------------------ */
  g('AcI', 'latein', 'Accusativus cum infinitivo – Akkusativ mit Infinitiv.', 'Wird im Deutschen mit einem dass-Satz aufgelöst. Ausgelöst von Verben des Sagens und Denkens.', 'la-9-aci-abl-abs'),
  g('Ablativus absolutus', 'latein', 'Ablativ-Konstruktion ohne Bezug zum Satzsubjekt.', 'Auflösbar als Nebensatz, Präpositionalausdruck oder Beiordnung.', 'la-9-aci-abl-abs'),
  g('Participium coniunctum', 'latein', 'Partizip, das sich auf ein Satzglied bezieht.', 'PPA gleichzeitig, PPP vorzeitig, PFA nachzeitig.', 'la-11-uebersetzung'),
  g('Consecutio temporum', 'latein', 'Regel der Zeitenfolge im Konjunktiv-Nebensatz.', 'Steuert Gleichzeitigkeit, Vorzeitigkeit und Nachzeitigkeit.', 'la-10-konjunktiv'),
  g('Cum narrativum', 'latein', 'cum mit Konjunktiv im erzählenden Text.', 'Übersetzt mit „als", „nachdem", „weil" oder „obwohl".', 'la-10-konjunktiv'),
  g('Stammformen', 'latein', 'Die vier Grundformen eines Verbs.', 'voco, vocare, vocavi, vocatum – Basis aller Zeitformen.', 'la-7-konjugationen'),

  /* ------------------------------- Spanisch ----------------------------- */
  g('Indefinido', 'spanisch', 'Vergangenheit für abgeschlossene Einzelhandlungen.', 'Signalwörter: ayer, el año pasado, de repente.', 'es-10-indefinido'),
  g('Imperfecto', 'spanisch', 'Vergangenheit für Beschreibungen und Gewohnheiten.', 'Signalwörter: siempre, todos los días, mientras.', 'es-10-indefinido'),
  g('Subjuntivo', 'spanisch', 'Modus für Wunsch, Zweifel, Gefühl und Bewertung.', 'Merkhilfe WEIRDO: Wishes, Emotions, Impersonal, Recommendations, Doubt, Ojalá.', 'es-11-subjuntivo'),
  g('ser / estar', 'spanisch', 'Zwei Verben für „sein".', 'ser für Dauerhaftes und Identität, estar für Zustand und Ort.', 'es-8-ser-estar'),

  /* -------------------------------- Physik ------------------------------ */
  g('Kraft', 'physik', 'Ursache von Beschleunigung oder Verformung.', 'F = m · a, Einheit Newton (N). 1 N = 1 kg·m/s².', 'ph-8-mechanik'),
  g('Trägheit', 'physik', 'Widerstand eines Körpers gegen Bewegungsänderung.', '1. Newtonsches Gesetz: Ohne Kraft bleibt der Bewegungszustand erhalten.', 'ph-8-mechanik'),
  g('Impuls', 'physik', 'Produkt aus Masse und Geschwindigkeit.', 'p = m·v; in abgeschlossenen Systemen bleibt die Summe erhalten.'),
  g('Wirkungsgrad', 'physik', 'Verhältnis von Nutzenergie zu zugeführter Energie.', 'η = E_nutz/E_zu, immer kleiner als 1.'),
  g('Ohmsches Gesetz', 'physik', 'Zusammenhang von Spannung, Strom und Widerstand.', 'U = R · I – gilt für ohmsche Leiter bei konstanter Temperatur.', 'ph-9-elektrizitaet'),
  g('Lorentzkraft', 'physik', 'Kraft auf bewegte Ladung im Magnetfeld.', 'F = q·v·B·sin α; Richtung über die Drei-Finger-Regel.', 'ph-11-felder'),
  g('Photoeffekt', 'physik', 'Herauslösen von Elektronen durch Licht.', 'Beleg für den Teilchencharakter des Lichts: E = h·f.', 'ph-12-quanten'),
  g('Totalreflexion', 'physik', 'Vollständige Reflexion beim Übergang ins optisch dünnere Medium.', 'Tritt oberhalb des Grenzwinkels auf – Grundlage der Glasfasertechnik.', 'ph-7-optik'),

  /* -------------------------------- Chemie ------------------------------ */
  g('Stoffmenge', 'chemie', 'Größe für die Teilchenanzahl, Einheit Mol.', '1 mol enthält 6,022·10²³ Teilchen (Avogadro-Konstante).', 'ch-10-stoechiometrie'),
  g('Elektronegativität', 'chemie', 'Maß für die Anziehung von Bindungselektronen.', 'Differenz > 1,7 → Ionenbindung, 0,5–1,7 → polare Atombindung.', 'ch-9-bindungen'),
  g('Oxidation', 'chemie', 'Abgabe von Elektronen.', 'Merksatz: OIL RIG – Oxidation Is Loss, Reduction Is Gain.'),
  g('pH-Wert', 'chemie', 'Maß für die Konzentration der Oxonium-Ionen.', 'pH = −log c(H₃O⁺); < 7 sauer, 7 neutral, > 7 alkalisch.', 'ch-11-saeuren-basen'),
  g('Katalysator', 'chemie', 'Stoff, der die Aktivierungsenergie senkt.', 'Er beschleunigt die Reaktion, wird aber nicht verbraucht.'),
  g('Funktionelle Gruppe', 'chemie', 'Atomgruppe, die die Eigenschaften eines Moleküls bestimmt.', '−OH Alkohol, −COOH Carbonsäure, −CHO Aldehyd.', 'ch-12-organik'),

  /* ------------------------------- Biologie ----------------------------- */
  g('Mitose', 'biologie', 'Zellteilung mit identischen Tochterzellen.', 'Dient Wachstum und Erneuerung; Chromosomensatz bleibt diploid.', 'bio-9-genetik'),
  g('Meiose', 'biologie', 'Reifeteilung zur Bildung von Keimzellen.', 'Halbiert den Chromosomensatz und erzeugt genetische Vielfalt.', 'bio-9-genetik'),
  g('Enzym', 'biologie', 'Biokatalysator aus Protein.', 'Wirkt substratspezifisch und wirkungsspezifisch; Optimum bei bestimmter Temperatur und pH.'),
  g('Synapse', 'biologie', 'Kontaktstelle zwischen zwei Nervenzellen.', 'Erregungsübertragung chemisch über Neurotransmitter.', 'bio-10-neuro'),
  g('Aktionspotential', 'biologie', 'Kurzfristige Umkehr der Membranspannung.', 'Alles-oder-Nichts-Prinzip ab dem Schwellenwert von etwa −55 mV.', 'bio-10-neuro'),
  g('Selektion', 'biologie', 'Auslese durch Umweltfaktoren.', 'Individuen mit vorteilhaften Merkmalen haben höheren Fortpflanzungserfolg.', 'bio-11-evolution'),
  g('Ökologische Nische', 'biologie', 'Gesamtheit der Umweltansprüche einer Art.', 'Kein Ort, sondern ein „Beruf" im Ökosystem.', 'bio-12-oekologie'),

  /* ------------------------------ Geschichte ---------------------------- */
  g('Absolutismus', 'geschichte', 'Herrschaftsform mit uneingeschränkter Macht des Monarchen.', '„L\'état, c\'est moi" – Ludwig XIV.', 'ge-8-franz-revolution'),
  g('Lehnswesen', 'geschichte', 'Mittelalterliches System aus Land gegen Treue.', 'Lehnsherr vergibt ein Lehen, der Vasall leistet Treueeid und Heeresfolge.', 'ge-7-mittelalter'),
  g('Investiturstreit', 'geschichte', 'Konflikt zwischen Kaiser und Papst um die Bischofseinsetzung.', '1076–1122, Höhepunkt Canossa 1077, Ende Wormser Konkordat.', 'ge-7-mittelalter'),
  g('Gewaltenteilung', 'geschichte', 'Trennung von Legislative, Exekutive und Judikative.', 'Von Montesquieu formuliert, Grundlage moderner Verfassungen.', 'ge-8-franz-revolution'),
  g('Dolchstoßlegende', 'geschichte', 'Falschbehauptung, das Heer sei 1918 von der Heimat verraten worden.', 'Diente der Delegitimierung der Weimarer Republik.', 'ge-9-weimar-ns'),
  g('Gleichschaltung', 'geschichte', 'NS-Unterwerfung aller Institutionen unter die Partei.', '1933/34 systematisch in Ländern, Verbänden und Medien vollzogen.', 'ge-9-weimar-ns'),
  g('Containment', 'geschichte', 'US-Politik der Eindämmung des Kommunismus.', 'Truman-Doktrin 1947, Marshallplan, NATO-Gründung.', 'ge-11-kalter-krieg'),

  /* ----------------------------- Geographie ----------------------------- */
  g('Plattentektonik', 'geographie', 'Bewegung der Lithosphärenplatten.', 'Erklärt Erdbeben, Vulkanismus und Gebirgsbildung.', 'geo-8-plattentektonik'),
  g('Passatkreislauf', 'geographie', 'Globale Luftzirkulation zwischen Äquator und Wendekreisen.', 'Aufsteigende Luft am Äquator, absinkende an den Wendekreisen – Ursache der Wüstengürtel.', 'geo-5-klima'),
  g('Suburbanisierung', 'geographie', 'Abwanderung von Bevölkerung und Gewerbe ins Umland.', 'Führt zu Zersiedlung, Flächenverbrauch und Pendlerverkehr.', 'geo-10-stadt'),
  g('Gentrifizierung', 'geographie', 'Aufwertung eines Viertels mit Verdrängung der alten Bewohner.', 'Vier Phasen von den Pionieren bis zu den Investoren.', 'geo-10-stadt'),
  g('Disparität', 'geographie', 'Räumliche Ungleichheit von Lebensbedingungen.', 'Gemessen z. B. mit BIP pro Kopf, HDI oder Arbeitslosenquote.', 'geo-11-globalisierung'),

  /* ------------------------------ Informatik ---------------------------- */
  g('Algorithmus', 'informatik', 'Eindeutige, endliche Handlungsvorschrift.', 'Muss eindeutig, endlich, ausführbar und allgemeingültig sein.', 'inf-7-algorithmen-basics'),
  g('O-Notation', 'informatik', 'Beschreibt das Wachstum des Aufwands.', 'Nur der stärkste Term zählt: 5n² + 300n → O(n²).', 'inf-10-sortieren-suchen'),
  g('Binäre Suche', 'informatik', 'Suchverfahren durch fortgesetztes Halbieren.', 'Braucht sortierte Daten, Laufzeit O(log n).', 'inf-10-sortieren-suchen'),
  g('Klasse', 'informatik', 'Bauplan für Objekte mit Attributen und Methoden.', 'Ein Objekt ist eine konkrete Instanz einer Klasse.', 'inf-6-objekte'),
  g('Primärschlüssel', 'informatik', 'Attribut, das einen Datensatz eindeutig identifiziert.', 'Ein Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle.', 'inf-11-datenbanken'),
  g('Redundanz', 'informatik', 'Mehrfache Speicherung derselben Information.', 'Führt zu Anomalien – vermieden durch Normalisierung.', 'inf-11-datenbanken'),
  g('DNS', 'informatik', 'Domain Name System – übersetzt Namen in IP-Adressen.', 'Das „Telefonbuch" des Internets.', 'inf-9-internet'),
  g('Hashfunktion', 'informatik', 'Einwegfunktion, die Daten auf einen festen Wert abbildet.', 'Nicht umkehrbar – dient Integritätsprüfung und Passwortspeicherung.', 'inf-12-kryptographie'),
  g('Overfitting', 'informatik', 'Modell lernt Trainingsdaten auswendig.', 'Erkennbar an hoher Trainings- und niedriger Testgenauigkeit.', 'inf-12-ki'),

  /* ------------------------- Wirtschaft & Politik ----------------------- */
  g('Rechtsgeschäft', 'wr', 'Willenserklärung mit beabsichtigter Rechtsfolge.', 'Einseitig (Kündigung) oder zweiseitig (Kaufvertrag).', 'wr-9-rechtsgeschaefte'),
  g('Geschäftsfähigkeit', 'wr', 'Fähigkeit, wirksam Rechtsgeschäfte abzuschließen.', 'Unter 7 geschäftsunfähig, 7–17 beschränkt (Taschengeldparagraf § 110 BGB), ab 18 voll.', 'wr-9-rechtsgeschaefte'),
  g('Deckungsbeitrag', 'wr', 'Preis minus variable Kosten je Stück.', 'Zeigt, wie viel zur Deckung der Fixkosten übrig bleibt.', 'wr-11-unternehmen'),
  g('Haftungsbeschränkung', 'wr', 'Begrenzung der Haftung auf das Gesellschaftsvermögen.', 'Kennzeichen von GmbH, UG und AG.', 'wr-11-unternehmen'),
  g('Subsidiarität', 'pug', 'Prinzip: Entscheidungen auf der kleinstmöglichen Ebene.', 'Die EU wird nur tätig, wenn nationale Ebenen ein Ziel nicht besser erreichen.', 'pug-11-eu'),
  g('Verordnung (EU)', 'pug', 'EU-Rechtsakt, der unmittelbar in allen Staaten gilt.', 'Im Gegensatz zur Richtlinie, die national umgesetzt werden muss.', 'pug-11-eu'),
  g('Föderalismus', 'pug', 'Staatsaufbau mit eigenständigen Gliedstaaten.', 'In Deutschland über den Bundesrat institutionell verankert.', 'pug-10-grundgesetz'),
  g('Ewigkeitsklausel', 'pug', 'Art. 79 Abs. 3 GG – unveränderbare Verfassungskerne.', 'Menschenwürde, Bundesstaatlichkeit und Demokratieprinzip sind unabänderlich.', 'pug-10-grundgesetz'),

  /* --------------------------------- Ethik ------------------------------ */
  g('Kategorischer Imperativ', 'ethik', 'Kants oberstes Moralprinzip.', '„Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde."', 'eth-10-moralphilosophie'),
  g('Utilitarismus', 'ethik', 'Folgenethik: Richtig ist, was den größten Nutzen stiftet.', 'Begründet von Bentham und Mill; Kritik: Minderheiten können geopfert werden.', 'eth-10-moralphilosophie'),
  g('Maxime', 'ethik', 'Persönlicher Grundsatz des Handelns.', 'Wird beim kategorischen Imperativ auf Verallgemeinerbarkeit geprüft.', 'eth-10-moralphilosophie'),
  g('Naturalistischer Fehlschluss', 'ethik', 'Unzulässiger Schluss vom Sein auf das Sollen.', '„Es war schon immer so" begründet nicht, dass es so sein soll.'),
  g('Dilemma', 'ethik', 'Konflikt zwischen zwei gleichrangigen Pflichten.', 'Jede Entscheidung verletzt eine moralische Forderung.', 'eth-11-digitale-ethik'),
  g('Diskursethik', 'ethik', 'Normen gelten, wenn alle Betroffenen zustimmen könnten.', 'Von Habermas und Apel entwickelt.'),

  /* ------------------------------- Methoden ----------------------------- */
  g('Spaced Repetition', 'lernen', 'Verteiltes Wiederholen in wachsenden Abständen.', 'Grundlage des Leitner-Karteikastens: 1, 2, 4, 8, 16, 32 Tage.', 'll-5-lerntechniken'),
  g('Retrieval Practice', 'lernen', 'Aktives Abrufen aus dem Gedächtnis.', 'Wirksamste Lernmethode – Selbstabfragen schlägt Wiederlesen deutlich.', 'll-5-lerntechniken'),
  g('Pomodoro-Technik', 'lernen', '25 Minuten Fokus, 5 Minuten Pause.', 'Nach vier Einheiten folgt eine längere Pause.', 'll-7-zeitmanagement'),
  g('Interleaving', 'lernen', 'Verschachteltes Üben verschiedener Aufgabentypen.', 'Fühlt sich schwerer an, verbessert aber die Unterscheidungsfähigkeit.', 'll-5-lerntechniken'),
  g('Feynman-Technik', 'lernen', 'Ein Thema so einfach erklären, dass es ein Kind versteht.', 'Deckt Verständnislücken sofort auf.', 'll-5-lerntechniken'),
  g('Eisenhower-Matrix', 'lernen', 'Ordnung von Aufgaben nach wichtig und dringend.', 'Langfristiger Erfolg entsteht im Feld „wichtig, nicht dringend".', 'll-7-zeitmanagement'),
  g('Plagiat', 'lernen', 'Übernahme fremder Texte ohne Kennzeichnung.', 'Auch paraphrasierte oder KI-generierte Inhalte müssen belegt werden.', 'll-10-recherche'),

  /* ------------------- Ergänzungen: Sprachen, Gesellschaft, Alltag ------- */
  g('Accord du participe', 'franzoesisch', 'Angleichung des Partizips an Genus und Numerus.', 'Bei être-Verben an das Subjekt, bei avoir nur an ein vorangestelltes direktes Objekt.'),
  g('Pronom relatif', 'franzoesisch', 'Relativpronomen qui, que, où, dont.', 'qui = Subjekt, que = direktes Objekt, où = Ort/Zeit, dont = mit de.'),
  g('Liaison', 'franzoesisch', 'Bindung eines stummen Endkonsonanten an den folgenden Vokal.', 'les amis wird „lezami" gesprochen.'),
  g('Present Perfect', 'englisch', 'Verbindung von Vergangenheit und Gegenwart.', 'Signalwörter: since, for, just, already, yet. Kein festes Zeitpunktsignal wie yesterday.'),
  g('Reported Speech', 'englisch', 'Indirekte Rede mit Zeitverschiebung.', 'Present → Past, Past → Past Perfect, will → would; Orts- und Zeitangaben anpassen.'),
  g('Ser und Estar', 'spanisch', 'Zwei Verben für „sein".', 'ser für dauerhafte Eigenschaften und Identität, estar für Zustand und Ort.'),
  g('Gerundio', 'spanisch', 'Verlaufsform mit estar + -ando/-iendo.', 'Estoy estudiando = Ich bin gerade am Lernen.'),
  g('Gewaltenteilung', 'pug', 'Aufteilung der Staatsgewalt in Legislative, Exekutive und Judikative.', 'Sichert gegenseitige Kontrolle und verhindert Machtmissbrauch (Montesquieu).'),
  g('Fünf-Prozent-Hürde', 'pug', 'Sperrklausel bei Wahlen.', 'Parteien unter 5 % der Zweitstimmen ziehen nicht in den Bundestag ein – das soll Zersplitterung verhindern.'),
  g('Demografischer Wandel', 'geographie', 'Veränderung von Altersaufbau und Größe der Bevölkerung.', 'In Deutschland: niedrige Geburtenrate, steigende Lebenserwartung, Zuwanderung.'),
  g('Tragfähigkeit', 'geographie', 'Zahl der Menschen, die ein Raum dauerhaft ernähren kann.', 'Hängt von Boden, Wasser, Klima und Technologie ab.'),
  g('Primärer Sektor', 'geographie', 'Wirtschaftsbereich der Rohstoffgewinnung.', 'Land- und Forstwirtschaft, Fischerei, Bergbau; sekundär = Industrie, tertiär = Dienstleistung.'),
  g('Restauration', 'geschichte', 'Wiederherstellung vorrevolutionärer Ordnung nach 1815.', 'Wiener Kongress, Metternich-System, Unterdrückung nationaler und liberaler Bewegungen.'),
  g('Deflation', 'wr', 'Anhaltender Rückgang des Preisniveaus.', 'Klingt gut, ist aber gefährlich: Konsum wird aufgeschoben, Schulden werden real teurer.'),
  g('Opportunitätskosten', 'wr', 'Nutzen der besten nicht gewählten Alternative.', 'Wer zwei Stunden jobbt, „bezahlt" dafür mit zwei Stunden Lernzeit.'),
  g('Bruttoinlandsprodukt', 'wr', 'Wert aller im Inland erzeugten Waren und Dienstleistungen eines Jahres.', 'Misst Wirtschaftsleistung, nicht Wohlstand oder Verteilung.', undefined, ['BIP']),
  g('Nährstoffdichte', 'nut', 'Verhältnis von Nährstoffgehalt zu Energiegehalt.', 'Gemüse hat eine hohe, Süßigkeiten eine niedrige Nährstoffdichte.'),
  g('Ballaststoffe', 'nut', 'Unverdauliche Pflanzenbestandteile.', 'Sättigen, regen die Verdauung an und halten den Blutzucker stabil; Richtwert 30 g pro Tag.'),
  g('Mindesthaltbarkeitsdatum', 'nut', 'Datum, bis zu dem der Hersteller Eigenschaften garantiert.', 'Kein Wegwerfdatum – anders als das Verbrauchsdatum bei leicht verderblichen Lebensmitteln.', undefined, ['MHD']),
  g('Lebensmittelkette', 'nut', 'Weg vom Erzeuger bis zum Teller.', 'Je kürzer die Kette, desto geringer meist Transportaufwand und Preisaufschlag.'),
  g('Hygieneregeln (HACCP)', 'nut', 'Systematische Gefahrenanalyse in der Küche.', 'Kühlkette einhalten, rohe und gegarte Lebensmittel trennen, gründlich erhitzen, Hände waschen.'),
  g('Zivilcourage', 'ethik', 'Mut, in der Öffentlichkeit für Werte einzustehen.', 'Regel: Hilfe holen, laut werden, nicht selbst zum Helden werden.'),
]

export const glossaryBySubject = (subjectId: string) => glossary.filter((e) => e.subjectId === subjectId)

export function searchGlossary(q: string) {
  const n = q.trim().toLowerCase()
  if (!n) return glossary
  return glossary.filter(
    (e) =>
      e.term.toLowerCase().includes(n) ||
      e.short.toLowerCase().includes(n) ||
      (e.long ?? '').toLowerCase().includes(n) ||
      (e.synonyms ?? []).some((s) => s.toLowerCase().includes(n)),
  )
}
