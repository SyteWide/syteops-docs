---
sidebar_position: 18
title: REST Logging
description: Log REST API access in your WordPress site — sampling, retention, exclusions, hashed IPs, filtered log viewer, and CSV/JSON export.
---

# REST Logging

SyteOps includes a REST API access log that records incoming REST requests so you can audit who is calling your endpoints and spot abuse or misconfigured integrations. The log is scoped to your site, stored in the database, and configurable per install.

## Where to find it

**WordPress admin → SyteOps → REST API** (admin menu item).

The page has three stacked cards:

1. **Logging Settings** — enable/disable logging, sampling rate, retention, exclusions, hash-IP mode.
2. **Access Control** — the REST API Restriction toggle and custom allowlist (see [REST API Restriction](rest-api-restriction.md)).
3. **Log viewer** — filter bar + paginated table + export buttons.

## What gets logged

Per request, up to 19 fields can be recorded. Always-visible by default:

- **Timestamp (UTC)**
- **Route** — the REST route pattern matched (e.g., `/wp-json/wp/v2/posts/{id}`)
- **Method** — GET, POST, PUT, DELETE, etc.
- **Username** — the authenticated user, or `anonymous`
- **Outcome** — `allowed` or `blocked`, and HTTP status

Additional fields can be enabled through column selection, including IP address (plain or hashed), user agent, response size, duration, and error details.

## Logging Settings

| Setting | Purpose |
|---|---|
| **Enable REST Logging** | Master on/off. When off, no requests are recorded regardless of other settings. |
| **Sampling Rate (%)** | 1–100. At 100% every request is logged; at 25% roughly one in four is recorded. Use sampling on high-traffic sites to control database growth. |
| **Retention (days)** | 1–365. Older entries are pruned automatically. Default is 30 days. |
| **Excluded Routes** | Comma- or newline-separated route patterns to skip (useful for health checks and noisy internal routes). |
| **Excluded IPs** | Addresses that should never be logged (office IPs, monitoring services). |
| **Hash IPs** | When enabled, the IP field stores a one-way hash instead of the raw address. Useful for GDPR-conscious installs that still want correlation without storing PII. |

Save the form to apply changes. Settings take effect on the next request.

## Viewing logs

The filter bar lets you narrow the table by:

- **Route** (partial match)
- **IP** (exact, matches either plain or hashed depending on mode)
- **Username**
- **Date range**
- **Outcome** (allowed / blocked)

The table is paginated and sortable by column. Click any entry to see the full recorded row.

## Exporting logs

Two export buttons at the top of the log table:

- **Export CSV** — spreadsheet-friendly, good for archival or SIEM ingest.
- **Export JSON** — structured format that preserves nested fields.

Exports respect the current filter — if you've narrowed to blocked requests from the last 7 days, that's what you'll download. Exports are capability-gated; only users with the SyteOps admin capability can download.

## Typical use-cases

- **Audit who is calling your REST API** — catch unauthenticated scans, abusive bots, or misconfigured third-party integrations.
- **Confirm the REST restriction allowlist is doing what you expect** — combine the log viewer with [REST API Restriction](rest-api-restriction.md) to verify that only expected services reach protected routes.
- **Investigate a production incident** — filter by the affected route and date range; export the matching entries for post-incident review.
- **Size-up a new integration** — toggle logging on, run the integration once, inspect exactly which routes it hits. This is often faster than reading the integration's documentation.

## Performance notes

- Each logged request writes one row. On high-traffic sites, combine sampling (say, 10–25%) with exclusions for noisy routes.
- Retention pruning runs on a schedule; setting a short retention keeps the table small.
- The log table is indexed for the filter columns, but very wide date ranges over months of data may take a moment to paginate.

## Related

- [REST API Restriction](rest-api-restriction.md) — the allowlist that controls who can reach REST endpoints at all
- [Troubleshooting](../troubleshooting.md) — REST-related troubleshooting flows
- [Debug Tool](debug-tool.md) — a separate diagnostic surface for deeper plugin-level inspection
