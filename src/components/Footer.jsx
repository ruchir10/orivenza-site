import React from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../config/contact'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>(c) {new Date().getFullYear()} Orivenza</div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}
