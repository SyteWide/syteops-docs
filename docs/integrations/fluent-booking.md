---
sidebar_position: 14
title: Fluent Booking Integration
description: Enable the Fluent Booking toggle so SyteOps can coordinate appointment and scheduling workflows with your Fluent Booking install.
---

# Fluent Booking Integration

**Tier: Basic** — Toggle-only integration. Flips Fluent Booking on as a supported scheduling source and keeps its workflow surface available to FlowMattic.

The Fluent Booking integration in SyteOps is a **toggle** — enabling it signals that your operation uses Fluent Booking for appointments and scheduling. The toggle is plugin-gated: the Fluent Booking plugin must be installed and active on the site before SyteOps lets you turn it on.

## What the toggle does

- Marks Fluent Booking as an active integration in SyteOps.
- Keeps Fluent Booking-related workflow pieces available to FlowMattic when you orchestrate booking handoffs.
- Hides the toggle and shows "Not Installed" when the Fluent Booking plugin is not detected.

## Setup

1. Install and activate the Fluent Booking plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **Fluent Booking** in the **Booking** category.
4. Toggle it **ON** and click **Save Changes**.

Because Fluent Booking is plugin-based, SyteOps verifies the plugin is active before allowing the toggle to flip.

## Common use-cases

- Notify a Slack channel when a new booking is created or rescheduled.
- Sync booking contacts into your CRM via FlowMattic.
- Generate follow-up emails for missed or cancelled appointments.
- Trigger role changes when a booking is completed.

## Resources

- [Fluent Booking](https://fluentbooking.com/?ref=2539) — vendor site.

## Related

- [FlowMattic Integration](flowmattic.md) — how SyteOps variables reach your workflows
- [Integrations Overview](overview.md) — all supported integrations
