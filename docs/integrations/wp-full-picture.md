---
sidebar_position: 18
title: WP Full Picture Integration
description: Make WP Full Picture the consent authority for Lead Attribution, and allow its data-sender endpoint under REST restriction.
---

# WP Full Picture Integration

**Tier: Basic** — Plugin-gated toggle. Turning it on does two things: (1) makes **WP Full Picture the consent authority for Lead Attribution** — the tracker follows Full Picture's consent choices before recording any lead — and (2) adds a conditional entry to the SyteOps REST allowlist so Full Picture's data-sender endpoint keeps working when REST API restriction is enabled.

## What the toggle does

- **Consent (Lead Attribution):** when enabled, the Lead Attribution tracker reads Full Picture's consent state and only records a lead — and only sets its cookies / stores first-touch attribution — once the visitor grants **Statistics** consent. See [Consent gating](#consent-gating-lead-attribution) below.
- Adds `/wp-json/fupi/v1/sender` to the SyteOps REST restriction allowlist.
- Hides the toggle and shows "Not Installed" when neither the free WP Full Picture nor WP Full Picture Premium plugin is detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoint again.

## Consent gating (Lead Attribution)

When this integration is on and you use [Lead Attribution](../features/lead-attribution.md), Full Picture becomes the consent authority: SyteOps reads Full Picture's consent choices directly — no per-site code. SyteOps maps Full Picture's **Statistics** consent to its own **analytics** category, so:

> **A lead is recorded — and `syteops_vid` / `syteops_sid` are set, and first-touch attribution is stored — only after the visitor grants _Statistics_ consent in Full Picture.** A later change or withdrawal is honored. If Full Picture hasn't resolved a choice yet, SyteOps stores and sends nothing (fail-closed).

**Global Privacy Control (GPC) is always honored**, whether or not Full Picture is active — a visitor whose browser sends GPC has no lead recorded and no cookie set, in every region. (Full Picture 10.1.1 does not honor GPC itself; SyteOps does.)

### Recommended Full Picture settings

These are the settings running live on a production site (Full Picture Pro 10.1.1).

**Geolocation** — Analytics → Geolocation → **"Cloudflare (for registered users)"** (`cf_default`). A same-origin `/cdn-cgi/trace` lookup: reliable, free, no third party, no rate limit. It determines whether a visitor is in an opt-in (EU/EEA/UK) or opt-out region.

**Consent banner** — set to **Manual mode**:

| Setting | Value | Why |
|---|---|---|
| How should the banner work? | **Manual** | Gives you the country lists below. Avoid **Auto/strict** (see the note). |
| Which mode if geolocation fails? | **Opt-in** | Fail closed — an unknown visitor is treated as GDPR. |
| Track after visitors agree | **In specific countries** → EU/EEA/UK + your opt-in list | These visitors must Accept before anything is stored. |
| Track from the start but let visitors decline | **In all other countries** | Opt-out regions (e.g. US) are tracked by default; the banner offers a decline. |
| Privacy policy page | your policy page | Required for a compliant banner. |
| "Do not ask visitors for consent again" | **Off** | Leaving it on breaks GDPR re-consent. |

Keep **consent records on** (Full Picture → ConsentsDB) — GDPR requires producible proof of consent.

:::warning Don't use Auto/strict mode (Full Picture 10.1.1)
`auto_strict` sets the opt-out region to `US (CA)`, which needs a **region**, and no working Full Picture geo method supplies one in 10.1.1 (the geo Worker and ipdata paths are dead code; ipapi.co rate-limits). Opt-out never matches and US visitors silently fall back to opt-in. **Manual mode with a bare-country opt-out list (e.g. `US`) works** and is what's verified in production.
:::

### Register SyteOps's cookies with Full Picture

Add these to Full Picture's cookie list under the **Statistics** category, so its scanner keeps them instead of auto-filing them into a denied bucket and deleting them (an undeclared cookie getting auto-deleted is the #1 cause of "attribution stopped working"):

| Cookie | Lifetime | Purpose | Category |
|---|---|---|---|
| `syteops_vid` | 1 year | Anonymous first-party visitor id (random UUID, no personal data) linking a visitor's conversions | Statistics |
| `syteops_sid` | 30 minutes | Session id grouping conversions within a visit | Statistics |

### Verify it works

Use a **real Chrome** browser with a normal user agent (a headless UA can trip internal-traffic filters and look like a failure for the wrong reason).

1. **EU, no consent:** load from an EU IP (or force `loc=DE`). Full Picture shows its opt-in banner. Click a phone number → confirm **no lead is recorded** and **no `syteops_vid` cookie** is set.
2. **EU, after Accept:** accept Statistics in the banner → a conversion is now recorded.
3. **US:** load from a US IP → tracked by default (opt-out).
4. **GPC:** enable Global Privacy Control → no lead, no cookie, in every region.

### If you use another consent tool

If Full Picture is off, Lead Attribution still honors GPC and can gate on a generic consent signal — a consent cookie/value (Leads → Settings → Consent), a `window.syteopsLeadsConsent` flag, or a `syteops_consent_update` DOM event — plus a **By location** mode that opt-ins EU/EEA/UK visitors automatically. See [Lead Attribution → Consent & privacy](../features/lead-attribution.md#consent--privacy).

## Setup

1. Install and activate the WP Full Picture plugin (free or premium) if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **WP Full Picture** in the **Analytics & SEO** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — WP Full Picture's endpoint is reachable either way. The integration matters when restriction is on.

## Common use-cases

- Keep analytics data flowing from WP Full Picture while SyteOps REST restriction is active.
- Toggle access cleanly when debugging restriction-related issues.
- Document in your operational record that WP Full Picture is a sanctioned REST caller.

## Resources

- [WP Full Picture](https://r.freemius.com/5405/7092390/) — vendor site.

## Works with Lead Attribution

If you use the [Lead Attribution](../features/lead-attribution.md) module, enable its **Mirror to WP Full Picture** option and each captured conversion (phone-call click, reveal-number click, or form submit) is also recorded as a WP Full Picture event — so your existing analytics dashboards reflect the same leads. This is optional; Lead Attribution works on its own when WP Full Picture isn't installed.

## Related

- [Lead Attribution](../features/lead-attribution.md) — capture and attribute phone/form leads
- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
