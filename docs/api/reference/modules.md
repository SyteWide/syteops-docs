---
title: Modules
sidebar_label: Modules
description: Manage API operations for the modules resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `modules`

9 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

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

## `entitlements_grant`

Entitle one domain to one private module. Idempotent.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module_id` | string | yes |  |
| `domain` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;module_id, domain, domains: [domains for THIS module only]}

**Request**

```json
{
  "resource": "modules",
  "action": "entitlements_grant",
  "params": {
    "module_id": "string",
    "domain": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `entitlements_list`

List which domains are entitled to which private modules.

**Capability:** SyteOps admin only (or an X-API-Key caller).

**Parameters**

_No parameters._


**Returns**

data: &#123;entitlements: &#123;module_id: [domains]}, source: "option"|"constant"}

**Request**

```json
{
  "resource": "modules",
  "action": "entitlements_list",
  "params": {}
}
```

## `entitlements_revoke`

Remove one domain from one private module. Stops that site receiving the module.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module_id` | string | yes |  |
| `domain` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;module_id, domain, domains: [domains for THIS module only]}

**Request**

```json
{
  "resource": "modules",
  "action": "entitlements_revoke",
  "params": {
    "module_id": "string",
    "domain": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `entitlements_set`

Replace the whole entitlement map. Any domain omitted stops receiving its module.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `entitlements` | object | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;entitlements}

**Request**

```json
{
  "resource": "modules",
  "action": "entitlements_set",
  "params": {
    "entitlements": {},
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
