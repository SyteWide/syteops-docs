---
sidebar_position: 6
title: Squirrly SEO Integration
description: How SyteOps writes SEO title/description/keywords into Squirrly SEO from Content Pipelines and the Review Portal, plus the admin settings-URL fix.
---

# Squirrly SEO Integration

**Tier: Extended** — Plugin-based toggle integration with a queued background job for IndexNow. When Squirrly SEO is installed and the integration is enabled, SyteOps writes SEO metadata into Squirrly's native storage and applies a small wp-admin fix.

SyteOps can use Squirrly SEO as the SEO engine for **Content Pipelines** and the **Review Portal**. When the integration is on, the SEO **title**, **description**, and **keywords** that a pipeline generates — or that a reviewer sets in the portal — are written to Squirrly's native post meta (`_sq_title` / `_sq_description` / `_sq_keywords`) and to the canonical `wp_qss` snippet row that renders your page `<title>`. There is no separate settings screen to configure: enabling the integration is all that's required.

:::important One SEO plugin at a time
SyteOps connects to **one** SEO plugin at a time. Turning on [Yoast SEO](yoast-seo) or [Rank Math](rank-math) automatically turns Squirrly SEO off, and vice versa. This is deliberate: two plugins writing the same page's title is how a site ends up with a `<title>` nobody can account for.
:::

:::note Removed in a recent release
Earlier versions exposed a **"Squirrly SEO Custom Settings"** card on the System/API tab — ACF field mapping, social-image dimensions, post-type targeting, and meta-field guards. That card and the **ACF field mapping** have been **removed**: Content Pipelines now own SEO end-to-end and write Squirrly's native fields directly. Existing `_sq_*` data is unaffected (it was already the source of truth).
:::

## Official Squirrly SEO (Newton) documentation

These are maintained by Squirrly and describe how the plugin stores SEO data and which filters exist:

- [Knowledge base home](https://howto12.squirrly.co/) — search the Squirrly SEO (Newton) knowledge base
- [Meta keys in `wp_postmeta` (`_sq_title`, `_sq_description`, `_sq_keywords`)](https://howto12.squirrly.co/faq/fetch-values-from-wp_postmeta)
- [Hooks: `sq_title`, `sq_description`, `sq_keywords`](https://howto12.squirrly.co/ht_kb/hook-squirrly-title-description-with-custom-data)
- [Database tables created by Squirrly (`wp_qss` and Advanced Pack tables)](https://howto12.squirrly.co/faq/what-database-tables-does-squirrly-create)

## What It Does

- **Pipeline and Review Portal SEO writing** — SEO title/description/keywords produced by a Content Pipeline's SEO stage, or entered in the Review Portal SEO panel, are written to `_sq_title` / `_sq_description` / `_sq_keywords` post meta **and** the canonical `wp_qss` row.
- **Settings-URL fix** — Automatically corrects a known Squirrly SEO inline-script syntax error in wp-admin. Enabled automatically whenever the integration is on.

## Requirements

- SyteOps installed and activated
- Squirrly SEO plugin installed and activated
- Squirrly SEO integration enabled in SyteOps

## Setup

1. Navigate to the **Integrations** tab in SyteOps
2. Toggle **Squirrly SEO** ON
3. Save

That's it — no additional configuration. With the integration on and the Squirrly SEO plugin active, Content Pipelines and the Review Portal write SEO data to Squirrly automatically, and the settings-URL fix is applied.

## How SEO values are written

A **Content Pipeline's SEO stage** and the **Review Portal** SEO panel are two surfaces over the same Squirrly fields (`_sq_title` / `_sq_description` / `_sq_keywords`), plus the `wp_qss` snippet row that renders the page title.

The **SEO title** has special handling: by default it is auto-generated from the **post title** (clean — the description is *not* appended; that's the meta description's job). If a reviewer types a **custom** SEO title in the Review Portal, SyteOps marks it as a manual override and stops auto-recomposing it, so a later pipeline run won't overwrite the reviewer's title. Clearing the portal field returns the title to automatic.

## IndexNow

IndexNow tells Bing and other participating search engines that a page is new, changed or gone, so they do not have to wait to discover it. SyteOps does this through Squirrly SEO's own IndexNow feature (Squirrly calls it LLM Indexing). It is switched off until you turn it on.

To turn it on, open **Content Pipelines**, then **Answer Engine**, and switch on **Send to IndexNow** in the IndexNow card. The card appears only while Squirrly SEO is the active SEO tool.

- **What is sent and when.** Each post's address is sent through a background job about a minute after the post goes live, after its title, text or excerpt changes, and after it is removed (trashed, unpublished or deleted). Your visitors and editors never wait for it. An address sent within the last 24 hours is not sent again, and a failed send is left to Squirrly SEO to retry.
- **Which post types.** Squirrly SEO decides. The card shows the list read from Squirrly and links to Squirrly's settings, where you change it. SyteOps never changes it.
- **Squirrly SEO 14.2.7 or later.** Older versions lack the pause and repeat-send rules SyteOps relies on, so nothing is sent and the status line says so.
- **A key is required.** Squirrly SEO creates the IndexNow key when you open its LLM Indexing settings once. Until then the status line asks you to do that, and nothing is sent. SyteOps never creates the key and never shows it.
- **Headless sites: the frontend sends.** On a headless site the WordPress addresses are not the public pages, so SyteOps sends nothing itself. With the switch on, it keeps a list of the pages that went live, changed or were removed, in the frontend's own addresses, and the frontend sends them to IndexNow after each deploy (see the PhantomStudio page). The status line shows how many changes are waiting. Turn Squirrly's auto-indexing off on a headless backend: its editor submit would send this server's addresses, and the status line warns while it is on.
- **Staging sites do nothing.** When Search engines are discouraged in Settings, Reading (as on staging copies) nothing should ping anyone. The status line names the reason.
- **Google does not use IndexNow.** Google learns about pages from your sitemap and from Request indexing in Search Console.

The status line under the switch always says in one sentence whether IndexNow is on and, if not, why.

### Result and Send now on each post

While IndexNow is on, each post shows one line: when it was last sent and whether IndexNow accepted it, "waiting" while it is queued, or "skipped, sent in the last 24 hours". The line appears on each Published Content row in the Review Portal, for anyone who can see the row, and in an IndexNow panel in the sidebar of the post editor for the post types Squirrly SEO sends. A post that cannot be sent shows the reason in one sentence instead.

**Send now** sits beside the line for a signed-in WordPress user who can edit that post; portal reviewers who are not such users never see it. It sends the page's address to IndexNow about a minute later and says "Queued; it goes out in about a minute." If the send is refused, for example because the page was sent in the last 24 hours, the button says why in a sentence.

## Settings-URL fix

Corrects a malformed inline script from Squirrly SEO that wraps a URL in double quotes, causing a JavaScript `SyntaxError` on admin pages. It is **enabled automatically** whenever the Squirrly SEO integration is active — there is no separate toggle to manage.

## Troubleshooting

### SEO values not appearing on the front end

1. Verify the Squirrly SEO integration is toggled **ON** on the Integrations tab.
2. Confirm the Squirrly SEO plugin is installed and activated.
3. Confirm the post actually ran through a Content Pipeline (or had its SEO set in the Review Portal) — SyteOps only writes SEO on those paths.
4. Squirrly renders `<title>` from its `wp_qss` row; see the official docs above for how it reads stored values.

### A reviewer's custom SEO title reverted to the auto-generated one

A portal-set title is preserved as a manual override. If a title reverts to the auto-composed post title, the override marker was cleared — re-enter the custom title in the Review Portal SEO panel.

For developer details, see the repository doc: `docs/developer/integrations/squirrly-seo.md`.
