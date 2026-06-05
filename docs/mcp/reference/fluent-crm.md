---
title: FluentCRM
description: MCP tools provided by FluentCRM (provider id fluent-crm).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# FluentCRM

Provider id: `fluent-crm` · 75 tool(s).

## `fcrm_add_company_note`

Add a note to a FluentCRM company. Provide title or description (or both).

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `title` | string | no |  |
| `description` | string | no |  |
| `type` | string | no | Note type (note, call, email, meeting, quote — defaults to note). |


## `fcrm_add_contact_note`

Add a note to a FluentCRM contact. Provide title or description (or both).

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscriber_id` | integer | yes |  |
| `title` | string | no |  |
| `description` | string | no |  |
| `type` | string | no | Note type (note, call, email, meeting, quote — defaults to note). |


## `fcrm_add_subscribers_to_sequence`

Enroll one or more subscribers into a FluentCRM email sequence.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Sequence ID. |
| `subscriber_ids` | array | yes | IDs of subscribers to enroll (required, non-empty). |


## `fcrm_attach_company_contacts`

Attach one or more FluentCRM contacts (subscriber IDs) to a company.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `subscriber_ids` | array | yes | Contact (subscriber) IDs to attach. |


## `fcrm_create_campaign`

Create a FluentCRM email campaign. "title", "subject", and "email_body" are required.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Internal campaign title. |
| `subject` | string | yes | Email subject line. |
| `email_body` | string | yes | Email HTML body. |


## `fcrm_create_company`

Create a FluentCRM company. "name" is required. owner_id is a WP user ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Company name (required). |
| `email` | string | no |  |
| `website` | string | no |  |
| `industry` | string | no |  |
| `phone` | string | no |  |
| `address_line_1` | string | no |  |
| `address_line_2` | string | no |  |
| `city` | string | no |  |
| `state` | string | no |  |
| `postal_code` | string | no |  |
| `country` | string | no |  |
| `description` | string | no |  |
| `type` | string | no | e.g. private, public, partnership. |
| `logo` | string | no | Logo image URL. |
| `linkedin_url` | string | no |  |
| `facebook_url` | string | no |  |
| `twitter_url` | string | no |  |
| `date_of_start` | string | no | Founding date (YYYY-MM-DD). |
| `timezone` | string | no |  |
| `employees_number` | integer | no |  |
| `owner_id` | integer | no | WP user ID of the company owner. |


## `fcrm_create_contact`

Create a FluentCRM contact. "email" is required. Set force_update to upsert an existing email instead of erroring.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | yes | Contact email (required). |
| `first_name` | string | no |  |
| `last_name` | string | no |  |
| `phone` | string | no |  |
| `status` | string | no | subscribed, unsubscribed, or pending. |
| `tags` | array | no | Tag IDs to attach. |
| `lists` | array | no | List IDs to attach. |
| `force_update` | boolean | no | If true, update the contact when the email already exists. |


## `fcrm_create_list`

Create a FluentCRM list. "title" is required.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes |  |
| `slug` | string | no |  |
| `description` | string | no |  |


## `fcrm_create_tag`

Create a FluentCRM tag. "title" is required.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes |  |
| `slug` | string | no |  |
| `description` | string | no |  |


## `fcrm_create_template`

Create a FluentCRM email template. "title" is required.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes |  |
| `email_subject` | string | no |  |
| `email_body` | string | no | HTML body or block markup. |
| `design_template` | string | no | Design template id (e.g. simple, raw_classic, raw_html). |


## `fcrm_create_webhook`

Create a FluentCRM webhook. "name" and "value" (target URL) are required.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes |  |
| `value` | string | yes | Target URL. |
| `tags` | array | no | Tag IDs to attach to new contacts. |
| `lists` | array | no | List IDs to attach to new contacts. |
| `is_active` | boolean | no |  |


## `fcrm_delete_campaign`

Delete a FluentCRM campaign.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_delete_company`

Delete a FluentCRM company by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_delete_company_note`

Delete a note from a FluentCRM company.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `note_id` | integer | yes |  |


## `fcrm_delete_contact`

Delete a FluentCRM contact by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Contact ID. |


## `fcrm_delete_contact_note`

Delete a note from a FluentCRM contact.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscriber_id` | integer | yes |  |
| `note_id` | integer | yes |  |


## `fcrm_delete_list`

Delete a FluentCRM list by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_delete_tag`

Delete a FluentCRM tag by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_delete_template`

Delete a FluentCRM email template by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_delete_webhook`

Delete a FluentCRM webhook by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_detach_company_contacts`

Detach one or more FluentCRM contacts (subscriber IDs) from a company. Removes the association only; contacts are not deleted.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `subscriber_ids` | array | yes | Contact (subscriber) IDs to detach. |


## `fcrm_duplicate_campaign`

Duplicate a FluentCRM campaign.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_duplicate_sequence`

Duplicate a FluentCRM email sequence.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_estimate_segment_contacts`

Estimate the contact count a dynamic-segment definition would match. Use this to size-check before saving a segment.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `conditions` | array | yes | Segment condition rules (FluentCRM condition shape). |


## `fcrm_get_automation`

Get a FluentCRM automation funnel by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_automation_report`

Get the run report (counts per step, conversions) for a FluentCRM automation funnel.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_automation_subscribers`

List subscribers enrolled in a FluentCRM automation funnel.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Funnel ID. |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_get_campaign`

Get a FluentCRM campaign by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_campaign_stats`

Get the marquee performance stats for a FluentCRM campaign (overview_stats: sent, opens, clicks, unsubscribes).

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_company`

Get a FluentCRM company by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_company_custom_fields`

Get the FluentCRM custom-field schema for companies (returns all defined fields).

**Profiles:** `full`, `crm`

**Parameters**

_No parameters._


## `fcrm_get_contact`

Get a FluentCRM contact by ID (or email).

**Profiles:** `full`, `lean`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Contact ID or email address. |


## `fcrm_get_contact_activity`

Get the activity (tracking events) feed for a FluentCRM contact.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscriber_id` | integer | yes |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_get_contact_custom_fields`

Get the FluentCRM custom-field schema for contacts (returns all defined fields).

**Profiles:** `full`, `crm`

**Parameters**

_No parameters._


## `fcrm_get_contacts_breakdown`

Get a FluentCRM contacts breakdown by dimension. Pick one: status, tags, lists, country.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `dimension` | string | yes | Which breakdown to fetch. |


## `fcrm_get_dashboard_stats`

Get the FluentCRM dashboard summary stats (total contacts, sent emails, opens, clicks).

**Profiles:** `full`, `lean`, `crm`

**Parameters**

_No parameters._


## `fcrm_get_email_performance`

Get the FluentCRM email performance report (aggregate open/click/unsub rates over time).

**Profiles:** `full`, `crm`

**Parameters**

_No parameters._


## `fcrm_get_list`

Get a FluentCRM list by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_sequence`

Get a FluentCRM email sequence by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_sequence_subscribers`

List subscribers enrolled in a FluentCRM email sequence.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_get_tag`

Get a FluentCRM tag by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_template`

Get a FluentCRM email template by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


## `fcrm_get_top_campaigns`

Get the FluentCRM top-performing campaigns report.

**Profiles:** `full`, `crm`

**Parameters**

_No parameters._


## `fcrm_list_automations`

List FluentCRM automation funnels.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_campaigns`

List FluentCRM email campaigns.

**Profiles:** `full`, `lean`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search by title. |
| `status` | string | no | Filter by status (draft, scheduled, sent, archived). |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_companies`

List FluentCRM companies (filter by search term, paginated).

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search by company name/email. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fcrm_list_company_notes`

List notes attached to a FluentCRM company.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_contact_notes`

List notes attached to a FluentCRM contact.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscriber_id` | integer | yes |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_contacts`

List FluentCRM contacts with filtering and pagination.

**Profiles:** `full`, `lean`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search by name/email. |
| `status` | string | no | Filter by status (subscribed, unsubscribed, bounced, complained, pending). |
| `tags` | array | no | Filter by tag IDs. |
| `lists` | array | no | Filter by list IDs. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fcrm_list_lists`

List all FluentCRM contact lists.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_routes`

List the FluentCRM REST routes registered under /fluent-crm/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for fcrm_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `fcrm_list_segments`

List FluentCRM dynamic segments (flat array, no pagination).

**Profiles:** `full`, `crm`

**Parameters**

_No parameters._


## `fcrm_list_sequences`

List FluentCRM email sequences.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_tags`

List all FluentCRM tags.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_templates`

List FluentCRM email templates (fc_template). Returns WP post objects.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no |  |
| `per_page` | integer | no |  |
| `page` | integer | no |  |


## `fcrm_list_webhooks`

List all FluentCRM webhooks. Returns &#123;webhooks, fields, custom_fields, lists, tags}; no individual GET exists.

**Profiles:** `full`, `crm`

**Parameters**

_No parameters._


## `fcrm_remove_subscribers_from_automation`

Remove one or more subscribers from a FluentCRM automation funnel (bulk).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `funnel_id` | integer | yes |  |
| `subscriber_ids` | array | yes | IDs of subscribers to remove (required, non-empty). |


## `fcrm_remove_subscribers_from_sequence`

Remove one or more subscribers from a FluentCRM email sequence.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Sequence ID. |
| `subscriber_ids` | array | yes | IDs of subscribers to remove (required, non-empty). |


## `fcrm_request`

Call any FluentCRM REST route (scoped to /fluent-crm/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use fcrm_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluent-crm/v2, e.g. /fluent-crm/v2/contacts or /fluent-crm/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `fcrm_save_company_custom_fields`

Save the FluentCRM company custom-field schema. WARNING: this REPLACES the full set — fetch the current fields with fcrm_get_company_custom_fields, merge your changes, and pass the complete merged list. Anything omitted is removed.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fields` | array | yes | Complete list of field definitions (each with slug, label, type, plus options for select/radio types). |


## `fcrm_save_contact_custom_fields`

Save the FluentCRM contact custom-field schema. WARNING: this REPLACES the full set — fetch the current fields with fcrm_get_contact_custom_fields, merge your changes, and pass the complete merged list. Anything omitted is removed.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fields` | array | yes | Complete list of field definitions (each with slug, label, type, plus options for select/radio types). |


## `fcrm_search_unattached_contacts`

Search FluentCRM contacts not yet attached to the given company (use to find contacts before attaching).

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `search` | string | no | Search term (name/email). |


## `fcrm_send_campaign`

Send or schedule a FluentCRM campaign. Omit scheduled_at to send immediately.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `scheduled_at` | string | no | Datetime (Y-m-d H:i:s) to schedule; omit to send now. |


## `fcrm_send_contact_email`

Send a one-off transactional email to a single FluentCRM contact. Sends a real email. Use dry_run to preview.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscriber_id` | integer | yes |  |
| `email_subject` | string | yes |  |
| `email_body` | string | yes |  |
| `from_email` | string | no |  |
| `from_name` | string | no |  |


## `fcrm_send_test_email`

Send a test version of a FluentCRM campaign to specific recipients. Sends real emails. Use dry_run to preview.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `campaign_id` | integer | yes | Campaign to test. |
| `recipients` | array | yes | Recipient email addresses (required, non-empty). |
| `subject` | string | no | Optional override of campaign subject. |
| `email_body` | string | no | Optional override of campaign HTML body. |


## `fcrm_update_automation_status`

Update an automation funnel-level status (e.g. published, draft).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `status` | string | yes | New funnel status. |


## `fcrm_update_campaign`

Update a FluentCRM campaign (title, subject, body). Only provided fields are changed. Mutates a mass-mailing artifact; use dry_run to preview.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `title` | string | no |  |
| `subject` | string | no |  |
| `email_body` | string | no |  |


## `fcrm_update_company`

Update a FluentCRM company by ID. Pass any subset of fields to change.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `name` | string | no |  |
| `email` | string | no |  |
| `website` | string | no |  |
| `industry` | string | no |  |
| `phone` | string | no |  |
| `address_line_1` | string | no |  |
| `address_line_2` | string | no |  |
| `city` | string | no |  |
| `state` | string | no |  |
| `postal_code` | string | no |  |
| `country` | string | no |  |
| `description` | string | no |  |
| `type` | string | no |  |
| `logo` | string | no |  |
| `linkedin_url` | string | no |  |
| `facebook_url` | string | no |  |
| `twitter_url` | string | no |  |
| `date_of_start` | string | no |  |
| `timezone` | string | no |  |
| `employees_number` | integer | no |  |
| `owner_id` | integer | no |  |


## `fcrm_update_company_note`

Update a note attached to a FluentCRM company.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `company_id` | integer | yes |  |
| `note_id` | integer | yes |  |
| `title` | string | no |  |
| `description` | string | no |  |
| `type` | string | no |  |


## `fcrm_update_contact`

Update a FluentCRM contact by ID. Use attach_/detach_ arrays to change tags and lists.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Contact ID. |
| `email` | string | no |  |
| `first_name` | string | no |  |
| `last_name` | string | no |  |
| `phone` | string | no |  |
| `status` | string | no | subscribed, unsubscribed, or pending. |
| `attach_tags` | array | no | Tag IDs to add. |
| `detach_tags` | array | no | Tag IDs to remove. |
| `attach_lists` | array | no | List IDs to add. |
| `detach_lists` | array | no | List IDs to remove. |


## `fcrm_update_contact_note`

Update a note attached to a FluentCRM contact.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscriber_id` | integer | yes |  |
| `note_id` | integer | yes |  |
| `title` | string | no |  |
| `description` | string | no |  |
| `type` | string | no |  |


## `fcrm_update_list`

Update a FluentCRM list by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `title` | string | no |  |
| `slug` | string | no |  |
| `description` | string | no |  |


## `fcrm_update_tag`

Update a FluentCRM tag by ID.

**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `title` | string | no |  |
| `slug` | string | no |  |
| `description` | string | no |  |


## `fcrm_update_template`

Update a FluentCRM email template by ID. Only provided fields are changed, but each overwrites the stored value.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `title` | string | no |  |
| `email_subject` | string | no |  |
| `email_body` | string | no |  |
| `design_template` | string | no |  |


## `fcrm_update_webhook`

Update a FluentCRM webhook by ID. Overwrites the stored webhook configuration.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `crm`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `name` | string | no |  |
| `value` | string | no |  |
| `tags` | array | no |  |
| `lists` | array | no |  |
| `is_active` | boolean | no |  |

