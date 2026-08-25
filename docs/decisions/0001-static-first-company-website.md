# ADR 0001: Static-first company website on GitHub Pages

## Status

Accepted

## Context

The Noitis website serves public company, product, brand, legal, and privacy information. It does not require authenticated application behavior, an operational database, server-side business logic, a CMS, or a data warehouse.

The site is built with React, TypeScript, and Vite and is configured for deployment through GitHub Pages from the approved `main` branch.

## Decision

Keep the website as a static-first frontend deployed through GitHub Pages.

Use:

- React/TypeScript for page composition and lightweight interaction;
- Vite for deterministic production builds;
- a committed npm lockfile;
- GitHub Actions CI for validation;
- a separate GitHub Pages workflow for deployment from `main`;
- `actions/configure-pages` with Actions-based Pages enablement so repository configuration and the supported deployment flow remain aligned;
- relative build paths so the same artifact can work on a project Pages URL and a future custom domain.

Do not add API, database, warehouse, authentication, CMS, or service scaffolding until a concrete website requirement justifies it.

## Consequences

### Positive

- small operational surface;
- inexpensive and understandable deployment;
- no server credentials or database lifecycle for a static marketing site;
- clear separation from Noitis product application backends;
- reproducibility from repository source;
- custom-domain migration does not require rewriting component asset paths.

### Tradeoffs

- dynamic forms, authenticated areas, personalized content, server-controlled experiments, or private APIs will require a new architectural decision;
- public content changes currently require repository changes rather than a CMS workflow;
- GitHub Pages deployment constraints remain part of the hosting model until hosting changes;
- deployment is verified only after approved code reaches `main`, because phase branches do not publish automatically.

## Phase milestone behavior

A completed `phase-N` branch is retained as the accepted state of that phase. It is not advanced with later-phase implementation. `main` represents the latest accepted phase.

## Revisit when

Revisit this decision when a real requirement appears for server-side processing, content-management workflows, localization at scale, authenticated experiences, forms with protected data, or other capabilities that no longer fit a static deployment.
