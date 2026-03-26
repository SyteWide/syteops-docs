---
sidebar_position: 2
title: First-Party Module Guides
description: Detailed guides for each SyteWide-built SyteOps module.
---

# First-Party Module Guides

SyteWide maintains a set of first-party modules that extend SyteOps with new capabilities, patch known third-party plugin issues, and add specialized workflows. Each module is installed and managed through the standard module system described in the [Modules overview](index.md).

This page covers every first-party module in detail: what it does, who needs it, how to get started, and anything notable about its behavior.

---

## Notes

Structured meeting notes management inside SyteOps. The Notes module creates a dedicated custom post type (`syteops_notes`) with its own tab in the SyteOps navigation, giving you a central place to capture, organize, and act on meeting notes without leaving the WordPress admin.

### When you need it

Enable Notes if you track client meetings, internal standups, or any recurring note-taking workflow and want that data structured, searchable, and available to your automations.

### Getting started

1. Upload the Notes module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. The **Notes** tab appears in the SyteOps navigation

### Key behaviors and settings

- **Metadata capture** -- Each note supports structured metadata fields beyond the note body, so you can attach context like attendees, action items, or follow-up dates.
- **Settings modal** -- Click the settings icon in the Notes tab to configure module-specific options.
- **Import/Export** -- Notes data can be exported and imported between sites using the standard SyteOps backup and restore flow.

### FlowMattic integration

Notes declares a FlowMattic variable family that syncs automatically on save. This means your notes data is available as FlowMattic variables for use in workflows -- for example, dispatching a summary email after a meeting note is saved, or routing action items to a project management tool.

---

## Estimates

Client estimate creation and management with built-in approval tracking. The Estimates module creates a custom post type (`syteops_est_storage`) with its own tab, providing a structured workflow for drafting, sending, and tracking estimates.

### When you need it

Enable Estimates if you create client estimates or proposals and want to manage them inside WordPress with approval tracking and automation support.

### Getting started

1. Upload the Estimates module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. The **Estimates** tab appears in the SyteOps navigation

### Key behaviors and settings

- **Approval tracking** -- Each estimate carries status metadata so you can track where it stands in the approval process.
- **Metadata capture** -- Structured fields for estimate details beyond the main content.
- **Settings modal** -- Configure module-specific options through the settings icon in the Estimates tab.
- **Import/Export** -- Estimate data can be exported and imported between sites.

### FlowMattic integration

Estimates declares a FlowMattic variable family (using the `estmt` slug) that syncs automatically on save. Estimate data is available as FlowMattic variables, enabling workflows like sending approval notifications, updating a CRM when an estimate is accepted, or generating invoices from approved estimates.

---

## Banners

Admin banner scheduling and display configuration. The Banners module gives you control over what informational banners appear in the WordPress admin and when they appear.

### When you need it

Enable Banners if you want to schedule and manage admin-area banners -- for example, maintenance notices, announcements, or reminders that display to specific users during specific time windows.

### Getting started

1. Upload the Banners module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. The **Banners** tab appears in the SyteOps navigation

### Key behaviors and settings

- **Scheduling** -- Configure when banners appear and when they expire.
- **Display configuration** -- Control banner placement and visibility.
- **Import/Export** -- Banner configuration can be exported and imported between sites.
- Banners does **not** integrate with FlowMattic. It operates independently as a display management tool.

---

## Notice Management

Suppresses third-party admin notices (from other plugins) for non-SyteOps Admin users. Instead of cluttering the WordPress admin with full-page notice banners from every installed plugin, Notice Management intercepts those notices and presents them to SyteOps Admins as compact monitoring toasts.

The result: your clients see a clean, focused WordPress admin with no distracting banners. You, as a SyteOps Admin, still have visibility into every notice -- just in a less intrusive format.

### When you need it

Enable Notice Management on any site where non-technical users (clients, content editors) access the WordPress admin. It immediately declutters their experience without hiding anything from administrators.

### Getting started

1. Upload the Notice Management module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. Third-party notices are immediately suppressed for non-SyteOps Admin users

### Key behaviors and settings

- **No settings tab** -- Notice Management is a toggle-on/toggle-off module. There is no configuration beyond activating it.
- **SyteOps Admins** see third-party notices surfaced as monitoring toasts rather than full-page banners.
- **All other users** see a clean admin with third-party notices suppressed entirely.
- Works alongside the White Label and Client Protection features for a fully curated admin environment.

---

## LiteSpeed CF Token Fix

Patches a known issue where the LiteSpeed Cache plugin sends the wrong Cloudflare authentication token type when making API calls. This causes Cloudflare cache purge operations to fail silently.

### When you need it

Enable this module if your site uses **both** LiteSpeed Cache and Cloudflare. If you only use one or the other, this module is not needed.

When the LiteSpeed Cache vendor ships their own fix for this issue, you can toggle the module off.

### Getting started

1. Upload the LiteSpeed CF Token Fix module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. The token issue is patched immediately

### Key behaviors and settings

- **No settings tab** -- This is a toggle-on/toggle-off patch. There is no configuration.
- The fix operates at the WordPress layer -- it does not modify any LiteSpeed Cache or Cloudflare plugin files.
- **Deactivate when no longer needed.** Once LiteSpeed Cache releases an update that resolves the token issue, toggle this module off.

---

## Fluent Forms GDPR Fix

Fixes an edge case where FlowMattic receives a broken payload after Fluent Forms processes a GDPR data deletion request. When a user requests data deletion through a Fluent Forms form, the deletion event can corrupt the payload that FlowMattic expects, causing downstream workflows to fail or process incomplete data.

### When you need it

Enable this module if your site uses **all three** of the following:
- Fluent Forms
- FlowMattic
- GDPR data deletion functionality in Fluent Forms

If any one of those three is not in use, this module is not needed.

### Getting started

1. Upload the Fluent Forms GDPR Fix module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. The payload fix is active immediately

### Key behaviors and settings

- **No settings tab** -- This is a toggle-on/toggle-off patch. There is no configuration.
- The fix rebuilds the FlowMattic payload correctly when GDPR-triggered deletions occur, so your workflows continue to receive valid data.
- **Deactivate when no longer needed.** If a future update to Fluent Forms or FlowMattic resolves this edge case natively, toggle this module off.

---

## FluentCart Licensing

Configures a SyteOps Server installation as a licensing gateway connected to a FluentCart store. This module bridges SyteOps licensing capabilities with FluentCart's e-commerce system, so you can sell software products through FluentCart and have SyteOps manage the license lifecycle.

### When you need it

Enable this module if you are a **software vendor** who:
- Sells products through FluentCart
- Wants SyteOps to handle license activation, validation, and management for those products

This is a specialized module for vendors and agencies distributing licensed software. Most SyteOps users do not need it.

### Getting started

1. Ensure **FluentCart** is installed and active on your site
2. Upload the FluentCart Licensing module package via **Admin > Modules > Upload**
3. Toggle the module **ON** in the modules list
4. Configure the licensing gateway settings to connect to your FluentCart store

### Key behaviors and settings

- **Requires FluentCart** -- The module will not function without FluentCart installed and active.
- Connects your SyteOps Server to FluentCart so that product purchases automatically provision licenses.
- Manages the full license lifecycle: activation, validation, expiration, and revocation.

