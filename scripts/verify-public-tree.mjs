import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const ignoredDirectories = new Set(['.git', 'node_modules', 'dist', 'media'])
const binaryExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.pdf'])
const forbiddenPatterns = [
  new RegExp('ph' + 'ase[- _]?[0-9]+', 'i'),
  new RegExp('te' + 'st[- _]?[0-9]+', 'i'),
  new RegExp('te' + 'st[- _]?one', 'i'),
]

function filesUnder(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (ignoredDirectories.has(name)) return []
    const path = join(directory, name)
    return statSync(path).isDirectory() ? filesUnder(path) : [path]
  })
}

const violations = []

for (const file of filesUnder('.')) {
  const normalizedPath = relative('.', file).replaceAll('\\', '/')

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(normalizedPath)) violations.push(`${normalizedPath}: forbidden internal label in path`)
  }

  if (binaryExtensions.has(extname(file).toLowerCase())) continue

  let content
  try {
    content = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) violations.push(`${normalizedPath}: forbidden internal label in content`)
  }
}

if (violations.length > 0) {
  throw new Error(`Public repository cleanliness check failed:\n${violations.join('\n')}`)
}

console.log('Verified the public repository tree is free of numbered internal milestone/test labels.')
