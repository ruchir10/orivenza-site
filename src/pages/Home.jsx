import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="page home">
      <div className="hero">
        <div className="hero-inner">
          <h1>Orivenza</h1>
          <p className="subtitle">Modern cloud and technology solutions for forward-thinking companies.</p>
          <div className="hero-cta">
            <Link to="/contact" className="btn">Contact Us</Link>
            <Link to="/products" className="btn ghost">Our Products</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/logo.svg" alt="Orivenza logo" />
        </div>
      </div>
      <div className="container">
        <h2>What we do</h2>
        <p>We build scalable cloud systems, SaaS products, and provide enterprise integrations.</p>
        <div className="features">
          <div className="feature">
            <h3>Cloud Infrastructure</h3>
            <p>Deploy and scale with confidence. Our cloud solutions support your growth.</p>
          </div>
          <div className="feature">
            <h3>SaaS Products</h3>
            <p>Enterprise-ready applications built on modern tech stacks.</p>
          </div>
          <div className="feature">
            <h3>Integration Services</h3>
            <p>Seamlessly connect your systems and data pipelines.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
