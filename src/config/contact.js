export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'get.info@orivenza.com'
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`
export const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || 'https://api.orivenza.com/api/contact'
export const DEMO_REQUEST_ENDPOINT =
  import.meta.env.VITE_GST_DEMO_REQUEST_ENDPOINT?.trim() || CONTACT_ENDPOINT
