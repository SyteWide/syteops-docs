---
sidebar_position: 12
title: Wordfence Integration
description: Enable the Wordfence toggle so Wordfence's REST namespace stays reachable under REST API Restriction.
---

# Wordfence Integration

**Tier: Basic** — Plugin-based toggle integration. Keeps Wordfence's REST namespace available when SyteOps' REST API Restriction is on.

The Wordfence integration in SyteOps is a compatibility toggle. When you enable [REST API Restriction](../features/rest-api-restriction.md), it blocks anonymous REST traffic by default. Wordfence uses its own REST namespace for authentication, configuration, and security operations that need to remain reachable — this toggle ensures that.

## What the toggle does

- Adds the Wordfence REST namespace to the allowlist when REST API Restriction is enabled.
- Lets Wordfence continue to receive its own security-related requests without being blocked by SyteOps' restriction.
- Has no effect when REST API Restriction is off — Wordfence works either way, the toggle just preserves Wordfence's access when everything else is locked down.

## Setup

1. Install and activate the **Wordfence** plugin from WordPress → Plugins.
2. Navigate to **SyteOps → Integrations**.
3. Find **Wordfence** in the **Security** category.
4. Toggle it **ON** and click **Save Changes**.

If Wordfence isn't installed, SyteOps disables the toggle and shows "Not Installed".

## What endpoints become reachable

When this toggle is on and REST API Restriction is enabled, Wordfence's entire v1 REST namespace is allowed through:

| Path | Purpose |
|---|---|
| `/wp-json/wordfence/v1/*` | Wordfence authentication, configuration, and security endpoints |

Wordfence verifies its own requests against these endpoints — SyteOps isn't weakening Wordfence's security, just keeping Wordfence's namespace open while everything else stays restricted.

## Review Portal sign-in

This works whether or not the toggle is on. When Wordfence's login reCAPTCHA is turned on, the Review Portal's sign-in card passes Wordfence's security check the same way the WordPress login screen does, so reviewers are not sent a "Login Verification Required" email every time they sign in, and Wordfence still counts wrong passwords toward its lockout. When Wordfence does send a verification email, its link brings the reviewer back to the portal after they sign in. Reviewers who sign in from their own private review page, with their own username or email, are not asked by Wordfence to confirm by email at all: the private link sent to them already shows the sign-in is theirs. Anyone holding that link can still only try passwords for that one reviewer, and Wordfence's lockout, two-factor and passkey rules all still apply, so treat the link like the private link it is. After three wrong passwords in an hour, the private-page shortcut pauses for a day. Reviewers who use Wordfence two-factor codes or passkeys are pointed to the standard sign-in page to finish. While the check is running, the sign-in button shows as busy, and Google's reCAPTCHA notice appears under it instead of Google's floating badge in the corner of the page.

## Common use-cases

- Sites running both Wordfence and SyteOps REST API Restriction.
- Security-heavy configurations where you want the REST API locked down but Wordfence's paid features (like Country Blocking or Real-Time IP List) still functioning.

## Related

- [REST API Restriction](../features/rest-api-restriction.md)
- [Integrations Overview](overview.md)
- [Cloudflare Setup Guide](cloudflare.md) — if you stack Cloudflare in front of Wordfence
