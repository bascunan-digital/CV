// Genera src/tailwind.css con los tokens (@theme) definidos en index.html,
// para que el prototipo y la compilación de producción nunca se desincronicen.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const bloque = html.match(/<style type="text\/tailwindcss">([\s\S]*?)<\/style>/);
if (!bloque) throw new Error('No se encontró el bloque <style type="text/tailwindcss"> en index.html');

const css = `/* Archivo generado por scripts/tokens.mjs: no editar a mano.
   Los tokens se editan en index.html (bloque <style type="text/tailwindcss">). */
@import "tailwindcss" source(none);
@source "../index.html";
@source "../portal.html";
@source "../privacidad.html";
@source "../terminos.html";
@source "../404.html";
${bloque[1].replace(/^\n+|\s+$/g, '').replace(/^ {4}/gm, '')}
`;
writeFileSync(new URL('../src/tailwind.css', import.meta.url), css);
console.log('src/tailwind.css generado');
