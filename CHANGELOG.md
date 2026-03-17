## [2026-03-17] — Project plan updated: Session 1 complete, Phase 2 active

### Changed
- `plan/PROJECT_PLAN.md` — FOUND-01 through FOUND-06 marked complete; Phase 1 100% done; current phase advanced to Phase 2 — Design system; overall progress updated to 11/53 tasks (21%); PRE-01 and PRE-05 notes updated to reflect actual implementation; CMS-01/02/03 notes updated to clarify skeleton schemas were created in FOUND-04 and these tasks expand them; all DS tasks confirmed unblocked
- `SESSION_NOTES.md` — Session 1 marked complete with accurate artefact list and decisions; Session 2 preview added with recommended task sequence
- `CLAUDE.md` — project structure updated to reflect `web/` subdirectory; Tailwind v4 and GitHub repo noted; open decisions section replaced

---

## [2026-03-17] — Session 1: Foundation scaffolding complete

### Added
- `web/` — Next.js 16.1.7 project (App Router, TypeScript, Tailwind CSS v4, ESLint)
- `web/app/globals.css` — Tailwind directives + all brand tokens via `@theme` + CSS custom properties in `:root`
- `web/app/layout.tsx` — Root layout with Inter font (next/font/google), `lang="en-GB"`, brand metadata, analytics placeholder comment
- `web/app/page.tsx` — Minimal homepage placeholder (default example content cleared)
- `web/sanity/schemas/insight.ts` — Insight document type with title, slug, publishedAt, excerpt, body, coverImage, tags
- `web/sanity/schemas/service.ts` — Service document type
- `web/sanity/schemas/sector.ts` — Sector document type
- `web/sanity/schemas/index.ts` — Schema barrel export
- `web/sanity/lib/client.ts` — Sanity fetch client (next-sanity createClient)
- `web/sanity.config.ts` — Sanity Studio configuration
- `web/app/studio/[[...tool]]/page.tsx` — Embedded Sanity Studio at `/studio`
- `web/app/studio/layout.tsx` — Isolated layout for Studio (no site header/footer)
- `web/app/the-playbook-model/page.tsx` — Route placeholder
- `web/app/services/[slug]/page.tsx` — Dynamic route placeholder
- `web/app/sectors/[slug]/page.tsx` — Dynamic route placeholder
- `web/app/insights/page.tsx` — Route placeholder
- `web/app/insights/[slug]/page.tsx` — Dynamic route placeholder with ISR intent
- `web/app/contact/page.tsx` — Route placeholder
- `web/.env.local` — Environment variable file (all values are placeholders — Sanity project ID needed)
- `web/VERCEL_SETUP.md` — Manual Vercel deployment instructions
- `web/next.config.ts` — turbopack.root set to suppress workspace root warning

### Notes
- Tailwind v4 scaffolded (not v3) — tokens configured via CSS `@theme`, no `tailwind.config.ts`
- Sanity v5.16.0 installed — `structureTool` imports from `sanity/structure`, not `sanity/plugins/structure`
- Build passes cleanly: all 7 routes compile, TypeScript clean, 0 errors
- FOUND-05 (Vercel deployment) requires manual steps — see `web/VERCEL_SETUP.md`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` must be filled before Sanity Studio at `/studio` is functional

---

## [2026-03-17] — Phase 0 decisions resolved

### Decided
- PRE-01: Sanity Studio embedded at `/studio` (Vercel hosting confirmed; location finalised at FOUND-04)
- PRE-02: Sanity CDN confirmed acceptable
- PRE-03: Analytics deferred to post-launch; ISR-04 moved to Phase 2 backlog
- PRE-04: Single entity author attribution ("Playbook Advisory Group")
- PRE-05: Article tags confirmed; initial tag set: governance, healthcare, regeneration, capital programmes, funding
- PRE-06: Deferred to LAUNCH-04 (pre-live third-party tracking audit)

### Changed
- `plan/PROJECT_PLAN.md` — all six Phase 0 decisions recorded; 7 dependent tasks unblocked; LAUNCH-04 added; ISR-04 deferred; plan advanced to Phase 1

---

## [2026-03-17] — Full project plan created

### Added
- `plan/PROJECT_PLAN.md` — comprehensive 52-task project plan covering all phases from open decisions through to launch

### Notes
- Plan covers 9 active phases (Pre-build, Foundation, Design system, Layout, Core pages, CMS integration, Insights/ISR, Forms, QA, Launch prep) plus a deferred backlog for Phase 2 items
- 13 sessions mapped, each sized at 60–90 minutes
- Six tasks marked blocked pending resolution of the six open decisions (PRE-01 through PRE-06)
- Phase 2 items (case studies, about, sub-sector detail pages) formally deferred with rationale recorded
- No code written this session — planning and documentation only

---

## [2026-03-09] — Website architecture document created

### Added
- `architecture.md` — proposed website architecture for Playbook Advisory Group marketing site

### Notes
- Stack decided: Next.js (App Router) + Sanity CMS + Vercel + Resend + TypeScript + Tailwind CSS
- Rendering strategy: SSG for static pages, ISR for article pages triggered by Sanity webhook
- Six open questions documented in `architecture.md` to resolve before build begins (Studio location, image hosting, analytics budget, author field, tags/categories, cookie consent)
- No code written this session — architecture only

---

## [2026-03-09] — Generated Tone of Voice Word document

### Added
- `assets/TONE_OF_VOICE.docx` — fully styled Word document built from `rules/brand/outputs/TONE_OF_VOICE.md`

### Notes
- Document is styled to the Playbook+ design system: navy/gold palette, Geist/Arial typography, A4 layout
- Includes: cover page (navy dark bg, gold overline), 8 content sections, Do/Don't table, words table, before/after callout blocks
- All generated assets directed to `/assets` folder per user preference
- Fixed `RGBColor` bytes-subclass attribute error (`rgb[0]` indexing instead of `.red/.green/.blue`)
