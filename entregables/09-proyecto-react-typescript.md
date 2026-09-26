# 9. Proyecto React + TypeScript para cerrar la brecha del CV

## 9.1 Objetivo

Tener en GitHub, en **3 semanas** (~10–15 h por semana), un proyecto público que demuestre las competencias que hoy le faltan al CV para vacantes *Senior UX/UI Developer*:

| Brecha (entregable 2) | Cómo la cubre el proyecto | Puntos de Match Score |
|---|---|:-:|
| React | Toda la librería y la demo | +3 |
| Accesibilidad / WCAG | Componentes accesibles + tests automáticos con axe | +3 |
| Storybook | Documentación de componentes publicada | +1 |
| Design Tokens | Tokens exportados desde Figma → CSS/Tailwind | Refuerza |
| TypeScript, Git | Tipado estricto, historial de commits limpio, CI | Refuerza |
| Next.js (opcional, fase 4) | Demo en Next.js | +1 |

Además, el proyecto **conecta con tu historia**: es la evolución en React del panel de reservas de Valeria Estética. En entrevista no parece un ejercicio de curso, sino un producto que ya conoces.

---

## 9.2 Concepto: **Agenda UI**

> Un design system en React + TypeScript, documentado en Storybook, con un panel de reservas de demostración construido encima.

**Dos piezas en un solo repositorio:**
1. **Librería de componentes** (`src/components`): 16 componentes accesibles con design tokens.
2. **App demo** (`src/app`): un panel de reservas para un centro de estética ficticio, con agenda semanal, formulario de reserva, lista de clientas y modo oscuro.

Así cubres las dos cosas que se evalúan en un UX/UI Developer: **sistema** (reusabilidad, tokens, documentación) y **producto** (un flujo real con UX bien resuelta).

---

## 9.3 Stack

| Capa | Herramienta | Por qué |
|---|---|---|
| Build | **Vite** | Arranque rápido, estándar actual para librerías y SPA |
| UI | **React 19 + TypeScript** (modo `strict`) | Las dos palabras clave con más peso |
| Estilos | **Tailwind CSS v4** con tokens como variables CSS | Ya lo dominas. Los tokens en CSS habilitan el modo oscuro |
| Primitivas accesibles | **Radix UI** (solo Dialog, Select, Tabs, Toast) | Así no reinventas el foco ni el teclado en componentes complejos. Saber cuándo no construir desde cero también es criterio senior |
| Tokens | **Tokens Studio (Figma) → Style Dictionary** | Demuestra el puente Figma → código, tu diferenciador |
| Formularios | **React Hook Form + Zod** | Validación tipada, patrón muy pedido |
| Documentación | **Storybook** + addon de accesibilidad | Palabra clave directa y vitrina visual |
| Tests | **Vitest + Testing Library + vitest-axe** | Tests de comportamiento y de accesibilidad |
| Calidad | ESLint, Prettier, `tsc --noEmit` | |
| CI/CD | **GitHub Actions** (lint, typecheck, test, build) + **Vercel** (demo) + **GitHub Pages o Chromatic** (Storybook) | Enlaces públicos para el CV |

---

## 9.4 Alcance

### Componentes (en orden de construcción)

| Nivel | Componentes |
|---|---|
| **Base** | Button, IconButton, Badge, Card, Avatar, Spinner |
| **Formulario** | Input, Textarea, Checkbox, Switch, Select (Radix), FormField (label + ayuda + error) |
| **Overlays y navegación** | Dialog (Radix), Toast (Radix), Tabs (Radix) |
| **Datos** | Table (ordenable, con estado vacío y de carga) |

**Criterio de "terminado" por componente:**
- [ ] Props tipadas y documentadas (JSDoc) y variantes definidas con `cva` o similar.
- [ ] Todos los estados: default, hover, focus-visible, active, disabled, error, loading y vacío cuando aplique.
- [ ] Uso completo con teclado y foco visible.
- [ ] Contraste AA en modo claro y oscuro.
- [ ] Story en Storybook con controles y todas sus variantes.
- [ ] Test de comportamiento + test con axe sin violaciones.

### App demo: panel de reservas

1. **Agenda semanal:** grilla de 7 días × horarios, reservas como bloques, navegación entre semanas y vista de día en móvil.
2. **Nueva reserva:** Dialog con formulario (clienta, servicio, fecha, hora, notas), validación con Zod y detección de choque de horarios.
3. **Clientas:** tabla con búsqueda, orden y estado vacío.
4. **Modo oscuro:** alternado con los tokens y persistido en `localStorage`.
5. **Datos:** mock local (JSON + estado en React). Sin backend: el foco es el front-end.

### Fuera de alcance (a propósito)
Backend real, autenticación, pagos y i18n. Si te preguntan, la respuesta es: *"Lo dejé fuera para enfocar el proyecto en el design system; el backend real lo muestro en Notas Libro de Clases."*

---

## 9.5 Estructura del repositorio

```
agenda-ui/
├── .github/workflows/ci.yml       # lint + typecheck + test + build en cada PR
├── .storybook/                    # configuración de Storybook
├── docs/
│   ├── adr/                       # decisiones de arquitectura (ADR)
│   │   ├── 001-radix-para-overlays.md
│   │   ├── 002-tokens-como-variables-css.md
│   │   └── 003-uso-de-ia-en-el-desarrollo.md
│   └── case-study.md              # caso de estudio para portafolio y LinkedIn
├── tokens/
│   ├── figma-tokens.json          # exportado desde Tokens Studio
│   └── style-dictionary.config.js
├── src/
│   ├── styles/
│   │   └── tokens.css             # generado: variables CSS (claro/oscuro)
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.test.tsx
│   │   └── ...
│   ├── app/                       # panel de reservas (demo)
│   │   ├── features/agenda/
│   │   ├── features/bookings/
│   │   ├── features/clients/
│   │   └── App.tsx
│   └── lib/                       # utilidades (fechas, cn(), etc.)
├── README.md
└── package.json
```

---

## 9.6 Plan por semanas

### Semana 1: fundamentos y tokens
- [ ] Crear el repo, configurar Vite + React + TS strict + Tailwind + ESLint + Prettier.
- [ ] Definir tokens en Figma (color, tipografía, espaciado, radios, sombras) con Tokens Studio, en modo claro y oscuro.
- [ ] Pipeline Style Dictionary → `tokens.css` → configuración de Tailwind.
- [ ] Storybook + addon a11y. CI en GitHub Actions.
- [ ] Componentes base: Button, IconButton, Badge, Card, Avatar, Spinner.
- [ ] **Post LinkedIn #1:** "Tokens de Figma a código en 1 paso" (con capturas).

### Semana 2: formularios, overlays y tests
- [ ] Input, Textarea, Checkbox, Switch, Select, FormField.
- [ ] Dialog, Toast, Tabs, Table.
- [ ] Tests con Vitest + Testing Library + axe en todos los componentes.
- [ ] Publicar Storybook (GitHub Pages o Chromatic).
- [ ] **Post LinkedIn #2:** "Checklist de accesibilidad para cada componente".

### Semana 3: app demo y presentación
- [ ] Agenda semanal, formulario de reserva con Zod, tabla de clientas y modo oscuro.
- [ ] Responsive (vista de día en móvil) y Lighthouse 90+ en todas las categorías.
- [ ] Publicar la demo en Vercel.
- [ ] README completo con capturas, GIF y enlaces. Caso de estudio en `docs/case-study.md`.
- [ ] **Post LinkedIn #3:** lanzamiento con GIF de la demo.

### Fase 4 (opcional, +1 semana): Next.js
- [ ] Migrar la demo a Next.js (App Router) para sumar la palabra clave. La librería no cambia.

---

## 9.7 Uso de IA en el proyecto (y cómo mostrarlo)

Esto es **parte de la vitrina**: demuestra tu posicionamiento de "IA como multiplicador, criterio propio".

- **Tú escribes:** tokens, API de cada componente (props y variantes), arquitectura de carpetas, ADRs y los tests de accesibilidad críticos.
- **La IA acelera:** boilerplate de stories y tests, variantes repetitivas, refactorizaciones y la primera versión de la documentación.
- **Documenta en `docs/adr/003-uso-de-ia-en-el-desarrollo.md`:** qué delegaste, qué revisaste y **un ejemplo concreto de algo que la IA hizo mal y corregiste** (por ejemplo, un Dialog sin retorno de foco o un contraste insuficiente). En entrevista, ese ejemplo vale más que todo el resto.
- **Commits pequeños y descriptivos.** El historial de Git es lo que revisa un Engineering Manager.

---

## 9.8 Plantilla de README del proyecto

```markdown
# Agenda UI

Design system en React + TypeScript con tokens sincronizados desde Figma,
documentado en Storybook y probado para accesibilidad (WCAG 2.2 AA).
Incluye un panel de reservas de demostración construido con la librería.

🔗 Demo: https://agenda-ui.vercel.app · 📚 Storybook: https://[usuario].github.io/agenda-ui
🎨 Figma: [enlace público al archivo]

![GIF de la demo](docs/demo.gif)

## Qué demuestra
- Design tokens de Figma → Style Dictionary → variables CSS → Tailwind (modo claro/oscuro)
- 16 componentes accesibles: teclado, foco visible, ARIA, contraste AA
- Tests de comportamiento y accesibilidad (Vitest, Testing Library, axe) en CI
- Un flujo de producto real: agenda, reservas con validación y detección de choques

## Stack
React 19 · TypeScript · Tailwind CSS · Radix UI · React Hook Form · Zod · Storybook · Vitest · GitHub Actions · Vercel

## Decisiones de arquitectura
Ver [docs/adr](docs/adr).

## Desarrollo
npm install · npm run dev · npm run storybook · npm test
```

---

## 9.9 Cómo incorporarlo al CV cuando esté listo

**Proyecto (ES):**
> **Agenda UI** — *Design system en React + panel de reservas*
> React · TypeScript · Tailwind CSS · Storybook · Radix UI · Vitest
> Design system de 16 componentes accesibles (WCAG 2.2 AA) con tokens sincronizados desde Figma, documentado en Storybook y con tests automáticos de accesibilidad en CI. Incluye un panel de reservas con agenda semanal y validación tipada con Zod. [Demo] · [Storybook] · [GitHub]

**Project (EN):**
> **Agenda UI** — *React design system + booking dashboard*
> React · TypeScript · Tailwind CSS · Storybook · Radix UI · Vitest
> 16-component accessible design system (WCAG 2.2 AA) with Figma-synced design tokens, documented in Storybook and covered by automated accessibility tests in CI. Includes a booking dashboard with a weekly calendar and Zod-typed validation. [Demo] · [Storybook] · [GitHub]

**Cambios en el resto de los materiales:**
- CV → Habilidades: agregar **React, Storybook, Radix UI, Vitest, Zod**.
- LinkedIn → titular: "WordPress · TypeScript · Tailwind" → **"React · TypeScript · Tailwind"**. Aptitudes fijadas: agregar **React.js**.
- Match Score estimado para Senior UX/UI Developer: de ~88% a **~96%** (React +3, Storybook +1; Next.js +1 más con la fase 4).
