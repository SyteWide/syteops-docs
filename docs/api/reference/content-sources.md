---
title: Content Sources
sidebar_label: Content Sources
description: Manage API operations for the content_sources resource.
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# `content_sources`

7 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `approve_mapping`

Approve a field mapping for a source, activating it for live ingest.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |
| `mapping` | object | yes |  |


**Returns**

data: &#123;id, status, mapping_status, mapping}

**Request**

```json
{
  "resource": "content_sources",
  "action": "approve_mapping",
  "params": {
    "id": "string",
    "mapping": {}
  }
}
```

## `create`

Create a content source; generates its id, slug, and webhook secret.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes |  |
| `auth_mode` | string | no |  |
| `default_author_id` | integer | no |  |
| `pin_author` | boolean | no |  |
| `target_post_type` | string | no |  |
| `new_cpt` | object | no |  |
| `meta_fields` | object | no |  |
| `fm_variables` | object | no |  |
| `forward_enabled` | boolean | no |  |
| `forward_url` | url | no |  |
| `forward_auth_mode` | string | no |  |
| `forward_secret` | string | no |  |


**Returns**

data: &#123;id, name, slug, secret, ...} — secret is plaintext, returned only this once (forward_secret is never returned)

**Request**

```json
{
  "resource": "content_sources",
  "action": "create",
  "params": {
    "name": "string",
    "auth_mode": "string",
    "default_author_id": 0,
    "pin_author": true,
    "target_post_type": "string",
    "new_cpt": {},
    "meta_fields": {},
    "fm_variables": {},
    "forward_enabled": true,
    "forward_url": "https://example.com",
    "forward_auth_mode": "string",
    "forward_secret": "string"
  }
}
```

## `delete`

Permanently delete a content source.

**🔴 Destructive** — requires `confirm: true`.  
**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;id, deleted: true}

**Request**

```json
{
  "resource": "content_sources",
  "action": "delete",
  "params": {
    "id": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `get`

Get a single content source by id (never includes the secret).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |


**Returns**

data: &#123;id, name, slug, enabled, status, auth_mode, mapping, mapping_status, ...}

**Request**

```json
{
  "resource": "content_sources",
  "action": "get",
  "params": {
    "id": "string"
  }
}
```

## `list`

List all configured content sources (never includes the secret).

**Capability:** `manage_options`

**Parameters**

_No parameters._


**Returns**

data.sources[]: array of &#123;id, name, slug, enabled, status, auth_mode, target_post_type, cpt_post_type, shape_fingerprint, mapping, mapping_status, sample, default_author_id, pin_author, default_reviewers, default_ccs, default_post_status, meta_fields, fm_variables, forward_enabled, forward_url, forward_auth_mode, created_at, updated_at} (secret and forward_secret are never included)

**Request**

```json
{
  "resource": "content_sources",
  "action": "list",
  "params": {}
}
```

## `rotate_secret`

Generate a new webhook secret for a content source, invalidating the old one.

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |


**Returns**

data: &#123;id, secret} — secret is plaintext, returned only this once

**Request**

```json
{
  "resource": "content_sources",
  "action": "rotate_secret",
  "params": {
    "id": "string"
  }
}
```

## `update`

Update editable fields on an existing content source (slug and secret are not editable here).

**Capability:** `manage_options`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |
| `name` | string | no |  |
| `default_author_id` | integer | no |  |
| `pin_author` | boolean | no |  |
| `default_reviewers` | object | no |  |
| `default_ccs` | object | no |  |
| `default_post_status` | string | no |  |
| `auth_mode` | string | no |  |
| `enabled` | boolean | no |  |
| `reingest_mode` | string | no |  |
| `target_post_type` | string | no |  |
| `meta_fields` | object | no |  |
| `fm_variables` | object | no |  |
| `forward_enabled` | boolean | no |  |
| `forward_url` | url | no |  |
| `forward_auth_mode` | string | no |  |
| `forward_secret` | string | no |  |


**Returns**

data: &#123;id, name, slug, ...} (no secret, no forward_secret)

**Request**

```json
{
  "resource": "content_sources",
  "action": "update",
  "params": {
    "id": "string",
    "name": "string",
    "default_author_id": 0,
    "pin_author": true,
    "default_reviewers": {},
    "default_ccs": {},
    "default_post_status": "string",
    "auth_mode": "string",
    "enabled": true,
    "reingest_mode": "string",
    "target_post_type": "string",
    "meta_fields": {},
    "fm_variables": {},
    "forward_enabled": true,
    "forward_url": "https://example.com",
    "forward_auth_mode": "string",
    "forward_secret": "string"
  }
}
```
