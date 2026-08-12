---
sidebar_position: 90
title: Changelog
description: Release history and user-facing changes for each SyteOps version.
---

# Changelog

A running log of user-facing changes in each SyteOps release. Only features, improvements, and fixes that affect the admin experience are listed here.

## v1.5.112

- Fixed: an article delivered without a usable title or body is now held for review instead of creating a blank draft (or, when the article carries no id, a duplicate half-empty one) — while a source that maps only custom fields keeps publishing normally, with each article kept separate instead of overwriting one post.
- Fixed: a delivery that carries only part of an article no longer wipes the other half of the SEO description/keyword pair, no longer reassigns the post to a different author (which could remove the real author's access to their own draft in the review portal), and no longer sends a "draft updated" email for content that did not actually change.
- Improved: "Reprocess last payload" now tells you what happened on both the source card and the run history — including when nothing was written because the matching post is already published — instead of refreshing the page before you can read it.

## v1.5.111

- Fixed: an incoming article that only carries some of its mapped fields no longer wipes the rest of an existing draft — fields the delivery didn't include keep the values already on the post (including the reviewer's edits).
- Fixed: a delivery that carries neither an article id nor a title or body is now held for review instead of repeatedly overwriting one draft.
- Fixed: "Reprocess last payload" no longer pauses a live content source or emails a "source held" alert, and no longer sends a duplicate article to a connected workflow when the draft already exists; it also now says plainly when nothing changed because the matching post is already published.

## v1.5.110

- Fixed: a content source's live field mapping is no longer paused by a single field that happens to be missing from one delivery — only a delivery that doesn't match the mapping at all is held for review.
- Added: a "Reprocess last payload" action — on a content source's card, right after approving a fixed mapping, and on held rows in the pipeline run history — replays the last captured article through the mapping to create its draft without waiting for the sending app to resend it.
- Improved: held pipeline runs now show an honest amber "Held" status instead of a misleading "OK," and can be filtered on their own; the "source held" alert email now points you straight at Reprocess last payload.
- Added: a review queue page listing every article awaiting a reviewer's review, linked from every review notification email — reviewers see only their own assigned drafts (administrators see everything), and once signed in a reviewer is never blocked by an expired review link.

## v1.5.109

- Fixed: status toasts built from admin notices now render with proper spacing and separators — nested notice content no longer runs together as one unpunctuated line, and hidden notice states are no longer included in the toast text

## v1.5.108

- Fixed: placeholder example text now renders exactly as written — "e.g." no longer displays as "E.G." and email or selector examples are no longer title-cased
- Fixed: the Fetch Models button no longer stays stuck on "Fetching..." after a retried fetch completes
- Improved: consistent spacing around the AI model and max-tokens controls across all AI settings areas

## v1.5.107

- Fixed: the recipe-card border and card styling shipped in the previous release now actually display — the card frame was referencing a style name that no longer existed after an earlier styling isolation pass, leaving recipe cards without their border, rounded corners, and grid layout.

## v1.5.106

- Improved: pipeline recipe cards now have a thin but clearly visible border, so each recipe stands out from the page instead of blending into the background. Added: a Reply-To address for portal notification emails — replies to reviewer-facing emails can now go to a person (such as your editor) instead of the site's sending address. The same option now exists for lead report emails: a Reply-To address on the email reports settings so replies to lead alerts and summaries reach the right person. Refreshed the email footer tagline example text.

## v1.5.105

- Added: a complete Email notifications settings area for the Review Portal (Content Pipelines tab). Four independent switches control every automated email — New draft received, Draft updated by source (sent only when a re-delivered article actually changed), Published or scheduled, and a Source held alert that tells the site admin when a live content source stops matching its approved field mapping. Review emails gained a details table (source, article date, status) and every email now closes with a dark branded footer with optional tagline and click-to-call phone. The run history now records each email's outcome (sent, skipped and why, or failed), so a missing notification is never a mystery.

## v1.5.104

- Fixed: all admin screens are now fully isolated from styling loaded by other installed plugins and themes. Every control the plugin renders — cards, buttons, badges, pills, tags, toggles, modals and filters — now uses its own private style names, so another plugin bundling a common CSS framework (such as Bootstrap) can no longer distort the SyteOps admin interface.

## v1.5.103

- Fixed: the pipeline run-history filter controls could be distorted by styling from other installed plugins or themes — most visibly the "Source" label crowding against the Status pills with no space between them. The filter controls are now fully isolated from outside styles, so their spacing stays even everywhere.

## v1.5.102

- Fixed: the filter pills on the pipeline run-history view (Recipe / Status / Source) could show their last label pressed against — or clipped by — the rounded edge of the filter group; every label now renders fully inside its track with clear spacing, at any window size.

## v1.5.101

- Changed: articles arriving from a content source now always get their categories and tags chosen by AI — SyteOps reads each article and picks from your site's existing categories and tags, creating new ones only when nothing fits, so you no longer end up with a brand-new category for every article. Categories and tags can no longer be mapped from the incoming webhook payload, and each source's Target tag is still added to every post so display formatting keeps working.
- Improved: the dropdowns in the review portal — “Send to a colleague” and the “Publish as” picker in the action bar — are now styled to match the portal’s other fields, with the same border, rounded corners, focus highlight and chevron, instead of the plain browser dropdowns they used before.

## v1.5.100

- Changed: the licensing server can now require the private credential from requests that CLAIM to be one of your own sites. Set which domains count as yours, opt that check in, and a request naming one of them must present the credential — everything else, including every customer activation, is completely unaffected. Also fixed: the warning shown before turning the stricter mode on could never appear, and scoping a customer-facing endpoint applied before warning you.

## v1.5.099

- Fixed: retired and built-in features could linger in the Modules list long after they were removed or folded into the plugin — showing a status and version that no longer meant anything. These leftover entries are now cleaned up automatically.

## v1.5.098

- Fixed: a security issue in the licensing gateway. Requests that referred to a license or customer record by its ID number are now verified to belong to the license key making the request, so one site can no longer read or change another customer's licence details by guessing ID numbers. Normal activation, validation and deactivation are unaffected.

## v1.5.097

- Changed: the private credential on requests between your sites and the licensing server is now sent only to the licensing host itself, and the stricter checking mode is applied only to the specific endpoints you opt in — so turning it up can no longer affect customer license activations. Defaults are unchanged and nothing is rejected until you opt an endpoint in.

## v1.5.096

- Changed: requests between your sites and the licensing server now carry a private credential in addition to the existing routing header, so the firewall allow rule can no longer be satisfied by copying a public header. Existing customer integrations are unaffected — the public header keeps working exactly as documented, and the new check starts in a monitor-only mode that rejects nothing.

## v1.5.095

- Changed: FlowMattic's Variables screen no longer shows a "… Setting/Variable" label on every variable this plugin writes — the Description column is left blank by default so the list is easier to scan. A new "Label FlowMattic variables with a description" toggle under Admin > Other Options turns the labels back on. Only these auto-generated labels are added or removed; any description you wrote yourself is left untouched. When the labels are switched on, they now carry your own brand name on white-labeled installs.

## v1.5.094

- Improved: Workflows imported into FlowMattic — from a template package or from a connected server — now carry FlowMattic's full native workflow settings, so an imported workflow opens in the current workflow builder and appears under the "All" folder, just like one created directly in FlowMattic.

## v1.5.093

- Changed: SyteOps now supports FlowMattic 7.0. On FlowMattic's redesigned Variables screen your sensitive values (API keys, tokens, and secrets) stay hidden instead of appearing in plain text; installing FlowMattic from SyteOps no longer detours you to FlowMattic's own setup wizard; and importing a workflow into FlowMattic now saves correctly. FlowMattic 6.x installs keep working unchanged.

## v1.5.092

- Improved: The "Send to webhook" and "Delete" actions on the leads list are now styled buttons — a brand-colored Send action and a red Delete action — instead of plain text links, making them easier to spot and harder to click by mistake.

## v1.5.091

- Changed: The recommended Cloudflare firewall rule for allowing SyteOps licensing and management requests is now scoped to the plugin's own API path, so a forged request-marker header can no longer be reused to let other traffic bypass your firewall.

## v1.5.090

- Fixed: Lead phone numbers now display in a consistent (NNN) NNN-NNNN format on the leads list and in lead emails, matching the office phone. Masked, international, and unusual numbers are shown unchanged.

## v1.5.089

- Fixed: A form submitted without a tracking cookie now attaches to the visitor's existing lead instead of creating a duplicate, unattributed lead.
- Fixed: Qualified-lead alerts now honor the same per-goal automation opt-out as new-lead alerts, and no longer re-send when a visitor re-submits the same answers.
- Fixed: Phone-only (call) leads can now sync their pipeline status to the RingTonic CRM.
- Fixed: Deleting a lead now fully removes its event history, and lead event counts stay accurate under rapid activity.

## v1.5.088

- Added: "Auto-map with AI" on the leads form-field mapping. It reads a form's fields and suggests which are the name, email, phone, office phone, and message — and proposes named custom fields for the rest — pre-filled for you to review, edit, or remove before saving. Choose which AI provider to use in the new "AI mapping" card on the leads settings screen.

## v1.5.087

- Fixed: On the leads settings, the form-to-lead field mapping controls now render at a consistent, full width, so long form and field names are no longer cut off, and the custom-field row is spaced out instead of cramped.

## v1.5.086

- Added: Map any of your form's fields to a named custom field on the lead — with an optional "sensitive" flag so it follows your privacy setting. Custom fields show on the lead, in the CSV export, in lead emails, and in the outgoing webhook.
- Added: Pull contact data from RingTonic into the lead. Your originally captured details are preserved; RingTonic's extra and differing fields are added alongside without duplicating what you already have — refreshed automatically on sync or on demand with a "Refresh from RingTonic" button, and included in the outgoing webhook.

## v1.5.085

- Added: An optional office phone field when mapping a website form to leads — it shows on the Leads list, in the CSV export, and in lead emails alongside the other contact details.
- Added: The outgoing lead webhook payload now includes the lead's contact details (name, email, phone, and office phone), each sent exactly as it is stored under your privacy setting.
- Added: A one-click Backfill that applies your saved form mappings to existing leads, filling in contact details from each form's stored submissions. It matches submissions to leads by contact identity, never overwrites anything already set, and skips form tools that don't store submissions (Contact Form 7, WPForms Lite).

## v1.5.084

- Added: The RingTonic CRM API key can now be set headlessly (encrypted, integration auto-enabled) — managed site launches push it automatically when the RingTonic MCP is selected.

## v1.5.083

- Fixed: Form-selection dropdowns now list your forms on sites where they previously appeared empty even though forms existed.

## v1.5.082

- Added: The RingTonic integration now displays its logo on the Integrations tab.

## v1.5.081

- Changed: The RingTonic API key field on the Leads settings screen now appears only when the RingTonic integration is turned on.
- Added: The RingTonic integration tile links directly to its API key field once the integration is enabled.

## v1.5.080

- Added: The lead qualification form now honors Global Privacy Control. It still records what a visitor submits, but leaves out the tracking identifiers when a visitor's browser asks not to be tracked.
- Changed: The leads list is redesigned to show each lead's name, how it was received, email, and phone — with a status you can set right from the list (New, Contacted, Qualified, Unqualified, Customer).
- Added: Lead export — send a single lead to your automation webhook, or download the full list.
- Added: RingTonic integration — keep a lead's status in sync with the RingTonic call-tracking CRM.

## v1.5.079

- Added: Lead tracking is now consent-aware. When the WP Full Picture integration is enabled, the tracker follows Full Picture's consent choices and only records a lead — and sets its cookies / stores first-touch attribution — once analytics consent is granted. Global Privacy Control (GPC) is always honored, and visitors in the EU/EEA/UK are treated as opt-in (nothing stored or sent until they consent). The US and the rest of the world remain opt-out unless GPC is set.
- Added: The cookies the leads tracker sets are now declared (name, lifetime, purpose), so your consent tool can register them.

## v1.5.078

- Fixed: The Form Field Mapping tool on the Leads settings page now lists your Fluent Forms forms correctly. Previously the form dropdown could appear empty even when forms existed.

## v1.5.077

- Added: A Form Field Mapping tool on the Leads settings page — pick a form plugin and a form, then map its fields to a lead's name, email, phone, and message with no code. Works with Fluent Forms, Gravity Forms, WPForms, and Contact Form 7.
- Added: The privacy control for how contact details are stored on leads (full, masked, or off) is now set directly on the Leads settings page.

## v1.5.076

- Added: Lead records now capture the contact name, email, phone, first-touch attribution, and the message submitted through a connected form, so each lead is a complete record on its own.
- Added: A privacy control for how personal data on lead records is stored — keep it in full, store a masked version, or don't store it at all. Personal data is never written to the tamper-evident activity log.

## v1.5.075

- Improved: Removed a redundant "Edit settings" link from the AI Search Discovery card on the Content Pipelines dashboard. The card's on/off switch and engine choice already live on the card itself, so the link had nowhere new to go.
- Fixed: A large email logo no longer stops automated report and digest emails from sending. An oversized image is kept as a linked image instead of being embedded in the message, and the email logo stays small even when a resized version isn't available.

## v1.5.074

- Changed: The AI Search Discovery (`llms.txt`) engine is now either/or — switch between the built-in generator and the LLMS Amplifier integration from one place on the Content Pipelines tab. Turning LLMS Amplifier on automatically sets it to manual updates and turns AI Search Discovery on; turning it off reverts to the built-in generator, so AI Search Discovery is never left off.
- Changed: The AI Search Discovery on/off switch and engine choice, and the Social Publishing on/off switch, now live together with their other settings on the Content Pipelines tab instead of being scattered across separate settings screens.

## v1.5.073

- Improved: The content calendar's "draft" status indicator now meets accessibility contrast standards, and rescheduling reports clearer, more accurate errors.

## v1.5.072

- Fixed: Scheduled banners now display and report correctly across a daylight-saving-time change. Previously the banner would switch over at the right moment, but its on-screen visibility and the admin status pill could be off by an hour on sites that observe daylight saving.
- Fixed: Choosing a clock time that doesn't exist on the spring-forward night (when clocks jump ahead) now moves the schedule forward past the skipped hour, the way calendars normally handle it.
- Improved: The banner "Now", "Today", and "Tomorrow" quick-set buttons now fill in your site's local time instead of the time on whatever computer you're using.

## v1.5.071

- Fixed: Scheduled social posts now fire at the intended time in your site's timezone, instead of the timezone of whoever's browser was used to schedule them.
- Fixed: Banner activation and deactivation times are now read in your site's timezone, so a scheduled banner no longer switches on or off early (or late) on sites that aren't set to UTC.

## v1.5.070

- Fixed: Scheduled and rescheduled times now use your site's timezone instead of the timezone of whoever's browser is being used, so a post set for "9:00 AM" goes live at 9:00 AM site time no matter where the editor is. This applies to the calendar, the Publish schedule control, and social scheduling.
- Improved: Calendar text — post times and out-of-month day numbers — is now easier to read, meeting accessibility contrast standards.
- Changed: Moving an already-scheduled post now respects the same publish permissions as scheduling a draft, so only people allowed to publish can change when a scheduled post goes live.
- Fixed: Dragging a post scheduled for exactly midnight no longer resets its time, and the calendar no longer holds on to memory as you move between months.

## v1.5.069

- Added: An editorial calendar showing your recent, draft, scheduled, and published posts, in both the Content Pipelines area and the review portal. Drag a post to a new day — or pick an exact date and time — to reschedule it, and drag an unscheduled draft onto a day to schedule it. You can only move posts you're allowed to edit, and scheduling a draft needs permission to publish.

## v1.5.068

- Fixed: The content pipeline activity filters no longer cut off their last option (such as "Skipped"). When space is tight a filter group now wraps to the next row instead of being squeezed and clipped.

## v1.5.067

- Changed: Renamed the content pipeline activity "Pipeline" source filter (and the matching per-row tag) to "Direct" so it's easier to tell apart from your content-source filters.

## v1.5.066

- Improved: Security hardening across admin screens with better escaping of displayed data and clearer error messages when requests fail.
- Fixed: Import preview now surfaces per-item conflicts so you can choose to skip or overwrite each one.

## v1.5.065

- Internal improvements and maintenance.

## v1.5.064

- Improved: Internal cleanup removing outdated code left over from retired modules; error logging now follows the plugin's logging system.

## v1.5.063

- Improved: Admin screen requests now use a unified security check with clearer permission error messages.
- Fixed: Configuration import and backup restore now report file read or write problems instead of failing silently.

## v1.5.062

- Improved: Uninstalling the plugin now removes additional stored data (internal tables, update-checker state, scheduled sync tasks, and the backup folder) for a cleaner removal.
- Fixed: Debug logging now follows the plugin's own debug mode setting, and module activation logs are written to per-module log files.

## v1.5.061

- Fixed: The Content Pipelines screen no longer appears unstyled when opened by clicking its tab — it now displays correctly without needing a page refresh.

## v1.5.060

- Improved: Licensing credentials saved from the server configuration screens are now encrypted at rest, matching how they are stored when saved from the settings form.
- Fixed: Registry import preview and conflict lists render safely regardless of imported tab names, and REST log page permission errors now return the correct HTTP status.

## v1.5.059

- Fixed: Minor admin wording polish — a punctuation fix on the setup-status notice and removal of a redundant explanatory note.

## v1.5.058

- Fixed: A helper label placed right after a button now has proper spacing instead of sitting crammed against it.

## v1.5.057

- Fixed: In the Content Sources editor, the config-variable and custom-field rows now line up in their columns instead of overflowing and overlapping their neighbors.

## v1.5.056

- Fixed: The content source Ingest URL field now always shows the full URL instead of truncating to a narrow box.
- Changed: Removed a provider-specific shortcut on the Content Sources add-source form — the standard signature-header fields cover the same setup.

## v1.5.055

- Improved: The Cloudflare account ID and zone ID are now hidden on the FlowMattic Variables screen, matching how the Cloudflare API token is already masked there.
- Fixed: A Cloudflare Zone ID entered on the System/API screen now saves reliably — previously the typed value could be dropped when saving.
- Fixed: Non-secret System/API identifiers (such as the Cloudflare account and zone IDs) configured through automated (headless) setup now display correctly on the System/API screen instead of as scrambled text.

## v1.5.054

- Fixed: AI model dropdowns now show the full model name instead of truncating to a narrow box.
- Improved: A visual polish pass across the Content Pipelines admin screens — consistent card depth and titles, tidier spacing and alignment, and the field-mapping payload tree now stays beside the mapping fields while you scroll.

## v1.5.053

- Added: A Setup / Production mode for content pipelines. In Setup mode drafts are still created so you can preview mappings, but runs aren't recorded and nothing is sent out — no reviewer emails, workflow forwards, or social posts — so you can test safely. Switch to Production when you're ready to go live. Note: every site starts in Setup after this update — if yours was already live, open Content Pipelines → Runs and switch to Production to resume recording and sending.
- Added: A "Clear all run history" button in the Runs view.
- Fixed: The Review Portal settings view no longer renders blank during setup — the AI provider, branding, and portal settings are available before any content source goes live.
- Fixed: In Content Sources, the FlowMattic config-variable and custom-field editor tables no longer run off the right edge of the card on a narrow browser window.
- Improved: Clearer helper text for where the Content AI provider is configured, plus a freshened example in the source config-variable editor.

## v1.5.052

- Added: In the payload mapper, click into a mapping field to get a filterable dropdown of the incoming payload's paths — type to narrow it, arrow keys and Enter to pick — alongside the existing clickable tree.
- Added: A "Delete all captured payloads" button clears every source's remembered payload in one click.

## v1.5.051

- Added: Visual payload mapper for Content Sources — click a value in a received payload to map its field, while viewing the payload.
- Added: FlowMattic config variables can now pull a value from each incoming payload (per-article), delivered with the forwarded workflow.
- Improved: Content Sources remember the last payload each source received, so you can map against exactly what arrived.

## v1.5.050

- Fixed: entering a custom inbound signature header on a content source no longer gets discarded when the header mode is left on "Standard" — the header you type is now saved. Previously this could cause a provider's webhooks (such as ContentPen) to fail verification.
- Content Sources: a new "Prefill for ContentPen" button sets the correct ContentPen signature header in one click, so ContentPen webhooks verify without manual setup.
- Content ingest now returns a clearer "Missing signature header" message when a webhook arrives without a signature, making it easier to tell a misconfigured header apart from a mismatched secret.

## v1.5.049

- Content sources can now skip signature verification with a new "None" auth mode, for senders that cannot sign requests — the unguessable ingest URL is the only gate.
- Content sources can now store a provider-supplied verification secret and a custom signature header name, so webhooks signed with the provider's own key are verified.

## v1.5.048

- Deleting a content source now frees its ingest URL for reuse — recreating a source with the same name reclaims the original ingest URL instead of getting a numbered suffix.

## v1.5.047

- The operator deploy tool now remembers the SyteOps Admin user you pick at its prompt — it writes the resolved id to the env files the next deploy reads, so subsequent deploys stop asking for it. Preset `SYTEOPS_ADMIN_USER` to skip the prompt entirely.

## v1.5.046

- Added an `integration enable|disable <slug>` command to the System / API command family, so deployment tooling can toggle a SyteOps integration headlessly — turn an integration on when its plugin is installed or adopted, and off when it is removed.

## v1.5.045

- Retired the standalone ContentPen integration. Everything it did — signed webhook ingest, AI-suggested categories and tags, author matching, target-tag rules, and display cleanup — is now built into Content Sources, and existing ContentPen setups are migrated over automatically.

## v1.5.044

- Content Sources can now match what the ContentPen integration does — AI-suggested categories and tags, author matching, target-tag rules, display cleanup, and a configurable webhook signature header.

## v1.5.043

- System / API — added a Cloudflare Zone ID field (with its FlowMattic sync variable), relabeled the Cloudflare token field to *API Token* (its option key and FlowMattic variable are unchanged), added copy buttons to all three Cloudflare fields, and widened the System / API `set` command so it also accepts the five AI-provider API keys (OpenAI, Anthropic, OpenRouter, Gemini, Perplexity).

## v1.5.042

- Fixed the headless System / API WP-CLI setter added in 1.5.041: its `--stdin` flag was declared unbracketed, which WP-CLI rejected as an invalid synopsis, so the command never ran. It now uses `[--stdin]` and populates the fields as intended.

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
