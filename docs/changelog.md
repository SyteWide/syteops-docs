---
sidebar_position: 90
title: Changelog
description: Release history and user-facing changes for each SyteOps version.
---

# Changelog

A running log of user-facing changes in each SyteOps release. Only features, improvements, and fixes that affect the admin experience are listed here.

## v1.3.030

- Fixed: Admin removal action now correctly provides success or error feedback after completing
- Improved: JavaScript bundle no longer loads on non-plugin admin screens

## v1.3.028

- Fixed: Toggle knobs in checkbox-grid toggle layouts now vertically center within the track

## v1.3.027

- Internal improvements and maintenance

## v1.3.026

- Internal improvements and maintenance

## v1.3.025

- Fixed: Toggle switch icons (checkmark and X) now vertically center inside the knob on all admin pages
- Fixed: Empty "Connection Status" section label no longer displays when FlowMattic is already installed

## v1.3.023

- Fixed: Toggle switches in category filter and post type grids now display with correct label spacing
- Fixed: Webhook endpoint URL fields now display at full width on both integration cards

## v1.3.022

- Improved: Cross-Link Post Types setting now uses selectable toggle switches instead of a text input
- Improved: Category Filter checkboxes converted to toggle switches for visual consistency
- Improved: Webhook endpoint URL field widened to display full URL without truncation
- Added: "View Docs" links on all integration cards linking to the documentation portal
- Added: Squirrly SEO documentation page on the public docs site
- Improved: Squirrly SEO Post Types checkboxes converted to toggle switches

## v1.3.021

- Fixed: AI provider configuration from the Integrations tab now persists correctly instead of requiring navigation to the feature settings tab
- Fixed: Max tokens refresh button and model-maximum hint now appear automatically on page load for areas with a configured provider and model

## v1.3.020

- Added: Multi-provider AI support for LinkCentral cross-linking (OpenAI, Anthropic, OpenRouter, Gemini, Straico)
- Fixed: Cross-link scoring now uses the provider, model, and max tokens configured for LinkCentral instead of hardcoded defaults
- Improved: Systems/API tab with quick navigation for all integration sections, configured-count badge on AI keys, and section entry animations

## v1.3.019

- Fixed: "Active Modules" stat card on the Admin tab showed an inflated "available" count that included hidden internal modules
- Fixed: Stat card now applies the same filtering as the Module Management panel

## v1.3.018

- Added: Stats dashboard row on the General tab showing key system metrics
- Added: Section divider labels between card groups on key admin tabs
- Added: Inline max-tokens refresh button on all AI-consuming areas
- Improved: Tab navigation redesigned from pill style to bottom accent line
- Improved: Card hover shadows, focus glow, and entrance stagger animations
- Improved: Toggle switch animations with lighter off-track color and spring-physics knob
- Improved: Integration tile gradient border hover effect
- Improved: Modal entrance transitions and animated status indicator dots
- Improved: Typography with tighter heading tracking and monospace code elements

## v1.3.017

- Added: Refresh button next to max tokens field resets the value to the selected model's maximum
- Fixed: Max tokens hint and refresh button now appear when the AI provider modal opens with a previously saved model
- Improved: AI provider modal description clarified for module and integration context

## v1.3.016

- Added: Max tokens field auto-populates with the model's output token limit when a model is selected
- Added: "Model maximum: X tokens" hint displays below the max tokens field in the provider modal
- Improved: Max tokens input validation dynamically adjusts its upper bound to match the selected model

## v1.3.015

- Fixed: Straico models not loading in the AI provider modal
- Added: "View provider documentation" link now updates to model-specific docs page when a model is selected

## v1.3.014

- Fixed: AI Provider configuration modal opens correctly from integration tiles and module configuration
- Improved: Modal overlay displays correctly inside nested admin layouts

## v1.3.013

- Fixed: Fatal error on certain PHP versions when registering AJAX handlers

## v1.3.011

- Fixed: Module configuration modal CSS now correctly applies after modal is repositioned

## v1.3.010

- Fixed: Module configuration modals now display as centered overlay popups instead of rendering inline at the bottom of the page
- Improved: Modal backdrop uses consistent blur effect matching standardized modal styling

## v1.3.008

- Fixed: AI modal field alignment for uniform full width across all WordPress admin environments
- Improved: Loading indicator replaced with styled CSS spinner for model-fetch feedback

## v1.3.007

- Added: Multi-provider AI configuration supporting OpenAI, Anthropic, OpenRouter, Gemini, and Straico
- Added: AI provider selection modal with per-area model and token configuration
- Added: 7 new integration tiles with plugin detection and conditional REST allowlist entries
- Added: Manual post processing UI for auto-linking integration
- Improved: Secrets encryption now validates success and preserves existing value on failure
- Improved: All API keys encrypted at rest with automatic FlowMattic sync

## v1.3.006

- Added: LinkCentral integration documentation and logo asset on the integrations card
- Added: End-user documentation page with setup guide and FlowMattic walkthrough

## v1.3.005

- Added: LinkCentral auto-linking integration with keyword insertion and cross-linking
- Added: Internal cross-linking engine with heuristic and AI-enhanced scoring modes
- Added: Admin settings card on System/API tab with configurable density limits and link behavior

## v1.3.004

- Fixed: FlowMattic variables silently stopped syncing after a configuration change
- Fixed: Derived user variables now correctly sync when user data changes

## v1.3.001

- Fixed: Module dropdown actions (enable, disable, export, uninstall) were unresponsive
- Fixed: Enable All and Disable All buttons on the Modules card were also unresponsive

## v1.3.000

- Added: Modernized JavaScript build system for improved performance
- Changed: Admin interface loads optimized scripts with automatic fallback for compatibility

## v1.2.083

- Fixed: Notice suppression no longer inadvertently blocks unrelated admin notices
- Added: Admin sidebar menu pinned to top position

## v1.2.081

- Updated: Primary brand colors aligned to unified SyteWide brand palette
- Updated: Warning color default changed from red to amber, visually separating warning from error states

## v1.2.080

- Added: ContentPen affiliate links on Integrations tab and System/API heading
- Updated: Module documentation now describes packages as SyteWide-distributed only

## v1.2.079

- Fixed: License status showing "Inactive" on all endpoints because the check only consulted stale connection data
- Fixed: License status now checks both product license and connection cache — either being valid shows "Active"

## v1.2.078

- Fixed: License check modal showing all endpoints as "Inactive" because status fields were not forwarded to the browser

## v1.2.077

- Added: Per-site "Check Licenses" dropdown action — scans endpoint and displays modal with license status and versions
- Added: Master "Licensing: Check All" bulk action — concurrent scan of all endpoints with summary table modal

## v1.2.076

- Added: Encrypted package system for secure module and workflow distribution
- Added: Package key delivery pipeline — keys automatically delivered via license activation and server webhooks
- Added: Module auto-update checker with one-click installation
- Added: Workflow import/export for encrypted FlowMattic workflow template distribution

## v1.2.075

- Added: "Buy SyteOps" link in the docs site navbar and footer

## v1.2.074

- Redesigned: Documentation portal with modern visual theme — improved typography, dark mode, glass-blur navbar, and multi-section homepage
- Added: Local full-text search, Mermaid diagram support, and image zoom
- Added: Server Connections feature page with architecture diagram
- Added: Custom components (Callout, Card, Steps, Badge) for richer documentation

## v1.2.073

- Added: EULA displayed in the activation consent modal alongside Privacy Policy, Terms & Conditions, and Refund Policy
- Added: EULA expandable panel in the post-activation License & Privacy details modal
- Changed: Consent checkbox text updated to list EULA first

## v1.2.072

- Fixed: Double confirmation dialog eliminated when deleting a user on the Roles & Users page
- Fixed: User swap now preserves deleted and locked flags alongside user data

## v1.2.071

- Fixed: JavaScript error that prevented page initialization and blocked Delete User from functioning
- Changed: Delete button repositioned to the right of Save/Export/Import buttons on user cards

## v1.2.070

- Added: Delete User functionality with gap-aware slot reuse
- Added: Configurable "Max Users" setting on Admin tab (1–20)
- Changed: Admin Users tab replaces the user count dropdown with an Add User button and active count display

## v1.2.062

- Improved: User cards include a slot identifier so duplicate display names are easier to distinguish
- Improved: Quick navigation appends the user slot only when multiple cards share the same visible name

## v1.2.061

- Improved: Users section adds a top border, padding, and a centered heading row for clearer separation from Roles
- Improved: User cards show the contact name as the heading when set

## v1.2.060

- Fixed: "This plugin has not been tested with your current version of WordPress" false compatibility warning resolved

## v1.2.059

- Added: Rich HTML sections and banner images for the WordPress View Details modal
- Improved: CRM Platforms tab layout uses a cleaner two-column structure

## v1.2.058

- Added: Non-admin users now see greyed-out role toggles with a padlock icon when a unique role is held by a locked user
- Fixed: Phone Type / Map Preference dropdown width now renders correctly for all users

## v1.2.056

- Added: "Users" submenu item under Admin in the SyteOps sidebar menu
- Added: "Edit in Admin" button on the Roles & Users page for quick access to full user settings

## v1.2.055

- Fixed: User lock/unlock toggle now persists across page refresh
- Changed: Expanded user card avatar enlarged for better visibility

## v1.2.054

- Added: Role count displayed next to the Roles heading
- Moved: Add New Role button relocated into the Roles section heading
- Removed: Redundant Roles submenu from the admin menu

## v1.2.048

- Added: Admin toggle to control Roles & Users menu visibility for non-admin users

## v1.2.047

- Added: WordPress role badges on Roles & Users user cards
- Added: Quick access navigation buttons above user cards with smooth scrolling
- Added: Collapsible user cards — click header to collapse or expand
- Added: Lock toggle button on Admin/Users tab

## v1.2.046

- Fixed: Sidebar menu title and page heading now use the white-label brand name instead of hardcoded text

## v1.2.045

- Moved: Roles & Users page from standalone top-level menu to a submenu under SyteOps
- Added: Locked user cards display an amber notice explaining the lock reason with tech contact info

## v1.2.043

- Fixed: Staging red theme not displaying on SyteOps admin pages

## v1.2.042

- Fixed: Fatal error when upgrading to a new module version while the old file remains on the server

## v1.2.041

- Converted: Fluent Forms GDPR capture fix extracted into a proper module with auto-activation on upgrade

## v1.2.040

- Removed: Redundant "Users Tab Backup / Restore" card from Users tab; backups are managed entirely in the Backup tab

## v1.2.039

- Removed: UpdraftPlus email suppression feature
- Fixed: LSCF Force Token authentication now works correctly during LiteSpeed save-settings flow
- Fixed: Variable Sets Registry table no longer renders system sets as clickable links

## v1.2.038

- Added: UpdraftPlus integration with backup status monitoring
- Added: Combined backup detection shows green when either WPVivid or UpdraftPlus is installed
- Added: Third-Party Backup Status card on Backup tab showing last backup timestamps and schedule
- Added: Dismissible admin notice when UpdraftPlus has no remote storage configured

## v1.2.034

- Improved: Staging environment dark red theme now displays on all admin pages, not just SyteOps pages

## v1.2.033

- Fixed: Shrink-to-fit styles no longer affect non-SyteOps admin pages, preventing layout breakage on core WordPress screens

## v1.2.031

- Fixed: Bulk plugin update failure toasts now display the site name instead of a truncated license key
- Fixed: Array parameters now reach endpoints correctly during bulk plugin updates

## v1.2.030

- Improved: Bulk plugin update toast now shows the error message when a site fails instead of only incrementing the failure count

## v1.2.029

- Fixed: Endpoint plugin updates silently skipping because update data was flushed before the upgrader could read it
- Improved: Plugin update toasts now show per-plugin failure reasons instead of just counts
- Removed: Blank SyteWide Licensing tab from main admin nav bar

## v1.2.028

- Fixed: User card header top corners now round correctly
- Removed: Tabs with no user-specific content from Users area
- Changed: "Update Available on All Endpoints" button label shortened to "Update All"

## v1.2.026

- Fixed: Notice suppression no longer corrupts WooCommerce product pages
- Fixed: Removed redundant brand prefixes from Quick Links menu items
- Added: View Documentation link in SyteHero Quick Links section

## v1.2.025

- Changed: "Purge Woo Product Cache" link now requires WooCommerce to be the selected ecommerce platform, not just installed

## v1.2.024

- Fixed: All admin bar Quick Links cache buttons (LiteSpeed, Avada, Elementor, Divi, Blocksy, SyteHero, WooCommerce) were non-functional

## v1.2.023

- Added: New licensing module with multi-product management, encrypted API credentials, and admin UI
- Added: Mutual exclusion enforcement between licensing modules

## v1.2.022

- Fixed: REST allowlist entries added directly on the endpoint are now preserved during scans instead of being auto-wiped

## v1.2.020

- Added: WooCommerce cache purge option in Quick Links cache menu
- Improved: Server Connections dropdown with prefixed labels and logical grouping
- Added: Type-to-confirm modal for "Uninstall SyteOps" requiring the domain name
- Improved: FlowMattic actions hidden when FlowMattic is not installed on the endpoint

## v1.2.018

- Fixed: Page reloads after any Quick Links cache clear so cache state is visible immediately
- Added: LiteSpeed CDN purge option in Quick Links cache menu
- Fixed: Divi dual-cache clear now works correctly

## v1.2.017

- Improved: Cache features are now auto-detected at runtime instead of requiring a manual integration toggle
- Added: Blocksy theme cache clear support in the admin bar Quick Links menu
- Added: "Clear Divi Cache" now also clears Divi localStorage keys

## v1.2.016

- Added: "Server" submenu item in the WordPress sidebar under SyteOps, visible only when server mode is enabled
- Added: Mid-path wildcard support in REST allowlist entries

## v1.2.014

- Added: Enable/Disable REST API Monitoring option in each connection's Actions dropdown
- Added: REST API Monitoring status badge in the connection status column
- Changed: Manage REST Allowlist option is now hidden when REST is unrestricted

## v1.2.012

- Improved: REST API restriction hardened — discovery gated, WooCommerce routes no longer open by default, badge colors updated (restricted = green, unrestricted = red)

## v1.2.010

- Improved: Reactivation flow with better CTA and auto-enable of modules after license reactivation
- Fixed: REST whitelisted badge now shows correct color when allowlisted
- Security: Module AJAX handler now requires authentication to prevent unauthenticated data access

## v1.2.007

- Improved: Gateway REST routes return a structured maintenance message and support contact when disabled instead of a 404 error

## v1.2.005

- Improved: All admin AJAX handlers now use a single verification helper for consistent security checks

## v1.2.004

- Security: Block All REST API toggle now blocks all requests with no exceptions when enabled

## v1.2.003

- Added: General-purpose "Block All REST API" toggle in Access Control that works on any install regardless of directory structure

## v1.2.002

- Improved: Block REST API toggle now visible on both parent and subdirectory installs with contextual warnings

## v1.2.001

- Security: REST API is now blocked on subdirectory installs when REST restriction is enabled

## v1.2.000

- Major release: Plugin renamed from SyteFlow to SyteOps with full identifier migration
- Added: Automated migration tool for existing SyteFlow sites — one-click admin banner, AJAX action, and WP-CLI command
- Changed: ContentPen webhook URL updated to new namespace (reconfiguration required)
