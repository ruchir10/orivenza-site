# Orivenza Website (Vite + React)

This is the official website for **Orivenza** — a modern corporate single-page React app built with Vite, featuring Home, About, Products, Blog, and Contact pages.

## Features

- ⚡ Fast: built with Vite for instant HMR and optimized builds
- 🛣️ Routing: React Router for seamless page navigation
- 📱 Responsive: mobile-first design
- 🎨 Modern styling: gradient UI with professional typography
- 📧 Contact form: integrated with Cloudflare Worker + Resend relay
- 🚀 Deployment-ready: GitHub Actions CI/CD to GitHub Pages
- 🌐 Custom domain: supports www.orivenza.com via GitHub Pages CNAME

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deploy to GitHub Pages

1. **Create a GitHub repository** and initialize git:

```bash
cd /workspace/orivenza-site
git init
git add .
git commit -m "Initial commit: Orivenza website"
git branch -M main
git remote add origin https://github.com/<your-username>/orivenza-site.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `/ (root)`
   - Save

3. **GitHub Actions will automatically build and deploy** whenever you push to `main`.

## Custom Domain (www.orivenza.com)

This repo includes a `public/CNAME` file pointing to `www.orivenza.com`. To use your custom domain:

1. **Update your domain's DNS records** to point to GitHub Pages:
   - Add an `A` record pointing to `185.199.108.153` (or GitHub's current IPs)
   - Or add a `CNAME` record pointing to `<your-username>.github.io`

2. **GitHub Pages will automatically serve your site** at `www.orivenza.com` (once DNS propagates).

If you don't use a custom domain, remove `public/CNAME` and your site will be served at `https://<username>.github.io/orivenza-site/`.

## Configuration

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```text
# Contact API endpoint (Cloudflare Worker or any relay endpoint)
VITE_CONTACT_ENDPOINT=https://orivenza-mail.<your-subdomain>.workers.dev

# Contact mailbox used in UI fallback links
VITE_CONTACT_EMAIL=get.info@orivenza.com

# Base path (for subpath hosting; only needed if not using a custom domain)
# VITE_BASE=/orivenza-site/
```

### Logo

The app uses `public/logo.svg` (a default SVG placeholder). To replace it with your own:
- Replace `public/logo.svg` with your logo (or rename your PNG to `logo.svg`)
- Or update `src/components/Nav.jsx` and `src/pages/Home.jsx` to reference `logo.png` if you prefer.

### Contact Form

The contact form (`src/pages/Contact.jsx`) submits to a configurable endpoint (Cloudflare Worker + Resend recommended). To enable submissions:

1. Deploy your contact relay endpoint (for example, a Cloudflare Worker using Resend API)
2. Copy the endpoint URL
3. Set `VITE_CONTACT_ENDPOINT` in your `.env` file
4. Optionally set `VITE_CONTACT_EMAIL` (defaults to `get.info@orivenza.com`)
5. Rebuild and deploy

## Project Structure

```
orivenza-site/
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Router setup
│   ├── styles.css           # Global styles
│   ├── components/
│   │   ├── Nav.jsx          # Header with navigation
│   │   └── Footer.jsx       # Footer
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Products.jsx
│       ├── Blog.jsx
│       └── Contact.jsx
├── public/
│   ├── logo.svg             # Orivenza logo
│   └── CNAME                # Custom domain (GitHub Pages)
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
└── package.json
```

## Deployment

The `.github/workflows/deploy.yml` workflow automatically builds and deploys to GitHub Pages on every push to `main`. No additional config needed — just push!

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run deploy` — Deploy to GitHub Pages (runs in CI/CD)

## License

© 2026 Orivenza

GitHub Pages CI/CD

This repo includes a GitHub Actions workflow that builds the site and deploys the `dist` folder to GitHub Pages whenever you push to the `main` branch: `.github/workflows/deploy.yml`.

Setup steps:
- Create a GitHub repository and push this project to the `main` branch.
- (Optional) If you plan to host at `https://<org|user>.github.io/<repo>/`, set `base` in `vite.config.js` to `'/<repo>/'`.
- The workflow uses the default `GITHUB_TOKEN` so no additional secrets are required.

Vite base path

The Vite `base` is now configurable via the `VITE_BASE` environment variable. For example, if your repo is `orivenza-site` and you serve it at `https://<user>.github.io/orivenza-site/`, set `VITE_BASE` to `/orivenza-site/`.

You can set this locally by creating a `.env` file at the project root with:

```text
VITE_BASE=/orivenza-site/
```

CI note: if you host on GitHub Pages under a project subpath, set `VITE_BASE` before the `npm run build` step (or edit `vite.config.js` directly).

Form submissions (Cloudflare Worker + Resend)

This project supports endpoint-based contact form handling. Set your relay URL in `.env` as `VITE_CONTACT_ENDPOINT=https://orivenza-mail.<your-subdomain>.workers.dev`.

Example `.env` values are shown in `.env.example`.

Git commands to create repo and push

Run these commands locally to initialize a GitHub repo, create `main` branch, and push the project (replace `<your-repo>` and `<your-github-username>`):

```bash
cd /workspace/orivenza-site
git init
git add .
git commit -m "Initial commit: Orivenza site"
git branch -M main
git remote add origin https://github.com/<your-github-username>/<your-repo>.git
git push -u origin main
```

After pushing, GitHub Actions on `main` will build and deploy to GitHub Pages.

