const siteValue = (process.env.VITE_SITE_URL || process.env.NOITIS_SITE_URL || '').trim()
const customDomain = (process.env.NOITIS_CUSTOM_DOMAIN || '').trim().toLowerCase()

if (!siteValue) {
  throw new Error('Production publication requires VITE_SITE_URL or NOITIS_SITE_URL.')
}

const siteUrl = new URL(siteValue)
if (siteUrl.protocol !== 'https:') {
  throw new Error(`Production publication must use HTTPS. Received ${siteUrl.protocol}`)
}

if (['localhost', '127.0.0.1', '::1'].includes(siteUrl.hostname)) {
  throw new Error('Production publication cannot target a local address.')
}

if (siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash) {
  throw new Error('Production publication URL must not contain credentials, query parameters, or fragments.')
}

if (!siteUrl.pathname.endsWith('/')) {
  throw new Error('Production publication URL must end with a trailing slash.')
}

if (customDomain) {
  if (customDomain.includes('://') || customDomain.includes('/') || customDomain.includes(':')) {
    throw new Error('NOITIS_CUSTOM_DOMAIN must contain only the hostname, for example www.example.com.')
  }
  if (siteUrl.hostname.toLowerCase() !== customDomain) {
    throw new Error(`NOITIS_CUSTOM_DOMAIN (${customDomain}) does not match VITE_SITE_URL host (${siteUrl.hostname}).`)
  }
  if (siteUrl.pathname !== '/') {
    throw new Error('A configured custom Noitis domain must publish from the domain root (/).')
  }
}

const urlVariables = Object.entries(process.env)
  .filter(([name, value]) => name.startsWith('VITE_') && name.endsWith('_URL') && value?.trim())
  .filter(([name]) => name !== 'VITE_SITE_URL')

for (const [name, rawValue] of urlVariables) {
  const url = new URL(rawValue.trim())
  if (url.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS in a production deployment.`)
  }
  if (['localhost', '127.0.0.1', '::1'].includes(url.hostname)) {
    throw new Error(`${name} cannot target a local address in production.`)
  }
}

console.log(`Verified production publication configuration for ${siteUrl.toString()}`)
if (customDomain) console.log(`Verified custom domain binding expectation for ${customDomain}`)
