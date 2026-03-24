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

Toggle business modules ON/OFF. Available modules:
- **Notes** — Note-taking and documentation for users
- **Estimates** — Estimation and quoting system
- **Banners** — Banner management with scheduling
- **Notice Management** — WordPress admin notice control

Modules must be uploaded as ZIP packages before they can be enabled. When toggled OFF, FlowMattic variables are cleaned up but all settings data is preserved for easy re-activation.

### Configuration Management

- **Export Master** — Export all settings as a master configuration file
- **Export Scoped** — Export settings for a specific tab or area
- **Import** — Import a configuration file (master or scoped)
- **Full Backup** — Create a complete ZIP backup including all settings, module data, and licensing records (secrets excluded)

### Other Options

- **Debug Mode** — Enables the Debug Tool and structured logs under wp-content. Required for destructive wipes.
- **REST API Restriction** — See [REST API Restriction](../features/rest-api-restriction)

## Users Tab

Manage up to 20 users with 31+ fields per user:
- Identity (name, email, phone)
- Contact information
- CRM IDs (15 supported CRM systems)
- Profile pictures
- Role assignments
- Notes and estimates (when modules are enabled)

### System Roles

Single-assignment roles (only one user per role):

| Role | Purpose |
|---|---|
| Site Owner | Primary site owner/administrator |
| Technical Contact | Primary technical contact |
| Marketing Contact | Primary marketing contact |

### Custom Roles

User-defined roles with flexible assignment. See [User Management](../features/user-management).

## General Tab

- FlowMattic quick links and workflow access
- Theme customization settings
- Clickable code values for copying variable names

## Integrations Tab

- CRM configuration with encrypted API credentials
- Team communication (Slack, Teams, etc.)
- Booking platform integration
- Code injection textareas with CodeMirror syntax highlighting

## Backup Tab

Full backup and restore surface. See [Backup and Restore](../features/backup-and-restore).

## Variable Set Tabs

Custom tabs for managing variable collections. See [Variable Sets](../features/variable-sets).

## REST API Settings

Logging, access control, and allowlist configuration. See [REST API Restriction](../features/rest-api-restriction).

## FlowMattic Sync

All configuration changes made in SyteOps are automatically synced to FlowMattic variables for use in automated workflows. This happens transparently — no manual sync is required.

A **Resync All Variables** button is available for manual synchronization if needed.
