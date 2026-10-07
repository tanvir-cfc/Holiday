# Vercel Expert Agent Configuration

This repository is configured with **Vercel Agent Rules & Deployment Best Practices** so AI coding agents operate as Vercel experts when building, optimizing, and deploying this project.

## 1. Quick Install: Official Vercel Agent Skills & Plugin
To equip any compatible AI coding agent (Cursor, Claude Code, Windsurf, GitHub Copilot, Codex) with live Vercel knowledge:

```bash
# Install official Vercel Agent Skills
npx skills add vercel-labs/agent-skills

# Or initialize Vercel project configuration locally
npx vercel link
```

## 2. Project Architecture & Vercel Deployment Spec
- **Framework**: Vite + React 19 + TypeScript + Tailwind CSS v4
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routing**: SPA client-side fallback configured in `vercel.json` (`/(.*) -> /index.html`)
- **Static Asset Caching**: Immutable 1-year edge cache (`max-age=31536000, immutable`) on `/assets/*`

## 3. Vercel Best Practices Enforced
1. **Zero-Config Edge Caching**: Static bundles emitted by Vite into `dist/assets` are fingerprinted and cached globally on the Vercel Edge Network.
2. **Environment Variables**:
   - Browser-exposed variables must use the `VITE_` prefix.
   - Server/Edge secrets (`GEMINI_API_KEY`, etc.) must stay in Vercel Project Settings (`vercel env add`) and only be accessed inside `/api/*` Vercel Functions.
3. **Core Web Vitals**:
   - Inline SVG iconography and zero external blocking image requests for instant Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS).
