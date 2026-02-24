import React from 'react'

const products = [
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
          </div>
        ))}
      </div>
    </section>
  )
}
