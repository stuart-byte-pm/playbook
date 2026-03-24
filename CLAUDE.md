# Playbook Advisory Group — Claude Code Workspace

This is the development workspace for the Playbook Advisory Group marketing website. The project is currently in active build. Phase 1 (Foundation) is complete. Phase 2 (Design system) is next.

---

## What this project is

A B2B marketing website for Playbook Advisory Group — a senior-led, sponsor-side advisory practice specialising in capital programme governance. The brand is built around clarity, control, and confidence. The site must feel like a mature boutique advisory firm from Day 1, not a startup.

**Domain:** playbook-group.co.uk

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) | TypeScript throughout |
| Styling | Tailwind CSS | Mapped to design tokens |
| CMS | Sanity | Non-technical editor UI; free tier |
| Hosting | Vercel | Native ISR support |
| Email | Resend | Contact form via Server Action |
| Analytics | Plausible (preferred) | Privacy-first, no cookie banner |

**Rendering strategy:**
- SSG for all static pages
- ISR for `/insights/[slug]` and `/insights` index — revalidated by Sanity webhook on publish

---

## Project structure

The Next.js application lives in the `web/` subdirectory. All build commands run from `web/`.

```
/                           Workspace root
├── web/                    Next.js application (App Router, TypeScript, Tailwind v4)
│   ├── app/                Next.js App Router pages and layouts
│   ├── components/         Shared UI components (to be created in Session 2)
│   ├── lib/                Utilities, Sanity client, helpers
│   ├── sanity/             Sanity schema definitions and client
│   ├── public/             Static assets
│   ├── .env.local          Environment variables (not committed — see VERCEL_SETUP.md)
│   ├── next.config.ts      Next.js config (turbopack.root set; remotePatterns TBC in DS-07)
│   └── VERCEL_SETUP.md     Manual deployment instructions
├── assets/                 Brand files, PDFs, exported docs
├── plan/                   Project plan
│   └── PROJECT_PLAN.md     Full task plan with status, dependencies, session map
├── .claude/                Claude Code workspace config
│   ├── agents/             Agent definitions
│   ├── agent-memory/       Persistent agent memory by agent
│   └── commands/           Slash commands
├── CHANGELOG.md            Project changelog — update per session
├── SESSION_NOTES.md        Running session log — update per session
└── CLAUDE.md               This file
```

**GitHub:** `https://github.com/stuart-byte-pm/playbook`

---

## Design system

**Tokens file:** `assets/files/playbook-tokens.json` *(to be added)*
**Visual reference:** `assets/files/playbook-design-system.html` *(to be added)*

All colour, typography, spacing, and animation values must come from the token file. Do not introduce arbitrary values.

**Tailwind v4 note:** Tailwind v4 is in use. Design tokens are configured via the `@theme` directive in `web/app/globals.css` — there is no `tailwind.config.ts`. This produces identical utility class names (`bg-teal`, `text-gold`, `font-inter`, etc.). Do not attempt to create `tailwind.config.ts`.

### Core palette

The brand palette is defined in two tiers per `assets/files/playbook-consultancy-brand-foundations.pdf`.

**Primary**

| Token | Value | Use |
|---|---|---|
| `black` | `#000000` | Primary body text, high-contrast elements |
| `gold` | `#af7e56` | Accent, the guiding star mark, highlights |
| `white` | `#FFFFFF` | Page background |

**Supporting**

| Token | Value | Use |
|---|---|---|
| `teal` | `#264852` | Supporting backgrounds, headers |
| `peach` | `#ffdfae` | Alternating sections |
| `sand` | `#ebe7dc` | Secondary text, captions |
| `pale-blue` | `#c3dae2` | Cool-toned supporting backgrounds |

### Typography

Font family: **Inter** (primary, via Google Fonts — variety of weights available). Fallback: **Arial** (for in-house documents, presentations, and email only — not for the website). Maintain strict typographic hierarchy — this is the primary design signal on every page.

---

## Design prototype

`assets/files/homepage-demo.html` is a validated single-file HTML/CSS/JS prototype used for design sign-off before the Next.js build. It is not part of the production codebase. The following decisions were confirmed through this prototype and must be honoured in the Next.js build (Phase 2 components and Phase 4 page builds):

- **Playbook Model section** — auto-cycling 4-stage selector (Experience, Insight, Judgement, Institutional memory). Cycles every 3 seconds; click or arrow keys jump to a stage. Inactive stages at `opacity: 0.38`; active stage shows a gold progress bar animated via `@keyframes stageProgress`. The static step-box layout has been discarded.
- **Diagnostic CTA section** — split layout: content left, full-height image right (`services-governance-workshop-04.png`, `aspect-ratio: 4/5`) with a left-edge gradient overlay blending into the black background. A meet-in-middle entrance animation: left column from `translateX(-80px)`, image from `translateX(80px)`, both to `translateX(0)` at 600ms `cubic-bezier(0.2, 0, 0, 1)`. Mobile uses `translateY(40px)`. `prefers-reduced-motion` respected.
- **Dark section backgrounds** — the Model and Diagnostic CTA sections use black (`#000000`), not navy. Do not use teal for dark homepage section backgrounds.
- **Gap cards** — hover state uses black, not teal.
- **Rotating guiding star** — the decorative rotating `.hero__star-bg` SVG element has been rejected and removed. Do not reintroduce it in any form.
- **Hero heading copy** — confirmed: "Organisations don't lack experience. They lack a way to remember it."

---

## Brand standards (non-negotiable)

Full brand documents are in `assets/files/`. These govern all copy and design decisions.

- British English throughout: `programme` not `program`, `colour` not `color`, `judgement` not `judgment`
- Sentence case for all headings — never title case
- No exclamation marks in any formal or website copy
- Use Oxford comma: "clarity, control, and confidence"
- Named brand concepts always capitalised: the Playbook Paradox, the Capital Governance Diagnostic, the Memory Gap, the Translation Gap, the Decision Gap, the Governance Bridge
- The brand mark uses a **guiding star** (derived from the `+`), not a plain plus symbol — reference it as "the guiding star" in copy and code comments
- Brand positioning line: **"Clarity. Control. Confidence."** (primary) — do not alter or paraphrase
- Animation: subtle, purposeful, minimal — fade-ins and controlled transitions only; never decorative

**Words to avoid in copy:** leverage (as a verb), stakeholder alignment, value-add, bespoke, cutting-edge, world-class, best-in-class, excited, passionate, delighted

**Tone reference:** `assets/files/playbook-tone-of-voice.md`

---

## Site structure (Phase 1)

| Route | Type | Notes |
|---|---|---|
| `/` | Static | Hero, concept intro, service overview |
| `/the-playbook-model` | Static | Five-stage scroll-driven framework |
| `/services/[slug]` | Static | Five service pages |
| `/sectors/[slug]` | Static | Sector pages (public, private, infrastructure) |
| `/insights` | ISR | Article index, filterable |
| `/insights/[slug]` | ISR | Individual article template |
| `/contact` | Static | Enquiry form + office locations |

Phase 2 (not at launch): `/case-studies`, `/about`

Contact form routes to `hello@playbook-group.co.uk` via Resend Server Action.

---

## Agents available

| Agent | Trigger |
|---|---|
| `frontend-developer` | Building or modifying UI components, pages, layouts |
| `design-delivery` | Design progression (wireframe → mid-fi → hi-fi → prototype via Figma) |
| `project-discovery` | Pre-design Q&A to resolve unknowns before build begins |

---

## MCP servers

| Server | Scope | Notes |
|---|---|---|
| Figma | Global | Design context, screenshots, code generation |
| Framer | Project | `https://mcp.unframer.co/mcp` — API key in `.mcp.json` |
| Vercel | Global | Deployment management via `vercel@latest mcp start` |

---

## Open decisions — all resolved

All six pre-build decisions were resolved before Session 1. Outcomes:

1. **Sanity Studio location:** embedded at `/studio` in the Next.js app. Implemented.
2. **Sanity CDN:** confirmed acceptable. `cdn.sanity.io` to be added to `images.remotePatterns` in DS-07.
3. **Analytics:** deferred to post-launch. Placeholder comment in `web/app/layout.tsx`.
4. **Article author field:** single entity — "Playbook Advisory Group". No author schema required.
5. **Article tags:** confirmed at launch. Initial tag set: governance, healthcare, regeneration, capital programmes, funding.
6. **Cookie consent:** deferred to pre-live audit (LAUNCH-04). No third-party tracking in the build; confirm before production deploy.

---

## Development conventions (once build starts)

- TypeScript strict mode — no `any`
- Components: small, composable, named exports
- No inline styles — Tailwind classes only
- No magic numbers — use design tokens or CSS custom properties
- Semantic HTML — correct heading hierarchy, landmark elements, ARIA labels
- Mobile-first — base styles for mobile, enhanced for larger breakpoints
- Images: lazy loading, explicit dimensions, correct formats
- Accessibility: WCAG 2.1 AA minimum

---

## Session documentation

After every working session, update both:
- `CHANGELOG.md` — dated entries for completed artefacts and decisions
- `SESSION_NOTES.md` — what was worked on, key decisions, outstanding items

Use `/update-docs` to invoke the structured update command.
