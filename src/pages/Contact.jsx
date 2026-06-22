import React, { useState } from 'react'
import { CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_ENDPOINT } from '../config/contact'

const SUBJECTS = {
  general_inquiry: 'New Orivenza inquiry',
  gst_ai_demo: 'GST AI demo request',
  aws_migration: 'AWS migration inquiry'
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedInquiryType, setSubmittedInquiryType] = useState('general_inquiry')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general_inquiry',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setStatus('sending')
    setErrorMessage('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const inquiryType = formData.inquiryType
    const message = formData.message.trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMessage('Please fill out all fields before sending.')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          requestType: inquiryType,
          source: 'orivenza-site-contact',
          _replyto: email,
          message,
          _subject: `${SUBJECTS[inquiryType]} from ${name}`
        })
      })

      if (response.ok) {
        setSubmittedInquiryType(inquiryType)
        setStatus('sent')
        setFormData({ name: '', email: '', inquiryType: 'general_inquiry', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await response.json().catch(() => ({}))
        const firstError = data?.errors?.[0]?.message || data?.message
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
      <p>Use this form for GST AI demo requests, AWS migration planning, or general product inquiries.</p>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Inquiry type
            <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required>
              <option value="general_inquiry">General inquiry</option>
              <option value="gst_ai_demo">GST AI demo request</option>
              <option value="aws_migration">AWS migration</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows="6" value={formData.message} onChange={handleChange} required />
          </label>

          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>

        <div className="contact-status">
          {status === 'sent' && (
            <div className="status-message success">
              {submittedInquiryType === 'gst_ai_demo'
                ? "Thanks. Your GST AI demo request has been sent. Approved requests receive a time-bound access link."
                : "Thanks. Your message has been sent. We'll be in touch within 24 hours."}
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
          <p className="muted">Recommended workflow: collect GST AI demo requests here, approve them manually, then share a signed access link from your AWS backend.</p>
        </div>
      </div>
    </section>
  )
}
