## [2026-03-27] — Homepage build, contact page overhaul, site-wide Nav/Footer, route group restructure

### Added
- `web/components/Splash.tsx` — session-once splash screen (sessionStorage flag, 5.5s auto-dismiss, spinning guiding star, dictionary definition, wordmark)
- `web/components/Nav.tsx` — fixed nav with scroll state, mobile drawer, focus trap, progress bar
- `web/components/Hero.tsx` — full-viewport hero with video background, animated heading, scroll indicator
- `web/components/BeliefSection.tsx` — belief quote section with image and line-by-line reveal
- `web/components/WhereWeSitSection.tsx` — manifesto rows on black background with staggered animation
- `web/components/GapsSection.tsx` — three engagement cards (Before commitment, Under pressure, Independent assurance)
- `web/components/ServicesSection.tsx` — sticky image panel + accordion service rows
- `web/components/SectorsSection.tsx` — three sector cards with 3D tilt on hover
- `web/components/InsightsSection.tsx` — four insight cards (static placeholder, Sanity to be wired)
- `web/components/DiagnosticCTA.tsx` — split layout with meet-in-middle entrance animation, pill SVG overlay
- `web/components/ContactSection.tsx` — homepage enquiry form (placeholder, not wired to Resend)
- `web/components/Footer.tsx` — full site footer with nav columns and legal strip
- `web/components/RevealWrapper.tsx` — shared IntersectionObserver scroll reveal component
- `web/components/ArrowIcon.tsx`, `web/components/WordmarkSvg.tsx` — shared SVG utilities
- `web/app/(site)/layout.tsx` — shared site layout providing Nav + Footer to all site pages
- Splash CSS added to `web/app/globals.css`

### Changed
- **Route group restructure:** All site pages moved from `web/app/` into `web/app/(site)/` — Nav and Footer are now provided by the group layout automatically. Studio (`/studio`) remains outside the group and is unaffected.
- **Homepage `page.tsx`:** Nav, Footer removed (now in layout); Splash retained
- **Contact page — map:** Replaced Leaflet/OpenStreetMap with Google My Maps embed (`iframe`). Toolbar hidden via absolute positioning offset (`top: -90px`)
- **Contact page — building image:** Replaced pale-blue placeholder with `campus 1.jpg` + centred pill SVG overlay (matching DiagnosticCTA section), `border-radius: 20px`
- **Contact page — form:** Subject field changed from `<select>` to `<input type="text">` with placeholder "Please enter your subject line here". Only Name and Email are mandatory. Email placeholder updated to `yourname@email.com`. Submit button changed to `btn-primary` (gold) with `align-self: flex-start`
- **Contact page — layout:** Container switched to `.container` class for consistent centering. Header section given decorative guiding star treatment (large gold outline right, small white outline left — solid filled version on user request)
- **Contact page — header:** Decorative stars updated to solid white `Playbook_Icon_White_RGB.svg`
- **Nav:** Contact link updated to `/contact` (was `#contact`). Mobile drawer CTA updated to `/contact`
- **Hero:** "Talk to Playbook" CTA updated to `/contact`
- **DiagnosticCTA:** "Request the Diagnostic" CTA updated to `/contact`. Main image switched to Next.js `<Image priority>` to eliminate lazy-load delay
- **GapsSection, ServicesSection, SectorsSection, InsightsSection:** Section h2 headings converted from bare `reveal` class to `RevealWrapper` so they correctly animate into view
- **BeliefSection:** Gold icon inline style corrected (`right/bottom: auto`, `width/height` in style prop) to prevent `.belief__image img` CSS from stretching it full-size
- **ServicesSection:** `reveal-left` removed from image panel (was never observed, kept panel invisible)
- `web/app/globals.css` — added all component CSS, keyframes, splash styles, `form-label--required` rule

### Fixed
- Multiple section headings invisible on load due to `reveal` class never receiving `is-visible` (fixed by using `RevealWrapper`)
- BeliefSection gold icon filling entire image container (fixed by moving dimensions to inline style)
- ServicesSection sticky image panel invisible (fixed by removing unobserved `reveal-left`)
- DiagnosticCTA slow perceived load (image now `priority`, IntersectionObserver threshold reduced to `0.05`)
- Splash `animation: ... both` fill mode causing invisible content (animation removed from `.splash__inner`)
- Stale `.next/types` cache after route group restructure (cleared)
- Contact page containers not centering (switched from ad-hoc inline `max-width` to `.container` class)

### Notes
- Insights section uses static placeholder articles — Sanity CMS wiring deferred
- Contact form on homepage uses simulated 1.2s delay — Resend Server Action deferred (FORM-01)
- `PlaybookModelSection` removed from homepage per user instruction (section deleted from design)
- Google My Maps embed requires third-party cookies — will show "refused to connect" in incognito; works in normal browser windows

---

## [2026-03-24] — Contact page: final updates — coordinates, icons, address, copy

### Changed
- **Map marker coordinates:** Updated all three Leaflet map pins with accurate GPS coordinates provided by user: office (52.286284949749955, -1.5346219368765222), train station (52.28450574324147, -1.5358281721167362), car park (52.284774744856804, -1.5336335173679758)
- **Map marker icons:** Swapped office and car park icons — office now shows `🅿`, car park now shows `P` (reversed from initial implementation)
- **Car park name:** Updated all references from "Covent Garden Car Park" to "Bath Street Car Park" in `ContactMap.tsx`, `ContactPageClient.tsx`, and map legend
- **Address:** Added postcode `CV31 3SY` to the contact details address block
- **Contact intro copy:** Removed the paragraph "Playbook operates as an extension of the senior leadership team…" from the contact details section

### Notes
- All coordinate updates deployed; map pins now positioned accurately on Spencer Yard office, Leamington Spa railway station, and Bath Street car park
- Icon swap rationale: office location now uses the parking icon, car park now uses the `P` label — user-requested adjustment
- Address block now includes full postcode for improved clarity and searchability

---

## [2026-03-24] — Contact page: full layout, form, Leaflet map with proximity markers

### Added
- `web/app/contact/page.tsx` — Server component with SEO metadata (title, description)
- `web/app/contact/ContactPageClient.tsx` — Full contact page: two-column grid (form left, details/map/image right), sand background, teal page header with gold eyebrow label
- `web/app/contact/actions.ts` — Server action stub for form submission (validates required fields, logs to console, returns success state — Resend not yet wired)
- `web/components/ContactMap.tsx` — Client-side Leaflet + OpenStreetMap interactive map with three custom SVG markers: office, Leamington Spa railway station, Bath Street car park. Each marker has a popup label with walking time. Map legend below.
- `leaflet`, `react-leaflet`, `@types/leaflet` — added to `web/package.json` dependencies

### Notes
- Contact form fields match the homepage demo exactly: Name, Organisation, Email, Subject (dropdown with 5 options), Message, Submit with arrow icon
- All styling uses design system tokens with CSS custom property fallbacks — no arbitrary values
- Form submission is stubbed: logs to console and shows a branded success message. Resend integration deferred to a future session (FORM-01)
- Phone number placeholder: "Number to be confirmed"
- Building image: pale-blue placeholder box with "Coming soon" label
- Homepage contact section retained as-is (user decision); nav/hero CTAs not updated yet (homepage not built)
- Map uses dynamic import (`next/dynamic` with `ssr: false`) to avoid Leaflet SSR issues
- Leaflet CSS imported dynamically at runtime with `@ts-expect-error` for the CSS module import

---

## [2026-03-24] — Brand colour update, design system sync, decorative icon treatment, deployment fixes

### Changed
- **Brand colour palette — full rename and revalue** across all active project files:
  - `gold`: `#AB7F58` → `#af7e56`
  - `navy` → `teal`: `#271F57` → `#264852`
  - `paper-dark` → `peach`: `#FADCC1` → `#ffdfae`
  - `mid-grey` → `sand`: `#F4F4F4` → `#ebe7dc`
  - New colour added: `pale-blue` `#c3dae2`
- **Brand positioning line** updated from "Connecting you to clarity" to "Clarity. Control. Confidence." across all files
- **Files updated with new palette:** `assets/files/playbook-design-system.html`, `CLAUDE.md`, `.claude/rules/playbook-design-tokens.json`, `web/app/globals.css`, `plan/PROJECT_PLAN.md`, `assets/files/homepage-demo-04.html`, `web/public/demos/homepage-demo-04.html`
- **Task 13 — "When we are typically engaged" section background:** Changed from `sand` to `teal` (`#264852`). Removed the grey sketch background image (`background-image-04.png`) which was opaque and masked the colour change. Section heading and label tag updated to white/on-dark variants.
- **Guiding star decoration — gaps section:** Two instances of `Playbook_Icon_White_RGB.svg` added as `::before`/`::after` pseudo-elements on `.gaps`. Large (500px, 7% opacity, rotated 20°) top-right bleeding off edge; small (260px, 5% opacity, rotated −10°) bottom-left. `.gaps` given `position: relative; overflow: hidden`.
- **Guiding star decoration — model section:** Replaced generic repeating dot pattern on `.model-band::after` with two instances of `Playbook_Icon_Outline_Gold_RGB.svg` via CSS multiple backgrounds. Large (420px) bottom-left; small (175px) top-right — diagonal inverted from gaps section. `isolation: isolate` added to `.model-band`; `::after` set to `z-index: -1` to ensure icons sit behind stage cards. Opacity: 0.6.

### Fixed
- **`web/public/demos/homepage-demo-04.html` sync:** File was 370 lines behind `assets/files/homepage-demo-04.html` — splash screen and multiple session changes were missing from the deployed version. Copied authoritative assets file over the public file.
- **Hero video path:** `src` was `../../web/public/videos/istockphoto-931929622-640_adpp_is.mp4` (relative to `assets/files/`) — broken on Vercel. Corrected to `../videos/istockphoto-931929622-640_adpp_is.mp4` (relative to `/demos/`).

### Notes
- `web/public/demos/homepage-demo-04.html` must always be kept in sync with `assets/files/homepage-demo-04.html` — they diverge easily. Copy assets → public before every commit.
- The `../videos/` path works on Vercel but will not resolve if `assets/files/homepage-demo-04.html` is opened directly in a browser locally.
- `pale-blue` (`#c3dae2`) has been added to the token system but is not yet used in the prototype.

---

## [2026-03-24] — Homepage demo v4: client feedback pass — tasks 17–31 + service row bug fix

### Changed
- **What We Do item 2 label (task 17):** Service row 02 renamed from "Programme governance" to "Programme setup and governance" (`aria-label` and `<h3>` updated).
- **What We Do item 1 copy (task 18):** Appended sentence to Capital investment strategy description: "Establishing the context to which successful funding applications will need to respond."
- **What We Do item 5 copy (task 19):** Appended sentence to Funding and business case advisory description: "We specialise in creating compelling cases that respond to the strategic context to maximise opportunity to secure funding for capital investments."
- **Playbook Model "Explore the model" button (task 21):** `href="#"` changed to `href="/the-playbook-model"` so the button navigates to the correct page rather than the top of the current page.
- **Playbook Model background texture (task 22):** Added `.model-band::after` CSS rule with a repeating 64px guiding star SVG data URI pattern (8-ray North Star motif) at 5% opacity over the black background. `.model-band__header` and `.model-stages` given `position: relative; z-index: 1` to sit above the pattern.
- **Sectors — rename "Higher Education" to "Education" (task 24):** Tag text and card description updated in the Public sector card ("higher education institutions" → "education institutions").
- **Sectors — add "Residential" to Private sector (task 25):** `<span class="tag">Residential</span>` added to the Private sector card tag list.
- **Thought Leadership — article open/detail view (task 27):** Implemented full-screen article overlay system. Each "Read article" link now opens a full-screen white overlay containing the complete article. Article overlay CSS added; three article HTML elements inserted before `<!-- FOOTER -->`; JS wires `.insight-card__link` click events to open the correct overlay, with back-button and Escape-key dismiss.
- **Contact — remove HQ/Locations block (task 30):** Headquarters (Spencer Yard) and Midlands (Jewellery Quarter) address entries removed from contact section.
- **Contact — add landline placeholder (task 31):** Telephone entry added to contact details with "Number to be confirmed" placeholder text. `aria-label` updated from "Our offices" to "Contact details".

### Fixed
- **Service row expand clipping bug:** `.service-row:hover .service-row__desc` `max-height` increased from `5rem` to `12rem`. The `5rem` cap was set before tasks 18 and 19 appended second sentences to items 1 and 5, causing the expanded description to be clipped on hover.

### Notes
- All remaining Small tasks (17–31, excluding blocked Medium tasks) are now complete.
- Medium tasks still outstanding: 7, 13, 20, 23, 26, 28, 29, 32, 33 — all have dependencies requiring client input or are deferred.
- `homepage-demo-04.html` is now ready for client sign-off review.

---

## [2026-03-23] — Homepage demo v4: client feedback pass — tasks 1–16

### Changed
- **Loading screen (task 1):** Full-screen black splash overlay with Playbook wordmark SVG (200px), spinning guiding star icon (72px), animated "Loading…" label with pulsing dots. Session-once via `sessionStorage`; auto-dismisses at 6 seconds (500ms fade-out, then DOM removal). Wordmark `margin-bottom: -3rem` compensates for SVG viewBox whitespace.
- **Nav logo (task 2):** Wordmark height increased to 88px. `max-width` and `margin-inline: auto` removed from `.nav__inner`; left padding reduced to 24px so logo is prominent and left-pinned at all viewport widths.
- **Hero sub-headline copy (task 3):** Replaced with client-supplied line: "Playbook brings structure to complex programmes, guiding the right people to the right decisions with clear thinking, healthy challenge, and experience-led advice."
- **Playbook Model intro copy (task 4):** Added second paragraph: "We strengthen the decisions that shape major programmes — and bring them under control when it matters most. Operating between board oversight and technical delivery, we remain independent from execution: ensuring decisions are clear, objective, and defensible."
- **Hero CTA (task 5):** Removed "The Capital Governance Diagnostic" button. "The Playbook Model" button promoted from `btn-ghost` to `btn-primary` as the sole hero CTA.
- **Hero button scroll target (task 6):** Added `scroll-padding-top: 120px` to `html` element to prevent fixed nav obscuring scroll targets. `href="#model"` and `id="model"` already matched.
- **Problem section scroll target (task 8):** Added `id="where-we-sit"` to the Where We Sit section; updated "How we work" button `href` from `#` to `#where-we-sit`.
- **Problem section copy (task 9):** Split closing paragraph into two — "By the time issues become visible, risk is already embedded." as its own paragraph; "We work with sponsors and senior leaders…" as a standalone conclusive statement.
- **Where We Sit point 04 (task 10):** Updated to "Independent from technical delivery and execution."
- **Where We Sit firm descriptors (task 11):** Removed "A delivery-led project management firm." Retained "A design & construction consultancy" (ampersand corrected from "or") and "Embedded resource or capacity support."
- **Golden thread animation (task 12):** `.gap-card__divider` redrawn as a `scaleX` animation with `transform-origin: left` for a left-to-right thread-pull effect. Card 2 divider bleeds past both left and right physical card edges (`width: calc(100% + space-8 * 2); margin-left: -space-8`); card 3 bleeds past left edge only — creating a continuous uninterrupted thread across all three cards. Bleed rules scoped to `min-width: 769px`. JS `mouseenter` permanently adds `.is-threaded` so the thread accumulates across cards on first hover and stays lit.
- **Brand pillar watermarks + copy (tasks 14–16):** Each gap-card has an absolutely positioned `.gap-card__pillar` element (top-right, 2.25rem bold). Base state: near-invisible grey (`rgba(0,0,0,0.07)`). On hover/threaded: gold colour (`#AF7E56`) revealed via `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` left-to-right wipe at 450ms, matching the thread draw timing. `line-height: 1.3` prevents descender clipping. Added `.gap-card__extra` paragraph to each card: card 1 "We take ownership…", card 2 "We can provide swift diagnosis…", card 3 "We continue looking after the clients' interests…"
- **Gap-card extra alignment fix (tasks 14–16, post-implementation):** `.gap-card__copy` given `flex: 1` so it fills remaining card height. JS `equalizeGapCardExtras()` runs on `window.load` and `resize`: resets `minHeight` on all `.gap-card__extra` elements, measures natural heights, sets all to the tallest value. Equal extra heights → equal space consumed by flex copy → all three extra paragraphs top-aligned at the same y-position.
- `plan/playbook_website_tasks-23-03.xlsx` — column F "Comments" populated for tasks 1–16; task 13 size changed to Medium.

### Notes
- Tasks 7 (Problem section image), 13 (When Engaged background colour), and 20, 23, 26, 28, 29, 32, 33 are Medium tasks with dependencies — skipped this session.
- Tasks 17–19, 21–22, 24–25, 27, 30–31 are Small tasks remaining for the next session.
- `homepage-demo-04.html` remains the sign-off candidate; no Next.js build work this session.

---

## [2026-03-20] — Homepage demo v4: full content rewrite and design iteration

### Added
- `assets/files/homepage-demo-04.html` — new homepage prototype based on the client content brief and tone of voice guide; built from `homepage-demo.html` with structural and copy changes throughout
- `assets/files/homepage-content-brief.md` — client-supplied content brief for the homepage (all six sections: Hero, The Problem, Where We Sit, What We Are/Not, Three Service Areas, Diagnostic CTA)
- `assets/images/sections/homepage-section-02-people-in-square.jpg` — new lifestyle image (trialled, not used)
- `assets/images/sections/homepage-section-02-people-in-square-02.png` — new lifestyle image (trialled, not used)
- `assets/images/sections/homepage-section-02-woman-pondering.png` — image used in "The Problem" section
- `assets/images/sections/what-we-do-section-man-woman-at-laptop.png` — image used in "What We Do" services section

### Changed
- **Hero section:** heading changed to "Clarity. Control. Confidence." (client positioning line); JS word animation updated to match; sub-text updated to brief copy; overlay darkened significantly; hero content centred vertically; `hero__sub` max-width set to `80ch`; `justify-content` changed from `flex-end` to `center`
- **Nav wordmark:** guiding star SVG icon + text divs replaced with inline `Playbook_White_RGB.svg` wordmark paths; height set to `64px`; CSS fill transitions on scroll (white → black)
- **"The Problem" section** (was: Belief/Paradox): quote, body copy, and label updated to client brief; restructured as 50/50 split with image left, content right; `align-items: stretch` so image matches content height; `belief__body` uses flex column; `align-self: flex-start` added to `.belief__link` to fix full-width underline bug; body copy font size corrected to `--size-body` (16px)
- **"Where We Sit" section** (new, replaces Three Gaps): two complete redesigns this session — Option A (dark columns with staggered animation) then Option 1 (manifesto declaration rows). Final version: black background, two-column header (title + intro), four full-width numbered declaration rows that slide in from left on scroll with gold left-border draw animation, hover state (text brightens and translates right), "We are not" footnote line; `Playbook_Icon_Outline_White_RGB.svg` added as large decorative background element (bottom-right, 775px, `opacity: 0.35`, straight/upright); `padding-left` added to rows for number spacing; all text set to white
- **"When We Are Engaged" section** (replaces Three Gaps): uses existing `.gap-card` structure; content updated to the three service areas: Before commitment (Clarity), Under pressure (Control), Independent assurance (Confidence)
- **Services section:** heading updated to "Sponsor-side advisory, independent from delivery"; image swapped to `what-we-do-section-man-woman-at-laptop.png`; background behind image changed from mid-grey to white; image panel made `position: sticky; top: 120px`; image frame given `aspect-ratio` removed in favour of JS-locked height (matches services list height, prevents zoom on row hover); `border-radius: 20px` added to image frame; caption text removed
- **Diagnostic CTA section:** label updated to "Every engagement begins with clarity"; body copy updated to brief Section 6 language
- **"The Problem" / "Where We Sit" gap:** `padding-block-start: 0` on `.where-we-sit` replaced with black background providing natural visual separation
- `assets/files/homepage-demo-04.html` — `belief__copy` and `where-we-sit__intro` font sizes corrected from `--size-body-lg` (18px) to `--size-body` (16px)

### Notes
- `homepage-demo-04.html` is the current design sign-off candidate — replace `homepage-demo.html` references in build tasks with this file
- The "Where We Sit" section went through two full redesigns before landing on the manifesto row format — Option A (dark columns) was built and discarded in the same session
- JS image height lock on services panel (`lockHeight()` function) prevents zoom artefact caused by `align-items: stretch` interacting with hover-expanded service rows

---

## [2026-03-18] — Image library expanded: 30 new lifestyle and architectural images generated

### Added
- `assets/images/` — 30 new images across two generation runs (Run 3 and Run 4)
- `assets/images/hero/` — 3 new hero compositions: rooftop adviser, civic atrium mezzanine, programme schedule close-up (`hero-rooftop-adviser-07.png`, `hero-atrium-mezzanine-08.png`, `hero-schedule-closeup-09.png`)
- `assets/images/services/` — 3 new services images: standing desk review, female professional on site, risk register annotation still-life (`services-standing-desk-review-07.png`, `services-site-professional-female-08.png`, `services-risk-register-still-09.png`)
- `assets/images/sectors/` — 2 new sector images: residential/mixed-use development, transport interchange (`sectors-residential-mixed-use-05.png`, `sectors-transport-interchange-06.png`)
- `assets/images/insights/` — 2 new insights images: adviser portrait, membrane/ETFE architectural macro (`insights-portrait-adviser-04.png`, `insights-membrane-structure-05.png`)
- `assets/images/lifestyle/` — 20 new lifestyle images (Run 4): couples, families, community groups, individuals, and architecture with people at human scale
- `assets/images/generation-manifest-run3.json` — generation manifest for Run 3
- `assets/images/generation-manifest-run4.json` — generation manifest for Run 4
- `scripts/generate-images-run3.js` — generation script for Run 3
- `scripts/generate-images-run4.js` — generation script for Run 4

### Changed
- Image generation direction updated: people are now explicitly 25–40 years old (prior runs used "senior" descriptors resulting in elderly subjects)
- Run 4 direction: casual dress only (no suits, no hard hats, no construction sites); everyday real-world settings; families and multi-generational groups included; ethnic diversity across all images

### Notes
- Age correction (25–40 years old) saved to image-generator agent memory — will apply to all future runs automatically
- Run 4 introduces a new `lifestyle/` category not previously in the image library — covers couples, families, community scenes, and architecture at human scale
- All images generated via Replicate flux-1.1-pro, output_quality 95, prompt_upsampling true

---

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
