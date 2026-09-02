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
| **Basic** | Toggle-only. Flip it on and you're done. Some Basic integrations store a single credential (like an API key), but there's no dedicated control panel. Most integrations live here. | Slack, Cloudflare, AWS SES, WooCommerce, Wordfence |
| **Extended** | Has its own settings area inside SyteOps, stores credentials, and includes light AI configuration where applicable. More involved than Basic but doesn't drive deep AI features. | LLMS Amplifier, RingTonic |
| **AI-Powered** | A full control panel with deep AI features — you pick which AI provider and model to use, SyteOps runs background jobs on your behalf, and the integration has quality gating built in. | LinkCentral |

The tier is purely informational. It doesn't change how an integration works or what it costs — it just helps you plan your setup time and understand what each toggle unlocks.

---

## Communication

### Slack

Team messaging integration for channel notifications and workflow automation. Once the toggle is on, send messages from FlowMattic using Slack incoming webhooks. See the dedicated [Slack Integration](slack) page for setup.

---

## Booking

### Fluent Booking

Appointment booking and scheduling integration. When enabled, SyteOps can coordinate booking workflows and sync scheduling data through FlowMattic. See the dedicated [Fluent Booking Integration](fluent-booking) page for setup.

---

## Forms & Automation

### Fluent Forms

Form capture and automation handoff. Connect Fluent Forms to SyteOps for seamless data flow from form submissions into your automated workflows. See the dedicated [Fluent Forms Integration](fluent-forms) page for setup.

### Documentero

Document generation and outbound delivery integration. Use Documentero to create automated documents from your SyteOps data. See the dedicated [Documentero Integration](documentero) page for setup.

### Contact Form 7

Public form submission support for sites using Contact Form 7. The toggle allowlists the Contact Form 7 feedback endpoint so submissions keep flowing when SyteOps REST API restriction is enabled. See the dedicated [Contact Form 7 Integration](contact-form-7) page for setup.

---

## Email & Delivery

### AWS SES

Transactional email delivery via Amazon Simple Email Service. Configure your SES credentials to power reliable email delivery in your workflows. See the dedicated [AWS SES Integration](aws-ses) page for setup.

### Sendy

Newsletter and campaign management integration. Connect Sendy for email list management and campaign automation. See the dedicated [Sendy Integration](sendy) page for setup.

---

## E-Commerce

### WooCommerce

WooCommerce REST and payment gateway support for stores that run on WooCommerce. The toggle allowlists the WooCommerce REST authentication path (`/wc-auth/v1/*`) so the platform keeps working when SyteOps REST API restriction is enabled. See the dedicated [WooCommerce Integration](woocommerce) page for setup.

---

## Leads & CRM

### RingTonic

AI call-tracking and attribution with a lightweight built-in CRM (built on Twilio). When enabled, SyteOps keeps a lead's **pipeline status** in sync between your SyteOps Leads list and the RingTonic CRM — status changes made in SyteOps push to RingTonic right away, and changes made in RingTonic are brought back on a regular reconcile. Requires a RingTonic **Agency plan** for API access. See the dedicated [RingTonic Integration](ringtonic) page for setup.

---

## Infrastructure

### Cloudflare

DNS, edge security, and cache control integration. Cloudflare requires specific configuration to work properly with SyteOps — see the dedicated [Cloudflare Setup Guide](cloudflare) for detailed instructions.

---

## SEO & Content

### LinkCentral

Automatic keyword linking and internal cross-linking. When enabled, SyteOps scans post content for keywords from your LinkCentral library and inserts links automatically — with proper SEO attributes and density controls. See the dedicated [LinkCentral Integration](linkcentral) page for setup details.

### Squirrly SEO

SEO field mapping and metadata control. When enabled, SyteOps can coordinate with Squirrly SEO for metadata management. See the dedicated [Squirrly SEO Integration](squirrly-seo) page for setup.

### Yoast SEO

SEO field mapping and metadata control through Yoast. Content Pipelines and the Review Portal write the meta description, focus keyword and cornerstone flag into Yoast's own fields. See the dedicated [Yoast SEO Integration](yoast-seo) page for setup.

### Rank Math

SEO field mapping and metadata control through Rank Math. Content Pipelines and the Review Portal write the meta description, focus keyword and pillar-content flag into Rank Math's own fields. See the dedicated [Rank Math Integration](rank-math) page for setup.

:::important One SEO plugin at a time
Squirrly SEO, Yoast SEO and Rank Math are mutually exclusive — SyteOps connects to one at a time, and turning one on turns the others off. Two plugins writing the same page's title is how a site ends up with a `<title>` nobody can account for.
:::

### LLMS Amplifier

AI-discovery file generation (`llms.txt` and `llms-full.txt`) for AI search engines. Enabling the LLMS Amplifier integration makes it the engine for the GEO step in Content Pipelines instead of the built-in generator — an either/or choice you flip from the GEO card, with no separate setup step. See the dedicated [LLMS Amplifier Integration](llms-amplifier) page for setup.

---

## Analytics & SEO

### Google Site Kit

Google Site Kit support for sites that use Google's analytics and search-insights plugin. The toggle allowlists the Site Kit REST endpoints so the plugin's data sync keeps working when SyteOps REST API restriction is enabled. See the dedicated [Google Site Kit Integration](google-site-kit) page for setup.

### WP Full Picture

Analytics data sender support for sites using WP Full Picture (free or premium). The toggle allowlists the `fupi/v1/sender` endpoint so analytics events keep flowing under SyteOps REST restriction. See the dedicated [WP Full Picture Integration](wp-full-picture) page for setup.

### SyteHero

Recognition for the SyteHero sister plugin, which runs hero sliders, visitor consent, and front-end attribution. Its two public endpoints — `sytehero/v1/jurisdiction` and `sytehero/v1/touch` — are allowlisted **whenever SyteHero is active**, not when the toggle is enabled: SyteHero's consent layer fails closed, so a blocked endpoint would silently switch off all of its analytics. The toggle itself is for visibility. See the dedicated [SyteHero Integration](sytehero) page.

---

## Security

### Wordfence

Wordfence authentication support. The toggle allowlists the Wordfence authenticate endpoint so Wordfence-driven sign-ins keep working when SyteOps REST API restriction is enabled. See the dedicated [Wordfence Integration](wordfence) page for setup.

### Secure Passkeys

Passkey (WebAuthn) authentication support. The toggle allowlists the `passkeys/v1/*` endpoints so passkey login ceremonies keep working under SyteOps REST restriction. See the dedicated [Secure Passkeys Integration](secure-passkeys) page for setup.

---

## Events

### The Events Calendar

Event and venue REST support for sites using The Events Calendar. The toggle allowlists the `tribe/events/v1/*` endpoints so event data stays reachable under SyteOps REST restriction. See the dedicated [The Events Calendar Integration](the-events-calendar) page for setup.

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

OpenRouter is the recommended default — it gives you access to models from every provider through one key.

---

## Backup & Utilities

### WPVivid

Backup utility integration for coordinating backup controls and recovery behavior with WPVivid. See the dedicated [WPVivid Integration](wpvivid) page for setup.

### UpdraftPlus

Backup status monitoring and recovery behavior integration with UpdraftPlus. See the dedicated [UpdraftPlus Integration](updraftplus) page for setup.

---

## Branding & Reputation

### White Label

Admin label and interface branding controls. Customize the SyteOps interface appearance for your organization. See the dedicated [White Label Integration](white-label) page for setup.

### Trustily

Reputation and trust page linking controls. Connect your Trustily profile for reputation management. See the dedicated [Trustily Integration](trustily) page for setup.

---

## Uptime & Feedback

### Frill

Changelog widget and release stream display. Show product updates and changelogs to your team through the Frill widget. See the dedicated [Frill Integration](frill) page for setup.

### Pulsetic

Uptime status monitoring and badge display. Connect Pulsetic to display uptime status information in your SyteOps dashboard. See the dedicated [Pulsetic Integration](pulsetic) page for setup.

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
| FlowMattic | `/wp-json/flowmattic/v1/*` |
| Google Site Kit | `/wp-json/google-site-kit/*` |
| Wordfence | `/wp-json/wordfence/v1/*` |
| WooCommerce | `/wc-auth/v1/*` |
| SyteHero | `/wp-json/sytehero/v1/jurisdiction`, `/wp-json/sytehero/v1/touch` |

See [REST API Restriction](../features/rest-api-restriction) for details.
