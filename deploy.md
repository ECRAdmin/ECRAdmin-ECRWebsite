# Deployment Documentation - Eagle Car Rental

This document outlines the deployment process, configuration, and infrastructure for the Eagle Car Rental application.

## Cloud Platform
- **Platform**: Vercel (Next.js specialized hosting)
- **Project ID**: `prj_wvqaoTDeORUmnGBujwi3jUezOMEW`
- **Organization ID**: `team_dpQQSd8f9Gw2eMiwtL1ivRbM`

## Environment Variables
The following environment variables must be configured in the Vercel dashboard:

### Sanity CMS
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: `kqxpq85e`
- `NEXT_PUBLIC_SANITY_DATASET`: `production`
- `NEXT_PUBLIC_SANITY_API_VERSION`: `2026-04-23`
- `SANITY_API_TOKEN`: Required for write operations (rate limiting fallback)

### Upstash Redis (Rate Limiting)
- `UPSTASH_REDIS_REST_URL`: REST URL from Upstash console
- `UPSTASH_REDIS_REST_TOKEN`: REST Token from Upstash console

### Authentication (NextAuth)
- `AUTH_SECRET`: Random string for JWT encryption
- `AUTH_GITHUB_ID`: GitHub OAuth client ID
- `AUTH_GITHUB_SECRET`: GitHub OAuth client secret
- `AUTH_GOOGLE_ID`: Google OAuth client ID
- `AUTH_GOOGLE_SECRET`: Google OAuth client secret

### General
- `NEXT_PUBLIC_SITE_URL`: `https://www.eaglecarrental.ae`
- `LEAD_WEBHOOK_URL`: Optional webhook for lead notifications

## Infrastructure Requirements
- **Node.js**: 20.x or 22.x
- **Database**: Upstash Redis (for rate limiting)
- **CMS**: Sanity.io
- **Auth**: GitHub/Google OAuth Providers

## Build Commands
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next`

## Deployment Scripts
Deployment is managed via Vercel Git integration or manual CLI deployment:
- `npx vercel deploy --prod` (Manual)

## Security Settings
- **HTTPS**: Automatically managed by Vercel
- **Rate Limiting**: Implemented via Upstash Redis and Sanity fallback
- **Authentication**: JWT-based session management via NextAuth.js
- **Environment Variables**: Encrypted and stored in Vercel

---

## Deployment Steps
1. **Local Preparation**:
   - Fixed type errors in `src/lib/site-data.ts` to ensure build compatibility.
   - Resolved `next-auth` dependency conflict for Next.js 16 using `package.json` overrides.
   - Implemented `src/proxy.ts` (Next.js 16 Proxy) for robust root redirection and i18n.
   - Consolidated root layout into `src/app/[locale]/layout.tsx` for consistent locale handling.
   - Verified the project is linked to Vercel via `.vercel/project.json`.
2. **Environment Configuration**:
   - Ensure all secrets (Sanity tokens, Upstash credentials, NextAuth secrets) are added to Vercel's Environment Variables.
3. **Execution**:
   - Run `npx vercel deploy --prod` to initiate the production build and deployment.
   - Vercel automatically runs `npm run build` and serves the `.next` output.
4. **Post-Deployment**:
   - Verify the production URL is reachable and the content is correct.
   - Update documentation with the final hash and timestamp.

## Deployment Details
- **Status**: Completed (Manual CLI Deploy)
- **Timestamp**: 2026-04-23 21:58:00 (GST)
- **Final URL**: [https://2026-04-23-files-mentioned-by-the-user-r3ggjkqop.vercel.app](https://2026-04-23-files-mentioned-by-the-user-r3ggjkqop.vercel.app)
- **Aliased URL**: [https://2026-04-23-files-mentioned-by-the-u.vercel.app](https://2026-04-23-files-mentioned-by-the-u.vercel.app)
- **Post-Deployment Verification**: 
    - [x] Local prebuild successful (`npx vercel build --prod`)
    - [x] Vercel project settings synchronized (`npx vercel pull`)
    - [x] Manual production deploy successful (`npx vercel deploy --prebuilt --prod`)
    - [x] Site URL accessible and serving correct content
