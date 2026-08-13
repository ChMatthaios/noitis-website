# Noetis Website

> **Intelligence, engineered.**

Official company website for **Noetis**, a Greece-based technology company building intelligent systems people can trust.

## Stack

- React
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## GitHub Pages deployment

This repository includes `.github/workflows/deploy-pages.yml`.

After pushing the repository to GitHub:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main`.
5. The included workflow builds and deploys the site automatically.

Until a custom domain is connected, GitHub will provide a Pages URL.

## Custom Noetis domain

The site intentionally does **not** include a `CNAME` file. This project deploys with a custom GitHub Actions workflow, and GitHub documents that a `CNAME` file is ignored for this deployment method.

When the final domain is registered and its DNS is under your control:

1. Open **GitHub → noetis-website → Settings → Pages**.
2. Enter the final domain under **Custom domain** (for example `noetis.gr`).
3. At the domain registrar, add the DNS records GitHub Pages requires for that domain.
4. Wait for GitHub's DNS check to succeed.
5. Enable **Enforce HTTPS**.

Preferred public address:

```text
https://noetis.gr
```

If you also control `www.noetis.gr`, configure it consistently so visitors end up on one canonical address.

## Pages

- `index.html` — Noetis company website
- `privacy.html` — Noetis privacy notice

The privacy notice is intentionally marked as pre-production until verified controller and data-processing details are available.

## Accessibility principles

This site deliberately uses:

- large readable text
- high contrast
- visible keyboard focus
- 44px+ interactive targets
- plain-language navigation
- no hover-only information
- reduced-motion support
- responsive mobile navigation
- light and dark themes

## Brand palette

| Name | Hex | Role |
|---|---|---|
| Midnight Navy | `#0B1020` | Trust, security, infrastructure |
| Trust Blue | `#3B82F6` | Confidence and primary actions |
| Electric Cyan | `#22D3EE` | Active systems and innovation |
| Future Violet | `#8B5CF6` | Frontier technology |
| Ice White | `#EAF2FF` | Clarity and clean surfaces |

## Suggested first Git commands

Create the repository on GitHub first, then from this folder:

```bash
git init
git add .
git commit -m "Launch Noetis company website"
git branch -M main
git remote add origin https://github.com/ChMatthaios/noetis-website.git
git push -u origin main
```

Create the `noetis-website` repository under the `ChMatthaios` GitHub account before adding this remote.

## Status

The website is ready to build and deploy. A custom public URL requires ownership/control of the chosen domain and its DNS.


## Recommended next hardening step

After the first successful local `npm install`, commit the generated `package-lock.json` and change the workflow install step from `npm install` to `npm ci` for deterministic deployments.
