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

## Communication

### Slack

Team messaging integration for channel notifications and workflow automation. When enabled, configure your Slack workspace details for use in FlowMattic workflows.

### Monday.com

Work management platform integration for project communication and task sync. Connect your Monday.com workspace to coordinate team workflows.

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

SyteOps supports five AI providers. Configure one or more API keys in the **System / API** tab to enable AI-powered features (cross-link scoring, content generation, notes, and estimates).

| Provider | Description |
|---|---|
| **OpenAI** | GPT models for content and analysis tasks. |
| **Anthropic** | Claude models for structured reasoning and generation. |
| **OpenRouter** (recommended) | Aggregates models from all providers with a single API key. |
| **Gemini** | Google's Gemini models for multimodal tasks. |
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
