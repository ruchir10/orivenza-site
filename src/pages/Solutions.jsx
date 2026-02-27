import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Reveal from '../components/Reveal'
import InfoCard from '../components/InfoCard'

const solutions = [
  {
    id: 'migration',
    title: 'AI for Migration Systems',
    description:
      'Identity workflows, case automation, and secure data exchange for high-volume public service operations.',
    points: ['Digital identity verification', 'Workflow orchestration', 'National-scale reliability']
  },
  {
    id: 'healthcare',
    title: 'AI for Healthcare Infrastructure',
    description:
      'Clinical data pipelines and intelligent operations platforms to improve care quality and response times.',
    points: ['Predictive capacity planning', 'Interoperable health records', 'Privacy-first architecture']
  },
  {
    id: 'tax-compliance',
    title: 'AI for Tax and Compliance',
    description:
      'Enterprise-grade AI systems for GST automation, regulatory workflows, audit traceability, and financial compliance at scale.',
    points: [
      'GST Automation Infrastructure',
      'Notice Intelligence Systems',
      'Compliance Workflow Engines',
      'Audit-Ready Architecture'
    ]
  },
  {
    id: 'enterprise-deployment',
    title: 'Enterprise AI Deployment',
    description:
      'End-to-end architecture for teams moving from prototypes to secure, governed, production-grade AI systems.',
    points: ['MLOps and observability', 'Security and governance controls', 'Scalable cloud foundations']
  }
]

export default function Solutions() {
  const location = useLocation()

  useEffect(() => {
    const slug = location.pathname.replace('/solutions/', '')
    if (!slug || slug === 'solutions') return

    const target = document.getElementById(slug)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.pathname])

  return (
    <section className="page products container" aria-labelledby="solutions-title">
      <header>
        <h1 id="solutions-title">Solutions</h1>
        <p>Orivenza designs and deploys secure AI systems for mission-critical environments.</p>
      </header>
      <section className="product-grid" aria-label="Solutions list">
        {solutions.map((solution, index) => (
          <Reveal key={solution.title} delay={index * 90}>
            <div id={solution.id} className={solution.id === 'tax-compliance' ? 'product-card tax-card' : 'product-card'}>
              <InfoCard title={solution.title} description={solution.description} points={solution.points} />
            </div>
          </Reveal>
        ))}
      </section>
    </section>
  )
}
