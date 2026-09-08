const rawSiteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.NOITIS_SITE_URL || '').trim()
if (!rawSiteUrl) throw new Error('Set SITE_URL, VITE_SITE_URL, or NOITIS_SITE_URL before running the live browser smoke test.')

const siteUrl = new URL(rawSiteUrl)
if (siteUrl.protocol !== 'https:') throw new Error(`Live browser smoke requires HTTPS. Received ${siteUrl.protocol}`)
if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/'

const customDomain = (process.env.NOITIS_CUSTOM_DOMAIN || '').trim().toLowerCase()
if (customDomain && siteUrl.hostname.toLowerCase() !== customDomain) {
  throw new Error(`NOITIS_CUSTOM_DOMAIN (${customDomain}) does not match live site host (${siteUrl.hostname}).`)
}

let playwright
try {
  playwright = await import('playwright')
} catch {
  throw new Error('Playwright is not installed. Run: npm install --no-save --package-lock=false playwright@1.62.1')
}

const { chromium } = playwright
const expectedProducts = ['AgentGate', 'AutoPaylot', 'Business Resource Scheduler', 'EarnLogic', 'FamilyOS', 'LegacyCI']

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function reviewPage(page, route, label) {
  const target = new URL(route, siteUrl).toString()
  const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 })
  assert(response?.ok(), `${label}: ${target} did not load successfully.`)
  assert(new URL(page.url()).protocol === 'https:', `${label}: ${target} did not remain on HTTPS.`)
  assert(new URL(page.url()).origin === siteUrl.origin, `${label}: ${target} left the canonical site origin.`)

  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    h1Count: document.querySelectorAll('h1').length,
    mainCount: document.querySelectorAll('main').length,
    footerCount: document.querySelectorAll('footer').length,
  }))

  assert(layout.scrollWidth <= layout.clientWidth + 1, `${label}: horizontal overflow detected on ${route || 'home'}.`)
  assert(layout.h1Count === 1, `${label}: expected exactly one h1 on ${route || 'home'}.`)
  assert(layout.mainCount === 1, `${label}: expected exactly one main landmark on ${route || 'home'}.`)
  assert(layout.footerCount === 1, `${label}: expected exactly one footer on ${route || 'home'}.`)
}

async function verifyHome(page, label) {
  const cards = await page.locator('.product-card').evaluateAll((elements) => elements.map((card) => {
    const name = card.querySelector('h3')?.textContent?.trim() || ''
    const product = card.querySelector('a[aria-label^="Open "]:not([aria-label$=" pricing"])')
    const pricing = card.querySelector('a[aria-label$=" pricing"]')
    const unavailable = [...card.querySelectorAll('.product-card__status')]
      .some((element) => element.textContent?.trim() === 'Public access not configured')
    return { name, productHref: product?.href || null, pricingHref: pricing?.href || null, unavailable }
  }))

  assert(cards.length === expectedProducts.length, `${label}: expected six product cards.`)
  assert(JSON.stringify(cards.map((card) => card.name)) === JSON.stringify(expectedProducts), `${label}: product catalogue names/order do not match the accepted public catalogue.`)

  for (const card of cards) {
    assert(Boolean(card.productHref) !== card.unavailable, `${label}: ${card.name} must have exactly one public-access state.`)
    for (const [kind, href] of [['product', card.productHref], ['pricing', card.pricingHref]]) {
      if (!href) continue
      const url = new URL(href)
      assert(url.protocol === 'https:', `${label}: ${card.name} ${kind} link is not HTTPS.`)
      assert(!['localhost', '127.0.0.1', '::1'].includes(url.hostname), `${label}: ${card.name} ${kind} link targets a local address.`)
    }
  }

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  assert(canonical === siteUrl.toString(), `${label}: live home canonical URL is ${canonical || '(missing)'} instead of ${siteUrl.toString()}.`)

  const favicon = page.locator('link[rel="icon"]')
  assert(await favicon.count() >= 1, `${label}: browser-tab favicon is missing.`)
  const faviconType = await favicon.first().getAttribute('type')
  assert(faviconType === 'image/png', `${label}: approved browser-tab favicon must remain PNG.`)
}

async function verifyDesktop(page, label) {
  for (const hash of ['#products', '#principles', '#about', '#contact']) {
    await page.locator(`#site-navigation a[href="${hash}"]`).click()
    assert((await page.evaluate(() => window.location.hash)) === hash, `${label}: desktop navigation did not reach ${hash}.`)
  }

  const themeButton = page.getByRole('button', { name: 'Switch to dark theme' })
  await themeButton.click()
  assert((await page.locator('html').getAttribute('data-theme')) === 'dark', `${label}: dark theme did not activate.`)
  await page.reload({ waitUntil: 'networkidle' })
  assert((await page.locator('html').getAttribute('data-theme')) === 'dark', `${label}: theme preference did not persist after reload.`)
}

async function verifyMobile(page, label) {
  const menuButton = page.getByRole('button', { name: 'Open navigation' })
  await menuButton.click()
  assert(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), `${label}: mobile navigation did not open.`)
  await page.keyboard.press('Escape')
  assert(!(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible()), `${label}: Escape did not close mobile navigation.`)
}

const browser = await chromium.launch({ headless: true })
try {
  for (const viewport of [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'desktop', width: 1440, height: 900 },
  ]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, colorScheme: 'light', reducedMotion: 'reduce' })
    const page = await context.newPage()
    const label = `chromium/${viewport.name}`
    const consoleErrors = []
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    page.on('pageerror', (error) => consoleErrors.push(error.message))

    await reviewPage(page, '', label)
    await verifyHome(page, label)
    if (viewport.name === 'mobile') await verifyMobile(page, label)
    if (viewport.name === 'desktop') await verifyDesktop(page, label)
    for (const route of ['privacy.html', 'terms.html', 'trademark.html']) await reviewPage(page, route, label)
    assert(consoleErrors.length === 0, `${label}: browser console/page errors detected: ${consoleErrors.join(' | ')}`)
    await context.close()
  }
} finally {
  await browser.close()
}

console.log(`Live desktop/mobile browser smoke passed for ${siteUrl.toString()}.`)
