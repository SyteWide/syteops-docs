---
title: Leads
sidebar_label: Leads
description: Manage API operations for the leads resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `leads`

12 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `callback_action`

Mark a callback done or not a lead, or reopen a closed one, recorded against a named person (their people slug) and the time. `do` is the verb. An API-key call must name the person with exactly one of `actor` (people slug) or `as_user_id` (WordPress user id); a signed-in SyteOps Admin who names nobody acts as themselves. A slug is accepted only while it belongs to the current holder of its Users slot (422 actor_not_current). A second request on an already-handled callback, or reopen on a callback that is not closed, changes nothing and says who acted and when (changed:false, already:true). Refused 409 contact_details_not_full while contact details are not stored in Full, 409 callbacks_disabled when the RingTonic integration is off, and 409 in_flight while the same request is still being applied.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |
| `do` | string | yes | done, not_lead or reopen (reopen applies only to a done, not_lead or expired callback). |
| `actor` | string | no | People slug of the person acting; must be a current slot holder. |
| `as_user_id` | integer | no | WordPress user id of the person acting, resolved to their people slug. Use instead of actor. |


**Returns**

data: &#123;id, action, status, already, message, by, by_label? (already only), at}; changed is false when already is true

**Request**

```json
{
  "resource": "leads",
  "action": "callback_action",
  "params": {
    "id": 0,
    "do": "string",
    "actor": "string",
    "as_user_id": 0
  }
}
```

## `callbacks_get`

One callback with its recent history. Returns the full phone only while contact details are stored in Full; otherwise the masked number and an empty name (the stored row is kept, not shown).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;id, phone? (Full only), phone_masked, status, reason, display_name, carry_since, follow_up_date, follow_up_owner, closed_by, closed_at, last_lead_id, created_at, updated_at, events[]: &#123;kind, actor, at, payload&#123;source?, lead_id?, status?, action?, from?, to?, via?, api_key?}}}

**Request**

```json
{
  "resource": "leads",
  "action": "callbacks_get",
  "params": {
    "id": 0
  }
}
```

## `callbacks_list`

List callbacks (people to call back, one per phone number), oldest first. OPEN statuses only by default (open, returned, follow_up): closed rows (done, not_lead, expired) are hidden unless `status` asks for them. `status` is open (default), closed, all, one status, or a comma list; an unknown word is refused. The phone is always masked in this list; the full number is on callbacks_get. Needs the RingTonic integration on. While contact details are not stored in Full, names come back empty.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | no | Which callbacks: open (default: open, returned, follow_up), closed (done, not_lead, expired), all, one status, or a comma list of statuses. |
| `page` | integer | no | Page number, 1 to 10000 (default 1); above 10000 is 422 invalid_page. |
| `per_page` | integer | no | Rows per page, 1 to 200 (default 50). |


**Returns**

data: &#123;items[]: &#123;id, phone_masked, status, reason, display_name, carry_since, follow_up_date, follow_up_owner, closed_by, closed_at, last_lead_id, created_at, updated_at}, total, page, per_page (1-200, default 50), status}

**Request**

```json
{
  "resource": "leads",
  "action": "callbacks_list",
  "params": {
    "status": "string",
    "page": 0,
    "per_page": 0
  }
}
```

## `delete`

Permanently delete a lead and its events (best-effort moves its RingTonic contact to "lost").

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

**Access:** SyteOps Admin or API key.

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

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;id,ref,attribution,events[],chain:&#123;ok,count,broken_at,reason}}

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

**Access:** SyteOps Admin or API key.

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

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no | Page number, 1 to 10000 (default 1); above 10000 is 422 invalid_page. |
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

**Access:** SyteOps Admin or API key.

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

**Access:** SyteOps Admin or API key.

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

## `tracked_link_metrics`

Tracked-link metrics for reports: clicks, unique clicks and attributed leads per person and kind, plus company, ownerless and total rows. Dates are in the site timezone; the same answer as GET syteops/v1/leads/tracked-links/metrics. Carries no lead PII.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `from` | string | no |  |
| `to` | string | no |  |
| `group` | string | no |  |


**Returns**

data: &#123;schema, from, to, timezone, group[], generated_at, people[]: &#123;slug, name, kinds&#123;}, totals, first_touch_landings[]}, company, ownerless, totals, kinds?}

**Request**

```json
{
  "resource": "leads",
  "action": "tracked_link_metrics",
  "params": {
    "from": "string",
    "to": "string",
    "group": "string"
  }
}
```

## `verify`

Verify the tamper-evident integrity chain for a lead. chain.reason is null when ok (imported_source_key when imported events verified with the source site's key), else fork (two events saved at the same instant linked to one earlier event; each intact), mismatch (an edited event or another site's key), imported_mismatch (an imported event altered since export), imported_no_key (imported without the source key; cannot be re-verified) or no_key.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;id, chain:&#123;ok,count,broken_at,reason}}

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
