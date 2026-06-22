const REMOTE_APP_URL = 'https://gst.orivenza.com/st-ai-compliance'
const DEFAULT_API_ORIGIN = 'https://api.orivenza.com'

export const GST_AI_COMPLIANCE_ENDPOINT =
  import.meta.env.VITE_GST_AI_COMPLIANCE_ENDPOINT?.trim() || `${DEFAULT_API_ORIGIN}`
export const GST_REMOTE_APP_URL = import.meta.env.VITE_GST_APP_URL?.trim() || REMOTE_APP_URL
export const GST_DEMO_ENDPOINT = import.meta.env.VITE_GST_DEMO_ENDPOINT?.trim() || ''

export const GST_CHAT_UPLOAD_ENDPOINT = GST_AI_COMPLIANCE_ENDPOINT || GST_DEMO_ENDPOINT

const fallbackCandidates = [
  GST_CHAT_UPLOAD_ENDPOINT,
  import.meta.env.DEV ? '/api/gst-compliance' : '',
  import.meta.env.DEV && GST_DEMO_ENDPOINT ? '/api/gst-demo' : ''
]

export const GST_CHAT_UPLOAD_FALLBACK_ENDPOINTS = [...new Set(fallbackCandidates.filter(Boolean))]
