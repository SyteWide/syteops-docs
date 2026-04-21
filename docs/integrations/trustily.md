---
sidebar_position: 23
title: Trustily Integration
description: Enable the Trustily toggle and save your Trustily page URL so SyteOps can link reputation and trust signals consistently.
---

# Trustily Integration

**Tier: Basic** — Toggle-only integration with a single stored URL. Marks Trustily as the reputation provider for your operation and keeps your Trustily page URL centralized.

The Trustily integration in SyteOps is a **toggle** — enabling it signals that your operation uses Trustily for reputation and trust signals. When enabled, the Trustily page URL you save on the General tab is available as a FlowMattic variable and a canonical reference inside SyteOps.

## What the toggle does

- Marks Trustily as the active reputation provider in SyteOps.
- Unlocks the **Trustily Page URL** field (stored as `company_trustily_page_url` on the General tab).
- Keeps the URL available to FlowMattic as a variable for link insertion, email signatures, or public widgets.

## Setup

1. Sign in to your Trustily workspace and copy the public URL for your reputation page.
2. Navigate to **SyteOps → Integrations**.
3. Find **Trustily** in the **Branding & Reputation** category.
4. Toggle it **ON** and click **Save Changes**.
5. Open the **General** tab, paste the URL into **Trustily Page URL**, and save.

Trustily is a SaaS service — there's no WordPress plugin to install, so turning the toggle on is enough.

## Common use-cases

- Insert your Trustily reputation link into FlowMattic-driven emails, signatures, or landing pages.
- Keep a single canonical reputation URL that the rest of the operation references instead of copy/pasting.
- Drive Slack / Monday.com notifications on new Trustily reviews via FlowMattic.

## Resources

- [Trustily](https://trustily.io) — vendor site.

## Related

- [Integrations Overview](overview.md) — all supported integrations
- [FlowMattic Integration](flowmattic.md) — how the Trustily URL reaches workflows
