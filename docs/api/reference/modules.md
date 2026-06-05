---
title: modules
description: Manage API operations for the modules resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `modules`

5 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `activate`

Activate a SyteOps module.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module` | string | yes |  |


**Returns**

data: &#123;module, active: true}

**Request**

```json
{
  "resource": "modules",
  "action": "activate",
  "params": {
    "module": "string"
  }
}
```

## `deactivate`

Deactivate a SyteOps module.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;module, active: false}

**Request**

```json
{
  "resource": "modules",
  "action": "deactivate",
  "params": {
    "module": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `get_config`

Get a module's stored configuration.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module` | string | yes |  |


**Returns**

data: &#123;module, config}

**Request**

```json
{
  "resource": "modules",
  "action": "get_config",
  "params": {
    "module": "string"
  }
}
```

## `list`

List known SyteOps modules and whether each is active.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data.modules[]: array of &#123;module, active}

**Request**

```json
{
  "resource": "modules",
  "action": "list",
  "params": {}
}
```

## `update_config`

Merge keys into a module's stored configuration.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module` | string | yes |  |
| `config` | object | yes |  |


**Returns**

data: &#123;module, config}

**Request**

```json
{
  "resource": "modules",
  "action": "update_config",
  "params": {
    "module": "string",
    "config": {}
  }
}
```
