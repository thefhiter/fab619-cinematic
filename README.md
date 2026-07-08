# FAB619 — Fabrication à la demande · فاب ٦١٩

A bilingual (FR ⇄ AR/RTL) redesign of [fab619.tn](https://www.fab619.tn/fr) — the Tunisian
engineering design office for custom machines, automation and digital fabrication.

**Two experiences, one site:**

- **`/` — the simple template (default).** Faithful to the original site's structure: hero
  slideshow (video + the 4 original slides), who-we-are, 6 service cards, projects carousel,
  partner logo marquee, press, contact. Normal scrolling, light theme, A-grade usability —
  with tasteful animations: scroll reveals, slideshow crossfade with Ken Burns, hover lifts,
  scrollspy nav, and the industrial roller-shutter language transition.
- **`/cinematic.html` — the 3D experience.** A scroll-driven camera dolly through a dark
  factory hall: portal gantries ignite as you pass, the hero video plays on a monumental
  video wall, projects hang in a machine gallery, partner logos form a light tunnel.

Both share the same FR/AR dictionary; the **عربي / FR** button closes a factory roller door
(slats + laser + glowing «فاب ٦١٩»), flips `lang`/`dir` and typography to IBM Plex Sans Arabic,
and reopens onto the mirrored RTL layout. Choice persists in `localStorage`.

## Sections (both experiences)

| Simple site | Cinematic zone | Content |
|---|---|---|
| Accueil · الرئيسية | 01 L'Atelier | Original hero video + 4 slideshow slides |
| À propos · من نحن | 02 Qui sommes-nous | Who-we-are collage (original photography) |
| Services · الخدمات | 03 La chaîne | 6 services with the site's own icons + images |
| Projets · المشاريع | 04 La galerie | SCPDS, JELLY DOSER, JellyEdge ×2, ADM IDEX V2 + atelier photo strip |
| Partenaires · الشركاء | 05 Le tunnel | 23 client/partner logos (CSS marquee / 3D tunnel) |
| Presse · الصحافة | 06 La presse | 3 real articles with dates, linked to fab619.tn |
| Contact · اتصل بنا | 07 Le bureau | Phones, emails, both addresses, socials |

## Tech

- Simple site: semantic HTML + CSS (logical properties → free RTL) + ~120 lines of vanilla JS
  (slideshow, IntersectionObserver reveals, scrollspy, marquee, RTL-aware carousel)
- Cinematic page: **Three.js r160** (local, no CDN) + UnrealBloom; camera on paired CatmullRom
  rails sampled by hall depth `z`
- GSAP (local) for the shutter timeline
- Node.js static server with HTTP Range support (video streaming), port **9105**
- Self-hosted fonts: Space Grotesk, Inter, IBM Plex Sans Arabic (WOFF2)

## Accessibility (WCAG AA pass)

- Text contrast ≥ 4.5:1 (red accent lightened to `#f56b6b` for text on dark)
- 44 px minimum touch targets (nav, language button, CTAs)
- Visible `:focus-visible` outlines, real `<button>`/`<a>` semantics, sequential headings
- `prefers-reduced-motion`: instant camera, simplified language switch, no idle sway
- Correct `lang`/`dir` swapping; phone numbers kept LTR inside RTL layout
- Canvas and decorative HUD `aria-hidden`; loader `role="status"`

## Run

```bash
node server.js
# → http://localhost:9105
```

Debug: `window.__jump(p)` jumps to any progress point `p ∈ [0,1]` (e.g. `__jump(0.76)` = partner tunnel).

## Credits

All photography, videos, logos and brand assets belong to **FAB619** (fab619.tn) and are used
here as a design tribute/redesign concept. Partner logos belong to their respective owners.
