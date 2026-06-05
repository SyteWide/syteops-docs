---
title: Authentication & security
sidebar_position: 3
description: API key creation, per-key toolset profiles, capability gating, and the SyteOps entitlement requirement.
---

# Authentication & security

## API keys

SyteWide MCP uses API keys for client authentication. Keys are created and managed in the WordPress admin panel:

**WordPress admin → SyteWide MCP → API Keys**

Each key is a long random string. Send it in the `X-API-Key` HTTP header on every request:

```
X-API-Key: YOUR_KEY
```

When using `mcp-remote`, pass the key via the `--header` argument in your `.mcp.json`:

```json
"--header", "X-API-Key:YOUR_KEY"
```

:::warning Keys are secrets
Treat API keys like passwords. Do not commit them to version control, log them, or paste them in shared documents. If a key is compromised, revoke it immediately in the WordPress admin and issue a new one.
:::

## Per-key toolset profile

Each API key can carry an associated toolset profile. When a key with a profile is used, the MCP server applies that profile as the default toolset — restricting `tools/list` and `tools/call` to the tools in that profile.

A profile on the key can be overridden at connection time by passing a `?toolset=` query parameter on the MCP URL. See [Toolset profiles](./toolset-profiles) for the list of available profiles.

## Capability gating

Every registered tool declares a **WordPress capability** requirement. This requirement is enforced on every `tools/call` request, regardless of which toolset profile is active.

When a tool is called, the server resolves the WordPress user associated with the API key and checks whether that user has the required capability. If the capability check fails, the call is rejected with an authorization error — the tool is never executed.

This means a toolset profile can narrow which tools are visible, but it cannot grant access to tools that the key's underlying WordPress user is not authorized to perform. The capability check is always the final authority.

## SyteOps entitlement and the regulated-plugin rule

SyteWide MCP will not serve any requests unless two SyteOps conditions are met:

1. **Entitlement active** — the `syteops_sytewide_mcp` entitlement module must be enabled on the site by the SyteOps platform. Without it, the REST endpoint returns an error on every request.
2. **REST allowlist** — SyteOps explicitly adds `/wp-json/sytewide-mcp/v1/*` to its allowlist. Requests to this path are blocked by SyteOps until the allowlist entry exists.

Additionally, SyteWide MCP is a **regulated plugin**: its folder name is fixed and must not be changed. SyteOps references the plugin by its exact slug during provisioning and entitlement checks. Renaming the folder breaks the entitlement link and causes all authentication to fail.

For details on provisioning the entitlement, see the [SyteOps API](../api/overview).
