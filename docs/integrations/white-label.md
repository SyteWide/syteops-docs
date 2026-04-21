---
sidebar_position: 22
title: White Label Integration
description: Enable the White Label toggle to customize the plugin name and admin label used throughout the SyteOps interface.
---

# White Label Integration

**Tier: Basic** — Toggle-only integration with two companion text fields. Rebrands the SyteOps admin experience using names you choose.

The White Label integration replaces the literal "SyteOps" brand strings in the admin UI with values you configure. Client-facing administrators see your custom name; the underlying plugin identity is unchanged.

## What the toggle does

- Enables the **White Label Plugin Name** and **White Label Admin Label** fields on the Admin tab.
- Routes admin UI strings through `syte_white_label_plugin_name()` / `syte_white_label_admin_name()`, which return your custom values when white-label mode is on.
- Hides the fields from view when toggled off (your saved values are preserved).

## Setup

1. Navigate to **SyteOps → Integrations**.
2. Find **White Label** in the **Branding & Reputation** category.
3. Toggle it **ON** and click **Save Changes**.
4. Open **SyteOps → Admin** and set:
   - **White Label Plugin Name** — what replaces "SyteOps" in the plugin list and main page titles.
   - **White Label Admin Label** — what replaces "SyteOps Administrator" and similar role strings in admin UI.
5. Save.

White Label is a SyteOps-internal integration — there's no external plugin or vendor to install.

## What it does not change

- The internal text domain, option keys, file paths, or developer-visible names. White label affects UI text only.
- The WordPress admin bar's SyteOps-owned screens are still served from the same routes — only the labels change.
- Mentions of "FluentCart" and internal brands stay where they are; customization is scoped to SyteOps-owned strings.

## Common use-cases

- Agencies relabeling SyteOps to match their internal operations brand.
- White-label deployments where clients should not see the SyteOps identity.
- Staged environments where you want a visual cue (e.g., "SyteOps STAGING") to distinguish from production.

## Related

- [Integrations Overview](overview.md) — all supported integrations
- [White Label feature page](../features/white-label.md) — deeper reference
