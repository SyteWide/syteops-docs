---
title: WordPress Content & Taxonomies
description: MCP tools provided by WordPress Content & Taxonomies (provider id wp-content).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# WordPress Content & Taxonomies

Provider id: `wp-content` · 17 tool(s).

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
| `meta` | object | no | Meta registered for the REST API. Other keys are not saved and come back in warnings. For SEO fields use syteops_seo_set. |


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
| `update_fields` | object | no | Optional fields to update once found (title, content, status, meta). Meta keys WordPress does not save come back in warnings; for SEO fields use syteops_seo_set. |


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


## `replace_content_text`

Replace exact text in one or more posts or Elementor pages, all or nothing. Defaults to a dry run that writes nothing and previews every edit (match counts, where found as widget and setting, the post_content mirror count, what would be written). A real run needs dry_run:false AND confirm:true. Every edit is checked before any write: each must match old exactly expected_count times (default 1), so one bad edit writes nothing and the result names it. On an Elementor page only the matching setting values change and the rest of _elementor_data stays byte for byte; post_content (the mirror) must hold old the same number of times and gets the same replacement. widget_id limits an Elementor match to one widget; refuse_if_present refuses a post that already contains a string (use the target URL to prevent double links). A match inside an HTML tag (an attribute) is refused unless allow_in_attributes:true; a match inside &lt;script>, &lt;style> or an HTML comment is refused unless allow_in_code:true. A restore point (a revision carrying the Elementor meta) is created per post before writing and must still exist; the result gives revision_id, the sha1 of the old _elementor_data and rollback steps. Writes are raw compare-and-swap SQL (no kses, no second revision): a post changed by someone else in the meantime is refused untouched and the posts already written are put back. Save hooks do not run; post_modified is set, caches are cleared and SyteOps cache.purge runs when available. A builder-mode Elementor page with no usable _elementor_data is refused. With verify_rendered (default true) it fetches each published post of this site (about 20 s in total, then the rest are skipped with time_budget) and warns when the new text is missing from the rendered page (it may be stripped from display, for example an in-body FAQ replaced by structured data): check those warnings, the write has already happened. Takes 1-25 edits, one per post. Same permission as update_content (edit_post per post); without unfiltered_html, the stored result must pass wp_kses_post() unchanged and carry no disallowed URL protocol, only Elementor text and content settings may change (not links, custom attributes, CSS, ids or dynamic tags), and allow_in_attributes / allow_in_code are refused.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `edits` | array | yes | Edits, one per post. |
| `allow_in_attributes` | boolean | no | Default false: refuse a match that falls inside an HTML tag, so only text content changes. |
| `allow_in_code` | boolean | no | Default false: refuse a match inside \<script\>, \<style\> or an HTML comment (JSON-LD, CSS, notes). Separate from allow_in_attributes. |
| `confirm` | boolean | no | Required (true), together with dry_run:false, for a real write. |
| `verify_rendered` | boolean | no | Default true: after writing, fetch each published post and warn when the new text is not in the rendered HTML. |


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
| `meta` | object | no | Meta registered for the REST API. Other keys are not saved and come back in warnings. For SEO fields use syteops_seo_set. |


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

