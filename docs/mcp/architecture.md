---
title: Architecture
sidebar_position: 4
description: The tool registry, provider detection probes, passthrough routers, and toolset profiles.
---

# Architecture

## The tool registry

A single **tool registry** is the source of truth for all MCP interactions. It is built at plugin load time and drives both MCP protocol operations:

- **`tools/list`** — returns the paginated set of tools currently in the registry (cursor-paginated per MCP 2024-11-05)
- **`tools/call`** — looks up the named tool in the registry, enforces the declared WordPress capability, and dispatches to the provider handler

Because the registry is built at load time, the tool surface is stable for the lifetime of a request and consistent across list and call operations. No tool can be called that was not listed, and no tool is listed that cannot be called.

## Providers and `is_available()` detection

The 386-tool catalog is split across **18 providers**. Before any tool from a provider enters the registry, the provider's `is_available()` method is evaluated. This check is a lightweight PHP probe against already-loaded WordPress state — no HTTP calls or database queries.

Providers whose probe returns false are excluded entirely from the registry. This is how the live tool count adapts per site without any manual configuration.

| Provider | Detection probe |
|----------|----------------|
| FluentCRM | `function_exists('FluentCrmApi')` or `defined('FLUENTCRM')` |
| FlowMattic | `defined('FLOWMATTIC_VERSION')` |
| Squirrly SEO | `class_exists('SQ_Classes_ObjController')` |
| Fluent SMTP | `function_exists('fluentMailGetSettings')` or `defined('FLUENTMAIL_PLUGIN_VERSION')` |
| Fluent Community | `defined('FLUENT_COMMUNITY_PLUGIN_VERSION')` |

:::note Other providers
WordPress core providers (content, taxonomies, media, users, comments, plugins) are always available and use no external probe — they depend only on WordPress itself being present.
:::

:::tip Checking the live count
Call `sytewide_get_status` on a connected site to see how many tools the current registry contains. The count reflects which providers passed their `is_available()` check on that specific site.
:::

## Passthrough routers

Two categories of tools are **always included in every toolset profile**, regardless of how narrow the profile is:

- **`_request` tools** (e.g., `fcrm_request`, `fcart_request`, `fflow_request`) — raw passthrough to the underlying plugin's REST API
- **`_list_routes` tools** (e.g., `fcrm_list_routes`, `fcart_list_routes`) — enumerate the available REST routes for a provider

This design means a lean profile (e.g., one that exposes only content tools) still provides full REST reach into every active provider through the passthrough routers. A client is never locked out of provider data solely because a profile does not include that provider's curated tools.

Passthrough tools still require the underlying provider to pass its `is_available()` check. A passthrough for FlowMattic is not registered on a site where FlowMattic is not installed.

## Toolset profiles

A toolset profile is a named filter that restricts which tools appear in `tools/list` and which can be called. Profiles serve two purposes:

1. **Reduce cognitive load** — a client focused on CRM tasks does not need to sift through 297 tools; a `crm` profile surfaces only FluentCRM tools plus the universal passthrough routers.
2. **Reduce attack surface** — a key scoped to a `content` profile cannot accidentally update subscriptions or process payouts, even if the holder has the underlying WordPress capabilities.

Profiles are selected at connection time via the `?toolset=` query parameter on the MCP URL, or assigned as a default on an individual API key. See [Toolset profiles](./toolset-profiles) for the built-in profile definitions and how to define custom ones.

:::warning Profile does not override capability gating
A permissive profile does not grant capabilities. Every `tools/call` still enforces the WordPress capability declared by the tool against the WordPress user associated with the API key. See [Authentication and security](./authentication) for details.
:::
