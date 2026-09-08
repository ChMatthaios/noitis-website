# Noitis Website — Phase 6 Launch Acceptance

Phase 6 is the real public-launch milestone for the Noitis company website. The accepted Phase-5 launch candidate is the implementation baseline. This document defines the deterministic final acceptance path without pretending that source control can own a domain, change DNS, or enable GitHub Pages by itself.

## Scope and safety

- Work is performed on `phase-6` until the launch milestone is accepted.
- `main` remains the production deployment source used by `.github/workflows/deploy-pages.yml`.
- The site is static-first and requires no application database.
- Product cards may remain intentionally unconfigured when a product does not yet have an approved public HTTPS destination.
- No localhost/private product URL may appear in a production build.
- The approved Noitis PNG remains the browser-tab favicon.

## Phase 6 repository acceptance tooling

The Phase-6 branch adds:

- `npm run check:browser:live` — Chromium desktop/mobile smoke against the real HTTPS site;
- stronger `npm run check:live` validation for the canonical custom domain, the approved PNG favicon, sitemap/robots/social preview, and optional redirect verification;
- `npm run check:phase6` — one combined final gate;
- `.github/workflows/phase6-live-acceptance.yml` — manual GitHub Actions execution of the same live gate;
- this launch runbook.

The accepted Phase-5 build/browser checks remain intact.

## Required GitHub Actions variables

Configure these under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Required | Value |
|---|---:|---|
| `NOITIS_PAGES_ENABLED` | Yes at launch | `true` |
| `NOITIS_SITE_URL` | Yes | Canonical HTTPS URL with trailing slash, e.g. `https://www.example.com/` |
| `NOITIS_CUSTOM_DOMAIN` | Yes for custom domain | Hostname only, e.g. `www.example.com` |
| `NOITIS_ALTERNATE_SITE_URL` | Optional | Alternate apex/`www` HTTPS URL when both are configured and should redirect to the canonical host |
| `<PRODUCT>_PUBLIC_URL` | Only when approved public access exists | Public HTTPS product URL |
| `<PRODUCT>_PRICING_URL` | Optional | Public HTTPS pricing URL |

The default GitHub Pages address is checked separately as `https://noitis-mc.github.io/noitis-website/` by the Phase-6 acceptance workflow.

## DNS and Pages activation

1. Own/confirm the final Noitis domain.
2. Configure the intended canonical host with the DNS provider.
3. For a `www` host, point the CNAME to `Noitis-MC.github.io`.
4. For an apex host, use the GitHub Pages-supported apex DNS records or provider `ALIAS`/`ANAME` behavior.
5. Keep the GitHub domain-verification TXT record in DNS when configured.
6. Open **Settings → Pages** for `Noitis-MC/noitis-website`.
7. Choose **GitHub Actions** as the Pages source.
8. Set the same custom domain used by `NOITIS_CUSTOM_DOMAIN`.
9. Wait until GitHub reports the TLS certificate ready, then enable **Enforce HTTPS**.
10. Set `NOITIS_PAGES_ENABLED=true` only when the canonical URL/domain variables are correct.

## Local pre-deployment gate

From the repository root on `phase-6`:

```powershell
git switch phase-6
git pull origin phase-6
npm ci
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium

$Domain = "YOUR-FINAL-DOMAIN"
$env:VITE_SITE_URL = "https://$Domain/"
$env:NOITIS_CUSTOM_DOMAIN = $Domain

npm run check:production
npm run check
npm run check:browser
```

Do not run `check:phase6` before the public site is actually deployed because its last two stages intentionally contact the live site.

## Production deployment

The production workflow deploys from `main`. After the Phase-6 implementation is accepted for promotion according to the repository workflow:

1. promote/merge the accepted Phase-6 code to `main`;
2. run **Deploy Noitis to GitHub Pages** if the push did not already trigger it;
3. verify both `Build website` and `Deploy website` are green;
4. open the deployment URL shown by the `github-pages` environment and confirm it is the canonical custom domain.

## Final local live acceptance

After DNS/TLS/Pages are active:

```powershell
$Domain = "YOUR-FINAL-DOMAIN"
$env:VITE_SITE_URL = "https://$Domain/"
$env:SITE_URL = "https://$Domain/"
$env:NOITIS_CUSTOM_DOMAIN = $Domain
$env:PAGES_DEFAULT_URL = "https://noitis-mc.github.io/noitis-website/"

# Set this only when both apex and www exist and one should redirect to the other.
# $env:ALTERNATE_SITE_URL = "https://YOUR-ALTERNATE-HOST/"

npm run check:phase6
```

Expected result: production configuration, normal build/content/link/quality checks, live publication checks, redirect checks, and the live Chromium desktop/mobile smoke all pass.

## GitHub-hosted live acceptance

Open **Actions → Phase 6 live acceptance → Run workflow** after the deployment is live. Run it from the branch containing the accepted Phase-6 code. The workflow uses repository variables and must finish green.

## Manual UI acceptance

Review the real public domain on desktop and mobile:

1. Noitis logo, typography, layout, light/dark theme, and approved PNG browser-tab favicon are correct.
2. Header navigation reaches Products, Principles, About, Contact, and Privacy.
3. Mobile navigation opens and closes cleanly without horizontal overflow.
4. Exactly six product cards appear in the accepted order.
5. A configured product card opens the intended public HTTPS product; an unconfigured product clearly says `Public access not configured` and is not accidentally clickable to localhost.
6. Any configured pricing link opens the intended public HTTPS pricing destination.
7. Privacy, Terms, and Trademark pages load and are readable.
8. Page refreshes and direct legal-page URLs work under the custom domain.
9. Social-preview image, favicon, sitemap, and robots URLs resolve publicly.
10. The default `github.io/noitis-website` address resolves to the canonical custom domain when a custom domain is active.
11. If both apex and `www` are configured, the non-canonical host resolves to the canonical host.
12. GitHub Pages shows **Enforce HTTPS** enabled and the browser reports a valid secure connection.

## Phase 6 completion rule

Phase 6 becomes 100% complete only after all of the following are true:

- the accepted release is deployed from `main`;
- final domain ownership/DNS/Pages/TLS are active;
- `npm run check:phase6` passes against the real domain;
- the GitHub-hosted **Phase 6 live acceptance** workflow is green;
- the manual desktop/mobile UI review is accepted;
- configured product/pricing destinations are intentional and public-safe;
- monitoring is enabled and healthy;
- the public-launch announcement is intentionally made;
- `ROADMAP.md` is updated from launch-pending to complete only after that evidence exists.
