---
sidebar_position: 20
title: PhantomStudio Integration
description: Let PhantomStudio read your WordPress content, read-only, over the REST API with its project secret key.
---

# PhantomStudio Integration

**Tier: Basic** — Toggle plus one stored credential. A request that carries your PhantomStudio project's secret key is let through the REST restriction and can read your WordPress content, read-only.

PhantomStudio keeps WordPress as your content system and builds a front end from it, reading your content over the REST API. This integration recognizes its project secret key and lets it in, without turning the restriction off for anyone else.

## What a matching key can and cannot read

A request that carries your key in the `X-PhantomWP-Secret` header, while nobody is signed in, reads the WordPress content routes (`/wp-json/wp/v2/`) with read-level rights. The key never signs anyone in.

**It can read, read-only:**

- Published, draft, pending, scheduled, private and password-protected content of every REST-enabled content type, by id and in listings, including each post's password field, raw content, unpublished revisions and the numeric author id.
- Terms, media, menus and menu locations, installed fonts, global styles and the active theme's data.
- Authors' public profiles: name, slug, bio, link and avatar links, only for accounts that have published content. Avatar links contain a hash of the author's email, exactly as on any WordPress site.

**Served exactly as to any visitor, not part of the read access:** comments, search, and the lists of content types, taxonomies and statuses.

**It cannot read:**

- User emails, accounts that have not published content, or roles and capabilities.
- Commenters' emails, IP addresses or user agents, and unapproved, spam or trashed comments.
- Application passwords, the plugin list, site settings, inactive themes, block rendering, widgets, font catalogs, or any route outside the allowed list. Other plugins' routes are unaffected.

**It cannot create, change or delete anything.** Only `GET` and `HEAD` requests are granted; a `POST`, `PUT`, `PATCH` or `DELETE` that carries the key gets exactly what an anonymous request gets. The rights lent are read-level content and theme-option rights, not site administration.

**The exposure, plainly:** anyone holding the key can read every draft, private and password-protected item through those routes, but no user emails, and cannot change anything. Treat the key like a password.

**Custom content types are readable in full.** A site that stores personal data as a content type (for example form entries or leads kept as posts) exposes it to whoever holds the key.

Anything PhantomStudio can read it can publish on your front end, so check the first build before you share it.

## PhantomWP Connect

Writes go through PhantomStudio's companion plugin, PhantomWP Connect, which this integration does not replace. Install it from the PhantomStudio project's WordPress panel; it pairs on the first admin visit. While this integration is on, its routes under `/wp-json/phantomwp/v1/` are let through the REST restriction automatically, and Connect authenticates each request itself with a per-project signature. Block All still blocks them. [PhantomWP Connect documentation](https://phantomwp.com/docs/wordpress/phantomwp-connect).

## Other effects of the toggle

- The key is stored encrypted, is left out of exports and backups, and is not synced to FlowMattic.
- Every response to a request that carries the key is marked uncacheable.

## Setup

1. In PhantomStudio, open the project's WordPress settings and connect your site.
2. Expand **Security** and copy the secret key. It starts with `pwp_`.
3. In WordPress, go to **Integrations** and find **PhantomStudio** in the **SEO & Content** category.
4. Toggle it **ON** and click **Save Changes**.
5. Open **System / API**, paste the key into **PhantomStudio Secret Key**, and save. Leave the field blank on later saves to keep the stored key.

With REST API restriction off, your REST API is reachable either way, but the key still matters: it is what gives PhantomStudio the read access above and lets it read author details past User Enumeration Defense.

With REST logging on, a request that presents the key and is not signed in to WordPress is always recorded, even on routes the log is set to suppress, and are labeled **Shared secret** instead of unauthenticated. A signed-in person's own requests are logged or suppressed as usual, even if their browser sends the key.

## Limits

- **Block All still blocks it.** When Block All is enabled, every REST request is refused, including ones that carry the secret key.
- **Authors.** With the key, PhantomStudio can read authors who have published content, and the authors embedded in posts and pages, with REST API restriction on or off. Front-end author archives and `?author=` links stay hidden even with the key.
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
