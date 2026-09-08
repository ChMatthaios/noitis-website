const rawSiteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.NOITIS_SITE_URL || '').trim()
if (!rawSiteUrl) throw new Error('Set SITE_URL, VITE_SITE_URL, or NOITIS_SITE_URL before running the live health check.')

const siteUrl = new URL(rawSiteUrl)
if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/'
if (siteUrl.protocol !== 'https:') throw new Error(`Live publication must use HTTPS. Received ${siteUrl.protocol}`)

const customDomain = (process.env.NOITIS_CUSTOM_DOMAIN || '').trim().toLowerCase()
if (customDomain && siteUrl.hostname.toLowerCase() !== customDomain) {
  throw new Error(`NOITIS_CUSTOM_DOMAIN (${customDomain}) does not match live site host (${siteUrl.hostname}).`)
}

const publicPages = ['', 'privacy.html', 'terms.html', 'trademark.html']
const textAssets = ['robots.txt', 'sitemap.xml', 'site.webmanifest']
const binaryAssets = [
  { path: 'social-preview.png', contentType: 'image/png' },
  { path: 'noitis-mark.svg', contentType: 'image/svg+xml' },
]
const checked = new Set()
let hostingHeaders = null

async function fetchResource(url, { readText = true } = {}) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'NoitisWebsiteHealthCheck/1.0' },
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}.`)
  if (response.url && new URL(response.url).protocol !== 'https:') {
    throw new Error(`${url} resolved to a non-HTTPS URL: ${response.url}`)
  }
  return { response, text: readText ? await response.text() : '' }
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

function findLinkTag(html, rel) {
  return (html.match(/<link\b[^>]*>/gi) || []).find((tag) => {
    const relMatch = tag.match(/\brel=["']([^"']+)["']/i)
    return relMatch?.[1].split(/\s+/).some((value) => value.toLowerCase() === rel)
  }) || null
}

function attribute(tag, name) {
  return tag?.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1] || null
}

async function verifyCanonicalRedirect(rawUrl, label) {
  const value = (rawUrl || '').trim()
  if (!value) return

  const source = new URL(value)
  if (source.origin === siteUrl.origin) return

  const { response } = await fetchResource(source.toString(), { readText: false })
  const finalUrl = new URL(response.url)
  if (finalUrl.origin !== siteUrl.origin) {
    throw new Error(`${label} did not resolve to the canonical site origin. ${source.origin} ended at ${finalUrl.origin}.`)
  }

  console.log(`Verified ${label}: ${source.origin} -> ${finalUrl.origin}`)
}

for (const page of publicPages) {
  const url = new URL(page, siteUrl).toString()
  const { response, text } = await fetchResource(url)
  checked.add(url)

  const finalUrl = new URL(response.url)
  if (finalUrl.origin !== siteUrl.origin) {
    throw new Error(`${url} resolved outside the canonical site origin: ${response.url}`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.toLowerCase().includes('text/html')) {
    throw new Error(`${url} returned unexpected content type ${contentType || '(missing)'}.`)
  }

  if (!hostingHeaders && page === '') {
    hostingHeaders = {
      server: response.headers.get('server'),
      hsts: response.headers.get('strict-transport-security'),
      nosniff: response.headers.get('x-content-type-options'),
      csp: response.headers.get('content-security-policy'),
      referrerPolicy: response.headers.get('referrer-policy'),
    }

    const faviconTag = findLinkTag(text, 'icon')
    if (!faviconTag) throw new Error('Live home page is missing the browser-tab favicon link.')
    if (attribute(faviconTag, 'type') !== 'image/png') {
      throw new Error('The approved Noitis browser-tab favicon must remain image/png.')
    }
    const faviconHref = attribute(faviconTag, 'href')
    if (!faviconHref) throw new Error('Live favicon link is missing its href.')
    const faviconUrl = new URL(faviconHref, url).toString()
    const { response: faviconResponse } = await fetchResource(faviconUrl, { readText: false })
    const faviconType = (faviconResponse.headers.get('content-type') || '').toLowerCase()
    if (!faviconType.includes('image/png')) {
      throw new Error(`Live favicon returned unexpected content type ${faviconType || '(missing)'}.`)
    }
    checked.add(faviconUrl)
  }

  const expectedCanonical = new URL(page, siteUrl).toString()
  if (!text.includes(`rel="canonical" href="${expectedCanonical}"`)) {
    throw new Error(`${url} does not advertise the expected canonical URL ${expectedCanonical}.`)
  }

  const expectedSocialPreview = new URL('social-preview.png', siteUrl).toString()
  if (!text.includes(`property="og:image" content="${expectedSocialPreview}"`)) {
    throw new Error(`${url} does not advertise the expected Open Graph image ${expectedSocialPreview}.`)
  }
  if (!text.includes(`name="twitter:image" content="${expectedSocialPreview}"`)) {
    throw new Error(`${url} does not advertise the expected Twitter image ${expectedSocialPreview}.`)
  }

  for (const link of internalLinks(text, url)) {
    if (checked.has(link)) continue
    await fetchResource(link)
    checked.add(link)
  }
}

for (const asset of textAssets) {
  const url = new URL(asset, siteUrl).toString()
  const { response, text } = await fetchResource(url)
  checked.add(url)

  if (asset === 'robots.txt') {
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.toLowerCase().includes('text/plain')) {
      throw new Error(`robots.txt returned unexpected content type ${contentType || '(missing)'}.`)
    }

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

  if (asset === 'site.webmanifest') {
    const manifest = JSON.parse(text)
    if (manifest.name !== 'Noitis' || manifest.short_name !== 'Noitis') {
      throw new Error('site.webmanifest does not identify Noitis correctly.')
    }
    if (manifest.start_url !== './') {
      throw new Error(`site.webmanifest must keep a portable './' start_url; received ${manifest.start_url}.`)
    }
    const icon = Array.isArray(manifest.icons) ? manifest.icons.find((entry) => entry?.src === './noitis-mark.svg') : null
    if (!icon) throw new Error('site.webmanifest is missing the Noitis SVG mark.')
  }
}

for (const asset of binaryAssets) {
  const url = new URL(asset.path, siteUrl).toString()
  const { response } = await fetchResource(url, { readText: false })
  checked.add(url)

  const contentType = (response.headers.get('content-type') || '').toLowerCase()
  if (!contentType.includes(asset.contentType)) {
    throw new Error(`${asset.path} returned unexpected content type ${contentType || '(missing)'}.`)
  }
}

await verifyCanonicalRedirect(process.env.PAGES_DEFAULT_URL, 'default GitHub Pages redirect')
await verifyCanonicalRedirect(process.env.ALTERNATE_SITE_URL, 'alternate apex/www redirect')

console.log(`Live publication health check passed for ${siteUrl.toString()} (${checked.size} URLs checked).`)
if (customDomain) console.log(`Verified canonical custom-domain host ${customDomain}.`)
if (hostingHeaders) {
  console.log('Observed hosting/security headers for final manual review:', JSON.stringify(hostingHeaders))
}
