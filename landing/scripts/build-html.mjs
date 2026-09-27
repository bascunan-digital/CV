// Genera dist/ a partir de index.html (el prototipo), listo para subir al hosting:
// - quita el Tailwind del CDN y el bloque de tokens, y enlaza el CSS compilado;
// - apaga el modo simulación (sin testimonios de ejemplo ni etiquetas "referencial");
// - copia fuentes e imágenes, y crea robots.txt y sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';

const raiz = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const DOMINIO = 'https://www.bascunan.digital';

let html = readFileSync(new URL('index.html', raiz), 'utf8');

const cdn = /\s*<!-- Tailwind CSS v4 vía CDN[^\n]*-->\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@tailwindcss\/browser@4"><\/script>/;
const tokens = /\s*<!-- Tokens del sistema de diseño -->\s*<style type="text\/tailwindcss">[\s\S]*?<\/style>/;
const simulacion = /modoSimulacion: true/;

for (const [nombre, patron] of [['script del CDN', cdn], ['bloque de tokens', tokens], ['modoSimulacion', simulacion]]) {
  if (!patron.test(html)) throw new Error(`No se encontró el ${nombre} en index.html`);
}

// Solo los logos visibles (TEC_VISIBLES) viajan en la versión publicada
html = html.replace(/var TECNOLOGIAS_TODAS = (\[.*\]);\n\s*var TEC_VISIBLES = (\[.*\]);/, (_, todas, visibles) => {
  const nombres = JSON.parse(visibles.replace(/'/g, '"'));
  const filtradas = JSON.parse(todas).map(([cat, items]) => [cat, items.filter((t) => nombres.includes(t[0]))]);
  return 'var TECNOLOGIAS_TODAS = ' + JSON.stringify(filtradas) + ';\n    var TEC_VISIBLES = ' + visibles + ';';
});

// CSS compilado dentro del HTML: una petición menos antes de mostrar la página
const css = readFileSync(new URL('dist/styles.css', raiz), 'utf8');
html = html
  .replace(cdn, () => '\n\n  <style>' + css + '</style>')
  .replace(tokens, '')
  .replace(simulacion, 'modoSimulacion: false');

mkdirSync(dist, { recursive: true });
writeFileSync(new URL('index.html', dist), html);
rmSync(new URL('styles.css', dist)); // ya va dentro del HTML
cpSync(new URL('fonts/', raiz), new URL('fonts/', dist), { recursive: true });
cpSync(new URL('img/', raiz), new URL('img/', dist), { recursive: true });
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${DOMINIO}/sitemap.xml\n`);
writeFileSync(new URL('.htaccess', dist), readFileSync(new URL('scripts/htaccess.txt', raiz), 'utf8'));
writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${DOMINIO}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`);
console.log('dist/ generado: index.html (con CSS), fonts/, img/, robots.txt, sitemap.xml, .htaccess');
