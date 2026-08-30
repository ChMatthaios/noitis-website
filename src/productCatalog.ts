import agentGateLogoLight from '../media/AgentGate Light.png'
import agentGateLogoDark from '../media/AgentGate Dark.png'
import autoPaylotLogoLight from '../media/Autopaylot Light.png'
import autoPaylotLogoDark from '../media/Autopaylot Dark.png'
import brsLogoLight from '../media/BRS Light.png'
import brsLogoDark from '../media/BRS Dark.png'
import elogLogoLight from '../media/EarnLogic Light.png'
import elogLogoDark from '../media/EarnLogic Dark.png'
import fosLogoLight from '../media/FamilyOS Light.png'
import fosLogoDark from '../media/FamilyOS Dark.png'
import lciLogoLight from '../media/LegacyCI Light.png'
import lciLogoDark from '../media/LegacyCI Dark.png'

export type ProductCatalogEntry = {
  name: string
  category: string
  description: string
  status: 'In development'
  note: string
  href?: string
  pricingHref?: string
  logoLight: string
  logoDark: string
}

function optionalUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed || undefined
}

// Audited against the Noitis product repositories on 2026-08-25. Keep this
// deliberately conservative: the company website must describe what exists
// without turning roadmap intentions into public capability claims.
export const products: ProductCatalogEntry[] = [
  {
    name: 'AgentGate',
    category: 'AI governance',
    description: 'A governance gateway for AI agents that applies organization policy and routes sensitive actions through human approval when required.',
    status: 'In development',
    note: 'Trusted governance and approval foundations are implemented; broader production integrations and execution capabilities remain in development.',
    href: optionalUrl(import.meta.env.VITE_AGENTGATE_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_AGENTGATE_PRICING_URL),
    logoLight: agentGateLogoLight,
    logoDark: agentGateLogoDark,
  },
  {
    name: 'AutoPaylot',
    category: 'Financial obligations',
    description: 'Financial-obligation control for organizing recurring commitments and deciding what is ready before money moves.',
    status: 'In development',
    note: 'Real bank connectivity and real payment execution are not enabled in the current product.',
    href: optionalUrl(import.meta.env.VITE_AUTOPAYLOT_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_AUTOPAYLOT_PRICING_URL),
    logoLight: autoPaylotLogoLight,
    logoDark: autoPaylotLogoDark,
  },
  {
    name: 'Business Resource Scheduler',
    category: 'Operational scheduling',
    description: 'Constraint-based scheduling for work that depends on people, skills, equipment, spaces, locations, availability, and business rules.',
    status: 'In development',
    note: 'The trusted scheduling vertical slice is implemented; broader operational and adaptive scheduling capabilities remain in development.',
    href: optionalUrl(import.meta.env.VITE_BRS_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_BRS_PRICING_URL),
    logoLight: brsLogoLight,
    logoDark: brsLogoDark,
  },
  {
    name: 'EarnLogic',
    category: 'Compensation intelligence',
    description: 'Commercial performance and incentive compensation connected by calculation lineage that explains monetary results.',
    status: 'In development',
    note: 'The trusted compensation foundation is being built; planned rule families, integrations, and production release work are not represented as complete.',
    href: optionalUrl(import.meta.env.VITE_EARNLOGIC_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_EARNLOGIC_PRICING_URL),
    logoLight: elogLogoLight,
    logoDark: elogLogoDark,
  },
  {
    name: 'FamilyOS',
    category: 'Family coordination',
    description: 'A parent-first, child-centred experience for discovery, bookings, schedules, saved items, and everyday family coordination.',
    status: 'In development',
    note: 'Real payments, provider integrations, maps, and production notification delivery remain future work.',
    href: optionalUrl(import.meta.env.VITE_FAMILYOS_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_FAMILYOS_PRICING_URL),
    logoLight: fosLogoLight,
    logoDark: fosLogoDark,
  },
  {
    name: 'LegacyCI',
    category: 'Database change intelligence',
    description: 'Dependency, lineage, and pre-change impact analysis for complex database systems with explicit evidence and visible uncertainty.',
    status: 'In development',
    note: 'Production customer-database connectors are not enabled; the current trusted application uses controlled analysis data.',
    href: optionalUrl(import.meta.env.VITE_LEGACYCI_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_LEGACYCI_PRICING_URL),
    logoLight: lciLogoLight,
    logoDark: lciLogoDark,
  },
]
