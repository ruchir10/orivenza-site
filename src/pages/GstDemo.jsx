import React, { useState } from 'react'

const MAX_FILE_SIZE_MB = 10
const DEMO_ENDPOINT = import.meta.env.VITE_GST_DEMO_ENDPOINT

export default function GstDemo() {
  const [file, setFile] = useState(null)
  const [question, setQuestion] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | answered | error
  const [error, setError] = useState('')
  const [answer, setAnswer] = useState('')

  const handleFileChange = (event) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (status === 'answered') return

    if (!file || !question.trim()) {
      setError('Please upload one document and enter your question.')
      return
    }

    setStatus('sending')
    setError('')
    setAnswer('')

    if (!DEMO_ENDPOINT) {
      setStatus('error')
      setError('Demo endpoint is not configured. Please contact support.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('question', question.trim())

      const response = await fetch(DEMO_ENDPOINT, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        const message = data?.error || 'Unable to process your request right now.'
        throw new Error(message)
      }

      const data = await response.json()
      setAnswer(data.answer || 'Response received, but no answer field was returned.')
      setStatus('answered')
    } catch (err) {
      console.error('GST demo error', err)
      setError(err.message || 'Something went wrong. Please try again later.')
      setStatus('error')
    }
  }

  const hasUsedDemo = status === 'answered'

  return (
    <section className="page container">
      <h1>GST-AI-Compliance Demo Tour</h1>
      <p>
        This is a controlled demo of GST-AI-Compliance (private product). Upload exactly one GST or
        compliance document and ask one question.
      </p>
      <p className="muted">Demo rule: one file + one question + one response per session.</p>

      <form className="demo-form" onSubmit={handleSubmit}>
        <fieldset disabled={status === 'sending' || hasUsedDemo}>
          <label>
            Document (one file, max {MAX_FILE_SIZE_MB}MB)
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.json,image/*"
              onChange={handleFileChange}
            />
          </label>

          <label>
            Your question (one query only)
            <textarea
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Summarize key GST liabilities in this document."
            />
          </label>

          <button type="submit" className="btn" disabled={status === 'sending' || hasUsedDemo}>
            {status === 'sending' ? 'Processing...' : hasUsedDemo ? 'Tour Completed' : 'Run Demo'}
          </button>
        </fieldset>
      </form>

      {error && (
        <div className="status-message error" aria-live="polite">
          {error}
        </div>
      )}

      {answer && (
        <div className="demo-answer" aria-live="polite">
          <h2>AI Answer</h2>
          <p>{answer}</p>
          <p className="demo-note">
            This demo is limited to one document and one question per session. For production use cases and
            enterprise workflows, <a href="/contact">contact us</a>.
          </p>
        </div>
      )}
    </section>
  )
}
