# Dependency update: baseline and results

Measured on a local production build (`pnpm build && pnpm start -p 3123`), Windows, Node 24.19.0.
Lighthouse 12.8.2, mobile form factor, simulated throttling, two runs per page.

## Before (main at e8621e5, next 16.3.0, react 19.2.8)

| Check | Result |
|---|---|
| `pnpm lint` | clean |
| `npx tsc --noEmit` | clean |
| `next build` | 26 static pages |
| Client JS in `.next/static` | 19 files, 872.6 KB raw, 267.8 KB gzip |
| `node scripts/smoke.mjs` | 20 URLs ok |
| Lighthouse `/` | 81 / 81, LCP 5.1 s, CLS 0, TBT 20–30 ms |
| Lighthouse `/servicii/dermato-cosmetica/epilare-definitiva-cu-laser-dioda` | 83 / 83, LCP 4.7 s, CLS 0, TBT 60 ms |

## After (next 16.4.2, react 19.3.1, motion 14.4.0, pnpm 10.34.7)

| Check | Result |
|---|---|
| `pnpm lint` | clean |
| `npx tsc --noEmit` | clean |
| `next build` | 26 static pages |
| Client JS in `.next/static` | 19 files, 889.0 KB raw, 274.8 KB gzip (+16.4 KB raw, +7.0 KB gzip) |
| `node scripts/smoke.mjs` | 20 URLs ok |
| Lighthouse `/` | 81 / 81, LCP 5.1 s, CLS 0, TBT 20 ms |
| Lighthouse `/servicii/dermato-cosmetica/epilare-definitiva-cu-laser-dioda` | 83 / 83, LCP 4.7 s, CLS 0, TBT 40–60 ms |

No measurable change in Lighthouse. Client JS grew by about 7 KB gzip across all chunks. Its source was not broken down; React 19.3 and motion 14 are the likely contributors.
