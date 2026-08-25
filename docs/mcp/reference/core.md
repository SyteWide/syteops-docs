---
title: Core / Diagnostics
description: MCP tools provided by Core / Diagnostics (provider id core).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# Core / Diagnostics

Provider id: `core` · 3 tool(s).

## `sytewide_bulk`

Run one tool repeatedly over a list of argument sets and return the per-call results. Capped at 50 calls per request. For destructive target tools, include "dry_run": true in each call to preview.

**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `tool` | string | yes | Name of the tool to invoke for each item. |
| `calls` | array | yes | Array of argument objects, one per invocation (max 50). |


## `sytewide_get_status`

Report SyteWide MCP server status: version, current WordPress user, active tool providers, and total registered tool count.

**Profiles:** all profiles

**Parameters**

_No parameters._


## `sytewide_ping`

Health check. Returns "pong" and the server time to confirm the SyteWide MCP connection is live.

**Profiles:** all profiles

**Parameters**

_No parameters._

