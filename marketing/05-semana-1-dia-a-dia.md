# 5. Semana 1, día a día

**Meta de la semana:** dejar todo publicado y enviar las primeras 50 conversaciones: 30 con tu red y 20 prospectos.

## Lo que ya está listo
| Material | Dónde está |
|---|---|
| Sitio listo para subir a tu dominio | `landing/entrega/bascunan-digital-sitio.zip` |
| Planilla de prospectos, búsquedas y mensajes | `marketing/prospectos.xlsx` |
| 3 carruseles de Instagram (19 láminas) | `marketing/instagram/01-…`, `02-…` y `03-…` |
| 5 portadas de historias destacadas | `marketing/instagram/destacadas/` |
| Bio, calendario y guiones | `marketing/02-instagram-plan-30-dias.md` |
| Guía de la ficha de Google Maps | `marketing/04-google-business-profile.md` |

---

## Día 1 (lunes) · Fotos y red
**Mañana: fotos (1 hora).**
- **Retrato para el sitio y los perfiles:**
  - con el celular en modo retrato, **vertical**, junto a una ventana con luz natural (sin sol directo);
  - fondo liso (pared clara), polera o camisa lisa (azul, negro o blanco), sonriendo y mirando a la cámara;
  - toma 30 fotos y elige la mejor.
- **3 fotos trabajando:** tú en el computador con Figma o tu sitio abierto, tu escritorio y tus manos en el teclado.
- **Capturas reales de proyectos:** abre cada sitio (Valeria, DAV, Notas) en el computador y en el celular y toma capturas limpias, sin pestañas ni notificaciones.

**Tarde: tu red (1 hora).**
- Envía el mensaje "Tu red" (hoja *Mensajes* de la planilla) a **30 personas, una por una**.
- Pídele a Valeria **un testimonio en video de 30 segundos** y permiso para mostrar el caso.

## Día 2 (martes) · Instagram
- Cambia la foto, el nombre, la bio y el enlace (`02-instagram-plan-30-dias.md`, sección 2.1).
- Sube las **5 portadas de destacadas** y llena cada una con 2 o 3 historias: capturas del sitio, del cotizador y de reseñas.
- **Publica el carrusel 01 "5 señales"** a las 19:00. Texto sugerido:
  > ¿Tu sitio hace alguna de estas? 👀 Guarda este post y revísalo con calma. Si marcaste 2 o más, escríbeme **DIAGNÓSTICO** y te envío un video gratis con 3 mejoras concretas para tu sitio. #DiseñoWeb #Valparaíso #ViñaDelMar #Emprendedores #PymesChile

## Día 3 (miércoles) · Google Maps y prospectos
- Crea la ficha siguiendo `04-google-business-profile.md`, del paso 1 al 5.
- En la planilla, hoja *Búsquedas*, revisa **6 búsquedas** y anota **30 negocios** en la hoja *Prospectos*.
- **Publica el carrusel 02 "¿Cuánto cuesta?"**.

## Día 4 (jueves) · Primeros 20 mensajes
- Envía **20 mensajes** (plantillas A o B), personalizando siempre la primera línea.
- Marca cada uno como "Contactado" y pon la fecha de seguimiento (3 días después).
- Responde a todo el que te escriba en menos de 2 horas.

## Día 5 (viernes) · Diagnósticos y caso Valeria
- Graba los diagnósticos que te hayan aceptado: 20 minutos cada uno (guion en `03-captacion-activa.md`, sección 3.4).
- **Publica el carrusel 03 "Caso Valeria"**.
- Graba el **reel de presentación** (guion 1) para publicarlo el lunes.

## Fin de semana · Revisión (30 minutos)
- Abre la hoja *Resumen* y anota cuántos contactaste, cuántos respondieron y cuántos diagnósticos hiciste.
- Cuando tengas tu foto y tus capturas, reemplaza las simulaciones del sitio (abajo) y publícalo.

---

## Cómo reemplazar las simulaciones del sitio
En la carpeta `landing/img/`, cambia estos archivos por los tuyos, **con el mismo nombre**:

| Archivo | Qué poner | Tamaño ideal |
|---|---|---|
| `alonso.jpg` | Tu retrato vertical | 800 × 1000 px |
| `caso-valeria.jpg` | Captura real del sitio de Valeria (computador + celular) | 1200 × 800 px |
| `caso-dav.jpg` | Captura real del sitio de DAV | 1200 × 800 px |
| `caso-notas.jpg` | Captura real de Notas Libro de Clases | 1200 × 800 px |
| `og.jpg` | Imagen al compartir el enlace (ya está lista, puedes dejarla) | 1200 × 630 px |

**Testimonios:** en `landing/index.html`, busca `var TESTIMONIOS` y cambia los textos de ejemplo por testimonios reales (con permiso del cliente). En cada uno pon el nombre real y `real: true`. Los que no digan `real: true` **no aparecen** en la versión publicada.

Después, en la carpeta `landing/`, ejecuta `npm run build` y luego `npm run zip`, o pídeme que lo haga.

## Cómo publicar en tu dominio (Hostinger, cPanel o similar)
1. Entra al panel de tu hosting → **Administrador de archivos** → carpeta `public_html`.
2. Sube el archivo `bascunan-digital-sitio.zip` y **descomprímelo ahí**. Deben quedar `index.html`, `img/`, `fonts/`, `robots.txt`, `sitemap.xml` y `.htaccess` directamente en `public_html`.
3. Activa el **certificado SSL** gratuito en el panel (en Hostinger: *Seguridad → SSL*).
4. Abre `https://www.bascunan.digital` en el celular y prueba:
   - el cotizador;
   - el botón de WhatsApp;
   - "Agendar llamada", que debe abrir tu Google Calendar.
5. Registra el sitio en **Google Search Console** (verificación por DNS) y envía `sitemap.xml`.
