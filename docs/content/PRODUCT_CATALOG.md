# Public Product Catalogue Authority

**Last audited: 3 September 2026**

This document explains the public company-site catalogue in `src/productCatalog.ts`. Product repositories remain authoritative for implementation; this website owns only the reviewed public summary and public-link configuration.

## Current public status

All six products are represented as **In development**. The summaries below were re-audited against the accepted Phase-4 milestone of each product before the Noitis website Phase-5 launch-candidate review.

| Product | Public company-site summary boundary |
|---|---|
| AgentGate | Governance control plane and localhost developer-connectivity contracts are implemented; production integration adapters and approval delivery remain in development. |
| AutoPaylot | Read-only sandbox bank connectivity and simulated payment controls are implemented; real payment execution remains disabled. |
| Business Resource Scheduler | Operational scheduling and adaptive planning are implemented; external calendar/API/webhook and recurring synchronization capabilities remain in development. |
| EarnLogic | Governed compensation calculations, statements, audit evidence, and the canonical ingestion foundation are implemented; productized CRM/ERP/HRIS/payroll/API integrations remain in development. |
| FamilyOS | Family coordination, booking/calendar workflows, and privacy-aware OpenStreetMap discovery are implemented; provider platform, authoritative availability, and real payments remain in development. |
| LegacyCI | Certified read-only PostgreSQL 16–18 metadata connectivity is implemented; production semantic lineage parsing and change-impact semantics remain in development. |

## Sources reviewed for the Phase-5 launch candidate

The website Phase-5 review uses the accepted Phase-4 milestone branch of each product as the capability authority because `phase-5` was deliberately refreshed from those accepted milestones before new Phase-5 product work begins.

- `Noitis-MC/AgentGate` — accepted Phase 4 governance/developer-connectivity milestone and production-integration boundary
- `Noitis-MC/AutoPaylot` — accepted Phase 4 read-only financial-connectivity milestone and `SIMULATION_ONLY` boundary
- `Noitis-MC/BusinessResourceScheduler` — accepted Phase 4 adaptive-scheduling milestone and external-integration boundary
- `Noitis-MC/EarnLogic` — accepted Phase 4 compensation-control milestone plus the governed canonical-ingestion foundation inherited from Phase 3
- `Noitis-MC/FamilyOS` — accepted Phase 4 family-coordination/OpenStreetMap milestone and provider/payment boundaries
- `Noitis-MC/LegacyCI` — accepted Phase 4 certified PostgreSQL metadata-connector milestone and semantic-analysis boundary

## Link authority and launch freeze

The production website must not guess a public product or pricing URL. Each optional destination is injected at build time:

- `VITE_AGENTGATE_PUBLIC_URL` / `VITE_AGENTGATE_PRICING_URL`
- `VITE_AUTOPAYLOT_PUBLIC_URL` / `VITE_AUTOPAYLOT_PRICING_URL`
- `VITE_BRS_PUBLIC_URL` / `VITE_BRS_PRICING_URL`
- `VITE_EARNLOGIC_PUBLIC_URL` / `VITE_EARNLOGIC_PRICING_URL`
- `VITE_FAMILYOS_PUBLIC_URL` / `VITE_FAMILYOS_PRICING_URL`
- `VITE_LEGACYCI_PUBLIC_URL` / `VITE_LEGACYCI_PRICING_URL`

For the Phase-5 launch candidate, the safe default is **no public product link unless a real HTTPS product deployment has been separately verified**. If a production URL is absent, the card stays visible but non-linking and says public access is not configured. This is intentional and is safer than linking a launch-candidate company site to localhost, a private environment, a demo that exposes customer data, or a product that is not publicly deployed.

For development only, `scripts/ensure-local-env.mjs` creates ignored `.env.development.local` values using the permanent Noitis local ports 5174–5179. Vite does not load that mode-specific file for production builds.

## Launch-candidate review rule

The catalogue text above is frozen for the current Phase-5 candidate. Change it only when one of the following is true:

1. a product's accepted milestone changes a public capability or safety boundary;
2. a real public product or pricing destination is approved;
3. a factual/legal correction is required;
4. the launch candidate is deliberately reopened after review.

When a product change requires a catalogue update:

1. inspect the accepted product milestone that is authoritative for the claim;
2. update this document and `src/productCatalog.ts` together;
3. update deployment URL variables only for real HTTPS public destinations that have been reviewed as safe;
4. run `npm run check` and the browser smoke gate and verify no local URL leaked into production output;
5. repeat the Noitis website launch-candidate review before marking the affected Phase-5 item complete.
