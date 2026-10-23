---
title: Pipelines
sidebar_label: Pipelines
description: Manage API operations for the pipelines resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `pipelines`

19 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `activity`

The Log view activity feed, newest first. per_page 1-100 (default 25), page 1-10000; out-of-range values return 422. Rows carry only id, created_at, event, status, actor, post and an allowlisted meta; never a review link or token.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |
| `event` | string | no |  |
| `post_id` | integer | no | Record id, digits only. |


**Returns**

data: &#123;items[]: &#123;id,created_at,event,status,actor_id,actor_name,post_id,post_title,meta}, total, page, per_page}

**Request**

```json
{
  "resource": "pipelines",
  "action": "activity",
  "params": {
    "per_page": 0,
    "page": 0,
    "event": "string",
    "post_id": 0
  }
}
```

## `clear_runs`

Clear ALL run history and mirrored activity (confirm:true). The lasting deletion records are kept, and a runs_cleared record with the count is written.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `confirm` | boolean | no |  |


**Returns**

data: &#123;deleted}

**Request**

```json
{
  "resource": "pipelines",
  "action": "clear_runs",
  "params": {
    "confirm": true
  },
  "confirm": true
}
```

## `create_recipe`

Create a pipeline recipe. Refuses with 409 recipe_exists when a recipe with that id (default: the slug of name) already exists; use update_recipe to change an existing one.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | no |  |
| `name` | string | yes |  |
| `priority` | integer | no |  |
| `stages` | object | no |  |
| `trigger` | object | no |  |
| `policy` | object | no |  |


**Returns**

data: recipe object

**Request**

```json
{
  "resource": "pipelines",
  "action": "create_recipe",
  "params": {
    "id": "string",
    "name": "string",
    "priority": 0,
    "stages": {},
    "trigger": {},
    "policy": {}
  }
}
```

## `dashboard_stats`

Run-history counters shown on the pipelines dashboard.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data: &#123;total, last7, changed, errors}

**Request**

```json
{
  "resource": "pipelines",
  "action": "dashboard_stats",
  "params": {}
}
```

## `delete_recipe`

Delete a pipeline recipe (the default recipe cannot be deleted).

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;id, deleted: true}

**Request**

```json
{
  "resource": "pipelines",
  "action": "delete_recipe",
  "params": {
    "id": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `delete_run`

Delete ONE run-history row (confirm:true). Leaves a lasting run_deleted record. 404 not_found when the row is gone; 409 deletion_record_protected for a deletion-record row, which is never removed.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `run_id` | integer | yes | Record id, digits only. |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;run_id, deleted: true}

**Request**

```json
{
  "resource": "pipelines",
  "action": "delete_run",
  "params": {
    "run_id": 0,
    "confirm": true
  },
  "confirm": true
}
```

## `engine_get`

Read the stored engine choice for each capability (or one), the engine that is running for it, and the engines that can fill it. An unknown capability is 422.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `capability` | string | no |  |


**Returns**

data.capabilities[]: &#123;capability, label, choice, effective, engines[]: &#123;id, label, priority}}

**Request**

```json
{
  "resource": "pipelines",
  "action": "engine_get",
  "params": {
    "capability": "string"
  }
}
```

## `engine_set`

Choose the engine for a capability; an empty engine clears the choice. An unknown capability is 422 unknown_capability; an engine that does not fill it is 422 invalid_engine; seo and geo follow their integration toggles and are 409 engine_follows_integration (set or clear).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `capability` | string | yes |  |
| `engine` | string | yes | An engine id from stages_list, or an empty string to clear. |


**Returns**

data: &#123;capability, engine, previous}

**Request**

```json
{
  "resource": "pipelines",
  "action": "engine_set",
  "params": {
    "capability": "string",
    "engine": "string"
  }
}
```

## `geo_toggle`

Turn GEO generation on or off, the same switch as the provider card. Turning it off while LLMS Amplifier is the GEO engine is 409 amplifier_owns_geo.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `enabled` | boolean | yes |  |


**Returns**

data: &#123;enabled}

**Request**

```json
{
  "resource": "pipelines",
  "action": "geo_toggle",
  "params": {
    "enabled": true
  }
}
```

## `get_recipe`

Get one recipe by id.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |


**Returns**

data: recipe object

**Request**

```json
{
  "resource": "pipelines",
  "action": "get_recipe",
  "params": {
    "id": "string"
  }
}
```

## `get_run`

Get one run-history row by id (includes decoded per-stage results).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;id,source,post_id,recipe_id,status,...,stages}

**Request**

```json
{
  "resource": "pipelines",
  "action": "get_run",
  "params": {
    "id": 0
  }
}
```

## `list_recipes`

List all configured pipeline recipes.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data.recipes[]: array of recipe objects

**Request**

```json
{
  "resource": "pipelines",
  "action": "list_recipes",
  "params": {}
}
```

## `list_runs`

List pipeline run-history ledger rows (paginated; filter by post/recipe/status).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |
| `post_id` | integer | no | Record id, digits only. |
| `recipe_id` | string | no |  |
| `status` | string | no |  |


**Returns**

data: &#123;items[]: &#123;id,source,post_id,recipe_id,status,trigger_kind,is_dry_run,changed,duration_ms,content_hash,message,created_at}, total, page, per_page}

**Request**

```json
{
  "resource": "pipelines",
  "action": "list_runs",
  "params": {
    "per_page": 0,
    "page": 0,
    "post_id": 0,
    "recipe_id": "string",
    "status": "string"
  }
}
```

## `llms_amplifier_set`

Turn LLMS Amplifier on or off as the GEO engine. Enabling returns 409 plugin_not_installed when the Amplifier plugin is absent.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `enabled` | boolean | yes |  |


**Returns**

data: &#123;enabled, engine}

**Request**

```json
{
  "resource": "pipelines",
  "action": "llms_amplifier_set",
  "params": {
    "enabled": true
  }
}
```

## `mode_get`

Read the Content Pipelines operating mode: setup (nothing goes live or is sent) or production.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data: &#123;mode: "setup"|"production"}

**Request**

```json
{
  "resource": "pipelines",
  "action": "mode_get",
  "params": {}
}
```

## `mode_set`

Switch the Content Pipelines mode. Production starts live publishing and sends; setup halts them. Needs confirm:true. Any other mode value is 422 invalid_mode.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `mode` | string | yes | setup or production. |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;mode, previous, pinned?: true when a site filter keeps a different mode running}

**Request**

```json
{
  "resource": "pipelines",
  "action": "mode_set",
  "params": {
    "mode": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `run`

Run a recipe against one post now (inline; admin-initiated). force bypasses skip-unchanged. Returns 404 post_not_found for a missing, trashed or non-viewable post (and post_id 0), and 403 forbidden for a signed-in caller without edit_post on it; an API key skips only the edit_post check.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `recipe_id` | string | no |  |
| `dry_run` | boolean | no |  |
| `force` | boolean | no |  |


**Returns**

data: &#123;status,post_id,recipe,stages,run_id,changed}

**Request**

```json
{
  "resource": "pipelines",
  "action": "run",
  "params": {
    "post_id": 0,
    "recipe_id": "string",
    "dry_run": true,
    "force": true
  }
}
```

## `stages_list`

List the registered stage engines with the capability each fills, its priority and whether it is available now.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data.stages[]: &#123;id, label, capability, priority, available}

**Request**

```json
{
  "resource": "pipelines",
  "action": "stages_list",
  "params": {}
}
```

## `update_recipe`

Update an existing pipeline recipe (merge-patch: omitted top-level keys are preserved, but a supplied trigger or policy replaces that whole sub-object — send the full sub-object to change one field).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |
| `name` | string | no |  |
| `priority` | integer | no |  |
| `stages` | object | no |  |
| `trigger` | object | no |  |
| `policy` | object | no |  |


**Returns**

data: recipe object

**Request**

```json
{
  "resource": "pipelines",
  "action": "update_recipe",
  "params": {
    "id": "string",
    "name": "string",
    "priority": 0,
    "stages": {},
    "trigger": {},
    "policy": {}
  }
}
```
