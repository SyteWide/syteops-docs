---
title: Variables
sidebar_label: Variables
description: Manage API operations for the variables resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `variables`

5 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `catalog`

Discover syteops_* FlowMattic variables: free-form (writable) + registry-managed (read-only).

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data: &#123;flowmattic_available, variables[]: &#123;name, description, source, current_value, writable}}

**Request**

```json
{
  "resource": "variables",
  "action": "catalog",
  "params": {}
}
```

## `delete`

Delete a free-form variable and its FlowMattic variable.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;key, deleted: true}

**Request**

```json
{
  "resource": "variables",
  "action": "delete",
  "params": {
    "key": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `get`

Get one free-form variable by key.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | string | yes |  |


**Returns**

data: &#123;key, name, value, description}

**Request**

```json
{
  "resource": "variables",
  "action": "get",
  "params": {
    "key": "string"
  }
}
```

## `resync`

Force a full master-registry push to FlowMattic (idempotent).

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data: &#123;resynced: true}

**Request**

```json
{
  "resource": "variables",
  "action": "resync",
  "params": {}
}
```

## `set`

Upsert a free-form variable (emits syteops_api_&lt;key> to FlowMattic).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | string | yes |  |
| `value` | string | no |  |
| `description` | string | no |  |


**Returns**

data: &#123;key, name, value, description}

**Request**

```json
{
  "resource": "variables",
  "action": "set",
  "params": {
    "key": "string",
    "value": "string",
    "description": "string"
  }
}
```
