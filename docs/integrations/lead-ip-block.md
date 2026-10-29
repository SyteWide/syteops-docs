---
sidebar_position: 30
title: Lead IP Block Integration
description: Signed block/unblock confirmation links for suspicious lead IP addresses, with refusal safeguards and per-layer status output.
---

# Lead IP Block Integration

**Tier: Basic** — exposes a toggle-controlled endpoint that creates signed confirmation links for IP block and unblock actions.

When enabled, SyteOps can generate one-time confirmation URLs that:

- show a no-mutate review page on GET;
- apply block/unblock only on explicit POST confirmation;
- reject unsafe targets (private/reserved IPs, Cloudflare edge ranges, protected CIDRs, and self-block attempts);
- return per-layer outcomes for Wordfence and Cloudflare integrations.

## Status

This integration is primarily a safety and operator-confirmation surface. It is intended for lead-review flows and is inert while the integration toggle is off.
