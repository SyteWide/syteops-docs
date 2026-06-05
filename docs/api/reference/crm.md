---
title: crm
description: Manage API operations for the crm resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `crm`

6 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `create`

Create a CRM record in the next free slot (up to SYTEOPS_MAX_CRM_SYSTEMS).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes |  |
| `url` | url | no |  |
| `link_admin_only` | boolean | no |  |


**Returns**

data: &#123;crm_num, name, code, url, link_admin_only}

**Request**

```json
{
  "resource": "crm",
  "action": "create",
  "params": {
    "name": "string",
    "url": "https://example.com",
    "link_admin_only": true
  }
}
```

## `delete`

Delete a CRM slot: clears fields and secret; crm_count stays as high-water mark.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `crm_num` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;crm_num, deleted: true}

**Request**

```json
{
  "resource": "crm",
  "action": "delete",
  "params": {
    "crm_num": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `get`

Get a single CRM slot by crm_num (e.g. "003").

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `crm_num` | string | yes |  |


**Returns**

data: &#123;crm_num, name, code, url, link_admin_only}

**Request**

```json
{
  "resource": "crm",
  "action": "get",
  "params": {
    "crm_num": "string"
  }
}
```

## `list`

List all non-empty CRM system slots (gap-aware; never includes api_key).

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data.crms[]: array of &#123;crm_num, name, code, url, link_admin_only}

**Request**

```json
{
  "resource": "crm",
  "action": "list",
  "params": {}
}
```

## `set_secret`

Store (encrypted) the API key for a CRM slot. Key is never returned.

**Capability:** `manage_options`  
**Redacted fields:** `api_key`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `crm_num` | string | yes |  |
| `api_key` | string | yes |  |


**Returns**

data: &#123;crm_num, key_set}

**Request**

```json
{
  "resource": "crm",
  "action": "set_secret",
  "params": {
    "crm_num": "string",
    "api_key": "string"
  }
}
```

## `update`

Update editable fields on an existing CRM slot.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `crm_num` | string | yes |  |
| `name` | string | no |  |
| `url` | url | no |  |
| `link_admin_only` | boolean | no |  |


**Returns**

data: &#123;crm_num, name, code, url, link_admin_only}

**Request**

```json
{
  "resource": "crm",
  "action": "update",
  "params": {
    "crm_num": "string",
    "name": "string",
    "url": "https://example.com",
    "link_admin_only": true
  }
}
```
