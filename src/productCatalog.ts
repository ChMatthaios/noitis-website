import agentGateLogoLight from '../media/AgentGate Light.png'
import agentGateLogoDark from '../media/AgentGate Dark.png'
import autoPaylotLogoLight from '../media/AutoPaylot Light.png'
import autoPaylotLogoDark from '../media/AutoPaylot Dark.png'
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

// Keep public descriptions deliberately conservative. The company website must
// describe verified capability without turning future roadmap intentions into claims.
export const products: ProductCatalogEntry[] = [
  {
    name: 'AgentGate',
    category: 'AI governance',
    description: 'A governance gateway for AI agents that applies organization policy and routes sensitive actions through human approval when required.',
    status: 'In development',
    note: 'AgentGate provides a governance control plane, developer connectivity, and controlled integration/approval-delivery foundations while broader commercial and enterprise capabilities continue to evolve.',
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
    note: 'Read-only sandbox bank connectivity and simulated payment controls are implemented; real payment execution remains disabled.',
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
    note: 'Operational scheduling and adaptive planning are implemented; external calendar, API, webhook, and recurring synchronization capabilities remain in development.',
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
    note: 'Governed compensation calculations, statements, audit evidence, and the canonical ingestion foundation are implemented; productized CRM, ERP, HRIS, payroll, and public API integrations remain in development.',
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
    note: 'Family coordination, booking/calendar workflows, and privacy-aware OpenStreetMap discovery are implemented; the provider platform, authoritative availability, and real payments remain in development.',
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
    note: 'Certified read-only PostgreSQL 16–18 metadata connectivity is implemented; production semantic lineage parsing and change-impact semantics remain in development.',
    href: optionalUrl(import.meta.env.VITE_LEGACYCI_PUBLIC_URL),
    pricingHref: optionalUrl(import.meta.env.VITE_LEGACYCI_PRICING_URL),
    logoLight: lciLogoLight,
    logoDark: lciLogoDark,
  },
]
