import React, { useState } from 'react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@orivenza.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="page contact container">
      <h1>Contact Orivenza</h1>
      <p>Let's discuss how we can help build intelligent infrastructure for your organization.</p>

      <div className="contact-content">
        <div className="contact-method">
          <h3>Email</h3>
          <p>
            <a href="mailto:info@orivenza.com" className="email-link">
              info@orivenza.com
            </a>
          </p>
          <button 
            className="btn ghost" 
            onClick={handleCopyEmail}
            style={{ marginTop: 12 }}
          >
            {copied ? '✓ Copied!' : 'Copy Email'}
          </button>
        </div>

        <div className="contact-method">
          <h3>Direct Communication</h3>
          <p>For partnership inquiries, architectural discussions, or technical questions, email us directly with:</p>
          <ul>
            <li>Your organization and industry</li>
            <li>Current challenges</li>
            <li>Timeline and scale</li>
          </ul>
        </div>

        <div className="contact-method">
          <h3>What to Expect</h3>
          <p>We typically respond within 24 hours with tailored recommendations and next steps.</p>
        </div>
      </div>
    </section>
  )
}
