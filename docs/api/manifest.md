---
title: Manifest
sidebar_position: 4
description: The self-describing GET /manage/manifest endpoint — what it returns, the shape of each operation entry, and how to use it to drive tooling.
---

# Manifest

## The self-describing endpoint

`GET /manage/manifest` returns the complete list of operations that the installed version of SyteOps supports through the Manage API. No request body is needed. Authentication requirements are the same as for [dispatch](./dispatch-contract).

```bash
curl "https://your-site/wp-json/syteops/v1/manage/manifest" \
  -H "X-API-Key: som_YOUR_KEY_HERE"
```

Response shape:

```json
{
  "ok": true,
  "data": [
    { "resource": "...", "action": "...", "summary": "...", ... },
    ...
  ]
}
```

The `data` array contains one entry per available operation.

## Operation shape

Each entry in the manifest `data` array has the following fields:

| Field | Type | Always present | Description |
|---|---|---|---|
| `resource` | string | Yes | The resource group the operation belongs to (e.g. `modules`, `ai`) |
| `action` | string | Yes | The action name (e.g. `get`, `set`, `enable`, `disable`) |
| `summary` | string | Yes | Short human-readable description of what the operation does |
| `params` | object | Yes | JSON Schema object describing the accepted `params` fields; may be an empty object if no params are accepted |
| `capability` | string | Yes | The WordPress capability required to execute this operation |
| `destructive` | boolean | Yes | `true` if the operation requires `confirm: true` in the request body |
| `secret_keys` | array of strings | No | Response fields that will be redacted; only present when the operation touches secrets |
| `returns` | object | No | JSON Schema describing the `data` payload shape; only present when the operation returns a non-trivial structure |

### Example operation entry

```json
{
  "resource": "modules",
  "action": "set",
  "summary": "Enable or disable a SyteOps module",
  "params": {
    "type": "object",
    "properties": {
      "module": { "type": "string" },
      "enabled": { "type": "boolean" }
    },
    "required": ["module", "enabled"]
  },
  "capability": "manage_options",
  "destructive": false,
  "returns": {
    "type": "object",
    "properties": {
      "module": { "type": "string" },
      "enabled": { "type": "boolean" }
    }
  }
}
```

## Driving tooling from the manifest

Because the manifest is machine-readable, any client that can issue a GET request can discover the full operation set without hard-coding it.

Common patterns:

- **MCP bridges** enumerate the manifest on startup and expose each operation as a named tool, using `summary` as the tool description and `params` as the input schema. See [Using the API via MCP](./mcp-bridge) for how this works in practice.
- **Validation layers** fetch the manifest once and cache it to validate `params` client-side before sending requests, reducing round-trips for bad inputs.
- **Documentation generators** use the manifest as the authoritative source — the [Manage API reference](./reference/) on this site is generated directly from the manifest rather than maintained by hand.

:::note
The manifest reflects the operations available in the **currently installed version** of SyteOps. If you upgrade the plugin, re-fetch the manifest to pick up new or changed operations.
:::
