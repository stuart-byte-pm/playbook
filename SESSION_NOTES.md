## Session — 2026-03-27 (Insights blog system build)

### What we worked on
- Planned and built the full insights/blog system across four sessions (A–D) plus polish
- Created a CMS-agnostic data access layer (`web/lib/insights.ts`) with TypeScript `Insight` interface
- Wrote four full-length articles (800–1,200 words each) in the Playbook tone of voice
- Built the insights landing page (`/insights`) with featured article hero, tag filtering, search, load-more pagination, and empty state
- Built individual article pages (`/insights/[slug]`) with prose typography, social sharing, contact CTA, and related insights
- Refactored `InsightsSection` homepage component to use shared `InsightCard` component
- Overhauled the nav state model: flipped from "default transparent, override to dark" to "default dark, override to transparent on homepage" — fixes nav visibility on all light-background pages
- Fixed hamburger menu visibility on light pages (increased line thickness, explicit hex colours)
- Added `darkHeroPages` array to Nav for pages needing transparent nav treatment
- Cross-page consistency audit and accessibility improvements (card click overlay, heading hierarchy, semantic HTML)

### Key decisions
- **CMS-agnostic architecture:** All blog content served through `web/lib/insights.ts` abstraction. When WordPress is connected later, only this file changes — no component or styling rework needed
- **Featured article:** Manually pinned via `featured: true` flag in data; falls back to most recent if none flagged
- **CTA links to contact page:** End-of-article CTA confirmed as linking to `/contact` (not Diagnostic)
- **Tag set:** Governance, Healthcare, Regeneration, Capital programmes — "funding" excluded
- **Nav default flipped:** Dark-text-on-white is now the default state. Only pages listed in `darkHeroPages` get transparent nav. This means new pages automatically get the correct nav without developer intervention
- **Existing images sufficient:** No new images needed for the blog — existing four cover images reused

### Output / artefacts produced
- `web/lib/types.ts` — Insight interface
- `web/lib/insights.ts` — data access layer (7 functions)
- `web/lib/insights/` — 4 article content files (memory-gap, nhs-capital-programmes, governance-bridge-regen, decision-gap)
- `web/components/InsightCard.tsx`, `TagFilter.tsx`, `InsightSearch.tsx`, `ShareButtons.tsx`, `ArticleCTA.tsx`, `RelatedInsights.tsx` — 6 new components
- `web/app/(site)/insights/page.tsx` — landing page (rewritten)
- `web/app/(site)/insights/InsightsPageClient.tsx` — client component for filter/search/grid
- `web/app/(site)/insights/[slug]/page.tsx` — article page (rewritten)
- `web/components/InsightsSection.tsx` — refactored to use InsightCard
- `web/components/Nav.tsx` — nav state model overhauled
- `web/app/globals.css` — ~200 lines of new CSS (insights hub, article page, prose, share, CTA, nav flip)
- `plan/INSIGHTS_BLOG_PLAN.md` — full build plan including future WordPress session

### Outstanding / next steps
- **Session E — WordPress integration:** Connect blog to WordPress instance as content backend (planned in `INSIGHTS_BLOG_PLAN.md`)
- **Browser testing:** Visual review of all three page types at mobile, tablet, and desktop breakpoints
- **Session docs update for PROJECT_PLAN.md:** Update task statuses for Phase 6 (Insights pages)
- **Resend integration (FORM-01):** Still outstanding — wire contact form to `hello@playbook-group.co.uk`
- **Other pages:** `/the-playbook-model`, `/services/[slug]`, `/sectors/[slug]` still need building out

---

## Session — 2026-03-27

### What we worked on
- Converted `homepage-demo-04.html` into a fully working Next.js homepage with 15 components
- Built and debugged the splash screen (session-once, sessionStorage flag, 5.5s auto-dismiss)
- Fixed multiple invisible section headings caused by `reveal` class never receiving `is-visible`
- Fixed BeliefSection gold icon stretching full-size due to `.belief__image img` CSS override
- Fixed ServicesSection image panel invisible due to unobserved `reveal-left` class
- Removed PlaybookModelSection from homepage per user instruction
- Fixed DiagnosticCTA slow loading (image priority + looser IntersectionObserver threshold)
- Fixed DiagnosticCTA pill SVG path (`Playbook_Icon_Pill_White_RGB.svg` — user supplied file)
- Updated all "Talk to Playbook" / "Request the Diagnostic" CTAs to link to `/contact`
- Updated Nav contact link to `/contact`
- Replaced Leaflet map on contact page with Google My Maps embed; hidden toolbar via CSS offset
- Replaced building image placeholder with `campus 1.jpg` + pill SVG overlay + 20px border-radius
- Overhauled contact page form: subject changed to text input, mandatory fields limited to Name/Email, email placeholder updated, submit button changed to gold `btn-primary`
- Fixed contact page layout centering (switched to `.container` class)
- Added decorative guiding star treatment to contact page header (solid white filled SVGs)
- Restructured app into `(site)` route group so Nav + Footer are shared automatically across all pages
- Cleared stale `.next/types` cache after route group restructure

### Key decisions
- **Route group `(site)`:** All site pages now in `app/(site)/` with a shared layout providing Nav + Footer. Studio stays outside the group. Any new page created inside `(site)` automatically gets Nav and Footer — no per-page work required.
- **Splash approach:** Render always in DOM (not state-gated) to avoid SSR/hydration null render issue; JS hides or dismisses it client-side
- **Google My Maps over Leaflet:** User preferred modern appearance; My Maps allows multiple custom pins without API key; toolbar hidden with CSS offset
- **DiagnosticCTA image `priority`:** Image is below the fold but lazy loading caused visible blank-then-load when section animates in; `priority` preloads it with the page
- **Contact form subject:** Changed from dropdown to free-text input at user request — simpler and more flexible

### Output / artefacts produced
- `web/components/` — 15 new components: Splash, Nav, Hero, BeliefSection, WhereWeSitSection, GapsSection, ServicesSection, SectorsSection, InsightsSection, DiagnosticCTA, ContactSection, Footer, RevealWrapper, ArrowIcon, WordmarkSvg
- `web/app/(site)/layout.tsx` — shared site layout
- `web/app/(site)/page.tsx` — homepage (Nav/Footer removed, now from layout)
- `web/app/(site)/contact/` — contact page files moved into route group
- `web/app/(site)/insights/`, `services/`, `sectors/`, `the-playbook-model/` — all moved into group
- `web/app/globals.css` — significantly expanded with all component CSS, keyframes, splash styles

### Outstanding / next steps
- **Resend integration (FORM-01):** Wire both contact forms (homepage + contact page) to `hello@playbook-group.co.uk`
- **Sanity CMS wiring:** Replace static placeholder articles in InsightsSection with live CMS data
- **Building image:** Replace `campus 1.jpg` with actual Playbook office photo when available
- **Phone number:** Update "Number to be confirmed" once confirmed
- **Other pages:** `/the-playbook-model`, `/services/[slug]`, `/sectors/[slug]`, `/insights` and `/insights/[slug]` pages need building out
- **Analytics:** Plausible placeholder in `layout.tsx` — set up post-launch

---

## Session — 2026-03-24 (Contact page build + refinement)

### What we worked on
- Built the full `/contact` page with form, contact details, building image placeholder, and interactive Leaflet map
- Installed `leaflet`, `react-leaflet`, and `@types/leaflet`
- Created `ContactMap.tsx` component with three custom SVG markers and refined with accurate GPS coordinates
- Created `ContactPageClient.tsx` with two-column layout: form left, details/map/image right
- Created `actions.ts` server action stub with basic validation and console logging (Resend deferred)
- Added SEO metadata to `page.tsx` (title + description)
- Fixed two TypeScript build errors: `DivIcon` vs `Icon` type mismatch, and Leaflet CSS dynamic import type declaration
- Updated map markers with user-supplied coordinates and renamed car park to Bath Street
- Swapped marker icons (office/parking) and removed contact intro paragraph

### Key decisions
- **Leaflet + OpenStreetMap:** Free, no API key, supports custom markers — chosen over Google Maps
- **Marker icons swapped:** Office now uses parking icon (`🅿`), car park uses `P` — user preference
- **Bath Street Car Park:** Updated all references from Covent Garden to Bath Street
- **Address postcode:** Added `CV31 3SY` for clarity and searchability
- **Intro paragraph removed:** Simplified the contact details section by removing explanatory copy
- **Form submission stubbed:** No Resend wiring — logs to console and shows success message. Deferred to FORM-01
- **Homepage contact section retained:** User decision to keep existing form as-is

### Output / artefacts produced
- `web/app/contact/page.tsx` — server component with metadata
- `web/app/contact/ContactPageClient.tsx` — full contact page client component (updated with copy/address changes)
- `web/app/contact/actions.ts` — server action stub
- `web/components/ContactMap.tsx` — Leaflet map with accurate coordinates and Bath Street car park label
- `web/package.json` — updated with leaflet dependencies

### Outstanding / next steps
- **Wire up Resend** for form submission (FORM-01) — send to `hello@playbook-group.co.uk`
- **Building image:** Replace placeholder once photo is available
- **Phone number:** Update once confirmed by client
- **Nav and hero CTAs:** Update to link to `/contact` once homepage components are built
- **Design system components (DS-01–DS-07)** still the next major build phase

---

## Session — 2026-03-24 (Brand colour update, design system sync, decorative treatments, deployment fixes)

### What we worked on
- Applied client-supplied brand colour updates across entire project: new hex values, renamed tokens (`navy`→`teal`, `paper-dark`→`peach`, `mid-grey`→`sand`), added `pale-blue`
- Updated brand positioning line from "Connecting you to clarity" to "Clarity. Control. Confidence." across all files
- Completed task 13: "When we are typically engaged" section background changed to teal, background sketch image removed, text updated for dark background
- Added decorative guiding star icon treatment to the gaps section (white filled icon, pseudo-elements, rotated)
- Added decorative guiding star treatment to the model section (gold outline icon, CSS multiple backgrounds, `isolation: isolate` stacking fix)
- Diagnosed and fixed deployment issues: public demo file was 370 lines behind the assets file; hero video path was broken on Vercel

### Key decisions
- **Token renames:** Client provided a fully revised palette — not just new hex values but new colour names. All token names updated throughout to avoid confusion between old and new palette. `pale-blue` added as a new supporting colour with no direct predecessor.
- **Background image removal (gaps section):** The sketch texture image (`background-image-04.png`) was an opaque light-grey PNG — it masked any background colour change entirely. Removed rather than adapted, as the sketch was designed for the light background and would not work on teal.
- **Guiding star placement principle:** Both sections use the same compositional logic — two instances, different sizes, placed on opposing corners to create diagonal tension. Diagonal direction and icon type deliberately varied between sections (gaps: white filled, rotated, top-right/bottom-left; model: gold outline, unrotated, bottom-left/top-right).
- **`isolation: isolate` for model section stacking:** `z-index: -1` on `::after` alone would push icons behind the section's own background (invisible). `isolation: isolate` creates a scoped stacking context so `-1` means "behind children" not "behind everything".
- **Sync discipline:** `web/public/demos/homepage-demo-04.html` must always be explicitly copied from `assets/files/homepage-demo-04.html` before committing — they are not auto-synced and diverge silently.
- **Video path trade-off:** `../videos/` resolves correctly on Vercel (`/demos/` → `/videos/`) but breaks when opening the assets file directly in a local browser. Accepted trade-off since Vercel is the primary viewing environment.

### Output / artefacts produced
- `assets/files/playbook-design-system.html` — full colour palette update, new swatches, renamed section variants
- `assets/files/homepage-demo-04.html` — teal gaps section, guiding star decorations, corrected video path
- `web/public/demos/homepage-demo-04.html` — fully synced with assets version; all session changes deployed
- `web/app/globals.css` — `@theme` and `:root` updated with new token names and values
- `CLAUDE.md` — palette table, Tailwind class examples, prototype notes, positioning line updated
- `.claude/rules/playbook-design-tokens.json` — full token rename, value update, `pale-blue` added
- `plan/PROJECT_PLAN.md` — task descriptions, token class names, positioning line references updated

### Outstanding / next steps
- `pale-blue` (`#c3dae2`) is in the token system but unused in the prototype — consider where it might be applied
- **Client sign-off** on `homepage-demo-04.html` still required before Next.js component build begins
- Medium tasks still outstanding: 7, 20, 23, 26, 28, 29, 32, 33
- Next phase after sign-off: **DS-01 through DS-07** (design system components in `web/components/`)
- Establish a sync step in the commit workflow: always copy assets demo → public demo before pushing

---

## Session — 2026-03-24 (Homepage demo v4 — client feedback pass, tasks 17–31)

### What we worked on
- Completed all remaining Small tasks from `plan/playbook_website_tasks-23-03.xlsx` (tasks 17–31, excluding blocked Medium tasks)
- Task 17: What We Do item 2 label — renamed to "Programme setup and governance"
- Task 18: What We Do item 1 copy — appended funding application context sentence
- Task 19: What We Do item 5 copy — appended compelling funding cases sentence
- Task 21: Playbook Model "Explore the model" button — fixed `href` to `/the-playbook-model`
- Task 22: Playbook Model background texture — added repeating guiding star pattern via CSS `::after`
- Task 24: Sectors — renamed "Higher education" tag and description text to "Education"
- Task 25: Sectors — added "Residential" tag to Private sector card
- Task 27: Thought Leadership — implemented full-screen article overlay system with three complete articles
- Task 30: Contact — removed Headquarters and Midlands address blocks
- Task 31: Contact — added Telephone placeholder entry ("Number to be confirmed")
- Bug fix: service row expand clipping — `max-height` on hover state increased from `5rem` to `12rem` to prevent clipped descriptions after tasks 18/19 added second sentences

### Key decisions
- **Article overlay approach (task 27):** Full-screen white overlay rather than modal or inline expand — cleaner reading experience and easier to implement in a single-file prototype. Three complete on-brand articles written inline; back button and Escape key dismiss.
- **Service row max-height fix:** Fixed value of `5rem` was always fragile — increased to `12rem` which comfortably covers all five rows at current copy lengths while keeping the CSS transition approach intact.
- **"Explore the model" destination:** Button now links to `/the-playbook-model` — correct for the production site structure even though the dedicated page doesn't exist in the prototype.

### Output / artefacts produced
- `assets/files/homepage-demo-04.html` — updated with all Small task changes (tasks 17–31) and service row bug fix

### Outstanding / next steps
- **Client sign-off** on `homepage-demo-04.html` required before Next.js component build begins
- **Medium tasks still outstanding:** 7 (Problem section image), 13 (When Engaged background colour), 20 (Playbook Model — evaluate moving to dedicated page), 23 (Sectors — replace placeholder images), 26 (Sectors — dedicated pages per sector), 28 (Thought Leadership editorial layout), 29 (Article authoring workflow), 32, 33 — all require client input or content before implementation
- Once sign-off received, next phase is **DS-01 through DS-07** (design system components in `web/components/`)

---

## Session — 2026-03-23 (Homepage demo v4 — client feedback pass, tasks 1–16)

### What we worked on
- Worked through all unblocked Small tasks from `plan/playbook_website_tasks-23-03.xlsx`
- Task 1: Splash/loading screen — full-screen branded overlay, session-once, 6s auto-dismiss
- Task 2: Nav logo — increased to 88px, removed max-width/auto margins, left-pinned at 24px
- Task 3: Hero sub-headline copy updated to client-supplied line
- Task 4: Playbook Model section — added governance bridge second paragraph
- Task 5: Removed Diagnostic CTA button from hero; promoted Playbook Model button to primary
- Task 6: Fixed hero button scroll target with `scroll-padding-top: 120px`
- Task 8: Fixed "How we work" button scroll target to `#where-we-sit`
- Task 9: Split Problem section closing paragraph into two for emphasis
- Task 10: Updated Where We Sit point 04 wording to include "technical"
- Task 11: Removed "delivery-led project management firm" from Where We Sit footnote
- Task 12: Rebuilt golden thread as `scaleX` left-to-right draw; added cross-card bleed for continuous thread; persistent `is-threaded` state on first hover
- Tasks 14–16: Brand pillar watermarks (Clarity/Control/Confidence) with `clip-path` wipe reveal; added `.gap-card__extra` copy to each card
- Alignment fix: resolved `.gap-card__extra` vertical misalignment — CSS `flex: 1` on copy plus JS `equalizeGapCardExtras()` on load/resize
- Updated `plan/playbook_website_tasks-23-03.xlsx` column F Comments for tasks 1–16; task 13 changed to Medium

### Key decisions
- **Splash screen timing:** 6 seconds total (doubled from initial 3s per client request); `sessionStorage` flag prevents re-show within the same browser session
- **Nav max-width removal:** Client wanted logo more prominent and left-pushed; removing `max-width` and `margin: auto` achieves this without breaking the right-side nav items
- **Golden thread technique:** `scaleX` with `transform-origin: left` rather than `width` animation — smoother, GPU-accelerated, no layout shift. Cross-card bleed uses `width: calc(100% + var(--space-8) * 2)` and negative `margin-left` on card 2, scoped to `min-width: 769px` only
- **Brand pillar reveal:** `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` — left-to-right wipe timed to match the thread draw at 450ms. Uses `::after` pseudo-element with `content: attr(data-word)` to overlay gold colour on top of the near-invisible grey base
- **Extra alignment approach:** Three attempts before settling on the correct solution. `flex: 1` on copy gives bottom-aligned extras (wrong); JS equalization of copy heights created a circular grid-row-height dependency (wrong direction). Final fix: JS equalizes `.gap-card__extra` heights on load — equal extra heights + `flex: 1` on copy → equal copy heights → equal top-of-extra positions
- **Task 13 size change:** Background colour task for When Engaged section changed from Small to Medium — client has a specific brand colour direction that needs confirmation before implementing

### Output / artefacts produced
- `assets/files/homepage-demo-04.html` — updated with all 15 Small task changes
- `plan/playbook_website_tasks-23-03.xlsx` — column F populated for tasks 1–16

### Outstanding / next steps
- **Remaining Small tasks:** 17 (What We Do item 2 label), 18 (What We Do item 1 copy), 19 (What We Do item 5 copy), 21 (Playbook Model "Explore the Model" button fix), 22 (Playbook Model background texture), 24 (Sectors — rename Higher Education to Education), 25 (Sectors — add Residential to Private tab), 27 (Thought Leadership — article open/detail view), 30 (Contact — remove HQ/Locations block), 31 (Contact — add landline placeholder)
- **Medium tasks (skipped — dependencies):** 7, 13, 20, 23, 26, 28, 29, 32, 33
- Client sign-off on `homepage-demo-04.html` still required before Next.js component build begins
- Next session: continue with remaining Small tasks from the top of the list (task 17 first)

---

## Session — 2026-03-20 (Homepage demo v4 — content and design)

### What we worked on
- Created `homepage-demo-04.html` from the client content brief (`homepage-content-brief.md`) and tone of voice guide
- Updated all copy across the homepage to match the brief: hero, problem statement, where we sit, service areas, diagnostic CTA
- Replaced the nav guiding star icon with the official `Playbook_White_RGB.svg` wordmark inline SVG
- Iterated the hero: changed heading to "Clarity. Control. Confidence.", centred content vertically, darkened overlay, widened sub-text
- Rebuilt "The Problem" section as a 50/50 image/content split
- Rebuilt "Where We Sit" section twice — first as Option A (dark animated columns), then fully replaced with Option 1 (manifesto declaration rows with scroll-triggered slide-in animation)
- Added decorative `Playbook_Icon_Outline_White_RGB.svg` as large background element in "Where We Sit"
- Fixed services section image zoom bug using JS height lock; added sticky image panel and rounded corners
- Multiple copy and typography corrections throughout (font sizes, text colours, padding, underline fix)

### Key decisions
- **Hero heading:** "Clarity. Control. Confidence." replaces the previously confirmed "Organisations don't lack experience…" — client brief takes precedence
- **"Where We Sit" redesign:** Two full iterations. The manifesto row format (Option 1) was chosen as it makes each "We are" statement feel like a declaration rather than a list item. The contrast with the muted footnote treatment subordinates "We are not" appropriately.
- **Services image zoom fix:** `align-items: stretch` was causing the image panel to grow with hover-expanded rows. Fixed via a JS `lockHeight()` function that measures and pins the image frame height to the services list height on load — completely prevents zoom with no layout trade-offs.
- **Nav wordmark:** Switched from inline guiding star SVG + text to the official brand wordmark SVG. Fill colour controlled via CSS class `.wm` so it transitions white → black on scroll.
- **Decorative icon:** `Playbook_Icon_Outline_White_RGB.svg` used as a large background watermark in the "Where We Sit" section. Positioned bottom-right, bleeds off the edge, upright (no rotation), `opacity: 0.35`.

### Output / artefacts produced
- `assets/files/homepage-demo-04.html` — current homepage design candidate
- `assets/images/sections/homepage-section-02-woman-pondering.png` — used in "The Problem"
- `assets/images/sections/what-we-do-section-man-woman-at-laptop.png` — used in "What We Do"

### Outstanding / next steps
- Client sign-off on `homepage-demo-04.html` before moving to Next.js component build
- Sectors, Insights, and Diagnostic CTA sections may benefit from further image review
- The `homepage-demo-04.html` prototype should be used as the reference for all Phase 2 homepage component builds (replacing `homepage-demo.html` references in the project plan)
- Consider whether the "When We Are Engaged" section (three service area cards) needs further visual treatment

---

## Session — 2026-03-18 (Image library expansion)

### What we worked on
- Generated two new batches of images using the image-generator agent (Run 3 and Run 4)
- Run 3: 10 images — corrected age direction (25–40 years old replacing previous "senior" descriptors). Covered hero, services, sectors, and insights categories with professionals in formal/workplace contexts
- Run 4: 20 images — new casual lifestyle direction: no suits, no hard hats, no construction sites. Focused on everyday environments (cafés, plazas, lobbies, parks, rooftop terraces), families, couples, and community groups

### Key decisions
- **Age correction:** All people in generated images must be 25–40 years old. Prior runs produced elderly/senior subjects due to imprecise prompting. Direction corrected and saved to agent memory for all future runs.
- **Lifestyle category introduced:** Run 4 introduced a new `lifestyle/` image category not previously in the library — distinct from hero/services/sectors/insights. Covers human-scale, warm, candid-feeling imagery for use across the site.
- **No formal attire or site PPE:** Run 4 explicitly removed suits, hard hats, and construction site settings. Casual and smart-casual dress only going forward for people-inclusive images.
- **Families included:** First generation run to include family groups (couples with children, multi-generational groups). Grandparent figures capped at 50s–60s, active and healthy.
- **Ethnic diversity:** Explicitly briefed across Run 4 — South Asian, Black, East Asian, white British, and mixed-ethnicity subjects represented.

### Output / artefacts produced
- `assets/images/hero/` — 3 new images (`hero-rooftop-adviser-07.png`, `hero-atrium-mezzanine-08.png`, `hero-schedule-closeup-09.png`)
- `assets/images/services/` — 3 new images (`services-standing-desk-review-07.png`, `services-site-professional-female-08.png`, `services-risk-register-still-09.png`)
- `assets/images/sectors/` — 2 new images (`sectors-residential-mixed-use-05.png`, `sectors-transport-interchange-06.png`)
- `assets/images/insights/` — 2 new images (`insights-portrait-adviser-04.png`, `insights-membrane-structure-05.png`)
- `assets/images/lifestyle/` — 20 new lifestyle images covering couples, families, community groups, individuals, and architecture scenes
- `assets/images/generation-manifest-run3.json` and `generation-manifest-run4.json`
- `scripts/generate-images-run3.js` and `scripts/generate-images-run4.js`

### Outstanding / next steps
- Review generated images and shortlist which to use per page/section
- Session 2 (Design system — DS-01 through DS-07) remains the next build session
- Lifestyle imagery may be most useful for the homepage hero, Diagnostic CTA section, and sector pages — identify placement once DS is complete

---

## Session 2 — 2026-03-17 (Design system components) — NEXT SESSION

### Recommended tasks (DS-01 through DS-07)
All seven design system tasks are unblocked and ready to begin. Sequence within the session:

1. **DS-04** — Build the Section component and alternating section pattern (foundation for all page layout — do this first)
2. **DS-02** — Build the Typography component set (Heading h1–h4, Body, Caption, Label, Overline)
3. **DS-01** — Build the Button component (primary, secondary, ghost variants)
4. **DS-03** — Build the Card component (light and dark variants — depends on DS-01 and DS-02)
5. **DS-05** — Build the Tag/badge component
6. **DS-06** — Build the Divider and GuidingStar SVG component (source SVG path from `assets/files/` — do not approximate)
7. **DS-07** — Build the Image component wrapper; configure `cdn.sanity.io` in `next.config.ts` `images.remotePatterns`

### Pre-session checks
- Logo / guiding star SVG path should be confirmed in `assets/files/` before DS-06
- All components live in `web/components/` — create the directory if it does not exist
- Components must use only design tokens from `globals.css` `@theme` — no arbitrary values

### Session end state
Full design system available as reusable, typed components. No page-specific logic in any component. Session 3 (Layout) can begin immediately after.

---

## Session 1 — 2026-03-17 (Foundation scaffolding) — COMPLETE

### What we worked on
- FOUND-01: Scaffolded Next.js 16.1.7 project into `web/` subdirectory; cleared default example content
- FOUND-02: Configured all brand tokens in `globals.css` via Tailwind v4 `@theme` directive
- FOUND-03: Updated `layout.tsx` with Inter font (next/font/google), `lang="en-GB"`, brand metadata, analytics placeholder
- FOUND-04: Installed Sanity v5 packages; created insight, service, sector schemas; embedded Studio at `/studio`; created `.env.local` with placeholders
- FOUND-05: GitHub repo created at `https://github.com/stuart-byte-pm/playbook`; code pushed to `main`; Vercel project linked and deployed
- FOUND-06: Created all Phase 1 App Router route placeholders with correct TypeScript params types

### Key decisions
- **Tailwind v4:** `create-next-app@latest` scaffolds Tailwind v4 (not v3). No `tailwind.config.ts` exists — brand tokens live in `globals.css` via `@theme`. This is correct and intentional for v4.
- **Sanity v5 import path:** `structureTool` imports from `sanity/structure`, not `sanity/plugins/structure` (the v5 API changed). Build failed on first attempt; corrected in `sanity.config.ts`.
- **params in dynamic routes:** Next.js 16 requires `params` to be typed as `Promise<{ slug: string }>` and awaited — applied correctly to all three dynamic route placeholders.
- **turbopack.root:** Set in `next.config.ts` to suppress a workspace root detection warning caused by a `package-lock.json` in `C:\Users\Admin\`.
- **Studio hydration fix:** Removed nested `<html>/<body>` from `app/studio/layout.tsx` to fix a React hydration error.
- **Resend API key:** Not yet set up — deferred. Must be completed before Session 10 (FORM-01).
- **SANITY_WEBHOOK_SECRET:** Deferred to Session 8 (CMS-06) when the production URL is available.

### Output / artefacts produced
All files listed in CHANGELOG.md entry for 2026-03-17 Session 1.

### Manual steps required from user before Session 2
1. **Fill `web/.env.local`:** set `NEXT_PUBLIC_SANITY_PROJECT_ID` to the real Sanity project ID (from sanity.io/manage).
2. **Confirm Vercel deployment** is live — follow instructions in `web/VERCEL_SETUP.md` if not yet done.
3. **Confirm logo / guiding star SVG** is available in `assets/files/` before Session 3 (LAYOUT-01 requires it).

### Session 2 will cover
DS-01 through DS-07 — full design system component library.

---

## Session — 2026-03-17 (Phase 0 decisions)

### What we worked on
- Resolved all six Phase 0 pre-build decisions (PRE-01 through PRE-06)
- Updated `plan/PROJECT_PLAN.md` to record each decision, unblock dependent tasks, and add a new pre-launch task (LAUNCH-04)

### Key decisions
- **PRE-01** (Studio location): deferred — Vercel hosting confirmed; Studio defaults to embedded at `/studio` when Sanity is initialised in FOUND-04
- **PRE-02** (Sanity CDN): confirmed — `cdn.sanity.io` is acceptable; `next.config.ts` `images.remotePatterns` will be set in DS-07
- **PRE-03** (Analytics): deferred to post-launch — no analytics at launch; placeholder comment to be added in `app/layout.tsx`; ISR-04 moved to Phase 2 backlog
- **PRE-04** (Author field): single entity — all articles attributed to "Playbook Advisory Group"; no author schema required
- **PRE-05** (Article taxonomy): tags confirmed — initial tag set: governance, healthcare, regeneration, capital programmes, funding; filter UI built but can be hidden until 5+ articles exist
- **PRE-06** (Cookie consent): deferred to pre-launch — added as LAUNCH-04 (codebase audit for third-party scripts before Vercel deployment)

### Plan changes made
- Plan updated to 53 tasks total (added LAUNCH-04)
- Phase 0: 5/6 tasks complete (PRE-06 deferred to LAUNCH-04)
- Overall progress: 5/53 tasks complete (9%)
- Current phase advanced to Phase 1 — Foundation
- FOUND-04, DS-05, CMS-01, ISR-01 unblocked from their PRE dependencies
- ISR-04 marked as deferred (post-launch)
- Session 9 task list updated (ISR-04 removed); Session 12 updated (LAUNCH-04 added)

### Output / artefacts produced
- `plan/PROJECT_PLAN.md` — updated with all Phase 0 decisions recorded

### Next session: Session 1 — Foundation (FOUND-01 through FOUND-06)

**To start:** type `start session 1` and the frontend-developer agent will be invoked automatically.

**What Session 1 covers (75–90 min):**
1. **FOUND-01** — Scaffold Next.js 14+ App Router project with TypeScript strict mode, Tailwind CSS, ESLint. Clear default example content immediately after scaffold.
2. **FOUND-02** — Map all brand tokens into `tailwind.config.ts`: colours (black, gold, white, navy, paper-dark, mid-grey), font family (inter), spacing extensions.
3. **FOUND-03** — `styles/globals.css` with Tailwind directives, CSS custom properties, Inter font via `next/font/google`.
4. **FOUND-04** — Initialise Sanity project (embedded at `/studio`), define skeleton schema for `insight`, `service`, `sector` document types. Record project ID and dataset in `.env.local`.
5. **FOUND-05** — Connect Vercel project, configure all environment variables (Sanity project ID, dataset, API token, Resend API key, webhook secret), confirm first deployment resolves.
6. **FOUND-06** — Create full App Router directory structure for all Phase 1 routes with placeholder `page.tsx` on each. Set `<html lang="en-GB">` in root layout. Add analytics placeholder comment in root layout.

**Session 1 end state:** clean Next.js app deployed to Vercel, all routes resolving, design tokens active, Sanity Studio accessible at `/studio`, Inter font rendering, no TypeScript or lint errors.

**Pre-session checks before starting:**
- Confirm Node.js and npm are available in the terminal (`node -v`, `npm -v`)
- Confirm a Sanity account exists at sanity.io (free tier — needed for FOUND-04)
- Confirm a Vercel account exists and is linked to the Git repo (needed for FOUND-05)
- Logo file should be added to `assets/` before Session 3 (LAYOUT-01 requires it)

---

## Session — 2026-03-17 (project plan)

### What we worked on
- Created the full project plan for the Playbook Advisory Group website build
- Reviewed all existing brand and architecture documents before planning

### Key decisions
- Plan structured as 9 active phases + deferred backlog, across 13 sessions of 60–90 minutes each
- Confirmed sequencing: open decisions first, then scaffolding, then design system, then layout, then pages, then CMS, then forms, then QA, then launch
- Phase 2 items (case studies, about, sub-sector detail pages) formally deferred — not in active plan
- Sub-sector routing (`/sectors/public-sector/local-authority` etc.) deferred due to high copy requirement (11 sub-pages) — launch with three top-level sector pages only
- Contact form UI and Server Action split across two sessions (PAGE-05 builds the UI shell; FORM-01 wires the email) to keep sessions focused
- ISR on `/insights` uses on-demand revalidation via Sanity webhook rather than time-based revalidation — more appropriate for an editorial workflow
- Honeypot spam protection at launch (no reCAPTCHA — requires cookie banner); Turnstile deferred

### Output / artefacts produced
- `plan/PROJECT_PLAN.md` — 52-task plan with phase breakdown, session map, dependency chain, and deferred backlog

### Outstanding / next steps
- Resolve the six open decisions (PRE-01 through PRE-06) before session 1 begins
- Session 0 is a decision meeting, not a build session — estimate 30–45 minutes
- Once decisions are recorded, session 1 (scaffolding) can begin immediately
- Confirm brand logo file is in `assets/` before session 3 (LAYOUT-01 requires it)
- Confirm service page copy is cleared and ready before session 5 (PAGE-03)

---

## Session — 2026-03-09 (architecture planning)

### What we worked on
- Defined website requirements via Q&A (purpose, content types, editor profile, update frequency, integrations, page count, build ownership)
- Produced a full website architecture document for the Playbook Advisory Group marketing site

### Key decisions
- **Framework:** Next.js (App Router) — industry standard, native ISR, strong SEO primitives
- **CMS:** Sanity — chosen primarily for its non-technical editor UI (Studio); free tier covers this scale
- **Hosting:** Vercel — natural fit with Next.js, automatic deploys from Git, ISR handled natively
- **Contact form:** Resend handled via Next.js Server Action — not routed through CMS (cleaner separation)
- **Analytics:** Plausible recommended — privacy-first, no cookie banner required, £9/month
- **Rendering:** SSG for static pages; ISR for `/thinking/[slug]` and `/thinking` index, triggered by Sanity webhook on publish
- Site scope: 15 pages, marketing/brochure only, no authentication or portal

### Output / artefacts produced
- `architecture.md` — full proposed architecture with stack table, rendering strategy, routing structure, CMS content schema, deployment pipeline, SEO/performance targets, and open questions

### Outstanding / next steps
- Answer the six open questions in `architecture.md` before starting the build:
  1. Sanity Studio embedded in app (`/studio`) vs. hosted at subdomain?
  2. Confirm Sanity CDN for image hosting is acceptable
  3. Analytics: Plausible (£9/month), Vercel Analytics (Pro plan), or defer?
  4. Author field: single entity ("Playbook Advisory Group") or named individual advisors?
  5. Article tags/categories at launch or flat chronological list?
  6. Cookie consent: confirm no third-party tracking at launch (avoids need for banner)
- Once open questions resolved, begin project scaffolding (Next.js init, Sanity Studio setup, Vercel project connection)

---

## Session — 2026-03-09

### What we worked on
- Generated a client-ready Word document (`TONE_OF_VOICE.docx`) from the existing brand tone of voice markdown
- Styled the document to match the Playbook+ design system (navy/gold palette, typography scale, component patterns)

### Key decisions
- Used `python-docx` (already installed) rather than a Markdown converter — gives full control over colours, tables, and callout styling
- Output path set to `/assets` folder per user instruction (not alongside the source rules files)
- Cover page uses navy dark (`#111E35`) background simulated via a single-cell table spanning the page
- "After" callout blocks use navy mid background; "Before" blocks use surface grey — mirrors the design system's dark/light callout pair

### Output / artefacts produced
- `assets/TONE_OF_VOICE.docx` — 8-section client document with cover page, tables, and styled callouts

### Outstanding / next steps
- Review the `.docx` output and check rendering in Word / Google Docs
- Consider whether the cover page navy background needs to be a true full-bleed page (currently a table approximation — Word limits true page colour on cover only)

---

# Session Notes — 2026-03-09



## Other MCP servers configured (user-level):
- `vercel` — via `vercel@latest mcp start`
- `figma` — active and connected
