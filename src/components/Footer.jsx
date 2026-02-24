import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} Orivenza</div>
        <div className="footer-links">Designed with care</div>
      </div>
    </footer>
  )
}
