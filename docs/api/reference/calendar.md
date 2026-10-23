---
title: Calendar
sidebar_label: Calendar
description: Manage API operations for the calendar resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `calendar`

7 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `cadence_check`

Would scheduling this post at this moment break the site's publishing rhythm, and where would it fit instead? Advisory: nothing is written or refused. scope is all (default) or pipeline.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `date` | string | yes | ISO 8601 date-time, e.g. 2026-11-03T09:00:00 (site timezone) or 2026-11-03T09:00:00Z / +02:00 (that instant). |
| `scope` | string | no | pipeline or all. |


**Returns**

data: &#123;post_id, date_gmt, enabled, collides, reasons[], conflicts[], suggestion_label, suggestion_local, truncated}

**Request**

```json
{
  "resource": "calendar",
  "action": "cadence_check",
  "params": {
    "post_id": 0,
    "date": "string",
    "scope": "string"
  }
}
```

## `cadence_next_slot`

The next free publishing moment on the site's cadence after a time (default now). enabled is false and the slot empty when cadence is off; truncated means the walk could not read the calendar completely. exclude_post_id keeps that post out of its own conflicts. scope is all (default) or pipeline.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `after` | string | no | ISO 8601 date-time to search after (default now). |
| `exclude_post_id` | integer | no | Record id, digits only. |
| `scope` | string | no | pipeline or all. |


**Returns**

data: &#123;enabled, truncated, slot_gmt, slot_site}; the slot strings are empty when none

**Request**

```json
{
  "resource": "calendar",
  "action": "cadence_next_slot",
  "params": {
    "after": "string",
    "exclude_post_id": 0,
    "scope": "string"
  }
}
```

## `query`

The publishing calendar for a window: scheduled and published posts in it (grid_events) plus the undated draft and pending rail. from and to are ISO 8601 dates (YYYY-MM-DD: whole days) or date-times, in the site timezone unless they carry Z or an offset, and the window may span at most 92 days (422 range_too_large). scope is pipeline (default, posts the content pipeline produced) or all. post_types, when sent, must be a list of calendar post types. grid_truncated is true when the window held more posts than the grid returns (500): narrow the window. The rail is not date-bounded: page it with rail_cursor and rail_per (5, 10, 25 or 100). A site-local time that the clocks skip is 422 date_in_dst_gap.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `from` | string | yes | Window start: YYYY-MM-DD (start of that day) or an ISO 8601 date-time. |
| `to` | string | yes | Window end: YYYY-MM-DD (end of that day) or an ISO 8601 date-time. At most 92 days after from. |
| `scope` | string | no | pipeline or all. |
| `post_types` | array | no | A JSON list of calendar post type names, e.g. ["post", "page"]; a keyed object is refused. |
| `rail_per` | integer | no | Draft rail page size: 5, 10, 25 or 100. |
| `rail_cursor` | string | no | rail_next_cursor from the previous page, unchanged; anything else is 422 invalid_cursor. |


**Returns**

data: &#123;from_gmt, to_gmt, scope, grid_events[], grid_truncated, rail_drafts[], rail_has_more, rail_next_cursor, rail_truncated}; an event is &#123;id, title, type, type_label, status, date_gmt, date_site, reserved, pipeline_origin}

**Request**

```json
{
  "resource": "calendar",
  "action": "query",
  "params": {
    "from": "string",
    "to": "string",
    "scope": "string",
    "post_types": [],
    "rail_per": 0,
    "rail_cursor": "string"
  }
}
```

## `reschedule`

Move a post's publication to a future moment, exactly as dragging it on the calendar does: a draft or pending post becomes scheduled, a scheduled post moves, and the schedule notice goes to the people the portal tells. date must be at least five minutes ahead (422 date_not_future), and the post is never published instead; a live post cannot be given a later date (409 published_immutable). A bad date is 422 invalid_date.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `date` | string | yes | ISO 8601 date-time, e.g. 2026-11-03T09:00:00 (site timezone) or 2026-11-03T09:00:00Z / +02:00 (that instant). |


**Returns**

data: &#123;post_id, status, scheduled, intent, date_gmt, date_site, notify}; notify is the schedule notice outcome

**Request**

```json
{
  "resource": "calendar",
  "action": "reschedule",
  "params": {
    "post_id": 0,
    "date": "string"
  }
}
```

## `slot_reserve`

Hold the next free cadence moment on a draft or pending post, as an arriving article gets one (a post already holding one is moved). Only a draft or pending post can hold a slot (409 not_holdable), and only a post type the calendar handles (422 unsupported_type). Not reserving is an answer: reserved is false with a reason of slots_disabled, cadence_opt_out or not_reserved.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, reserved, reason, slot_gmt, slot_site}

**Request**

```json
{
  "resource": "calendar",
  "action": "slot_reserve",
  "params": {
    "post_id": 0
  }
}
```

## `unpublish`

Take a LIVE post down and return it to a draft (409 not_published when it is not live). The site's static front page and posts page are refused (409 protected_page). The publication date is kept; pending post-publish recipe runs and social sends are stood down. Destructive: send confirm:true.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `confirm` | boolean | no | Must be true. |


**Returns**

data: &#123;post_id, status, previous_status}

**Request**

```json
{
  "resource": "calendar",
  "action": "unpublish",
  "params": {
    "post_id": 0,
    "confirm": true
  },
  "confirm": true
}
```

## `unschedule`

Cancel a scheduled post's publication and return it to a draft (409 not_scheduled when it is not scheduled). Reversible: the cancelled moment is returned as previous_gmt and reschedule puts it back.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, status, previous_gmt, notify}

**Request**

```json
{
  "resource": "calendar",
  "action": "unschedule",
  "params": {
    "post_id": 0
  }
}
```
