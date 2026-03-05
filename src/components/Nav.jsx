import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/products' },
  { label: 'Research', to: '/blog' },
  { label: 'About', to: '/about' }
]

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img src="/Orivenza.png" alt="Orivenza logo" className="logo-mark" width="40" height="40" />
          <span className="brand-name">Orivenza</span>
        </Link>

        <button
          className={`menu-toggle ${isMenuOpen ? 'menu-toggle-open' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`links ${isMenuOpen ? 'links-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="cta" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
