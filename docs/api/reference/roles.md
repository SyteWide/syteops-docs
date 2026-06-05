---
title: roles
description: Manage API operations for the roles resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `roles`

6 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `assign`

Assign a user (slot number) to a role.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |
| `user_num` | string | yes |  |


**Returns**

data: &#123;slug, assigned_users}

**Request**

```json
{
  "resource": "roles",
  "action": "assign",
  "params": {
    "slug": "string",
    "user_num": "string"
  }
}
```

## `create`

Create a custom role.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes |  |
| `description` | string | no |  |
| `icon` | string | no |  |
| `color` | string | no |  |
| `constraint_type` | string | no |  |
| `max_count` | integer | no |  |


**Returns**

data: &#123;slug, role}

**Request**

```json
{
  "resource": "roles",
  "action": "create",
  "params": {
    "name": "string",
    "description": "string",
    "icon": "string",
    "color": "string",
    "constraint_type": "string",
    "max_count": 0
  }
}
```

## `delete`

Delete a custom role (system roles cannot be deleted).

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;slug, deleted: true}

**Request**

```json
{
  "resource": "roles",
  "action": "delete",
  "params": {
    "slug": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `list`

List system + custom roles with assignees.

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data.roles[]: &#123;slug, name, system, constraint_type, assigned_users}

**Request**

```json
{
  "resource": "roles",
  "action": "list",
  "params": {}
}
```

## `unassign`

Unassign a user (slot number) from a role.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |
| `user_num` | string | yes |  |


**Returns**

data: &#123;slug, assigned_users}

**Request**

```json
{
  "resource": "roles",
  "action": "unassign",
  "params": {
    "slug": "string",
    "user_num": "string"
  }
}
```

## `update`

Update a custom role.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |
| `name` | string | no |  |
| `description` | string | no |  |
| `icon` | string | no |  |
| `color` | string | no |  |
| `constraint_type` | string | no |  |
| `max_count` | integer | no |  |


**Returns**

data: &#123;slug, role}

**Request**

```json
{
  "resource": "roles",
  "action": "update",
  "params": {
    "slug": "string",
    "name": "string",
    "description": "string",
    "icon": "string",
    "color": "string",
    "constraint_type": "string",
    "max_count": 0
  }
}
```
