# Noitis Website Roadmap

This roadmap is the implementation sequence for the public Noitis company website. The site remains static-first unless a real website requirement justifies additional infrastructure. The final phase is the official Noitis website launch on its production domain.

Phase branches are milestone branches. Once a phase is accepted and merged, its branch is kept at that completed phase and is not advanced with later-phase implementation.

## Phase 1 — Company website foundation — Complete
- [x] React/TypeScript/Vite static-first website
- [x] Noitis brand identity, product presentation, and responsive navigation
- [x] Light and dark themes
- [x] Privacy, Terms, and Trademark public pages
- [x] Proprietary repository/license and trademark documentation
- [x] GitHub Actions CI and Pages deployment workflow
- [x] Product links and public company positioning

Actual GitHub Pages activation is a repository/hosting operation and is tracked in Phase 4 together with the final production-domain work. The deployment workflow is gated until Pages is intentionally enabled.

## Phase 2 — Content and product readiness — Implementation complete, awaiting acceptance
- [x] Review every company/product claim against the current product state
- [x] Keep product descriptions, optional pricing links, and launch status synchronized through the reviewed product catalogue and deployment configuration
- [x] Complete company/about/contact content required for the current launch path
- [x] Add social-preview metadata and a committed share image
- [x] Add sitemap and robots generation for the current public address and future production-domain transition
- [x] Review legal pages for the current Noitis operator identity, hosting model, and actual data practices
- [x] Remove placeholder/development-only destinations from production builds and enforce that boundary in `npm run check`

**Phase 2 evidence:** `src/productCatalog.ts` is the reviewed public product catalogue; `.env.example` documents publication/product URL configuration; `scripts/generate-publication-files.mjs` creates sitemap/robots output; `scripts/verify-content.mjs` rejects leaked local destinations and missing publication metadata; the public legal pages and Markdown were reviewed on 25 August 2026.

## Phase 3 — Accessibility, SEO, and quality
- [ ] Complete keyboard-only and screen-reader review
- [ ] Validate contrast, focus, reduced motion, headings, landmarks, and target sizes
- [ ] Test responsive behavior across supported mobile, tablet, and desktop sizes
- [ ] Validate metadata, canonical URLs, structured data where appropriate, and indexability
- [ ] Optimize images, fonts, bundle size, and Core Web Vitals
- [ ] Add automated link/build checks and browser smoke coverage
- [ ] Complete cross-browser release review

## Phase 4 — Production domain and operations
- [ ] Register/confirm the final Noitis production domain
- [ ] Enable GitHub Pages for the repository, select GitHub Actions as the Pages source, and set `NOITIS_PAGES_ENABLED=true`
- [ ] Configure DNS and GitHub Pages custom-domain settings
- [ ] Verify HTTPS and domain ownership
- [ ] Configure canonical production URLs and redirects
- [ ] Add privacy-respecting analytics only if there is a defined business need and legal basis
- [ ] Define website monitoring, broken-link checks, dependency updates, and content ownership
- [ ] Document rollback and emergency content/legal update procedures

## Phase 5 — Launch candidate
- [ ] Freeze launch copy and product links for final review
- [ ] Run `npm run check` from a clean checkout
- [ ] Validate all navigation, product links, legal links, theme behavior, and responsive states in production preview
- [ ] Run final accessibility, SEO, security-header/hosting, and legal review
- [ ] Verify production-domain DNS, TLS, canonical metadata, sitemap, robots, and social previews
- [ ] Confirm every linked Noitis product destination is intentional and publicly safe
- [ ] Complete launch go/no-go review with no unresolved critical issues

## Phase 6 — Official Noitis website launch
- [ ] Deploy the approved release from `main`
- [ ] Activate/verify the final Noitis production domain
- [ ] Run production smoke tests on desktop and mobile
- [ ] Verify HTTPS, legal pages, product links, metadata, sitemap/robots, and social previews
- [ ] Monitor availability, build/deployment health, broken links, and user-facing errors
- [ ] Announce the official Noitis website only after production verification succeeds
- [ ] Mark the Noitis company website launched
