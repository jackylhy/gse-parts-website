# Security Notes — GSE Parts Website Template

This template is built **defensively from the ground up**. Below: what is already enforced, and the checklist for production hardening (the part AI-generated sites usually miss).

## Already enforced in this template

### 1. Content Security Policy (CSP)
`index.html` ships a strict CSP meta tag:

```
default-src 'none';
  style-src 'self';
  script-src 'self';
  img-src 'self' blob:;
  font-src 'self';
  connect-src 'none';
  form-action 'none';
  base-uri 'none'
```

Consequences:
- **No inline scripts or styles will execute** — if any injection gets past the rendering layer, the browser refuses to run it. (Our own JS/CSS are same-origin files, allowed by `script-src 'self'`.)
- **`connect-src 'none'`** — the page cannot make ANY network request (fetch/XHR/WebSocket). Even a successful XSS cannot exfiltrate data anywhere.
- **`form-action 'none'`** — injected forms cannot submit anywhere either.
- **`img-src blob:`** — needed only for the local photo preview; no remote images.

> Note: when you wire the RFQ form to a real backend, relax **only** `connect-src` to your API origin, e.g. `connect-src 'self' https://api.yourdomain.com`. Never `'unsafe-inline'`, never `*`.

### 2. Zero innerHTML with data
Every dynamic string (part names, search suggestions, cart rows, error messages) is rendered via `textContent` / `cloneNode` of static `<template>` markup. There is no code path where user-controlled text becomes HTML. Search for `innerHTML` in `assets/app.js` — zero hits.

### 3. No eval / no remote code
No `eval`, `Function()`, `setTimeout(string)`, or remotely-hosted scripts, fonts, or trackers. System font stack only.

###  CSP covers <script src="assets/app.js"> ✓ (same-origin allowed by script-src 'self')

### 4. Photo upload stays local
Visual search uses `URL.createObjectURL(file)` for preview. The file never leaves the browser — no upload, no storage, no third-party matcher. The production matcher service should be your own HTTPS endpoint, and the ONLY addition to `connect-src`.

### 5. Referrer privacy
`<meta name="referrer" content="no-referrer">` — no referrer leakage to any linked party.

### 6. Forms
- `autocomplete="off"` on all inputs (no accidental browser credential reuse)
- Client-side validation only for UX; production must re-validate server-side (see checklist)

## Production checklist (do these on the server)

When you deploy beyond this static demo:

1. **Serve over HTTPS only** (HSTS: `Strict-Transport-Security: max-age=63072000; includeSubDomains`)
2. **Set response headers** (meta CSP is a fallback; server headers win):
   - `Content-Security-Policy` — same policy, with `connect-src` widened to your API origin only
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`)
   - `Referrer-Policy: no-referrer`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
3. **RFQ backend**:
   - Re-validate every field server-side (name/email/message length caps)
   - Rate-limit per IP + email honeypot field against spam bots
   - Never render submitted content back as HTML — plain text only in any admin view
   - Sanitize filenames if you later accept photo uploads server-side; store outside webroot, random names
4. **Uploaded photo matcher API** (when real):
   - Authenticated endpoint, per-user rate limits, 8 MB cap enforced server-side too
   - Strip EXIF if you store photos (GPS/location leakage)
   - Image re-encode before storage (defuses polyglot/PNG+HTML payload files)
5. **Keep it static where possible** — no CMS, no plugins, no trackers = smallest attack surface. Every third-party script you add is a supply-chain risk.
6. **Monitoring**: simple uptime check + backend error alerts. Avoid client-side error trackers that phone home with page content.

## Known demo limitations (intentional)

- RFQ submissions and the visual matcher are simulated — no data is sent, stored, or logged anywhere.
- Prices shown ("$") are sample data.
- Company identity, certifications, contact details are placeholders.
