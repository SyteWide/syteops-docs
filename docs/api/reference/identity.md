---
title: Identity
sidebar_label: Identity
description: Manage API operations for the identity resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `identity`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `get`

Get the per-site business identity (company facts) map.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data: &#123;fields: &#123;company_name, ..., syteops_system_company_hours}}

**Request**

```json
{
  "resource": "identity",
  "action": "get",
  "params": {}
}
```

## `set`

Update business identity fields (partial map; unknown keys rejected).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `fields` | object | yes |  |


**Returns**

data: &#123;fields: &#123;...updated map...}}

**Request**

```json
{
  "resource": "identity",
  "action": "set",
  "params": {
    "fields": {}
  }
}
```
