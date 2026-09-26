# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Gerbinguio Victorino's personal portfolio site — a React + TypeScript + Vite single-page portfolio. Minimal, project-focused, white by default with a dark mode, and restrained glassmorphism. (The previous dark "AI workspace" version with `/work/*` routes lives on `main`; this branch is the one-page redesign.)

## Commands

```
npm run dev       # start Vite dev server
npm run build     # tsc -b && vite build (type-checks via project references, then bundles)
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test suite/framework configured in this repo.

## Architecture

### One page, no router (`src/App.tsx`)

`Navbar` + `<main>`: `Hero` → `Work` → `Capabilities` → `Experience` → `About` → `Contact` (footer lives inside Contact). Sections have ids (`#work`, `#experience`, `#about`, `#contact`) and the nav scrolls to them. Case studies open in a shadcn `Dialog` (`ProjectDialog`) addressed by `?project=<slug>` (`useProjectParam`), not routes.

`src/main.tsx` rewrites legacy URLs from the old site (`/work/projects?p=slug`, `/work/career`, `/work/contact`) onto `/?project=slug#section`, so old links keep working. `vercel.json` rewrites everything to `index.html`.

### Components

- `src/components/ui/*` — shadcn/ui primitives (button, badge, dialog, sheet, separator, input/textarea), customized: `rounded-md` buttons/badges, no pills.
- `src/components/portfolio/*` — the page sections. `Work.tsx` composes layouts from each project's `tier`: one `featured` (large image + glass meta overlay + build thumbnails), `selected` projects as alternating image/copy rows (`ProjectMedia` picks single / overlapping pair / triptych from `gallery` length), `compact` projects in a grid.
- `src/lib/project.ts` — project helpers (`projectOutcome`, `projectVisuals`, `linkHost`).

### Data-driven content

`src/data/projects.ts`, `src/data/career.ts`, `src/data/profile.ts` are the single source of truth — edit data, not JSX. Only use real content from these files; don't invent metrics, roles or clients.

**Images** live in `public/img/` as WebP: a full version (≤1600px, `name.webp`) plus a 640px `name-sm.webp`. Reference the full path in data (`/img/name.webp`); components use `responsiveImage(src, sizes)` (srcset) or `thumbSrc(src)` for small frames, from `src/lib/project.ts`. When adding an image, generate both variants (e.g. with Pillow: quality ~80 full, ~76 small). Optional fields (`role`, `context`, `period`, `flow`, `gallery`) render only when present.

### Theming (light + dark)

Neutral white light theme by default; dark theme via `.dark` on `<html>`. Tokens are HSL triples in `index.css` (`:root` = light, `.dark` = dark), wired in `tailwind.config.js` (`darkMode: ["class"]`) as `hsl(var(--x) / <alpha-value>)` using shadcn names (`background`, `foreground`, `card`, `muted`, `border`, …) plus one accent, `brand` (green-teal, lighter in dark). Components never branch on theme — use tokens (`bg-card`, `text-muted-foreground`, `border-foreground/10`), not `bg-white`/hex. Drop shadows use `hsl(var(--shadow) / a)`; modal scrims use `bg-black/NN` in both themes.

The theme is set before paint by an inline script in `index.html` (localStorage `theme`, else `prefers-color-scheme`). `src/hooks/useTheme.ts` keeps React in sync, persists explicit choices, follows OS changes until the visitor chooses, and updates `<meta name="theme-color">`. `ThemeToggle` sits in the navbar.

`.glass` (in `index.css`) is the light glass surface — use it selectively (nav when scrolled, panels over imagery, compact meta blocks, the contact form), never for whole sections. It deliberately does not set `position`. On phones/coarse pointers it swaps live `backdrop-filter` for a near-opaque fill.

### Fonts

Self-hosted in `public/fonts/`: Archivo (variable, `font-sans`) and IBM Plex Mono 400/500 (`font-mono`, for metadata/labels). Archivo was chosen over common AI-site defaults (Inter, Outfit, …) — don't swap without discussion.

### Animation & scrolling (GSAP + Lenis)

- `src/lib/gsap.ts` registers `ScrollTrigger` and `useGSAP` once; import GSAP from there.
- `src/components/SmoothScroll.tsx` — Lenis (`lerp: 0.1`), driven by `gsap.ticker` and calling `ScrollTrigger.update` on scroll so both stay in sync. Exposes `useSmoothScroll()` → `scrollTo(target)` and `setPaused()` (the dialog pauses page scroll; its scroll body has `data-lenis-prevent`). Disabled for `prefers-reduced-motion` and on touch devices (`pointer: coarse`), where native scrolling is smoother and cheaper. `scroll-padding-top` (nav height) handles anchor offsets for both Lenis and native scroll — don't add a manual offset.
- `src/hooks/useScrollAnimations.ts` — one hook (called in `App`) that animates by data attribute: `data-reveal` (batched fade/rise), `data-reveal-image` (fade/rise + image settle — transform/opacity only; avoid animating clip-path/filters, which repaint every frame on phones), `data-parallax="0.05"` (scrubbed drift on an `<img>` inside an overflow-hidden frame, desktop only). All inside `gsap.matchMedia`, so reduced-motion users get static, visible content. Prefer adding attributes over new per-component GSAP code.
- `src/hooks/useScrollState.ts` — active nav section + "scrolled" nav state via ScrollTrigger (no extra scroll listeners).
- `Hero.tsx` has its own short intro timeline.

Keep motion subtle: no pinning, no scroll hijacking, nothing that delays reading. Framer Motion is not used on this branch.
