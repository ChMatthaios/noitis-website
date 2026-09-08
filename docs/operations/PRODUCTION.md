# Noitis Website — Production Operations

The Noitis company website is static-first and deployed through GitHub Actions to GitHub Pages. No application database is required for this website.

## Production authority

- Repository: `Noitis-MC/noitis-website`
- Deployment source: `main` through `.github/workflows/deploy-pages.yml`
- Hosting: GitHub Pages
- Current public URL: `https://noitis-mc.github.io/noitis-website/`
- Publication URL authority: repository Actions variable `NOITIS_SITE_URL`
- Optional custom-domain variable: `NOITIS_CUSTOM_DOMAIN`
- Deployment gate: `NOITIS_PAGES_ENABLED=true`
- Website/content owner: repository `CODEOWNERS`

## Required repository variables

Configure these under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Required | Purpose |
|---|---:|---|
| `NOITIS_PAGES_ENABLED` | Yes | Set to `true` while Pages is intentionally enabled. |
| `NOITIS_SITE_URL` | Yes | Canonical HTTPS publication base URL, including trailing `/`. |
| `NOITIS_CUSTOM_DOMAIN` | Only for a custom domain | Hostname only; must match `NOITIS_SITE_URL`. |
| `<PRODUCT>_PUBLIC_URL` | When a product is public | Approved HTTPS product destination. |
| `<PRODUCT>_PRICING_URL` | Optional | Approved HTTPS pricing destination. |

Production URL variables must be HTTPS and must never target localhost or private development endpoints.

## Validation

Local/static validation:

```powershell
npm ci
$env:VITE_SITE_URL = "https://noitis-mc.github.io/noitis-website/"
npm run check:production
npm run check
```

After publication:

```powershell
$env:SITE_URL = "https://noitis-mc.github.io/noitis-website/"
$env:VITE_SITE_URL = "https://noitis-mc.github.io/noitis-website/"
$env:PAGES_DEFAULT_URL = "https://noitis-mc.github.io/noitis-website/"
npm run check:live
```

For the full live acceptance gate, install Playwright Chromium and run `npm run check:release`.

## GitHub Pages

Pages uses **GitHub Actions** as its source. The deployment workflow refuses publication when the configured site URL is absent, non-HTTPS, local, or inconsistent with an optional custom domain.

The current GitHub Pages address is intentionally accepted as the production URL. A branded Noitis domain can be introduced later without changing the website architecture.

## Optional custom-domain migration

When Noitis chooses to buy and activate a branded domain:

1. verify ownership with GitHub;
2. configure the Pages custom domain;
3. configure DNS with the DNS provider;
4. wait for certificate provisioning and enforce HTTPS;
5. set `NOITIS_SITE_URL` to the canonical HTTPS domain and set `NOITIS_CUSTOM_DOMAIN` to its hostname;
6. verify default-Pages and apex/`www` redirect behavior as applicable;
7. rerun `npm run check:release` against the new public address.

Do not implement JavaScript or meta-refresh redirects for canonical-host changes.

## Monitoring and broken-link ownership

`.github/workflows/site-health.yml` runs scheduled live publication health checks while Pages is enabled and `NOITIS_SITE_URL` is configured. A failed health run is an operations signal and should be investigated promptly.

The owner named in `CODEOWNERS` owns deployment failures, availability failures, broken internal links, canonical/sitemap/robots drift, dependency-update review, and legal/content corrections.

## Dependency updates

Dependabot is configured for weekly npm and GitHub Actions update pull requests. Dependency updates must pass the normal repository checks and should not be merged merely because they are automated.

## Analytics decision

Analytics are intentionally disabled while there is no defined business requirement and the accepted privacy position states that marketing analytics are not used.

If analytics are proposed later, define the business need, perform privacy/legal review, prefer minimal-data configuration, and update public documentation before activation.

## Normal rollback

GitHub Pages deployments are generated from `main`.

Preferred rollback:

1. identify the last known-good commit on `main`;
2. create a normal revert commit for the bad release/change;
3. push the revert to `main`;
4. allow the Pages workflow to redeploy;
5. run `npm run check:live` against the production URL;
6. record the incident/reason in repository history.

## Emergency unpublish

If published content creates a material legal, privacy, security, or brand risk and a normal revert is not fast or safe enough, an authorized repository administrator may unpublish the GitHub Pages site from Pages settings. Redeploy only after the corrective change passes the release gates.

## Emergency legal/content update

For a legal or public-content correction, make the smallest accurate change, preserve public-safe product-claim rules, run repository checks, deploy through the reviewed path, verify the public page, and review the Markdown and HTML legal surfaces whenever the factual operating model changes.
