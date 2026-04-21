---
sidebar_position: 18
title: WP Full Picture Integration
description: Enable the WP Full Picture toggle to allow its data sender REST endpoint under SyteOps REST API restriction.
---

# WP Full Picture Integration

**Tier: Basic** — Plugin-gated toggle. Adds a conditional entry to the SyteOps REST allowlist so WP Full Picture's data sender endpoint keeps working when REST API restriction is enabled.

The WP Full Picture integration in SyteOps exists so the plugin's data-sender REST route continues to function when you've locked down your REST API surface with SyteOps. Enabling the toggle adds the required endpoint to the allowlist; disabling it removes the carve-out.

## What the toggle does

- Adds `/wp-json/fupi/v1/sender` to the SyteOps REST restriction allowlist.
- Hides the toggle and shows "Not Installed" when neither the free WP Full Picture nor WP Full Picture Premium plugin is detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoint again.

## Setup

1. Install and activate the WP Full Picture plugin (free or premium) if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **WP Full Picture** in the **Analytics & SEO** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — WP Full Picture's endpoint is reachable either way. The integration matters when restriction is on.

## Common use-cases

- Keep analytics data flowing from WP Full Picture while SyteOps REST restriction is active.
- Toggle access cleanly when debugging restriction-related issues.
- Document in your operational record that WP Full Picture is a sanctioned REST caller.

## Resources

- [WP Full Picture](https://r.freemius.com/5405/7092390/) — vendor site.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
