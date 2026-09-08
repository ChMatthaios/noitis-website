# Public Product Catalogue Authority

**Last reviewed: September 2026**

This document explains the public company-site catalogue in `src/productCatalog.ts`. Product repositories remain authoritative for implementation; this website owns the reviewed public summary and public-link configuration.

## Current public status

All six products are represented as **In development**. Public summaries are intentionally conservative and should describe implemented capability without turning future roadmap work into current claims.

| Product | Public company-site summary boundary |
|---|---|
| AgentGate | Governance for AI-agent actions, organization policy, approval routing, and controlled execution boundaries. |
| AutoPaylot | Financial-obligation organization, readiness decisions, read-only financial connectivity, and simulated payment controls; real payment execution is not presented as public capability. |
| Business Resource Scheduler | Constraint-based operational scheduling and adaptive planning; external synchronization capabilities are presented only when verified. |
| EarnLogic | Governed compensation calculations, statements, audit evidence, and calculation lineage; external enterprise-system integrations are presented only when verified. |
| FamilyOS | Family coordination, booking/calendar workflows, saved items, and privacy-aware discovery; provider-platform and real-payment claims require separate verification. |
| LegacyCI | Database dependency, lineage, and pre-change impact analysis with read-only PostgreSQL metadata connectivity; semantic-analysis claims remain bounded by implemented behavior. |

## Link authority

The production website must not guess a public product or pricing URL. Each optional destination is injected at build time:

- `VITE_AGENTGATE_PUBLIC_URL` / `VITE_AGENTGATE_PRICING_URL`
- `VITE_AUTOPAYLOT_PUBLIC_URL` / `VITE_AUTOPAYLOT_PRICING_URL`
- `VITE_BRS_PUBLIC_URL` / `VITE_BRS_PRICING_URL`
- `VITE_EARNLOGIC_PUBLIC_URL` / `VITE_EARNLOGIC_PRICING_URL`
- `VITE_FAMILYOS_PUBLIC_URL` / `VITE_FAMILYOS_PRICING_URL`
- `VITE_LEGACYCI_PUBLIC_URL` / `VITE_LEGACYCI_PRICING_URL`

The safe default is **no public product link unless a real HTTPS deployment has been separately verified**. If a production URL is absent, the card stays visible but non-linking and says public access is not configured.

For development only, `scripts/ensure-local-env.mjs` creates ignored `.env.development.local` values using the permanent Noitis local ports. Vite does not load that mode-specific file for production builds.

## Review rule

Change public catalogue text when a product's verified implementation materially changes a public capability or safety boundary, a real public destination is approved, or a factual/legal correction is required.

When a product change requires a catalogue update:

1. inspect the product repository that is authoritative for the claim;
2. update this document and `src/productCatalog.ts` together;
3. configure deployment URLs only for real HTTPS public destinations that have been reviewed as safe;
4. run `npm run check` and the browser smoke gate;
5. verify that no local/private development URL leaked into production output.
