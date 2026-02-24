import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>(c) {new Date().getFullYear()} Orivenza</div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="mailto:info@orivenza.com">info@orivenza.com</a>
        </div>
      </div>
    </footer>
  )
}
