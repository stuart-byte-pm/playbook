# Sector pages build plan

**Date:** 2 April 2026
**Scope:** 3 new sector pages — Public sector, Private sector, Infrastructure
**Source content:** `assets/files/playbook-wording-for-sector-pages.docx`

---

## Current state

- Route `web/app/(site)/sectors/[slug]/page.tsx` exists but is a stub (just renders the slug).
- Homepage `SectorsSection` has 3 cards (Public, Private, Infrastructure) but they are not linked — no `<a>` or `<Link>` wrapping.
- Sandbox images are already in `web/public/images/sandbox/`.
- Brand icon SVGs available in `web/public/images/brand-assets/icon/`.

---

## Page structure (all 3 pages follow the same template)

Each sector page will have these sections, top to bottom:

### 1. Hero banner (dark, black background)
- Full-width black background with decorative guiding star icons (matching contact page pattern — large star top-right at 12% opacity, small star bottom-left at 7% opacity)
- Label tag: sector name (e.g. "Public sector")
- h1 heading: sector-specific headline from the doc
- Intro paragraph: the opening copy from each sector section

### 2. "Where pressure is being felt" / "Where value is won or lost" summary
- White/light background section
- Left column: heading + intro copy
- Right column: bullet list of observed challenges
- Closing positioning statement (italic or highlighted)

### 3. Sub-sector cards grid
Each sector has multiple sub-sectors. These will be presented as expandable cards or dedicated sections:

**Public sector (3 sub-sectors):**
- Local authorities — image: `Town Centre 1.jpg`
- Healthcare — image: `Hospital 1.jpg`
- Education — image: `education.jpg`

**Private sector (5 sub-sectors):**
- High-rise residential — image: `High rise buid.jpg`
- Care homes & later living — image: `Hotel.jpg`
- Manufacturing — image: `Manufacturing 1.jpg`
- Commercial — image: `private sector.jpg`
- Regeneration — image: `Town Centre 2.jpg`

**Infrastructure (4 sub-sectors):**
- Utilities — image: `water.jpg`
- Highways & transport — image: `city.jpg`
- Logistics — image: `Manufacturing 2.jpg`
- Defence — image: `city 2.jpg`

### 4. Each sub-sector section includes:
- Section image (hero-style, with gradient overlay and guiding star pill SVG centred)
- "Structural sponsor challenges" — bullet list
- "Playbook's position" — bullet list
- "How we engage" — bullet list (where provided in the doc)
- "What this enables" — bullet list
- "Targeted risk & mitigation" — risk → mitigation pairs displayed as a styled list/table
- Positioning line (closing statement, if provided)

### 5. "How Playbook supports" summary section
- Teal or black background with decorative star
- Summary of Playbook's role across the whole sector
- Bullet points of capabilities
- "What this enables" outcomes

### 6. CTA / contact section
- Reuse the existing `DiagnosticCTA` or `ContactSection` component at the bottom
- Alternatively, a simpler CTA block linking to `/contact`

---

## Image assignments (sandbox → sub-sector)

| Sub-sector | Image file | Notes |
|---|---|---|
| Local authorities | `Town Centre 1.jpg` | Place-based regeneration feel |
| Healthcare | `Hospital 1.jpg` | Clinical/healthcare setting |
| Education | `education.jpg` | Education campus |
| High-rise residential | `High rise buid.jpg` | Developer-led scheme |
| Care homes & later living | `Hotel.jpg` | Residential/care facility |
| Manufacturing | `Manufacturing 1.jpg` | Industrial environment |
| Commercial | `private sector.jpg` | Commercial development |
| Regeneration | `Town Centre 2.jpg` | Town centre regeneration |
| Utilities | `water.jpg` | Utility infrastructure |
| Highways & transport | `city.jpg` | Urban transport/roads |
| Logistics | `Manufacturing 2.jpg` | Logistics/warehouse |
| Defence | `city 2.jpg` | Secure/institutional feel |

**Hero images per page:**
- Public sector hero: `Students 1.jpg` (people in institutional setting)
- Private sector hero: `Resi 1.jpg` (development/construction context)
- Infrastructure hero: `Manufacturing 3.jpg` (large-scale infrastructure)

---

## Decorative brand icons

Following the pattern established on the homepage and contact page:

- **Hero section:** Large `Playbook_Icon_White_RGB.svg` top-right (opacity 0.12, rotated 15deg) + small one bottom-left (opacity 0.07, rotated -10deg) — matching contact page exactly
- **Sub-sector image blocks:** `Playbook_Icon_Pill_White_RGB.svg` centred over each image (like DiagnosticCTA / contact page image treatment)
- **Summary section (dark bg):** `Playbook_Icon_Outline_White_RGB.svg` as large background element (like WhereWeSitSection pattern)

---

## Technical approach

### File changes

1. **`web/app/(site)/sectors/[slug]/page.tsx`** — Replace stub with full sector page component
   - `generateStaticParams()` returning `['public-sector', 'private-sector', 'infrastructure']`
   - `generateMetadata()` for SEO
   - Data-driven: sector content defined in a data file, rendered by shared layout

2. **`web/lib/sector-data.ts`** (new) — Structured data for all 3 sectors
   - All copy from the docx, organised by sector → sub-sectors
   - Image paths, slugs, metadata

3. **`web/components/SectorsSection.tsx`** — Update to wrap cards in `<Link href="/sectors/{slug}">`
   - Slugs: `public-sector`, `private-sector`, `infrastructure`

4. **`web/app/globals.css`** — Add sector page styles
   - Hero banner styles (reuse contact page pattern)
   - Sub-sector card/section styles
   - Risk & mitigation table styles
   - Responsive breakpoints

5. **`web/components/Nav.tsx`** — Verify sectors pages get standard (non-transparent) nav treatment (they should by default since they're not in the dark-hero list)

### Component structure within the page

```
SectorPage
├── SectorHero          — black bg, decorative stars, h1, intro
├── PressureSection     — challenges overview
├── SubSectorSection[]  — one per sub-sector, each containing:
│   ├── Image block     — with gradient + pill SVG
│   ├── Challenges list
│   ├── Position list
│   ├── Engagement list
│   ├── Outcomes list
│   └── Risk table
├── SupportSection      — dark bg summary
└── SectorCTA           — contact/diagnostic call to action
```

These will be inline sections within the page component, not separate component files, unless complexity warrants extraction.

---

## Routing / slugs

| Sector | Slug | Route |
|---|---|---|
| Public sector | `public-sector` | `/sectors/public-sector` |
| Private sector | `private-sector` | `/sectors/private-sector` |
| Infrastructure | `infrastructure` | `/sectors/infrastructure` |

---

## Decisions (confirmed)

1. **Sub-sector layout:** Full-width scroll-through sections with alternating backgrounds (white/sand/white) for visual rhythm.
2. **Risk & mitigation display:** Styled inline pairs with gold arrow separator — lightweight and on-brand.
3. **Hero images:** `Students 1.jpg` (public), `Resi 1.jpg` (private), `Manufacturing 3.jpg` (infrastructure).
4. **Nav links:** "Sectors" added as a top-level nav item with child dropdown listing all 3 sector pages.
5. **Bottom CTA:** Reuse existing `DiagnosticCTA` component.

---

## Build order

| Step | Task | Depends on |
|---|---|---|
| 1 | Create `web/lib/sector-data.ts` with all content | — |
| 2 | Build the sector page template in `sectors/[slug]/page.tsx` | Step 1 |
| 3 | Add sector page CSS to `globals.css` | Step 2 |
| 4 | Update `SectorsSection.tsx` to link cards to sector pages | Step 1 |
| 5 | Test all 3 pages, responsive behaviour, and navigation | Steps 2–4 |
| 6 | Polish — animations, hover states, final image review | Step 5 |
