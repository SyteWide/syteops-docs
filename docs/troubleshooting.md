---
sidebar_position: 100
title: Troubleshooting
description: Common issues, error messages, and solutions for SyteOps.
---

# Troubleshooting

Common issues and solutions for SyteOps administrators.

## License Issues

### "License locked" — All users routed to Initial Setup

**Cause:** License was revoked, disabled, or could not be validated.

**Solution:** Re-enter your license key in Initial Setup and activate. All settings are preserved and will be restored once the license validates.

### Activation Error Codes

| Error | Cause | Solution |
|---|---|---|
| `unauthorized_domain` | Site URL doesn't match license | Verify your domain matches the one registered with your license |
| `in_use` | License active on another site | Deactivate on the other site first, or upgrade your plan |
| `max_activations` | Too many active sites | Deactivate unused sites or upgrade your plan |
| `license_expired` | License term ended | Renew your license through your account |
| `deleted` / `blacklisted` | License permanently blocked | Contact support |
| `server_unreachable` | Can't reach licensing server | Check internet connection; retry later |

### License Status Shows "[object Object]"

**Cause:** Licensing server is unreachable.

**Solution:** Check your internet connection and retry. The status display will show a human-readable error message.

## SyteOps Admin Role Issues

### Role Disappeared or Capabilities Missing

**Solution:** Navigate to any WordPress admin screen. SyteOps automatically recovers the role and its capabilities on admin page load.

### Can't Assign SyteOps Admin to Another User

**Cause:** Only existing SyteOps Admins can assign this role.

**Solution:** Have an existing SyteOps Admin make the assignment.

## Module Issues

### Module Not Appearing After Upload

**Solution:** Ensure the ZIP file is a valid SyteOps module package. Re-upload if needed.

### Module Data Missing After Re-activation

**Cause:** This should not happen — deactivation preserves data.

**Solution:** Check that the module was deactivated (not uninstalled). If data is truly lost, restore from a backup.

## FlowMattic Issues

### Variables Not Syncing

1. Verify FlowMattic is activated and has a valid license
2. Use the **Resync All Variables** button
3. Look for FlowMattic readiness warnings in the SyteOps admin — these indicate FlowMattic isn't reachable

### FlowMattic Won't Install During Initial Setup

1. Check server connectivity to WordPress.org
2. Verify `/wp-content/plugins/` is writable
3. Install FlowMattic manually, then return to SyteOps setup

## Backup and Restore Issues

### Backup Errors

| Error Code | Meaning | Solution |
|---|---|---|
| `backup_err_zip_open` | Cannot open backup ZIP | Verify the file is not corrupted; re-download or re-create |
| `backup_err_manifest_missing` | Manifest.json missing from archive | The ZIP is not a valid SyteOps backup |
| `backup_err_manifest_schema` | Invalid manifest format | Backup may be from an incompatible version |
| `backup_err_checksum_mismatch` | File integrity check failed | Backup file is corrupted; use a different backup |
| `backup_err_path_traversal` | Invalid file path detected | Security violation — do not use this backup |
| `backup_err_cross_site_invalid` | URL mapping failed | Check that URL rewrite is enabled for cross-site restores |

### Post-Restore License Lock

**Cause:** Expected security behavior — license must be re-verified after restore.

**Solution:** Complete the license re-check prompt that appears after restore.

## REST API Issues

### Plugin Stopped Working After Enabling REST Restriction

**Solution:** Add the plugin's REST endpoint to the Custom Allowlist. Format: `/wp-json/pluginname/v1/*`

### WooCommerce Connectivity Issues

WooCommerce OAuth (`/wc-auth/v1/*`) is automatically allowed. For custom WooCommerce integrations, add their specific routes to the allowlist.

## UI Issues

### Save Changes Button Does Nothing on Admin Tab

**Cause:** This was fixed in a previous version. Update to the latest version.

### WooCommerce Admin Pages Blank

**Cause:** This was fixed in a previous version. SyteOps no longer loads CSS/JS on WooCommerce admin screens.

### Safari Form Input Lag

**Cause:** Known Safari performance issue with form validation. Fixed in codebase — update to latest version.

## Module Updates

### No Updates Showing

**Cause:** SyteOps checks for updates every 12 hours. You may already be on the latest version.

**Solution:** Wait for the next automatic check, or manually trigger a check from the Modules section. If no updates appear, your modules are up to date.

### Update Download Fails

**Cause:** Site cannot reach the SyteWide distribution server.

**Solution:** Verify your server has outbound internet access. Check firewall rules. Ensure your Product License is valid — the license provides both the update manifest URL and the decryption key.

### Update Keeps Failing

**Cause:** After 3 consecutive failures, SyteOps backs off to daily checks to avoid hammering the server.

**Solution:** Check the SyteOps error log for the specific error message. Verify your license is valid and your server can reach the distribution endpoint.

## Encrypted Packages (.sytepkg)

### "Package key not available"

**Cause:** Your Product License has not been validated, so the decryption key has not been delivered.

**Solution:** Go to **Admin tab > Product License > Recheck** to validate your license. The key is delivered automatically during validation.

### "Signature verification failed"

**Cause:** The package file is corrupted or was signed by an untrusted key.

**Solution:** Re-download the package from its original source. If the problem persists, contact the package provider.

### "FlowMattic unavailable" During Workflow Import

**Cause:** FlowMattic is not installed or not active.

**Solution:** Install and activate FlowMattic before importing workflow template packages.

### "Unsupported schema version"

**Cause:** The package was built with a newer version of SyteOps than you're running.

**Solution:** Update SyteOps to the latest version.

## Workflow Templates

### Imported Variables Are Empty

**Cause:** Sensitive values (API keys, passwords, tokens) are automatically scrubbed during workflow export. This is by design to prevent credential leakage.

**Solution:** After import, configure the scrubbed variables with your site-specific credentials. Variables requiring configuration will have placeholder values.

### Workflow Conflict on Import

**Cause:** A workflow with the same name already exists on your site.

**Solution:** Choose a conflict resolution policy: **Overwrite** to replace the existing workflow, **Create New** to import alongside it with a timestamp suffix, or **Skip** to keep the existing version.

### Variables Not Syncing After Import

**Cause:** FlowMattic master sync may need a manual trigger after import.

**Solution:** Use the **Resync All Variables** button in the Debug Tool.

## AI Providers

### Balance shows "—" or fails to refresh

**Cause:** The provider either does not expose a balance endpoint, or the response format changed (Straico did in v1.3.036, and the parser was corrected then).

**Solution:** Click the per-provider refresh icon on the **API Keys** tile. If it still fails, check the provider dashboard directly — your actual balance is authoritative there. For Straico specifically, confirm you're on v1.3.036 or newer.

### Models not loading in the dropdown

**Cause:** Missing or invalid API key for that provider; cached model list stale; intermittent provider outage.

**Solution:**
1. Confirm the provider's key is saved (the field should show a masked value).
2. Click **Fetch Models** on the AI area to force a cache refresh.
3. If the provider is Straico and models still do not appear, the cache may be stuck on v1 format — updating to v1.3.038 clears it automatically.

### Keyword enrichment timeouts / skipped links

**Cause:** Destination-site fetches that stall; AI requests that exceed the provider's timeout; very long URLs or noisy HTML responses.

**Solution:**
- SyteOps automatically retries timed-out AI requests once with a longer timeout before skipping. If skipped, the skip reason is shown in the post-run summary.
- Reduce **Concurrent Workers** (LinkCentral Enrichment Settings) if the destination sites are rate-limiting you.
- For Straico specifically, concurrency is locked to 1 (proxy latency) and the prompt is trimmed — no user action needed, but expect slower throughput.
- If timeouts are persistent for specific links, use **Enrich Single Link** on the LinkCentral link's edit screen with a provider override to isolate the failing link.

### Context AI dropdown only shows three providers

**This is by design.** Context AI requires web-search capability. Only **Perplexity**, **OpenRouter**, and **Straico** can serve Perplexity Sonar models. SyteOps filters the dropdown so you can't accidentally choose a non-capable provider.

## Integrations

### Webhook signature verification failed

**Cause:** The token/secret sent by the external service does not match the one saved in SyteOps, or the request was altered in transit (unlikely over HTTPS).

**Solution:**
- Open the integration's card on the **System / API** tab and compare the saved token to what the external service is sending.
- If you rotated the token, update both sides in one session.
- Confirm the webhook URL path is exact — a trailing slash or mismatched namespace will also return signature-style errors on some integrations.

### Integration toggle is disabled with "Not Installed"

**Cause:** The integration is plugin-based and the target WordPress plugin is not active on this site.

**Solution:** Install and activate the third-party plugin (listed on the integration card). SaaS/API integrations (Slack, AWS SES, Cloudflare) never show "Not Installed" because they have no WordPress plugin to detect.

## Server Connections

### Endpoint scan fails on a specific site

**Cause:** The endpoint site is unreachable, has REST restriction locked down too far, or the management connection token has been rotated without updating the server side.

**Solution:**
1. Confirm the endpoint site is up and reachable from your server.
2. On the endpoint, open **SyteOps → REST API** and confirm that `/wp-json/syteops/*` is allowed (it should be automatic; check if the allowlist was manually edited).
3. Re-issue the management connection token from the server if you suspect it was rotated.

### "Management Connection" vs "Product License"

These are **two independent systems** — do not confuse them. See [Licensing](features/licensing) for the distinction:

- **Product License** — activation of the SyteOps plugin itself against the FluentCart gateway. Errors here block plugin features.
- **Management Connection** — a server-to-endpoint connection for remote control. Errors here block the scan/control flows but do not affect plugin licensing.

## Variable Sets

### Import fails with "schema mismatch"

**Cause:** The export came from a SyteOps version with a different variable-set schema.

**Solution:** Update the destination site to the same version (or newer) as the source, then retry the import. Scoped variable-set imports are versioned; cross-version imports are not guaranteed to succeed.

### Variable not appearing in FlowMattic after creation

**Cause:** The master sync has not run yet, or the variable set is not currently published.

**Solution:** Use the **Resync All Variables** button in the Debug Tool to force a sync. If still missing, confirm the variable set is in published state, not draft.

## Debug Mode

Enable Debug Mode in the Admin tab to access the [Debug Tool](features/debug-tool):
- **Search** — Search across options and FlowMattic variables
- **Find & Replace** — Safe find-and-replace across FlowMattic workflow data with preview and backups
- **Structured logs** — View, download, and manage debug logs
- **Variable maintenance** — Orphan cleanup, HTML field decoding, stray variable detection
- **Destructive wipes** — Variable cleanup (requires SyteOps Admin + Debug Mode)

See the full [Debug Tool](features/debug-tool) documentation for details.

## Getting Help

- Visit [sytewide.com](https://sytewide.com) for support
