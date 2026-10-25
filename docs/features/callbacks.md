---
sidebar_position: 17
title: Callbacks
description: A list on each person's private page of the callers waiting for a call back, with Call, Done, Not a lead and Reopen, and a setting that decides who sees it.
---

# Callbacks

When someone calls or fills in a form and is waiting for a call back, Lead Attribution keeps one **callback** for that person, however many times they get in touch. The **Callbacks** list on a person's private page shows everyone still waiting, so your team can work through them and mark each one when it is handled.

## Before you start

The Callbacks list appears only when all of these are true:

- **Lead Attribution** is on.
- The **RingTonic** integration is turned on (see [RingTonic Integration](../integrations/ringtonic)).
- The person has been given access (see [Give someone access](#give-someone-access) below).

Callbacks hold each caller's name and full phone number, because they exist so you can call the person back. They are kept only when Lead Attribution stores contact details in **Full** (see [How contact details are stored](lead-attribution#how-contact-details-are-stored-privacy)). If you later switch to **Masked** or **Off**, the list hides names, shows only the last four digits of each number under Masked and no digits at all under Off, and the buttons are turned off.

## Give someone access

Access is set person by person. Nobody sees the list until you give them access, and that includes site administrators. Everyone with access sees the same list: every callback on the site, not only the ones they handled.

1. Go to **Roles & Users** and open the person's card.
2. On the **Leads** tab, set **Callbacks access**:
   - **Off**: the list does not appear on their page. This is where everyone starts.
   - **View and act**: they see the list and can mark callbacks Done, Not a lead or Reopen.
   - **Call**: everything View and act allows, plus a **Call** button on each row (see [Call a lead back](#call-a-lead-back)).
3. Click **Save**.

Access stays with the person if you swap people between slots, is cleared when someone leaves a slot, and is never copied to another site when you export or import a person.

### RingTonic member email

When someone presses **Call**, RingTonic rings the person placing the call first. It rings them by their RingTonic sign-in email, and refuses the call if that email is not a member of your RingTonic account. If someone signs in to RingTonic with a different email from the one on their card, enter it in **RingTonic member email** on the same **Leads** tab. Leave it blank to use their usual email. Like access, it moves with the person when you swap slots, is cleared when someone leaves a slot, and is never copied to another site. People cannot change it on their own private page.

## Using the list

The list is on the person's own private page, under their name. The heading shows how many callers are waiting.

Callers are grouped in this order:

1. **Waiting for a call back**: the person who has waited longest is first.
2. **Follow-ups**: callbacks set for a later date. A follow-up that is due today or overdue is marked **Due**.
3. **Returned**: callers someone has already called back.
4. **Closed**: callbacks marked Done or Not a lead, and ones that expired after 16 weeks.

Each row shows the caller's name and number, their status, how long they have been waiting (or when they first got in touch), any follow-up date and who it belongs to, who closed it and when, the last time someone called them back and how that call went, and, for people who can open the Leads screen, an **Open in admin** link that opens the lead there in a new window, so the portal stays open. When the person's phone and email are on two different RingTonic contacts, the row also says **RingTonic: this person's phone and email are on two different contacts. Merge them in RingTonic.** until someone marks them merged on the lead ([RingTonic](../integrations/ringtonic#create-contacts-from-form-submissions)).

### Call a lead back

People with **Call** access see a **Call** button on every row that is not closed. Press it and a short question opens under the row, for example: "Call (917) 434-7322 from (866) 994-8556? RingTonic rings you at jo@example.com first, then connects the lead." Press **Call** there to place the call, or **Cancel**. Nothing is dialed until you confirm.

RingTonic then rings your phone. Answer it and press 1 when RingTonic asks, and it connects you to the lead. The row says "Calling… RingTonic is ringing you." The callback's status changes only when RingTonic reports how the call went (see the table below): a call answered for 30 seconds or more marks it **Returned**.

**While you are calling a lead, nobody else can work it.** The row shows "You're calling — since 4:02 pm" to you, and "Jo Smith is calling — since 4:02 pm" to everyone else, whose buttons on that row are locked. The lock ends by itself when RingTonic reports the end of the call, when you press **Release**, when you mark the callback Done or Not a lead, or after 15 minutes at the latest (an admin can change the length). Pressing Done, Not a lead or Reopen never locks a row. The list checks for locks once a minute while it is open.

The Call button is grayed out, with the reason at the top of the list, until your site is ready to place calls: an admin has to add the RingTonic calls key, set up RingTonic live notifications and set a verified caller ID (see [RingTonic click-to-call](../integrations/ringtonic#5-click-to-call-the-calls-key-and-caller-id-set-up-by-your-hub-operator)). Calls also need contact details stored in **Full**, because the whole number is needed.

**Limits.** To keep calls under control, each person can place 20 calls a day and the whole site 60 a day, no more than 8 a minute across the site (RingTonic allows 10), and one lead can be called at most 3 times an hour and 10 times a day, whoever calls. The daily counts start again at midnight in your site's time zone. An admin can change all of them on **Leads → Settings → RingTonic → Click-to-call → Call limits**. When a limit is reached, the call is not placed and the row says which limit it was.

If a call does not go through, the row says why in plain words:

| What the row says | What to do |
|---|---|
| Your RingTonic member email isn't a RingTonic member; set it on your Leads tab. | RingTonic does not know the email it rang. Set your **RingTonic member email** (above). |
| RingTonic did not accept the calls key. Ask an admin to check it. | The calls key is wrong or lacks the calls permission. |
| RingTonic says you are already on a call. | Finish that call first. |
| RingTonic is placing too many calls right now. Try again in a minute. | RingTonic's own per-minute limit was reached. |
| RingTonic didn't answer. Check your phone before trying again. | The call may still come through, so the lead stays locked to you. Press **Release** if it never rings. |
| Ask an admin to set up RingTonic live notifications. | The site cannot hear back from RingTonic about calls yet, so calls are off. |
| You have placed 20 calls today, your daily limit. | Your daily limit is used up until midnight. |

### Open a callback from an email

Buttons in callback emails open your private page at the right row: the page scrolls to it, highlights it and opens the same question the row's button opens. Nothing happens until you confirm. If someone else is calling that lead, the page says who and since when, and opens nothing. If the callback is no longer waiting, the page says "This callback is no longer waiting."

### Calls back to the caller

When someone on your team calls a waiting caller back through RingTonic, the callback records the call. The row shows the latest one, for example "Called Oct 23, 2:14 pm · No answer".

| What the row says | What happened |
|---|---|
| **Returned · 1:42** | The caller answered, the call lasted 30 seconds or more (here, 1 minute 42 seconds), and this call moved the callback to **Returned** on its own. |
| **Answered · 0:12** | The caller answered, but this call did not move the callback: it lasted under 30 seconds, or the callback was already closed or returned. |
| **No answer** | The caller's phone rang and nobody picked up. |
| **The call was never put through to the lead** | The call was set up but the person placing it never joined, so the caller's phone was never rung. |
| **The lead's carrier refused the call (or the line was busy)** | The caller's phone company turned the call away, which usually means your caller ID is not verified yet, or the line was simply busy. RingTonic reports both the same way. |

A call that was not answered never changes the callback's status. A call to a callback that is already closed is recorded but does not reopen it. When your site reports who placed a call, the callback records that person; otherwise it records only that the call came through RingTonic.

Calls back are recorded only while contact details are stored in **Full**, and only for callers who already have a callback. A call to any other number is not recorded here and never creates a lead.

### View a lead without leaving the page

A row that has a lead shows **View lead**. Select it and the lead opens right under the row, so you can see who you are about to call and what happened on earlier calls without going to the WordPress admin. Select it again, or press Escape, to close it. The list keeps its place, and it works the same on a phone.

The panel shows only what the site has for that lead:

- **The top**: the person's name, the lead's status, the callback's status, any follow-up date and owner, and who returned or closed it and when. When the lead may be a duplicate in RingTonic, it says so.
- **Contact**: phone, office phone and email. Under **Full**, a phone number or email is a link you can tap to call or write. Under **Masked** the details are shown as hidden text with no links, and under **Off** there is no contact section.
- **Where they came from**: the source, the campaign, when they first got in touch (in your site's time zone), the page they landed on (a link that opens in a new window when the page is on your own site, plain text otherwise), and tags such as the UTM details as small chips.
- **Form answers** and the **RingTonic** details that came with the lead.
- **Calls**: one card for each call, newest first. A card shows whether it was outgoing or incoming, how it went in plain words, how long it lasted, when, who placed it (or "Placed in RingTonic"), whether RingTonic has a recording (the recording stays in RingTonic), how confident the transcription is, and RingTonic's AI summary. The full transcript is tucked behind **Show transcript** and scrolls inside its own box. Only the newest five transcripts load; older calls say "Older transcript not loaded". Summaries and transcripts are shown only while contact details are stored in **Full**.

The lead loads once when you first open it and is remembered until you reload the page, and after you press Done, Not a lead or Reopen on that row it loads fresh the next time. If it cannot load, the panel says so and offers **Retry**. If your sign-in has expired it asks you to reload the page instead. If the lead has been deleted, it says "This lead isn't available."

Anyone who sees the Callbacks list can open this panel. People who can also open the Leads screen get a small **Open in admin** link inside it, which opens in a new window.

### Calls from the caller

When a caller rings your RingTonic number again, the callback records that call too, with how it went, how long it lasted, whether there is a recording and, while contact details are stored in **Full**, RingTonic's AI summary and transcript. The row's last call then reads, for example, "Called in Oct 24, 2:30 pm · Answered · 5:00" or "Called in Oct 24, 2:30 pm · Missed".

A call from the caller never marks the callback **Returned** or closes it, however long it lasted: talking to someone when they ring in does not always mean their request was handled. The only change a new call makes is the one in [Good to know](#good-to-know): a callback that was Done, Returned, Expired or Held goes back to the waiting list.

These calls are recorded only while contact details are stored in **Full**, and only for callers who already have a callback (a first-time caller gets one from the call itself).

### Calls placed in the RingTonic app

A call someone on your team dials directly in the RingTonic app is recorded like any other call back. RingTonic does not say which team member dialed it, so the lead view shows **Placed in RingTonic** instead of a name.

### Closed callbacks are hidden

Closed callbacks are hidden until you ask for them. Turn on **Show closed** to see them under the waiting ones. Your browser remembers this choice for you, so the list opens the same way next time.

### Show one group at a time

Use the buttons above the list to show **Everything waiting**, or only **Waiting**, **Follow-ups**, **Returned** or **Closed**. Each button shows how many callbacks are in that group. Choosing **Closed** shows the closed callbacks even when Show closed is off.

### Mark a callback

- **Done**: you have handled it.
- **Not a lead**: the caller was not a real lead. A new call from that number will not bring it back.
- **Reopen**: on a closed callback, puts it back in the waiting list and starts its 16 weeks again.

The row moves to its new group straight away, and the page records who marked it and when. If someone else already marked it, nothing changes and the row tells you who did it and when, for example "Already marked done by Todd Smith at 2026-10-23 14:05".

## Good to know

- A new call from someone whose callback is Done, Returned, Expired or Held puts them back in the waiting list automatically. A form submission does not.
- The list shows up to 200 waiting callbacks and the 200 most recently closed ones.
- **Scripted setup.** The Lead Attribution settings, a person's people link and the site time zone can also be set through the Manage API (`leads.settings_set`, `leads.people_issue_link`, `site.timezone_set`; see the [API reference](../api/reference/leads)). The RingTonic keys are not: they are entered on the RingTonic card or set from a terminal, never through the API.
