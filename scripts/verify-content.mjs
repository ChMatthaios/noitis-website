import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const textExtensions = new Set(['.html', '.js', '.css', '.xml', '.txt', '.webmanifest', '.json'])
const forbiddenProductionTokens = ['localhost:', '127.0.0.1']
const requiredIndexTokens = [
  'rel="canonical"',
  'property="og:title"',
  'property="og:image"',
  'name="twitter:card"',
  'social-preview.png',
]

if (!existsSync('dist')) throw new Error('dist/ does not exist. Run npm run build first.')

function collectFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? collectFiles(path) : [path]
  })
}

for (const file of collectFiles('dist')) {
  if (!textExtensions.has(extname(file))) continue
  const content = readFileSync(file, 'utf8')
  for (const token of forbiddenProductionTokens) {
    if (content.includes(token)) throw new Error(`Production output contains development-only token '${token}' in ${file}.`)
  }
}

const index = readFileSync('dist/index.html', 'utf8')
for (const token of requiredIndexTokens) {
  if (!index.includes(token)) throw new Error(`dist/index.html is missing required publication metadata: ${token}`)
}

const robots = readFileSync('dist/robots.txt', 'utf8')
if (!robots.includes('Sitemap:')) throw new Error('dist/robots.txt does not advertise the sitemap.')

const sitemap = readFileSync('dist/sitemap.xml', 'utf8')
const locationCount = (sitemap.match(/<loc>/g) || []).length
if (locationCount !== 4) throw new Error(`Expected four public sitemap locations, found ${locationCount}.`)

console.log('Verified production content safety, publication metadata, robots, and sitemap output.')
