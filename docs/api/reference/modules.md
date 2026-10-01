---
title: Modules
sidebar_label: Modules
description: Manage API operations for the modules resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `modules`

10 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

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

## `entitlements_auto_update`

Turn automatic module updates on or off for one client domain (default off).

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `domain` | string | yes |  |
| `enabled` | boolean | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;domain, auto_update_modules: bool}

**Request**

```json
{
  "resource": "modules",
  "action": "entitlements_auto_update",
  "params": {
    "domain": "string",
    "enabled": true,
    "confirm": true
  },
  "confirm": true
}
```

## `entitlements_grant`

Switch one module ON for one domain (private or public). Idempotent.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module_id` | string | yes |  |
| `domain` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;module_id, domain, domains: [allow-list for THIS module only], denied: [hosts switched off for THIS module only]}

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

List per-client module access: private allow-lists, public switched-off lists and auto-update clients.

**Capability:** SyteOps admin only (or an X-API-Key caller).

**Parameters**

_No parameters._


**Returns**

data: &#123;entitlements: &#123;module_id: [domains]}, denied: &#123;module_id: [hosts]}, auto_update_modules: [hosts], source: "option"|"constant"}

**Request**

```json
{
  "resource": "modules",
  "action": "entitlements_list",
  "params": {}
}
```

## `entitlements_revoke`

Switch one module OFF for one domain (private or public). Stops that site being offered or updated with it.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `module_id` | string | yes |  |
| `domain` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;module_id, domain, domains: [allow-list for THIS module only], denied: [hosts switched off for THIS module only]}

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

Replace the whole private allow-list map. Any domain omitted stops receiving its private module. Public-module switches and auto-update are kept.

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
