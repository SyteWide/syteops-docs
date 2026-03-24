---
sidebar_position: 1
title: Plugin Overview
description: High-level summary of all SyteOps features and capabilities.
---

# Plugin Overview

SyteOps is a comprehensive WordPress management platform that centralizes business operations, automates workflows, and provides secure administrative controls.

## Core Capabilities

### User Management

Manage up to 20 users with 31+ fields per user including identity, contact information, CRM IDs across 15 supported systems, and profile pictures. Assign system roles (Site Owner, Technical Contact, Marketing Contact) and create custom roles with flexible constraints.

### Business Modules

Expandable module system for business features:
- **Notes** — Note-taking and documentation per user
- **Estimates** — Estimation and quoting system
- **Banners** — Banner management with scheduling and frontend display
- **Notice Management** — WordPress admin notice suppression and control

Modules are installed as ZIP packages and can be independently activated or deactivated. Deactivation preserves all data for easy re-enablement.

### FlowMattic Integration

Seamless two-way integration with FlowMattic for workflow automation:
- Configuration data automatically syncs to FlowMattic variables
- Variable maintenance with non-destructive resync
- Compatibility sentinel ensures FlowMattic is available before dependent operations

### Variable Sets

Create custom admin tabs with three types of variable collections:
- **SVS (Static Variable Set)** — Suffix + typed value (text, email, URL, number, textarea, HTML)
- **DVS (Dynamic Variable Set)** — Suffix only, no stored value
- **RSVS (Related Static Variable Sets)** — Groups of SVS under Set 01..20

### Backup and Restore

Comprehensive data protection:
- Full backup with manifest-based ZIP restore points
- Scoped backups (per tab, per user, per module)
- Automatic scheduled backups with configurable retention
- Cross-site restore with URL rewriting
- Backup audit log

### Configuration Management

- Master export/import for complete site configuration
- Scoped export/import for individual tabs or areas
- Single user card export/import with automatic remapping
- Present-state pruning and policy enforcement

## Security

### SyteOps Admin Role

Restricted WordPress role with strict assignment policies. Only existing SyteOps Admins can assign this role to others. Automatic role recovery if capabilities are lost.

### REST API Restriction

Default-deny security model for the WordPress REST API:
- Block anonymous REST requests while allowing authenticated usage
- Block All mode for staging/development sites
- Custom allowlist for specific endpoints
- Built-in allowlist for WooCommerce, FlowMattic, Google Site Kit, and Wordfence

### Licensing Security

- Product License activation via FluentCart
- Management Connection for server-to-endpoint control
- License lock behavior preserves settings while restricting access
- Automatic restoration when license validates

### Debug Tool

Administrative diagnostic tool (requires Debug Mode):
- Search across options and FlowMattic variables
- Find & Replace in FlowMattic workflow definitions (with preview and backups)
- Destructive wipes for variable cleanup (SyteOps Admin + Debug Mode required)

## Requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.4+ |
| PHP | 8.1+ |
| MySQL | 5.7+ (or MariaDB 10.3+) |
| FlowMattic | Required for admin UI access |
