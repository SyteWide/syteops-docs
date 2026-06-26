---
title: Pipelines
sidebar_label: Pipelines
description: Manage API operations for the pipelines resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `pipelines`

8 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `create_recipe`

Create a pipeline recipe.

**Capability:** `manage_options`

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

## `delete_recipe`

Delete a pipeline recipe (the default recipe cannot be deleted).

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

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

## `get_recipe`

Get one recipe by id.

**Capability:** `manage_options`

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

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


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

**Capability:** `manage_options`

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

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |
| `post_id` | integer | no |  |
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

## `run`

Run a recipe against one post now (inline; admin-initiated). force bypasses skip-unchanged.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes |  |
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

## `update_recipe`

Update an existing pipeline recipe (merge-patch: omitted top-level keys are preserved, but a supplied trigger or policy replaces that whole sub-object — send the full sub-object to change one field).

**Capability:** `manage_options`

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
