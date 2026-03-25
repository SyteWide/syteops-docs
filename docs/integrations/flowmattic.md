---
sidebar_position: 1
title: FlowMattic Integration
description: How SyteOps syncs configuration to FlowMattic variables, enables multi-site deployment templates, and powers self-routing workflows.
---

# FlowMattic Integration

SyteOps and FlowMattic work as a pair. SyteOps is the configuration layer — structured, persistent, governed. FlowMattic is the execution layer. Every value you define in SyteOps becomes a FlowMattic variable your workflows can reference. Change the value in SyteOps, the workflows already know.

## What Gets Synced

Every configuration change you make in SyteOps is automatically written to FlowMattic variables:

- User names, emails, phone numbers, and CRM IDs
- Role assignments and aggregator groups (all names, all emails, Slack handles)
- CRM system names, codes, and configuration
- API keys and integration credentials (available to workflows, not displayed in plain text)
- Variable set values (static, dynamic, and grouped RSVS sets)
- Module-specific data from active modules

The result: your workflows always have access to current data. No manual FlowMattic variable management.

## Requirements

- FlowMattic must be installed and activated
- FlowMattic must have a valid license
- SyteOps handles FlowMattic installation and activation during Initial Setup if needed

## Deployment Templates

One of the most powerful applications of SyteOps + FlowMattic is **deployable workflow templates**.

**The pattern:**
1. Build your FlowMattic workflows referencing SyteOps variable names (e.g., `syteops_user_001_email`, `syteops_std_systm_contact_project_manager_all_emails`)
2. Export your SyteOps configuration and your FlowMattic workflows
3. Import both on a new site — SyteOps populates the variables, FlowMattic picks them up
4. Fill in the site-specific user and CRM data in SyteOps
5. The workflows are live and accurate without any workflow editing

This is how agencies deploy standardized automation across client sites without rebuilding from scratch. The workflow logic is a template; SyteOps provides the data layer that makes it site-specific.

## How Sync Works

- **Automatic** — Changes save to FlowMattic immediately when you click Save
- **Non-destructive** — Empty values are never written (prevents accidental data loss in FlowMattic)
- **Module-aware** — When a module is deactivated, its FlowMattic variables are cleaned up; when re-activated, they are restored
- **Async pipeline** — Saves enqueue a sync job; the worker processes the sync without blocking your save response

### Blank-Save Behavior

- **Standard module variables and Users**: Blank save deletes the variable from FlowMattic
- **Suffix families** (Module Custom, Flow Custom, Dynamic, CRM combined): Save-only; explicit Delete action required to remove

## Manual Resync

If FlowMattic variables get out of sync (rare — typically after an import or restore), use the **Resync All Variables** button to re-synchronize all variable types:

1. Navigate to the **System/API tab** or **Debug Tool**
2. Click **Resync All Variables**
3. All variable types are re-pushed from SyteOps options to FlowMattic

## Find & Replace in Workflow Definitions

When you need to update a value inside FlowMattic workflow definitions themselves (not SyteOps variables), the **Debug Tool** provides a safe Find & Replace:

- Targets workflow history data or saved workflow definitions (steps and settings only — titles are never modified)
- Preview all matches before making any changes
- Batched execution with JSON backups created automatically before each batch
- Cancel mid-execution if needed

This is useful after domain migrations, credential rotations, or rebranding.

## Compatibility Sentinel

SyteOps checks that FlowMattic is available before any dependent operation. If FlowMattic is deactivated or unavailable, dependent features are safely gated — they won't fail silently or corrupt data.

## Variable Naming Conventions

All SyteOps-managed FlowMattic variables use the `syteops_` prefix. Example patterns:

| Pattern | Data |
|---|---|
| `syteops_user_001_name` | User 001 display name |
| `syteops_user_001_email` | User 001 email |
| `syteops_user_owner_email` | Current Site Owner email |
| `syteops_user_contact_tech_email` | Current Technical Contact email |
| `syteops_std_systm_contact_{slug}_all_emails` | All emails for a custom role |
| `syteops_std_crm_001_name` | CRM 001 name |
| `syteops_{tab_acronym}_svs_{suffix}` | Variable Set value |

Use these names in your FlowMattic workflow conditions, actions, and mappings.

## Sensitive Variable Masking

API keys and secrets synced to FlowMattic are masked in the FlowMattic variable display. They are available for use in workflows but are not surfaced as readable values in the FlowMattic admin interface.

## Troubleshooting

**FlowMattic variables not updating:**
1. Verify FlowMattic is activated and licensed
2. Try the **Resync All Variables** button
3. Check that the Compatibility Sentinel is not blocking (visible warning if so)

**FlowMattic not installing during setup:**
1. Ensure your server can reach WordPress.org
2. Check file permissions in `/wp-content/plugins/`
3. Try installing FlowMattic manually, then return to SyteOps setup
