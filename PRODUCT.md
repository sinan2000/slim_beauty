# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Women roughly 30–55 living in Timișoara and Dumbrăvița, Romania. They are dealing with cellulite, localized fat that diet and gym have not moved, or post-pregnancy body changes. They are comparing salons — usually on a phone, often after seeing an Instagram or Facebook post — and they want to know what a treatment actually does, what it costs, and whether it works on real people, before they commit to contacting anyone.

The job they are doing is *deciding which salon to trust with their body*, not "browsing beauty content". They arrive skeptical of results claims and price-sensitive, and they leave the site to make contact through a channel they already use.

**Secondary (served, not targeted):** the dermato-cosmetics and organic-tanning audience, and existing clients checking prices, hours, and new treatments.

The entire site is in Romanian. There is no English version and none is planned as a confirmed fact.

## Product Purpose

A marketing and conversion site for **Slim & Beauty by MC**, a beauty salon in Dumbrăvița (Timiș county) specializing in non-invasive body remodeling and dermato-cosmetics. It exists to turn local search and social traffic into contact with the salon.

Success is a real person making contact. Four channels count equally as conversion, and the visitor picks the one they are comfortable with:

- a phone call to +40 733 407 329;
- a WhatsApp message (prefilled with a body-remodeling enquiry);
- an Instagram or Facebook DM;
- a walk-in — meaning directions, hours, and the map must be as easy to reach as the phone number.

Organic search is the main acquisition engine. The site carries substantial deliberate SEO investment (per-service metadata, JSON-LD for the business, services, breadcrumbs and FAQs, sitemap, Romanian keyword targeting for "remodelare corporală Timișoara / Dumbrăvița"). Future work must not break it.

## Positioning

**Clinic-grade equipment at salon package pricing.** The differentiator is the value of the session packages — the multi-session tiers (e.g. 120 / 660 / 1000 RON for VShape, 280 / 530 / 700 RON for criolipoliză) put technology that is otherwise priced as a clinic procedure inside reach of a local salon budget.

This means price is not something to hide behind a "contact us for a quote". Transparent, comparable pricing is the argument, and the pricing surface is a persuasion asset rather than an afterthought.

## Operating Context

- **Location:** Petofi Sandor 101, Dumbrăvița 307160, Timiș, Romania. Area served: Timișoara and Dumbrăvița.
- **Hours:** Monday, Tuesday, Thursday 13:00–21:00; Wednesday and Friday 09:00–17:00; closed Saturday and Sunday. (The JSON-LD in `lib/jsonLds.ts` currently states 12:00–20:00 for the Mon/Tue/Thu block while the site FAQ in `lib/data.tsx` states 13:00–21:00 — one of the two is stale and needs the owner's confirmation before either is treated as authority.)
- **Payment:** cash, RON. `priceRange: "$$"`.
- **Contact:** phone +40 733 407 329; email cevikermihaela@gmail.com; Facebook `SalonSlimBeautyByMC`, Instagram `slimandbeautybymc`, TikTok `slimandbeautymc`.
- **Discovery path:** most visitors arrive from Google search or from the salon's own social posts, on mobile. Paid campaigns are an active concern (Meta Pixel and GTM conversion events are on the roadmap in `todo.txt`; `campaigns/` holds ad creatives and keyword exports).
- **Legal:** Romanian consumer-protection ANPC/SAL badge is required in the footer (`assets/anpc-sal.png`).

## Capabilities and Constraints

**Stack (existing):** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Radix UI primitives, framer-motion, `next/image` with sharp. Deployed on Vercel. Analytics via Google Tag Manager (`GTM-5L3ZD3KW`).

**Content model:** all services live in a single hand-authored file, `lib/data.tsx` — two categories (Remodelare Corporală, Dermato Cosmetică) holding 12 treatments. Each treatment carries short/medium/long descriptions, a "did you know" fact, a benefits list, its own FAQ set, price tiers, duration, and images. There is no CMS; the owner does not edit content, the developer does.

**Routes:** `/` (home), `/servicii` (all services), `/servicii/[category]`, `/servicii/[category]/[service]`.

**Booking — currently paused, intended to return.** The salon previously ran an on-site booking form backed by Google Calendar availability, Vonage SMS confirmation, and Upstash Redis rate limiting. That flow is switched off: the homepage renders the no-booking pricing section and the FAQ tells visitors to call. The implementation is still in the repo (`app/actions.ts`, `components/home/booking.tsx`, `components/home/booking_pricing.tsx`) and is **not** dead code to be deleted. Design and information architecture should stay compatible with online booking coming back as a primary CTA.

**Known open issue blocking its return** (from `todo.txt`): a booking whose service duration overruns into an already-scheduled next event is not correctly rejected.

**Undecided / not established:** whether blog pages will exist (on the roadmap, not committed); "servicii similare" cross-linking on service detail pages; whether the site will ever be multilingual.

## Brand Commitments

- **Name:** "Slim & Beauty by MC" (also written "Salon Slim & Beauty by M.C."). The "MC" is the owner, Mihaela Ceviker.
- **Domain:** www.slimandbeauty.ro.
- **Voice:** Romanian, warm and direct, addressing the reader informally as *tu*. Treatment copy is reassuring about safety and non-invasiveness ("non-invaziv", "fără timp de recuperare", "nedureros") without promising medical outcomes.
- **Existing assets:** logo (`/logo-og.png`, `/logo-jsonld.png`), owner portrait (`assets/owner.jpg`), salon interior photography (`assets/salon.jpg`, `assets/salon2.jpg`), per-service photography under `assets/services/`.
- **Build credit:** the site is built by SNS Automation, which keeps its own footer strip and logo (`components/sns/`, `sns-automation-logo.svg`). This is a standing commitment, not decoration.

## Evidence on Hand

Real, usable, and already in the repository:

- **Three named Facebook reviews** with profile images and links to the original posts (`components/home/testimonials.tsx`, `assets/reviews/`). These are genuine and attributable.
- **Aggregate rating 4.7 from 15 reviews**, declared in the business JSON-LD.
- **Two before/after pairs** (`assets/before_after/`) — real client results, and the only visual proof of outcome the site has.
- **Real pricing** for every treatment, including multi-session package tiers.
- **Real treatment durations** (30–75 minutes), used by the booking logic.
- **Salon and owner photography.**

- **"Peste 10 ani de experiență"** — the 10+ years figure is an existing claim already published on the homepage (`components/why-choose-us.tsx`). It is deliberately hardcoded rather than computed from `new Date()`, because the section is prerendered at build time and a runtime year would hydrate inconsistently after New Year.

Absences that future work must not fabricate: there are no case studies, no clinical trial results, no press coverage, no certifications on file, no client count, and no testimonials beyond the three real ones. Do not invent additional reviews, statistics, or credentials — and do not extend the before/after set with stock or generated imagery. New proof has to come from the owner.

## Product Principles

1. **Contact is the product.** Every surface earns its place by moving a hesitant visitor closer to calling, messaging, or walking in. Four channels, no single forced path.
2. **Price is the argument, not the objection.** Show real numbers and package tiers plainly; the positioning depends on the visitor being able to compare.
3. **Proof is scarce, so spend it well.** Three real reviews and two before/after pairs are the entire evidence budget. Place them where the decision is actually made, and never pad them with invented material.
4. **Reassure before you sell.** This audience is skeptical of body-treatment claims. Non-invasiveness, no downtime, and what the session is actually like matter more than superlatives.
5. **Mobile Romanian search traffic is the visitor.** Assume a phone, assume arrival from Google or Instagram — often onto a service detail page rather than the homepage — and never regress the existing SEO structure.
6. **Design for booking's return.** The site is in a paused state, not a final one; do not architect anything that would have to be torn out when online booking comes back.
