---
sidebar_position: 15
title: Documentero Integration
description: Enable the Documentero toggle and store your Documentero ID and API key so FlowMattic workflows can generate and send documents.
---

# Documentero Integration

**Tier: Basic** — Toggle-only integration with stored credentials. Flips Documentero on as a supported document-generation channel and keeps your Documentero credentials available to FlowMattic.

The Documentero integration signals that your operation uses Documentero for programmatic document generation and outbound delivery. Actual document rendering is performed by FlowMattic workflows using SyteOps-synced credentials.

## What the toggle does

- Marks Documentero as a supported document-generation channel inside SyteOps.
- Keeps your Documentero ID and API key available to FlowMattic as variables.
- Hides the credential fields from client-facing admin views when toggled off (your saved values are preserved).

## Setup

1. Navigate to **SyteOps → Integrations**.
2. Find **Documentero** in the **Forms & Automation** category.
3. Toggle it **ON** and click **Save Changes**.
4. Open the **System / API** tab and fill in:
   - **Documentero ID** — your Documentero workspace identifier.
   - **Documentero API Key** — generated in the Documentero dashboard.
5. Save. The API key is encrypted at rest and pushed to FlowMattic as a variable.

Documentero is a SaaS / API integration — there's no WordPress plugin to detect, so turning the toggle on is enough.

## Connect Documentero to your FlowMattic workflow

1. In FlowMattic, open the workflow that should generate or send a document.
2. Add a **Webhook / HTTP Request** step:
   - Reference the SyteOps-synced Documentero ID and API key variables.
   - Build the Documentero render request per the Documentero API docs.
3. Save and run a test.

## Common use-cases

- Generate estimates or invoices from SyteOps-captured data.
- Produce onboarding packets when a new user is created.
- Render branded reports on a schedule and email them.

## Resources

- [Documentero](https://documentero.com) — vendor site.

## Related

- [FlowMattic Integration](flowmattic.md) — how your Documentero credentials reach workflows
- [Integrations Overview](overview.md) — all supported integrations
