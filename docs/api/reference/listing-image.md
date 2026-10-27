---
title: Listing Image
sidebar_label: Listing Image
description: Manage API operations for the listing_image resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `listing_image`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `reprocess`

Rebuild the listing-card image for each image the article owns, from scratch, even when one looks current: the failure memo is cleared and the repair is re-queued (paid). The live crop stays until the new one replaces it, so this is not destructive. At most 25 images per call; same refusals, 10-minute per-article cooldown and site-wide daily image allowance as run.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, processed, queued, failed, skipped, items[] is &#123;attachment_id, built, queued, error?, repaired?, reason?, retrying?}}

**Request**

```json
{
  "resource": "listing_image",
  "action": "reprocess",
  "params": {
    "post_id": 0
  }
}
```

## `run`

Build the listing-card image for each image the article owns that lacks a current one (the same unforced path a page render takes; images already current are left alone). With the repair on this queues paid jobs. At most 25 images per call. 409 listing_image_disabled when the feature is off; 429 cooldown (10 minutes per article, shared with reprocess, released when nothing was built or queued); 429 daily_limit when the site-wide daily allowance of images (100 by default, counted per image across run and reprocess, refunded when nothing was built or queued) is used up; processed and queued count only images built or newly queued, and changed is true only then; 404 post_not_found for a missing, trashed or non-viewable post.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, processed, queued, failed, skipped, items[] is &#123;attachment_id, built, queued, error?, repaired?, reason?, retrying?}}

**Request**

```json
{
  "resource": "listing_image",
  "action": "run",
  "params": {
    "post_id": 0
  }
}
```
