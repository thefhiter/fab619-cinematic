# FAB619 — Fabrication à la demande · فاب ٦١٩

A trilingual (**FR / EN / AR-RTL**) redesign of [fab619.tn](https://www.fab619.tn/fr) — the
Tunisian engineering design office for custom machines, automation and digital fabrication —
with a **self-hosted news system**: write an article once in any language, it is
auto-translated into the other two, reviewed in an admin panel, and published to the site.

## The site (`/`)

Faithful to the original site's structure: hero slideshow (video + the 4 original slides),
who-we-are, stats band with count-up, 6 service cards, projects carousel, 23-partner logo
marquee, dynamic press grid, contact. Light theme, normal scrolling, A-grade usability —
with tasteful motion: scroll reveals, slideshow crossfade with Ken Burns, word-rise headline,
scroll progress bar, card tilt, magnetic CTAs, scrollspy nav.

**Language switch (FR / EN / ع)** closes an industrial roller door (slats + laser + glowing
«فاب ٦١٩»), flips `lang`/`dir` and typography to IBM Plex Sans Arabic, and reopens onto the
mirrored layout. CSS logical properties make RTL free. Choice persists in `localStorage`
across every page.

## The news system

- **`/admin.html`** — token-gated editorial space (header `X-Admin-Token`, set via the
  `ADMIN_TOKEN` env var; demo default `fab619`). Write **title / excerpt / body / image alt**
  in one language, pick an illustration from the site's own library or upload one (≤ 3 MB,
  stored under `/assets/uploads/`), then one click translates into the two other languages.
  Review tabs (FR / EN / AR) let the editor correct each version before publishing.
  Published articles can be edited, retranslated or deleted from the same page.
- **`/article.html?slug=…`** — the public article page, rendered in the visitor's language
  with localized dates (Arabic-Indic numerals in AR).
- **Press grid on the homepage** — the 6 most recent articles, live from the API, re-rendered
  on every language switch.

### API (`server.js`, zero dependencies)

| Route | Auth | Purpose |
|---|---|---|
| `GET /api/articles` | — | list articles (newest first) |
| `GET /api/articles/:slug` | — | one article (all 3 languages) |
| `POST /api/articles` | token | create; missing languages auto-filled by translation |
| `PUT /api/articles/:id` | token | edit; `retranslate: true` refills from source language |
| `DELETE /api/articles/:id` | token | delete |
| `POST /api/translate` | token | translate a text `{text, from, to}` |
| `POST /api/upload` | token | upload a base64 image → `/assets/uploads/` |

Translation chain: Google Translate (unofficial `gtx` endpoint) → MyMemory fallback →
graceful passthrough (the editor can always fix by hand in the review tabs). Articles are
stored in `data/articles.json` — no database.

## Tech

- Semantic HTML + CSS (logical properties, `clamp()` fluid type) + vanilla JS
- GSAP (local) for the shutter timeline and magnetic buttons — no other libraries
- Node.js server: static files with HTTP Range support (video streaming) + JSON API, port **9105**
- Self-hosted fonts: Space Grotesk, Inter, IBM Plex Sans Arabic (WOFF2)

## Accessibility (WCAG AA pass)

- Text contrast ≥ 4.5:1 (red accent lightened to `#f56b6b` for text on dark)
- 44 px minimum touch targets (nav, language switch, CTAs)
- Visible `:focus-visible` outlines, real `<button>`/`<a>` semantics, sequential headings
- `prefers-reduced-motion`: no counters/tilt/word-rise, simplified language switch
- Correct `lang`/`dir` swapping; phone numbers kept LTR inside RTL layout
- Admin forms: labelled fields, `role="alert"` errors, `aria-live` toasts, real tabs with
  `aria-selected`; press grid announces updates via `aria-live`

## Run

```bash
node server.js
# → http://localhost:9105          (site)
# → http://localhost:9105/admin.html  (editorial space)
```

Set a strong `ADMIN_TOKEN` environment variable before hosting publicly.

## Credits

All photography, videos, logos and brand assets belong to **FAB619** (fab619.tn) and are used
here as a design tribute/redesign concept. Partner logos belong to their respective owners.
