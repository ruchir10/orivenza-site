import { defineConfig } from 'vite'

// Vite base can be set via the VITE_BASE environment variable.
// Example: VITE_BASE='/my-repo/' for GitHub Pages project pages.
export default defineConfig(({ mode }) => ({
  root: '.',
  base: process.env.VITE_BASE || '/',
}))
