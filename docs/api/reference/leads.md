---
title: leads
description: Manage API operations for the leads resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `leads`

5 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `delete`

Permanently delete a lead and its events.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;id, deleted: true}

**Request**

```json
{
  "resource": "leads",
  "action": "delete",
  "params": {
    "id": 0,
    "confirm": true
  },
  "confirm": true
}
```

## `export`

Export the lead ledger as structured rows (optionally since a datetime).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `since` | string | no |  |


**Returns**

data: &#123;rows[], count}

**Request**

```json
{
  "resource": "leads",
  "action": "export",
  "params": {
    "since": "string"
  }
}
```

## `get`

Get one lead with attribution, event timeline, and chain status.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


**Returns**

data: &#123;id,ref,attribution,events[],chain:&#123;ok,count,broken_at}}

**Request**

```json
{
  "resource": "leads",
  "action": "get",
  "params": {
    "id": 0
  }
}
```

## `list`

List captured leads (paginated; filter by source/since).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |
| `source` | string | no |  |
| `since` | string | no |  |


**Returns**

data: &#123;items[]: &#123;id,ref,source,campaign,status,event_count,first_seen}, total, page, per_page}

**Request**

```json
{
  "resource": "leads",
  "action": "list",
  "params": {
    "per_page": 0,
    "page": 0,
    "source": "string",
    "since": "string"
  }
}
```

## `verify`

Verify the tamper-evident integrity chain for a lead.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


**Returns**

data: &#123;id, chain:&#123;ok,count,broken_at}}

**Request**

```json
{
  "resource": "leads",
  "action": "verify",
  "params": {
    "id": 0
  }
}
```
