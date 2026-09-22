---
title: Leads
sidebar_label: Leads
description: Manage API operations for the leads resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `leads`

8 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `delete`

Permanently delete a lead and its events (best-effort moves its RingTonic contact to "lost").

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |
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
| `id` | integer | yes | Record id, digits only. |


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
| `id` | integer | yes | Record id, digits only. |
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

## `ringtonic_status`

Report the RingTonic receiver's health: module/integration state, whether it is ready to receive deliveries, observe mode, delivery counters, and stored-secret fingerprints. Never returns a secret value.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data: &#123;leads_module_active, integration_enabled, receiver_ready, observe_mode, stats:&#123;counts,last_received_at,last_event,last_status,key_form}, api_key_present, api_key_fingerprint, webhook_secret_present, webhook_secret_fingerprint, plugin_version, leads_module_version}

**Request**

```json
{
  "resource": "leads",
  "action": "ringtonic_status",
  "params": {}
}
```

## `set_status`

Set a lead's pipeline status (New/Contacted/Qualified/Unqualified/Customer). Used by the RingTonic inbound reconcile; recorded as inbound so it does not echo back to RingTonic. Optionally also sets the lead's deal value (value_cents, in the smallest currency unit, plus an optional ISO 4217 currency — defaults to the site's configured deal currency).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |
| `status` | string | yes |  |
| `value_cents` | integer | no | Amount in the smallest currency unit (cents), a whole number. |
| `currency` | string | no |  |


**Returns**

data: &#123;id, status, label, deal_value_cents?, deal_currency?}

**Request**

```json
{
  "resource": "leads",
  "action": "set_status",
  "params": {
    "id": 0,
    "status": "string",
    "value_cents": 0,
    "currency": "string"
  }
}
```

## `verify`

Verify the tamper-evident integrity chain for a lead.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |


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
