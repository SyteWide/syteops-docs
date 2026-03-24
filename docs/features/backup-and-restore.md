---
sidebar_position: 5
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
- **Local storage** — Backups saved to a configured path on the server
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

## Scoped Backups

In addition to full backups, you can export and import specific sections:
- **Master export** — All settings
- **Scoped export** — Settings for a specific tab (General, Users, Integrations, etc.)
- **Single user export** — One user card with all fields, roles, notes, and estimates

Scoped imports remap data to the target site automatically.

## Cross-Site Restore

When restoring a backup from a different site:
1. Enable the **URL rewrite** option during restore
2. SyteOps maps URLs from the source site to the current site
3. Profile pictures remain as links (not transferred as files)

## Backup Contents

Full backups include:
- All plugin settings and module data
- Licensing records (issued connections + blacklist)
- Variable set tab configurations
- User data and role assignments

Full backups **exclude** secrets (API keys, tokens) for security.

## Audit Log

The Backup Audit Log records all backup and restore operations:
- View recent exports and restores
- Filter by type (exports, restores, automatic)
- Tracks up to 50 entries

## Security

- All backup operations require SyteOps Admin capability
- Operations use a unified config nonce for CSRF protection
- Post-restore lock requires license re-check
- File validation ensures backup integrity (manifest schema, checksums, path traversal prevention)
