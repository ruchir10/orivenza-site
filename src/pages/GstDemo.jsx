import React from 'react'
import { Link } from 'react-router-dom'

export default function GstDemo() {
  return (
    <section className="page container">
      <h1>GST AI Demo Access</h1>
      <p>
        Public document upload demo is disabled. GST AI demos are now provisioned only after a request is submitted
        through Orivenza and approved by the team.
      </p>

      <div className="demo-answer" aria-live="polite">
        <h2>How access works now</h2>
        <p>Submit your request from the GST AI tour page or the contact page. Approved requests receive a time-bound access link.</p>
        <p className="demo-note">
          Start here: <Link to="/tour">Request GST AI demo access</Link> or <Link to="/contact">contact Orivenza</Link>.
        </p>
      </div>
    </section>
  )
}
