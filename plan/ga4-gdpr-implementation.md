# GA4 + GDPR consent implementation plan

**Status:** Ready to execute
**Owner:** Stuart McGreavy
**Plan date:** 2026-05-20
**Target:** ship GA4 + consent banner together as a single release. GA4 must not fire a single hit before the user has interacted with the banner.

---

## 1. Objective

Add Google Analytics 4 (GA4) to playbook-group.co.uk in a way that is fully compliant with **UK GDPR** and the **Privacy and Electronic Communications Regulations (PECR)** as enforced by the ICO. Tracking must be **opt-in**, **granular**, **easily withdrawable**, and produce no analytics cookies or network requests until consent is granted.

### Scope (in)
- One GA4 property, web data stream only
- Basic out-of-the-box GA4 page_view + automatically collected events (scroll, outbound click, file download, video, form interaction)
- Custom-built consent banner + preferences modal
- Google Consent Mode v2 (required for UK/EEA traffic)
- Privacy policy update + new cookie policy section
- "Cookie preferences" footer link to re-open the banner at any time

### Scope (out — explicitly not in this work)
- Google Tag Manager (we are using direct `gtag.js`)
- Google Ads, Floodlight, Meta Pixel, LinkedIn Insight Tag, HubSpot, Hotjar — none of these are being added
- Server-side GTM
- Conversion-linker, enhanced conversions, ecommerce events
- Third-party CMP (Cookiebot, CookieYes, Iubenda etc.) — explicitly building our own
- A/B testing tools

---

## 2. Legal framework (the rules we are working to)

| Source | What it says (in plain English) |
|---|---|
| **PECR Reg 6** (UK) | We must get the user's **consent before storing any cookie** on their device, unless the cookie is **strictly necessary** for a service the user has explicitly requested. Analytics cookies are **never** strictly necessary. |
| **UK GDPR Art. 4(11) + Art. 7** | "Consent" means a freely given, specific, informed, and unambiguous indication. Silence, pre-ticked boxes, and continued browsing **do not count**. |
| **UK GDPR Art. 13** | We must tell users **what** we collect, **why**, **who** we share it with, **how long** we keep it, and **what rights** they have — before collection. |
| **ICO cookie guidance (current)** | "Reject all" must be **as easy as "Accept all"** — same level, same prominence, same number of clicks. Nudging is non-compliant. |
| **Google Consent Mode v2** | From March 2024, sites serving UK/EEA traffic using Google products (GA4, Ads) **must** implement Consent Mode v2 — otherwise audience features and conversion modelling are disabled and Google may restrict the account. |

### What this means in practice
1. **No GA4 cookies (`_ga`, `_ga_<container-id>`) are set, and no network requests to `googletagmanager.com` or `google-analytics.com` happen, until the user clicks Accept.**
2. The banner must offer Accept and Reject with equal prominence on the first screen.
3. We need a granular preferences view as well (categories: Strictly necessary / Analytics).
4. The user must be able to withdraw consent as easily as they gave it — via a permanent "Cookie preferences" link in the footer.
5. The privacy policy must list Google as a processor and explain the data flow.

---

## 3. Architecture overview

```
┌─────────────────────────────────────────────────────────────┐
│ Browser                                                     │
│                                                             │
│  ┌──────────────┐    ┌────────────────┐   ┌──────────────┐  │
│  │ Root layout  │───▶│ ConsentProvider│──▶│ Consent      │  │
│  │ (server)     │    │ (client ctx)   │   │ banner +     │  │
│  └──────────────┘    └────────────────┘   │ modal (UI)   │  │
│         │                    │            └──────────────┘  │
│         ▼                    ▼                              │
│  ┌──────────────┐    ┌────────────────┐                     │
│  │ Inline       │    │ localStorage   │                     │
│  │ Consent Mode │    │ playbook_      │                     │
│  │ default      │    │ consent_v1     │                     │
│  │ (denied)     │    └────────────────┘                     │
│  └──────────────┘                                           │
│         │                                                   │
│         ▼ (only after Accept)                               │
│  ┌──────────────┐    ┌────────────────┐                     │
│  │ gtag.js      │───▶│ GA4 endpoint   │                     │
│  │ (lazy load)  │    │ google-        │                     │
│  └──────────────┘    │ analytics.com  │                     │
│                      └────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

**Key principle:** the Consent Mode `default` call (everything `denied`) is the **only** Google-related code that runs unconditionally. `gtag.js` itself is loaded **conditionally** — only after the user clicks Accept. This is stricter than Consent Mode alone strictly requires, but it gives us a clean compliance story: pre-consent, the user has made literally zero requests to a Google domain.

---

## 4. Pre-work — Google side (10 minutes, Stuart to do)

Before any code changes:

1. **Create the GA4 property** at `analytics.google.com`:
   - Account name: *Playbook Advisory Group*
   - Property name: *playbook-group.co.uk*
   - Reporting time zone: *(GMT+00:00) United Kingdom*
   - Currency: *British Pound (GBP)*
   - Industry: *Business & Industrial Markets*
   - Business size: *Small*
2. **Create one Web data stream:**
   - URL: `https://playbook-group.co.uk`
   - Stream name: *Production website*
   - Enhanced measurement: **ON** (defaults are fine — page views, scrolls, outbound clicks, site search, video, file downloads, form interactions)
3. **Copy the Measurement ID** (format `G-XXXXXXXXXX`). This is what we put into `.env.local` and Vercel.
4. **Property-level settings to change immediately:**
   - **Admin → Data Settings → Data Retention:** set to *14 months* (longest allowed; default is 2 months which is unhelpful)
   - **Admin → Data Settings → Data Collection:** **disable** *Google signals data collection* (this enables cross-device tracking via ad cookies — we don't want that; it makes the consent story messier)
   - **Admin → Account Settings:** **disable** all four *Data Sharing Settings* checkboxes (Google products & services, benchmarking, technical support, account specialists). We are not using Google Ads so we lose nothing.
   - **Admin → Property → Reporting Identity:** set to *Device-based* only. Default is *Blended* which uses signals/modelling we don't want.
   - **Admin → Property → Property Settings → Industry Category:** confirm set
   - **Admin → Data Streams → [the stream] → Configure tag settings → Define internal traffic:** add Stuart's home/office IP so internal visits are filtered (creates a rule we then exclude in a Data Filter)
   - **Admin → Data Filters:** create an *Internal traffic* filter, state = *Active*
5. **Confirm Region settings under Admin → Data Collection → Consent settings:** the UK should be in the "regions requiring consent" list by default — leave it. This is what tells Google to respect the Consent Mode signals coming from our site.

> **Hand-off:** once the Measurement ID is in hand, add it to `web/.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`, and add the same to Vercel (Production + Preview + Development). Document in `web/VERCEL_SETUP.md`.

---

## 5. Privacy policy + cookie policy changes

The existing `/privacy-policy` page is mostly fine but contains **three statements that become inaccurate the moment GA4 ships**. These edits must land in the same release as GA4, not after.

### 5.1 Edits to the existing privacy policy

**Section 3.2** currently reads:
> *"When you visit this website, we may collect limited technical data including your IP address, browser type, pages visited, and the date and time of your visit. This is collected for the purposes of website security, performance monitoring, and analytics. **We do not use cookies for advertising or tracking purposes.**"*

Change to:
> *"When you visit this website and have given consent via our cookie banner, we use Google Analytics 4 to collect anonymised usage data including pages visited, approximate location (country/region only), device and browser type, and how you arrived at the site. This data is used to understand how the website is used and to improve its content. IP addresses are not stored. No advertising cookies are used. Without your consent, no analytics data is collected. You can withdraw consent at any time via the 'Cookie preferences' link in the footer."*

**Section 6 (Data sharing)** — add a new bullet:
> *"**Google LLC (Google Analytics 4):** anonymised usage data is processed by Google LLC under the EU–US Data Privacy Framework. We have configured Google Analytics to disable Google signals, disable data sharing with Google products, and use device-based reporting only."*

**Section 7 (Data retention)** — replace the website analytics line with:
> *"Google Analytics data is retained for 14 months and is anonymised at the point of collection. Aggregated reports may be retained indefinitely."*

**Section 8 (International transfers)** — replace with:
> *"Google Analytics data may be processed in the United States by Google LLC. This transfer is covered by Google LLC's certification under the EU–US Data Privacy Framework, providing an adequate level of protection under UK GDPR."*

### 5.2 New cookie policy section

Add a new section **12. Cookies** *before* the existing section 12 (renumber accordingly). Content:

> ### 12. Cookies
>
> A cookie is a small text file that a website stores on your device. We use cookies sparingly and only where necessary or where you have given consent.
>
> **Strictly necessary cookies** (always active, no consent required):
>
> | Cookie | Purpose | Duration |
> |---|---|---|
> | `playbook_consent_v1` | Stores your cookie preferences so we don't ask again on every page | 12 months |
>
> **Analytics cookies** (only set after you click Accept):
>
> | Cookie | Provider | Purpose | Duration |
> |---|---|---|---|
> | `_ga` | Google | Distinguishes unique visitors | 2 years |
> | `_ga_<container-id>` | Google | Maintains session state | 2 years |
>
> You can change or withdraw your consent at any time using the **Cookie preferences** link in the website footer. Withdrawing consent will not delete cookies already stored — you can clear those via your browser settings.

---

## 6. Consent banner — UX and copy specification

### 6.1 First-visit banner (bottom sticky bar, full width)

**Layout:** sticky bar across the bottom of the viewport, max-width 1200px, centred, with 24px margin from the viewport edges on desktop. On mobile, full-width and edge-to-edge.

**Background:** `#000000` (black), to match the dark sections of the site. Gold accent (`#af7e56`) on primary CTA.
**Padding:** `var(--space-6)` (24px) all sides on mobile, `var(--space-8)` (32px) on desktop.
**Z-index:** 9999 (above everything except modal overlays).
**Animation:** fade + slide up from 16px on first paint, 240ms `cubic-bezier(0.2, 0, 0, 1)`. Respects `prefers-reduced-motion`.

**Content (final copy — do not paraphrase):**

> **Cookies on this site**
>
> We use essential cookies to keep our website secure and working properly. Optional cookies help us improve performance and personalise content to improve your experience. Choose Accept to allow optional cookies or Decline to use only essential cookies. See our [privacy policy](/privacy-policy#cookies) for details.
>
> [Accept]    [Decline]    [Customise]

**Button rules (ICO-critical):**
- *Accept* and *Decline* are visually identical in size, weight, and prominence. *Accept* uses gold; *Decline* uses a sand-bordered transparent style. **Neither must look like the "default" option.**
- *Customise* is a tertiary link-style button (underline on hover).
- Tab order: Accept → Decline → Customise → privacy policy link → close (none — banner has no dismiss "X"; only the three buttons resolve it).

### 6.2 Preferences modal (opens when *Customise* is clicked, or from footer link)

**Layout:** centred modal, max-width 560px, scrolls if needed. Backdrop is `rgba(0,0,0,0.6)`. Escape key closes (treated as "save current selections"). Focus trap inside modal.

**Categories:**

| Category | Toggle state | Description shown to user |
|---|---|---|
| **Strictly necessary** | On, **disabled** (cannot be turned off) | Required for the site to function. Stores your cookie preferences only. |
| **Analytics (Google Analytics 4)** | Off by default, user toggles on | Anonymised usage data so we can understand how the site is used. No advertising. |

**Footer of modal:** two buttons — *Save preferences* (gold, primary) and *Accept all* (transparent with sand border, secondary, same size).

### 6.3 Footer link

Add a text link in the global site footer: **"Cookie preferences"** — when clicked, re-opens the preferences modal. This is **mandatory** for compliance (right to withdraw must be as easy as the right to give).

### 6.4 Accessibility

- All buttons reachable by keyboard; visible focus rings (gold, 2px offset)
- Banner uses `role="dialog"` with `aria-label="Cookie consent"` and is focused on mount
- Modal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing its heading
- Buttons have descriptive `aria-label`s where copy alone is ambiguous
- Colour contrast WCAG AA on all text and CTAs

---

## 7. Consent state management

### 7.1 Storage shape

Stored in `localStorage` (not a cookie — this avoids the meta-problem of needing consent to store the consent record). Key: `playbook_consent_v1`. Value (JSON):

```json
{
  "version": 1,
  "timestamp": "2026-05-20T14:32:01.000Z",
  "choices": {
    "necessary": true,
    "analytics": true
  }
}
```

### 7.2 Versioning

The `version` field exists so that if we materially change what we collect, we can bump the version (e.g. to `2`), and the banner will re-appear for every user. **Material changes** = adding a new tracking vendor, adding new cookie categories, or significantly expanding what we collect. Cosmetic changes do not require a bump.

### 7.3 Provider behaviour

A client component `ConsentProvider` wraps the app inside the root layout:

- On mount, reads `playbook_consent_v1` from `localStorage`
- If absent OR `version` mismatched → show banner
- If present and current → silently apply choices (fire `gtag('consent', 'update', ...)` and lazy-load `gtag.js` if analytics is granted)
- Exposes a `useConsent()` hook returning `{ choices, openPreferences, acceptAll, rejectAll, savePreferences }`

The footer's "Cookie preferences" link calls `openPreferences()` from this hook.

---

## 8. Google Consent Mode v2 implementation

This is the bit that most sites get wrong. The contract with Google is:

1. **Before** any Google script loads, set the `default` consent state to **denied** for everything Google cares about.
2. **After** the user makes a choice, call `gtag('consent', 'update', ...)` with the new state.
3. GA4 will queue or drop hits accordingly, and (because we have `wait_for_update`) Google won't fire any pings until the update arrives, with a max wait of 500ms.

### 8.1 Inline default consent (must run before gtag.js)

Place this in the root layout `<head>` via Next.js `<Script strategy="beforeInteractive">`:

```js
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',  // our own consent storage
  'personalization_storage': 'denied',
  'security_storage': 'granted',       // anti-fraud, always allowed
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', false);
```

### 8.2 gtag.js loader — conditional

`gtag.js` itself is only injected **after** the user clicks Accept (or has a prior Accept in localStorage on a return visit). We do this via Next.js `<Script>` with a state variable controlling its render:

```jsx
{analyticsConsentGranted && (
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
    strategy="afterInteractive"
  />
)}
{analyticsConsentGranted && (
  <Script id="ga4-init" strategy="afterInteractive">{`
    gtag('js', new Date());
    gtag('config', '${MEASUREMENT_ID}', {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  `}</Script>
)}
```

### 8.3 Consent update on user action

When the user clicks *Accept*:

```js
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
```

When the user later clicks *Reject* (from the footer link, after previously accepting):

```js
gtag('consent', 'update', {
  'analytics_storage': 'denied'
});
// then manually clear _ga, _ga_<id> cookies via document.cookie expiry
```

The cookie clearing on revocation is important — Consent Mode update alone stops *new* data being sent, but does not delete already-stored cookies. We must purge them ourselves.

### 8.4 SPA page-view tracking

Next.js App Router does not trigger full page loads on navigation, so GA4's automatic page_view event will only fire on the initial entry. We need a `<PageviewTracker>` client component that:

- Reads pathname via `usePathname()` and search params via `useSearchParams()`
- On change, calls `gtag('event', 'page_view', { page_path, page_title })`
- Only mounts when `analyticsConsentGranted === true`

This component goes inside `ConsentProvider`, after the gtag scripts.

---

## 9. File-by-file implementation map (for the next session)

> **No code in this plan** — this is the contract for the implementing session.

| File | Action | Purpose |
|---|---|---|
| `web/.env.local` | Add | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| `web/VERCEL_SETUP.md` | Edit | Document the env var across Production / Preview / Development |
| `web/lib/consent/types.ts` | Create | TypeScript types: `ConsentChoices`, `ConsentRecord`, `ConsentCategory` |
| `web/lib/consent/storage.ts` | Create | `readConsent()`, `writeConsent()`, `clearAnalyticsCookies()` |
| `web/lib/consent/constants.ts` | Create | Storage key, current version, category metadata |
| `web/lib/consent/gtag.ts` | Create | `gtagDefault()`, `gtagUpdate()`, `trackPageview()` — typed wrappers |
| `web/components/consent/ConsentProvider.tsx` | Create | Client component — context + state + script orchestration |
| `web/components/consent/ConsentBanner.tsx` | Create | The bottom sticky bar UI |
| `web/components/consent/ConsentPreferencesModal.tsx` | Create | The granular preferences modal |
| `web/components/consent/PageviewTracker.tsx` | Create | SPA navigation → page_view event |
| `web/components/consent/useConsent.ts` | Create | `useConsent()` hook exposing the API |
| `web/components/site/Footer.tsx` | Edit | Add "Cookie preferences" link that calls `openPreferences()` |
| `web/app/layout.tsx` | Edit | Remove Plausible placeholder; add `ConsentProvider`; add inline default consent script via `<Script strategy="beforeInteractive">` |
| `web/app/(site)/privacy-policy/page.tsx` | Edit | Three section edits + new section 12 (Cookies) — see §5 above |

**Estimated effort:** 1 working session for the build + 1 follow-up session for QA and copy refinement. Roughly 4–6 hours total.

---

## 10. Testing and validation

### 10.1 Pre-consent checks (banner showing, nothing clicked)

In a clean incognito window with DevTools Network tab open:

- [ ] No request to `googletagmanager.com`
- [ ] No request to `google-analytics.com`
- [ ] No `_ga` or `_ga_*` cookies in Application → Cookies
- [ ] Only `playbook_consent_v1` localStorage key exists *after* a user choice (not before)
- [ ] `dataLayer` exists in console; first entry is the `consent default` call
- [ ] Banner renders; tab order correct; focus visible

### 10.2 Post-Accept checks

- [ ] Request to `googletagmanager.com/gtag/js` appears
- [ ] Request to `google-analytics.com/g/collect` appears with `gcs=G111` (analytics granted, ads denied)
- [ ] `_ga` and `_ga_<id>` cookies set, marked SameSite=Lax, Secure
- [ ] GA4 Realtime report shows the visitor within ~30 seconds
- [ ] GA4 DebugView shows events (enable debug via Chrome extension *Google Analytics Debugger*)
- [ ] Reload the page — banner does not reappear

### 10.3 Post-Reject checks

- [ ] No GA4 requests
- [ ] No `_ga` cookies
- [ ] `playbook_consent_v1` shows `analytics: false`
- [ ] Reload — banner does not reappear

### 10.4 Withdraw-consent checks (from footer link after Accept)

- [ ] Clicking "Cookie preferences" reopens the modal with current state pre-filled
- [ ] Toggling Analytics off and saving → no further GA4 requests
- [ ] `_ga` cookies are removed from Application → Cookies
- [ ] `playbook_consent_v1` updated with `analytics: false` and new timestamp

### 10.5 Cross-browser

Test on at least: Chrome (latest), Safari (latest macOS + iOS), Firefox (latest), Edge (latest). Special attention to Safari's ITP — it caps `_ga` lifetime to 7 days, which is fine and not our problem to fix.

### 10.6 Accessibility audit

- [ ] axe DevTools: zero violations on banner and modal
- [ ] Keyboard-only navigation completes the consent flow
- [ ] Screen reader (VoiceOver on macOS or NVDA on Windows) announces banner on mount and reads all controls
- [ ] `prefers-reduced-motion: reduce` — banner appears without slide animation

### 10.7 Google Tag Assistant

Install the Tag Assistant Chrome extension and verify:
- Tag fires only after consent
- Consent Mode state is reported correctly (`analytics_storage: granted/denied`)
- No "tag not detected" warnings post-Accept

---

## 11. Launch sequence

Order matters. **Do not deploy GA4 before the banner is verified.**

1. Build banner + provider on a feature branch
2. Deploy to Vercel Preview with the **Measurement ID present**
3. Run the full §10 test checklist on Preview
4. Deploy privacy policy edits in the **same PR** as the consent infrastructure
5. Merge to `main` → Production deploy
6. **Within 24 hours of launch**, verify in GA4 Realtime that traffic is flowing, and verify the consent banner appears for new sessions
7. Mark `LAUNCH-04` resolved in `plan/PROJECT_PLAN.md`

---

## 12. Post-launch maintenance

| Cadence | Task |
|---|---|
| Quarterly | Re-read ICO cookie guidance for any updates; recheck Google Consent Mode requirements |
| On any tracking-tool change | Bump `playbook_consent_v1` → `v2` (forces re-consent), update cookie table in privacy policy |
| On any new vendor | New category in the banner, new row in the cookie table, new processor entry in the privacy policy |
| Annually | Audit cookies set on the site against the policy (Chrome DevTools → Application → Cookies on key pages) |

---

## 13. Open questions for next session

None blocking — the plan is executable as written. The following are minor confirmations that can be resolved at build time:

1. **Banner copy** — final wording in §6.1 is a draft. Confirm or tweak before merging.
2. **Banner styling exact shade** — gold accent on Accept vs sand border on Reject. Confirm visual treatment against the brand reference once we see it on-page.
3. **Footer link placement** — currently proposed as a text link in the legal row of the footer. Confirm exact position.
4. **Internal traffic IP** — Stuart to provide the static IP(s) to filter out, or confirm to skip if no static IP available.

---

## 14. Risks

| Risk | Mitigation |
|---|---|
| Banner ships, GA4 doesn't, or vice versa → either no data or non-compliance | Ship both in the same PR. Block deploy if either is missing. |
| `gtag.js` blocked by adblockers → underreporting | Acceptable. We accept the trade-off rather than route via a first-party proxy (which would re-open the privacy story). |
| User has stale localStorage from a future schema change | Version bump on the storage key forces a fresh consent prompt — handled by design. |
| Google's consent requirements change again | Quarterly review (§12). |
| Privacy policy edits miss the GA4 deploy | Same-PR rule (§11). Add a pre-merge checklist item. |

---

**End of plan.**
