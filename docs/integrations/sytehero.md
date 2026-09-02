---
sidebar_position: 29
title: SyteHero Integration
description: Keep SyteHero's consent and attribution endpoints reachable while SyteOps REST API restriction is enabled.
---

# SyteHero Integration

**Tier: Basic** — Plugin-gated toggle. SyteHero is the sister plugin that runs hero sliders, consent, and front-end attribution tracking. This tile gives it a place on your Integrations tab alongside every other plugin SyteOps knows about.

:::tip You do not have to turn this on for SyteHero to work
The two SyteHero endpoints below are allowed **whenever SyteHero is installed and active**, whether or not this toggle is enabled. See [Why this one is different](#why-this-one-is-different).
:::

## What this integration covers

SyteHero's front end asks the site two questions before it records anything:

| Endpoint | What it does |
|---|---|
| `/wp-json/sytehero/v1/jurisdiction` | Resolves which privacy rules apply to the visitor |
| `/wp-json/sytehero/v1/touch` | Records an attribution touch against a first-party visitor cookie |

Both are public by design. When [REST API Restriction](../features/rest-api-restriction.md) is enabled, SyteOps blocks unauthenticated REST calls before the endpoint's own permission check ever runs — so without an allowlist entry both of these return `401`.

That failure is quiet and total. SyteHero's consent layer **fails closed** on an unresolved jurisdiction, which means a blocked `/jurisdiction` call switches off *all* of SyteHero's front-end analytics — attribution touches, slide impressions, and hero clicks — with nothing to show for it but a `401` in the browser's network log. SyteHero's own script treats the blocked call as an unresolved answer rather than raising a visible error. Each blocked call also ties up a PHP worker for the 200-800ms anti-scanner delay SyteOps applies before refusing a request.

## Why this one is different

Every other integration on the Integrations tab works the same way: the toggle is the switch, and nothing happens until you flip it.

SyteHero's two endpoints are the exception. **They are allowed based on whether SyteHero is active, not on this toggle.** Activate SyteHero and its consent endpoints keep working immediately — there is no window in which your analytics are silently off because nobody remembered to visit this screen.

Only those two exact routes are opened. SyteHero's other endpoints — settings, backups, slides, sales data — stay behind the restriction, protected by their own permission checks (and, for most of them, a license check as well). SyteOps never opens the `sytehero/v1` namespace as a whole.

## What the toggle does

- Marks SyteHero as a sanctioned, recognized integration on this site.
- Shows the tier badge and links to this page.
- Shows **Not Installed** and stays un-toggleable when the SyteHero plugin is not active.

Turning the toggle **off** does **not** re-block the two consent endpoints, so the tile never shows a **Recommended** nudge — enabling it would not change what those endpoints do. If you need them blocked, deactivate SyteHero itself.

## Setup

1. Install and activate SyteHero.
2. Navigate to **SyteOps → Integrations**.
3. Find **SyteHero** in the **Analytics & SEO** category.
4. Toggle it **ON** and click **Save Changes**.

## Verify it works

On a site with REST API Restriction enabled, a core WordPress route should still be blocked while SyteHero's route answers:

```bash
curl -s https://your-site.com/wp-json/wp/v2/types
# {"code":"rest_not_logged_in", ...}   <- restriction still in force

curl -s https://your-site.com/wp-json/sytehero/v1/jurisdiction
# {"mode":"optout"}  (or "optin")      <- allowed
```

If the first command stops returning `rest_not_logged_in`, something has opened your REST API far wider than intended — that is a problem to investigate, not a success.

## Troubleshooting

**SyteHero analytics show no data, and the endpoint returns `401` (`rest_not_logged_in`).**
Confirm SyteHero is actually active — a plugin that is installed but deactivated does not count, because SyteOps looks for the running plugin.

**The endpoint returns `403` (`rest_forbidden`) instead.**
That is **Block All REST API**, not the ordinary restriction. Block All is absolute and overrides every allowlist, including this one. Find it under **SyteOps → REST API → Access Control**.

**The SyteHero toggle is grayed out and says "Not Installed".**
SyteOps looks for the running SyteHero plugin. Install and activate it, then reload the Integrations tab.

## Resources

- [SyteHero](https://sytewide.com/buy-sytehero) — product page.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
