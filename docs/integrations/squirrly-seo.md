---
sidebar_position: 6
title: Squirrly SEO Integration
description: Custom SEO settings, ACF field mapping, and social image control for Squirrly SEO through SyteOps.
---

# Squirrly SEO Integration

**Tier: Basic** — Plugin-based toggle integration. Adds Squirrly-specific settings inside SyteOps when Squirrly SEO is installed.

SyteOps extends Squirrly SEO with custom settings that give you centralized control over SEO title mapping, social image dimensions, and post type targeting. When enabled, SyteOps manages these settings through the System/API tab. Squirrly SEO custom settings are stored in SyteOps options and are not synced to FlowMattic (see project rules for field ownership).

## Official Squirrly SEO (Newton) documentation

These are maintained by Squirrly and describe how the plugin stores SEO data and which filters exist:

- [Knowledge base home](https://howto12.squirrly.co/) — search the Squirrly SEO (Newton) knowledge base
- [Meta keys in `wp_postmeta` (`_sq_title`, `_sq_description`, `_sq_keywords`)](https://howto12.squirrly.co/faq/fetch-values-from-wp_postmeta)
- [Hooks: `sq_title`, `sq_description`, `sq_keywords`](https://howto12.squirrly.co/ht_kb/hook-squirrly-title-description-with-custom-data)
- [Database tables created by Squirrly (`wp_qss` and Advanced Pack tables)](https://howto12.squirrly.co/faq/what-database-tables-does-squirrly-create)

## What It Does

The Squirrly SEO integration adds:

- **Post type targeting** — Choose which post types receive Squirrly SEO custom settings (e.g., posts, pages, custom post types)
- **ACF field mapping** — Map Advanced Custom Fields to Squirrly SEO title fields for dynamic SEO titles
- **Social image control** — Set custom dimensions and cropping for Open Graph and social sharing images
- **Settings URL fix** — Automatically corrects a known Squirrly SEO inline script syntax error in the admin

## Requirements

- SyteOps installed and activated
- Squirrly SEO plugin installed and activated
- Squirrly SEO integration enabled in SyteOps

## Setup

### 1. Enable the Integration

1. Navigate to the **Integrations** tab in SyteOps
2. Toggle **Squirrly SEO** ON
3. Save

### 2. Configure Custom Settings

1. Go to the **System/API** tab
2. Find the Squirrly SEO section
3. Toggle **Enable Squirrly SEO Custom Settings** ON
4. Configure the settings described below
5. Save

## Settings Reference

### Post Types

Select which post types Squirrly SEO custom settings apply to. Common choices include Posts, Pages, and any custom post types registered on your site. Only public post types with a UI are listed.

### ACF Title Key

ACF field key for the field mapped to Squirrly post meta `_sq_title`. Enter the full field key (e.g., `field_698b9e914e950`). SyteOps writes the computed Squirrly SEO title into this ACF field and keeps post meta aligned.

### ACF Description Key

ACF field key for the description or product field used when building the Squirrly SEO title. Enter the full field key (e.g., `field_698ba06758e1d`). SyteOps reads this field's value and appends it to the post title to form the title.

### ACF Keywords Key

ACF field key for the field mapped to Squirrly post meta `_sq_keywords`. Enter the full field key (e.g., `field_66996c2798c3f`). When set, SyteOps preserves this value during saves that omit ACF field data so Squirrly keywords are not cleared.

### Theme JS File Path

Relative path from the active theme directory for an admin script file. If the file exists at this path, SyteOps enqueues it on relevant admin screens. If the file does not exist, SyteOps falls back to an inline script. Default: `/js/admin-custom.js`.

### Social Image Dimensions

- **Width** — Width in pixels for social/OG image size. Default: 250.
- **Height** — Height in pixels. Set to 0 for proportional scaling (no height constraint). Default: 0.
- **Crop** — When enabled, images are hard-cropped to the exact dimensions. When disabled, images are proportionally resized. Default: off.

### Fix Squirrly SEO Settings URL Script

Corrects a malformed inline script from Squirrly SEO that uses double-quotes around a URL, causing a JavaScript SyntaxError on admin pages. This fix is enabled by default when the Squirrly SEO integration is active.

## Troubleshooting

### Custom Settings Not Appearing

1. Verify the Squirrly SEO integration is toggled ON in the Integrations tab
2. Ensure **Enable Squirrly SEO Custom Settings** is toggled ON in the System/API tab
3. Check that the Squirrly SEO plugin is installed and activated

### ACF Fields Not Mapping

1. Confirm the ACF field key is entered for all three key fields (Title Key, Description Key, Keywords Key)
2. Field keys start with `field_` and can be found in your ACF field group editor
3. Verify the ACF field group is active and assigned to the correct post types

### ACF keyword or description fields cleared after publish

SyteOps automatically protects Squirrly-managed ACF fields when a save omits ACF field data (for example, some page builder publish flows). If fields are still being cleared:

1. Ensure **ACF Keywords Key** is configured in the Squirrly SEO settings (System/API tab)
2. Ensure **ACF Description Key** is also configured if the description field is affected
3. Save the SyteOps settings and test again

### SEO title, description, or keywords change without editing the post

SyteOps guards all three Squirrly-managed fields (`_sq_title`, `_sq_description`, `_sq_keywords`) against empty writes and deletions from Squirrly background features. In most cases these guards prevent fields from being wiped automatically.

If values still change unexpectedly:

1. Check whether the **Squirrly Briefcase** feature was used around the same time — Squirrly’s keyword research save process temporarily removes and re-writes the keywords field. SyteOps intercepts this and preserves your stored value.
2. List Squirrly-related scheduled events with WP-CLI: `wp cron event list` and look for hooks containing `sq` or `squirrly`.
3. Note which Squirrly automation features are enabled (Focus Pages, SEO Automation, Bulk SEO) and test with automation paused on a staging copy to confirm the source.

If SyteOps debug logging is enabled (System/API → Debug tab), the log will show `DELETE_GUARD blocked` or `META_GUARD blocked` entries when it prevents Squirrly from clearing a field, along with the exact Squirrly routine responsible.

For developer details, see the repository doc: `docs/developer/integrations/squirrly-seo.md`.
