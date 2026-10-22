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
5. Until a SyteOps Admin exists, any WordPress administrator can activate a license and run first-time setup. Once one exists, only a SyteOps Admin can run license setup, change the licensing settings or reopen the activation screen. One exception: a FlowMattic license key and email can be saved by any administrator through the FlowMattic install and activate actions.
6. License checks run when a signed-in user opens an admin screen, not for a visitor who is not signed in. A locked site with no administrator visiting re-checks the next time someone signs in.
7. The **Go to Reactivation** button and the **Return to activation screen** link are for a SyteOps Admin. Reopening the activation screen asks you to confirm first, because it takes the SyteOps Admin role away from everyone until a license is activated again.

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

### When your site's address changes

A Product License is activated for your site's address. If the same site moves to a new address (for example from `example.com` to `cms.example.com`), the license keeps working for 14 days: the plugin sees that the activation is still under the old address, and every administrator gets a notice naming both addresses and the date it stops working. Move the license promptly: run the license move command for your site with the old address (it frees the old address's activation and activates the new one with the same key), or remove the old address from the license in your account and then activate the license on the site. Before it frees anything, the move asks the old address for proof: the new front end that now serves it must name this site as its backend. If it names a different site, the move is refused, so a copy can never take the original site's activation; if there is no proof yet (WordPress still answers there, or nothing answers), the move waits and can be run again. If the old address no longer exists at all, activate the license by hand instead. The daily license check does not activate the new address on its own, because that would use a second activation. After 14 days the site is locked until the license is moved, so a copy of a site cannot keep using the original site's license.

This applies only to the address the license was last confirmed for. A site whose address matches nothing the license knows is treated as a different site, as before.

The site's Management Server connection moves the same way. After the license move, run the connection move command for your site with the old address: it asks your Management Server to file the site's connection under the new address, so the server keeps recognizing the site for module delivery and LinkedIn sign-in. The server asks the old address for the same proof itself before it changes anything, and running the command again changes nothing. Update your Management Server first: one running an older version answers that it cannot move connections yet, and nothing changes.

For tooling, the license status command-line check with JSON output prints the comparison as one object: whether the license is active, the address it is held under, the site's current address, whether they match, whether the move is available, when the license was last checked, and when a moved site's 14 days end. It can also run one live check first. The move has a dry run that reports what it would do and changes nothing. Neither prints the license key.

### Revoking a connection

On a Management Server, **Revoke** is final. A revoked connection is not restored by a request from the site: the site is told the connection was revoked, it is given nothing, and nothing on the server changes. When the site could be reached, the server removes its row from the connections table and the site can request a new connection. When it could not be reached, the row stays marked revoked until you delete it. To reconnect a revoked site, delete the connection on the server (**Delete Connection**), then use **Request Connection** on the site.

### Activation Errors

| Error | Meaning | Action |
|---|---|---|
| `unauthorized_domain` | Domain not authorized for this license | Check that your site URL matches the license |
| `in_use` | License active on another domain | Deactivate on the other site first |
| `max_activations` | Activation limit reached (also shown when the licensing server refuses a new address for want of a free activation) | Upgrade your plan or deactivate unused sites |
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

### The Management Server your site is set up with

Your site sends its connection ID and Management Server Secret only to the Management Server they were entered for. The **Bound server** shown on the Management Server Connection card is that server: it is recorded when you enter the Management Server Secret (or a connection ID) in the dashboard, for the address saved at that moment. A secret that a server pushes to your site never changes it. A site that was already connected before this update is bound to its current Management Server automatically.

If you change the Management Server address, nothing is sent to the new address until you enter the Management Server Secret again. You can do it in the same save as the new address, or save the address first and the secret afterwards. Typing the secret moves the binding to the new address and removes any other stored secret you did not type (for example the connection ID): use **Request connection** afterwards to get a new connection ID from the new server. If the card says the record of the bound server is missing, type the Management Server Secret again with the address unchanged (any other stored secret, such as the connection ID, is removed at that point; use **Request connection** to get a new one). The address must be a plain `https://` address on a public host name (no user name, port, query string or IP address).

To limit which servers a site may use, set a list of permitted servers in `wp-config.php` (the `SYTEOPS_MANAGEMENT_SERVER_HOSTS` constant), as host names separated by commas (a host also allows its subdomains). When the list is set, an address that is not on it is refused when saved and when used. A list that is set but empty or malformed refuses every address until it is corrected.

After you change the Management Server address, enter the Management Server Secret again and use **Request connection**. A list of permitted servers can be set in `wp-config.php`. To remove a connected site, delete its connection row on the server (**Delete Connection**): a site keeps working with its own connection secret until its row is deleted, and rolling the Management Server Secret does not shut it out. If the site may have been compromised, also roll the Management Server Secret.

Management Connections are completely independent from your Product License. A valid Product License is required for both servers and endpoints, but the connection system operates separately.

## Package Encryption Keys

Your Product License automatically delivers the encryption key needed to install encrypted `.sytepkg` module and workflow packages. No manual key configuration is required.

The key is refreshed automatically during daily license validation. If you encounter a "package key not available" error when installing a `.sytepkg` package, go to **Admin tab > Product License > Recheck** to re-validate your license and refresh the key.

See [Encrypted Packages](modules/packages) for details on the `.sytepkg` format.

## GitHub Update Token

For receiving plugin updates from private GitHub repositories:
1. Enter the token in Licensing Setup (server-mode) or Admin tab
2. Choose between:
   - **Official Releases** (default) — Stable production builds
   - **GitHub Repo** — Beta/development builds
3. WordPress checks for updates automatically once configured
