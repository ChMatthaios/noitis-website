# Noitis Website — Phase 5 Launch Candidate

**Branch:** `phase-5`  
**Baseline:** accepted `phase-4` milestone  
**Launch-candidate review started:** 3 September 2026

Phase 5 is the final pre-launch review of the Noitis company website. It does not replace the external Phase-4 activation work: the final domain, GitHub Pages settings, DNS, certificate/HTTPS enforcement, and live-site health gate still have to exist before the launch candidate can be accepted as 100% complete.

## Launch-candidate principles

1. The website stays static-first React/TypeScript/Vite on GitHub Pages.
2. Public claims remain conservative and must reflect accepted product milestones rather than future roadmap intent.
3. A product card may remain intentionally non-linking until a real HTTPS public product destination has been verified.
4. Localhost/private/demo destinations must never leak into production output.
5. Phase 5 cannot mark external DNS/TLS/live-host evidence complete from source control alone.
6. Phase 5 acceptance requires both automated gates and an explicit final manual review.

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

The existing `npm run check:production` and `npm run check` gates reject local/non-HTTPS publication configuration and development-only URLs in production output.

## Automated acceptance gates

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

## Production-preview manual review

Before acceptance, review the built/previewed site on supported desktop/mobile widths and verify:

- all main navigation links and the mobile menu;
- keyboard skip navigation and focus visibility;
- product-card copy and intentional link/non-link behavior;
- Privacy, Terms, and Trademark pages;
- light/dark theme switching and persistence;
- responsive layout and absence of horizontal overflow;
- public contact information and footer/legal navigation;
- canonical/Open Graph/social-preview metadata in the production build;
- no confidential, customer, localhost, or development-only data is exposed.

## Final accessibility / SEO / hosting / legal review

Phase 3 automated quality gates remain the baseline. Phase 5 adds a final release review of:

- heading/landmark structure, keyboard operation, labels, focus, target sizing, reduced motion, and contrast;
- title/description/canonical/robots/structured-data/Open Graph/Twitter metadata;
- sitemap and robots consistency with the final production URL;
- HTTPS and live hosting response behavior/security headers once the final domain is serving;
- public Privacy, Terms, Trademark, operator/contact, and analytics statements against the actual launch configuration.

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

- the automated clean-checkout and browser gates are green;
- the production-preview manual review is complete;
- the final accessibility/SEO/legal/hosting review has no unresolved critical issue;
- external DNS/TLS/canonical/live-health evidence is green;
- public product-link decisions are verified;
- no critical issue remains open.

Until then, the branch is a **Phase-5 candidate in progress**, not an accepted launch candidate.
