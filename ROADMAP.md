# Noitis Website Roadmap

This roadmap is the implementation sequence for the public Noitis company website. The site remains static-first unless a real website requirement justifies additional infrastructure. The final phase is the official Noitis website launch on its production domain.

## Phase 1 — Company website foundation — Complete
- [x] React/TypeScript/Vite static-first website
- [x] Noitis brand identity, product presentation, and responsive navigation
- [x] Light and dark themes
- [x] Privacy, Terms, and Trademark public pages
- [x] Proprietary repository/license and trademark documentation
- [x] GitHub Actions CI and GitHub Pages deployment
- [x] Product links and public company positioning

## Phase 2 — Content and product readiness
- [ ] Review every company/product claim against the current product state
- [ ] Keep product descriptions, pricing links, and launch status synchronized with product repositories
- [ ] Complete final company/about/contact content required for launch
- [ ] Add final social-preview metadata and share images
- [ ] Add sitemap and robots configuration for the production domain
- [ ] Review legal pages for the final Noitis legal entity, hosting model, and actual data practices
- [ ] Remove placeholder or development-only content before production-domain launch

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
