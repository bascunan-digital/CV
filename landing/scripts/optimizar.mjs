// Optimiza imágenes y genera los íconos del sitio.
// - img/*.jpg → img/*.webp (más livianas; el HTML usa <picture> con el JPG como respaldo)
// - favicon.svg → favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png
// Requiere sharp (npm install). Ejecuta: npm run build:optimizar
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const raiz = new URL('../', import.meta.url);
const img = new URL('img/', raiz);

for (const archivo of readdirSync(img).filter((f) => f.endsWith('.jpg') && f !== 'og.jpg')) { // og.jpg queda en JPG: WhatsApp y Facebook lo leen mejor
  const salida = archivo.replace(/\.jpg$/, '.webp');
  const calidad = archivo === 'alonso.jpg' ? 86 : 78; // tu foto va con más calidad
  const info = await sharp(new URL(archivo, img).pathname).webp({ quality: calidad, effort: 6 }).toFile(new URL(salida, img).pathname);
  console.log('✓ img/' + salida, Math.round(info.size / 1024) + ' KB');
}

// Miniatura de tu foto para los avatares chicos del inicio (carga más rápido que la foto grande)
await sharp(new URL('alonso.jpg', img).pathname).extract({ left: 0, top: 0, width: 1200, height: 1200 }).resize(120, 120).webp({ quality: 82 }).toFile(new URL('alonso-mini.webp', img).pathname);
console.log('✓ img/alonso-mini.webp');

const svg = readFileSync(new URL('favicon.svg', raiz));
const png = (px) => sharp(svg, { density: 512 }).resize(px, px).png().toBuffer();
for (const [nombre, px] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  writeFileSync(new URL(nombre, raiz), await png(px));
  console.log('✓', nombre);
}
// favicon.ico con una imagen PNG de 32×32 dentro (formato ICO moderno)
const p32 = await png(32);
const cab = Buffer.alloc(22);
cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(1, 4);             // ICONDIR
cab.writeUInt8(32, 6); cab.writeUInt8(32, 7); cab.writeUInt8(0, 8); cab.writeUInt8(0, 9); // ancho, alto, colores
cab.writeUInt16LE(1, 10); cab.writeUInt16LE(32, 12); cab.writeUInt32LE(p32.length, 14); cab.writeUInt32LE(22, 18);
writeFileSync(new URL('favicon.ico', raiz), Buffer.concat([cab, p32]));
console.log('✓ favicon.ico');
