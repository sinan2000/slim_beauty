---
name: Slim & Beauty by MC
description: A calm, pink-warmed treatment room — serif headlines over full-bleed photography, one confident accent, nothing cold.
colors:
  signature-pink: "#ec4899"
  pink-deep: "#db2777"
  pink-pressed: "#be185d"
  pink-wash: "#fdf2f8"
  pink-border: "#fbcfe8"
  pink-scrim: "#831843"
  purple-scrim: "#581c87"
  surface: "#ffffff"
  ink: "#1f2937"
  body: "#4b5563"
  muted: "#6b7280"
  nav-ink: "#374151"
  hairline: "#e5e7eb"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  panel: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gap: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.pink-deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "24px 32px"
    typography: "{typography.body-lead}"
  button-primary-hover:
    backgroundColor: "{colors.pink-pressed}"
  button-primary-compact:
    backgroundColor: "{colors.pink-deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "36px"
    typography: "{typography.label}"
  button-back:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.pink-pressed}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  price-chip:
    backgroundColor: "{colors.pink-deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    typography: "{typography.label}"
  card-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.panel}"
    padding: "32px"
  card-media:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "24px"
    height: "400px"
  card-bordered:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
  nav-link:
    textColor: "{colors.nav-ink}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.signature-pink}"
  nav-link-over-hero:
    textColor: "{colors.surface}"
---

# Design System: Slim & Beauty by MC

## Overview

**Creative North Star: "The Treatment Room"**

The system behaves like the room a client is actually walking into: white, quiet, warmed by pink light, and unhurried. Nothing about it hurries or shouts. Surfaces are clean and mostly empty; the color that appears does so in small, deliberate places; and every heading is set in a serif that reads as *cared for* rather than *engineered*. The visitor arriving here is deciding whether to trust this salon with her body, and the room she lands in has to feel calm before it feels persuasive.

Depth in this world never comes from stacked shadows. It comes from photography — real treatment rooms, real products, real results — held under a tinted scrim so type can sit on top of it. The page alternates between two states: a **white room** (services, prices) and a **pink-washed room** (about, gallery, contact), with occasional **immersive** moments where a photograph takes the whole viewport and the copy floats over it in white. That three-state rhythm is the spatial signature of the site, and it does more structural work than any border or shadow does.

The one thing this system must never become is a **cold medical clinic**. The technology is clinical — cryolipolysis, radiofrequency, microneedling — and the temptation to signal credibility with blue-white sterility, hard rules, and clinical stock photography is exactly the trap. The pink warmth is not decoration; it is the argument that this equipment is being operated by a person, in a comfortable room, on someone who will be looked after.

**Key Characteristics:**

- One accent color, used sparingly, on a near-white ground
- Playfair Display serif for every heading, Inter for everything else — no third voice
- Full-bleed photography under a tinted overlay as the primary source of depth
- Pill-shaped buttons and softly rounded panels; nothing hard-edged
- Alternating white / pink-wash section rhythm at a consistent 80px vertical cadence
- Motion is entry-only: fade and rise on scroll, never looping or attention-seeking

## Colors

A near-white ground carrying a single saturated pink, with a warm blush wash for section separation and a neutral gray ramp doing all of the text work.

### Primary

- **Signature Pink** (`#ec4899`): the accent, and the only color allowed to be loud. It carries **non-text** marks — benefit icons, the active gallery dot, the before/after slider handle, the FAQ chevron in its open state. Against white it measures 3.53:1, which clears the 3:1 floor for graphics but not the 4.5:1 floor for text, so it never sets a word. It is never used as a large fill.
- **Pink Deep** (`#db2777`): the text-weight pink, and the fill under white text. Primary button fills, price chips, the price figures in the list, and every link or nav hover state. Measures 4.6:1 both as ink on white and as a fill under white — the one-step-darker value is what makes pink legible, not just what makes a button look pressed.
- **Pink Pressed** (`#be185d`): primary button hover, and any pink text that has to survive a Pink Wash background (6.04:1 on white, 5.53:1 on wash) — the back button being the standing case.

### Secondary

- **Pink Wash** (`#fdf2f8`): the alternating section background. Carries "About", "Gallery", and "Contact"; the white sections carry "Services" and "Prices". Its entire job is rhythm — it must never appear as a card fill on top of a white section.
- **Pink Border** (`#fbcfe8`): hairline rules that need to feel warm rather than structural — the footer divider, the back-button outline.

### Tertiary

- **Pink Scrim** (`#831843`, applied at 70% with a light backdrop blur): the testimonial overlay. Turns a photograph into a readable surface while staying inside the brand's hue.
- **Purple Scrim** (`#581c87`, applied at 40%): the second stop of the hero's left-to-right gradient over the hero photograph. It is a gradient partner only — never a standalone surface, never a fill, never a border.

### Neutral

- **Surface** (`#ffffff`): the dominant ground. Sections, cards, panels, chrome.
- **Ink** (`#1f2937`): all headings, and icon-button glyphs on light chrome.
- **Body** (`#4b5563`): paragraph copy and section subheads.
- **Muted** (`#6b7280`): meta text — durations, copyright, social icons at rest.
- **Nav Ink** (`#374151`): navigation links in their solid (scrolled) state.
- **Hairline** (`#e5e7eb`): neutral dividers inside accordions and lists.

Over photography, the neutral ramp inverts to white at three opacities: full white for headings, 90% for lead paragraphs, 80% and 70% for supporting and meta text.

### Named Rules

**The One Loud Thing Rule.** Signature Pink covers no more than ~5% of any viewport. It marks the price, the action, or the single most important glyph — never a background, never a large block, never two competing elements in the same view. Its scarcity is what makes a price feel like an answer instead of an ad.

**The Two Rooms Rule.** Sections alternate between white and Pink Wash. Two consecutive sections never share a background, and no third section background exists. If a new section needs to feel distinct beyond that, it earns a photograph, not a new color.

**The Readable Accent Rule.** The three pinks are a contrast ladder, not three shades of the same idea. Signature Pink (3.53:1 on white) marks things; Pink Deep (4.6:1) sets words and fills under white text; Pink Pressed (6.04:1) handles pink text over the Pink Wash. Reaching for Signature Pink because it is the brand color and then putting a word in it is the one mistake this palette invites — a price nobody can read is not a price.

**The Cold Ban.** No blue, no gray-blue, no clinical teal anywhere in the interface. The technology is clinical; the room is not. Credibility is carried by specificity — real device names, real durations, real prices — never by sterile color.

## Typography

**Display Font:** Playfair Display (with Georgia, serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)

**Character:** A high-contrast transitional serif over a neutral grotesque. Playfair supplies the salon's warmth and femininity at heading scale, where its thin/thick modulation actually resolves; Inter disappears underneath it and carries every piece of information the visitor came to read. The pairing is deliberately unfashionable and deliberately legible — the serif does the feeling, the sans does the work, and there is no third voice.

### Hierarchy

- **Display** (Playfair, 700, `2.25rem` → `3.75rem` responsive, line-height 1.25): page-level H1 only. Appears exactly once per page, always in white over a photograph.
- **Headline** (Playfair, 700, `1.875rem` → `2.25rem`, line-height 1.2): section titles. Always centered, always followed by a Body-sized subhead constrained to `max-w-2xl`.
- **Title** (Playfair, 600, `1.25rem`, line-height 1.4): card titles, price-list category headings, founder attribution.
- **Body** (Inter, 400, `1rem`, line-height 1.6): all paragraph copy. Constrained to `max-w-2xl` (~672px) when centered under a headline; free-flowing at `max-w-none` inside prose blocks on service pages.
- **Body Lead** (Inter, 400, `1.125rem` → `1.25rem`, line-height 1.6): the hero subhead and primary button labels. The single step above body that signals "read this first".
- **Label** (Inter, 500, `0.875rem`, line-height 1.4): navigation, durations, price chips, meta, captions. The workhorse — nearly half of all type on the site sits at this size.

### Named Rules

**The Serif Ceiling Rule.** Playfair is for headings and card titles only. It never sets a paragraph, a button, a label, a nav item, or a price. If a piece of type is something the visitor *reads* rather than *lands on*, it is Inter.

**The Centered Header Rule.** Every section opens the same way: centered Headline, `16px` below it a centered Body subhead capped at `max-w-2xl`, then `64px` of air before the content. The consistency is load-bearing — it is what makes a long scrolling page feel navigable.

## Layout

A single centered container with `16px` horizontal gutters (`24px` from the medium breakpoint in the footer), holding content that rarely exceeds `1024px` of measure. Width is controlled per-block rather than globally: `max-w-2xl` (672px) for centered prose, `max-w-3xl` (768px) for hero copy, `max-w-5xl` (1024px) for the price table, `max-w-4xl` for service prose.

**Vertical rhythm** is strict and shallow. Sections are `80px` top and bottom (`64px` on interior service pages, `48px` in the footer). Inside a section: `64px` from the centered header to the content, `32px` between grid items, `48px` between the two halves of a split layout. There is no other vertical spacing vocabulary; a value outside this set is drift.

**Grids** are plain and few: a three-column card grid for featured treatments, a two-column split for About and Contact, a two-column benefit grid inside the About copy. All collapse to a single column below `768px` — there is no intermediate two-column tablet state, by design.

**Responsive behavior.** Mobile is the majority case and the layout is built for it: the hero holds full viewport height at every size, type scales through two or three steps rather than fluidly, and the desktop nav is replaced below `768px` by a full-screen white overlay menu whose items fade in on a `100ms` stagger. Photography is served through `next/image` with explicit `sizes` at every call site — never an unsized fill.

**Motion.** Entry only, and mostly CSS. Hero content fades in over `800ms`; below the fold, `.reveal` blocks rise `30px` and fade using a scroll-driven `animation-timeline: view()` — deliberately not JavaScript, so the served HTML never contains `opacity: 0` and non-executing crawlers still see the content. The whole reveal system is wrapped in `prefers-reduced-motion: no-preference`. Interactive motion is limited to `300ms` color and transform transitions and a `500ms` image scale on card hover.

### Named Rules

**The Eighty Rule.** Every top-level section is `80px` of vertical padding. Not 72, not 96. When a section needs to feel larger, it gets a photograph or a background change — not extra padding.

**The Reduced-Motion Rule.** Every scroll-triggered animation lives inside `@supports (animation-timeline: view())` *and* `@media (prefers-reduced-motion: no-preference)`. A visitor who has asked for stillness gets a completely static, fully legible page. No exceptions, and no JavaScript fallback that reintroduces the movement.

## Elevation & Depth

**Depth comes from photography, not from shadows.** This system is flat. Surfaces sit directly on their background with no ambient lift, and the sense of layering the site does have comes almost entirely from full-bleed imagery held under a tinted scrim, with white type floating on top. Where shadow exists at all, it is chrome — the sticky header separating from the page, a dropdown detaching from the nav bar, a card acknowledging a hover. Shadow is never used to make something look premium.

### Shadow Vocabulary

- **Chrome** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)`): the scrolled header, the bordered price panel, benefit icon circles. A hairline of separation, barely visible, and that is the intent.
- **Detached** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`): elements that genuinely leave the page plane — the nav dropdown, gallery arrow controls.
- **Lifted** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): media cards and the map frame. Marks a block that is a destination.
- **Panel** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`): reserved for the FAQ/contact card and the glass testimonial panel. The heaviest shadow in the system, used exactly twice.

### The Overlay Vocabulary

The real depth tool. Four scrims, each with a fixed job:

- **Brand gradient** (`linear-gradient(to right, #831843/60, #581c87/40)`): the homepage hero only.
- **Neutral wash** (`#000000/50`): category and service page headers, where the photograph varies and the type must stay readable regardless.
- **Bottom fade** (`linear-gradient(to top, #000000/80, #000000/40, transparent)`): media cards, so a title and price can sit over the lower third of an image.
- **Brand scrim** (`#831843/70` + `backdrop-blur`): the testimonials section, turning a product photograph into a colored room.

### Named Rules

**The Photograph-Not-Shadow Rule.** When a block needs to feel important, it gets real photography under a scrim — not a bigger shadow. Elevation above `Lifted` requires a reason that already exists in this document.

**The Legible Scrim Rule.** White type never sits on an unscrimmed photograph. Every full-bleed image carries one of the four overlays above, and body-scale text over imagery drops no lower than 80% white.

## Shapes

Soft everywhere, hard nowhere. The form language has two registers and no third.

**Pills** (`9999px`) for anything actionable or labelled: every button, price chips, gallery dots, social buttons, icon circles, the before/after slider handle. A pill is how this system says *this is a thing you interact with, and it is friendly*.

**Soft panels** for anything that contains: `16px` on the hero cards, contact panel, testimonial glass, and map frame; `12px` on gallery containers; `8px` on the price table and FAQ rows; `6px` on inputs, dropdowns, and compact controls. Radius scales with the size of the block — larger surfaces earn larger corners.

Borders are used sparingly and always as hairlines: `1px` neutral dividers inside accordions and lists, `1px` Pink Border where a rule should read as warm rather than structural. There are no thick borders, no double rules, no decorative frames, and no sharp-cornered containers anywhere in the system.

### Named Rules

**The No Hard Corner Rule.** Nothing in this interface has a `0` radius except full-bleed sections and images that reach the viewport edge. If a box has an edge the visitor can see, that edge is rounded.

## Components

### Buttons

Soft and approachable is the whole character — a filled pink pill that looks like it would be pleasant to press.

- **Shape:** fully rounded pill (`9999px`) in every variant and every size.
- **Primary:** Pink Deep (`#db2777`) fill, white label at Body Lead size, `24px 32px` padding. The single most important action on a page.
- **Primary compact:** the same fill and shape at `36px` height with `8px 24px` padding and Label typography. Used in the navigation.
- **Hover / Focus:** background darkens to Pink Pressed (`#be185d`) over `300ms`; the hero button additionally scales to `1.05`. Focus-visible draws a `3px` ring at 50% opacity of the ring color plus a border shift — inherited from the primitive and never removed.
- **Back / secondary:** white fill, Pink Pressed label, `1px` Pink Border outline, pill shape, `12px 24px` padding; hovers to a Pink Wash fill. The label is the darkest pink because it has to stay legible in both the white and the washed state. This is the only outlined button in the system.
- **Never:** square buttons, ghost buttons carrying a primary action, or two filled pink buttons in the same viewport.

### Price Chips

- **Style:** Pink Deep fill, white Label type, pill shape, `4px 12px` padding. The fill is Pink Deep rather than Signature Pink so the white figure inside clears 4.5:1.
- **Placement:** top-right of a media card's caption block, opposite the treatment title, always with the `RON` unit spelled out.
- **Role:** this is the highest-value non-button use of the accent in the system. Price is the positioning argument, and the chip is how it gets stated without apology.

### Cards / Containers

Three distinct kinds, and mixing their treatments is drift.

- **Media card** (featured treatments): `16px` radius, `400px` tall, full-bleed photograph with a bottom-fade overlay, caption block absolutely positioned at the bottom with `24px` padding, all type in white. Hover scales the image to `1.1` over `500ms` inside a fixed frame. Carries the `Lifted` shadow.
- **Panel card** (contact/FAQ): white fill, `16px` radius, `32px` padding, `Panel` shadow. Used for a block that is a destination in its own right.
- **Bordered card** (price table): white fill, `8px` radius, `24px` padding, `1px` neutral border, `Chrome` shadow. Deliberately the plainest container in the system, because the content inside it is a list of numbers that has to stay scannable.

### Inputs / Fields

- **Style:** transparent fill, `1px` neutral border, `6px` radius, `36px` height, `4px 12px` padding, `16px` text on mobile stepping down to `14px` at desktop (the mobile size is what prevents iOS zoom-on-focus and must not be lowered).
- **Focus:** border shifts to the ring color and a `3px` ring at 50% opacity appears. No glow, no color fill.
- **Error:** `aria-invalid` drives a destructive border plus a `20%` destructive ring — the state is announced, not just colored.

### Navigation

- **Style:** fixed to the top with two states. Over the homepage hero it is fully transparent with `20px` vertical padding, white links, and a logo inverted to white. Past `10px` of scroll — and on every non-home route immediately — it becomes an `80%` white surface with a `12px` backdrop blur, `12px` padding, `Chrome` shadow, and Nav Ink links. The transition runs `300ms`.
- **Links:** Label typography, hovering to Signature Pink. The services item carries a chevron that rotates `180°` on group hover, revealing a white `8px`-radius dropdown of the two categories.
- **Action:** a Primary compact button sits at the end of the nav.
- **Mobile:** below `768px` the nav collapses to a hamburger that opens a full-screen white overlay — items centered, Title-sized, fading in on a `100ms` per-item stagger, with the copyright line and social icons pinned to the bottom.

### Section Header

The most-repeated pattern on the site, and worth treating as a component: centered Headline, `16px` gap, centered Body subhead at `max-w-2xl`, `64px` of space below. Every major section on every page opens with it. Its uniformity is what lets a visitor scroll a long page without losing their place.

### Before/After Comparator

The signature custom component. Two stacked images in a `16px`-radius frame with a draggable vertical divider: a `4px` white bar, a `40px` white circular handle at center carrying a `24px` Signature Pink dot and the `Lifted` shadow. It is the only interactive proof element on the site and the only place where the accent appears inside a photograph — earned, because the handle must be findable against arbitrary image content.

## Do's and Don'ts

### Do:

- **Do** keep Signature Pink (`#ec4899`) under ~5% of any viewport — the One Loud Thing Rule. One accented element per view, and prefer that it be the price or the action.
- **Do** climb the pink ladder by contrast duty: Signature Pink for marks, Pink Deep (`#db2777`) for words and for fills under white text, Pink Pressed (`#be185d`) for pink text on Pink Wash. Text at 4.5:1, graphics at 3:1 — measured, not eyeballed.
- **Do** alternate section backgrounds between white and Pink Wash (`#fdf2f8`), never twice in a row, and never introduce a third section background.
- **Do** set every heading in Playfair Display and everything else in Inter. Two voices, no more.
- **Do** open every section with the centered Headline + `max-w-2xl` subhead + `64px` gap pattern.
- **Do** use `80px` vertical section padding (`64px` on interior pages). Stay inside the `4 / 8 / 16 / 24 / 32 / 48 / 80` spacing set.
- **Do** put one of the four named overlays under any white type sitting on a photograph.
- **Do** make buttons fully rounded pills and containers softly rounded (`6–16px`, scaling with block size).
- **Do** wrap every scroll animation in both `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`.
- **Do** serve every image through `next/image` with an explicit `sizes` attribute and Romanian `alt` text that names the treatment and the salon.
- **Do** keep input text at `16px` on mobile so iOS does not zoom on focus.

### Don't:

- **Don't** introduce blue, gray-blue, or clinical teal anywhere. The Cold Ban is the brand's core visual commitment — a cold medical clinic is the stated anti-reference.
- **Don't** use Purple Scrim (`#581c87`) as anything but the second stop of the hero gradient. It is not a palette color.
- **Don't** set body copy, buttons, labels, or prices in Playfair. The Serif Ceiling Rule.
- **Don't** reach for a heavier shadow to signal importance. Use photography under a scrim instead; `Panel` shadow is spent on the contact card and the testimonial glass and should stay that way.
- **Don't** put a sharp-cornered box in the interface, and don't put two filled pink buttons in the same viewport.
- **Don't** add a third heading font, a second accent hue, or an illustration style. The system has no room for a third voice.
- **Don't** treat the shadcn zinc token block in `app/globals.css` (`--primary: 240 5.9% 10%`, `--accent: 240 4.8% 95.9%`, the chart ramp, the `.dark` class) as this project's palette. It is inert scaffolding that the Radix primitives reference for focus rings and borders only; the real system is the one documented above, and there is no dark mode.
- **Don't** loop, bounce, or auto-play anything for attention. Motion is entry-only. The hero's scroll chevron is the single exception and it is not to be joined by another.
- **Don't** invent proof. Three real reviews and two real before/after pairs exist; the visual system must work at that scale rather than assuming a wall of testimonials or a filled results grid.
