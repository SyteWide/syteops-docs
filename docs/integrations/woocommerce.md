---
sidebar_position: 11
title: WooCommerce Integration
description: Enable the WooCommerce toggle so SyteOps keeps WooCommerce REST endpoints reachable under REST API Restriction.
---

# WooCommerce Integration

**Tier: Basic** — Plugin-based toggle integration. Keeps the WooCommerce REST endpoints available when SyteOps' REST API Restriction is on.

The WooCommerce integration in SyteOps is a compatibility toggle. When you enable [REST API Restriction](../features/rest-api-restriction.md) to lock down anonymous REST traffic, WooCommerce's own REST endpoints (used for authentication, extensions, and payment gateway webhooks) need to stay reachable. Turning this toggle on allows that.

## What the toggle does

- Adds WooCommerce's REST paths to the built-in allowlist when REST API Restriction is enabled, so WooCommerce continues to work normally.
- Allows WooCommerce-specific webhooks (payment gateways, third-party extensions) to reach your site.
- Has no effect when REST API Restriction is disabled — WooCommerce works either way, the toggle just protects its endpoints when the rest of your REST API is locked down.

## Setup

1. Install and activate the **WooCommerce** plugin from WordPress → Plugins.
2. Navigate to **SyteOps → Integrations**.
3. Find **WooCommerce** in the **E-Commerce** category.
4. Toggle it **ON** and click **Save Changes**.

If WooCommerce isn't installed, SyteOps disables the toggle and shows "Not Installed".

## What endpoints become reachable

When this toggle is on and REST API Restriction is enabled, WooCommerce-specific paths are allowed through:

| Path | Purpose |
|---|---|
| `/wc-auth/v1/*` | WooCommerce REST authentication handshake |
| `/wp-json/wc/*` | WooCommerce REST API (orders, products, customers) |
| `/wp-json/wc-analytics/*` | WooCommerce analytics API |
| `/wp-json/wc-admin/*` | WooCommerce admin API |

These paths are kept behind WooCommerce's own authentication — SyteOps isn't opening them up publicly, just letting WooCommerce handle its own security on those routes.

## Common use-cases

- A WooCommerce store on a site that has REST API Restriction enabled for security.
- Third-party WooCommerce extensions that need REST access (shipping apps, inventory sync, accounting integrations).
- Headless WooCommerce setups where a separate frontend fetches product data via REST.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — the feature whose allowlist this integration extends
- [Integrations Overview](overview.md)
- [Cloudflare Setup Guide](cloudflare.md) — if you also use Cloudflare in front of WooCommerce
