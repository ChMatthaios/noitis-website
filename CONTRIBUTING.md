# Contributing to the Noitis website

This repository contains the public-facing Noitis company website. Changes should keep the site clear, trustworthy, accessible, fast, and straightforward to maintain.

## Phase workflow

The repository uses milestone branches:

```text
phase-1 = accepted Phase 1 state only
phase-2 = Phase 1 + accepted Phase 2
phase-3 = Phases 1-3
...
main    = latest accepted phase
```

Work on the active phase branch. After that phase is implemented, tested, documented, reviewed, and merged, keep the completed phase branch at that milestone instead of moving it forward with later work.

Before starting the next phase, create/synchronize that next phase branch from the latest accepted `main` state.

## Before changing the site

- Preserve the approved Noitis visual identity unless the change explicitly updates the brand.
- Keep company, product, legal, privacy, and trademark statements factual and supportable.
- Do not add product capabilities, customer claims, certifications, partnerships, addresses, contact details, or legal assertions that have not been verified.
- Do not add secrets, analytics keys, private endpoints, customer data, or internal-only information to frontend source.
- Prefer semantic HTML and accessible interactions over decorative complexity.
- Keep the website independent from application backends unless a real public-site requirement later justifies an integration.
- Do not create database/API scaffolding for symmetry; this repository currently has no operational database or backend.

## Local validation

Use Node.js 22.13.0 or newer in the Node 22 line.

```bash
npm ci
npm run check
```

For local development:

```bash
npm run dev
```

For production preview:

```bash
npm run build
npm run preview
```

## Engineering expectations

- Production builds must pass before merging intentional phase/release changes to `main`.
- Keyboard navigation, focus states, reduced-motion behavior, mobile layouts, and light/dark themes must remain usable.
- Images require appropriate alternative-text decisions: meaningful images need useful alt text; decorative images should use empty alt text.
- Public metadata, page titles, descriptions, canonical-domain assumptions, and privacy content must be reviewed when public URLs or business details change.
- Keep GitHub Pages deployment reproducible and separate from application product infrastructure.
- Pages deployment runs from `main`; a phase branch proves build health through CI, while the post-merge `main` deployment proves the hosting step.
- Update relevant Markdown whenever architecture, scripts, phase status, hosting behavior, public claims, or legal/data practices change.

See `docs/engineering/ENGINEERING_STANDARD.md` for the full website standard and `ROADMAP.md` for phase acceptance criteria.
