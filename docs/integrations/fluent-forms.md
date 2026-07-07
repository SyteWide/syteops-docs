---
sidebar_position: 10
title: Fluent Forms Integration
description: Enable the Fluent Forms toggle so SyteOps can coordinate form capture and automation handoff into your FlowMattic workflows.
---

# Fluent Forms Integration

**Tier: Basic** — Plugin-based toggle integration. Turning it on signals that SyteOps should coordinate with Fluent Forms and expose form-related configuration.

The Fluent Forms integration pairs SyteOps with the Fluent Forms plugin to route form submissions into your automated workflows. SyteOps doesn't submit forms itself — it tells your workflows which forms matter, and FlowMattic processes the submission data.

## What the toggle does

- Enables Fluent Forms-related configuration and workflow hooks inside SyteOps.
- Keeps form-related SyteOps variables (form IDs, field mappings) available to FlowMattic.

## Setup

1. Install and activate the **Fluent Forms** plugin from WordPress → Plugins.
2. Navigate to **SyteOps → Integrations**.
3. Find **Fluent Forms** in the **Forms & Automation** category.
4. Toggle it **ON** and click **Save Changes**.

If Fluent Forms isn't installed, SyteOps disables the toggle and shows "Not Installed" until you install the plugin.

## Connect Fluent Forms to your FlowMattic workflow

1. In WordPress, create or identify the Fluent Forms form whose submissions should trigger a workflow.
2. In Fluent Forms settings for that form, add an integration that sends submissions to a FlowMattic webhook URL (or use the built-in FlowMattic integration if available).
3. In FlowMattic, open the receiving workflow and process the form payload — combining it with SyteOps variables (user, role, CRM data) as needed.
4. Save the workflow and run a test submission.

## Common use-cases

- Onboarding forms that create users or assign roles in SyteOps via FlowMattic.
- Client intake forms that populate CRM fields.
- Contact or quote forms that Lead Attribution auto-detects to capture and attribute leads.
- Support ticket intake that routes to the right role (using SyteOps aggregator variables).

## Related

- [FlowMattic Integration](flowmattic.md)
- [Integrations Overview](overview.md)
- [Module Guides](../features/modules/module-guides.md)
