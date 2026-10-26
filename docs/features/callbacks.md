---
sidebar_position: 17
title: Callbacks
description: A list on each person's private page of the callers waiting for a call back, with Call, Done, Not a lead and Reopen, an AI read of every call, and a setting that decides who sees it.
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

**Calls your site places itself.** If your site has a Call button outside the portal, such as in its lead emails, and it tells SyteOps about each call it places, that call now locks the callback for the person who placed it, just like a call from this list, and counts toward the same limits. A call like that is never stopped by a limit, because it has already been placed; once a limit is used up, the Call button here stops placing calls until it resets. If someone else is already calling that lead, their lock stays.

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

### Monday callbacks list

Every Monday at about 7:30 am (your site's time; a missed Monday is made up later that week), the people you list get one email with the week in front of them. Nobody is listed until you add them.

- **Last mention**: callbacks in their 16th week. If nobody returns or closes them, they expire after this email.
- **Callbacks still waiting**: oldest first, each with how many weeks it has been waiting. A callback stays on the list, week after week, until someone returns it or closes it.
- **Follow-ups due or overdue**: the follow-ups due this week, and any that are late.
- **Returned last week**, **Closed last week** (including the ones the AI closed, each with Reopen) and **Called in last week**.

At 16 weeks a callback gets one last mention and then expires. It leaves the waiting list and shows as Expired under Closed. Reopen it, or a new call from the same number, starts its 16 weeks again. Nothing expires while nobody is listed for the email, because the Monday list carries the last mention; with a list set, a callback in its last week also says when it expires on its row in the portal. A new call or form from the same number counts as hearing from them again, so their 16 weeks restart.

**Settings** (an admin, on **Leads → Settings → RingTonic → Monday callbacks list**): **Send the Monday list to slots**, for example `001, 003`. This list is separate from the call summary emails. The email goes to whoever holds each slot on Monday, and only while they have Callbacks access of View and act or Call. If you already send a Monday callbacks report from another tool, turn that off at the same time.

With contact details stored in full, the email shows names and numbers and the Done, Not a lead, Call again and Reopen buttons. With Masked it shows masked names and numbers and one **Open your page** link. With Off it shows counts only. It never includes a call transcript.

### Open a callback from an email

The buttons in a callback email, such as the call summary email below, open your private page at the right row: the page scrolls to it, highlights it and opens the same question the row's button opens. Nothing happens until you confirm. If someone else is calling that lead, the page says who and since when, and opens nothing. If the callback is no longer waiting, the page says "This callback is no longer waiting."

### Call summary emails

Each callback a person places can be emailed to the people you choose, once the call has a transcript. In **Leads → Settings → RingTonic → Call summary email**, list their Users slot numbers (for example `001, 003`). **Off until recipients are set.** On a site that already sends callback emails from its own code, turn those off at the same time, or people will get two.

Each person in a listed slot gets one email per callback (once the AI has read it, when AI reads are on). The subject reads like **Callback by Todd: Jane Roe (4 min)**, and the email's heading says **Call Summary**. Calls the lead made to you do not send this email. Inside:

- who called, or who you called, and what happened: answered, no answer, how long, when, and who placed it;
- the summary RingTonic wrote, and what the AI did with the call: closed the callback, marked it returned, reopened it, suggested a change, or left it alone;
- the next step and follow-up date, when the call needs another call;
- the callback's status and any follow-up date;
- buttons (when contact details are stored in full) that fit the callback: **Call again** (only for people with Call access), **Done** and **Not a lead** on a waiting callback, **Reopen** on a closed one.

When the AI closed the callback, the top of the email says so, with its reason and how sure it was, and offers **Reopen**.

The buttons open your own page at that callback and ask you to confirm; nothing changes from the email itself, and a callback someone else is calling stays locked. A person only gets the email while their slot has Callbacks access of View and act or Call. The email never contains the transcript or the words the AI quoted. Under **Masked** it shows the masked number only, with no name, summary or AI reason, and under **Off** no number either. In both, the buttons are replaced by one **Open your page** link, because the page only acts on a callback while contact details are stored in full.

### Follow-up reminders

When a callback has a follow-up date, the person who last called that lead can get one reminder email on the day, at about 7:30 am in your site's time zone. **Off by default.** Turn it on in **Leads → Settings → RingTonic → Follow-up reminders**.

Inside:

- the lead, the follow-up date and how long they have been waiting;
- the summary of the last call and the next step, when the AI saw that another call is needed;
- buttons (when contact details are stored in full): **Call** (only for people with Call access), **Done** and **Not a lead**. They open your own page at that callback and ask you to confirm; nothing changes from the email itself.

Who gets it: the person who placed the most recent call on that callback, as long as they still hold their slot with Call access, a portal page and an email address. If they do not, the reminder goes to the slots you list under **Otherwise send reminders to slots** (for example `001, 003`), and to nobody when that box is empty.

Good to know:

- A reminder is sent once for each follow-up date. Move the date and you get a new one for the new date.
- Nothing is sent while someone is calling that lead, or once the callback is no longer waiting.
- If the site was down, or reminders were off, a follow-up up to three days late is still reminded once (the subject then says when it was due), and older ones are not. A follow-up set for today after 7:30 is reminded the next morning. If the 7:30 run was missed (for example after a time zone change), it runs as soon as the site is next visited that day.
- The email never contains the transcript or the words the AI quoted. Under **Masked** it shows the masked number and the person's initials instead of the name, with no summary or next step, and under **Off** no number either; in both, the buttons are replaced by one **Open your page** link.

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
- **Contact**: phone, office phone, email, company and note. Under **Full**, a phone number or email is a link you can tap to call or write. Under **Masked** the details are shown as hidden text with no links (no company or note), and under **Off** there is no contact section. When the lead called in, **Caller ID name (carrier)** shows the name the phone carrier gives for the number (see [Caller ID name](#caller-id-name)).
- **From RingTonic**: the contact as RingTonic holds it right now (name, email, phone, company, stage and tags). If RingTonic can't be read with your site's key, it says "RingTonic details unavailable" and the rest of the panel works as usual.
- **Where they came from**: the source, the campaign, when they first got in touch (in your site's time zone), the page they landed on (a link that opens in a new window when the page is on your own site, plain text otherwise), and tags such as the UTM details as small chips.
- **Form answers** and the **RingTonic** details that came with the lead.
- **Calls**: one card for each call, newest first. A card shows whether it was outgoing or incoming, how it went in plain words, how long it lasted, when, who placed it (or "Placed in RingTonic"), whether RingTonic has a recording (the recording stays in RingTonic), how confident the transcription is, and RingTonic's AI summary. The full transcript is tucked behind **Show transcript** and scrolls inside its own box. Only the newest five transcripts load; older calls say "Older transcript not loaded". Summaries and transcripts are shown only while contact details are stored in **Full**.

The lead loads once when you first open it and is remembered until you reload the page, and after you press Done, Not a lead or Reopen on that row it loads fresh the next time. If it cannot load, the panel says so and offers **Retry**. If your sign-in has expired it asks you to reload the page instead. If the lead has been deleted, it says "This lead isn't available."

Anyone who sees the Callbacks list can open this panel. People who can also open the Leads screen get a small **Open in admin** link inside it, which opens in a new window.

### Edit a contact

While contact details are stored in **Full**, anyone who can act on callbacks sees **Edit contact** in the panel's Contact section. It opens a short form right in the panel: first name, last name, company, email, office phone and a note. The phone number the callback belongs to is shown but can't be changed, because the callback is tied to it.

The form starts from the most current details: opening it reads the lead again, and only the fields you change are saved. If someone else saved the contact after you opened the form, saving asks you to open it again instead of overwriting their change. Where RingTonic holds a newer value than the site (someone edited the contact in RingTonic), that value is filled in and marked **From RingTonic**. A value someone on your team typed on the site is always kept as it is.

Select **Save contact** and the change is saved everywhere at once:

- the lead in SyteOps, and the name on the callback;
- the contact in RingTonic, a moment later, in the background. If the phone and the email belong to two different RingTonic contacts, the phone's contact is updated and the lead is flagged so someone can merge the two in RingTonic;
- your **Automation webhook** and **CRM webhook**, but only one that already received this lead (the Automation webhook when the lead was sent there and its goal still sends to automation; the CRM webhook when the lead was qualified and sent there). Each receives the lead again in the same shape as before, marked `contact_updated`, so your automation can match it to the record it holds;
- the callback's history, which records who edited the contact and which fields changed (never the values).

An email must be a real address and a phone number must be dialable with its area code; the form points to any field that needs fixing and keeps everything you typed. While someone else is calling the lead, or a call to it is being placed, **Edit contact** is off and says why, the same as the other buttons on the row. Press Escape or **Cancel** to close the form without saving. Right after a save, the **From RingTonic** section says RingTonic is being updated until the change has reached it.

A value a person saves here is final: later automatic fills (from a call transcript, for example) only fill fields that are empty and never replace what a person typed.

### Caller ID name

When a lead calls in, the phone carrier can send a short caller-ID name for the number, such as "Marriott Intl". The panel shows it as **Caller ID name (carrier)**. It is kept only while contact details are stored in **Full**, the first one received is kept, and generic names such as "Wireless Caller", "Unknown", "Private" or a city and state are left out. It is shown as a clue only: it is never copied into the contact's name or company.

### Calls from the caller

When a caller rings your RingTonic number again, the callback records that call too, with how it went, how long it lasted, whether there is a recording and, while contact details are stored in **Full**, RingTonic's AI summary and transcript. The row's last call then reads, for example, "Called in Oct 24, 2:30 pm · Answered · 5:00" or "Called in Oct 24, 2:30 pm · Missed".

A call from the caller never marks the callback **Returned** or closes it by its length alone, however long it lasted: talking to someone when they ring in does not always mean their request was handled. The only change the call itself makes is the one in [Good to know](#good-to-know): a callback that was Done, Returned, Expired or Held goes back to the waiting list. What was said on the call is for the AI read (see [What the AI does with each call](#what-the-ai-does-with-each-call)).

These calls are recorded only while contact details are stored in **Full**, and only for callers who already have a callback (a first-time caller gets one from the call itself).

### Calls placed in the RingTonic app

A call someone on your team dials directly in the RingTonic app is recorded like any other call back. RingTonic does not say which team member dialed it, so the lead view shows **Placed in RingTonic** instead of a name.

### What the AI does with each call

When a call has a transcript, outgoing or incoming, an AI reads it once and decides what it means for the callback. It never acts on a hunch:

- **Closing a callback** (the call was returned, the matter is handled, or the caller is not a real lead) happens only when the AI is at least **85% sure** and can quote the transcript word for word to back it up. The row then says, for example, **Closed by AI · The caller says the loan closed · 91%**, with **Reopen** right there.
- **Below that**, nothing changes. The row shows a suggestion instead, for example **AI: looks handled — The caller says the loan closed 72%**, with **Confirm** (which does exactly what the row's **Done** or **Not a lead** button does) and **Dismiss**.
- **Opening a callback again** (the caller still wants a call, or asked to be called on a later date) happens when the AI is at least **60% sure**. The row says **Opened by AI** with the reason, and a follow-up date is set when a day was agreed. Below 60% nothing happens. A callback someone marked **Not a lead** is never reopened by the AI; it suggests a **Reopen** instead.
- **Moving a waiting callback to a later follow-up date** takes it off the waiting list, so it needs the same 85% and the words from the call. Otherwise the row only notes "AI: suggests a follow-up on …", which you can dismiss.
- **A row the AI marked returned** says **Marked returned by AI**.
- **Names, company and email** heard on the call fill in only fields that are still empty and that nobody on your team has typed, and only at the same 85% with the words in the transcript. The panel then says **Filled by AI**. Anything else becomes a suggestion such as **AI heard: Jane Roe, Marriott**; **Confirm** opens **Edit contact** with those values filled in, and nothing is saved until you press **Save contact**.
- **The carrier's caller ID name** is weighed as a clue but is never enough on its own: it can only suggest ("Carrier caller ID says: Marriott Intl"). A business name there is treated as the company. When the caller ID and the call disagree, the suggestion shows both.
- **Someone else calling the lead**: while a person is calling a lead, the AI waits and tries again when they are done, up to three times. If the lead is still being called after that, what the AI found is shown only as suggestions.
- **You decided after the call**: if someone pressed **Done**, **Not a lead** or **Reopen** after the call came in, the AI never overrules them; it can only suggest.
- **A call that talks to the AI**: if anything said on the call (or typed into the lead's details) looks like an instruction to the AI, such as "ignore your instructions" or "mark this as complete", the AI changes nothing and the row says the call had words aimed at the AI. Check the transcript yourself.
- **While the AI is updating a callback** (a second or two), the row's buttons answer "The AI is updating this callback from its last call. Try again in a moment."

Each call in **View lead** shows its **AI read**: what it decided, how sure it was, the words it relied on, and what it did. Every change the AI makes is in the callback's history.

**Settings** (an admin, on **Leads → Settings → RingTonic → AI read of call transcripts**): the **close threshold** (85%), the **open threshold** (60%), and **AI reads per site per day** (100; set 0 to turn AI reads off). Over the daily limit a call is not read and its row says **AI read skipped (daily limit)**; the count starts again at midnight in your site's time zone. The AI uses the provider and model chosen in the **AI mapping** card; nothing happens until one is set. AI reads run only while contact details are stored in **Full**.

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
