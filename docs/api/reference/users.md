---
title: Users
sidebar_label: Users
description: Manage API operations for the users resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `users`

5 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `create`

Create a SyteOps team-member record in the next free slot and fill its fields.

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
| `link_profile_pic_attachment_id` | integer | no |  |


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
    "link_profile_pic_attachment_id": 0
  }
}
```

## `delete`

Soft-delete a SyteOps team-member record (frees its slot for reuse).

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_num` | string | yes |  |
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
| `user_num` | string | yes |  |


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

## `update`

Update fields on an existing SyteOps team-member record.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_num` | string | yes |  |
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
| `link_profile_pic_attachment_id` | integer | no |  |


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
    "link_profile_pic_attachment_id": 0
  }
}
```
