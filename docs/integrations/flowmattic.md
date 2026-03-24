---
sidebar_position: 1
title: FlowMattic Integration
description: Setting up and using FlowMattic workflow automation with SyteOps.
---

# FlowMattic Integration

SyteOps integrates with FlowMattic to sync your configuration data and power automated business workflows.

## What It Does

Every configuration change you make in SyteOps is automatically written to FlowMattic variables. This means your workflow automations always have access to current data without manual updates.

**Examples of synced data:**
- User names, emails, phone numbers
- CRM IDs and API credentials
- Role assignments
- Module configuration
- Variable set values
- Integration settings

## Requirements

- FlowMattic must be installed and activated
- FlowMattic must have a valid license
- SyteOps handles installation/activation during Initial Setup if needed

## How Sync Works

- **Automatic** — Changes save to FlowMattic immediately when you click Save
- **Non-destructive** — Empty values are never written (prevents accidental data loss)
- **Module-aware** — When a module is deactivated, its FlowMattic variables are cleaned up; when re-activated, they are restored

### Blank-Save Behavior

- **Standard module variables and Users**: Blank save deletes the variable from FlowMattic
- **Suffix families** (Module Custom, Flow Custom, Dynamic, CRM combined): Save-only; explicit Delete action required to remove

## Manual Resync

If FlowMattic variables get out of sync (rare), use the **Resync All Variables** button to re-synchronize all variable types from SyteOps options to FlowMattic.

## Compatibility Sentinel

SyteOps checks that FlowMattic is available before any dependent operation. If FlowMattic is deactivated or unavailable, dependent features are safely gated — they won't fail silently or corrupt data.

## Troubleshooting

**FlowMattic variables not updating:**
1. Verify FlowMattic is activated and licensed
2. Try the **Resync All Variables** button
3. Check that the Compatibility Sentinel is not blocking (visible warning if so)

**FlowMattic not installing during setup:**
1. Ensure your server can reach WordPress.org
2. Check file permissions in `/wp-content/plugins/`
3. Try installing FlowMattic manually, then return to SyteOps setup
