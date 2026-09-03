# Noitis Website — Phase 5 Launch Candidate

**Branch:** `phase-5`  
**Baseline:** accepted `phase-4` milestone  
**Launch-candidate review started:** 3 September 2026  
**Repository-side acceptance gates:** green on 3 September 2026

Phase 5 is the final pre-launch review of the Noitis company website. It does not replace the external Phase-4 activation work: the final domain, GitHub Pages settings, DNS, certificate/HTTPS enforcement, and live-site health gate still have to exist before the launch candidate can be accepted as 100% complete.

## Launch-candidate principles

1. The website stays static-first React/TypeScript/Vite on GitHub Pages.
2. Public claims remain conservative and must reflect accepted product milestones rather than future roadmap intent.
3. A product card may remain intentionally non-linking until a real HTTPS public product destination has been verified.
4. Localhost/private/demo destinations must never leak into production output.
5. Phase 5 cannot mark external DNS/TLS/live-host evidence complete from source control alone.
6. Phase 5 acceptance requires both automated gates and an explicit final production-host review.

## Product-copy freeze

The public catalogue was re-audited on 3 September 2026 against the accepted Phase-4 milestone of each product and updated in:

- `src/productCatalog.ts`
- `docs/content/PRODUCT_CATALOG.md`

The current candidate deliberately keeps every product status as **In development** and preserves the product-specific safety boundaries:

- AgentGate: production integrations/approval delivery remain later work.
- AutoPaylot: real payment execution remains disabled.
- Business Resource Scheduler: external calendar/API/webhook synchronization remains later work.
- EarnLogic: productized CRM/ERP/HRIS/payroll/API integrations remain later work.
- FamilyOS: provider platform, authoritative availability, and real payments remain later work.
- LegacyCI: semantic lineage parsing/change-impact semantics remain later work.

This catalogue is frozen for the current candidate unless a factual/legal correction, approved public destination, or accepted product milestone requires reopening it.

## Product-link decision rule

Production product/pricing links are optional build-time variables. The launch-candidate rule is fail-safe:

- configure a product URL only when the product has a real HTTPS public deployment that has been reviewed as safe;
- otherwise leave the variable unset and allow the card to show `Public access not configured`;
- never use localhost, a private environment, or an unsafe demo as a production destination.

`npm run check:production` rejects local/non-HTTPS production URL configuration. `npm run check` rejects development-only destinations in built production output. `npm run check:browser` verifies that every product card exposes exactly one intentional product-access state and that every configured product/pricing link is HTTPS and non-local.

## Repository-side acceptance evidence

The repository-side Phase-5 candidate passed the clean GitHub Actions flow on 3 September 2026.

**Green CI evidence:** GitHub Actions run **104**, commit `af639a5a56aeb9cb857c819f042f8163076b33d2`.

The run started from a clean checkout and completed successfully through:

1. Node.js 22.13.0 setup;
2. `npm ci`;
3. `npm run check:production`;
4. `npm run check`, including launch-script syntax validation, production build, publication/content validation, local-link/built-asset validation, and quality/bundle gates;
5. temporary pinned Playwright `1.62.1` installation;
6. Chromium, Firefox, and WebKit installation;
7. `npm run check:browser` across mobile, tablet, and desktop viewports.

The Phase-5 browser gate covers:

- main navigation destinations;
- mobile navigation open/Escape behavior;
- the six expected product cards and their intentional linked-vs-unconfigured states;
- HTTPS/non-local safety for configured product/pricing links;
- Privacy, Terms, and Trademark pages;
- light/dark theme switching and persistence;
- keyboard skip navigation;
- semantic landmarks and control labels;
- reduced-motion behavior;
- target sizes;
- responsive overflow checks;
- Chromium, Firefox, and WebKit behavior.

## Automated acceptance commands

From a clean checkout of `phase-5` using Node 22.13.0:

```powershell
npm ci
npm run check:production
npm run check
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install --with-deps chromium firefox webkit
npm run check:browser
```

GitHub Actions `.github/workflows/ci.yml` runs the same production-safe configuration, build/content/link/quality checks, and pinned Chromium/Firefox/WebKit browser smoke gate on every push and pull request.

## Final production-host review

Repository/preview validation is complete, but final acceptance still requires the real published host. Once the final domain is live, verify:

- HTTPS and the intended canonical host/redirect behavior;
- all four public HTML pages;
- canonical metadata and social-preview metadata;
- `robots.txt` and `sitemap.xml` against the production URL;
- `site.webmanifest`, `social-preview.png`, and `noitis-mark.svg` resolving correctly;
- the observed hosting/security headers and any material release concern they create;
- the public Privacy, Terms, Trademark, operator/contact, and analytics statements against the actual launch configuration;
- every configured public product/pricing destination by opening and reviewing the actual destination.

The strengthened `npm run check:live` performs the deterministic live-host checks and reports observed hosting/security headers for final review.

No analytics are enabled in the current candidate.

## External evidence still required

The following cannot be proven by the branch alone and remain blocking until externally verified:

1. final Noitis production domain ownership/confirmation;
2. GitHub Pages enabled with GitHub Actions as the source;
3. final repository Actions publication variables configured;
4. custom-domain and DNS records configured and ownership verified;
5. certificate provisioned and HTTPS enforced;
6. canonical/default-domain/apex-or-www redirect behavior verified;
7. `npm run check:live` green against the final public URL;
8. every configured public product/pricing destination opened and reviewed as intentional/publicly safe.

## Go / no-go rule

Phase 5 may be accepted only when:

- the automated clean-checkout and browser gates are green — **complete**;
- the repository/production-preview contract is green — **complete**;
- the final accessibility/SEO/legal/hosting review has no unresolved critical issue — **pending live host**;
- external DNS/TLS/canonical/live-health evidence is green — **pending live host**;
- public product-link decisions are verified against the real configured production destinations — **pending production configuration**;
- no critical issue remains open — **pending final go/no-go**.

Until then, the branch is a **Phase-5 candidate with repository gates complete and external acceptance pending**, not an accepted launch candidate.
