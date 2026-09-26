# 5. Preparación para entrevistas — método STAR

> **STAR:** **S**ituación (contexto, 1–2 frases) · **T**area (tu responsabilidad) · **A**cción (lo que hiciste **tú**, 60% de la respuesta) · **R**esultado (métrica + aprendizaje).
> Duración ideal: **90–120 segundos** por respuesta. Adapta los detalles a lo que ocurrió de verdad: estas respuestas son modelos, no guiones para memorizar.

---

## Pregunta 1 — IA y calidad del código (técnica + criterio)

> **"Dices que usas IA para desarrollar backend. ¿Cómo sabes que el código que genera es seguro y correcto? Cuéntame de una vez en que la IA se equivocó."**

**Qué evalúan:** si entiendes el código o solo lo copias. Es la pregunta más importante para tu perfil.

- **S:** En *Notas Libro de Clases*, una plataforma multi-tenant donde cada colegio solo debe ver sus propios datos, usaba Claude para generar los servicios de NestJS con Prisma.
- **T:** Yo era responsable de la arquitectura y de garantizar que ningún colegio pudiera leer datos de otro. Una fuga así en datos de menores es un problema legal, no un simple bug.
- **A:** Al revisar un endpoint de reportes generado por la IA vi que la consulta filtraba por `studentId` pero no por `schoolId`. Funcionaba en las pruebas, pero con un ID manipulado se podían leer notas de otro colegio. No lo parché solo en ese endpoint: **moví el aislamiento a la arquitectura**. El `schoolId` se obtiene del JWT (nunca del request) y lo inyecté en una capa de acceso a datos que agrega el filtro por tenant a todas las consultas. Después escribí tests e2e que intentan leer entre tenants y fallan si lo logran. Desde entonces uso una checklist fija para revisar código generado: autorización, validación de entrada, manejo de errores y consultas N+1.
- **R:** Cero incidentes de acceso entre colegios. Los tests detectaron `[2]` regresiones más en código generado después. Aprendí que la IA acelera la escritura, pero **la responsabilidad del diseño seguro no se delega**: yo defino las reglas y la IA trabaja dentro de ellas.

---

## Pregunta 2 — El perfil híbrido (comportamiento)

> **"Los perfiles que hacen diseño y desarrollo suelen ser buenos en uno y mediocres en el otro. ¿Por qué no es tu caso? Dame un ejemplo concreto en que ser híbrido cambió el resultado."**

**Qué evalúan:** si sabes defender tu propuesta de valor sin ponerte a la defensiva.

- **S:** En La Vitamina, los proyectos para clientes de EE.UU. tenían muchas idas y vueltas entre el diseño en Figma y la implementación: espaciados inconsistentes, componentes que en código no se comportaban como en el prototipo y estados (hover, error, vacío) que nadie había diseñado.
- **T:** Tenía que reducir ese retrabajo sin agregar más reuniones.
- **A:** Como diseño y programo, **armé el design system en Figma pensando en cómo se iba a implementar**: design tokens (color, espaciado, tipografía) con los mismos nombres que la configuración de Tailwind, componentes con variantes que correspondían a props reales y todos los estados diseñados desde el inicio. El handoff dejó de ser un PDF con anotaciones y pasó a ser un sistema compartido.
- **R:** El retrabajo entre diseño y código bajó `[~30%]` y una landing nueva pasó de `[5]` a `[2]` días. Mi respuesta a la pregunta: **no reemplazo a un especialista de 10 personas, soy el puente entre diseño e ingeniería**. En un equipo, eso significa handoffs sin pérdidas y decisiones de diseño que se pueden implementar.

---

## Pregunta 3 — Arquitectura multi-tenant (técnica profunda)

> **"En tu plataforma educativa, ¿por qué elegiste ese modelo de aislamiento multi-tenant? ¿Qué alternativas descartaste y qué harías distinto con 1.000 colegios?"**

**Qué evalúan:** si dominas los trade-offs o solo repites lo que sugirió la IA.

- **S:** *Notas Libro de Clases* partió con pocos colegios, con presupuesto limitado y un solo desarrollador (yo, con IA como apoyo).
- **T:** Tenía que elegir entre tres modelos: **base de datos por colegio**, **schema por colegio** o **tablas compartidas con columna `schoolId`**.
- **A:** Evalué los tres:
  - *Base de datos por colegio:* máximo aislamiento, pero caro de operar y las migraciones se multiplican.
  - *Schema por colegio:* buen aislamiento, pero Prisma no lo soporta bien de forma nativa y complica el pooling de conexiones.
  - *Tablas compartidas con `schoolId`:* simple y barato, pero **si falta un filtro, hay fuga de datos**.

  Elegí tablas compartidas, con el `schoolId` sacado del JWT, un filtro por tenant aplicado en la capa de acceso a datos, índices compuestos (`schoolId` + clave) y RBAC por rol (admin, docente, apoderado). La IA me ayudó a comparar opciones y a generar el boilerplate. **La decisión la tomé yo** con los criterios de costo, equipo y riesgo.
- **R:** El sistema funciona con `[N]` colegios y el costo de infraestructura es mínimo. **Con 1.000 colegios** agregaría *Row-Level Security* de PostgreSQL como segunda línea de defensa (así la base de datos rechaza una consulta sin tenant aunque la aplicación falle) y evaluaría llevar a los clientes grandes a una base de datos dedicada.

---

## Pregunta 4 — Conflicto con un stakeholder (comportamiento)

> **"Cuéntame de una vez en que un cliente o stakeholder insistió en algo que perjudicaba la experiencia de usuario. ¿Cómo lo manejaste?"**

**Qué evalúan:** influencia sin autoridad y decisiones basadas en datos.

- **S:** En el motor de reservas de *Valeria Estética Integral*, la dueña quería que el formulario de reserva pidiera `[8]` datos obligatorios (dirección, fecha de nacimiento, cómo nos conoció, etc.) para "tener la base de clientes completa".
- **T:** Mi tarea era que el sistema generara reservas. Un formulario largo en móvil iba a aumentar el abandono.
- **A:** No le discutí la opinión. **Le propuse medir**: publicamos una versión corta (nombre, teléfono, servicio, horario) y dejamos los datos adicionales como un paso opcional *después* de confirmar la reserva, en el panel PWA. Le mostré en Analytics cuántas personas abandonaban el formulario y en qué campo. Así cuidamos su objetivo (la base de datos) y el del usuario (reservar rápido).
- **R:** El formulario corto convirtió `[~35%]` mejor, y `[~60%]` de las clientas completaron los datos opcionales después. El negocio llegó a 4.9/5 en 38 reseñas. Aprendí que **con los stakeholders funciona mejor proponer un experimento que imponer una opinión**.

---

## Pregunta 5 — Brecha de stack (autoconocimiento + velocidad de aprendizaje)

> **"Tu experiencia principal es WordPress y PHP. Nuestro producto está en React y TypeScript. ¿Por qué deberíamos creer que vas a rendir desde el primer mes?"**

**Qué evalúan:** honestidad, capacidad de aprendizaje y si la IA te hace aprender o te hace depender.

- **S:** Hasta `[2023]` mi stack era WordPress y PHP. Para *Notas Libro de Clases* necesitaba un backend tipado, multi-tenant y con autenticación robusta, algo que nunca había hecho.
- **T:** Tenía que aprender NestJS, TypeScript, Prisma y PostgreSQL mientras entregaba un producto funcional, sin equipo senior que me revisara.
- **A:** Usé la IA **como tutor, no como piloto automático**. Primero le pedía que me explicara el patrón (inyección de dependencias, guards, decoradores de NestJS) y recién después generaba código, que leía y modificaba. Mantuve un documento de decisiones de arquitectura (ADR) y escribí yo los tests críticos para asegurarme de entender el comportamiento. React y TypeScript comparten la base: los componentes ya los pienso así desde Figma, y el tipado lo uso a diario en NestJS.
- **R:** Llegué a una plataforma en producción con JWT y RBAC en `[N]` meses. Para su stack propongo algo concreto: **en las primeras 2 semanas, un PR real en su base de código en React**, y en el primer mes, ser la persona que conecta su design system en Figma con los componentes en código. *(Consejo: antes de la entrevista, publica en GitHub un proyecto pequeño en React + TypeScript + Tailwind para mostrarlo.)*

---

## Preguntas que tú debes hacer al final

1. "¿Cómo funciona hoy el handoff entre diseño e ingeniería, y dónde se pierde más tiempo?"
2. "¿Tienen un design system? ¿Quién es responsable de él en Figma y en código?"
3. "¿Cuál es la política del equipo sobre herramientas de IA en el desarrollo?"
4. "¿Cómo medirían que tuve éxito en este cargo a los 90 días?"
