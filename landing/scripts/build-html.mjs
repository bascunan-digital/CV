// Genera dist/index.html a partir de index.html (el prototipo):
// quita el Tailwind del CDN y el bloque de tokens, y enlaza el CSS compilado.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const origen = new URL('../index.html', import.meta.url);
const destino = new URL('../dist/index.html', import.meta.url);

let html = readFileSync(origen, 'utf8');

const cdn = /\s*<!-- Tailwind CSS v4 vía CDN[^\n]*-->\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@tailwindcss\/browser@4"><\/script>/;
const tokens = /\s*<!-- Tokens del sistema de diseño -->\s*<style type="text\/tailwindcss">[\s\S]*?<\/style>/;

for (const [nombre, patron] of [['script del CDN', cdn], ['bloque de tokens', tokens]]) {
  if (!patron.test(html)) throw new Error(`No se encontró el ${nombre} en index.html`);
}

html = html
  .replace(cdn, '\n\n  <link rel="stylesheet" href="styles.css" />')
  .replace(tokens, '');

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(destino, html);
console.log('dist/index.html generado');
