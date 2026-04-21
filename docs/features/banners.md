---
sidebar_position: 14
title: Banners
description: Display scheduled site-wide banners for announcements, sales, maintenance notices, and WooCommerce category messaging.
---

# Banners

Banners is a SyteOps module for showing site-wide messages to your visitors — think promotional bars at the top of the page, announcement ribbons, sale countdowns, or maintenance notices. Each banner can be scheduled to appear and disappear automatically, and on WooCommerce sites you can target specific product categories.

## Turn the module on

Banners ships as a SyteOps module. To use it:

1. Go to **SyteOps → Admin** (or Other Options, depending on your setup) and enable the **Banners** module.
2. The **Site Banners** menu appears in the WordPress admin sidebar.

If the module isn't active, there's nothing to configure and no banners are shown on the front end.

## Create a banner

1. Navigate to **Site Banners** in the WordPress admin.
2. Click **Add New** and fill in:
   - **Message** — the text visitors see.
   - **Style** — color, position (top or bottom of page), and any per-banner styling options.
   - **Start date / time** — when the banner should start showing.
   - **End date / time** — when it should stop showing. Leave blank for an always-on banner.
   - **Audience** (WooCommerce sites) — optionally limit the banner to specific product categories, or show it site-wide.
3. Save. The banner is live based on the schedule you set.

## How scheduling works

- SyteOps runs a lightweight check every ten minutes to activate and deactivate banners based on their start/end times.
- Banners are also evaluated when a scheduled event fires, so transitions happen on time even if no one visits the site at the exact minute.
- When a banner's end time passes, it stops appearing automatically — you don't need to remove it manually.

## Styling

- Banner CSS is loaded from the module's package and scoped so it doesn't interfere with the rest of your site's styles.
- Each banner has its own style options (color, position, text alignment) configurable per banner.

## WooCommerce category targeting

If WooCommerce is active, banners can be scoped to specific product categories — for example, a "50% Off Summer Sale" banner that only shows on category pages for summer products. When WooCommerce isn't active, category targeting is hidden and the site-wide option is used instead.

## Backup and restore

Banner configurations are included in the SyteOps module backup scope:

- Full backups capture all active banners and their settings.
- Scoped backups with the **Banners** tab selected back up just the banner data.
- Imports and restores bring banners back exactly as they were — schedule, style, and targeting intact.

Open the **Backup** tab in SyteOps to download or apply artifacts.

## Common use-cases

- **Announcements** — "We're closed for the holidays, orders resume Monday."
- **Promotions** — sale countdowns, coupon codes, free shipping offers.
- **Maintenance notices** — "Planned maintenance tonight 10 PM–12 AM ET."
- **Policy changes** — "New shipping rates effective next month."
- **Cookie / compliance banners** — simple consent or notification strip at the top of the site.

## Related

- [Modules Overview](modules) — how modules work in SyteOps
- [Backup and Restore](backup-and-restore) — how banner data is preserved
