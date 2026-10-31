# Self-hosted fonts

Used with `next/font/local` in `src/app/layout.js` and `src/app/taxflow/layout.js`.

They replaced `next/font/google` on 31 Oct 2026. Production builds on Vercel were failing intermittently with
`Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`, and a failed build leaves the
previous version live with no visible sign.

| File | Font | Licence |
|---|---|---|
| `dm-sans-latin.woff2` | DM Sans, variable, Latin subset | SIL Open Font License 1.1 |
| `outfit-latin.woff2` | Outfit, variable, Latin subset | SIL Open Font License 1.1 |
| `jetbrains-mono-latin.woff2` | JetBrains Mono, variable, Latin subset | SIL Open Font License 1.1 |

These are the same files Google Fonts served to the site's own build. Only the Latin subset is kept, which covers
English text. A character outside it falls back to the system font.
