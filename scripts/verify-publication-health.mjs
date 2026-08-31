const rawSiteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.NOITIS_SITE_URL || '').trim()
if (!rawSiteUrl) throw new Error('Set SITE_URL, VITE_SITE_URL, or NOITIS_SITE_URL before running the live health check.')

const siteUrl = new URL(rawSiteUrl)
if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/'

const publicPages = ['', 'privacy.html', 'terms.html', 'trademark.html']
const requiredAssets = ['robots.txt', 'sitemap.xml']
const checked = new Set()

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'NoitisWebsiteHealthCheck/1.0' },
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}.`)
  if (response.url && new URL(response.url).protocol !== 'https:') {
    throw new Error(`${url} resolved to a non-HTTPS URL: ${response.url}`)
  }
  return { response, text: await response.text() }
}

function internalLinks(html, sourceUrl) {
  const links = new Set()
  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = match[1].trim()
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue
    const target = new URL(href, sourceUrl)
    if (target.origin !== siteUrl.origin) continue
    target.hash = ''
    links.add(target.toString())
  }
  return links
}

for (const page of publicPages) {
  const url = new URL(page, siteUrl).toString()
  const { text } = await fetchText(url)
  checked.add(url)

  const expectedCanonical = new URL(page, siteUrl).toString()
  if (!text.includes(`rel="canonical" href="${expectedCanonical}"`)) {
    throw new Error(`${url} does not advertise the expected canonical URL ${expectedCanonical}.`)
  }

  for (const link of internalLinks(text, url)) {
    if (checked.has(link)) continue
    await fetchText(link)
    checked.add(link)
  }
}

for (const asset of requiredAssets) {
  const url = new URL(asset, siteUrl).toString()
  const { text } = await fetchText(url)
  checked.add(url)

  if (asset === 'robots.txt') {
    const expectedSitemap = new URL('sitemap.xml', siteUrl).toString()
    if (!text.includes(`Sitemap: ${expectedSitemap}`)) {
      throw new Error(`robots.txt does not point to ${expectedSitemap}.`)
    }
  }

  if (asset === 'sitemap.xml') {
    for (const page of publicPages) {
      const expectedUrl = new URL(page, siteUrl).toString()
      if (!text.includes(`<loc>${expectedUrl}</loc>`)) {
        throw new Error(`sitemap.xml is missing ${expectedUrl}.`)
      }
    }
  }
}

console.log(`Live publication health check passed for ${siteUrl.toString()} (${checked.size} URLs checked).`)
