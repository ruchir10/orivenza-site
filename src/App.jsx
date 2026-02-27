import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Solutions from './pages/Solutions'
import Products from './pages/Products'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

const ROUTE_SEO = {
  '/': {
    title: 'Orivenza Official Site | AI Infrastructure for Critical Systems',
    description:
      'Official website of Orivenza (orivenza.com). Secure AI infrastructure for migration systems, healthcare networks, and financial compliance platforms.'
  },
  '/solutions': {
    title: 'AI Solutions | Orivenza',
    description:
      'Explore Orivenza AI solutions for migration systems, healthcare infrastructure, tax and compliance, and enterprise deployment.'
  },
  '/products': {
    title: 'Products and Industry Platforms | Orivenza',
    description:
      'Discover Orivenza products and cloud-native platforms designed for enterprise scale, security, and regulatory readiness.'
  },
  '/blog': {
    title: 'Research and Insights | Orivenza Blog',
    description:
      'Read Orivenza engineering research and practical guidance on AI infrastructure, cloud reliability, and security architecture.'
  },
  '/about': {
    title: 'About Orivenza',
    description:
      'Learn about Orivenza, our mission, values, and team building secure AI-first infrastructure for critical systems.'
  },
  '/contact': {
    title: 'Contact Orivenza',
    description:
      'Contact Orivenza to discuss AI modernization, secure architecture planning, and mission-critical infrastructure deployment.'
  }
}

function upsertMeta(selector, attrName, attrValue, content) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attrName, attrValue)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(url) {
  let canonical = document.head.querySelector("link[rel='canonical']")
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const siteUrl = 'https://www.orivenza.com'
    const path = location.pathname || '/'
    const pageSeo = ROUTE_SEO[path] || ROUTE_SEO['/']
    const canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`

    document.title = pageSeo.title
    upsertMeta("meta[name='description']", 'name', 'description', pageSeo.description)
    upsertMeta("meta[property='og:title']", 'property', 'og:title', pageSeo.title)
    upsertMeta("meta[property='og:description']", 'property', 'og:description', pageSeo.description)
    upsertMeta("meta[property='og:url']", 'property', 'og:url', canonicalUrl)
    upsertMeta("meta[name='twitter:title']", 'name', 'twitter:title', pageSeo.title)
    upsertMeta("meta[name='twitter:description']", 'name', 'twitter:description', pageSeo.description)
    upsertCanonical(canonicalUrl)
  }, [location.pathname])

  return (
    <div className="app">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
