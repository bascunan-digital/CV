# Landing de servicios — bascunan.digital

Prototipo de landing page en un solo archivo (`index.html`): HTML5, Tailwind CSS vía CDN y JavaScript sin dependencias.

## Cómo verla
Abre `index.html` en el navegador (doble clic). No necesita servidor ni instalación.

## Cómo editar precios, plazos y textos
Todo lo que cambia seguido está en el objeto `CONFIG`, al principio del `<script>` final:

- `CONFIG.base`: precio y plazo de "Header + Hero Banner Base".
- `CONFIG.modulos`: nombre, descripción, precio (CLP) y días hábiles de cada sección del cotizador.
- `CONFIG.presets`: combinaciones de "Empieza con:".
- `CONFIG.whatsapp` / `CONFIG.email`: datos de contacto.
- `COMPARATIVA` y `CASOS`: textos de la tabla comparativa y de los casos de éxito.

## Supuestos que debes confirmar
- **Precio base de $250.000 CLP y 3 días hábiles** para "Header + Hero Banner Base". El brief no lo definía.
- **Garantía PageSpeed:** la FAQ promete seguir optimizando sin costo hasta llegar a 90+, midiendo solo las páginas que desarrollas y excluyendo scripts de terceros agregados después.
- **Dominio y hosting no incluidos** en el precio (FAQ).
- **Textos de los casos** (desafío, solución y resultado): los escribí a partir de tu CV. Revísalos.

## Antes de publicar en producción
1. **Compilar Tailwind** en vez de usar el CDN. El CDN compila los estilos en el navegador del visitante, es lento y la propia landing no llegaría a PageSpeed 90+. Con Tailwind CLI: `npx @tailwindcss/cli -i input.css -o styles.css --minify`, y reemplazar el `<script>` del CDN por `<link rel="stylesheet" href="styles.css">`.
2. Autoalojar las fuentes (o usar `font-display: swap`, ya incluido) y agregar imagen Open Graph (`og:image`).
3. Si tienes Calendly o Google Calendar, cambiar el modal "Agendar llamada" por tu enlace de agenda.
4. Agregar analítica (por ejemplo, eventos al hacer clic en "Solicitar este proyecto por WhatsApp").
