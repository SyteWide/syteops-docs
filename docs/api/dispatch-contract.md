---
title: Dispatch contract
sidebar_position: 3
description: The request body, response envelope, destructive-operation confirmation, the access check, secret redaction, and param validation for POST /manage/dispatch.
---

# Dispatch contract

All reads and mutations go through a single endpoint: `POST /manage/dispatch`. This page documents the exact shape of requests and responses, along with the rules the API enforces on every call.

## Request body

Send a JSON body with the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `resource` | string | Yes | The resource group to target (e.g. `status`, `modules`, `ai`) |
| `action` | string | Yes | The action to perform on that resource (e.g. `get`, `set`, `enable`) |
| `params` | object | Varies | Operation-specific parameters; shape is defined in the manifest |
| `confirm` | boolean | No | Must be `true` for destructive operations; omit or set `false` otherwise |

## Response envelope

Every response uses the same JSON envelope regardless of the operation:

| Field | Type | Meaning |
|---|---|---|
| `ok` | boolean | `true` on success, `false` on any error |
| `data` | object or null | The operation's return payload; `null` when `ok` is `false` |
| `changed` | boolean | `true` when a mutation modified stored state |
| `error` | string or null | Human-readable error description; `null` when `ok` is `true` |

## Destructive operations

Some operations are marked `destructive: true` in the manifest. These will **refuse to execute** unless `confirm: true` is present in the request body.

If you omit `confirm` (or send `confirm: false`) for a destructive operation, the API returns:

```json
{
  "ok": false,
  "data": null,
  "changed": false,
  "error": "This operation is destructive. Send confirm: true to proceed."
}
```

This is a safety guard against accidental automation-triggered deletions or resets. Always require an explicit confirmation step in any tooling that calls destructive operations.

## Access check

Every operation needs a signed-in SyteOps admin or a valid API key, whichever way it is called. A valid API key is not checked against WordPress capabilities, and a signed-in user who is not a SyteOps admin is refused even with `manage_options`. The manifest's `capability` field does not affect this check.

If the check fails, the API returns HTTP 403 and:

```json
{
  "ok": false,
  "data": null,
  "changed": false,
  "error": "You do not have permission to perform this operation."
}
```

See [Authentication](./authentication) for each credential type.

## Secret redaction

An operation may declare one or more `secret_keys` in the manifest. Fields listed there are **never returned** in the response `data`, even when the operation succeeds. This applies to CRM credentials, AI provider keys, and any other sensitive values the operation touches.

There is no way to retrieve a secret through the Manage API once it has been written. This is by design.

## Param validation

Before executing any operation, the API validates the supplied `params` against the schema declared for that operation in the manifest. Validation errors are returned as:

```json
{
  "ok": false,
  "data": null,
  "changed": false,
  "error": "Invalid params: <description of the validation failure>"
}
```

To inspect the expected schema for any operation before calling it, fetch the [Manifest](./manifest).

## Full example

### Request

```bash
curl -X POST "https://your-site/wp-json/syteops/v1/manage/dispatch" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: som_YOUR_KEY_HERE" \
  -d '{
    "resource": "modules",
    "action": "set",
    "params": {
      "module": "leads",
      "enabled": true
    }
  }'
```

### Response

```json
{
  "ok": true,
  "data": {
    "module": "leads",
    "enabled": true
  },
  "changed": true,
  "error": null
}
```

:::note
`changed: true` indicates that the stored value was actually modified. If the module was already enabled and you send the same request again, the response will be identical but `changed` will be `false`.
:::
