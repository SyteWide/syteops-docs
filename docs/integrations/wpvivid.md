---
sidebar_position: 20
title: WPVivid Integration
description: Enable the WPVivid toggle to coordinate backup controls and optionally suppress WPVivid's recovery email from the Admin tab.
---

# WPVivid Integration

**Tier: Basic** — Toggle-only integration with a single companion setting. Enables SyteOps coordination with a locally installed WPVivid backup plugin.

The WPVivid integration in SyteOps is a **toggle** — enabling it signals that your site relies on WPVivid for backups and unlocks a small set of WPVivid-related admin controls. The toggle is plugin-gated: the WPVivid plugin must be installed and active for SyteOps to allow activation.

## What the toggle does

- Marks WPVivid as the active backup utility in SyteOps.
- Unlocks the **Suppress WPVivid Recovery Emails** control on the Admin tab.
- Hides the toggle and shows "Not Installed" when the WPVivid plugin is not detected.

## Setup

1. Install and activate the WPVivid plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **WPVivid** in the **Backup & Utilities** category.
4. Toggle it **ON** and click **Save Changes**.

## Configuration

With the integration enabled, visit **SyteOps → Admin** to configure related behavior:

- **Suppress WPVivid Recovery Emails** — when checked, SyteOps intercepts the recovery notification email WPVivid sends after a successful backup so it doesn't clutter your inbox. Leave unchecked to receive the standard WPVivid notification.

## Common use-cases

- Keep WPVivid running for backups while silencing the recovery email noise.
- Coordinate SyteOps-driven notifications (Slack, email) around backup completion.
- Declare WPVivid as the operation's backup utility for documentation purposes.

## Resources

- [WPVivid](https://wpvivid.com/ref/1254/) — vendor site.

## Related

- [Integrations Overview](overview.md) — all supported integrations
- [FlowMattic Integration](flowmattic.md) — how backup-related events reach automations
