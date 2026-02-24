import React, { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('https://formspree.io/f/xyzgkwkq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err) {
      console.error('Error sending form:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className="page contact container">
      <h1>Contact Orivenza</h1>
      <p>Let's discuss how we can help build intelligent infrastructure for your organization.</p>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </label>
          <label>
            Email
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </label>
          <label>
            Message
            <textarea 
              name="message" 
              rows="6" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </label>

          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>

        <div className="contact-status">
          {status === 'sent' && (
            <div className="status-message success">
              ✓ Thanks! Your message has been sent. We'll be in touch within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="status-message error">
              ✗ Error sending message. Please email <a href="mailto:info@orivenza.com">info@orivenza.com</a> directly.
            </div>
          )}
        </div>

        <div className="contact-info">
          <h3>Direct Contact</h3>
          <p>Or reach us directly:</p>
          <p><a href="mailto:info@orivenza.com" className="email-link">info@orivenza.com</a></p>
        </div>
      </div>
    </section>
  )
}
