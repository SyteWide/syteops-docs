---
sidebar_position: 1
title: Plugin Overview
description: Complete feature guide for SyteOps — WordPress management, FlowMattic automation, multi-site control, REST security, and more.
---

# Plugin Overview

SyteOps is the operational platform for WordPress agencies and power operators. It centralizes users, roles, CRM data, API connections, and security settings into one structured hub — and syncs everything to FlowMattic so your automations always reflect your actual configuration.

If you manage multiple sites, build complex FlowMattic workflows, or want your WordPress backend locked down and repeatable, SyteOps is the layer that makes it all work together.

## FlowMattic Integration

Every piece of configuration you store in SyteOps — users, roles, CRM systems, API keys, custom variables — becomes a ready-to-use FlowMattic variable. Change a value in SyteOps, the variable updates automatically. No manual syncing, no stale workflow data.

- All configuration data syncs to FlowMattic variables on save
- Non-destructive **Resync All Variables** to re-align after any import or restore
- **Find & Replace** across FlowMattic workflow definitions (with preview and backups)
- Compatibility sentinel ensures FlowMattic is available before dependent operations run
- Sensitive credential values are masked in the FlowMattic variable surface

## Multi-Site Server Management

Issue management connections from a central SyteOps server to any number of endpoint WordPress sites. Remote-control each endpoint without logging into it.

From the server dashboard you can:
- Scan endpoint status and connection health
- Control REST API restriction settings remotely
- Enable or disable Debug and Logging modes
- Deploy FlowMattic workflows to endpoints
- Manage installed plugins — view, install, delete (with your own stack protected)
- Run bulk actions across multiple connections at once

This is how agencies manage a fleet of client sites from one place without per-site logins.

## Roles as Live Automation Variables

Create custom roles — Managers, Assistants, Reviewers, or anything your operation uses. Assign users to those roles. SyteOps turns each role into a set of FlowMattic aggregator variables:

- A single variable for all email addresses in that role
- A single variable for all display names in that role
- Slack aggregator variable for direct notification routing

Add or remove a user from a role and every workflow that references that role variable updates automatically. No workflow editing required. When a new SyteWide plugin (like SyteSlyders) is installed, it can access those same roles directly.

## User and CRM Management

Up to 20 structured user slots with 31+ fields each, including identity, contact details, profile images, and CRM IDs across up to 15 supported CRM systems.

- **System roles** — Site Owner, Technical Contact, Marketing Contact
- **Custom roles** — Define your own with user assignment and FlowMattic aggregation
- **CRM systems** — Encrypted credentials, booking platform selection, multi-system user ID mapping
- All user and CRM data syncs to FlowMattic as named variables

## White Label and Client Protection

Adopt any installed WordPress plugin as a SyteOps module. It stops appearing as a standalone plugin in the admin. Clients see one clean interface — not the full stack of tools powering their site.

- Hide licenses, competitive tools, and proprietary automation from client view
- Choose which plugins appear in the client's Plugins list
- Protect your operational IP while still delivering a polished admin experience

## REST API Security

Default-deny security model for the WordPress REST API. One toggle blocks all anonymous REST access across the site.

- **Block All** mode for staging or locked-down environments
- **Custom allowlist** for endpoints your specific stack needs open
- Built-in allowlist entries for WooCommerce, FlowMattic, Google Site Kit, and Wordfence
- REST monitor for observing what hits your endpoints
- Per-endpoint control from the server dashboard on managed sites

Your WordPress REST API is not public infrastructure. SyteOps makes enforcing that easy.

## Module System

Modules are ZIP-installable extensions that add capabilities to SyteOps. Think of them as plugins for your plugin.

What modules can do:
- Add new post types, admin pages, and settings tabs
- Patch known issues in third-party plugins (without waiting for a vendor release)
- Extend FlowMattic variable families with new data domains
- Introduce new automation dispatch patterns

Modules can be toggled on or off without losing configuration data. First-party SyteWide modules and custom-built packages are both supported. The Package Builder module lets you create and encrypt your own `.sytepkg` packages.

## Smart Content Pipelines

Pair SyteOps user and role data with ContentPen, FlowMattic, ACF, and Squirrly SEO to build self-routing content workflows.

A practical example: ContentPen sends a payload to one FlowMattic webhook. SyteOps user and role variables tell the workflow who the assigned author is. ACF populates the field structure. Squirrly SEO applies the metadata. The article arrives in WordPress, structured and SEO-ready, assigned to the right author — ready for review. One click to publish.

No per-author workflow duplication. No workflow edits when authors change. The configuration is the source of truth.

## Variable Sets

Create custom admin tabs with your own structured data collections. Three variable types:

- **SVS (Static Variable Set)** — A value you define: text, email, URL, number, textarea, or HTML. Syncs to FlowMattic.
- **DVS (Dynamic Variable Set)** — A suffix placeholder with no stored value. Used for dynamic runtime injection in workflows.
- **RSVS (Related Static Variable Sets)** — Up to 20 grouped SVS entries under one tab. Useful for repeating data patterns like client lists or API credential sets.

Variable sets give you a structured, UI-managed way to feed constant data into FlowMattic without hardcoding values in workflows.

## Backup and Restore

- Full backup with manifest-based ZIP restore points
- Scoped backups (per tab, per user, per module)
- Automatic scheduled backups with configurable retention
- Cross-site restore with URL rewriting for domain migrations
- Backup audit log
- Post-restore license re-validation for security

## Configuration Management

Move your entire SyteOps setup between sites without rebuilding from scratch.

- Master export/import for complete configuration
- Scoped export/import for individual tabs or data areas
- Single user card export/import with automatic slot remapping
- ACF field group importer for bringing field definitions across sites

## Integrations

SyteOps includes toggleable integrations with tools across your stack. See the [Integrations Overview](../integrations/overview) for the full list.

Core integrations built in (no toggle required): FlowMattic, ContentPen, ACF.

## Security

### SyteOps Admin Role

A dedicated capability tier separate from WordPress admin. Only existing SyteOps Admins can grant this role to others. Automatic role recovery if capabilities are lost.

### Encrypted Credential Storage

API keys, secrets, and CRM credentials stored in an encrypted secrets structure — not in plaintext options.

### Debug Tool

Admin-only diagnostic tool requiring Debug Mode:
- Search across all options and FlowMattic variables
- Find & Replace in FlowMattic workflow definitions (with preview mode and JSON backups before any changes)
- Destructive variable wipes gated behind SyteOps Admin and Debug Mode

## Requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.4+ |
| PHP | 8.1+ |
| MySQL | 5.7+ (or MariaDB 10.3+) |
| FlowMattic | Required for workflow automation, CRM sync, and full admin UI access |
