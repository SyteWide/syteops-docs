---
title: Site
sidebar_label: Site
description: Manage API operations for the site resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `site`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `timezone_get`

Read the site time zone (WordPress Settings, General). It decides when a callback follow-up is due today and the times the portal shows. city is true for a region zone such as America/Detroit; note recommends one otherwise.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data: &#123;timezone_string, timezone, gmt_offset, city, note}

**Request**

```json
{
  "resource": "site",
  "action": "timezone_get",
  "params": {}
}
```

## `timezone_set`

Set the site time zone the way the General settings screen stores a city zone (timezone_string set, gmt_offset emptied). One identifier from PHP's timezone_identifiers_list(): a city zone such as America/Detroit is recommended (daylight saving follows it); UTC is accepted; a raw offset (UTC+5), a backward-compatible alias (US/Eastern) or anything else is 422 invalid_timezone and nothing changes. The offset is emptied only after the zone is read back (a save that did not stick is 500 write_failed and leaves both as they were). A changed zone re-arms the events pinned to a site-time hour (the 02:00 FlowMattic orphan sweep).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `timezone_string` | string | yes | A time zone identifier, for example America/Detroit. |


**Returns**

data: &#123;timezone_string, timezone, gmt_offset, city, note}

**Request**

```json
{
  "resource": "site",
  "action": "timezone_set",
  "params": {
    "timezone_string": "string"
  }
}
```
