// Genera dist/ a partir de los prototipos, listo para subir al hosting:
// - quita el Tailwind del CDN y el bloque de tokens de cada página;
// - index.html lleva el CSS compilado dentro (una petición menos); las demás páginas enlazan styles.css;
// - index.html apaga el modo simulación (sin testimonios de ejemplo ni etiquetas "referencial");
// - copia fuentes, imágenes, íconos y scripts, y crea robots.txt, sitemap.xml y .htaccess.
import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';

const raiz = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const DOMINIO = 'https://www.bascunan.digital';
const PAGINAS = ['index.html', 'portal.html', 'cv.html', 'privacidad.html', 'terminos.html', '404.html'];
const EN_SITEMAP = ['', 'cv.html', 'privacidad.html', 'terminos.html'];
const ARCHIVOS = ['sitio.js', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'site.webmanifest'];

const cdn = /\s*<!-- Tailwind CSS v4 vía CDN[^\n]*-->\s*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@tailwindcss\/browser@4"><\/script>/;
const tokens = /\s*<!-- Tokens del sistema de diseño -->\s*<style type="text\/tailwindcss">[\s\S]*?<\/style>/;
const css = readFileSync(new URL('dist/styles.css', raiz), 'utf8');
mkdirSync(dist, { recursive: true });

for (const pagina of PAGINAS) {
  let html = readFileSync(new URL(pagina, raiz), 'utf8');
  for (const [nombre, patron] of [['script del CDN', cdn], ['bloque de tokens', tokens]]) {
    if (!patron.test(html)) throw new Error(`No se encontró el ${nombre} en ${pagina}`);
  }
  if (pagina === 'index.html') {
    if (!/modoSimulacion: true/.test(html)) throw new Error('No se encontró modoSimulacion en index.html');
    // Solo los logos visibles (TEC_VISIBLES) viajan en la versión publicada
    html = html.replace(/var TECNOLOGIAS_TODAS = (\[.*\]);\n\s*var TEC_VISIBLES = (\[.*\]);/, (_, todas, visibles) => {
      const nombres = JSON.parse(visibles.replace(/'/g, '"'));
      const filtradas = JSON.parse(todas).map(([cat, items]) => [cat, items.filter((t) => nombres.includes(t[0]))]);
      return 'var TECNOLOGIAS_TODAS = ' + JSON.stringify(filtradas) + ';\n    var TEC_VISIBLES = ' + visibles + ';';
    });
    html = html.replace(/modoSimulacion: true/, 'modoSimulacion: false').replace(cdn, () => '\n\n  <style>' + css + '</style>');
  } else {
    html = html.replace(cdn, '\n\n  <link rel="stylesheet" href="styles.css" />');
  }
  writeFileSync(new URL(pagina, dist), html.replace(tokens, ''));
}

cpSync(new URL('fonts/', raiz), new URL('fonts/', dist), { recursive: true });
cpSync(new URL('img/', raiz), new URL('img/', dist), { recursive: true });
for (const archivo of ARCHIVOS) cpSync(new URL(archivo, raiz), new URL(archivo, dist));
writeFileSync(new URL('.htaccess', dist), readFileSync(new URL('scripts/htaccess.txt', raiz), 'utf8'));
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${DOMINIO}/sitemap.xml\n`);
const hoy = new Date().toISOString().slice(0, 10);
writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${EN_SITEMAP.map((u) => `  <url><loc>${DOMINIO}/${u}</loc><lastmod>${hoy}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log('dist/ generado:', PAGINAS.join(', ') + ', styles.css, fonts/, img/, íconos, sitio.js, robots.txt, sitemap.xml, .htaccess');
