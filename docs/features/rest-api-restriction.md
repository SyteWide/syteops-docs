---
sidebar_position: 6
title: REST API Restriction
description: Controlling and securing WordPress REST API access with SyteOps.
---

# REST API Restriction

SyteOps provides a security feature that restricts access to the WordPress REST API, protecting your site from unauthorized API access.

## Options

### Enable REST Restriction

Blocks anonymous (unauthenticated) REST requests while allowing:
- All authenticated requests (logged-in users)
- Built-in allowlisted endpoints (see below)

### Block All REST API

Blocks **all** REST API requests with no exceptions, including authenticated requests. Use this for staging or development sites that should not process any external API calls.

### Custom Allowlist

Add specific endpoints that should be allowed even when restriction is enabled. Enter one path per line:
- Must begin with `/`
- Wildcards allowed as suffix: `/wp-json/myplugin/v1/*`
- Non-REST paths supported: `/wc-auth/v1/*`

## Built-In Allowlist

These endpoints are always allowed when REST restriction (not Block All) is enabled:

| Endpoint | Purpose |
|---|---|
| `/wp-json` | REST API discovery |
| `/wp-json/syteops/v1/*` | SyteOps management endpoints |
| `/wp-json/flowmattic/v1/*` | FlowMattic workflow automation |
| `/wp-json/google-site-kit/*` | Google Site Kit |
| `/wp-json/wordfence/v1/authenticate` | Wordfence security |
| `/wc-auth/v1/*` | WooCommerce OAuth |

## What Gets Blocked

When REST restriction is enabled:
- Anonymous requests to WordPress core endpoints (`/wp-json/wp/v2/*`)
- Anonymous requests to unrecognized plugin endpoints
- Any endpoint not in the built-in or custom allowlist

When Block All is enabled:
- Everything, with no exceptions

## Security Details

- Blocked anonymous requests receive a randomized delay (200-800ms) before the 401 response to discourage automated probing
- Legitimate authenticated users experience no change
- REST API access logs are available for monitoring (configurable columns)

## Configuration

Settings are found on the **REST API** page in the Access Control card:
1. **Enable REST Restriction** — Toggle on to activate
2. **Block All REST API** — Toggle for full blocking
3. **Custom Allowlist** — Add additional paths as needed
4. **Save Changes**

## Troubleshooting

**A plugin stopped working after enabling restriction:**
Add the plugin's REST endpoint to the Custom Allowlist. Check the plugin's documentation for its REST namespace (usually `/wp-json/pluginname/v1/*`).

**WooCommerce issues:**
WooCommerce OAuth paths (`/wc-auth/v1/*`) are automatically allowed. If you have custom WooCommerce integrations, add their specific REST routes to the allowlist.

**Block All is too restrictive:**
Block All is intended for staging/development. Switch to standard REST restriction for production sites that need selective endpoint access.
