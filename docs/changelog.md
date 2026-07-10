---
sidebar_position: 90
title: Changelog
description: Release history and user-facing changes for each SyteOps version.
---

# Changelog

A running log of user-facing changes in each SyteOps release. Only features, improvements, and fixes that affect the admin experience are listed here.

## v1.5.041

- Added a headless WP-CLI command to populate System / API variables (such as the AWS IAM keys) from deployment tooling; values are stored encrypted and synced to FlowMattic.

## v1.5.040

- Removed redundant helper text from the AWS credential fields on the System / API tab.

## v1.5.039

- Fixed: scope-limited configuration backups for the Banners and Integrations areas now capture their settings (previously these targeted backups could come out empty).
- Fixed: variable-set configuration backups can now be restored (they were previously rejected as incomplete).
- Fixed: license activation now reports a clear product, plan, or email mismatch instead of a generic error, and shows an "activation pending — please try again shortly" message when the store hasn't finished registering your site.

## v1.5.038

- Fixed: full configuration exports now preserve your Integrations module settings (such as the site-code header) — previously that data could be dropped from the exported file.

## v1.5.037

- Added: **AWS IAM Access Key** and **AWS IAM Access Key Secret** fields in the AWS SES area of the System / API tab. Both are stored encrypted, sync to FlowMattic as masked variables, and include a copy button for the variable name; the secret can be cleared on save.

## v1.5.036

- Fixed: Sending or scheduling a social post from the posts list now shows a clear, actually-visible confirmation before the dialog closes.
- Improved: Review portal + scheduling refinements — internal validation and documentation cleanups.

## v1.5.035

- Fixed: The publish-time post type change now only allows the same publishable types offered in the picker, closing a gap where a reviewer could otherwise switch a post to a hidden type.
- Fixed: Schedule/send error messages in the social compose modal were hidden behind the modal itself.

## v1.5.034

- Added: Schedule a composed social update to send at a specific time, or automatically once the post publishes — with a pending-sends list and cancel option.
- Added: Choose the post type when publishing a draft from the review portal, instead of always publishing to the type it was created as.

## v1.5.033

- Added: Social Publishing — compose an AI-summarized post in a chosen voice and send it to a webhook (LinkedIn via your automation tool, Slack, or any endpoint), from the review portal or the posts list.

## v1.5.032

- Fixed: The automatic cleanup of leftover files from a removed feature now removes only the plugin's own package folders, never a same-named folder that belongs to another plugin.

## v1.5.031

- Fixed: A removed legacy feature's leftover files could, in rare cases, cause a site error after an update. These are now detected and cleaned up automatically on load.

## v1.5.030

- Internal improvements and maintenance.

## v1.5.029

- Fixed: Removing a content source now also clears the automation configuration variables it created — no leftover variables.
- Improved: Attribution records are now included in the backup created before the plugin is uninstalled.

## v1.5.028

- Changed: Content Pipelines is now a built-in core feature — no separate module to install or activate; it's available out of the box.

## v1.5.027

- Added: Content Sources can land drafts into any post type or a new custom type you define.
- Added: Custom fields per source, mapped from incoming data.
- Added: Per-source FlowMattic config variables and opt-in forwarding to a workflow.

## v1.5.026

- Removed unused legacy internal modules, along with their settings and data-management screens, to simplify the plugin.
- Internal reliability fixes.

## v1.5.025

- Internal improvements and maintenance.

## v1.5.024

- Improved: Each inbound card on the content pipeline dashboard now shows whether a source is one you added ("Manual source") or the built-in "Integration", so they are easy to tell apart.
- Improved: A content source's ingest URL is now click-to-copy and sized to fit the address.
- Fixed: "Finish setup" on a content source card now opens the Content Sources panel instead of the activity view.

## v1.5.023

- Improved: The "Enable modules after installation" switch now remembers whether you left it on or off, rather than resetting each time the page loads. It remains off by default.

## v1.5.022

- Fixed: Naming a content source "ContentPen" or "Pipeline" no longer merges its activity with the built-in source of the same name — each keeps its own dashboard card, filter pill, and stats.
- Improved: The pipeline activity list can now be filtered to just the built-in ContentPen integration's events with a dedicated Source filter pill.

## v1.5.021

- Improved: The pipeline activity dashboard now shows the built-in ContentPen integration's status (when it's in use) alongside your registered content sources.

## v1.5.020

- Fixed: On the pipeline activity dashboard, the per-content-source filter now filters the activity list correctly (previously it had no effect for a custom source).

## v1.5.019

- Improved: The pipeline dashboard now shows a card and filter for each content source you've registered (by its chosen name and live status) instead of a single fixed source.

## v1.5.018

- Improved: Pick a content source's default author from a dropdown of WordPress users (by name) instead of typing a numeric user ID.

## v1.5.017

- Improved: Cleaner spacing and layout on the content sources screen. Each source's inbound webhook is automatically allowed through the REST API restriction, with no manual whitelisting needed.

## v1.5.016

- Improved: Re-sending content no longer overwrites a post a reviewer has already published (each source can opt into always-overwrite), repeat deliveries reuse the existing featured image instead of re-downloading it, and reviewers are notified once when a draft is created rather than on every delivery.

## v1.5.015

- Fixed: Imported content keeps its featured-image alt text and handles original publish dates reliably; a source whose field mapping is incomplete now holds content for review instead of creating blank drafts.

## v1.5.014

- Added: Register external apps as content sources that send content into the review portal, with AI-assisted field mapping and a secure webhook URL for each source.

## v1.5.013

- Added: Reviewer editing permissions — limit which parts of a shared review link each reviewer type can change (view-only areas, existing-terms-only categories & tags), with per-user overrides. Admins are never restricted.

## v1.5.010

- Fixed: Further review portal polish — the header, action bar, and side panels resize cleanly on narrow screens, long names and tags no longer overflow their columns, and the read-only preview banner no longer hides the header on scroll.

## v1.5.009

- Fixed: Review portal display — the brand logo no longer clips, large featured images are scaled to a tidy preview, article bodies wrap correctly instead of overflowing, and the editor uses more of the available width.

## v1.5.008

- Added: An **Edit in WordPress** link in the review portal opens the full block editor in a new tab.
- Added: Open the secure review portal for any post straight from the Posts or Pages list.
- Improved: The in-admin portal preview opens larger and adds clear **Full screen** and **Open in new tab** buttons.

## Operator Tools — 2026-06-23

### Added
- **Deploy tool: `--avada` / `--no-avada` toggle to reset Avada/Fusion caches after deploy (default on; no-op on non-Avada sites).**

## v1.5.007

- Security: The portal preview is now restricted to administrators and sends stricter framing and referrer headers.
- Fixed: Reliability improvements to the portal preview window and the Content Pipelines navigation tabs.

## v1.5.006

- Added: A "Preview Portal" button on the Review Portal branding settings opens a full read-only preview of the portal — with your current branding — right inside the admin, so you can see how it looks before sending a review link.

## v1.5.005

- Improved: The Review Portal branding settings now show a single save button and a clearer "Saved" confirmation.
- Improved: When you enable branding override, the colour fields now start from your current branding instead of blank defaults.

## v1.5.004

- Fixed: The Review Portal branding preview now shows your actual logo from General → Branding instead of a placeholder initial.

## v1.5.003

- Fixed: The navigation tabs on the Content Pipelines screen (Runs, Recipes, Review Portal) now switch views correctly when clicked.

## v1.5.002

- Improved: The review-and-publish portal now activates only when Content Pipelines is enabled; with it turned off, incoming content is handed to your configured webhook automation instead.

## v1.5.001

- Fixed: Switching between Content Pipelines views (Runs, Recipes, Review Portal) now tabs over instantly instead of reloading the page.

## v1.5.000

- Added: Live preview — reviewers can open a post exactly as it will appear on your site before publishing.
- Added: AI-assisted meta description generation in the review and publish workflow.
- Added: A dedicated SEO title field that stays in sync with your SEO plugin, with a clean automatic default.
- Added: Publish notifications — the author and reviewers receive a branded email when a post is published or scheduled.
- Added: Secondary keywords are captured from generated content and editable while reviewing.
- Improved: The content editor toolbar gains numbered lists, underline, remove-link, clear-formatting, and undo/redo.
- Improved: SEO titles now use the clean post title; the meta description is no longer appended to the page title.

## v1.4.016

- **Content Pipelines module:** New module that automatically runs cross-linking, SEO, and llms.txt stages when posts are published. Manage recipes and view run history from the new Content Pipelines tab.
- Improved: Primary action buttons now use your configured brand color instead of the default blue.
- Improved: Button icons are now vertically centered with their labels throughout the admin.

## v1.4.015

- Fixed: Team member variables no longer stop updating in connected workflows after certain background syncs.
- Fixed: Forcing a variable re-sync now reliably rebuilds all team member variables instead of clearing them.

## v1.4.014

- Internal improvements and maintenance.

## v1.4.013

- Improved: Dialog headers now match your configured brand colors.
- Improved: The user quick-navigation pills are restyled with larger, clearer profile pictures.

## v1.4.012

- Improved: The fill-in box for adding a user now appears on the Users tab in settings as well, not only on the Roles & Users page.
- Fixed: The add-user fill-in box can be closed with the Escape key.

## v1.4.011

- Added: When adding a user, a quick fill-in form lets you pre-populate their details (name, email, company, and phone) before the user is created.
- Improved: The lock/unlock button icon is now properly aligned with its label.

## v1.4.010

- Fixed: Creating a new role no longer fails with a blank page or error.
- Fixed: Adding a new user no longer fails with a server error.
- Fixed: Owner, technical, and marketing contact badges display on the Users tab again.
- Improved: The role identifier (slug) field now allows underscores, removes a trailing plural "s" automatically, and shows clearer guidance on which characters are allowed.
- Improved: Minor admin interface alignment fixes.

## v1.4.009

- Fixed: Activation checkboxes in the FlowMattic MCP Server settings now show their checkmark when enabled, instead of appearing blank even when the option is switched on.

## v1.4.008

- Fixed: When FlowMattic is already installed but not active, setup now activates the existing copy in place instead of triggering a fresh license-gated download, so connecting FlowMattic completes reliably.

## v1.4.006

- Added: Block public access to wp-content/debug.log — SyteOps maintains a deny rule in wp-content/.htaccess so the WordPress debug log can't be fetched directly over HTTP (REST API settings → User Enumeration Defense, default on).

## v1.4.005

- Fixed: WordPress admin list screens (Orders, Products, Pages — any post-type list) no longer show a critical error on sites where the Leads module is not active.
- Fixed: REST security logging no longer emits PHP warnings or records array query parameters as the literal string "Array"; nested values are preserved and secret keys inside them are redacted.

## v1.4.004

- Fixed: The "Send test email" action returns a clear failure notice quickly when the site's mail transport is slow or unreachable, instead of leaving the page hanging.
- Improved: Scheduled lead summary emails get the same fast-fail protection, so a slow mail transport won't stall them.

## v1.4.003

- Fixed: Example hint text in lead settings fields (email addresses, webhook URLs, selectors) now displays in its proper format instead of title case.

## v1.4.002

- Added: Your own logo can now appear at the top of lead notification emails — upload or pick one from the media library so emails match your brand.
- Improved: The logo sits on a fixed white panel, so it stays legible in both light and dark email clients.
- Improved: The logo is embedded directly in each email, so it displays even when an inbox blocks remote images.

## v1.4.001

- Fixed: Tidied the Leads settings layout — removed an empty tab and corrected page spacing.
- Fixed: The "which conversions to send" switches now reliably apply to form submissions captured on the server.
- Fixed: The lead-scoring question builder keeps custom question IDs when you rename a question, so saved answers stay linked.
- Fixed: Editing one advanced (raw JSON) box no longer clears the other.

## v1.4.000

- Redesigned the Leads settings screen with clearer explanations, on/off switches, and a point-and-click builder for lead-scoring questions. Webhooks now work with any automation platform.
- Added: A new Manage API lets trusted external tools and automations control SyteOps over a secure connection, using an API key you generate.
- Added: Generate, rotate, or revoke your Manage API key from Admin → Other Options — the key is shown only once and stored encrypted.
- Improved: Destructive actions performed through the API require explicit confirmation, and stored credentials are never returned in responses.

## v1.3.049

- Fixed: Removing the custom admin branding logo now falls back to the default logo instead of leaving the branding area blank.

## v1.3.048

- Fixed: The WordPress login screen logo now displays the full wordmark instead of appearing cut off on the right edge.
- Fixed: Removing or replacing the custom login logo now saves reliably — it no longer reappears on the next page load or adds duplicate copies to your media library.

## v1.3.046

- Refreshed: SyteOps and SyteWide branding across the admin UI (logos, primary teal color, login screen, footer, sidebar mark).
- Improved: The brand library is now bundled locally so logos no longer depend on external image hot-links.

## v1.3.045

- Fixed: Rolling Management Server credentials now reliably saves the new secret on each endpoint and overwrites the stored value
- Added: Credential rolling now reports per-endpoint results and confirms the new secret was applied, clearly listing any endpoint that did not update
- Fixed: License-activation consent checkboxes now show a visible checkmark when selected
- Fixed: Admin dialogs no longer get clipped when opened from a settings card
- Improved: The credential-roll dialog footer buttons are now laid out correctly
- Fixed: Status notifications for Management Connection actions now show the correct heading

## v1.3.044

- Improved: Quick Navigation links sit closer to their heading with tighter, balanced spacing
- Improved: FlowMattic quick-action button icons are now clearly visible, with better spacing between icon and label

## v1.3.043

- Fixed: Connection data could be cleared unexpectedly on sites that run scheduled tasks through the server's own scheduler instead of the built-in WordPress scheduler. The tool that resets connections now runs only when launched intentionally, never as a side effect of routine background processing.
- Recommended for all sites. After updating, endpoints automatically re-establish their connection on the next status check.

## v1.3.042

- Improved: Admin section headings restyled from button-like pills to a three-tier typographic system
- Improved: Tab page headers now center the title at the top with the description italicized beneath
- Improved: All cards across the admin UI use a more pronounced layered shadow for clearer visual separation

## v1.3.041

- Added: **User Enumeration Defense** card on the REST API admin page (Security → REST API → "User Enumeration Defense"). Single toggle (default ON) that blocks the three classic WordPress user-enumeration attack surfaces for unauthenticated visitors:
  - `?author=N` redirect leak (returns 404 instead of redirecting to `/author/<login_slug>/`)
  - `/author/<slug>/` direct archive hits (also returns 404 — no signal whether the username exists)
  - `/wp-json/wp/v2/users` REST endpoint (returns 404 with `rest_no_route` for users without `list_users` capability, even when other plugins or themes re-register the route or restrict the broader REST API)
  - Also strips `author_url` from OEmbed responses (the URL contains the login slug)
- Added: Independent of the existing "Restrict REST API" / "Block All REST API" controls. Use this when you want enumeration protection without locking down the full REST API.
- Note: Default ON. Existing installs get the protection automatically on upgrade. Toggle off if you have any site that legitimately needs public `?author=` or public `/wp-json/wp/v2/users` access (rare on marketing sites; common on headless WordPress setups).

## v1.3.040

- Fixed: The **Show** button on the Management Server Secret now reveals the actual token instead of `encrypted:sodium:…` text
- Fixed: **Request Connection** from an endpoint now succeeds — the token sent to the Management Server is the real secret, so authentication passes
- Fixed: Plugin updates from the GitHub source now work after a fresh endpoint connection — the GitHub token is no longer scrambled when the Management Server returns it to the endpoint
- Fixed: Re-pasting a secret that was previously revealed (and copied) no longer corrupts the stored value
- Fixed: A stale "connection failed" notice no longer persists after a successful retry
- Improved: The "unauthorized domain" message from the Management Server is now clean — no debug-flavored tail in the toast

## v1.3.039

- Added: Row-based add/remove controls for the REST API custom allowlist — each saved endpoint is its own row with a small × remove button, plus a separate input + **Add** button that appends one path at a time
- Added: Built-in rule collision check on the custom allowlist — paths already covered by a built-in rule are rejected with a clear message so you don't end up with redundant entries
- Added: Integration tier system — every integration card now shows a discreet **Basic**, **Extended**, or **AI-Powered** badge so you can tell at a glance how involved each integration is
- Added: Dedicated documentation pages for AWS SES, Fluent Forms, WooCommerce, Wordfence, and Google Site Kit integrations
- Added: Dedicated documentation page for the Banners module
- Changed: Notice Management unified into a single notice-suppression flow — paste a notice, capture the last one, or pick from visible notices on the page
- Changed: Wordfence REST allowlist widened to the full v1 namespace so all Wordfence endpoints work under REST API Restriction (not just `/authenticate`)
- Removed: Monday integration and its documentation
- Improved: Custom allowlist changes save immediately — no longer coupled to the Save Access Control button
- Improved: Variable Sets documentation rewritten in plain language — leads with a clear introduction before introducing technical terms
- Improved: Documentation jargon cleanup across the overview, FlowMattic, and troubleshooting pages for easier reading
- Improved: Documentation sidebar now includes every integration and feature page for complete navigation
- Fixed: Notice Management no longer blanket-hides every SyteOps toast when suppressions exist — only the toasts you actually target
- Fixed: WordPress "Dismiss this notice" button text is stripped before notice messages are captured in the picker or matched at render time
- Fixed: LinkCentral AI label padding and a toast relay regression

## v1.3.038

- Improved: AI provider HTTP response validation widened to accept all 2xx status codes
- Improved: AI model caches automatically cleared on plugin update to ensure fresh model data

## v1.3.037

- Added: Bulk processing for flagged keyword links with per-link status feedback and post-run refresh support
- Improved: LinkCentral settings visibility now follows integration state and guidance text is clearer across settings and docs

## v1.3.036

- Added: Live balance display for AI providers in the API Keys settings tile, with per-provider refresh and last-updated timestamps
- Added: Provider branding modal showing documentation links and provider identity, accessible from the API Keys tile
- Added: Systems/API navigation entry in the WordPress admin sidebar for direct access to provider configuration
- Improved: AI model logging unified across all providers; balance display strings localized

## v1.3.035

- Changed: Keyword enrichment prefers AI web search context over page metadata when the two disagree, and context mismatch no longer forces a flagged quality state by itself
- Added: Flagged-links review for enrichment results that need attention, with admin UI aligned to existing card styling
- Added: Per-link model and max-tokens overrides (including OpenRouter model-limit hints and a quick “max tokens” action)
- Added: Option to include manual keywords when re-running enrichment; clearer Keyword vs Context AI labeling in the admin
- Improved: AI timeouts, provider-specific limits, and enrichment retries tuned to reduce spurious failures; better handling of HTML and edge-case page fetches during enrichment
- Improved: Product License gateway validate-by-key refresh behavior and related diagnostics; licensing integration packages updated
- Fixed: Checkbox accent styling so check marks stay visible with themed controls

## v1.3.034

- Fixed: Re-activating a previously activated site no longer returns an error; the gateway recovers gracefully and confirms active status
- Fixed: Product License status is now always set to active on activation, regardless of upstream response ordering
- Improved: Gateway responses include consistent license identifier fields and explicit success signals for reliable client-side detection

## v1.3.033

- Added: Keyword enrichment now runs up to 5 concurrent workers in parallel, significantly reducing the time to enrich large link libraries
- Added: New Concurrent Workers setting (1–5, default 2) in the keyword enrichment settings; batch size limit raised to 50
- Improved: AI requests that time out are automatically retried once with an extended timeout before a link is marked as skipped

## v1.3.032

- Added: AI keyword enricher — generates anchor-text keyword phrases for LinkCentral link posts that have no keywords, enabling automatic link insertion on previously-skipped links
- Added: LinkCentral keyword editor is now always visible on link posts when the integration is active, with no manual settings change required
- Added: Keyword Enrichment section in the LinkCentral settings card with AI provider/model configuration, a keyword status line, and a batch trigger button that supports multi-batch continuation
- Added: Cross-link candidate discovery now falls back to title-keyword search when shared taxonomy terms are sparse, improving cross-link coverage on lightly-categorised sites
- Improved: LinkCentral settings card reorganised into collapsible sections with adaptive multi-select inputs for category and post-type filters
- Improved: Manual process UI now includes post-title search with autocomplete, rich per-link result tables showing keyword and cross-link details, and a dry-run preview mode
- Improved: Cross-link scoring adds article vocabulary overlap and skips the opening paragraph to avoid over-linking near the top of content
- Improved: Custom taxonomies can now be selected as the basis for cross-link candidate discovery

## v1.3.031

- Fixed: Gutenberg block editor now saves correctly on pages managed by page-builder plugins
- Fixed: Block editor saves no longer fail for non-admin roles when a page-builder plugin is active
- Fixed: Connected-sites status card hidden correctly when server mode is disabled

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

- Added: Multi-provider AI support for LinkCentral cross-linking (OpenAI, Anthropic, OpenRouter, Gemini)
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

- Added: Multi-provider AI configuration supporting OpenAI, Anthropic, OpenRouter, Gemini, and Perplexity
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
