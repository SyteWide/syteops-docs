---
title: SEO
sidebar_label: SEO
description: Manage API operations for the seo resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `seo`

2 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `get`

Read one post's SEO title, description and focus keywords from whichever SEO tool is active. With no active SEO tool it returns 409 no_active_seo_tool.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |


**Returns**

data: &#123;post_id, tool, tool_label, fields: &#123;title, description, keywords}}

**Request**

```json
{
  "resource": "seo",
  "action": "get",
  "params": {
    "post_id": 0
  }
}
```

## `set`

Write one post's SEO title, description or focus keywords through the active SEO tool's own writer. Use this, not update_content meta, for every SEO plugin. dry_run:true writes nothing and returns each field's current and proposed value; a real write returns 409 confirmation_required until confirm:true. Only the fields sent change; any other field is refused. Caps: title 300, description 1000, keywords 500 characters. A placeholder the SEO tool fills from site data is refused (422 seo_token_not_allowed) unless allow_placeholders:true.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | Record id, digits only. |
| `title` | string | no | SEO title. Send an empty string to clear it. |
| `description` | string | no | Meta description. Send an empty string to clear it. |
| `keywords` | string | no | Focus keywords, comma-separated. Send an empty string to clear it. |
| `dry_run` | boolean | no | Preview only; nothing is written. |
| `confirm` | boolean | no | Required (true) for a real write. |
| `allow_placeholders` | boolean | no | JSON true only. Allow placeholders the SEO tool fills from site data (custom fields, options). Off by default; only safe ones such as the post title are accepted without it. |


**Returns**

data: &#123;post_id, tool, tool_label, dry_run, changed, written, fields: &#123;&lt;field>: &#123;current, proposed, changed}}, placeholders: &#123;&lt;field>: []}, stored?: &#123;title, description, keywords}, note?}

**Request**

```json
{
  "resource": "seo",
  "action": "set",
  "params": {
    "post_id": 0,
    "title": "string",
    "description": "string",
    "keywords": "string",
    "dry_run": true,
    "confirm": true,
    "allow_placeholders": true
  }
}
```
