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

By default nothing installs automatically -- SyteOps shows the update and waits for you to install it. Whoever runs your license server can switch on **automatic module updates** for your site; then SyteOps installs updates for the modules you already have on its own during that twice-daily check. It never installs a module you do not already have, and never brings back one you uninstalled. The Modules section shows whether automatic updates are on, and what the last automatic run installed or why it could not.

The list of available modules, and the keys a site needs to verify and install them, come from the license server. A connected site picks these up again **once a day** in the background, so a newly published module version reaches every connected site within about a day. A site that has never been connected to the license server is not offered updates until it is connected once.

A small number of modules exist only to run the plugin's own licensing and support infrastructure. These never appear in your available-modules list and are never offered for install, regardless of connection status.

:::note Not seeing any updates?
The check can only find a newer version when one has been **published** to the distribution server.
If your modules were supplied to you directly -- installed from a package file rather than
downloaded -- there may be nothing published for SyteOps to find, and the check will keep reporting
that you are up to date.

That is not a fault. You can always update a module by uploading a newer package yourself: see
[Installing an Update](#installing-an-update) below and use the upload option. If you are unsure
whether a newer version exists, ask whoever supplies your modules.
:::

## Installing an Update

When an update is available, the module's version shows **Update available: 1.0.024 → 1.0.025** with an **Update** button. Only a SyteOps Admin sees these controls.

1. Navigate to the **Modules** section of the Admin tab (use **Check for updates** to look again right away)
2. Click **Update** next to the module
3. SyteOps fetches the new package, checks its signature and checksum, and unpacks it beside the installed version
4. Only a complete, verified package replaces the installed one; if anything fails, the installed version is kept and the reason is shown

Only one module installs at a time. If another install is already running (for example the automatic run), the button tells you so -- try again a minute later.

## Installing a New Module

Modules your license server offers to your site that are not installed yet appear under **Available to install**. Click **Install**; if **Enable modules after installation** is on, the new module is also switched on.

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
| No updates showing | The check runs every 12 hours; you may already be up to date -- **or** nothing has been published for your modules to update to | Wait for the next check cycle, or manually trigger a check from the Modules section. If updates never appear, confirm with your module supplier that packages are being published; you can always update by uploading a package manually |
| "Download failed" | Site cannot reach the distribution server | Verify your server has outbound internet access; check firewall rules |
| Update keeps failing | After 3 consecutive failures, SyteOps backs off to daily checks | Check the SyteOps error log for specific error messages; ensure your license is valid |
| Module version did not change after update | Browser cache may show stale data | Refresh the admin page; the module registry updates immediately after install |
