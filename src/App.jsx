import React, { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Products = lazy(() => import('./pages/Products'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))

const ROUTE_SEO = {
  '/': {
    title: 'Orivenza | AI Infrastructure for Compliance & Critical Systems',
    description:
      'Orivenza builds AI-powered infrastructure for migration systems, healthcare networks, and tax and compliance platforms. Secure, scalable, deployment-ready architecture.'
  },
  '/solutions': {
    title: 'AI Solutions | Orivenza',
    description:
      'Explore Orivenza AI solutions for migration systems, healthcare infrastructure, tax and compliance, and enterprise deployment.'
  },
  '/solutions/tax-compliance': {
    title: 'Tax and Compliance AI Infrastructure | Orivenza',
    description:
      'Enterprise-grade AI systems for GST automation, regulatory workflows, audit traceability, and financial compliance at scale.'
  },
  '/solutions/migration': {
    title: 'Migration AI Infrastructure | Orivenza',
    description:
      'AI infrastructure for identity workflows, migration case systems, and national-scale secure public-service modernization.'
  },
  '/solutions/healthcare': {
    title: 'Healthcare AI Infrastructure | Orivenza',
    description:
      'Security-first healthcare AI infrastructure for operational intelligence, interoperability, and reliable patient-service delivery.'
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
    upsertMeta(
      "meta[name='keywords']",
      'name',
      'keywords',
      'AI infrastructure India, GST compliance systems, AI for tax automation, compliance technology, enterprise AI architecture'
    )
    upsertMeta("meta[name='author']", 'name', 'author', 'Orivenza')
    upsertMeta("meta[property='og:title']", 'property', 'og:title', pageSeo.title)
    upsertMeta("meta[property='og:description']", 'property', 'og:description', pageSeo.description)
    upsertMeta("meta[property='og:url']", 'property', 'og:url', canonicalUrl)
    upsertMeta("meta[name='twitter:title']", 'name', 'twitter:title', pageSeo.title)
    upsertMeta("meta[name='twitter:description']", 'name', 'twitter:description', pageSeo.description)
    upsertCanonical(canonicalUrl)
  }, [location.pathname])

  return (
    <div className="app">
      <ScrollProgress />
      <Nav />
      <main>
        <Suspense fallback={<div className="route-loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/tax-compliance" element={<Solutions />} />
            <Route path="/solutions/migration" element={<Solutions />} />
            <Route path="/solutions/healthcare" element={<Solutions />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
