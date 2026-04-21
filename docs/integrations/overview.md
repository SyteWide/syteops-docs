---
sidebar_position: 0
title: Integrations Overview
description: All supported integrations in SyteOps, organized by category.
---

# Integrations Overview

SyteOps integrates with a wide range of tools and services. Each integration can be enabled from the **Integrations** tab in SyteOps settings.

## How Integrations Work

1. Navigate to the **Integrations** tab in SyteOps
2. Toggle the integration ON
3. Configure any required settings (API keys, credentials, etc.)
4. Save

When an integration is enabled, its configuration fields become available. When disabled, the fields are hidden but your settings are preserved.

---

## Understanding Integration Tiers

Each integration card shows a small **tier badge** next to the category label. The tier tells you at a glance how involved the integration is — whether it's a quick toggle or something with a dedicated control panel and AI features.

| Tier | What it means | Examples |
|---|---|---|
| **Basic** | Toggle-only. Flip it on and you're done. Some Basic integrations store a single credential (like an API key), but there's no dedicated control panel. Most integrations live here. | Slack, Monday, Cloudflare, AWS SES, WooCommerce, Wordfence |
| **Extended** | Has its own settings area inside SyteOps, stores credentials, and includes light AI configuration where applicable. More involved than Basic but doesn't drive deep AI features. | ContentPen |
| **AI-Powered** | A full control panel with deep AI features — you pick which AI provider and model to use, SyteOps runs background jobs on your behalf, and the integration has quality gating built in. | LinkCentral |

The tier is purely informational. It doesn't change how an integration works or what it costs — it just helps you plan your setup time and understand what each toggle unlocks.

---

## Communication

### Slack

Team messaging integration for channel notifications and workflow automation. Once the toggle is on, send messages from FlowMattic using Slack incoming webhooks. See the dedicated [Slack Integration](slack) page for setup.

### Monday.com

Work management platform integration for project communication and task sync. Once the toggle is on, create and update board items from FlowMattic using the Monday.com API. See the dedicated [Monday.com Integration](monday) page for setup.

---

## Booking

### Fluent Booking

Appointment booking and scheduling integration. When enabled, SyteOps can coordinate booking workflows and sync scheduling data through FlowMattic.

---

## Forms & Automation

### Fluent Forms

Form capture and automation handoff. Connect Fluent Forms to SyteOps for seamless data flow from form submissions into your automated workflows.

### Documentero

Document generation and outbound delivery integration. Use Documentero to create automated documents from your SyteOps data.

---

## Email & Delivery

### AWS SES

Transactional email delivery via Amazon Simple Email Service. Configure your SES credentials to power reliable email delivery in your workflows.

### Sendy

Newsletter and campaign management integration. Connect Sendy for email list management and campaign automation.

---

## Infrastructure

### Cloudflare

DNS, edge security, and cache control integration. Cloudflare requires specific configuration to work properly with SyteOps — see the dedicated [Cloudflare Setup Guide](cloudflare) for detailed instructions.

---

## SEO & Content

### ContentPen

Programmatic content relay and formatting integration. [ContentPen](https://contentpen.ai?ref=chet28&fp_sid=sytewide) sends webhooks to SyteOps for content processing — see the dedicated [ContentPen Integration](contentpen) page for setup details.

### LinkCentral

Automatic keyword linking and internal cross-linking. When enabled, SyteOps scans post content for keywords from your LinkCentral library and inserts links automatically — with proper SEO attributes and density controls. See the dedicated [LinkCentral Integration](linkcentral) page for setup details.

### Squirrly SEO

SEO field mapping and metadata control. When enabled, SyteOps can coordinate with Squirrly SEO for metadata management.

---

## AI

SyteOps supports six AI providers. Configure one or more API keys in the **System / API** tab to enable AI-powered features (cross-link scoring, content generation, notes, and estimates).

| Provider | Description |
|---|---|
| **OpenAI** | GPT models for content and analysis tasks. |
| **Anthropic** | Claude models for structured reasoning and generation. |
| **OpenRouter** (recommended) | Aggregates models from all providers with a single API key. |
| **Gemini** | Google's Gemini models for multimodal tasks. |
| **Perplexity** | Web-aware models with built-in search for grounded, up-to-date responses. |
| **Straico** | Multi-model platform with unified billing. |

OpenRouter is the recommended default — it gives you access to models from every provider through one key.

---

## Backup & Utilities

### WPVivid

Backup utility integration for coordinating backup controls and recovery behavior with WPVivid.

### UpdraftPlus

Backup status monitoring and recovery behavior integration with UpdraftPlus.

---

## Branding & Reputation

### White Label

Admin label and interface branding controls. Customize the SyteOps interface appearance for your organization.

### Trustily

Reputation and trust page linking controls. Connect your Trustily profile for reputation management.

---

## Uptime & Feedback

### Frill

Changelog widget and release stream display. Show product updates and changelogs to your team through the Frill widget.

### Pulsetic

Uptime status monitoring and badge display. Connect Pulsetic to display uptime status information in your SyteOps dashboard.

---

## System Integrations

These integrations are built into SyteOps core and do not require manual enabling:

### FlowMattic

Real-time variable synchronization for workflow automation. All SyteOps configuration data automatically syncs to FlowMattic variables. See the dedicated [FlowMattic Integration](flowmattic) page.

### REST API Allowlist

SyteOps automatically allows REST API access for key services when REST restriction is enabled:

| Service | Allowed Path |
|---|---|
| SyteOps | `/wp-json/syteops/*` |
| ContentPen | `/wp-json/syteops-int-cp/*` |
| FlowMattic | `/wp-json/flowmattic/v1/*` |
| Google Site Kit | `/wp-json/google-site-kit/*` |
| Wordfence | `/wp-json/wordfence/v1/authenticate` |
| WooCommerce | `/wc-auth/v1/*` |

See [REST API Restriction](../features/rest-api-restriction) for details.
