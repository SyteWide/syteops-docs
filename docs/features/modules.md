---
sidebar_position: 3
title: Business Modules
description: Installing, activating, and managing SyteOps business modules.
---

# Business Modules

SyteOps uses an expandable module system for business features. Modules are packaged as ZIP files that can be uploaded, activated, and managed independently.

## Available Modules

### Notes

Note-taking and documentation functionality attached to user profiles. When enabled, each user card gains a Notes section for recording information.

### Estimates

Estimation and quoting system for business operations. Provides structured estimate fields per user.

### Banners

Banner management with scheduling capabilities:
- Create and manage banners with custom content
- Schedule display periods
- Frontend display integration
- Custom post type with admin UI

### Notice Management

WordPress admin notice control:
- Suppress matched admin notices via client-side hide
- Show button to reveal full notice text when needed
- Scoped to SyteOps screens to avoid interfering with other plugins

## Installing a Module

1. Navigate to **SyteOps Admin > Admin tab > SyteOps Modules**
2. Click **Upload Module Package (.zip)**
3. Select the module ZIP file
4. The module appears in the modules list

## Activating and Deactivating

Toggle modules ON or OFF in the SyteOps Modules section of the Admin tab.

**When deactivated:**
- All settings data is preserved (nothing is deleted)
- FlowMattic variables for the module are cleaned up
- The module's tab disappears from navigation

**When re-activated:**
- Settings are restored automatically
- FlowMattic variables are re-synced

## Updating a Module

Upload a new version of the module ZIP. The upload flow handles overwriting the existing module.

## FlowMattic Integration

Each active module generates FlowMattic variables that can be used in automated workflows. Variable cleanup happens automatically on deactivation.
