# Personas, recorrido y propuesta v3

Objetivo del sitio: que un dueño de negocio **sin sitio** o con un **sitio en mal estado** entienda en segundos qué ofreces, sepa cuánto le costaría y **te escriba por WhatsApp**.

Método: definí tres personas (nivel digital bajo, intermedio y experto) y recorrí la landing v2 con el objetivo de cada una, en celular (390 px) y en escritorio (1440 px). Medí el largo, las palabras y los controles de cada sección con Playwright. Después apliqué los cambios (v3) y volví a medir.

> Las personas son **supuestos de trabajo** basados en el público objetivo de la landing, no entrevistas reales. Lo ideal es validarlas con 3 a 5 clientes o prospectos reales (ver el final del documento).

---

## 1. Las tres personas

| | 🟢 Bajo: **Rosa** | 🟡 Intermedio: **Matías** | 🔵 Experto: **Carolina** |
|---|---|---|---|
| **Quién es** | 52 años, dueña de una peluquería en Quilpué | 38 años, dueño de una cafetería con tienda de granos en Valparaíso | 34 años, jefa de marketing de una clínica dental en Viña del Mar |
| **Situación** | No tiene sitio. Vende por Instagram y WhatsApp. | Tiene un WordPress que le hizo un sobrino: lento, no lo puede editar y el sobrino ya no responde. | Tiene sitio con Elementor. Compara 3 proveedores para rehacerlo. |
| **Dispositivo** | Celular Android, datos móviles | Celular y a veces el computador | Computador del trabajo |
| **Nivel digital** | No conoce términos como hosting, SEO o landing | Conoce "WordPress" y "Google", no los detalles | Conoce SEO, GA4, PageSpeed y Core Web Vitals |
| **Qué quiere** | Saber cuánto cuesta y hablar con una persona | Saber si conviene arreglar o rehacer, y cuánto | Evaluar calidad técnica, plazos, casos y precio, rápido |
| **Qué le frena** | Miedo a que la engañen o a no entender | Miedo a volver a quedar "amarrado" a alguien | Poco tiempo; desconfía de promesas sin pruebas |
| **Éxito** | Envía un WhatsApp con su consulta | Pide el diagnóstico gratis o una cotización | Envía una cotización detallada o agenda una llamada |

---

## 2. Recorrido por la v2 (antes)

### 🟢 Rosa (celular)
1. **Portada:** entiende "no tengo sitio" y toca **Armar mi Sitio Web**. ✅
2. **Cotizador:** llega a una sección de **6,2 pantallas** de alto, con **599 palabras**, **46 botones** y **17 íconos (?)**. Ve a la vez seis tarjetas con descripciones, la lista de incluidos, cinco opciones con precio, el checklist de conversión, el selector Diseño/Wireframe y el de color. ❌ *"No sé por dónde partir."*
3. Palabras como *Landing page*, *Hero*, *Wireframe* o *Checkout* la hacen dudar, aunque tengan (?). ❌
4. Le cuesta encontrar el botón de WhatsApp, que está en la barra de abajo junto a muchos números. ⚠️

**Resultado probable:** abandona o escribe por Instagram.

### 🟡 Matías (celular)
1. **Portada:** toca **Diagnóstico gratis**. ✅
2. **Diagnóstico:** lee "video de 3 min" pero **no queda claro cómo funciona**: qué recibe, cuándo, por dónde y si tiene costo. ❌ Siete chips de síntomas aparecen **antes** de la URL y parecen obligatorios. ⚠️
3. Si baja más, el sitio mide **28,9 pantallas** en celular, con 2.491 palabras. La comparación "Mi enfoque" son tres tarjetas con cuatro puntos cada una: hay que leer todo para entenderla. ⚠️

**Resultado probable:** pide el diagnóstico, pero con dudas.

### 🔵 Carolina (escritorio)
1. **Portada y tecnologías:** ve **51 logos en 3 carruseles**. Le parece relleno, porque ninguna persona domina Go, Rust, Vue, Svelte y Nuxt a la vez, y eso **le resta credibilidad**. ❌
2. **Enfoque:** lo entiende, pero tarda en encontrar la diferencia concreta (plazo, quién lo hace, velocidad). ⚠️
3. **Cotizador:** lo usa bien y valora el precio, el plazo y la vista previa. ✅ El glosario, en una sección de 3,5 pantallas, le estorba al recorrer la página. ⚠️
4. **Casos y garantía:** convencen. ✅

**Resultado probable:** envía la cotización, pero con una impresión algo recargada.

### Hallazgos principales (v2)
| # | Problema | Afecta a | Gravedad |
|---|---|---|---|
| 1 | Cotizador con demasiadas decisiones al mismo tiempo | Rosa, Matías | Alta |
| 2 | El diagnóstico gratis no explica cómo funciona | Matías | Alta |
| 3 | Demasiados logos, algunos poco creíbles | Carolina | Media |
| 4 | "Mi enfoque" lento de leer | Todas | Media |
| 5 | Página muy larga (29 pantallas en celular) y un glosario enorme en medio | Todas | Media |
| 6 | Demasiados (?) compiten por atención | Rosa | Media |
| 7 | Las ondas se ven cortadas entre repeticiones | Todas (percepción de calidad) | Baja |

---

## 3. Propuesta v3 (cambios aplicados)

**Principio:** una decisión a la vez, dos caminos claros (**cotizar** o **diagnóstico**) y el contacto siempre a un toque.

| Hallazgo | Cambio en v3 |
|---|---|
| 1. Cotizador abrumador | **Divulgación progresiva.** Primero se ven solo las 6 metas ("Quiero que me contacten", "Quiero vender productos"…) con su precio "desde". Al elegir una aparecen el resto de los pasos. Lo incluido se muestra como etiquetas cortas y solo hay **2 opciones recomendadas** a la vista; el resto queda en "Ver más opciones". El nombre y el color de la marca son **opcionales y van plegados**. Se quitó el modo Wireframe. El checklist ahora solo muestra **lo que falta**, como botones "+ Agregar". El botón final dice lo que hace: **"Enviar esta cotización por WhatsApp"**. |
| 2. Diagnóstico confuso | Título directo: **"¿Ya tienes sitio? Te digo gratis qué está fallando."** Tres pasos visibles: (1) me dejas la dirección, (2) grabo un video de 3 min, (3) te lo envío por WhatsApp **en 48 horas**, con 3 mejoras concretas. El formulario va sobre fondo blanco, con etiquetas visibles, y los síntomas quedan al final, marcados como **opcionales**. |
| 3. Demasiados logos | **Una sola fila con 12 herramientas conocidas:** Figma, WordPress, React, Next.js, Tailwind CSS, JavaScript, Node.js, Vercel, Google Analytics 4, Search Console, PageSpeed Insights y Claude. El resto sigue en el código (`TECNOLOGIAS_TODAS`) por si quieres cambiar cuáles se muestran. |
| 4. Enfoque lento | **"Mi enfoque, en 10 segundos":** una tabla de 4 filas (plazo, quién lo hace, velocidad y cambios) que compara "Agencia o plantilla ✗" con "Conmigo ✓". |
| 5. Página muy larga | 3 tarjetas de problema en vez de 4, sin párrafo introductorio. El glosario pasa a una **ventana** que se abre desde los (?), las preguntas frecuentes o el pie de página. Las preguntas frecuentes bajan de 10 a 7: se quitaron las de IA, PageSpeed y clientes fuera de Chile, que ya se responden en otras secciones. |
| 6. Demasiados (?) | Quedan solo en términos técnicos del cotizador y en "Claves para vender". Pasaron de 23 a 3 visibles al cargar. |
| 7. Ondas cortadas | Nueva onda **estilo Weav**: tres filas de curvas en S que encajan como tablero, dibujadas como relleno (sin trazos), así que no hay cortes entre repeticiones. |
| Extra: contacto | Nueva franja **"Qué pasa cuando me escribes"**: te respondo yo el mismo día, conversamos 15 minutos y recibes una propuesta cerrada. Quita el miedo a "caer en un embudo de ventas". |
| Extra: menú | Ahora sigue las metas: **Cotizador · Diagnóstico gratis · Cómo trabajo · Trabajos · Preguntas**. |

---

## 4. Antes y después (medido)

Celular de 390 × 844 px, salvo que se indique otra cosa.

| Métrica | v2 | v3 | Cambio |
|---|---:|---:|---:|
| Largo total de la página (celular) | 28,9 pantallas | 18,6 pantallas | **−36 %** |
| Largo total de la página (escritorio) | 14,4 pantallas | 10,1 pantallas | −30 % |
| Palabras en la página | 2.491 | 1.258 | **−49 %** |
| Botones y enlaces en la página | 100 | 46 | −54 % |
| Íconos (?) visibles | 23 | 3 | −87 % |
| Logos de tecnologías | 51 | 12 | −76 % |
| **Cotizador después de elegir la meta:** alto | 6,2 pantallas | 3,3 pantallas | **−47 %** |
| Cotizador: palabras | 599 | 327 | −45 % |
| Cotizador: botones y enlaces visibles | 46 | 19 | −59 % |
| Cotizador: opciones a la vista | 5 | 2 (+3 plegadas) | — |
| Toques mínimos para enviar una cotización | 1 (sin elegir meta) | 2 (meta + enviar) | +1, a propósito: el cliente elige su meta |
| Posición del cotizador en la página | pantalla 10,5 | pantalla 8,3 | Más arriba |

## 5. Recorrido por la v3 (después)

- 🟢 **Rosa** toca "Cotizar en 2 minutos", ve seis frases que entiende ("Quiero que me contacten") con su precio, elige una y en la pantalla siguiente ve su sitio armado, un total y el botón **"Enviar por WhatsApp"**. Si duda, tiene **"Te ayudo gratis por WhatsApp"** a la vista.
- 🟡 **Matías** toca "Ya tengo, pero no funciona", lee los tres pasos del diagnóstico, sabe que es gratis, que llega por WhatsApp en 48 horas y que las mejoras le sirven aunque no contrate. Completa dos campos y envía.
- 🔵 **Carolina** recorre la página en menos pantallas: 12 logos creíbles, la tabla del enfoque en 10 segundos, casos y garantía. En el cotizador abre "Ver más opciones" y envía una cotización con el detalle que necesita.

---

## 6. Qué validar con personas reales

1. **Prueba de 5 segundos:** muestra la portada 5 segundos y pregunta: "¿Qué ofrece este sitio? ¿Qué harías ahora?"
2. **Tarea en el cotizador:** "Cotiza un sitio para tu negocio y envíalo." Mide si lo logra, cuánto se demora y en qué duda.
3. **Diagnóstico:** "¿Qué recibes si pides el diagnóstico? ¿Cuándo? ¿Cuánto cuesta?" Si no lo puede explicar, hay que reescribir.
4. **Analítica cuando esté publicado:** clics en "Enviar esta cotización por WhatsApp", en "Pedir mi diagnóstico gratis" y en el botón flotante, y hasta qué punto de la página bajan las personas.

**Supuestos por confirmar:** el plazo de **48 horas** para el diagnóstico y el **"te respondo el mismo día"** son promesas nuevas de la v3. Ajústalas a lo que puedas cumplir siempre.
