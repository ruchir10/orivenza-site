import React, { useState } from 'react'

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || ''

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!FORMSPREE_URL) {
      setStatus('no-endpoint')
      return
    }

    const form = new FormData(e.target)
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: form,
        headers: {
          Accept: 'application/json',
        },
      })
      if (res.ok) {
        setStatus('sent')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section className="page contact container">
      <h1>Contact</h1>
      <p>Please reach out at <a href="mailto:info@orivenza.com">info@orivenza.com</a> or use the form below.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="6" required />
        </label>

        <input type="hidden" name="_replyto" />
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send'}
        </button>
      </form>

      <div className="muted" style={{ marginTop: 12 }}>
        {status === 'sent' && <div>Thanks — your message was sent.</div>}
        {status === 'error' && <div>Sorry, there was an error sending your message.</div>}
        {status === 'no-endpoint' && (
          <div>
            Form endpoint not configured. Set <strong>VITE_FORMSPREE_URL</strong> in your environment (see README).
          </div>
        )}
        {status === 'idle' && <div>Note: form uses Formspree when configured.</div>}
      </div>
    </section>
  )
}
