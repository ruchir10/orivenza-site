import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GST_REMOTE_APP_URL } from '../config/demo'

const DEMO_STATE_KEY = 'gst_ai_demo_state_v2'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const readDemoState = () => {
  if (typeof window === 'undefined') return { email: '' }

  try {
    const raw = window.localStorage.getItem(DEMO_STATE_KEY)
    if (!raw) return { email: '' }

    const parsed = JSON.parse(raw)
    return {
      email: typeof parsed?.email === 'string' ? parsed.email : ''
    }
  } catch {
    return { email: '' }
  }
}

const persistDemoState = (state) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state))
}

const clearDemoState = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(DEMO_STATE_KEY)
}

const buildAppUrl = (email) => {
  const url = new URL(GST_REMOTE_APP_URL)
  url.searchParams.set('embed', '1')
  url.searchParams.set('source', 'orivenza-site')

  if (email) {
    url.searchParams.set('demo_email', email)
  }

  return url.toString()
}

export default function Tour() {
  const initialDemoState = useMemo(() => readDemoState(), [])
  const [signupEmail, setSignupEmail] = useState(initialDemoState.email)
  const [demoEmail, setDemoEmail] = useState(initialDemoState.email)
  const [signupError, setSignupError] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(Boolean(initialDemoState.email))
  const appUrl = useMemo(() => buildAppUrl(demoEmail), [demoEmail])

  const handleSignup = (event) => {
    event.preventDefault()
    const normalizedEmail = signupEmail.trim().toLowerCase()

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setSignupError('Enter a valid email id to start GST AI access.')
      return
    }

    setSignupError('')
    setDemoEmail(normalizedEmail)
    setIsSignedIn(true)
    persistDemoState({ email: normalizedEmail })
  }

  const handleLogout = () => {
    clearDemoState()
    setDemoEmail('')
    setSignupEmail('')
    setSignupError('')
    setIsSignedIn(false)
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
                  GST AI Workspace
                </button>
              </li>
            </ul>
          </nav>

          {isSignedIn ? (
            <button type="button" className="gst-chat-side-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/" className="gst-chat-side-logout">
              Back To Site
            </Link>
          )}
        </aside>

        <div className="gst-chat-content">
          {!isSignedIn ? (
            <section className="gst-chat-card gst-chat-signup-card">
              <h2>Login To GST AI</h2>
              <p>Use one email id per user. Backend access is limited to one successful demo submission per email and one file per request.</p>
              <form className="gst-chat-signup-form" onSubmit={handleSignup}>
                <label htmlFor="gst-demo-email">Email id</label>
                <input
                  id="gst-demo-email"
                  type="email"
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                  placeholder="name@company.com"
                  required
                />
                <button type="submit" className="gst-chat-signup-btn">
                  Open GST Workspace
                </button>
              </form>
              {signupError && <p className="status-message error">{signupError}</p>}
            </section>
          ) : (
            <>
              <header className="gst-chat-card gst-chat-header">
                <div className="gst-chat-heading">
                  <h2>GST AI Workspace</h2>
                  <p>Remote GST UI is mapped here from the dedicated worker deployment.</p>
                  <span className="gst-chat-email-pill">{demoEmail}</span>
                </div>
                <div className="gst-chat-header-actions">
                  <a className="gst-chat-ghost-btn" href={appUrl} target="_blank" rel="noreferrer">
                    Open In New Tab
                  </a>
                  <button type="button" className="gst-chat-ghost-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </header>

              <section className="gst-chat-card gst-embed-shell">
                <div className="gst-embed-toolbar">
                  <p>Signed in as {demoEmail}. The embedded GST app should use this identity when calling the API.</p>
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
          )}
        </div>
      </div>
    </section>
  )
}
