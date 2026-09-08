# ADR 0001: Static-first company website on GitHub Pages

## Status

Accepted; reviewed September 2026.

## Context

The Noitis website serves public company, product, brand, contact, and legal information. It does not require authenticated application behavior, an operational database, server-side business logic, or a data warehouse.

## Decision

Keep the website as a static-first React/TypeScript/Vite frontend with deterministic npm builds, GitHub Actions CI, and a separate GitHub Pages deployment workflow.

Use relative asset paths so one artifact can run at the current GitHub Pages project URL and later on a custom Noitis domain. Treat public product/pricing destinations as build configuration rather than hard-coded production literals.

Do not add API, database, warehouse, authentication, CMS, or service scaffolding until a concrete website requirement justifies it.

## Hosting boundary

The repository contains the Pages deployment workflow while Pages settings, optional custom-domain configuration, DNS, and certificate state remain administrative hosting operations. The workflow is gated by `NOITIS_PAGES_ENABLED=true` so publication occurs only when hosting is intentionally enabled.

The current public address is `https://noitis-mc.github.io/noitis-website/`. A custom domain can replace it later after ownership, DNS, TLS, canonical-host, redirect, and live-site checks are complete.

## Consequences

### Positive

- small operational surface;
- reproducible source-controlled publication;
- no server credentials or database lifecycle for a static company site;
- clear separation from product application backends;
- production builds can omit unconfigured product destinations without breaking the catalogue;
- custom-domain migration does not require rewriting component asset paths.

### Tradeoffs

- dynamic forms, authenticated areas, personalized content, server-controlled experiments, or private APIs require a new architectural decision;
- public content changes require repository changes rather than a CMS;
- Pages/domain administration remains an external repository/hosting concern.

## Revisit when

Revisit when a real requirement appears for server-side processing, content-management workflows, localization at scale, authenticated experiences, forms with protected data, or other capabilities that no longer fit a static deployment.
