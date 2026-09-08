import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

if (!existsSync('dist')) throw new Error('dist/ does not exist. Run npm run build first.')

function srgb(value) {
  const channel = value / 255
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

function luminance(hex) {
  const value = hex.replace('#', '')
  const channels = [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
  const [r, g, b] = channels.map(srgb)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(first, second) {
  const a = luminance(first)
  const b = luminance(second)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

const contrastChecks = [
  ['light accent text', '#1D4ED8', '#FFFFFF', 4.5],
  ['primary button text', '#FFFFFF', '#2563EB', 4.5],
  ['dark accent text', '#93C5FD', '#0B1020', 4.5],
]

for (const [name, foreground, background, minimum] of contrastChecks) {
  const ratio = contrast(foreground, background)
  if (ratio < minimum) throw new Error(`${name} contrast ${ratio.toFixed(2)} is below ${minimum}:1.`)
}

const sourceCss = [
  readFileSync('src/styles/site.css', 'utf8'),
  readFileSync('src/styles/phase3.css', 'utf8'),
].join('\n')

if (/@font-face|fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(sourceCss)) {
  throw new Error('The website must remain on local/system fonts unless a reviewed font-loading strategy is added.')
}

if (!sourceCss.includes('@media (prefers-reduced-motion: reduce)')) {
  throw new Error('Reduced-motion handling is missing from the stylesheet.')
}

const appSource = readFileSync('src/App.tsx', 'utf8')
if (!appSource.includes('loading="lazy"') || !appSource.includes("theme === 'dark' ? product.logoDark : product.logoLight")) {
  throw new Error('Product image loading/theme selection optimization is missing.')
}

const manifest = readFileSync('dist/site.webmanifest', 'utf8')
if (!manifest.includes('noitis-mark.svg') || manifest.includes('noitis-mark.png')) {
  throw new Error('The web manifest must use the lightweight SVG Noitis mark.')
}

if (existsSync('dist/noitis-mark.png')) {
  throw new Error('The obsolete large noitis-mark.png should not be present in the production artifact.')
}

const assetDirectory = join('dist', 'assets')
if (!existsSync(assetDirectory)) throw new Error('dist/assets is missing.')

const files = readdirSync(assetDirectory).map((name) => join(assetDirectory, name)).filter((file) => statSync(file).isFile())
const scriptBytes = files.filter((file) => extname(file) === '.js').reduce((sum, file) => sum + statSync(file).size, 0)
const cssBytes = files.filter((file) => extname(file) === '.css').reduce((sum, file) => sum + statSync(file).size, 0)

if (scriptBytes > 350 * 1024) throw new Error(`JavaScript bundle budget exceeded: ${Math.ceil(scriptBytes / 1024)} KiB > 350 KiB.`)
if (cssBytes > 100 * 1024) throw new Error(`CSS bundle budget exceeded: ${Math.ceil(cssBytes / 1024)} KiB > 100 KiB.`)
if (scriptBytes + cssBytes > 450 * 1024) throw new Error('Combined JavaScript/CSS budget exceeded 450 KiB.')

const socialPreview = join('dist', 'social-preview.png')
if (!existsSync(socialPreview) || statSync(socialPreview).size > 1.5 * 1024 * 1024) {
  throw new Error('The social preview image is missing or exceeds the 1.5 MiB publication budget.')
}

console.log(`Verified contrast, reduced motion, font policy, image-loading strategy, and bundle budgets (${Math.ceil(scriptBytes / 1024)} KiB JS, ${Math.ceil(cssBytes / 1024)} KiB CSS).`)
