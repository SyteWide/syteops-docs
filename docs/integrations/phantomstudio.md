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
- A change to a setting the frontend reads only at build time also triggers a rebuild: the pages kept on WordPress (including the store's cart, checkout and account page choices), the company name, the theme colors, and the Lead Attribution consent mode, internal-traffic parameter, goals and tracker options. Saving a setting without changing it, or changing an unrelated one, does not.

**What never triggers one:** orders, stock changes from a sale, refunds, customers and coupons, so a sale never rebuilds your site. Also not covered: changes made directly in the database or only to a post's custom fields without saving the post, sticky posts, term meta, a block theme's navigation, media library changes, site title and permalink settings, theme changes, users and comments. If you change one of those, deploy from PhantomStudio.

**One rebuild for a burst of changes.** The first change starts a one-minute wait; every change in that minute rides along, and one request is sent when it ends.

**When it actually goes out.** The request is sent by WordPress's scheduled tasks (WP-Cron), and WP-Cron runs only when WordPress receives a request. The deploy is triggered by the first request WordPress receives at least a minute after the change: an admin screen left open, a visitor's page view, an API read, or a system cron. On a site that receives no requests, it waits until one arrives, which on a purely headless backend can be a long time. If your site is headless, set up a real system cron that calls WordPress every minute, because that makes the timing predictable. The pairing status below shows `wp_cron_disabled`, which is `true` when WordPress's own scheduled tasks are switched off and a system cron is therefore required. A lost scheduled task is picked up again on the next ten-minute check, which is also driven by requests.

**Other plugins can ask too.** Another plugin on the same site can ask for a rebuild, for example when something it shows changes on a schedule. The request goes through the same one-minute wait as every other change, so it adds to the same single deploy, and it does nothing when the integration or automatic deploys are off or no valid address is saved.

**How the request is sent.** WordPress sends a POST to the address you pasted without the part after `?`, the way PhantomStudio requires: the secret goes in a request header and the repository name in the request body. Neither ever appears in an address PhantomStudio or anything in between records. The address must include its `secret=` and `repo=` parts: one without either is refused when you save, and if one was saved before this check, the screen says the switch is doing nothing and no rebuild is asked for.

**If a request fails.** SyteOps waits up to 20 seconds for PhantomStudio to answer, because PhantomStudio answers only after it has started the deploy. If it takes longer than that, the screen says **sent** and the rebuild was most likely started, and the request is not repeated, so a slow answer never deploys twice. A network error before the request went out (for example the connection could not be made), a server error (5xx), a request timeout (408) or a request to slow down (429) is tried once more after another minute. Any other refusal, such as a 404 (the repository or the webhook address was not found), is not retried, and neither is a redirect, because WordPress does not follow redirects for this request. The second failure is final: the screen shows it, and the next change asks again.

**Where to find the address.** In PhantomStudio, open your project and find the **Auto-Deploy Webhook** panel. Copy the address. It starts with `https://phantomwp.com/` and **it is a secret**: anyone who has it can start a deploy, so it is stored encrypted, shown masked and left out of exports and backups. This plugin never writes it to a log or shows it in a message. A plugin that records WordPress's outgoing web requests can see it, so be careful with those. The address is checked when you save (it must be an `https` address on `phantomwp.com`; anything else is refused with a message and not stored) and again before every request. The address changes with each build in PhantomStudio, so paste the new one here when it does; leave the field blank on later saves to keep the stored one.

If the switch is on but no valid address is saved, the screen says the switch is doing nothing. In the **Last rebuild call** row, a line shows when the last request went out and how it ended (for example **HTTP 200**, **failed: HTTP 404** or **failed: timeout**). A refusal from PhantomStudio says what it means:

| Result | What it means |
|---|---|
| `http_3xx` | the address redirects; copy it again from PhantomStudio (not followed, not retried) |
| `http_400` | the repository was missing from the request; the request was changed on the way or PhantomStudio changed how it accepts it — copy the address again |
| `http_401` | the webhook secret header was missing; the request was changed on the way or PhantomStudio changed how it accepts it — copy the address again |
| `http_403` | the webhook secret is invalid; regenerate the webhook URL in PhantomStudio and store it again |
| `http_404` | repository or webhook address not found; check the stored repo value (PhantomStudio expects the bare repo name, not owner/name) and the address |
| `http_405` | wrong method; the request was changed on the way or PhantomStudio changed how it accepts it — copy the address again |
| `http_429` | PhantomStudio asked to slow down; the first such answer is tried once more |
| `sent_unconfirmed` | sent — PhantomStudio took longer than 20 s to confirm; the rebuild was most likely started (not retried, and not counted as a failure) |

Only the 429 is tried again. Because SyteOps always sends the method, the secret header and the repository, a 400, 401 or 405 means the request was changed on the way or PhantomStudio changed how it accepts it: copy the address again. For a 403, regenerate the webhook URL in PhantomStudio and save it again; for a 404, check the repository name and the address.

## The headless card on Systems / API

While the integration is on, every PhantomStudio setting sits in one card on **Systems / API**, in the order a pairing is set up. A status line at the top reads like the pairing status and names exactly what is missing, for example "Rebuilds off: auto-deploy is switched off" or "Rebuilds off: no webhook URL stored". An address with no usable secret or no usable repository part reads "Rebuilds off". When a rebuild call came back refused, it says what that answer means, in the same words as the table above.

- **Pairing:** the integration state, the secret key (set or not, never shown), PhantomWP Connect, the frontend address and the headless switch.
- **Rebuilds:** the auto-deploy switch, the saved webhook address shown as its host and a masked path (the secret part is never shown), the wait before a rebuild and the time and result of the last call.
- **What the frontend gets:** the pages kept on WordPress, the store pages to build, the brand font and spacing, the brand colors switch, and the internal-traffic parameter and IndexNow state, which are set in Content Pipelines and shown here with a link.

Every setting keeps its name and its saved value; the card only gathers them.

## Headless install

If the public site is served by the PhantomStudio frontend, **System / API** shows two more settings while the integration is on:

- **This is a headless install.** The public site is served by the PhantomStudio frontend. WordPress serves the editor and the cart, checkout, account and receipt pages.
- **Frontend address.** The https address of the frontend, with no path, for example `https://www.example.com`. It is not a secret, so it is shown as typed.

The address is cleaned up when you save: the host is lowercased and a trailing slash is dropped. It is refused, with a message and the old address kept, when it is not https, has a path, a query or a login in it, or points at `localhost`, an IP address or a name with no dot. The switch cannot be turned on until a valid address is saved: it stays off and the screen says why. Clearing the address turns the switch off, and the screen says so. Only a SyteOps Admin can change either setting. They describe this site's own pairing, so they are left out of exports, backups and restore points, and an import keeps the values already on the site.

With the integration on, **This is a headless install** on and the frontend address saved, this site accepts the lead events that the lead tracker posts from the frontend, and the tracker's token in the request body; they are no longer discarded as coming from another website. This is the receiving side only. The frontend pages must load the tracker script themselves and be given the ingest and bootstrap addresses, which WordPress emits only into pages it renders itself, so a frontend page does not get them today. Form goals that this site captures on the server read cookies from the backend and are not covered for frontend visitors. With the integration or the switch off, lead capture behaves exactly as before. The two settings do not change what PhantomStudio can read or how the REST restriction behaves.

### Brand colors on the shop and forms

While the integration is on, System / API also shows **Write brand colors to the shop and form plugins**. It acts only while **This is a headless install** is on; a site that has never touched the box follows that switch, so it is on for a headless site and off for any other, and a choice you make is kept. With it on, the cart, checkout, account and form pages that WordPress still serves use the same five theme colors the frontend gets in `brand`, so the two look alike:

- The primary color becomes the shop's main color, button color and active outline; the button text is black or white, whichever reads better on it, and the button hover is a slightly darker or lighter shade of it.
- The accent color becomes the shop's active-text color, the secondary color its secondary button and softer active outline, and the heading text color its main text color.
- The primary color also becomes the form plugin's main color, and the warning color its error color.

Nothing else is changed: surfaces, borders, inputs and corner radii stay as those plugins have them, and the brand font and spacing are not written because neither plugin has a setting for them. It only acts on the public site, never in the admin, and only while those plugins are active. It does nothing when this is not a headless install, whatever the box says, so a site that is not headless is unchanged. Text colors are written only where they read on the shop's own background; otherwise the shop keeps its own text color. Turning it off removes the colors on the next page load. A color that is not a plain hex color is skipped. Limit: a shop page that does not call the standard page header will not carry the colors.

## Setting the frontend and asking for a rebuild from the command line

Two more commands do what the settings screen and a content change do, for a fleet that is set up over SSH:

```bash
wp syteops phantomstudio set-frontend https://www.example.com --headless
wp syteops phantomstudio set-frontend https://www.example.com --no-headless --internal-traffic-param=sw_internal
wp syteops phantomstudio rebuild
```

`set-frontend` checks the address with the same rules as the settings screen, refuses a bad one with an error and a non-zero exit, and prints the stored address and whether headless is on. `--headless` is refused unless a valid address is stored. It never turns the PhantomStudio integration on: when the integration is off it prints a line saying the settings take effect once it is on. `--internal-traffic-param` sets the Content Pipelines parameter that keeps editorial visits out of analytics, using that setting's own cleanup; an empty value clears it. A change that the frontend reads when it is built asks for a rebuild, as it does from the settings screen.

`rebuild` asks for a rebuild through the same wait and checks as every other change and prints one line: queued, or why not (the integration is off, Deploy when content changes is off, or no valid deploy address is saved, or the saved address has no usable secret or repo in it). It exits non-zero when nothing was queued. Neither command prints the project key or the deploy address. The pairing status lists `cli_set_frontend` and `cli_rebuild` among its capabilities, so a hub can tell a site has them.

Two read commands print, over SSH, exactly what the site's project-key lists answer, for a hub that holds no project key:

```bash
wp syteops phantomstudio exclusions --format=json
wp syteops phantomstudio expected-pages --format=json
wp syteops phantomstudio seo --page=1 --format=json
```

Each prints the same JSON the matching list sends to the frontend (the pages left out of the build, and the page counts a build should hold), then a newline; anything else goes to the error stream. With the integration off, each prints the same error answer the list gives and exits non-zero; `expected-pages` does the same when the page count cannot be read. If something stops the command partway, it prints nothing on the output stream and exits non-zero. JSON is the only format. The third prints one page of SEO records (see below); `--page` and `--per-page` choose the page. The pairing status lists `cli_exclusions`, `cli_expected_pages` and `cli_seo` among its capabilities.

## SEO data for the frontend

With a frontend address saved, the site lists one SEO record per published page at `/wp-json/syteops/v1/phantomstudio/seo?page=1&per_page=50`, so the frontend builds each page's head from what your team edits in its SEO plugin. Like the other lists it answers only to the project key, and with the integration off the address does not exist (a 404). Each record holds the page address, title, description, canonical address, search-engine visibility, social sharing text and image, and structured data, with every address of this site already on the frontend address. Only the SEO plugin that is turned on is read; with none, the page's own title, excerpt and address are used. Drafts, private pages, password-protected pages and the pages you leave out of the build never appear. For Rank Math and Squirrly SEO the structured data holds only what is saved on the page itself, not the site-wide entries those plugins add when a page is shown.

The structured data leaves out the site search action and the address of each author, and any author page, because a frontend usually has no search page or author pages. If yours does, turn on **Frontend has a search page** or **Frontend has author pages** under Systems / API (both are off until you choose), and the records include them again. Images keep their addresses on this site.

## Redirects for the frontend
The site lists its redirects at `/wp-json/syteops/v1/phantomstudio/redirects?page=1&per_page=50`, so the frontend can serve them itself. It answers only to the project key, and with the integration off the address does not exist (a 404). Rules come from Redirection, Pretty Links and LinkCentral, whichever are running, as an old path, a new address (this site's addresses already on the frontend address), and a status. Only exact-path rules are listed; pattern rules, conditional rules and anything else a frontend cannot copy are named separately so nothing is lost silently. Disabled and trashed rules, and password-protected links, never appear. Rules that would loop (including redirects that circle back through other rules), sit on the home page, or are answered first by another rule are named separately too. When two plugins redirect the same path, the one a visitor reaches first wins (Pretty Links, then LinkCentral links with a prefix, then LinkCentral links without one, then Redirection) and the clash is reported.

## Forms for the frontend

The site lists the forms you choose at `/wp-json/syteops/v1/phantomstudio/forms?page=1&per_page=50`, so the frontend can show them as its own forms. It answers only to the project key, and with the integration off the address does not exist (a 404). This works with Fluent Forms. A form is off until you turn it on: list its ID under **Forms to use on the frontend** in the PhantomStudio card on Systems / API (the card lists your forms with their IDs), or run `wp syteops phantomstudio forms enable <id>` (and `forms disable <id>`). Only published forms are listed.

Each form comes with its fields in order (name, type, label, placeholder, whether it is required, choices, help text and simple limits), the submit button's text, what happens after sending (a message, or a page on the frontend address), and whether a honeypot or a captcha is set up. Nothing else is shared: notification emails, connected services, keys, entries and addresses of visitors are never included. A form that uses something the frontend cannot show natively (conditional fields, calculations, repeaters, file uploads, payments, several steps, address lookup and the like) lists those features, and the frontend then links to the form's page on WordPress instead.

## IndexNow changes for the frontend

On a site using Squirrly SEO with **Send to IndexNow** switched on, the site lists the pages that went live, changed or were removed since a number you pass, at `/wp-json/syteops/v1/phantomstudio/indexnow-changes?since=<number>`. Like the other lists it answers only to the project key, and with the integration off the address does not exist (a 404). Send the key in the usual project-key header after each successful deploy, then send the listed addresses to IndexNow yourself.

A frontend that cannot remember the last number between deploys can tell the site where it got to: after a successful send, `POST /wp-json/syteops/v1/phantomstudio/indexnow-changes/ack` with `{"cursor": <the cursor of the answer you sent>}`, with the project key. The site answers `{"acked": <number>}`. From then on a request without `since` lists only what changed after that number, and says so in `since_source` (`ack`, `request` or `default`); a `since` you pass always wins. An acknowledgment never moves backward, and a number the site never gave is refused.

The answer is `{"schema":1,"key":"...","key_file":"/<key>.txt","cursor":12,"changes":[{"url":"https://www.example.com/page/","kind":"live","time":1760000000}],"truncated":false}`:

- `changes` are oldest first, at most 500 per answer; a full 500 means ask again with `since` set to `cursor`. Start with `since=0` and keep the last `cursor`.
- `kind` is `live`, `change` or `removal`; a removal's address is the one the page had while it was live.
- `truncated: true` means your `since` is older than the list keeps (14 days or 1,000 changes): send every page once, then carry on from `cursor`.
- `key` is the IndexNow key Squirrly SEO stores, and `key_file` is where the frontend must serve it. This is the only place the site gives the key out. When no key is stored the answer has no `key` and says `"missing":["key"]`; open Squirrly SEO's LLM Indexing settings once to create it.

Turn Squirrly SEO's auto-indexing off on a headless backend, or its editor will send this server's addresses.

## Pages the frontend does not build

The cart, checkout, account and receipt pages of your store stay on WordPress, so the frontend must not build them. While the integration is on, the site lists them for the frontend at `/wp-json/syteops/v1/phantomstudio/exclusions`, an address that answers only to the project key (a signed-in administrator without the key is refused). Each store plugin that is active contributes its own pages (the second store also its order review page), and a page set to nothing is left out. An entry may be a page ID or a path; a pasted address of this site or of the frontend is cut down to its path, and capital letters are lowered. **System / API** has two more settings:

- **Also keep on WordPress.** The frontend does not build the pages listed here; enter page IDs or paths separated by commas.
- **Build these store pages.** Store pages listed here are built by the frontend although they are excluded by default.

Only a SyteOps Admin can change them. An entry that matches no page is named under the field and has no effect. The list routes (`/wp-json/wp/v2/pages` and the others) still return excluded pages, so the frontend must skip the ones in this list. Changing the list does not ask for a rebuild.

## How many pages a build should receive

While the integration is on, the site gives the frontend's build check the number of items it should be handed, at `/wp-json/syteops/v1/phantomstudio/expected-pages`. Like the exclusions list, it answers only to the project key; a signed-in administrator without the key is refused, and with the integration off the address does not exist (a 404, which the build check reads as "not offered").

Each number is the total the frontend's own keyed list request (`/wp-json/wp/v2/pages?per_page=1`, and the same for every other type) reports, minus the published excluded pages of that type, so it follows any plugin that narrows the lists (a language or visibility plugin) and never counts a draft, a private, a scheduled or a trashed item. The answer is `{"schema":1,"counts":{...},"routes":{...},"excluded":{...},"uncounted":[...]}`: `counts` holds whole numbers only, keyed by post type name and always with `page`; `routes` names the list address of each counted type; `excluded` says how many were subtracted; `uncounted` names types whose list gives no total. If the pages cannot be counted the answer is a 500 with the code `syteops_phantomstudio_count_failed`, so a build stops instead of deploying with pages missing.

Not every type appears in `counts`: do not assume one is there, and do not read `uncounted` as an error. A site with a store or other content types lists them too, at most 40.

## Site settings

While the integration is on, the site gives the frontend the public values it needs when it builds, at `/wp-json/syteops/v1/phantomstudio/site-settings`. Like the other project routes it answers only to the project key; a signed-in administrator without the key is refused, and with the integration off the address does not exist (a 404, which the build check reads as "not offered").

The answer is `{"schema":1,"settings":{...},"missing":[...]}`. A value the site does not hold is left out, never sent empty, and its name is listed in `missing`. Every value is one the site already shows in its own pages; no key, webhook address or recipient email is included.

- `consent_posture` is the Lead Attribution consent mode as saved (`optout`, `optin` or `geo`), and only while Lead Attribution is active; with it off the value is listed in `missing`.
- `internal_cookie` is the saved internal-traffic parameter name. The frontend's convention gives the cookie the same name as the parameter.
- `lead_tracking` is what the frontend needs to run the lead tracker: the tracker and consent script addresses, the ingest, bootstrap and jurisdiction addresses, the enabled goals, the consent settings, and how many days the first-touch cookie lasts. It is left out while Lead Attribution is inactive.
- `frontend_routes` says whether the frontend has a search page and author pages (`search` and `author`, both false until you turn them on under Systems / API).
- `brand` is the company name, the five theme colors (valid hex colors only), and the font and spacing you set under Systems / API (Brand font and Brand spacing, shown while the PhantomStudio integration is on). The font is a CSS font stack such as `"Inter", system-ui, sans-serif`; the spacing is a number with px, rem or em, such as `4px` or `0.25rem`. A value that is not valid is not saved, and the one you had stays. Changing either asks for a rebuild.

The frontend must hand the tracker its settings itself, as `window.SyteOpsLeads` before it loads the tracker script, using the camelCase names the tracker reads: `ingest_url` is `ingestUrl`, `bootstrap_url` is `bootstrapUrl`, `wpfp_mirror` is `wpfpMirror`, `reveal_desktop_only` is `revealDesktopOnly`, `attr_cookie_days` is `attrCookieDays` (how many days the first-touch cookie lasts), `goals` stays `goals`, and `consent` stays `consent` with `jurisdiction_url` moved inside it as `jurisdictionUrl` and `full_picture` as `fullPicture`. `tracker_src` and `consent_src` are the two script addresses (load the consent script first). `full_picture` is always `false` here, because the consent plugin does not run on a headless frontend and `true` would stop the tracker from ever firing.

`brand.spacing` and `brand.type` are listed in `missing` until you set them. No source exists on the site for `ga4_measurement_id` or `ringtonic_campaign`, so they are always listed in `missing` unless the site's own code supplies them (and may override the brand font and spacing) through the `syteops_phantomstudio_site_settings` filter. What the filter returns is checked again: known keys only, text of 191 characters or fewer, and a Google Analytics id must look like `G-XXXXXXXX` or it is dropped. A value the filter supplies leaves `missing`.
## SEO fields

When the site uses Squirrly SEO (and Yoast is not running), the frontend's project-key requests for pages, posts and other content types (and the site's own count requests for `expected-pages`, which ask for ids only) carry each item's saved search settings in the same shape Yoast uses (`yoast_head_json`): title, description, canonical address, social titles, descriptions and images, social card type, and the index and follow choices. Only values saved on the item are sent, and a saved text that still contains a placeholder such as a site-name tag is left out. Nothing is sent for an item whose own search settings are switched off. Squirrly's automatic defaults are not computed, so an item with nothing saved has no field and the frontend uses the item's own title. The canonical address points at the frontend when a frontend address is set. Visitors, and signed-in users without the project key, never receive the field.

## Originating post for Lead Attribution

With Lead Attribution active, the frontend's project-key requests for posts and other content (and the site's own count requests for `expected-pages`, which ask for ids only) carry one more value on each item that counts as an originating post: `syteops_originating_post`, the item's address on the frontend without the host (for example `/how-to/`). It is there only for a published item without a password, of a type checked under **Leads → Settings → Consent & privacy → Originating post types** (blog posts by default). Drafts, scheduled, private and password-protected items never carry it, and neither does a page the frontend does not build (an excluded page). Visitors, and signed-in users without the project key, never receive it.

The frontend must pass it to the lead tracker on that item's page only, as `originatingPost` in `window.SyteOpsLeads` next to the other tracker settings:

```js
if (window.SyteOpsLeads && item && typeof item.syteops_originating_post === 'string') { window.SyteOpsLeads.originatingPost = item.syteops_originating_post; }
```

Pages that show no single item (a list of posts, a home page that is not a WordPress page) leave it out, and the visitor's earlier originating post is kept. If your home page is built from the page set as the static front page and that type counts, pass its value too: it is `/`. Changing **Originating post types** asks for a rebuild, so every page carries the new answer.

## Form entries from the frontend

With **This is a headless install** on, a frontend address saved and Lead Attribution active, the frontend's browser can send a form entry straight to this site and have it recorded as a lead. Neither route needs the secret key, because a visitor calls them. With Block All on, both are refused. Without a headless install or without Lead Attribution, both answer 404. The pairing status lists the capability `form_route` only while an entry would be recorded: the routes exist and an enabled form goal in Lead Attribution accepts the provider `frontend` (the default goal does, as does any goal set to match all providers).

- `GET /wp-json/syteops/v1/phantomstudio/form-ticket` returns `{"ok":true,"ticket":"...","min_seconds":3,"ttl":3600}` and is never cached. Send the visitor's tracker session in `session_id` (optional). The ticket is tied to that session. At most 60 a minute from one address.
- `POST /wp-json/syteops/v1/phantomstudio/form` takes a JSON body with `form_id` (lowercase letters, digits, `_` and `-`, up to 64), `name`, `email`, `phone`, `message`, `hp` (the hidden spam trap, always empty from a real form), `ticket`, `session_id`, `visitor_id` and `page_url`. The visitor id is accepted and ignored. The session id travels in the body, because the frontend cannot share the tracker's cookies with this site. Post the entry at least 3 seconds after the ticket was issued and within an hour of it.

| Status | Meaning |
|---|---|
| 200 `{"ok":true}` | Recorded, or silently dropped (see below). A lead this entry created also returns `reference`, its public reference code. |
| 400 | The body is not a JSON object, a contact field is not text, or `form_id` has the wrong shape. |
| 403 | The `Origin` header is missing or is not exactly the frontend address. |
| 409 `expired` | The ticket is more than an hour old. Fetch a new one and post again. |
| 413 | A field is over 4 KB or the body is over 16 KB. |
| 503 `unavailable` | Nothing was recorded: no enabled form goal accepts the provider `frontend`, or another plugin vetoed the capture. Retry later. |
| 429 | More than 5 entries a minute or 20 an hour from one address. |

**A 200 can be a drop.** A filled `hp` field, a ticket that is missing, forged, issued for another session or younger than 3 seconds all get the same 200 `{"ok":true}` as a real entry, and nothing is recorded or logged, so the reply does not tell a bot which check it failed. Test with a real ticket and a wait.

The entry becomes a lead event in Lead Attribution (goal type form submit, provider `frontend`) on a lead of its own, and the four contact fields are saved on that lead following the Lead Attribution privacy mode. The route never writes to a lead that already exists: when the session already has a lead (a phone tap, for example), the entry is saved as a separate lead with no session, visitor or page. That is a deliberate trade-off: a returning visitor whose session already has a lead gets a second, unattributed lead, and nothing they typed is lost. The site runs the action `syteops_phantomstudio_form_submitted` with the lead id, the form id, `true` and the four cleaned fields, only for a lead the entry created. The route ignores cookies and ignores whoever is signed in. reCAPTCHA is not part of this version, and no form plugin is called.

## Pairing status

`wp syteops phantomstudio status` shows whether this site is paired and ready for a headless PhantomStudio frontend. It reads settings only: it sends nothing, changes nothing and never prints the project key or the deploy address, only whether each is set.

```bash
wp syteops phantomstudio status
wp syteops phantomstudio status --format=json
```

The default is a two-column table. With `--format=json`, the first line on standard output is one JSON object and nothing else is printed there; any other message goes to standard error. The command exits 0 whenever it runs, whether the integration is on or off and whether anything is configured, so a fleet check can read every site the same way. A non-zero exit means the command itself crashed, or that something ended the request before the summary was written; in that case a one-line explanation is printed to standard error.

Example line (fake values):

```json
{"schema":1,"syteops_version":"1.6.592","integration_enabled":true,"headless":true,"frontend_origin":"https://www.example.com","key_set":true,"rest_restriction":"authenticated","webhook_set":true,"webhook_last_trigger":1760000000,"webhook_last_result":"http_200","webhook_debounce_seconds":60,"webhook_events":["content","product","menu","taxonomy","settings","requested"],"stray_output_guard":true,"stray_output_last_seen":null,"connect_active":true,"connect_version":"2.4.1","capabilities":["rebuild_webhook","stray_output_guard","authors","rebuild_request","lead_origin","exclusions","expected_pages","site_settings","seo_fields","form_route"],"wp_cron_disabled":false}
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
| `webhook_set` | Automatic deploys are switched on and a deploy address is saved. The address is never shown. It does not say the address is usable: a saved address with no secret or repo in it still reads `true`, and `wp syteops phantomstudio rebuild` then says why nothing was queued. |
| `webhook_last_trigger` | When the last deploy request went out, as a Unix time, or `null` if none has. |
| `webhook_last_result` | How it ended, such as `http_200`, or `null`. Each refusal (`http_400`, `http_401`, `http_403`, `http_404`, `http_405`) has its own meaning, listed above; `refused_no_secret` and `refused_no_repo` mean the saved address has no usable secret or repo in it, so nothing was sent. The table format adds that meaning in parentheses; the JSON line carries the code alone. |
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
- **Authors.** With the key, PhantomStudio can read authors who have published content, with REST API restriction on or off. Four lookups are covered: one author by id, the list of authors, one author by slug, and the author embedded in each post and page. Each returns the same public fields: id, name, slug, link, bio, website and avatar links, and never an email, role or capability. An author who has no published content is not readable with the key, by design, so on a draft whose author has only drafts the embedded author is an error object (code `rest_user_cannot_view`, status 401), not an author; your front end must not treat it as one. Front-end author archives and `?author=` links stay hidden even with the key.
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
