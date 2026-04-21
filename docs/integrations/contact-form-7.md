---
sidebar_position: 16
title: Contact Form 7 Integration
description: Enable the Contact Form 7 toggle to allow its feedback submission REST endpoints under SyteOps REST API restriction.
---

# Contact Form 7 Integration

**Tier: Basic** — Plugin-gated toggle. Adds a conditional entry to the SyteOps REST allowlist so Contact Form 7 submissions keep working when REST API restriction is enabled.

The Contact Form 7 integration in SyteOps exists so the plugin's public feedback submission endpoint continues to function when you've locked down your REST API surface. Enabling the toggle adds the required endpoint to the allowlist; disabling it removes the carve-out.

## What the toggle does

- Adds `/wp-json/contact-form-7/v1/contact-forms/*/feedback` to the SyteOps REST restriction allowlist.
- Hides the toggle and shows "Not Installed" when the Contact Form 7 plugin is not detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoint again.

## Setup

1. Install and activate the Contact Form 7 plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **Contact Form 7** in the **Forms & Automation** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — Contact Form 7 submissions are reachable either way. The integration matters when restriction is on.

## Common use-cases

- Keep public forms accepting submissions while SyteOps REST restriction is active.
- Unblock contact-form entries on marketing and landing pages without opening the rest of the REST API.
- Document in your operational record that Contact Form 7 is a sanctioned REST caller.

## Resources

- [Contact Form 7](https://contactform7.com) — vendor site.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
