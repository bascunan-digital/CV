# Checklist de lanzamiento (20 puntos)

Estado de cada punto de la lista, dónde quedó y qué te toca hacer.
✅ = listo · 🟡 = listo, pero necesita un dato o una acción tuya.

| # | Punto | Estado | Qué se hizo | Qué te toca |
|---|---|:-:|---|---|
| 1 | Política de privacidad | ✅ | `privacidad.html`: responsable, datos que se recogen, finalidad, proveedores (WhatsApp, Google, Supabase y hosting), cookies, plazos de conservación y derechos según las leyes 19.628 y 21.719. Enlazada en el pie de página, el portal y el aviso de cookies. | Revisarla. Es un modelo base: idealmente, que la mire un abogado. |
| 2 | Términos y condiciones | 🟡 | `terminos.html`: cotizaciones, pagos, plazos, revisiones, propiedad, garantía de PageSpeed, mantención, portal y ley chilena. | Confirmar los **supuestos**: pago 50 % y 50 %, dos rondas de ajustes y aviso de 30 días para cancelar la mantención. |
| 3 | API y secretos | ✅ | No hay claves secretas en el código. El portal usa solo la *anon key* de Supabase, que es pública por diseño y está protegida con reglas de seguridad por usuario. `.gitignore` excluye `.env`. | Nunca compartas la *service_role key* (detalle en `portal/README.md`). |
| 4 | Forzar HTTPS | ✅ | `.htaccess` redirige a HTTPS y agrega HSTS y cabeceras de seguridad (nosniff, frame, referrer, permisos). | Activar el SSL en tu hosting **antes** de subir el sitio. |
| 5 | Aviso de cookies | 🟡 | `sitio.js`: aviso con "Aceptar" y "Rechazar". Google Analytics **solo se carga si la persona acepta**. Se puede cambiar la elección desde la política de privacidad. | Aparece al configurar el punto 19; sin analítica no hay cookies y no se muestra. |
| 6 | Metadescripciones | ✅ | Todas las páginas tienen descripción propia de menos de 160 caracteres, título corto y enlace canónico. | — |
| 7 | Vista previa del enlace | ✅ | Etiquetas Open Graph y Twitter con imagen `img/og.jpg` (1200 × 630), texto alternativo, idioma y nombre del sitio. | Tras publicar, pruébalo pegando el enlace en WhatsApp. |
| 8 | Favicon | ✅ | `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, íconos 192/512 y `site.webmanifest` (se puede instalar como app). | — |
| 9 | Sitemap y robots.txt | ✅ | `sitemap.xml` con inicio, privacidad y términos. `robots.txt` apunta al sitemap. El portal y la 404 llevan `noindex`. | Enviar el sitemap en Google Search Console. |
| 10 | Texto alternativo en imágenes | ✅ | Auditoría automática: 0 imágenes sin `alt`. Las decorativas usan `alt=""`. | Al cambiar las fotos, mantén textos descriptivos. |
| 11 | Comprimir imágenes | ✅ | Versiones WebP entre 55 y 60 % más livianas, con JPG de respaldo (`<picture>`). Carga diferida bajo la portada. Script `npm run build:optimizar`. | Al reemplazar tus fotos, vuelve a ejecutar el script (o pídemelo). |
| 12 | Velocidad de carga | ✅ | Lighthouse en celular: **99 a 100** en rendimiento en las 5 páginas, LCP de 1,1 a 1,7 s (con compresión como en el hosting). CSS dentro del HTML, fuentes propias y caché. | — |
| 13 | Contraste de colores | ✅ | Accesibilidad **100** en las 5 páginas (incluye contraste y áreas táctiles de 24 px). | — |
| 14 | Web en celular | ✅ | Revisado de 320 a 1920 px, sin desbordes. Se corrigió el correo del encabezado del portal, que se salía en celular. | — |
| 15 | Página 404 | ✅ | `404.html` con 3 atajos (inicio, cotizador y WhatsApp), activada en `.htaccess` y funcional desde cualquier ruta. | — |
| 16 | Enlaces rotos | ✅ | Auditoría de las 5 páginas: 0 enlaces internos rotos, 0 anclas inexistentes y 0 ids duplicados. **Se encontró y corrigió un error:** un id repetido hacía que las tarjetas de secciones opcionales del cotizador no respondieran al clic. | Probar a mano los enlaces externos (WhatsApp, Maps, Calendar) una vez publicado. |
| 17 | Validar formularios | ✅ | Diagnóstico (dirección válida y nombre), llamada (nombre) y portal (correo, contraseña de 8+ caracteres, teléfono y aceptación de términos). Mensajes claros y campos marcados para lectores de pantalla. | — |
| 18 | Protección anti-spam | ✅ | Campo trampa invisible en los 3 formularios, bloqueo de envíos en menos de 3 s en el registro, confirmación por correo y límites de Supabase. Los formularios de contacto abren WhatsApp, así que no hay un servidor que spamear. | Si aparecen cuentas falsas, activar CAPTCHA en Supabase. |
| 19 | Analytics (Google Tag Manager) | ✅ | Conectado en `sitio.js` con tu contenedor `GTM-MHZWSXLZ`, con estos eventos al dataLayer: **generate_lead** (cotizador, diagnóstico y planes de mantención), **agendar_llamada**, **contacto_whatsapp**, **select_content** (tipo de sitio elegido), **ir_portal** y **sign_up**. Se carga solo si la persona acepta las cookies. | Si quieres medir visitas y no solo eventos, crea una propiedad GA4 y agrega una etiqueta de configuración de GA4 dentro de Tag Manager (Variables → Nueva → ID de medición). |
| 20 | Llamado a la acción claro | ✅ | Cada sección termina en una acción: cotizar, pedir diagnóstico, agendar, elegir un plan o crear una cuenta. Todas llevan a WhatsApp, a tu agenda o al portal. | — |

## Novedades de esta versión
- **Planes de mantención** (sección `#mantencion` y en el menú): Esencial **$25.000**, Crecimiento **$45.000** (destacado) y Pro **$75.000** al mes, sin permanencia. *Los precios son supuestos: ajústalos en `PLANES` de `index.html`.*
- **Portal de clientes** (`portal.html`), con enlace "Ingresar" en el menú y una sección en la landing:
  - el cliente crea su cuenta y completa los datos de su negocio;
  - escribe sus textos con guías y sube su logo, fotos y documentos;
  - ve la etapa de su proyecto y te avisa por WhatsApp cuando sube material.
- **Portal en modo demostración** hasta conectar Supabase (gratis, unos 20 minutos, guía en `portal/README.md`).

## Resultado de Lighthouse (celular, con compresión)
| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|:-:|:-:|:-:|:-:|
| Inicio | 99 | 100 | 100 | 100 |
| Privacidad | 100 | 100 | 100 | 100 |
| Términos | 100 | 100 | 100 | 100 |
| Portal | 100 | 100 | 100 | *noindex* |
| 404 | 100 | 100 | 100 | *noindex* |

*El portal y la 404 no se indexan a propósito, por eso Lighthouse no les da SEO completo.*
