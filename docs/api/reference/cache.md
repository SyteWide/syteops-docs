---
title: Cache
sidebar_label: Cache
description: Manage API operations for the cache resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `cache`

1 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `purge`

Purge one post's page (post_id), or up to 30 URLs on this site's own host (urls), from LiteSpeed and Cloudflare when present. With post_id it also asks Elementor to rebuild its generated CSS when that post is built with Elementor. Send post_id or urls, not both; a URL on any other host refuses the whole call.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | no | Record id, digits only. |
| `urls` | object | no | List of absolute http(s) URLs on this site's host, at most 30. |


**Returns**

data: &#123;urls[], purged[], attempted[], skipped[], errors[], elementor_css: cleared|unavailable|not_elementor|null}

**Request**

```json
{
  "resource": "cache",
  "action": "purge",
  "params": {
    "post_id": 0,
    "urls": {}
  }
}
```
