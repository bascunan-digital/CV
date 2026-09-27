# Landing de servicios — bascunan.digital

Prototipo de landing page en un solo archivo (`index.html`): HTML5, Tailwind CSS vía CDN y JavaScript sin dependencias.

Estética: editorial SaaS por bloques de color (cobalto `#2B44FF`, rosa `#FDE8F0`, arena `#FAF8F5`, grafito `#0F172A`), inspirada en el lenguaje visual de sitios como Weav, Framer o Stripe. El código, los textos, las ilustraciones y la onda divisoria son propios: no se reutilizan imágenes, fuentes con licencia ni textos de otros sitios.

**Versión 3.** Simplificada a partir de un recorrido con tres personas (nivel digital bajo, intermedio y experto): ver [`ux/personas-y-recorrido.md`](ux/personas-y-recorrido.md).

## Cómo verla
Abre `index.html` en el navegador (doble clic). No necesita servidor ni instalación.

## Simulaciones y publicación
- **Modo simulación** (`CONFIG.modoSimulacion`): en el prototipo (`index.html`) está en `true` y muestra una foto, capturas y testimonios **de ejemplo**, todos marcados como tales. `npm run build` genera `dist/` con `false`: en la versión publicada solo aparecen los testimonios con `real: true`.
- **Imágenes** en `img/`: `alonso.jpg`, `caso-*.jpg` y `og.jpg`. Hoy son referenciales, generadas con `npm run build:imagenes` a partir de `assets-fuente/` (requiere Playwright). Reemplázalas por tus fotos y capturas reales **con el mismo nombre**.
- **Agenda:** `CONFIG.agenda` apunta a tu página de reservas de Google Calendar; el botón "Agendar llamada" la abre, con WhatsApp como alternativa.
- **Fuentes autoalojadas** en `fonts/` (Plus Jakarta Sans y JetBrains Mono, licencia OFL): no depende de Google Fonts.
- **Entrega para tu dominio:** `npm run build && npm run zip` genera `entrega/bascunan-digital-sitio.zip`, con `index.html` (CSS incluido), `img/`, `fonts/`, `robots.txt`, `sitemap.xml` y `.htaccess` (HTTPS, compresión y caché). Los pasos para publicarlo están en `../marketing/05-semana-1-dia-a-dia.md`.

## Cómo editar precios, plazos y textos
Todo lo que cambia seguido está en el objeto `CONFIG`, al principio del `<script>` final:

- `CONFIG`: WhatsApp, correo y `tipoInicial` (por defecto `null`: el cotizador parte con el cliente eligiendo su meta).
- `TIPOS`: los 6 tipos de sitio del cotizador (landing, corporativo, portafolio, tienda, blog, SaaS). Cada uno tiene precio y plazo «desde», secciones incluidas (`incluye`), secciones opcionales con su precio (`extras`, las marcadas con `true` se muestran como «Recomendado para ti» y el resto queda en «Ver más opciones»), el orden en la vista previa y los textos de la portada de muestra.
- `SECCIONES`: nombre, descripción, término del glosario (`ayuda`), sello de conversión (`impacto`) y qué ítem del checklist cumple cada sección (`aporta`).
- `DS`: la maqueta de cada sección en la vista previa. Usa el color (`--marca`) y el nombre que escribe el cliente.
- `CHECKS`: «Claves para vender». Se muestran solo las que el tipo de sitio puede cumplir, y lo que falta aparece como botón «+ Agregar».
- `GLOSARIO`: términos del glosario (se abre en una ventana con `data-abrir-glosario`) y de los íconos (?). Para agregar un (?) en el HTML: `<button type="button" class="ayuda" data-ayuda="clave"></button>`. Úsalos solo en términos técnicos.
- `TEC_VISIBLES`: las 11 tecnologías del carrusel (Figma, HTML5, CSS, JavaScript, PHP, WordPress, Tailwind CSS, GA4, Search Console, PageSpeed y Claude), por nombre. `TECNOLOGIAS_TODAS` tiene 51 logos para elegir (trazos de [Simple Icons](https://simpleicons.org), CC0; si no hay logo, monograma).
- `COMPARATIVA` (tabla «Mi enfoque, en 10 segundos»), `PASOS`, `CASOS`, `SINTOMAS` y `FAQS`: textos de las otras secciones.
- Ondas: `.wave-*` en el CSS (generadas como SVG de relleno, sin costuras).
- Navegación: barra de progreso bajo el menú y subrayado de la sección activa (`.nav-link`, `#progreso`).

## Supuestos que debes confirmar
- **Precios y plazos «desde» de cada tipo de sitio:** landing $190.000 / 3 días, corporativo $390.000 / 7, portafolio $260.000 / 4, tienda $690.000 / 12, blog $420.000 / 6 y SaaS desde $1.500.000 / 25. Se bajaron los cuatro más vendidos para que el precio de entrada sea competitivo; las secciones opcionales suben el ticket (reservas quedó en $190.000). Ajusta en `TIPOS`.
- **Tecnologías del carrusel:** deja solo las que realmente usas; un cliente o reclutador puede preguntar por cualquiera.
- **Promesas nuevas de la v3:** diagnóstico por WhatsApp **en 24 horas** y «te respondo yo, **en pocas horas**».
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
| **100** | **100** | **100** | **100** |

FCP 1,2 s · LCP 1,5 s (celular, servidor local con compresión Brotli como la de un hosting real; sin compresión el rendimiento baja a ~91). Escritorio: 100 en todo. Medido con Lighthouse 13.5.

- Para llegar al 100 en accesibilidad subí el contraste de varios textos: el verde de WhatsApp pasó de `#1FAF5A` a `#15803D` (el blanco sobre el verde anterior quedaba en 2,9:1), el rosa sobre cobalto ahora es opaco y los grises chicos tienen al menos 65 % de opacidad.

## Pendiente antes de publicar
1. Reemplazar `img/alonso.jpg` y `img/caso-*.jpg` por tu foto y capturas reales.
2. Cargar testimonios reales (`TESTIMONIOS`, con `real: true`).
3. Agregar analítica (por ejemplo, eventos al hacer clic en «Enviar esta cotización por WhatsApp»).
