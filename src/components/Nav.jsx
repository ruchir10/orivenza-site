import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img src="/Orivenza.png" alt="Orivenza logo" className="logo-mark" />
          <span className="brand-name">Orivenza</span>
        </Link>
        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="/about">Solutions</Link>
          <Link to="/products">Industries</Link>
          <Link to="/blog">Research</Link>
          <Link to="/about">About</Link>
          <Link to="/contact" className="cta">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
