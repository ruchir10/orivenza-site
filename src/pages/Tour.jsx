import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GST_CHAT_UPLOAD_ENDPOINT, GST_CHAT_UPLOAD_FALLBACK_ENDPOINTS } from '../config/demo'

const MAX_FILE_SIZE_MB = 10
const DEMO_LOCK_MESSAGE = 'Thanks for taking demo please contact Orivenza for quotation'
const DEMO_STATE_KEY = 'gst_ai_demo_state_v1'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MENU_ITEMS = ['Dashboard', 'GST AI Chat', 'Notices', 'Reconciliation', 'HSN Assistant']

const MODULES = ['GST Compliance', 'Notice Reply', 'Reconciliation', 'HSN Assistant']

const SUGGESTED_PROMPTS = [
  "Review this month's GSTR-2B vs purchase register mismatch and suggest immediate corrections.",
  'Prepare a response plan for an ASMT-10 notice with potential tax shortfall.',
  'List ITC risk checkpoints before filing next GSTR-3B.'
]

const readDemoState = () => {
  if (typeof window === 'undefined') return { email: '', locked: false }
  try {
    const raw = window.localStorage.getItem(DEMO_STATE_KEY)
    if (!raw) return { email: '', locked: false }
    const parsed = JSON.parse(raw)
    return {
      email: typeof parsed?.email === 'string' ? parsed.email : '',
      locked: Boolean(parsed?.locked)
    }
  } catch {
    return { email: '', locked: false }
  }
}

const persistDemoState = (state) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state))
}

const formatHistoryTime = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(value)

const normalizeToList = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean)
  if (typeof value === 'string' && value.trim()) return [value.trim()]
  return []
}

const parseJsonOrEmpty = async (response) => response.json().catch(() => ({}))

const extractResponsePayload = (apiPayload) => {
  const textAnswer =
    typeof apiPayload?.answer === 'string'
      ? apiPayload.answer
      : typeof apiPayload?.output_text === 'string'
      ? apiPayload.output_text
      : ''

  const summaryCandidate =
    apiPayload?.analysis_summary || apiPayload?.summary || apiPayload?.output?.analysis_summary || textAnswer

  return {
    summary: typeof summaryCandidate === 'string' && summaryCandidate.trim() ? summaryCandidate.trim() : textAnswer,
    sections: normalizeToList(apiPayload?.sections_referenced || apiPayload?.output?.sections_referenced),
    considerations: normalizeToList(
      apiPayload?.compliance_considerations || apiPayload?.output?.compliance_considerations
    ),
    actionItems: normalizeToList(apiPayload?.action_items || apiPayload?.output?.action_items),
    riskLevel:
      apiPayload?.risk_level || apiPayload?.output?.risk_level || (textAnswer ? 'Needs review' : 'Not available'),
    disclaimer:
      apiPayload?.disclaimer ||
      apiPayload?.output?.disclaimer ||
      'AI-generated compliance guidance. Validate against current GST law and your filing records.',
    rawText: textAnswer
  }
}

export default function Tour() {
  const initialDemoState = useMemo(() => readDemoState(), [])
  const [demoEmail, setDemoEmail] = useState(initialDemoState.email)
  const [signupEmail, setSignupEmail] = useState(initialDemoState.email)
  const [signupError, setSignupError] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(Boolean(initialDemoState.email))
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [demoLocked, setDemoLocked] = useState(initialDemoState.locked)
  const [selectedModule, setSelectedModule] = useState(MODULES[0])
  const [file, setFile] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [history, setHistory] = useState([])

  const canAnalyze = isSignedIn && !demoLocked && !!file && prompt.trim().length > 0 && status !== 'submitting'
  const isUploadDisabled = !isSignedIn || demoLocked || status === 'submitting'
  const historyLabel = useMemo(() => (file ? file.name : 'No file selected yet.'), [file])

  const handleSignup = (event) => {
    event.preventDefault()
    const normalizedEmail = signupEmail.trim().toLowerCase()

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setSignupError('Enter a valid email id to start demo access.')
      return
    }

    setSignupError('')
    setDemoEmail(normalizedEmail)
    setIsSignedIn(true)
    persistDemoState({ email: normalizedEmail, locked: demoLocked })
  }

  const handleFileChange = (event) => {
    if (isUploadDisabled) return

    const selected = event.target.files?.[0]
    if (!selected) {
      setFile(null)
      return
    }

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File must be smaller than ${MAX_FILE_SIZE_MB}MB.`)
      setFile(null)
      return
    }

    setError('')
    setFile(selected)
  }

  const handleAnalyze = async (event) => {
    event.preventDefault()

    if (!isSignedIn) {
      setError('Sign up with email id to start the demo.')
      return
    }

    if (demoLocked) {
      setError(DEMO_LOCK_MESSAGE)
      return
    }

    if (!file || !prompt.trim()) {
      setError('Upload one GST file and enter a compliance query before analyzing.')
      return
    }

    setError('')
    setStatus('submitting')

    try {
      const question = prompt.trim()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('question', question)
      formData.append('module', selectedModule)
      formData.append('email', demoEmail)

      const endpointCandidates = [
        GST_CHAT_UPLOAD_ENDPOINT,
        ...GST_CHAT_UPLOAD_FALLBACK_ENDPOINTS.filter((endpoint) => endpoint !== GST_CHAT_UPLOAD_ENDPOINT)
      ]

      let response = null
      let responseBody = {}
      const attemptedEndpoints = []

      for (const endpoint of endpointCandidates) {
        attemptedEndpoints.push(endpoint)
        try {
          response = await fetch(endpoint, {
            method: 'POST',
            body: formData
          })
        } catch (fetchError) {
          if (fetchError instanceof TypeError) {
            continue
          }
          throw fetchError
        }

        responseBody = await parseJsonOrEmpty(response)
        if (!response.ok) {
          throw new Error(responseBody?.error || 'Unable to process your compliance request right now.')
        }

        break
      }

      if (!response) {
        const endpointList = attemptedEndpoints.join(', ')
        const networkMessage =
          endpointList.length > 0
            ? `Unable to reach GST-AI-Compliance service at: ${endpointList}.`
            : 'Unable to reach GST-AI-Compliance service.'
        throw new Error(
          `${networkMessage} Configure VITE_GST_AI_COMPLIANCE_ENDPOINT or VITE_GST_DEMO_ENDPOINT and retry.`
        )
      }

      const parsed = extractResponsePayload(responseBody)
      setAnalysis(parsed)
      setHistory((prev) => [
        {
          id: Date.now(),
          fileName: file.name,
          prompt: question,
          module: selectedModule,
          createdAt: new Date()
        },
        ...prev
      ])
      setPrompt('')
      setStatus('success')
      setDemoLocked(true)
      persistDemoState({ email: demoEmail, locked: true })
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong while processing your query.')
    }
  }

  return (
    <section className={`gst-chat-page${isDarkMode ? ' gst-chat-page-dark' : ''}`} aria-label="GST AI Chat">
      <div className="gst-chat-shell">
        <aside className="gst-chat-sidebar">
          <div className="gst-chat-brand">
            <h1>GST AI</h1>
            <p>Orivenza</p>
          </div>

          <nav aria-label="GST AI modules">
            <ul>
              {MENU_ITEMS.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`gst-chat-menu-btn${item === 'GST AI Chat' ? ' active' : ''}`}
                    aria-current={item === 'GST AI Chat' ? 'page' : undefined}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <Link to="/" className="gst-chat-side-logout">
            Logout
          </Link>
        </aside>

        <div className="gst-chat-content">
          {!isSignedIn ? (
            <section className="gst-chat-card gst-chat-signup-card">
              <h2>Sign Up For Demo</h2>
              <p>Enter your email id to start the GST AI demo with one file upload and one analysis.</p>
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
                  Continue To Demo
                </button>
              </form>
              {signupError && <p className="status-message error">{signupError}</p>}
            </section>
          ) : (
            <>
              <header className="gst-chat-card gst-chat-header">
                <div className="gst-chat-heading">
                  <h2>GST AI Chat</h2>
                  <p>Orivenza Advisory LLP</p>
                  <span className="gst-chat-email-pill">{demoEmail}</span>
                </div>
                <div className="gst-chat-header-actions">
                  <button
                    type="button"
                    className="gst-chat-ghost-btn"
                    onClick={() => setIsDarkMode((value) => !value)}
                  >
                    {isDarkMode ? 'Light mode' : 'Dark mode'}
                  </button>
                  <Link to="/" className="gst-chat-ghost-btn">
                    Logout
                  </Link>
                </div>
              </header>

              <div className="gst-chat-grid">
                <section className="gst-chat-card gst-chat-history">
                  <h3>Query History</h3>
                  <label className={`gst-chat-upload-btn${isUploadDisabled ? ' disabled' : ''}`}>
                    {demoLocked ? DEMO_LOCK_MESSAGE : 'Upload GST files'}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.json,image/*"
                      onChange={handleFileChange}
                      disabled={isUploadDisabled}
                    />
                  </label>
                  <p className="gst-chat-selected-file">{historyLabel}</p>
                  {history.length === 0 ? (
                    <p className="gst-chat-empty-history">No analyses yet.</p>
                  ) : (
                    <ul className="gst-chat-history-list">
                      {history.map((item) => (
                        <li key={item.id}>
                          <strong>{item.module}</strong>
                          <span>{item.prompt}</span>
                          <small>
                            {item.fileName} | {formatHistoryTime(item.createdAt)}
                          </small>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <div className="gst-chat-main-panels">
                  <section className="gst-chat-card gst-chat-module">
                    <p>Enterprise compliance copilot with deterministic checks + section validated output.</p>
                    <label>
                      <span className="sr-only">Compliance module</span>
                      <select value={selectedModule} onChange={(event) => setSelectedModule(event.target.value)}>
                        {MODULES.map((module) => (
                          <option key={module} value={module}>
                            {module}
                          </option>
                        ))}
                      </select>
                    </label>
                  </section>

                  <section className="gst-chat-card gst-chat-output" aria-live="polite">
                    {!analysis ? (
                      <div className="gst-chat-empty-output">
                        <p>Submit a query to view structured compliance output panels.</p>
                      </div>
                    ) : (
                      <div className="gst-chat-output-grid">
                        <article>
                          <h4>Analysis Summary</h4>
                          <p>{analysis.summary || analysis.rawText || 'No summary was returned.'}</p>
                        </article>

                        <article>
                          <h4>Risk Level</h4>
                          <p>{analysis.riskLevel}</p>
                        </article>

                        {analysis.sections.length > 0 && (
                          <article>
                            <h4>Sections Referenced</h4>
                            <ul>
                              {analysis.sections.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </article>
                        )}

                        {analysis.considerations.length > 0 && (
                          <article>
                            <h4>Compliance Considerations</h4>
                            <ul>
                              {analysis.considerations.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </article>
                        )}

                        {analysis.actionItems.length > 0 && (
                          <article>
                            <h4>Action Items</h4>
                            <ul>
                              {analysis.actionItems.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </article>
                        )}

                        {analysis.rawText && (
                          <article>
                            <h4>Model Output</h4>
                            <p>{analysis.rawText}</p>
                          </article>
                        )}

                        <article>
                          <h4>Disclaimer</h4>
                          <p>{analysis.disclaimer}</p>
                        </article>
                      </div>
                    )}
                  </section>

                  <section className="gst-chat-card gst-chat-compose">
                    <h3>Suggested Prompts</h3>
                    <div className="gst-chat-prompt-list">
                      {SUGGESTED_PROMPTS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setPrompt(item)}
                          disabled={demoLocked || status === 'submitting'}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <form className={`gst-chat-query-form${demoLocked ? ' locked' : ''}`} onSubmit={handleAnalyze}>
                      <textarea
                        rows="3"
                        value={prompt}
                        onChange={(event) => setPrompt(event.target.value)}
                        placeholder='Ask compliance query (e.g. "Section 73 response strategy for repeated mismatch")'
                        disabled={status === 'submitting' || demoLocked}
                      />
                      <button type="submit" className="gst-chat-analyze-btn" disabled={!canAnalyze}>
                        {status === 'submitting' ? 'Analyzing...' : demoLocked ? DEMO_LOCK_MESSAGE : 'Analyze'}
                      </button>
                    </form>

                    {error && <p className="status-message error">{error}</p>}
                    {!error && demoLocked && <p className="status-message info">{DEMO_LOCK_MESSAGE}</p>}
                  </section>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
