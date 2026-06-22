import React from 'react'
import { Link } from 'react-router-dom'

const products = [
  {
    id: 0,
    name: 'Cloud Transformation Suite',
    desc: 'SaaS advisory platform for migration assessment, DR strategy, architecture review, cost optimization, database migration planning, and executive transformation reporting.',
    features: ['Migration and DR planning', 'Architecture and cost reviews', 'PDF executive reports'],
    linkTo: '/cloud-transformation-suite'
  },
  {
    id: 1,
    name: 'CloudScale',
    desc: 'Auto-scaling infrastructure management for Kubernetes and serverless apps.',
    features: ['Auto-scaling', 'Cost optimization', 'Multi-cloud support']
  },
  {
    id: 2,
    name: 'DataBridge',
    desc: 'Enterprise data integration platform for real-time ETL pipelines.',
    features: ['Real-time sync', 'Schema management', 'Data governance']
  },
  {
    id: 3,
    name: 'SecureVault',
    desc: 'Zero-trust secrets management and compliance automation.',
    features: ['Key rotation', 'Audit logging', 'GDPR/HIPAA ready']
  },
]

export default function Products() {
  return (
    <section className="page products container">
      <h1>Products</h1>
      <p>Orivenza offers a suite of cloud-native products designed for enterprise scale.</p>
      <div className="product-grid">
        {products.map(prod => (
          <div key={prod.id} className="product-card">
            <h3>{prod.name}</h3>
            <p>{prod.desc}</p>
            <ul>
              {prod.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
            {prod.linkTo ? (
              <Link className="card-inline-link" to={prod.linkTo}>
                Explore platform
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
