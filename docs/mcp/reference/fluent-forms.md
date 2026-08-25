---
title: Fluent Forms
description: MCP tools provided by Fluent Forms (provider id fluent-forms).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# Fluent Forms

Provider id: `fluent-forms` · 18 tool(s).

## `fform_add_entry_note`

Add an admin note to a Fluent Forms entry. content and status are sent inside a note object; status defaults to info.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `entry_id` | integer | yes | The submission ID. |
| `content` | string | yes | The note body. |
| `status` | string | no | Note status: success, error, or info (default). |
| `form_id` | integer | no | Optional form ID. |


## `fform_bulk_entry_action`

Bulk action over selected Fluent Forms entries. action_type other.delete_permanently PERMANENTLY deletes — preview with dry_run first.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID (sent in the request body). |
| `entries` | array | yes | Array of entry IDs to act on. |
| `action_type` | string | yes | Action to perform: unread, read, favorites, trashed, other.delete_permanently, other.make_favorite, other.unmark_favorite. |


## `fform_create_form`

Create a Fluent Form from a template. Creates the form structure from a predefined template — you cannot pass fields here; use fform_update_form to set fields after creation. The server appends " (#id)" to the title. An unknown predefined template returns 422. Common template keys: blank_form, basic_contact_form, conversational, newsletter_form.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `predefined` | string | no | Template key (default: blank_form). Common values: blank_form, basic_contact_form, conversational, newsletter_form. |
| `title` | string | no | Form title (the server appends " (#id)" automatically). |
| `type` | string | no | Form type. |


## `fform_delete_entry`

Delete a Fluent Forms entry (submission) by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `entry_id` | integer | yes | The submission ID to delete. |


## `fform_delete_form`

Delete a Fluent Form by ID. This also removes its entries.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID to delete. |


## `fform_duplicate_form`

Duplicate a Fluent Form by ID. Creates a copy of the form including its fields and settings.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID to duplicate. |


## `fform_get_entry`

Get a single Fluent Forms entry (submission) by ID.

**Profiles:** `full`, `lean`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `entry_id` | integer | yes | The submission ID. |


## `fform_get_form`

Get a single Fluent Form by ID (structure, fields, settings).

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID. |


## `fform_get_form_settings`

Get the general settings for a Fluent Form (confirmation, restrictions, layout) plus advanced validation settings.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID. |


## `fform_get_form_stats`

Get Fluent Forms submission stats for a date range (submission counts, optionally scoped to one form). Defaults to the last 30 days when dates are omitted. For the entries/payments/views "metric" breakdown across forms, use the top-performing-forms report via fform_request.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `start_date` | string | no | Report start date (Y-m-d). Defaults to 30 days ago. |
| `end_date` | string | no | Report end date (Y-m-d). Defaults to today. |
| `form_id` | integer | no | Limit stats to a specific form ID. |


## `fform_list_entries`

List Fluent Forms entries (submissions). Pass form_id to scope to one form.

**Profiles:** `full`, `lean`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | no | Limit to a specific form ID. |
| `search` | string | no | Search term. |
| `status` | string | no | Filter by entry status (e.g. read, unread, trashed). |
| `parse_entry` | boolean | no | Return human-readable field labels/values. |
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fform_list_entry_notes`

List the admin notes on a Fluent Forms entry.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `entry_id` | integer | yes | The submission ID. |


## `fform_list_forms`

List Fluent Forms with optional search and pagination.

**Profiles:** `full`, `lean`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by form status (e.g. published). |
| `per_page` | integer | no | Items per page (default 10). |
| `page` | integer | no | Page number. |


## `fform_list_routes`

List the Fluent Forms REST routes registered under /fluentform/v1 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for fform_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `fform_request`

Call any Fluent Forms REST route (scoped to /fluentform/v1). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use fform_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluentform/v1, e.g. /fluentform/v1/contacts or /fluentform/v1/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `fform_update_entry_status`

Update the status of a Fluent Forms entry (e.g. read, unread, trashed).

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `entry_id` | integer | yes | The submission ID. |
| `status` | string | yes | New status. |


## `fform_update_form`

Update an existing Fluent Form. title is required by the API. form_fields must be a JSON-encoded STRING (e.g. '&#123;"fields":[],"submitButton":&#123;}}') — passing an array breaks the server's json_decode. To update only the title, omit form_fields.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID to update. |
| `title` | string | yes | Form title (required by the API). |
| `form_fields` | string | no | JSON-encoded STRING of \{"fields":[...],"submitButton":\{...\},"stepsWrapper"?:[...]\}. Must be a string, not an array. |
| `status` | string | no | Form status (default: published server-side). |


## `fform_update_form_settings`

Update the general settings for a Fluent Form. Both form_settings and advanced_validation_settings must be JSON-encoded STRINGS. form_settings is required and must contain a valid "confirmation" object or the API returns 422. advanced_validation_settings is optional.

**Profiles:** `full`, `forms`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `form_id` | integer | yes | The form ID. |
| `form_settings` | string | yes | JSON-encoded STRING of general settings; must contain a "confirmation" object. |
| `advanced_validation_settings` | string | no | JSON-encoded STRING of advanced validation settings (optional). |

