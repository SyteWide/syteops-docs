---
sidebar_position: 1
title: FlowMattic Integration
description: How SyteOps syncs configuration to FlowMattic variables, enables multi-site deployment templates, and powers self-routing workflows.
---

# FlowMattic Integration

SyteOps and FlowMattic work as a pair. SyteOps is the configuration layer — structured, persistent, governed. FlowMattic is the execution layer. Every value you define in SyteOps becomes a FlowMattic variable your workflows can reference. Change the value in SyteOps, the workflows already know.

## What Gets Synced

Every configuration change you make in SyteOps is automatically written to FlowMattic variables:

- User names, emails, phone numbers, and CRM IDs
- Role assignments and aggregator groups (all names, all emails, Slack handles)
- CRM system names, codes, and configuration
- API keys and integration credentials (available to workflows, not displayed in plain text)
- Variable set values (static, dynamic, and grouped RSVS sets)
- Module-specific data from active modules

The result: your workflows always have access to current data. No manual FlowMattic variable management.

## Requirements

- FlowMattic must be installed and activated
- FlowMattic must have a valid license
- SyteOps handles FlowMattic installation and activation during Initial Setup if needed

## Deployment Templates

One of the most powerful applications of SyteOps + FlowMattic is **deployable workflow templates**.

**The pattern:**
1. Build your FlowMattic workflows referencing SyteOps variable names (e.g., `syteops_user_001_email`, `syteops_std_systm_contact_project_manager_all_emails`)
2. Export your SyteOps configuration and your FlowMattic workflows
3. Import both on a new site — SyteOps populates the variables, FlowMattic picks them up
4. Fill in the site-specific user and CRM data in SyteOps
5. The workflows are live and accurate without any workflow editing

This is how agencies deploy standardized automation across client sites without rebuilding from scratch. The workflow logic is a template; SyteOps provides the data layer that makes it site-specific.

## How Sync Works

- **Automatic** — Changes save to FlowMattic immediately when you click Save
- **Safe** — Empty values are never written, so SyteOps won't accidentally clear data already in FlowMattic
- **Module-aware** — When a module is deactivated, its FlowMattic variables are cleaned up; when re-activated, they are restored
- **Async pipeline** — Saves enqueue a sync job; the worker processes the sync without blocking your save response

### Blank-Save Behavior

- **Standard module variables and Users**: Blank save deletes the variable from FlowMattic
- **Suffix families** (Module Custom, Flow Custom, Dynamic, CRM combined): Save-only; explicit Delete action required to remove

## When you delete the plugin

SyteOps keeps copies of its settings, including saved API keys, as FlowMattic variables whose names start with `syteops_`. When you delete the plugin you decide what happens to them:

- **Keep FlowMattic variables** (the default) — the variables stay in FlowMattic as they are, including saved keys. When a settings snapshot could be saved, a reinstall offers to restore it (see below).
- **Remove variables SyteOps manages** — every FlowMattic variable whose name starts with `syteops_` is deleted when the plugin is deleted. Variables that do not start with `syteops_` (yours, or another plugin's) are never touched, and FlowMattic's own tables, workflows and license settings stay as they are.

**Where you choose.** Click **Deactivate** on the Plugins screen (WordPress shows Delete only for a plugin that is already deactivated, so Deactivate is the moment SyteOps can still ask). A dialog says that deactivating deletes nothing, then asks: if this plugin is later deleted, what should happen to its FlowMattic variables? The answers are pre-set from your saved choice. Continue saves your answer and then deactivates; Cancel does nothing. Tick **Don't ask again on this site** to stop the question; the same choice, and a checkbox to turn the question back on, are on the Admin tab in the Reset All Settings card, under **When the plugin is deleted: FlowMattic variables**. A bulk Deactivate from the Plugins list asks the same question. On a network, a Network Deactivate saves your answer for every site in the network.

**Deleting never asks.** Deleting the plugin from the Plugins screen, a bulk delete, a delete without JavaScript, the command line and a remote uninstall all use the choice saved on the Admin tab. Reset All Settings returns the choice to Keep and turns the question back on.

**Deactivating never deletes anything.** Turning the plugin off, even for a moment, leaves every FlowMattic variable in place. Earlier versions removed the variables at deactivation when the old "Clear FlowMattic variables" toggle was on; now the removal happens when the plugin is deleted. A site that had that toggle on starts on Remove, and a site that did not starts on Keep.

The uninstall log line says, for each site, which choice was used and how many variables were removed, and whether a settings snapshot was written and to which folder.

### Wipe all FlowMattic data

The Deactivate dialog has a third choice, **Wipe all FlowMattic data**. It is destructive: it cannot be undone and nothing is backed up. It is meant for a site where you want FlowMattic itself emptied, not only the variables SyteOps manages.

How it works:

- **It is armed, not saved.** Choosing it in the Deactivate dialog arms it for **60 minutes**. It is carried out only if the **same person** who confirmed it deletes the plugin from the Plugins screen within that time. The Admin tab shows an armed wipe with the time it expires and a **Cancel the wipe** button, and choosing Keep or Remove cancels it.
- **You type the site address.** The dialog shows what will be removed and keeps **Continue** disabled until you have typed the site address. The address is checked again on the server. The choice cannot be combined with **Don't ask again**, and only a user who can delete plugins can choose it.
- **What happens when it is not carried out.** If the hour passes, the earlier choice applies again (Keep or Remove, whichever you had before arming it). If the plugin is deleted by someone else, by a remote uninstall, the command line or a scheduled task, the wipe is refused and the variables the plugin manages are removed instead; the uninstall log says why. A damaged or unreadable arming is treated as Keep.
- **On a network** it can only be chosen from the network Plugins screen by a super admin, and it applies to every site. It runs only if every site of the network is armed by the same confirmation; if a site is not (for example one created later, or one whose admin chose Keep) nothing is wiped on any site.

What it removes: FlowMattic is deactivated first, every copy of it (its files stay, so you can activate it again later and it starts empty). Then it removes every FlowMattic table, its settings and saved connection data, its scheduled jobs, the files it saved in its own folders (PDFs, images, signatures and similar under uploads, and the folder of custom apps), its translation files, its user and post fields, and the workflow manager role it added along with the permission it gave administrators. Users who held only that role are left without a role, and WordPress deactivates plugins that require FlowMattic.

Tables your own workflows built are listed in the dialog, split into those that would be dropped and those that would be left. A table is dropped only when it looks exactly like what FlowMattic creates (an auto-incrementing `id`, and exactly the columns it recorded, all of the same text type) and it is not a WordPress table. FlowMattic also records tables it did not create, for example when you gave a new table the name of one that already existed, so any table that does not match exactly is **left and named in the uninstall log**. If a table shown as left really is yours to remove, drop it by hand.

What it leaves: files you saved to the Media Library or to a folder you chose yourself, general-purpose post and user fields that other tools also use, settings that other plugins may own (for example connection data of another MCP plugin, and login links), and FlowMattic's own plugin files. If you want FlowMattic gone completely, delete its plugin files yourself. A request that was already running when the plugin was deleted can still re-create a little FlowMattic data; the wipe sweeps once more at the end of the delete request.

### Reinstalling after Keep

With Keep, deleting the plugin saves two things. A **settings snapshot** goes in the private backups folder: the settings the kept variables come from, your integration switches and your variable-set tabs. Saved keys in it stay encrypted with this site's security keys. The snapshot never contains license or lock state, the plugin's own run-state stamps, the private storage location, or the stored password of the Licensing Gateway module. A small **marker file** (`syteops-kept-variables-<fingerprint>.json`, in the `wp-content` folder) is saved as well, whether or not the snapshot could be saved. It records only that kept variables exist: a format number, the site number, the time, how many variables there were, and whether a snapshot was saved. It holds no address, path, setting or key. Both files carry a short fingerprint of this WordPress install in their names, so another WordPress install on the same server never reads, restores or deletes them, and they never pause another install.

If you delete the plugin a second time before answering the reinstall notice, the first snapshot is kept as it is; a snapshot is only ever saved from an install that has settings.

When the plugin is installed again on that site it pauses **all** syncing to FlowMattic, whether it finds the snapshot or only the marker. No variable is added, changed or deleted by the plugin, and nothing is checked or migrated in FlowMattic's variables table. A notice on the plugin's screens, the Plugins screen and the Dashboard tells you what was found and offers the choices that can work:

- **Restore settings** — puts the saved settings, switches and tabs back, deletes the snapshot and the marker, and resumes syncing on the next admin page load, after the plugin's own upgrade steps have run over the restored settings. Settings you entered in the meantime are replaced; the confirmation says so. If the snapshot was saved at a different address (a moved or copied site), the notice says where and you must tick an extra box. Restore is refused, and nothing is changed, if the snapshot was saved by another site, is in an unknown format, is damaged, holds no settings, or was saved by a newer version of the plugin. If the site's security keys changed, you are told, and the FlowMattic variables that those saved keys feed are left exactly as they are until you enter the keys again.
- **Start fresh** — deletes the snapshot and the marker and resumes syncing on the next admin page load. Every FlowMattic variable whose setting is empty on this site is then deleted, so you must tick a box to confirm. With a marker and no snapshot you can enter your settings first: Start fresh then syncs what is filled in and deletes only the variables whose settings are still empty.

The snapshot is signed with a key derived from this site's own security keys, so a file someone else puts in the folder cannot be restored: a snapshot that fails its integrity check is refused and the notice says so. If the security keys changed since the plugin was deleted, the snapshot cannot be verified: syncing stays paused and only Start fresh is offered. If a snapshot cannot be read because of file permissions, the notice names the folder: fixing the permissions makes Restore possible. If a folder cannot be checked at all, syncing stays paused and the notice says what could not be read. Both choices need the same permission as deactivating the plugin and act on the current site only.

## Manual Resync

If FlowMattic variables get out of sync (rare — typically after an import or restore), use the **Resync All Variables** button to re-synchronize all variable types:

1. Navigate to the **System/API tab** or **Debug Tool**
2. Click **Resync All Variables**
3. All variable types are re-pushed from SyteOps options to FlowMattic

## Find & Replace in Workflow Definitions

When you need to update a value inside FlowMattic workflow definitions themselves (not SyteOps variables), the **Debug Tool** provides a safe Find & Replace:

- Targets workflow history data or saved workflow definitions (steps and settings only — titles are never modified)
- Preview all matches before making any changes
- Batched execution with JSON backups created automatically before each batch
- Cancel mid-execution if needed

This is useful after domain migrations, credential rotations, or rebranding.

## FlowMattic Readiness Check

Before any operation that depends on FlowMattic, SyteOps runs a quick readiness check to make sure FlowMattic is installed and active. If it isn't, SyteOps disables the feature instead of running it — so nothing fails silently or corrupts data.

## Variable Naming Conventions

All SyteOps-managed FlowMattic variables use the `syteops_` prefix. Example patterns:

| Pattern | Data |
|---|---|
| `syteops_user_001_name` | User 001 display name |
| `syteops_user_001_email` | User 001 email |
| `syteops_user_owner_email` | Current Site Owner email |
| `syteops_user_contact_tech_email` | Current Technical Contact email |
| `syteops_std_systm_contact_{slug}_all_emails` | All emails for a custom role |
| `syteops_std_crm_001_name` | CRM 001 name |
| `syteops_{tab_acronym}_svs_{suffix}` | Variable Set value |

Use these names in your FlowMattic workflow conditions, actions, and mappings.

## Sensitive Variable Masking

API keys and secrets synced to FlowMattic are masked in the FlowMattic variable display. They are available for use in workflows but are not surfaced as readable values in the FlowMattic admin interface.

## Headless Install (WP-CLI)

When no browser session is available — such as during automated site bring-up or CI pipelines — use the WP-CLI command to install FlowMattic without visiting the Initial Setup screen:

```bash
wp syteops flowmattic install [--activate|--no-activate] [--force-refresh]
```

The command is **idempotent**: it is a no-op when FlowMattic is already active. By default it installs the newest FlowMattic from SyteOps-defined storage, activates it, and auto-licenses it. Pass `--no-activate` to install without activating. Pass `--force-refresh` to re-download even if the package is already cached.

The CLI defaults to the cached discovery URL (1-hour transient); pass `--force-refresh` to bypass the cache and re-resolve the newest build. (The AJAX wizard in the admin UI always force-refreshes.)

The command exits non-zero (`WP_CLI::error`) if discovery fails or if the download is blocked by a license check.

To run the headless install on an operator-managed site without opening a terminal session, use the deploy tool's `--install-flowmattic` mode:

```bash
scripts/upload-plugin-release.sh --install-flowmattic --target <slug> [--dry-run]
```

`--dry-run` prints the remote command without connecting. `--all` is not supported for this mode — `--target` is required.

## Troubleshooting

**FlowMattic variables not updating:**
1. Verify FlowMattic is activated and licensed
2. Try the **Resync All Variables** button
3. Look for a FlowMattic readiness warning in the SyteOps admin — if one is visible, FlowMattic can't be reached and the warning explains why

**FlowMattic not installing during setup:**
1. Ensure your server can reach WordPress.org
2. Check file permissions in `/wp-content/plugins/`
3. Try installing FlowMattic manually, then return to SyteOps setup
