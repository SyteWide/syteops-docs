---
title: WooCommerce
description: MCP tools provided by WooCommerce (provider id woocommerce).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# WooCommerce

Provider id: `woocommerce` · 12 tool(s).

## `wc_analytics_list_routes`

List the WooCommerce Analytics REST routes registered under /wc-analytics and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for wc_analytics_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `wc_analytics_request`

Call any WooCommerce Analytics REST route (scoped to /wc-analytics). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use wc_analytics_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /wc-analytics, e.g. /wc-analytics/\<resource\> for a collection or /wc-analytics/\<resource\>/42 for one item. Call wc_analytics_list_routes for the real resource names — do not guess them. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `wc_get_settings_group`

Read the options in ONE WooCommerce settings group, with each option's id, current value, default and type. Returns only that group's own options — NOT its children's: settings groups are hierarchical, so stock options are in "inventory" rather than "products", and per-email options are in the email_* groups. If an option you expect is missing, check the group's sub_groups via wc_list_settings_groups. Store address and currency live in "general"; tax posture lives in "tax".

**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `group` | string | yes | Settings group id, e.g. general, products, tax, shipping. |


## `wc_get_shipping_zone`

Get one WooCommerce shipping zone with its locations and shipping methods resolved. Use this to read the current location set before calling wc_set_shipping_zone_locations.

**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `zone_id` | integer | yes | Shipping zone ID (0 is "Locations not covered by your other zones"). |


## `wc_list_routes`

List the WooCommerce REST routes registered under /wc/v3 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for wc_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `wc_list_settings_groups`

List the WooCommerce settings groups (general, products, tax, shipping, checkout, account, email, advanced, integration, plus any an extension has added). Groups are HIERARCHICAL: the response is one flat list in which child groups carry a "parent_id" and parents carry "sub_groups". Options live on whichever group actually owns them — stock settings are in "inventory" (a child of products), not in "products" — so read sub_groups before concluding an option does not exist.

**Profiles:** `full`, `woo`

**Parameters**

_No parameters._


## `wc_list_shipping_zones`

List WooCommerce shipping zones with each zone's locations and shipping methods resolved in one call. Includes zone 0 ("Locations not covered by your other zones"), which has methods but no locations. Resolving costs one request per zone per sub-resource, so set include_locations or include_methods to false, or lower "limit", on stores with many zones.

**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `include_locations` | boolean | no | Resolve each zone's locations (default true). |
| `include_methods` | boolean | no | Resolve each zone's shipping methods (default true). |
| `limit` | integer | no | Max zones to resolve (1-200, default 50). The response reports total and truncated. |


## `wc_request`

Call any WooCommerce REST route (scoped to /wc/v3). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use wc_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /wc/v3, e.g. /wc/v3/\<resource\> for a collection or /wc/v3/\<resource\>/42 for one item. Call wc_list_routes for the real resource names — do not guess them. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `wc_set_shipping_zone_locations`

Replace a shipping zone's ENTIRE location set. WooCommerce's underlying PUT replaces every location on the zone — it does NOT merge — so "locations" must be the complete intended set, not just the additions. Read the current set with wc_get_shipping_zone first. WooCommerce silently discards entries with a missing code or an unrecognized type, so the response reports added/removed/rejected computed against what WooCommerce actually stored. Pass an empty array to clear every location. Zone 0 cannot be edited.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `zone_id` | integer | yes | Shipping zone ID. Zone 0 ("Locations not covered by your other zones") cannot be edited. |
| `locations` | array | yes | The COMPLETE intended location set. Each entry MUST be an object with a non-empty "code" and a "type" of exactly postcode, state, country or continent (lowercase — WooCommerce compares strictly). Example: \{ "code": "US:HI", "type": "state" \}. |


## `wc_system_status`

Read the WooCommerce system status report — environment, database state, active plugins, theme and template overrides, settings and page setup. The full report is very large, so pass "sections" to keep only the parts you need; omit it to get everything.

**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `sections` | array | no | Top-level sections to keep, e.g. ["environment","theme"]. Must be an array, not a bare string. Sections: environment, database, active_plugins, inactive_plugins, dropins_mu_plugins, theme, settings, security, pages, post_type_counts, logging. Omit for the whole report. The response carries a "_filter" key describing what was kept, dropped and available. |


## `wc_update_setting`

Set one WooCommerce setting. Options are addressed by group AND option id (e.g. group "general", option_id "woocommerce_currency") — read the group first with wc_get_settings_group to get the exact id and the value shape it expects. Changes take effect on the live storefront immediately.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `group` | string | yes | Settings group id, e.g. general. |
| `option_id` | string | yes | Option id within the group, e.g. woocommerce_currency. |
| `value` | any | yes | New value. Type must match what the option expects (string, boolean, or array) — check wc_get_settings_group. |


## `wc_update_shipping_method`

Update a shipping method instance on a zone. Method-specific configuration (cost, tax status, min-amount) goes inside the nested "settings" object, keyed by setting id with a PLAIN SCALAR value — e.g. &#123; "cost": "9.95" }. Note the read/write asymmetry: wc_get_shipping_zone returns each setting as an object (&#123; id, label, type, value }); send back only the value, not that object. Only the fields you pass are sent.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `woo`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `zone_id` | integer | yes | Shipping zone ID. |
| `instance_id` | integer | yes | Method instance ID on that zone (from wc_get_shipping_zone). |
| `enabled` | boolean | no | Enable or disable this method instance. |
| `order` | integer | no | Sort order within the zone. |
| `settings` | object | no | Method settings keyed by setting id, each a plain scalar value, e.g. \{ "cost": "9.95", "tax_status": "taxable" \}. |

