# Tests

Sicherheitsnetz für den Lern-Trainer. **Vor jeder Auslieferung ausführen:**

```bash
bash tests/run.sh
```

Der Runner führt der Reihe nach aus:
1. **Syntaxprüfung** aller JS-Dateien (`node --check`).
2. **Fragen-Validierung** (`validate-questions.mjs`) – IDs, Themen, correct-Indizes, Erklärungen, difficulty.
3. **Unit-Tests** (`unit-sync.mjs`) – reine Logik in `js/sync.js`: Merge, Code-Erzeugung/-Normalisierung, Header-Logik (sb_-Key vs. JWT), Retry, Offline/Pending.
3b. **Unit-Tests Backlog** (`unit-backlog.mjs`) – `tools/reports-to-backlog.mjs`: Parsen des App-Exports und verlustfreies Zusammenführen mit `docs/fragen-backlog.md`.
4. **E2E-Smoke** (`e2e-smoke.mjs`, Playwright, Service Worker *blockiert*) – App lädt fehlerfrei, Sanitisierung, **Reset leert wirklich** (Regression), Backup-Import mergt, Prüfungsablauf, SRS/Migration, Rechenaufgaben, Barrierefreiheit (Übung + Prüfung), Tagesziel/Onboarding, Zugangsschutz, Inhalts-Import (CSV/JSON), Fragen melden – ohne Laufzeitfehler.
5. **Service Worker / Offline** (`sw-cache.mjs`, Playwright mit *aktivem* SW) – Registrierung, App-Shell im Precache, Kontrolle, **Laden ohne Netz** aus dem Cache und der **Update-Knopf** end-to-end (eigener Test-Server liefert mitten im Lauf eine „neuere" `app.js` aus = Deploy im Kleinen).

Exit-Code 0 = alles grün.

## Zugangsschutz in den Tests

`seed-content.mjs` hinterlegt den Beispielkatalog aus `data/questions.js` als
„freigeschaltete" Inhalte (`page()` macht das automatisch). Den Schutz selbst testet
`page({ seeded: false, gated: true })` – das schaltet `contentGated` nur für diese Seite ein.

## Voraussetzungen
- Node 22, `python3` (statischer Server).
- Playwright/Chromium sind in dieser Umgebung unter `/opt/node22/lib/node_modules/playwright` vorinstalliert.

## Grundsätze
- **Jeder Bugfix bekommt einen Regressionstest.** Jedes neue Feature einen Test.
- Neue Unit-Tests in `unit-*.mjs`, neue Browser-Checks in `e2e-*.mjs`.
