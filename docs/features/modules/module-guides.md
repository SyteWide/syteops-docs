---
sidebar_position: 2
title: First-Party Module Guides
description: Detailed guides for each SyteWide-built SyteOps module.
---

# First-Party Module Guides

SyteWide maintains a set of first-party modules that extend SyteOps with new capabilities, patch known third-party plugin issues, and add specialized workflows. Each module is installed and managed through the standard module system described in the [Modules overview](index.md).

This page covers every first-party module in detail: what it does, who needs it, how to get started, and anything notable about its behavior.

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

Hides third-party admin notices (from other plugins) so your clients see a clean, focused WordPress admin instead of a stack of banners from every installed plugin. You choose which notices to hide by capturing their wording, so nothing disappears that you did not pick.

### When you need it

Enable Notice Management on any site where non-technical users (clients, content editors) access the WordPress admin. It declutters their experience without hiding anything from you.

### Getting started

1. Upload the Notice Management module package via **Admin > Modules > Upload**
2. Toggle the module **ON** in the modules list
3. Open the **Notice Management** tab, then capture or paste the wording of a notice you want gone and save it

### Key behaviors and settings

- **Notice Management has its own tab**, listing every notice you have chosen to hide -- its label, a short fingerprint, when it was last seen, and a preview of the wording it matches.
- **Capture instead of typing.** "Capture Last Notice" and "Pick From Notices On Page" read the notices currently on screen, so visit the page showing the notice you want gone, then come back and pick it.
- **Show to SyteOps Admins only** -- switched on for each notice you save. You keep seeing the real banner; everyone else gets the clean admin. Switch it off for a notice to hide it from yourself as well.
- **Confirmation stays on the tab.** While you are on the Notice Management tab, each rule that matched the page reports itself as a notification, so you can see your choices working. Everyday admin screens stay quiet.
- **Stale rules speak up.** If a notice you hid stops appearing on the screen it used to appear on -- the other plugin fixed it, or reworded it -- a notification on that screen invites you to remove the rule you no longer need.
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

