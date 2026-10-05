---
sidebar_position: 6
title: Backup & Restore
description: Creating backups, restoring data, and configuring automatic backups in SyteOps.
---

# Backup and Restore

The Backup tab is the canonical surface for all backup, restore, and data protection operations.

## Creating a Backup

### Manual Backup

1. Navigate to the **Backup** tab
2. Click **Create backup now**
3. A full manifest-based ZIP restore point is created
4. The backup appears in the Saved Backups list

### Automatic Backups

Configure scheduled backups in the Automatic Backups section:

| Setting | Description |
|---|---|
| Enable/Disable | Toggle automatic backups on or off |
| Frequency | How often to run backups |
| Time of Day | When to run (UTC) |
| Retention | How many recent backups to keep |

Storage targets:
- **Local storage** — Backups are always saved in the default backup folder on your site. Each package has an unguessable file name, and the folder carries files that block direct web access on Apache and LiteSpeed servers; on servers that ignore them, such as nginx, the unguessable name is the protection. On a network, every site (the main site too) has its own folder, so a site's administrators only ever see that site's packages. Backups made before this change cannot be matched to a site, so they are kept in the network's main backup folder and only a network administrator sees them, in an Earlier network backups section where they can be downloaded or deleted; they are never pruned automatically. To give one to a site, download it and restore it on that site with Restore from file. Other site administrators see only a note that earlier backups exist. If you had chosen a different folder in an earlier version, the packages already there are left alone, the Backups screen names the folder once, and you should move or delete them by hand because they contain saved settings including keys
- **pCloud** — Cloud storage (coming soon)

Click **Run automatic backup now** to trigger the pipeline immediately using current settings.

## Restoring from a Backup

### From a File

1. Click **Restore from file**
2. Select a local ZIP backup file
3. Review the **Preview** — shows what the backup contains with counts and scope summary
4. Check the confirmation checkbox
5. (Optional) Enable **URL rewrite** if restoring to a different site
6. Click **Apply** to restore

### From Saved Backups

1. Scroll to the **Saved Backups** list
2. Find the backup you want (shows file size and date)
3. Click **Restore** next to the backup

### Downloading a Saved Backup

Each saved backup has a **Download** button. It saves the ZIP to your computer under a name such as `example.com-backup-full-20261004-120000.zip`; the secret file name the package has on the server is never shown or sent. Only a SyteOps Admin can download, and the request is a protected form post, never a link. Keep downloaded files somewhere private: they contain saved settings.

### Restore Points

Tick **Create a restore point first** before a restore and a restore point of your current settings is saved before anything is changed, so the restore can be undone. A restore point holds all your stored settings (keys, tokens and passwords excluded) and any variable set tab files the restore would overwrite. Each site keeps its newest 10 restore points; older ones are removed automatically, and manual and automatic backups are never removed this way. If your server has no PHP zip extension, a restore point cannot be made: the import asks you to confirm importing without one, and restoring from a file is not possible. If the restore point cannot be saved, the restore does not run and the error says so. If the restore fails after the restore point was saved, the message names it. To undo, restore the restore point from the Saved Backups list: your settings return to what they were, including keys the restore added or removed. A restore never clears a stored secret (API key, token): secrets are not in backups, so they stay as they are. On a network, variable set tab files are shared by every site, so a restore that writes them says so.

Importing a configuration file (Admin tab) saves a restore point the same way before it changes anything, and does not run when the restore point cannot be saved.

## Scoped Backups

In addition to full backups, you can export and import specific sections:

| Scope | What's included | Typical use |
|---|---|---|
| **Master export** | All settings, all tabs, all modules, all user data, all roles | Full-site transfer or full-fidelity snapshot |
| **Scoped export** | A single tab's data (General, Users, Integrations, System / API, etc.) | Migrate just the CRM setup, or just the integration toggles |
| **Per-module export** | One module's data only | Move Notes or Estimates data between sites without dragging the rest |
| **Single user export** | One user card with all fields, role assignments, per-user notes and estimates | Onboard a single user onto another site; clone a template user |

Scoped imports remap data to the target site automatically and only touch the scope you imported. Other tabs, modules, and users on the destination site are untouched.

## Related

- [Licensing](licensing.md) — the Product License that post-restore re-check validates
- [Modules](modules/index.md) — module data is included in full backups; per-module export is available for portability

## Cross-Site Restore

When restoring a backup from a different site:

1. Enable the **URL rewrite** option during restore
2. SyteOps maps URLs from the source site to the current site — values that contained the source site URL (webhook endpoints, dashboard links, documentation URLs) are updated to match the destination
3. Profile pictures remain as links (not transferred as files) — if they're hosted externally they still work; if they were uploaded to the source site's media library they need to be re-uploaded on the destination
4. Secrets (API keys, tokens, passwords, signing keys, the Manage API key) are **not** included in a backup or a restore point, and a restore keeps the destination site's own — on a fresh site, open each integration card and enter the credentials

### Before a cross-site restore

- Confirm the destination site has a valid SyteOps license (cross-site restore does not move the license — see "Post-Restore License Re-Check" below).
- If your automations fire on user or CRM changes, consider pausing the relevant FlowMattic workflows during restore so the mass of change events doesn't trigger downstream side effects.
- Take a safety backup of the destination site first (Backup → Create backup now) so you have a known rollback point.

## Post-Restore License Re-Check

After any full restore, SyteOps locks certain operations until the Product License is re-validated. This prevents a restored backup from bringing in stale license state that no longer matches your current site.

1. A banner appears on the Admin tab prompting you to re-check the license.
2. Open **Admin → Product License → Recheck**.
3. On success, the lock releases and encrypted-package operations (module updates, workflow-template imports) resume.

This is expected behavior — the re-check completes in a few seconds and only needs to happen once per restore.

## Backup Contents

Full backups include:
- All plugin settings and module data
- Licensing records (issued connections + blacklist)
- Variable set tab configurations
- User data and role assignments

Backups and restore points contain **no** keys, tokens or passwords. Restoring onto a site keeps that site's current ones, and restoring onto a fresh site means entering them again. Backups made by an earlier version may still hold some encrypted keys (the Manage API key, the GitHub token and the AI provider keys); a restore ignores them, so an older backup can never bring back a key you have rotated.

## Audit Log

The Backup Audit Log records all backup and restore operations:
- View recent exports and restores
- Filter by type (exports, restores, automatic)
- Tracks up to 50 entries

## Security

- All backup operations require SyteOps Admin capability
- Operations use a unified config nonce for CSRF protection
- The browser never sends a file path or file name: saved backups are referred to by an opaque id the server computes for you, and a request for anything else is refused
- Post-restore lock requires license re-check
- File validation ensures backup integrity (manifest schema, checksums, path traversal prevention)
