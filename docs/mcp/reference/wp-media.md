---
title: WordPress Media
description: MCP tools provided by WordPress Media (provider id wp-media).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# WordPress Media

Provider id: `wp-media` · 4 tool(s).

## `create_media`

Upload a file to the media library by downloading it from a source URL.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `source_url` | string | yes | Public URL of the file to download and upload. |
| `filename` | string | no | Optional filename to store as. |
| `title` | string | no | Optional attachment title. |
| `alt_text` | string | no | Optional image alt text. |
| `post_id` | integer | no | Optional post ID to attach the media to. |


## `delete_media`

Delete a media item. Media deletion always bypasses the trash.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Attachment ID. |


## `edit_media`

Update media metadata (title, caption, description, alt text).

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Attachment ID. |
| `title` | string | no |  |
| `caption` | string | no |  |
| `description` | string | no |  |
| `alt_text` | string | no |  |


## `list_media`

List media library items with optional search and pagination.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `media_type` | string | no | Filter by type (image, video, audio, application). |
| `per_page` | integer | no | Items per page (1-100). |
| `page` | integer | no | Page number. |
| `parent` | integer | no | Filter by attached post ID. |

