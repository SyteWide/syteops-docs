---
sidebar_position: 12.5
title: Review & Publish Your Post
description: Open your branded review email, edit the draft in the secure portal, approve it for publishing, and share it with a teammate — all without logging into WordPress directly.
---

# Review & Publish Your Post

When your content source finishes generating a new article, SyteOps sends a branded review email to everyone on the notification list and opens a secure editing portal where reviewers can read, refine, and approve the post before it goes live.

This page explains the full workflow from the moment that email arrives to the moment the post is published.

:::note Part of Content Pipelines
The Review & Publish portal is part of the **Content Pipelines** feature. It becomes available once you have at least one **content source** set up to deliver articles into your site — each incoming article opens as a draft in the secure editor for your team to review before it goes live.
:::

---

## Step 1: You receive a review email

As soon as a new draft arrives from your content source, SyteOps sends a notification email to:

- The **post's author** (the WordPress user the post will be attributed to).
- Anyone listed as a **Default reviewer** or **Default CC reviewer** in your Review Portal settings (see [Who receives the review email](#who-receives-the-review-email) below).

The email comes from your site, uses your site's logo, and includes a summary of the article title and source keyword. At the bottom there are two buttons: **Edit/View this article**, which opens this particular draft, and **See all my reviews**, which opens your full review queue.

---

## Step 2: Open the secure editor and sign in

Click **Edit/View this article** in the email. Your browser opens the Review & Publish portal — a page on your own WordPress site.

**The link alone cannot publish or change anything.** It simply takes you to the portal. To make any edits or approve the post, you must be signed in to your WordPress account.

If you are not already logged in, you will see your site's standard WordPress login screen. Sign in with your normal username and password, and you will be taken straight to the draft.

---

## Step 3: Review and edit the draft

Once you are signed in, the portal shows the full draft. You can edit the core article fields as well as the SEO details, AI visibility settings, and categories and tags.

### Core article fields

| Field | What it is |
|---|---|
| **Title** | The post headline that appears on your site. |
| **Body** | The full article content. |
| **Web address (slug)** | The URL path for the post (e.g. `your-site.com/your-slug`). |
| **Summary (excerpt)** | A short description used in search results and social sharing previews. |

### Formatting and links

The body editor has a formatting toolbar for **bold**, **italic**, **underline**, **headings** (H2/H3), **bulleted** and **numbered** lists, and **block quotes**. It also includes **clear formatting** (removes styling from the selected text) and **undo**/**redo** buttons.

The **link** button (🔗) lets you add a hyperlink, and the **remove-link** button (🔗✕) strips the link from selected text:

1. Select the words you want to turn into a link (or place your cursor where the link should go).
2. Click the **link** button to open the link picker.
3. If your site uses **LinkCentral** to manage links, the picker lists your managed links — start typing in the search box to filter, then click one to insert it. The portal inserts the managed link so clicks are tracked and routed by LinkCentral.
4. To link to any other web address, paste it into the **Or paste a URL** field and click **Insert link**.

To remove a link, select the linked text and click the **remove-link** button. If LinkCentral is not connected on your site, the picker simply shows the paste-a-URL field.

### Featured image

The **Featured image** panel shows the image currently set for the post. If your account can manage media on the site, a **Replace image** button lets you change it in two ways:

- **Paste an image URL** — enter the web address of an image plus alt text, then click **Set from URL**. SyteOps fetches the image, adds it to your media library, and sets it as the featured image.
- **Choose / upload image** — open your site's media library to pick an existing image or upload a new one from your computer, then click **Use this image**.

The preview updates as soon as the new image is set. If your account does not have media-upload permission, the Replace button is disabled and explains that the permission is required.

**Image alt text** describes the image for screen readers and search engines. The **Image alt text** field below the preview is filled in with the current description, and you can edit it at any time — it saves with the rest of your changes. If a featured image is set but has no alt text, you'll be prompted to add it before you can publish.

### SEO — keyword and meta description

The **SEO** panel lets you control how the post appears in Google and other search engines.

- **SEO title** _(shown only when your site uses a supported SEO plugin, such as Squirrly SEO)_ — The search-result headline. It is **auto-generated** from the post title by default; type your own to set a **custom title that overrides** the automatic one. Leaving it as shown (or clearing it) keeps the automatic title, so it stays in sync with how your editors manage SEO in the post itself. When no SEO plugin is active, this field is hidden.
- **Primary keyword** — The main search phrase this article is targeting. Your content source pre-fills this from the keyword used to generate the post. You can change it at any time.
- **Secondary keywords** — Supporting search phrases for the article, pre-filled from your content source when provided. Enter them comma-separated. They are saved with the post and available to your SEO tools.
- **Meta description** — The short sentence that appears under the page title in search results. Keep it to one or two clear sentences that summarise the article. Click **Generate with AI** to have the AI draft a meta description from the current title and body — the result fills the field for you to review and edit. (This requires a Content AI provider to be configured in the Review Portal settings.)

As you type, a **search-result preview** updates in real time so you can see exactly how the title and meta description will look to someone finding your post on Google before you publish. When an SEO title is set, the preview uses it as the headline.

### GEO — AI search and answer engine visibility

The **GEO** panel (Generative Engine Optimization) helps you understand how well your article is positioned for AI-powered search tools — such as those that read your site and use the content to answer user questions directly.

**Checking your AI readiness score**

Click **Analyze GEO readiness** to run an AI analysis of the post. Within a few seconds the panel shows:

- A **readiness score** indicating how well the article is structured to be picked up and cited by AI answer engines.
- A list of the **questions your article answers** — these are the kinds of questions an AI search tool might recognise your article as a source for.

You can run the analysis as many times as you like; it does not change the article itself.

**AI answer feed toggle**

The **Include in llms.txt / AI answer feed** toggle controls whether this specific post is listed in your site's AI content feed — the file that AI systems read to discover what your site covers.

- The toggle is **on by default** for every published post, meaning all of your published content is included automatically.
- Turn the toggle **off** if you want to keep a particular post out of the AI feed (for example, a time-sensitive or confidential article).

This setting is saved when you click **Save draft** or **Approve & Publish**.

### Categories and tags

The **Categories & tags** panel shows the categories and tags that will be applied to the post when it is published. They appear as individual chips that you can manage directly in the portal.

- **Add a category or tag** — Type into the field and press Enter, or click a suggestion to add it.
- **Remove a category or tag** — Click the × on any chip to remove it.
- **Get fresh AI suggestions** — Click **Refresh** to ask the AI for a new set of suggested categories and tags based on the current article content. The suggestions are shown as chips you can accept, adjust, or discard — clicking Refresh does not apply anything automatically.

The final set of categories and tags is saved when you click **Save draft** or **Approve & Publish**.

---

**Saving your changes**

Once you have finished reviewing all panels, choose one of the action buttons:

- **Save draft** — Saves all your edits (including SEO, GEO settings, and categories/tags) and keeps the post as a draft. The portal stays open so you or a colleague can continue reviewing later.
- **Preview** _(reviewers with editor access)_ — Saves your current edits and opens the post in a new browser tab exactly as it will look on your site, rendered by your theme — so you can check the layout before publishing. The Preview button is shown only to reviewers whose WordPress account can edit the post (Editor role or above).
- **Approve & Publish** — Saves all your edits and publishes the post to your site immediately. The portal then shows a confirmation that the post has been published and is live on your site. By default, the author and reviewers receive an email confirming the post went live (site owners can turn this off — see the rules table below).
- **Schedule** _(if enabled by the site owner)_ — Check the **Schedule** box to pick a future date and time, then click **Approve & Publish**. The post will go live automatically at the time you selected rather than immediately.
- **Request changes** — Opens a short note prompt where you can describe what needs updating. Your current edits are saved to the draft, the author and co-reviewers are notified by email, and your note is added to the portal's **Feedback** panel. See [Step 5](#step-5-request-changes) for the full walkthrough.

### Before you can publish

To stop half-finished articles going live, **Approve & Publish** first checks that the article is actually ready. If anything is outstanding, a short list appears instead of publishing, and each item has a button that completes it there and then:

| Requirement | What it means | Button |
| --- | --- | --- |
| GEO analysis | The article has never been analyzed for AI-engine readiness. | **Analyze GEO** |
| GEO analysis is current | The article was edited after it was last analyzed, so the score is out of date. Formatting-only edits — bolding a word, re-wrapping a paragraph — do not count. | **Re-analyze GEO** |
| Meta description | The meta description is empty. | **Generate with AI** |
| Categories & tags | The article has no category, or no tag. "Uncategorized" does not count. | **Suggest categories & tags** |

Some items finish as soon as you click the button. Others — accepting a generated meta description, or choosing which suggested categories and tags to keep — hand back to you, and the list closes so you can make the choice. Once everything is clear, click **Publish now** and the article goes live.

A requirement is skipped automatically whenever you could not act on it — if you do not have permission to edit that panel, or if the site's AI provider is not set up, it will never block you.

Site owners can switch any of the four requirements off individually — see [Review Portal settings](#review-portal-settings-for-site-owners).

:::tip Open the full WordPress editor

If you have WordPress editing access for the post (Editor role or above), the portal's top bar shows an **Edit in WordPress** link. It opens the post in the full WordPress block editor in a new tab — handy when you need a capability the streamlined portal doesn't offer, such as reordering blocks or adding an advanced layout. Your portal tab stays open so you can return to it to approve or publish.

:::

:::tip Review links expire

The link in your review email is valid for the number of days your site owner has configured (the default is **7 days**). If you try to open a link after it has expired, you will see an error page. Contact the site owner and ask them to re-send the review link — your draft is still saved and nothing has been lost.

:::

:::note Someone else is editing

If another team member currently has the draft open for editing, you will see a yellow banner at the top of the portal warning you that they are actively editing. You can still make changes, but coordinate with them first to avoid overwriting each other's work. If you know the other person has finished (or has closed their tab), click **Take over editing** in the banner to claim the draft right away instead of waiting for their session to time out.

:::

---

## Step 4: Send to a colleague (optional)

If you would like another team member to review or edit the draft before you approve it, use the **Send to a colleague** option in the portal.

1. Click **Send to a colleague**.
2. A panel opens showing the team members who are available as reviewers on your site.
3. Pick the colleague you want to involve, and optionally type a short note to explain what you need from them.
4. Click **Send**.

Your colleague receives an email with a link to the same draft portal. They will also need to sign in with their WordPress account. Once added, they have the same editing rights as you — they can save edits and approve the post.

---

## Step 5: Request changes

If the draft needs revisions before it can be approved, use **Request changes** to flag it and keep everyone in the loop — without publishing anything.

1. In the action bar at the bottom of the portal, click **Request changes**.
2. A prompt appears. Type a note describing what needs to change — for example, *"The introduction references last year's figures — please update them"* or *"The featured image needs replacing before this goes live"*.
3. Click **Send & save edits**.

When you submit the note, three things happen at once:

- **Your current edits are saved.** Any changes you made to the title, body, SEO fields, or any other panel are preserved on the draft — just as if you had clicked **Save draft**.
- **An email notification is sent** to the post author and all other reviewers with your note, so they know exactly what to work on.
- **Your note is added to the Feedback panel** on the left side of the portal. Anyone who opens the draft can read the full history of change requests.

The post stays as a draft throughout — nothing is published until someone clicks **Approve & Publish**.

:::note Feedback panel

The **Feedback** panel collects every change request submitted for this draft, oldest first. It is visible to everyone who has access to the portal, so it keeps an honest record of the review conversation. If you posted a note by mistake, click the **×** next to your own note to remove it (you can only delete notes you wrote; site administrators can remove any note).

:::

---

## Step 6: Use the content calendar

The portal includes a **Calendar** button that opens a month view of your recent, draft, scheduled, and published posts. Each post shows as a chip with a colored bar on the left: teal for scheduled, green for published, amber for pending review, and gray for draft. Drafts without a publish date yet appear in an **Unscheduled drafts** list next to the grid.

From the calendar you can:

- **Drag a scheduled post to a new day** to move it to a different publish date.
- **Drag a post from Unscheduled drafts onto a day** to give it a publish date.
- **Click a post** to open a picker and choose an exact date and time instead of dragging.

A few rules apply:

- You can only move posts you're allowed to edit.
- Scheduling a draft (giving it a publish date) requires publish permission, following the same **Who can publish** setting described below.
- Published posts can't be moved.

:::note Reviewers see the full calendar

As a reviewer, you see the full upcoming calendar so you have context on everything coming up — but you can only drag or reschedule the posts you have permission to edit. Everything else appears for reference only.

:::

---

## Your review queue

Every reviewer-facing email — a new draft, an updated draft, a change request, or an invitation from a colleague — includes a footer link to **Articles awaiting your review**: a single page listing every draft currently waiting on you, so you don't have to hunt through your inbox for the right email.

- **Sign in required.** Like the portal itself, you must be signed in to your WordPress account to see the queue — SyteOps checks your account against the reviewers assigned to each draft, so you only ever see articles you're actually on.
- **Administrators see everything.** A WordPress administrator opening the queue sees every draft currently assigned to any reviewer, not just their own.
- **No link expiry.** Once you're signed in, opening a draft from your review queue always works, even past the normal review-link expiry window — your WordPress session is what proves who you are, not the link.
- **The newest items first.** The queue lists up to 100 articles, drawn from the most recently updated drafts on the site. If there are more than that, or if the site has a very large backlog of drafts awaiting review, the page tells you so with a note reading *"Older items may not be listed."* When you see that note, older articles may be waiting on you even though they aren't shown — open them from their original review email, or ask your site administrator.

Bookmark the queue page, or just click the footer link in your next review email, to check what's waiting on you at any time. Site owners can also reach it from **Content Pipelines → Runs**, using the **Open my review queue** button.

Each row also shows how many questions the AI search analysis recorded for that article and how many of them have answers — for example *12 Q · 9 answered* — so you can tell at a glance whether an article's answers still need finishing.

### Live articles you can edit

Beneath the drafts awaiting you, the queue lists any **published** articles you're assigned to, under **Live articles you can edit**. If you have none, the section doesn't appear at all.

These behave differently from drafts, and the page says so:

- **Changes go live immediately.** There's no approval step — opening one of these in the portal and saving publishes the change straight away.
- **Answer coverage.** Each row shows the same question and answer counts as a draft.
- **"Answers not signed off".** If your site publishes AI-written answers to search engines and nobody has confirmed the answers on that article, the row says so. Those answers are already public, so this is worth acting on.
- **View live article.** A link to the published article as your readers see it. If your site is set up to exclude internal traffic, this link carries that exclusion, so checking your own work doesn't show up in your site's analytics.

---

## Who receives the review email

The notification list for each new draft is made up of two groups:

- **The post author** — always included automatically.
- **Default reviewers and Default CC reviewers** — team members you have added to the notification list in the Review Portal settings.

To configure the default list, go to **SyteOps → Content Pipelines**, open the **Review Portal** settings, and look for the **Default reviewers** and **Default CC reviewers** fields. Make sure each contributor is also linked to a WordPress author on the **Users** tab — this ensures their articles are published under the correct byline and they appear in the reviewer lists.

- **Default reviewers** are the primary recipients of the email and can edit the draft.
- **Default CC reviewers** are copied on the email and can also edit the draft.

Changes to these lists take effect on the next draft that arrives from your content source — existing drafts already sent are not affected.

---

## Email notifications

Every automated portal email is controlled from one place: **SyteOps → Content Pipelines → Review Portal → Email notifications**. Each can be switched on or off independently:

- **New draft received** *(on by default)* — emails the author and reviewers when a new article arrives and its review draft is created. This is the main review email, with the article preview, who can review it, and the secure editor link.
- **Draft updated by source** *(off by default)* — emails the author and reviewers when your content source re-delivers an article **with changed content**, so nobody reviews a stale version. Identical re-deliveries (delivery retries) never send an email.
- **Published or scheduled** *(on by default)* — confirms to the author and reviewers when a draft goes live or is scheduled.
- **Source held (needs attention)** *(on by default)* — alerts the **site admin** (not the reviewers) when a live content source stops matching its approved field mapping: incoming articles are put safely on hold, and this email tells you to re-approve the mapping, then use **Reprocess last payload** on the source to bring in the article that triggered the hold. It sends once per incident, not on every held delivery.

A **Reply-To address** field lets replies to the reviewer-facing emails (review requests, update notices, colleague invites, change requests, and published confirmations) go to a person (for example, your editor) instead of the site's sending address — leave it blank to keep the default. The administrator "payload held" alert always replies to the sending address. Two optional fields polish the emails' footer: a **Footer tagline** (a short line about your business) and a **Footer phone** (shown as a click-to-call link). Both appear in the dark footer bar of every portal email, alongside your company name. All emails carry your portal branding — logo, company name, and colors — from the Branding settings below.

You can also see each email's outcome in the run history: each draft-creation row on the Runs dashboard notes whether the notification was sent, skipped (and why — for example, when no recipients could be resolved), or failed, and held rows note when the admin was alerted — so a missing email is never a mystery.

---

## Review Portal settings (for site owners)

Site owners can configure the Review Portal from **SyteOps → Content Pipelines**, then clicking the **Review Portal** settings view. The panel is organized into several areas.

### Branding

By default the portal uses the same logo, company name, and colors you have set in your general site branding. If you want the review emails and portal page to display different branding — for example, a client-facing brand rather than your internal agency name — enable **Override branding for the Review Portal** and fill in the alternative company name, logo URL, and color pickers. When you turn the override on, the color fields start from your current branding so you can adjust from there instead of from blank.

Use the **Preview Portal** button to open a read-only preview of the portal — with your current branding applied — right inside the admin, so you can see exactly how it looks before sending a review link. The preview is read-only: nothing in it can save, publish, or change a post. In the preview window's title bar you can click the **expand** icon to grow the preview to fill your whole screen (click again to shrink it back), or the **open-in-new-tab** icon to view the portal as a standalone full page.

### Pre-publish requirements

Four switches control what **Approve & Publish** insists on before an article can go live. All four are **on** by default:

- **GEO analysis has run** — require an AI-engine readiness analysis.
- **GEO analysis is current** — also require a fresh analysis when the article changed after it was last analyzed. Formatting-only edits are ignored, so a reviewer fixing a typo is not sent back for another analysis.
- **Meta description present** — require a meta description.
- **Categories & tags assigned** — require at least one category and one tag.

Turn one off if your workflow legitimately publishes without it — for example, if you do not use tags. Whatever you leave on is enforced both in the portal and on the server, so it holds even if a reviewer leaves a browser tab open for a long time.

A requirement is never enforced against a reviewer who could not satisfy it. If they lack permission for that panel, or the AI provider behind the fix is not configured, the requirement is skipped for them automatically rather than leaving them unable to publish.

### AI assistance

This section lets you choose the AI provider and model used by two features inside the portal:

- **Content AI** — the model that generates and refines article content.
- **GEO AI** — the model that runs the AI readiness analysis in the GEO panel.

These are the same provider and model settings used by the Content AI and GEO areas elsewhere in SyteOps. Changing them here updates the same underlying values.

### Review & approval rules

| Setting | What it controls |
|---|---|
| **Who can publish** | Choose **Any selected reviewer** to let any team member who received the review link publish the post, or choose **Author or designated approver only** to restrict publishing to the post's author and a named approver. |
| **Soft lock** | When enabled, a reviewer who opens a draft while a teammate is already editing it will see a warning banner. This prevents accidental overwrites. |
| **Scheduled publishing** | When enabled, reviewers see a **Schedule** option in the portal so they can publish the post at a future date and time instead of immediately. When disabled, the schedule option is hidden and all approvals publish immediately. |
| **Review link expiry** | How long the secure review link in each email stays valid. Options are 3, 7, 14, or 30 days. The default is **7 days**. After a link expires, re-send it from the draft — the post itself is unaffected. |

:::info What "Review link expiry" does and doesn't cover

Expiry protects the **link**, not the post. It stops an old email link from being opened by someone who is *not* signed in — a forwarded email, a link pasted into a chat, a shared inbox.

Anyone who **is** signed in to a WordPress account that's on the draft's reviewer list (and any administrator) can still open that draft after the window has passed, including from their review queue. Once a reviewer is signed in, their WordPress session is what proves who they are — the link is no longer doing that job.

So if you want to remove someone's access to a draft entirely, take them off the reviewer list or deactivate their WordPress account. Setting a shorter expiry won't do it on its own.

:::

You can also update the **Default reviewers** and **Default CC reviewers** lists here — these are the same fields described in [Who receives the review email](#who-receives-the-review-email) above.

### Editing permissions

The **Reviewer editing permissions** section lets you control which parts of the portal each reviewer type can change. By default every reviewer type has full edit access to every area — you only need to configure this section when you want to lock something down.

**How it works**

Permissions are set by reviewer type (role). The panel shows a row for each role your site uses, plus an **Everyone else (default)** row that applies to anyone who doesn't match a more specific role — if a reviewer's user type has its own row in the table, that row's settings are used; the default row only applies to everyone else. For each row you can choose a restriction for each portal area:

| Area | Restrictions available |
|---|---|
| **Featured image** | Edit (full) or View only |
| **Permalink** | Edit (full) or View only |
| **SEO** | Edit (full) or View only |
| **GEO** | Edit (full) or View only |
| **Reviewers** | Allow (can add/remove reviewers) or Hide (reviewer panel not shown) |
| **Categories & tags** | Edit and create new terms, Edit using existing terms only, or View only |

Choosing **View only** makes the area visible in the portal but all controls are disabled so the reviewer can read but not change it. Choosing **existing terms only** for categories and tags lets reviewers choose from your site's existing terms but prevents them from creating new ones — the add-term field shows a suggestion list of matching existing terms.

**Per-user overrides**

Below the role rows there is a collapsible **Per-user overrides** section. This lets you grant or restrict individual team members differently from their role — useful if one person on a team should have extra access or a tighter restriction than everyone else in their role.

**Admins are never restricted**

WordPress administrators always have full access to every area regardless of what the permissions matrix says. The restrictions only apply to non-admin reviewers.

**Saving changes**

Click **Save settings** at the bottom of the panel to apply your changes. The new permissions take effect the next time a reviewer opens or refreshes a portal link.

### Open the portal for any post

You don't have to wait for a draft from your content source to use the portal. There are two ways in:

- **From the posts list.** In the WordPress **Posts** (or **Pages**) list, hover over any post you can edit and click the **Review portal** link in its row of actions.
- **From the post itself.** While editing a post, click **Open review portal** in the toolbar at the top of the screen.

Either way, SyteOps issues a fresh secure link for that post and opens the portal in a new tab — the same review window contributors see, with the same expiry window as an emailed link. This lets you put an existing post (or one written by hand) through the same review-and-approve flow.

The **Review portal** action appears on posts and pages, and on any other content type your content sources publish into. It won't appear on unrelated content types added by other plugins.

---

## Related pages

- [Content Pipelines](./content-pipelines.md) — The feature that drives content ingest and post-publish processing.
- [Content Sources](./content-pipelines.md#content-sources) — How external content apps deliver articles into the review portal.
