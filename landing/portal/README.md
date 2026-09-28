# Portal de clientes: cómo activarlo

`portal.html` permite que tus clientes creen una cuenta, completen los datos y textos de su sitio y suban su logo, fotos y documentos. Tú ves todo desde el panel de Supabase.

Mientras no lo conectes, funciona en **modo demostración**: guarda los datos solo en el navegador de quien lo usa y no sube archivos.

## Por qué Supabase
Tu sitio es estático (HTML), así que las cuentas y los archivos necesitan un servicio aparte. Supabase entrega todo lo necesario:

| Necesidad | Qué usa en Supabase |
|---|---|
| Registro, ingreso y recuperación de contraseña | Auth |
| Datos del proyecto | Base de datos Postgres |
| Archivos | Storage privado |

El plan gratuito alcanza de sobra para partir. Revisa los límites vigentes en supabase.com/pricing.

## Estado de tu proyecto `bascunan-portal`
- ✅ Proyecto creado (región São Paulo) y `supabase.sql` ejecutado.
- ✅ Revisado por SQL:
  - tabla, seguridad por usuario (RLS), permisos por columna, bucket privado `recursos` y creación automática del proyecto al registrarse;
  - prueba simulada: el cliente edita lo suyo, no ve lo ajeno, no cambia su etapa y no lee tus notas.
- ✅ Revisor de seguridad de Supabase: **0 avisos**, después de endurecer las funciones.
- ✅ `portal.html` conectado (URL del proyecto y clave pública *publishable*).
- ✅ **Authentication → URL Configuration:** Site URL y Redirect URL en `https://www.bascunan.digital/portal.html`.
- ⏳ Te falta: conectar el SMTP de `hola@bascunan.digital` y, recién ahí, pegar los correos en español. Supabase no deja editar las plantillas sin un SMTP propio (ver [`correos.md`](correos.md)).

## Paso a paso (20 minutos)
1. Crea una cuenta en **supabase.com** con tu Gmail → **New project**:
   - **Nombre:** `bascunan-portal`.
   - **Contraseña de la base de datos:** una segura. Guárdala en tu gestor de contraseñas.
   - **Región:** la más cercana disponible, por ejemplo São Paulo (South America).
2. Ve a **SQL Editor → New query**, pega todo el contenido de `supabase.sql` y presiona **Run**. Crea la tabla, la seguridad por usuario y el bucket privado `recursos`.
3. Ve a **Authentication → URL Configuration**:
   - **Site URL:** `https://www.bascunan.digital/portal.html`
   - **Redirect URLs:** agrega también `https://www.bascunan.digital/portal.html`
4. En **Authentication → Emails**, traduce al español los correos de "Confirm signup" y "Reset password" (asunto y texto).
   > El servicio de correo incluido en Supabase tiene un límite bajo de envíos. Cuando tengas más clientes, conecta un SMTP propio en **Authentication → SMTP Settings** (por ejemplo, Resend o Brevo).
5. Ve a **Project Settings → API** y copia:
   - **Project URL** → en `portal.html`, variable `SUPABASE_URL`;
   - **anon public key** → variable `SUPABASE_ANON_KEY`.
6. Ejecuta `npm run build && npm run zip` y sube el sitio. Listo: el aviso de "modo demostración" desaparece.

## Cómo lo usas tú (administración)
- **Ver clientes y textos:** Table Editor → `proyectos`.
- **Ver y descargar el material que sube el cliente:** Storage → `recursos` → carpeta de cada cliente (el nombre de la carpeta es su `user_id`) → `logo/`, `fotos/` u `otros/`.
- **Mover un proyecto de etapa:** en la tabla, cambia la columna `etapa` a `material`, `diseno`, `desarrollo`, `revision` o `publicado`. El cliente lo ve al recargar su portal.
- **Notas privadas:** columna `notas_internas`. El cliente no puede verla.
- **Te avisan por WhatsApp:** el cliente tiene el botón "Avisarle a Alonso que subí material".

### El portal ya es de dos sentidos: tú también le entregas cosas al cliente
- **Escribirle una novedad o pedirle algo puntual:** en Table Editor → `proyectos`, columna **`mensaje_etapa`** (máx. 600 caracteres). Aparece como una tarjeta destacada arriba de las etapas, en su portal. Bórralo (déjalo vacío) cuando ya no aplique.
- **Pasarle el link de Figma:** columna **`enlace_diseno`**. Aparece como un botón "Ver mi diseño en Figma →".
- **Pasarle el link del sitio en desarrollo o revisión:** columna **`enlace_preview`**. Aparece como un botón "Ver mi sitio en desarrollo →".
- **Entregarle un archivo** (cotización, manual, lo que sea): Storage → `recursos` → su carpeta (`user_id/`) → crea ahí la subcarpeta **`entregas`** (si no existe) y sube el archivo. Aparece automáticamente en su portal, en "4 · Documentos que te entregó Alonso" — el cliente solo puede verlo y descargarlo, no puede borrarlo (así quedó protegido en `supabase.sql`).

Con esto el portal queda como el centro único de todo el proyecto: lo que el cliente te da (textos, logo, fotos, documentos) y lo que tú le entregas (avisos, diseño, preview, documentos) viven en el mismo lugar, sin que se pierda nada por WhatsApp.

## Seguridad (API y secretos)
- La **anon key** es pública por diseño: va en el HTML y no da acceso a nada por sí sola. La seguridad la ponen las políticas **RLS** de `supabase.sql`:
  - cada cliente solo lee y edita **su** proyecto y **su** carpeta de archivos;
  - no puede cambiar su etapa ni ver tus notas.
- **Nunca** pongas la **service_role key** (ni ninguna otra clave secreta) en el HTML, en GitHub ni en un chat. Si alguna se expone, rótala en Project Settings → API.
- Los archivos se abren con enlaces firmados que vencen a los 5 minutos.
- Límites: 10 MB por archivo, solo imágenes, PDF y Word, y textos con largo máximo.
- **Anti-spam en el registro:**
  - campo trampa invisible y bloqueo de envíos en menos de 3 segundos;
  - confirmación por correo y límites de intentos de Supabase;
  - si aparecen cuentas falsas, activa **CAPTCHA** (Cloudflare Turnstile) en Authentication → Attack Protection.

## Aviso legal
El portal guarda datos personales (nombre, correo, WhatsApp) y archivos de tus clientes. Ya están declarados en `privacidad.html`. Si cambias de proveedor o agregas funciones, actualiza esa página.
