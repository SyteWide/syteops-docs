---
sidebar_position: 13
title: Google Site Kit Integration
description: Enable the Google Site Kit toggle so its REST endpoints stay reachable under REST API Restriction.
---

# Google Site Kit Integration

**Tier: Basic** — Plugin-based toggle integration. Keeps the Google Site Kit REST endpoints available when SyteOps' REST API Restriction is on.

The Google Site Kit integration in SyteOps is a compatibility toggle. Site Kit relies on its own REST endpoints to communicate with Google's services (Search Console, Analytics, PageSpeed Insights, AdSense, Tag Manager). When SyteOps' REST API Restriction is enabled to block anonymous REST traffic, Site Kit needs to stay reachable — this toggle ensures that.

## What the toggle does

- Adds Site Kit's REST paths to the allowlist when REST API Restriction is enabled.
- Lets Google Site Kit continue to sync analytics, search data, and other Google service data into your WordPress admin.
- Has no effect when REST API Restriction is off — Site Kit works either way, the toggle just keeps it reachable when the rest of your REST API is restricted.

## Setup

1. Install and activate the **Google Site Kit** plugin from WordPress → Plugins.
2. Navigate to **SyteOps → Integrations**.
3. Find **Google Site Kit** in the **Analytics & SEO** category.
4. Toggle it **ON** and click **Save Changes**.

If Site Kit isn't installed, SyteOps disables the toggle and shows "Not Installed".

## What endpoints become reachable

When this toggle is on and REST API Restriction is enabled, Site Kit's REST paths are allowed through:

| Path | Purpose |
|---|---|
| `/wp-json/google-site-kit/*` | Google Site Kit REST API |

Site Kit handles its own authentication through Google's OAuth flow — SyteOps just keeps the endpoints reachable so Site Kit can do its own security work.

## Common use-cases

- Sites using Site Kit to display Google Analytics or Search Console data inside WordPress.
- Sites where REST API Restriction is enabled for security but you want to keep Site Kit's integrations functioning.

## Related

- [REST API Restriction](../features/rest-api-restriction.md)
- [Integrations Overview](overview.md)
