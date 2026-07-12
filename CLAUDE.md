# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Gerbinguio Victorino's personal portfolio site — a React + TypeScript + Vite SPA. The `/work/*` routes are deliberately styled like an AI chat/workspace product (glass panels, a Claude-style prompt card, a sidebar) as the site's core creative conceit, not a generic template choice — keep that in mind before "fixing" the heavy glassmorphism.

## Commands

```
npm run dev       # start Vite dev server
npm run build     # tsc -b && vite build (type-checks via project references, then bundles)
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test suite/framework configured in this repo.

## Architecture

### Routing (`src/App.tsx`)

Two visual worlds under one router:
- `/` → `Landing.tsx`: a long-scroll marketing page (`Introduction` hero → `AboutMe` → `PromptCTA`).
- `/work/*` → `WorkspaceLayout.tsx` (a persistent sidebar shell) wrapping `ProjectsPage`, `CareerPage`, `ContactPage`. This mimics a SaaS/AI-tool workspace app — sidebar nav on the left, a scrollable glass panel on the right (`<Outlet/>`).

`AmbientBackground` renders once at the App root (fixed, `-z-10`) as a full-site backdrop behind both worlds.

### Theming — CSS variables, not per-component logic

Dark is the site's native/default identity; light is an opt-in alternate. The whole system lives in three places and should be extended there, not by hardcoding new colors in components:

1. **`index.css`**: primitive tokens as bare `R G B` triples in `:root` (light values) and `.dark` (dark values) — e.g. `--bg`, `--ink`, `--ink-muted`, `--accent`, `--accent-deep`, `--glass-fill`, `--glass-shadow`. `.dark` is toggled on `<html>`.
2. **`tailwind.config.js`**: `ink`, `base`, `blue`, `sand` colors are wired to these vars via Tailwind's `rgb(var(--x) / <alpha-value>)` pattern, so `text-ink-700`, `bg-base-900/85`, etc. are theme-reactive automatically.
3. **The `white` core Tailwind color is remapped to `var(--fg-tint)`.** Every `border-white/10`, `bg-white/5` etc. across the app is really "structural tint on top of the current surface," so this one remap retheme's dozens of call sites without touching them. Don't reintroduce raw `bg-[#hex]` or `rgba(255,255,255,...)` for structural UI — use `white/NN`, `base-9xx/NN`, or the `ink`/`blue` scale so it stays theme-aware.

`src/hooks/useTheme.ts` reads/writes the `.dark` class + `localStorage`. `index.html` has a blocking inline script that sets the class before paint (avoids a flash of the wrong theme) — it checks `localStorage` then `prefers-color-scheme`.

**Deliberately NOT theme-reactive** (stay dark-toned in both themes on purpose — treat as intentional, not bugs): the vinyl-record project shelf in `ProjectsPage.tsx` (a physical "record crate" scene) and modal/lightbox scrims (`bg-black/NN` backdrops).

### The `.glass` / `.glass-panel` system (`index.css`)

The site's signature surface treatment. Both classes read `--glass-fill`, `--glass-border`, `--glass-shadow` etc., which flip per theme (light mode leans on shadow for depth per usual light/dark-mode conventions rather than a lighter-on-lighter fill, since a low-opacity white fill that pops on a dark bg is invisible on a light one).

**Gotcha:** `.glass` sets `position: relative` in its own CSS rule, which — because it's declared after Tailwind's utilities in the cascade — silently beats Tailwind's `.absolute` class (`position: absolute`) at equal specificity. Any element combining `absolute` with `glass`/`glass-panel` needs `!absolute` (Tailwind's important-prefix) to actually position correctly. This has caused real, hard-to-spot bugs (e.g. two "positioned" siblings collapsing onto the same spot).

There's also a low-power/mobile override (`@media (max-width: 900px), (pointer: coarse)`) that swaps the live `backdrop-filter` blur for a solid translucent fill (`--glass-fill-lowpower`), since real-time blur is too GPU-heavy on phones.

### Fonts

Self-hosted, not loaded from a CDN — `public/fonts/*.woff2` + `@font-face` in `index.css`, referenced via `fontFamily` in `tailwind.config.js` (`font-sans` = Archivo, `font-display` = Archivo Black, `font-serif` = Bodoni Moda). Archivo was deliberately chosen over more common AI-generated-site defaults (Inter, Outfit, Playfair, etc.) — don't reintroduce those without discussion. To add a font: download the woff2 (Google Fonts variable-font URLs work well for this), drop it in `public/fonts/`, add an `@font-face` block, wire it into `tailwind.config.js`.

**Gotcha:** Tailwind's `bg-[#hex]/NN` arbitrary-value-plus-opacity-modifier syntax does not reliably compile in this project's Tailwind v3 setup — it can silently produce zero CSS (fully transparent, no error). Use `bg-[rgba(r,g,b,a)]` (a literal arbitrary value) instead, or a themed token with the `<alpha-value>` pattern described above.

### Data-driven content

`src/data/projects.ts` and `src/data/career.ts` are the single source of truth for the Projects and Career pages — edit data here, not JSX, when the content changes. `Project.caseStudy` is an ordered array of slides (each with optional `images`) rendered in a Swiper carousel inside `ProjectsPage.tsx`'s case-study modal, with custom-built prev/next buttons (not Swiper's built-in nav UI).

### Dead code to be aware of

`src/components/ui/{button,card,resizable,aspect-ratio}.tsx` and `src/lib/utils.ts` (`cn()`) are unused shadcn/ui scaffolding — nothing in the actual pages imports them. Real components hand-roll Tailwind classes directly rather than using a shared UI-primitive library. Likewise `src/lib/motion.ts` exports shared Framer Motion variants that no page actually imports — each page/section currently defines its own local `fadeInUp`/`stagger*` variants inline instead. Don't assume either of these shared files is the established pattern; check what the specific file you're editing already does.

### Animation

Framer Motion (`framer-motion`) is the animation library used almost everywhere. GSAP is installed and used only by `LoadingScreen.tsx` (the intro letter-by-letter reveal + progress counter) — everything else uses Framer Motion. Match whichever library the surrounding component already uses rather than introducing a third.
