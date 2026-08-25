---
title: AI
sidebar_label: AI
description: Manage API operations for the ai resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `ai`

4 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `get_area`

Get the AI provider/model/max_tokens for an AI-consuming area.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `area` | string | yes |  |


**Returns**

data: &#123;area, provider, model, max_tokens}

**Request**

```json
{
  "resource": "ai",
  "action": "get_area",
  "params": {
    "area": "string"
  }
}
```

## `get_providers`

List available AI provider slugs and the default.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data: &#123;providers[], default}

**Request**

```json
{
  "resource": "ai",
  "action": "get_providers",
  "params": {}
}
```

## `set_area`

Set provider/model/max_tokens for an AI-consuming area.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `area` | string | yes |  |
| `provider` | string | no |  |
| `model` | string | no |  |
| `max_tokens` | integer | no |  |


**Returns**

data: &#123;area, provider, model, max_tokens}

**Request**

```json
{
  "resource": "ai",
  "action": "set_area",
  "params": {
    "area": "string",
    "provider": "string",
    "model": "string",
    "max_tokens": 0
  }
}
```

## `set_key`

Store (encrypted) the API key for an AI provider.

**Capability:** `manage_options`  
**Redacted fields:** `api_key`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `provider` | string | yes |  |
| `api_key` | string | yes |  |


**Returns**

data: &#123;provider, key_set}

**Request**

```json
{
  "resource": "ai",
  "action": "set_key",
  "params": {
    "provider": "string",
    "api_key": "string"
  }
}
```
