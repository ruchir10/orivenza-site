import React from 'react'
import { Link } from 'react-router-dom'
import logoMark from '../assets/orivenza-mark.svg'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img src={logoMark} alt="Orivenza logo" className="logo-mark" width="40" height="40" />
          <span className="brand-name">Orivenza</span>
        </Link>
        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/products">Industries</Link>
          <Link to="/blog">Research</Link>
          <Link to="/about">About</Link>
          <Link to="/contact" className="cta">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
