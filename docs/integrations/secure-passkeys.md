---
sidebar_position: 26
title: Secure Passkeys Integration
description: Enable the Secure Passkeys toggle to allow its authentication REST endpoints under SyteOps REST API restriction.
---

# Secure Passkeys Integration

**Tier: Basic** — Plugin-gated toggle. Adds a conditional entry to the SyteOps REST allowlist so Secure Passkeys authentication keeps working when REST API restriction is enabled.

The Secure Passkeys integration in SyteOps exists so the plugin's authentication routes continue to function when you've locked down your REST API surface. Enabling the toggle adds the required endpoints to the allowlist; disabling it removes the carve-out.

## What the toggle does

- Adds `/wp-json/passkeys/v1/*` to the SyteOps REST restriction allowlist.
- Grays the toggle out and shows "Not Installed" when the Secure Passkeys plugin is not detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoints again.

## Setup

1. Install and activate the Secure Passkeys plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **Secure Passkeys** in the **Security** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — Secure Passkeys endpoints are reachable either way. The integration matters when restriction is on.

## Passkey sign-in for the Review Portal

Separately from this toggle, the Review Portal can show reviewers a **Sign in with a
passkey** button on its sign-in card. That switch lives on the Review Portal settings, not here — it
reads whether the Secure Passkeys plugin is active directly, so it works whether or not the integration
toggle above is on.

It is **on by default** wherever the plugin is active, and it only ever *adds* an option: signing in
with a password continues to work, so no reviewer can be locked out by it. See
[Offering passkey sign-in](../features/review-and-publish-your-post.md#offering-passkey-sign-in).

For the button to lead anywhere, Secure Passkeys must be set to show its own passkey option on the
WordPress login screen — that is its `display_passkey_login_wp_enabled` setting, on by default. The
button is hidden automatically on browsers that cannot use passkeys.

## Common use-cases

- Keep passkey-based login flowing while SyteOps REST restriction is active.
- Unblock WebAuthn / passkey ceremonies for administrators and customers.
- Document in your operational record that Secure Passkeys is a sanctioned REST caller.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
