# Remove password gate

The site is currently protected by a temporary password page. Follow these steps to remove it once the client is happy.

## Steps

1. Delete `web/middleware.ts`
2. Delete `web/app/password/page.tsx`
3. Delete `web/app/api/password/route.ts`
4. Deploy to Vercel

No other files reference the password gate. These three deletions are all that is needed.
