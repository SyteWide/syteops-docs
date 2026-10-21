---
title: Builder
sidebar_label: Builder
description: Manage API operations for the builder resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `builder`

1 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `guard`

Recompute the agent-prompt guard hash (CANON-1) for one Elementor element so a session can compare it before writing. Returns the hash and its key list only, never a setting value.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `el_id` | string | yes |  |


**Returns**

data: &#123;status, reason, guard, guard_keys[], widget_type}

**Request**

```json
{
  "resource": "builder",
  "action": "guard",
  "params": {
    "post_id": 0,
    "el_id": "string"
  }
}
```
