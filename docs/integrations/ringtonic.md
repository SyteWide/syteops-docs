---
sidebar_position: 8
title: RingTonic Integration
description: Create RingTonic contacts from your form submissions, push a lead's pipeline status to RingTonic, and receive calls, qualified leads and stage changes back — automatically, in both directions.
---

# RingTonic Integration

**Tier: Extended** — Stores your RingTonic credentials and adds a settings card to the Leads screen. Once it's on, changing a lead's status in SyteOps updates the matching contact in RingTonic, and RingTonic can notify SyteOps back — calls, qualified leads and stage changes all land in your Leads list automatically.

[RingTonic](https://ringtonic.app) is an AI call-tracking and attribution tool with a lightweight built-in CRM, built on Twilio. The connection works in two directions:

- **SyteOps → RingTonic:** move a lead from **Contacted** to **Qualified** in your SyteOps Leads list and RingTonic hears about it shortly after (via a background task).
- **Form submissions → RingTonic contacts:** switch it on per form and every submission becomes a RingTonic contact with a "form submitted" conversion — see [Create contacts from form submissions](#create-contacts-from-form-submissions).
- **RingTonic → SyteOps ("Live notifications"):** once your hub operator sets up RingTonic's webhook for you, a completed or missed call, a qualified lead, or a stage change made *inside* RingTonic shows up in your Leads list within moments — no more relying only on the outbound push above.

A closed deal's **value** travels the same way, in both directions — see [Deal value](#deal-value) below.

## Requirements

- SyteOps installed and activated, with **Lead Attribution** turned on (see [Lead Attribution](../features/lead-attribution)).
- A RingTonic account on the **Agency plan** — API access is an Agency-plan feature, so this integration will not connect on lower plans.
- Your RingTonic **Agency API key** (from your RingTonic account), for the outbound status push.
- For live notifications: your hub operator sets up the RingTonic webhook and gives you nothing to do — SyteOps just starts receiving deliveries once its own signing secret is in place (see below).

## Setup

### 1. Turn it on

Go to the **Integrations** tab in SyteOps, toggle **RingTonic** ON, and save. Once it's on, the RingTonic tile shows a **Set API key in Leads** link that jumps straight to the key field described in the next step.

### 2. Add your Agency API key

Open **Leads → Settings** and find the **RingTonic** card (it only appears once the integration is turned on). Paste your RingTonic **Agency API key** into it and save. The key is stored securely (encrypted) and is never shown back to you in full.

:::note For advanced users
Instead of pasting the key into the settings card, you can define it in your site's `wp-config.php` as the constant `SYTEOPS_LEADS_RINGTONIC_API_KEY`. When that constant is present it takes precedence, which is handy for keeping the key out of the database on managed or version-controlled environments.
:::

### 3. See the outbound push work

In your **Leads** list, change any lead's pipeline status. SyteOps queues the update and pushes it to the matching contact's stage in RingTonic via a background task (WP-cron) shortly after — usually within a minute or two, not instantly.

### 4. Live notifications (set up by your hub operator)

This half is normally set up for you, not by you — your hub operator creates the RingTonic endpoint and pushes its signing secret into the same **RingTonic** card in Leads → Settings, under **Live notifications**. Once it's configured, that line shows a fingerprint of the secret (never the value itself) plus the most recent event received, so you can confirm it's live at a glance. If you ever need to paste the secret yourself, the field works the same way as the API key above: paste, save, and it's stored encrypted; a wp-config constant (`SYTEOPS_LEADS_RINGTONIC_WEBHOOK_SECRET`) can override it the same way `SYTEOPS_LEADS_RINGTONIC_API_KEY` does.

### 5. Click-to-call: the calls key and caller ID (set up by your hub operator)

Calling a lead back from SyteOps uses a **second, separate RingTonic key**, minted with the **calls:place**, **call-logs:read** and **tracking-numbers read** permissions. Your Agency API key above keeps doing the CRM sync; the two are never swapped, so the permission that places calls never sits on the key every form submission uses. Your hub operator normally adds it for you. To add it yourself, open the **Click-to-call** part of the RingTonic card, paste the whole key (including the number and bar before `rt_`), and save. A wp-config constant (`SYTEOPS_LEADS_RINGTONIC_CALLS_API_KEY`) can override it the same way.

Once a key is set, the card shows its RingTonic key number and a fingerprint (never the key itself), and SyteOps checks with RingTonic, within a few minutes, what the key can do: whether it can read call logs and tracking numbers. Use **Check now** to check again at any time. Placing calls can only be confirmed by a real call, so the card never tests it.

Then set the **Caller ID number**: the RingTonic tracking number that both your team member and the lead see when a call is placed. The card warns you if the number is not one of your RingTonic tracking numbers, or if RingTonic has calls turned off for it.

:::warning Verify the caller ID before calls go live
Phone carriers refuse calls from a number whose caller ID is not verified, and RingTonic then reports the call as busy. In Twilio, the number needs **all four** of these: a **Trust Hub Business Profile**, the **SHAKEN/STIR Trust Product** with the number assigned (attestation A), **Voice Integrity** and **CNAM**. SyteOps cannot check these for you, so the card shows this reminder while a caller ID is set.
:::

With the key, live notifications (step 4) and a verified caller ID in place, people with **Call** access get a **Call** button on the Callbacks list (see [Call a lead back](../features/callbacks#call-a-lead-back)). Each person's calls ring the RingTonic member set on their card (see [RingTonic member email](../features/callbacks#ringtonic-member-email)).

**Call limits.** Under **Call limits** in the same card: **Calls per person per day** (default 20), **Calls per site per day** (default 60), **Calls per minute (whole site)** (default 8, at most 10, RingTonic's own limit), **Calls per lead per hour** (default 3) and **Calls per lead per day** (default 10), which count every caller, and **Minutes a call locks its callback** (default 15: while someone is calling a lead, everyone else's buttons on it are locked until the call ends, the caller releases it, or this many minutes pass). A call over a limit is refused and nothing is sent. The daily limits reset at midnight in your site's time zone.

## What syncs, and in which direction

### From SyteOps to RingTonic (via WP-cron, shortly after the change)

When you change a lead's status in SyteOps — **New**, **Contacted**, **Qualified**, **Unqualified**, or **Customer** — the matching RingTonic contact's stage is updated in the background a short time later. Repeated changes to the same lead in quick succession are collapsed into a single push of the final status.

There's one nuance when you move a lead **backward** — for example from **Customer** back to **Contacted**, or when you re-engage a lead that RingTonic currently shows as **Unqualified** or **Lost** (see [Deleting a lead](#deleting-a-lead)) by moving it to any other status. RingTonic only accepts a move like this if your API key is allowed to force stage changes; SyteOps asks for exactly that only when the move is a genuine regression from what it last knew RingTonic to hold. If your key isn't permitted to force stage changes, your change still saves in SyteOps as normal, but RingTonic keeps its earlier stage. A forward move (moving a lead further along, including out of Unqualified/Lost) is sent as a plain update and never needs forcing — but like any request, RingTonic can still decline it for an unrelated reason (a plan or permission issue); SyteOps never retries a declined request as a forced move, so a genuinely-declined forward change stays exactly where RingTonic left it rather than being pushed through by force.

SyteOps also recognizes when RingTonic has simply gotten **ahead** of it — for example, another tool recorded a RingTonic-side milestone that puts the contact further along than SyteOps' own last-known stage, or moved it since SyteOps' last successful sync. When that happens, SyteOps does not fight it: it logs the reason and leaves RingTonic's stage alone rather than forcing a regression.

When someone edits a lead's contact in the portal's Callbacks panel (name, company, email, office phone or note; see [Edit a contact](../features/callbacks#edit-a-contact)), the RingTonic contact is updated the same way, in the background a moment later. The update is matched on the lead's phone number, which never changes. Only fields someone on your team has edited on the site are sent (never details the site merely captured), and a field someone cleared is never blanked in RingTonic. If the email someone typed belongs to a different RingTonic contact, that contact is never changed: the phone's contact is updated without the email and the lead is flagged for a merge. If the phone and the email are on two different RingTonic contacts, the phone's contact is updated and the lead is flagged for a merge. RingTonic contacts have no office phone or note fields: to send those, enter the names of custom fields you created in RingTonic under **RingTonic custom field names** (**Office phone (from a contact edit)** and **Contact note (from a contact edit)**); they are off by default.

When the Callbacks panel opens a lead, SyteOps also reads that contact from RingTonic with your site's key, so the panel can show **From RingTonic** and the edit form starts from RingTonic's current values. The read is kept for five minutes. Right after a save, the panel says RingTonic is being updated until the change has been sent. If the key isn't allowed to read contacts, the panel says "RingTonic details unavailable" and everything else still works.

A forced backward move is also verified, not assumed: if your API key isn't permitted to force stage changes, RingTonic may answer with an explicit permission error, or it may accept the request without actually applying it. SyteOps treats either outcome as a no-op and logs it, rather than recording the change as synced when it never actually happened.

:::note Log lines require Debug Mode
Every "logs it" mentioned on this page means a structured log entry in the [Debug Tool](../features/debug-tool) — visible only once **Debug Mode** is turned on in the Admin tab. With Debug Mode off, RingTonic sync still works exactly the same; you simply won't see the log lines described here.
:::

### From RingTonic to SyteOps (live notifications)

Once your hub operator has set up the connection (see [Live notifications](#4-live-notifications-set-up-by-your-hub-operator) above), RingTonic notifies SyteOps the moment one of these happens:

| In RingTonic | In your SyteOps Leads list |
|---|---|
| An **inbound** call completes or is missed | A new lead appears (or an existing one is updated), carrying the caller's number, when the call started, whether it was a first-time caller, and — when RingTonic has it — the visit that led to the call (landing page, referrer, click ids, medium). An **outbound** call (someone on your team calling a lead back) never creates a lead: it is recorded on that caller's callback instead (see [Callbacks](../features/callbacks#calls-back-to-the-caller)). RingTonic's own "send test" delivery is acknowledged and changes nothing. |
| RingTonic marks a call qualified | The **specific lead that call belongs to** moves to **Qualified** — but only moving *forward* (from New or Contacted). A lead already Qualified, Customer, or Unqualified never moves backward because of this. |
| A contact's stage changes | Every lead bound to that contact has its status moved along too, where RingTonic's stage has a SyteOps equivalent. A stage RingTonic tracks that SyteOps doesn't have a status for (there are more RingTonic stages than SyteOps ones) is still recorded on the lead for reference and as the baseline the outbound sync compares against — it just doesn't change the status shown in your list. |
| A form is submitted | If SyteOps already has a lead for that same RingTonic contact, RingTonic's form record is linked to it. **RingTonic form submissions never create a new lead** — your own site's forms already do that, and this would just duplicate it. |

Each of these also records the call detail RingTonic already has — duration, how the call ended, the tracking number's name, the caller's city and state and the tags — and, if you switch it on, RingTonic's AI summary of the conversation. See [What lands on the lead](#what-lands-on-the-lead) for the full list and how each field is written.

A delivery whose type SyteOps doesn't yet recognize is simply acknowledged and ignored, never treated as an error — RingTonic adds new capabilities over time, and an unrecognized one should never look like something is broken. A **transcription** notification for an inbound call is the one exception SyteOps acts on selectively: with the call summary switched on it takes the AI summary from it and discards the transcript itself; with the summary off it changes nothing.

:::note Matching an inbound call to an existing lead
A completed or missed call is matched by the call's OWN identity in RingTonic (its call id), not by the contact — a lead qualified for that call is looked up the same way, so qualifying one call for a repeat caller only ever affects that one call's lead, never an earlier one from the same person. A stage change or a form submission, by contrast, IS a contact-level fact — see [How inbound deliveries are matched](#how-inbound-deliveries-are-matched) below.
:::

## Create contacts from form submissions

Each Fluent Forms form you choose can create (or update) a contact in RingTonic when it is submitted, and record a **form submitted** conversion for it, so the lead counts in RingTonic's funnel.

### Turn it on

In **Leads → Settings**, open the **RingTonic** card and find **Create contacts in RingTonic**:

1. Tick **Create contacts in RingTonic when "…" is submitted** for each form you want.
2. Check the fields SyteOps reads from that form: **Name**, **Email**, **Phone**, a **Second phone** used when the first is empty, **Message**, and the optional **How they heard about you** answer with its **"Other" detail**. A form you have not set up before shows its likely fields already selected.
3. Check the **RingTonic custom field names**: the name of the custom field in your RingTonic workspace that receives each value (first and last name, message, how they heard, the contact source, the form page, and the campaign details: campaign landing page, first landing page, originating post, UTM tags, click ids and referrer). Leave a name empty to not send that value. A name your workspace has not registered is dropped by RingTonic and the rest of the contact is still saved, so register a custom field in RingTonic for each value you want to keep.
4. Save.

The contact is sent right after your visitor's page has been answered, so they never wait for RingTonic, and a RingTonic outage never affects your form. A background task makes sure it still goes out if that first attempt is interrupted. If RingTonic is busy or briefly down, the send is tried again after 5, 30 and 120 minutes before it is recorded as failed.

The card shows how those first attempts fared: **In-request sends: N finished, M cut off (last 30 days)**. A cut-off attempt is one the web server stopped after answering the visitor; its contact still arrives a few minutes later from the background task. On a **LiteSpeed** server the card also offers **Let the contact push finish after the visitor's page responds (adds a LiteSpeed rule to .htaccess)**: it adds a short rule to your site's `.htaccess`, for form submissions only, that lets the first attempt finish. Turning it off removes the rule, and so does switching the Leads module off or deleting the plugin. If your `.htaccess` cannot be written, the setting stays off and the card shows the exact lines to paste at the top of the file yourself. On OpenLiteSpeed the server must be restarted once after the rule is added or removed.

### What RingTonic receives

- **The contact:** the name ("First Last" when the form has a first and last name), the email, and the phone in international format (`+1` for US numbers; a number that cannot be read confidently is left out). A submission with neither an email nor a phone is not sent. Empty values are never sent, so a contact RingTonic already has never loses a good value.
- **Custom fields:** first and last name, the message, how they heard ("Other: …" when the visitor typed their own answer), and the lead's campaign details. By default:
  - `landing_page_url` is the **form page**: the page the form was submitted from, without anything after `?` in its address, the same page Fluent Forms' notification emails show for a form with a landing page field. It is sent even when the lead has no campaign details. (The **Landing page** row in SyteOps's own lead emails and lead details is the campaign landing page.)
  - `campaign_landing_page_url` is the **campaign landing page**: the page the lead first arrived on, with its campaign tags.
  - `first_landing_page_url` is the first page the visitor ever landed on, as before.
  - `contact_source` is `form` on every contact SyteOps creates. RingTonic does not let a website set a contact's own source, so this field carries it. A contact RingTonic already had gets it only when the field is empty and RingTonic has not given the contact another source: a contact a phone call created is never marked as a form contact. RingTonic does not report the source of a contact it already had, so SyteOps cannot tell, and leaves those contacts unmarked; the card says how many submissions that was in the last 30 days. Contacts RingTonic's own page script created already show the source form.
  - Contacts created before this version keep the campaign landing page in `landing_page_url`; existing values are never overwritten.
- **A "form submitted" conversion** for the contact.

If RingTonic already has the contact (for example from its own website tracker, or a returning visitor), SyteOps adds to that contact instead of creating a second one, but **only fills the custom fields the contact does not have yet**. RingTonic recognizes a contact by the phone or email typed into the form, so a visitor typing someone else's number must never be able to rewrite that person's name, message or campaign details. Existing values are kept; the submission still appears as a new "form submitted" conversion, and the full message is always on the lead in SyteOps. If RingTonic does not let SyteOps read the contact's current values, none of them are changed.

**When the phone and the email belong to two different RingTonic contacts**, RingTonic will not put them on one contact by itself. SyteOps then updates the contact that has the **phone** (filling only the custom fields it does not have yet, as above), records the conversion on that contact, and flags the lead: **RingTonic: this person's phone and email are on two different contacts. Merge them in RingTonic.** The flag shows on the lead's **From RingTonic** card, with the two RingTonic contact numbers, and on the person's row in the portal **Callbacks** card. Once you have merged the two contacts in RingTonic, open the lead and click **Merged** to clear it.

A form set to **delete entries after submission** cannot be used here (SyteOps has nothing to send from); its row on the card says so, and a site that sends contacts another way keeps sending that form's.

A form that holds its entries until something else happens creates the contact when that happens, not at submission: with **double opt-in** when the visitor confirms, with **admin approval** when an admin approves, and with a **payment** that completes on the payment provider's page when the payment comes back. The contact carries the campaign details the visitor had **when they submitted**, so the person who approves is never mistaken for the visitor, and a submission your own team made stays internal traffic. An entry submitted before this version is sent without campaign details.

### Privacy

- Campaign details are sent only when the lead itself has them, exactly as recorded on the lead — the same consent rules as everywhere in Lead Attribution apply.
- Under **Global Privacy Control**, or when the visitor refused consent in your cookie banner, the contact is still created (the visitor asked to be contacted), but **without any campaign details and without the form page**. The contact source is still sent.
- **Internal traffic** (your staff, test tools and automation, as your Internal traffic settings recognize them) creates no RingTonic contact by default. Choose **Create the contact without campaign details** under **RingTonic contacts for internal traffic** to send them anyway (without the form page too). When internal submissions record no lead at all, no contact is created either way.

### One submission, one contact

Each submission carries a **Submission id** (by default `{site}-ff{form}-{entry}`: your site's address, the form id and the entry id). RingTonic uses it to recognize a repeat of the same submission, so a retry never creates a second contact or a second conversion. If your site already sends contacts to RingTonic some other way, set that same pattern here **in the same save that switches the form on**, then turn the other one off for the forms SyteOps now handles (a site developer can have it check whether SyteOps already handles a form). While both run, only the same pattern lets RingTonic count each submission once; with different patterns the conversion is recorded twice.

When such a site push checks with SyteOps before it sends, the card shows it on each form that is switched on: **A site push on this site checked in 5 minutes ago and stood down** (SyteOps sends that form's contacts) or **… and kept sending**. While a site push has checked in and the Submission id is still the default pattern, the card warns: **Set the Submission id to the pattern your site push uses, or each lead may count twice.** If no site push has ever checked in, a short note says so; that is fine when your site has none.

### Where to see the result

Open the lead: the **From RingTonic** card shows **Contact created from the form**, one line per submission, with the outcome — queued (and, while retrying, the last failure), sent, sent without campaign details, not sent (and why), or failed with RingTonic's answer — and whether the conversion was recorded. Only a busy or unreachable RingTonic is retried; any other refusal is shown once so you can fix it (for example an API key without the contacts permission). Entries the form plugin marks as spam record no lead and are not sent; entries moved to the trash are not sent.

## Deal value

A closed deal carries a **value**, and it travels both ways. Amounts are always whole cents on the wire (RingTonic's own convention), but the Leads screen always shows and accepts ordinary currency units — for example you type `1234.56` and SyteOps stores and sends `123456`.

**Setting a value in SyteOps sends it to RingTonic.** Type a value into the **Deal value** column on any row in your Leads list and it saves instantly, the same way the status drop-down does. The next time that lead's status is pushed to RingTonic — whether you just changed it, or it already synced earlier — the value rides along on the same request, **as long as the lead's currency matches your Default deal currency setting below** — RingTonic has no currency field of its own on this value, so it always stores the amount in your workspace's own currency, and a mismatched amount is skipped (never sent) rather than silently misrepresenting it. If a lead has no value recorded, SyteOps never sends the field at all, so it can never blank out a value you (or someone else) already set directly in RingTonic.

**Clearing the field removes the value in SyteOps only.** Empty the **Deal value** input and save (tab or click away) to clear it — this deletes the value here but is never sent to RingTonic; the value it already has stays exactly as it is.

**A deal closed in RingTonic fills in the value here.** When RingTonic reports a contact's stage change and that delivery carries a monetary value, SyteOps records it on the matching lead(s) — but only if that lead doesn't already have a value of its own, and a reported value of exactly zero is treated the same as no value at all (RingTonic's own "nothing recorded yet" signal, not a genuine $0.00 deal). A value you've already set in SyteOps is never overwritten by an inbound echo.

Your Leads settings have a **Default deal currency** (three-letter code, e.g. `USD`, `EUR`, `GBP` — defaults to `USD`) used whenever a value is recorded without one of its own, such as one you type into the Leads list. For a handful of currencies that don't use decimal subdivisions — Japanese Yen (`JPY`), South Korean Won (`KRW`), Vietnamese Dong (`VND`), Chilean Peso (`CLP`), and Icelandic Króna (`ISK`) — the Deal value field shows and accepts a whole number with no decimal point, since there's no smaller unit to divide into.

The value and its currency appear on the lead's detail screen, in the CSV export (`deal_value_cents`, `deal_currency`), and in the automation webhook payload (see [Send leads to your tools](../features/lead-attribution#send-leads-to-your-tools-webhooks)).

:::note A separate field: the raw number RingTonic reports when qualifying a call
The **Deal value** row under [What lands on the lead](#what-lands-on-the-lead) below is a DIFFERENT thing — a plain number RingTonic may attach when it marks a call qualified, recorded once for reference and never sent anywhere. The bidirectional value described here — the one shown as your lead's own **Deal value**, sent to RingTonic with the status, and filled in from a RingTonic stage change — is tracked separately.
:::

## What lands on the lead

A live notification does more than create or match the lead: it records what RingTonic already knows about the call, so a call lead is reviewable in SyteOps without opening RingTonic. Everything below shows up on the lead's detail screen under **From RingTonic**, in the lead notification email, in the CSV export, and in the `ringtonic` object on the outgoing [automation webhook](../features/lead-attribution#automation-webhook-every-new-lead).

| On the lead | Arrives with | Written |
|---|---|---|
| **Call duration** — how long the call lasted, in seconds | A completed or missed call | Once |
| **Call status** — RingTonic's own word for how the call ended (`completed`, `missed`, `busy`, `no-answer`, `failed`, or anything else RingTonic adds later), recorded exactly as sent | A completed or missed call | Once |
| **Tracking number name** — the label on the RingTonic number that answered | A completed or missed call | Once |
| **Caller city** and **Caller state** — where RingTonic placed the caller | A completed or missed call | Once |
| **Call tags** — the tags RingTonic put on the call | A completed or missed call, or a qualified lead | Once |
| **Call summary** — RingTonic's AI summary of the conversation. **Only when you turn it on** — see [Turning the call summary on](#turning-the-call-summary-on) | A qualified lead, or a transcription notification | Replaced by a newer summary — see below |
| **Summarized at** — when RingTonic produced that summary. **Only when the summary is turned on** | A qualified lead, or a transcription notification | Alongside the summary |
| **Call outcome** — RingTonic's verdict on the call (`qualified`, `not_qualified`, `pending`, `junk`, or whatever RingTonic sends) | A qualified lead | Once |
| **Qualification reason** — why RingTonic reached that verdict. **Only when the call summary is turned on** — it is free text from the same conversation | A qualified lead | Once |
| **Qualification confidence** — how sure RingTonic is, as a number | A qualified lead | Once |
| **Deal value** — the value RingTonic attached to the opportunity | A qualified lead | Once |
| **Qualified at** — when RingTonic qualified the call | A qualified lead | Once |

### "Written once" means the first delivery wins

Every field above except the call summary is **fill-only**: the first notification that carries it sets it, and a later notification never rewrites it. Your SyteOps lead is the record of what was true when the call came in; RingTonic remains the live, last-write CRM. If the two ever disagree, that is by design, not a fault.

### Turning the call summary on

The AI call summary and the qualification reason are **off by default**. They are the only fields here that record what was actually *said* on the call, so storing them is a choice you make rather than something a plugin update starts doing for you.

To turn them on, tick **Store RingTonic's AI call summary on the lead** on the **RingTonic** card in **Leads → Settings**. Everything else in the table above — duration, call status, tracking number name, caller city and state, tags, the outcome, confidence, deal value and the dates — is recorded regardless of this setting.

With it off, a transcription notification for an inbound call is acknowledged and changes nothing.

### The call summary is the one field that can be replaced

RingTonic re-summarizes a call — you commonly get one summary with the qualified-lead notification and a better one a little later, once the transcription finishes. So the summary follows a **newer-wins** rule instead:

- Nothing stored yet → the summary is stored.
- A newer **Summarized at** than the one on the lead → the summary is replaced.
- The same **Summarized at**, or an older one → the stored summary is kept. A repeated delivery can never undo a better summary.
- A summary that arrives with **no Summarized at** at all → stored only if the lead has none yet. Without a timestamp there is no way to tell whether it is newer, so it is never allowed to overwrite.

### The summary follows your lead privacy setting

Once you have turned the summary on, the call summary and the qualification reason are free text a person actually said, so they also follow the **How to store contact details** setting on the Leads screen:

- **Full** — stored as RingTonic wrote it.
- **Masked** (the default) — phone numbers and email addresses in the text are replaced with `[phone]` and `[email]`, and the rest of the wording is kept. Masking the whole summary would leave nothing worth reading, and the contact details are the part the setting is really protecting. **A name spoken during the call can still appear** in the summary — there is no reliable way to detect one in ordinary prose. If that is not acceptable for your site, choose **Off**, or simply leave the summary switched off.
- **Off** — the summary and the qualification reason are not stored at all. The numbers, dates, statuses, city and state above are not free text and are still stored.

### Caller ID name

An inbound call can carry the phone carrier's caller-ID name for the number. SyteOps keeps it, tidied up and only while contact details are stored in Full, on that call in the callback's history and, once, on the lead, where the Callbacks panel shows it as **Caller ID name (carrier)**. Generic names such as "Wireless Caller", "Unknown", "Private", "Toll Free", a number or a city and state are left out. It is never copied into the contact's name or company, and it is not part of the lead email, the CSV export or the automation webhook. On a call your team places, the caller-ID name describes your own number, so it is not kept.

### What is never stored

- **Recordings and transcripts.** RingTonic can send the full transcript of a call; SyteOps discards it and keeps only the AI summary. The one exception is a call back to someone waiting on a [callback](../features/callbacks): its transcript is kept with that callback's history, only while contact details are stored in Full. A recording is never stored. The credentials your hub operator installs deliberately cannot read call logs either, so there is no second route to it.
- **The caller's ZIP code.** City and state answer "where is this caller?" without a pinpoint identifier.
- **Call sentiment.** RingTonic scores sentiment in its own call-log screens, but it does not include it in any of the notifications it sends, so SyteOps has nothing to record. This is a limit of the notification payload, not a SyteOps choice.

Everything here is ordinary lead data: it is deleted with the lead, included in a Leads data export, and removed when the plugin is uninstalled, after a copy has been saved (if no copy could be saved, uninstalling keeps the lead records and says so; see Private storage).

## Deleting a lead

RingTonic's API has **no delete** capability, so deleting a lead in SyteOps cannot remove the corresponding contact from RingTonic. Instead:

- SyteOps trashes the lead **locally**, as usual.
- SyteOps makes a **best-effort** move of the matching RingTonic contact to the **Lost** stage.
- RingTonic **keeps its own record** of the contact.

This is expected behavior — plan for RingTonic to retain contacts you delete in SyteOps, marked **Lost** where possible.

## How outbound status pushes are matched

To line up a SyteOps lead with the right RingTonic contact for the **outbound** push (moving a lead's status in SyteOps → RingTonic, described above), SyteOps tries, in order:

1. The contact's **phone number**.
2. The contact's **email address**.

The first match wins. Keeping a phone number or email on your leads gives the match the best chance of landing on the right RingTonic contact.

## How inbound deliveries are matched

Live notifications ([above](#from-ringtonic-to-syteops-live-notifications)) use a **different** matching order than the outbound push — RingTonic's own delivery already names the exact call or contact, so SyteOps never needs phone/email guesswork for these:

- **A completed/missed call, or a qualified-call notification:** matched by that call's own identity in RingTonic (never by contact) — see the note above.
- **A stage change, or a form submission:** matched by, in order, the RingTonic contact id RingTonic names in the delivery, a CRM identifier your site (or another integration) may already have written onto the lead, then — as a last resort for a lead that only ever had a phone call — the call identity that first created it.

If nothing matches, the delivery is acknowledged and changes nothing — it never creates a phantom lead.

## Troubleshooting

### Status changes aren't reaching RingTonic

1. Confirm the **RingTonic** integration is toggled ON in the Integrations tab.
2. Confirm your **Agency API key** is saved on the **Leads → Settings** RingTonic card (or defined via the `wp-config.php` constant).
3. Confirm your RingTonic account is on the **Agency plan** — API access isn't available on lower plans. RingTonic reports this distinctly (as a "plan required" refusal) rather than a generic error, so SyteOps' logs (Debug Mode required — see the note above) will call it out by name if this is the cause.
4. Make sure the lead actually matches a RingTonic contact by **phone or email** (see [How outbound status pushes are matched](#how-outbound-status-pushes-are-matched)). A lead created purely from a phone call, with a masked phone number on the lead, can't be matched this way yet — SyteOps logs that case rather than sending an unusable value to RingTonic.
5. Give it a minute — the push runs via a background task shortly after the change, not instantly.

### A "backward" status change didn't stick in RingTonic

Moving a lead to an earlier stage (for example **Customer → Contacted**), or re-engaging a lead RingTonic currently shows as **Unqualified** or **Lost**, only propagates if your API key is permitted to force stage moves. If it isn't, SyteOps saves your change locally but RingTonic holds its stage — and SyteOps logs the attempt as a no-op rather than pretending it succeeded. Ask RingTonic to enable forced stage moves for your key if you need moves like this to sync.

Note that SyteOps only attempts a forced move when the change is genuinely backward (or a re-engage out of Unqualified/Lost) from what it last knew RingTonic to hold. If RingTonic has already moved a contact further ahead through some other path — or moved it since SyteOps' last successful sync — SyteOps recognizes that and leaves it alone instead of forcing a regression.

### A change I made in RingTonic hasn't appeared in SyteOps yet

1. Confirm your hub operator has set up **Live notifications** for your site — check the **Live notifications** line on the **Leads → Settings** RingTonic card. If it says "Not configured yet," this side of the connection hasn't been set up, and changes made in RingTonic have no way to reach SyteOps.
2. If it says **Configured**, check the "last event" and time shown on that same line — it updates every time RingTonic delivers anything, even one SyteOps doesn't act on. If that time never moves, deliveries aren't reaching your site at all (a firewall or security plugin may be blocking them) — ask your hub operator to check.
3. If deliveries are arriving but a specific change doesn't show up, confirm your lead is actually matched — see [How inbound deliveries are matched](#how-inbound-deliveries-are-matched) (a DIFFERENT matching order from the outbound push above — inbound deliveries match by call or contact identity, never by phone/email). A change to a call or contact SyteOps has never linked to one of your leads has nothing to update.

### A lead I deleted is still in RingTonic

Also expected. RingTonic has no delete via its API, so SyteOps best-effort marks the contact **Lost** and RingTonic keeps its record. See [Deleting a lead](#deleting-a-lead).

### A form submission didn't create a RingTonic contact

1. Open the lead and read **Contact created from the form** on the **From RingTonic** card — it names the reason.
2. **Not sent (internal traffic):** the submission came from someone your Internal traffic settings recognize, which is skipped by default.
3. **Not sent (no email or phone in the submission):** check the form's **Email** and **Phone** field choices under **Create contacts in RingTonic**.
4. **Failed:** RingTonic's answer is shown. A permission error usually means the API key cannot create contacts; ask your hub operator for a key with contact and conversion access.
5. No line at all: confirm the form is ticked, the RingTonic integration is on with an API key, and your **Form submission** goal is enabled — without it SyteOps records no lead for the submission.

### A deal value I set didn't reach RingTonic

Give it a minute — like a status change, the value rides along on the next background push, not instantly. Setting a value schedules that push on its own, so you don't need to change the status first. If it still doesn't arrive, confirm the lead actually matches a RingTonic contact by **phone or email** (see [How outbound status pushes are matched](#how-outbound-status-pushes-are-matched)) — a value on an unmatched lead has nothing to send it to yet. Also confirm the lead's currency matches your **Default deal currency** setting (see [Deal value](#deal-value) above) — a mismatched currency is skipped on purpose, never sent.
