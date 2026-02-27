# Frontline Financial images

This is a **Next.js** app. Files in `public/` are served at the site root by Next.js. There is **no Vite proxy and no separate backend** — the dev server (e.g. `localhost:3002`) serves both the app and static assets. PNG, JPG, WEBP, and SVG in `public/images/` are all served correctly at `/images/...`. If you see 404s for an image, the file is missing at that path (e.g. add `public/images/team/hassan.png` for `/images/team/hassan.png`).

**Logos** are in `images/logos/`:

| File | Used for |
|------|----------|
| **frontline-logo.svg**      | Full logo — header nav + footer |
| **frontline-logo-mark.svg** | F mark only — TaxFlow brand bar  |

**Team photos** (for Financial Calculators CTAs) go in `images/team/`: use `hassan.svg` / `sham.svg` (or add `hassan.png`, `sham.png`). See `images/team/README.md`.
