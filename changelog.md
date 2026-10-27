# Changelog

Alle nennenswerten Änderungen am Lern-Trainer. Format angelehnt an
[Keep a Changelog](https://keepachangelog.com/de/1.1.0/); Versionierung nach
[SemVer](https://semver.org/lang/de/). Ältere Versionen: siehe Git-Historie.

## [1.0.0] — 2026-10-27  ·  Lern-App für beliebige Inhalte

### Neu
- **Eigene Inhalte importieren** (Einstellungen → Lerninhalte): CSV/Text im Format
  `Thema;Frage;Antwort[;Erklärung;Falsch 1;…]` oder JSON im App-Format. Ohne falsche
  Antworten entstehen Auswahl-Fragen aus den Antworten desselben Themas. Stabile IDs:
  ein erneuter Import behält den Lernfortschritt.
- **Vorlage herunterladen** und **Beispiel-Inhalte wiederherstellen**.
- Neue, themenneutrale Beispiel-Fragen (Lerntechniken, Geografie, Englisch, Mathe,
  Allgemeinwissen) mit allen Fragetypen.

### Geändert
- App heißt jetzt **Lern-Trainer**; alle fachspezifischen Bezüge entfernt.
- Eingabe-Aufgaben („Antwort eintippen") vergleichen Buchstaben inkl. Umlauten und
  Ziffern; Groß-/Kleinschreibung, Leerzeichen und Satzzeichen sind egal.
- Prüfungssimulation zieht reihum aus allen Themen; Prognose ohne feste Block-Gewichtung.
- Zugangsschutz standardmäßig aus (`contentGated: false`), Issue-Zielrepo leer.
- Speicher-Schlüssel neu (`lern_*`): Lernstände aus der Vorgänger-App werden nicht übernommen.
