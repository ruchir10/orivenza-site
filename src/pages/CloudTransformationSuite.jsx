import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { CLOUD_SUITE_APP_URL } from '../config/cloudSuite'

const kpis = [
  { value: '10', label: 'advisor modules' },
  { value: '3', label: 'transformation phases' },
  { value: 'PDF', label: 'executive exports' },
  { value: 'JWT', label: 'secure workspace access' }
]

const phaseModules = [
  {
    title: 'Phase 1: Migration and DR Foundation',
    modules: [
      'Migration Assessment Tool',
      'DR Strategy Recommender',
      'Migration Runbook Generator',
      'DR Readiness Scorecard'
    ]
  },
  {
    title: 'Phase 2: Architecture and Cost Advisory',
    modules: ['Architecture Review AI', 'Cost Optimization Analyzer', 'Database Migration Planner']
  },
  {
    title: 'Phase 3: Platform Modernization',
    modules: ['Infrastructure Health Check AI', 'Landing Zone Generator', 'Executive Dashboard Generator']
  }
]

const audiences = ['CTOs', 'TPMs', 'Cloud Architects', 'Engineering Managers', 'Platform Teams']

export default function CloudTransformationSuite() {
  return (
    <section className="page cloud-suite-page" aria-labelledby="cloud-suite-title">
      <header className="cloud-suite-hero">
        <div className="cloud-suite-hero-inner">
          <Reveal as="div" className="cloud-suite-copy">
            <p className="eyebrow">Orivenza Product Platform</p>
            <h1 id="cloud-suite-title">Orivenza Cloud Transformation Suite</h1>
            <p>
              A consulting-grade SaaS workspace for cloud migration assessment, disaster recovery
              strategy, architecture review, cost optimization, database migration planning, landing
              zone design, and executive transformation reporting.
            </p>
            <div className="cloud-suite-actions">
              <a className="btn" href={CLOUD_SUITE_APP_URL} rel="noreferrer" target="_blank">
                Launch Cloud Suite
              </a>
              <Link className="btn ghost" to="/contact">
                Discuss Implementation
              </Link>
            </div>
          </Reveal>

          <Reveal as="div" className="cloud-suite-board" delay={100}>
            <div className="board-topline">
              <span>Transformation Command Center</span>
              <strong>Risk 64%</strong>
            </div>
            <div className="board-grid">
              <div>
                <small>DR Readiness</small>
                <strong>72%</strong>
              </div>
              <div>
                <small>Expected Savings</small>
                <strong>$420K</strong>
              </div>
              <div>
                <small>Timeline</small>
                <strong>9 mo</strong>
              </div>
              <div>
                <small>Modules</small>
                <strong>10</strong>
              </div>
            </div>
            <div className="risk-bars" aria-hidden="true">
              <span style={{ width: '78%' }} />
              <span style={{ width: '54%' }} />
              <span style={{ width: '68%' }} />
            </div>
          </Reveal>
        </div>
      </header>

      <div className="container">
        <section className="proof-strip" aria-label="Cloud Suite highlights">
          {kpis.map((item, index) => (
            <Reveal key={item.label} as="article" className="stat-card" delay={index * 80}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </Reveal>
          ))}
        </section>

        <section className="solutions-section" aria-labelledby="suite-modules-title">
          <h2 id="suite-modules-title">Built for Cloud Transformation Decisions</h2>
          <p className="section-intro">
            The suite turns fragmented cloud planning into structured, repeatable advisory workflows
            with executive summaries, risk assessments, recommendations, migration roadmaps, DR plans,
            architecture reviews, and export-ready reports.
          </p>
          <div className="product-grid">
            {phaseModules.map((phase, index) => (
              <Reveal key={phase.title} as="article" className="product-card cloud-suite-phase-card" delay={index * 90}>
                <h3>{phase.title}</h3>
                <ul>
                  {phase.modules.map((module) => (
                    <li key={module}>{module}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cloud-suite-workflow" aria-labelledby="suite-workflow-title">
          <h2 id="suite-workflow-title">Advisor Workflow</h2>
          <div className="process-grid">
            <article className="process-step">
              <h3>1. Capture Context</h3>
              <p>Collect cloud provider, workload, data size, RTO/RPO, resource, database, and compliance inputs.</p>
            </article>
            <article className="process-step">
              <h3>2. Generate Structured Output</h3>
              <p>Produce scores, risks, implementation steps, Terraform skeletons, runbooks, charts, and findings.</p>
            </article>
            <article className="process-step">
              <h3>3. Export and Govern</h3>
              <p>Download PDF, JSON, and CSV reports for architecture reviews, steering committees, and migration governance.</p>
            </article>
          </div>
        </section>

        <section className="regulated-section" aria-labelledby="suite-audience-title">
          <h2 id="suite-audience-title">Designed for Technical Leadership</h2>
          <p>
            Use the platform across discovery workshops, architecture boards, DR tabletop planning,
            FinOps reviews, and executive transformation updates.
          </p>
          <div className="regulated-grid" role="list">
            {audiences.map((audience, index) => (
              <Reveal key={audience} as="article" className="regulated-pill" delay={index * 60}>
                <h3>{audience}</h3>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="final-cta" aria-labelledby="suite-cta-title">
          <h2 id="suite-cta-title">Bring cloud advisory workflows into one secure workspace.</h2>
          <p>
            Launch the SaaS suite or talk with Orivenza about integrating it into your cloud transformation operating model.
          </p>
          <div className="trial-actions">
            <a className="btn" href={CLOUD_SUITE_APP_URL} rel="noreferrer" target="_blank">
              Open Platform
            </a>
            <Link className="btn ghost" to="/contact">
              Request a Strategy Call
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
