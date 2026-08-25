# Frontend Architecture

## Current state

The Noitis website remains intentionally small. Current React ownership is:

- `App.tsx` — company-site composition, navigation/theme state, product rendering, keyboard menu behavior, and contact section;
- `productCatalog.ts` — reviewed public product summaries, compact product-symbol assets, and optional public/pricing link configuration;
- `BrandMark.tsx` — shared Noitis brand rendering with active-theme image selection;
- `PrivacyPage.tsx`, `TermsPage.tsx`, `TrademarkPage.tsx` — public legal-page presentation;
- entry files (`main.tsx`, `privacy.tsx`, `terms.tsx`, `trademark.tsx`);
- `styles.css` / `styles/site.css` / `styles/phase3.css` — stable stylesheet boundary plus Phase 3 accessibility/responsive overrides.

Do not split every section into components merely to mirror larger Noitis applications.

## Product catalogue boundary

`productCatalog.ts` owns names, categories, conservative descriptions, `In development` status, safety notes, logos, and optional public/pricing destinations. It does **not** become authoritative for product business behavior; accepted product repositories remain the implementation authority.

Public URLs arrive through `VITE_*` variables. Development links are generated into ignored `.env.development.local`, so local convenience is isolated from production-mode configuration.

## State rules

Local browser state is appropriate for theme preference and mobile-menu state. Do not use browser state as the source of truth for protected product data, identity, billing, permissions, or operational state.

The home page selects only the active light/dark image URL for Noitis and product artwork. Product-card images are below the fold and lazy-load.

## Legal-page ownership

Legal content must remain explicit and reviewable. The React legal pages and root Markdown legal files should communicate the same current operator/hosting/data-practice facts. Update both when material behavior changes.

## Publication metadata

Canonical/social metadata lives in the HTML entry points and is parameterized by the publication base URL in `vite.config.ts`. The home page contains minimal Organization structured data. Sitemap/robots generation belongs to `scripts/generate-publication-files.mjs`, not React runtime code.

## Accessibility and browser quality

Interactive controls must remain keyboard-operable, visibly focusable, and appropriately labelled. Mobile navigation exposes expanded/control state and closes with Escape. Reduced-motion mode disables smooth scrolling. Phase 3 browser smoke checks semantic landmarks/labels, target sizes, responsive overflow, theme persistence, legal pages, and the mobile menu in Chromium, Firefox, and WebKit at supported viewport classes.

## Growth path

If the website later adds a CMS, forms, analytics, localization, authenticated areas, or a richer catalogue, evolve the architecture around that real capability. Do not pre-build service/data/backend layers for requirements that do not exist.
