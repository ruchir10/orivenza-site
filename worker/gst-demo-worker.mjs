const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const MAX_QUESTION_LENGTH = 500
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request, env.ALLOWED_ORIGINS)
      })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, request, env.ALLOWED_ORIGINS)
    }

    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return json({ error: 'Content-Type must be multipart/form-data' }, 400, request, env.ALLOWED_ORIGINS)
    }

    const dayKey = new Date().toISOString().slice(0, 10)

    let formData
    try {
      formData = await request.formData()
    } catch {
      return json({ error: 'Invalid multipart payload' }, 400, request, env.ALLOWED_ORIGINS)
    }

    const files = formData.getAll('file')
    if (files.length !== 1) {
      return json({ error: 'Exactly one file is required' }, 400, request, env.ALLOWED_ORIGINS)
    }

    const file = files[0]
    if (!(file instanceof File)) {
      return json({ error: 'Invalid file' }, 400, request, env.ALLOWED_ORIGINS)
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE_BYTES) {
      return json({ error: 'File size must be between 1 byte and 10MB' }, 400, request, env.ALLOWED_ORIGINS)
    }

    const questionValues = formData.getAll('question').filter(Boolean)
    if (questionValues.length !== 1) {
      return json({ error: 'Exactly one question is required' }, 400, request, env.ALLOWED_ORIGINS)
    }

    const question = String(questionValues[0]).trim()
    if (!question) {
      return json({ error: 'Question cannot be empty' }, 400, request, env.ALLOWED_ORIGINS)
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return json({ error: `Question too long. Maximum ${MAX_QUESTION_LENGTH} characters.` }, 400, request, env.ALLOWED_ORIGINS)
    }

    const email = String(formData.get('email') || '')
      .trim()
      .toLowerCase()
    if (!EMAIL_PATTERN.test(email)) {
      return json({ error: 'A valid email is required before demo access is granted.' }, 400, request, env.ALLOWED_ORIGINS)
    }

    const identity = await sha256(`${email}:${dayKey}:${env.RATE_LIMIT_SALT || 'gst-demo'}`)
    const rateKey = `gst-demo:${identity}`
    const alreadyUsed = await env.DEMO_LIMITS.get(rateKey)
    if (alreadyUsed) {
      return json(
        { error: 'Demo already used for this email today. Try again tomorrow or contact sales.' },
        429,
        request,
        env.ALLOWED_ORIGINS
      )
    }

    if (!env.UPSTREAM_AI_URL || !env.UPSTREAM_AI_KEY) {
      return json({ error: 'Worker not configured' }, 500, request, env.ALLOWED_ORIGINS)
    }

    const forwardData = new FormData()
    forwardData.append('file', file, file.name)
    forwardData.append('question', question)
    forwardData.append('mode', 'gst-demo-one-file')
    forwardData.append('email', email)

    let upstream
    try {
      upstream = await fetch(env.UPSTREAM_AI_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.UPSTREAM_AI_KEY}`
        },
        body: forwardData
      })
    } catch {
      return json({ error: 'Upstream service unavailable' }, 502, request, env.ALLOWED_ORIGINS)
    }

    if (!upstream.ok) {
      const message = await safeError(upstream)
      return json({ error: `Upstream error: ${message}` }, 502, request, env.ALLOWED_ORIGINS)
    }

    const data = await upstream.json().catch(() => ({}))
    const answer = data.answer || data.result || 'No answer returned.'

    await env.DEMO_LIMITS.put(rateKey, '1', { expirationTtl: 60 * 60 * 24 })
    return json({ answer }, 200, request, env.ALLOWED_ORIGINS)
  }
}

async function safeError(response) {
  try {
    const body = await response.json()
    return body?.error || body?.message || `status ${response.status}`
  } catch {
    return `status ${response.status}`
  }
}

function json(payload, status, request, allowedOrigins) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request, allowedOrigins)
    }
  })
}

function corsHeaders(request, allowedOriginsCsv) {
  const allowedOrigins = (allowedOriginsCsv || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)

  const origin = request.headers.get('Origin') || ''
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || '*'

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    Vary: 'Origin'
  }
}

async function sha256(text) {
  const input = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', input)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
