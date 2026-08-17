---
title: Toolset profiles
sidebar_position: 5
description: Control which tools a SyteWide MCP connection exposes by selecting a named toolset profile on the URL or per API key.
---

SyteWide MCP can expose a *subset* of its tools to a given MCP connection via a
named **toolset profile**. This keeps the visible tool count small — MCP clients
degrade past roughly 150–200 tools — without losing reach: **every profile always
includes the diagnostics tools and all passthrough routers** (`*_request` /
`*_list_routes`), so full REST coverage is one router call away even in `lean`.

Profiles affect **discovery only** (`tools/list`). `tools/call` is never filtered
and capability checks are unchanged — a tool that isn't listed still executes if
called by name; the security boundary is the per-tool capability, not the profile.

Per-profile tool counts vary by which plugins are installed on a site. The admin
**Toolset** page shows the live count next to each profile name.

## Available profiles

| Profile | Exposes (in addition to diagnostics + all routers) |
|---|---|
| `full` | every registered tool |
| `lean` | a curated marquee of common **read** tools (the shipped site default) |
| `booking` | FluentBooking tools |
| `forms` | Fluent Forms tools |
| `cart` | FluentCart tools |
| `crm` | FluentCRM tools |
| `community` | FluentCommunity tools |
| `support` | Fluent Support tools |
| `affiliate` | Fluent Affiliate tools |
| `smtp` | FluentSMTP tools |
| `flowmattic` | FlowMattic tools |
| `seo` | Squirrly SEO tools |
| `syteops` | SyteOps tools |
| `wp` | WordPress core providers (content, users, media, comments, plugins, REST) |

You can also pass a **comma-separated list** mixing profile names and raw provider
IDs — they union. Examples: `booking,cart`, `crm,fluent-smtp`, `wp,booking`.
Unrecognized tokens are ignored; an empty or all-unknown spec falls back to
`lean`; if any token is `full`, you get everything.

Provider IDs: `wp-content`, `wp-users`, `wp-comments`, `wp-media`, `wp-plugins`,
`wp-rest`, `fluent-crm`, `fluent-forms`, `fluent-cart`, `fluent-booking`,
`fluent-smtp`, `fluent-community`, `fluent-support`, `fluent-affiliate`.
The `core` diagnostics provider and all routers are always present regardless of
profile, so there is no need to name them — `?toolset=core` alone would expose
only diagnostics + routers.

## How a profile is chosen (resolution order)

For each request the server uses the first of these that is set
(`Sytewide_MCP_Toolsets::resolve_for_request`):

1. `X-Toolset` request header — **but this does NOT work through `mcp-remote`; see the caveat below.**
2. **`?toolset=` query parameter** on the endpoint URL.
3. The **per-key profile** stored on the matched API key (admin → Toolset).
4. The **site default** option (admin → Toolset; ships `lean`).
5. Hard default: `lean`.

In practice, because `mcp-remote` never delivers a second header (see below), the
`X-Toolset` header is unreachable for those clients and the **`?toolset=` query
parameter is the effective override** — there is no working header for it to lose
to. Don't set both a (working) header and a conflicting query param expecting the
query param to win: the header is evaluated first.

## Selecting a profile in your MCP client (`.mcp.json`)

:::warning
Use the `?toolset=` query parameter, not a header. The `mcp-remote` shim
forwards only the *first* `--header`, so a second `--header X-Toolset:...` placed
after your `X-API-Key:` header is silently dropped and the connection stays on
the site default. The query parameter rides the URL and always reaches the
server. (The server reads `X-Toolset` correctly — the limitation is purely the
`mcp-remote` client.)
:::

**Full** — all tools for every installed provider:

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

**Lean** — diagnostics + routers + common reads:

```json
"sytewide-mcp": {
  "command": "npx",
  "args": [
    "-y", "mcp-remote",
    "https://YOURSITE/wp-json/sytewide-mcp/v1/mcp?toolset=lean",
    "--header", "X-API-Key:YOUR_KEY",
    "--transport", "http-only"
  ]
}
```

Omit `?toolset=` entirely to inherit the site default.

**Task profile** — e.g. booking + cart together:

```json
"sytewide-mcp": {
  "command": "npx",
  "args": [
    "-y", "mcp-remote",
    "https://YOURSITE/wp-json/sytewide-mcp/v1/mcp?toolset=booking,cart",
    "--header", "X-API-Key:YOUR_KEY",
    "--transport", "http-only"
  ]
}
```

After editing `.mcp.json`, reconnect the server (`/mcp` → reconnect, or restart
the client). Verify with `sytewide_get_status` (reports the full registry count)
and by inspecting how many tools your client loaded.

## Setting defaults in the admin (no client edits)

Admin → **SyteWide MCP → Toolset**:

- **Site default** — the profile used when a connection sends no `?toolset` and
  its key has no per-key profile. Ships as `lean`.
- **Per-key profile** — overrides the site default for one API key. Lets you run
  a `full` automation key and a `lean` interactive key against the same site
  without touching any client config.

The page shows the live per-profile tool count next to each profile.
