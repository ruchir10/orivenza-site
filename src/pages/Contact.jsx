import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
// Sign up at https://www.emailjs.com/ and get your Service ID, Template ID, and Public Key
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_orivenza'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY)
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!PUBLIC_KEY) {
      setStatus('no-config')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'info@orivenza.com',
      })
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Error sending email:', err)
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
              ✗ Error sending message. Please try again or email info@orivenza.com directly.
            </div>
          )}
          {status === 'no-config' && (
            <div className="status-message info">
              Form not configured. Please email <a href="mailto:info@orivenza.com">info@orivenza.com</a> directly.
            </div>
          )}
        </div>

        <div className="contact-info">
          <h3>Direct Contact</h3>
          <p>Or reach us directly at:</p>
          <p><a href="mailto:info@orivenza.com" className="email-link">info@orivenza.com</a></p>
        </div>
      </div>
    </section>
  )
}
