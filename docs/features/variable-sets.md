---
sidebar_position: 5
title: Variable Sets
description: Create your own tabs of reusable values that flow into your automated workflows.
---

# Variable Sets

Variable Sets are your own labeled groups of values that SyteOps keeps in one place — think of them as custom admin tabs where you store things like brand colors, support email addresses, office locations, service fees, or canned message snippets. Once you save them, SyteOps sends those values to FlowMattic automatically so your automated workflows can use them without anyone copying values around.

You decide what each tab is called, what goes in it, and which kind of value each entry is. The result is a single place to update a value that might otherwise be duplicated across many workflows, emails, or client sites.

## When to use each type

SyteOps offers three styles of Variable Set. Pick the one that matches what you're storing.

| If you want to… | Use this type | Example |
|---|---|---|
| Store a value someone will actually use (text, URL, number, email, a block of HTML, etc.) | **Static Variable Set** | Support email: `help@example.com` |
| Create a label or trigger that doesn't need a value stored — just a marker that workflows can watch for | **Dynamic Variable Set** | `new_client_onboarded` (used as an event marker) |
| Store groups of values that repeat in the same pattern — up to 20 groups with the same fields | **Related Static Variable Sets** | 10 service packages, each with a name, price, and description |

These three types are also called SVS, DVS, and RSVS in older docs and in the admin UI — same thing, shorter names.

## Create a Variable Set tab

1. In the SyteOps admin navigation, click **+ Add a New Tab**.
2. Fill in:
   - **Full Name** — a descriptive label for the tab (e.g., "Service Packages").
   - **Tab Name** — the short label that appears in your admin navigation.
   - **Acronym** — 1 to 10 characters, lowercase. This is used when SyteOps names the variables it sends to FlowMattic, so pick something short and memorable.
   - **Initial Set Type** — Static, Dynamic, or Related Static.
   - **Set Count** (Related Static only) — how many parallel sets you need, 1–20.
3. Click **Submit**.

The tab appears in your admin navigation immediately.

## Add values to a tab

1. Open your new tab.
2. Use the **Add New Variable** form inside each group.
3. Fill in:
   - **Suffix** (required) — a short code that identifies this value. SyteOps lowercases it and replaces spaces with underscores, so `Office Phone` becomes `office_phone`. Only letters, numbers, and underscores.
   - **Value** — the actual content. For Static and Related Static types; Dynamic types don't need a value.
   - **Type** (Static and Related Static) — text, email, URL, number, multi-line text, or HTML.
4. For Related Static Sets: save the Set Code first — that's the label SyteOps uses to tell the groups apart.

## Save and update

- Click **Save** to store your changes and sync them to FlowMattic.
- Renaming a suffix removes the old variable and creates a new one — workflows that referenced the old name will need updating.
- All actions require the SyteOps Admin capability.

## Delete

### Delete a single entry

Click the delete button next to the variable. SyteOps removes it from storage and from FlowMattic.

### Delete a whole tab

1. Open the tab.
2. Click **Delete Tab**.
3. Type `DELETE` to confirm.
4. SyteOps removes the tab, all its entries, and the matching FlowMattic variables.

## Export and import

- The **master export** includes every Variable Set tab and its contents — useful for moving configuration between sites.
- The **scoped export** with scope `variable_sets` exports only Variable Sets, leaving other settings alone.
- Variable Set data is stored as JSON files in `wp-content/syteops-admin-storage/user-tabs/`, one per tab. That folder is protected so the files can't be read from the web.

## Behind the scenes

- Each tab is stored as a single JSON file: `<tab-slug>.json`.
- The storage folder is locked down with `index.php` and `.htaccess` so it's not web-accessible.
- Saving or editing a Variable Set always goes through the SyteOps Admin capability and a security check.
