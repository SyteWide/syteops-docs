---
sidebar_position: 16
title: Lead Attribution
description: Prove which website visits generated your phone-call and form leads, capture them as a verifiable record, and get notified the moment one arrives.
---

# Lead Attribution

Lead Attribution captures the moments a visitor shows intent to contact you — tapping a phone number, clicking a "show number" button, or submitting a form — and ties each one back to *how that visitor found your site* (the page they landed on, the referring site, and the campaign/UTM tags). Every captured lead becomes a tidy, timestamped record you can review, export, share, and get alerted about.

It's built for anyone who needs to **prove a lead came from the website** — for example, to document the leads your marketing produced.

## What it can (and can't) track

- **Phone-call clicks** — when someone taps a `tel:` link on mobile (tap-to-call), that's captured along with where they came from.
- **"Reveal number" clicks** — if your site hides the number behind a button, clicking it counts as call intent (useful on desktop).
- **Form submissions** — contact and quote forms (Fluent Forms, Gravity Forms, Contact Form 7, WPForms are auto-detected; you can also target a form by CSS selector).
- **Completed phone calls, when the RingTonic integration is connected** — a `tel:` click only proves someone *tapped* the number; it can't tell you whether the call actually connected, how long it lasted, or whether it was a first-time caller. Once RingTonic's [live notifications](../integrations/ringtonic#4-live-notifications-set-up-by-your-hub-operator) are set up, a call that actually completes (or is missed) is captured too, with that richer detail attached.

Without RingTonic, tracking a call placed by someone who reads your number off the screen and dials from a different phone is not possible — no website tool can see that without a special tracking phone number, which the built-in `tel:`/reveal capture above deliberately avoids. To help bridge that gap either way, every lead gets a short **reference code** (e.g. `WEB-7K2QF`) you can ask callers to mention.

## Turn it on

Lead Attribution ships with SyteOps as a built-in module. Enable it from **SyteOps → Modules**, then open the new **Leads** menu item.

## Set up your goals

On the **Leads → Settings** tab, choose which actions to capture:

- **Phone (tel:) link clicks** — on by default. Fires whenever a visitor taps or clicks any `tel:` link on your site, capturing their source and the page they were on.
- **"Reveal number" clicks** — turn this on and enter the CSS selector of your reveal button (e.g. `.reveal-phone`). Useful when your site shows a button like "Show phone number" instead of a raw `tel:` link. See the [CSS selector cookbook](#css-selector-cookbook) below for help finding the right selector. Leave **Only count reveal clicks on desktop** on (the default) to ignore taps on phones, where the number is already tap-to-call.
- **Form submissions** — pick your form plugin (or "auto"), or enter a specific CSS selector to target one particular form (e.g. `#gform_1` or `.wpcf7-form`). Auto-detection covers Fluent Forms, Gravity Forms, Contact Form 7, and WPForms.
  With Fluent Forms, an entry the form marks as spam records no lead. An entry the form holds until it is confirmed (double opt-in), approved by an admin, or paid on the payment provider's page records its lead when that happens, with the visitor and campaign details from the moment they submitted, so the person approving is never mistaken for the visitor.

### Consent

Choose between two modes to match your privacy requirements:

- **Opt-out** (default) — tracking runs for all visitors unless they actively withdraw consent. Works well if your analytics consent banner already covers tracking.
- **Opt-in** — tracking only starts after a visitor grants consent. Use this if you need explicit permission before recording any data.

### Email reports

Stay informed without watching a dashboard:

- **Per-lead emails** — get an email the moment a new lead is captured. You can set a short digest window (e.g. 15 minutes) so that several leads arriving in quick succession are bundled into one message.
- **Scheduled summaries** — choose daily, weekly, or monthly digests for a periodic overview of lead volume and sources. Pick the send hour, and (for weekly/monthly) the day it goes out.
- **Reply-To address** — replies to any lead report email can go to a person (for example, your sales lead) instead of the site's sending address. Set it under **Leads → Settings → Email reports**; leave it blank to keep the default.

### Email branding

You can put your own logo at the top of the lead emails this feature sends (new-lead alerts, digests, and scheduled summaries):

1. Go to **Leads → Settings → Email reports**.
2. Next to **Email logo**, click **Select logo** and choose an image from your Media Library.
3. Save settings.

Your logo appears at the top of every lead email, on a white background, and it displays correctly in both light and dark email apps. For best results use a logo that reads on white — a **transparent PNG** is ideal (many email apps don't display SVG). Leave the field empty to show your site name as text instead.

The logo is embedded directly in each email, so it shows even in inboxes that block remote images.

## Qualify your leads (scoring)

Beyond capturing *that* a lead arrived, you can capture *how good it is*. Turn on **Lead qualification** in Settings and define a short set of questions — each answer carries points, and the totals roll into tiers you control (Hot / Warm / Cold by default).

### How points and tiers work

Every question you define has answer options, and each option carries a point value. When a lead submits the form, SyteOps adds up the points from each answer. The lead is then assigned the **highest tier whose `min` threshold the total reaches**.

For example, if you configure:

```json
[
  { "id": "hot",  "label": "Hot",  "min": 60 },
  { "id": "warm", "label": "Warm", "min": 30 },
  { "id": "cold", "label": "Cold", "min": 0 }
]
```

A lead who scores 70 points gets the **Hot** tier. A lead who scores 45 gets **Warm**. A lead who scores 10 gets **Cold**.

The score and tier attach to the lead, show on the dashboard and proof packet, and travel to your CRM via webhook.

### Building questions with the visual builder

The **visual builder** lets you create your question set without writing any JSON. Click **Add Question**, give it a label, choose a type, and add answer options with their point values.

Valid question types are:
- **`select`** — a dropdown; answers carry points.
- **`radio`** — single-choice buttons; answers carry points.
- **`checkbox`** — multi-select; answers carry points.
- **`number`** — a numeric input; no point values (used to capture data like budget figures).
- **`text`** — a free-text input; no point values (used to capture open-ended answers).

For each question you can also set a **CRM field name** — a short key like `budget` or `timeline`. This maps the answer to a named field in the webhook payload your CRM or automation receives (see [Send leads to your tools](#send-leads-to-your-tools-webhooks) below).

### Advanced: raw JSON

If you prefer to work directly in JSON — or want to paste a configuration from another site — use the **Advanced (raw JSON)** toggle to edit the questions array directly. Here is a complete example:

```json
[
  {
    "id": "budget",
    "label": "What's your budget?",
    "type": "select",
    "crm_field": "budget",
    "options": [
      { "value": "under_1k", "label": "Under $1,000", "points": 0 },
      { "value": "1k_5k",    "label": "$1,000–$5,000", "points": 20 },
      { "value": "over_5k",  "label": "Over $5,000",   "points": 40 }
    ]
  },
  {
    "id": "timeline",
    "label": "When do you need this done?",
    "type": "radio",
    "crm_field": "timeline",
    "options": [
      { "value": "asap",     "label": "As soon as possible", "points": 30 },
      { "value": "browsing", "label": "Just researching",    "points": 0 }
    ]
  }
]
```

And the matching tiers array:

```json
[
  { "id": "hot",  "label": "Hot",  "min": 60 },
  { "id": "warm", "label": "Warm", "min": 30 },
  { "id": "cold", "label": "Cold", "min": 0 }
]
```

### Two ways to ask the questions

- **Fluent Forms** — if you already build forms with Fluent Forms, point SyteOps at the form (enter its form ID) and map each Fluent Forms field to a question ID. When someone submits that form, SyteOps scores their answers and attaches them to the lead automatically. No extra form widget needed.
- **Native form** — drop the built-in questionnaire anywhere with the `[syteops_lead_form]` shortcode or the **Lead Form** block, or configure it as a pop-up (see [Shortcode & block reference](#shortcode--block-reference) below).

## Save contact details on the lead (form field mapping)

By default a form submission is counted as a lead with its source and campaign, but the visitor's **contact details** (name, email, phone, office phone, and message) aren't copied onto the lead. **Form field mapping** turns that on — with no code.

On **Leads → Settings**, open the **Form field mapping** card and:

1. Click **Add form mapping**.
2. Choose your **form plugin** — Fluent Forms, Gravity Forms, WPForms, or Contact Form 7.
3. Choose the **form** (the list loads automatically once the plugin is selected).
4. For each of **Name, Email, Phone, Office phone, and Message**, pick which form field it comes from. Leave any you don't need on "Not mapped". (Office phone is a second, separate number — handy when a form asks for both a mobile and a business/office line.)
5. Tick **Enabled** and **Save settings**.

From then on, every submission of that form copies the mapped details onto the lead. You can add a mapping for as many forms as you like. First names and last names that a form keeps in separate boxes are joined automatically. Attribution (source, campaign, UTMs) is always added for you — you don't map it.

Mapping copies details onto the lead **when the submission is captured as a lead**, so make sure form-submission tracking is turned on (in **Conversion goals** above) and set to cover the form's plugin — if it's limited to a specific plugin, submissions from the others won't be captured or mapped.

### How contact details are stored (privacy)

The same card has a **How to store contact details** control:

- **Masked** (recommended) — stores only non-identifying hints of the contact details (initials, a partial email, the last four digits of each phone — mobile and office alike). The message isn't stored.
- **Full** — stores the exact name, email, phone, office phone, and message. Choose this only where your privacy policy allows.
- **Off** — stores no contact identity or message at all.

Whichever you choose, contact details are **never** written to the tamper-evident activity log behind each lead — only to the editable lead record, so they remain easy to remove for data-erasure requests.

There is **one exception to what Masked removes**, and only if you switch it on: RingTonic's AI call summary, described in [What lands on the lead](../integrations/ringtonic#what-lands-on-the-lead). It is stored as readable prose with phone numbers and email addresses replaced, so a name spoken during the call can remain in it. It is **off by default**; turn it on with **Store RingTonic's AI call summary on the lead** on the RingTonic card, or choose **Off** above to store no summary at all.

The same card also has a **Default deal currency** field — a three-letter ISO code (e.g. `USD`, `EUR`, `GBP`; defaults to `USD`) used whenever a deal value is recorded without a currency of its own (from the Leads list, the RingTonic integration, or the management API). See [the dashboard](#the-dashboard) above and [RingTonic integration → Deal value](../integrations/ringtonic#deal-value).

### Map any form field (custom fields)

Beyond Name, Email, Phone, Office phone and Message, you can map **any** of a form's fields to a **custom field** on the lead. In a mapping's **Custom fields** section, click **+ Add custom field**, type a name (e.g. "Budget" or "Company"), and pick the form field it comes from. Tick **Sensitive** for anything that shouldn't be stored in the clear — a sensitive field is masked under **Masked** storage and dropped under **Off**, while ordinary business fields like "Budget" are kept as-is.

Custom fields appear on the lead, in the CSV export, in lead emails, and in the outgoing webhook (under a `custom` object). You don't need to map UTM or campaign fields — those are captured automatically and already sent.

### Let AI map the form for you (Auto-map with AI)

Instead of mapping each field by hand, you can let AI do the first pass. On a mapping row, once you've picked a form plugin and a form, click **Auto-map with AI**. It reads that form's fields and fills the row in for you:

- It sets **Name, Email, Phone, Office phone, and Message** to the fields that best match.
- It **creates a custom field** for every other meaningful field (e.g. "Budget", "Company", "Timeline"), and flags anything that looks personal or confidential as **Sensitive**.
- It skips buttons, section headings, and spam-protection fields.

Nothing is saved yet — the suggestions are pre-filled so you can review them, change any dropdown, rename or delete a custom field, then click **Save settings** as usual. Each AI-suggested value shows a small confidence hint that clears once you edit it.

To use it, first choose your AI provider and model in the **AI mapping** card lower on the same settings screen. (If you haven't set a provider, the button tells you so — Auto-map is an optional helper; you can always map by hand.)

### Pull data from RingTonic into the lead

When the RingTonic integration is on, SyteOps can bring the CRM's contact data onto the lead. It works as an **overlay**: the lead keeps the details it originally captured, and RingTonic's **extra** fields (custom fields, tags, stage) plus anything RingTonic has that **differs** are added alongside — nothing you already have is stored twice or overwritten. This happens automatically the first time a lead syncs with RingTonic, and you can pull the latest anytime with the **Refresh from RingTonic** button on the lead. RingTonic data rides the outgoing webhook under a `ringtonic` object.

When RingTonic's live notifications are set up, the same `ringtonic` object also carries what RingTonic knows about each **call** — duration, how the call ended, the caller's city and state, the tags, and RingTonic's AI call summary. The full field list, and how the summary follows your PII storage setting, are in [What lands on the lead](../integrations/ringtonic#what-lands-on-the-lead).

### Fill in leads you already have (Backfill)

Mapping only copies details onto leads captured **after** you set it up. If you added or changed a mapping later — or just turned on the new office phone field — your earlier leads won't have those details yet. The **Backfill existing Leads from saved mappings** button (on the same card) fixes that in one click.

1. Set up and **Save** your mappings first.
2. Click **Backfill existing Leads from saved mappings** and watch the running count.

It reads each mapped form's **stored submissions**, matches each one to an existing lead by contact identity (email, then phone — using the same privacy setting as above), and fills in any contact details that are still blank. It **never overwrites** anything already on a lead, and it never creates new leads. If a stored submission could match more than one lead, it's skipped rather than guessed. Contact Form 7 and WPForms Lite don't keep stored submissions, so mappings for those are skipped and reported at the end.

Under **Masked** storage the lead only holds a partial email/phone, so matching is approximate: the backfill guards against obvious mismatches (it skips when a lead's other stored detail contradicts the submission), but for the most precise matching, run the backfill while **Full** storage is selected.

## Fill form fields from first touch

Some forms carry **hidden fields** for campaign details (for example `utm_source`, `utm_campaign`, `gclid`, a landing page or a referrer) so that the form's notification emails and webhooks can print them. Lead Attribution can fill those hidden fields for you when the visitor submits, from the same first-touch details it records on the lead. The stored entry, the entry screen, the emails and the webhooks then all show the visitor's first campaign, with no extra script on your pages.

This works with **Fluent Forms** today. On **Leads → Settings**, open the **Fill form fields from first touch** card. Every form is listed by title and ID. For each one, choose:

- **Off** (the default): the form is left exactly as it is.
- **Match by field name**: a hidden field whose name is a first-touch value gets that value: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `landing`, `referrer`, the click ids (`gclid`, `fbclid`, `msclkid`, `gbraid`, `wbraid`, `ttclid`, `li_fat_id`), `first_landing` (the first page the visitor landed on) and `originating_post` (the post that sent them to the form). A few common names are understood too: `landing_page`, `landing_page_url` and `landing_url` get the landing page, `referer` and `referrer_url` get the referrer, `first_landing_page` and `first_landing_url` get the first landing page, and `originating_url` gets the originating post. The card lists the fields that will be filled.
- **Custom**: pick, for each of the form's hidden fields, which first-touch value it gets, or leave it on "Not filled".

**Replace values already present** (off by default) decides what happens when a hidden field already has a value, such as a default of `{get.utm_source}` that reads the form page's address:

- **Off**: only empty fields are filled, so a field's own default is kept.
- **On**: every chosen field takes the first-touch value, even a blank one, so the entry carries one complete first-touch set and never a mix of the form page's tags and the first visit's.

Good to know:

- Only **hidden** fields are filled. A field the visitor can see and type into is never changed.
- Nothing is filled when the visitor sends Global Privacy Control, when the visit is [internal traffic](#internal-traffic-your-own-team-and-tools), or when the visitor has no first-touch cookie and neither a site integration nor the [no-cookie setting](#when-a-visitor-has-no-first-touch-cookie) supplies details. The submission then goes through exactly as it would without this setting.
- With the no-cookie setting on **Use the form page's own tags**, a visitor without the cookie gets the campaign tags of the page the form was sent from, in the fields and on the lead alike.
- The values are the same first-touch details the lead capture reads for that submission: plain text, with web addresses kept exactly as recorded. A visitor who already has a lead keeps that lead's earlier first touch, so the two can differ then.
- A hidden field the form left out of the submission (for example because its conditional logic hid it) stays out.
- If Fluent Forms is not active, or its forms cannot be read, the card says so and keeps your saved choices.

## Send leads to your tools (webhooks)

Lead Attribution can fire webhooks to any tool that accepts an incoming HTTP POST — an **automation webhook** (FlowMattic, Make, Zapier, n8n, or any other platform), a CRM, a custom endpoint, or a combination.

There are two distinct webhooks:

### Automation webhook (every new lead)

This fires the moment a new lead is captured, before qualification. Use it for **speed-to-lead** flows — text or email your team while the visitor is still warm.

Paste any URL into the **Automation webhook URL** field to activate it. Use the **Which conversions to send** switches to choose which first actions trigger it (phone clicks, reveal clicks, form submissions) — based on the lead's *first* action. The payload sent to your tool looks like this:

| Field | Meaning |
|-------|---------|
| `event` | Always `new_lead` |
| `ref` | Short reference code, e.g. `WEB-7K2QF` |
| `lead_id` | Internal lead ID |
| `source` | Attributed source |
| `campaign` | Campaign / UTM campaign |
| `status` | Lead status |
| `deal_value_cents` | Deal value, in whole cents (e.g. `123456` for $1,234.56) — `null` when no value is set. Not gated by your privacy setting; money isn't personal contact data. Set from the Leads list, sent to and received from RingTonic — see [RingTonic integration → Deal value](../integrations/ringtonic#deal-value). |
| `deal_currency` | Three-letter ISO currency code for the value above (e.g. `USD`) — `""` when no value is set. |
| `first_seen` | First-touch timestamp |
| `name` | Contact name, if captured (stored per your privacy setting) |
| `email` | Contact email, if captured (stored per your privacy setting) |
| `phone` | Contact phone, if captured (stored per your privacy setting) |
| `office_phone` | Mapped office phone, if any (stored per your privacy setting) |
| `landing` | Landing page URL |
| `referrer` | Referring URL |
| `utm_source` | UTM source tag |
| `utm_medium` | UTM medium tag |
| `utm_campaign` | UTM campaign tag |
| `gclid` | Google Ads click ID |
| `fbclid` | Facebook Ads click ID |
| `msclkid` | Microsoft Ads click ID |
| `gbraid` | Google consent-mode click ID (app-to-web) |
| `wbraid` | Google consent-mode click ID (web-to-app) |
| `ttclid` | TikTok click ID |
| `li_fat_id` | LinkedIn click ID |
| `first_landing` | The first page the visitor landed on (full address, campaign and click-id parameters only), or `""` |
| `originating_post` | The last post the visitor read before the conversion (see [Originating post types](#first-landing-page-and-originating-post)), or `""` |
| `link_owner` | The person whose [tracked link](#tracked-links) brought the visitor (their link name, such as `chet-bohley`), or `""` |
| `link_owner_slot` | That person's team slot when the link was made (for example `001`), or `""` |
| `link_kind` | Which of their links it was (`featured`, `my-work`, `contact`, `post` or `msg`; links not yet moved to the current shape may still say `deals`), or `""` |
| `link_id` | The tracked link's internal id, or `""` |
| `custom` | Object of your mapped custom fields, if any (`{ key: value }`) |
| `ringtonic` | Object of RingTonic overlay data, if any (extra/differing CRM fields) |
| `admin_url` | Deep link to the lead in WP admin |
| `proof_url` | Shareable read-only proof link |

The contact fields (`name`, `email`, `phone`, `office_phone`) are sent exactly as they're stored on the lead, so they follow your **How to store contact details** setting — masked values under Masked, exact values under Full, and empty under Off. They're populated by [form field mapping](#save-contact-details-on-the-lead-form-field-mapping); without a mapping they're blank.

### CRM webhook (qualified leads only)

This fires only after a lead has been scored. Use it to push enriched lead data — including the score, tier, and individual answers — directly into your CRM or a workflow that routes hot leads to a rep.

Paste any URL into the **CRM webhook URL** field to activate it. The payload includes all of the fields listed above **except `proof_url`**, plus:

| Field | Meaning |
|-------|---------|
| `event` | Always `qualified` |
| `score` | Total points |
| `tier` | Tier id (e.g. `hot`) |
| `tier_label` | Tier display label (e.g. `Hot`) |
| `answers` | Array of `{ id, label, value, points }` for each answered question |
| `fields` | Object mapping each question's `crm_field` key → the answer value |

The `fields` object is what most CRMs consume directly — for example, `{ "budget": "over_5k", "timeline": "asap" }` — so you can map the values straight to CRM contact properties without extra transformation in your automation.

## CSS selector cookbook

A CSS selector tells Lead Attribution exactly which element on the page to watch. The table below covers the most common goals:

| Goal | Selector | Notes |
|------|----------|-------|
| All phone links | `a[href^="tel:"]` | Default; covers tap-to-call on all `tel:` links |
| A specific "call" button | `.btn-call` | Use your button's class |
| Reveal-number button | `.reveal-phone` | Whatever class your theme uses |
| A specific form (Gravity Forms) | `#gform_1` | Replace `1` with your form's ID |
| A specific form (Contact Form 7) | `.wpcf7-form` | Targets any CF7 form on the page |
| A specific form (Fluent Forms) | `.fluentform` | Targets any Fluent Forms form |
| Elementor button | `.elementor-button` | Narrow with a section ID if needed |

**Finding a selector:** right-click the element on your page, choose **Inspect** (or "Inspect Element"), and look for a class name or `id` attribute in the highlighted HTML. Classes start with `.` and IDs start with `#`.

## Shortcode & block reference

The native qualification form can be placed anywhere on your site:

- **Shortcode:** `[syteops_lead_form]` — paste into any post, page, or widget area.
- **Block:** search for **Lead Form** in the Gutenberg block inserter and drop it where you want the form to appear. The block shows a live preview and a settings panel (Title, Button label) right in the editor.
- **Pop-up:** configure the pop-up options in the qualification settings — choose a trigger (time delay, scroll percentage, or exit intent) and optionally set a title for the pop-up overlay. The pop-up appears automatically without any shortcode or block.

## The dashboard

**Leads → Dashboard** shows your totals (all-time, last 7 and 30 days) and your most recent leads. Each row shows the lead's **name**, **how it was received** (form, phone tap, reveal-number click, or call), **email**, **phone**, and **office phone**, plus a **status** you can set right from the list.

**Lead status** is a simple pipeline: **New → Contacted → Qualified → Unqualified → Customer**. Pick a status from the drop-down on any row and it saves instantly. (This is separate from the optional *scoring tiers* — Hot/Warm/Cold — which come from your qualification questions.)

**Deal value** — a closed deal's value — is right next to it. Type a value (in ordinary currency units, e.g. `1234.56`) into the **Deal value** column on any row and it saves instantly, the same way status does. If you use the [RingTonic integration](../integrations/ringtonic#deal-value), this value is sent there automatically, and a value closed in RingTonic can fill this field in too when it's empty.

**Row actions:**

- **Send to webhook** — push that single lead to your automation webhook on demand (in addition to the automatic send for new leads).
- **Delete** — remove the lead. If RingTonic sync is on, its RingTonic contact is moved to **Lost** (RingTonic keeps its own record — it has no delete).

**Export CSV** downloads your leads — now including name, how received, email, phone, office phone, status, and deal value (as `deal_value_cents` + `deal_currency`) alongside the attribution columns.

Click a lead's name to open its **proof packet**.

## Proof packets and shareable links

Each lead's proof packet shows its full story: the source, campaign, landing page, first landing page, originating post, and a timeline of every event — with an **integrity check** that confirms the record hasn't been altered since it was captured.

Need to show a client the evidence without giving them admin access? Use the **shareable proof link** — a read-only web page for that single lead. You can regenerate the link at any time to revoke the old one.

### Moving leads to another site

A normal data export (**Modules → Lead Attribution → Export Data**) restores cleanly on the same site. On a *different* site, the integrity check can't be re-run, because each site signs its records with its own secret **verification key**.

To keep leads verifiable after a move, a SyteOps admin can choose **Export Data + Verification Key** instead:

1. Choose a passphrase of at least 12 characters. The key is encrypted with it; the file never contains the key in readable form.
2. Note the **fingerprint** shown when the export finishes.
3. On the new site, choose **Import Data** and pick the file. You'll be asked for the passphrase. A wrong passphrase stops the import before anything is saved, so you can try again. You can also import without the key; the leads then show as imported records that can't be re-verified.
4. Check that the fingerprint in the import message matches the one from step 2.

Imported leads then show **Integrity verified with the source site's key**. Leads the old site had itself imported from a third site can't be re-verified, because the file carries only one site's key; they show as imported records. Visits the new site has already recorded are skipped, and the import message says how many. The new site keeps its own key. It uses the imported key only to *check* the records that import brought in, never to sign new ones.

:::warning
The export file plus its passphrase lets anyone create lead history that verifies as your site's. Never send the passphrase with the file, and delete the file from both sites once the move is done — the export copy stays on the server otherwise. "Verified with the source site's key" means the records are unchanged since they were signed with that key. It is only as trustworthy as the file you imported, so import only files you exported yourself.
:::

## Tracked links

Tracked links give each team member short links such as `/ops/chet-bohley`, `/ops/chet-bohley/my-work` and `/meet/chet-bohley`. A visitor who opens one is sent to the page you chose with one set of campaign tags added, and the click is counted in your lead events. The default **LinkedIn** set creates five links per person: featured (`/ops/<name>`), my work (`/ops/<name>/my-work`, the second Featured card), contact, post and message (`/ops/<name>/msg`, also reachable as `/meet/<name>`), plus the company pair `/ops/company` and `/ops/company/contact`. Its paths, campaigns and tags are stored per site and edited on the **Tracked links** tab; the shipped campaigns are generic (`linkedin_profile`, `linkedin_outreach`).

- **The redirect is temporary and never cached,** so a link can be changed or turned off at any time.
- **A click is counted without identifying the visitor** unless your consent mode is **Opt-out** and the visitor has not sent a "Global Privacy Control" signal. In Opt-in, By location and Full Picture setups, clicks are counted anonymously and the visitor's own consent choice is applied by the page they land on.
- **A new link will not take over an existing page.** A path that matches an existing page, post or category, a WordPress route (such as the login, search or author pages) or a reserved file such as `/wp-admin` or `/sitemap.xml`, is refused. A link wins over a page created later at the same path, so turn the link off if you want the page to show.
- **Link previews and checks are not counted.** A LinkedIn or Slack preview of a link, and a check that only asks for the headers, get the same redirect but are not recorded as clicks.
- **Your own team's clicks are not counted.** A click from [internal traffic](#internal-traffic-your-own-team-and-tools), such as a logged-in editor testing a link, still goes to the page but is not recorded and sets no first-touch cookie.
- **Headless sites** (a separate frontend) do not use tracked links, because WordPress does not serve the public pages there. The Tracked links tab says so at the top when your site is set up that way.
- **Each lead shows its link owner.** When a visitor who arrived through someone's link becomes a lead, by a call click or a form, the lead records that person as its **Link owner**. The owner appears on the lead page, the proof page, the lead emails, the CSV export, the automation webhook (`link_owner`, `link_owner_slot`, `link_kind`, `link_id`) and the Manage API. The person's name is shown, including on the shareable proof page, and it keeps showing after the person leaves the team. The link name (such as `chet-bohley`) is shown only when this site has no record of the person, for example on a lead imported from another site.
- **The owner comes only from a link you created.** It is found by matching the visitor's campaign tags exactly against your links, whether the visitor arrived by the link or with the same tags in the address. Tags that differ in any way (one letter, a missing tag, a different case) credit no one, and two links with the same tags credit no one.
- **Share channels credit the person too.** An article address copied with **Copy link** carries the person's post-link tags with the chosen channel's source and medium (for example Facebook and social). Those tags credit the person as long as that channel is listed on the link set; a source and medium that no channel uses, or a changed campaign or content, credit no one. A link whose own tags match the visitor's exactly always comes first, so channels never take credit away from another link. Removing a channel stops crediting addresses already shared with it.

### Tracked links screen

Open **Leads**, then the **Tracked links** tab. It is open to anyone who can manage Lead Attribution. The tab has two views, **Links** and **Templates**.

**Links**

- **Groups by person.** Each team member has one group, and the links with no owner sit in **Company & team**. Every group starts closed: click a name to open it. The group line shows the person's link count and their clicks and leads for the last 30 days, with a **Copy all** button at the top of the opened group that puts every active link on your clipboard as `Where it goes: address` lines, ready to send to the person. A bar above the groups totals people, active links, clicks and leads for 30 days.
- **Search and set filter.** Type a name, a link name or a path to show only the matching groups, which open while you search; clear the box and they close again. The set filter narrows the rows to one link set; **Copy all** still copies every active link of the person. Neither reloads the page.
- **Generate links for a person.** Choose a team member and a link set, then **Preview**. The preview shows the person's slug (a person who already has one keeps it), every path with the address it sends visitors to, and anything that cannot be created, such as a path that is reserved, taken by a page or category, or already used. Nothing is saved until you press **Create**.
- **One line per link.** Each row shows what the link is for, its short address, a copy button, its clicks (last 30 days and all time) and an **On/Off** switch. Off turns the link off, so it falls through to your site. The **...** menu holds **Edit**, **Add alias** and **Delete**; Delete asks you to confirm on the spot.
- **Old addresses.** The friendly `/meet/` address for messages shows as **Message address** with its own copy button. Addresses a link used before it was moved are folded under **+N old addresses**, where each can be copied or deleted.
- **Tags for article links.** Under each person who has an active post link, **Tags for article links** (one line per link set if there are several) shows the campaign tags to paste after the address of an article, with a copy button. They are taken from the person's own post link exactly as stored, so a visitor arriving with them is credited to that person.
- **Edit.** Change a link's destination (a path on your site), its campaign tags in labeled fields (Source, Medium, Campaign, Content and Term), its fragment, or whether the owner's name is used as the page anchor. A tag the link carries beyond those five is kept.
- **Links without an owner** such as `/meet/ourteam`, and the two company links, are added inside **Company & team** with **Add link** and **Add the company links**.
- **Not trackable from Featured.** Links of the Featured and My work kinds carry this badge. LinkedIn's Featured section does not let a click be traced back, so zero clicks there is not a fault.

**Templates**

- **Link set templates.** Each link set has its own card. Edit the prefix, source and, for each kind, the path after the name (empty for the bare name, `/my-work` for a sub-path, or `-msg` joined to the name), destination, medium, campaign, content pattern and **Label**. The label is the name shown for that kind on this screen, in **Copy all** and on each person's own page; leave it empty to use the built-in wording. Under each kind a preview shows the address and campaign tags it will produce, updating as you type. Changes apply to links generated afterward. A visitor who clicked before a tag edit keeps the old tags, so their later form is not credited to the person. Paths never change on save. A **More** section holds the longer explanation.
- **Save and apply to existing links.** Saves the template and then shows how many existing links would change to the new destination and tags; you confirm before anything is written.
- **Share channels.** Each link set lists where people share article addresses: by default LinkedIn, Facebook, X and Instagram (medium social), Email (email) and Text message (sms). Each channel has a name and the source and medium that replace the post link's own; add, rename or remove channels (up to 12) and save with **Save templates**. The list is what everyone sees under **Copy link** and in the article-tags menus. **Plain address** (no tags) is always offered.
- **Move existing links.** Puts a set's existing links on the paths its template builds, for example from the older `/li/<name>-deals` shape to `/ops/<name>/my-work`. **Check what would move** shows the plan without changing anything; confirming moves each link in place, so it keeps its clicks and leads, and every old address keeps working as an alias. Leads already recorded under the old kind name are renamed to the new one, their campaign tags stay as captured, and a visitor who clicked an old link before the move is still credited to the same person. Each link keeps its own campaign tags: only the tag that names the old kind (such as `chet-bohley_deals`) follows the rename, and the check lists any link whose tags differ from the template, which **Apply to existing links** can change if you want. A site that never edited its templates keeps its own campaigns and destinations through the move. The same move runs from WP-CLI (`move-set` in the `leads tracked-links` group; see the plugin README).

### Metrics for reports

A read-only metrics endpoint is available for reports and dashboards. It gives, for each person and link kind, the clicks, the unique clicks, the leads that came through the person's links and the pages those leads first landed on, for a date range you choose (up to 366 days, in your site's timezone). It never includes a lead's name, email, phone or address, and a landing page is shown only when it is a real page of your site. "Unique" counts visitors the site could identify; clicks counted without identifying the visitor add to the total only. Access needs a SyteOps Admin sign-in (an application password works) or the management key. Zero clicks on Featured and My work links is expected (see above). The developer documentation describes the endpoint and its fields.

### My links (your page)

Each person who has tracked links sees a **My links** section on their own private page. It lists only that person's links, in the order of the link set. The links appear as compact tiles in a three-column grid (two columns on a narrow window, one on a phone). Each tile shows the full address with a Copy button joined to it, a short note on where to put it (the link set's own wording for that kind, which you can edit in the link set templates), the message address for messages, and the clicks and leads from the last 30 days and all time for that exact link. The numbers can be up to five minutes old. If they cannot be read, the page shows a dash rather than a zero. Featured and My work links carry a "Not trackable from Featured" badge with the reason ("LinkedIn replaces the link with the page address") printed under it, so a zero there is expected. A disabled link stays listed with a Disabled tag and its address, but no Copy button. The section shows counts only, never a lead's details, and it does not appear for a person without links. On a headless site it says the links do not redirect there.

At the top of the page, next to Sign out, a **Copy my links** menu copies any one of your active links, the friendly message address, or all of them at once (one line each, with where it goes). Disabled links are never in it. When you share an article, paste the article's address into **Tag an article link** and copy the result. Or copy **Tags for article links** and add them to the end of an address that has no `?` or `#` in it. It works only for addresses on this site and keeps any other parts of the address. Both the menu and the My links card start closed; the card's heading line shows your active link count and your click and lead totals for the last 30 days. **Posting on** lets you pick where you are sharing (LinkedIn, Facebook, email and so on); the tags and the tagged address then carry that channel's source and medium and still credit you.

**Copy link on your live pages and posts.** Every published page and post on your page (Published Content, items waiting on you, items you watch and Content health) has a **Copy link** menu next to it, closed until you open it. Pick a channel and it copies the article's public address with tags that credit you, or pick **Plain address** for the address alone. Drafts, scheduled and private items have no public address, so they have no menu. Without an active post link of your own, only **Plain address** is offered.

### Import existing redirects (Squirrly)

If your short links are Squirrly SEO redirects under `/li/` and `/meet/`, a WP-CLI command copies them into tracked links with the same destination and campaign tags for a plain visit. They are created at their `/li/` paths; run **Move existing links** afterward to put them in the `/ops/` shape, keeping every `/li/` address working. It only reads Squirrly; it never changes or deletes a Squirrly rule. Two things differ from Squirrly: if a visitor's address carries a query key that the link also sets, the link's tag wins (Squirrly appends the visitor's value), and the host the link sends follows your site address.

1. Try it on a staging copy first, once its Squirrly destinations point at the staging address.
2. Run a dry run (the default): the `import-squirrly` command in the `leads tracked-links` WP-CLI group, with `--people=linkedin-people.json` (the full command is in the plugin README). Nothing is written. Each rule is listed with what would happen to it, and the report ends with "Would be covered after --apply (do NOT delete yet)".
3. Run it again with `--apply` to create the links. It reads every link back and exits with an error if anything could not be written or verified. Running it a second time changes nothing and reports "already present".
4. Open every link, with and without the trailing slash, and check where it lands. Also check a response header only a tracked link sends (`Cache-Control: no-store, private`).
5. After an applied run, the report lists the Squirrly rule ids that are covered. Delete only those, yourself. Rules listed as **NOT covered** (a permanent 301, a disabled, regex or post-tied rule, a different host, a path that matches nobody in the people file) stay in Squirrly.
6. If your theme blocks `/li/` and `/meet/` so Squirrly can answer, remove that block only when NOT covered lists none of those paths, then check every link again.

The people file lists each person's name, link name (`slug`), older first-name link names (`aliases`) and the date issued. A first-name link such as `/li/chet-msg` becomes an alias of the full-name link only when it sends exactly the same destination; otherwise it is kept as its own link and flagged. A destination on another host or scheme (www, http, staging) is not covered unless you add `--accept-host`. If Squirrly is not installed, the command says so and does nothing.

## Consent & privacy

Lead Attribution is **consent-aware**. Nothing is recorded, no cookie is set, and no first-touch attribution is stored until the visitor's consent and jurisdiction allow it.

**Global Privacy Control (GPC) is always honored** — a visitor whose browser sends GPC is never tracked, in any region.

If a visitor who is not being tracked (consent withheld, GPC on, or no tracking cookie) fills in the built-in qualification form, their answers are still saved as a lead, but with no tracking attached: no session, no visitor ID, and no source, landing page, referrer or campaign data. Each such submission is its own lead. This applies only to the built-in form; a qualification form that comes from a form plugin is not covered by this change and is handled as before.

How consent is decided depends on your setup:

- **Using WP Full Picture (recommended):** enable the [WP Full Picture integration](./../integrations/wp-full-picture.md#consent-gating-lead-attribution) and SyteOps follows Full Picture's consent choices automatically — a lead is recorded only after the visitor grants **Statistics** consent. That page also has the exact Full Picture settings and how to register SyteOps's cookies.
- **Using another consent tool (or none):** set a **Consent mode** on **Leads → Settings → Consent & privacy**:
  - **Opt-out** (default) — track unless a visitor withholds consent. Grant can be signaled by a consent cookie/value you configure, a JavaScript consent flag your tool sets, or a consent-update event your tool dispatches.
  - **Opt-in** — track only after consent is given (via the cookie/value, flag, or event above).
  - **By location** — treat EU/EEA/UK visitors as opt-in and everyone else as opt-out, based on the visitor's country.

### Cookies this feature sets

Lead Attribution sets three first-party cookies: a **visitor-id cookie** (1 year — a random id with no personal data, linking a visitor's conversions), a **session cookie** (30 minutes — groups conversions within a visit) and a **first-touch cookie** (90 days by default — described below). Register them with your consent tool so its scanner keeps them — an undeclared cookie is often auto-deleted, which breaks attribution. The exact cookie names to register are on the [WP Full Picture integration page](./../integrations/wp-full-picture.md).

Suppressing tracking never breaks a form submission or call the visitor initiated — only the *analytics record* is withheld.

### The first-touch cookie

The first-touch cookie remembers how a visitor first reached your site: the landing page, the referring site, the campaign tags, any ad click id and, when they came through a [tracked link](#tracked-links), which link it was. It keeps only the page address and its campaign and click-id parameters, and only the referring site's address without its parameters, so no name, email, phone number or other parameter is stored. A lead created later, including one that starts with a form, a call click or the Q&A form, gets this whole set as its source.

- **Its source is written once.** A later visit never changes the source, and it is never mixed with a later visit's tags. Only the originating post (below) is updated as the visitor reads. The one exception: a first visit with no campaign tags or click id (typed in, or from a plain link) is replaced, as a whole, by the first visit that has them. It is written again after it expires.
- **It follows your consent rules.** It is never set for a visitor sending Global Privacy Control, or before consent where your mode needs it (Opt-in, By location for EU/EEA/UK visitors, a Full Picture denial, or a consent cookie you configured that is not set). A tracked link sets it at once only in **Opt-out** mode; otherwise the page the visitor lands on sets it after they consent. If the visitor later withdraws consent through your consent tool or Full Picture, the cookie is removed.
- **A consent tool that only sends a browser event** (no consent cookie and no Full Picture) cannot be seen when a tracked link is opened. In **Opt-out** mode the link then sets the cookie before the tool's choice is known. If your tool works that way and you need consent first, use **Opt-in** or set the consent cookie name and value.
- **A form lead from a visitor sending Global Privacy Control** gets no source at all: not from the cookie, and not from the form page.
- **Its lifetime** is the **First-touch cookie lifetime (days)** setting under **Leads → Settings → Consent & privacy**, 90 days by default (1 to 395).
- **An existing lead keeps its source.** The cookie fills in a lead's source only when the lead was created without one.

If another plugin on your site keeps its own first-touch cookie, the two can disagree, for example when that plugin's cookie is older. Lead Attribution uses its own cookie when it creates a lead.

### First landing page and originating post

The first-touch cookie also remembers two pages, and every new lead records them:

- **First landing page:** the first page of your site the visitor landed on, kept with only its campaign and click-id parameters. It is written once and never changes, even when a later visit through a tagged link becomes the lead's source. Where tracking waits for consent (Opt-in, By location for EU/EEA/UK visitors, or a consent tool that has not answered yet), it is the first page after the visitor consented.
- **Originating post:** the last post the visitor read before they converted, for example the article that sent them to your contact form. Each post they read replaces the one before; other pages leave it alone. A form placed on a post counts that post. Private and password-protected posts never count.

Choose which kinds of content count as an originating post under **Leads → Settings → Consent & privacy → Originating post types**. Blog posts are checked by default; check any other public content type (such as pages or a custom type your theme adds) or clear them all to stop recording it.

On a headless site (a separate frontend builds the public pages), each eligible post tells the frontend it counts when the frontend builds that page, so the originating post is recorded there too once the frontend passes it to the lead tracker (see [PhantomStudio](../integrations/phantomstudio.md#originating-post-for-lead-attribution)). Changing **Originating post types** asks the frontend to rebuild.

Both pages follow the same consent rules as the rest of the cookie and are removed with it. They appear in the lead's proof packet, the shareable proof link, lead emails, the CSV export (`first_landing`, `originating_post`) and the automation webhook. A lead created before this feature, or from a visitor whose cookie predates it, has them empty.

### When a visitor has no first-touch cookie

A visitor can send a form without the first-touch cookie: they never allowed tracking, their browser blocks the cookie, or they sent the form on the first page before it was written. **Leads → Settings → Consent & privacy → When the visitor has no attribution cookie** decides what such a form lead gets:

- **Automatic** (the default) follows your consent mode. In **Opt-out** the lead takes the campaign tags of the page the form was sent from; in **Opt-in** it is left blank; **By location** does one or the other per visitor (blank for EU/EEA/UK visitors). With WP Full Picture as your consent tool, the visitor's region decides the same way, and a visitor whose region cannot be told is left blank.
- **Use the form page's own tags** takes them whatever the region, including for visitors your consent mode would treat as opt-in.
- **Leave blank** never does.

Whatever you choose, a visitor who **declined** is never given the form page's tags: one who turned statistics off in WP Full Picture's banner, or, when you set a consent cookie, one whose cookie does not hold the consent value. A consent tool that only signals inside the browser cannot be seen when the form arrives; with such a tool use **Opt-in** or set its consent cookie.

What the form page gives is only what the submission itself says about that page: its address, kept with only its campaign and click-id parameters, the campaign tags and click id read from it, and, when the page is a post of a type you count as an originating post, that post. No referring site and no first landing page are recorded, because the submission does not carry them. Only a page of your own site counts; an address from another site is ignored. A visitor sending Global Privacy Control, or [internal traffic](#internal-traffic-your-own-team-and-tools), never gets this.

Each lead's page shows **Attribution from**: the first-touch cookie, the browser tab, the form page's own tags, a site integration, or none, so you can tell a lead whose source came from the form page apart from one with a full first touch. Leads created before this setting show nothing there.

The same **Attribution from** value is in the CSV export and the automation webhook (`ft_via`) and on the shareable proof page. When a site integration later fills in the campaign of a lead recorded with none, it shows the site integration.

### Internal traffic (your own team and tools)

Visits from your own team, test tools and automation should not count as leads' sources. **Leads → Settings → Internal traffic** lists the signals that mark a visit as internal; any one is enough:

- **Cookie name** and **Cookie value**: a browser holding that cookie.
- **Query parameter**: a visit to any page with that parameter set to the cookie value, for example `?site_internal=1`. It also sets the cookie for 90 days, so the same browser stays internal on later visits without the parameter. Give your team a bookmark with it.
- **Request header** and **Header value**: for scripts and test tools that can add a header to every request.
- **User agents containing**: one per line, for example `HeadlessChrome` or `Playwright` (at least 3 characters, any case).
- **Logged-in users who can**: logged-in users with this capability. The default, `edit_posts`, covers contributors, authors, editors and administrators; customers and subscribers are still tracked. Choose **Nobody** to turn it off.

If your site already has an editorial internal-traffic parameter in the review settings (the one added to links sent to reviewers), it is used here too while **Cookie name** and **Query parameter** are blank, and the card says which one.

Internal traffic is never tracked or attributed: no cookie is set, no events are recorded, tracked-link clicks still redirect but are not counted, and no form fields are filled. **Form submissions from internal traffic** decides what a form or qualification your team sends does:

- **Record the lead without attribution** (the default): it is recorded as a lead with no source and no link to any earlier visit, so a test submission still shows up.
- **Don't record a lead**: no lead is made. The form itself still saves its entry and sends its own notification emails as usual.

This works on cached pages too: the page itself checks the cookie, the query parameter and the user agent, and the server checks every signal again when a form, a click or an event arrives. A headless frontend gets the cookie, parameter and user-agent settings with its site settings and is rebuilt when they change.

**What changes when you update:** the **Logged-in users who can** signal is on for every site, set to `edit_posts`. From this version, a logged-in team member's clicks and visits are no longer counted, and a form they send records a lead with no source. The other signals do nothing until you fill them in.

The internal-traffic cookie (only when you set a cookie name) is an operational cookie: it stops tracking and carries no identifier. You can list it in your cookie policy as necessary.

## WP Full Picture

If you use [WP Full Picture](./../integrations/wp-full-picture.md) for analytics, turn on the mirror option and SyteOps will also record each conversion as a WP Full Picture event, so your existing dashboards stay in sync. It's entirely optional — Lead Attribution works on its own. (Full Picture is also the recommended **consent** authority — see [Consent & privacy](#consent--privacy) above.)

## Troubleshooting

- **Leads not captured** — check that the goal (phone, reveal, or form) is toggled on, that the CSS selector matches the actual element on the page, and that consent mode isn't set to opt-in without a consent signal being present.
- **Webhook not received** — verify the URL is entered correctly and the webhook toggle is on. Webhooks are sent in the background (fire-and-forget), so a failed delivery won't show as an error on the lead record — check your receiving tool's logs.
- **Integrity check failed** — the record was altered after it was captured, or it was imported from another site. Records imported from a different site can be re-verified only if they were exported with the verification key (see [Moving leads to another site](#moving-leads-to-another-site)); otherwise the proof packet says they were imported and can't be re-verified here. If the proof packet adds that two events were recorded at the same instant, nothing was altered: an older version could save two simultaneous events against the same earlier one. Each event is still intact, and current versions always put simultaneous events in order.
- **Pop-up not showing** — its trigger conditions (delay, scroll depth, or exit intent) haven't been met yet, or lead qualification is turned off in settings.
