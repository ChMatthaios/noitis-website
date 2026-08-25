# Noitis Website Engineering Standard

This document adapts the Noitis Engineering Foundation to the public company website. The goal is a trustworthy, accessible, reproducible site—not application-backend ceremony.

## 1. Static-first by default

The website is a public information surface. Keep it deployable as static assets unless a concrete feature requires server-side capability.

Do not add API, database, warehouse, authentication, queue, microservice, CMS, or cloud-service scaffolding merely for architectural appearance.

The website currently owns no database. Do not create a `database/` directory just to mirror application repositories; the Noitis `database/db_objects` and `database/conf_data` standard applies only when a repository genuinely owns database objects or configuration data.

## 2. Public claims are production data

Company copy, product descriptions, pricing references, legal statements, privacy statements, trademark language, locations, contact information, certifications, partnerships, customer claims, and availability statements can affect public trust.

Treat them as reviewed product content:

- do not invent or imply unverified facts;
- distinguish current capability from roadmap or in-development status;
- update stale claims when products or company details change;
- keep provisional legal/operator details explicit until they change;
- do not use the registered trademark symbol unless registration actually supports it.

## 3. Accessibility is a release requirement

Changes must preserve or improve:

- semantic landmarks and heading order;
- keyboard access;
- visible focus states;
- sufficiently large interactive targets;
- meaningful link/button labels;
- appropriate image alternative text;
- responsive layouts;
- readable contrast;
- reduced-motion behavior;
- light/dark theme usability.

Accessibility should be tested as behavior, not inferred from visual appearance alone. Phase 1 provides the foundation; the dedicated accessibility/SEO/quality phase owns full validation.

## 4. Performance and assets

Prefer simple, cacheable static output. Avoid unnecessary runtime dependencies and client-side work.

Large images should be reviewed for format, dimensions, compression, and whether duplicate source/public copies are genuinely necessary before the site is considered production-optimized.

Do not make visual polish dependent on blocking third-party scripts.

## 5. SEO and discoverability

Each public entry point should have an accurate title and description. Canonical URLs, social preview metadata, robots/sitemap behavior, redirects, and structured data must be introduced deliberately as the roadmap reaches content/SEO readiness.

Do not hard-code an unowned future production domain as authoritative. A temporary public Pages address may be used while the final production domain remains a later deployment concern.

## 6. Privacy and security

The current static site should not contain secrets or private operational data.

Never commit:

- API keys or credentials;
- internal-only endpoints;
- customer/user data;
- private analytics identifiers that are not intended for public frontend use;
- internal documents or operational metadata.

If analytics, forms, cookies, newsletters, or other data collection are added later, document the legal basis, consent behavior where applicable, data destinations, retention, failure modes, and privacy-notice changes before treating them as production-ready.

## 7. Frontend boundaries

React components may own presentation and local interaction state such as navigation or theme preference. They must not become a hidden source of truth for operational Noitis product behavior.

Keep product marketing data explicit and easy to review. Extract sections/components/data only when it improves ownership or testability; do not fragment a modest site into artificial layers.

## 8. Deterministic builds

Use the committed `package-lock.json` with `npm ci` in CI and deployment.

The repository baseline is Node.js 22.13.0. A production change is not healthy until the exact commit passes the configured GitHub Actions build.

## 9. CI and deployment separation

CI validates pushes and pull requests. GitHub Pages deployment runs from `main`.

The deployment workflow must build from committed source and lockfiles, may enable/configure Pages through `actions/configure-pages`, uploads only the generated `dist/` artifact, and deploys through the supported Pages action. Do not deploy locally generated output or bypass the repository build contract.

Phase branches do not deploy automatically; the `main` deployment is the external verification after phase approval.

## 10. Domain and deployment configuration

Keep domain ownership, DNS, HTTPS, and GitHub Pages settings outside component code. Relative build paths are intentional while the site may run at either a GitHub Pages project URL or a future custom domain.

Do not commit a speculative custom domain before ownership and DNS are under control.

## 11. Testing direction

As the site grows, tests should prioritize user-visible and release-critical behavior:

- navigation and mobile-menu behavior;
- theme switching;
- accessibility regressions;
- legal-page reachability;
- important external/internal links;
- responsive smoke checks;
- metadata/indexability checks;
- production build/deployment integrity.

Introduce test tooling when it provides real coverage, not just to populate a folder.

## 12. Phase milestone branches

Each `phase-N` branch is a historical milestone. Once a phase is accepted, do not move that branch forward with later implementation. `main` represents the latest accepted phase.

## 13. Architecture evolution

Prefer the smallest architecture that keeps public content reliable and maintainable. Add complexity only for an observed requirement: content-management workflow, authenticated area, forms, analytics, localization, experimentation, or another concrete capability.
