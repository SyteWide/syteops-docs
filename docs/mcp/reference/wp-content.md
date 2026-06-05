---
title: WordPress Content & Taxonomies
description: MCP tools provided by WordPress Content & Taxonomies (provider id wp-content).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# WordPress Content & Taxonomies

Provider id: `wp-content` · 16 tool(s).

## `assign_terms_to_content`

Assign taxonomy terms to a piece of content (e.g. set a post's categories or tags).

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug. |
| `id` | integer | yes | Content ID. |
| `taxonomy` | string | yes | Taxonomy slug (e.g. 'category', 'post_tag'). |
| `term_ids` | array | yes | Term IDs to assign. |


## `create_content`

Create new content of any type. Returns the created object.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug. |
| `title` | string | yes | Content title. |
| `content` | string | yes | Content body (HTML). |
| `status` | string | no | Status (default 'draft'). |
| `excerpt` | string | no | Excerpt. |
| `slug` | string | no | Slug. |
| `author` | integer | no | Author ID. |
| `parent` | integer | no | Parent ID (hierarchical). |
| `categories` | array | no | Category IDs (posts). |
| `tags` | array | no | Tag IDs (posts). |
| `featured_media` | integer | no | Featured image attachment ID. |
| `menu_order` | integer | no | Menu order (pages). |
| `meta` | object | no | Registered meta fields. |


## `create_term`

Create a new term in a taxonomy.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taxonomy` | string | yes | Taxonomy slug. |
| `name` | string | yes | Term name. |
| `slug` | string | no | Term slug. |
| `description` | string | no | Term description. |
| `parent` | integer | no | Parent term ID. |


## `delete_content`

Delete content of any type. Set force=true to bypass trash.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug. |
| `id` | integer | yes | Content ID. |
| `force` | boolean | no | Bypass trash and permanently delete. |


## `delete_term`

Delete a taxonomy term.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taxonomy` | string | yes | Taxonomy slug. |
| `id` | integer | yes | Term ID. |


## `discover_content_types`

List all available content types (built-in and custom) registered on the site.

**Profiles:** `full`, `wp`

**Parameters**

_No parameters._


## `discover_taxonomies`

List all taxonomies (categories, tags, and custom taxonomies) registered on the site.

**Profiles:** `full`, `wp`

**Parameters**

_No parameters._


## `find_content_by_url`

Find content by its public URL. Extracts the slug and resolves the content type from the URL path (e.g. /documentation/guide/ tries the "documentation" type first), including custom post types. Optionally update it.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `url` | string | yes | Full public URL of the content. |
| `content_types` | array | no | Optional explicit content types (slugs or REST bases) to search. If omitted, inferred from the URL path plus all public types. |
| `update_fields` | object | no | Optional fields to update once found (title, content, status, meta). |


## `get_content`

Get a single piece of content by ID and content type.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug. |
| `id` | integer | yes | Content ID. |


## `get_content_by_slug`

Find content by slug across one or more content types.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes | The slug to find. |
| `content_types` | array | no | Content types to search (defaults to common types). |


## `get_content_terms`

Get the taxonomy terms currently assigned to a piece of content.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug. |
| `id` | integer | yes | Content ID. |
| `taxonomy` | string | yes | Taxonomy slug to read (e.g. category, post_tag). |


## `get_term`

Get a single taxonomy term by ID.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taxonomy` | string | yes | Taxonomy slug. |
| `id` | integer | yes | Term ID. |


## `list_content`

List content of any type (posts, pages, or custom post types) with filtering and pagination.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug, e.g. 'post', 'page', 'product'. |
| `page` | integer | no | Page number (default 1). |
| `per_page` | integer | no | Items per page (1-100, default 10). |
| `search` | string | no | Search term for title or body. |
| `slug` | string | no | Limit to a specific slug. |
| `status` | string | no | Content status (publish, draft, etc.). |
| `author` | integer,array | no | Author ID or array of IDs. |
| `categories` | integer,array | no | Category ID(s), for posts. |
| `tags` | integer,array | no | Tag ID(s), for posts. |
| `parent` | integer | no | Parent ID for hierarchical content. |
| `orderby` | string | no | Sort field. |
| `order` | string | no | Sort direction. |
| `after` | string | no | ISO8601 date; content published after. |
| `before` | string | no | ISO8601 date; content published before. |


## `list_terms`

List terms in a taxonomy (e.g. category, post_tag, or a custom taxonomy).

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taxonomy` | string | yes | Taxonomy slug, e.g. 'category', 'post_tag'. |
| `search` | string | no | Search term name. |
| `per_page` | integer | no | Items per page (1-100). |
| `page` | integer | no | Page number. |
| `parent` | integer | no | Parent term ID (hierarchical taxonomies). |


## `update_content`

Update existing content of any type. Only provided fields change.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `content_type` | string | yes | Content type slug. |
| `id` | integer | yes | Content ID. |
| `title` | string | no |  |
| `content` | string | no |  |
| `status` | string | no |  |
| `excerpt` | string | no |  |
| `slug` | string | no |  |
| `author` | integer | no |  |
| `parent` | integer | no |  |
| `categories` | array | no |  |
| `tags` | array | no |  |
| `featured_media` | integer | no |  |
| `menu_order` | integer | no |  |
| `meta` | object | no |  |


## `update_term`

Update an existing taxonomy term.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taxonomy` | string | yes | Taxonomy slug. |
| `id` | integer | yes | Term ID. |
| `name` | string | no |  |
| `slug` | string | no |  |
| `description` | string | no |  |
| `parent` | integer | no |  |

