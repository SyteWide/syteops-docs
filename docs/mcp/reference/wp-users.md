---
title: WordPress Users
description: MCP tools provided by WordPress Users (provider id wp-users).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# WordPress Users

Provider id: `wp-users` · 6 tool(s).

## `create_user`

Create a new WordPress user.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | yes | Login username. |
| `email` | string | yes | Email address. |
| `password` | string | yes | Password. |
| `name` | string | no | Display name. |
| `roles` | array | no | Role slugs. |
| `first_name` | string | no | First name. |
| `last_name` | string | no | Last name. |
| `url` | string | no | User URL / website. |
| `description` | string | no | Biographical info. |
| `nickname` | string | no | Nickname. |
| `slug` | string | no | URL-friendly user slug. |
| `meta` | object | no | Registered user meta fields. |


## `delete_user`

Delete a WordPress user. WordPress requires reassigning their content to another user ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | User ID to delete. |
| `reassign` | integer | yes | User ID to reassign the deleted user's content to. |


## `get_me`

Get the current (authenticated) WordPress user.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

_No parameters._


## `get_user`

Get a single WordPress user by ID.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | User ID. |


## `list_users`

List WordPress users with optional search, role filter, and pagination.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term (name, email, login). |
| `roles` | string | no | Comma-separated role slugs to filter by. |
| `per_page` | integer | no | Items per page (1-100). |
| `page` | integer | no | Page number. |
| `orderby` | string | no | Sort field (id, name, registered_date, etc.). |
| `order` | string | no |  |


## `update_user`

Update an existing WordPress user. Only provided fields change.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | User ID. |
| `email` | string | no |  |
| `password` | string | no |  |
| `name` | string | no |  |
| `roles` | array | no |  |
| `first_name` | string | no | First name. |
| `last_name` | string | no | Last name. |
| `url` | string | no | User URL / website. |
| `description` | string | no | Biographical info. |
| `nickname` | string | no | Nickname. |
| `slug` | string | no | URL-friendly user slug. |
| `meta` | object | no | Registered user meta fields. |

