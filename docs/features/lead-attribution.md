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

What it **cannot** do, by design, is track a call placed by someone who reads your number off the screen and dials from a different phone — no website tool can see that without a special tracking phone number, which this feature deliberately avoids. To help bridge that gap, every lead gets a short **reference code** (e.g. `WEB-7K2QF`) you can ask callers to mention.

## Turn it on

Lead Attribution ships with SyteOps as a built-in module. Enable it from **SyteOps → Modules**, then open the new **Leads** menu item.

## Set up your goals

On the **Leads → Settings** tab, choose which actions to capture:

- **Phone (tel:) link clicks** — on by default. Fires whenever a visitor taps or clicks any `tel:` link on your site, capturing their source and the page they were on.
- **"Reveal number" clicks** — turn this on and enter the CSS selector of your reveal button (e.g. `.reveal-phone`). Useful when your site shows a button like "Show phone number" instead of a raw `tel:` link. See the [CSS selector cookbook](#css-selector-cookbook) below for help finding the right selector. Leave **Only count reveal clicks on desktop** on (the default) to ignore taps on phones, where the number is already tap-to-call.
- **Form submissions** — pick your form plugin (or "auto"), or enter a specific CSS selector to target one particular form (e.g. `#gform_1` or `.wpcf7-form`). Auto-detection covers Fluent Forms, Gravity Forms, Contact Form 7, and WPForms.

### Consent

Choose between two modes to match your privacy requirements:

- **Opt-out** (default) — tracking runs for all visitors unless they actively withdraw consent. Works well if your analytics consent banner already covers tracking.
- **Opt-in** — tracking only starts after a visitor grants consent. Use this if you need explicit permission before recording any data.

### Email reports

Stay informed without watching a dashboard:

- **Per-lead emails** — get an email the moment a new lead is captured. You can set a short digest window (e.g. 15 minutes) so that several leads arriving in quick succession are bundled into one message.
- **Scheduled summaries** — choose daily, weekly, or monthly digests for a periodic overview of lead volume and sources. Pick the send hour, and (for weekly/monthly) the day it goes out.

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

- **Masked** (recommended) — stores only non-identifying hints (initials, a partial email, the last four digits of each phone — mobile and office alike). The message isn't stored.
- **Full** — stores the exact name, email, phone, office phone, and message. Choose this only where your privacy policy allows.
- **Off** — stores no contact identity or message at all.

Whichever you choose, contact details are **never** written to the tamper-evident activity log behind each lead — only to the editable lead record, so they remain easy to remove for data-erasure requests.

### Map any form field (custom fields)

Beyond Name, Email, Phone, Office phone and Message, you can map **any** of a form's fields to a **custom field** on the lead. In a mapping's **Custom fields** section, click **+ Add custom field**, type a name (e.g. "Budget" or "Company"), and pick the form field it comes from. Tick **Sensitive** for anything that shouldn't be stored in the clear — a sensitive field is masked under **Masked** storage and dropped under **Off**, while ordinary business fields like "Budget" are kept as-is.

Custom fields appear on the lead, in the CSV export, in lead emails, and in the outgoing webhook (under a `custom` object). You don't need to map UTM or campaign fields — those are captured automatically and already sent.

### Pull data from RingTonic into the lead

When the RingTonic integration is on, SyteOps can bring the CRM's contact data onto the lead. It works as an **overlay**: the lead keeps the details it originally captured, and RingTonic's **extra** fields (custom fields, tags, stage) plus anything RingTonic has that **differs** are added alongside — nothing you already have is stored twice or overwritten. This happens automatically the first time a lead syncs with RingTonic, and you can pull the latest anytime with the **Refresh from RingTonic** button on the lead. RingTonic data rides the outgoing webhook under a `ringtonic` object.

### Fill in leads you already have (Backfill)

Mapping only copies details onto leads captured **after** you set it up. If you added or changed a mapping later — or just turned on the new office phone field — your earlier leads won't have those details yet. The **Backfill existing Leads from saved mappings** button (on the same card) fixes that in one click.

1. Set up and **Save** your mappings first.
2. Click **Backfill existing Leads from saved mappings** and watch the running count.

It reads each mapped form's **stored submissions**, matches each one to an existing lead by contact identity (email, then phone — using the same privacy setting as above), and fills in any contact details that are still blank. It **never overwrites** anything already on a lead, and it never creates new leads. If a stored submission could match more than one lead, it's skipped rather than guessed. Contact Form 7 and WPForms Lite don't keep stored submissions, so mappings for those are skipped and reported at the end.

Under **Masked** storage the lead only holds a partial email/phone, so matching is approximate: the backfill guards against obvious mismatches (it skips when a lead's other stored detail contradicts the submission), but for the most precise matching, run the backfill while **Full** storage is selected.

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
- **Block:** search for **Lead Form** in the Gutenberg block inserter and drop it where you want the form to appear.
- **Pop-up:** configure the pop-up options in the qualification settings — choose a trigger (time delay, scroll percentage, or exit intent) and optionally set a title for the pop-up overlay. The pop-up appears automatically without any shortcode or block.

## The dashboard

**Leads → Dashboard** shows your totals (all-time, last 7 and 30 days) and your most recent leads. Each row shows the lead's **name**, **how it was received** (form, phone tap, reveal-number click, or call), **email**, **phone**, and **office phone**, plus a **status** you can set right from the list.

**Lead status** is a simple pipeline: **New → Contacted → Qualified → Unqualified → Customer**. Pick a status from the drop-down on any row and it saves instantly. (This is separate from the optional *scoring tiers* — Hot/Warm/Cold — which come from your qualification questions.)

**Row actions:**

- **Send to webhook** — push that single lead to your automation webhook on demand (in addition to the automatic send for new leads).
- **Delete** — remove the lead. If RingTonic sync is on, its RingTonic contact is moved to **Lost** (RingTonic keeps its own record — it has no delete).

**Export CSV** downloads your leads — now including name, how received, email, phone, office phone, and status alongside the attribution columns.

Click a lead's name to open its **proof packet**.

## Proof packets and shareable links

Each lead's proof packet shows its full story: the source, campaign, landing page, and a timeline of every event — with an **integrity check** that confirms the record hasn't been altered since it was captured.

Need to show a client the evidence without giving them admin access? Use the **shareable proof link** — a read-only web page for that single lead. You can regenerate the link at any time to revoke the old one.

## Consent & privacy

Lead Attribution is **consent-aware**. Nothing is recorded, no cookie is set, and no first-touch attribution is stored until the visitor's consent and jurisdiction allow it.

**Global Privacy Control (GPC) is always honored** — a visitor whose browser sends GPC is never tracked, in any region.

How consent is decided depends on your setup:

- **Using WP Full Picture (recommended):** enable the [WP Full Picture integration](./../integrations/wp-full-picture.md#consent-gating-lead-attribution) and SyteOps follows Full Picture's consent choices automatically — a lead is recorded only after the visitor grants **Statistics** consent. That page also has the exact Full Picture settings and how to register SyteOps's cookies.
- **Using another consent tool (or none):** set a **Consent mode** on **Leads → Settings → Consent & privacy**:
  - **Opt-out** (default) — track unless a visitor withholds consent. Grant can be signaled by a consent cookie/value you configure, a JavaScript consent flag your tool sets, or a consent-update event your tool dispatches.
  - **Opt-in** — track only after consent is given (via the cookie/value, flag, or event above).
  - **By location** — treat EU/EEA/UK visitors as opt-in and everyone else as opt-out, based on the visitor's country.

### Cookies this feature sets

Lead Attribution sets two first-party cookies: a **visitor-id cookie** (1 year — a random id with no personal data, linking a visitor's conversions) and a **session cookie** (30 minutes — groups conversions within a visit). Register them with your consent tool so its scanner keeps them — an undeclared cookie is often auto-deleted, which breaks attribution. The exact cookie names to register are on the [WP Full Picture integration page](./../integrations/wp-full-picture.md).

Suppressing tracking never breaks a form submission or call the visitor initiated — only the *analytics record* is withheld.

## WP Full Picture

If you use [WP Full Picture](./../integrations/wp-full-picture.md) for analytics, turn on the mirror option and SyteOps will also record each conversion as a WP Full Picture event, so your existing dashboards stay in sync. It's entirely optional — Lead Attribution works on its own. (Full Picture is also the recommended **consent** authority — see [Consent & privacy](#consent--privacy) above.)

## Troubleshooting

- **Leads not captured** — check that the goal (phone, reveal, or form) is toggled on, that the CSS selector matches the actual element on the page, and that consent mode isn't set to opt-in without a consent signal being present.
- **Webhook not received** — verify the URL is entered correctly and the webhook toggle is on. Webhooks are sent in the background (fire-and-forget), so a failed delivery won't show as an error on the lead record — check your receiving tool's logs.
- **Integrity check failed** — the record was altered after it was captured, or it was imported from another site. Records imported from a different site can't be re-verified because the cryptographic proof was generated with that site's keys.
- **Pop-up not showing** — its trigger conditions (delay, scroll depth, or exit intent) haven't been met yet, or lead qualification is turned off in settings.
