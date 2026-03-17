const REMOTE_DEMO_ENDPOINT = 'https://gst-demo-worker.ruchir031198.workers.dev'

export const GST_AI_COMPLIANCE_ENDPOINT = import.meta.env.VITE_GST_AI_COMPLIANCE_ENDPOINT?.trim() || ''

export const GST_DEMO_ENDPOINT =
  import.meta.env.VITE_GST_DEMO_ENDPOINT?.trim() ||
  (import.meta.env.DEV ? '/api/gst-demo' : REMOTE_DEMO_ENDPOINT)

export const GST_CHAT_UPLOAD_ENDPOINT = GST_AI_COMPLIANCE_ENDPOINT
  ? import.meta.env.DEV
    ? '/api/gst-compliance'
    : GST_AI_COMPLIANCE_ENDPOINT
  : GST_DEMO_ENDPOINT

const fallbackCandidates = [
  GST_DEMO_ENDPOINT,
  import.meta.env.DEV ? REMOTE_DEMO_ENDPOINT : '',
  import.meta.env.DEV ? '/api/gst-demo' : ''
]

export const GST_CHAT_UPLOAD_FALLBACK_ENDPOINTS = [...new Set(fallbackCandidates.filter(Boolean))]
