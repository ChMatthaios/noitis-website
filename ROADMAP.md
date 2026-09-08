# Noitis Website Roadmap

This roadmap is the implementation sequence for the public Noitis company website. The site remains static-first unless a real website requirement justifies additional infrastructure. The final phase is the official Noitis website launch on its production domain.

## Implementation audit — 2026-09-08

- **Phases 1–3 are complete and accepted.** The website has the static-first React/TypeScript/Vite foundation, reviewed publication content, product catalogue, legal/publication controls, accessibility/SEO/quality checks, and cross-browser smoke coverage required for the accepted pre-production milestone.
- **Phase 4 repository-side production operations are complete and accepted.** The accepted Phase-4 milestone contains fail-closed production URL/domain validation, a hardened GitHub Pages deployment workflow, daily live-site health monitoring, weekly dependency update automation, explicit CODEOWNERS ownership, an analytics/privacy decision, and documented DNS/canonical/redirect/rollback/emergency procedures. Actual production-domain activation is intentionally performed at official launch in Phase 6 rather than being treated as repository implementation work.
- **Phase 5 launch-candidate readiness is complete and accepted.** The launch copy/product catalogue was re-audited against the accepted product milestones. Clean GitHub Actions checkout validation covers production configuration, launch-script syntax, build/content/link/quality checks, and the pinned Playwright Chromium/Firefox/WebKit production-preview gate. The browser gate verifies navigation, legal pages, responsive states, theme persistence, and safe intentional linked-vs-unconfigured product-card states.
- **The Noitis PNG logo remains the approved browser-tab favicon.** The accepted site uses `media/Noitis Logo - Light.png` as the Vite source asset for the public-page favicon rather than substituting the lightweight manifest SVG mark.
- **Phase 6 repository launch-readiness tooling is implemented on `phase-6`.** The Phase-6 branch starts from the exact accepted Phase-5 milestone and adds a deterministic live Chromium desktop/mobile smoke test, stronger canonical-domain/default-Pages/optional apex-or-www redirect verification, approved live PNG-favicon verification, the combined `npm run check:phase6` gate, a manual GitHub Actions Phase-6 live-acceptance workflow, and `docs/PHASE-6-LAUNCH.md`.
- **Phase 6 itself is not marked complete before real launch evidence exists.** Final domain ownership/activation, Pages settings, DNS/TLS, deployment from `main`, live checks, manual UI acceptance, monitoring confirmation, and the intentional public launch announcement are external/runtime launch actions and remain open until actually verified.
- Production builds continue to enforce public-safe product destinations and publication metadata. Permanent local product links remain a development concern rather than leaking into production output.
- Phase branches are milestone branches. Once a phase is accepted and merged, its branch is kept at that completed phase and is not advanced with later-phase implementation.

## Phase 1 — Company website foundation — Complete
- [x] React/TypeScript/Vite static-first website
- [x] Noitis brand identity, product presentation, and responsive navigation
- [x] Light and dark themes
- [x] Privacy, Terms, and Trademark public pages
- [x] Proprietary repository/license and trademark documentation
- [x] GitHub Actions CI and Pages deployment workflow
- [x] Product links and public company positioning

## Phase 2 — Content and product readiness — Complete
- [x] Review every company/product claim against the current product state
- [x] Keep product descriptions, optional pricing links, and launch status synchronized through the reviewed product catalogue and deployment configuration
- [x] Complete company/about/contact content required for the current launch path
- [x] Add social-preview metadata and a committed share image
- [x] Add sitemap and robots generation for the current public address and future production-domain transition
- [x] Review legal pages for the current Noitis operator identity, hosting model, and actual data practices
- [x] Keep permanent local development product links aligned to the Noitis application ports without leaking them into production builds
- [x] Remove placeholder/development-only destinations from production builds and enforce that boundary in `npm run check`

**Phase 2 evidence:** `src/productCatalog.ts` is the reviewed public product catalogue; `.env.example` documents publication/product URL configuration; `scripts/generate-publication-files.mjs` creates sitemap/robots output; `scripts/verify-content.mjs` rejects leaked local destinations and missing publication metadata; the public legal pages and Markdown remain the accepted publication baseline.

## Phase 3 — Accessibility, SEO, and quality — Complete / accepted
- [x] Complete keyboard-only and screen-reader-oriented semantic review
- [x] Validate contrast, focus, reduced motion, headings, landmarks, and target sizes
- [x] Test responsive behavior across supported mobile, tablet, and desktop sizes
- [x] Validate metadata, canonical URLs, structured data where appropriate, and indexability
- [x] Optimize images, font policy, bundle size, and Core Web Vitals-oriented loading behavior
- [x] Add automated publication, content, local-link, asset, bundle-budget, and link/build checks
- [x] Add Chromium, Firefox, and WebKit browser smoke coverage across mobile, tablet, and desktop
- [x] Preserve accepted product/icon presentation while completing the quality milestone

**Phase 3 evidence:** `npm run check` performs the production build plus publication/content, local-link, accessibility/quality-policy, image/asset, and bundle-budget verification. `npm run check:browser` uses `scripts/browser-smoke.mjs` for Chromium/Firefox/WebKit coverage at mobile/tablet/desktop sizes and exercises semantic landmarks, keyboard skip navigation, mobile navigation/Escape behavior, reduced motion, target sizing, responsive overflow, accessible control labels, and theme persistence.

## Phase 4 — Production domain and operations — Complete / accepted
- [x] Define and validate the final production-domain configuration contract
- [x] Provide a GitHub Pages workflow that can be enabled with GitHub Actions and repository publication variables
- [x] Define the custom-domain, DNS, ownership-verification, certificate, and HTTPS activation procedure for official launch
- [x] Implement production URL/custom-domain validation and a single canonical publication configuration source
- [x] Define canonical/default-domain/apex-or-www redirect verification for the real production launch
- [x] Review analytics need/legal basis and intentionally keep analytics disabled while no justified requirement exists
- [x] Define live website monitoring, broken-link checks, dependency updates, and content/operations ownership
- [x] Document DNS/canonical policy, normal rollback, emergency unpublish, and emergency content/legal update procedures
- [x] Provide a deterministic production live-health gate for Phase-6 activation verification

**Phase 4 evidence:** `scripts/verify-production-config.mjs` provides `npm run check:production`; `scripts/verify-publication-health.mjs` provides `npm run check:live`; `.github/workflows/deploy-pages.yml` fails closed on missing/unsafe production configuration and uses the current Pages Actions artifact path; `.github/workflows/site-health.yml` runs daily when Pages is enabled; `.github/dependabot.yml` defines weekly npm/Actions review; `.github/CODEOWNERS` defines ownership; and `docs/operations/PRODUCTION.md` is the production runbook. Phase 4 delivers the repository-side production operations contract; Phase 6 executes that contract against the real public domain.

## Phase 5 — Launch candidate — Complete / accepted
- [x] Freeze launch copy and product links for final review
- [x] Run `npm run check` from a clean checkout
- [x] Run `npm run check:browser` with the pinned Playwright browser toolchain
- [x] Validate all navigation, product links, legal links, theme behavior, and responsive states in production preview
- [x] Complete the final launch-candidate accessibility, SEO, hosting/security-readiness, and legal review
- [x] Verify that the production-domain validation/live-health tooling covers DNS/TLS/canonical metadata/sitemap/robots/social-preview acceptance for Phase 6
- [x] Confirm that every currently configured product destination is intentional and publicly safe; products without an approved public HTTPS destination remain intentionally unconfigured
- [x] Complete the Phase-5 go/no-go review with no unresolved repository-side critical issues

**Phase 5 evidence:** `docs/PHASE-5-LAUNCH-CANDIDATE.md` defines the release-candidate contract. `src/productCatalog.ts` and `docs/content/PRODUCT_CATALOG.md` were re-audited and frozen for the accepted launch candidate. The accepted branch keeps the approved PNG favicon, verifies navigation/product-link/legal/theme/responsive behavior, verifies the live social preview, manifest, favicon, canonical/sitemap/robots output, and exposes hosting/security headers. Actual public-domain deployment and live production verification are Phase-6 launch work.

## Phase 6 — Official Noitis website launch — Launch tooling ready / live activation pending
- [x] Prepare deterministic Phase-6 launch acceptance tooling and runbook on top of the exact accepted Phase-5 baseline
- [ ] Deploy the approved release from `main`
- [ ] Register/confirm and activate the final Noitis production domain
- [ ] Enable GitHub Pages with GitHub Actions as the source and configure final publication variables
- [ ] Configure/verify custom-domain DNS, domain ownership, certificate provisioning, and HTTPS enforcement
- [ ] Verify canonical/default-domain/apex-or-www redirect behavior against the real domain
- [ ] Run `npm run check:phase6` successfully against the final public URL
- [ ] Run production smoke tests on desktop and mobile
- [ ] Verify HTTPS, legal pages, product links, metadata, sitemap/robots, manifest/favicon, and social previews
- [ ] Review every configured production product/pricing destination as intentional and publicly safe
- [ ] Monitor availability, build/deployment health, broken links, and user-facing errors
- [ ] Announce the official Noitis website only after production verification succeeds
- [ ] Mark the Noitis company website launched

**Phase 6 repository evidence:** `scripts/phase6-live-smoke.mjs` provides the real-site desktop/mobile browser gate; `scripts/verify-publication-health.mjs` verifies the canonical custom-domain host, live PNG favicon, public metadata/assets, and optional default-Pages/apex-or-www redirects; `npm run check:phase6` combines production configuration, build/content/link/quality, live-health, and live-browser checks; `.github/workflows/phase6-live-acceptance.yml` runs the final gate from GitHub Actions; and `docs/PHASE-6-LAUNCH.md` defines the external launch procedure. The remaining unchecked items must stay unchecked until the real domain and deployed production site prove them.
