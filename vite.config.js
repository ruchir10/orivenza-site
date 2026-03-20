import { defineConfig, loadEnv } from 'vite'

// Vite base can be set via the VITE_BASE environment variable.
// Example: VITE_BASE='/my-repo/' for GitHub Pages project pages.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const remoteDemoEndpoint =
    env.VITE_GST_DEMO_ENDPOINT ||
    process.env.VITE_GST_DEMO_ENDPOINT ||
    'https://gst-ai-orivenza-api.ruchir031198.workers.dev'
  const proxyUrl = new URL(remoteDemoEndpoint)
  const gstComplianceEndpoint = env.VITE_GST_AI_COMPLIANCE_ENDPOINT || process.env.VITE_GST_AI_COMPLIANCE_ENDPOINT || ''
  const proxyConfig = {
    '/api/gst-demo': {
      target: proxyUrl.origin,
      changeOrigin: true,
      secure: true,
      rewrite: () => `${proxyUrl.pathname}${proxyUrl.search}` || '/'
    }
  }

  if (gstComplianceEndpoint) {
    const complianceProxyUrl = new URL(gstComplianceEndpoint)
    proxyConfig['/api/gst-compliance'] = {
      target: complianceProxyUrl.origin,
      changeOrigin: true,
      secure: true,
      rewrite: () => `${complianceProxyUrl.pathname}${complianceProxyUrl.search}` || '/'
    }
  }

  return {
    root: '.',
    base: env.VITE_BASE || process.env.VITE_BASE || '/',
    server: {
      proxy: proxyConfig
    }
  }
})
