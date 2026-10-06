---
sidebar_position: 20
title: PhantomStudio Integration
description: Let PhantomStudio's Astro front end read your site over the REST API under REST restriction, using its project secret key.
---

# PhantomStudio Integration

**Tier: Basic** — Toggle plus one stored credential. When REST API restriction is on, requests that carry your PhantomStudio project's secret key are let through.

PhantomStudio keeps WordPress as your content system and builds an Astro front end from it, reading your content over the REST API. With REST API restriction on, those reads are refused unless the request is authenticated. This integration lets PhantomStudio in by recognizing its project secret key, without turning the restriction off for anyone else.

## What the toggle does

- With REST API restriction on, a request that carries your project's secret key in the `X-PhantomWP-Secret` header is let through.
- Nothing opens until a key is saved. With the toggle off, or no key stored, the restriction applies exactly as before.
- A match lifts the restriction for that request across the whole REST API, not just specific routes, the same way an authenticated request is let through. It does not sign the caller in as a user.
- The key is stored encrypted, is left out of exports and backups, and is not synced to FlowMattic.

## Setup

1. In PhantomStudio, open the project's WordPress settings and connect your site.
2. Expand **Security** and copy the secret key. It starts with `pwp_`.
3. In WordPress, go to **Integrations** and find **PhantomStudio** in the **SEO & Content** category.
4. Toggle it **ON** and click **Save Changes**.
5. Open **System / API**, paste the key into **PhantomStudio Secret Key**, and save. Leave the field blank on later saves to keep the stored key.

When REST API restriction is off, the integration has no practical effect, because your REST API is reachable either way.

## Limits

- **Block All still blocks it.** When Block All is enabled, every REST request is refused, including ones that carry the secret key.
- **User enumeration hardening still applies.** The `/wp/v2/users` route stays hidden from PhantomStudio, so author details may not be readable.
- **One key at a time.** To rotate the key, paste the new one here. There is no overlap period for the old key.
- **This only lifts this plugin's restriction.** A firewall, a Cloudflare rule, or another security plugin in front of your site needs its own rule for PhantomStudio.
- **Responses are marked uncacheable.** Responses to requests that carry the key tell site caches not to store them. A CDN, edge, or server cache that ignores origin cache headers and caches `/wp-json` would still replay them to anyone, so exclude `/wp-json` from such rules.
- **Always use HTTPS.** The secret key travels in a request header.

## Resources

- [PhantomStudio](https://phantomwp.com) — vendor site.
- [Connecting WordPress](https://phantomwp.com/docs/wordpress/connecting) — connect a site to a project.
- [WordPress security](https://phantomwp.com/docs/advanced/wordpress-security) — how the secret key and your site's security fit together.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how the restriction and its pass-throughs work end-to-end
- [Integrations Overview](overview.md) — all supported integrations
