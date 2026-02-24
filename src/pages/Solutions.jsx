import React from 'react'

const solutions = [
  {
    title: 'AI for Migration Systems',
    description:
      'Identity workflows, case automation, and secure data exchange for high-volume public service operations.',
    points: ['Digital identity verification', 'Workflow orchestration', 'National-scale reliability']
  },
  {
    title: 'AI for Healthcare Infrastructure',
    description:
      'Clinical data pipelines and intelligent operations platforms to improve care quality and response times.',
    points: ['Predictive capacity planning', 'Interoperable health records', 'Privacy-first architecture']
  },
  {
    title: 'AI for Tax and Compliance',
    description:
      'Automation and decision support across taxation, audit readiness, and compliance-heavy back-office functions.',
    points: ['Automated validation checks', 'Risk scoring and anomaly detection', 'Audit trail and reporting']
  },
  {
    title: 'Enterprise AI Deployment',
    description:
      'End-to-end architecture for teams moving from prototypes to secure, governed, production-grade AI systems.',
    points: ['MLOps and observability', 'Security and governance controls', 'Scalable cloud foundations']
  }
]

export default function Solutions() {
  return (
    <section className="page products container">
      <h1>Solutions</h1>
      <p>Orivenza designs and deploys secure AI systems for mission-critical environments.</p>
      <div className="product-grid">
        {solutions.map((solution) => (
          <div key={solution.title} className="product-card">
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
            <ul>
              {solution.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
