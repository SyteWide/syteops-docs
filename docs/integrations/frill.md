---
sidebar_position: 24
title: Frill Integration
description: Enable the Frill toggle to surface your Frill changelog and release stream in the SyteOps admin.
---

# Frill Integration

**Tier: Basic** — Toggle-only integration. Marks Frill as the feedback/changelog provider for your operation.

The Frill integration in SyteOps is a **toggle** — enabling it signals that your operation uses Frill for changelog updates and feedback. Frill is a hosted SaaS service; the toggle does not install anything locally.

## What the toggle does

- Marks Frill as the active changelog/feedback provider in SyteOps.
- Keeps Frill-related workflow pieces available for FlowMattic handoffs.
- Hides the Frill controls from admin views when toggled off.

## Setup

1. Create or sign in to your Frill workspace at the vendor site below.
2. Navigate to **SyteOps → Integrations**.
3. Find **Frill** in the **Uptime & Feedback** category.
4. Toggle it **ON** and click **Save Changes**.

Frill is a SaaS service — there's no WordPress plugin to install, so turning the toggle on is enough.

## Common use-cases

- Display a shared product changelog to admins and clients.
- Capture feature requests from operators without leaving the admin.
- Broadcast release notes when you ship a SyteOps or internal-product update.

## Resources

- [Frill](https://frill.co) — vendor site.

## Related

- [Integrations Overview](overview.md) — all supported integrations
- [FlowMattic Integration](flowmattic.md) — how Frill events can drive workflows
