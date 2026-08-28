import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const DEFAULT_SITE_URL = 'https://noitis-mc.github.io/noitis-website/'
const textExtensions = new Set(['.html', '.js', '.css', '.xml', '.txt', '.webmanifest', '.json'])
const forbiddenProductionTokens = ['localhost:', '127.0.0.1']
const publicPages = [
  { file: 'index.html', path: '' },
  { file: 'privacy.html', path: 'privacy.html' },
  { file: 'terms.html', path: 'terms.html' },
  { file: 'trademark.html', path: 'trademark.html' },
]

if (!existsSync('dist')) throw new Error('dist/ does not exist. Run npm run build first.')

function normalizeSiteUrl(rawValue) {
  const url = new URL((rawValue || DEFAULT_SITE_URL).trim())
  if (!url.pathname.endsWith('/')) url.pathname += '/'
  return url.toString()
}

function collectFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? collectFiles(path) : [path]
  })
}

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || process.env.SITE_URL)

for (const file of collectFiles('dist')) {
  if (!textExtensions.has(extname(file))) continue
  const content = readFileSync(file, 'utf8')
  for (const token of forbiddenProductionTokens) {
    if (content.includes(token)) throw new Error(`Production output contains development-only token '${token}' in ${file}.`)
  }
}

for (const page of publicPages) {
  const file = join('dist', page.file)
  if (!existsSync(file)) throw new Error(`Missing public page ${file}.`)

  const html = readFileSync(file, 'utf8')
  const expectedCanonical = new URL(page.path, siteUrl).toString()
  const requiredTokens = [
    '<title>',
    'name="description"',
    'name="robots" content="index,follow"',
    `rel="canonical" href="${expectedCanonical}"`,
    'property="og:title"',
    'property="og:url"',
    'property="og:image"',
    'name="twitter:card"',
  ]

  for (const token of requiredTokens) {
    if (!html.includes(token)) throw new Error(`${page.file} is missing required publication metadata: ${token}`)
  }
}

const index = readFileSync('dist/index.html', 'utf8')
if (!index.includes('type="application/ld+json"') || !index.includes('"@type": "Organization"')) {
  throw new Error('dist/index.html is missing the Noitis Organization structured data.')
}

const robots = readFileSync('dist/robots.txt', 'utf8')
const expectedSitemap = new URL('sitemap.xml', siteUrl).toString()
if (!robots.includes(`Sitemap: ${expectedSitemap}`)) throw new Error('dist/robots.txt does not advertise the configured sitemap URL.')

const sitemap = readFileSync('dist/sitemap.xml', 'utf8')
for (const page of publicPages) {
  const expectedUrl = new URL(page.path, siteUrl).toString()
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) throw new Error(`Sitemap is missing ${expectedUrl}.`)
}

const locationCount = (sitemap.match(/<loc>/g) || []).length
if (locationCount !== publicPages.length) throw new Error(`Expected ${publicPages.length} public sitemap locations, found ${locationCount}.`)

console.log('Verified production content safety, metadata, canonical URLs, structured data, robots, and sitemap output.')
