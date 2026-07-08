---
title: Squirrly SEO
description: MCP tools provided by Squirrly SEO (provider id squirrly).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# Squirrly SEO

Provider id: `squirrly` · 8 tool(s).

## `sqseo_delete_snippet`

Delete a page's Squirrly wp_qss override row, reverting it to Squirrly's computed defaults. Target by post_id or url ("/" = homepage). Destructive; supports dry_run.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `seo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Post/page ID. Omit to use url. |
| `url` | string | no | Page URL; "/" = homepage. |


## `sqseo_get_audit`

Best-effort read of Squirrly's SEO audit/score. Squirrly computes the score cloud-side, so this returns &#123;available:false} when the site is not connected. Read-only.

**Profiles:** `full`, `seo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no |  |
| `url` | string | no |  |


## `sqseo_get_settings`

Read Squirrly's global SEO settings (the sq_options JSON: title/description patterns, separators, social defaults, knowledge-graph identity, per-post-type templates).

**Profiles:** `full`, `seo`

**Parameters**

_No parameters._


## `sqseo_get_snippet`

Read a page's Squirrly SEO snippet (title, description, keywords, canonical, noindex/nofollow, OG + Twitter title/image/description, cornerstone). Target by post_id, or url ("/" = homepage).

**Profiles:** `full`, `seo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Post/page ID. Omit to use url. |
| `url` | string | no | Page URL; "/" resolves the homepage to whichever layer renders it. |


## `sqseo_list_snippets`

List Squirrly wp_qss snippet rows (url, url_hash, title). Paginated; optional search across URL and stored SEO.

**Profiles:** `full`, `seo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | Max rows (1–200, default 50). |
| `offset` | integer | no | Offset for pagination. |
| `search` | string | no | Substring matched against URL and stored SEO. |


## `sqseo_set_snippet`

Write a page's Squirrly SEO snippet. Writes the canonical wp_qss row (the layer that renders the &lt;title>) plus the _sq_* post-meta mirror layer. Only supplied fields change. Target by post_id or url ("/" = homepage). Destructive: pass dry_run:true to preview the call (the arguments to be written) without executing.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `seo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Post/page ID. Omit to use url. |
| `url` | string | no | Page URL; "/" = homepage. |
| `title` | string | no |  |
| `description` | string | no |  |
| `keywords` | string | no | Comma-separated focus keywords. |
| `canonical` | string | no |  |
| `noindex` | boolean | no |  |
| `nofollow` | boolean | no |  |
| `nositemap` | boolean | no |  |
| `og_title` | string | no |  |
| `og_description` | string | no |  |
| `og_image` | string | no | OG image URL (stored as og_media). |
| `twitter_title` | string | no |  |
| `twitter_description` | string | no |  |
| `twitter_image` | string | no | Twitter image URL (stored as tw_media). |
| `cornerstone` | boolean | no |  |
| `primary_category` | integer | no | Primary category term ID. |


## `sqseo_status`

Diagnostic: Squirrly availability/version, detected wp_qss columns, the sq_options key, page_on_front, ACF + SyteOps-guard presence, and Advanced Pack tables. Run this first to confirm the schema before relying on writes.

**Profiles:** `full`, `seo`

**Parameters**

_No parameters._


## `sqseo_update_settings`

Merge a subset into Squirrly's global settings (sq_options), preserving untouched keys. Pass the nested keys you want to change under "settings". Destructive; supports dry_run.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `seo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `settings` | object | yes | Partial sq_options tree to deep-merge (e.g. \{"sq_metas":\{"separator":"\|"\}\}). |

