/*
 * Fragen-Datenbank – Beispiel-Inhalte des Lern-Trainers
 * ---------------------------------------------------------------
 * Diese Fragen zeigen alle Fragetypen der App. Eigene Inhalte lassen sich in der
 * App importieren (Einstellungen → Lerninhalte) oder hier direkt eintragen.
 *
 * Struktur eines Eintrags:
 *   id          eindeutige ID (nicht ändern – wird für Fortschritt genutzt)
 *   topic       Themen-Schlüssel (siehe SAMPLE_TOPICS unten)
 *   difficulty  1 = leicht, 2 = mittel, 3 = schwer
 *   type        "single"  = genau eine richtige Antwort
 *               "multi"   = eine ODER mehrere richtige Antworten
 *               "numeric" = Rechenaufgabe mit freier Zahl-Eingabe
 *               "code"    = Eingabe-Aufgabe: Antwort wird als Text eingetippt
 *   question    Fragetext
 *   options     Array der Antwortmöglichkeiten            (single/multi)
 *   correct     Array der Indizes (0-basiert) der RICHTIGEN Antworten (single/multi)
 *   answer      erwartete Zahl                            (numeric)
 *   tolerance   erlaubte Abweichung ± (optional, Standard 0) (numeric)
 *   unit        Einheit zur Anzeige (optional)            (numeric)
 *   answer      erwartete Antwort als Text, z. B. "Paris"  (code)
 *   accept      weitere gültige Antworten (optional)       (code)
 *               Groß-/Kleinschreibung, Leerzeichen und Satzzeichen ignoriert die App ohnehin.
 *   placeholder Beispiel im leeren Feld (optional)         (code)
 *   explanation Erklärung – vermittelt den Lerninhalt (inkl. Rechenweg bei numeric)
 *
 * Neue Fragen einfach unten anhängen. Die App validiert das Format beim Start.
 */

const SAMPLE_TOPICS = {
  lernen:    { name: "Lerntechniken",   icon: "🧠", color: "#5b8def" },
  geografie: { name: "Geografie",       icon: "🌍", color: "#3fa796" },
  englisch:  { name: "Englisch-Vokabeln", icon: "🇬🇧", color: "#e8734a" },
  mathe:     { name: "Mathe & Rechnen", icon: "➗", color: "#7c5cbf" },
  wissen:    { name: "Allgemeinwissen", icon: "💡", color: "#d9a441" },
};

const SAMPLE_QUESTIONS = [
  // ===================== LERNTECHNIKEN =====================
  {
    id: "gr-001", topic: "lernen", difficulty: 1, type: "single",
    question: "Was bedeutet „Spaced Repetition“?",
    options: [
      "Wiederholen in wachsenden Zeitabständen",
      "Alles an einem Tag möglichst oft wiederholen",
      "Nur den schwersten Stoff lernen",
      "Lernen mit Musik im Hintergrund",
    ],
    correct: [0],
    explanation: "Spaced Repetition verteilt Wiederholungen auf wachsende Abstände – genau dann, wenn man den Stoff sonst zu vergessen droht. Diese App macht das automatisch (Leitner-System).",
  },
  {
    id: "gr-002", topic: "lernen", difficulty: 2, type: "multi",
    question: "Welche Methoden verbessern das Behalten nachweislich?",
    options: [
      "Aktives Abrufen (sich selbst abfragen)",
      "Verteiltes Lernen über mehrere Tage",
      "Text nur mehrfach durchlesen",
      "Stoff in eigenen Worten erklären",
    ],
    correct: [0, 1, 3],
    explanation: "Abrufen, Verteilen und Erklären wirken stark. Reines Wiederlesen fühlt sich gut an, bringt aber wenig – es erzeugt Wiedererkennen statt Wissen.",
  },
  {
    id: "gr-003", topic: "lernen", difficulty: 1, type: "single",
    question: "Wie lange dauert eine klassische Pomodoro-Lerneinheit?",
    options: ["10 Minuten", "25 Minuten", "45 Minuten", "90 Minuten"],
    correct: [1],
    explanation: "Die Pomodoro-Technik arbeitet mit 25 Minuten Fokus, dann 5 Minuten Pause. Nach vier Runden folgt eine längere Pause.",
  },
  {
    id: "gr-004", topic: "lernen", difficulty: 2, type: "single",
    question: "Wer beschrieb als Erster die „Vergessenskurve“?",
    options: ["Sigmund Freud", "Hermann Ebbinghaus", "Jean Piaget", "Iwan Pawlow"],
    correct: [1],
    explanation: "Hermann Ebbinghaus untersuchte 1885 im Selbstversuch, wie schnell Gelerntes vergessen wird – die Grundlage für Spaced Repetition.",
  },
  {
    id: "gr-005", topic: "lernen", difficulty: 1, type: "code",
    question: "Wie heißt die Lerntechnik mit 25-Minuten-Einheiten? (ein Wort)",
    answer: "Pomodoro", placeholder: "Antwort eintippen",
    explanation: "Pomodoro (italienisch „Tomate“) – benannt nach der Küchenuhr in Tomatenform, mit der Francesco Cirillo die Methode erfand.",
  },

  // ===================== GEOGRAFIE =====================
  {
    id: "geo-001", topic: "geografie", difficulty: 1, type: "single",
    question: "Was ist die Hauptstadt von Australien?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: [2],
    explanation: "Canberra wurde als Kompromiss zwischen den Rivalen Sydney und Melbourne zur Hauptstadt geplant.",
  },
  {
    id: "geo-002", topic: "geografie", difficulty: 2, type: "multi",
    question: "Welche Länder grenzen an Deutschland?",
    options: ["Österreich", "Ungarn", "Dänemark", "Luxemburg", "Italien"],
    correct: [0, 2, 3],
    explanation: "Deutschland hat neun Nachbarländer: Dänemark, Polen, Tschechien, Österreich, Schweiz, Frankreich, Luxemburg, Belgien und die Niederlande.",
  },
  {
    id: "geo-003", topic: "geografie", difficulty: 1, type: "code",
    question: "Wie heißt der längste Fluss Deutschlands?",
    answer: "Rhein", placeholder: "Antwort eintippen",
    explanation: "Der Rhein ist mit rund 865 km auf deutschem Gebiet der längste Fluss Deutschlands (Gesamtlänge ca. 1.230 km).",
  },
  {
    id: "geo-004", topic: "geografie", difficulty: 2, type: "single",
    question: "Welcher ist der höchste Berg Europas (außerhalb des Kaukasus)?",
    options: ["Matterhorn", "Mont Blanc", "Zugspitze", "Großglockner"],
    correct: [1],
    explanation: "Der Mont Blanc ist mit ca. 4.806 m der höchste Berg der Alpen und Westeuropas.",
  },
  {
    id: "geo-005", topic: "geografie", difficulty: 1, type: "code",
    question: "Hauptstadt von Spanien?",
    answer: "Madrid", placeholder: "Antwort eintippen",
    explanation: "Madrid liegt im Zentrum der Iberischen Halbinsel und ist seit 1561 Hauptstadt.",
  },

  // ===================== ENGLISCH =====================
  {
    id: "en-001", topic: "englisch", difficulty: 1, type: "code",
    question: "Englisch für „der Schmetterling“?",
    answer: "butterfly", placeholder: "englisches Wort",
    explanation: "butterfly = Schmetterling.",
  },
  {
    id: "en-002", topic: "englisch", difficulty: 1, type: "single",
    question: "Was bedeutet „reliable“?",
    options: ["zuverlässig", "erleichtert", "verwandt", "wiederholbar"],
    correct: [0],
    explanation: "reliable = zuverlässig (von „to rely on“ = sich verlassen auf).",
  },
  {
    id: "en-003", topic: "englisch", difficulty: 2, type: "single",
    question: "Was bedeutet „to become“?",
    options: ["bekommen", "werden", "bequem sein", "begleiten"],
    correct: [1],
    explanation: "Klassischer „falscher Freund“: to become = werden. „Bekommen“ heißt auf Englisch to get oder to receive.",
  },
  {
    id: "en-004", topic: "englisch", difficulty: 2, type: "code",
    question: "Englisch für „die Erfahrung“?",
    answer: "experience", placeholder: "englisches Wort",
    explanation: "experience = Erfahrung, Erlebnis. Achtung: „experiment“ ist das Experiment.",
  },
  {
    id: "en-005", topic: "englisch", difficulty: 1, type: "multi",
    question: "Welche Wörter bedeuten „groß“?",
    options: ["big", "tall", "small", "large"],
    correct: [0, 1, 3],
    explanation: "big und large = groß (Umfang), tall = groß gewachsen (Höhe). small = klein.",
  },

  // ===================== MATHE =====================
  {
    id: "ma-001", topic: "mathe", difficulty: 1, type: "numeric",
    question: "Wie viel ist 15 % von 80?",
    answer: 12,
    explanation: "80 × 0,15 = 12. Trick: 10 % = 8, 5 % = 4 → zusammen 12.",
  },
  {
    id: "ma-002", topic: "mathe", difficulty: 2, type: "numeric",
    question: "Ein Kreis hat den Radius 3 cm. Wie groß ist seine Fläche (auf eine Nachkommastelle)?",
    answer: 28.3, tolerance: 0.1, unit: "cm²",
    explanation: "A = π × r² = 3,14159 × 9 ≈ 28,3 cm².",
  },
  {
    id: "ma-003", topic: "mathe", difficulty: 1, type: "single",
    question: "Was ist 7 × 8?",
    options: ["54", "56", "58", "64"],
    correct: [1],
    explanation: "7 × 8 = 56. Eselsbrücke: 5, 6, 7, 8 → 56 = 7 × 8.",
  },
  {
    id: "ma-004", topic: "mathe", difficulty: 2, type: "multi",
    question: "Welche Zahlen sind Primzahlen?",
    options: ["2", "9", "17", "21", "23"],
    correct: [0, 2, 4],
    explanation: "Primzahlen sind nur durch 1 und sich selbst teilbar: 2, 17, 23. 9 = 3 × 3, 21 = 3 × 7.",
  },

  // ===================== ALLGEMEINWISSEN =====================
  {
    id: "aw-001", topic: "wissen", difficulty: 1, type: "single",
    question: "Welches chemische Symbol hat Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: [2],
    explanation: "Au kommt vom lateinischen „aurum“. Ag (argentum) ist Silber.",
  },
  {
    id: "aw-002", topic: "wissen", difficulty: 1, type: "numeric",
    question: "In welchem Jahr fiel die Berliner Mauer?",
    answer: 1989,
    explanation: "Die Mauer fiel am 9. November 1989; die Wiedervereinigung folgte am 3. Oktober 1990.",
  },
  {
    id: "aw-003", topic: "wissen", difficulty: 2, type: "multi",
    question: "Welche Planeten sind Gasriesen?",
    options: ["Jupiter", "Mars", "Saturn", "Venus"],
    correct: [0, 2],
    explanation: "Jupiter und Saturn sind Gasriesen (Uranus und Neptun gelten als Eisriesen). Mars und Venus sind Gesteinsplaneten.",
  },
  {
    id: "aw-004", topic: "wissen", difficulty: 1, type: "code",
    question: "Wer malte die „Mona Lisa“? (Nachname reicht: da …)",
    answer: "da Vinci", accept: ["Leonardo da Vinci", "Leonardo"], placeholder: "Antwort eintippen",
    explanation: "Leonardo da Vinci malte die Mona Lisa Anfang des 16. Jahrhunderts; sie hängt im Louvre in Paris.",
  },
];

// Aktive Inhalte auflösen: FREIGESCHALTETE (lokal gecachte) Inhalte haben Vorrang,
// sonst die öffentlichen Beispiel-Inhalte. So enthält die öffentliche App-Hülle keine
// geschützten Fragen – die kommen erst nach Zugangscode aus Supabase und liegen dann
// nur lokal im Cache dieses Geräts.
if (typeof window !== "undefined") {
  window.SAMPLE_CONTENT = { TOPICS: SAMPLE_TOPICS, QUESTIONS: SAMPLE_QUESTIONS };
  var __active = window.SAMPLE_CONTENT;
  try {
    var __ls = window.localStorage;
    var __raw = __ls && __ls.getItem("lern_content_v1");
    if (__raw) {
      var __g = JSON.parse(__raw);
      if (__g && __g.TOPICS && Array.isArray(__g.QUESTIONS) && __g.QUESTIONS.length) __active = __g;
    }
  } catch (e) {}
  window.TOPICS = __active.TOPICS;
  window.QUESTIONS = __active.QUESTIONS;
  window.CONTENT_VERSION = __active.VERSION || "";
}
