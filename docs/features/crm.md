---
sidebar_position: 3
title: CRM Management
description: Configuring CRM systems, platform selection, and CRM variables in SyteOps.
---

# CRM Management

The CRM tab provides centralized configuration for your CRM systems, team communication platforms, and booking platforms. All CRM data syncs to FlowMattic variables for use in workflow automation.

## CRM Count

Set the number of CRM systems you use (0–15) using the CRM Count selector at the top of the tab. Each CRM gets its own set of configuration fields. Changing the count requires saving to take effect.

Setting the count to **0** removes all CRM entries without deleting stored data.

## CRM Fields

Each configured CRM has these fields:

| Field | Description |
|---|---|
| **CRM Name** | Display name for this CRM system (e.g., "HubSpot", "Salesforce") |
| **CRM Code** | Read-only identifier derived from the CRM Variables section |
| **CRM Link (URL)** | Optional link to the CRM system's dashboard |
| **Admin-Only** | Toggle to hide this CRM's menu link from non-SyteOps Admin users |
| **CRM API Key** | API key for this CRM (stored encrypted, never displayed) |
| **CRM API Secret** | API secret for this CRM (stored encrypted, never displayed) |

### API Credentials

API keys and secrets are encrypted at rest and never displayed in the interface. A "Configured (hidden)" indicator shows when a value is stored. To remove a stored credential, use the "Clear on save" toggle and save.

## Platform Selection

At the top of the CRM Management card, you can designate your primary platforms:

- **Primary Communication Platform** — Your team communication tool (Slack, depending on which integrations are enabled)
- **Primary Booking Platform** — Your booking system (Fluent Booking, when enabled)

Platform options are only available when their corresponding integrations are enabled in the Integrations tab. Disabled integrations are shown for reference.

## CRM Variables

The CRM Variables section at the bottom of the tab uses the **RSVS (Related Static Variable Set)** pattern to create FlowMattic variables for each CRM system.

### How It Works

- CRM Variables automatically sync with your CRM Count — adding a CRM creates a matching variable set entry
- Each set's label is pre-populated from the CRM Name
- The **Set Code** (editable in the CRM Variables section) becomes the read-only **CRM Code** in the CRM fields above
- Variables sync to FlowMattic on save for use in workflows

### Editing Set Codes

To change a CRM's code:
1. Edit the code in the CRM Variables section
2. Click **Save Set Code**
3. The CRM Code field in the CRM fields above updates automatically

## Backup and Restore

Export and import controls are available at the bottom of the CRM tab. Use these to back up your CRM configuration or transfer settings between sites.
