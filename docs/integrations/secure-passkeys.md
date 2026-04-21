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
- Hides the toggle and shows "Not Installed" when the Secure Passkeys plugin is not detected.
- Removes the allowlist carve-out when toggled off, so your restriction policy applies to the endpoints again.

## Setup

1. Install and activate the Secure Passkeys plugin if you haven't already.
2. Navigate to **SyteOps → Integrations**.
3. Find **Secure Passkeys** in the **Security** category.
4. Toggle it **ON** and click **Save Changes**.

When SyteOps REST API restriction is off, the allowlist entry has no practical effect — Secure Passkeys endpoints are reachable either way. The integration matters when restriction is on.

## Common use-cases

- Keep passkey-based login flowing while SyteOps REST restriction is active.
- Unblock WebAuthn / passkey ceremonies for administrators and customers.
- Document in your operational record that Secure Passkeys is a sanctioned REST caller.

## Related

- [REST API Restriction](../features/rest-api-restriction.md) — how allowlist gating works end-to-end
- [Integrations Overview](overview.md) — all supported integrations
