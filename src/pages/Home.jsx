import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="page home">
      <div className="hero">
        <div className="hero-inner">
          <h1 className="hero-headline">Architecting AI Infrastructure for Critical Systems.</h1>
          <p className="subtitle">Orivenza builds intelligent, scalable infrastructure powering migration systems, healthcare networks, and financial compliance platforms— transforming how critical industries operate in the AI era.</p>
          <div className="hero-cta">
            <Link to="/contact" className="btn">Explore Solutions</Link>
            <Link to="/about" className="btn ghost">Learn More</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="solutions-section">
          <h2>What We Build</h2>
          <p className="section-intro">AI-powered infrastructure for industries where intelligence, resilience, and compliance are non-negotiable.</p>
          <div className="solutions-grid">
            <div className="solution-card">
              <h3>AI for Migration Systems</h3>
              <p>Modernizing identity verification, workflow automation, and national-scale data systems for seamless population mobility and identity management.</p>
            </div>
            <div className="solution-card">
              <h3>AI for Healthcare Infrastructure</h3>
              <p>Intelligent hospital systems, predictive analytics, and secure health data architecture enabling better patient outcomes at scale.</p>
            </div>
            <div className="solution-card">
              <h3>AI for Tax & Compliance</h3>
              <p>AI-driven automation for billing, GST, audits, and regulatory workflows—eliminating manual overhead and reducing compliance risk.</p>
            </div>
            <div className="solution-card">
              <h3>Enterprise AI Deployment</h3>
              <p>Cloud-native AI architecture, scaling, optimization, and governance for teams deploying AI at critical scale.</p>
            </div>
          </div>
        </div>

        <div className="why-section">
          <h2>Why Orivenza</h2>
          <div className="why-grid">
            <div className="why-item">
              <h4>AI-First Architecture</h4>
              <p>Intelligence designed into every layer, not bolted on.</p>
            </div>
            <div className="why-item">
              <h4>Regulated Industries</h4>
              <p>Built for compliance, security, and auditability from day one.</p>
            </div>
            <div className="why-item">
              <h4>Secure by Design</h4>
              <p>Encryption, access control, and data sovereignty built in.</p>
            </div>
            <div className="why-item">
              <h4>Scalable to Millions</h4>
              <p>Systems that scale from pilot to national deployment.</p>
            </div>
            <div className="why-item">
              <h4>Research-Driven</h4>
              <p>Engineering informed by deep domain expertise and research.</p>
            </div>
            <div className="why-item">
              <h4>Long-Term Partners</h4>
              <p>We invest in your success, not just transactions.</p>
            </div>
          </div>
        </div>

        <div className="vision-section">
          <div className="vision-inner">
            <h2>Our Vision</h2>
            <p>We believe critical systems — migration, healthcare, finance — must evolve beyond legacy software. Orivenza exists to rebuild them with intelligence at the core, making public services more accessible, more efficient, and more humane.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
