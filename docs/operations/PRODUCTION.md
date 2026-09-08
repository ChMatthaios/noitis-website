# Noitis Website — Production Operations

This document is the Phase 4 production-domain and operations contract for the Noitis company website.

The website remains static-first and is deployed with the existing GitHub Actions → GitHub Pages workflow. No application database is required for this website.

## Production authority

- Repository: `Noitis-MC/noitis-website`
- Deployment source: `main` through `.github/workflows/deploy-pages.yml`
- Hosting: GitHub Pages
- Publication URL authority: repository Actions variable `NOITIS_SITE_URL`
- Custom-domain expectation: repository Actions variable `NOITIS_CUSTOM_DOMAIN`
- Deployment gate: repository Actions variable `NOITIS_PAGES_ENABLED=true`
- Website/content owner: repository `CODEOWNERS`

The custom domain itself is configured in GitHub repository Pages settings and with the DNS provider. A committed `CNAME` file is intentionally not used because this site deploys through a custom GitHub Actions Pages workflow.

## Required repository variables

Configure these under **Settings → Secrets and variables → Actions → Variables** before production deployment:

| Variable | Required | Purpose |
|---|---:|---|
| `NOITIS_PAGES_ENABLED` | Yes | Set to `true` only when Pages is intentionally enabled. |
| `NOITIS_SITE_URL` | Yes | Canonical HTTPS publication base URL, including trailing `/`. |
| `NOITIS_CUSTOM_DOMAIN` | For custom domain | Hostname only, e.g. `www.example.com`; must match `NOITIS_SITE_URL`. |
| `AGENTGATE_PUBLIC_URL` | When public | Public AgentGate destination. |
| `AUTOPAYLOT_PUBLIC_URL` | When public | Public AutoPaylot destination. |
| `BRS_PUBLIC_URL` | When public | Public BRS destination. |
| `EARNLOGIC_PUBLIC_URL` | When public | Public EarnLogic destination. |
| `FAMILYOS_PUBLIC_URL` | When public | Public FamilyOS destination. |
| `LEGACYCI_PUBLIC_URL` | When public | Public LegacyCI destination. |
| `<PRODUCT>_PRICING_URL` | Optional | Dedicated pricing URL when the product exposes one. |

Production URL variables must be HTTPS and must never target localhost/private development endpoints.

## Production validation

Local/static validation:

```powershell
npm ci
$env:VITE_SITE_URL = "https://YOUR-FINAL-DOMAIN/"
$env:NOITIS_CUSTOM_DOMAIN = "YOUR-FINAL-DOMAIN"
npm run check:production
npm run check
```

After the site is published:

```powershell
$env:SITE_URL = "https://YOUR-FINAL-DOMAIN/"
npm run check:live
```

`check:live` verifies the public HTML pages, canonical URLs, HTTPS, sitemap, robots file, and discovered same-origin links.

## GitHub Pages activation

1. Open repository **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Add/verify the final custom domain in the Pages settings.
4. Keep the repository Actions variables aligned with the same domain.
5. Set `NOITIS_PAGES_ENABLED=true` only after the site URL configuration is correct.
6. Run **Deploy Noitis to GitHub Pages** manually once, or merge the accepted Phase 4 result to `main` when release policy allows it.
7. When GitHub reports the certificate is ready, enable **Enforce HTTPS**.

The workflow refuses a production deployment when the configured site URL is absent, non-HTTPS, local, or inconsistent with `NOITIS_CUSTOM_DOMAIN`.

## DNS model

Choose the final canonical host deliberately. Do not configure wildcard DNS.

For an apex domain such as `example.com`, GitHub Pages currently supports either an `ALIAS`/`ANAME` to `Noitis-MC.github.io` or the documented GitHub Pages `A` records. A `www` CNAME should point to `Noitis-MC.github.io` (without `/noitis-website`).

For a canonical subdomain such as `www.example.com`, create a CNAME from that host to `Noitis-MC.github.io`.

Verify the organization/custom domain before relying on it, and keep the verification TXT record in DNS.

On Windows/PowerShell, use `Resolve-DnsName` to verify the records after propagation.

## Canonical URL and redirect policy

- `NOITIS_SITE_URL` is the single source used to build canonical tags, Open Graph URLs, `robots.txt`, and `sitemap.xml`.
- The final production URL must use HTTPS and a trailing slash.
- When a custom GitHub Pages domain is configured, GitHub Pages owns the platform redirect between the default `github.io` address and the configured custom domain.
- If both apex and `www` DNS are configured, the Pages custom-domain setting determines which host is canonical and GitHub handles the counterpart redirect where supported.
- Do not implement JavaScript/meta-refresh redirects for canonical-host changes.

## Monitoring and broken-link ownership

`.github/workflows/site-health.yml` runs daily when Pages is enabled and `NOITIS_SITE_URL` is configured. It invokes `npm run check:live`.

A failed site-health run is a release/operations signal and must be investigated before content changes are treated as healthy.

The owner named in `CODEOWNERS` owns:

- deployment failures;
- live availability failures;
- broken internal links;
- canonical/sitemap/robots drift;
- dependency-update review;
- legal/content corrections.

## Dependency updates

Dependabot is configured for weekly npm and GitHub Actions update pull requests. Dependency updates must pass the normal `npm run check` gate and should not be merged merely because they are automated.

## Analytics decision

Phase 4 does **not** enable analytics by default. The current site has no defined business requirement or legal basis that requires analytics, and the accepted privacy text states that marketing analytics are not used.

If analytics are proposed later:

1. define the concrete business need;
2. perform the privacy/legal review;
3. prefer privacy-respecting, minimal-data configuration;
4. update privacy/public documentation before activation;
5. add the analytics implementation through a reviewed change.

## Normal rollback

GitHub Pages deployments are generated from `main`. Do not rewrite `phase-4` or an accepted milestone to perform an emergency rollback.

Preferred rollback:

1. identify the last known-good commit on `main`;
2. create a normal revert commit for the bad release/change;
3. push the revert to `main`;
4. allow the Pages workflow to redeploy;
5. run `npm run check:live` against the production URL;
6. record the incident/reason in the release or issue history.

If the workflow itself is broken, revert the workflow change first or manually dispatch a known-good workflow state after review.

## Emergency unpublish

If the published content creates a material legal, privacy, security, or brand risk and a normal revert is not fast/safe enough, an authorized repository administrator may unpublish the GitHub Pages site from GitHub Pages settings. This removes the current Pages deployment without deleting repository content/settings. Redeploy only after the corrective change passes the release gates.

## Emergency legal/content update

For a legal or public-content correction:

1. make the smallest accurate change;
2. preserve the existing public-safe product-claim rules;
3. run `npm run check`;
4. merge/push through the normal reviewed path unless the severity requires an authorized emergency change;
5. verify the deployed page with `npm run check:live`;
6. review `PRIVACY.md`, `TERMS.md`, `TRADEMARK.md`, and their public HTML counterparts whenever the factual operating model changes.

## Phase 4 acceptance evidence

Repository-side Phase 4 readiness requires:

- production configuration validation;
- gated Pages deployment;
- daily live-site health monitoring;
- weekly dependency update automation;
- explicit content/operations ownership;
- canonical/redirect policy;
- analytics decision;
- rollback/unpublish/emergency-update procedures.

Full Phase 4 acceptance additionally requires the external operations that source control cannot perform by itself: the final domain must be owned/confirmed, Pages enabled, custom-domain/DNS configured, domain verified, HTTPS enforced, and the live checks green.
