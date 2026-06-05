---
title: Connecting a client
sidebar_position: 2
description: How to point an MCP client at SyteWide MCP, configure mcp-remote, choose a toolset, and verify the connection.
---

# Connecting a client

## The MCP endpoint

Every site running SyteWide MCP exposes the MCP endpoint at:

```
https://YOURSITE/wp-json/sytewide-mcp/v1/mcp
```

Replace `YOURSITE` with your WordPress site domain. The endpoint speaks the MCP 2024-11-05 HTTP transport. Authentication is done via an `X-API-Key` header — see [Authentication and security](./authentication) for how to create API keys.

## Configure `.mcp.json` with mcp-remote

Most MCP clients (including Claude Desktop) connect to remote MCP servers through the `mcp-remote` shim. Add the following entry to your project's `.mcp.json` file:

```json
"sytewide-mcp": {
  "command": "npx",
  "args": [
    "-y", "mcp-remote",
    "https://YOURSITE/wp-json/sytewide-mcp/v1/mcp?toolset=full",
    "--header", "X-API-Key:YOUR_KEY",
    "--transport", "http-only"
  ]
}
```

Substitute `YOURSITE` with your site domain and `YOUR_KEY` with a valid API key. Keep `.mcp.json` out of version control — it contains a secret.

## Choosing a toolset with `?toolset=`

The MCP endpoint accepts a `toolset` query parameter that selects a toolset profile. Profiles control which subset of the available tools are listed and callable.

```
https://YOURSITE/wp-json/sytewide-mcp/v1/mcp?toolset=full
https://YOURSITE/wp-json/sytewide-mcp/v1/mcp?toolset=content
https://YOURSITE/wp-json/sytewide-mcp/v1/mcp?toolset=crm
```

Profiles are defined and managed per site. See [Toolset profiles](./toolset-profiles) for the full list of built-in profiles and how to create custom ones.

:::warning Header limitation with mcp-remote
The `mcp-remote` shim forwards only the **first** `--header` argument. If you add a second `--header "X-Toolset:..."` to select a profile, it is silently dropped. Always select a toolset via the `?toolset=` query parameter on the URL — not via a second header.
:::

## Verifying the connection

Once the client is configured, call the `sytewide_get_status` tool. It returns the live registry count (how many tools are currently registered for that site) and confirms the entitlement status. A successful response looks like:

```json
{
  "status": "ok",
  "registry_count": 297,
  "entitlement": "syteops_sytewide_mcp",
  "entitlement_active": true
}
```

If `entitlement_active` is `false`, the SyteOps entitlement module is not active and all `tools/call` requests will be rejected. Contact your SyteOps administrator to enable the `syteops_sytewide_mcp` entitlement.
