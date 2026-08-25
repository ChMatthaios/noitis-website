# Public Product Catalogue Authority

**Last audited: 25 August 2026**

This document explains the public company-site catalogue in `src/productCatalog.ts`. Product repositories remain authoritative for implementation; this website owns only the reviewed public summary and public-link configuration.

## Current public status

All six products are represented as **In development**.

| Product | Public company-site summary boundary |
|---|---|
| AgentGate | Governance gateway for agent policy and human approval; broader production integrations/execution remain in development. |
| AutoPaylot | Financial-obligation control before money moves; real bank connectivity and real payment execution are not enabled. |
| Business Resource Scheduler | Constraint-based scheduling; trusted core exists while broader operational/adaptive scheduling remains in development. |
| EarnLogic | Commercial performance and incentive compensation with calculation lineage; planned rule families/integrations are not represented as complete. |
| FamilyOS | Parent-first discovery/booking/coordination; real payments, provider integrations, maps, and production notification delivery remain future work. |
| LegacyCI | Dependency/lineage/change-impact analysis; production customer-database connectors are not enabled. |

## Sources reviewed

- `Noitis-MC/AgentGate` — accepted `main` README/roadmap and trusted application state
- `Noitis-MC/AutoPaylot` — accepted `main` README/roadmap and no-real-payment boundary
- `Noitis-MC/BusinessResourceScheduler` — accepted `main` README/roadmap and trusted scheduling state
- `Noitis-MC/EarnLogic` — executable .NET/PostgreSQL implementation and audited roadmap; stale prototype wording is not used as the sole capability authority
- `Noitis-MC/FamilyOS` — accepted `main` README/roadmap and simulation/provider boundaries
- `Noitis-MC/LegacyCI` — accepted `main` README/roadmap and `TEST_ONE_ANALYSIS_ONLY`/connector boundary

## Link authority

The production website must not guess a public product or pricing URL. Each optional destination is injected at build time:

- `VITE_AGENTGATE_PUBLIC_URL` / `VITE_AGENTGATE_PRICING_URL`
- `VITE_AUTOPAYLOT_PUBLIC_URL` / `VITE_AUTOPAYLOT_PRICING_URL`
- `VITE_BRS_PUBLIC_URL` / `VITE_BRS_PRICING_URL`
- `VITE_EARNLOGIC_PUBLIC_URL` / `VITE_EARNLOGIC_PRICING_URL`
- `VITE_FAMILYOS_PUBLIC_URL` / `VITE_FAMILYOS_PRICING_URL`
- `VITE_LEGACYCI_PUBLIC_URL` / `VITE_LEGACYCI_PRICING_URL`

If a production URL is absent, the card stays visible but non-linking and says public access is not configured.

For development only, `scripts/ensure-local-env.mjs` creates ignored `.env.development.local` values using the permanent Noitis local ports 5174–5179. Vite does not load that mode-specific file for production builds.

## Review rule

When a product completes a phase that changes a public claim, pricing model, launch state, safety boundary, or public destination:

1. inspect the product repository's accepted `main`;
2. update this document and `src/productCatalog.ts` together;
3. update deployment URL variables only for real public destinations;
4. run `npm run check` and verify no local URL leaked into production output;
5. update `ROADMAP.md` only if the website phase acceptance state changed.
