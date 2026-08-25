---
title: Leads
sidebar_label: Leads
description: Manage API operations for the leads resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `leads`

7 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `delete`

Permanently delete a lead and its events (best-effort moves its RingTonic contact to "lost").

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

## `link_rt_contact`

Store the RingTonic contact id on a lead (the reconcile calls this after matching by phone/email).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `rt_contact_id` | string | yes |  |


**Returns**

data: &#123;id, rt_contact_id}

**Request**

```json
{
  "resource": "leads",
  "action": "link_rt_contact",
  "params": {
    "id": 0,
    "rt_contact_id": "string"
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

## `set_status`

Set a lead's pipeline status (New/Contacted/Qualified/Unqualified/Customer). Used by the RingTonic inbound reconcile; recorded as inbound so it does not echo back to RingTonic.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `status` | string | yes |  |


**Returns**

data: &#123;id, status, label}

**Request**

```json
{
  "resource": "leads",
  "action": "set_status",
  "params": {
    "id": 0,
    "status": "string"
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
