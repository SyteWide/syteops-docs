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

**Elementor and LinkCentral, only when each plugin is active:**

- Elementor templates and every other Elementor content type on the WordPress content routes (read-only).
- LinkCentral links, with whatever fields that plugin exposes for them (read-only).

Elementor's and LinkCentral's own routes outside the WordPress content routes are unaffected.

**Served exactly as to any visitor, not part of the read access:** comments, search, and the lists of content types, taxonomies and statuses.

**It cannot read:**

- User emails, accounts that have not published content, or roles and capabilities.
- Commenters' emails, IP addresses or user agents, and unapproved, spam or trashed comments.
- Application passwords, the plugin list, site settings, inactive themes, block rendering, widgets, font catalogs, or any route outside the allowed list. Other plugins' routes are unaffected.

**It cannot create, change or delete anything.** Only `GET` and `HEAD` requests are granted; a `POST`, `PUT`, `PATCH` or `DELETE` that carries the key gets exactly what an anonymous request gets. The rights lent are read-level content and theme-option rights, not site administration.

**The exposure, plainly:** anyone holding the key can read every draft, private and password-protected item through those routes, including Elementor templates and LinkCentral links where those plugins are active, but no user emails, and cannot change anything. Treat the key like a password.

**Custom content types are readable in full.** A site that stores personal data as a content type (for example form entries or leads kept as posts) exposes it to whoever holds the key.

Anything PhantomStudio can read it can publish on your front end, so check the first build before you share it.

## PhantomWP Connect

Writes go through PhantomStudio's companion plugin, PhantomWP Connect, which this integration does not replace. Install it from the PhantomStudio project's WordPress panel; it pairs on the first admin visit. While this integration is on, its routes under `/wp-json/phantomwp/v1/` are let through the REST restriction automatically, and Connect authenticates each request itself with a per-project signature. Block All still blocks them. A headless install shows a dismissible notice to SyteOps Admins, on SyteOps screens and on the Plugins screen, while Connect is not active; dismissing it is permanent for that user. [PhantomWP Connect documentation](https://phantomwp.com/docs/wordpress/phantomwp-connect).

## Other effects of the toggle

- The key and the deploy webhook address are stored encrypted, are left out of exports and backups, and are not synced to FlowMattic.
- Every response to a request that carries the key is marked uncacheable.

## Deploy automatically when content changes

With the integration on, **System / API** also shows **Deploy when content changes** and **Deploy webhook address**. Switch it on and paste your project's Auto-Deploy Webhook address, and WordPress asks PhantomStudio to rebuild your site after a change, so you no longer paste a snippet into your theme.

**What triggers a rebuild:**

- A post, page or store product that is published, updated, unpublished, moved to the trash or deleted. A change to the categories or tags of a published post counts, even when the post itself is not saved.
- Elementor templates and LinkCentral links, when those plugins are active (the two content types PhantomStudio can read).
- A menu that is created, renamed, deleted or changed, and a menu location that is assigned or cleared.
- A category or tag that is added, renamed or removed (and a store product category or brand). A new category created while a draft is saved counts too, because it changes what your site's category lists contain.
- A store product that a merchant edits, whose variations change or that is duplicated. Editing a product that is not published does not.
- A WooCommerce store's products work the same way, with their categories, tags and brands. A published product whose regular price, sale price or sale dates change also triggers a rebuild, even when the product is not saved as a whole (a price edited by hand or through the WooCommerce API). A sale that WooCommerce starts or ends on its schedule triggers a rebuild too (with WooCommerce 10.5 or later at the exact time; older versions at the next daily check), and so does a variation that is published, unpublished or deleted. A stock change caused by a sale, such as an order reducing stock or a product selling out, never does.

**What never triggers one:** orders, stock changes from a sale, refunds, customers and coupons, so a sale never rebuilds your site. Also not covered: changes made directly in the database or only to a post's custom fields without saving the post, sticky posts, term meta, a block theme's navigation, media library changes, site title and permalink settings, theme changes, users and comments. If you change one of those, deploy from PhantomStudio.

**One rebuild for a burst of changes.** The first change starts a one-minute wait; every change in that minute rides along, and one request is sent when it ends.

**When it actually goes out.** The request is sent by WordPress's scheduled tasks (WP-Cron), and WP-Cron runs only when WordPress receives a request. The deploy is triggered by the first request WordPress receives at least a minute after the change: an admin screen left open, a visitor's page view, an API read, or a system cron. On a site that receives no requests, it waits until one arrives, which on a purely headless backend can be a long time. If your site is headless, set up a real system cron that calls WordPress every minute, because that makes the timing predictable. The pairing status below shows `wp_cron_disabled`, which is `true` when WordPress's own scheduled tasks are switched off and a system cron is therefore required. A lost scheduled task is picked up again on the next ten-minute check, which is also driven by requests.

**Other plugins can ask too.** Another plugin on the same site can ask for a rebuild, for example when something it shows changes on a schedule. The request goes through the same one-minute wait as every other change, so it adds to the same single deploy, and it does nothing when the integration or automatic deploys are off or no valid address is saved.

**If a request fails.** A network error or a server error (5xx) is tried once more after another minute. A refusal such as a 404 (usually a wrong or outdated address) is not retried, and neither is a redirect, because WordPress does not follow redirects for this request. The second failure is final: the screen shows it, and the next change asks again.

**Where to find the address.** In PhantomStudio, open your project and find the **Auto-Deploy Webhook** panel. Copy the address. It starts with `https://phantomwp.com/` and **it is a secret**: anyone who has it can start a deploy, so it is stored encrypted, shown masked and left out of exports and backups. This plugin never writes it to a log or shows it in a message. A plugin that records WordPress's outgoing web requests can see it, so be careful with those. The address is checked when you save (it must be an `https` address on `phantomwp.com`; anything else is refused with a message and not stored) and again before every request. The address changes with each build in PhantomStudio, so paste the new one here when it does; leave the field blank on later saves to keep the stored one.

If the switch is on but no valid address is saved, the screen says the switch is doing nothing. Under the address, a line shows when the last request went out and how it ended (for example **HTTP 200**, **failed: HTTP 404** or **failed: timeout**).

## Headless install

If the public site is served by the PhantomStudio frontend, **System / API** shows two more settings while the integration is on:

- **This is a headless install.** The public site is served by the PhantomStudio frontend. WordPress serves the editor and the cart, checkout, account and receipt pages.
- **Frontend address.** The https address of the frontend, with no path, for example `https://www.example.com`. It is not a secret, so it is shown as typed.

The address is cleaned up when you save: the host is lowercased and a trailing slash is dropped. It is refused, with a message and the old address kept, when it is not https, has a path, a query or a login in it, or points at `localhost`, an IP address or a name with no dot. The switch cannot be turned on until a valid address is saved: it stays off and the screen says why. Clearing the address turns the switch off, and the screen says so. Only a SyteOps Admin can change either setting. They describe this site's own pairing, so they are left out of exports, backups and restore points, and an import keeps the values already on the site.

In this version the two settings are stored and reported only. They do not change what PhantomStudio can read, how the REST restriction behaves or when a deploy is requested.

## Pairing status

`wp syteops phantomstudio status` shows whether this site is paired and ready for a headless PhantomStudio frontend. It reads settings only: it sends nothing, changes nothing and never prints the project key or the deploy address, only whether each is set.

```bash
wp syteops phantomstudio status
wp syteops phantomstudio status --format=json
```

The default is a two-column table. With `--format=json`, the first line on standard output is one JSON object and nothing else is printed there; any other message goes to standard error. The command exits 0 whenever it runs, whether the integration is on or off and whether anything is configured, so a fleet check can read every site the same way. A non-zero exit means the command itself crashed, or that something ended the request before the summary was written; in that case a one-line explanation is printed to standard error.

Example line (fake values):

```json
{"schema":1,"syteops_version":"1.6.592","integration_enabled":true,"headless":true,"frontend_origin":"https://www.example.com","key_set":true,"rest_restriction":"authenticated","webhook_set":true,"webhook_last_trigger":1760000000,"webhook_last_result":"http_200","webhook_debounce_seconds":60,"webhook_events":["content","product","menu","taxonomy","requested"],"stray_output_guard":true,"stray_output_last_seen":null,"connect_active":true,"connect_version":"2.4.1","capabilities":["rebuild_webhook","stray_output_guard","authors","rebuild_request"],"wp_cron_disabled":false}
```

| Field | Meaning |
|---|---|
| `schema` | The version of this format. It is `1`. |
| `syteops_version` | The SyteOps version on the site. |
| `integration_enabled` | The PhantomStudio integration is switched on. |
| `headless` | The headless install switch is on. It can be on while the integration is off. |
| `frontend_origin` | The saved frontend address, or an empty string. |
| `key_set` | A project key is saved. The key itself is never shown. |
| `rest_restriction` | `off`, `authenticated` or `block_all`: the REST restriction in force. |
| `webhook_set` | Automatic deploys are switched on and a deploy address is saved. The address is never shown. |
| `webhook_last_trigger` | When the last deploy request went out, as a Unix time, or `null` if none has. |
| `webhook_last_result` | How it ended, such as `http_200`, or `null`. |
| `webhook_debounce_seconds` | How long SyteOps waits after a change before it asks for a deploy. |
| `webhook_events` | The kinds of change that request a deploy. |
| `stray_output_guard` | SyteOps would discard HTML that another plugin prints into a content response. |
| `stray_output_last_seen` | When it last recorded such output, or `null`. |
| `connect_active` | The PhantomWP Connect plugin is active. |
| `connect_version` | Its version, or `null`. |
| `capabilities` | The features this site reports to PhantomStudio. |
| `wp_cron_disabled` | WordPress's built-in scheduled tasks are switched off on this site (`DISABLE_WP_CRON`), so a deploy waits for a real system cron. |

A plugin that prints plain text while WordPress loads, or that changes the PHP error display setting, can put text on standard output before the command starts. The command cannot prevent that.

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
- **Stray output from other plugins.** PhantomStudio reads every response as JSON. When another plugin prints HTML into a content response, SyteOps discards it so the JSON stays readable; this needs no setting and does not depend on the key. See [Clean JSON From Content Routes](../features/rest-api-restriction.md#clean-json-from-content-routes).

## Resources

- [PhantomStudio](https://phantomwp.com) — vendor site.
- [Connecting WordPress](https://phantomwp.com/docs/wordpress/connecting) — connect a site to a project.
- [WordPress security](https://phantomwp.com/docs/advanced/wordpress-security) — how the secret key and your site's security fit together.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how the restriction and its pass-throughs work end-to-end
- [Integrations Overview](overview.md) — all supported integrations
