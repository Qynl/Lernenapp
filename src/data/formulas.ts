import type { FormulaEntry, Grade } from '../types'

const f = (
  id: string,
  subjectId: string,
  area: string,
  name: string,
  tex: string,
  grades: Grade[],
  note?: string,
): FormulaEntry => ({ id, subjectId, area, name, tex, grades, note })

export const formulas: FormulaEntry[] = [
  /* ------------------------------ Mathematik ----------------------------- */
  f('fm1', 'mathe', 'Geometrie – Fläche', 'Rechteck', 'A = a · b', [5, 6, 7]),
  f('fm2', 'mathe', 'Geometrie – Fläche', 'Dreieck', 'A = ½ · g · h', [5, 6, 7]),
  f('fm3', 'mathe', 'Geometrie – Fläche', 'Trapez', 'A = ½ · (a + c) · h', [7, 8]),
  f('fm4', 'mathe', 'Geometrie – Fläche', 'Parallelogramm', 'A = g · h', [7, 8]),
  f('fm5', 'mathe', 'Geometrie – Kreis', 'Kreisfläche & Umfang', 'A = π r²    U = 2π r', [8, 9, 10]),
  f('fm6', 'mathe', 'Geometrie – Kreis', 'Kreissektor', 'A = (α/360°) · π r²    b = (α/360°) · 2π r', [9, 10]),
  f('fm7', 'mathe', 'Geometrie – Körper', 'Quader & Würfel', 'V = a·b·c    O = 2(ab+ac+bc)', [5, 6, 9]),
  f('fm8', 'mathe', 'Geometrie – Körper', 'Zylinder', 'V = π r² h    O = 2π r² + 2π r h', [9, 10]),
  f('fm9', 'mathe', 'Geometrie – Körper', 'Pyramide & Kegel', 'V = ⅓ · G · h    V = ⅓ π r² h', [10], 'Mantellinie Kegel: s = √(r² + h²)'),
  f('fm10', 'mathe', 'Geometrie – Körper', 'Kugel', 'V = 4/3 π r³    O = 4π r²', [10]),
  f('fm11', 'mathe', 'Algebra', 'Binomische Formeln', '(a+b)² = a² + 2ab + b²\n(a−b)² = a² − 2ab + b²\n(a+b)(a−b) = a² − b²', [8, 9], 'Die drei Klassiker – auch rückwärts anwenden!'),
  f('fm12', 'mathe', 'Algebra', 'Mitternachtsformel', 'x₁,₂ = (−b ± √(b² − 4ac)) / (2a)', [9, 10, 11, 12]),
  f('fm13', 'mathe', 'Algebra', 'Satz von Vieta', 'x₁ + x₂ = −p ,  x₁ · x₂ = q', [9, 10], 'bei x² + px + q = 0'),
  f('fm14', 'mathe', 'Geometrie – Dreieck', 'Satz des Pythagoras', 'a² + b² = c²', [9, 10, 11, 12]),
  f('fm15', 'mathe', 'Geometrie – Dreieck', 'Höhen- und Kathetensatz', 'h² = p · q    a² = c · p', [9]),
  f('fm16', 'mathe', 'Trigonometrie', 'sin, cos, tan', 'sin α = GK/HYP   cos α = AK/HYP   tan α = GK/AK', [10, 11, 12]),
  f('fm17', 'mathe', 'Trigonometrie', 'Sinussatz', 'a / sin α = b / sin β = c / sin γ', [10, 11, 12]),
  f('fm18', 'mathe', 'Trigonometrie', 'Kosinussatz', 'c² = a² + b² − 2ab · cos γ', [10, 11, 12]),
  f('fm19', 'mathe', 'Trigonometrie', 'Trigonometrischer Pythagoras', 'sin²α + cos²α = 1', [10, 11, 12]),
  f('fm20', 'mathe', 'Funktionen', 'Lineare Funktion', 'y = m x + t     m = Δy/Δx', [8, 9, 10]),
  f('fm21', 'mathe', 'Funktionen', 'Scheitelform', 'f(x) = a(x − d)² + e   →  S(d|e)', [9, 10]),
  f('fm22', 'mathe', 'Funktionen', 'Exponentielles Wachstum', 'f(x) = a · bˣ', [10, 11, 12]),
  f('fm23', 'mathe', 'Funktionen', 'Logarithmusgesetze', 'log(uv) = log u + log v\nlog(u/v) = log u − log v\nlog(uⁿ) = n log u', [10, 11, 12]),
  f('fm24', 'mathe', 'Analysis', 'Ableitungsregeln', "(xⁿ)′ = n xⁿ⁻¹\n(u·v)′ = u′v + uv′\n(u/v)′ = (u′v − uv′)/v²\n(f(g(x)))′ = f′(g(x))·g′(x)", [11, 12]),
  f('fm25', 'mathe', 'Analysis', 'Spezielle Ableitungen', "(eˣ)′ = eˣ   (ln x)′ = 1/x   (sin x)′ = cos x   (cos x)′ = −sin x", [11, 12]),
  f('fm26', 'mathe', 'Analysis', 'Tangentengleichung', "y = f′(x₀)·(x − x₀) + f(x₀)", [11, 12]),
  f('fm27', 'mathe', 'Analysis', 'Hauptsatz', '∫ₐᵇ f(x) dx = F(b) − F(a)', [12]),
  f('fm28', 'mathe', 'Analysis', 'Fläche zwischen Kurven', 'A = ∫ₐᵇ (f(x) − g(x)) dx', [12]),
  f('fm29', 'mathe', 'Analysis', 'Rotationsvolumen', 'V = π ∫ₐᵇ (f(x))² dx', [12]),
  f('fm30', 'mathe', 'Geometrie – Vektoren', 'Betrag & Skalarprodukt', '|a| = √(a₁²+a₂²+a₃²)\na·b = a₁b₁ + a₂b₂ + a₃b₃', [11, 12]),
  f('fm31', 'mathe', 'Geometrie – Vektoren', 'Winkel & Abstand', 'cos φ = (a·b)/(|a||b|)\nd(P,E) = |n·(P−A)| / |n|', [11, 12]),
  f('fm32', 'mathe', 'Stochastik', 'Laplace & Pfadregeln', 'P(E) = günstig / möglich\nUND → multiplizieren, ODER → addieren', [8, 9, 10]),
  f('fm33', 'mathe', 'Stochastik', 'Bedingte Wahrscheinlichkeit', 'P_A(B) = P(A∩B) / P(A)', [10, 11, 12]),
  f('fm34', 'mathe', 'Stochastik', 'Binomialverteilung', 'P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ', [12]),
  f('fm35', 'mathe', 'Stochastik', 'Erwartungswert & σ', 'μ = n·p     σ = √(n·p·(1−p))', [12]),
  f('fm36', 'mathe', 'Prozent & Zins', 'Grundformeln', 'W = G · p     K_n = K₀ · (1 + p)ⁿ', [6, 7, 8, 9]),

  /* --------------------------------- Physik ------------------------------ */
  f('fp1', 'physik', 'Kinematik', 'Gleichförmige Bewegung', 'v = s / t', [7, 8, 9, 10, 11]),
  f('fp2', 'physik', 'Kinematik', 'Beschleunigte Bewegung', 'v = a·t     s = ½ a t²', [9, 10, 11]),
  f('fp3', 'physik', 'Dynamik', 'Newtons 2. Axiom', 'F = m · a', [8, 9, 10, 11, 12]),
  f('fp4', 'physik', 'Dynamik', 'Gewichtskraft', 'F_G = m · g   (g ≈ 9,81 N/kg)', [8, 9, 10]),
  f('fp5', 'physik', 'Dynamik', 'Hooke’sches Gesetz', 'F = D · s', [8, 9]),
  f('fp6', 'physik', 'Energie', 'Arbeit, Leistung, Wirkungsgrad', 'W = F·s     P = W/t     η = E_nutz/E_zu', [8, 9, 10]),
  f('fp7', 'physik', 'Energie', 'Energieformen', 'E_pot = m·g·h     E_kin = ½ m v²     E_spann = ½ D s²', [8, 9, 10, 11]),
  f('fp8', 'physik', 'Mechanik', 'Druck & Auftrieb', 'p = F / A     p = ρ·g·h     F_A = ρ_Fl · g · V', [8, 9]),
  f('fp9', 'physik', 'Wärmelehre', 'Wärmemenge', 'Q = c · m · ΔT', [9, 10]),
  f('fp10', 'physik', 'Elektrizität', 'Ohmsches Gesetz & Leistung', 'U = R · I     P = U · I     E = P · t', [9, 10, 11]),
  f('fp11', 'physik', 'Elektrizität', 'Widerstände', 'Reihe: R = R₁ + R₂\nParallel: 1/R = 1/R₁ + 1/R₂', [9, 10]),
  f('fp12', 'physik', 'Felder', 'Elektrisches Feld', 'E = F/q = U/d     W = q·U     C = Q/U', [11, 12]),
  f('fp13', 'physik', 'Felder', 'Lorentzkraft', 'F = q·v·B·sin α     F = B·I·l', [11, 12]),
  f('fp14', 'physik', 'Felder', 'Induktion', 'U_ind = −N · ΔΦ/Δt     Φ = B · A', [11, 12]),
  f('fp15', 'physik', 'Schwingungen', 'Federpendel & Fadenpendel', 'T = 2π √(m/D)     T = 2π √(l/g)', [11, 12]),
  f('fp16', 'physik', 'Wellen', 'Wellengleichung', 'c = λ · f', [10, 11, 12]),
  f('fp17', 'physik', 'Quantenphysik', 'Photonenenergie', 'E = h·f = h·c/λ', [12]),
  f('fp18', 'physik', 'Quantenphysik', 'Photoeffekt', 'E_kin,max = h·f − W_A', [12]),
  f('fp19', 'physik', 'Quantenphysik', 'de Broglie & Unschärfe', 'λ = h/(m·v)     Δx·Δp ≥ h/(4π)', [12]),
  f('fp20', 'physik', 'Kernphysik', 'Zerfallsgesetz', 'N(t) = N₀ · (½)^(t/T½)', [12]),
  f('fp21', 'physik', 'Relativität', 'Masse-Energie-Äquivalenz', 'E = m c²', [12]),

  /* --------------------------------- Chemie ------------------------------ */
  f('fc1', 'chemie', 'Stoffmenge', 'Mol-Formeln', 'n = m/M     n = N/N_A     V = n · V_m', [10, 11, 12], 'N_A = 6,022·10²³ /mol, V_m = 22,4 l/mol'),
  f('fc2', 'chemie', 'Lösungen', 'Konzentration', 'c = n / V     w = m_gelöst / m_gesamt', [10, 11]),
  f('fc3', 'chemie', 'Säure-Base', 'pH-Wert', 'pH = −log c(H₃O⁺)     pH + pOH = 14', [11, 12]),
  f('fc4', 'chemie', 'Säure-Base', 'Titration', 'c₁ · V₁ = c₂ · V₂', [11, 12], 'nur bei 1:1-Reaktionen'),
  f('fc5', 'chemie', 'Energetik', 'Reaktionsenthalpie', 'ΔH = ΣH(Produkte) − ΣH(Edukte)', [11, 12]),
  f('fc6', 'chemie', 'Energetik', 'Gibbs-Energie', 'ΔG = ΔH − T·ΔS', [12], 'ΔG < 0 → freiwillig'),
  f('fc7', 'chemie', 'Gleichgewicht', 'Massenwirkungsgesetz', 'K = ([C]^c · [D]^d) / ([A]^a · [B]^b)', [11, 12]),
  f('fc8', 'chemie', 'Elektrochemie', 'Nernst-Gleichung', 'E = E° + (0,059/z) · log(c_ox/c_red)', [12]),

  /* -------------------------------- Biologie ----------------------------- */
  f('fb1', 'biologie', 'Stoffwechsel', 'Fotosynthese', '6 CO₂ + 6 H₂O + Licht → C₆H₁₂O₆ + 6 O₂', [5, 8, 11]),
  f('fb2', 'biologie', 'Stoffwechsel', 'Zellatmung', 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + Energie (ca. 32 ATP)', [8, 11, 12]),
  f('fb3', 'biologie', 'Genetik', 'Mendelsche Spaltung', 'F2 dominant-rezessiv: 3 : 1  |  Genotyp 1 : 2 : 1', [9, 10]),
  f('fb4', 'biologie', 'Genetik', 'Dihybrider Erbgang', 'F2: 9 : 3 : 3 : 1', [9, 10]),
  f('fb5', 'biologie', 'Ökologie', 'Energiefluss', 'ca. 10 % Weitergabe je Trophiestufe', [11, 12]),
  f('fb6', 'biologie', 'Neurobiologie', 'Ruhepotential', '≈ −70 mV', [10, 11, 12]),

  /* ------------------------------ Geographie ----------------------------- */
  f('fg1', 'geographie', 'Bevölkerung', 'Natürliche Wachstumsrate', '(Geburtenrate − Sterberate) / 10  in %', [10, 11]),
  f('fg2', 'geographie', 'Karten', 'Maßstab', 'Kartenstrecke · Maßstabszahl = Wirklichkeit', [5, 7]),
  f('fg3', 'geographie', 'Klima', 'Temperaturamplitude', 'T_max − T_min (wärmster minus kältester Monat)', [5, 7, 10, 11]),

  /* --------------------------- Wirtschaft & Recht ------------------------ */
  f('fw1', 'wr', 'Rechnungswesen', 'Gewinn & Rentabilität', 'Gewinn = Erlös − Kosten     Rentabilität = Gewinn/Kapital · 100 %', [10, 11, 12]),
  f('fw2', 'wr', 'Kosten', 'Break-even-Point', 'x = K_fix / (p − k_var)', [11, 12]),
  f('fw3', 'wr', 'Volkswirtschaft', 'BIP & Inflationsrate', 'BIP = C + I + G + (X − M)\nInflation = (P₁ − P₀)/P₀ · 100 %', [11, 12]),
]

export const formulaAreas = [...new Set(formulas.map((x) => x.area))]
