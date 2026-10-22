---
title: Review
sidebar_label: Review
description: Manage API operations for the review resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `review`

4 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `comments_list`

One post's review notes and replies, oldest first, as the portal shows them. per_page is 1 to 100 (default 25).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `per_page` | integer | no | Notes per page, 1 to 100 (default 25). |
| `page` | integer | no | Page number from 1 (default 1). |


**Returns**

data: &#123;post_id, total, page, per_page, has_more, comments[]}; a comment is &#123;id, parent, user_id, user_name, note, created_at, kind, target_kind, att_id, resolved}

**Request**

```json
{
  "resource": "review",
  "action": "comments_list",
  "params": {
    "post_id": 0,
    "per_page": 0,
    "page": 0
  }
}
```

## `get`

One post's review status: post status, whether changes are requested, open and total note counts, the reviewers and watchers, and the latest recorded activity. A missing, trashed or non-viewable post is 404 post_not_found.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, title, post_status, changes_requested, open_notes, total_notes, reviewers[], watchers[], last_activity: &#123;event, at}|null}; a person is &#123;user_id, display_name, roles[]}

**Request**

```json
{
  "resource": "review",
  "action": "get",
  "params": {
    "post_id": 0
  }
}
```

## `queue_list`

One page of a person's Review Portal queue, as that person sees it. list is pending (default), watching, live, live_posts, live_pages, coming_up or notes. An API-key call must send as_user_id (the person whose queue to read; 422 as_user_id_required otherwise, 404 user_not_found when no such user); a signed-in SyteOps Admin defaults to themselves. per_page is 5, 10, 25 or 100. Page with the returned next_cursor. No review links are returned.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `as_user_id` | integer | no | Record id, digits only. |
| `list` | string | no | pending (default), watching, live, live_posts, live_pages, coming_up or notes. |
| `per_page` | integer | no | Page size: 5, 10, 25 or 100. |
| `cursor` | string | no | next_cursor from the previous page. |


**Returns**

data: &#123;as_user_id, list, rows[], has_more, next_cursor, truncated, page_count}; a post row is &#123;post_id, title, source, received, scheduled_ts, modified_ts, feedback_count, changes_requested, qa}, a notes row is &#123;post_id, title, author, excerpt, created, note_id}

**Request**

```json
{
  "resource": "review",
  "action": "queue_list",
  "params": {
    "as_user_id": 0,
    "list": "string",
    "per_page": 0,
    "cursor": "string"
  }
}
```

## `reviewers_get`

The people who may review one post and the people watching it. Ids, display names and roles only; no email addresses.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, reviewers[], watchers[]}; a person is &#123;user_id, display_name, roles[]}

**Request**

```json
{
  "resource": "review",
  "action": "reviewers_get",
  "params": {
    "post_id": 0
  }
}
```
