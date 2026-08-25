---
title: Fluent Affiliate
description: MCP tools provided by Fluent Affiliate (provider id fluent-affiliate).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# Fluent Affiliate

Provider id: `fluent-affiliate` · 55 tool(s).

## `faff_add_manager`

Add (or update) a manager: grant a WordPress user scoped affiliate-admin permissions.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | WordPress user ID. |
| `permissions` | array | yes | Permission keys: read_all_affiliates, manage_all_affiliates, read_all_referrals, manage_all_referrals, read_all_visits, read_all_payouts, manage_all_payouts, manage_all_data. |


## `faff_create_affiliate`

Create an affiliate for an existing WordPress user.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | WordPress user ID to enroll. |
| `status` | string | yes | pending, active, or inactive. |
| `rate_type` | string | yes | default, group, flat, or percentage. |
| `rate` | number | no | Commission rate (required for flat/percentage). |
| `group_id` | integer | no | Affiliate group ID (required when rate_type=group). |
| `payment_email` | string | no | Payout email (non-bank programs). |
| `bank_details` | string | no | Bank details (bank_transfer programs). |


## `faff_create_creative`

Create an affiliate creative (banner/text/html link).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Creative name. |
| `description` | string | no | Creative description (optional). |
| `type` | string | yes | image, text, html, or banner. |
| `image` | string | no | Image URL (image/banner types). |
| `text` | string | no | Text/HTML body (text/html types). |
| `url` | string | no | Destination URL. |
| `privacy` | string | no | public or private (default public). |
| `status` | string | no | active, inactive, scheduled, or expired (default active). |
| `affiliate_ids` | array | no | Restrict to these affiliate IDs (private). |
| `group_ids` | array | no | Restrict to these group IDs (private). |
| `meta` | object | no | Extra meta (start_time, end_time, media_width, media_height, media_type, attachment_id). |


## `faff_create_group`

Create an affiliate group (commission tier).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Group name. |
| `rate_type` | string | no | percentage, flat, or default. |
| `rate` | number | no | Commission rate. |
| `status` | string | no | active or inactive. |
| `notes` | string | no | Optional notes. |


## `faff_create_referral`

Create a referral (commission) for an active affiliate.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `affiliate_id` | integer | yes | Affiliate ID (must be active). |
| `amount` | number | yes | Commission amount. |
| `status` | string | yes | unpaid, pending, or rejected (paid is system-set). |
| `type` | string | yes | sale or opt_in. |
| `description` | string | no | Optional description. |
| `provider` | string | no | Source provider (default manual). |
| `provider_id` | integer | no | Source provider reference ID. |


## `faff_delete_affiliate`

Delete an affiliate.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |


## `faff_delete_creative`

Delete an affiliate creative.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Creative ID. |


## `faff_delete_group`

Delete an affiliate group.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Group ID. |


## `faff_delete_payout_transaction`

Delete a transaction from a payout.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |
| `transaction_id` | integer | yes | Transaction ID. |


## `faff_delete_referral`

Delete a referral.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Referral ID. |


## `faff_get_affiliate`

Get a Fluent Affiliate affiliate by ID.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |


## `faff_get_affiliate_statistics`

Get detailed (time-series) statistics for a single affiliate.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |


## `faff_get_affiliate_stats`

Get overview statistics for a single affiliate.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |


## `faff_get_commerce_report`

Get the commerce report for a specific integration provider (e.g. fluent-cart, woocommerce).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `provider` | string | yes | Provider slug (see faff_list_advanced_providers). |


## `faff_get_creative`

Get a creative by ID.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Creative ID. |


## `faff_get_dashboard_chart_stats`

Get the dashboard time-series chart statistics.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_get_dashboard_stats`

Get the affiliate program dashboard statistics (totals for affiliates, referrals, payouts, visits).

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_get_email_config`

Get the affiliate email notification config.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_get_group`

Get an affiliate group by ID.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Group ID. |


## `faff_get_group_affiliates`

List affiliates in a group.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Group ID. |


## `faff_get_group_overview`

Get an affiliate group overview.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Group ID. |


## `faff_get_group_statistics`

Get affiliate group statistics.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Group ID. |


## `faff_get_payout`

Get a payout by ID.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |


## `faff_get_referral`

Get a referral by ID.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Referral ID. |


## `faff_get_referral_config`

Get the affiliate referral/commission program config.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_get_registration_fields`

Get the affiliate registration form fields config.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_advanced_providers`

List the commerce integrations (advanced providers) available for commerce reports.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_affiliate_referrals`

List referrals for a specific affiliate (native way to filter referrals by affiliate).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |
| `search` | string | no | Search term. |
| `status` | string | no | Referral status (unpaid, pending, rejected, paid). |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_affiliate_transactions`

List payout transactions for a specific affiliate.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_affiliate_visits`

List visits attributed to a specific affiliate.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_affiliates`

List Fluent Affiliate affiliates with optional search/status filter.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by status (pending, active, inactive). |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_creatives`

List affiliate creatives (banners/links).

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_groups`

List affiliate groups.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_integrations`

List available commerce integrations and their connection status.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_managers`

List Fluent Affiliate managers and their permissions.

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_pages`

List the affiliate program pages (portal, registration, etc.).

**Profiles:** `full`, `affiliate`

**Parameters**

_No parameters._


## `faff_list_payout_referrals`

List the referrals included in a payout.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_payout_transactions`

List the per-affiliate transactions in a payout.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_payouts`

List Fluent Affiliate payouts with optional search/status filter.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by status (draft, processing, paid, failed). |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_referrals`

List Fluent Affiliate referrals (commissions) with optional search/status filter.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by status (unpaid, pending, rejected, paid). |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_list_routes`

List the Fluent Affiliate REST routes registered under /fluent-affiliate/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for faff_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `faff_list_visits`

List Fluent Affiliate referral visits with optional search/status filter.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by status (converted, unconverted). |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `faff_mark_payout_transactions_paid`

Bulk-mark all processing transactions in a payout as paid.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |


## `faff_process_payout`

Create and process a payout from a config: claims matching referrals and marks them paid. Moves money — use faff_validate_payout_config first.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Payout title. |
| `description` | string | yes | Payout description. |
| `affiliate_ids` | array | no | Limit to these affiliate IDs (optional). |
| `start_date` | string | no | Referral start date (Y-m-d, optional). |
| `end_date` | string | no | Referral end date (Y-m-d, optional). |
| `min_payout` | number | no | Minimum payout threshold (optional). |


## `faff_remove_manager`

Remove a manager (revoke their affiliate-admin permissions).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Manager record ID (or WP user ID per the managers list). |


## `faff_request`

Call any Fluent Affiliate REST route (scoped to /fluent-affiliate/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use faff_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluent-affiliate/v2, e.g. /fluent-affiliate/v2/contacts or /fluent-affiliate/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `faff_set_affiliate_status`

Set affiliate status (pending, active, inactive). Errors if unchanged. Dry-run-gated for parity with sibling status setters.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |
| `status` | string | yes | New status: pending, active, or inactive. |


## `faff_update_affiliate`

Update an affiliate (status, rate, group, payout target, note).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Affiliate ID. |
| `status` | string | yes | pending, active, or inactive. |
| `rate_type` | string | yes | default, group, flat, or percentage. |
| `rate` | number | no | Commission rate (required for flat/percentage). |
| `group_id` | integer | no | Affiliate group ID (required when rate_type=group). |
| `payment_email` | string | no | Payout email. |
| `bank_details` | string | no | Bank details. |
| `note` | string | no | Optional internal note. |


## `faff_update_creative`

Update an affiliate creative.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Creative ID. |
| `name` | string | no | Creative name. |
| `description` | string | no | Creative description (optional). |
| `type` | string | no | image, text, html, or banner. |
| `image` | string | no | Image URL. |
| `text` | string | no | Text/HTML body. |
| `url` | string | no | Destination URL. |
| `privacy` | string | no | public or private. |
| `status` | string | no | active, inactive, scheduled, or expired. |
| `affiliate_ids` | array | no | Restrict to these affiliate IDs. |
| `group_ids` | array | no | Restrict to these group IDs. |
| `meta` | object | no | Extra meta. |


## `faff_update_group`

Update an affiliate group.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Group ID. |
| `name` | string | no | Group name. |
| `rate_type` | string | no | percentage, flat, or default. |
| `rate` | number | no | Commission rate. |
| `status` | string | no | active or inactive. |
| `notes` | string | no | Optional notes. |


## `faff_update_payout`

Update a payout title/description (only these two fields are editable).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |
| `title` | string | yes | Payout title (3-255 chars). |
| `description` | string | yes | Payout description (3-500 chars). |


## `faff_update_payout_transaction`

Set a payout transaction status (processing or paid). Marking paid is a payout money-state change, so this is dry-run-gated like its bulk/delete siblings.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Payout ID. |
| `transaction_id` | integer | yes | Transaction ID. |
| `status` | string | yes | processing or paid. |


## `faff_update_referral`

Update a referral (amount, status, type, description). Cannot edit a paid referral.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Referral ID. |
| `amount` | number | yes | Commission amount. |
| `status` | string | yes | unpaid, pending, or rejected. |
| `type` | string | yes | sale or opt_in. |
| `description` | string | no | Optional description. |


## `faff_update_referral_config`

Update the referral/commission program config. Pass the full config object (fetch with faff_get_referral_config first to round-trip).

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `referral_config` | object | yes | The full referral_config object (commission type/rate, cookie duration, enabled integrations, referral variable, etc.). |


## `faff_validate_payout_config`

Validate/preview a payout config (claimable referrals) without creating it. Safe, no side effects.

**Profiles:** `full`, `affiliate`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Payout title. |
| `description` | string | yes | Payout description. |
| `affiliate_ids` | array | no | Limit to these affiliate IDs (optional). |
| `start_date` | string | no | Referral start date (Y-m-d, optional). |
| `end_date` | string | no | Referral end date (Y-m-d, optional). |
| `min_payout` | number | no | Minimum payout threshold (optional). |

