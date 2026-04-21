---
sidebar_position: 25
title: Pulsetic Integration
description: Enable the Pulsetic toggle to surface uptime status and badges in the SyteOps admin.
---

# Pulsetic Integration

**Tier: Basic** — Toggle-only integration. Marks Pulsetic as the uptime monitoring provider for your operation.

The Pulsetic integration in SyteOps is a **toggle** — enabling it signals that your operation uses Pulsetic for uptime monitoring. The toggle does not install anything locally; Pulsetic remains a hosted SaaS service.

## What the toggle does

- Marks Pulsetic as the active uptime monitoring provider in SyteOps.
- Keeps Pulsetic-related workflow pieces available for FlowMattic handoffs (e.g., alerting on downtime).
- Hides Pulsetic controls from admin views when toggled off.

## Setup

1. Create or sign in to your Pulsetic account at the vendor site below.
2. Navigate to **SyteOps → Integrations**.
3. Find **Pulsetic** in the **Uptime & Feedback** category.
4. Toggle it **ON** and click **Save Changes**.

Pulsetic is a SaaS service — there's no WordPress plugin to install, so turning the toggle on is enough.

## Common use-cases

- Forward Pulsetic downtime alerts into Slack, Monday.com, or email via FlowMattic.
- Maintain an operational record of which sites you monitor with Pulsetic.
- Coordinate uptime badges or status pages referenced from your marketing site.

## Resources

- [Pulsetic](https://pulsetic.com/?fpr=chet39) — vendor site.

## Related

- [Integrations Overview](overview.md) — all supported integrations
- [FlowMattic Integration](flowmattic.md) — how Pulsetic alerts can drive workflows
