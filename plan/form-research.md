# Form integration research: Next.js + WordPress

**Date:** 2026-03-31
**Status:** Implemented and deployed — Approach D

---

## Context

The Playbook Advisory Group website (Next.js, hosted on Vercel) has two contact forms:
1. Full contact page (`/contact`) — uses Next.js Server Actions with `useActionState`
2. Homepage contact section — client-side with local state management

Both forms are currently stubs (no email delivery, no storage). The client has opted for WordPress as the CMS (`cms.playbook-group.co.uk`). The requirement is:
- Form submissions stored in the WordPress database (viewable by the client in WP admin)
- Email notification sent to the client when a form is submitted

---

## Approaches evaluated

### Approach A: WordPress CPT + built-in REST API

Register a Custom Post Type (`form_submission`) with `show_in_rest => true`, POST to `/wp-json/wp/v2/form_submission`. Hook into `save_post_form_submission` to trigger `wp_mail()`.

| Criterion | Assessment |
|---|---|
| Reliability | Good |
| Complexity | Low-medium (~50-80 lines PHP) |
| WP admin dashboard | Yes (CPT) |
| Email config in WP | Yes (wp_mail hook) |
| Auth needed | Yes (Application Password for POST to built-in endpoints) |
| Cost | Free |

**Pros:** No plugins required. Full control over schema.
**Cons:** Requires Application Password authentication for creating posts via the built-in REST API. Must handle spam protection separately.

---

### Approach B: Contact Form 7 / Gravity Forms REST API

#### Contact Form 7 (free)
CF7 exposes `/wp-json/contact-form-7/v1/contact-forms/{ID}/feedback`. Does not store submissions by default — requires the Flamingo plugin for storage.

**Critical limitation:** CF7 uses a nonce/unit-tag mechanism that is problematic from a headless frontend. Not designed for external submissions.

#### Gravity Forms ($59-159/year)
Proper REST API v2 with `/wp-json/gf/v2/forms/{ID}/submissions`. Entries stored automatically, configurable notifications, conditional logic.

**Overkill for a single contact form.** Adds significant cost and weight for minimal benefit.

| Criterion | CF7 | Gravity Forms |
|---|---|---|
| Reliability | Fair (nonce issues) | Good |
| Complexity | Low-medium | Low (config heavy) |
| WP admin dashboard | Yes (with Flamingo) | Yes (native) |
| Cost | Free | $59-159/year |
| Auth needed | No | No |

---

### Approach C: Headless form plugins

**Research findings:** No mature, maintained WordPress plugin exists for this use case.
- "WP Headless Forms" — last updated 2019, README states "not suitable for wider use"
- Headlessforms.cloud, Forminit — SaaS services, data lives outside WordPress
- No viable option found

---

### Approach D: Custom WordPress REST endpoint (plugin) — SELECTED

Write a small mu-plugin that registers a custom REST route (`/wp-json/playbook/v1/contact`), validates input, stores as a CPT, and sends email via `wp_mail()`.

| Criterion | Assessment |
|---|---|
| Reliability | Good |
| Complexity | Low (~80 lines PHP) |
| WP admin dashboard | Yes (dedicated "Form submissions" menu item) |
| Email config in WP | Yes (wp_mail, configurable via WP Mail SMTP) |
| Auth needed | No (public endpoint, like any web form) |
| Cost | Free |
| Community adoption | Most common pattern for headless WP |

**Pros:**
- Complete control over validation, storage schema, email template, response format
- No paid plugins, no third-party dependencies
- Submissions viewable in WP admin as a dedicated menu item
- Lightweight single-file plugin
- Clean endpoint URL (`/playbook/v1/contact`)
- Easy to extend (reCAPTCHA, Slack webhook, etc.)
- No authentication needed — public endpoint

**Cons:**
- Requires maintaining ~80 lines of PHP
- Email template changes require editing PHP
- Spam protection is DIY (honeypot, rate limiting)

---

### Approach E: Hybrid — Resend for email + WP REST API for storage

Server Action sends email via Resend AND posts to WP REST API in parallel using `Promise.allSettled()`.

| Criterion | Assessment |
|---|---|
| Reliability | Best (decoupled — either system can fail independently) |
| Complexity | Low-medium |
| WP admin dashboard | Yes (CPT) |
| Email config in WP | No (Resend/code) |
| Cost | Free (Resend free tier: 100 emails/day) |

**Pros:** Most resilient. Beautiful React Email templates. Resend already in tech stack.
**Cons:** Two systems to manage. Email template changes require code deploy.

---

## Comparison matrix

| Criterion | A: CPT + REST | B: CF7 | B: Gravity Forms | C: Headless plugins | D: Custom endpoint | E: Hybrid |
|---|---|---|---|---|---|---|
| Reliability | Good | Fair | Good | Poor | Good | Best |
| Complexity | Medium | Low-medium | Low (config) | N/A | **Low** | Low-medium |
| WP admin | Yes | Yes (Flamingo) | Yes | N/A | **Yes** | Yes |
| Email in WP | Yes | Yes | Yes | N/A | **Yes** | No |
| Spam protection | DIY | Basic | Built-in | N/A | DIY | DIY |
| Cost | Free | Free | $59-159/yr | N/A | **Free** | Free |
| Auth needed | Yes | No | No | N/A | **No** | No |

---

## Recommendation

**Selected: Approach D — Custom WordPress REST endpoint**

Rationale:
1. Simplest viable solution for a single contact form
2. Most common pattern in the headless WordPress community
3. No paid plugins, no authentication complexity
4. Client gets full visibility of submissions in WordPress admin
5. Email notifications handled entirely within WordPress (configurable via WP Mail SMTP)
6. The existing Next.js Server Action only needs a single `fetch()` call added

---

## Implementation (completed 2026-03-31)

### What was deployed

#### WordPress mu-plugin
- **File:** `wordpress/mu-plugins/playbook-form-handler.php`
- **Deployed to:** `cms.playbook-group.co.uk` via SFTP (GoDaddy Managed WordPress)
- **Location on server:** `wp-content/mu-plugins/playbook-form-handler.php`
- **SFTP host:** `f05.c16.myftpupload.com` (port 22)

The plugin provides:
- **Custom Post Type** (`pb_form_entry`) — appears as "Form submissions" in the WP admin sidebar
- **REST endpoint** `POST /wp-json/playbook/v1/contact` — public, no authentication required
- **Server-side validation** and sanitisation of all fields
- **Email notification** via `wp_mail()` on each submission
- **Admin meta box** showing all submission fields when viewing an entry
- **Custom list columns** (email, organisation, source) in the submissions list
- **Read-only** — "Add New" is disabled; entries can only come via the API

#### Next.js Server Action
- **File:** `web/app/(site)/contact/actions.ts`
- Posts form data as JSON to the WordPress endpoint
- Derives the endpoint URL from the existing `WORDPRESS_API_URL` env var
- Returns structured success/error state to the client

#### Forms updated
| Form | File | `form_source` value |
|---|---|---|
| Contact page (`/contact`) | `web/app/(site)/contact/ContactPageClient.tsx` | `contact-page` |
| Homepage contact section | `web/components/ContactSection.tsx` | `homepage` |

Both forms now submit through the same Server Action. The `form_source` field lets you see in WordPress which form the submission came from.

### Email configuration

**Current (testing):** Notifications go to `stuart@byte-pm.com`

**After testing is complete:** Change line 98 of the mu-plugin on the server to:
```php
$to = 'hello@playbook-group.co.uk';
```
This requires re-uploading the file via SFTP to `wp-content/mu-plugins/` on `cms.playbook-group.co.uk`. The updated file is also in the repo at `wordpress/mu-plugins/playbook-form-handler.php` — update it there too so the repo stays in sync.

### Future considerations
- **Spam protection:** Currently no reCAPTCHA or honeypot. If spam becomes an issue, add a honeypot field or Google reCAPTCHA v3 verification to the endpoint.
- **Email deliverability:** `wp_mail()` uses the server's default mail transport. If emails are not arriving reliably, install the **WP Mail SMTP** plugin on WordPress and configure it with a dedicated SMTP provider.
- **Rate limiting:** Not currently implemented. Consider adding if the endpoint is abused.
