import React, { useState } from 'react'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../config/contact'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL?.trim() || 'https://formspree.io/f/xyzgkwkq'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setStatus('sending')
    setErrorMessage('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMessage('Please fill out all fields before sending.')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          message,
          _subject: `New Orivenza inquiry from ${name}`
        })
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await response.json().catch(() => ({}))
        const firstError = data?.errors?.[0]?.message
        if (firstError) setErrorMessage(firstError)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err) {
      console.error('Error sending form:', err)
      setErrorMessage('Network error. Please try again in a moment.')
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
              Thanks! Your message has been sent. We'll be in touch within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="status-message error">
              Error sending message{errorMessage ? `: ${errorMessage}` : '.'} Please email <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a> directly.
            </div>
          )}
        </div>

        <div className="contact-info">
          <h3>Direct Contact</h3>
          <p>Or reach us directly:</p>
          <p><a href={CONTACT_MAILTO} className="email-link">{CONTACT_EMAIL}</a></p>
        </div>
      </div>
    </section>
  )
}
