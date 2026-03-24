---
sidebar_position: 4
title: ContentPen Integration
description: Setting up ContentPen content relay and webhook delivery with SyteOps.
---

# ContentPen Integration

SyteOps integrates with ContentPen for programmatic content relay and formatting. ContentPen sends webhooks to your WordPress site, which SyteOps processes and relays to FlowMattic for workflow automation.

## What It Does

When ContentPen generates or processes content, it sends a webhook to your SyteOps installation. SyteOps verifies the webhook signature, processes the payload, and relays it to FlowMattic where you can build automated workflows around the content.

## Requirements

- SyteOps installed and activated
- FlowMattic installed and activated
- ContentPen integration enabled in SyteOps

## Setup

### 1. Enable the Integration

1. Navigate to the **Integrations** tab in SyteOps
2. Toggle **ContentPen** ON
3. Save

### 2. Configure API Settings

1. Go to the **System/API** tab
2. Find the ContentPen section
3. Enter your ContentPen API credentials
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

## Cloudflare Configuration

If your site uses Cloudflare, server-to-server webhook requests may be blocked by Bot Fight Mode or other security features. See the [Cloudflare Setup Guide](cloudflare#step-2-allow-contentpen-webhooks) for the specific firewall rule to add.

## Troubleshooting

### Webhooks Not Being Received

1. **Check the webhook URL** — Ensure it's exactly `/wp-json/syteops-int-cp/v1/webhook` with the correct domain
2. **Check Cloudflare** — If using Cloudflare, verify the Allow rule is in place (see [Cloudflare Setup Guide](cloudflare))
3. **Check REST API restriction** — SyteOps endpoints (`/wp-json/syteops-int-cp/*`) should be automatically allowed, but verify in your REST API settings
4. **Check FlowMattic** — Ensure FlowMattic is active and licensed, as the webhook relay depends on it

### Getting 403 Errors

This usually means Cloudflare or another security layer is blocking the request before it reaches WordPress. See the [Cloudflare troubleshooting section](cloudflare#contentpen-webhooks-failing) for diagnosis steps.

### Webhook Received but Not Processed

1. Verify the ContentPen integration is toggled ON in the Integrations tab
2. Check that FlowMattic is active — the relay depends on FlowMattic being available
3. Enable Debug Mode in SyteOps for detailed logging
