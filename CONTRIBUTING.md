# Contributing to the Noitis website

This repository contains the public-facing Noitis company website. Changes should keep the site clear, trustworthy, accessible, fast, and straightforward to maintain.

## Before changing the site

- Preserve the approved Noitis visual identity unless the change explicitly updates the brand.
- Keep company, product, legal, privacy, and trademark statements factual and supportable.
- Do not add product capabilities, customer claims, certifications, partnerships, addresses, contact details, or legal assertions that have not been verified.
- Do not add secrets, analytics keys, private endpoints, customer data, or internal-only information to frontend source.
- Prefer semantic HTML and accessible interactions over decorative complexity.
- Keep the website independent from application backends unless a real public-site requirement later justifies an integration.

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

## Engineering expectations

- Production builds must pass before merging or pushing intentional release changes to `main`.
- Keyboard navigation, focus states, reduced-motion behavior, mobile layouts, and light/dark themes must remain usable.
- Images require appropriate alternative-text decisions: meaningful images need useful alt text; decorative images should use empty alt text.
- Public metadata, page titles, descriptions, canonical-domain assumptions, and privacy content should be reviewed when public URLs or business details change.
- Keep GitHub Pages deployment reproducible and separate from application product infrastructure.

See `docs/engineering/ENGINEERING_STANDARD.md` for the full website standard.
