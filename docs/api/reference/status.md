---
title: Status
sidebar_label: Status
description: Manage API operations for the status resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `status`

1 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `get`

Read-only summary: plugin version, active modules, integration toggle counts.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data: &#123;version, active_modules[], integrations_enabled_count}

**Request**

```json
{
  "resource": "status",
  "action": "get",
  "params": {}
}
```
