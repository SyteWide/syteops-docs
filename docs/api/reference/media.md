---
title: Media
sidebar_label: Media
description: Manage API operations for the media resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `media`

1 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `mark_replaced`

Mark picture attachments whose file was replaced in place (same attachment id, same file name). Their front-end image URLs then carry a version token (ver) that changes with the replacement, so a browser that holds the old picture for the CDN's one year lifetime fetches the new one, and every other picture keeps its URL and its cached copy. Use it for a replacement SyteOps could not see: a file overwritten with no metadata update, for example by FTP or a shell copy (a replace made through the media library, Enable Media Replace or a metadata regeneration after the overwrite is marked on its own). It stores the token, then purges the pages that show the picture (posts and Elementor layouts that name it, posts that use it as the featured image, the attachment page) and the picture's own address from the page caches present; the body and layout scans are capped, so a page that holds the picture and was missed shows the new address when its own cache expires. Easy IO has no purge call; the changed address is what makes it fetch the new file. A picture already marked with the same token is unchanged and is purged again only when repurge is true. A picture that is not an image attachment or whose file is missing is skipped. At most 50 ids per call (422 above that). Off switch: the constant SYTEOPS_MEDIA_REPLACED_OFF or the filter syteops/media_replaced/enabled answers 409 media_replaced_off.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ids` | array | yes | A JSON list of 1 to 50 picture (attachment) ids, each a positive whole number. A list that is empty, is longer than 50 or holds anything else is 422. |
| `repurge` | boolean | no | JSON true to purge the pages of a picture that is already marked with the current token (default false). A real boolean only; "true" or 1 is 422. |


**Returns**

data: &#123;marked, purge: &#123;calls, errors}, bounded, items[]}. An item is &#123;id, status: marked|unchanged|repurged|skipped|failed, token?, pages?, reason?}: token is the version added to the picture's URLs, pages how many pages were purged for it, reason one of not_a_markable_image, over_limit, storage_busy. bounded is true when a page scan reached its cap. errors counts purge calls that reported an error, never a failed mark.

**Request**

```json
{
  "resource": "media",
  "action": "mark_replaced",
  "params": {
    "ids": [
      123,
      124
    ]
  }
}
```
