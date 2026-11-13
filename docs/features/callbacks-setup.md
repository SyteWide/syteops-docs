---
sidebar_position: 18
title: Turn on callbacks and calling
description: An ordered checklist for turning on Callbacks, the Call button, the AI read and the emails on a site, with where each setting lives and what done looks like, plus how to switch over from a site's own callback emails.
---

# Turn on callbacks and calling

This is the checklist for turning on [Callbacks](callbacks) and the **Call** button on a site, in order. Each step says where the setting lives and what "done" looks like. Steps 1 to 6 get the list and the Call button working. Steps 7 to 10 add the AI read and the emails, and each of those stays off until you set it.

There is no separate "callbacks on" switch. Callbacks turn on when Lead Attribution and the RingTonic integration are both on (steps 1 and 3) and a person has been given access (step 5).

## 1. Lead Attribution on, contact details stored in Full

- **Lead Attribution:** go to **SyteOps → Modules** and turn **Lead Attribution** on.
- **Contact details:** go to **Leads → Settings**, find **Form field mapping**, and set **How to store contact details** to **Full — store the exact name, email, phone, and message**.

Done looks like: a **Leads** menu item, and the contact details setting reading Full. Under Masked the list shows only the last four digits and every button is off, and under Off it shows no digits. The call history, the AI read and the Call button all need Full.

## 2. Site time zone

Go to **Settings → General** in WordPress and set **Timezone** to a city, for example Detroit, not a "UTC+" offset. A city handles daylight saving.

Done looks like: a named city. The time zone decides when a follow-up is "due today", when the 7:30 am emails go, when the daily limits start again, and the times people see.

## 3. RingTonic integration, Agency key and live notifications

1. Go to **SyteOps → Integrations**, turn **RingTonic** on and save.
2. Go to **Leads → Settings** and open the **RingTonic** card. Under **RingTonic CRM sync**, paste the **RingTonic Agency API key**. The account needs the Agency plan.
3. In the same card, under **Live notifications**, enter the **RingTonic webhook signing secret**. In RingTonic, point the webhook at `https://<your site>/wp-json/syteops/v1/leads/ringtonic/events` and subscribe it to:
   - `call.completed`, `call.missed`, `recording.available` and `transcription.available`, which call history needs;
   - `contact.stage_changed`, `lead.qualified` and `form.submitted`.

Your hub operator normally does the key and the secret for you (see [RingTonic Integration](../integrations/ringtonic#setup)). Done looks like: the Live notifications line reads **Configured (fingerprint …) · last event … at …**. Optionally tick **Store RingTonic's AI call summary on the lead**.

## 4. Calls key and a verified caller ID

In the same RingTonic card, under **Click-to-call**:

1. Enter the **RingTonic calls key** (paste the whole key, including the number and bar before `rt_`). It is a separate key from the Agency key and needs the calls:place, call-logs:read and tracking-numbers read permissions. A key cannot gain permissions later, so mint a new one in RingTonic if one is missing.
2. Press **Check now** (it also runs by itself a few minutes after any change). Done looks like: **Reads call logs: yes. Reads tracking numbers: yes. Placing calls is confirmed only by the first real call.** If a line says the key lacks a scope, mint a new key.
3. Enter the **Caller ID number**: the RingTonic tracking number both your team member and the lead see, written with +1 and no spaces. Leave it blank and no call can be placed. Done looks like: none of these warnings show, "not checked yet", "not one of the tracking numbers on the RingTonic account", "RingTonic has calls turned off for this tracking number".

:::warning Verify the caller ID first
The number must reach **attestation A** with phone carriers. Without it, carriers refuse the call to the lead, RingTonic logs it as "busy" and the row says **The lead's carrier refused the call (or the line was busy)**. SyteOps cannot check this for you. RingTonic's phone carrier layer is SignalWire, so ask RingTonic to confirm that the number carries attestation A, and which caller-ID name registration it has, before the first real call. Repeat the check for every site that will place calls.
:::

The keys and the secret come from a terminal or your hub operator, never from an AI assistant or the API (see step 11).

## 5. Per person: Callbacks access and RingTonic member email

Go to **Roles & Users**, open the person's card and open its **Leads** tab.

- **Callbacks access:** **Off** (the default; the list does not appear), **View and act** (they see the list and can mark callbacks Done, Not a lead or Reopen) or **Call** (also a **Call** button on every row that is not closed). Administrators get no access unless it is set here.
- **RingTonic member email:** leave it blank to use their usual email. Fill it in only when they sign in to RingTonic with a different email. It is the email RingTonic rings first, and RingTonic refuses the call if it is not a member of your RingTonic account.

Done looks like: the person's private page shows the **Callbacks** list. The person's link to their name in the Leads reports is created automatically the first time they act on a callback, so there is nothing to set up for it.

## 6. Call limits

Under **Call limits** in the same RingTonic card, the defaults work unchanged:

| Setting | Default |
|---|---|
| **Calls per person per day** | 20 |
| **Calls per site per day** | 60 |
| **Calls per minute (whole site)** | 8 (at most 10, RingTonic's own limit) |
| **Calls per lead per hour** | 3 (counts every caller) |
| **Calls per lead per day** | 10 (counts every caller) |
| **Minutes a call locks its callback** | 15 |

A call over a limit is not placed, and the row says which limit it was. The daily limits start again at midnight in the site's time zone. While someone is calling a lead, everyone else's buttons on that row are locked until RingTonic reports the end of the call, the caller presses **Release**, or the 15 minutes pass.

## 7. The AI read

Under **AI read of call transcripts** in the same card:

- **AI reads per site per day:** default 100. **0 turns AI reads off.**
- **Close threshold (%):** default 85. **Open threshold (%):** default 60.

The AI uses the provider and model chosen in the **AI mapping** card on **Leads → Settings**. Pick a fast, low-cost model. Done looks like: the card no longer says AI reads are off until a provider, model and key are set. Nothing is read until they are.

## 8. Call summary emails

Under **Call summary email**, enter the Users slot numbers (for example `001, 003`) in **Send call summaries to slots**. It is off until you list slots. Each listed person gets one email per callback a person places, once the call has a transcript.

## 9. Follow-up reminders

Under **Follow-up reminders**, tick **Email follow-up reminders**. It is off by default. Optionally fill **Otherwise send reminders to slots** for a follow-up whose caller can no longer be reminded; empty means nobody. Reminders go out at about 7:30 am in the site's time zone.

### Optional: AI deal summary

Under **AI deal summary**, tick **Write an AI deal summary for each caller** to show an AI-written summary of each caller at the top of their panel (see [Callbacks](./callbacks#deal-summary)). It is off by default. **AI summary requests per site per day** defaults to 50; 0 stops new summaries. Turning it on sends each caller's call transcripts and team notes to the AI provider chosen in the **AI mapping** card, so it needs that provider, a model and its key, and contact details stored in Full.

## 10. The Monday list

Under **Monday callbacks list**, enter the slots in **Send the Monday list to slots** (for example `001, 003`). It is separate from the summary slots and off until you list slots.

:::note This also turns on the 16-week expiry
Callbacks expire after 16 weeks, with one last mention in the Monday list. That only happens while at least one slot is listed here. With the field empty, nothing ever expires.
:::

Optional: **Call announcement** (Leads → Settings → RingTonic) sets what the staff member hears before they press 1. By default RingTonic says the site name and the word callback, then the reason for the callback, for example "Example Co callback. Call back". To use your own wording, type it in **What the staff member hears before pressing 1** (plain text, up to 200 characters). Two placeholders are filled in for each call: `{site}` is the site name and `{reason}` is the reason for the callback. For example, "Example Co dot com. This call may be recorded and transcribed." is read exactly as typed, and `{site}. {reason}. This call may be recorded.` adds the reason. Write brand names the way they should be spoken ("dot com").

- **Leave it blank** to keep the built-in announcement.
- **Built-in announcement** (just above that field) chooses what the built-in announcement says: **Site name and reason** (the default, as described above), **Reason only** (the staff member hears just the reason, without the site name and the word callback), or **Nothing** (no announcement text is sent). Words typed in the field replace **Site name and reason** and **Reason only**. **Nothing** ignores them.
- **RingTonic may add its own words.** RingTonic may add its own words around the caller's name and the announcement, and this plugin does not control them. Choosing **Nothing** removes the announcement this plugin sends, but RingTonic may still say its own words.
- **A text without `{reason}`** means the staff member no longer hears the reason before pressing 1.
- **An empty reason** (a callback with none) leaves out the placeholder and the comma, period or dash in front of it.
- **Anything else in curly braces** is removed.
- **Numbers are never read.** Any two or more digits in a row are removed from the finished announcement, whether they come from your text, the site name or the reason, so a phone number is never read into a recorded call. Write numbers as words. A single digit, as in "Press 1", stays.
- **RingTonic reads the first 100 characters** of the finished text, so keep the part that matters at the start.
- **Tags and special characters:** tags are removed and extra spaces are collapsed. Letters and punctuation are kept as typed.

Optional: **Call labels** (Leads → Settings → RingTonic) sets how many seconds a call must last before it stops being called **Hung up** in the portal (a longer call that was only your phone menu, with nobody reached, is still called **Hung up**). The default of 30 suits most sites; see [Hung up and Voicemail, no message](callbacks#hung-up-and-voicemail-no-message).

Optional: **Callback number to give** (Leads → Settings → RingTonic) is the number your staff ask a lead to call back, shown as **Request callbacks at** beside the call note after a call ([Write your call note](callbacks#write-your-call-note)). Type a phone number, with or without spaces, dashes or parentheses (7 to 20 digits, and a plus sign only at the start). Leave it blank and the panel shows the number the lead dialed instead, or nothing when that is unknown. It is only shown to your staff on their private page: it is not sent to RingTonic, to emails or to the lead.

For steps 8 to 10, each listed person needs Callbacks access of **View and act** or **Call** (step 5), a private page and an email address, or that slot is skipped. Buttons in the emails need contact details in Full.

## 11. Doing it from a repo with the MCP

A repo connected through the SyteWide MCP can do each step with a Manage operation. **Keys never go through the MCP.**

| Step | Operation |
|---|---|
| 1. Lead Attribution on | `modules.activate` with module `syteops_leads` |
| 1. Contact details in Full | `leads.settings_set` with `pii_mode` set to `full`, and `confirm: true` |
| 2. Site time zone | `site.timezone_set` with a city such as `America/Detroit` |
| 3. RingTonic integration on | `integrations.enable` with slug `ringtonic` |
| 3 and 4. Agency key, webhook secret, calls key | None. From a terminal: `wp syteops systems-api set --stdin` |
| 4. Caller ID | `leads.settings_set` with `ringtonic_caller_id_number` |
| 4. Check the keys | `leads.ringtonic_status` with `probe: true` |
| 5. Per person | `users.update` with `user_num`, `callbacks_access` (`act` or `call`) and `ringtonic_email` |
| 6. Call limits | `leads.settings_set` with `ringtonic_call_cap_person_day`, `ringtonic_call_cap_site_day`, `ringtonic_call_cap_per_minute`, `ringtonic_call_cap_lead_hour`, `ringtonic_call_cap_lead_day`, `ringtonic_call_claim_minutes` |
| 7. AI read | `leads.settings_set` with `callbacks_ai_cap_day`, `callbacks_ai_close_threshold`, `callbacks_ai_open_threshold` |
| 8. Summary emails | `leads.settings_set` with `callbacks_summary_slots` and `confirm: true` |
| 9. Reminders | `leads.settings_set` with `callbacks_reminders_enabled` and `callbacks_reminder_slots`, and `confirm: true` |
| 10. Monday list | `leads.settings_set` with `callbacks_weekly_slots` and `confirm: true` |
| Optional: AI deal summary | `leads.settings_set` with `callbacks_deal_summary_enabled` and `callbacks_deal_summary_cap_day`, and `confirm: true` to turn it on |
| Optional: call announcement | `leads.settings_set` with `ringtonic_call_topic_template` (up to 200 characters; an empty string restores the built-in announcement) and `ringtonic_call_topic_mode` (`built_in`, `reason_only` or `none`); no `confirm` needed |
| Optional: Not a lead marks the lead Unqualified | `leads.settings_set` with `callbacks_not_lead_sets_unqualified` (default false; no `confirm` needed) |
| Optional: call labels | `leads.settings_set` with `callbacks_hung_up_seconds` (5 to 120, default 30) |
| Optional: callback number to give | `leads.settings_set` with `callbacks_callback_number` (a phone number, 7 to 20 digits; an empty string clears it and the panel shows the number the lead dialed); no `confirm` needed |

`confirm: true` is needed for changes to how contact details are stored and to anything that decides where call details are emailed: the three slot lists and the reminders switch, and to turning on the AI deal summary, which sends call content to the AI provider (see the [API reference](../api/reference/leads)). `leads.settings_get` reads every setting back. A secret named as a setting is refused.

## What these emails replace

Turning on the SyteOps emails replaces only the site's own callback emails. It does not touch the other alerts, which must stay on.

**SyteOps replaces:**

- a site's own weekly callbacks report (the Monday list replaces it);
- a per-callback summary email, if the site has one (the call summary email replaces it).

**SyteOps does not replace, so keep these on:**

- lead notification emails (form leads);
- inbound call alerts;
- missed-call alerts.

## Switching over from a site's own report

Run both side by side first, then switch in one step.

1. **Start with one slot.** Send the SyteOps Monday list (or the summaries) to ONE slot, alongside the site's own report.
2. **Compare for a week or two.** Check call by call that the two agree.
3. **Switch in one step.** Set all the slots, and turn the site's own report off in the same step. On hotelloans that is `wp option delete hl_cbr_enabled`.

Callbacks from before the site's SyteOps callbacks start date do not carry over. Moving them is a separate one-time import.

## Sites with their own Call buttons

Some sites already have Call buttons of their own, for example in their lead emails. When such a site reports each call it places to SyteOps, its buttons work the same way as the Call button in the portal:

- the call is credited to the person who placed it, and shows in the callback's history as theirs;
- the callback is locked for 15 minutes (or until the call ends), the same as a portal call;
- the call counts toward the person, site and lead limits. A reported call is never refused, because it has already happened, but once a limit is used up the portal's Call button waits until it resets.

If the site checks with SyteOps before it dials, the person sees why a call was not placed. When someone else is calling the lead, the page says so, for example "Chet is calling this lead now". When a limit is reached, it says which one. Setup problems, such as callbacks being off or contact details not stored in Full, do not stop the site's own button from working.

For the exact checks and answers a site's code can use, see the developer documentation, **Companion contract** (`can_place` and `claim_for_phone`).

A site can also put the same one-tap **Call** button that the callback emails carry into its own lead, missed-call and inbound-call emails. Tapping it places the call through SyteOps, so the site does not place or report the call itself: it is locked, counted and logged exactly like a call from the portal. Only people signed in with Call access on your site can use the button, and a button made for one person works for that person alone: if the email is forwarded, a colleague who opens it is told the link is for another account. A button that is opened a second time shows a Call again button instead of calling by itself. For the helper a site's code uses, see the developer documentation, **Call link**.

## Related

- [Callbacks](callbacks): what the list does once it is on.
- [RingTonic Integration](../integrations/ringtonic): the keys, live notifications and what syncs.
