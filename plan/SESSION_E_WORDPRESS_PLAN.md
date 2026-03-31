# Session E — WordPress integration plan

**Created:** 2026-03-27
**Status:** In progress — code integration complete, content verification next

---

## Overview

Replace the static content in `web/lib/insights.ts` with live WordPress REST API calls so that all blog content is managed in WordPress at `cms.playbook-group.co.uk`. No component, page, or styling changes should be needed — only the data layer and configuration change.

**WordPress endpoint:** `https://cms.playbook-group.co.uk/wp-json/wp/v2/posts`
**Authentication:** None (public read-only)
**Content model:** Standard Posts with Categories (no ACF)

---

## Current state

### Data layer (`web/lib/insights.ts`)

7 synchronous functions that return static data imported from `.ts` files:

| Function | Used by |
|---|---|
| `getAllInsights()` | `insights/page.tsx`, `InsightsSection.tsx` |
| `getInsightBySlug(slug)` | `insights/[slug]/page.tsx`, `RelatedInsights.tsx` |
| `getInsightsByTag(tag)` | (available but unused in UI) |
| `getFeaturedInsight()` | `insights/page.tsx` |
| `searchInsights(query)` | (available but unused — search is client-side) |
| `getAllTags()` | `insights/page.tsx` |
| `getAllSlugs()` | `insights/[slug]/page.tsx` (for `generateStaticParams`) |

### Key constraint: sync to async

All functions are currently synchronous. WordPress API calls are async. Every function signature will change from `() => T` to `() => Promise<T>`, which means every consumer must `await` them. All four consumers are server components or `generateStaticParams`/`generateMetadata` (already async-capable), so this is a clean upgrade with no architectural issues.

---

## WordPress content mapping

How standard WP Post fields map to the `Insight` interface:

| `Insight` field | WP source | Notes |
|---|---|---|
| `slug` | `post.slug` | Direct |
| `title` | `post.title.rendered` | HTML-encoded — needs decoding |
| `excerpt` | `post.excerpt.rendered` | HTML string — strip tags for plain text |
| `body` | `post.content.rendered` | HTML — used directly with `dangerouslySetInnerHTML` (already the pattern) |
| `coverImage` | `post._embedded['wp:featuredmedia'][0].source_url` | Requires `?_embed` query param |
| `tag` | `post._embedded['wp:term'][0][0].name` | First category name. Requires `?_embed` |
| `publishedAt` | `post.date` | ISO 8601 — direct |
| `author` | Hardcoded `"Playbook Advisory Group"` | Single-author brand; ignore WP author field |
| `readingTime` | Calculated from `post.content.rendered` | Strip HTML, count words, divide by 200, round up |
| `featured` | `post.sticky` | WP's built-in "sticky post" feature — no custom fields needed |
| `relatedSlugs` | Posts sharing the same primary category | Fetched separately or derived from the full post list |

### Category setup required in WordPress

Create these categories (matching existing tag set):

- Governance
- Healthcare
- Regeneration
- Capital programmes

Each post should have exactly one category assigned (the primary topic tag).

---

## Implementation steps

### Step 1 — Environment variables

Add the WordPress base URL as an environment variable so it's not hardcoded.

**File:** `web/.env.local`

```
WORDPRESS_API_URL=https://cms.playbook-group.co.uk/wp-json/wp/v2
```

**Why an env var:** Allows different WordPress instances per environment (local dev, staging, production) and keeps the URL out of source code.

---

### Step 2 — WordPress API client

Create a small, focused WordPress client module.

**New file:** `web/lib/wordpress.ts`

Responsibilities:
- Export a `fetchWPPosts()` function that calls the WP REST API with `?_embed` and returns the raw response
- Export a `mapWPPostToInsight()` function that transforms a WP post object into the `Insight` interface
- Include a helper to strip HTML tags (for excerpt cleanup)
- Include a helper to calculate reading time from HTML content
- Type the WP REST API response (a lightweight `WPPost` interface — only the fields we use)
- Handle pagination via `per_page` param (default 100, sufficient for foreseeable scale)
- No external dependencies — uses native `fetch()`

```ts
// Sketch of the key types and functions:

interface WPPost {
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  sticky: boolean
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
    'wp:term'?: Array<Array<{ name: string }>>
  }
}

function stripHTML(html: string): string { ... }
function calculateReadingTime(html: string): number { ... }
function decodeHTMLEntities(str: string): string { ... }

export async function fetchWPPosts(): Promise<WPPost[]> { ... }
export function mapWPPostToInsight(post: WPPost): Insight { ... }
```

---

### Step 3 — Rewrite data layer (`web/lib/insights.ts`)

Replace the static imports with async functions that call `fetchWPPosts()` and `mapWPPostToInsight()`.

**Key changes:**

| Before | After |
|---|---|
| `function getAllInsights(): Insight[]` | `async function getAllInsights(): Promise<Insight[]>` |
| `function getInsightBySlug(slug): Insight \| undefined` | `async function getInsightBySlug(slug): Promise<Insight \| undefined>` |
| `function getInsightsByTag(tag): Insight[]` | `async function getInsightsByTag(tag): Promise<Insight[]>` |
| `function getFeaturedInsight(): Insight` | `async function getFeaturedInsight(): Promise<Insight>` |
| `function searchInsights(query): Insight[]` | `async function searchInsights(query): Promise<Insight[]>` |
| `function getAllTags(): string[]` | `async function getAllTags(): Promise<string[]>` |
| `function getAllSlugs(): string[]` | `async function getAllSlugs(): Promise<string[]>` |

**Caching strategy:** Next.js automatically deduplicates `fetch()` calls within a single render pass. We'll also use `next: { revalidate: 60 }` on fetch calls so ISR works correctly. Multiple calls to `getAllInsights()` in the same request won't hit WordPress multiple times.

**Related posts logic:** Since we don't have ACF for `relatedSlugs`, we'll derive them: for a given post, find up to 3 other posts in the same category, sorted by date. This replaces the manually-curated `relatedSlugs` with automatic category-based recommendations — better for a CMS-managed system.

---

### Step 4 — Update consumers (add `await`)

Each file that calls `insights.ts` functions needs minor updates:

**`web/app/(site)/insights/page.tsx`**
- Make the component `async` (it may already be, or is a server component that supports it)
- `await getAllInsights()`, `await getFeaturedInsight()`, `await getAllTags()`

**`web/app/(site)/insights/[slug]/page.tsx`**
- `await getInsightBySlug(slug)` in the component and in `generateMetadata`
- `await getAllSlugs()` in `generateStaticParams`

**`web/components/InsightsSection.tsx`**
- Make the component `async`
- `await getAllInsights()`

**`web/components/RelatedInsights.tsx`**
- Make the component `async`
- `await getInsightBySlug(s)` calls — refactor to fetch all related in one pass (fetch all posts, filter by slug) to avoid N+1 API calls

**`web/app/(site)/insights/InsightsPageClient.tsx`**
- No changes. It's a client component that receives data as props.

---

### Step 5 — ISR configuration

Add revalidation to the insights routes so editorial changes in WordPress are reflected without a full rebuild.

**`web/app/(site)/insights/page.tsx`**
```ts
export const revalidate = 60  // revalidate every 60 seconds
```

**`web/app/(site)/insights/[slug]/page.tsx`**
```ts
export const revalidate = 60
```

This means:
- First visitor after 60 seconds triggers a background regeneration
- Stale content is served while regeneration happens (stale-while-revalidate)
- New/updated WordPress posts appear within ~60 seconds of publish

The homepage `InsightsSection` inherits from its layout's revalidation or can have its own. We'll add `revalidate = 60` to the homepage layout or rely on the default.

---

### Step 6 — Image configuration

Allow Next.js to optimise images from the WordPress media library.

**File:** `web/next.config.ts`

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cms.playbook-group.co.uk',
      pathname: '/wp-content/uploads/**',
    },
  ],
}
```

Note: The current pages use `<img>` tags, not `next/image`. We'll keep it that way for now to avoid a separate refactor. The `remotePatterns` config is added for future use and in case any component switches to `next/image`.

---

### Step 7 — Fallback handling

What happens when WordPress is unreachable or returns errors:

- `fetchWPPosts()` will catch fetch errors and return an empty array
- Pages will render with "No articles" state (the empty state UI already exists)
- Console warning logged for debugging
- No hard crashes — the site degrades gracefully

This keeps the site functional even if the WordPress instance is temporarily down.

---

### Step 8 — Content migration verification

After the code changes are deployed:

1. Verify all four existing articles render correctly from WordPress
2. Check that HTML content, images, categories, and dates match
3. Test the featured (sticky) article appears correctly
4. Test that related articles (same category) display
5. Publish a new test article in WordPress and confirm it appears within 60 seconds

---

## Files changed (summary)

| File | Action | What changes |
|---|---|---|
| `web/.env.local` | Edit | Add `WORDPRESS_API_URL` |
| `web/lib/wordpress.ts` | **New** | WP REST API client, response mapping, helpers |
| `web/lib/insights.ts` | Rewrite | Sync functions → async functions calling WP API |
| `web/app/(site)/insights/page.tsx` | Edit | Add `await`, add `revalidate = 60` |
| `web/app/(site)/insights/[slug]/page.tsx` | Edit | Add `await`, add `revalidate = 60` |
| `web/components/InsightsSection.tsx` | Edit | Make async, add `await` |
| `web/components/RelatedInsights.tsx` | Edit | Make async, refactor to batch fetch |
| `web/next.config.ts` | Edit | Add `images.remotePatterns` for WP domain |

### Files NOT changed

| File | Why |
|---|---|
| `web/lib/types.ts` | `Insight` interface stays exactly the same |
| `web/components/InsightCard.tsx` | Receives `Insight` props — unchanged |
| `web/components/TagFilter.tsx` | Client component, unchanged |
| `web/components/InsightSearch.tsx` | Client component, unchanged |
| `web/components/ShareButtons.tsx` | Unchanged |
| `web/components/ArticleCTA.tsx` | Unchanged |
| `web/app/(site)/insights/InsightsPageClient.tsx` | Client component, receives props — unchanged |
| `web/app/globals.css` | No styling changes |

### Files that can be removed after verification

| File | Reason |
|---|---|
| `web/lib/insights/memory-gap.ts` | Static content replaced by WordPress |
| `web/lib/insights/nhs-capital-programmes.ts` | Static content replaced by WordPress |
| `web/lib/insights/governance-bridge-regen.ts` | Static content replaced by WordPress |
| `web/lib/insights/decision-gap.ts` | Static content replaced by WordPress |

These will be kept during development as a reference for verifying WordPress content matches, then removed once confirmed.

---

## WordPress setup checklist

- [x] Four articles published with full content (matching the existing four) — seeded via REST API, post IDs 8–11
- [x] Each article has a featured image uploaded — media IDs 12, 14, 16, 18
- [x] Categories created: Governance (ID 2), Healthcare (ID 3), Regeneration (ID 4), Capital programmes (ID 5)
- [x] Each article assigned to one category
- [x] The "Memory Gap" article marked as Sticky (for featured)
- [x] Permalinks set to "Post name" (so slugs match) — **verify in WordPress admin: Settings → Permalinks**
- [x] REST API accessible at `https://cms.playbook-group.co.uk/wp-json/wp/v2/posts?_embed`
- [x] Revoke `claude-code` application password (Users → Profile → Application Passwords)

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| WordPress downtime | Graceful fallback to empty state; no site crash |
| Slug mismatch between WP and existing URLs | Verify slugs match before removing static content |
| WP excerpt includes HTML `<p>` tags | `stripHTML()` helper cleans this for plain-text use |
| WP title includes HTML entities (`&#8217;` etc.) | `decodeHTMLEntities()` helper handles this |
| N+1 API calls for related posts | Fetch all posts once, derive related from the list |
| Category name casing differences | Case-insensitive comparison in tag filtering (already the pattern) |
| Large image files from WP | Images served as-is via WP URLs; `next/image` migration deferred |

---

## Execution order

- [x] **Step 1** — Environment variable (`web/.env.local`)
- [x] **Step 2** — `wordpress.ts` (new WP REST API client module)
- [x] **Step 3** — `insights.ts` (rewrite: sync → async, static → WP API, with static fallback)
- [x] **Step 4** — Consumer updates (add `await` to all 4 server components)
- [x] **Step 5** — ISR configuration (`revalidate = 60` on insights routes)
- [x] **Step 6** — Image configuration (`next.config.ts` remotePatterns)
- [x] **Step 7** — Fallback handling (graceful degradation on WP downtime)
- [x] **Step 8** — Build test to verify compilation (passed — 13/13 pages generated)
- [x] **Step 9** — Content migration verification (render check against static originals)
- [x] **Step 10** — Remove static content files (`web/lib/insights/*.ts`)
