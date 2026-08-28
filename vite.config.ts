import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const DEFAULT_SITE_URL = 'https://noitis-mc.github.io/noitis-website/'

function normalizeSiteUrl(value: string | undefined) {
  const url = new URL(value?.trim() || DEFAULT_SITE_URL)
  if (!url.pathname.endsWith('/')) url.pathname += '/'
  return url.toString()
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL || process.env.VITE_SITE_URL)

  return {
    // Relative asset paths keep one artifact portable between the GitHub Pages
    // project URL and a future custom Noitis domain.
    base: './',
    plugins: [
      react(),
      {
        name: 'noitis-publication-metadata',
        transformIndexHtml(html) {
          return html.replaceAll('%NOITIS_SITE_URL%', siteUrl)
        },
      },
    ],
    server: {
      port: 5173,
      strictPort: true,
    },
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
          terms: fileURLToPath(new URL('./terms.html', import.meta.url)),
          trademark: fileURLToPath(new URL('./trademark.html', import.meta.url)),
        },
      },
    },
  }
})
