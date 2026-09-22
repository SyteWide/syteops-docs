---
sidebar_position: 8
title: RingTonic Integration
description: Push a lead's pipeline status to RingTonic, and receive calls, qualified leads and stage changes back — automatically, in both directions.
---

# RingTonic Integration

**Tier: Extended** — Stores your RingTonic credentials and adds a settings card to the Leads screen. Once it's on, changing a lead's status in SyteOps updates the matching contact in RingTonic, and RingTonic can notify SyteOps back — calls, qualified leads and stage changes all land in your Leads list automatically.

[RingTonic](https://ringtonic.app) is an AI call-tracking and attribution tool with a lightweight built-in CRM, built on Twilio. The connection works in two directions:

- **SyteOps → RingTonic:** move a lead from **Contacted** to **Qualified** in your SyteOps Leads list and RingTonic hears about it shortly after (via a background task).
- **RingTonic → SyteOps ("Live notifications"):** once your hub operator sets up RingTonic's webhook for you, a completed or missed call, a qualified lead, or a stage change made *inside* RingTonic shows up in your Leads list within moments — no more relying only on the outbound push above.

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

## What syncs, and in which direction

### From SyteOps to RingTonic (via WP-cron, shortly after the change)

When you change a lead's status in SyteOps — **New**, **Contacted**, **Qualified**, **Unqualified**, or **Customer** — the matching RingTonic contact's stage is updated in the background a short time later. Repeated changes to the same lead in quick succession are collapsed into a single push of the final status.

There's one nuance when you move a lead **backward** — for example from **Customer** back to **Contacted**, or when you re-engage a lead that RingTonic currently shows as **Unqualified** or **Lost** (see [Deleting a lead](#deleting-a-lead)) by moving it to any other status. RingTonic only accepts a move like this if your API key is allowed to force stage changes; SyteOps asks for exactly that only when the move is a genuine regression from what it last knew RingTonic to hold. If your key isn't permitted to force stage changes, your change still saves in SyteOps as normal, but RingTonic keeps its earlier stage. A forward move (moving a lead further along, including out of Unqualified/Lost) is sent as a plain update and never needs forcing — but like any request, RingTonic can still decline it for an unrelated reason (a plan or permission issue); SyteOps never retries a declined request as a forced move, so a genuinely-declined forward change stays exactly where RingTonic left it rather than being pushed through by force.

SyteOps also recognizes when RingTonic has simply gotten **ahead** of it — for example, another tool recorded a RingTonic-side milestone that puts the contact further along than SyteOps' own last-known stage, or moved it since SyteOps' last successful sync. When that happens, SyteOps does not fight it: it logs the reason and leaves RingTonic's stage alone rather than forcing a regression.

A forced backward move is also verified, not assumed: if your API key isn't permitted to force stage changes, RingTonic may answer with an explicit permission error, or it may accept the request without actually applying it. SyteOps treats either outcome as a no-op and logs it, rather than recording the change as synced when it never actually happened.

:::note Log lines require Debug Mode
Every "logs it" mentioned on this page means a structured log entry in the [Debug Tool](../features/debug-tool) — visible only once **Debug Mode** is turned on in the Admin tab. With Debug Mode off, RingTonic sync still works exactly the same; you simply won't see the log lines described here.
:::

### From RingTonic to SyteOps (live notifications)

Once your hub operator has set up the connection (see [Live notifications](#4-live-notifications-set-up-by-your-hub-operator) above), RingTonic notifies SyteOps the moment one of these happens:

| In RingTonic | In your SyteOps Leads list |
|---|---|
| An **inbound** call completes or is missed | A new lead appears (or an existing one is updated), carrying the caller's number, when the call started, whether it was a first-time caller, and — when RingTonic has it — the visit that led to the call (landing page, referrer, click ids, medium). An **outbound** call, and RingTonic's own "send test" delivery, are acknowledged and change nothing. |
| RingTonic marks a call qualified | The **specific lead that call belongs to** moves to **Qualified** — but only moving *forward* (from New or Contacted). A lead already Qualified, Customer, or Unqualified never moves backward because of this. |
| A contact's stage changes | Every lead bound to that contact has its status moved along too, where RingTonic's stage has a SyteOps equivalent. A stage RingTonic tracks that SyteOps doesn't have a status for (there are more RingTonic stages than SyteOps ones) is still recorded on the lead for reference and as the baseline the outbound sync compares against — it just doesn't change the status shown in your list. |
| A form is submitted | If SyteOps already has a lead for that same RingTonic contact, RingTonic's form record is linked to it. **RingTonic form submissions never create a new lead** — your own site's forms already do that, and this would just duplicate it. |

Each of these also records the call detail RingTonic already has — duration, how the call ended, the tracking number's name, the caller's city and state and the tags — and, if you switch it on, RingTonic's AI summary of the conversation. See [What lands on the lead](#what-lands-on-the-lead) for the full list and how each field is written.

A delivery whose type SyteOps doesn't yet recognize is simply acknowledged and ignored, never treated as an error — RingTonic adds new capabilities over time, and an unrecognized one should never look like something is broken. A **transcription** notification is the one exception SyteOps acts on selectively: with the call summary switched on it takes the AI summary from it and discards the transcript itself; with the summary off it changes nothing.

:::note Matching an inbound call to an existing lead
A completed or missed call is matched by the call's OWN identity in RingTonic (its call id), not by the contact — a lead qualified for that call is looked up the same way, so qualifying one call for a repeat caller only ever affects that one call's lead, never an earlier one from the same person. A stage change or a form submission, by contrast, IS a contact-level fact — see [How inbound deliveries are matched](#how-inbound-deliveries-are-matched) below.
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

With it off, a transcription notification is acknowledged and changes nothing.

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

### What is never stored

- **Recordings and transcripts.** RingTonic can send the full transcript of a call; SyteOps discards it and keeps only the AI summary. The credentials your hub operator installs deliberately cannot read call logs either, so there is no second route to it.
- **The caller's ZIP code.** City and state answer "where is this caller?" without a pinpoint identifier.
- **Call sentiment.** RingTonic scores sentiment in its own call-log screens, but it does not include it in any of the notifications it sends, so SyteOps has nothing to record. This is a limit of the notification payload, not a SyteOps choice.

Everything here is ordinary lead data: it is deleted with the lead, included in a Leads data export, and removed when the module is uninstalled.

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
