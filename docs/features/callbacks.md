---
sidebar_position: 17
title: Callbacks
description: A list on each person's private page of the callers waiting for a call back, with Done, Not a lead and Reopen, and a setting that decides who sees it.
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
   - **Call**: the same as View and act for now. When calls can be placed from the list, people with this level will get a Call button.
3. Click **Save**.

Access stays with the person if you swap people between slots, is cleared when someone leaves a slot, and is never copied to another site when you export or import a person.

## Using the list

The list is on the person's own private page, under their name. The heading shows how many callers are waiting.

Callers are grouped in this order:

1. **Waiting for a call back**: the person who has waited longest is first.
2. **Follow-ups**: callbacks set for a later date. A follow-up that is due today or overdue is marked **Due**.
3. **Returned**: callers someone has already called back.
4. **Closed**: callbacks marked Done or Not a lead, and ones that expired after 16 weeks.

Each row shows the caller's name and number, their status, how long they have been waiting (or when they first got in touch), any follow-up date and who it belongs to, who closed it and when, the last time someone called them back and how that call went, and, for people who can open the Leads screen, an **Open lead** link to the lead there. When the person's phone and email are on two different RingTonic contacts, the row also says **RingTonic: this person's phone and email are on two different contacts. Merge them in RingTonic.** until someone marks them merged on the lead ([RingTonic](../integrations/ringtonic#create-contacts-from-form-submissions)).

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

- A new call from someone whose callback is Done, Returned or Expired puts them back in the waiting list automatically. A form submission does not.
- The list shows up to 200 waiting callbacks and the 200 most recently closed ones.
