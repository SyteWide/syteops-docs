---
title: Content Sources
sidebar_label: Content Sources
description: Manage API operations for the content_sources resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `content_sources`

13 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `approve_mapping`

Approve a field mapping for a source, activating it for live ingest.

**Access:** SyteOps Admin or API key.

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

Create a content source; generates its id and slug, and (unless a secret is provided or auth_mode is none) a webhook secret.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes |  |
| `auth_mode` | string | no |  |
| `secret` | string | no |  |
| `default_author_id` | integer | no | Record id, digits only. |
| `pin_author` | boolean | no |  |
| `target_post_type` | string | no |  |
| `new_cpt` | object | no |  |
| `meta_fields` | object | no |  |
| `fm_variables` | object | no |  |
| `forward_enabled` | boolean | no |  |
| `forward_url` | url | no |  |
| `forward_auth_mode` | string | no |  |
| `forward_secret` | string | no |  |
| `sig_header_mode` | string | no |  |
| `sig_header_name` | string | no |  |
| `author_match_mode` | string | no |  |
| `target_tag_slug` | string | no |  |
| `taxonomy_apply_mode` | string | no |  |
| `strip_uncategorized` | boolean | no |  |
| `category_exclude` | object | no |  |
| `content_cleanup` | boolean | no |  |
| `strip_inbody_toc` | boolean | no |  |
| `strip_inbody_faq` | boolean | no |  |
| `add_heading_anchors` | boolean | no |  |
| `image_modify` | object | no |  |


**Returns**

data: &#123;id, name, slug, secret, secret_source, ...} — secret is plaintext and NON-EMPTY only when secret_source is "generated" (empty for "provided"/"none"), returned only this once (forward_secret is never returned)

**Request**

```json
{
  "resource": "content_sources",
  "action": "create",
  "params": {
    "name": "string",
    "auth_mode": "string",
    "secret": "string",
    "default_author_id": 0,
    "pin_author": true,
    "target_post_type": "string",
    "new_cpt": {},
    "meta_fields": {},
    "fm_variables": {},
    "forward_enabled": true,
    "forward_url": "https://example.com",
    "forward_auth_mode": "string",
    "forward_secret": "string",
    "sig_header_mode": "string",
    "sig_header_name": "string",
    "author_match_mode": "string",
    "target_tag_slug": "string",
    "taxonomy_apply_mode": "string",
    "strip_uncategorized": true,
    "category_exclude": {},
    "content_cleanup": true,
    "strip_inbody_toc": true,
    "strip_inbody_faq": true,
    "add_heading_anchors": true,
    "image_modify": {}
  }
}
```

## `delete`

Permanently delete a content source.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

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

## `export`

Export one content source as a portable setup package (no secrets, no posts).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |


**Returns**

data: envelope &#123;format, schema_version, payload, ...} — never includes secret or forward_secret

**Request**

```json
{
  "resource": "content_sources",
  "action": "export",
  "params": {
    "id": "string"
  }
}
```

## `get`

Get a single content source by id (never includes the secret).

**Access:** SyteOps Admin or API key.

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

## `import`

Import a content source setup package; creates when the slug is free, overwrites when overwrite+confirm.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `envelope` | object | yes |  |
| `overwrite` | boolean | no |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;id, name, slug, mode, secret, secret_source, ...} — secret is plaintext and NON-EMPTY only when secret_source is "generated"

**Request**

```json
{
  "resource": "content_sources",
  "action": "import",
  "params": {
    "envelope": {},
    "overwrite": true,
    "confirm": true
  }
}
```

## `learn_from_sample`

Ask the Ingest AI area to propose a field mapping from the source's captured sample. The proposal REPLACES the stored mapping and is never approved: on a source whose mapping was approved, new deliveries are held until it is approved again, so that call needs confirm:true. Spends an AI call and shares the source's daily AI allowance (default 10 a day, UTC) with reprocess.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `confirm` | boolean | no | Required (true) when the source's mapping is approved. |


**Returns**

data: &#123;mapping}; changed is true. 404 not_found, 409 confirmation_required, no_provider or no_sample, 422 invalid_sample, 429 learn_cap_reached, 502 ai_empty_response or invalid_json, 503 ai_unavailable

**Request**

```json
{
  "resource": "content_sources",
  "action": "learn_from_sample",
  "params": {
    "id": "string",
    "confirm": true
  }
}
```

## `list`

List all configured content sources (never includes the secret).

**Access:** SyteOps Admin or API key.

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

## `reprocess`

Replay a source's last captured payload through the ingest core. Destructive: it creates or updates the article with the source's own settings, so a source set to publish publishes it, a source in overwrite mode overwrites reviewer edits on an article already live, and the draft core spends an AI call. Shares the source's daily AI allowance (default 10 a day, UTC) with learn_from_sample.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `confirm` | boolean | no | Must be true. |


**Returns**

data: &#123;outcome, message, post_id, created, edit_link}; changed is false for a held or protected article. 404 not_found (unknown or disabled source), 409 confirmation_required or no_payload, 422 invalid_json, 429 learn_cap_reached

**Request**

```json
{
  "resource": "content_sources",
  "action": "reprocess",
  "params": {
    "id": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `resend_review_email`

Re-send the review email for a post to its own reviewers (never to a caller-supplied address); one resend per post every 2 minutes.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;message, notify:&#123;outcome, partial, summary}} (display names only, no addresses or links). 404 post_not_found, 409 module_unavailable, 429 resend_cooldown, 400 no_recipients, 500 send_failed

**Request**

```json
{
  "resource": "content_sources",
  "action": "resend_review_email",
  "params": {
    "post_id": 0
  }
}
```

## `rotate_secret`

Generate a new webhook secret for a content source, invalidating the old one.

**Access:** SyteOps Admin or API key.

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

## `test`

Preview a mapping against a sample payload without writing anything.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes | Content source id. |
| `sample` | object | yes | The sample payload, as a JSON object. |
| `mapping` | object | no | Optional field =\> \{path, transform\} rows to try; omit to test the source's stored mapping. |


**Returns**

data: &#123;normalized, empty_fields}. 404 not_found, 422 no_sample (an empty sample object)

**Request**

```json
{
  "resource": "content_sources",
  "action": "test",
  "params": {
    "id": "string",
    "sample": {},
    "mapping": {}
  }
}
```

## `update`

Update editable fields on an existing content source (slug is not editable; secret is write-only).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | yes |  |
| `name` | string | no |  |
| `default_author_id` | integer | no | Record id, digits only. |
| `pin_author` | boolean | no |  |
| `default_reviewers` | object | no |  |
| `default_ccs` | object | no |  |
| `default_post_status` | string | no |  |
| `auth_mode` | string | no |  |
| `secret` | string | no |  |
| `enabled` | boolean | no |  |
| `reingest_mode` | string | no |  |
| `target_post_type` | string | no |  |
| `meta_fields` | object | no |  |
| `fm_variables` | object | no |  |
| `forward_enabled` | boolean | no |  |
| `forward_url` | url | no |  |
| `forward_auth_mode` | string | no |  |
| `forward_secret` | string | no |  |
| `sig_header_mode` | string | no |  |
| `sig_header_name` | string | no |  |
| `author_match_mode` | string | no |  |
| `target_tag_slug` | string | no |  |
| `taxonomy_apply_mode` | string | no |  |
| `strip_uncategorized` | boolean | no |  |
| `category_exclude` | object | no |  |
| `content_cleanup` | boolean | no |  |
| `strip_inbody_toc` | boolean | no |  |
| `strip_inbody_faq` | boolean | no |  |
| `add_heading_anchors` | boolean | no |  |
| `image_modify` | object | no |  |


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
    "secret": "string",
    "enabled": true,
    "reingest_mode": "string",
    "target_post_type": "string",
    "meta_fields": {},
    "fm_variables": {},
    "forward_enabled": true,
    "forward_url": "https://example.com",
    "forward_auth_mode": "string",
    "forward_secret": "string",
    "sig_header_mode": "string",
    "sig_header_name": "string",
    "author_match_mode": "string",
    "target_tag_slug": "string",
    "taxonomy_apply_mode": "string",
    "strip_uncategorized": true,
    "category_exclude": {},
    "content_cleanup": true,
    "strip_inbody_toc": true,
    "strip_inbody_faq": true,
    "add_heading_anchors": true,
    "image_modify": {}
  }
}
```
