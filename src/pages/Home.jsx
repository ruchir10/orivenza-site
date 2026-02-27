import React from 'react'
import Reveal from '../components/Reveal'
import InfoCard from '../components/InfoCard'
import { Link } from 'react-router-dom'

const proofStats = [
  { title: '99.95%', text: 'target uptime architecture' },
  { title: '<250ms', text: 'real-time decision latency goals' },
  { title: '24/7', text: 'monitoring and incident response patterns' },
  { title: 'Audit-ready', text: 'logs, traceability, and controls' }
]

const solutionCards = [
  {
    title: 'AI for Migration Systems',
    description:
      'Modernizing identity verification, workflow automation, and national-scale data systems for seamless population mobility and identity management.',
    linkTo: '/solutions/migration',
    linkLabel: 'Explore migration systems'
  },
  {
    title: 'AI for Healthcare Infrastructure',
    description:
      'Intelligent hospital systems, predictive analytics, and secure health data architecture enabling better patient outcomes at scale.',
    linkTo: '/solutions/healthcare',
    linkLabel: 'Explore healthcare infrastructure'
  },
  {
    title: 'AI for Tax and Compliance',
    description:
      'Enterprise-grade AI systems for GST automation, regulatory workflows, audit traceability, and financial compliance at scale.',
    points: [
      'GST Automation Infrastructure',
      'Notice Intelligence Systems',
      'Compliance Workflow Engines',
      'Audit-Ready Architecture'
    ],
    linkTo: '/solutions/tax-compliance',
    linkLabel: 'Explore tax and compliance'
  },
  {
    title: 'Enterprise AI Deployment',
    description:
      'Cloud-native AI architecture, scaling, optimization, and governance for teams deploying AI at critical scale.'
  }
]

const differentiators = [
  'AI-First Architecture',
  'Regulated Industries',
  'Secure by Design',
  'Scalable to Millions',
  'Research-Driven',
  'Long-Term Partners'
]

const regulatedPillars = ['Compliance-Ready', 'Audit Traceable', 'National Scale Deployment']

export default function Home() {
  return (
    <section className="page home" aria-label="Home page content">
      <header className="hero hero-grid" aria-label="Hero section">
        <div className="hero-overlay" aria-hidden="true" />
        <Reveal className="hero-inner" as="div">
          <h1 className="hero-headline">AI Infrastructure for Regulated and Critical Systems</h1>
          <p className="subtitle">
            Orivenza builds intelligent, scalable infrastructure powering migration systems, healthcare
            networks, and financial compliance platforms, transforming how critical industries operate in
            the AI era.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn">
              Explore Solutions
            </Link>
            <Link to="/about" className="btn ghost">
              Learn More
            </Link>
          </div>
          <div className="trust-pills">
            <span>Security-first engineering</span>
            <span>Built for regulated industries</span>
            <span>Deployment-ready architecture</span>
          </div>
        </Reveal>
      </header>

      <div className="container">
        <section className="proof-strip" aria-label="Key outcomes">
          {proofStats.map((item, index) => (
            <Reveal key={item.title} as="article" delay={index * 80} className="stat-card">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </Reveal>
          ))}
        </section>

        <section className="solutions-section" aria-labelledby="what-we-build-title">
          <h2 id="what-we-build-title">What We Build</h2>
          <p className="section-intro">
            AI-powered infrastructure for industries where intelligence, resilience, and compliance are
            non-negotiable.
          </p>
          <div className="solutions-grid">
            {solutionCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 90}
                className={card.title === 'AI for Tax and Compliance' ? 'solution-card tax-card' : 'solution-card'}
              >
                <InfoCard {...card} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="process-section" aria-labelledby="delivery-title">
          <h2 id="delivery-title">How We Deliver</h2>
          <div className="process-grid">
            <article className="process-step">
              <h3>1. Discovery Sprint</h3>
              <p>We map mission-critical workflows, risk boundaries, and measurable business outcomes.</p>
            </article>
            <article className="process-step">
              <h3>2. Secure Architecture</h3>
              <p>We design cloud and AI layers with compliance, observability, and performance from day one.</p>
            </article>
            <article className="process-step">
              <h3>3. Controlled Launch</h3>
              <p>We ship in phased rollouts, validate KPIs, and harden systems for production scale.</p>
            </article>
          </div>
        </section>

        <section className="why-section" aria-labelledby="why-orivenza-title">
          <h2 id="why-orivenza-title">Why Orivenza</h2>
          <div className="why-grid">
            {differentiators.map((item, index) => (
              <Reveal key={item} as="article" delay={index * 70} className="why-item">
                <div className="why-icon" aria-hidden="true" />
                <h3>{item}</h3>
                <p>
                  {item === 'AI-First Architecture' && 'Intelligence designed into every layer, not bolted on.'}
                  {item === 'Regulated Industries' &&
                    'Built for compliance, security, and auditability from day one.'}
                  {item === 'Secure by Design' && 'Encryption, access control, and data sovereignty built in.'}
                  {item === 'Scalable to Millions' && 'Systems that scale from pilot to national deployment.'}
                  {item === 'Research-Driven' &&
                    'Engineering informed by deep domain expertise and research.'}
                  {item === 'Long-Term Partners' && 'We invest in your success, not just transactions.'}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="regulated-section" aria-labelledby="regulated-title">
          <h2 id="regulated-title">Built for Regulated Industries</h2>
          <p>
            Orivenza specializes in AI systems where uptime, auditability, and regulatory alignment are
            non-negotiable.
          </p>
          <div className="regulated-grid" role="list">
            {regulatedPillars.map((pillar, index) => (
              <Reveal key={pillar} as="article" className="regulated-pill" delay={index * 80}>
                <h3>{pillar}</h3>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="testimonial-section" aria-label="Leadership feedback">
          <h2>Built for Decision-Makers</h2>
          <blockquote>
            "Orivenza's approach combines engineering depth with policy-grade reliability. Their architecture
            work reduces risk while improving service speed."
          </blockquote>
          <p className="testimonial-note">
            Representative engagement feedback from leadership teams in regulated environments.
          </p>
        </section>

        <section className="vision-section" aria-labelledby="vision-title">
          <div className="vision-inner">
            <h2 id="vision-title">Our Vision</h2>
            <p>
              We believe critical systems in migration, healthcare, and finance must evolve beyond legacy
              software. Orivenza exists to rebuild them with intelligence at the core, making public services
              more accessible, more efficient, and more humane.
            </p>
          </div>
        </section>

        <section className="trial-section" aria-labelledby="trial-title">
          <h2 id="trial-title">Try Our Product Free Once</h2>
          <p>Start with a guided pilot at no cost to validate business impact before full rollout.</p>
          <div className="trial-points">
            <span>Free initial setup</span>
            <span>Use-case specific demo</span>
            <span>Architecture review included</span>
          </div>
          <Link to="/contact" className="btn">
            Request Free Trial
          </Link>
        </section>

        <section className="final-cta" aria-labelledby="modernization-title">
          <h2 id="modernization-title">Planning an AI modernization initiative?</h2>
          <p>
            Book a focused strategy call and get a practical architecture blueprint for your first 90 days.
          </p>
          <Link to="/contact" className="btn">
            Schedule a Strategy Call
          </Link>
        </section>
      </div>
    </section>
  )
}
