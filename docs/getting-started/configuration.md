---
sidebar_position: 2
title: Configuration
description: Settings reference for all SyteOps options, defaults, and what they control.
---

# Configuration Reference

This document covers the key settings available in SyteOps and their effects.

## Admin Tab

The Admin tab is the primary configuration surface. It contains:

### SyteOps Modules

Toggle modules ON/OFF. Modules must be uploaded as ZIP packages before they can be enabled. When toggled OFF, FlowMattic variables are cleaned up but all settings data is preserved for easy re-activation.

### Configuration Management

- **Export Master** — Export all settings as a master configuration file
- **Export Scoped** — Export settings for a specific tab or area
- **Import** — Import a configuration file (master or scoped)
- **Full Backup** — Create a complete ZIP backup including all settings, module data, and licensing records (secrets excluded)

### Other Options

- **Debug Mode** — Enables the Debug Tool and structured logs under wp-content. Required for destructive wipes.
- **REST API Restriction** — See [REST API Restriction](../features/rest-api-restriction)

## Users Tab

Manage users with 31+ fields per user:
- Identity (name, email, phone)
- Contact information
- CRM IDs (15 supported CRM systems)
- Profile pictures
- Role assignments
- Module data (when modules are enabled)

### System Roles

Single-assignment roles (only one user per role):

| Role | Purpose |
|---|---|
| Site Owner | Primary site owner/administrator |
| Technical Contact | Primary technical contact |
| Marketing Contact | Primary marketing contact |

### Custom Roles

User-defined roles with flexible assignment. See [User Management](../features/user-management).

## CRM Tab

Centralized CRM system configuration. See [CRM Management](../features/crm).

- CRM count selector (0–15 systems)
- Per-CRM fields: name, code, URL, admin-only flag, encrypted API credentials
- Platform selection: Primary Communication Platform, Primary Booking Platform
- CRM Variables (RSVS) with FlowMattic sync

## General Tab

- FlowMattic quick links and workflow access
- Theme customization settings
- Clickable code values for copying variable names

## Integrations Tab

- Integration toggles (enable/disable individual integrations)
- Team communication (Slack, Monday.com)
- Booking platform integration (Fluent Booking)
- Code injection textareas with CodeMirror syntax highlighting

## System / API Tab

A per-integration configuration surface organized as collapsible cards — one card per integration or feature that needs credentials, endpoints, or AI configuration. Cards only appear for integrations that are currently toggled ON, so the page stays focused on what you're actually using.

Each card contains sections:

- **Credentials / API keys** — provider tokens, secret keys, webhook tokens. All secrets are encrypted at rest and masked after save.
- **Endpoints / Webhook URLs** — copy-ready URLs your external services should call.
- **Feature-specific settings** — link density, keyword matching mode, enrichment tier, etc. Varies by integration.
- **AI Providers** (for AI-using features) — the per-feature AI provider, model, and max-tokens selectors described on the [AI Providers](../features/ai-providers) page.

There is also a top-level **API Keys** tile that lists all six AI providers side-by-side with live balance display and per-provider refresh.

Navigate via the admin menu: **SyteOps → System / API**.

## Backup Tab

Full backup and restore surface. See [Backup and Restore](../features/backup-and-restore).

## Variable Set Tabs

Custom tabs for managing variable collections. See [Variable Sets](../features/variable-sets).

## REST API Settings

Logging, access control, and allowlist configuration. See [REST API Restriction](../features/rest-api-restriction).

## FlowMattic Sync

All configuration changes made in SyteOps are automatically synced to FlowMattic variables for use in automated workflows. This happens transparently — no manual sync is required.

A **Resync All Variables** button is available for manual synchronization if needed.
