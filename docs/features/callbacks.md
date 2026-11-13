---
sidebar_position: 17
title: Callbacks
description: A list on each person's private page of the callers waiting for a call back, with Call, Done, Not a lead and Reopen, an AI read of every call, an optional AI deal summary of each caller, and a setting that decides who sees it.
---

# Callbacks

When someone calls or fills in a form and is waiting for a call back, Lead Attribution keeps one **callback** for that person, however many times they get in touch. The **Callbacks** list on a person's private page shows everyone still waiting, so your team can work through them and mark each one when it is handled.

## Before you start

To turn all of this on, follow the ordered checklist in [Turn on callbacks and calling](callbacks-setup).

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

1. **Callbacks**: the callers still waiting for a call back. The person who has waited longest is first.
2. **Follow-ups**: callbacks set for a later date. A follow-up that is due today or overdue is marked **Due**.
3. **Returned**: callers someone has already called back.
4. **Closed**: callbacks marked Done or Not a lead, and ones that expired after 16 weeks.

Each row shows the caller's name and number (when no one has named the caller yet, a row can show a name from caller ID or from RingTonic with a small orange **Unverified** tag, or **Unknown caller**; a named caller shows a small green **Confirmed** tag; see [Caller ID name](#caller-id-name)), their status, how long they have been waiting (or when they first got in touch), any follow-up date and who it belongs to, who closed it and when, the last time someone called them back and how that call went, the **best time to call** and an **office number** when the person gave them on the form (for example "Best time to call: Weekdays after 3pm" and "Office (212) 555-0187"), and, for people who can open the Leads screen, an **Open in admin** link that opens the lead there in a new window, so the portal stays open. When the person's phone and email are on two different RingTonic contacts, the row also says **RingTonic: this person's phone and email are on two different contacts. Merge them in RingTonic.** until someone marks them merged on the lead ([RingTonic](../integrations/ringtonic#create-contacts-from-form-submissions)).

The best time to call and the office number come from the caller's most recent form submission, so they follow the same rule as the name and number: they show only while Lead Attribution stores contact details in **Full**, and disappear from the list when it is set to Masked or Off. Nothing is shown when the caller left them blank, and an office number that is the same as the main number is not repeated. Very long answers are shortened, and a long web address in an answer wraps inside the row instead of stretching it.

The office number comes from the form's office phone mapping. The best time to call needs a custom field named **Best time to call** in the **Form field mapping** card (**Leads → Settings**): add it under **Custom fields** and pick the form field that holds the answer ([Map any form field](lead-attribution#map-any-form-field-custom-fields)). Without that custom field the row has nothing to show, even though the answer may still be sent to RingTonic.

### Call a lead back

People with **Call** access see a **Call** button on every row that is not closed. Press it and a short question opens under the row, for example: "Call (917) 434-7322 from (866) 994-8556? RingTonic rings you on your phone, then connects the lead." Press **Call** there to place the call, or **Cancel**. Nothing is dialed until you confirm.

RingTonic then rings your phone. Before you press 1 it tells you who the call is for: by default the site name and the word callback, then the reason (for example "Example Co callback. Call back"). An admin can change these words, drop the site name, or send no announcement at all under **Call announcement** ([setup](callbacks-setup)). RingTonic may still say its own words around the caller's name. Answer it and press 1 when RingTonic asks, and it connects you to the lead. A **Call notes** panel opens on the row and says "Calling… RingTonic is ringing your phone" (see [Write your call note](#write-your-call-note)). The callback's status changes only when RingTonic reports how the call went (see the table below): a call answered for 30 seconds or more marks it **Returned**.

**While you are calling a lead, nobody else can work it.** The row shows "You're calling — since 4:02 pm" to you, and "Jo Smith is calling — since 4:02 pm" to everyone else, whose buttons on that row are locked. The lock ends by itself when RingTonic reports the end of the call, when you press **Release**, when you mark the callback Done or Not a lead, or after 15 minutes at the latest (an admin can change the length). Pressing Done, Not a lead or Reopen never locks a row. The list checks for locks once a minute while it is open.

The Call button is grayed out, with the reason at the top of the list, until your site is ready to place calls: an admin has to add the RingTonic calls key, set up RingTonic live notifications and set a verified caller ID (see [RingTonic click-to-call](../integrations/ringtonic#5-click-to-call-the-calls-key-and-caller-id-set-up-by-your-hub-operator)). Calls also need contact details stored in **Full**, because the whole number is needed.

**Limits.** To keep calls under control, each person can place 20 calls a day and the whole site 60 a day, no more than 8 a minute across the site (RingTonic allows 10), and one lead can be called at most 3 times an hour and 10 times a day, whoever calls. The daily counts start again at midnight in your site's time zone. An admin can change all of them on **Leads → Settings → RingTonic → Click-to-call → Call limits**. When a limit is reached, the call is not placed and the row says which limit it was.

**Calls your site places itself.** If your site has a Call button outside the portal, such as in its lead emails, and it tells SyteOps about each call it places (see [Sites with their own Call buttons](callbacks-setup#sites-with-their-own-call-buttons)), that call locks the callback for the person who placed it, just like a call from this list, and counts toward the same limits. A call like that is never stopped by a limit, because it has already been placed; once a limit is used up, the Call button here stops placing calls until it resets. If someone else is already calling that lead, their lock stays.

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

### Write your call note

A call from the portal is not recorded the way an incoming call is, so what you type during the call is the record of it. When you press **Call**, a **Call notes** panel opens on the row, with the cursor already in the note box:

- It shows when the call was placed (in your site's time) and **Request callbacks at**, the number to give the lead if they want to call back, with a **Copy** button. Your admin sets that number under **Callback number to give** ([setup](callbacks-setup)); without one, the panel shows the number the lead dialed.
- **Call note (required)** is a box that saves itself as you type, even while you are still on the call. Only your team sees it. It stays on your site and is never sent to RingTonic.
- **End call** closes the "calling" message when the call is over. It does not hang up, save, close or delete anything, and your note stays right where it is.

The panel stays on the row as **Add your call note**, and the row shows a small **Note needed** tag, until you have saved a note with some words in it. A blank or cleared note does not count. When a note is saved the panel says **Call note saved**; press **Close** to put it away. A row that is waiting for a note stays in its list and is never hidden by a filter until the note is saved.

#### Say how the call went

Under the note box are five result buttons. Each one saves your note first, then records what the call was, and then puts the call prompt away:

- **Spoke with them** and **Left voicemail** need a few words in the note (at least two letters or digits) so the record says what was said. If the note is too short, the panel asks for a few words and nothing is sent.
- **No answer** and **Wrong number** fill in an empty note with those words, so the note is never saved blank. You can change the words, and anything you already typed is kept as it is.
- **Follow up** puts the callback on hold until a day you choose, and needs a few words in the note too (see the next section).
- **Done** and **Not a lead** work the same way while the call panel is open: they save your note first (Not a lead fills in an empty note with "Not a lead"), then close the callback as before. Done needs a few words in the note.

Spoke with them, Left voicemail, No answer and Wrong number do not change the callback's status. It stays open, so you decide the next step. Pressing a result button twice, or pressing it again after a bad connection, never records the result twice. While a result is being saved, the result buttons are off.

If the callback could not be closed or moved (someone else is calling the lead, for example), your note is still saved, the call prompt stays, and a **Try again** button appears. Pressing the same button again does the same thing as Try again, and still records the result once. While a result is waiting like this, a different result button asks you to finish the first one before it does anything, so a call never ends up with two results.

While the note box shows a notice about words that were kept (after a reload, a teammate's change, or a note that is too long), the result buttons, Done and Not a lead stay off, and pressing one of them tells you to restore, copy or discard the kept words first. Nothing is sent and the note box is not touched. A note that was too long to save is kept in the box, and the result buttons come back as soon as you shorten it. If a result press could not save the note, a No answer or Wrong number the box still holds is not counted as your own words: Spoke with them then asks for a few words. If your teammate changed the same note while you were writing, you see the same **Keep both**, **Use mine** and **Use theirs** choices as for any note, the result is not recorded, and you press the result again after choosing. The result you pressed is a staff record only: it is not shown in emails, exports or the deal summary.

#### Follow up on a day you choose

Press **Follow up** when the caller asked to be called on a later day. If the note is too short, the panel asks for a few words first and nothing opens. Otherwise a small step opens where the buttons were:

- **Tomorrow**, **In 3 days** and **Next week** fill in the date for you. **Pick a date** takes you to the date field to choose any day. The days count from today in your site's time zone, which can differ from the clock on your own computer.
- You can choose today or any day up to 180 days ahead, the same range the AI uses. Another day shows a short message in the step and nothing is sent.
- **Save follow-up** saves your note first, records the result once, and moves the callback to **Follow-ups** with that date. **Cancel** (or the Escape key) closes the step and puts you back on the buttons with your note exactly as it was.

If the callback is already a follow-up, choosing a new day moves it to that day. If the answer is lost or the callback could not be moved, a **Try again** button appears and sends the same day again, so a follow-up is never recorded twice and the day you chose never changes. If you reload the page before the answer arrives, the page remembers the request for up to 24 hours and shows the same day when you press **Follow up** again: the step opens with that day fixed and a **Send follow-up again** button, and nothing is sent until you press it.

On the day itself the follow-up reminder email (when your admin has turned it on) goes to the person who last called the lead, as for any follow-up.

If the call never connected (nobody answered, or it never rang), press **Didn't connect** instead of writing a note. That button is not offered while the note box has words in it, while a note is still saving, or while the box shows a **Restore**, **Copy** or **Discard** offer for text kept from before a reload: answer the offer first. **Close** waits for the same reason. If you do write a note on a call you marked as not connected, the note is kept and the call counts as a call again.

If you reload the page or come back later, the row still shows **Note needed**, and a line above the list says **Call notes owed** with a number. Press it to open the first row that needs a note, and the note box comes back with anything you had typed. Words you typed that were not saved yet are kept in your browser until they are. If the lead panel cannot be loaded (the site is slow or the lead was removed), the note boxes still appear, so you can always write the note; if the lead was removed while you were typing in its note box, the note is still saved to the call. When more calls are waiting than the page marks at once, the number carries a plus sign (for example **Call notes owed: 12+**) and the line beside it asks you to start with the oldest.

On a phone the panel is the first thing on the row, so the note box is on screen as soon as you call.

### Monday callbacks list

Every Monday at 8:00 am (your site's time; if the site was unable to send it then, it goes out as soon as it can, and a missed Monday is made up later that week), the people you list get one email with the week in front of them. Nobody is listed until you add them.

- **Last mention**: callbacks in their 16th week. If nobody returns or closes them, they expire after this email.
- **Callbacks still waiting**: oldest first, each with how many weeks it has been waiting. A callback stays on the list, week after week, until someone returns it or closes it.
- **Follow-ups due or overdue**: the follow-ups due this week, and any that are late.
- **Returned last week**, **Closed last week** (including the ones the AI closed, each with Reopen) and **Called in last week**.

At 16 weeks a callback gets one last mention and then expires. It expires only after an email that named it went out: if the Monday email of its last week could not be sent, the next one names it as its last mention and it expires after that. It then leaves the waiting list and shows as Expired under Closed. Reopen it, or a new call from the same number, starts its 16 weeks again. Nothing expires while nobody is listed for the email, because the Monday list carries the last mention; with a list set, a callback in its last week also says when it expires on its row in the portal. A new call or form from the same number counts as hearing from them again, so their 16 weeks restart.

**Settings** (an admin, on **Leads → Settings → RingTonic → Monday callbacks list**): **Send the Monday list to slots**, for example `001, 003`. This list is separate from the call summary emails. The email goes to whoever holds each slot on Monday, and only while they have Callbacks access of View and act or Call. This list replaces a site's own weekly callbacks report, so turn that report off in the same step you set the slots; it does not replace lead notification emails, inbound call alerts or missed-call alerts, which stay on. To compare first, list one slot and run both for a week or two (see [Switching over from a site's own report](callbacks-setup#switching-over-from-a-sites-own-report)). The email's subject reads like **Callbacks This Week: 4 Waiting, 2 Follow-Ups**.

With contact details stored in full, the email shows names and numbers and the Done, Not a lead, Call again and Reopen buttons. With Masked it shows masked names and numbers and one **Open your page** link. With Off it shows counts only. It never includes a call transcript.

### Open a callback from an email

**Call** in a callback email places the call right away: tap it and a small page opens that says "Calling. Your phone will ring: press 1 to connect." RingTonic rings your phone first, and pressing 1 connects you to the lead, so that is your confirmation. The call is the same as one from the portal's Call button: it locks the callback for you, counts toward the same limits and is logged to the lead with its summary and recording. You must be signed in with Call access; if you are not signed in, the page asks you to sign in and then places the call. Tapping Call again within a minute does not place a second call. If the number is not on your callbacks list yet, nothing is called and the page says so. While your site cannot place calls yet, Call opens your page instead, like the other buttons.

The other buttons in a callback email, such as the call summary email below, open your private page at the right row: the page scrolls to it, highlights it and opens the same question the row's button opens. Nothing happens until you confirm. If someone else is calling that lead, the page says who and since when, and opens nothing. If the callback is no longer waiting, the page says "This callback is no longer waiting."

### Call summary emails

Each callback a person places can be emailed to the people you choose, once the call has a transcript. In **Leads → Settings → RingTonic → Call summary email**, list their Users slot numbers (for example `001, 003`). **Off until recipients are set.** This email replaces a per-callback summary email the site sends from its own code, if it has one; turn that one off when you list slots, or people will get two. It does not replace lead notification emails, inbound call alerts or missed-call alerts, which stay on.

Each person in a listed slot gets one email per callback (once the AI has read it, when AI reads are on). The subject reads like **Callback by Todd: Jane Roe (4 min)**, and the email's heading says **Call Summary**. Calls the lead made to you do not send this email. Inside:

- who called, or who you called, and what happened: answered, no answer, how long, when, and who placed it;
- the summary RingTonic wrote, and what the AI did with the call: closed the callback, marked it returned, reopened it, suggested a change, or left it alone;
- the next step and follow-up date, when the call needs another call;
- the callback's status and any follow-up date;
- buttons (when contact details are stored in full) that fit the callback: **Call again** (only for people with Call access), **Done** and **Not a lead** on a waiting callback, **Reopen** on a closed one.

When the AI closed the callback, the top of the email says so, with its reason and how sure it was, and offers **Reopen**.

**Call again** places the call right away (see [Open a callback from an email](#open-a-callback-from-an-email)). The other buttons open your own page at that callback and ask you to confirm; nothing changes from the email itself, and a callback someone else is calling stays locked. A person only gets the email while their slot has Callbacks access of View and act or Call. The email never contains the transcript or the words the AI quoted. Under **Masked** it shows the masked number only, with no name, summary or AI reason, and under **Off** no number either. In both, the buttons are replaced by one **Open your page** link, because the page only acts on a callback while contact details are stored in full.

### Your branding in these emails

The call summary, the follow-up reminder and the Monday list use your General → Branding settings: your company logo, your company name and your brand color for the buttons. Your site's developer can also set the logo size, colors, font and footer line for these three emails, or hide the plugin's own footer.

### Follow-up reminders

When a callback has a follow-up date, the person who last called that lead can get one reminder email on the day, at about 7:30 am in your site's time zone. **Off by default.** Turn it on in **Leads → Settings → RingTonic → Follow-up reminders**. The subject reads **Follow Up Today: Jane Roe**, or **Follow Up: Jane Roe (Was Due 2026-10-23)** when it reaches you late.

Inside:

- the lead, the follow-up date and how long they have been waiting;
- the summary of the last call and the next step, when the AI saw that another call is needed;
- buttons (when contact details are stored in full): **Call** (only for people with Call access), **Done** and **Not a lead**. Call places the call right away; Done and Not a lead open your own page at that callback and ask you to confirm, and nothing changes from the email itself.

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

- **Call back number** (when contact details are stored in **Full**): the business number the caller first dialed, written out so you can read it aloud, with a **Copy** button. It comes from the caller's most recent call that recorded it. A caller whose calls were all before this feature shows it after their next call.
- **The top**: the person's name, the lead's status, the callback's status, any follow-up date and owner, and who returned or closed it and when. When the lead may be a duplicate in RingTonic, it says so.
- **Contact**: phone, office phone, email, company and note. Under **Full**, a phone number or email is a link you can tap to call or write. Under **Masked** the details are shown as hidden text with no links (no company or note), and under **Off** there is no contact section. When the lead called in, **Caller ID name (carrier)** shows the name the phone carrier gives for the number (see [Caller ID name](#caller-id-name)).
- **From RingTonic**: the contact as RingTonic holds it right now (name, email, phone, company, stage and tags). If RingTonic can't be read with your site's key, it says "RingTonic details unavailable" and the rest of the panel works as usual.
- **Where they came from**: the source, the campaign, when they first got in touch (in your site's time zone), the page they landed on (a link that opens in a new window when the page is on your own site, plain text otherwise), and tags such as the UTM details as small chips.
- **Form answers** and the **RingTonic** details that came with the lead.
- **Calls**: a record of every call, starting with a line such as "5 calls on record · newest first". Each call is a card that shows whether it was outgoing or incoming, how it went in plain words, how long it lasted, the full date and time, who placed it ("Placed by Kai", "Placed in RingTonic" or "Called in"), whether RingTonic has a recording (the recording stays in RingTonic), and how confident the transcription is. The full transcript is tucked behind **Show transcript** and scrolls inside its own box. Open it and RingTonic's AI summary is the first thing you see, labeled **AI summary**, above what was said; a call that has a summary but no transcript shows the summary on the card itself. When the transcript has speaker labels, each turn is its own block with the speaker named (Agent, Customer or Caller). Only the newest five transcripts load with the panel; on an older call, press **Load transcript** to read it, with the AI summary on top (if that fails, press **Retry**). A call that has not had its transcript delivered yet says "Transcript not received yet" for up to two days, and "No transcript for this call" after that. Summaries and transcripts are kept with the callback while contact details are stored in **Full**, and are removed with it.

The lead loads once when you first open it and is remembered until you reload the page, and after you press Done, Not a lead or Reopen on that row it loads fresh the next time. If it cannot load, the panel says so and offers **Retry**. If your sign-in has expired it asks you to reload the page instead. If the lead has been deleted, it says "This lead isn't available."

Anyone who sees the Callbacks list can open this panel. People who can also open the Leads screen get a small **Open in admin** link inside it, which opens in a new window.

### Edit a contact

While contact details are stored in **Full**, anyone who can act on callbacks sees **Edit contact** in the panel's Contact section. It opens a short form right in the panel: first name, last name, company, email, office phone and a note. The phone number the callback belongs to is shown but can't be changed, because the callback is tied to it.

The form starts from the most current details: opening it reads the lead again, and only the fields you change are saved. Nothing is saved until you select **Save contact**: typing, or moving between fields, sends nothing, so a half-typed email never reaches RingTonic or your webhooks. Where RingTonic holds a newer value than the site (someone edited the contact in RingTonic), that value is filled in and marked **From RingTonic**. A value someone on your team typed on the site is always kept as it is.

If a teammate changed the same field after you opened the form, SyteOps does not overwrite it. The fields nobody else touched are saved, and the one that clashed shows their version next to yours with two choices. **Keep mine** saves your text over theirs, now that you have seen it. **Use theirs** puts their value in the field and keeps your text just below it, with a **Copy** button, until you dismiss it. The form stays open until you have chosen. If a save is sent twice, for example because the connection dropped before the answer came back, the second one changes nothing.

If someone else's call or a newer form submission means the callback now shows a different lead, nothing is saved. The form stays open with everything you typed, and **Reload the lead** opens the new lead's form with your text still in the fields, ready for you to check and save.

Select **Save contact** and the change is saved everywhere at once:

- the lead in SyteOps, and the name on the callback;
- the contact in RingTonic, a moment later, in the background. If the phone and the email belong to two different RingTonic contacts, the phone's contact is updated and the lead is flagged so someone can merge the two in RingTonic;
- your **Automation webhook** and **CRM webhook**, but only one that already received this lead (the Automation webhook when the lead was sent there and its goal still sends to automation; the CRM webhook when the lead was qualified and sent there). Each receives the lead again in the same shape as before, marked `contact_updated`, so your automation can match it to the record it holds;
- the callback's history, which records who edited the contact and which fields changed (never the values).

An email must be a real address and a phone number must be dialable with its area code; the form points to any field that needs fixing and keeps everything you typed. While someone else is calling the lead, or a call to it is being placed, **Edit contact** is off and says why, the same as the other buttons on the row. When you are the one holding the call, **Edit contact** stays on, so you can fix the lead's details during the call. Press Escape or **Cancel** to close the form without saving. If the form holds text that nothing else has kept (a browser that refuses to store it, for example), it lists the text with a **Copy** button and closes only when you choose **Close anyway**. Right after a save, the **From RingTonic** section says RingTonic is being updated until the change has reached it.

A value a person saves here is final: later automatic fills (from a call transcript, for example) only fill fields that are empty and never replace what a person typed.

### Team notes

Each call in the lead panel has a **Team note** box under it, and the caller has one more note, the **General note about this caller**, pinned in its own section right after Contact. Use a call's Team note for what happened on that call ("Wants a quote before Friday") and the General note for what every teammate should know about the person ("Prefers text messages").

- Type in the box. It saves by itself a moment after you stop typing and when you click out of it, and it says **Saving** and then **Saved**, with who saved it last and when. There is no Save button to forget.
- A note can be up to 2,000 characters, and a counter under the box shows how many you have used. Past the limit nothing is sent, and the box says by how many characters to shorten it. A note is plain text, kept exactly as you typed it, so an email address in angle brackets or a bit of code is saved and shown as written. Long words wrap, and the box grows with your text and then scrolls.
- If a note can't be saved (your connection dropped, for example), the box says so, keeps what you typed and shows **Retry**. Clicking away from the box does not send it again, so **Retry** stays where you can press it. If your sign-in has expired it asks you to reload the page.
- Press Escape to leave the box. Your text is saved first, and the panel stays open. Press Escape again to close the panel.
- Emptying a box and leaving it clears the note. Earlier versions of a note are kept in the site's history but are not shown.
- The box shows who saved the note last and when. If two people edit the same note at the same time, nothing is overwritten: see **When two people edit the same note** below.
- Each note keeps its 100 most recent saves as history, and older ones are dropped. Every box is named for its caller or call (for example "Team note for Jane Roe"), so a screen reader tells them apart. The caller's name there is always the one the list shows: a guess from caller ID reads "Unverified Smith John A", and a caller shown as Unknown caller or Name hidden is named by their phone number (as masked on your site) instead of a name.
- Anyone who can open the panel can read the notes. Only people who can act on callbacks can write them; everyone else sees the text without a box.

Team notes stay on your site and are for your team only. They are not written to the REST log either. They are different from the **Note** in the Contact section, which is the contact's own note and is sent to RingTonic. A team note is never sent to RingTonic, never put in an email, the CSV export or a webhook, and is not available through the API. Notes are kept only while contact details are stored in **Full**. Under **Masked** or **Off** the boxes are not shown and nothing can be saved. A note is removed when the lead behind the callback is permanently deleted, and with the plugin's data when you uninstall it. The delete preview lists them as "team notes".

### Notes kept safe while you work

A team note or a contact edit is protected while you work, so a closed tab, a dropped connection or an expired sign-in doesn't lose what you typed.

- As you type, a copy of the text is kept on this device until it is saved.
- A save that fails retries on its own, and again when the connection comes back. The note shows **Saved**, **Saving**, **Offline**, **retrying** or **Needs attention**. **Needs attention** means it could not be saved and needs your look: keep the text, then press **Retry** or reload the page.
- After a reload, if kept text was never saved, the panel offers it with **Restore**, **Copy** and **Discard**. **Restore** brings the kept text back and keeps what is already in the box, so nothing is lost either way.
- Kept text is removed as soon as it is saved. Text still unsent after 14 days is removed too. From day 7 the box warns you and offers **Copy**, so you can keep the text elsewhere first. **Clear saved drafts on this device** removes everything kept on this device.
- The card no longer redraws over text you have not saved, so what you are typing stays put. Saving a contact redraws only the contact section.
- A note over 2,000 characters shows a counter, a clear "too long" message and a **Copy** button instead of failing silently, so you can keep the text and shorten it.
- An expired sign-in is refreshed automatically, but only for the same person.

### When two people edit the same note

If you and a teammate (or you in two browser tabs) change the same note at the same time, SyteOps no longer lets one save overwrite the other. A note saved from an out-of-date copy is refused, and a screen shows the other text next to yours, with who saved it and when. Choose one of three ways forward:

- **Keep both** is the default. It merges the two texts into one note, so nothing is lost.
- **Use mine** keeps your text. It asks you to confirm first, and it keeps a copy of their text so it can still be found.
- **Use theirs** takes their text. It keeps a copy of yours.

When you each only added something to the note, the two additions are merged automatically and you don't see the screen at all. If a save went through but its reply was lost on the way back (a dropped connection, for example), SyteOps recognizes the note as your own and doesn't treat it as a conflict.

### Notes during a call

A call you place is recorded the moment you press **Call**, before the request goes to RingTonic. That means the note you type during the call is saved against that call straight away. It appears in the lead's call history and feeds the AI deal summary, even if the phone system never reports the call back to your site.

- While you hold a call, you can keep editing the lead's contact details. Other people still cannot act on that lead until your call ends or you press **Release**.
- A call that never connected is labeled **Call attempt, outcome unknown**, so it is clear nothing is known about how it went. Its note, if you wrote one, is kept with it.
- SyteOps remembers which of your calls still need a note, so a call you placed and never wrote up is not forgotten.

### Deal summary

When an admin turns it on, the top of each caller's panel shows a **Deal summary** written by AI: one line on where the deal stands now, a dated **Timeline** of what happened on each call, and a **Waiting now** list of what is waiting and on whom. Under it, a line says how old it is and how many calls it is based on ("Updated 3 hours ago, based on 6 calls"). It is labeled **AI-generated · team only**. Click its heading to fold it away.

- It is written from everything on record for that caller: each call's date and how it ended, RingTonic's summary and the transcript, the caller's names and where each one came from (a carrier caller ID name, or a name from RingTonic that nobody has confirmed, counts only as "unverified"), the callback's status and how long it has been waiting, and every team note, on each call and pinned. Your team's notes are always sent in full, never shortened.
- Once a caller has two calls on record, the summary updates by itself about five minutes after a new call (a missed call too), a change of name or contact, or a status change (including a callback marked returned by a call or expired after 16 weeks), so a busy afternoon of changes makes one update, not many. A caller who already has a summary keeps being updated. A caller with only one call and no summary yet gets theirs after a second call, or when you press **Refresh**. A team note does not start an update on its own; it goes into the next summary that is written. While an update is on its way the panel says so under the summary you are reading.
- When a summary is **Out of date**, the panel shows a small marker: a note, a name, the status or a call has changed since it was written. **Add to summary** appears next to the notes whenever a summary exists and a note or another change is not in it yet. It brings the summary up to date exactly as **Refresh** does, with the same one-a-minute and daily limits.
- **Refresh** writes it again right away, even if nothing changed: the panel says it is writing a new summary and shows it as soon as it is ready, usually within a minute. One refresh per caller a minute; a second press within the minute says how long to wait. Pressing Refresh while an update is already running gets you one more update right after it.
- If a call or a note seems to speak to the AI ("ignore your instructions", for example), the summary says to read the calls before relying on it. The summary only describes; it never changes the callback.
- A caller can have a summary as soon as there is anything on record: a call you received (even one with no recording or outcome, which the summary describes only as "the caller phoned in"), a form they sent (only the date; the summary never sees what the form said), a call you placed, or a team note. A caller with none of these has nothing to summarize: the panel says **Nothing to summarize yet. There is no call, form entry or note for this caller. Add a team note and press Refresh, or wait: a summary is written automatically once there are two calls.**
- The panel keeps itself current: while a summary is being written it appears as soon as it is ready, with no reload and no Refresh, and when you reopen a caller whose summary was still being written, or had none yet, it checks again. If the summary has not appeared after about three minutes, the panel says it is still being written and asks you to press Refresh only if it does not appear.
- The panel says plainly when there is no summary yet, when the AI could not write one (it tries again by itself a few times), when today's limit of AI summaries is reached, and when it is not set up yet.

**Settings** (an admin, on **Leads → Settings → RingTonic → AI deal summary**): a switch, **off** by default, and **AI summary requests per site per day** (50 by default; 0 stops new summaries). A summary is usually one request; for a caller with a long history, each call (or each part of a very long call) takes one more request first, and every request counts toward the limit. Those first steps are kept as they are done, so a later update only pays for new calls, and one update never uses more than half the daily limit (at most 25 requests); a very long history finishes over a few updates. The count starts again at midnight in your site's time zone. Turning it off hides the summary and stops all spending at once, even in the middle of an update.

**Where your call content goes.** Turning this on sends each caller's call transcripts, RingTonic summaries and team notes to the AI provider and model chosen in the **AI mapping** card, the same provider the AI read of each call uses. It needs that provider, a model and its key, and contact details stored in **Full**; until then the card says what is missing and links to the AI settings. The summary stays on your site and is for your team only: it is never put in an email, the CSV export or a webhook, is not available through the API, and is not written to the REST log. It is removed when the lead behind the callback is permanently deleted, and with the plugin's data when you uninstall it. When you switch contact details to **Masked** or **Off**, every summary is deleted. When a lead is deleted but another lead still uses the same phone number, that caller's summary is deleted and written again without the deleted lead's name and details; the calls and team notes on that number stay, because they belong to the caller.

### Caller ID name

When a lead calls in, the phone carrier can send a short caller-ID name for the number, such as "Marriott Intl". The panel shows it as **Caller ID name (carrier)**. It is kept only while contact details are stored in **Full**, the first one received is kept, and generic names such as "Wireless Caller", "Unknown", "Private" or a city and state are left out. It is shown as a clue only: it is never copied into the contact's name or company.

On the Callbacks list, a row that nobody has named yet shows a name in a lighter weight with a small orange **Unverified** tag after it (for example Smith John A with the tag), so it never looks like a confirmed name. **Unverified** means a name from the carrier's caller ID, or a name from RingTonic's own contact data, that nobody on your team has confirmed. When both exist, the carrier's name is the one shown. A name your team entered in **Edit contact** is never marked Unverified. Once the caller has a name, a small green **Confirmed** tag follows it instead. **Unknown caller** and **Name hidden** carry no tag, and the words on the tags say the same thing as their colors. A caller with no name at all reads **Unknown caller**. Press **Confirm name** next to a Unverified name to open **Edit contact** with the first and last name already filled in from it. SyteOps puts the last word of the caller-ID name in Last name and everything before it in First name. Carriers often send the last name first, so check the two fields and fix them before you save. Nothing is saved until you press **Save contact**. **Confirm** appears only for people who can edit contacts. The order is kept as the carrier sent it and only the capital letters are fixed (a name such as MCDONALD JAMES reads McDonald James). It appears only while contact details are stored in **Full**; under **Masked** or **Off** the row keeps **Name hidden** and never shows a carrier name. The lead panel's **Caller ID name (carrier)** shows the same tidied-up name. As soon as someone names the caller, by a form, by **Edit contact** or by the AI read, that name replaces it. The "Unverified" name is not used in the call or on the one-tap Call page. The callback summary email and the Monday list do show it, marked as "(unverified)" (see below).

When a caller reaches you through RingTonic and the lead has no name yet, SyteOps fills in the name from the caller's RingTonic contact the first time you open that caller in the portal. It shows as a **Unverified** name until your team confirms it with **Confirm name**. The fill never replaces a name you already have, never adds an email address or phone number, never sends a name back to RingTonic, and does nothing unless contact details are stored in **Full**. Placeholder names such as an email address, a number, or the word "unknown" are ignored. In the callback summary email (heading and subject line), the Monday list and the follow-up reminder, a name nobody has confirmed reads like "Jane Roe (unverified)", whether it came from the RingTonic fill or from the AI. Once the name is confirmed, the marker goes away. A form opened before the fill may show a "changed since you opened it" message once; nothing is lost.

### Calls from the caller

When a caller rings your RingTonic number again, the callback records that call too, with how it went, how long it lasted, whether there is a recording and, while contact details are stored in **Full**, RingTonic's AI summary and transcript. The row's last call then reads, for example, "Called in Oct 24, 2:30 pm · Answered · 5:00" or "Called in Oct 24, 2:30 pm · Missed".

#### Hung up and Voicemail, no message

RingTonic calls a call "Answered" whenever something picks up the line, even a phone menu or a voicemail in front of your team. So a caller who hangs up in the menu, or who reaches the voicemail and says nothing, would look answered. While contact details are stored in **Full**, the row says what happened instead. It shows a small label next to the status and words the last call the same way:

| What the row says | What happened |
|---|---|
| **Hung up** | The call was missed, it was picked up but lasted less than the number of seconds you set (30 by default), or it lasted longer but the transcript shows only your phone menu (the greeting, "press 1", a name directory) and the caller never got through to a person. |
| **Voicemail, no message** | The call lasted at least that long, the transcript shows the caller reached a voicemail prompt such as "please leave a message", and the caller said nothing at all that counts as a message. A lone "thank you" or "okay" does not count. |
| **Answered · 5:00** | Anything else: a real conversation, a message the caller left, or a call whose transcript has not arrived yet. Once it arrives, the row may change to **Voicemail, no message**. |

- The labels are cautious on purpose. If the caller said anything real, at any point in the call, or the transcript is cut off, unlabeled or unclear, the row keeps **Answered**. A missing label is harmless; a real message hidden as "no message" is not.
- **Voicemail, no message** is tuned to how a typical business phone-system voicemail sounds in a transcript: the greeting and menu, then "please leave a message", and often a spoken menu about reviewing, sending or re-recording the voicemail that plays when the caller stays silent. A recording notice read out at the start ("this call is being recorded") is not counted as the caller speaking. A name, a few words, or any short reply other than a brief filler such as hello, yes, okay or thank you counts as a message, even a very short one, in any language.
- A long call counts as hung up in the menu only when the caller said nothing that counts and every sentence the phone system said is menu wording ("press 1 for sales", "no matches found", the automated "thank you for calling" greeting followed by the menu). Even one short extra word from a person, such as "Hi" or a name, keeps **Answered**, and so does a sentence in which a person introduces themselves ("this is Todd") or that runs past 40 words; so does a greeting with no menu after it. A person who says only menu wording cannot be told apart from the phone system, so that call is still called **Hung up**. There is no setting to turn this off.
- If your phone system words its voicemail prompt or its menu very differently, those calls keep **Answered**.
- A call that really was short, such as a wrong number that lasted 25 seconds, is called **Hung up** even though there is a transcript. Lower the number of seconds if that is too many.
- The label shows only on callers still waiting (**Callbacks** and **Follow-ups**). Once a callback is **Returned** or closed, its row goes back to the plain wording.
- A caller who also filled in a form never gets either label.
- If a caller phoned more than once, a real conversation or a real message on any of the calls means no label. Otherwise the most recent call decides.
- The label is worked out each time the row is shown and is not saved. Change the number and every row follows. The setting is **Count a call as hung up if it is shorter than (seconds)** under **Call labels** in **Leads → Settings → RingTonic**, from 5 to 120 seconds.
- The labels only change the words. They never close, reopen or otherwise move a callback, and the Monday list and the call summary emails are unchanged.
- The lead panel's call list uses the same words for each call. The labels are for **Full** only: under **Masked** or **Off** no new labels appear, and any earlier calls the panel still lists keep their old words.

A call from the caller never marks the callback **Returned** or closes it by its length alone, however long it lasted: talking to someone when they ring in does not always mean their request was handled. The only change the call itself makes is the one in [Good to know](#good-to-know): a callback that was Done, Returned, Expired or Held goes back to the waiting list. What was said on the call is for the AI read (see [What the AI does with each call](#what-the-ai-does-with-each-call)).

These calls are recorded only while contact details are stored in **Full**, and only for callers who already have a callback (a first-time caller gets one from the call itself).

### Calls placed in the RingTonic app

A call someone on your team dials directly in the RingTonic app is recorded like any other call back. RingTonic does not say which team member dialed it, so the lead view shows **Placed in RingTonic** instead of a name.

### What the AI does with each call

When a call has a transcript, outgoing or incoming, an AI reads it once and decides what it means for the callback. It never acts on a hunch:

- **Closing a callback** (the call was returned, the matter is handled, or the caller is not a real lead) happens only when the AI is at least **85% sure** and can quote the transcript word for word to back it up. The row then says, for example, **Closed by AI · The caller says the loan closed · 91%**, with **Reopen** right there.
- **Below that**, nothing changes. The row shows a suggestion instead, for example **AI: looks handled — The caller says the loan closed 72%**, with **Confirm** (which does exactly what the row's **Done** or **Not a lead** button does) and **Dismiss**.
- **Opening a callback again** (the caller still wants a call, or asked to be called on a later date) happens when the AI is at least **60% sure**. The row says **Opened by AI** with the reason, and a follow-up date is set when a day was agreed. Below 60% nothing happens. A callback someone marked **Not a lead** is never reopened by the AI; it suggests a **Reopen** instead.
- **Moving a waiting callback to a later follow-up date** takes it off the waiting list, so it needs the same 85% and the words from the call. Otherwise the row only notes "AI: suggests a follow-up on …". It is a note only: the AI never sets the date for you. To set one, press **Follow up** in the call panel; dismiss the note once it is handled.
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

### Split the waiting list by what happened

When one person returns the callers who hung up or left no message, and others return the callers who left a real message, each of them can show just their share of the list. While contact details are stored in **Full**, a second row of buttons sits beside the group buttons:

| Button | What it shows |
|---|---|
| **All callers** | Every waiting caller. This is the starting point. |
| **Hung up or no message** | Waiting callers whose row says **Hung up** or **Voicemail, no message** (see [Hung up and Voicemail, no message](#hung-up-and-voicemail-no-message)). |
| **Left a message** | Every other waiting caller: a real conversation, a message the caller left, and a call whose transcript has not arrived yet. |

- Each button shows how many callers it holds, for example **Hung up or no message (3)**. These numbers count the callers loaded on the page (the list loads up to 200), so they can be lower than the true total on a very busy site. The numbers on the group buttons are not affected.
- The buttons only narrow **Waiting** and **Follow-ups**. **Returned** and **Closed** callbacks always show, because they are not calls still to be made.
- They work together with the group buttons and **Show closed**. For example, **Waiting** plus **Left a message** shows only the waiting callers who left a message.
- If your choice leaves no waiting caller showing, the page says "No callbacks in this view." instead of silently hiding the lists, even when Returned callbacks are still showing below. Choose another button to see the rest. (With a single group button chosen, that group shows "None right now." instead.)
- The page reads the choice out for screen readers: with **Hung up or no message** or **Left a message** it says how many waiting callers are showing, for example "Showing 4 callbacks to return.", the same number as on the button. With **All callers** it counts every callback showing. Pressing the same button again reads it again.
- Your browser remembers your choice for you, so the list opens the same way next time. Another person's choice on their own computer is theirs alone, and nothing is saved on the site.
- A button in a callback email always takes you to its row. If your remembered choice would hide that row, the page shows **All callers** for that visit, says "Showing all callbacks to show this one.", and your own choice returns the next time.
- Under **Masked** or **Off** there are no outcome labels, so these buttons do not appear.
- When you press **Done**, **Not a lead** or **Reopen**, the numbers update at once, and a reopened callback appears under the button that matches its call.

### A list and a detail side by side

When the **Callbacks** card is wide enough (about 900 pixels or more), it shows two panes. On the left is a list of your callers, in the same groups and order as before: **Waiting**, **Follow-ups**, **Returned** and, with **Show closed** on, **Closed**. Each caller shows their name (or a name from the caller's carrier with a small orange "Unverified" tag, a confirmed name with a small green "Confirmed" tag, or "Unknown caller"), a short time, a small label for what happened (**Hung up**, **Voicemail, no message**, or the caller's status) and the length of the call. On the right is the caller you picked, with the same details and buttons the row always had: **Call**, **Done**, **Not a lead**, **Reopen**, **Edit contact** and the lead's calls with their transcripts.

- **Pick a caller** by clicking them, or with the keyboard: **Up** and **Down** move through the list, **Home** and **End** jump to the first and last caller, and **Enter** or **Space** picks the one you are on. Picking a caller opens their lead details on the right, and a screen reader says who was picked. The first caller is shown when the page opens, without loading their lead until you pick someone.
- The group buttons, the outcome buttons, the **Callbacks** filters in the [section list](review-and-publish-your-post#the-section-list) and **Show closed** all change the list. Your pick stays if that caller is still in the list; if not, the first caller in the list is shown, and your cursor stays where it was.
- A button in a callback email still takes you to that caller's row, picked, with its question open.
- On a phone, a narrow window or a card set to **Half** width, the card keeps the list of rows that open in place, exactly as before.
- With contact details **Masked** or **Off**, the panes show only what the rows already showed: names hidden, no buttons and no outcome labels.

### Mark a callback

- **Done**: you have handled it.
- **Not a lead**: the caller was not a real lead. A new call from that number will not bring it back.
- **Reopen**: on a closed callback, puts it back in the waiting list and starts its 16 weeks again.

By default, Not a lead and Reopen change only the callback. An admin can turn on **Not a lead also marks the lead Unqualified** (Leads, Settings, the RingTonic card, under **Not a lead**; off by default). Then pressing **Not a lead** also moves the caller's most recent lead to **Unqualified**, and when the RingTonic status sync is on, the usual background update tells RingTonic. **Reopen** puts the lead's earlier status back, but only when it is still Unqualified, so a change made by someone else (or by RingTonic) in between is never overwritten. It does nothing to a lead that was already Unqualified, a caller with no lead, or a lead in the trash. Only a person pressing the buttons does this (on the portal, from the email page, or when you press **Confirm** on an AI suggestion): a callback the AI closed by itself, or one that expired, never changes a lead. Turn the setting off and Reopen no longer touches the lead's status.

RingTonic accepts a move back from **Qualified** or **Customer** to **Unqualified** only when its API key is allowed to force stage changes. If the key is not, the lead is still marked Unqualified on your site and RingTonic keeps its earlier stage (see [RingTonic](../integrations/ringtonic)).

The row moves to its new group straight away, and the page records who marked it and when. If someone else already marked it, nothing changes and the row tells you who did it and when, for example "Already marked done by Todd Smith at 2026-10-23 14:05".

## Good to know

- A new call from someone whose callback is Done, Returned, Expired or Held puts them back in the waiting list automatically when the call was missed or lasted under 30 seconds. When your team talked with them, the callback stays as it is and the AI read of that call decides whether it needs another call back. A form submission never moves it.
- The list shows up to 200 waiting callbacks and the 200 most recently closed ones.
- **Scripted setup.** The Lead Attribution settings, a person's people link and the site time zone can also be set through the Manage API (`leads.settings_set`, `leads.people_issue_link`, `site.timezone_set`; see the [API reference](../api/reference/leads)). The RingTonic keys are not: they are entered on the RingTonic card or set from a terminal, never through the API.
