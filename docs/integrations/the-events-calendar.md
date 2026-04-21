---
sidebar_position: 19
title: The Events Calendar Integration
description: Enable The Events Calendar toggle to allow its REST endpoints under SyteOps REST API restriction.
---

# The Events Calendar Integration

**Tier: Basic** — Plugin-gated toggle. Adds a conditional entry to the SyteOps REST allowlist so The Events Calendar endpoints keep working when REST API restriction is enabled.

The Events Calendar integration in SyteOps exists so the plugin's public event and venue REST routes continue to function when you've locked down your REST API surface. Enabling the toggle adds the required endpoints to the allowlist; disabling it removes the carve-out.

## What the toggle does

- Adds `/wp-json/tribe/events/v1/*` to the SyteOps REST restriction allowlist.
- Hides the toggle and shows "Not Installed" when The Events Calendar plugin is not detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoints again.

## Setup

1. Install and activate The Events Calendar plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **The Events Calendar** in the **Events** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — The Events Calendar endpoints are reachable either way. The integration matters when restriction is on.

## Common use-cases

- Keep event listings and venue data accessible via REST while SyteOps REST restriction is active.
- Allow calendar frontends (themes, mobile apps, marketing pages) to read event data without disabling restriction.
- Document in your operational record that The Events Calendar is a sanctioned REST caller.

## Resources

- [The Events Calendar](https://stellarwp.pxf.io/c/1406650/1284492/9639) — vendor site.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
