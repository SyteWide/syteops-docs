---
title: SyteOps
description: MCP tools provided by SyteOps (provider id syteops).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# SyteOps

Provider id: `syteops` · 2 tool(s).

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

