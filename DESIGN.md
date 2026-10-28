---
name: Slim & Beauty by MC
description: Bronz — a dark espresso treatment room lit in warm gold. High-contrast Bodoni over full-bleed skin and bronze photography, prices shown like a menu, scroll that choreographs rather than decorates.
colors:
  espresso: "#15100c"
  espresso-2: "#1f1712"
  espresso-3: "#2a1f17"
  footer-ground: "#100c09"
  cream: "#f1e6d3"
  cream-dim: "#d9c9b0"
  muted: "#b5a088"
  gold: "#d5b071"
  gold-hover: "#e6c88f"
  gold-deep: "#a97c42"
  line: "rgba(233, 217, 191, 0.14)"
  scrollbar-thumb: "#6b5236"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(3rem, 7.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.4rem, 4.6vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(1.45rem, 3.4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.04
  price:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.7rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  long-form:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  none: "0px"
  sm: "2px"
  card: "16px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "40px"
  max-width: "1400px"
  row: "28px"
  section-mobile: "96px"
  section-desktop: "144px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
    typography: "{typography.label}"
  button-gold-hover:
    backgroundColor: "{colors.gold-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
    typography: "{typography.label}"
  button-ghost-hover:
    textColor: "{colors.gold}"
  price-row:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "28px 0"
    typography: "{typography.title}"
  photo-frame:
    backgroundColor: "{colors.espresso-2}"
    rounded: "{rounded.none}"
  overlay-panel:
    backgroundColor: "{colors.espresso-2}"
    textColor: "{colors.cream-dim}"
    rounded: "{rounded.card}"
    padding: "24px"
  nav-link:
    textColor: "{colors.cream-dim}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.cream}"
---

# Design System: Slim & Beauty by MC

## Overview

**Bronz.** The site is a dark treatment room at golden hour: espresso grounds, cream type, one warm gold accent, and the salon's own skin and bronze photography carried full-bleed. It came out of a five-direction exploration in October 2026 (the light pink "calm treatment room" it replaced is in git history before commit `c7211ea`; that commit also holds variant D, the same design animated with Motion only, as a fallback if GSAP is ever dropped).

The audience is women comparing salons on a phone after an Instagram post or a Google search. The page has to feel more premium than the category's pink-and-white default, without hiding the thing that actually wins the comparison: real prices. So the voice is luxurious, and the structure is a price list.

Everything lives in `components/bronz/`. The root layout puts `.bronz` and the font variables on `<body>`, so every route is in this world; `bronz.css` holds the tokens and all shared rules.

## Colors

One dark ground in three steps, cream type in three weights, one gold.

### Primary
- **Gold `#d5b071`** is the only accent: the primary button, italic emphasis words in headlines, category heads, the price-row hover, hairlines that mark structure (`gold/40–50`), focus rings and text selection. Hover lifts it to `#e6c88f`.

### Neutral
- **Espresso `#15100c`** is the page. **Espresso-2 `#1f1712`** sets off alternating bands (price list, proof, gallery) and floating panels (cookie banner, launch dialog). **Espresso-3 `#2a1f17`** is reserved for deeper insets. The footer sits a step below the page on `#100c09`.
- **Cream `#f1e6d3`** for headings and prices, **cream-dim `#d9c9b0`** for body copy, **muted `#b5a088`** for metadata (durations, package lines, captions). All three clear 4.5:1 on espresso.
- **Line `rgba(233,217,191,.14)`** for every hairline; it is also the global default border colour in `globals.css`.

### Named Rules
- **One accent.** No second hue. Pink belongs to the old site.
- **Gold is for meaning.** Emphasis, the action, and structure. Never a fill for large surfaces, never gradient text.
- **Tint, don't grey.** Secondary text on dark is warm (cream-dim, muted), never a neutral grey.

## Typography

**Bodoni Moda** (high-contrast didone, normal and italic, `--font-bodoni`) is the display voice: headlines, treatment names, prices, the phone number, FAQ questions. **Manrope** (`--font-manrope`) carries body, labels and buttons. Both load with `latin-ext` for ă â î ș ț.

### Hierarchy
- Hero display: `clamp(3rem, 7.6vw, 6rem)`, leading .98, tracking -.025em, three short lines, the middle one italic gold.
- Section headlines: `clamp(2.4rem, 4.6vw, 4rem)`, leading 1.02. The second half of the phrase goes italic gold ("Întrebări *frecvente*").
- Treatment names in the price list: `clamp(1.45rem, 3.4vw, 3rem)`. Prices in Bodoni at 1.7rem with tabular lining numerals (`.num`).
- Body 16–18px at 1.6–1.65; long-form legal text 17px at 1.75 inside a 68ch column.

### Named Rules
- **No eyebrows, no kickers.** A heading carries itself; the italic gold half is the emphasis.
- **Numbers are tabular.** Prices, durations, hours and the phone number always use `.num`.

## Layout

A 1400px column with 20px gutters on phones and 40px on desktop, a 12-column grid at `md`. Sections breathe: roughly 96px vertical on phones and 144px on desktop, more above a heading than below it. Compositions are asymmetric (7/5, 4/8 splits; the three reviews step down 0 / 4rem / 8rem).

### Named Rules
- **Phone first.** The sticky Sună / WhatsApp bar (`MobileBar`) is always in reach below `md`; the body carries `pb-20` so it never covers content. On a treatment page its WhatsApp message names that treatment.
- **Price is the argument.** Every treatment, its single-session price, duration and package tiers are on the homepage and on `/servicii`. Laser shows "La evaluare". Packages show the per-session price and the computed saving.

## Elevation & Depth

Depth comes from photography, grain and the dark-to-photo gradients, not from shadows.

- Hero photos sit under two linear gradients (espresso from the left for the copy, from the bottom into the page) and, on the homepage and `/servicii`, the `GoldLight` WebGL layer: slow gold "silk" bands in screen blend that lean towards the pointer (DPR ≤ 1.5, paused off-screen, one still frame under reduced motion).
- `.grain` adds an 8% fractal-noise overlay to hero and banded sections.
- Shadows exist only on the gold button (a soft gold drop) and on floating panels (a long, soft black drop). No zero-offset halos.

## Shapes

Photographs are square-cornered rectangles. Pills are for buttons and the "NOU" badge only. Floating panels (cookie banner, launch dialog) take a 16px radius. No icon cards, no rounded photo cards.

## Components

### Navigation
`BronzNav`: fixed, logo (`BronzLogo` compact) left, links right mirroring `navSchema` (Servicii, the two categories at `xl`, Prețuri `/#preturi`, Contact `/#contact`) and a ghost "Sună-ne" button. Below `md` the links collapse into `MobileMenu`, a full-screen native popover. `NavBackdrop` fades the backdrop in over the first 160px only on pages that open on a photo hero (`[data-hero]`); everywhere else the nav is solid from the first paint.

### Buttons
`.btn-gold` (filled, primary) and `.btn-ghost` (cream hairline, turns gold on hover). Height 40–56px, pill radius, Manrope 600.

### Price list (`ServiceIndex` + `HoverPreview`)
Rows of treatment name, package line, duration and price, divided by hairlines under a gold category rule. On a fine pointer, hovering a row leans the title in, turns it italic gold, and floats that treatment's photo under the cursor (`gsap.quickTo` for x/y and a velocity tilt, clip-path reveal). On phones each row carries a 56px thumbnail and the price sits under the name.

### Spotlight (`spotlight` in lib/site-content, `Spotlight`, `ServiceIndex lead`)
The service that is both `featured` and `isNew` in `lib/data.tsx` (laser diode epilation since October 2026) leads: first panel of the featured run, a photo-led `Spotlight` band under the `/servicii` hero, and a lead row above the categories in the price list. With no list price it reads "Preț stabilit *la evaluare*" and the call/WhatsApp buttons take the place of the tiers.

### Featured run (homepage)
The services marked `featured` in `lib/data.tsx` (laser, VShape, Criolipoliză; order and art direction in `components/bronz/featured.tsx`) as large photo + copy + package-table panels. Stacked on phones; on desktop with motion allowed, `bronz.css` lays them in one row that the choreography pins and scrubs sideways with snapping and a gold progress line.

### Photo frame (`Frame`)
An oversized image inside a clipped frame, opened by a clip-path curtain (`rise` or `side`) and drifted on scroll.

### FAQ (`FaqList`)
Native `<details>` so every answer stays in the server HTML the FAQPage schema describes; the plus rotates to a cross and the open question turns gold; height animates through `::details-content` where supported.

### Before/after (`BeforeAfter`)
Drag or arrow-key comparison on a native range input, with tabs for the two real pairs. The only outcome proof the salon has; never extended with stock or generated imagery.

### Legal pages (`LegalPage` + `LegalToc`)
Read mode: one h1, the update date, a 68ch article (`.legal`) with Bodoni h2s on hairlines, italic gold h3s, gold dash bullets, and on `lg` a sticky "Cuprins" built from the page's own h2s that marks the section being read.

### Overlays
The cookie banner and the laser launch dialog are espresso-2 panels with a gold hairline, gold primary and ghost secondary buttons.

### Logo (`BronzLogo`)
The original mark (script "Slim & Beauty", the silhouette between the words, a hairline and "by MC") redrawn for this world; `full` in the footer and loading screen, `compact` in the nav. It takes `currentColor` for the type.

## Motion

GSAP (with ScrollTrigger and SplitText) for scroll-choreographed scenes; plain CSS for entrances that must start before JavaScript. Every page renders its own `BronzChoreo` root, so a client navigation rebuilds every trigger for the new page.

- **Hero:** the photo eases in from `scale(1.12)` and 40% brightness in CSS (`.hero-photo`). The title's words rise in line masks once fonts are ready; on scroll the lines drift apart and fade while the photo pushes in from 1 to 1.08. The homepage and `/servicii` heroes pin for one extra viewport on desktop.
- **Headings** rise line by line in masks; **photos** open with a curtain and drift; **price rows** slide in in batches; **groups** (reviews, related treatments) stagger up; the **phone number's digits** roll in; the homepage **statement** lights up word by word as it scrolls past.

### Named Rules
- **The server paints the final layout.** No JavaScript class toggles layout (the horizontal featured row is a media query that matches the GSAP one). Otherwise a refresh redraws the page two or three times.
- **Above-the-fold copy waits hidden, with a net.** Hero title and sub are `visibility: hidden` in CSS until GSAP reveals them, with a 2.5s keyframe that shows them anyway if the script never runs.
- **Don't stack transforms.** One owner per transform: CSS owns the hero wrapper's entrance, GSAP owns the inner image's scroll scale. Stacking them left the hero over-zoomed.
- **Don't gate photos on fonts.** Anything visible at first paint animates in CSS; the GSAP build waits for `document.fonts.ready`.
- **No scroll hijacking.** No ScrollSmoother, no wheel capture; native scroll stays intact on phones.
- **Reduced motion gets a still page.** Every scene is inside `gsap.matchMedia` and CSS motion sits behind `prefers-reduced-motion: no-preference`; the featured run falls back to the stacked layout.
- **Never hide a modal.** The launch dialog opens with `showModal()`, which makes the page inert; hiding it with CSS locks the page.

## Do's and Don'ts

### Do:
- Use the salon's real photography, cropped generously; prefer dark, warm frames for heroes.
- Show prices, durations and package savings plainly.
- Keep RO copy in the *tu* voice with full diacritics.
- Add new pages inside a `BronzChoreo` root and opt into motion with `data-*` hooks.

### Don't:
- Reintroduce pink, white grounds, icon cards, eyebrows, gradient text or decorative glass.
- Invent reviews, statistics, credentials or before/after images.
- Toggle layout from JavaScript, or put initial animation states in CSS outside the hero safety-net pattern.
- Remove the SNS credit or the ANPC badge from the footer.
