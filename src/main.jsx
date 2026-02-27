import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const loadAppStyles = () => import('./styles.css')
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => {
    setTimeout(loadAppStyles, 0)
  })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
