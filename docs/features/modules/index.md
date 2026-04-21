---
sidebar_position: 4
title: Modules
description: Installing, activating, and managing SyteOps modules.
---

# Modules

SyteOps uses an expandable module system — like plugins for the plugin. Modules add new features, patch problems in third-party plugins, extend FlowMattic variable families, or introduce entirely new admin workflows. They are packaged as ZIP files that can be uploaded, activated, and managed independently from the Admin tab.

**In this section:**

- This page — module concepts, installation, lifecycle, and FlowMattic behavior
- [First-Party Module Guides](module-guides) — per-module walkthroughs (Notes, Estimates, Banners, etc.)
- [Encrypted Packages (.sytepkg)](packages) — secure distribution format, signature verification, license-tied decryption
- [Module Auto-Updates](auto-updates) — the twice-daily update check, per-module control, and cron requirements

## What Modules Can Do

Modules are not just feature add-ons. They serve several distinct purposes:

**Add new capabilities** — New post types, admin pages, settings tabs, and FlowMattic variable families. Examples: meeting notes capture with FlowMattic dispatch, client estimate management with approval tracking.

**Patch third-party plugin issues** — Some known problems in popular plugins take months to get fixed upstream. A SyteOps module can patch the behavior at the WordPress layer without touching the third-party plugin's code. When the vendor eventually ships the fix, deactivate the module. Examples: the LiteSpeed Cache + Cloudflare token issue, the Fluent Forms + FlowMattic GDPR deletion edge case.

**Extend FlowMattic variable families** — Modules can declare new FlowMattic variable families that sync to SyteOps-managed data. This keeps custom data structures inside the same sync pipeline as core SyteOps data.

**Introduce new automation dispatch patterns** — Modules can register new inbound webhook routes, processing pipelines, or outbound dispatch behaviors. This allows specialized automation extensions to ship as module packages rather than standalone plugins.

**Deploy workflow templates** — SyteWide distributes FlowMattic workflow templates as encrypted packages for repeatable deployment across sites. See [Workflow Templates](../workflow-templates) for details.

## Installing a Module

1. Navigate to **SyteOps Admin > Admin tab > SyteOps Modules**
2. Click **Upload Module Package (.zip)**
3. Select the module ZIP or `.sytepkg` file
4. The module appears in the modules list

Both standard ZIP packages and [encrypted `.sytepkg` packages](packages) are supported. Encrypted packages require a valid SyteWide Product License, which automatically provides the decryption key.

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

SyteOps can automatically check for newer versions of installed modules and notify you when updates are available. You can also upload a new version manually — the upload flow handles overwriting the existing version without data loss.

See [Module Auto-Updates](auto-updates) for details on automatic update checking.

## Available First-Party Modules

These SyteWide-built modules are available separately. See [First-Party Module Guides](module-guides) for detailed usage instructions.

| Module | Purpose |
|---|---|
| **Notice Management** | Suppresses third-party admin notices for non-SyteOps users. Clients get a clean admin; SyteOps Admins see notices as monitoring toasts. |
| **Notes** | Structured meeting notes with metadata and FlowMattic variable sync for automated dispatch. |
| **Estimates** | Client estimate creation and management with approval tracking and FlowMattic integration. |
| **Banners** | Admin banner scheduling and display configuration. |
| **LiteSpeed CF Token Fix** | Patches a known issue where LiteSpeed Cache sends the wrong Cloudflare authentication token. Toggle off when the vendor ships the fix. |
| **Fluent Forms GDPR Fix** | Rebuilds the FlowMattic payload correctly when GDPR-triggered database deletions occur in Fluent Forms. |
| **FluentCart Licensing** | Configures your SyteOps server as a licensing gateway connected to a FluentCart install. |

## What's inside a module

Every module ships with a small manifest describing itself. You don't edit this directly — it's produced by whoever built the module — but it's useful to know what SyteOps reads from it:

| Field | Purpose |
|---|---|
| **Slug** | Unique identifier. Determines where the module's data lives (`module_options[slug]`) and which FlowMattic variable family the module owns. |
| **Name / Version** | Displayed on the module card and checked during auto-updates. |
| **Capabilities** | What the module adds (admin page, custom post type, FlowMattic variable family, REST route, scheduled task, etc.). SyteOps uses these to decide whether the module needs a settings tab, Users subtab, or admin menu entry. |
| **FlowMattic variables** | The variable family declaration. On activate, these variables are created; on deactivate, they are removed. |
| **Requires** | Minimum SyteOps version and any required third-party plugins. A module that requires a missing plugin stays inactive with a clear message. |

For packaged modules distributed via `.sytepkg`, the manifest is inside the encrypted envelope along with the code. Signature verification happens before the envelope is decrypted — if verification fails, nothing is installed.

## Signing and trust

First-party modules shipped by SyteWide are signed. When you install a `.sytepkg` package:

1. SyteOps verifies the digital signature against the SyteWide public key — this confirms the package is authentic and was not tampered with after release.
2. If signed, SyteOps uses your Product License key to decrypt the envelope.
3. The decrypted payload (manifest + code) is written to the modules directory.
4. The module appears in the modules list, inactive by default.

Unsigned or tampered packages never reach the decryption step — you see a signature-verification error and nothing is installed.

## FlowMattic Integration

Active modules that declare FlowMattic variable families sync those variables automatically on save. Variable cleanup happens on deactivation — no stray variables accumulate when you turn a module off.

Use the **Resync All Variables** button in the Debug Tool if variables need to be realigned after an import or restore.

## Deleting a module

Toggling a module off preserves its data. If you want to remove a module completely:

1. Deactivate it first so FlowMattic variables are cleaned up.
2. Click **Delete** next to the module. SyteOps removes the module code and its `module_options[slug]` data.
3. Related custom post types (if the module declared any) are removed from the admin menus; the post type's content can be backed up via the standard backup flow before deletion.

Deleting is permanent — re-uploading the module creates fresh data, it does not restore the deleted data.

## Client Protection and Module Visibility

Modules that add admin pages or post type menus are only accessible to SyteOps Admins and users with the appropriate permissions. Clients navigating the WordPress admin see only the surfaces you've configured for them — not the module infrastructure running behind the scenes.

Combined with the Restricted Plugins list, modules give you a fully curated admin environment for client-managed sites. See [White Label & Client Protection](../white-label) for more.
