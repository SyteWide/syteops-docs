---
sidebar_position: 4
title: ContentPen Integration
description: Setting up ContentPen content relay, webhook delivery, and self-routing content pipelines with SyteOps.
---

# ContentPen Integration

**Tier: Extended** — Has its own settings area, stored credentials, webhook endpoint, and light AI configuration for content formatting.

SyteOps integrates with [ContentPen](https://contentpen.ai?ref=chet28&fp_sid=sytewide) to build self-routing content pipelines. ContentPen generates content and sends it as a webhook. SyteOps verifies the payload and either relays it to FlowMattic (the default) or — in **native publishing mode** — creates the WordPress post directly with no FlowMattic required. Either way, your SyteOps user and role data determines who the content belongs to and how it's routed.

The result: content arrives in WordPress assigned to the right author, with fields populated and SEO metadata ready. No manual assignment. No workflow editing when authors change.

For the complete pipeline story, see [Content Pipelines](../features/content-pipelines).

## What It Does

When ContentPen generates or processes content, it sends a webhook to your SyteOps installation. SyteOps:

1. Verifies the webhook signature (HMAC-SHA256)
2. Processes and normalizes the payload
3. **In relay mode (the default):** relays it to the FlowMattic webhook URL you configure in the System/API tab. FlowMattic then handles the rest — using SyteOps variables (user data, role assignments, variable sets) to route and process the content.
4. **In native publishing mode:** creates the WordPress post directly (author, taxonomy, and SEO metadata) with no FlowMattic required. See [Native Publishing Mode](#native-publishing-mode).

## Requirements

- SyteOps installed and activated
- FlowMattic installed and activated — for **relay mode** (the default); **not required** for native publishing mode
- ContentPen integration enabled in SyteOps (no ContentPen WordPress plugin is required — ContentPen sends webhooks from its cloud service)

## Setup

### 1. Enable the Integration

1. Navigate to the **Integrations** tab in SyteOps
2. Toggle **ContentPen** ON
3. Save

### 2. Configure API Settings

1. Go to the **System/API** tab
2. Find the ContentPen section
3. Enter your ContentPen webhook secret (and, for relay mode, the FlowMattic relay URL)
4. Save

### 3. Configure Webhook URL

In your ContentPen account, set the webhook URL to:

```
https://yoursite.com/wp-json/syteops-int-cp/v1/webhook
```

Replace `yoursite.com` with your actual domain.

## Webhook Security

SyteOps verifies every incoming ContentPen webhook using HMAC-SHA256 signature verification. Each webhook includes:

- `X-Contentpen-Signature` — HMAC signature for payload verification
- `X-Contentpen-Event` — The event type
- `X-Contentpen-Delivery-Id` — Unique delivery identifier

Invalid signatures are rejected before any processing occurs.

## Role-Aware Author Assignment

The power of the ContentPen integration comes from combining it with SyteOps role data:

- Your FlowMattic workflow references `syteops_user_NNN_is_{role}` variables to identify the current holder of a content role
- ContentPen sends one webhook to one FlowMattic workflow
- The workflow reads SyteOps role variables to determine which WordPress author to assign
- The article lands assigned correctly — every time

When the author changes, update their role assignment in SyteOps. The next ContentPen article routes to them automatically. No workflow edits needed.

## Native Publishing Mode

By default, SyteOps relays ContentPen webhooks to FlowMattic, which handles post creation through your workflow. If you prefer a simpler setup with no FlowMattic workflow required, you can switch to **native publishing mode**.

To enable it, go to **System/API → ContentPen → Handling mode** and select **Native (create posts directly)**. Save the page.

When native publishing mode is active:

- **Incoming content creates a WordPress post automatically.** No FlowMattic workflow is needed for the creation step.
- **Posts arrive as drafts by default.** The author receives an email notification so they can review and publish. You can optionally change this to auto-publish in the same settings area.
- **Author matching happens by email.** SyteOps looks up the WordPress user whose email matches the author field sent by ContentPen. If no match is found, the post is assigned to the site's default author.
- **Categories and tags are assigned automatically** based on the article's content. Any categories or tags that don't already exist on your site are created for you.
- **The relay mode (default) is unchanged.** Switching back to **Relay to FlowMattic** restores the original behavior exactly.

Native publishing mode is a good fit for teams that want content to land in WordPress immediately without building a FlowMattic workflow. Teams that need custom routing, multi-step automation, or conditional logic should continue using relay mode.

## Cloudflare Configuration

If your site uses Cloudflare, server-to-server webhook requests may be blocked by Bot Fight Mode or other security features. See the [Cloudflare Setup Guide](cloudflare#step-1-allow-contentpen-webhooks) for the specific firewall rule to add.

## Troubleshooting

### Webhooks Not Being Received

1. **Check the webhook URL** — Ensure it's exactly `/wp-json/syteops-int-cp/v1/webhook` with the correct domain
2. **Check Cloudflare** — If using Cloudflare, verify the Allow rule is in place (see [Cloudflare Setup Guide](cloudflare))
3. **Check REST API restriction** — SyteOps endpoints (`/wp-json/syteops-int-cp/*`) should be automatically allowed, but verify in your REST API settings
4. **Check FlowMattic (relay mode only)** — In relay mode (the default), ensure FlowMattic is active and licensed, as the webhook relay depends on it. Native publishing mode does not use FlowMattic.

### Getting 403 Errors

This usually means Cloudflare or another security layer is blocking the request before it reaches WordPress. See the [Cloudflare troubleshooting section](cloudflare#contentpen-webhooks-failing) for diagnosis steps.

### Webhook Received but Not Processed

1. Verify the ContentPen integration is toggled ON in the Integrations tab
2. **In relay mode**, check that FlowMattic is active — the relay depends on FlowMattic being available (native publishing mode does not use FlowMattic)
3. Enable Debug Mode in SyteOps for detailed logging
