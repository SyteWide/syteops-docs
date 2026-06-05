---
title: Estimates Items
sidebar_label: Estimates Items
description: Manage API operations for the estimates_items resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `estimates_items`

5 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `create`

Create a Estimates item.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | no |  |
| `content` | string | no |  |
| `excerpt` | string | no |  |
| `status` | string | no |  |
| `slug` | string | no |  |
| `author` | integer | no |  |
| `meta` | object | no |  |


**Returns**

data: &#123;id, ...item}

**Request**

```json
{
  "resource": "estimates_items",
  "action": "create",
  "params": {
    "title": "string",
    "content": "string",
    "excerpt": "string",
    "status": "string",
    "slug": "string",
    "author": 0,
    "meta": {}
  }
}
```

## `delete`

Permanently delete a Estimates item.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;id, deleted: true}

**Request**

```json
{
  "resource": "estimates_items",
  "action": "delete",
  "params": {
    "id": 0,
    "confirm": true
  },
  "confirm": true
}
```

## `get`

Get one Estimates item by id (includes meta).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |


**Returns**

data: &#123;id,type,title,content,excerpt,status,slug,author,date,modified,meta}

**Request**

```json
{
  "resource": "estimates_items",
  "action": "get",
  "params": {
    "id": 0
  }
}
```

## `list`

List Estimates items (paginated).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no |  |
| `page` | integer | no |  |
| `status` | string | no |  |
| `search` | string | no |  |


**Returns**

data: &#123;items[]: &#123;id,type,title,content,excerpt,status,slug,author,date,modified}, total, page, per_page}

**Request**

```json
{
  "resource": "estimates_items",
  "action": "list",
  "params": {
    "per_page": 0,
    "page": 0,
    "status": "string",
    "search": "string"
  }
}
```

## `update`

Update a Estimates item.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes |  |
| `title` | string | no |  |
| `content` | string | no |  |
| `excerpt` | string | no |  |
| `status` | string | no |  |
| `slug` | string | no |  |
| `author` | integer | no |  |
| `meta` | object | no |  |


**Returns**

data: &#123;id, ...item}

**Request**

```json
{
  "resource": "estimates_items",
  "action": "update",
  "params": {
    "id": 0,
    "title": "string",
    "content": "string",
    "excerpt": "string",
    "status": "string",
    "slug": "string",
    "author": 0,
    "meta": {}
  }
}
```
