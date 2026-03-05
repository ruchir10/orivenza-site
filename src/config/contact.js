export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'get.info@orivenza.com'

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

export const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
  'https://orivenza-mail.ruchir031198.workers.dev'
