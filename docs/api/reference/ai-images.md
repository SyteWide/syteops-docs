---
title: AI Images
sidebar_label: AI Images
description: Manage API operations for the ai_images resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `ai_images`

3 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `cleanup`

Remove unused AI pictures. Destructive: send confirm:true on every call (preview first with cleanup_preview). Only a picture that is removable at the moment of removal goes; everything else is skipped with its reason, and the check is never bypassed. Pictures go to the recoverable Removed pictures list for the holding period (or are deleted at once when it is 0), and with backup (default true) their originals are zipped first: the answer names the zip by file name only and the API never serves it. Without ids it covers one page of up to 25 AI pictures; repeat with next_offset while more is true. With ids, at most 25 per call (422 above that); the preview takes up to 200. Writes one activity row and one run-log row when something was removed, none otherwise. 409 module_unavailable when Content Pipelines is off.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ids` | array | no | A JSON list of picture (attachment) ids, each a positive whole number: at most 25 for cleanup and at most 200 for cleanup_preview. Omit it to cover the next page of up to 25 AI pictures. A list that is empty, is longer than the limit or holds anything else is 422. |
| `offset` | integer | no | Without ids: how many AI pictures to step over before the page (default 0); use next_offset from the previous answer. Refused with ids. |
| `backup` | boolean | no | JSON true (default) or false: put the originals in a zip first. A real boolean only; "false" or 0 is 422, never read as off. The preview accepts and ignores it so the same parameters serve both calls. |
| `confirm` | boolean | no | Must be true. |


**Returns**

data: &#123;dry_run, removed[], would_remove[], skipped&#123;id: reason}, failed&#123;id: reason}, backup: &#123;file, bytes, count, trim_failed}|null, held, more, next_offset}. skipped reasons are the scan bucket (in_use, possibly, live_source, kept) or not_a_candidate, already_held (another run took it first), time_limit (the run stopped before reaching it: without ids more is then true and next_offset starts the next page at the first picture it did not reach; with ids send those ids again), over_limit, backup_failed; failed reasons are remove_failed or not_removed. trim_failed is true when the zip could not be cut down to the removed pictures: it is kept and named anyway (it also holds the originals of pictures that stayed, and with a holding period of 0 it is the only copy of the removed ones). held is true when removed pictures go to the recoverable Removed pictures list. more and next_offset say whether more AI pictures follow this page (never with ids)

**Request**

```json
{
  "resource": "ai_images",
  "action": "cleanup",
  "params": {
    "ids": [
      123,
      124
    ],
    "backup": true
  },
  "confirm": true
}
```

## `cleanup_preview`

The dry run of cleanup: judge the pictures fresh, write no post data, no zip and no record (it may refresh the in-use check's own caches), and say what cleanup would do. The pictures are would_remove, the rest are skipped with the reason; removed and failed are always empty and backup is null. Read-only, so it needs no confirm. Run it first and compare with the cleanup answer, which judges again when it writes.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ids` | array | no | A JSON list of picture (attachment) ids, each a positive whole number: at most 25 for cleanup and at most 200 for cleanup_preview. Omit it to cover the next page of up to 25 AI pictures. A list that is empty, is longer than the limit or holds anything else is 422. |
| `offset` | integer | no | Without ids: how many AI pictures to step over before the page (default 0); use next_offset from the previous answer. Refused with ids. |
| `backup` | boolean | no | JSON true (default) or false: put the originals in a zip first. A real boolean only; "false" or 0 is 422, never read as off. The preview accepts and ignores it so the same parameters serve both calls. |


**Returns**

data: &#123;dry_run, removed[], would_remove[], skipped&#123;id: reason}, failed&#123;id: reason}, backup: &#123;file, bytes, count, trim_failed}|null, held, more, next_offset}. skipped reasons are the scan bucket (in_use, possibly, live_source, kept) or not_a_candidate, already_held (another run took it first), time_limit (the run stopped before reaching it: without ids more is then true and next_offset starts the next page at the first picture it did not reach; with ids send those ids again), over_limit, backup_failed; failed reasons are remove_failed or not_removed. trim_failed is true when the zip could not be cut down to the removed pictures: it is kept and named anyway (it also holds the originals of pictures that stayed, and with a holding period of 0 it is the only copy of the removed ones). held is true when removed pictures go to the recoverable Removed pictures list. more and next_offset say whether more AI pictures follow this page (never with ids)

**Request**

```json
{
  "resource": "ai_images",
  "action": "cleanup_preview",
  "params": {
    "ids": [
      123,
      124
    ],
    "backup": true
  }
}
```

## `scan`

List the AI-generated and AI-remixed pictures with a verdict each. It writes no post data and no records (it may refresh the in-use check's own caches). bucket is removable (nothing uses it), possibly (it might be in use), in_use, live_source (the source of a picture in use) or kept (a manual keep, a file another row shares, a hidden or pipeline file, the source of a picture that might be in use, or a check that could not finish). reasons are sentences and codes are the same reasons as machine values (unused, in_use, live_source, possibly, manual_keep, shared_file, hidden_file, pipeline_image, source_of_possibly, could_not_check); only could_not_check is worth a rescan. file is the uploads-relative name and url the plain media URL. limit is 1 to 200 (default 50) and offset is 0 or more, else 422; next_offset is null on the last page. 409 module_unavailable when Content Pipelines is off.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | Pictures per page, 1 to 200 (default 50). |
| `offset` | integer | no | Pictures to step over (default 0). |


**Returns**

data: &#123;items[], total, counts&#123;removable, possibly, in_use, live_source, kept}, next_offset}; an item is &#123;id, bucket, reasons[], codes[], file, url, date, source_id, bytes}

**Request**

```json
{
  "resource": "ai_images",
  "action": "scan",
  "params": {
    "limit": 50,
    "offset": 0
  }
}
```
