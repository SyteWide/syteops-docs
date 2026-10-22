---
title: SyteOps
description: MCP tools provided by SyteOps (provider id syteops).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# SyteOps

Provider id: `syteops` · 23 tool(s).

## `syteops_builder_guard`

Read-only. Recompute the agent-prompt guard hash (CANON-1) for one Elementor element (SyteOps builder.guard). Call it right before an Elementor MCP write and compare it with the task's guard; if they differ the element changed, so stop. Never hash by hand. Returns &#123;status, reason, guard, guard_keys, widget_type}, never a setting value. Check status first: when the element can't be resolved (bad el_id, not found, ambiguous) the call still succeeds, with a reason and an empty guard, so two empty guards matching proves nothing. post_id may be a page or a published Elementor template (elementor_library); syteops_seo_get and syteops_seo_set refuse templates. An API key is trusted; a signed-in caller needs edit access to the post. Errors: post_not_found (trashed or not viewable), forbidden (no edit access), module_unavailable (Review Portal not loaded). Note for the write that follows: EMCP update-element and update-widget merge settings shallowly, so writing __globals__ or link replaces that whole object; send every key it should keep.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `el_id` | string | yes | Elementor element ID. |


## `syteops_cache_purge`

Purge one post's page, or up to 30 URLs on this site, from LiteSpeed and Cloudflare when present (SyteOps cache.purge). Send post_id or urls, not both. Prefer post_id: only that path also clears Elementor's generated CSS (site-wide, and only when the post is built with Elementor; elementor_css reports cleared, unavailable or not_elementor). A URL on another host refuses the whole call. Returns &#123;urls, purged, attempted, skipped, errors, elementor_css}.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Post ID. |
| `urls` | array | no | Absolute http(s) URLs on this site's host, at most 30. |


## `syteops_dispatch`

Invoke any SyteOps Manage operation. Pass resource + action (see syteops_manifest) and params per that operation's schema. Destructive operations (the manifest marks them) require confirm:true. Returns &#123;ok, changed, data} on success.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `resource` | string | yes | Manage resource, e.g. 'modules', 'users', 'roles', 'status'. See syteops_manifest. |
| `action` | string | yes | Action on the resource, e.g. 'list', 'get', 'activate'. See syteops_manifest. |
| `params` | object | no | Operation parameters per the manifest's params schema for this resource+action. |
| `confirm` | boolean | no | Set true to authorize a destructive operation (the manifest marks which actions are destructive). |


## `syteops_manifest`

Discover the SyteOps Manage API: every resource and action with its summary, parameter schema, and whether it is destructive. Optionally filter to one resource. Use this to learn what syteops_dispatch can do.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `resource` | string | no | Optional — return operations only for this resource (e.g. 'modules', 'users'). |


## `syteops_pipeline_run`

Run a pipeline recipe against one post now, inline (SyteOps pipelines.run). dry_run:true previews without persisting; force:true bypasses skip-unchanged. SyteOps does not refuse a trashed or non-viewable post and does not check edit_post on this op (it only checks the post exists), so check the post first (get_content, syteops_seo_get). An unknown recipe_id errors unknown_recipe. The call returns ok even when the run fails: read data.status (error, or skipped/unchanged) and data.stages[*].status. dry_run:false cannot override a recipe whose policy.dry_run is true. Returns &#123;status, post_id, recipe, stages, run_id, changed}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `recipe_id` | string | no | Recipe id (a slug). Defaults to 'default'. |
| `force` | boolean | no | Bypass the skip-unchanged check. |


## `syteops_pipeline_run_get`

Get one pipeline run-history row with its decoded per-stage results (SyteOps pipelines.get_run). Read-only. Errors not_found for an unknown id. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Run ID from syteops_pipeline_runs. |


## `syteops_pipeline_runs`

List pipeline run-history rows, paginated; filter by post_id, recipe_id or status (SyteOps pipelines.list_runs). Read-only. Returns &#123;items[], total, page, per_page}; each item has id, source, post_id, recipe_id, status, trigger_kind, is_dry_run, changed, duration_ms, message, created_at. Use syteops_pipeline_run_get for per-stage results. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no | Rows per page (default 25). |
| `page` | integer | no | Page number (default 1). |
| `post_id` | integer | no | Post ID. |
| `recipe_id` | string | no | Only runs of this recipe. Omitted means no filter. |
| `status` | string | no | Only runs with this status: 'ok', 'error' or 'skipped'. |


## `syteops_recipe_create`

Create a pipeline recipe (SyteOps pipelines.create_recipe). The id defaults to the slug of name, and a recipe whose id matches an existing one REPLACES that recipe without warning, so call syteops_recipe_list first. A recipe is a list of stages, a trigger and a policy; copy the shape from syteops_recipe_get. On publish only the single highest-priority matching auto_publish recipe runs. Returns the saved recipe. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | no | Recipe id (a slug). Omit to derive it from name. An existing id is replaced. |
| `name` | string | yes | Recipe name. |
| `priority` | integer | no | Recipe priority (default 0). Only the single highest-priority matching auto_publish recipe runs on publish, so a priority above the default recipe displaces it. |
| `stages` | array | no | Ordered list of stages: \{stage_id, enabled (default true), options\}. An item without stage_id is silently dropped. On update the list REPLACES all stages, so send the full list (copy from syteops_recipe_get). |
| `trigger` | object | no | \{mode: 'auto_publish' (default) or 'manual', scope: \{post_types: [..] (default ['post']), tag_slugs: [..]\}\}. Omitted, it defaults to auto_publish on posts. Supplied on update, it replaces the whole trigger, so send every key. |
| `policy` | object | no | \{on_error: 'continue' (default) or 'stop', rerun: 'always' (default) or 'skip_unchanged', execution: 'async' (default) or 'sync', dry_run: bool\}. Supplied on update, it replaces the whole policy, so send every key. |


## `syteops_recipe_delete`

Delete a pipeline recipe (SyteOps pipelines.delete_recipe). Needs confirm:true. The 'default' recipe cannot be deleted (protected_recipe). Returns &#123;id, deleted}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps. SyteOps requires a SyteOps Admin for this delete.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Recipe id (a slug). |
| `confirm` | boolean | no | Required (true): SyteOps refuses the delete without it. |


## `syteops_recipe_get`

Get one pipeline recipe by id (SyteOps pipelines.get_recipe). Read-only. Errors not_found for an unknown id. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Recipe id (a slug). |


## `syteops_recipe_list`

List all configured pipeline recipes (SyteOps pipelines.list_recipes). Read-only. Returns &#123;recipes[]}. Call it before syteops_recipe_create to see which ids exist. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

_No parameters._


## `syteops_recipe_update`

Update a pipeline recipe (SyteOps pipelines.update_recipe). A merge-patch at the top level only: omitted keys are kept, but a supplied trigger or policy replaces that whole sub-object, so send the full sub-object to change one field (read it with syteops_recipe_get first). Errors not_found for an unknown id. Returns the saved recipe. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Recipe id (a slug). |
| `name` | string | no | Recipe name. |
| `priority` | integer | no | Recipe priority (default 0). Only the single highest-priority matching auto_publish recipe runs on publish, so a priority above the default recipe displaces it. |
| `stages` | array | no | Ordered list of stages: \{stage_id, enabled (default true), options\}. An item without stage_id is silently dropped. On update the list REPLACES all stages, so send the full list (copy from syteops_recipe_get). |
| `trigger` | object | no | \{mode: 'auto_publish' (default) or 'manual', scope: \{post_types: [..] (default ['post']), tag_slugs: [..]\}\}. Omitted, it defaults to auto_publish on posts. Supplied on update, it replaces the whole trigger, so send every key. |
| `policy` | object | no | \{on_error: 'continue' (default) or 'stop', rerun: 'always' (default) or 'skip_unchanged', execution: 'async' (default) or 'sync', dry_run: bool\}. Supplied on update, it replaces the whole policy, so send every key. |


## `syteops_seo_get`

Read one post's SEO title, description and focus keywords from whichever SEO plugin is active (SyteOps seo.get). Returns &#123;post_id, tool, tool_label, fields}. With no active SEO plugin it errors no_active_seo_tool. For Squirrly-only fields (canonical, Open Graph, robots) use sqseo_get_snippet.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_seo_set`

Write one post's SEO title, description or focus keywords through the active SEO plugin's own writer (SyteOps seo.set). SEO writes for any SEO plugin go here, not update_content.meta. Send dry_run:true first: it writes nothing and returns each field's current and proposed value. A real write needs confirm:true. Only the fields you send change. Caps: title 300, description 1000, keywords 500 characters. A placeholder the SEO plugin fills from site data is refused unless allow_placeholders:true. On Squirrly the result carries a note: reload any block-editor tab that was open before the write, or its SEO Snippet box saves the old title back. For Squirrly-only fields use sqseo_set_snippet.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `title` | string | no | SEO title. Send an empty string to clear it. |
| `description` | string | no | Meta description. Send an empty string to clear it. |
| `keywords` | string | no | Focus keywords, comma-separated. Send an empty string to clear it. |
| `confirm` | boolean | no | Required (true) for a real write. |
| `allow_placeholders` | boolean | no | JSON true only. Allow placeholders the SEO plugin fills from site data (custom fields, options). Safe ones such as the post title need no opt-in. |


## `syteops_source_approve_mapping`

Approve a field mapping for a content source, activating it for live ingest (SyteOps content_sources.approve_mapping). Returns &#123;id, status, mapping_status, mapping}.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `mapping` | object | yes | The field mapping to approve and activate for live ingest. |


## `syteops_source_create`

Create a content source (SyteOps content_sources.create); SyteOps generates its id and slug. Unless you pass a secret or auth_mode:'none', it generates a webhook secret and returns it as data.secret (only when secret_source is 'generated'), once. The plaintext secret is not redacted and is returned only once: do not log or store it. The slug comes from name and cannot be changed later. A supplied secret or forward_secret is write-only.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Source name; the slug is derived from it. |
| `auth_mode` | string | no | Inbound verification: 'hmac' (default), 'bearer', 'both' or 'none' (no verification; the slug URL is the only gate). Switching from 'none' to a verifying mode with no stored secret errors secret_required. |
| `secret` | string | no | Write-only verification secret, e.g. a provider-owned key. Never echoed back. |
| `default_author_id` | integer | no | Default author user ID. |
| `pin_author` | boolean | no | Pin the default author on ingested posts. |
| `target_post_type` | string | no | Post type the source creates. |
| `new_cpt` | object | no | Source-owned custom post type definition. Create-time only; not editable afterwards. |
| `meta_fields` | array | no | Native custom fields this source declares: a list of \{field_key, label, type\}. |
| `fm_variables` | array | no | Per-source FlowMattic config vars: a list of \{key, value, source: 'payload' or 'static'\}. |
| `forward_enabled` | boolean | no | Forward each ingest to a workflow URL. |
| `forward_url` | string | no | Workflow URL to forward to. Must pass wp_http_validate_url: private hosts and unusual ports are rejected. |
| `forward_auth_mode` | string | no | Auth mode for the forward call. |
| `forward_secret` | string | no | Write-only forward secret; never returned on any read. |
| `sig_header_mode` | string | no | Signature header mode. |
| `sig_header_name` | string | no | Signature header name. |
| `author_match_mode` | string | no | How the incoming author is matched. |
| `target_tag_slug` | string | no | Tag slug applied to ingested posts. Changing it on update retags this source's existing posts. |
| `taxonomy_apply_mode` | string | no | How taxonomies are applied. |
| `strip_uncategorized` | boolean | no | Drop the Uncategorized term. |
| `category_exclude` | array | no | Category slugs the AI classifier may never choose: a list of strings. |
| `content_cleanup` | boolean | no | Clean up the incoming body. |
| `strip_inbody_toc` | boolean | no | Strip an in-body table of contents. |
| `strip_inbody_faq` | boolean | no | Strip an in-body FAQ. |
| `add_heading_anchors` | boolean | no | Add anchors to headings. |
| `image_modify` | object | no | Portal image-modify mapping (tokens only). |


## `syteops_source_delete`

Permanently delete a content source (SyteOps content_sources.delete). Needs confirm:true. Returns &#123;id, deleted}. SyteOps requires a SyteOps Admin for this delete.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `confirm` | boolean | no | Required (true): SyteOps refuses the delete without it. |


## `syteops_source_export`

Export one content source as a portable setup package (SyteOps content_sources.export). Read-only. The envelope &#123;format, schema_version, payload} never includes secret or forward_secret; feed it to syteops_source_import.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |


## `syteops_source_get`

Get one content source by id (SyteOps content_sources.get). Read-only. Secrets are never included.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |


## `syteops_source_import`

Import a content source setup package (SyteOps content_sources.import). When the slug is free it creates the source; when it exists it errors already_exists. To replace an existing source send overwrite:true AND confirm:true (overwrite alone errors confirmation_required); an overwrite clears the stored forward_secret and, for a verifying auth_mode, also invalidates the source's current webhook secret and returns the new one once, so live senders break until updated. This op is not marked destructive, so confirm only gates that overwrite. If a verifying secret is minted it is returned as data.secret (only when secret_source is 'generated'). The plaintext secret is not redacted and is returned only once: do not log or store it.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `envelope` | object | yes | A setup package from syteops_source_export. |
| `overwrite` | boolean | no | Replace an existing source with the same slug. Also needs confirm:true. |
| `confirm` | boolean | no | Required (true) together with overwrite to replace an existing source. |


## `syteops_source_list`

List all content sources, the inbound feeds that create posts for the pipelines (SyteOps content_sources.list). Read-only. Each has id, name, slug, enabled, status, auth_mode, target_post_type, mapping, mapping_status, defaults and forward settings. Secrets are never included.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

_No parameters._


## `syteops_source_rotate_secret`

Generate a new webhook secret for a content source and invalidate the old one at once (SyteOps content_sources.rotate_secret). Returns &#123;id, secret} with the new secret, once; it enters this conversation's transcript. The plaintext secret is not redacted and is returned only once: do not log or store it. Senders using the old secret fail until updated.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |


## `syteops_source_update`

Update editable fields on a content source (SyteOps content_sources.update); only the fields you send change. The slug, new_cpt and the internal idempotency key are not editable. A non-empty secret or forward_secret overwrites the stored one (write-only, never returned); an empty value leaves it unchanged. Returns the source without secrets.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `name` | string | no | Source name. |
| `default_author_id` | integer | no | Default author user ID. |
| `pin_author` | boolean | no | Pin the default author on ingested posts. |
| `default_reviewers` | array | no | Default reviewers for ingested posts: a list of WordPress user IDs (integers). |
| `default_ccs` | array | no | Default CC recipients for ingested posts: a list of WordPress user IDs (integers). |
| `default_post_status` | string | no | 'draft' (default) or 'publish'; anything else is stored as draft. |
| `auth_mode` | string | no | Inbound verification: 'hmac' (default), 'bearer', 'both' or 'none' (no verification; the slug URL is the only gate). Switching from 'none' to a verifying mode with no stored secret errors secret_required. |
| `secret` | string | no | Write-only verification secret, e.g. a provider-owned key. Never echoed back. |
| `enabled` | boolean | no | Enable or disable the source. |
| `reingest_mode` | string | no | 'protect' (default; keeps a reviewer-published post) or 'overwrite'. |
| `target_post_type` | string | no | Post type the source creates. |
| `meta_fields` | array | no | Native custom fields this source declares: a list of \{field_key, label, type\}. |
| `fm_variables` | array | no | Per-source FlowMattic config vars: a list of \{key, value, source: 'payload' or 'static'\}. |
| `forward_enabled` | boolean | no | Forward each ingest to a workflow URL. |
| `forward_url` | string | no | Workflow URL to forward to. Must pass wp_http_validate_url: private hosts and unusual ports are rejected. |
| `forward_auth_mode` | string | no | Auth mode for the forward call. |
| `forward_secret` | string | no | Write-only forward secret; never returned on any read. |
| `sig_header_mode` | string | no | Signature header mode. |
| `sig_header_name` | string | no | Signature header name. |
| `author_match_mode` | string | no | How the incoming author is matched. |
| `target_tag_slug` | string | no | Tag slug applied to ingested posts. Changing it on update retags this source's existing posts. |
| `taxonomy_apply_mode` | string | no | How taxonomies are applied. |
| `strip_uncategorized` | boolean | no | Drop the Uncategorized term. |
| `category_exclude` | array | no | Category slugs the AI classifier may never choose: a list of strings. |
| `content_cleanup` | boolean | no | Clean up the incoming body. |
| `strip_inbody_toc` | boolean | no | Strip an in-body table of contents. |
| `strip_inbody_faq` | boolean | no | Strip an in-body FAQ. |
| `add_heading_anchors` | boolean | no | Add anchors to headings. |
| `image_modify` | object | no | Portal image-modify mapping (tokens only). |

