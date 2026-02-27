import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img src="/Orivenza.png" alt="Orivenza logo" className="logo-mark" width="40" height="40" />
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
