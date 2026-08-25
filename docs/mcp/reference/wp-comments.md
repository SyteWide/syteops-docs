---
title: WordPress Comments
description: MCP tools provided by WordPress Comments (provider id wp-comments).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# WordPress Comments

Provider id: `wp-comments` · 5 tool(s).

## `create_comment`

Create a comment on a post.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post` | integer | yes | Post ID to comment on. |
| `content` | string | yes | Comment body. |
| `parent` | integer | no | Parent comment ID (for replies). |
| `author_name` | string | no | Author name (for guest comments). |
| `author_email` | string | no | Author email (for guest comments). |


## `delete_comment`

Delete a comment. Set force=true to bypass trash.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Comment ID. |
| `force` | boolean | no | Permanently delete instead of trashing. |


## `get_comment`

Get a single comment by ID.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Comment ID. |


## `list_comments`

List WordPress comments, optionally filtered by post, status, or search.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post` | integer | no | Filter by post ID. |
| `status` | string | no | Comment status (approve, hold, spam, trash). |
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page (1-100). |
| `page` | integer | no | Page number. |


## `update_comment`

Update a comment (content or status). Only provided fields change.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Comment ID. |
| `content` | string | no |  |
| `status` | string | no | approve, hold, spam, or trash. |

