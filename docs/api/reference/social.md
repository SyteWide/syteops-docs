---
title: Social
sidebar_label: Social
description: Manage API operations for the social resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `social`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `cancel`

Cancel one scheduled social send on an article, by the job_id social.schedule returned. Works while Social Publishing is off, so a pending send can always be stopped. 404 post_not_found for a missing, trashed or non-viewable post (trashing a post already drops its scheduled sends); 404 job_not_found when no such job is pending.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `job_id` | string | yes | The job_id returned by social.schedule. |


**Returns**

data: &#123;post_id, job_id, cancelled}

**Request**

```json
{
  "resource": "social",
  "action": "cancel",
  "params": {
    "post_id": 0,
    "job_id": "string"
  }
}
```

## `schedule`

Queue one social send for one article to a configured destination. when is time (default; send at fire_at, a Unix time in seconds between one minute and five years ahead) or on_publish (send when the article first goes live; fire_at not allowed). text is the final post text, up to 3000 characters (counted as characters, not bytes). A signed-in caller also needs publish capability for the post type (403 forbidden), as in the screen; a key skips that check. Refuses 409 social_disabled while Social Publishing is off, 422 bad_destination for an unknown destination_id, and 404 post_not_found for a missing, trashed or non-viewable post.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `destination_id` | string | yes | A configured social destination id. |
| `text` | string | yes | The final post text, up to 3000 characters. |
| `when` | string | no | time (default) or on_publish. |
| `fire_at` | integer | no | Unix time in seconds; required when when is time. |


**Returns**

data: &#123;post_id, job_id, when, fire_at, destination: &#123;id, name}}

**Request**

```json
{
  "resource": "social",
  "action": "schedule",
  "params": {
    "post_id": 0,
    "destination_id": "string",
    "text": "string",
    "when": "string",
    "fire_at": 0
  }
}
```
