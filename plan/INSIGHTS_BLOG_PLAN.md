# Insights blog — build plan

**Created:** 2026-03-27
**Status:** Draft — awaiting review

---

## Objective

Build a fully functional blog system for the Playbook Advisory Group website comprising:

1. An **insights landing page** (`/insights`) with filtering, search, pagination, and a featured article
2. Four **individual article pages** (`/insights/[slug]`) with full-length content written in the Playbook tone of voice
3. A **CMS-agnostic data layer** — hardcoded content initially, structured so WordPress (or any headless CMS) can be plugged in later with minimal rework

---

## Architecture decisions

### CMS-agnostic content layer

All blog content will be served through a single abstraction layer:

```
web/lib/insights.ts    ← data access functions (getAllInsights, getInsightBySlug, etc.)
web/lib/insights/       ← content directory (one .ts file per article, or a single data file)
```

- Pages and components never fetch content directly — they call functions from `lib/insights.ts`
- When WordPress is integrated, only `lib/insights.ts` changes (swap static data for WP REST API / WPGraphQL calls)
- TypeScript interface (`Insight`) defines the content contract — shared by all consumers
- This replaces the current Sanity-oriented approach for insights specifically

### Content model (TypeScript interface)

```ts
interface Insight {
  slug: string
  title: string
  excerpt: string
  body: string                // HTML or MDX content
  coverImage: string          // path or URL
  tag: string                 // single primary tag
  publishedAt: string         // ISO date
  author: string              // "Playbook Advisory Group"
  readingTime: number         // minutes
  featured: boolean           // manually pin as featured article
  relatedSlugs: string[]      // slugs of related articles
}
```

### WordPress readiness

The data layer will be structured so that a future WordPress integration session needs only to:
1. Install a WP REST API or WPGraphQL client
2. Rewrite the fetch functions in `lib/insights.ts` to call the WP endpoint
3. Map the WP response to the existing `Insight` interface
4. Switch from SSG to ISR with revalidation on the insights routes

No component, page, or styling changes required.

---

## Sessions

### Session A — Content layer and article content

**Goal:** Create the data abstraction layer and write all four articles.

| Step | Task | Detail |
|---|---|---|
| A1 | Define `Insight` TypeScript interface | In `web/lib/types.ts` (or co-located in `insights.ts`) |
| A2 | Create `web/lib/insights.ts` | Export: `getAllInsights()`, `getInsightBySlug(slug)`, `getInsightsByTag(tag)`, `getFeaturedInsight()`, `searchInsights(query)` |
| A3 | Create article content files | One file per article in `web/lib/insights/` containing full-length content (800–1,200 words each) in the Playbook tone of voice, British English, sentence case headings, respecting all brand copy rules |
| A4 | Write Article 1 | "The most expensive lessons in any programme are the ones that must be learned twice" — Governance tag |
| A5 | Write Article 2 | "Why NHS capital programmes drift: diffuse accountability and the governance bridge" — Healthcare tag |
| A6 | Write Article 3 | "What the Governance Bridge looks like in residential regeneration" — Regeneration tag |
| A7 | Write Article 4 | "Closing the Decision Gap: independent challenge at the point of commitment" — Capital programmes tag |
| A8 | Update `InsightsSection.tsx` | Replace hardcoded `INSIGHTS` array with imports from the data layer; update card links to point to `/insights/[slug]` |

**Acceptance:** Data layer compiles cleanly. All four articles accessible via the abstraction functions. Homepage insight cards link to correct slugs.

---

### Session B — Insights landing page (`/insights`)

**Goal:** Build the full insights index page with all features.

| Step | Task | Detail |
|---|---|---|
| B1 | Page layout and hero | Page header with title, description, and breadcrumb. Featured article displayed prominently at the top (large card with image, tag, date, excerpt, reading time). Featured article is determined by the `featured: true` flag in the data — if none is flagged, falls back to the most recent article |
| B2 | Tag filter bar | Horizontal pill/tab row showing available tags: Governance, Healthcare, Regeneration, Capital programmes. Click to filter. "All" option selected by default. Client-side filtering for speed (no page reload). Do not include "funding" as a tag |
| B3 | Search | Text input field. Searches article titles and excerpts. Debounced client interaction. Combined with tag filter (AND logic) |
| B4 | Article grid | Responsive card grid (matching homepage card design). Each card shows: cover image, tag, date, title, excerpt, reading time, "Read article" link |
| B5 | Pagination | "Load more" button pattern (not numbered pages). Show 6 articles initially, load 6 more per click. Show count indicator ("Showing 6 of 12") |
| B6 | Empty state | Friendly message when filter/search returns no results |
| B7 | SEO metadata | Page title, description, Open Graph tags |
| B8 | Animations | RevealWrapper entrance animations matching homepage patterns. Staggered card reveals |

**Components to create:**
- `InsightCard.tsx` — reusable card component (shared between landing page and homepage section)
- `TagFilter.tsx` — horizontal filter pill bar
- `InsightSearch.tsx` — search input with debounce
- `InsightsGrid.tsx` — responsive article grid with load-more

**Acceptance:** `/insights` renders all articles. Filtering by tag works. Search works. Load more works. Responsive on all breakpoints. Animations respect `prefers-reduced-motion`.

---

### Session C — Individual article page (`/insights/[slug]`)

**Goal:** Build the full article template with all features.

| Step | Task | Detail |
|---|---|---|
| C1 | Article layout | Max-width prose container. Cover image (full-width or contained). Tag, date, author, reading time metadata bar |
| C2 | Article body rendering | Rich HTML/MDX content rendering with proper typography styles (headings, paragraphs, lists, blockquotes, pull quotes). All styled with Tailwind prose classes mapped to brand tokens |
| C3 | Social sharing | Share buttons for LinkedIn, X (Twitter), email. Copy-link button. Non-intrusive placement (below title or floating sidebar on desktop) |
| C4 | CTA section | A call-to-action block at the end of each article linking to the contact page. Styled consistently with the DiagnosticCTA component |
| C5 | Related articles | "Related insights" section at the bottom showing 2–3 articles with the same tag. Uses the same `InsightCard` component from Session B |
| C6 | Back navigation | "Back to all insights" link at the top |
| C7 | SEO metadata | Dynamic page title, description (from excerpt), Open Graph tags including image |
| C8 | Static generation | `generateStaticParams()` to pre-render all article pages at build time |
| C9 | Animations | Subtle entrance animations for content sections |

**Acceptance:** All four article slugs resolve. Full content renders with correct typography. Related articles show. Social sharing links work. CTA renders. Responsive on all breakpoints.

---

### Session D — Polish and integration

**Goal:** Tie everything together, ensure consistency, and prepare for CMS handoff.

| Step | Task | Detail |
|---|---|---|
| D1 | Refactor homepage `InsightsSection` | Use the shared `InsightCard` component. Ensure visual consistency between homepage cards and landing page cards |
| D2 | Navigation updates | Ensure "Insights" nav link in header and footer points to `/insights` and is marked active on insights pages |
| D3 | Cross-page consistency | Verify card hover states, image treatments, and animations are consistent across homepage, landing page, and article pages |
| D4 | Accessibility audit | Heading hierarchy, ARIA labels, keyboard navigation, focus management, screen reader testing |
| D5 | Mobile testing | Verify all three page types (landing, article, homepage section) at mobile, tablet, and desktop breakpoints |
| D6 | Performance | Lazy loading images, optimised image sizes, minimal JS bundle for filtering/search |
| D7 | Documentation | Update `CHANGELOG.md`, `SESSION_NOTES.md`, and `PROJECT_PLAN.md` |

**Acceptance:** All insights pages are production-ready. No accessibility issues. Consistent design across all touchpoints.

---

### Session E — WordPress integration (future)

**Goal:** Connect the blog to a WordPress instance as the content backend.

| Step | Task | Detail |
|---|---|---|
| E1 | WordPress content modelling | Create a custom post type or use the default "Posts" with custom fields (tag, excerpt, cover image, related posts) matching the `Insight` interface |
| E2 | API client setup | Install WP REST API client or WPGraphQL. Configure endpoint URL and authentication as environment variables |
| E3 | Rewrite data layer | Replace static content in `web/lib/insights.ts` with WordPress API calls. Map WP response to `Insight` interface |
| E4 | Switch to ISR | Change insights routes from SSG to ISR. Configure revalidation interval (e.g., 60 seconds) or on-demand revalidation via WordPress webhook |
| E5 | Image handling | Configure `next.config.ts` `images.remotePatterns` for the WordPress media domain. Use `next/image` for optimised delivery |
| E6 | Content migration | Move the four article texts from static files into WordPress. Verify rendering matches |
| E7 | Editorial workflow testing | Publish, update, and unpublish articles in WordPress. Verify ISR picks up changes |

**Acceptance:** All blog content is managed in WordPress. Editorial changes reflect on the site within the revalidation window. No changes to components or styling.

---

## Design specifications

### Insights landing page layout

```
┌─────────────────────────────────────────────┐
│  Header / Nav                                │
├─────────────────────────────────────────────┤
│  Page title + description                    │
│  "Perspectives on governance, capital        │
│   programmes, and decision quality"          │
├─────────────────────────────────────────────┤
│  Featured article (large card)               │
│  ┌────────────────────────────────────────┐  │
│  │  Image  │  Tag · Date · Reading time   │  │
│  │         │  Title (h2)                  │  │
│  │         │  Excerpt                     │  │
│  │         │  Read article →              │  │
│  └────────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  [All] [Governance] [Healthcare] [Regen...]  │
│  [🔍 Search articles...]                     │
├─────────────────────────────────────────────┤
│  Article grid (2 cols desktop, 1 col mobile) │
│  ┌──────────┐  ┌──────────┐                  │
│  │  Card 1  │  │  Card 2  │                  │
│  └──────────┘  └──────────┘                  │
│  ┌──────────┐  ┌──────────┐                  │
│  │  Card 3  │  │  Card 4  │                  │
│  └──────────┘  └──────────┘                  │
│                                              │
│  Showing 4 of 4                              │
│  [ Load more ]  (hidden when all shown)      │
├─────────────────────────────────────────────┤
│  Footer                                      │
└─────────────────────────────────────────────┘
```

### Individual article page layout

```
┌─────────────────────────────────────────────┐
│  Header / Nav                                │
├─────────────────────────────────────────────┤
│  ← Back to all insights                      │
├─────────────────────────────────────────────┤
│  Tag · Date · Reading time                   │
│  Title (h1)                                  │
│  Author: Playbook Advisory Group             │
├─────────────────────────────────────────────┤
│  Cover image (full width)                    │
├─────────────────────────────────────────────┤
│  Article body (max-width prose)              │
│  ┌───────────────────────────────────────┐   │
│  │  Rich content: headings, paragraphs,  │   │
│  │  lists, blockquotes, pull quotes      │   │
│  └───────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  Share: LinkedIn · X · Email · Copy link     │
├─────────────────────────────────────────────┤
│  CTA block (Capital Governance Diagnostic    │
│  or Contact — matching DiagnosticCTA style)  │
├─────────────────────────────────────────────┤
│  Related insights                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Card 1  │  │  Card 2  │  │  Card 3  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────┤
│  Footer                                      │
└─────────────────────────────────────────────┘
```

### Styling rules

- All colours, spacing, typography, and animation values from existing design tokens in `globals.css`
- Card design must match existing homepage insight cards (same hover states, image treatments, gradients)
- Dark section backgrounds use `#000000` (black), not teal — consistent with homepage
- Sentence case for all headings
- British English throughout
- `prefers-reduced-motion` respected on all animations
- Mobile-first responsive approach

---

## File map (new files to create)

```
web/
├── lib/
│   ├── types.ts                          ← Insight interface
│   ├── insights.ts                       ← Data access layer (CMS-agnostic)
│   └── insights/
│       ├── memory-gap.ts                 ← Article 1 content
│       ├── nhs-capital-programmes.ts     ← Article 2 content
│       ├── governance-bridge-regen.ts    ← Article 3 content
│       └── decision-gap.ts              ← Article 4 content
├── components/
│   ├── InsightCard.tsx                   ← Shared card component
│   ├── TagFilter.tsx                     ← Tag filter pills
│   ├── InsightSearch.tsx                 ← Search input
│   ├── InsightsGrid.tsx                  ← Grid + load more
│   ├── ShareButtons.tsx                  ← Social sharing
│   ├── ArticleCTA.tsx                    ← End-of-article CTA
│   └── RelatedInsights.tsx              ← Related articles section
└── app/(site)/insights/
    ├── page.tsx                          ← Landing page (rewrite)
    ├── InsightsPageClient.tsx            ← Client component for filter/search
    └── [slug]/
        └── page.tsx                      ← Article page (rewrite)
```

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Article content quality | Articles written to Playbook tone of voice guidelines with brand vocabulary. Review before committing |
| Search performance with many articles | Client-side search is fine for <100 articles. WordPress integration (Session E) can add server-side search later |
| Image availability | Four cover images already exist in `/public/images/`. No new images needed for initial build |
| Sanity conflict | The existing Sanity schemas for insights remain untouched. The static data layer runs in parallel. When WordPress is connected, Sanity insight schemas can be deprecated |

---

## Resolved decisions

1. **Featured article selection** — manually pinned via `featured: true` flag in the data. Falls back to most recent if none is flagged.
2. **CTA content** — end-of-article CTA links to the contact page.
3. **Article images** — existing four images are sufficient. No new images needed.
4. **Tag set** — Governance, Healthcare, Regeneration, Capital programmes. "Funding" excluded.
