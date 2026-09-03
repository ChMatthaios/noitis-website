import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

if (!existsSync('dist/index.html')) throw new Error('Build output is missing. Run npm run check before npm run check:browser.')

let playwright
try {
  playwright = await import('playwright')
} catch {
  throw new Error('Playwright is not installed. Run: npm install --no-save --package-lock=false playwright@1.62.1')
}

const { chromium, firefox, webkit } = playwright
const baseUrl = 'http://127.0.0.1:4173'
const viteCli = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const preview = spawn(process.execPath, [viteCli, 'preview', '--host', '127.0.0.1', '--port', '4173'], {
  stdio: ['ignore', 'pipe', 'pipe'],
})

let previewErrors = ''
preview.stderr.on('data', (chunk) => { previewErrors += chunk.toString() })

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  throw new Error(`Vite preview did not start. ${previewErrors}`)
}

async function reviewPage(page, route, label) {
  const response = await page.goto(`${baseUrl}/${route}`, { waitUntil: 'networkidle' })
  assert(response?.ok(), `${label}: ${route || 'index.html'} did not load successfully.`)

  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    h1Count: document.querySelectorAll('h1').length,
    mainCount: document.querySelectorAll('main').length,
    headerCount: document.querySelectorAll('header').length,
    footerCount: document.querySelectorAll('footer').length,
    navCount: document.querySelectorAll('nav').length,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }))

  assert(layout.scrollWidth <= layout.clientWidth + 1, `${label}: horizontal overflow detected on ${route || 'index.html'}.`)
  assert(layout.h1Count === 1, `${label}: expected exactly one h1 on ${route || 'index.html'}.`)
  assert(layout.mainCount === 1 && layout.headerCount >= 1 && layout.footerCount === 1 && layout.navCount >= 1, `${label}: semantic landmarks are incomplete on ${route || 'index.html'}.`)
  assert(layout.scrollBehavior === 'auto', `${label}: reduced-motion mode must disable smooth scrolling.`)

  const unlabeledControls = await page.locator('a[href], button').evaluateAll((elements) => elements
    .filter((element) => {
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden') return false
      const text = element.textContent?.trim()
      return !text && !element.getAttribute('aria-label') && !element.getAttribute('title')
    })
    .map((element) => element.outerHTML))

  assert(unlabeledControls.length === 0, `${label}: unlabeled interactive controls found on ${route || 'index.html'}: ${unlabeledControls.join(', ')}`)

  const undersizedPrimaryTargets = await page.locator('.brand-link, .button, button').evaluateAll((elements) => elements
    .filter((element) => {
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden') return false
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)
    })
    .map((element) => `${element.tagName.toLowerCase()}.${element.className}:${Math.round(element.getBoundingClientRect().width)}x${Math.round(element.getBoundingClientRect().height)}`))

  assert(undersizedPrimaryTargets.length === 0, `${label}: primary interactive targets below 44x44 CSS pixels: ${undersizedPrimaryTargets.join(', ')}`)

  const undersizedTextLinks = await page.locator('.site-nav a, .privacy-nav a, .site-footer a').evaluateAll((elements) => elements
    .filter((element) => {
      const style = getComputedStyle(element)
      if (style.display === 'none' || style.visibility === 'hidden') return false
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && (rect.width < 24 || rect.height < 44)
    })
    .map((element) => `${element.tagName.toLowerCase()}.${element.className}:${Math.round(element.getBoundingClientRect().width)}x${Math.round(element.getBoundingClientRect().height)}`))

  assert(undersizedTextLinks.length === 0, `${label}: navigation text targets are too small: ${undersizedTextLinks.join(', ')}`)
}

async function verifyHomeContract(page, label) {
  const contract = await page.evaluate(() => {
    const expectedProducts = ['AgentGate', 'AutoPaylot', 'Business Resource Scheduler', 'EarnLogic', 'FamilyOS', 'LegacyCI']
    const productCards = [...document.querySelectorAll('.product-card')].map((card) => {
      const name = card.querySelector('h3')?.textContent?.trim() || ''
      const openProduct = card.querySelector('a[aria-label^="Open "]:not([aria-label$=" pricing"])')
      const pricing = card.querySelector('a[aria-label$=" pricing"]')
      const unavailable = [...card.querySelectorAll('.product-card__status')]
        .some((element) => element.textContent?.trim() === 'Public access not configured')

      return {
        name,
        productHref: openProduct?.getAttribute('href') || null,
        pricingHref: pricing?.getAttribute('href') || null,
        unavailable,
      }
    })

    const navigation = [...document.querySelectorAll('#site-navigation a')]
      .map((element) => element.getAttribute('href'))
      .filter(Boolean)

    const footer = [...document.querySelectorAll('.site-footer a')]
      .map((element) => element.getAttribute('href'))
      .filter(Boolean)

    return { expectedProducts, productCards, navigation, footer }
  })

  assert(contract.productCards.length === contract.expectedProducts.length, `${label}: expected six product cards.`)
  assert(JSON.stringify(contract.productCards.map((card) => card.name)) === JSON.stringify(contract.expectedProducts), `${label}: product catalogue order/names do not match the launch candidate.`)

  for (const card of contract.productCards) {
    assert(Boolean(card.productHref) !== card.unavailable, `${label}: ${card.name} must have exactly one product-access state: reviewed link or Public access not configured.`)

    for (const [kind, href] of [['product', card.productHref], ['pricing', card.pricingHref]]) {
      if (!href) continue
      const url = new URL(href, baseUrl)
      assert(url.protocol === 'https:', `${label}: ${card.name} ${kind} link must use HTTPS.`)
      assert(!['localhost', '127.0.0.1', '::1'].includes(url.hostname), `${label}: ${card.name} ${kind} link must not target a local address.`)
    }
  }

  for (const href of ['#products', '#principles', '#about', '#contact', './privacy.html']) {
    assert(contract.navigation.includes(href), `${label}: main navigation is missing ${href}.`)
  }

  for (const href of ['#products', '#principles', '#about', '#contact', './privacy.html', './terms.html', './trademark.html']) {
    assert(contract.footer.includes(href), `${label}: footer navigation is missing ${href}.`)
  }
}

async function verifyDesktopNavigation(page, label) {
  for (const hash of ['#products', '#principles', '#about', '#contact']) {
    await page.locator(`#site-navigation a[href="${hash}"]`).click()
    assert((await page.evaluate(() => window.location.hash)) === hash, `${label}: navigation did not reach ${hash}.`)
  }
}

async function verifySkipLink(page, label, browserName) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')

  const state = await page.evaluate(() => {
    const active = document.activeElement
    const skipLink = document.querySelector('.skip-link')
    const candidates = [...document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]')]
      .filter((element) => {
        const tabIndex = element.getAttribute('tabindex')
        if (tabIndex !== null && Number(tabIndex) < 0) return false
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0
      })

    return {
      activeIsSkipLink: active === skipLink,
      firstTabbableIsSkipLink: candidates[0] === skipLink,
    }
  })

  if (!state.activeIsSkipLink && browserName === 'webkit' && process.platform === 'win32') {
    // Playwright WebKit on Windows does not always advance focus to links on the
    // first synthetic Tab even when DOM tab order is correct. Preserve the
    // accessibility invariant by verifying that the skip link is still the
    // first tabbable control, then focus it before testing activation.
    assert(state.firstTabbableIsSkipLink, `${label}: skip link must be the first tabbable control.`)
    await page.locator('.skip-link').focus()
  } else {
    assert(state.activeIsSkipLink, `${label}: first keyboard focus should reach the skip link.`)
  }

  await page.keyboard.press('Enter')
  assert((await page.evaluate(() => window.location.hash)) === '#main', `${label}: skip link did not target main content.`)
}

async function reviewBrowser(name, browserType) {
  const browser = await browserType.launch({ headless: true })
  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ]

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: 'light',
        reducedMotion: 'reduce',
      })
      const page = await context.newPage()
      const label = `${name}/${viewport.name}`

      await reviewPage(page, '', label)
      await verifyHomeContract(page, label)

      if (viewport.name === 'mobile') {
        const menuButton = page.getByRole('button', { name: 'Open navigation' })
        await menuButton.click()
        assert(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible(), `${label}: mobile navigation did not open.`)
        await page.keyboard.press('Escape')
        assert(!(await page.getByRole('navigation', { name: 'Main navigation' }).isVisible()), `${label}: Escape did not close mobile navigation.`)
      }

      if (viewport.name === 'desktop') {
        await verifyDesktopNavigation(page, label)
        await verifySkipLink(page, label, name)

        const themeButton = page.getByRole('button', { name: 'Switch to dark theme' })
        await themeButton.click()
        assert((await page.locator('html').getAttribute('data-theme')) === 'dark', `${label}: theme switch did not activate dark mode.`)
        await page.reload({ waitUntil: 'networkidle' })
        assert((await page.locator('html').getAttribute('data-theme')) === 'dark', `${label}: theme preference did not persist after reload.`)
      }

      for (const route of ['privacy.html', 'terms.html', 'trademark.html']) {
        await reviewPage(page, route, label)
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }
}

try {
  await waitForPreview()
  await reviewBrowser('chromium', chromium)
  await reviewBrowser('firefox', firefox)
  await reviewBrowser('webkit', webkit)
  console.log('Verified navigation, product-link safety, legal pages, keyboard/screen-reader semantics, responsive layouts, reduced motion, target sizes, theme persistence, and cross-browser smoke coverage.')
} finally {
  preview.kill('SIGTERM')
}
