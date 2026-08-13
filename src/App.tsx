import { useEffect, useState } from 'react'
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiCpu,
  FiLayers,
  FiMenu,
  FiShield,
  FiX,
} from 'react-icons/fi'
import { BrandMark } from './BrandMark'

type Theme = 'light' | 'dark'

const products = [
  {
    name: 'AgentGate',
    eyebrow: 'AI governance',
    description:
      'Governance and control for autonomous AI agents: what they can access, decide, and do.',
    icon: <FiShield aria-hidden="true" />,
  },
  {
    name: 'AutoPaylot',
    eyebrow: 'Financial automation',
    description:
      'Intelligent control of recurring financial obligations, payments, approvals, and confirmation.',
    icon: <FiCpu aria-hidden="true" />,
  },
  {
    name: 'Business Resource Scheduler',
    eyebrow: 'Operational intelligence',
    description:
      'Resource orchestration that determines when complex work can actually happen.',
    icon: <FiLayers aria-hidden="true" />,
  },
]

const principles = [
  {
    title: 'Trust first',
    text: 'Security, transparency, reliability, and user control are part of the product—not finishing touches.',
  },
  {
    title: 'Useful intelligence',
    text: 'Advanced technology should remove real work and uncertainty, not create complexity for its own sake.',
  },
  {
    title: 'Human control',
    text: 'Automation should expand capability while keeping important decisions understandable and accountable.',
  },
  {
    title: 'Built for real people',
    text: 'Readable, predictable interfaces should work for people of different ages and technical experience.',
  },
]

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('noitis-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('noitis-theme', theme)
  }, [theme])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to main content</a>

      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Noitis home" onClick={closeMenu}>
          <BrandMark compact />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'} aria-label="Main navigation">
          <a href="#products" onClick={closeMenu}>Products</a>
          <a href="#principles" onClick={closeMenu}>How we build</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="./privacy.html" onClick={closeMenu}>Privacy</a>
          <button
            className="theme-button"
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__orb hero__orb--one" />
            <div className="hero__orb hero__orb--two" />
            <div className="hero__core">N</div>
          </div>

          <div className="hero__copy">
            <p className="eyebrow">From Greece. Built for the world.</p>
            <h1>Technology people can trust.</h1>
            <p className="hero__lead">
              Noitis builds intelligent software for the systems people and businesses depend on every day.
            </p>
            <p className="hero__support">
              Powerful without feeling confusing. Clear enough to understand. Controlled enough to trust.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#products">
                Discover our products <FiArrowRight aria-hidden="true" />
              </a>
              <a className="button button--secondary" href="#about">
                Meet Noitis™
              </a>
            </div>
          </div>
        </section>

        <section className="section section--statement" aria-labelledby="purpose-title">
          <p className="eyebrow">Our purpose</p>
          <h2 id="purpose-title">Make advanced technology feel dependable.</h2>
          <p className="section__lead">
            We look for places where people waste time, lose control, accept unnecessary risk,
            or work around software that should be working for them. Then we engineer a better system.
          </p>
        </section>

        <section className="section" id="products" aria-labelledby="products-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What we build</p>
              <h2 id="products-title">A family of focused products.</h2>
            </div>
            <p>
              Each product solves a different operational problem, but all of them share the same foundation:
              intelligence, clarity, control, and trust.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <span className="product-card__icon">{product.icon}</span>
                <p className="product-card__eyebrow">{product.eyebrow}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="product-card__status">In development</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="principles" aria-labelledby="principles-title">
          <div className="section-heading section-heading--stacked">
            <p className="eyebrow">How we build</p>
            <h2 id="principles-title">Simple on the surface. Serious underneath.</h2>
          </div>

          <div className="principle-grid">
            {principles.map((principle, index) => (
              <article className="principle-card" key={principle.title}>
                <span className="principle-card__number">0{index + 1}</span>
                <FiCheckCircle aria-hidden="true" />
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section origin" id="about" aria-labelledby="about-title">
          <div className="origin__intro">
            <p className="eyebrow">Our roots</p>
            <h2 id="about-title">Greek foundations. Global ambition.</h2>
          </div>

          <div className="origin__copy">
            <p>
              Noitis is being built in Greece with an international horizon. Our name is inspired by the Greek intellectual tradition around <em>nous</em> and <em>noesis</em>: mind, thought, understanding, and the conception of an idea.
            </p>
            <p>
              For us, Noitis is the one who sees what could exist before it exists - and engineers it into reality. That becomes a practical standard: technology should help people understand better, decide with confidence, and act with greater control.
            </p>
            <p>
              Noitis began with a builder&apos;s question: where are businesses still accepting friction, uncertainty,
              or unnecessary manual work simply because better software has not been built yet?
            </p>
          </div>
        </section>

        <section className="future" aria-labelledby="future-title">
          <div className="future__icon" aria-hidden="true"><FiCompass /></div>
          <p className="eyebrow">Where we are going</p>
          <h2 id="future-title">Between human intention and machine capability.</h2>
          <p>
            As software becomes more capable of reasoning, coordinating, and acting, trust will matter more—not less.
            We want Noitis to build the systems that make that future understandable, useful, and safe to rely on.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <BrandMark />
          <p>Built in Greece. Designed for a global future.</p>
        </div>

        <div className="site-footer__links">
          <a href="#products">Products</a>
          <a href="#principles">How we build</a>
          <a href="#about">About</a>
          <a href="./privacy.html">Privacy</a>
        </div>

        <p className="site-footer__legal">© {new Date().getFullYear()} Noitis™. All rights reserved.</p>
      </footer>
    </div>
  )
}
