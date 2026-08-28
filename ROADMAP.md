# Noitis Website Roadmap

This roadmap is the implementation sequence for the public Noitis company website. The site remains static-first unless a real website requirement justifies additional infrastructure. The final phase is the official Noitis website launch on its production domain.

<<<<<<< HEAD
## Implementation audit — 2026-08-25

- **Phase 1 is complete.** The static-first React/TypeScript/Vite website, Noitis identity, legal pages, CI, GitHub Pages deployment, themes, and product presentation are present on `main`.
- **Phase 2 is partial and is the next active phase.** Company/about content and the permanent local product links exist, and `robots.txt` is present. Final launch copy/contact content, public-safe production product destinations, social-preview metadata, sitemap, and final legal/data-practice review remain open.
- **Phase 3 has a useful accessibility/semantic baseline but is not complete.** The site includes a skip link, semantic sections, accessible navigation labels, and responsive navigation, but formal accessibility, responsive-device, SEO, performance, browser, link, and smoke-test release work is still required.
- **Phases 4–6 are not started as production phases.** GitHub Pages exists as the current development/publication mechanism, but the final production domain, operational ownership, launch-candidate gates, and official launch are intentionally still open.

**Branch workflow:** before work begins on `phase-N`, fast-forward/synchronize that branch to the latest accepted `main`. A phase is merged only when its checklist is implemented, validated, documented, and the relevant CI gate is green.
=======
Phase branches are milestone branches. Once a phase is accepted and merged, its branch is kept at that completed phase and is not advanced with later-phase implementation.
>>>>>>> 74f6be6e16140db1b7435d105406c0a95a5149ae

## Phase 1 — Company website foundation — Complete
- [x] React/TypeScript/Vite static-first website
- [x] Noitis brand identity, product presentation, and responsive navigation
- [x] Light and dark themes
- [x] Privacy, Terms, and Trademark public pages
- [x] Proprietary repository/license and trademark documentation
- [x] GitHub Actions CI and Pages deployment workflow
- [x] Product links and public company positioning

<<<<<<< HEAD
## Phase 2 — Content and product readiness — Partial / next
- [ ] Review every company/product claim against the current product state
- [ ] Keep product descriptions, pricing links, and launch status synchronized with product repositories
- [x] Establish company/about content and public company positioning
- [ ] Complete final contact and launch content required for production
- [ ] Add final social-preview metadata and share images
- [x] Add robots configuration
- [ ] Add a production sitemap
- [ ] Review legal pages for the final Noitis legal entity, hosting model, and actual data practices
- [x] Keep permanent local development product links aligned to ports `5174`–`5179`
- [ ] Replace development-only product destinations with intentional public-safe destinations before production launch
- [ ] Remove remaining placeholder or development-only content before production-domain launch

## Phase 3 — Accessibility, SEO, and quality — Partial foundation
- [x] Establish semantic page structure, skip navigation, and accessible navigation controls
- [ ] Complete keyboard-only and screen-reader review
- [ ] Validate contrast, focus, reduced motion, headings, landmarks, and target sizes
- [ ] Test responsive behavior across supported mobile, tablet, and desktop sizes
- [ ] Validate metadata, canonical URLs, structured data where appropriate, and indexability
- [ ] Optimize images, fonts, bundle size, and Core Web Vitals
- [ ] Add automated link checks and browser smoke coverage
- [ ] Complete cross-browser release review
=======
Actual GitHub Pages activation is a repository/hosting operation and is tracked in Phase 4 together with the final production-domain work. The deployment workflow is gated until Pages is intentionally enabled.

## Phase 2 — Content and product readiness — Complete
- [x] Review every company/product claim against the current product state
- [x] Keep product descriptions, optional pricing links, and launch status synchronized through the reviewed product catalogue and deployment configuration
- [x] Complete company/about/contact content required for the current launch path
- [x] Add social-preview metadata and a committed share image
- [x] Add sitemap and robots generation for the current public address and future production-domain transition
- [x] Review legal pages for the current Noitis operator identity, hosting model, and actual data practices
- [x] Remove placeholder/development-only destinations from production builds and enforce that boundary in `npm run check`

**Phase 2 evidence:** `src/productCatalog.ts` is the reviewed public product catalogue; `.env.example` documents publication/product URL configuration; `scripts/generate-publication-files.mjs` creates sitemap/robots output; `scripts/verify-content.mjs` rejects leaked local destinations and missing publication metadata; the public legal pages and Markdown remain the accepted publication baseline.

## Phase 3 — Accessibility, SEO, and quality — Complete
- [x] Complete keyboard-only and screen-reader-oriented semantic review
- [x] Validate contrast, focus, reduced motion, headings, landmarks, and target sizes
- [x] Test responsive behavior across supported mobile, tablet, and desktop sizes
- [x] Validate metadata, canonical URLs, structured data where appropriate, and indexability
- [x] Optimize images, font policy, bundle size, and Core Web Vitals-oriented loading behavior
- [x] Add automated link/build checks and browser smoke coverage
- [x] Complete cross-browser release review coverage

**Phase 3 evidence:** on 27 August 2026 `phase-3` was recreated from the exact accepted `phase-2` tip before Phase 3 work was reapplied. `npm run check` now performs publication/content, local-link, contrast/accessibility-policy, image-loading, manifest-asset, and bundle-budget checks. `scripts/browser-smoke.mjs` provides Chromium/Firefox/WebKit coverage at mobile/tablet/desktop sizes and exercises semantic landmarks, keyboard skip navigation, mobile navigation/Escape behavior, reduced motion, target sizing, responsive overflow, accessible control labels, and theme persistence. Phase 3 deliberately does not enable GitHub Pages or a production domain; those remain Phase 4 operations.
>>>>>>> 74f6be6e16140db1b7435d105406c0a95a5149ae

## Phase 4 — Production domain and operations — Not started
- [ ] Register/confirm the final Noitis production domain
- [ ] Enable GitHub Pages for the repository, select GitHub Actions as the Pages source, and set `NOITIS_PAGES_ENABLED=true`
- [ ] Configure DNS and GitHub Pages custom-domain settings
- [ ] Verify HTTPS and domain ownership
- [ ] Configure canonical production URLs and redirects
- [ ] Add privacy-respecting analytics only if there is a defined business need and legal basis
- [ ] Define website monitoring, broken-link checks, dependency updates, and content ownership
- [ ] Document rollback and emergency content/legal update procedures

## Phase 5 — Launch candidate — Not started
- [ ] Freeze launch copy and product links for final review
- [ ] Run `npm run check` from a clean checkout
- [ ] Validate all navigation, product links, legal links, theme behavior, and responsive states in production preview
- [ ] Run final accessibility, SEO, security-header/hosting, and legal review
- [ ] Verify production-domain DNS, TLS, canonical metadata, sitemap, robots, and social previews
- [ ] Confirm every linked Noitis product destination is intentional and publicly safe
- [ ] Complete launch go/no-go review with no unresolved critical issues

## Phase 6 — Official Noitis website launch — Not started
- [ ] Deploy the approved release from `main`
- [ ] Activate/verify the final Noitis production domain
- [ ] Run production smoke tests on desktop and mobile
- [ ] Verify HTTPS, legal pages, product links, metadata, sitemap/robots, and social previews
- [ ] Monitor availability, build/deployment health, broken links, and user-facing errors
- [ ] Announce the official Noitis website only after production verification succeeds
- [ ] Mark the Noitis company website launched
