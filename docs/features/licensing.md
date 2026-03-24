---
sidebar_position: 10
title: Licensing
description: Product License activation, Management Connections, and license states in SyteOps.
---

# Licensing

SyteOps uses two separate licensing systems. Understanding the difference prevents confusion.

## Product License (Domain A)

Your **Product License** is the SyteWide license key that proves you purchased SyteOps.

### Activation

1. During Initial Setup, enter your license key
2. Click **Save & Activate** (server) or **Activate** (endpoint)
3. The license validates against SyteWide's licensing API
4. Activation limits apply based on your plan (1, 5, 15, 50, or unlimited sites)

### License States

| State | Meaning |
|---|---|
| Active | License is valid and working |
| Inactive | License has not been activated |
| Expired | License term has ended |
| Suspended | License suspended by issuer |
| Revoked | License revoked by issuer |
| Unknown | Cannot reach licensing server |

### Lock Behavior

When a license is revoked or disabled:
- All modules are turned OFF
- Debug Tool is hidden
- All users (including SyteOps Admins) are routed to Initial Setup only
- The Admin tab is not accessible
- **All settings are preserved** — nothing is deleted

When the license validates again, everything is automatically restored.

### Activation Errors

| Error | Meaning | Action |
|---|---|---|
| `unauthorized_domain` | Domain not authorized for this license | Check that your site URL matches the license |
| `in_use` | License active on another domain | Deactivate on the other site first |
| `max_activations` | Activation limit reached | Upgrade your plan or deactivate unused sites |
| `license_expired` | License term ended | Renew your license |
| `deleted` / `blacklisted` | License permanently blocked | Contact support |
| `server_unreachable` | Cannot reach licensing server | Check your internet connection and try again |

## Management Connection (Domain B)

The **Management Connection** is a separate system for server-to-endpoint control. It allows a SyteOps Server to remotely manage SyteOps Endpoints.

### Key Concepts

- **Connection ID** — Unique identifier for a server-endpoint connection
- **Issued Connections** — Connections created by the server for endpoints
- **Server mode** — The controlling site that manages endpoints
- **Endpoint mode** — A site managed by a server

Management Connections are completely independent from your Product License. A valid Product License is required for both servers and endpoints, but the connection system operates separately.

## GitHub Update Token

For receiving plugin updates from private GitHub repositories:
1. Enter the token in Licensing Setup (server-mode) or Admin tab
2. Choose between:
   - **Official Releases** (default) — Stable production builds
   - **GitHub Repo** — Beta/development builds
3. WordPress checks for updates automatically once configured
