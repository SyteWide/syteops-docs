---
title: Cache
sidebar_label: Cache
description: Manage API operations for the cache resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `cache`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `purge`

Purge one post's page (post_id), or up to 30 URLs on this site's own host (urls), from LiteSpeed and Cloudflare when present. With post_id it also purges the pages that show the post (home, blog index, category and tag archives, author page, main feed, post type archive, SEO sitemaps) when the related-pages setting allows it (Off is the post's own page alone), and, when that post is built with Elementor, clears and rebuilds that post's generated CSS before the purge (elementor_css_scope post), or clears the Elementor CSS site-wide (elementor_css_scope site_wide) for the Kit, header, footer and other site-wide templates, when the Regenerate Elementor CSS setting is off, or when the per-post rebuild cannot run; a site-wide clear is answered by a background rebuild of every page's CSS and one site purge. layers reports each cache layer: litespeed is attempted (it cannot confirm), partial, error or skipped; cloudflare is purged, partial, error, skipped or off (the Cloudflare purge mode setting; off is also listed in skipped, and zone mode purges the whole zone even for one URL). queued is true and deferred is zone when, in the zone purge mode, the minimum interval since the last full purge held the Cloudflare zone purge back: the pages are purged in LiteSpeed now and the zone purge is booked for when the interval ends. not_run with reentrant in skipped means a purge was already running and nothing was done. Send post_id or urls, not both; a URL on any other host refuses the whole call.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Record id, digits only. |
| `urls` | object | no | List of absolute http(s) URLs on this site's host, at most 30. |


**Returns**

data: &#123;urls[], purged[], attempted[], skipped[], errors[], layers: &#123;litespeed: &#123;status}, cloudflare: &#123;status, mode, reason?}}, queued, deferred?, builder_clear?: &#123;builder, status, scope, posts, failed, capped}, elementor_css: regenerated|cleared|unavailable|not_elementor|null, elementor_css_scope: post|site_wide|null}

**Request**

```json
{
  "resource": "cache",
  "action": "purge",
  "params": {
    "post_id": 0,
    "urls": {}
  }
}
```

## `state`

Read-only. How the page cache stands on this site, from one function the Page cache card also uses: which layers are present (LiteSpeed Cache with its public, front page and feed lifetimes in seconds and whether the public lifetime is longer than the warning limit, Cloudflare with its purge mode, Elementor), each layer's last purge outcome, whether WP-Cron is disabled, and a trace of the carry endpoint that delivers LiteSpeed's purge. The trace is bounded: the time of the last recorded answer, of the last answer to a nudge and to a visitor, counts of RECORDED answers (not requests; an answer that found nothing waiting is recorded at most once every 30 seconds), up to 20 recent answers newest first, and waiting, a COUNT of purges no response has carried yet. A source of nudge means a nudge arrived at the carry endpoint, which is unauthenticated: anyone can send one, so it is evidence that something called, never proof that the cron Worker did; cross-check the origin access log. A time is a Unix second or null; a lifetime of 0 means not cached and null means unknown. The builder section is read-only information for operators and the deploy tool: the stored page builder choice (selected, empty when automatic) and the effective builder, the builders detected (several_detected is true when more than one is active), and per product its version and the setting that decides how its generated CSS is stored (Elementor CSS print method, Blocksy dynamic CSS mode file or inline, Avada CSS compiling method file, db or off and whether Avada critical CSS is on, Divi version, LiteSpeed Clear Cloudflare cache on Purge All), plus the Cloudflare purge mode and wp_cron_disabled. Anything that cannot be read is null or false. media is the map of replaced pictures (see media.mark_replaced): replaced_count is how many attachments are marked and recent is the newest ten, each with the attachment id, the Unix second it was marked and its URL version token; no URL and no file path. No page URL, token, zone id, path or error text is returned. A plugin older than this operation answers 404 unknown_operation.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data: &#123;layers: &#123;litespeed: &#123;present, lifetime: &#123;public, frontpage, feed, warn_after, long}|null, last: &#123;at, status, scope, reason, urls, errors, delivery?, why?}|null}, cloudflare: &#123;present, mode: urls|zone|off, last}, elementor: &#123;present}}, cron: &#123;wp_cron_disabled}, carry: &#123;last_served_at, last_nudge_at, last_visitor_at, counts: &#123;nudge, visitor, carried}, recent: [&#123;at, source: nudge|visitor, carried}], waiting}, builder: &#123;selected: elementor|avada|divi|headless|none|'', effective, detected[], several_detected, elementor: &#123;active, version|null, pro, print_method: external|internal|null}, blocksy: &#123;theme, companion, dynamic_css_mode: file|inline|null, css_refresh_enabled}, avada: &#123;active, version|null, css_mode: file|db|off|null, critical_css|null}, divi: &#123;active, version|null}, litespeed: &#123;present, cdn_cloudflare|null, cdn_cloudflare_clear|null}, cloudflare: &#123;mode}, wp_cron_disabled}, media: &#123;replaced_count, recent: [&#123;attachment_id, marked_at, token}], baseline: &#123;done, seeded, cursor, last, stalled}}}

**Request**

```json
{
  "resource": "cache",
  "action": "state",
  "params": {}
}
```
