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
