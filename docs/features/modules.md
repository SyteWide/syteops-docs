---
sidebar_position: 4
title: Modules
description: Installing, activating, and managing SyteOps modules.
---

# Modules

SyteOps uses an expandable module system — like plugins for the plugin. Modules can add new features, patch other plugins, or extend SyteOps in a variety of ways. They are packaged as ZIP files that can be uploaded, activated, and managed independently.

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

Some active modules generate FlowMattic variables that can be used in automated workflows. Variable cleanup happens automatically on deactivation.
