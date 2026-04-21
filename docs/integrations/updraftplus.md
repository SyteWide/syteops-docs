---
sidebar_position: 21
title: UpdraftPlus Integration
description: Enable the UpdraftPlus toggle to mark UpdraftPlus as your active backup utility in SyteOps.
---

# UpdraftPlus Integration

**Tier: Basic** — Toggle-only integration. Marks UpdraftPlus as the active backup utility for your site.

The UpdraftPlus integration in SyteOps is a **toggle** — enabling it signals that your site relies on UpdraftPlus for backup and restore operations. The toggle is plugin-gated: the UpdraftPlus plugin must be installed and active on the site before SyteOps lets you turn it on.

## What the toggle does

- Marks UpdraftPlus as the active backup utility inside SyteOps.
- Keeps UpdraftPlus-related workflow pieces available to FlowMattic when you orchestrate backup or restore automations.
- Hides the toggle and shows "Not Installed" when the UpdraftPlus plugin is not detected.

## Setup

1. Install and activate the UpdraftPlus plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **UpdraftPlus** in the **Backup & Utilities** category.
4. Toggle it **ON** and click **Save Changes**.

There is no further SyteOps configuration — backup scheduling, storage destinations, and restore behavior continue to live inside the UpdraftPlus settings screens.

## Common use-cases

- Declare UpdraftPlus as the operation's canonical backup utility.
- Coordinate SyteOps notifications around UpdraftPlus backup events via FlowMattic.
- Keep the operational record of "what backs up this site" aligned with reality.

## Resources

- [UpdraftPlus](https://teamupdraft.com/ref/3789/) — vendor site.

## Related

- [Integrations Overview](overview.md) — all supported integrations
- [FlowMattic Integration](flowmattic.md) — how backup events can drive workflows
