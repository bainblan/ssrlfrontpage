# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (flat config, v9+)
```

No test framework is configured.

## Architecture

This is a **Next.js 16 App Router** site for UGA's Small Satellite Research Laboratory. It renders an interactive Three.js 3D space scene behind scrollable content sections.

### Key files

- **`app/page.tsx`** — Main page: fixed navbar, 12-column CSS grid of content sections, and the `<ThreeScene />` component. All styling uses Tailwind v4 utility classes inline.
- **`app/components/ThreeScene.tsx`** — Client component (`"use client"`) that initializes a Three.js WebGL scene on a `<canvas>`. Loads GLTF models (Earth, satellite), creates a starfield and moon, and animates camera position on scroll via `document.body.onscroll`. Handles cleanup (cancelAnimationFrame, dispose renderer, remove listeners).
- **`app/globals.css`** — Font imports (Adobe Typekit for `brandon-grotesque`/`elevon`, Google Fonts for `Armata`), `@import "tailwindcss"`, and base element styles for headings/blockquotes. Component styles live in JSX as Tailwind classes, not here.
- **`app/layout.tsx`** — Root layout with metadata; no wrappers beyond `<html>`/`<body>`.

### Z-stacking order

The canvas, navbar, and main content layer via z-index:
- Canvas: `z-0` (fixed, full viewport)
- Main content: `z-[99]` (absolute)
- Navbar: `z-[999]` (fixed)

### 3D assets in `public/`

GLTF models (`scene.gltf`/`scene.bin` for Earth, `satellite_model/` for satellite), textures (`space.jpg`, `moon.jpg`, `normal.jpg`), and logo images (`images/`).

## Tech stack details

- **Three.js ^0.128.0** — Pinned to older version; uses `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader`. Custom type declarations in `three-examples.d.ts` since `@types/three` doesn't cover the examples at this version.
- **`next.config.ts`** — Must include `transpilePackages: ["three"]` for Three.js to work with Next.js.
- **Tailwind CSS v4** — Uses `@tailwindcss/postcss` plugin (not the older `tailwindcss` PostCSS plugin). Config is in `postcss.config.mjs`. No `tailwind.config.*` file; v4 uses `@import "tailwindcss"` in CSS.

## Tailwind v4 gotchas

- Arbitrary grid column values with `/` (e.g. `col-[2/span_5]`) can be misinterpreted as opacity modifiers. Use named utilities instead: `col-start-2 col-end-7`.
- Arbitrary `rgba()` values with commas (e.g. `bg-[rgba(15,15,15,0.95)]`) can break the class scanner. Use hex+alpha: `bg-[#0f0f0ff2]`.
- `leading-normal` may map to CSS `normal` rather than `1.5`; use `leading-[1.5]` for explicit control.
- Un-layered CSS in `globals.css` (like the `h1, h2, h3, blockquote` rule) beats all `@layer` styles including Tailwind utilities. Only put font-family/weight base styles there.
