# FAB619 — L'Usine Cinématique · المصنع السينمائي

A cinematic, scroll-driven 3D reimagining of [fab619.tn](https://www.fab619.tn/fr) — the Tunisian
engineering design office for custom machines, automation and digital fabrication.

The visitor rides a camera dolly through a dark factory hall at night: portal gantries ignite as
you pass, the original site's hero video plays on a monumental video wall, services line up as
lit stations along a production line, projects hang in a machine gallery, partner logos form a
light tunnel, and the journey ends in the office — ready to start a project.

**Fully bilingual French ⇄ Arabic (RTL)** with a cinematic industrial roller-shutter transition.

## Experience map

| # | Zone | Content |
|---|------|---------|
| 01 | L'Atelier · الورشة | Video wall (original hero video) + 4 slideshow banners |
| 02 | Qui sommes-nous · من نحن | Who-we-are triptych (original photography) |
| 03 | La chaîne de production · خطّ الإنتاج | 6 service stations with the site's own icons |
| 04 | La galerie des machines · معرض الآلات | 5 flagship projects (SCPDS, JELLY DOSER, JellyEdge, ADM IDEX V2) + archive arch |
| 05 | Le tunnel des partenaires · نفق الشركاء | 23 client/partner plaques |
| 06 | La presse · الصحافة | 3 press lightboxes with real article dates |
| 07 | Le bureau · المكتب | Contact chamber — phones, emails, both addresses, socials |

## Language transition — the signature move

Clicking **عربي / FR** closes a factory roller door (10 slats + laser line + glowing
«فاب ٦١٩» wordmark), swaps the entire DOM to the other language (`lang`, `dir`, typography
system → IBM Plex Sans Arabic), fires a camera FOV-punch-and-roll whip in the 3D scene, then
lifts the shutter onto the mirrored RTL layout. Choice persists in `localStorage`.

## Tech

- **Three.js r160** (local, no CDN) + UnrealBloom post-processing
- Scroll-driven camera on paired CatmullRom rails (position + gaze), sampled by hall depth `z`
  so overlay copy, ignitions and camera always agree
- GSAP (local) for the shutter timeline and nav glides
- Plain HTML/CSS overlay — CSS logical properties give free RTL mirroring
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
