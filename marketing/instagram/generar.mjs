// Genera las láminas de Instagram (PNG 1080×1350) y las portadas de historias destacadas (1080×1920).
// Uso: PLAYWRIGHT_PATH=/ruta/a/playwright node marketing/instagram/generar.mjs
// Edita los textos en CARRUSELES y DESTACADAS y vuelve a ejecutar.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const aqui = fileURLToPath(new URL('.', import.meta.url));
const landing = fileURLToPath(new URL('../../landing/', import.meta.url));
const onda = (par) => readFileSync(landing + 'index.html', 'utf8').match(new RegExp('\\.wave-' + par + ' \\{ background-image: (url\\("[^"]+"\\)); \\}'))[1];

const COBALTO = '#2B44FF', ROSA = '#FDE8F0', ARENA = '#FAF8F5', TINTA = '#1F1B18';

// tipo: portada | punto | cierre | precio | imagen
const CARRUSELES = {
  '01-senales-sitio': [
    { tipo: 'portada', kicker: 'Guárdalo 📌', titulo: '5 señales de que tu sitio web te hace perder clientes', pie: 'Desliza →' },
    { tipo: 'punto', n: '1', titulo: 'Tarda más de 3 segundos en cargar.', texto: 'En el celular, la mitad de la gente se va antes de ver tu negocio.' },
    { tipo: 'punto', n: '2', titulo: 'No tiene botón de WhatsApp.', texto: 'Si cuesta contactarte, te escriben menos. Así de simple.' },
    { tipo: 'punto', n: '3', titulo: 'No apareces en Google Maps.', texto: 'Tu competencia sí aparece, y se lleva esas llamadas.' },
    { tipo: 'punto', n: '4', titulo: 'No lo puedes cambiar tú.', texto: 'Un precio desactualizado espanta más que no tener sitio.' },
    { tipo: 'punto', n: '5', titulo: 'Se ve igual que mil otros.', texto: 'Si pareces una plantilla, compites solo por precio.' },
    { tipo: 'cierre', titulo: '¿Marcaste 2 o más?', texto: 'Te hago un diagnóstico gratis en video, con 3 mejoras concretas, en 24 horas.', cta: 'Escríbeme DIAGNÓSTICO 📲' }
  ],
  '02-cuanto-cuesta': [
    { tipo: 'portada', kicker: 'Sin letra chica', titulo: '¿Cuánto cuesta un sitio web en Chile?', pie: 'Desliza →' },
    { tipo: 'punto', n: '→', titulo: 'Depende de lo que necesitas lograr.', texto: 'No del número de páginas. Estos son mis precios de partida:' },
    { tipo: 'precio', meta: 'Quiero que me contacten', nombre: 'Landing page', precio: '$190.000', plazo: '3 días' },
    { tipo: 'precio', meta: 'Quiero mostrar mi empresa', nombre: 'Sitio corporativo', precio: '$390.000', plazo: '7 días' },
    { tipo: 'precio', meta: 'Quiero reservas online', nombre: 'Súmale reservas + app', precio: '+$190.000', plazo: '+3 días' },
    { tipo: 'cierre', titulo: 'Arma el tuyo y mira el precio al instante.', texto: 'Cotizador en bascunan.digital: 3 clics, sin llamadas ni formularios eternos.', cta: 'Link en la bio 👆' }
  ],
  '03-caso-valeria': [
    { tipo: 'portada', kicker: 'Caso real', titulo: 'De agendar a mano por WhatsApp a reservas online 24/7', pie: 'Desliza →' },
    { tipo: 'punto', n: '😩', titulo: 'Antes', texto: 'Cada reserva era un ir y venir de mensajes. Horas perdidas y clientas que no esperaban.' },
    { tipo: 'imagen', titulo: 'Después: reservas online + app en el celular', img: 'caso-valeria.jpg' },
    { tipo: 'punto', n: '⚡', titulo: 'Qué hicimos', texto: 'Motor de reservas a medida, panel instalable como app y SEO local para aparecer en Google.' },
    { tipo: 'punto', n: '★', titulo: '4.9/5 en Google', texto: '38 reseñas respaldan una experiencia de reserva simple y rápida.' },
    { tipo: 'cierre', titulo: '¿Quieres algo así para tu negocio?', texto: 'Cotiza en 2 minutos o pide un diagnóstico gratis de tu sitio.', cta: 'Link en la bio 👆' }
  ]
};

const DESTACADAS = [
  ['trabajos', 'Trabajos', '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/>'],
  ['precios', 'Precios', '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/>'],
  ['diagnostico', 'Diagnóstico', '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'],
  ['opiniones', 'Opiniones', '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>'],
  ['sobre-mi', 'Sobre mí', '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>']
];

const base = `<style>
@font-face { font-family: J; src: url("file://${landing}fonts/plus-jakarta-sans.woff2"); font-weight: 200 800; }
@font-face { font-family: M; src: url("file://${landing}fonts/jetbrains-mono.woff2"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; } body { font-family: J; -webkit-font-smoothing: antialiased; }
.l { position: relative; width: 1080px; height: 1350px; overflow: hidden; padding: 110px 96px; display: flex; flex-direction: column; }
.marca { position: absolute; left: 96px; bottom: 64px; font: 700 30px J; letter-spacing: -.02em; }
.cont { position: absolute; right: 96px; bottom: 64px; font: 600 26px M; opacity: .7; }
.onda { position: absolute; left: 0; right: 0; height: 168px; background-repeat: repeat-x; background-size: 108px 168px; }
.onda-mini { height: 78px; background-size: 84px 130px; }
h1 { font: 800 104px/1 J; letter-spacing: -.05em; } h2 { font: 800 78px/1.04 J; letter-spacing: -.045em; }
p { font: 500 40px/1.4 J; } .kick { display: inline-block; align-self: flex-start; padding: 12px 28px; border-radius: 99px; font: 700 30px J; }
.n { display: grid; place-items: center; width: 150px; height: 150px; border-radius: 40px; font: 800 80px J; margin-bottom: 70px; }
.cta { align-self: flex-start; margin-top: 60px; padding: 30px 44px; border-radius: 99px; font: 800 42px J; }
.onda-cb { background-image: ${onda('cobalt-blush')}; } .onda-bc { background-image: ${onda('blush-cobalt')}; } .onda-sc { background-image: ${onda('sand-cobalt')}; }
.centro { justify-content: center; padding-bottom: 180px; }
.pie { position: absolute; left: 96px; right: 96px; bottom: 100px; display: flex; align-items: center; justify-content: space-between; }
</style>`;

// Todas las láminas llevan al pie la misma onda que separa las secciones en bascunan.digital:
// arena↔cobalto (onda-sc) sobre fondo arena, y blush↔cobalto (onda-bc) sobre fondo blush.
function lamina(d, i, total) {
  const cont = `<span class="cont">${i + 1}/${total}</span>`;
  const pie = (color) => `<div class="pie"><span style="font:700 30px J;letter-spacing:-.02em;color:${color}">@bascunan.digital</span><span style="font:600 26px M;opacity:.7;color:${color}">${i + 1}/${total}</span></div>`;
  if (d.tipo === 'portada') return `<div class="l" style="background:${COBALTO};color:${ROSA}"><span class="kick" style="background:${ROSA};color:${COBALTO}">${d.kicker}</span><h1 style="margin-top:80px">${d.titulo}</h1><p style="margin-top:auto;margin-bottom:190px;font-weight:700">${d.pie}</p><div class="onda onda-cb" style="bottom:0"></div><span style="position:absolute;right:96px;top:122px;font:700 30px J">@bascunan.digital</span></div>`;
  if (d.tipo === 'punto') return `<div class="l centro" style="background:${ARENA};color:${TINTA}"><span class="n" style="background:${COBALTO};color:#fff">${d.n}</span><h2 style="font-size:92px">${d.titulo}</h2><p style="margin-top:48px;font-size:48px;color:#5E5953">${d.texto}</p><div class="onda onda-mini onda-sc" style="bottom:0"></div>${pie(COBALTO)}</div>`;
  if (d.tipo === 'precio') return `<div class="l centro" style="background:${ROSA};color:${TINTA}"><span class="kick" style="background:#fff;color:${COBALTO}">${d.meta}</span><h2 style="margin-top:70px;font-size:92px">${d.nombre}</h2><p style="margin-top:60px;font:600 36px J;color:#5E5953">desde</p><p style="font:800 150px/1 J;letter-spacing:-.05em;color:${COBALTO}">${d.precio}</p><p style="margin-top:40px;font:700 44px M;color:#15803D">${d.plazo}</p><div class="onda onda-mini onda-bc" style="bottom:0"></div>${pie(COBALTO)}</div>`;
  if (d.tipo === 'imagen') return `<div class="l centro" style="background:${ARENA};color:${TINTA}"><h2 style="font-size:72px">${d.titulo}</h2><img src="file://${landing}img/${d.img}" style="margin-top:70px;width:100%;border-radius:36px;box-shadow:0 40px 80px -30px rgba(15,23,42,.35)"><div class="onda onda-mini onda-sc" style="bottom:0"></div>${pie(COBALTO)}</div>`;
  return `<div class="l" style="background:${COBALTO};color:${ROSA}"><div class="onda onda-bc" style="top:0"></div><h2 style="margin-top:250px;font-size:92px">${d.titulo}</h2><p style="margin-top:48px;font-size:46px">${d.texto}</p><span class="cta" style="background:${ROSA};color:${COBALTO}">${d.cta}</span><span class="marca" style="color:#fff">@bascunan.digital</span>${cont}</div>`;
}

const nav = await chromium.launch();
const pag = await nav.newPage({ viewport: { width: 1080, height: 1350 } });
// Se abre como archivo local para que carguen las fuentes y las imágenes
const tmp = aqui + '_tmp.html';
async function mostrar(html) { writeFileSync(tmp, '<!doctype html><meta charset="utf-8">' + html); await pag.goto('file://' + tmp); }
for (const [nombre, laminas] of Object.entries(CARRUSELES)) {
  mkdirSync(aqui + nombre, { recursive: true });
  for (let i = 0; i < laminas.length; i++) {
    await mostrar(base + lamina(laminas[i], i, laminas.length));
    await pag.evaluate(() => document.fonts.ready);
    await pag.screenshot({ path: `${aqui}${nombre}/${String(i + 1).padStart(2, '0')}.png` });
  }
  console.log('✓', nombre, laminas.length, 'láminas');
}
mkdirSync(aqui + 'destacadas', { recursive: true });
await pag.setViewportSize({ width: 1080, height: 1920 });
// Instagram muestra las destacadas como un círculo recortado en el centro: las ondas van
// pegadas arriba y abajo del ícono (dentro de esa zona), igual que separan secciones en el sitio.
for (const [archivo, texto, icono] of DESTACADAS) {
  await mostrar(`${base}<div style="position:relative;width:1080px;height:1920px;background:${COBALTO};display:grid;place-items:center"><div class="onda onda-cb" style="top:596px;height:84px"></div><div style="position:relative;display:grid;place-items:center;width:560px;height:560px;border-radius:50%;background:${ROSA}"><svg width="260" height="260" viewBox="0 0 24 24" fill="none" stroke="${COBALTO}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icono}</svg></div><div class="onda onda-cb" style="top:1240px;height:84px"></div></div>`);
  await pag.screenshot({ path: `${aqui}destacadas/${archivo}.png` });
}
console.log('✓ destacadas', DESTACADAS.length);
rmSync(tmp);
await nav.close();
