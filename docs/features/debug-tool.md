---
sidebar_position: 8
title: Debug Tool
description: Diagnostic and maintenance tools for SyteOps administrators.
---

# Debug Tool

The Debug Tool provides diagnostic, search, and maintenance capabilities for SyteOps administrators. It is designed for troubleshooting, cleanup, and advanced configuration management.

## Accessing the Debug Tool

1. Enable **Debug Mode** in the Admin tab
2. Navigate to **SyteOps > Debug Tool** in the WordPress admin menu
3. You must have the **SyteOps Admin** role

When Debug Mode is disabled, the Debug Tool menu item is hidden.

## Search

Search across your site's stored data to find specific values:

- **WordPress Options** — Search across all SyteOps option keys
- **FlowMattic Variables** — Search across FlowMattic variable names and values

Enter a search term and select which data sources to include. Results appear dynamically.

## Find & Replace (FlowMattic Workflows)

Perform safe find-and-replace operations across FlowMattic workflow data.

### Scope

You can target two areas:
- **Completed History** — Past workflow execution data
- **Saved Definitions** — Active workflow steps and settings (affects future executions)

### Workflow

1. Enter the **search string** and **replacement string**
2. Click **Preview** to see all matches without making changes
3. Review the preview results
4. Click **Execute** to apply replacements in batches

### Safety Features

- **Preview before execute** — Always review matches before applying changes
- **Batched processing** — Processes in configurable batches (25–2,000 items) to prevent timeouts
- **Automatic backups** — JSON backup files are created for each batch in the admin storage directory
- **Cancellation** — You can cancel mid-execution with a progress bar showing current status

## Debug Logs

View and manage all SyteOps and WordPress debug log files.

### Available Logs

- **SyteOps main debug log**
- **Module-specific logs** (Notes, Estimates, Banners)
- **FlowMattic variable update logs**
- **FlowMattic sync logs**
- **WordPress debug.log**

Each log shows its file size and last modified time. Click **Download** to save a copy locally, or expand to preview the last 128 KB of content.

### Log Management

| Action | Description |
|---|---|
| **Create All Logs** | Write test entries to all log files (verifies logging is working) |
| **Clear WordPress debug.log** | Delete only the WordPress debug.log file |
| **Delete All Logs** | Delete all SyteOps and FlowMattic log files including archived logs |

### WordPress Logging-Only Mode

Toggle this option to send PHP errors to the log file without displaying them to visitors. Useful for capturing errors on production sites without affecting the user experience.

## Variable Maintenance

### Orphan Cleanup

Detect and clean up stray FlowMattic variables that are no longer managed by SyteOps:

1. Click **Show/Refresh Summary** to scan for orphaned variables
2. Review the results
3. Enable **Strict Orphan Deletion** mode if you want resync operations to automatically remove unrecognized variables
4. Click **Delete Orphaned FlowMattic Variables** to remove them permanently

### Bulk Actions

- **Delete All Orphaned Option Metadata** — Remove orphaned Flow Custom option metadata
- **Decode All HTML Fields** — Fix entity-encoded HTML in Notes, Estimates, and user fields

## System Information

The Debug Tool displays diagnostic information about your installation:

- **Module status** — Active modules and their configuration
- **Admin storage** — File counts and directory status
- **JavaScript bundle** — Bundle file status, size, and permissions with a **Force Rebuild** option
- **Restricted plugins** — List of plugins managed by SyteOps with their current status

## Integrations Debug

Toggle **Integrations Code Injection Debug** to output HTML comments in your site's page source showing module status, active integrations, and saved code snippets. This helps diagnose integration-related rendering issues.

## Module Jobs

View recent module operations with their status and execution details:

| Column | Description |
|---|---|
| **Module/Job** | The module and job type |
| **Operation** | What action was requested |
| **Status** | Current state (pending, complete, failed) |
| **Requested / Completed** | Timestamps |
| **User** | Who initiated the operation |

Use **Clear History** to remove all job records.

## Disabling Debug Mode

To disable the Debug Tool, either:
- Turn off **Debug Mode** in the Admin tab, or
- Use the **Disable Debug Tool Access** button in the Debug Tool's Danger Zone section
