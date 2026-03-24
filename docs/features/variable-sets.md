---
sidebar_position: 5
title: Variable Sets
description: Creating and managing custom variable set tabs in SyteOps.
---

# Variable Sets

Variable Sets are custom admin tabs you create to manage collections of variables that sync to FlowMattic for use in automated workflows.

## Variable Types

| Type | Description |
|---|---|
| **SVS** (Static Variable Set) | A suffix + typed value. Supports text, email, URL, number, textarea, and HTML. |
| **DVS** (Dynamic Variable Set) | A suffix only, with no stored value. Used as placeholders or triggers. |
| **RSVS** (Related Static Variable Sets) | Groups of SVS organized under Set 01 through Set 20. Each set has a Set Code identifier. |

## Creating a Variable Set Tab

1. Click **+ Add a New Tab** in the admin navigation
2. Fill in:
   - **Full Name** — Descriptive name for the tab
   - **Tab Name** — Short label for navigation
   - **Acronym** — 1-10 character code (used in variable naming)
   - **Initial Set Type** — SVS, DVS, or RSVS
   - **RSVS Count** — Number of sets, 1-20 (only for RSVS type)
3. Click **Submit**

The new tab appears in admin navigation immediately.

## Adding Variables

1. Open your variable set tab
2. Use the **Add New Variable** form in each collection
3. Enter:
   - **Suffix** (required) — Normalized to lowercase with underscores; only `a-z`, `0-9`, `_` allowed
   - **Value** (required for SVS/RSVS) — Content appropriate for the chosen type
   - **Type** (SVS/RSVS only) — text, email, URL, number, textarea, or HTML
4. For RSVS: save the Set Code before adding variables to a set

## Saving and Updating

- Click **Save** to persist changes and sync to FlowMattic
- Renaming a variable's suffix deletes the old variable and creates a new one
- All operations require SyteOps Admin capability

## Deleting

### Delete a Variable Row

Click the delete button next to a variable. The JSON row and FlowMattic variable(s) are removed.

### Delete a Tab

1. Navigate to the tab
2. Click **Delete Tab**
3. Type `DELETE` to confirm
4. The tab's JSON file and all associated FlowMattic variables are removed

## Export and Import

- **Master export** includes all variable set tabs and their data
- **Scoped export** with scope `variable_sets` exports only variable sets
- Variable set data is file-backed in `wp-content/syteops-admin-storage/user-tabs/` (one JSON file per tab)

## Storage and Security

- Each tab stores data as a JSON file: `<slug>.json`
- Storage directory is secured with `index.php` and `.htaccess`
- All operations use SyteOps Admin capability and config nonce validation
