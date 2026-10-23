---
title: Squirrly
sidebar_label: Squirrly
description: Manage API operations for the squirrly resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `squirrly`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `indexnow_send`

Queue one live post for IndexNow. It is not sent inside this request: it goes out through the normal queue about a minute later, and Squirrly's 24-hour rule still applies. A missing, trashed or non-viewable post is 404 post_not_found and a signed-in caller who cannot edit it is 403 forbidden.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;queued, post_id, url, not_before, paused}

**Request**

```json
{
  "resource": "squirrly",
  "action": "indexnow_send",
  "params": {
    "post_id": 0
  }
}
```

## `indexnow_status`

Read the Squirrly IndexNow state: whether SyteOps may send, why not, the queue, the last result and, with post_id, that post's eligibility. With post_id, a missing, trashed or non-viewable post is 404 post_not_found and a signed-in caller who cannot edit it is 403 forbidden.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Record id, digits only. |


**Returns**

data: &#123;state, reason, enabled, squirrly_version, auto_indexing, post_types[], key_stored, paused, queue: &#123;count, next_run}, last: &#123;time, post_id, kind, result, http}, post?: &#123;post_id, eligible, reason, last}}

**Request**

```json
{
  "resource": "squirrly",
  "action": "indexnow_status",
  "params": {
    "post_id": 0
  }
}
```
