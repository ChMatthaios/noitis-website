# Noitis Website

> **Intelligence, engineered.**

Official company website for **Noitis**, a Greece-based technology company building intelligent systems people can trust.

## Status

The repository contains the current public website frontend and GitHub Pages deployment configuration.

The site is intentionally **static-first**. It does not contain a product backend, operational database, authentication service, or data warehouse. Those systems should not be added unless a real website capability requires them.

## Stack

- React
- TypeScript
- Vite
- GitHub Actions
- GitHub Pages

## Requirements

- Node.js 22.13.0 or newer in the Node 22 line
- npm
- Git
- a modern browser

## Local development

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Validation

```bash
npm run check
```

`check` runs the TypeScript/Vite production build. A successful build confirms the current static website compiles; it does not substitute for browser, accessibility, content, or legal review.

## Production preview

```bash
npm run build
npm run preview
```

Production files are generated in `dist/`.

## Pages

The Vite build has two HTML entry points:

- `index.html` — Noitis company website
- `privacy.html` — Noitis privacy notice

The privacy notice remains subject to verification of the final controller, contact, processing, and deployment details before it should be treated as a completed production legal notice.

## Continuous integration

`.github/workflows/ci.yml` validates pushes and pull requests with:

```text
checkout
  ↓
Node 22.13.0
  ↓
npm ci
  ↓
npm run check
```

The committed `package-lock.json` is the dependency authority for CI and deployment.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` deploys from `main`.

The workflow:

1. checks out the exact commit;
2. installs dependencies with `npm ci`;
3. validates/builds the site;
4. uploads the generated `dist/` artifact;
5. deploys that artifact through GitHub Pages.

In **Settings → Pages**, the deployment source should be **GitHub Actions**.

Until a custom domain is owned and configured, GitHub Pages provides the public project URL.

## Custom Noitis domain

The repository intentionally does not rely on a committed `CNAME` file for the current custom Actions-based Pages workflow.

When a final domain is registered and its DNS is under your control:

1. open **GitHub → noitis-website → Settings → Pages**;
2. enter the final custom domain;
3. configure the required DNS records with the domain provider;
4. wait for GitHub's domain/DNS verification;
5. enable HTTPS;
6. review canonical URLs, redirects, metadata, sitemap/robots behavior, and social preview metadata for the final public address.

The Vite configuration uses relative asset paths so the same site build can work on a GitHub Pages project URL and later on a custom Noitis domain without rewriting application components.

## Accessibility direction

The current site is designed around:

- readable typography;
- high contrast;
- visible keyboard focus;
- appropriately sized interactive targets;
- semantic navigation;
- no hover-only information;
- reduced-motion support;
- responsive mobile navigation;
- light and dark themes.

Accessibility remains a release requirement and should be tested as behavior, not assumed from styling alone.

## Brand palette

| Name | Hex | Role |
|---|---|---|
| Midnight Navy | `#0B1020` | Trust, security, infrastructure |
| Trust Blue | `#3B82F6` | Confidence and primary actions |
| Electric Cyan | `#22D3EE` | Active systems and innovation |
| Future Violet | `#8B5CF6` | Frontier technology |
| Ice White | `#EAF2FF` | Clarity and clean surfaces |

## Repository structure

```text
noitis-website/
├── src/                       # React source and stylesheet entry point
├── media/                     # Noitis/product source artwork
├── public/                    # files copied directly into the build
├── docs/
│   ├── architecture/
│   ├── decisions/
│   └── engineering/
├── .github/workflows/
│   ├── ci.yml
│   └── deploy-pages.yml
├── index.html
├── privacy.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

## Engineering documentation

- [`docs/architecture/OVERVIEW.md`](./docs/architecture/OVERVIEW.md) — current website architecture and boundaries
- [`docs/engineering/ENGINEERING_STANDARD.md`](./docs/engineering/ENGINEERING_STANDARD.md) — public-site engineering rules
- [`docs/engineering/FRONTEND_ARCHITECTURE.md`](./docs/engineering/FRONTEND_ARCHITECTURE.md) — frontend ownership and growth rules
- [`docs/decisions/0001-static-first-company-website.md`](./docs/decisions/0001-static-first-company-website.md) — static-first/GitHub Pages architecture decision
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — contribution and validation expectations

## Trademark status

**NOITIS™** is currently used as a claimed trade mark. The `™` symbol does not indicate registration. Do not use the registered symbol unless registration has actually been granted in the relevant territory.

## Architecture principle

The website should stay as simple as its job allows:

> **Public information and brand presentation in the browser; operational product authority stays in the product systems that own it.**
