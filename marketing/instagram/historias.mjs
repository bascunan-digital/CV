// Genera el CONTENIDO de las historias destacadas (1080×1920, lo que se ve al tocar cada destacada).
// Las portadas (el círculo con el ícono) ya las genera generar.mjs; esto es lo de adentro.
// Uso: PLAYWRIGHT_PATH=/ruta/a/playwright node marketing/instagram/historias.mjs
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const aqui = fileURLToPath(new URL('.', import.meta.url));
const landing = fileURLToPath(new URL('../../landing/', import.meta.url));
const onda = (par) => readFileSync(landing + 'index.html', 'utf8').match(new RegExp('\\.wave-' + par + ' \\{ background-image: (url\\("[^"]+"\\)); \\}'))[1];

const COBALTO = '#2B44FF', ROSA = '#FDE8F0', ARENA = '#FAF8F5', TINTA = '#1F1B18', VERDE = '#15803D';

// tipo: portada | texto | precio | pasos | stat | cierre
const DESTACADAS = {
  precios: [
    { tipo: 'portada', kicker: 'Sin letra chica', titulo: 'Precios de partida' },
    { tipo: 'precio', items: [['Landing page', '$190.000', '3 días'], ['Sitio corporativo', '$390.000', '7 días'], ['Portafolio', '$260.000', '4 días'], ['Tienda online', '$690.000', '12 días']] },
    { tipo: 'cierre', titulo: 'Arma el tuyo y mira el precio al instante.', texto: 'Cotizador en bascunan.digital: 3 clics, sin llamadas ni formularios eternos.', cta: 'Link en la bio 👆' }
  ],
  diagnostico: [
    { tipo: 'portada', kicker: 'Gratis · sin compromiso', titulo: '¿Cómo funciona el diagnóstico?' },
    { tipo: 'pasos', items: [['1', 'Me escribes', '"DIAGNÓSTICO" por WhatsApp o Instagram.'], ['2', 'Reviso tu sitio', 'Grabo un video de 3 minutos con lo que encuentro.'], ['3', 'Te lo envío', 'En 24 horas, con 3 mejoras concretas. Sin compromiso.']] },
    { tipo: 'cierre', titulo: '¿Le hago el diagnóstico a tu sitio?', texto: 'Aunque no trabajemos juntos, te sirve igual.', cta: 'Escríbeme DIAGNÓSTICO 📲' }
  ],
  'sobre-mi': [
    { tipo: 'portada', kicker: 'Quién está detrás', titulo: 'Hola, soy Alonso 👋' },
    { tipo: 'texto', items: [['15+ años', 'diseñando para marcas e instituciones'], ['Diseño + código', 'de Figma al sitio publicado, sin intermediarios'], ['Docente', 'de diseño web en INACAP: explico en simple']] },
    { tipo: 'cierre', titulo: 'Hablas directo conmigo.', texto: 'No con un ejecutivo de cuentas ni una agencia. Yo diseño, yo programo, yo te respondo.', cta: 'Escríbeme por WhatsApp 📲' }
  ],
  opiniones: [
    { tipo: 'portada', kicker: 'Caso real', titulo: 'Lo que dicen mis clientes' },
    { tipo: 'stat', numero: '4.9/5', texto: '38 reseñas en Google', pie: 'Valeria Estética Integral' },
    { tipo: 'cierre', titulo: '¿Quieres algo así para tu negocio?', texto: 'Reservas online, panel instalable y SEO local desde el día 1.', cta: 'Link en la bio 👆' }
  ]
};

const base = `<style>
@font-face { font-family: J; src: url("file://${landing}fonts/plus-jakarta-sans.woff2"); font-weight: 200 800; }
@font-face { font-family: M; src: url("file://${landing}fonts/jetbrains-mono.woff2"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; } body { font-family: J; -webkit-font-smoothing: antialiased; }
.l { position: relative; width: 1080px; height: 1920px; overflow: hidden; padding: 160px 96px; display: flex; flex-direction: column; }
.centro { justify-content: center; }
.onda { position: absolute; left: 0; right: 0; height: 130px; background-repeat: repeat-x; background-size: 84px 130px; }
.onda-cb { background-image: ${onda('cobalt-blush')}; } .onda-bc { background-image: ${onda('blush-cobalt')}; } .onda-sc { background-image: ${onda('sand-cobalt')}; }
h1 { font: 800 92px/1.05 J; letter-spacing: -.045em; } h2 { font: 800 72px/1.1 J; letter-spacing: -.04em; }
p { font: 500 38px/1.4 J; }
.kick { display: inline-block; align-self: flex-start; padding: 12px 28px; border-radius: 99px; font: 700 28px J; }
.marca { position: absolute; left: 96px; bottom: 168px; font: 700 30px J; letter-spacing: -.02em; }
.cta { align-self: flex-start; margin-top: 60px; padding: 30px 44px; border-radius: 99px; font: 800 40px J; }
.fila { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 34px 0; border-bottom: 2px solid rgba(31,27,24,.08); }
.paso { display: flex; gap: 34px; align-items: flex-start; margin-top: 56px; }
.paso .n { display: grid; place-items: center; flex-shrink: 0; width: 96px; height: 96px; border-radius: 28px; background: ${COBALTO}; color: #fff; font: 800 48px J; }
</style>`;

function slide(d, marcaColor) {
  const marca = `<span class="marca" style="color:${marcaColor}">@bascunan.digital</span>`;
  if (d.tipo === 'portada') return `<div class="l centro" style="background:${COBALTO};color:${ROSA}"><span class="kick" style="background:${ROSA};color:${COBALTO}">${d.kicker}</span><h1 style="margin-top:56px">${d.titulo}</h1><div class="onda onda-bc" style="bottom:0"></div></div>`;
  if (d.tipo === 'precio') return `<div class="l centro" style="background:${ARENA};color:${TINTA}"><h2>Desde…</h2><div style="margin-top:40px">${d.items.map(([n, p, pl]) => `<div class="fila"><span style="font:700 42px J">${n}</span><span style="text-align:right"><span style="display:block;font:800 52px J;color:${COBALTO}">${p}</span><span style="font:600 28px M;color:${VERDE}">${pl}</span></span></div>`).join('')}</div><div class="onda onda-sc" style="bottom:0"></div>${marca}</div>`;
  if (d.tipo === 'pasos') return `<div class="l" style="background:${ROSA};color:${TINTA}">${d.items.map(([n, t, x]) => `<div class="paso"><span class="n">${n}</span><span><span style="display:block;font:800 46px J">${t}</span><span style="display:block;margin-top:8px;font:500 34px/1.4 J;color:#5E5953">${x}</span></span></div>`).join('')}<div class="onda onda-cb" style="bottom:0"></div>${marca}</div>`;
  if (d.tipo === 'texto') return `<div class="l centro" style="background:${ARENA};color:${TINTA}">${d.items.map(([n, t]) => `<div style="margin-bottom:56px"><span style="display:block;font:800 60px J;color:${COBALTO}">${n}</span><span style="display:block;margin-top:6px;font:500 38px/1.35 J;color:#5E5953">${t}</span></div>`).join('')}<div class="onda onda-sc" style="bottom:0"></div>${marca}</div>`;
  if (d.tipo === 'stat') return `<div class="l centro" style="background:${COBALTO};color:${ROSA};text-align:center;align-items:center"><span style="font:800 220px/1 J;letter-spacing:-.05em">${d.numero}</span><span style="margin-top:20px;font:700 44px J">${d.texto}</span><span style="margin-top:16px;font:600 32px M;opacity:.75">${d.pie}</span><div class="onda onda-bc" style="bottom:0"></div></div>`;
  return `<div class="l centro" style="background:${COBALTO};color:${ROSA}"><div class="onda onda-bc" style="top:0"></div><h2>${d.titulo}</h2><p style="margin-top:36px">${d.texto}</p><span class="cta" style="background:${ROSA};color:${COBALTO}">${d.cta}</span></div>`;
}

const nav = await chromium.launch();
const pag = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
const tmp = aqui + '_tmp.html';
async function mostrar(html) { writeFileSync(tmp, '<!doctype html><meta charset="utf-8">' + html); await pag.goto('file://' + tmp); await pag.evaluate(() => document.fonts.ready); }
for (const [nombre, slides] of Object.entries(DESTACADAS)) {
  const dir = aqui + 'destacadas/' + nombre + '/';
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < slides.length; i++) {
    await mostrar(base + slide(slides[i], COBALTO));
    await pag.screenshot({ path: `${dir}${String(i + 1).padStart(2, '0')}.png` });
  }
  console.log('✓', nombre, slides.length, 'historias');
}
rmSync(tmp);
await nav.close();
