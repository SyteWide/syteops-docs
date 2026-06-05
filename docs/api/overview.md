---
title: Overview
sidebar_position: 1
description: Introduction to the SyteOps Manage API — its dispatch/manifest pattern, response envelope, base URL, and available resources.
---

# Overview

## What the Manage API is

The **SyteOps Manage API** is a control plane that allows authorized external tools — automation platforms, CI pipelines, MCP clients, and custom scripts — to read and mutate SyteOps settings and content over HTTP. It was introduced in **SyteOps v1.4.000**.

The API is intentionally narrow: rather than exposing dozens of individual REST routes, it exposes two stable endpoints and encodes all available operations inside a self-describing manifest. This keeps the integration surface small while remaining fully extensible as new resources and actions are added.

## The dispatch and manifest pattern

All mutations and reads flow through a single endpoint:

- **`POST /manage/dispatch`** — execute any operation by naming its `resource` and `action` in the request body.
- **`GET /manage/manifest`** — retrieve the list of every operation the installed version of SyteOps supports, together with its parameter schema, required capability, and any other metadata.

The manifest is the source of truth for what the API can do. Documentation tooling, MCP bridges, and IDE helpers can all be driven from it without hard-coding operation lists. See [Manifest](./manifest) for details.

## The standard response envelope

Every response from `/manage/dispatch` uses the same JSON envelope:

```json
{
  "ok": true,
  "data": { },
  "changed": false,
  "error": null
}
```

| Field | Type | Meaning |
|---|---|---|
| `ok` | boolean | `true` when the operation succeeded; `false` on any error |
| `data` | object or null | The operation's return payload (shape varies per operation) |
| `changed` | boolean | `true` when a mutation actually modified stored state |
| `error` | string or null | Human-readable error message when `ok` is `false` |

When `ok` is `false`, `data` is `null` and `error` contains a description of what went wrong.

## Base URL and namespace

The Manage API lives under the WordPress REST API root for your site.

| Item | Value |
|---|---|
| WP REST namespace | `syteops/v1` |
| Base URL | `https://your-site/wp-json/syteops/v1/` |
| Dispatch endpoint | `https://your-site/wp-json/syteops/v1/manage/dispatch` |
| Manifest endpoint | `https://your-site/wp-json/syteops/v1/manage/manifest` |

Replace `your-site` with your WordPress installation's domain.

## Resources at a glance

The following resource groups are exposed through the Manage API. Each resource supports one or more actions discoverable via the manifest.

| Resource | Description |
|---|---|
| `users` | WordPress user management |
| `status` | Site and SyteOps health status |
| `modules` | Enable or disable SyteOps modules |
| `integrations` | Third-party integration settings |
| `ai` | AI provider configuration |
| `crm` | CRM connection settings |
| `roles` | Role and capability configuration |
| `variables` | Stored site variables |
| `notes_items` | Internal notes entries |
| `estimates_items` | Estimate records |
| `leads` | Lead records and pipeline data |

For full parameter schemas, required capabilities, and per-action return shapes, see the [Manage API reference](./reference/).

:::tip
Before making your first request, read [Authentication](./authentication) to understand the two supported credential modes and how to mint an API key.
:::
