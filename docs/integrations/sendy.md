---
sidebar_position: 17
title: Sendy Integration
description: Enable the Sendy toggle and store your Sendy API key and primary list ID so FlowMattic workflows can push subscribers and send campaigns.
---

# Sendy Integration

**Tier: Basic** — Toggle-only integration with stored credentials. Flips Sendy on as a supported email channel and keeps your API key and list ID available to FlowMattic.

The Sendy integration signals that your operation uses Sendy for newsletter and campaign delivery. Actual subscriber syncing and campaign sending is performed by FlowMattic workflows using SyteOps-synced variables that hold your Sendy credentials.

## What the toggle does

- Marks Sendy as a supported email channel inside SyteOps.
- Keeps your Sendy API key and primary list ID available to FlowMattic as variables.
- Hides the credential fields from client-facing admin views when toggled off (your saved values are preserved).

## Setup

1. Navigate to **SyteOps → Integrations**.
2. Find **Sendy** in the **Email & Delivery** category.
3. Toggle it **ON** and click **Save Changes**.
4. Open the **System / API** tab and fill in:
   - **Sendy API Key** — generated in your Sendy admin under Settings.
   - **Sendy Primary List ID** — the list ID you want to treat as the default destination.
5. Save. Both values are encrypted at rest and pushed to FlowMattic as variables.

Sendy is a SaaS / self-hosted app — there's no WordPress plugin to detect, so turning the toggle on is enough.

## Connect Sendy to your FlowMattic workflow

1. In FlowMattic, open the workflow that should add a subscriber or send a campaign.
2. Add a **Webhook / HTTP Request** step:
   - Reference the SyteOps-synced Sendy API key and list ID variables.
   - Build the Sendy subscribe or campaign request per the Sendy API docs.
3. Save and run a test.

## Common use-cases

- Add new SyteOps users to a Sendy list for onboarding drip campaigns.
- Send campaign handoffs from form submissions captured by Fluent Forms.
- Maintain a transactional Sendy list for system notifications.

## Resources

- [Sendy](https://sendy.co/?ref=J23hM) — vendor site.

## Related

- [FlowMattic Integration](flowmattic.md) — how your Sendy credentials reach workflows
- [Integrations Overview](overview.md) — all supported integrations
