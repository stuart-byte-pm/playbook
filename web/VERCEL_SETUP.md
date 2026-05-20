# Vercel setup

Run the following from the `web/` directory:

1. `npx vercel link` — link to your Vercel account and project
2. Set environment variables in the Vercel dashboard (Production, Preview, and Development):
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - SANITY_API_TOKEN
   - SANITY_WEBHOOK_SECRET
   - NEXT_PUBLIC_GA_MEASUREMENT_ID — Google Analytics 4 Measurement ID (format `G-XXXXXXXXXX`). Without this, no analytics scripts load and the consent banner still functions correctly.
3. `npx vercel --prod` to deploy

Confirm `.env.local` is in `.gitignore` before pushing.
