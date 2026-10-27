# Dependency Update (October 2026) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring every remaining dependency of slim_beauty to its newest safe version, using codemods where they exist, without changing what the site renders.

**Architecture:** One task per risk group (framework, animation, UI libraries, tooling, package manager). Each task bumps its group, runs the same verification harness built in Task 1, and commits on its own, so any group can be reverted alone.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind 4, TypeScript 6, ESLint 9 flat config, pnpm, deployed on Vercel.

**Spec:** The owner's request of 2026-10-27 ("lay out the remaining packages, check for latest, plan a full update with codemods, do it properly") and the version research below, done the same day with `pnpm outdated`, `npm view … time/peerDependencies`, the Next.js 16.4 release post, the Motion changelog and the pnpm 11/12 release notes.

## Version inventory

"Target" is the newest version in the allowed major line that is at least 7 days old on 2026-10-27 (published on or before 2026-10-20).

| Package | Now | Latest | Target | Notes |
|---|---|---|---|---|
| next | 16.3.0 | 16.4.3 (Oct 23) | **16.4.2** | Minor, no breaking changes. Upgrade via `@next/codemod upgrade` |
| eslint-config-next | 16.3.0 | 16.4.3 | **16.4.2** | Must match `next` |
| react, react-dom | 19.2.8 | 19.3.1 | **19.3.1** | Next 16.4 ships React 19.3 |
| @types/react, @types/react-dom | 19.2.18 / 19.2.4 | 19.3.0 | **19.3.0** | |
| framer-motion | 12.43.0 | 14.7.1 (today) | removed | Replaced by `motion` (SNS stack default, `motion/react`) |
| motion | — | 14.7.1 (today) | **14.4.0** | Breaking in 13.0: `@emotion/is-prop-valid` no longer auto-used. Breaking in 14.0: internal APIs removed. Neither is used here. No codemod exists |
| lucide-react | 1.28.0 | 1.62.0 (today) | **1.60.0** | Same major |
| @radix-ui/react-accordion | 1.2.20 | 1.3.1 | **1.3.1** | |
| @radix-ui/react-slot | 1.3.3 | 1.5.0 | **1.5.0** | |
| tailwind-merge | 3.6.0 | 3.7.0 | **3.7.0** | |
| schema-dts | 2.0.0 | 2.1.0 | **2.1.0** | Types only |
| sharp | 0.35.3 | 0.35.5 | **0.35.5** | Native; used by `next/image` |
| postcss | 8.5.25 | 8.5.32 (Oct 26) | **8.5.31** | |
| @types/node | 26.1.2 | 26.6.5 | **24.19.2** | Match the runtime: Node 24 is the active LTS (Krypton) and runs locally. Node 26 is not LTS yet |
| pnpm | 10.5.2 | 12.16.0 | **10.34.7**, then optionally **12.14.0** | See Task 5 and the gated Task 6 |
| eslint | 9.39.5 | 10.13.0 | **stay 9.39.5** | Blocked: `eslint-config-next` bundles `eslint-plugin-react` 7.37.5, `eslint-plugin-import` 2.32.0 and `eslint-plugin-jsx-a11y` 6.10.2, which all peer on `eslint <=9` |
| typescript | 6.0.3 | 7.0.2 | **stay 6.0.3** | Blocked: `typescript-eslint` 8.72.1 peers on `typescript >=4.8.4 <6.1.0` |
| tailwindcss, @tailwindcss/postcss | 4.3.3 | 4.3.3 | current | |
| class-variance-authority, clsx, js-cookie, @types/js-cookie | — | — | current | |

**Codemods:** `@next/codemod@16.4.3` has 23 transforms, and none target code written for 16.3 (they cover Next 13–16.0 migrations). The applicable tool is `@next/codemod upgrade`, which bumps next, react, the react types and eslint-config-next together and runs any matching codemods. Motion, Radix, Lucide and pnpm ship no codemods. The framer-motion → motion move is an import rewrite in one file.

**Not adopted in this plan:** Cache Components / Partial Prefetching (Next recommends them from 16.4, but adopting them is a refactor, not an update; use the `next-cache-components-adoption` skill separately). `next upgrade --agent` runs from `next@canary`; this plan uses the released `@next/codemod@16.4.3` instead.

## Global Constraints

- Package manager: pnpm. Never `npm install`.
- Pin exact versions from the "Target" column; no version published after 2026-10-20 unless the owner says so.
- ESLint stays on 9.x and TypeScript on 6.0.x until `eslint-config-next` and `typescript-eslint` widen their peers.
- Work on branch `chore/dependency-update`, one commit per task, conventional commits, ending with the `Co-Authored-By` line. Never push, merge or deploy. Those are the owner's calls.
- No change to rendered copy, routes, metadata or the consent behaviour (GTM must not load before "Accept").
- Read `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` after bumping Next (AGENTS.md rule).

## Review Focus

1. **Consent regression:** after the React/Next bump, GTM must still be absent until "Accept", and withdrawing must still clear `_ga*`. Task 2 adds a browser check.
2. **Motion cards stuck invisible:** if the `motion` import or API changed, `/servicii` cards that animate from `opacity: 0` would never appear. Task 3 checks computed opacity.
3. **Pricing accordion:** after the Radix bump, items must still open and close and stay keyboard-operable. Task 4 checks this.
4. **`next/image` after the sharp bump:** an optimised image URL must return 200 with an image content type, not a 500. The Task 1 harness checks this on every run.
5. **Vercel installs with a different pnpm:** a lockfile written by a newer pnpm can fail `--frozen-lockfile` on Vercel's default pnpm 9/10. Task 6 is gated on the owner enabling Corepack first.

---

### Task 1: Verification harness and baseline

**Files:**
- Create: `scripts/smoke.mjs`
- Create: `docs/superpowers/plans/2026-10-27-dependency-update-baseline.md` (measured numbers)

**Interfaces:**
- Produces: `node scripts/smoke.mjs [baseUrl]`. `baseUrl` defaults to `http://localhost:3123`. Exit code 0 when every check passes; 1 with one line per failure.

- [ ] **Step 1: Write `scripts/smoke.mjs`** (plain Node 24 ESM, `fetch`, no dependencies). It reads `${baseUrl}/sitemap.xml`, rewrites each `<loc>` origin to `baseUrl`, and asserts for every URL:
  - status 200;
  - exactly one `<h1` (regex `/<h1[\s>]/g`);
  - a non-empty `<title>`;
  - no `googletagmanager` in the HTML.

  It also asserts:
  - `${baseUrl}/pagina-inexistenta` returns 404;
  - the home HTML contains `rel="apple-touch-icon"`;
  - the first `/_next/image?url=…` `src` on the home page returns 200 with a `content-type` starting with `image/`.
- [ ] **Step 2: Build, start and run it**

  ```bash
  pnpm build && pnpm start -p 3123   # background
  node scripts/smoke.mjs
  ```

  Expected: `20 URLs ok` and exit code 0.
- [ ] **Step 3: Prove it catches a failure.** Run `node scripts/smoke.mjs http://localhost:3999` (nothing listening). Expected: exit code 1.
- [ ] **Step 4: Record the baseline** in the baseline file:
  - output of `pnpm lint` and `npx tsc --noEmit`;
  - `next build` route count and first-load JS size from the build output;
  - Lighthouse mobile performance score, LCP and CLS for `/` and `/servicii/dermato-cosmetica/epilare-definitiva-cu-laser-dioda` (`npx -y lighthouse@12.8.2 <url> --only-categories=performance --form-factor=mobile --chrome-flags="--headless=new"`).
- [ ] **Step 5: Commit** `chore: add smoke check for dependency updates`.

### Task 2: Next 16.4.2, React 19.3.1 (codemod upgrade)

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`, plus whatever files the codemods touch (expected: none)

- [ ] **Step 1: Run the official upgrade** with ESLint excluded, because it would otherwise bump `eslint` to 10:

  ```bash
  npx -y @next/codemod@16.4.3 upgrade 16.4.2 --yes --skip-eslint-upgrade --verbose
  ```

  Expected: `next` → 16.4.2, `react` and `react-dom` → 19.3.1, `@types/react` and `@types/react-dom` → 19.3.0. Write down every codemod it reports running.
- [ ] **Step 2: Bump the lint config to match:** `pnpm add -D -E eslint-config-next@16.4.2`. Then check `package.json` holds exactly the targets, with no `^` on `next` or `eslint-config-next`, and that `eslint` is still 9.39.5.
- [ ] **Step 3: Read** `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` and `codemods.md`. List any 16.4 deprecation that applies to this repo; expected none. `AGENTS.md` may be rewritten by `next dev`; keep the regenerated block if it changes.
- [ ] **Step 4: Verify.** `pnpm lint` and `npx tsc --noEmit` should be clean. Then `pnpm build`, restart the server, and `node scripts/smoke.mjs` should exit 0.
- [ ] **Step 5: Consent check** (Review Focus 1). In a fresh isolated browser context (chrome-devtools MCP, not the owner's Chrome):
  - load `/`: no cookies, banner visible, no `iframe`, `window.google_tag_manager` undefined;
  - click Accept: `sb_consent=granted` and `_ga` present;
  - open "Setări cookie" and click Refuz, then reload: the only cookie is `sb_consent=denied`.
- [ ] **Step 6: Commit** `chore: upgrade next to 16.4.2 and react to 19.3.1`.

### Task 3: framer-motion 12 → motion 14.4.0

**Files:**
- Modify: `app/servicii/page-client.tsx:5`, `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1:** `pnpm remove framer-motion && pnpm add -E motion@14.4.0`
- [ ] **Step 2:** In `app/servicii/page-client.tsx`, change `import { motion } from "framer-motion"` to `import { motion } from "motion/react"`. `grep -rn "framer-motion" app components lib` must then return nothing.
- [ ] **Step 3: Verify.** Lint, tsc, build and smoke all pass.
- [ ] **Step 4: Animation check** (Review Focus 2). Load `/servicii` at 400×850 and 1280×800 and scroll to the bottom. Every `[style*="opacity"]` motion card must end with computed `opacity` of `1`. Take one screenshot per width.
- [ ] **Step 5: Commit** `refactor: move from framer-motion to motion 14`.

### Task 4: UI libraries (lucide, Radix, tailwind-merge, schema-dts)

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1:**

  ```bash
  pnpm add -E lucide-react@1.60.0 @radix-ui/react-accordion@1.3.1 @radix-ui/react-slot@1.5.0 tailwind-merge@3.7.0 schema-dts@2.1.0
  ```
- [ ] **Step 2: Verify.** Lint, tsc, build and smoke all pass. tsc catches any renamed Lucide icon or changed schema-dts type; fix the import at the reported line, not with a cast.
- [ ] **Step 3: Accordion check** (Review Focus 3). On `/#preturi`:
  - click the first item: its content becomes visible and `aria-expanded="true"`;
  - press Enter on the second trigger: it opens and the first closes (`type="single"`).
- [ ] **Step 4: Commit** `chore: update lucide, radix, tailwind-merge and schema-dts`.

### Task 5: Tooling (sharp, postcss, Node types, pnpm 10.34.7)

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Owner decision.** Is the Vercel project's Node.js version 24.x? (Settings → Build and Deployment.)
  - If yes, add `"engines": { "node": "24.x" }` to `package.json` and use `@types/node@24.19.2`.
  - If it is 22.x, use `@types/node@22` and `"22.x"`. If it is 26.x, keep `@types/node@26.6.5`.
- [ ] **Step 2:** `pnpm add -E sharp@0.35.5 && pnpm add -D -E postcss@8.5.31 @types/node@<from step 1>`
- [ ] **Step 3:** Set `"packageManager": "pnpm@10.34.7"`, run `corepack use pnpm@10.34.7` (or `pnpm self-update 10.34.7`), then `pnpm install`. `pnpm-lock.yaml` must still start with `lockfileVersion: '9.0'`.
- [ ] **Step 4: Verify.** Lint, tsc, build and smoke all pass; the smoke's `/_next/image` check covers sharp (Review Focus 4). Rerun the Task 1 Lighthouse pair and add the numbers to the baseline file as "after". LCP or score worse than the baseline by more than one run's noise (±10 score points) is a finding to report, not a reason to revert.
- [ ] **Step 5: Commit** `chore: update sharp, postcss, node types and pnpm 10.34.7`.

### Task 6 (gated): pnpm 12.14.0

Do this only after the owner has set `ENABLE_EXPERIMENTAL_COREPACK=1` in the Vercel project's environment variables (Review Focus 5). Without it, Vercel ignores `packageManager` and installs with pnpm 9/10.

**Files:**
- Create: `pnpm-workspace.yaml`
- Modify: `package.json` (remove the `"pnpm"` field; set `packageManager`), `pnpm-lock.yaml`

- [ ] **Step 1:** Move the build-script allowlist. pnpm 11+ ignores `package.json#pnpm` and replaces `onlyBuiltDependencies` with `allowBuilds`. It also sets `strictDepBuilds: true` by default, so an unlisted package with an install script fails the install. Create `pnpm-workspace.yaml`:

  ```yaml
  allowBuilds:
    sharp: true
    unrs-resolver: true
  ```

  Delete the `"pnpm"` block from `package.json`.
- [ ] **Step 2:** `corepack use pnpm@12.14.0`, then `pnpm install`.
  - Expected: no `ERR_PNPM_IGNORED_BUILDS` / strict-build error and no `ERR_PNPM_UNRECOGNIZED_WORKSPACE_SETTINGS`.
  - If another package needs its build script, add it to `allowBuilds` only after checking what the script does.
  - pnpm 11+ defaults `minimumReleaseAge` to 1 day; leave that default.
- [ ] **Step 3: Verify.** `pnpm install --frozen-lockfile` passes on a clean `node_modules`, then lint, tsc, build and smoke all pass.
- [ ] **Step 4:** Tell the owner that local machines need pnpm 12 through Corepack (`corepack enable`). Other SNS repos keep their own `packageManager` pins and are unaffected.
- [ ] **Step 5: Commit** `chore: move to pnpm 12`.
