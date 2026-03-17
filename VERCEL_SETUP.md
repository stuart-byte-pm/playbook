# Vercel setup

Run the following from the `web/` directory:

1. `npx vercel link` — link to your Vercel account and project
2. Set environment variables in the Vercel dashboard:
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - SANITY_API_TOKEN
   - SANITY_WEBHOOK_SECRET
3. `npx vercel --prod` to deploy

Confirm `.env.local` is in `.gitignore` before pushing.
