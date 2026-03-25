---
sidebar_position: 10
title: White Label & Client Protection
description: Adopt plugins as SyteOps modules, control the client admin view, and protect your proprietary tools.
---

# White Label & Client Protection

SyteOps lets you control exactly what clients see in their WordPress admin — and keep what they don't see protected. Whether you're managing sites for clients or running a tight agency stack, the white-label and client protection tools ensure your licenses, automation tools, and proprietary configurations stay yours.

## Adopting Plugins as SyteOps Modules

Any installed plugin on a SyteOps-managed site can be adopted as a **restricted plugin** — it disappears from the standard WordPress Plugins list for non-SyteOps users and is instead managed through SyteOps.

What clients see: one clean management interface — not the individual plugin stack you built it with.

What you keep:
- Your plugin licenses are not visible in the client's admin
- Competitive tools and automation infrastructure stay hidden
- Clients cannot deactivate or tamper with plugins critical to your automation

### Restricted Plugins List

Manage restricted plugins in the **Admin tab** under the Restricted Plugins section:

1. Navigate to **SyteOps > Admin tab**
2. Open the **Restricted Plugins** section
3. Select which installed plugins to restrict
4. Save

Restricted plugins remain fully functional — they are only hidden from the Plugins page for non-SyteOps Admin users. SyteOps Admins always see the full list.

## Plugin Visibility from the Server

When managing endpoint sites via [Server Connections](server-connections), the server dashboard can view and manage plugins on each endpoint, including:

- Viewing installed and hidden plugins
- Enabling or disabling plugins remotely
- Deleting plugins from endpoints (with confirmation)

This gives you full visibility into endpoint plugin states while keeping clients out of that layer.

## Protecting Your Automation Stack

The typical setup for agency-managed sites:

1. SyteOps and FlowMattic are installed and powering all automation
2. Any additional automation-critical plugins (webhook handlers, ACF, etc.) are added to the Restricted Plugins list
3. Clients interact only with their WordPress content — not the infrastructure behind it

Your workflow definitions, API credentials, and configuration logic stay inside SyteOps where only SyteOps Admins can access them.

## SyteOps Admin Access Control

The **SyteOps Admin** role is the gateway to all sensitive configuration:

- Only SyteOps Admins can access the full settings interface
- Restricted plugin management requires SyteOps Admin
- Destructive operations (wipes, debug tools, module management) are behind SyteOps Admin + Debug Mode
- Only an existing SyteOps Admin can promote another user to SyteOps Admin

This ensures client users — even WordPress Admins — cannot access or modify your operational configuration.

## Encrypted Credential Storage

API keys, CRM secrets, and integration tokens stored in SyteOps are encrypted at rest. They are never displayed in plaintext after being saved — only a "Configured (hidden)" indicator confirms a value is stored.

This applies to:
- CRM API keys and secrets (up to 15 CRM systems)
- Integration API keys (AWS SES, Cloudflare, Sendy, Documentero, OpenAI, ContentPen)
- Any credential stored in the System/API tab

To remove a stored credential, use the "Clear on save" toggle and save. The old value is gone — not just hidden.

## Notice Management Module

The **Notice Management** module (available separately) takes admin cleanliness a step further:

- Suppresses third-party plugin admin notices for non-SyteOps Admin users
- Keeps the client admin free of developer-facing alerts and nag banners
- Monitors and surfaces notices to SyteOps Admins only, via sticky monitoring toasts

This is particularly useful when running many plugins: clients get a clean workspace, SyteOps Admins get operational awareness.
