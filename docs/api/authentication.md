---
title: Authentication
sidebar_position: 2
description: How to authenticate with the SyteOps Manage API — in-process admin sessions and som_ API keys via X-API-Key.
---

# Authentication

The Manage API accepts two forms of authentication. Both are checked on every request; either one is sufficient.

## Two ways to authenticate

### 1. SyteOps admin — in-process (session or cookie)

When a request arrives already authenticated as a WordPress user who holds the **SyteOps admin** capability (for example, a logged-in admin making a browser-side XHR call or a server-side call using WordPress's own HTTP stack), no additional credentials are needed. The API recognizes the current user context and grants access according to that user's capabilities.

This mode is used by the SyteOps admin UI itself.

### 2. `som_` API key via `X-API-Key` header

For external tools, automation platforms, and MCP bridges, authentication is performed by sending a secret key in the `X-API-Key` HTTP request header.

Valid keys are prefixed `som_`. Example request:

```bash
curl -X POST "https://your-site/wp-json/syteops/v1/manage/dispatch" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: som_YOUR_KEY_HERE" \
  -d '{"resource":"status","action":"get"}'
```

Replace `som_YOUR_KEY_HERE` with the key you minted from the SyteOps admin UI.

## Minting and rotating a key

API keys are managed entirely from the **SyteOps admin UI** — no WP-CLI or database access is required.

1. Open the SyteOps admin panel in your WordPress dashboard.
2. Navigate to the API Keys section.
3. Click **Generate new key**. The key is displayed once — copy it immediately.
4. To rotate a key, click **Rotate** next to the existing key. The old key is invalidated immediately and a new one is issued.

Keys are **encrypted at rest**; SyteOps never stores them in plaintext.

## Capabilities

Every operation declared in the [Manifest](./manifest) specifies a required WordPress capability (for example, `manage_options` or a SyteOps-specific capability). The API enforces this gate regardless of which authentication method is used.

- An API key inherits the capabilities of the site's SyteOps admin role.
- An in-process session is checked against the current user's actual capabilities.

Attempting an operation without the required capability returns `{ "ok": false, "error": "..." }` with an HTTP 403 status.

For the capability required by each operation, see the [Manage API reference](./reference/).

:::warning
API keys are **operator secrets**. Treat them with the same care as database passwords:

- Never commit a key to version control.
- Never log a key in plaintext (application logs, CI output, etc.).
- Store keys in environment variables or a secrets manager and reference the variable name in configuration files.
- Rotate immediately if a key is accidentally exposed.
:::
