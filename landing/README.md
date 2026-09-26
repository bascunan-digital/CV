# Landing de servicios — bascunan.digital

Prototipo de landing page en un solo archivo (`index.html`): HTML5, Tailwind CSS vía CDN y JavaScript sin dependencias.

Estética: editorial SaaS por bloques de color (cobalto `#2B44FF`, rosa `#FDE8F0`, arena `#FAF8F5`, grafito `#0F172A`), inspirada en el lenguaje visual de sitios como Weav, Framer o Stripe. El código, los textos, las ilustraciones y la onda divisoria son propios: no se reutilizan imágenes, fuentes con licencia ni textos de otros sitios.

## Cómo verla
Abre `index.html` en el navegador (doble clic). No necesita servidor ni instalación.

## Cómo editar precios, plazos y textos
Todo lo que cambia seguido está en el objeto `CONFIG`, al principio del `<script>` final:

- `CONFIG.base`: precio y plazo de "Header + Hero Banner Base".
- `CONFIG.modulos`: nombre, descripción, precio (CLP) y días hábiles de cada sección del cotizador.
- `CONFIG.presets`: combinaciones de "Empieza con:".
- `CONFIG.whatsapp` / `CONFIG.email`: datos de contacto.
- `COMPARATIVA`, `PASOS`, `CASOS` y `FAQS`: textos de la comparativa, del proceso en 5 pasos, de los casos de éxito y de las preguntas frecuentes.

## Supuestos que debes confirmar
- **Precio base de $250.000 CLP y 3 días hábiles** para "Header + Hero Banner Base". El brief no lo definía.
- **Garantía PageSpeed:** la FAQ promete seguir optimizando sin costo hasta llegar a 90+, midiendo solo las páginas que desarrollas y excluyendo scripts de terceros agregados después.
- **Dominio y hosting no incluidos** en el precio (FAQ).
- **Textos de los casos** (desafío, solución y resultado): los escribí a partir de tu CV. Revísalos.

## Versión de producción (`dist/`)

`dist/` es la versión lista para subir al hosting: el mismo sitio, con Tailwind compilado en `dist/styles.css` (46 KB, minificado) en vez del script del CDN. Se ve idéntica al prototipo (comparación píxel a píxel en escritorio y móvil: 0 diferencias).

**Para publicar:** sube el contenido de `dist/` (`index.html` + `styles.css`) a tu hosting.

**Si editas la landing:** edita siempre `index.html` (el prototipo) y vuelve a compilar:

```bash
cd landing
npm install      # solo la primera vez
npm run build    # genera src/tailwind.css, dist/styles.css y dist/index.html
```

Los colores y fuentes (tokens) se editan en un solo lugar: el bloque `<style type="text/tailwindcss">` de `index.html`. La compilación los copia a `src/tailwind.css`, así que no hay que tocar ese archivo.

### Resultado de Lighthouse (móvil, versión `dist/`)

| Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|:-:|:-:|:-:|:-:|
| **98** | **100** | 96 | **100** |

LCP 1,8 s · TBT 0 ms · CLS 0. Medido con Lighthouse 13.5 en un servidor local, así que en tu hosting real puede variar unos puntos según el servidor y la red.

- El 96 de buenas prácticas viene de un error de consola del entorno de prueba (no pudo descargar Google Fonts); en un servidor normal debería desaparecer.
- Para llegar al 100 en accesibilidad subí el contraste de varios textos: el verde de WhatsApp pasó de `#1FAF5A` a `#15803D` (el blanco sobre el verde anterior quedaba en 2,9:1), el rosa sobre cobalto ahora es opaco y los grises chicos tienen al menos 65 % de opacidad.

## Pendiente antes de publicar
1. Si tienes Calendly o Google Calendar, cambiar el modal "Agendar llamada" por tu enlace de agenda.
2. Agregar imagen Open Graph (`og:image`) para que el enlace se vea bien al compartirlo.
3. Agregar analítica (por ejemplo, eventos al hacer clic en "Cotizar este Diseño por WhatsApp").
4. Opcional: autoalojar las fuentes en vez de cargarlas desde Google Fonts.
