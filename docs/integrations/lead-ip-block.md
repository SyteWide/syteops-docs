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

## Layers and configuration

Only the blocking layers that are set up are used. Wordfence counts as configured when it is active. Cloudflare counts as configured when a bearer token and a zone resolve. When neither is configured, the lead email footer smartcode `{syteops.block_ip_footer}` shows a "Configure Blocking" link instead of a block link. The link opens a SyteOps admin page, behind login, that says what is missing. The existing `{syteops.block_ip_url}` smartcode is unchanged.

After a block, the result page links to the block in Cloudflare and Wordfence for each layer that applied it.

## Blocks section

Systems/API has a Blocks card that lists every block, with pills to browse by type (All, IP, Range / Network, Country, User agent, Removed), search, paging, view links, an editable note per block, a Re-check action that reports drift between SyteOps and the layers, and Unblock with a confirmation step. Notes default to form and entry IDs only, never names or emails.

## Other block types

Admins can add range, ASN, country and user agent blocks from the Blocks card. Each goes through two confirmations: a checkbox that explains what could be affected, then typing the target. Blocking your own IP or country needs one more confirmation.

| Type | Cloudflare | Wordfence |
|---|---|---|
| IP | yes | yes |
| Range | /16 and /24 (IPv4), /64 (IPv6) | yes |
| ASN | yes | no |
| Country | yes | no |
| User agent | never | yes |

User agent blocks are never sent to Cloudflare. Expiring blocks (30 or 90 days) are removed by a daily event, `syteops_blocks_expire`. Refused targets include your own IP, the server IP, protected ranges, and Cloudflare's own ASN and ranges.
