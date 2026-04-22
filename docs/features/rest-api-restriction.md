---
sidebar_position: 7
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

Add specific endpoints that should be allowed even when restriction is enabled. Each endpoint is managed one at a time:

- Type a path in the input and click **Add** to save it — the row appears in the list immediately.
- Click the **×** next to any saved path to remove it — removal takes effect immediately.
- You do not need to click **Save Access Control** for allowlist changes; the Access Control save button only covers the Restrict REST API and Block All toggles.

Path rules:
- Must begin with `/`
- Wildcards allowed as suffix: `/wp-json/myplugin/v1/*`
- Non-REST paths supported: `/wc-auth/v1/*`
- Paths already covered by a built-in rule are rejected with a message — you don't need (and can't add) duplicates of the read-only list above.

## Built-In Allowlist

These endpoints are always allowed when REST restriction (not Block All) is enabled:

| Endpoint | Purpose |
|---|---|
| `/wp-json` | REST API discovery |
| `/wp-json/syteops/*` | SyteOps plugin endpoints |
| `/wp-json/syteops-int-cp/*` | ContentPen integration endpoints |
| `/wp-json/flowmattic/v1/*` | FlowMattic workflow automation |
| `/wp-json/google-site-kit/*` | Google Site Kit |
| `/wp-json/wordfence/v1/*` | Wordfence security |
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
- REST API access logs are available for monitoring (see below)

## REST API Monitoring

SyteOps includes a built-in REST API logging system to monitor API access on your site. Settings are on the **REST API** page under the Logging Settings card.

### Enabling Logging

Toggle **Enable REST Logging** to start capturing REST API requests. Logging is disabled by default.

### Logging Settings

| Setting | Default | Description |
|---|---|---|
| **Sampling Rate** | 100% | Percentage of requests to log (1–100). Lower values reduce database usage on high-traffic sites |
| **Retention** | 30 days | Logs older than this are automatically deleted daily (1–365 days) |
| **Hash IP Addresses** | Off | Stores HMAC-SHA-256 pseudonyms instead of raw IPs (GDPR-friendly) |

### Route Exclusions

High-volume routes can be excluded from logging to reduce noise. Three common routes are excluded by default:

- `/wp-json/wp/v2/` — WordPress Core REST
- `/wp-json/wc/store/` — WooCommerce Store API
- `/wp-json/oembed/` — oEmbed

You can add additional route prefixes to exclude (one per line).

### Log Table

The log table shows these columns by default:

| Column | Description |
|---|---|
| **Time** | Request timestamp in site timezone |
| **Route** | REST endpoint path (click to copy) |
| **Method** | HTTP method (GET, POST, PUT, DELETE) |
| **User** | Username or "Guest" |
| **IP Address** | Full IP or hashed value |
| **Auth Type** | Authentication method (logged-in, application password, JWT, unauthenticated, etc.) |
| **Outcome** | Result (allowed, allowlisted, blocked, failed auth, etc.) |
| **Status** | HTTP status code |
| **Time (ms)** | Request execution time |
| **User Agent** | Client identifier |

Additional columns (Site URL, Blog ID, User ID, Roles, Query String, Request Body, Referrer, Allowlist Pattern) are available via **Screen Options** at the top of the page.

### Filtering

Use the filter bar to narrow results by:
- **Route** — Search by endpoint path
- **IP Address** — Filter by specific IP
- **User** — Filter by username or user ID
- **Date** — Filter by calendar date
- **Outcome** — Filter by result type (allowed, blocked, etc.)

### Exporting Logs

Click **Export CSV** or **Export JSON** to download the currently filtered log data. Exports include up to 5,000 rows and respect all active filters.

### Clearing Logs

Use the **Clear All Logs** button to permanently delete all log entries. This action cannot be undone.

## Configuration

Settings are found on the **REST API** page in the Access Control card:
1. **Enable REST Restriction** — Toggle on to activate
2. **Block All REST API** — Toggle for full blocking
3. **Save Access Control** to apply the two toggles above
4. **Custom Allowlist** — Add paths one at a time using the input + **Add** button; remove any saved path with its **×**. These changes save immediately and do not require the Save Access Control button.

## Troubleshooting

**A plugin stopped working after enabling restriction:**
Add the plugin's REST endpoint to the Custom Allowlist. Check the plugin's documentation for its REST namespace (usually `/wp-json/pluginname/v1/*`).

**WooCommerce issues:**
WooCommerce OAuth paths (`/wc-auth/v1/*`) are automatically allowed. If you have custom WooCommerce integrations, add their specific REST routes to the allowlist.

**Block All is too restrictive:**
Block All is intended for staging/development. Switch to standard REST restriction for production sites that need selective endpoint access.

## Related

- [REST Logging](rest-logging) — record and review the REST requests your restriction is (or isn't) blocking
- [White Label & Client Protection](white-label) — pair REST restriction with white-label mode for fully curated client admins
- [Troubleshooting](../troubleshooting) — REST-related troubleshooting flows
