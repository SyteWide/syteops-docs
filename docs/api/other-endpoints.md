---
title: Other REST endpoints
sidebar_position: 7
description: Integration and webhook REST endpoints outside the general Manage API — licensing, leads ingest and qualification, proof packets, LinkCentral, and ContentPen relay.
---

# Other REST endpoints

:::warning
The endpoints on this page are **integration and webhook surfaces**, not part of the general Manage API. They do not follow the dispatch/manifest pattern and most require signed or tokenized requests specific to each subsystem. Do not attempt to call them with a `som_` API key unless explicitly noted.
:::

## Licensing

Namespace: `syteops/v1`. Authentication: HMAC-signed requests.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/license/webhook` | HMAC | Receives license lifecycle events from the upstream licensing service |
| `POST` | `/license/validate` | HMAC | Validates a license key and records the result locally |
| `POST` | `/license/control` | HMAC | Applies a control instruction (e.g. suspend or reinstate) to the local install |
| `POST` | `/license/syte-gateway-purchase` | HMAC | Records a purchase event arriving from the Syte gateway |
| `POST` | `/license/syte-gateway` | HMAC | General Syte gateway webhook receiver |

## Leads ingest

Namespace: `syteops/v1`. Authentication: rotating short-lived token.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/leads/bootstrap` | token | Mints a short-lived, rate-limited, cache-safe ingest token for a visitor session |
| `POST` | `/leads/ingest` | token | Records a conversion event; requires the rotating token returned by bootstrap |

The bootstrap/ingest pair is designed for front-end use: the page fetches `/leads/bootstrap` to obtain a token, then uses that token to call `/leads/ingest`. The token is rate-limited and cache-safe so that CDN or page-cache hits on the bootstrap request do not reuse stale tokens.

## Leads qualification

Namespace: `syteops/v1`. Authentication: ingest token (same gate as `/leads/ingest`).

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/leads/qualify` | token | Runs qualification logic against a lead record; reuses the ingest token gate |

## Leads proof

Namespace: `syteops/v1`. Authentication: HMAC query token.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/leads/proof/{ref}` | HMAC `t` param | Returns a read-only HTML proof packet for the lead identified by `ref`; the `t` query parameter carries the HMAC token |

The `ref` path segment identifies a specific lead record. The `t` query parameter must carry a valid HMAC-signed token; requests without a valid token are rejected. The response is an HTML document, not JSON.

## LinkCentral

Namespace: `syteops/v1`. Authentication: bearer token. These endpoints are only registered when the LinkCentral integration is enabled.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/linkcentral/process-links` | bearer | Processes and persists link data submitted by LinkCentral |
| `POST` | `/linkcentral/preview-links` | bearer | Returns a preview of how submitted links would be resolved without persisting |
| `GET` | `/linkcentral/status` | bearer | Returns the current status of the LinkCentral integration |

## ContentPen relay

Namespace: `syteops-int-cp/v1`. Authentication: HMAC signature verification.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/webhook` | HMAC | Verifies the request signature and relays the payload to the configured automation or FlowMattic workflow |

The ContentPen relay lives under its own namespace (`syteops-int-cp/v1`) and is only active when the ContentPen integration module is enabled. The receiving handler verifies the HMAC signature before forwarding; payloads that fail signature verification are silently dropped.
