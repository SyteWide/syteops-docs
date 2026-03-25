---
sidebar_position: 4
title: Module Auto-Updates
description: How SyteOps automatically checks for and installs module updates.
---

# Module Auto-Updates

SyteOps periodically checks the SyteWide distribution server for newer versions of your installed modules and notifies you when updates are available. This keeps your modules current without requiring you to manually check for new releases.

## How It Works

SyteOps runs an automatic check **twice daily** in the background using WordPress cron. Each check compares your installed module versions against the latest available versions on the SyteWide distribution server.

When a newer version is found, the update appears in the **Modules** section of the Admin tab, alongside your installed modules.

No action happens automatically -- SyteOps notifies you that an update is available and waits for you to install it.

## Installing an Update

When an update is available for a module:

1. Navigate to the **Modules** section of the Admin tab
2. Click the **update button** next to the module
3. SyteOps downloads the new `.sytepkg` package from the distribution server
4. The package signature is verified and contents are decrypted
5. The updated module code is installed

**Your module data and settings are preserved.** Only the module code is updated -- your configuration, saved data, and FlowMattic variable assignments carry over to the new version.

## Per-Module Control

You can disable automatic update checking for individual modules if needed. This is useful when you:

- Have **customized a module** and do not want the customizations overwritten
- Want to **pin a specific version** for stability
- Are **testing** and need to control exactly which version is running

Modules with update checking disabled are skipped during the twice-daily check. You can still update them manually by uploading a new package through the standard module upload flow.

## Requirements

Module auto-updates depend on three things:

| Requirement | Why it's needed |
|---|---|
| **Valid SyteWide Product License** | Provides both the update manifest URL and the decryption key for downloading packages |
| **Outbound internet access** | Your site must be able to reach the SyteWide distribution server to check for and download updates |
| **WordPress cron functioning** | SyteOps uses WP-Cron for scheduled update checks; if WP-Cron is disabled or blocked, checks will not run on schedule |

If your hosting environment disables WP-Cron, you can configure a system-level cron job to trigger `wp-cron.php` on a schedule. Consult your hosting provider's documentation for details.

## Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| No updates showing | The check runs every 12 hours; you may already be up to date | Wait for the next check cycle, or manually trigger a check from the Modules section |
| "Download failed" | Site cannot reach the distribution server | Verify your server has outbound internet access; check firewall rules |
| Update keeps failing | After 3 consecutive failures, SyteOps backs off to daily checks | Check the SyteOps error log for specific error messages; ensure your license is valid |
| Module version did not change after update | Browser cache may show stale data | Refresh the admin page; the module registry updates immediately after install |
