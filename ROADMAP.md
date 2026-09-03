# Noitis Website Roadmap

This roadmap is the implementation sequence for the public Noitis company website. The site remains static-first unless a real website requirement justifies additional infrastructure. The final phase is the official Noitis website launch on its production domain.

## Implementation audit — 2026-09-03

- **Phases 1–3 are complete and accepted.** The website has the static-first React/TypeScript/Vite foundation, reviewed publication content, product catalogue, legal/publication controls, accessibility/SEO/quality checks, and cross-browser smoke coverage required for the accepted pre-production milestone.
- **Phase 4 repository-side operations are implemented, but Phase 4 is not yet externally complete.** The accepted Phase-4 baseline contains fail-closed production URL/domain validation, a hardened GitHub Pages deployment workflow, daily live-site health monitoring, weekly dependency update automation, explicit CODEOWNERS ownership, an analytics/privacy decision, and documented DNS/canonical/redirect/rollback/emergency procedures.
- **External Phase 4 activation remains required.** The final Noitis production domain must be owned/confirmed, GitHub Pages must be enabled with GitHub Actions as the source, the custom domain and DNS must be configured/verified, HTTPS must be enforced, and the final live canonical/redirect behavior must pass the live health gate.
- **Phase 5 is in progress on `phase-5`.** The launch copy/product catalogue was re-audited on 3 September 2026 against the accepted Phase-4 milestones for AgentGate, AutoPaylot, Business Resource Scheduler, EarnLogic, FamilyOS, and LegacyCI. `src/productCatalog.ts` and `docs/content/PRODUCT_CATALOG.md` now reflect those accepted boundaries, and `docs/PHASE-5-LAUNCH-CANDIDATE.md` defines the launch-candidate acceptance contract and safe product-link freeze.
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

## Phase 4 — Production domain and operations — Repository ready / external activation pending
- [ ] Register/confirm the final Noitis production domain
- [ ] Enable GitHub Pages for the repository, select GitHub Actions as the Pages source, configure the required Actions variables, and set `NOITIS_PAGES_ENABLED=true`
- [ ] Configure the GitHub Pages custom domain and DNS records, and verify the domain ownership challenge
- [ ] Verify certificate provisioning and enable HTTPS enforcement
- [x] Implement production URL/custom-domain validation and a single canonical publication configuration source
- [ ] Activate the final canonical production URL and verify GitHub Pages/default-domain/apex-or-www redirect behavior against the real domain
- [x] Review analytics need/legal basis and intentionally keep analytics disabled while no justified requirement exists
- [x] Define live website monitoring, broken-link checks, dependency updates, and content/operations ownership
- [x] Document DNS/canonical policy, normal rollback, emergency unpublish, and emergency content/legal update procedures
- [ ] Run the production live-health gate successfully against the final domain after DNS/TLS activation

**Phase 4 repository evidence:** `scripts/verify-production-config.mjs` provides `npm run check:production`; `scripts/verify-publication-health.mjs` provides `npm run check:live`; `.github/workflows/deploy-pages.yml` fails closed on missing/unsafe production configuration and uses the current Pages Actions artifact path; `.github/workflows/site-health.yml` runs daily when Pages is enabled; `.github/dependabot.yml` defines weekly npm/Actions review; `.github/CODEOWNERS` defines ownership; and `docs/operations/PRODUCTION.md` is the production runbook. Source control cannot itself prove domain ownership, DNS propagation, Pages repository settings, or TLS issuance, so those items remain open until verified externally.

## Phase 5 — Launch candidate — In progress
- [x] Freeze launch copy and product links for final review
- [ ] Run `npm run check` from a clean checkout
- [ ] Run `npm run check:browser` with the pinned Playwright browser toolchain
- [ ] Validate all navigation, product links, legal links, theme behavior, and responsive states in production preview
- [ ] Run final accessibility, SEO, security-header/hosting, and legal review
- [ ] Verify production-domain DNS, TLS, canonical metadata, sitemap, robots, and social previews
- [ ] Confirm every linked Noitis product destination is intentional and publicly safe
- [ ] Complete launch go/no-go review with no unresolved critical issues

**Phase 5 evidence in progress:** `docs/PHASE-5-LAUNCH-CANDIDATE.md` defines the release-candidate contract, clean-checkout/browser gates, production-preview review, final accessibility/SEO/hosting/legal checks, external evidence requirements, and go/no-go rule. The product catalogue was re-audited on 3 September 2026 and is frozen for this candidate. A production product/pricing URL remains intentionally unset unless a real HTTPS public destination has been separately reviewed as safe.

## Phase 6 — Official Noitis website launch — Not started
- [ ] Deploy the approved release from `main`
- [ ] Activate/verify the final Noitis production domain
- [ ] Run production smoke tests on desktop and mobile
- [ ] Verify HTTPS, legal pages, product links, metadata, sitemap/robots, and social previews
- [ ] Monitor availability, build/deployment health, broken links, and user-facing errors
- [ ] Announce the official Noitis website only after production verification succeeds
- [ ] Mark the Noitis company website launched
