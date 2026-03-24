---
sidebar_position: 1
title: Installation
description: System requirements, installation methods, and first-run setup for SyteOps.
---

# Installation Guide

## Requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.4+ |
| PHP | 8.1+ |
| MySQL | 5.7+ (or MariaDB 10.3+) |
| FlowMattic | Required for admin UI access |

## Install

1. Upload the `syteops` folder to `/wp-content/plugins/syteops/` (or install via the WordPress plugin uploader with the release ZIP)
2. Activate the plugin in **Plugins > Installed Plugins**
3. You will be redirected to the **Initial Setup** screen

## Initial Setup

The first administrator to complete setup becomes the **SyteOps Admin**.

### Step 1: Licensing Setup

The "Licensing Setup" card handles both FlowMattic and SyteOps licensing.

**Server mode:**
- Fill in: FM Auth User, FM Auth Token, FlowMattic License, FlowMattic Email, SyteOps License, and GitHub Update Token
- Click **Save & Activate**

**Endpoint mode:**
- Enter your FM Auth Token under the Licensing Server URL
- Click **Activate**

If FlowMattic is not installed, the setup card will automatically install and activate it. If FlowMattic is already licensed, setup skips FM licensing and authorizes SyteOps directly.

### Step 2: Connect FlowMattic

Follow the on-screen prompts to connect FlowMattic. A valid license is required. Manual licensing fallbacks are available if webhook activation fails.

### Step 3: Configure

- Configure modules in the Admin tab
- Import ACF, Fluent Forms, or FlowMattic data if migrating from another site
- (Optional) Save a GitHub Update Token for plugin updates from private repositories

## Installing Modules

SyteOps modules are distributed as ZIP packages and must be uploaded before they can be enabled.

1. Navigate to **SyteOps Admin > Admin tab > SyteOps Modules**
2. Click **Upload Module Package (.zip)**
3. Select the module ZIP file
4. The module will appear in the modules list once uploaded
5. Toggle the module ON to activate it

## Plugin Updates

Plugin updates are delivered via GitHub releases. After saving a GitHub Update Token in the Licensing Setup (server-mode) or Admin tab, WordPress will check for updates automatically.

You can choose between:
- **Official Releases** (default) — stable production releases
- **GitHub Repo** — beta/development releases

## Next Steps

- [Configuration Reference](configuration) — all settings and their defaults
- [Plugin Overview](../features/overview) — what SyteOps can do
- [Troubleshooting](../troubleshooting) — common issues and solutions
