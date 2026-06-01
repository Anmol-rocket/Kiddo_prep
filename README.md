# KIDDOPREP — Quiz App

KIDDOPREP is an interactive exam-prep web application focused on AIIMS CRE-style multiple-choice practice. It provides topic-based quizzes, weightage-driven study mode, mock papers, progress tracking, and a modern dashboard built with Next.js and Tailwind CSS.

Key goals:
- Fast, accessible study flow for timed practice
- Clear progress tracking (per-topic stats, heatmap)
- Lightweight PWA installable on mobile

---

## Tech stack

- Next.js (App Router) + TypeScript
- React, Tailwind CSS, shadcn/ui components
- Lucide icons
- pnpm package manager

## Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (preferred) or npm/yarn

## Quick start (development)

Install and run locally:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 (Next may pick an alternate port if 3000 is busy).

Build for production:

```bash
pnpm build
pnpm start
```

Notes for Windows PowerShell users (same commands):

```powershell
> pnpm install
> pnpm dev
```

---

## Project structure (overview)

- `app/` — Next.js App Router routes, `layout.tsx`, and page entries
- `components/` — UI components (dashboard, topic card, materials section, shared UI primitives)
- `components/dashboard/` — modular dashboard pieces (StatsCard, FeatureCard, ProgressRing, etc.)
- `lib/` — helpers and data (e.g. `questions.ts`, `utils.ts`)
- `public/` — static assets (SVG favicons, manifest, mock papers, materials)
- `scripts/` — helper scripts (favicon generation)

Refer to the code for more granular module boundaries; components are organized to be composable and small.

---

## Key features & runtime behavior

- Topic quizzes (select a topic, attempt questions, see per-topic stats)
- Weightage Prep: study topics ordered/filtered by exam weightage (persistent stats kept separately)
- Materials & Mock Papers: view/download study resources; mark mocks as done and save scores
- Dashboard: progress ring, per-topic cards, heatmap, and quick actions
- Local persistence using `localStorage` for stats and mock metadata

Important localStorage keys used by the app:

- `kiddoprep_stats` — per-topic attempt/correct/incorrect/score/time stats
- `kiddoprep_weightage_stats` — weightage-prep-specific aggregated stats
- `kiddoprep_mock_done` — array of completed mock paper URLs
- `kiddoprep_mock_perf` — saved mock performance objects keyed by mock name

---

## PWA, Manifest & Favicons

- The app includes a `public/manifest.json` and SVG favicons in `public/` so the site can be installed as a PWA.
- Manifest entries: `background_color` and `theme_color` are set to match the dashboard's dark background so the status bar/cutout area blends with the UI when installed on mobile.
- If you need PNG icons (older platforms), `scripts/generate-favicons.js` attempts to create PNG/ICO variants. Note: this script uses Jimp and may raise errors on some environments — see Troubleshooting.

Installation note: after updating icons or manifest, uninstall any previously installed PWA and re-install (browsers cache manifest/icon aggressively).

---



## Component highlights

- `components/dashboard/progress-ring.tsx` — SVG-based circular progress indicator used across the dashboard.
- `components/dashboard/stats-card.tsx` — compact metric display used in the dashboard top row.
- `components/dashboard/feature-card.tsx` — large actionable cards (Weightage Prep, Study Materials).
- `components/materials-section.tsx` — materials browser with mock paper actions (mark done, save score modal).

When inspecting or changing dashboard components, prefer small, isolated changes and run the dev server to check for TypeScript or runtime errors.

---



## Contributing

- Fork → branch → PR. Keep changes focused per PR.
- Run `pnpm install` and `pnpm dev` locally to verify behavior.

If you'd like help with CI, adding automated tests, or producing PNG favicons reliably for CI, open an issue or ask in a PR and I can assist.

---

## License

This repository currently does not include a license file. Add `LICENSE` if you intend to publish or share under a specific license.

---

Built with care for exam preparation. 

