# Frontend Architecture

## Current state

The Noitis website remains intentionally small. Current React ownership is:

- `App.tsx` — company-site composition, navigation/theme state, product rendering, and contact section;
- `productCatalog.ts` — reviewed public product summaries and optional public/pricing link configuration;
- `BrandMark.tsx` — shared Noitis brand rendering;
- `PrivacyPage.tsx`, `TermsPage.tsx`, `TrademarkPage.tsx` — public legal-page presentation;
- entry files (`main.tsx`, `privacy.tsx`, `terms.tsx`, `trademark.tsx`);
- `styles.css` / `styles/site.css` / `styles/quality.css` — stable stylesheet boundary.

Do not split every section into components merely to mirror larger Noitis applications.

## Product catalogue boundary

`productCatalog.ts` owns names, categories, conservative descriptions, `In development` status, safety notes, logos, and optional public/pricing destinations. It does **not** become authoritative for product business behavior; product repositories remain the implementation authority.

Public URLs arrive through `VITE_*` variables. Development links are generated into ignored `.env.development.local`, so local convenience is isolated from production-mode configuration.

## State rules

Local browser state is appropriate for theme preference and mobile-menu state. Do not use browser state as the source of truth for protected product data, identity, billing, permissions, or operational state.

## Legal-page ownership

Legal content must remain explicit and reviewable. React legal pages and root Markdown legal files should communicate the same current operator/hosting/data-practice facts. Update both when material behavior changes.

## Publication metadata

Canonical/social metadata lives in the HTML entry points and is parameterized by the publication base URL in `vite.config.ts`. Sitemap/robots generation belongs to `scripts/generate-publication-files.mjs`, not React runtime code.

## Accessibility rules

Interactive controls must remain keyboard-operable and visibly focusable. Mobile navigation requires clear control semantics. Theme/logo variants should not duplicate meaningful alternative text. Browser/accessibility validation remains part of the release gate.

## Growth path

If the website later adds a CMS, forms, analytics, localization, authenticated areas, or a richer catalogue, evolve the architecture around that real capability. Do not pre-build service/data/backend layers for requirements that do not exist.
