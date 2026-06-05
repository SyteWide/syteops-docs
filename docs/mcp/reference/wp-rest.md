---
title: WordPress REST
description: MCP tools provided by WordPress REST (provider id wp-rest).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# WordPress REST

Provider id: `wp-rest` · 2 tool(s).

## `wp_list_routes`

List the WordPress REST REST routes registered under /wp/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for wp_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `wp_request`

Call any WordPress REST REST route (scoped to /wp/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use wp_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /wp/v2, e.g. /wp/v2/contacts or /wp/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |

