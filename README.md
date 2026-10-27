# Lern-Trainer – Auswendig lernen, beliebige Inhalte

Eine kleine, robuste **Lern-App fürs Handy**, mit der du **beliebige Inhalte** auswendig
lernst: Vokabeln, Fachbegriffe, Formeln, Prüfungsstoff. Sie läuft als **PWA**
(Progressive Web App) direkt im Browser, lässt sich zum Home-Bildschirm hinzufügen und
funktioniert danach **komplett offline** – ganz ohne App Store.

## Schnellstart (2 Minuten)

1. App öffnen → mit den **Beispiel-Fragen** loslegen.
2. Eigene Inhalte: **Einstellungen → Lerninhalte → Vorlage herunterladen**.
3. Vorlage in Excel/Numbers/Texteditor ausfüllen, als CSV speichern.
4. **Einstellungen → Lerninhalte → Eigene Inhalte importieren** → Datei wählen.

## Was die App kann

- **Eigene Inhalte importieren** – CSV/Text oder JSON, direkt in der App, ohne Programmieren
- **Gemischtes Training** – zufällige Fragen aus allen Themen
- **Nach Thema lernen** – gezielt einzelne Themen üben, mit Fortschrittsbalken je Thema
- **Spaced Repetition** (Leitner) – jede Frage kommt zurück, kurz bevor du sie vergisst
- **Schwachstellen wiederholen** – die noch nicht sicher beherrschten Fragen
- **Antworten eintippen** – aktiver Abruf statt Wiedererkennen (Groß-/Kleinschreibung egal)
- **Prüfungssimulation** – bis zu 30 Fragen aus allen Themen, Timer, bestanden ab 50 %
- **Erklärung zu jeder Frage** – der Lerninhalt wird vermittelt, nicht nur abgefragt
- **Gamification** – XP, Level, Tagesziel, Tages-Serie und Erfolge
- **Lern-Timer** (Pomodoro), **Dark Mode**, große Schrift, Tastaturbedienung am Laptop
- **Fragen melden** – unklare Fragen markieren, sammeln, exportieren
- **Fortschritt bleibt gespeichert** – lokal auf dem Gerät; optional Geräte-Sync

## Eigene Inhalte: Format

**Einfach (CSV/Text)** – eine Karte pro Zeile, Trenner `;` (oder Tab bzw. `,`):

```
Thema;Frage;Antwort;Erklärung;Falsch 1;Falsch 2;Falsch 3
Englisch;der Hund;dog
Englisch;die Katze;cat
Hauptstädte;Hauptstadt von Frankreich?;Paris;Paris liegt an der Seine.;Lyon;Marseille;Nizza
```

- Pflicht sind nur **Thema, Frage, Antwort**. Zwei Spalten (`Frage;Antwort`) gehen auch → Thema „Allgemein".
- **Ohne falsche Antworten** baut die App Auswahl-Fragen aus den Antworten anderer Karten
  desselben Themas. Gibt es keine, wird die Karte zur Eingabe-Aufgabe („Antwort eintippen").
- Kopfzeile und Zeilen mit `#` am Anfang werden ignoriert. Felder mit `;` in Anführungszeichen setzen.
- **Erneuter Import** derselben Fragen behält den Lernfortschritt (IDs entstehen aus Thema + Frage).
- **Zurück zu den Beispielen:** Einstellungen → Lerninhalte → „Beispiel-Inhalte wiederherstellen".

**Profi (JSON)** – alle Fragetypen (Einfach-/Mehrfachauswahl, Zahl, Text-Eingabe):

```json
{
  "TOPICS": { "bio": { "name": "Biologie", "icon": "🧬", "color": "#3fa796" } },
  "QUESTIONS": [
    { "id": "bio-1", "topic": "bio", "difficulty": 1, "type": "multi",
      "question": "Welche sind Säugetiere?", "options": ["Wal", "Hai", "Fledermaus"],
      "correct": [0, 2], "explanation": "Wale und Fledermäuse säugen ihre Jungen." }
  ]
}
```

Das vollständige Format (inkl. `numeric` und `code`) steht im Kopf von
[`data/questions.js`](data/questions.js). Wer die App für alle mit festen Inhalten ausliefern
will, ersetzt dort einfach die Beispiel-Fragen.

## Installieren (iPhone/Android)

1. Die App-URL im Browser öffnen (iPhone: **Safari**).
2. **Teilen** → **„Zum Home-Bildschirm"** (Android: Menü → „App installieren").
3. Fertig – die App startet im Vollbild und läuft offline.

## Hosting (z. B. kostenlos über GitHub Pages)

Der komplette App-Code liegt im **Repository-Root** (`index.html` usw.). Zum
Bereitstellen genügt ein beliebiger statischer Webserver (HTTPS erforderlich,
damit der Offline-Modus/Service Worker funktioniert). Mit **GitHub Pages**:
Repository-Einstellungen → *Pages* → *Deploy from a branch* → Branch und Ordner
`/(root)` wählen → *Save*.

Lokal testen:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```

## Geräteübergreifende Synchronisation (Cloud-Sync)

Standardmäßig speichert die App den Fortschritt **lokal** auf dem Gerät. Damit
der Fortschritt **auf allen Geräten gleich** ist (und weiterlernen auf iPhone,
iPad, Laptop … möglich wird), kann optional ein kostenloses **Supabase**-Projekt
angebunden werden. GitHub Pages bleibt der Host; Supabase speichert nur den
Fortschritt. Identifiziert wird über einen geheimen **Sync-Code** – kein
Passwort/Login nötig.

**Einmalige Einrichtung (einmal für das Projekt):**

1. Kostenloses Konto auf [supabase.com](https://supabase.com) anlegen und ein
   **neues Projekt** erstellen (Region z. B. Europe, „Enable Data API" an).
   Das Datenbank-Passwort wird für die App **nicht** benötigt.
2. Im Projekt links **SQL Editor** öffnen, folgendes Snippet einfügen und **Run**:

   ```sql
   -- Tabelle für den Lernfortschritt (ein Datensatz je Sync-Code)
   create table if not exists public.progress (
     code       text primary key,
     data       jsonb not null,
     updated_at timestamptz not null default now()
   );

   -- Direktzugriff sperren (RLS an, keine Policies) …
   alter table public.progress enable row level security;

   -- … Zugriff nur über zwei Funktionen, die den Sync-Code kennen müssen:
   create or replace function public.sync_pull(p_code text)
   returns jsonb language sql security definer set search_path = public as $$
     select data from public.progress where code = p_code;
   $$;

   create or replace function public.sync_push(p_code text, p_data jsonb)
   returns void language plpgsql security definer set search_path = public as $$
   begin
     insert into public.progress(code, data, updated_at)
     values (p_code, p_data, now())
     on conflict (code) do update set data = excluded.data, updated_at = now();
   end;
   $$;

   grant execute on function public.sync_pull(text)        to anon;
   grant execute on function public.sync_push(text, jsonb)  to anon;
   ```

3. **Project-URL** und **anon public key** kopieren: Projekt → *Settings* →
   *API* (bzw. *Data API*). Beide Werte dürfen öffentlich sein – die Daten
   schützt der geheime Sync-Code + die Funktionen oben.
4. In **[`config.js`](config.js)** eintragen und committen/pushen:

   ```js
   window.APP_CONFIG = {
     supabaseUrl: "https://DEINPROJEKT.supabase.co",
     supabaseAnonKey: "eyJhbGciOi… (langer anon-Key)",
   };
   ```

**Nutzung (in der App, unter „Geräte-Sync"):**

- **Gerät 1:** „Neuen Sync-Code erstellen" → der Code wird angezeigt (aufschreiben/kopieren).
- **Gerät 2:** „Mit vorhandenem Code verbinden" → Code eingeben. Der Fortschritt
  wird zusammengeführt und ab dann automatisch abgeglichen (beim Öffnen, bei
  Änderungen und sobald wieder online).

> **Robustheit:** Die App bleibt voll **offline-fähig** – lokal wird immer
> gespeichert, der Cloud-Abgleich passiert im Hintergrund und stört nie den
> Lernfluss. Zusammengeführt wird verlustarm (Fortschrittswerte wachsen nur,
> gehen nie verloren).

### Härtung der Funktionen (empfohlen ausführen)

Damit die offenen `anon`-Funktionen nicht missbraucht werden können (Code-Länge prüfen,
Datensatzgröße begrenzen), einmal **[`supabase/sync-hardening.sql`](supabase/sync-hardening.sql)**
im **SQL Editor** ausführen. Ersetzt `sync_pull`, `sync_push` und `push_save` per
`create or replace` – gefahrlos wiederholbar. Empfohlen für den laufenden Betrieb.

## Lern-Erinnerungen (Web Push, optional)

Tägliche Push-Erinnerung ans Üben. Auf dem **iPhone** funktioniert Web Push nur,
wenn die App **zum Home-Bildschirm hinzugefügt** ist (iOS 16.4+) und man
Benachrichtigungen erlaubt. Der Versand läuft über eine **Supabase Edge Function**,
die stündlich per Zeitplan prüft, wer zur eingestellten Uhrzeit dran ist.

**Bausteine:** VAPID-Schlüssel · Tabelle + Funktionen · Edge Function · Zeitplan.

1. **VAPID-Schlüssel** (Signatur für Web Push). Einmal erzeugen, z. B.:
   ```bash
   npx web-push generate-vapid-keys
   ```
   Den **öffentlichen** Schlüssel in [`config.js`](config.js) bei `vapidPublicKey`
   eintragen (darf öffentlich sein). Den **privaten** gut aufbewahren – der kommt
   nur als Secret in die Edge Function, **nie** ins Repo.

2. **Datenbank**: [`supabase/reminders-setup.sql`](supabase/reminders-setup.sql)
   im **SQL Editor** ausführen (Tabelle `push_subscriptions` + Funktionen
   `push_save` / `push_remove`).

3. **Edge Function** deployen – Code liegt in
   [`supabase/functions/send-reminders/index.ts`](supabase/functions/send-reminders/index.ts):
   ```bash
   supabase functions deploy send-reminders --no-verify-jwt
   ```
   (oder im Dashboard unter *Edge Functions* neu anlegen und den Code einfügen).
   Dann **Secrets** setzen (Dashboard → Edge Functions → *Manage secrets*):
   - `VAPID_PUBLIC` = öffentlicher Schlüssel
   - `VAPID_PRIVATE` = privater Schlüssel
   - `CRON_SECRET` = frei gewähltes Geheimnis
   - `VAPID_SUBJECT` = optional, z. B. `mailto:du@example.com`

4. **Zeitplan**: Extensions **pg_cron** und **pg_net** aktivieren
   (Database → Extensions), dann den `cron.schedule`-Block am Ende der
   `reminders-setup.sql` (URL + `CRON_SECRET` anpassen) ausführen.

**Testen:** In der App → *Sync & Sicherung* → *Lern-Erinnerungen* → Uhrzeit wählen
→ *Erinnerung aktivieren* (Benachrichtigung erlauben). Der Button **„Test senden"**
zeigt sofort eine lokale Beispiel-Benachrichtigung. Den echten Serverversand kannst
du prüfen, indem du die Edge Function einmal manuell mit dem `x-cron-secret`-Header
aufrufst.

> Solange `vapidPublicKey` in `config.js` leer ist oder die Server-Teile fehlen,
> zeigt die App im Erinnerungs-Bereich einen Hinweis – der Rest funktioniert normal.

## Zugangsgeschützte Inhalte (optional)

Wer Inhalte nicht öffentlich ins Repo legen will, kann sie in Supabase ablegen und nur
gegen einen **Zugangscode** ausgeben: [`supabase/content-gate.sql`](supabase/content-gate.sql)
ausführen, Inhalte (`{ TOPICS, QUESTIONS }`) einspielen, in [`config.js`](config.js)
`contentGated: true` setzen. Die App verlangt dann beim ersten Start den Code.
Prüfen lässt sich eine Inhalts-Datei vorab mit `node tools/validate-content.mjs <datei.json>`.

## Fragen-Feedback: von der Meldung zur korrigierten Frage

Beim Üben fällt am ehesten auf, wenn eine Frage falsch, unklar oder fehlerhaft ist.
Dafür sitzt unter **jeder** Frage (Übung und Prüfungs-Auswertung) der Knopf
**„Frage melden"** 🚩 – am Laptop auch Taste **M**. Ein Tipp öffnet einen kleinen
Dialog über der Frage: melden mit oder ohne Kommentar, danach geht es dort weiter,
wo man war. Der komplette Weg:

1. **Melden** (in der App, beim Üben) – optionaler Kommentar, z. B. „Antwort B ist auch richtig".
   Ist der direkte Weg eingerichtet (siehe „Issues direkt anlegen"), **entsteht das GitHub-Issue
   sofort mit diesem einen Tipp** – im Hintergrund, die Frage bleibt bedienbar. Alles Weitere
   ist dann nur noch Nachschlagen.
2. **Sammeln**: *Einstellungen → Fragen-Feedback → Gemeldete Fragen*. Dort ist jede
   Meldung mit Fragetext, Thema, ID und Datum aufgelistet, die Notiz bleibt änderbar.
3. **Exportieren**: „Als Datei" (Markdown) oder „Alle kopieren". Der Export ist bereits
   ein **Backlog zum Abhaken** – je Frage ein Kästchen, darunter Notiz, Fragetext,
   Antwortmöglichkeiten (richtige markiert), Lösung und Erklärung.
4. **Als GitHub-Issue** – ein Issue je Frage, damit jeder Vorgang für sich geschlossen
   werden kann. Zwei Wege, die App nimmt automatisch den besseren:
   - **Direkt** (wenn die Edge Function eingerichtet ist, siehe unten): Tipp auf „Als Issue",
     das Issue entsteht sofort, man **bleibt in der App**. Danach steht „Issue #12 angelegt"
     mit Link am Eintrag.
   - **Über das Formular** (ohne Serverteil): GitHub öffnet sich mit fertig ausgefülltem
     Titel und Text – dort nur noch „Create" tippen. Der Eintrag ist dann als
     „Issue vorbereitet am …" markiert.

   Zielrepo für den Formular-Weg ist `feedbackRepo` in [`config.js`](config.js).

   > Ist `feedbackRepo` leer (Standard), erscheinen die Knöpfe gar nicht. Bei
   > zugangsgeschützten Inhalten ein **privates** Repo wählen – der Issue-Text enthält den Fragetext.

5. **Oder als Datei ins Repo übernehmen**:

   ```bash
   node tools/reports-to-backlog.mjs ~/Downloads/lern-trainer-gemeldete-fragen-2026-08-06.md
   ```

   Das pflegt `docs/fragen-backlog.md` (wird beim ersten Lauf angelegt): neue IDs kommen
   unter *Offen* dazu, **abgehakte Einträge bleiben abgehakt** (unter *Erledigt*),
   **vorhandene Einträge werden nie überschrieben** – Notizen von Hand bleiben stehen.
   Denselben Export mehrfach einspielen ändert nichts.
6. **Korrigieren**: Die Frage in der Quelle anpassen – in der eigenen CSV/JSON-Datei (dann
   neu importieren), in [`data/questions.js`](data/questions.js) oder bei Zugangsschutz in
   Supabase (siehe `supabase/content-gate.sql`).
7. **Abhaken** im Backlog – erledigt wird nur durchs Häkchen, nichts verschwindet von allein.

> **Wo liegen die Meldungen?** Lokal im `localStorage` (im selben Datensatz wie der
> Lernfortschritt) und – falls Geräte-Sync aktiv ist – zusätzlich in Supabase. **Nicht**
> in git: Erst der Export bringt sie ins Repo. „Fortschritt zurücksetzen" löscht sie
> bewusst nicht (Feedback ist kein Lernfortschritt).

### Issues direkt anlegen (optional, ohne GitHub-Umweg)

Damit die App das Issue **selbst** anlegen kann, braucht es einen kleinen Serverteil: Ein
GitHub-Token darf **niemals** in eine öffentlich ausgelieferte Web-App, deshalb hält ihn eine
**Supabase Edge Function**. Die App schickt nur die Meldung dorthin und bekommt die
Issue-Nummer zurück.

1. **Tabelle anlegen**: [`supabase/feedback-issues.sql`](supabase/feedback-issues.sql) im
   SQL Editor ausführen (Dublettenschutz + Mengenbegrenzung).
2. **Token erzeugen**: GitHub → Settings → Developer settings → **Fine-grained personal access
   token**. *Repository access:* nur das Ziel-Repo. *Permissions:* **Issues: Read and write** –
   sonst nichts. Kurze Laufzeit wählen und im Kalender vermerken (abgelaufene Tokens sind der
   häufigste Grund, warum es später „plötzlich nicht mehr geht").
3. **Function deployen**:

   ```bash
   supabase functions deploy create-issue --no-verify-jwt
   ```

4. **Secrets setzen** (Dashboard → Edge Functions → *Manage secrets*):
   - `GITHUB_TOKEN` = der Token aus Schritt 2
   - `GITHUB_REPO` = `owner/repo` des **privaten** Ziel-Repos

**Schutz:** Der Endpunkt ist – wie alle anon-Endpunkte – offen erreichbar. Er verlangt deshalb
den **Zugangscode** der Lerninhalte (Prüfung serverseitig gegen `content_gate`, gleiche Quelle
wie `get_content`), legt **je Frage höchstens ein Issue** an (ein zweiter Aufruf liefert das
vorhandene zurück) und deckelt auf **30 neue Issues pro Stunde**.

**Ohne diese Einrichtung** funktioniert alles weiter – die App fällt dann automatisch auf den
Formular-Weg zurück und sagt in einem Satz, warum.

## Updates ausliefern (GitHub Pages)

Ein Push auf den Pages-Branch **ist** das Deployment – eine Neuinstallation auf dem
iPhone ist nie nötig. Bei den Nutzenden kommt die neue Fassung so an:

- **Von allein**: Der Service Worker lädt die neue Shell im Hintergrund; spätestens beim
  übernächsten Start läuft sie. Liegt ein neuer Service Worker bereit, erscheint zusätzlich
  das In-App-Banner „Neue Version verfügbar".
- **Sofort auf Wunsch**: *Einstellungen → App-Version → „Nach Updates suchen"*. Die App holt
  die Shell frisch, vergleicht die ausgelieferte mit der laufenden `APP_VERSION` und bietet
  das Neuladen an. Der Lernfortschritt bleibt dabei erhalten.

**Beim Ausliefern zu beachten:** `APP_VERSION` in [`js/app.js`](js/app.js) erhöhen – die App
und `sw.js` vergleichen genau diesen Wert (`sw.js` liest die Deklarationszeile per Regex aus
der ausgelieferten Datei). Ohne Erhöhung meldet die Update-Prüfung „bereits aktuell",
obwohl die Dateien frisch geholt wurden.

## Struktur

```
(Repository-Root)
├── index.html              App-Grundgerüst
├── manifest.webmanifest    PWA-Manifest (Name, Icons, Standalone)
├── sw.js                   Service Worker (Offline-Cache)
├── config.js               Konfiguration (Sync, Erinnerungen, Zugangsschutz)
├── css/styles.css          Design (Light/Dark, iOS-optimiert)
├── js/app.js               App-Logik (Quiz-Engine, Import, Gamification)
├── js/sync.js              Cloud-Sync (Merge-Logik, Supabase-Anbindung)
├── data/questions.js       Beispiel-Inhalte  ← hier feste Inhalte pflegen
├── supabase/               Optionale Server-Teile (SQL, Edge Functions)
├── tools/                  Werkzeuge (Backlog aus Meldungen, Inhalts-Validierung)
├── tests/                  Testnetz – `bash tests/run.sh`
└── icons/                  App-Icons (PNG)
```

## Tests

```bash
bash tests/run.sh
```

Syntax, Fragen-Validierung, Unit-Tests und Browser-Tests (Playwright) inkl. Import,
Offline-Modus und Update-Weg. Details: [`tests/README.md`](tests/README.md).
