---
sidebar_position: 2
title: Configuration
description: Settings reference for all SyteOps options, defaults, and what they control.
---

# Configuration Reference

This document covers the key settings available in SyteOps and their effects.

## Saving settings

Most settings tabs keep **one Save Changes button** at the bottom of the page. Extra Save buttons on the Integrations, System / API, and CRM tabs are gone — use that footer.

The **Users** and **Backup** tabs hide that footer. On Users, each person card still has its own Save. Backup uses its own backup and restore actions.

Admin connection and domain buttons say what they save, rather than a generic Save.

On the **General** tab, admin buttons, heading bars, and role badges on user cards pick **black or white text** from your brand color so the label stays readable.

## Admin Tab

The Admin tab is the primary configuration surface. It contains:

### SyteOps Modules

Toggle modules ON/OFF. Modules must be uploaded as ZIP packages before they can be enabled. When toggled OFF, FlowMattic variables are cleaned up but all settings data is preserved for easy re-activation.

### Configuration Management

- **Export Master** — Export all settings as a master configuration file
- **Export Scoped** — Export settings for a specific tab or area
- **Import** — Import a configuration file (master or scoped)
- **Full Backup** — Create a complete ZIP backup including all settings, module data, and licensing records (keys, tokens and passwords are never included)

### Other Options

- **Debug Mode** — Enables the Debug Tool and structured logs under wp-content. Required for destructive wipes.
- **Label FlowMattic variables with a description** — Off by default. When on, every variable the plugin writes carries a short "… Setting/Variable" label in FlowMattic's Variables screen. Leaving it off keeps that Description column blank so the list is easier to scan. Only these auto-generated labels are added or removed — any description you wrote yourself is left alone.
- **REST API Restriction** — See [REST API Restriction](../features/rest-api-restriction)

## Users Tab

Manage users with 31+ fields per user:
- Identity (name, email, phone)
- Contact information
- CRM IDs (15 supported CRM systems)
- Profile pictures
- Role assignments
- Module data (when modules are enabled)

### System Roles

Single-assignment roles (only one user per role):

| Role | Purpose |
|---|---|
| Site Owner | Primary site owner/administrator |
| Technical Contact | Primary technical contact |
| Marketing Contact | Primary marketing contact |

### Custom Roles

User-defined roles with flexible assignment. See [User Management](../features/user-management).

## CRM Tab

Centralized CRM system configuration. See [CRM Management](../features/crm).

- CRM count selector (0–15 systems)
- Per-CRM fields: name, code, URL, admin-only flag, encrypted API credentials
- Platform selection: Primary Communication Platform, Primary Booking Platform
- CRM Variables (RSVS) with FlowMattic sync

## General Tab

- FlowMattic quick links and workflow access
- Theme customization settings
- Clickable code values for copying variable names

### Company Information

This is where you tell SyteOps who your business is. Every field here becomes part of your site's shared business identity — used across automations, the Review Portal, and (where applicable) AI-facing surfaces.

- **Company Name** and **Agency Name**
- **Company Address** — Street Address 1 and 2, City, State, **Zip / Postal Code**, and **Country**. International postal formats are accepted, so UK, Canadian, Japanese and other non-US codes save exactly as you type them.
- **Business Profile**:
  - **Description** — one or two sentences describing what the business does. This feeds single-line AI surfaces, so keep it short; line breaks are collapsed on save.
  - **Entity Type** — Organization, or Person for a personal brand. Leave it unset if you'd rather not specify.
  - **Business Hours** — free text, e.g. `Mo-Fr 09:00-17:00`.
- **Social & public links** — Home Page, Blog, Facebook, Instagram, TikTok, YouTube, **LinkedIn**, **X (Twitter)**, Trustily, Proof of Insurance, Logo Image, and Image Storage.

#### Where this is used

- **FlowMattic automation variables** — every field above syncs to a FlowMattic variable your workflows can reference, so a change here reaches your automations automatically.
- **Review Portal branding** — if a reviewer's branding override doesn't set its own company name, the Review Portal falls back to the Company Name set here.
- **Answer-engine publishing (LLMS Amplifier)** — if the LLMS Amplifier integration is installed and active, your business profile (name, description, entity type, logo, address, social links, and hours) can be published into Amplifier's own AI index file, so AI agents reading it learn who the site belongs to. This is a separate on/off switch located under **Content Pipelines → Answer Engine → Answer-engine publishing → "Business identity in the LLMS Amplifier index."** Anything already configured directly in LLMS Amplifier's own settings always takes priority — SyteOps only fills in what's missing.
- **Contact emails and phone numbers are never published** by any of the above — they are excluded from this shared identity entirely and stay private no matter how these settings are configured.

### Outbound Email

- **Send Transactional Emails From** — the address SyteOps emails come from. Leave it blank to use `noreply@` your site's domain.
- **Add Site Name to Email Subjects** — on by default. Prefixes every SyteOps email subject with `[Your Site Name]`, so a mailbox that receives mail from more than one site can tell at a glance which one an email is about. Turn it off to leave subjects exactly as each email already builds them.
- Every SyteOps email also shows your site's name as the sender rather than a generic fallback, and Review Portal mail about the same article threads together in your inbox instead of arriving as unrelated messages.

## Integrations Tab

- Integration toggles (enable/disable individual integrations)
- Team communication (Slack)
- Booking platform integration (Fluent Booking)
- Code injection textareas with CodeMirror syntax highlighting

## System / API Tab

A per-integration configuration surface organized as collapsible cards — one card per integration or feature that needs credentials, endpoints, or AI configuration. Cards only appear for integrations that are currently toggled ON, so the page stays focused on what you're actually using.

Each card contains sections:

- **Credentials / API keys** — provider tokens, secret keys, webhook tokens. All secrets are encrypted at rest and masked after save.
- **Endpoints / Webhook URLs** — copy-ready URLs your external services should call.
- **Feature-specific settings** — link density, keyword matching mode, enrichment tier, etc. Varies by integration.
- **AI Providers** (for AI-using features) — the per-feature AI provider, model, and max-tokens selectors described on the [AI Providers](../features/ai-providers) page.

There is also a top-level **API Keys** tile that lists all six AI providers side-by-side with live balance display and per-provider refresh.

Navigate via the admin menu: **SyteOps → System / API**.

### Page cache

The **Page cache** card keeps public pages in step with your changes. When you publish, update, schedule, trash or permanently delete a post or page, SyteOps clears that page from the LiteSpeed Cache and Cloudflare caches, along with its old address after a slug change, the home page, the blog index, the category and tag pages the post is in or has just left, the author page, the main feed, the post type archive and your SEO plugin's sitemaps. The purge runs in the background about 30 seconds after the last change, once for a burst of changes. A page saved in the Review Portal is cleared at once, and the pages that show it follow in the background. Saving a navigation menu, a header, footer or site-settings template, a block template or a reusable block, or changing the web address of a category or tag, clears the whole site, at most once every five minutes; a page you save while that wait is running is still cleared on its own after about 30 seconds. Changing the address of a page that has child pages, or publishing a draft page under a new address while it has published child pages, clears the whole site too, because the child pages move with it. Saving any other kind of Elementor template, such as a section or a popup, clears only that template's own address. Pagination pages and custom taxonomy pages are not cleared one by one; a whole-site purge covers them. Changes made in the WordPress Customizer or in a theme's own options page are not detected: clear the cache by hand after changing them.

LiteSpeed Cache is told to drop a page through a message that travels with a visitor's page load, so a background clearing cannot deliver it by itself. When you save a page yourself, LiteSpeed is told right away, and Cloudflare is cleared about 30 seconds later, after LiteSpeed has let go of the page. A whole-site clearing, a clearing asked for by an integration and the Purge caches button of the Visitor check work the same way: Cloudflare is cleared only after LiteSpeed has been told. When the change happens in the background, SyteOps keeps a note that LiteSpeed still has to be told, sends it with the next visitor's page load, and holds the Cloudflare clearing until then, so Cloudflare cannot copy the old page back from LiteSpeed. If no visitor loads a page within about a minute, Cloudflare is cleared anyway and the Last purge table says SyteOps could not confirm LiteSpeed was told. A page gets at most three Cloudflare clearings for one change. If Cloudflare is briefly unavailable, SyteOps tries again about a minute and then about three minutes later; a refused token or a missing zone is not retried, and the error shows in the Last purge table.

- **Related-page purge** — **Automatic** (the default) turns the related pages on when LiteSpeed Cache is active or the Cloudflare integration is on. **On** always clears them. **Off** clears only the page you changed, on every trigger (publish, update, Review Portal save, SEO write and the management API). A menu or template save has no page of its own, so it still clears the whole site while LiteSpeed Cache or Cloudflare is in use.
- **Cloudflare purge mode** — **URLs** (the default) clears only the changed pages. **Entire zone** clears everything Cloudflare has cached for the site, even for a single page, and counts as a whole-site purge, so it also happens at most once every five minutes; the changed pages are still cleared in LiteSpeed Cache (at once, or after about 30 seconds for a page saved during the wait) and the Cloudflare clearing follows when the wait is over. If Cloudflare refuses the clearing, the Last purge panel shows the error and the clearing is not repeated until a later change books another. **Off** never calls Cloudflare: it is left out of every purge, including the robots.txt, media hold and media rename purges, and the Last purge panel shows it as off.
- **Rebuild Elementor styles after a clear** — **Automatic** (the default) turns it on when Elementor is active. **On** always rebuilds after an Elementor clear. **Off** does nothing after an Elementor clear, so a page cache can keep pointing at a stylesheet that was removed until it expires or you clear it by hand.
- **Purge after updates** — **Automatic** (the default) turns it on when a cache layer is active, that is LiteSpeed Cache or the Cloudflare integration. **On** always purges after an update. **Off** never does.
- **Visitor check** — **Automatic** (the default) turns it on when a cache layer is active, that is LiteSpeed Cache or the Cloudflare integration. **On** always runs it. **Off** stops it.
- **Last purge** — a read-only panel that shows the result of the most recent purge for each layer, so you can check that LiteSpeed Cache and Cloudflare cleared what was asked. LiteSpeed Cache never confirms a purge, so it reads **Asked to purge**, not Purged.

Cloudflare clears the address of a page, not the copies of it that were requested with extra parameters on the end, such as campaign links that carry tracking parameters. Each of those is kept separately until it expires. To have them cleared with the page, set Cloudflare (outside SyteOps) to ignore tracking parameters when it caches, or use the entire-zone mode.

When Elementor's stylesheets are cleared, whether from Elementor's tools page, by a SyteOps tool or by a media rename, SyteOps rebuilds the stylesheets for your Kit and every page built with Elementor, in small batches in the background, and clears the page caches only after the last batch. A visitor is never served a cached page that points at a stylesheet that no longer exists. If a rebuild fails or runs too long, the page caches are still cleared and the Page cache card notes it, with how many pages could not be rebuilt. Clearing the cache for one edited Elementor page rebuilds only that page's styles, and clears that page's cached widgets, before the clearing, instead of rebuilding every page's styles. Changes to the Kit, headers, footers and other site-wide templates still clear everything.

When plugins, themes or WordPress itself are updated, SyteOps clears the page caches once for the whole batch of updates, so a visitor is not served a page that still points at the old styles or scripts. Translation updates are skipped. If an Elementor stylesheet rebuild is running at that moment, the clearing waits for the rebuild to finish, and a page you save in the meantime is still cleared within about 30 seconds. The site also reacts when SyteHero clears its page caches: once SyteHero announces a flush, SyteOps clears the Cloudflare CDN and the page cache as well.

The visitor check looks at your site the way an anonymous visitor does. Every 30 minutes it fetches the home page and the three newest published posts, and checks that every stylesheet and script they link loads and, when Elementor is active, that the Elementor styles are present. The Visitor check panel on the Page cache card shows the result of the last check, with the pages, their cache headers and the failures by address and reason. The same failure has to be seen on two checks in a row before it counts. Then SyteOps posts it to Slack, if a Slack incoming webhook is set up, and a Purge caches button appears on the card. The check never purges by itself; that button is the only thing that clears the cache from it. A Cloudflare challenge page, or a site that cannot reach itself, shows that the check could not run and sends no alert.

When LiteSpeed Cache is active, the card also shows a read-only line, LiteSpeed Cache lifetime, with how long LiteSpeed keeps public pages, the front page and feeds in its cache, for example "Public pages 7 days, front page 7 days, feeds 7 days". It is read from LiteSpeed Cache as it is set now, and a value that cannot be read shows as unknown. A lifetime of zero shows as not cached. When public pages are kept for more than 24 hours, a warning sits under the line: a page can stay cached that long after a change that no purge reached. SyteOps clears the cache when pages are saved and when updates finish, but a shorter lifetime limits the damage when something slips through. To change it, open LiteSpeed Cache, then Cache, then the TTL tab, and set Default Public Cache TTL. SyteOps never changes that setting.

A read-only Cache state panel sits above the Last purge table. It shows which cache layers are present (LiteSpeed Cache, Cloudflare and its purge setting, Elementor), whether WP-Cron is switched off on the site, and a short record of the address that delivers LiteSpeed's purge: how many purges are waiting for a page load to carry them, and when that address last answered a nudge or a visitor's page load. The address needs no login, so anyone can call it. A recent nudge shows that something called, not that your scheduled job did. An answer that found nothing waiting is recorded at most once every 30 seconds, so the counts are recorded answers, not requests.

A delayed purge is sent when the background run happens. On a site where background tasks start from visits, that is when the next visit loads, and LiteSpeed Cache also keeps the request for the following visit. On a site where the host runs background tasks from the command line, LiteSpeed Cache stores the purge in its own queue and sends it a moment later by a request back to the site. This hand-off has not been checked on a live site yet, so if a delayed page stays stale on LiteSpeed Cache, use Purge All once.

## Backup Tab

Full backup and restore surface. See [Backup and Restore](../features/backup-and-restore).

## Variable Set Tabs

Custom tabs for managing variable collections. See [Variable Sets](../features/variable-sets).

## REST API Settings

Logging, access control, and allowlist configuration. See [REST API Restriction](../features/rest-api-restriction).

## FlowMattic Sync

All configuration changes made in SyteOps are automatically synced to FlowMattic variables for use in automated workflows. This happens transparently — no manual sync is required.

A **Resync All Variables** button is available for manual synchronization if needed.
