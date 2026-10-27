/*
 * Testhilfe: Zugangsschutz neutralisieren.
 * ------------------------------------------------------------------
 * Mit `contentGated: true` verlangt die App beim Start einen Zugangscode. Damit die
 * Browser-Tests in beiden Konfigurationen gleich laufen, hinterlegen wir den
 * BEISPIEL-Katalog aus `data/questions.js` als „freigeschaltete" Inhalte. Der
 * Schutzmechanismus selbst wird separat getestet (e2e-smoke, Abschnitt „Gate").
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// data/questions.js in einer Mini-Umgebung auswerten – es legt window.SAMPLE_CONTENT an.
export function sampleContent() {
  const src = fs.readFileSync(path.join(root, 'data/questions.js'), 'utf8');
  const win = { localStorage: { getItem: () => null } };
  new Function('window', src)(win);
  if (!win.SAMPLE_CONTENT || !Array.isArray(win.SAMPLE_CONTENT.QUESTIONS)) throw new Error('Beispielkatalog nicht gefunden');
  return win.SAMPLE_CONTENT;
}

export const CONTENT_KEY = 'lern_content_v1';

// Vor dem ersten Skript der Seite ausführen: Beispielkatalog als freigeschaltet ablegen.
export async function seedContent(page) {
  await page.addInitScript(
    ([key, content]) => localStorage.setItem(key, JSON.stringify(content)),
    [CONTENT_KEY, sampleContent()],
  );
}
