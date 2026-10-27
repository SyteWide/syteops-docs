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

**Access:** SyteOps Admin or API key.

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

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

**Access:** SyteOps Admin or API key.

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

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

Get a module's configuration: allowlisted buckets and keys only (today syteops_banners: banner_text, default_html, schedule_activation, schedule_deactivation, show_defaults_outside_times, clear_litespeed_cache). Any other module is 403 config_not_exposed; syteops_leads is 422 use_leads_settings_get (leads.settings_get returns its settings with the webhook addresses masked).

**Access:** SyteOps Admin or API key.

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

**Access:** SyteOps Admin or API key.

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

Merge keys into a module's configuration: allowlisted buckets and keys only, the same list as get_config, each stored as its settings screen stores it (HTML filtered, text sanitized, flags as true/false). All or nothing: a key outside the list is 422 unknown_config_key, a value of the wrong type 422 invalid_config_value. Any other module is 403 config_not_exposed; syteops_leads is 422 use_leads_settings_set.

**Access:** SyteOps Admin or API key.

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
