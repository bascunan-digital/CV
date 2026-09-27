// Genera las imágenes referenciales de img/ a partir de assets-fuente/*.html.
// Requiere Playwright: npm i -D playwright (o define PLAYWRIGHT_PATH con su ruta).
// Cuando tengas tus fotos y capturas reales, reemplaza los archivos de img/ con el mismo nombre y no vuelvas a ejecutar esto.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const raiz = fileURLToPath(new URL('..', import.meta.url));

// La onda de la imagen para redes se toma del CSS de la landing, para que sea la misma
const onda = readFileSync(raiz + 'index.html', 'utf8').match(/\.wave-cobalt-blush \{ background-image: (url\("[^"]+"\)); \}/)[1];

const piezas = [
  // img/alonso.jpg ya es tu foto real: no se regenera
  ['caso-valeria', 1200, 800, 'img/caso-valeria.jpg'],
  ['caso-dav', 1200, 800, 'img/caso-dav.jpg'],
  ['caso-notas', 1200, 800, 'img/caso-notas.jpg'],
  ['og', 1200, 630, 'img/og.jpg']
];

const navegador = await chromium.launch();
for (const [nombre, ancho, alto, salida] of piezas) {
  const pagina = await navegador.newPage({ viewport: { width: ancho, height: alto } });
  await pagina.goto('file://' + raiz + 'assets-fuente/' + nombre + '.html');
  if (nombre === 'og') await pagina.evaluate((bg) => { document.getElementById('onda').style.backgroundImage = bg; }, onda);
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: raiz + salida, type: 'jpeg', quality: 84 });
  console.log('✓', salida);
  await pagina.close();
}
await navegador.close();
