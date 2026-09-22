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

A delivery whose type SyteOps doesn't yet recognize is simply acknowledged and ignored, never treated as an error — RingTonic adds new capabilities over time, and an unrecognized one should never look like something is broken.

:::note Matching an inbound call to an existing lead
A completed or missed call is matched by the call's OWN identity in RingTonic (its call id), not by the contact — a lead qualified for that call is looked up the same way, so qualifying one call for a repeat caller only ever affects that one call's lead, never an earlier one from the same person. A stage change or a form submission, by contrast, IS a contact-level fact — see [How inbound deliveries are matched](#how-inbound-deliveries-are-matched) below.
:::

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
