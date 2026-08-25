import { existsSync, writeFileSync } from 'node:fs'

if (existsSync('.env.local') || existsSync('.env')) {
  process.exit(0)
}

const localEnvironment = `VITE_SITE_URL=http://localhost:5173/
VITE_AGENTGATE_PUBLIC_URL=http://localhost:5174/
VITE_AUTOPAYLOT_PUBLIC_URL=http://localhost:5175/
VITE_BRS_PUBLIC_URL=http://localhost:5176/
VITE_EARNLOGIC_PUBLIC_URL=http://localhost:5177/
VITE_FAMILYOS_PUBLIC_URL=http://localhost:5178/
VITE_LEGACYCI_PUBLIC_URL=http://localhost:5179/
VITE_AGENTGATE_PRICING_URL=
VITE_AUTOPAYLOT_PRICING_URL=
VITE_BRS_PRICING_URL=
VITE_EARNLOGIC_PRICING_URL=
VITE_FAMILYOS_PRICING_URL=
VITE_LEGACYCI_PRICING_URL=
`

writeFileSync('.env.local', localEnvironment, 'utf8')
console.log('Created .env.local with the permanent Noitis local product URLs.')
