# Deploying NexArch to Vercel (Demo Guide)

Your NexArch Next.js application is fully prepared and optimized for Vercel deployment!

## Quick Deploy Steps

### Method 1: Deploy via Vercel GitHub Integration (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```
2. **Log into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. **Import Project**:
   - Click **Add New...** -> **Project**.
   - Select your repository (`NexarchV2` / `nexarch`).
   - Framework Preset will automatically detect **Next.js**.
   - Root Directory: Set to `./` or `implementation/nexarch` depending on your repository structure.
4. **Environment Variables**:
   Add the following environment variables in the Vercel project configuration settings:

   | Variable Name | Description / Value |
   |---|---|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `NEXTAUTH_SECRET` | A secret string for session signing (or generate via `openssl rand -base64 32`) |
   | `NEXTAUTH_URL` | Your Vercel domain (e.g. `https://nexarch.vercel.app`) |
   | `RESEND_API_KEY` | *(Optional for email)* Your Resend API key |
   | `ADMIN_NOTIFICATION_EMAIL` | *(Optional for email)* `minageorge909@gmail.com` |

5. **Deploy**:
   - Click **Deploy**. Vercel will build and host your demo site in under 2 minutes!

---

### Method 2: Deploy directly via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
2. **Run Deploy Command**:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy to production:
   ```bash
   vercel --prod
   ```

## Production & Vercel Optimizations Included

- **Resilient Environment Evaluators**: Dynamic runtime resolution for `MONGODB_URI` and `NEXTAUTH_SECRET` ensures zero build-time evaluation crashes on Vercel.
- **Image Optimization**: Fully configured `remotePatterns` in `next.config.mjs` for Cloudinary and Google user avatars.
- **Serverless API Routes**: Route Handlers under `/app/api` compile cleanly into Vercel Edge/Serverless functions.
