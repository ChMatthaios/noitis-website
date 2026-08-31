import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'

const htmlFiles = ['index.html', 'privacy.html', 'terms.html', 'trademark.html']
const skippedSchemes = /^(?:https?:|mailto:|tel:|data:|javascript:)/i

if (!existsSync('dist')) throw new Error('dist/ does not exist. Run npm run build first.')

function idsIn(html) {
  return new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]))
}

function normalizeUrlPath(value) {
  return value.replaceAll('\\', '/')
}

for (const fileName of htmlFiles) {
  const filePath = join('dist', fileName)
  if (!existsSync(filePath)) throw new Error(`Missing built page ${filePath}.`)

  const html = readFileSync(filePath, 'utf8')
  const pageIds = idsIn(html)
  const references = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1])

  for (const reference of references) {
    if (!reference || skippedSchemes.test(reference) || reference.startsWith('//')) continue

    if (reference.startsWith('#')) {
      const id = decodeURIComponent(reference.slice(1))
      if (id && !pageIds.has(id)) throw new Error(`${fileName} links to missing in-page target #${id}.`)
      continue
    }

    const [rawPath, rawHash = ''] = reference.split('#', 2)
    const pathWithoutQuery = rawPath.split('?', 1)[0]
    if (!pathWithoutQuery) continue

    const decoded = normalizeUrlPath(decodeURIComponent(pathWithoutQuery))
    const targetPath = decoded.startsWith('/')
      ? join('dist', decoded.replace(/^\/+/, ''))
      : normalize(join(dirname(filePath), decoded))

    if (!existsSync(targetPath)) throw new Error(`${fileName} references missing local target ${reference}.`)

    if (rawHash && targetPath.endsWith('.html')) {
      const targetIds = idsIn(readFileSync(targetPath, 'utf8'))
      const id = decodeURIComponent(rawHash)
      if (id && !targetIds.has(id)) throw new Error(`${fileName} links to missing target ${reference}.`)
    }
  }
}

console.log('Verified local links and built asset references for all public pages.')
