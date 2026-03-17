# Playbook Advisory Group — Project Plan

**Last updated:** 2026-03-17
**Current phase:** Phase 2 — Design system: components
**Overall progress:** 12 / 54 tasks complete (22%)

---

## Summary table

| Phase | Tasks | Complete | % Done |
|---|---|---|---|
| 0 — Pre-build: open decisions | 6 | 5 | 83% |
| 1 — Foundation: scaffolding & tokens | 6 | 6 | 100% |
| 1a — Design prototype: homepage demo | 1 | 1 | 100% |
| 2 — Design system: components | 7 | 0 | 0% |
| 3 — Layout & navigation | 4 | 0 | 0% |
| 4 — Core static pages | 7 | 0 | 0% |
| 5 — CMS integration | 6 | 0 | 0% |
| 6 — Insights pages (ISR) | 5 | 0 | 0% |
| 7 — Contact form & email | 3 | 0 | 0% |
| 8 — QA & accessibility | 5 | 0 | 0% |
| 9 — Launch prep | 3 | 0 | 0% |
| Deferred backlog (Phase 2) | — | — | — |

---

## Phase 0 — Pre-build: open decisions

These six decisions must be resolved before any scaffolding begins. Tasks in phases 1–9 that depend on these decisions are marked blocked until confirmed. Record the outcome of each decision in this file under the relevant task's `notes` field.

---

### PRE-01
**Title:** Confirm Sanity Studio location
**Description:** Decide whether Sanity Studio will be embedded in the Next.js app at `/studio` (simplest, single deployment) or hosted separately at a subdomain such as `studio.playbook-group.co.uk`. The choice affects the Next.js app router structure, Sanity project configuration, and CORS settings. Acceptance: decision recorded and rationale noted.
**Phase:** Pre-build
**Status:** ✅ complete
**Session:** 0
**Depends on:** []
**Notes:** Decision: Studio embedded at `/studio` in the Next.js app. Implemented in FOUND-04. `app/studio/layout.tsx` isolates the Studio from the site chrome. CORS configured for `localhost:3000`.

---

### PRE-02
**Title:** Confirm Sanity CDN for image hosting
**Description:** Confirm that the Sanity-hosted CDN (`cdn.sanity.io`) is acceptable for serving insight article images and any CMS-managed assets. Acceptance: decision recorded; if not acceptable, an alternative hosting strategy (e.g. Vercel Blob, Cloudflare R2) is specified.
**Phase:** Pre-build
**Status:** ✅ complete
**Session:** 0
**Depends on:** []
**Notes:** Decision: confirmed — Sanity CDN (`cdn.sanity.io`) is acceptable. `next.config.ts` `images.remotePatterns` to be configured in DS-07.

---

### PRE-03
**Title:** Confirm analytics approach
**Description:** Select one analytics approach from: Plausible (£9/month, privacy-first, no banner required), Vercel Analytics (requires Pro plan at ~£20/month), or defer analytics to post-launch. Acceptance: decision recorded with chosen provider and any account setup steps noted.
**Phase:** Pre-build
**Status:** ✅ complete
**Session:** 0
**Depends on:** []
**Notes:** Decision: defer analytics to post-launch. ISR-04 (Plausible script integration) is deferred to Phase 2. A clearly commented placeholder is present in `web/app/layout.tsx`: `{/* TODO: Add Plausible Analytics script here once account is set up post-launch */}`.

---

### PRE-04
**Title:** Confirm article author field approach
**Description:** Decide whether insight articles carry a single author entity ("Playbook Advisory Group") or support named individual advisors with profile data. Acceptance: decision recorded; if named authors are chosen, define the minimum author schema fields (name, title, photo).
**Phase:** Pre-build
**Status:** ✅ complete
**Session:** 0
**Depends on:** []
**Notes:** Decision: single entity — all articles attributed to "Playbook Advisory Group". No author schema required. Named authors deferred to Phase 2 (DEF-05). Applied in `web/sanity/schemas/insight.ts`.

---

### PRE-05
**Title:** Confirm article taxonomy at launch
**Description:** Decide whether insight articles will support tags and/or categories for filtering at launch, or be presented as a flat chronological list. Acceptance: decision recorded; if tags are confirmed, define the initial tag set (suggested: governance, healthcare, regeneration, capital programmes, funding).
**Phase:** Pre-build
**Status:** ✅ complete
**Session:** 0
**Depends on:** []
**Notes:** Decision: tags confirmed. Initial tag set: governance, healthcare, regeneration, capital programmes, funding. Tag field present in `web/sanity/schemas/insight.ts`. Filter UI to be built in DS-05 and ISR-01; can remain hidden until five or more articles are published.

---

### PRE-06
**Title:** Confirm no third-party tracking at launch
**Description:** Confirm that no third-party tracking scripts (Google Analytics, Meta Pixel, HubSpot, etc.) will be used at launch, permitting the site to launch without a cookie consent banner. Acceptance: decision recorded; if any third-party tracking is required, a cookie consent library must be selected and integrated (adds one session of work).
**Phase:** Pre-build
**Status:** ↗ deferred — moved to pre-launch checklist (see LAUNCH-04)
**Session:** 0
**Depends on:** []
**Notes:** Decision deferred to pre-live review. LAUNCH-04 (added to Phase 9) requires this confirmation before the Vercel deployment proceeds. If any third-party tracking has been added during the build, a cookie consent library must be selected before going live.

---

## Phase 1 — Foundation: scaffolding & tokens

All six tasks complete. The Next.js app lives in `web/` subdirectory. Tailwind v4 was scaffolded (latest) — tokens live in `globals.css` via `@theme` rather than `tailwind.config.ts`. This is the correct v4 approach and produces identical utility class names.

---

### FOUND-01
**Title:** Scaffold Next.js project with TypeScript and Tailwind CSS
**Description:** Initialise a new Next.js 14+ App Router project with TypeScript strict mode, Tailwind CSS, and ESLint. Confirm the project builds and runs locally. Acceptance: `npm run dev` serves a blank page at `localhost:3000`; no TypeScript or lint errors; project committed to version control.
**Phase:** Foundation
**Status:** ✅ complete
**Session:** 1
**Depends on:** [PRE-01, PRE-02, PRE-03, PRE-04, PRE-05, PRE-06]
**Notes:** Next.js 16.1.7 scaffolded into `web/` subdirectory. Tailwind v4 used (not v3) — `create-next-app@latest` scaffolds v4 by default. Default example content cleared. Build passes cleanly.

---

### FOUND-02
**Title:** Configure Tailwind design tokens
**Description:** Map all brand colour, typography, and spacing tokens into `tailwind.config.ts` as named theme extensions. Colours: `black`, `gold`, `white`, `navy`, `paper-dark`, `mid-grey`. Font family: `inter`. No arbitrary values permitted anywhere in the codebase after this point. Acceptance: all tokens available as Tailwind classes (e.g. `bg-navy`, `text-gold`, `font-inter`).
**Phase:** Foundation
**Status:** ✅ complete
**Session:** 1
**Depends on:** [FOUND-01]
**Notes:** Tailwind v4 deviation: no `tailwind.config.ts` exists. All six brand colours and Inter font are configured via `@theme` directive in `web/app/globals.css`. Produces identical utility class names (`bg-navy`, `text-gold`, `font-inter`, etc.). This is the correct v4 approach.

---

### FOUND-03
**Title:** Configure global CSS and Inter font
**Description:** Set up `styles/globals.css` with Tailwind base/components/utilities directives, CSS custom properties for any values not expressible in Tailwind config, and the Inter font loaded via `next/font/google`. Acceptance: Inter renders at `localhost:3000`; no flash of unstyled text; CSS custom properties accessible globally.
**Phase:** Foundation
**Status:** ✅ complete
**Session:** 1
**Depends on:** [FOUND-01, FOUND-02]
**Notes:** `web/app/globals.css` contains Tailwind directives, `@theme` token block, and `:root` CSS custom properties. `web/app/layout.tsx` loads Inter via `next/font/google` with `lang="en-GB"` and analytics placeholder comment.

---

### FOUND-04
**Title:** Initialise Sanity project and schema skeleton
**Description:** Create a new Sanity project (via `npm create sanity@latest`), connect it to the Next.js repo (embedded at `/studio` per PRE-01 if confirmed), and define an empty schema skeleton with placeholder document types for `insight`, `service`, and `sector`. Acceptance: Sanity Studio accessible at `localhost:3000/studio`; schema compiles without errors; Sanity project ID and dataset name recorded in `.env.local`.
**Phase:** Foundation
**Status:** ✅ complete
**Session:** 1
**Depends on:** [FOUND-01, PRE-01, PRE-02, PRE-04, PRE-05]
**Notes:** Sanity v5.16.0 installed. Schemas created: `insight` (title, slug, publishedAt, excerpt, body, coverImage, tags), `service`, `sector`. Studio embedded at `/studio`. `app/studio/layout.tsx` fixed to remove nested `<html>/<body>` tags that caused a hydration error. `structureTool` imports from `sanity/structure` (v5 API path — not `sanity/plugins/structure`). Sanity project ID must be filled in `web/.env.local` before Studio is functional; CORS configured for `localhost:3000`.

---

### FOUND-05
**Title:** Connect Vercel project and configure environment variables
**Description:** Create a Vercel project linked to the Git repository, configure all required environment variables (Sanity project ID, dataset, API token, Resend API key), and confirm a successful deployment of the blank scaffold. Acceptance: production URL resolves; environment variables set in Vercel dashboard; preview deployments enabled for the main branch.
**Phase:** Foundation
**Status:** ✅ complete
**Session:** 1
**Depends on:** [FOUND-01, FOUND-04]
**Notes:** GitHub repo created at `https://github.com/stuart-byte-pm/playbook`. Code pushed to `main` branch. Vercel project linked and deployed. `web/VERCEL_SETUP.md` provides manual deployment instructions. Resend API key deferred — not yet set up. `SANITY_WEBHOOK_SECRET` to be set in Session 8 (CMS-06) when production URL is confirmed.

---

### FOUND-06
**Title:** Define project file structure and routing skeleton
**Description:** Create the full App Router directory structure for all Phase 1 routes: `/`, `/the-playbook-model`, `/services/[slug]`, `/sectors/[slug]`, `/insights`, `/insights/[slug]`, `/contact`, and `/studio`. Each route gets a minimal `page.tsx` returning a placeholder `<h1>`. Acceptance: all routes resolve in the browser without 404 errors; TypeScript compiles cleanly.
**Phase:** Foundation
**Status:** ✅ complete
**Session:** 1
**Depends on:** [FOUND-01]
**Notes:** All eight routes created. Dynamic routes (`/services/[slug]`, `/sectors/[slug]`, `/insights/[slug]`) type `params` as `Promise<{ slug: string }>` and await it — required by Next.js 16. Root layout has `<html lang="en-GB">`, Inter font, and analytics placeholder comment. `next.config.ts` has `turbopack.root` set to suppress workspace root detection warning from a `package-lock.json` in the user's home directory.

---

## Phase 1a — Design prototype: homepage demo

Single-file HTML/CSS/JS prototype at `assets/files/homepage-demo.html`. Validates layout, interaction, and design decisions before the Next.js build begins. Not part of the production codebase — design sign-off only. All decisions recorded here must be honoured in Phase 2 and Phase 4 (PAGE-01).

---

### PROTO-01
**Title:** Homepage prototype — design decisions validated and signed off
**Description:** Iterate `assets/files/homepage-demo.html` until all homepage section layouts, interactions, and copy are confirmed. Acceptance: all key design decisions recorded in this task and in `CLAUDE.md`; file committed; Next.js build may proceed against these decisions.
**Phase:** Design prototype
**Status:** ✅ complete
**Session:** 1a
**Depends on:** [FOUND-01, FOUND-02, FOUND-03]
**Notes:** Completed 2026-03-17. Confirmed design decisions:
- Playbook Model section: auto-cycling 4-stage selector (Experience, Insight, Judgement, Institutional memory). Cycles every 3 seconds via IntersectionObserver + setInterval. Click or arrow keys to jump to a stage. Inactive stages at opacity 0.38. Active stage shows gold progress bar animated via `@keyframes stageProgress`. Static step-box layout removed.
- Diagnostic CTA section: split layout — content left, full-height image right (`services-governance-workshop-04.png`, aspect-ratio 4/5) with left-edge gradient overlay. Meet-in-middle animation: left column from translateX(-80px), image from translateX(80px), both to translateX(0) at 600ms cubic-bezier(0.2, 0, 0, 1). Mobile uses translateY(40px). prefers-reduced-motion respected.
- Dark section backgrounds: black (`#000000`) used for Model and Diagnostic sections. Navy (`#271F57`) is NOT used for dark homepage section backgrounds.
- Gap cards: hover state uses black, not navy.
- Rotating guiding star decorative element: rejected. `.hero__star-bg` removed in full. Do not reintroduce.
- Hero heading copy confirmed: "Organisations don't lack experience. They lack a way to remember it."
- Belief section quote: "Every complex programme eventually writes its playbook. The only question is whether it is written before the mistakes or after them." — must render as a single unbroken line (no `display: block` on inline spans).
- Insights card spacing: uses explicit margin-bottom values per child element (image→meta: space-6, meta→title: space-4, title→excerpt: space-4, excerpt→link: space-6) rather than a gap property.

---

## Phase 2 — Design system: components

Build the shared component library before touching any page. Each component must be self-contained, use only design tokens, and have no page-specific logic. Phase 1 is fully complete — all DS tasks are now unblocked.

---

### DS-01
**Title:** Build the Button component
**Description:** Build a reusable `Button` component with primary (gold on navy), secondary (outline), and ghost variants. Supports `href` prop for anchor usage and `onClick` for interactive usage. Acceptance: all three variants render correctly at desktop and mobile sizes; no inline styles; fully typed props with TypeScript.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [FOUND-02, FOUND-03]
**Notes:** The primary CTA across the site is "Get in touch" — this is the component that drives all conversion actions.

---

### DS-02
**Title:** Build the Typography component set
**Description:** Build a set of typed typography components: `Heading` (h1–h4), `Body`, `Caption`, `Label`, and `Overline`. Each enforces the correct font size, weight, line height, and colour from the design tokens. Acceptance: all variants render in a local test page; hierarchy is visually correct; no arbitrary font sizes used anywhere.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [FOUND-02, FOUND-03]
**Notes:** Sentence case enforcement is a brand rule — add a JSDoc comment to the `Heading` component reminding developers never to use `text-transform: uppercase` or `capitalize` on headings.

---

### DS-03
**Title:** Build the Card component
**Description:** Build a reusable `Card` component for use on the insights index, services overview, and sector overview pages. Supports a title, optional overline label, body excerpt, and optional CTA link. Accepts `variant` prop for light and dark background versions. Acceptance: both variants render correctly; card is keyboard-focusable and has correct ARIA semantics.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [DS-01, DS-02]
**Notes:** The dark variant uses `bg-navy` with `text-white`; the light variant uses `bg-white` with `text-black`. Paper-dark (`#FADCC1`) alternating sections sit outside the Card — they are a layout-level concern.

---

### DS-04
**Title:** Build the Section component and alternating section pattern
**Description:** Build a `Section` layout component that wraps page content blocks, applies correct vertical padding, and accepts a `variant` prop to switch between white, navy, and paper-dark backgrounds. Acceptance: three background variants render correctly; padding is consistent; the alternating section pattern (white → paper-dark → white → navy) is achievable by composing Section instances.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [FOUND-02]
**Notes:** This is the primary layout building block for every page. Getting this right before page builds prevents padding/spacing inconsistency across the site.

---

### DS-05
**Title:** Build the Tag/badge component
**Description:** Build a `Tag` component for article taxonomy labels (insight article tags) and status labels. Small, pill-shaped, uses gold accent. Acceptance: renders at correct size with correct colours; can be used standalone or inside the Card component.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [FOUND-02, PRE-05]
**Notes:** PRE-05 confirmed — tags at launch. Initial tag set: governance, healthcare, regeneration, capital programmes, funding. Unblocked by PRE-05 and FOUND-02 both being complete.

---

### DS-06
**Title:** Build the Divider and decorative mark components
**Description:** Build a horizontal `Divider` component and a `GuidingStar` SVG component (the brand mark derived from the `+` symbol). The guiding star is used as a decorative accent in section headings and the brand mark. Acceptance: SVG renders at multiple sizes without distortion; `GuidingStar` accepts a `size` and `colour` prop.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [FOUND-02]
**Notes:** The guiding star is not a decorative emoji or a plain `+` — it is a specific brand mark. The SVG path must be sourced from the brand files in `assets/files/`. Do not approximate it.

---

### DS-07
**Title:** Build the Image component wrapper
**Description:** Build a project-level `Image` component wrapping `next/image` that enforces lazy loading, explicit `width`/`height` or `fill` usage, and correct `alt` text presence. Acceptance: component rejects missing `alt` at TypeScript level; renders correctly at multiple sizes; no layout shift on page load.
**Phase:** Design system
**Status:** ⬜ not started
**Session:** 2
**Depends on:** [FOUND-01]
**Notes:** Configure `next.config.ts` to add `cdn.sanity.io` to the `images.remotePatterns` list at this point (PRE-02 confirmed). This is the correct session to do it — before CMS work begins.

---

## Phase 3 — Layout & navigation

Build the persistent site chrome before any page content. Navigation and footer appear on every page and must be stable before page builds begin.

---

### LAYOUT-01
**Title:** Build the site header and navigation
**Description:** Build the `Header` component with the Playbook wordmark/logo, primary navigation links (The Playbook Model, Services, Sectors, Insights, Contact), and a "Get in touch" CTA button. Includes a mobile hamburger menu with animated drawer. Acceptance: navigation renders at all breakpoints; active route is highlighted; mobile menu opens and closes correctly; keyboard navigable with correct ARIA attributes.
**Phase:** Layout
**Status:** ⬜ not started
**Session:** 3
**Depends on:** [DS-01, DS-02, DS-06]
**Notes:** Use a transparent/dark header on the homepage hero and a solid navy header on all other pages — this requires a layout-level prop or context. Logo file must be sourced from `assets/` before this task begins.

---

### LAYOUT-02
**Title:** Build the site footer
**Description:** Build the `Footer` component with office addresses (Spencer Yard, Leamington Spa; Jewellery Quarter, Birmingham), contact email (`hello@playbook-group.co.uk`), LinkedIn link, privacy policy link, and legal notices link. Uses navy background with white/gold text. Acceptance: all links resolve or have placeholder `href`; footer is responsive; address markup uses `<address>` element.
**Phase:** Layout
**Status:** ⬜ not started
**Session:** 3
**Depends on:** [DS-02, DS-06]
**Notes:** The brand positioning line "Connecting you to clarity" may appear in the footer — confirm with brand documents before adding.

---

### LAYOUT-03
**Title:** Integrate header and footer into root layout
**Description:** Add `Header` and `Footer` to `app/layout.tsx` so they appear on every page. Confirm the layout renders correctly on all skeleton route pages. Acceptance: header and footer visible on all routes; no layout shift; `<main>` element wraps page content with correct landmark role.
**Phase:** Layout
**Status:** ⬜ not started
**Session:** 3
**Depends on:** [LAYOUT-01, LAYOUT-02, FOUND-06]
**Notes:** The `/studio` route must exclude the site header and footer — already handled by `app/studio/layout.tsx` (isolated layout created in FOUND-04).

---

### LAYOUT-04
**Title:** Build the page hero component
**Description:** Build a reusable `PageHero` component for internal pages (non-homepage). Accepts a title, optional subtitle, and optional overline. Uses navy background with white type. The homepage hero is a separate, bespoke component built in the next phase. Acceptance: renders correctly at all breakpoints; heading hierarchy is correct (h1 for the title); no layout shift on load.
**Phase:** Layout
**Status:** ⬜ not started
**Session:** 3
**Depends on:** [DS-02, DS-04]
**Notes:** This component will be used by: `/the-playbook-model`, `/services/[slug]`, `/sectors/[slug]`, `/insights`, `/contact`. Build it once here, use it everywhere.

---

## Phase 4 — Core static pages

Build pages in order of strategic priority: homepage first (the primary trust signal), then The Playbook Model (core brand narrative), then services, then sectors, then contact.

---

### PAGE-01
**Title:** Build the homepage
**Description:** Build the `/` homepage with: a bespoke hero section (headline, positioning line "Connecting you to clarity", CTA), a concept introduction section (the Playbook Paradox framing), a service overview grid (five services, each linking to `/services/[slug]`), and a sector signpost section. Acceptance: page renders correctly at all breakpoints; all CTAs link to correct routes; copy matches brand tone; page passes Lighthouse performance score of 90+ on mobile.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 4
**Depends on:** [LAYOUT-01, LAYOUT-02, LAYOUT-03, DS-01, DS-02, DS-03, DS-04]
**Notes:** Homepage hero is bespoke — separate from `PageHero`. Animation: subtle fade-in on hero headline only. No autoplay video at launch (adds complexity and performance risk). Copy must be sourced from brand documents before this session.

---

### PAGE-02
**Title:** Build The Playbook Model page
**Description:** Build the `/the-playbook-model` page as a scroll-driven five-stage framework presentation: Belief, Paradox, Structural Failure, The Playbook Model, Application. Each stage is a full-section block with a stage number, heading, and body copy. Acceptance: five stages render correctly; scroll progression is smooth; no JavaScript errors; copy references the Capital Governance Diagnostic and the Governance Bridge correctly.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 4
**Depends on:** [LAYOUT-03, LAYOUT-04, DS-02, DS-04, DS-06]
**Notes:** Scroll-driven animation should be CSS-based where possible (scroll-timeline or Intersection Observer) — avoid heavy animation libraries. The named brand concepts (the Playbook Paradox, the Memory Gap, the Translation Gap, the Decision Gap, the Governance Bridge) must be capitalised exactly as defined.

---

### PAGE-03
**Title:** Build the five service pages
**Description:** Build the `/services/[slug]` dynamic route with a static params list for all five services: `capital-investment-strategy`, `programme-governance`, `sponsor-side-advisory`, `health-diagnostics-and-recovery`, `funding-and-business-case`. Each page uses a shared template: `PageHero`, service description, key activities, and a contact CTA. Acceptance: all five slugs resolve without 404; `generateStaticParams` returns all five slugs; TypeScript compiles cleanly.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 5
**Depends on:** [LAYOUT-04, DS-01, DS-02, DS-04]
**Notes:** Service copy must be cleared for use before this session — confirm with brand documents. Note: services copy reflects client-side advisory and governance only until February 2027 (per brand positioning notes).

---

### PAGE-04
**Title:** Build the sector pages
**Description:** Build the `/sectors/[slug]` dynamic route with static params for the three top-level sectors: `public-sector`, `private-sector`, `infrastructure`. Each page includes: a hero, key challenges section, relevant advisory themes, and a contact CTA. Sub-sector pages (e.g. `local-authority`, `healthcare`) are deferred to Phase 2 unless copy is ready at launch. Acceptance: three top-level slugs resolve; `generateStaticParams` covers all three; no broken links.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 5
**Depends on:** [LAYOUT-04, DS-01, DS-02, DS-04]
**Notes:** Sub-sector routing (e.g. `/sectors/public-sector/local-authority`) is noted in the sitemap but the copy requirement is high. Three top-level sector pages at launch; sub-sector detail pages deferred to Phase 2 (DEF-04).

---

### PAGE-05
**Title:** Build the contact page
**Description:** Build the `/contact` page with: an enquiry form (fields: name, organisation, role, email, message, consent checkbox), two office location cards (Spencer Yard Leamington Spa; Jewellery Quarter Birmingham), and the contact email address. Form submission is a placeholder at this stage — wired to the Server Action in phase 7. Acceptance: page renders correctly; form fields are correctly labelled; office locations display accurately; page is accessible at WCAG 2.1 AA.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 5
**Depends on:** [LAYOUT-04, DS-01, DS-02, DS-04]
**Notes:** Do not wire the form to Resend in this task — that is FORM-01. Build the UI and validation only here to keep sessions focused.

---

### PAGE-06
**Title:** Build the insights index page (static shell)
**Description:** Build the `/insights` page as a static shell with the page hero, a placeholder article grid (three hard-coded mock articles), and the filter UI (tags confirmed in PRE-05). The CMS data connection is wired in phase 6. Acceptance: page renders with mock data; filter UI is present; layout matches design system; no CMS calls at this stage.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 6
**Depends on:** [LAYOUT-04, DS-02, DS-03, DS-04, DS-05]
**Notes:** Building the static shell first separates layout work from data-fetching work. The filter UI state can be managed with `useState` initially — no URL params needed until ISR is wired in.

---

### PAGE-07
**Title:** Build the insight article page (static shell)
**Description:** Build the `/insights/[slug]` page as a static shell with a mock article: title, overline date, body content (Portable Text placeholder), author attribution, and a "back to insights" navigation link. The CMS data connection is wired in phase 6. Acceptance: mock article renders correctly; typographic hierarchy is correct; no CMS calls at this stage.
**Phase:** Core pages
**Status:** ⬜ not started
**Session:** 6
**Depends on:** [LAYOUT-04, DS-02, DS-04]
**Notes:** Portable Text rendering requires `@portabletext/react` — install it in this session even though CMS data is not yet wired. This avoids a disruptive install during the CMS integration session.

---

## Phase 5 — CMS integration

Connect Sanity to the Next.js app. All tasks in this phase depend on FOUND-04 (Sanity initialisation) being complete and the open decisions resolved.

---

### CMS-01
**Title:** Define Sanity schema for insights articles
**Description:** Define the full `insight` document type schema in `sanity/schemas/insight.ts`: fields for title, slug, publishedAt, excerpt, body (Portable Text), coverImage, author (per PRE-04 decision), and tags (per PRE-05 decision). Acceptance: schema compiles without errors; all fields visible in Sanity Studio; slug field auto-generates from title; required fields enforced in Studio validation.
**Phase:** CMS integration
**Status:** ⬜ not started
**Session:** 7
**Depends on:** [FOUND-04, PRE-04, PRE-05]
**Notes:** PRE-04 and PRE-05 resolved. A skeleton `insight` schema was created in FOUND-04. This task expands it to the full production schema: adds Studio validation rules, slug auto-generation, required field markers, and the Portable Text body field configuration. Author field: single entity string ("Playbook Advisory Group"). Tags field: array of strings; initial set — governance, healthcare, regeneration, capital programmes, funding.

---

### CMS-02
**Title:** Define Sanity schemas for services and sectors
**Description:** Define `service` and `sector` document types in Sanity. Fields: title, slug, excerpt, body (Portable Text), and any sector-specific fields (e.g. `keyChallenge` array). Acceptance: both schemas compile; documents can be created in Studio; no field naming conflicts with the `insight` schema.
**Phase:** CMS integration
**Status:** ⬜ not started
**Session:** 7
**Depends on:** [FOUND-04]
**Notes:** Skeleton `service` and `sector` schemas were created in FOUND-04. This task expands them to full production schemas with Studio validation, required fields, and Portable Text body fields.

---

### CMS-03
**Title:** Build the Sanity client and GROQ query library
**Description:** Create `lib/sanity/client.ts` with the Sanity client configured for both server-side (authenticated) and client-side (CDN, unauthenticated) use. Create `lib/sanity/queries.ts` with typed GROQ queries for: all insights (index), single insight by slug, all services, and all sectors. Acceptance: queries return typed data; TypeScript strict mode passes; no `any` types in query return types.
**Phase:** CMS integration
**Status:** ⬜ not started
**Session:** 7
**Depends on:** [FOUND-04, CMS-01, CMS-02]
**Notes:** A basic `sanity/lib/client.ts` was created in FOUND-04. This task creates the full production client in `lib/sanity/` with proper server/client separation, and the typed GROQ query library. Use `next-sanity` for the client helper. Generate TypeScript types from the GROQ queries using the Sanity TypeGen CLI — do not hand-write types for CMS data.

---

### CMS-04
**Title:** Wire insights index page to Sanity
**Description:** Replace the mock data in the `/insights` page with live GROQ queries. Implement ISR with `export const revalidate = false` and a Sanity webhook trigger (configured in CMS-06). Acceptance: real articles from Sanity Studio appear on the insights index; stale content is revalidated when a new article is published; TypeScript compiles cleanly.
**Phase:** CMS integration
**Status:** ⬜ not started
**Session:** 8
**Depends on:** [CMS-03, PAGE-06]
**Notes:** Use `fetch` with `next: { tags: ['insights'] }` for on-demand ISR via webhook. Do not use `revalidate: number` (time-based) — on-demand revalidation is more appropriate for an editorial workflow.

---

### CMS-05
**Title:** Wire insight article page to Sanity
**Description:** Replace the mock data in `/insights/[slug]` with live GROQ queries. Implement `generateStaticParams` to pre-build all published articles at build time. Implement Portable Text rendering with `@portabletext/react` and a custom block components map that applies design system typography classes. Acceptance: articles render with correct formatting; `generateStaticParams` returns all published slugs; ISR revalidation works on publish.
**Phase:** CMS integration
**Status:** ⬜ not started
**Session:** 8
**Depends on:** [CMS-03, CMS-04, PAGE-07]
**Notes:** The Portable Text components map must handle: headings (h2, h3), body paragraphs, blockquotes, strong, em, and links. Do not allow the Portable Text renderer to introduce arbitrary font sizes or colours outside the design system.

---

### CMS-06
**Title:** Configure Sanity webhook and ISR revalidation
**Description:** Configure a Sanity webhook that fires on `insight` document publish events and calls the Next.js `app/api/revalidate/route.ts` endpoint. The endpoint validates the webhook secret and calls `revalidatePath('/insights')` and `revalidatePath('/insights/[slug]')`. Acceptance: publishing an article in Sanity Studio causes the insights pages to revalidate within 30 seconds; webhook secret is validated (reject unsigned requests with 401).
**Phase:** CMS integration
**Status:** ⬜ not started
**Session:** 8
**Depends on:** [CMS-04, CMS-05, FOUND-05]
**Notes:** The `SANITY_WEBHOOK_SECRET` environment variable must be set in both `web/.env.local` and the Vercel environment before this task begins. Deferred from Session 1 because the production URL was not yet confirmed.

---

## Phase 6 — Insights pages (ISR)

This phase refines the insights experience beyond basic CMS wiring — filtering, pagination, and SEO.

---

### ISR-01
**Title:** Implement article tag filtering on the insights index
**Description:** Wire the filter UI (built in PAGE-06) to the `tags` field from Sanity. Filter state should be reflected in the URL as a query parameter (`?tag=governance`) so filtered views are shareable and can be bookmarked. Acceptance: clicking a tag filters the article grid; URL updates; back button restores filter state; works without JavaScript (graceful degradation).
**Phase:** Insights
**Status:** ⬜ not started
**Session:** 9
**Depends on:** [CMS-04, PRE-05]
**Notes:** PRE-05 confirmed — tags at launch. Use Next.js `searchParams` in the Server Component to handle URL-based filtering without client-side state.

---

### ISR-02
**Title:** Add Open Graph and Twitter card metadata to article pages
**Description:** Add dynamic Open Graph metadata to `/insights/[slug]` using the `generateMetadata` export. Include: title, description (from article excerpt), `og:image` (from article cover image via Sanity CDN), and canonical URL. Acceptance: `og:title`, `og:description`, `og:image`, and `canonical` tags present in page `<head>`; metadata is article-specific (not shared across all articles).
**Phase:** Insights
**Status:** ⬜ not started
**Session:** 9
**Depends on:** [CMS-05]
**Notes:** The `og:image` should be served via `@sanity/image-url` to apply CDN transformations (width 1200, height 630, format webp). LinkedIn is the primary distribution channel for insight articles — test sharing preview in the LinkedIn post inspector.

---

### ISR-03
**Title:** Add site-wide SEO metadata and sitemap
**Description:** Add a root `metadata` export to `app/layout.tsx` with site name, default title template, and default Open Graph data. Generate a dynamic `sitemap.xml` at `app/sitemap.ts` covering all static pages and all published insight article slugs (fetched from Sanity). Acceptance: `sitemap.xml` resolves and lists all pages; title template applies correctly on all pages; no duplicate `<title>` tags.
**Phase:** Insights
**Status:** ⬜ not started
**Session:** 9
**Depends on:** [CMS-03, FOUND-06]
**Notes:** Also add `app/robots.ts` to disallow `/studio` from search crawlers.

---

### ISR-04
**Title:** Add Plausible Analytics script
**Description:** Add the Plausible Analytics script to the root layout (if Plausible is confirmed in PRE-03). Use `next/script` with `strategy="afterInteractive"`. Confirm the domain is registered in the Plausible dashboard. Acceptance: Plausible dashboard shows pageviews for the deployed site; no cookie banner required; script loads after interactive.
**Phase:** Insights
**Status:** ↗ deferred — analytics deferred to post-launch (PRE-03)
**Session:** post-launch
**Depends on:** [FOUND-06, PRE-03, PRE-06]
**Notes:** PRE-03 decision: defer analytics to post-launch. A clearly commented placeholder is present in `web/app/layout.tsx`. The placeholder comment reads: `{/* TODO: Add Plausible Analytics script here once account is set up post-launch */}`.

---

### ISR-05
**Title:** Test ISR revalidation end-to-end in production
**Description:** Publish a new test article in Sanity Studio on the production environment, confirm the webhook fires, and verify the insights index and article page update without a full site redeploy. Acceptance: new article appears on the live site within 60 seconds of publishing in Sanity Studio; no 500 errors in Vercel function logs; webhook secret validation confirmed.
**Phase:** Insights
**Status:** ⬜ not started
**Session:** 10
**Depends on:** [CMS-06, ISR-01, ISR-02, ISR-03]
**Notes:** This is an end-to-end test task — it requires a deployed production environment (not just local). Schedule after all CMS integration tasks are complete.

---

## Phase 7 — Contact form & email

---

### FORM-01
**Title:** Build the contact form Server Action
**Description:** Implement a Next.js Server Action in `app/contact/actions.ts` that: validates form inputs (name, organisation, role, email, message, consent), calls the Resend API to send a formatted email to `hello@playbook-group.co.uk`, and returns a success or error state. Acceptance: form submission sends an email to the correct address; validation errors are returned to the UI; no client-side API keys exposed; Resend API key stored in environment variables only.
**Phase:** Forms
**Status:** ⬜ not started
**Session:** 10
**Depends on:** [PAGE-05, FOUND-05]
**Notes:** Use `zod` for server-side validation — do not trust client-side validation alone. The confirmation email should include the sender's name, organisation, role, and message in a readable format. Consider sending an auto-reply confirmation to the sender. Resend API key not yet set up — must be done before this session.

---

### FORM-02
**Title:** Implement form success and error states in the contact page UI
**Description:** Wire the contact page form to the Server Action (FORM-01) and implement distinct success and error UI states. On success: replace the form with a confirmation message. On error: display inline field-level validation messages. Acceptance: form submits correctly; success state renders without a full page reload; error messages are associated with their fields using `aria-describedby`; all states are keyboard accessible.
**Phase:** Forms
**Status:** ⬜ not started
**Session:** 10
**Depends on:** [FORM-01]
**Notes:** Use `useFormState` (React 19 / Next.js 14 action state) for the success/error state management — avoids unnecessary client-side JavaScript.

---

### FORM-03
**Title:** Add spam protection to the contact form
**Description:** Add a honeypot field (hidden from users, visible to bots) to the contact form. The Server Action should reject submissions where the honeypot field is populated. Acceptance: honeypot field present in the DOM but visually hidden and not included in accessible form labels; Server Action rejects bot submissions silently (returns success to avoid feedback loops).
**Phase:** Forms
**Status:** ⬜ not started
**Session:** 10
**Depends on:** [FORM-01, FORM-02]
**Notes:** A honeypot is sufficient for a low-traffic B2B site at launch. Cloudflare Turnstile or hCaptcha can be added later if bot traffic increases. Do not use reCAPTCHA — it requires a cookie consent banner.

---

## Phase 8 — QA & accessibility

---

### QA-01
**Title:** Accessibility audit — all pages
**Description:** Run an automated accessibility audit across all pages using `axe-core` (via the browser extension or `@axe-core/playwright`). Fix all critical and serious violations. Acceptance: zero critical or serious axe violations on all Phase 1 pages; heading hierarchy is correct on every page; all images have descriptive `alt` text; all interactive elements are keyboard reachable.
**Phase:** QA
**Status:** ⬜ not started
**Session:** 11
**Depends on:** [PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, CMS-05]
**Notes:** Pay particular attention to: the mobile navigation drawer (focus trap), the contact form (field labelling), and the insights filter (ARIA live region for results count).

---

### QA-02
**Title:** Cross-browser and responsive QA
**Description:** Test all pages at mobile (375px), tablet (768px), and desktop (1280px, 1440px) breakpoints in Chrome, Firefox, and Safari. Fix any layout breaks or rendering inconsistencies. Acceptance: no layout overflow; text is readable at all sizes; interactive elements have sufficient touch target size (44×44px minimum); no horizontal scroll on mobile.
**Phase:** QA
**Status:** ⬜ not started
**Session:** 11
**Depends on:** [PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, CMS-05]
**Notes:** Safari on iOS is the highest-risk browser — test on a real device or BrowserStack. Flexbox gap and CSS Grid sub-grid have known Safari issues — check both.

---

### QA-03
**Title:** Lighthouse performance audit and optimisation
**Description:** Run Lighthouse on the production Vercel preview URL for all key pages. Achieve a minimum score of 90 for Performance, 95 for Accessibility, 100 for Best Practices, and 100 for SEO on desktop. Fix any issues below threshold. Acceptance: all four scores at or above threshold for homepage, service page (one representative), and article page.
**Phase:** QA
**Status:** ⬜ not started
**Session:** 11
**Depends on:** [ISR-02, ISR-03, FOUND-05]
**Notes:** Most common performance issues to check: unoptimised images, render-blocking scripts, large JavaScript bundles, missing `width`/`height` on images. Run on the Vercel preview URL, not `localhost` — network conditions matter for LCP.

---

### QA-04
**Title:** Content review and copy proofread
**Description:** Review all hard-coded copy across every page for: British English spelling, sentence case headings, correct capitalisation of named brand concepts, correct use of the Oxford comma, and absence of banned words. Acceptance: no American English spellings; no title case headings; all six named concepts correctly capitalised; no occurrences of "leverage", "stakeholder alignment", "value-add", "bespoke", "cutting-edge", "world-class", "best-in-class", "excited", "passionate", or "delighted".
**Phase:** QA
**Status:** ⬜ not started
**Session:** 11
**Depends on:** [PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05]
**Notes:** Run a codebase-wide search for each banned word before signing off. Also confirm the brand positioning line "Connecting you to clarity" has not been altered or paraphrased anywhere.

---

### QA-05
**Title:** End-to-end smoke test
**Description:** Perform a full manual walkthrough of the production site: navigate every route, submit the contact form, publish and verify an insight article via Sanity Studio, confirm all links resolve, and verify the site header and footer appear on every page. Acceptance: no broken links; contact form sends email; Sanity publish triggers ISR; no JavaScript console errors on any page; all pages load without visual regressions.
**Phase:** QA
**Status:** ⬜ not started
**Session:** 12
**Depends on:** [QA-01, QA-02, QA-03, QA-04, ISR-05, FORM-02]
**Notes:** This is the final gate before launch prep. Do not proceed to LAUNCH-01 until QA-05 is signed off.

---

## Phase 9 — Launch prep

---

### LAUNCH-01
**Title:** Configure custom domain and DNS
**Description:** Connect `playbook-group.co.uk` to the Vercel project. Configure DNS records (A record or CNAME) as specified by Vercel. Enable HTTPS (automatic via Vercel). Confirm the domain resolves and the SSL certificate is active. Acceptance: `https://playbook-group.co.uk` resolves to the production site; SSL certificate valid; `www.playbook-group.co.uk` redirects to the apex domain (or vice versa, per preference).
**Phase:** Launch prep
**Status:** ⬜ not started
**Session:** 12
**Depends on:** [QA-05]
**Notes:** Confirm domain registrar and DNS provider before this session — TTL propagation can take up to 48 hours. Plan accordingly.

---

### LAUNCH-02
**Title:** Configure production environment and final checks
**Description:** Confirm all environment variables are set correctly in the Vercel production environment (not just preview). Confirm Sanity webhook URL points to the production domain (not the preview URL). Confirm Plausible domain matches the production domain. Run Lighthouse one final time on `playbook-group.co.uk`. Acceptance: no environment variable is referencing a preview or local URL; all third-party integrations use production credentials; Lighthouse scores are at or above threshold on the live domain.
**Phase:** Launch prep
**Status:** ⬜ not started
**Session:** 12
**Depends on:** [LAUNCH-01, ISR-05, FORM-02]
**Notes:** Common launch mistakes: Sanity webhook still pointing to a preview URL; Resend `from` address not verified on the production domain; Plausible script using the wrong domain string.

---

### LAUNCH-03
**Title:** Seed initial content in Sanity Studio
**Description:** Create at least two published insight articles and all five service documents in Sanity Studio before launch, so the site does not go live with empty content pages. Acceptance: insights index shows at least two articles; all five service pages render CMS-sourced content; no placeholder text visible on the live site.
**Phase:** Launch prep
**Status:** ⬜ not started
**Session:** 12
**Depends on:** [CMS-01, CMS-02, LAUNCH-01]
**Notes:** This is a content task, not a development task. The client or a team member familiar with the brand must complete this. Provide a brief Sanity Studio guide (how to create and publish an article) before handover.

---

### LAUNCH-04
**Title:** Pre-live tracking and cookie consent review
**Description:** Before deploying to Vercel production, audit the entire codebase for any third-party tracking scripts (Google Analytics, Meta Pixel, HubSpot, LinkedIn Insight Tag, etc.). If none are present: confirm no cookie consent banner is required under UK PECR/GDPR and proceed with deployment. If any are found: select and integrate a cookie consent library before the domain goes live. Acceptance: audit complete; decision recorded; either (a) no third-party scripts confirmed and no banner required, or (b) consent library integrated and tested.
**Phase:** Launch prep
**Status:** ⬜ not started
**Session:** 12
**Depends on:** [QA-05]
**Notes:** This resolves PRE-06 (deferred from Phase 0). Run a codebase-wide search for `gtag`, `fbq`, `_linkedin_partner_id`, `hubspot`, and `analytics` before signing off. Plausible (if added) is cookieless and does not require a banner.

---

## Deferred backlog — Phase 2

These items are out of scope for the launch build. They are recorded here to prevent accidental scheduling and to preserve context for future planning.

| ID | Title | Reason deferred |
|---|---|---|
| DEF-01 | `/case-studies` index page | Content restrictions until February 2027; no case studies available at launch |
| DEF-02 | `/case-studies/[slug]` template | Depends on DEF-01 |
| DEF-03 | `/about` page | Team size does not warrant a people/about page at launch; credibility signalled via homepage instead |
| DEF-04 | Sub-sector detail pages (`/sectors/public-sector/local-authority` etc.) | High copy requirement; 11 sub-pages; defer until copy is confirmed |
| DEF-05 | Named author profiles in CMS | Single entity chosen at launch (PRE-04); re-evaluate when team grows |
| DEF-06 | Cookie consent banner | Only required if third-party tracking is added; not needed at launch if PRE-06 confirmed |
| DEF-07 | Downloadable PDFs in footer | PDFs not yet produced; placeholder link in footer until assets are ready |
| DEF-08 | Cloudflare Turnstile / hCaptcha on contact form | Honeypot sufficient at launch; add if bot volume increases |

---

## Session map

| Session | Phase | Tasks | Estimated duration |
|---|---|---|---|
| 0 | Pre-build decisions | PRE-01 – PRE-06 | 30–45 min (decision meeting, not build work) |
| 1 | Foundation | FOUND-01 – FOUND-06 | 75–90 min |
| 2 | Design system | DS-01 – DS-07 | 75–90 min |
| 3 | Layout | LAYOUT-01 – LAYOUT-04 | 75–90 min |
| 4 | Core pages (part 1) | PAGE-01, PAGE-02 | 75–90 min |
| 5 | Core pages (part 2) | PAGE-03, PAGE-04, PAGE-05 | 75–90 min |
| 6 | Core pages (part 3) + shells | PAGE-06, PAGE-07 | 60–75 min |
| 7 | CMS schemas + client | CMS-01, CMS-02, CMS-03 | 75–90 min |
| 8 | CMS wiring + ISR | CMS-04, CMS-05, CMS-06 | 75–90 min |
| 9 | Insights refinement + SEO | ISR-01, ISR-02, ISR-03 | 60–75 min |
| 10 | Contact form + email | ISR-05, FORM-01, FORM-02, FORM-03 | 75–90 min |
| 11 | QA | QA-01, QA-02, QA-03, QA-04 | 75–90 min |
| 12 | Final QA + launch | QA-05, LAUNCH-01, LAUNCH-02, LAUNCH-03, LAUNCH-04 | 90–105 min |
