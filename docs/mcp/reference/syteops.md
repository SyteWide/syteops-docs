---
title: SyteOps
description: MCP tools provided by SyteOps (provider id syteops).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# SyteOps

Provider id: `syteops` · 65 tool(s).

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


## `syteops_calendar_check`

Read-only advisory: would scheduling this post at this moment break the site's publishing rhythm, and where would it fit instead? (SyteOps calendar.cadence_check; SyteOps 1.6.758+). Nothing is written or refused. scope is all (default) or pipeline. Returns &#123;post_id, date_gmt, enabled, collides, reasons[], conflicts[], suggestion_label, suggestion_local, truncated}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `date` | string | yes | ISO 8601 date-time, e.g. 2026-11-03T09:00:00 (site timezone) or with Z / +02:00 (that instant). A bad date is 422 invalid_date. |
| `scope` | string | no | pipeline (posts the content pipeline produced) or all. |


## `syteops_calendar_next_slot`

Read-only. The next free publishing moment on the site's cadence after a time (SyteOps calendar.cadence_next_slot; SyteOps 1.6.758+). enabled is false and the slot empty when cadence is off; truncated means the calendar could not be read completely. scope is all (default) or pipeline. Returns &#123;enabled, truncated, slot_gmt, slot_site}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `after` | string | no | ISO 8601 date-time to search after (default now). |
| `exclude_post_id` | integer | no | Post ID kept out of its own conflicts. |
| `scope` | string | no | pipeline (posts the content pipeline produced) or all. |


## `syteops_calendar_query`

Read-only. The publishing calendar for a window (SyteOps calendar.query; SyteOps 1.6.758+): scheduled and published posts in it (grid_events) plus the undated draft and pending rail. The window may span at most 92 days (422 range_too_large; 422 invalid_range when to is before from). scope is pipeline (default) or all. grid_truncated is true when the window held more than 500 posts: narrow it. The rail is not date-bounded: page it with rail_cursor (422 invalid_cursor) and rail_per. A site-local time the clocks skip is 422 date_in_dst_gap. Returns &#123;from_gmt, to_gmt, scope, grid_events[], grid_truncated, rail_drafts[], rail_has_more, rail_next_cursor, rail_truncated}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `from` | string | yes | Window start: YYYY-MM-DD (start of that day) or an ISO 8601 date-time, in the site timezone unless it has Z or an offset. |
| `to` | string | yes | Window end: YYYY-MM-DD (end of that day) or an ISO 8601 date-time. At most 92 days after from (422 range_too_large). |
| `scope` | string | no | pipeline (posts the content pipeline produced) or all. |
| `post_types` | array | no | List of calendar post type names, e.g. ["post","page"]; a keyed object or an unknown type is 422 invalid_post_type. |
| `rail_per` | integer | no | Draft rail page size: 5, 10, 25 or 100. |
| `rail_cursor` | string | no | rail_next_cursor from the previous page, unchanged; anything else is 422 invalid_cursor. |


## `syteops_calendar_reschedule`

Move a post's publication to a future moment, as dragging it on the calendar does (SyteOps calendar.reschedule; SyteOps 1.6.758+): a draft or pending post becomes scheduled and goes live by itself at that time (no review approval, readiness check or confirm), a scheduled post moves, and the schedule notice goes to the people the portal tells. date must be at least five minutes ahead (422 date_not_future); a date under five minutes ahead is refused, never published immediately; a live post cannot get a later date (409 published_immutable). A bad date is 422 invalid_date. Returns &#123;post_id, status, scheduled, intent, date_gmt, date_site, notify}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `date` | string | yes | ISO 8601 date-time, e.g. 2026-11-03T09:00:00 (site timezone) or with Z / +02:00 (that instant). A bad date is 422 invalid_date. |


## `syteops_calendar_reserve_slot`

Hold the next free cadence moment on a draft or pending post, as an arriving article gets one; a post already holding one is moved (SyteOps calendar.slot_reserve; SyteOps 1.6.758+). Other statuses are 409 not_holdable; a post type the calendar does not handle is 422 unsupported_type. Not reserving is an answer: reserved is false with reason slots_disabled, cadence_opt_out or not_reserved. Returns &#123;post_id, reserved, reason, slot_gmt, slot_site}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_calendar_unpublish`

DESTRUCTIVE: takes a LIVE post down and returns it to a draft (SyteOps calendar.unpublish; SyteOps 1.6.758+). Needs confirm:true. 409 not_published when it is not live; the static front page and posts page are 409 protected_page. The publication date is kept; pending post-publish recipe runs and social sends are stood down. Returns &#123;post_id, status, previous_status}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `confirm` | boolean | no | Required (true): this takes the live post down. |


## `syteops_calendar_unschedule`

Cancel a scheduled post's publication and return it to a draft (SyteOps calendar.unschedule; SyteOps 1.6.758+); 409 not_scheduled when it is not scheduled. Reversible: previous_gmt is returned and syteops_calendar_reschedule puts it back. Returns &#123;post_id, status, previous_gmt, notify}. Returns 409 module_unavailable when Content Pipelines is not active.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


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


## `syteops_leads_callback_action`

Mark a callback done or not a lead, or reopen a closed one (SyteOps leads.callback_action; SyteOps 1.6.764+). This changes the callback's status, recorded against a person (their people slug) and the time. The verb param is do, not action: action is refused here as an unknown parameter. Safe to repeat: a callback already in that state, already closed by someone else, or not closed when you reopen it, changes nothing and answers ok with changed:false, already:true and who acted and when. Name the person with actor (a people slug held by the current holder of its Users slot, else 422 actor_not_current) or as_user_id, not both (422 actor_required); through MCP omit both to act as yourself, the SyteOps Admin (422 actor_unresolved when you have no people-registry entry). 409 contact_details_not_full unless contact details are stored in Full; 409 in_flight while the same request is still landing (retry shortly); 409 state_changed when the callback moved meanwhile; 403 actor_not_permitted when that person may not act on callbacks; 404 not_found; 422 invalid_action. Returns &#123;id, action, status, already, message, by, by_label (already only), at}. 409 callbacks_disabled while the RingTonic integration is off; 409 module_unavailable when Lead Attribution or callbacks are not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Callback id from syteops_leads_callbacks. |
| `do` | string | yes | done, not_lead or reopen (reopen applies only to a done, not_lead or expired callback). The param is do, not action. |
| `actor` | string | no | People slug of the person acting; must belong to the current holder of its Users slot. Send actor or as_user_id, not both. |
| `as_user_id` | integer | no | WordPress user ID of the person acting, resolved to their people slug; use instead of actor. Through MCP omit both to act as yourself. |


## `syteops_leads_callback_get`

Read-only. One callback with its 50 most recent events, newest first (SyteOps leads.callbacks_get; SyteOps 1.6.764+). It carries the raw phone number only while SyteOps stores contact details in Full; otherwise phone is absent, phone_masked is the mask (empty under Off) and display_name is empty. Do not copy the phone into logs, tickets or other systems. 404 not_found. Returns the list fields plus phone (Full only) and events[]: &#123;kind, actor, at, payload}; payload keeps only source, lead_id, status, action, from, to, via and api_key, where api_key is true or false: whether an API key authorized that action, never which key. SyteOps 1.6.769+ adds outbound-call kinds: outbound_completed, outbound_missed (status canceled: the rep never pressed 1; no-answer: it rang out; busy: say the lead's carrier refused the call), outbound_recording, outbound_transcription, outbound_placed. Their payload adds event, duration, call_log_uuid, started_at, recording (true or false) and transcription_confidence, plus summary under Full only. Never a transcript or recording link. 409 callbacks_disabled while the RingTonic integration is off; 409 module_unavailable when Lead Attribution or callbacks are not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Callback id from syteops_leads_callbacks. |


## `syteops_leads_callbacks`

Read-only. The Leads callback list: people to call back, one row per phone number, oldest first (SyteOps leads.callbacks_list; SyteOps 1.6.764+). By default only open rows (open, returned, follow_up); closed ones (done, not_lead, expired) and held ones are hidden unless status asks for them. An unknown status word is 422 invalid_status; page above 10000 is 422 invalid_page. The phone is always masked here (phone_masked; empty when contact details are Off), and names are empty unless contact details are stored in Full; syteops_leads_callback_get has the number. Returns &#123;items[], total, page, per_page, status}; an item is &#123;id, phone_masked, status, reason, display_name, carry_since, follow_up_date, follow_up_owner, closed_by, closed_at, last_lead_id, created_at, updated_at}. 409 callbacks_disabled while the RingTonic integration is off; 409 module_unavailable when Lead Attribution or callbacks are not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | no | Which callbacks: open (default: open, returned, follow_up), closed (done, not_lead, expired), all (every status, held included), one status, or a comma list of open, returned, follow_up, done, not_lead, expired, held. An unknown word is 422 invalid_status. |
| `page` | integer | no | Page number from 1 to 10000 (default 1); above is 422 invalid_page. |
| `per_page` | integer | no | Rows per page, 1 to 200 (default 50). |


## `syteops_listing_image_reprocess`

Rebuild the listing-card image for each image the article owns from scratch, even when one looks current (SyteOps listing_image.reprocess; SyteOps 1.6.758+): the failure memo is cleared and the paid repair re-queued. The live crop stays until the new one replaces it, so this is not destructive. At most 25 images per call; same refusals and 600-second per-article cooldown as syteops_listing_image_run.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_listing_image_run`

Build the listing-card image for each image the article owns that lacks a current one; current images are left alone (SyteOps listing_image.run; SyteOps 1.6.758+). With the watermark repair on this queues paid image-model jobs. At most 25 images per call. 409 listing_image_disabled when the feature is off; 429 cooldown (600 seconds per article, shared with syteops_listing_image_reprocess, not used up when nothing was built or queued); 404 post_not_found. Returns &#123;post_id, processed, queued, failed, skipped, items[]}.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_manifest`

Discover the SyteOps Manage API: every resource and action with its summary, parameter schema, and whether it is destructive. Optionally filter to one resource. Use this to learn what syteops_dispatch can do.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `resource` | string | no | Optional — return operations only for this resource (e.g. 'modules', 'users'). |


## `syteops_pipeline_activity`

Read-only. The Log view activity feed, newest first (SyteOps pipelines.activity; SyteOps 1.6.758+). Filter by event or post_id. per_page is 1 to 100 (422 invalid_per_page) and page 1 to 10000 (422 invalid_page). Rows carry only id, created_at, event, status, actor, post and an allowlisted meta; never a review link or token. Returns &#123;items[], total, page, per_page}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no | Rows per page, 1 to 100 (default 25). |
| `page` | integer | no | Page number from 1 to 10000 (default 1). |
| `event` | string | no | Only this activity event (a key such as recipe_deleted). |
| `post_id` | integer | no | Post ID. |


## `syteops_pipeline_engine_get`

Read-only. The stored engine choice for each capability, or for one (SyteOps pipelines.engine_get; SyteOps 1.6.758+), the engine running for it, and the engines that can fill it. An unknown capability is 422. Returns capabilities[]: &#123;capability, label, choice, effective, engines[]}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `capability` | string | no | Only this capability. Omit for all. Unknown is 422. |


## `syteops_pipeline_engine_set`

Choose the engine for a capability (SyteOps pipelines.engine_set; SyteOps 1.6.758+); an empty engine clears the choice. 422 unknown_capability; 422 invalid_engine when the engine does not fill it; seo and geo follow their integration toggles, so setting or clearing them is 409 engine_follows_integration. Returns &#123;capability, engine, previous}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `capability` | string | yes | Capability a stage engine fills, as listed by syteops_pipeline_engine_get. Unknown is 422 unknown_capability. |
| `engine` | string | yes | Engine ID from syteops_pipeline_stages; an empty string clears the choice. An engine that does not fill the capability is 422 invalid_engine. |


## `syteops_pipeline_geo_toggle`

Turn GEO generation on or off, the same switch as the provider card (SyteOps pipelines.geo_toggle; SyteOps 1.6.758+). Turning it off while LLMS Amplifier is the GEO engine is 409 amplifier_owns_geo. Returns &#123;enabled}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `enabled` | boolean | yes | true turns GEO generation on, false off. |


## `syteops_pipeline_history_clear`

DESTRUCTIVE: clears ALL run history and the mirrored activity feed (SyteOps pipelines.clear_runs; SyteOps 1.6.758+). Needs confirm:true. The lasting deletion records are kept and a runs_cleared record with the count is written. Returns &#123;deleted}. To delete one row use syteops_pipeline_run_delete. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confirm` | boolean | no | Required (true): this clears all run history. |


## `syteops_pipeline_llms_amplifier_set`

Turn LLMS Amplifier on or off as the GEO engine (SyteOps pipelines.llms_amplifier_set; SyteOps 1.6.758+). Enabling without the Amplifier plugin is 409 plugin_not_installed. Returns &#123;enabled, engine}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `enabled` | boolean | yes | true turns LLMS Amplifier on as the GEO engine, false off. |


## `syteops_pipeline_mode_get`

Read-only. The Content Pipelines operating mode (SyteOps pipelines.mode_get; SyteOps 1.6.758+): setup or production. Setup holds back run-history rows (activity rows are still recorded), forwarding to the workflow, social sends (held until production, not dropped) and the ingest reviewer, Now live, schedule-change and held-source alert emails, and forces new ingested posts to draft; review approvals and scheduled posts still publish in setup. Returns &#123;mode}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

_No parameters._


## `syteops_pipeline_mode_set`

DESTRUCTIVE: switches the Content Pipelines mode (SyteOps pipelines.mode_set; SyteOps 1.6.758+). Production starts workflow forwards and social sends and lets ingested posts publish. Setup holds back run history, forwards, social sends (held until production) and the ingest reviewer, Now live, schedule-change and held-source alert emails, and forces ingested posts to draft, but it does not stop syteops_review_approve or scheduled posts, which still publish. Needs confirm:true. Any other mode is 422 invalid_mode. Returns &#123;mode, previous}, plus pinned:true when a site filter keeps a different mode running. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `mode` | string | yes | setup (holds back run history, workflow forwarding, social sends (queued until production) and the ingest reviewer, Now live, schedule-change and held-source alert emails; new ingested posts stay drafts; review approvals and scheduled posts still publish) or production (everything live). Anything else is 422 invalid_mode. |
| `confirm` | boolean | no | Required (true): this changes what the pipelines record, send and publish. |


## `syteops_pipeline_run`

Run a pipeline recipe against one post now, inline (SyteOps pipelines.run). dry_run:true previews without persisting; force:true bypasses skip-unchanged. A missing, trashed, auto-draft or non-viewable post (post_id 0 included) is refused with 404 post_not_found, and a signed-in caller without edit_post on the post gets 403 forbidden; a refused run writes no run-history row. An unknown recipe_id errors unknown_recipe. The call returns ok even when the run fails: read data.status (error, or skipped/unchanged) and data.stages[*].status. dry_run:false cannot override a recipe whose policy.dry_run is true. Returns &#123;status, post_id, recipe, stages, run_id, changed}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `recipe_id` | string | no | Recipe id (a slug). Defaults to 'default'. |
| `force` | boolean | no | Bypass the skip-unchanged check. |


## `syteops_pipeline_run_delete`

DESTRUCTIVE: permanently deletes ONE run-history row (SyteOps pipelines.delete_run; SyteOps 1.6.758+). Needs confirm:true. Leaves a lasting run_deleted record. 404 not_found when the row is gone; 409 deletion_record_protected for a deletion-record row, which is never removed. Returns &#123;run_id, deleted}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `run_id` | integer | yes | Run ID from syteops_pipeline_runs. |
| `confirm` | boolean | no | Required (true): this deletes the run row. |


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


## `syteops_pipeline_stages`

Read-only. The registered stage engines (SyteOps pipelines.stages_list; SyteOps 1.6.758+): each &#123;id, label, capability, priority, available}. Use the ids with syteops_pipeline_engine_set. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

_No parameters._


## `syteops_pipeline_stats`

Read-only. The run-history counters of the pipelines dashboard (SyteOps pipelines.dashboard_stats; SyteOps 1.6.758+). Returns &#123;total, last7, changed, errors}. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

_No parameters._


## `syteops_recipe_create`

Create a pipeline recipe (SyteOps pipelines.create_recipe). The id defaults to the slug of name, and a recipe whose id matches an existing one is refused with 409 recipe_exists (it never replaces; use syteops_recipe_update to change one), so call syteops_recipe_list first. A busy write lock answers 409 save_failed: retry. A recipe is a list of stages, a trigger and a policy; copy the shape from syteops_recipe_get. On publish only the single highest-priority matching auto_publish recipe runs. Returns the saved recipe. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | no | Recipe id (a slug). Omit to derive it from name. An id that already exists is refused with 409 recipe_exists. |
| `name` | string | yes | Recipe name. |
| `priority` | integer | no | Recipe priority (default 0). Only the single highest-priority matching auto_publish recipe runs on publish, so a priority above the default recipe displaces it. |
| `stages` | array | no | Ordered list of stages: \{stage_id, enabled (default true), options\}. An item without stage_id is silently dropped. On update the list REPLACES all stages, so send the full list (copy from syteops_recipe_get). |
| `trigger` | object | no | \{mode: 'auto_publish' (default) or 'manual', scope: \{post_types: [..] (default ['post']), tag_slugs: [..]\}\}. Omitted, it defaults to auto_publish on posts. Supplied on update, it replaces the whole trigger, so send every key. |
| `policy` | object | no | \{on_error: 'continue' (default) or 'stop', rerun: 'always' (default) or 'skip_unchanged', execution: 'async' (default) or 'sync', dry_run: bool\}. Supplied on update, it replaces the whole policy, so send every key. |


## `syteops_recipe_delete`

Delete a pipeline recipe (SyteOps pipelines.delete_recipe). Needs confirm:true. The 'default' recipe cannot be deleted (protected_recipe). Returns &#123;id, deleted}. The deletion leaves a lasting recipe_deleted row in the Content Pipelines activity log. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps. SyteOps requires a SyteOps Admin for this delete.

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

Update a pipeline recipe (SyteOps pipelines.update_recipe). A merge-patch at the top level only: omitted keys are kept, but a supplied trigger or policy replaces that whole sub-object, so send the full sub-object to change one field (read it with syteops_recipe_get first). This is the tool that replaces a recipe by id. Errors not_found (404) for an unknown id. Returns the saved recipe. Returns 409 module_unavailable when Content Pipelines are disabled in SyteOps.

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


## `syteops_review_approve`

DESTRUCTIVE: approves a post for publishing (SyteOps review.approve; SyteOps 1.6.758+), as the Review Portal's Publish does with nothing edited. It publishes now, or schedules it when the post holds a reviewer's intended time or a reserved cadence slot at least a minute ahead. Needs confirm:true. Only posts sent for review (409 not_in_review). A post already live is ok with changed:false and already_live:true. It acts with SyteOps Admin authority: the post's reviewer list and who_can_publish are NOT checked for this caller. Still enforced: in review, readiness (409 not_ready with failed[] requirements), 409 published_immutable, 500 publish_failed. Open notes do not block it; open_notes reports them. It takes no as_user_id: the approver is the API key (user 0) or the signed-in SyteOps Admin. Returns &#123;post_id, status, scheduled, permalink, emailed, notify, images, open_notes, approved_by, already_live}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `confirm` | boolean | no | Required (true): this puts the post live (or schedules it). |


## `syteops_review_comment_add`

Add a review note as one person through the Review Portal's own writer (SyteOps review.comments_add; SyteOps 1.6.758+). Send exactly one target: parent_id (a reply to a top-level note; notify and resolve apply), attachment_id or image_url (a note on a picture), or element (a note pinned to a page element). None is 422 target_required, more than one is 422 ambiguous_target; for an article-level note use syteops_review_request_changes. The note is marked as added via API. Through MCP omit as_user_id to act as yourself (the SyteOps Admin); pass it only to act on behalf of that user (SyteOps's own REST API key must send it; MCP need not). That person must be able to comment (403 forbidden); resolve needs edit rights. Returns &#123;post_id, as_user_id, kind, entry}; a reply adds &#123;resolve, notified, notify}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `body` | string | yes | The note, plain text. |
| `as_user_id` | integer | no | User ID to act as. Through MCP omit as_user_id to act as yourself (the SyteOps Admin); pass it only to act on behalf of that user. (The 422 as_user_id_required rule applies to the SyteOps REST API key, not to MCP.) |
| `parent_id` | string | no | Reply to this top-level note id (a reply target). |
| `notify` | boolean | no | Reply only: email the thread (default true). |
| `resolve` | boolean | no | Reply only: also resolve the parent note (needs edit rights). |
| `attachment_id` | integer | no | Attachment ID of the picture (a picture target). |
| `image_url` | string | no | The picture's URL, when it has no attachment ID (a picture target). |
| `element` | object | no | Element target (an element note). Keys: selector, sig, text, ox, oy, vw, media, src, name, breakpoint, tag, el_id, classes, heading, html, builder_path, rect, url, bld; any other key is 422 invalid_params. |


## `syteops_review_comments`

Read-only. One post's review notes and replies, oldest first, as the portal shows them (SyteOps review.comments_list; SyteOps 1.6.750+). Returns &#123;post_id, total, page, per_page, has_more, comments[]}; a comment is &#123;id, parent, user_id, user_name, note, created_at, kind, target_kind, att_id, resolved}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `per_page` | integer | no | Notes per page, 1 to 100 (default 25). |
| `page` | integer | no | Page number from 1 to 10000 (default 1). |


## `syteops_review_get`

Read-only. One post's review status (SyteOps review.get; SyteOps 1.6.750+): post status, whether changes are requested, open and total note counts, the reviewers and watchers, and the latest recorded activity. A missing, trashed or non-viewable post is 404 post_not_found. Returns &#123;post_id, title, post_status, changes_requested, open_notes, total_notes, reviewers[], watchers[], last_activity: &#123;event, at} or null}; a person is &#123;user_id, display_name, roles[]}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_review_permissions_get`

Read-only. The Review Portal's Portal Permissions as the settings screen reads them (SyteOps review.permissions_get; SyteOps 1.6.758+): who_can_publish (any or author_approver), the per-area matrix (default row, role rows by SyteOps role slug, person rows by user number; an absent cell inherits), every area with its allowed values and whether this site shows it, and the role and person rows that may be set. Works before the portal is in use. Read it before syteops_review_permissions_set.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

_No parameters._


## `syteops_review_permissions_set`

DESTRUCTIVE: changes who can review and publish in the Review Portal (SyteOps review.permissions_set; SyteOps 1.6.758+). Needs confirm:true. Read syteops_review_permissions_get first. Partial, cell-level merge: only the cells sent change. In roles and users a cell of "inherit" or null clears it and a row of null clears the row; default takes real values only; only people linked to a WordPress account can be set. Send permissions, who_can_publish or both (422 nothing_to_change). 422 invalid_permissions (nothing is written) and invalid_who_can_publish; 409 no_publisher_left (author_approver with no administrator publish override); 409 busy (a concurrent set; retry). Returns &#123;who_can_publish, permissions, changes[]}.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `permissions` | object | no | Partial matrix: \{default?: \{area: value\}, roles?: \{slug: \{area: value\|"inherit"\|null\}\|null\}, users?: \{user_num: \{area: value\|"inherit"\|null\}\|null\}\}. Only the cells sent change; "inherit" or null clears a role or person cell, a null row clears the row; default takes real values only. |
| `who_can_publish` | string | no | any (any selected reviewer) or author_approver (the post author or an administrator). |
| `confirm` | boolean | no | Required (true): this changes who can publish. |


## `syteops_review_queue`

Read-only. One page of a person's Review Portal queue, as that person sees it (SyteOps review.queue_list; SyteOps 1.6.750+). list is pending (default), watching, live, live_posts, live_pages, coming_up or notes; per_page is 5, 10, 25 or 100; page on with the returned next_cursor. as_user_id is the person whose queue to read: SyteOps requires it on an API-key call (422 as_user_id_required), but this tool runs in-process as a SyteOps Admin, so it may be omitted and then reads that admin's own queue; an unknown user is 404 user_not_found, and an over-long cursor is 422 invalid_cursor. Rows carry no review links or tokens. Returns &#123;as_user_id, list, rows[], has_more, next_cursor, truncated, page_count}. A post row is &#123;post_id, title, source, received, scheduled_ts, modified_ts, feedback_count, changes_requested, qa}; a notes row is &#123;post_id, title, author, excerpt, created, note_id}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `as_user_id` | integer | no | User ID whose queue to read. Through MCP omit as_user_id to read your own queue (the SyteOps Admin); pass it to read that user's. (SyteOps's own REST API key must send it; MCP need not.) |
| `list` | string | no | Which list: pending (default), watching, live, live_posts, live_pages, coming_up or notes. |
| `per_page` | integer | no | Page size: 5, 10, 25 or 100. |
| `cursor` | string | no | next_cursor from the previous page, at most 512 characters. |


## `syteops_review_request_changes`

Send a post back for changes as one person (SyteOps review.request_changes; SyteOps 1.6.758+): records message as their note, cancels a pending schedule when they may publish, and emails the author and co-reviewers. The note is marked as added via API. Through MCP omit as_user_id to act as yourself (the SyteOps Admin); pass it only to act on behalf of that user (422 as_user_id_required applies to SyteOps's own REST API key, not to MCP). That person must be able to edit the post (403 forbidden); 409 schedule_due when it is about to publish and they cannot cancel it. Returns &#123;post_id, as_user_id, entry, emailed, notify, unscheduled, status}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `message` | string | yes | The note, plain text. |
| `as_user_id` | integer | no | User ID to act as. Through MCP omit as_user_id to act as yourself (the SyteOps Admin); pass it only to act on behalf of that user. (The 422 as_user_id_required rule applies to the SyteOps REST API key, not to MCP.) |


## `syteops_review_reviewer_add`

Add a reviewer to one post (SyteOps review.reviewers_add; SyteOps 1.6.758+). This grants that person edit rights on the post through the Review Portal, and publish rights too unless who_can_publish is author_approver (then only the author or an administrator can publish), and emails them; the review link gets a fresh expiry. user_id must be a SyteOps user linked to a WordPress account (422 user_not_selectable; 404 user_not_found). A post never sent for review is 409 not_review_managed. A watcher added as a reviewer stops being a watcher. Someone already listed is ok with changed:false and is not emailed again. Returns &#123;post_id, user_id, emailed, notify, reviewers[], watchers[]}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `user_id` | integer | yes | User ID of a SyteOps user linked to a WordPress account. |


## `syteops_review_reviewer_remove`

Remove a reviewer from one post (SyteOps review.reviewers_remove; SyteOps 1.6.758+). They lose portal access to it unless something else grants it (site administrator, watcher, bundle reviewer). The post's author cannot be removed (409 author_protected). The removal sticks: source default reviewers and CCs do not put them back. Someone not listed is ok with changed:false. No email is sent. Returns &#123;post_id, user_id, reviewers[], watchers[]}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `user_id` | integer | yes | User ID of a SyteOps user linked to a WordPress account. |


## `syteops_review_reviewers`

Read-only. The people who may review one post and the people watching it (SyteOps review.reviewers_get; SyteOps 1.6.750+). Ids, display names and roles only; no email addresses. Returns &#123;post_id, reviewers[], watchers[]}; a person is &#123;user_id, display_name, roles[]}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_review_watcher_add`

Add a watcher to one post (SyteOps review.watchers_add; SyteOps 1.6.758+): they may open it, comment and get its routine review emails, but cannot edit or publish. user_id must be a SyteOps user linked to a WordPress account (422 user_not_selectable). A post never sent for review is 409 not_review_managed; a reviewer of the post is 409 already_reviewer. Someone already watching is ok with changed:false. No email is sent. Returns &#123;post_id, user_id, reviewers[], watchers[]}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `user_id` | integer | yes | User ID of a SyteOps user linked to a WordPress account. |


## `syteops_review_watcher_remove`

Remove a watcher from one post (SyteOps review.watchers_remove; SyteOps 1.6.758+). They can no longer open or comment on it unless something else grants that. The removal sticks: source default CCs do not put them back. Someone not watching is ok with changed:false. No email is sent. Returns &#123;post_id, user_id, reviewers[], watchers[]}. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `user_id` | integer | yes | User ID of a SyteOps user linked to a WordPress account. |


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


## `syteops_social_cancel`

Cancel one scheduled social send on an article by the job_id syteops_social_schedule returned (SyteOps social.cancel; SyteOps 1.6.758+). Works while Social Publishing is off. 404 post_not_found; 404 job_not_found when no such job is pending. Returns &#123;post_id, job_id, cancelled}. Returns 409 module_unavailable when Social Publishing is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `job_id` | string | yes | The job_id returned by syteops_social_schedule. |


## `syteops_social_schedule`

Queue one social send for one article to a configured destination (SyteOps social.schedule; SyteOps 1.6.758+). when is time (default; sends at fire_at) or on_publish (sends when the article first goes live; fire_at is then 422 invalid_params). 409 social_disabled while Social Publishing is off; 422 bad_destination; 422 already_published (on_publish for an article already live); a send due while the pipeline is in setup mode is held and retried hourly until production; 404 post_not_found; a signed-in caller also needs publish rights on the post type (403 forbidden). Returns &#123;post_id, job_id, when, fire_at, destination}; keep job_id to cancel. Returns 409 module_unavailable when Social Publishing is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |
| `destination_id` | string | yes | A configured social destination ID (unknown is 422 bad_destination). |
| `text` | string | yes | The final post text, at most 3000 characters (422 text_too_long; empty is 422 empty_text). |
| `when` | string | no | time (default; send at fire_at) or on_publish (send when the article first goes live; fire_at not allowed). |
| `fire_at` | integer | no | Unix time in seconds, between one minute and five years ahead (422 bad_time / too_far). Needed when when is time. |


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


## `syteops_source_learn`

Ask the Ingest AI area to propose a field mapping from the source's captured sample (SyteOps content_sources.learn_from_sample; SyteOps 1.6.758+). The proposal REPLACES the stored mapping and is never approved: on a source whose mapping was approved, new deliveries are held until it is approved again, so that call needs confirm:true (409 confirmation_required). Spends an AI call and shares the source's daily AI allowance (default 10 a day, UTC) with syteops_source_reprocess (429 learn_cap_reached). 404 not_found; 409 no_provider or no_sample; 422 invalid_sample; 502 ai_empty_response or invalid_json; 503 ai_unavailable. Returns &#123;mapping}.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `confirm` | boolean | no | Required (true) when the source's mapping is approved. |


## `syteops_source_list`

List all content sources, the inbound feeds that create posts for the pipelines (SyteOps content_sources.list). Read-only. Each has id, name, slug, enabled, status, auth_mode, target_post_type, mapping, mapping_status, defaults and forward settings. Secrets are never included.

**Profiles:** `full`, `lean`, `syteops`

**Parameters**

_No parameters._


## `syteops_source_reprocess`

DESTRUCTIVE: replays a source's last captured payload through the ingest core (SyteOps content_sources.reprocess; SyteOps 1.6.758+). Needs confirm:true. It creates or updates the article with the source's own settings: a source set to publish publishes it, a source in overwrite mode overwrites reviewer edits on an article already live, and the draft core spends an AI call. Shares the source's daily AI allowance (default 10 a day, UTC) with syteops_source_learn (429 learn_cap_reached). 404 not_found (unknown or disabled source); 409 no_payload; 422 invalid_json. Returns &#123;outcome, message, post_id, created, edit_link}; changed is false for a held or protected article.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `confirm` | boolean | no | Required (true): this can publish or overwrite an article. |


## `syteops_source_resend_review_email`

Re-send the review email for a post to its own reviewers, never to a caller-supplied address (SyteOps content_sources.resend_review_email; SyteOps 1.6.758+). One resend per post every 120 seconds (429 resend_cooldown). 404 post_not_found; 400 no_recipients; 500 send_failed. Returns &#123;message, notify} with display names only. Returns 409 module_unavailable when the Review Portal is not loaded.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Post ID. |


## `syteops_source_rotate_secret`

Generate a new webhook secret for a content source and invalidate the old one at once (SyteOps content_sources.rotate_secret). Returns &#123;id, secret} with the new secret, once; it enters this conversation's transcript. The plaintext secret is not redacted and is returned only once: do not log or store it. Senders using the old secret fail until updated.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |


## `syteops_source_test`

Read-only preview of a mapping against a sample payload; nothing is written (SyteOps content_sources.test; SyteOps 1.6.758+). Omit mapping to test the source's stored mapping. An empty sample is 422 no_sample; 404 not_found. Returns &#123;normalized, empty_fields}.

**Profiles:** `full`, `syteops`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `sample` | object | yes | The sample payload, as a non-empty JSON object (an empty one is 422 no_sample). |
| `mapping` | object | no | Optional field =\> \{path, transform\} rows to try; omit to test the source's stored mapping. |


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

