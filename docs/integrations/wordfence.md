---
sidebar_position: 12
title: Wordfence Integration
description: Enable the Wordfence toggle so the Wordfence authentication endpoint stays reachable under REST API Restriction.
---

# Wordfence Integration

**Tier: Basic** — Plugin-based toggle integration. Keeps the Wordfence authentication endpoint available when SyteOps' REST API Restriction is on.

The Wordfence integration in SyteOps is a compatibility toggle. When you enable [REST API Restriction](../features/rest-api-restriction.md), it blocks anonymous REST traffic by default. Wordfence uses a specific authentication endpoint that needs to remain reachable for Wordfence's security features to work — this toggle ensures that.

## What the toggle does

- Adds the Wordfence authentication endpoint to the REST allowlist when REST API Restriction is enabled.
- Lets Wordfence continue to receive its own security-related requests without being blocked by SyteOps' restriction.
- Has no effect when REST API Restriction is off — Wordfence works either way, the toggle just preserves Wordfence's access when everything else is locked down.

## Setup

1. Install and activate the **Wordfence** plugin from WordPress → Plugins.
2. Navigate to **SyteOps → Integrations**.
3. Find **Wordfence** in the **Security** category.
4. Toggle it **ON** and click **Save Changes**.

If Wordfence isn't installed, SyteOps disables the toggle and shows "Not Installed".

## What endpoint becomes reachable

When this toggle is on and REST API Restriction is enabled, the following path is allowed through:

| Path | Purpose |
|---|---|
| `/wp-json/wordfence/v1/authenticate` | Wordfence authentication handshake |

Wordfence verifies its own requests against this endpoint — SyteOps isn't weakening Wordfence's security, just keeping the one endpoint it needs open.

## Common use-cases

- Sites running both Wordfence and SyteOps REST API Restriction.
- Security-heavy configurations where you want the REST API locked down but Wordfence's paid features (like Country Blocking or Real-Time IP List) still functioning.

## Related

- [REST API Restriction](../features/rest-api-restriction.md)
- [Integrations Overview](overview.md)
- [Cloudflare Setup Guide](cloudflare.md) — if you stack Cloudflare in front of Wordfence
