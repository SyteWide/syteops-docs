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
- Greys the toggle out and shows "Not Installed" when the Secure Passkeys plugin is not detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoints again.

## Setup

1. Install and activate the Secure Passkeys plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **Secure Passkeys** in the **Security** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — Secure Passkeys endpoints are reachable either way. The integration matters when restriction is on.

## Requiring a passkey for the review portal

Separately from this toggle, the ContentPen Review Portal can require reviewers to **sign in with a
passkey** before they can edit or publish. That switch lives on the Review Portal settings, not here —
it reads whether the Secure Passkeys plugin is active directly, so it works whether or not the
integration toggle above is on.

It is **on by default** wherever the plugin is active — and the reverse also holds: deactivating
Secure Passkeys switches the requirement off, even if you had explicitly turned it on. Reviewers go
back to password-only access, so deactivating that plugin is a security decision, not just a
housekeeping one. See
[Requiring a passkey](../features/review-and-publish-your-post.md#requiring-a-passkey) for what
reviewers see and how to turn it off.

Two things worth checking before you rely on it:

- **Secure Passkeys must offer its passkey button on the WordPress login screen.** A reviewer who is
  told "sign in again with your passkey" is sent to that screen; if the button is not there, they can
  only sign in with a password and will come straight back to the same message.
- **Reviewers must be able to reach the screen where passkeys are registered.** The default is the
  WordPress profile page. If a membership or security plugin blocks your reviewers from wp-admin, send
  them somewhere else by filtering `syteops/cp_review/passkey_setup_url`.

## Common use-cases

- Keep passkey-based login flowing while SyteOps REST restriction is active.
- Unblock WebAuthn / passkey ceremonies for administrators and customers.
- Document in your operational record that Secure Passkeys is a sanctioned REST caller.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
