# GST Demo Worker (Cloudflare)

This Worker enforces the GST-AI-Compliance demo guardrails on the backend:
- exactly one uploaded file
- exactly one question
- max file size 10MB
- one successful demo per IP/day

## 1) Create KV namespace

```bash
wrangler kv namespace create DEMO_LIMITS
wrangler kv namespace create DEMO_LIMITS --preview
```

Copy IDs into `wrangler.toml` (use `wrangler.toml.example` as template).

## 2) Configure Worker

```bash
cd worker
copy wrangler.toml.example wrangler.toml
```

Set secrets:

```bash
wrangler secret put RATE_LIMIT_SALT
wrangler secret put UPSTREAM_AI_KEY
```

Set these variables in `wrangler.toml`:
- `ALLOWED_ORIGINS` (your frontend domains)
- `UPSTREAM_AI_URL` (your private GST inference endpoint URL)

## 3) Deploy Worker

```bash
wrangler deploy
```

You will get a URL like:
`https://gst-demo-worker.<account>.workers.dev`

## 4) Connect frontend

Set this in your Pages project or `.env` for local app:

```text
VITE_GST_DEMO_ENDPOINT=https://gst-demo-worker.<account>.workers.dev
```

## Security notes

- Never expose `UPSTREAM_AI_KEY` in frontend.
- Keep prompts/business logic in backend only.
- This Worker is the enforcement point; UI limits are only convenience.
