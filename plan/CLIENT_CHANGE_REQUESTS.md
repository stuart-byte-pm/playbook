# Client Change Requests — Playbook Advisory Group

**Date created:** 2026-04-17  
**Status:** Tracking in progress  
**Purpose:** Source of truth for all client-requested changes, their progress, and outstanding items.

---

## Copy & Messaging

### CR-1: Update "We are not" section homepage copy
**Description:** Change "design & construction consultancy · Embedded resource or capacity support" to "'design & construction consultancy'" (quote the phrase)

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/WhereWeSitSection.tsx` — removed "Embedded resource or capacity support", wrapped phrase in curly quotes
- Completed: 2026-04-17

---

### CR-2: Update capital investment strategy service description
**Description:** Update copy for "Capital investment strategy" service to confirmed client wording.

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/ServicesSection.tsx` line 11 — changed "business case rationale, and decision framework" to "strategic rationale, development appraisal and decision framework"
- Completed: 2026-04-17

---

## Imagery

### CR-3: Replace infrastructure image on sectors pages
**Description:** Replace current infrastructure image with "water" image on sectors pages

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/SectorsSection.tsx` — infrastructure card image changed from `High rise buid.jpg` to `water.jpg`
- Completed: 2026-04-17

---

## Footer Updates

### CR-4: Add carbon reduction plan link
**Description:** Add "Carbon reduction plan" link in footer pointing to PDF

**Status:** `pending`  
**Owner:** —  
**Client dependency:** Yes — client to supply PDF file  
**Notes:**
- Awaiting PDF from client
- Determine footer position (which column?)
- Link text to confirm

---

### CR-5: Disable advisory column footer links
**Description:** Convert advisory column links in footer to placeholder text (disable navigation, keep structure for future build-out)

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/Footer.tsx` — all five advisory column `<a>` tags replaced with `<span>` elements (same class, same visual appearance, no navigation)
- Completed: 2026-04-17

---

### CR-6: Update LinkedIn footer link
**Description:** Update LinkedIn link URL to `https://www.linkedin.com/company/playbookadvisory`

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/Footer.tsx` — LinkedIn `href` set to `https://www.linkedin.com/company/playbookadvisory`, opens in new tab with `rel="noopener noreferrer"`
- Completed: 2026-04-17

---

### CR-7: Remove Jewellery Quarter address
**Description:** Remove Jewellery Quarter address reference from footer

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/Footer.tsx` — "Jewellery Quarter, Birmingham" list item removed entirely
- Completed: 2026-04-17

---

### CR-8: Update Spencer Yard address
**Description:** Modify Spencer Yard address to read "Playbook HQ, Spencer Yard..." (add "Playbook HQ" prefix)

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated `web/components/Footer.tsx` — address now reads "Playbook HQ, Spencer Yard, Leamington Spa"
- Completed: 2026-04-17

---

## Branding

### CR-9: Add ® to logo
**Description:** Add registered trademark symbol (®) to Playbook logo

**Status:** `completed`  
**Owner:** Byte  
**Client dependency:** No  
**Notes:**
- Updated 3 references across 2 files:
  - `web/components/Nav.tsx` — dark and light wordmark variants
  - `web/components/Footer.tsx` — footer wordmark
- All now point to `playbook-wordmark-black-registered.svg` / `playbook-wordmark-white-registered.svg`
- Completed: 2026-04-17

---

## Admin & Delivery

### CR-10: Add credentials to handover doc
**Description:** Add sign-in credentials to handover document and send to client

**Status:** `pending`  
**Owner:** —  
**Client dependency:** Yes — client to confirm credential storage location  
**Notes:**
- Determine where credentials are stored (1Password, Bitwarden, etc.)
- Get list of required credentials (Vercel, GitHub, WordPress, GoDaddy, etc.)
- Confirm delivery method with client
- Do not include passwords in version-controlled files

---

## Analytics

### CR-11: Implement Google Analytics with GDPR-compliant cookie consent
**Description:** Add Google Analytics conversion tracking to the site, along with a cookie preferences component to ensure GDPR compliance.

**Status:** `blocked`  
**Owner:** Byte (implementation) / Client (GA account setup)  
**Client dependency:** Yes — client is creating GA account and adding Stuart as admin  

**Sub-tasks:**
1. `blocked` — Await GA account access (client action)
2. `pending` — Extract GA Measurement ID (G-XXXXXXXXXX) from GA account
3. `pending` — Add GA script/tracking pixel to `web/app/layout.tsx` (placeholder comment already in place)
4. `pending` — Build cookie preferences component (consent banner — accept/reject)
5. `pending` — Wire GA to fire only after user consent is given
6. `pending` — Test consent flow and verify GA receiving data

**Notes:**
- Client is creating the GA account and adding Stuart (stuart@byte-pm.com) as admin — awaiting confirmation
- GA requires a cookie consent banner to comply with GDPR and the site's privacy policy (noted in handover doc under Known Issues)
- Cookie banner must block GA until explicit consent is given — do not fire tracking on page load
- Consent preference should persist across sessions (localStorage or cookie)
- Consider a minimal, on-brand banner (accept / manage preferences) — not a full CMP unless client requires it

---

## Summary

| Status | Count | Details |
|--------|-------|---------|
| Pending | 1 | CR-10 |
| In Progress | 0 | — |
| Completed | 8 | CR-1, CR-2, CR-3, CR-5, CR-6, CR-7, CR-8, CR-9 |
| Blocked (awaiting client) | 2 | CR-4, CR-11 |

### Quick Reference: Client Dependencies

- **CR-4:** Provide carbon reduction plan PDF
- **CR-10:** Confirm credentials storage location and delivery method
- **CR-11:** Create GA account and add stuart@byte-pm.com as admin

---

## How to Update This Document

When you complete a task:
1. Change `Status` from `pending` to `in_progress` when starting
2. Change `Status` to `completed` when finished
3. Add date and notes in **Notes** section
4. Update the Summary table
5. Commit changes with message: `update: CLIENT_CHANGE_REQUESTS.md — CR-X completed`

When waiting on client info:
1. Change `Status` to `blocked` (if needed, though "pending" with dependency note usually suffices)
2. Add specific ask in **Notes** section
3. Update Summary table if blocking multiple requests

---

**Last updated:** 2026-04-17 — CR-1, CR-2, CR-3, CR-5, CR-6, CR-7, CR-8 completed; CR-9 blocked pending SVG; CR-11 added (Google Analytics + cookie consent)
