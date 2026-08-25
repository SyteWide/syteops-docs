---
title: Integrations
sidebar_label: Integrations
description: Manage API operations for the integrations resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `integrations`

3 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `disable`

Disable an integration.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;slug, enabled: false}

**Request**

```json
{
  "resource": "integrations",
  "action": "disable",
  "params": {
    "slug": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `enable`

Enable an integration (refused if its required plugin is not installed).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |


**Returns**

data: &#123;slug, enabled: true}

**Request**

```json
{
  "resource": "integrations",
  "action": "enable",
  "params": {
    "slug": "string"
  }
}
```

## `list`

List integration toggles with enabled + plugin-installed state.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data.integrations[]: array of &#123;slug, enabled, plugin_installed}

**Request**

```json
{
  "resource": "integrations",
  "action": "list",
  "params": {}
}
```
