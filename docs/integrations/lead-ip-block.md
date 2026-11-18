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

## Using the link in WPForms emails

In a WPForms notification, add `{syteops_block_ip_footer}` to the message for a ready-made line ("Spam or abusive? Block this sender's IP"), or `{syteops_block_ip_url}` for the bare link. Both appear in a staff notification only: not in a confirmation message, and not in a notification addressed to the person who submitted the form (a Send To or CC that is an email field). The address is the one that opened the connection to your site, read through the same resolver SyteOps uses elsewhere (behind Cloudflare it uses Cloudflare's own header, and SyteOps never reads a header a visitor can set), never WPForms' own address reading. It is only as dependable as your server's origin lock: if your web server takes the connection address from a forwarded header and the origin accepts requests that do not come through Cloudflare, a visitor could still write it, so keep the origin answering Cloudflare only. WPForms Lite does not keep entries, so the link names the address alone. Until a blocking layer is set up, the footer tag shows a "Configure Blocking" link instead, as the Fluent Forms one does. An address that is never blockable (private, reserved, a Cloudflare address, on your protected list) gets no link at all.

## Using the link in Elementor Pro emails, and Avada's address

**Elementor Pro Forms.** In the form's Email action, add `[syteops_block_ip_footer]` (a ready-made line) or `[syteops_block_ip_url]` (the bare link) to the Message. The shortcode only works while a form submission is being processed, so one left in page content prints nothing. The link is swapped in when the email is built, and it is left out of any email addressed to the person who submitted the form (a To, CC or BCC that is an email field the visitor filled in), including a form's second email, an auto-responder, and text a visitor typed into a field. So you can use the same message in both emails. Elementor does not expose its submissions table id, so the link names the address alone. In plain-text mode use the URL shortcode, because the footer is HTML.

**Avada.** Avada's own notification emails cannot carry the link: Avada replaces every bracket tag it does not know with a posted field's value, or with nothing, before any other code sees the message. To get a link in an email for an Avada form, send the form to a FlowMattic webhook and use the FlowMattic email step (see the next section). While this integration is on, SyteOps replaces the address Avada records for a submission with the safely read one. Avada normally lets the forwarding header a visitor sends overwrite it, and passes it on in the body of a webhook action, where a workflow tool would read it. A posted form field named `ip` is also removed, because Avada's webhook body lets a posted field override the recorded address: a real field with that name stops reaching the webhook, the stored entry and the email, so rename it. Behind a proxy other than Cloudflare that is not named to SyteOps, the safely read address can be the proxy's own address.

## Using the link in FlowMattic emails

A FlowMattic workflow does not run in the visitor's request: the connection that reaches it belongs to whatever posted the webhook, so SyteOps cannot read the visitor's address there. The address has to be passed in.

1. Add a **PHP Functions** step. Function: `syteops_ip_block_flowmattic_footer` (a ready-made link line) or `syteops_ip_block_flowmattic_link` (the bare link). Parameter type: variable. First parameter: the visitor's address from an earlier step (for an Avada form, the webhook body's `ip`). Second parameter, optional: a form id.
2. In the Email step, use the step's result, `{php_functions<N>.response}`, where the link should appear. FlowMattic splices it in as plain text, so the link arrives as written.

Pass only an address your own site wrote. Avada's `ip` qualifies while this integration is on, because SyteOps replaces Avada's forwarding-header value with the safely read one and removes a posted form field named `ip` (Avada's webhook body lets a posted field override the recorded address). Never pass a value a visitor could type into a form field: the link would name whatever they typed. A form service that does not send the visitor's address (OpnForm does not) has nothing to pass, so no link can be made for it. An address that is never blockable, or equal to your own server's address (add extra addresses for a server behind NAT through the `syteops_ip_block_own_addresses` filter), gets no link. FlowMattic keeps each step's result in its task history, so the sealed link (valid 14 days, usable by whoever holds it) stays visible to people who can read that history.

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

User agent blocks are never sent to Cloudflare. Expiring blocks (30 or 90 days) are removed by a daily event, `syteops_blocks_expire`. The feature does not need the Leads module: it loads whenever the Lead IP Block integration is on, so a site without RingTonic gets the same links, block page and timed-block expiry. Refused targets include your own IP, the server IP, protected ranges, and Cloudflare's own ASN and ranges. An address is also refused when it cannot be a visitor's public address: private and reserved ranges, the shared address space used by carrier networks and Tailscale (100.64.0.0/10), the documentation and benchmarking blocks, and the IPv6 translation, discard, tunnel and documentation ranges. An IPv4 address written in IPv6-mapped form is read as the plain IPv4 address before every one of these checks, so each spelling of the same client gets the same answer.
