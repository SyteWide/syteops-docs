---
title: Users
sidebar_label: Users
description: Manage API operations for the users resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `users`

6 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `create`

Create a SyteOps team-member record in the next free slot and fill its fields. A slot reused after a delete starts fully blank: no name, contact details, links, Model consent, or Model photos survive from the previous occupant.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `first_name` | string | no |  |
| `last_name` | string | no |  |
| `full_name` | string | no |  |
| `nickname` | string | no |  |
| `company_name` | string | no |  |
| `phone_number` | string | no |  |
| `phone_map_pref` | string | no |  |
| `email` | email | no |  |
| `email_alternate` | email | no |  |
| `email_personal` | email | no |  |
| `link_profile_pic` | url | no |  |
| `link_profile_pic_attachment_id` | integer | no | Record id, digits only. |
| `model_photo_ids` | object | no | Curated Model photo attachment ids. Site-local; not portable to another site. |
| `model_photo_exclude_profile` | string | no | '1' excludes the profile picture from the curated Model photo set; '' includes it. |
| `model_consent_granted` | string | no | The Model consent flag and the only consent signal: '1' or ''. |
| `notify_reminders` | string | no | Whether this person receives publishing reminders and deferral escalations: '1' or ''. Absent means on. |
| `notify_replies` | string | no | Whether this person receives article feedback and reply notifications: '1' or ''. Absent means on. |
| `list_per` | string | no | Review list page size for this person: '5', '10', '25', '100', or '' to inherit the site default. |


**Returns**

data: &#123;user_num, ...fields}

**Request**

```json
{
  "resource": "users",
  "action": "create",
  "params": {
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "nickname": "string",
    "company_name": "string",
    "phone_number": "string",
    "phone_map_pref": "string",
    "email": "name@example.com",
    "email_alternate": "name@example.com",
    "email_personal": "name@example.com",
    "link_profile_pic": "https://example.com",
    "link_profile_pic_attachment_id": 0,
    "model_photo_ids": {},
    "model_photo_exclude_profile": "string",
    "model_consent_granted": "string",
    "notify_reminders": "string",
    "notify_replies": "string",
    "list_per": "string"
  }
}
```

## `delete`

Soft-delete a SyteOps team-member record and blank its editable fields (frees its slot for reuse).

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_num` | string | yes | Slot number, one to three digits, for example 007 or 7. |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;user_num, deleted: true}

**Request**

```json
{
  "resource": "users",
  "action": "delete",
  "params": {
    "user_num": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `get`

Get one SyteOps team-member record by slot number (e.g. "003").

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_num` | string | yes | Slot number, one to three digits, for example 007 or 7. |


**Returns**

data: &#123;user_num, ...fields}

**Request**

```json
{
  "resource": "users",
  "action": "get",
  "params": {
    "user_num": "string"
  }
}
```

## `list`

List all active SyteOps team-member records.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data.users[]: array of &#123;user_num, ...fields}

**Request**

```json
{
  "resource": "users",
  "action": "list",
  "params": {}
}
```

## `send_welcome_email`

Email the person their personal page link at their stored work email. Requires a saved work email and a linked WordPress account. dry_run previews eligibility and the destination without sending, and still requires confirm:true. A repeat to the same address within 5 minutes is refused.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_num` | string | yes | Slot number, one to three digits, for example 007 or 7. |
| `confirm` | boolean | no |  |
| `dry_run` | boolean | no |  |


**Returns**

data: &#123;eligible, outcome, to, retry_after}

**Request**

```json
{
  "resource": "users",
  "action": "send_welcome_email",
  "params": {
    "user_num": "string",
    "confirm": true,
    "dry_run": true
  },
  "confirm": true
}
```

## `update`

Update fields on an existing SyteOps team-member record.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_num` | string | yes | Slot number, one to three digits, for example 007 or 7. |
| `first_name` | string | no |  |
| `last_name` | string | no |  |
| `full_name` | string | no |  |
| `nickname` | string | no |  |
| `company_name` | string | no |  |
| `phone_number` | string | no |  |
| `phone_map_pref` | string | no |  |
| `email` | email | no |  |
| `email_alternate` | email | no |  |
| `email_personal` | email | no |  |
| `link_profile_pic` | url | no |  |
| `link_profile_pic_attachment_id` | integer | no | Record id, digits only. |
| `model_photo_ids` | object | no | Curated Model photo attachment ids. Site-local; not portable to another site. |
| `model_photo_exclude_profile` | string | no | '1' excludes the profile picture from the curated Model photo set; '' includes it. |
| `model_consent_granted` | string | no | The Model consent flag and the only consent signal: '1' or ''. |
| `notify_reminders` | string | no | Whether this person receives publishing reminders and deferral escalations: '1' or ''. Absent means on. |
| `notify_replies` | string | no | Whether this person receives article feedback and reply notifications: '1' or ''. Absent means on. |
| `list_per` | string | no | Review list page size for this person: '5', '10', '25', '100', or '' to inherit the site default. |


**Returns**

data: &#123;user_num, ...fields}

**Request**

```json
{
  "resource": "users",
  "action": "update",
  "params": {
    "user_num": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "nickname": "string",
    "company_name": "string",
    "phone_number": "string",
    "phone_map_pref": "string",
    "email": "name@example.com",
    "email_alternate": "name@example.com",
    "email_personal": "name@example.com",
    "link_profile_pic": "https://example.com",
    "link_profile_pic_attachment_id": 0,
    "model_photo_ids": {},
    "model_photo_exclude_profile": "string",
    "model_consent_granted": "string",
    "notify_reminders": "string",
    "notify_replies": "string",
    "list_per": "string"
  }
}
```
