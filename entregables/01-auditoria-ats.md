# 1. Auditoría y transformación ATS

## 1.1 Diagnóstico del CV base

### Lo que ya funciona
- **Perfil claro y diferenciador.** Poca gente combina diseño editorial, UX/UI y código en producción. Es tu principal argumento de venta.
- **Proyectos concretos con nombre propio** (DAV Valparaíso, Valeria Estética, Notas Libro de Clases). Los reclutadores confían más en proyectos que se pueden verificar.
- **Una métrica real:** 4.9/5 con 38 reseñas. Es el único dato duro del CV y hay que destacarlo.
- **Contacto completo:** dominio propio, zona horaria y modalidad. Para vacantes remotas en EE.UU. y LATAM la zona horaria UTC-4 suma puntos.

### Problemas detectados (ordenados por impacto)

| # | Problema | Riesgo | Corrección |
|---|----------|--------|------------|
| 1 | **"Más de 10 años"** cuando trabajas desde 2010 (16 años a 2026) | Te estás quitando antigüedad. Algunos ATS filtran por "15+ years" en roles Lead/Staff | Escribe **"15+ años"** |
| 2 | **"Full-Stack & Backend (Vía IA Copilot)"** como título de categoría | Un reclutador técnico puede entender "no sé backend, lo hace la IA". Además el ATS lee "Vía IA Copilot" como ruido | Renombra a **"Backend & Full-Stack (AI-augmented)"** y explica en el resumen que tú decides la arquitectura y revisas el código |
| 3 | **Tres empleos que se solapan** (La Vitamina 2010–hoy, Municipalidad 2012–2023, INACAP 2017–2018) sin decir que eran en paralelo | El ATS suma los años dos veces o marca el CV como incoherente. Un humano sospecha | Indica la modalidad: *"Proyecto paralelo / Part-time"* o *"Contrato por proyecto"* |
| 4 | **Viñetas de tareas, no de resultados** ("Liderazgo del ciclo completo…", "Producción de piezas…") | Los ATS con ranking semántico (Greenhouse, Lever, Workday Skills Cloud) premian verbo + resultado + métrica | Usa la fórmula **Verbo + Qué + Cómo (stack) + Resultado medible** (ver entregable 3) |
| 5 | **Faltan palabras clave que casi todas las vacantes Senior UX/UI Developer piden**: React, TypeScript, Accesibilidad (WCAG), Git, Core Web Vitals, Responsive Design, Usability Testing, Design Tokens | Tu Match Score queda en torno al 46% (ver entregable 2) | Agrega **solo las que puedas defender**. NestJS y Prisma se escriben en TypeScript: si los usaste, puedes listar TypeScript |
| 6 | **Mezcla de español e inglés en las competencias** ("Design Systems", "Prototyping"…) en un CV en español | El ATS no reconoce el término cuando la vacante lo escribe en el otro idioma | Pon los términos en ambos idiomas la primera vez: *"Sistemas de diseño (Design Systems)"*. Para vacantes en EE.UU. prepara un CV 100% en inglés |
| 7 | **"IA Copiloto" en el titular** | Mal entendido, parece un cargo. Ningún ATS busca "IA Copiloto" | Cámbialo por **"AI-Augmented Engineering"**, el término que sí aparece en ofertas |
| 8 | **No aparece "Senior" ni "Lead"** en ningún cargo | Los filtros por seniority te descartan aunque tengas 16 años de experiencia | Escribe *"Senior UX/UI Designer & Front-End Developer"* en La Vitamina, si corresponde a tus responsabilidades reales |
| 9 | **No hay sección de Educación** | Muchos ATS (Workday, SAP SuccessFactors) tienen campo obligatorio y bajan el puntaje si está vacío | Agrega tu título y la institución, aunque sea breve |
| 10 | **No aparecen LinkedIn ni GitHub** | Los reclutadores técnicos los revisan antes que el CV | Agrégalos al encabezado |

### Reglas de formato ATS (ya aplicadas en las versiones finales)
- Una sola columna. Sin tablas, íconos ni texto en encabezados o pies de página de Word.
- Títulos de sección estándar: *Resumen profesional, Experiencia, Proyectos, Habilidades, Educación, Idiomas*.
- Fechas en formato uniforme `MM/AAAA – MM/AAAA` o `AAAA – Presente`.
- Entrega en `.docx` o PDF generado desde texto (nunca un PDF escaneado o exportado como imagen desde Figma).
- Nombre del archivo: `Alonso-Bascunan-Senior-UX-UI-Developer.pdf`.

---

## 1.2 Resumen profesional reescrito

### Versión principal (español)

> **Senior UX/UI Designer & Front-End Developer** con 15+ años llevando productos digitales desde la investigación y el prototipo en Figma hasta el código en producción. Mi base en diseño editorial y museografía me da un manejo fino de la jerarquía visual y la arquitectura de información, y lo aplico a sistemas de diseño, interfaces accesibles y front-end con HTML5, CSS3, JavaScript, Tailwind CSS y WordPress a medida (ACF/SCF).
>
> Uso IA (Claude, Gemini) como **multiplicador de productividad**. Yo defino la arquitectura, los modelos de datos y los criterios de calidad, y el asistente acelera la implementación, que después reviso y pruebo antes de publicar. Con este método entregué productos full-stack en PHP/MySQL y NestJS/Prisma/PostgreSQL, como un motor de reservas con PWA (4.9/5 en 38 reseñas) y una plataforma educativa multi-tenant con JWT y RBAC. Trabajo remoto desde Chile (UTC-4) para clientes de Chile y EE.UU., en español nativo e inglés profesional.

### Versión corta (LinkedIn "Acerca de" / portales con límite de caracteres, ~300)

> Senior UX/UI Designer & Front-End Developer (15+ años). Diseño en Figma y lo llevo a código en producción: design systems, WordPress a medida y apps full-stack (PHP/MySQL, NestJS, PostgreSQL). Uso IA (Claude, Gemini) para multiplicar mi productividad, y la arquitectura la decido yo. Remoto, UTC-4, ES/EN.

### Titular (una línea, encabezado del CV y LinkedIn)

> Senior UX/UI Designer & Front-End Developer · Design Systems · WordPress · AI-Augmented Engineering

### Cómo presentar la IA (y qué evitar)

| ❌ Evitar | ✅ Usar |
|----------|--------|
| "Full-Stack vía IA Copilot" | "Full-stack con ingeniería aumentada por IA: yo defino la arquitectura, la IA acelera la implementación" |
| "La IA escribe el backend" | "Diseño el modelo de datos y las reglas de negocio. Uso IA para generar, refactorizar y probar código que reviso línea por línea" |
| "IA Copiloto" como rol | "AI-Augmented Engineering" o "AI Pair Programming" como competencia |
| Mencionar la IA en todas las viñetas | Mencionarla en el resumen, en 1–2 viñetas con métrica y en Habilidades |

La idea que el reclutador tiene que llevarse: **tú tomas las decisiones de arquitectura y de producto, y la IA te hace más rápido.**

---

## 1.3 Experiencia reescrita (orientada a resultados y palabras clave)

> Las cifras entre `[ ]` son estimaciones que debes validar. Ver entregable 3.

**Senior UX/UI Designer & Front-End Developer** — Agencia La Vitamina · Viña del Mar, Chile (remoto con clientes en EE.UU.)
*2010 – Presente*
- Lidero el ciclo completo de diseño a código (discovery, arquitectura de información, wireframes, prototipos en Figma, front-end y despliegue) en `[40+]` proyectos web para clientes de Chile y EE.UU.
- Creé sistemas de diseño en Figma (componentes, design tokens y guías de uso) que redujeron las iteraciones de desarrollo en `[~30%]` y el tiempo de entrega de nuevas páginas de `[5]` a `[2]` días.
- Desarrollo temas de WordPress a medida con Custom Post Types y ACF/SCF, así los clientes publican contenido sin depender de un desarrollador y bajan sus solicitudes de soporte en `[~50%]`.
- Incorporé Claude y Gemini al flujo de ingeniería (scaffolding, refactorización, pruebas y documentación), con lo que el tiempo de entrega de proyectos full-stack bajó `[~40%]` sin bajar el estándar de revisión de código ni de accesibilidad.
- Optimizo rendimiento y SEO técnico (Core Web Vitals, datos estructurados Schema.org, carga diferida de imágenes) y llevo los sitios a un puntaje Lighthouse de `[90+]`.

**Diseñador Gráfico & Museografía** — Municipalidad de Viña del Mar · Museo Palacio Vergara *(contrato paralelo)*
*2012 – 2023*
- Dirigí la identidad visual y la señalética de `[15+]` exposiciones de gran escala, con un público estimado de `[XX.000]` visitantes al año.
- Produje más de `[200]` piezas digitales e impresas bajo el manual de marca institucional, con cero rechazos en la revisión de normativa gráfica.
- Llevé la jerarquía tipográfica y la composición editorial al diseño de interfaces digitales, la base de mi forma de trabajar la arquitectura de información en UX.

**Docente de Diseño & Comunicaciones** — INACAP, Sede Valparaíso *(part-time)*
*2017 – 2018*
- Diseñé y dicté asignaturas de maquetación web (HTML/CSS) y metodologías de diseño a `[80+]` estudiantes, con evaluación docente de `[X/7]`.
- Actualicé el programa con prácticas de la industria (responsive design, prototipado y flujo de diseño a código).

---

## 1.4 Proyectos reescritos

**DAV Valparaíso — Gobernanza digital y tema WordPress a medida**
- Diseñé el plan de gobernanza digital (roles, accesos, respaldo) y recuperé `[N]` cuentas institucionales perdidas.
- Construí un tema WordPress a medida con Custom Post Types y ACF para que el equipo publique solo.

**Valeria Estética Integral — Motor de reservas full-stack + PWA**
- Construí un sistema de reservas en PHP/MySQL con un panel de administración PWA instalable, que reemplazó la agenda manual y redujo las reservas por WhatsApp en `[~60%]`.
- Implementé SEO local con datos estructurados (Schema.org LocalBusiness): calificación de 4.9/5 con 38 reseñas y `[+X%]` de visibilidad en Google Maps.

**Notas Libro de Clases — Plataforma educativa SaaS multi-tenant**
- Diseñé la arquitectura multi-tenant con aislamiento de datos por colegio, autenticación JWT y control de acceso por roles (RBAC) en NestJS + Prisma + PostgreSQL.
- Diseñé la UX de los flujos docentes (registro de notas, asistencia) y reduje el tiempo de ingreso de notas en `[~X%]` respecto del proceso anterior.
