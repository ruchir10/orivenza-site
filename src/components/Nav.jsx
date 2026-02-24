import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img src="/logo.svg" alt="Orivenza logo" className="logo" />
          <span className="brand-name">Orivenza</span>
        </Link>
        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact" className="cta">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
