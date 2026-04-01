---
sidebar_position: 6
title: Squirrly SEO Integration
description: Custom SEO settings, ACF field mapping, and social image control for Squirrly SEO through SyteOps.
---

# Squirrly SEO Integration

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

The ACF field key used for the `_sq_title` meta. Enter the full field key (e.g., `field_698b9e914e950`). This maps an ACF field value into the Squirrly SEO title for each post.

### ACF Product Name Description Field

The ACF field name (not key) for a product or description field used in the SEO title. Enter the field name as it appears in your field group (e.g., `seo_product_name_description`).

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

1. Confirm the ACF field key (not name) is entered for the Title Key field
2. Confirm the ACF field name (not key) is entered for the Product Name Description field
3. Verify the ACF field group is active and assigned to the correct post types

### SEO title, description, or keywords change without editing the post

Squirrly SEO can update snippet data in the background (scheduled tasks, Focus Pages, SEO Automation, Bulk SEO). If values seem to reset overnight or at odd times:

1. List Squirrly-related cron events, for example with WP-CLI: `wp cron event list` and look for hooks whose names contain `sq` or `squirrly` (exact names depend on your Squirrly SEO version).
2. Note which Squirrly automation features are enabled and test with automation paused on a staging copy if you need to confirm the source.

SyteOps keeps the computed SEO title aligned with WordPress post meta `_sq_title` when custom settings save runs; Squirrly’s own automation and cloud features are outside SyteOps.

For developer details, see the repository doc: `docs/developer/integrations/squirrly-seo.md`.
