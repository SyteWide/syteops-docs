---
title: Review
sidebar_label: Review
description: Manage API operations for the review resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `review`

13 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `approve`

Approve a post for publishing, as the Review Portal's Publish does with nothing edited: it publishes now, or schedules it when the post holds a reviewer's intended time or a reserved cadence slot at least a minute ahead and scheduling is on. Acts with admin authority: an admin or API-key caller bypasses the post's reviewer list and the who_can_publish rule, which gate people in the portal, and is limited to posts in review. It records the approver as user 0 whenever the API key authorized the call, otherwise the signed-in SyteOps Admin. A post never sent for review (no reviewers and no review link) is refused (409 not_in_review). A post already live is ok with changed:false and already_live:true, and nothing is written, logged or emailed. A title, excerpt or body the call does not send is published exactly as stored. Every portal check applies: 409 not_ready (with failed[] requirements), 409 published_immutable, 500 publish_failed. Open notes do not block it (the portal only warns); open_notes reports them. Destructive: send confirm:true.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `confirm` | boolean | no | Must be true: this puts a post live. |


**Returns**

data: &#123;post_id, status, scheduled, scheduled_readable, permalink, emailed, notify: &#123;outcome, partial}, images: &#123;imported, reused, failed, capped}|null, open_notes, approved_by: &#123;user_id, via, api_key}, already_live}

**Request**

```json
{
  "resource": "review",
  "action": "approve",
  "params": {
    "post_id": 0,
    "confirm": true
  },
  "confirm": true
}
```

## `comments_add`

Add a review note as one person, through the Review Portal's own writer, so the notes email batches it the same way. Send exactly one target: parent_id (a reply to a top-level note; notify and resolve apply), attachment_id or image_url (a note on a picture), or element (a note pinned to a page element, with the portal's element fields such as selector, text and heading). The portal has no untargeted note; use request_changes for an article-level note. The note is marked as added via API, and the portal's history says so. An API-key call must send as_user_id; that person must be able to comment on the post (403 forbidden), and resolve needs edit rights.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `body` | string | yes | The note, plain text. |
| `as_user_id` | integer | no | Record id, digits only. |
| `parent_id` | string | no | Reply to this top-level note id. |
| `notify` | boolean | no | Reply only: email the thread (default true). |
| `resolve` | boolean | no | Reply only: also resolve the parent note. |
| `attachment_id` | integer | no | Record id, digits only. |
| `image_url` | string | no | The picture's URL, when it has no attachment id. |
| `element` | object | no | Element target: selector, sig, text, ox, oy, vw, media, src, name, breakpoint, tag, el_id, classes, heading, html, builder_path, rect, url, bld. |


**Returns**

data: &#123;post_id, as_user_id, kind: reply|image|element, entry: &#123;id, parent, kind, created_at, via_api}}; a reply adds &#123;resolve: changed|unchanged|missing|failed|null (null when not asked), notified, notify: &#123;outcome, partial}}

**Request**

```json
{
  "resource": "review",
  "action": "comments_add",
  "params": {
    "post_id": 0,
    "body": "string",
    "as_user_id": 0,
    "parent_id": "string",
    "notify": true,
    "resolve": true,
    "attachment_id": 0,
    "image_url": "string",
    "element": {}
  }
}
```

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

data: &#123;post_id, total, page, per_page, has_more, comments[]}; a comment is &#123;id, parent, user_id, user_name, note, created_at, kind, target_kind, att_id, resolved, via_api}; via_api is true for a note written through this API

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

## `permissions_get`

The Review Portal's Portal Permissions as the settings screen reads them: who_can_publish (any or author_approver) and the per-area matrix, with a default row (everyone else), role rows keyed by SyteOps role slug and person rows keyed by user number. An absent role or person cell inherits; an absent default cell is that area's default. Also lists every area with its allowed values and whether this site's screen shows it, and the role and person rows that may be set (a person is listed only when linked to a WordPress account, as on the screen). A SyteOps Admin is never restricted by the matrix, and site administrators can always publish. Works before the portal is in use.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data: &#123;who_can_publish, permissions: &#123;default: &#123;area: value}, roles: &#123;slug: &#123;area: value}}, users: &#123;user_num: &#123;area: value}}}, areas[]: &#123;key, label, values[], default, shown}, roles[]: &#123;slug, name}, users[]: &#123;user_num, name}}

**Request**

```json
{
  "resource": "review",
  "action": "permissions_get",
  "params": {}
}
```

## `permissions_set`

Change who can review and publish in the Review Portal. Partial: only the cells sent change, every other cell and row is kept. In roles and users a cell of inherit (or null) clears it and a row of null clears the whole row; the default row takes real values only. Every section, role slug, user number (a person linked to a WordPress account, as the screen lists), area and value is checked against the settings screen's own lists, and an area the screen does not show on this site is refused (422 invalid_permissions; nothing is written). who_can_publish is any or author_approver (422 invalid_who_can_publish). Switching to author_approver when no user holds the administrator publish override is refused (409 no_publisher_left). Send at least one of the two (422 nothing_to_change). One set runs at a time; a concurrent one is refused (409 busy) rather than risk losing a cell, so retry it. Saved through the screen's own validator and recorded in the activity log. Requires confirm:true.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `permissions` | object | no | Partial matrix: \{default?: \{area: value\}, roles?: \{slug: \{area: value\|inherit\|null\}\|null\}, users?: \{user_num: \{area: value\|inherit\|null\}\|null\}\}. |
| `who_can_publish` | string | no | any (any selected reviewer) or author_approver (the post author or an administrator). |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;who_can_publish, permissions: &#123;default, roles, users} as stored after the change, changes[]: &#123;row, area, from, to}} (null = unset)

**Request**

```json
{
  "resource": "review",
  "action": "permissions_set",
  "params": {
    "permissions": {},
    "who_can_publish": "string",
    "confirm": true
  },
  "confirm": true
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

## `request_changes`

Send a post back for changes as one person, as the Review Portal's Request Changes does: records message as their note, cancels a pending schedule when they may publish, and emails the author and co-reviewers. The note is marked as added via API, and the portal's history says so. An API-key call must send as_user_id; a signed-in SyteOps Admin defaults to themselves. That person must be able to edit the post in the portal (403 forbidden); 409 schedule_due when it is about to publish and they cannot cancel it.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `message` | string | yes | The note, plain text, up to the portal's note length. |
| `as_user_id` | integer | no | Record id, digits only. |


**Returns**

data: &#123;post_id, as_user_id, entry: &#123;id, parent, kind, created_at, via_api}, emailed, notify: &#123;outcome, partial}, unscheduled, status}

**Request**

```json
{
  "resource": "review",
  "action": "request_changes",
  "params": {
    "post_id": 0,
    "message": "string",
    "as_user_id": 0
  }
}
```

## `reviewers_add`

Add a reviewer to one post, as the portal's Send to a colleague does: the person is emailed that they were asked to help review, the post's review link gets a fresh expiry window, and the post's activity log records it. Adding a reviewer lets that person open and edit the post, and publish it when who_can_publish is any. Under who_can_publish=author_approver they can edit but not publish, unless they are the post's author or a site administrator or SyteOps Admin. user_id must be a SyteOps user linked to a WordPress account (422 user_not_selectable; 404 user_not_found when no such account). A post that was never sent for review is refused (409 not_review_managed). A watcher who is added as a reviewer stops being a watcher. Someone already listed is ok with changed:false and is not emailed again.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `user_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, user_id, emailed, notify: sent|failed|none, reviewers[], watchers[]}; emailed and notify only when the person was added; a person is &#123;user_id, display_name, roles[]}

**Request**

```json
{
  "resource": "review",
  "action": "reviewers_add",
  "params": {
    "post_id": 0,
    "user_id": 0
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

## `reviewers_remove`

Remove a reviewer from one post: they can no longer open, edit or publish it through the portal (unless they are a site administrator, or a watcher or a bundle reviewer of it, which keeps that narrower access), and their queued review emails for it are dropped when they no longer have any access. The post's author stays on the list (409 author_protected). The removal sticks: the post's source default reviewers and CCs do not put them back. Someone not listed is ok with changed:false. No email is sent; the activity log records it.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `user_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, user_id, reviewers[], watchers[]} (the lists after the call); a person is &#123;user_id, display_name, roles[]}

**Request**

```json
{
  "resource": "review",
  "action": "reviewers_remove",
  "params": {
    "post_id": 0,
    "user_id": 0
  }
}
```

## `watchers_add`

Add a watcher to one post: they may open it and comment, and receive its routine review emails, but cannot edit or publish it. user_id must be a SyteOps user linked to a WordPress account (422 user_not_selectable). A post that was never sent for review is refused (409 not_review_managed). A reviewer of the post is refused (409 already_reviewer). Someone already watching is ok with changed:false. No email is sent; the activity log records it.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `user_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, user_id, reviewers[], watchers[]} (the lists after the call); a person is &#123;user_id, display_name, roles[]}

**Request**

```json
{
  "resource": "review",
  "action": "watchers_add",
  "params": {
    "post_id": 0,
    "user_id": 0
  }
}
```

## `watchers_remove`

Remove a watcher from one post: they can no longer open or comment on it unless something else grants that, and their queued review emails for it are then dropped. The removal sticks: the post's source default CCs do not put them back. Someone not watching is ok with changed:false. No email is sent; the activity log records it.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `user_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, user_id, reviewers[], watchers[]} (the lists after the call); a person is &#123;user_id, display_name, roles[]}

**Request**

```json
{
  "resource": "review",
  "action": "watchers_remove",
  "params": {
    "post_id": 0,
    "user_id": 0
  }
}
```
