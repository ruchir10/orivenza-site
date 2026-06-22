import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEMO_REQUEST_ENDPOINT } from '../config/contact'
import { GST_REMOTE_APP_URL } from '../config/demo'

const buildAppUrl = (search) => {
  const url = new URL(GST_REMOTE_APP_URL)
  const params = new URLSearchParams(search)

  params.set('embed', '1')
  params.set('source', 'orivenza-site')
  params.set('demo', '1')

  for (const [key, value] of params.entries()) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export default function Tour() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const search = typeof window === 'undefined' ? '' : window.location.search
  const params = useMemo(() => new URLSearchParams(search), [search])
  const hasApprovedAccess = Boolean(params.get('access_token')?.trim())
  const appUrl = useMemo(() => buildAppUrl(search), [search])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const company = formData.company.trim()
    const message = formData.message.trim()

    if (!name || !email || !company) {
      setStatus('error')
      setErrorMessage('Name, work email, and company are required before requesting access.')
      return
    }

    try {
      const response = await fetch(DEMO_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company,
          requestType: 'gst_ai_demo',
          source: 'orivenza-site-tour',
          message:
            message ||
            `GST AI demo access requested by ${name} from ${company}. Please review and share an approved access link if qualified.`,
          _replyto: email,
          _subject: `GST AI demo request from ${company}`
        })
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.errors?.[0]?.message || data?.message || 'Unable to submit the access request.')
      }

      setStatus('sent')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      console.error('GST AI access request failed', error)
      setStatus('error')
      setErrorMessage(error.message || 'Unable to submit the access request right now.')
    }
  }

  return (
    <section className="gst-chat-page" aria-label="GST AI Chat">
      <div className="gst-chat-shell">
        <aside className="gst-chat-sidebar">
          <div className="gst-chat-brand">
            <h1>GST AI</h1>
            <p>Orivenza</p>
          </div>

          <nav aria-label="GST AI sections">
            <ul>
              <li>
                <button type="button" className="gst-chat-menu-btn active" aria-current="page">
                  Demo Access
                </button>
              </li>
            </ul>
          </nav>

          <Link to="/" className="gst-chat-side-logout">
            Back To Site
          </Link>
        </aside>

        <div className="gst-chat-content">
          {hasApprovedAccess ? (
            <>
              <header className="gst-chat-card gst-chat-header">
                <div className="gst-chat-heading">
                  <h2>GST AI Approved Demo</h2>
                  <p>This session was opened from an approved Orivenza access link.</p>
                </div>
                <div className="gst-chat-header-actions">
                  <a className="gst-chat-ghost-btn" href={appUrl} target="_blank" rel="noreferrer">
                    Open In New Tab
                  </a>
                </div>
              </header>

              <section className="gst-chat-card gst-embed-shell">
                <div className="gst-embed-toolbar">
                  <p>Approved demo access is active for this browser session.</p>
                </div>
                <iframe
                  title="GST Orivenza"
                  src={appUrl}
                  className="gst-embed-frame"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </section>
            </>
          ) : (
            <section className="gst-chat-card gst-chat-signup-card">
              <h2>Request GST AI Demo Access</h2>
              <p>
                Public demo execution is disabled. Submit a request here, and Orivenza will review it before sharing an
                approved access link.
              </p>

              <form className="gst-chat-signup-form" onSubmit={handleSubmit}>
                <label htmlFor="gst-demo-name">Full name</label>
                <input id="gst-demo-name" name="name" type="text" value={formData.name} onChange={handleChange} required />

                <label htmlFor="gst-demo-email">Work email</label>
                <input
                  id="gst-demo-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />

                <label htmlFor="gst-demo-company">Company</label>
                <input
                  id="gst-demo-company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company or firm name"
                  required
                />

                <label htmlFor="gst-demo-message">Use case</label>
                <textarea
                  id="gst-demo-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the GST workflow or problem you want to review in the demo."
                />

                <button type="submit" className="gst-chat-signup-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting...' : 'Request Demo Access'}
                </button>
              </form>

              {status === 'sent' && (
                <p className="status-message success">
                  Request submitted. Orivenza will review it and share an approved access link if your demo is accepted.
                </p>
              )}
              {status === 'error' && <p className="status-message error">{errorMessage}</p>}
            </section>
          )}
        </div>
      </div>
    </section>
  )
}
