# Frontend Architecture

## Current state

The Noitis website is intentionally small. Its current React source contains:

- `App.tsx` — company-site composition and local navigation/theme behavior;
- `BrandMark.tsx` — shared Noitis brand rendering;
- `PrivacyPage.tsx` — privacy-notice page;
- `main.tsx` and `privacy.tsx` — entry points;
- `styles.css` — stable stylesheet entry point;
- `styles/site.css` — current website style implementation.

This is already an appropriate level of componentization for the current site. Do not split every section into a component solely to mirror larger application repositories.

## Ownership rules

### `App.tsx`

Owns the main public page composition and lightweight UI state such as theme/mobile navigation.

It may contain stable marketing-section composition while the site remains modest. Extract a component when a section gains meaningful behavior, independent reuse, or enough complexity that ownership becomes unclear.

### `BrandMark.tsx`

Owns Noitis brand-mark rendering and theme-aware logo assets. Keep brand asset switching centralized rather than duplicating logo rules across page sections.

### `PrivacyPage.tsx`

Owns the public privacy-notice presentation. Legal/privacy content must remain explicit and reviewable rather than generated from unrelated product state.

### Styling

`styles.css` is the stable stylesheet entry point imported by the React entry files. It currently imports `styles/site.css`, which contains the existing approved website styling in its original cascade order.

This boundary allows future style modules to be introduced only when responsibility genuinely becomes unclear. Do not split a modest stylesheet into many artificial files merely for symmetry with larger products.

When styles are split later, preserve ordering deliberately across theme/base rules, shell/navigation, company sections, privacy styles, responsive behavior, and brand/logo overrides.

## Data and content extraction

The current product/company copy is small enough to remain close to the UI that renders it. If product metadata expands materially—for example product URLs, launch states, pricing, release dates, or localization—move it into a typed data module rather than duplicating literals across components.

## State rules

Local browser state is appropriate for:

- theme preference;
- mobile-menu state;
- other purely presentational interactions.

Do not use browser state as the authoritative source for protected Noitis application data, customer identity, billing, permissions, or operational product state.

## Accessibility rules

Interactive controls must remain keyboard-operable and visibly focusable. Mobile navigation must have clear control semantics. Theme/logo swapping must not duplicate meaningful alternative text for decorative variants.

## Growth path

If the website later adds a CMS, forms, analytics, localization, authenticated areas, or a richer product catalogue, evolve the architecture around that real capability. Do not pre-build feature folders, service abstractions, or data layers for requirements that do not exist yet.
