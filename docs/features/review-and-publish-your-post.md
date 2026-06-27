---
sidebar_position: 13
title: Review & Publish Your Post
description: Open your branded review email, edit the draft in the secure portal, approve it for publishing, and share it with a teammate — all without logging into WordPress directly.
---

# Review & Publish Your Post

When ContentPen finishes generating a new article, SyteOps sends a branded review email to everyone on the notification list and opens a secure editing portal where reviewers can read, refine, and approve the post before it goes live.

This page explains the full workflow from the moment that email arrives to the moment the post is published.

:::note Requires Content Pipelines
The Review & Publish portal is part of the **Content Pipelines** feature. An administrator must have **Content Pipelines turned on** (and the ContentPen integration enabled) for review emails to be sent and the secure editor to open. If Content Pipelines is turned off, incoming ContentPen articles are handed to your configured webhook automation instead of the in-WordPress portal.
:::

---

## Step 1: You receive a review email

As soon as ContentPen generates a new draft, SyteOps sends a notification email to:

- The **post's author** (the WordPress user the post will be attributed to).
- Anyone listed as a **Default reviewer** or **Default CC reviewer** in your ContentPen settings (see [ContentPen settings](#who-receives-the-review-email) below).

The email comes from your site, uses your site's logo, and includes a summary of the article title and source keyword. At the bottom there is a single call-to-action button: **Open secure editor**.

---

## Step 2: Open the secure editor and sign in

Click **Open secure editor** in the email. Your browser opens the Review & Publish portal — a page on your own WordPress site.

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
- **Primary keyword** — The main search phrase this article is targeting. ContentPen pre-fills this from the keyword used to generate the post. You can change it at any time.
- **Secondary keywords** — Supporting search phrases for the article, pre-filled from ContentPen when provided. Enter them comma-separated. They are saved with the post and available to your SEO tools.
- **Meta description** — The short sentence that appears under the page title in search results. Keep it to one or two clear sentences that summarise the article. Click **Generate with AI** to have the AI draft a meta description from the current title and body — the result fills the field for you to review and edit. (This requires a ContentPen AI provider to be configured in the Review Portal settings.)

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

## Who receives the review email

The notification list for each new draft is made up of two groups:

- **The post author** — always included automatically.
- **Default reviewers and Default CC reviewers** — team members you have added to the notification list in the ContentPen settings.

To configure the default list, go to **SyteOps → Content Pipelines**, open the **ContentPen** settings, and look for the **Default reviewers** and **Default CC reviewers** fields. Make sure each contributor is also linked to a WordPress author on the **Users** tab — this ensures their articles are published under the correct byline and they appear in the reviewer lists.

- **Default reviewers** are the primary recipients of the email and can edit the draft.
- **Default CC reviewers** are copied on the email and can also edit the draft.

Changes to these lists take effect on the next draft that ContentPen generates — existing drafts already sent are not affected.

---

---

## Review Portal settings (for site owners)

Site owners can configure the Review Portal from **SyteOps → Content Pipelines**, then clicking the **Review Portal** settings view. The panel is organized into three areas.

### Branding

By default the portal uses the same logo, company name, and colors you have set in your general site branding. If you want the review emails and portal page to display different branding — for example, a client-facing brand rather than your internal agency name — enable **Override branding for the Review Portal** and fill in the alternative company name, logo URL, and color pickers. When you turn the override on, the color fields start from your current branding so you can adjust from there instead of from blank.

Use the **Preview Portal** button to open a read-only preview of the portal — with your current branding applied — right inside the admin, so you can see exactly how it looks before sending a review link. The preview is read-only: nothing in it can save, publish, or change a post.

### AI assistance

This section lets you choose the AI provider and model used by two features inside the portal:

- **ContentPen AI** — the model that generates and refines article content.
- **GEO AI** — the model that runs the AI readiness analysis in the GEO panel.

These are the same provider and model settings used by ContentPen and GEO elsewhere in SyteOps. Changing them here updates the same underlying values.

### Review & approval rules

| Setting | What it controls |
|---|---|
| **Who can publish** | Choose **Any selected reviewer** to let any team member who received the review link publish the post, or choose **Author or designated approver only** to restrict publishing to the post's author and a named approver. |
| **Soft lock** | When enabled, a reviewer who opens a draft while a teammate is already editing it will see a warning banner. This prevents accidental overwrites. |
| **Scheduled publishing** | When enabled, reviewers see a **Schedule** option in the portal so they can publish the post at a future date and time instead of immediately. When disabled, the schedule option is hidden and all approvals publish immediately. |
| **Publish notifications** | When enabled (the default), the post author and reviewers receive a branded email confirming a draft was published or scheduled. Turn it off to keep approvals silent. |
| **Review link expiry** | How long the secure review link in each email stays valid. Options are 3, 7, 14, or 30 days. The default is **7 days**. After a link expires, re-send it from the draft — the post itself is unaffected. |

You can also update the **Default reviewers** and **Default CC reviewers** lists here — these are the same fields described in [Who receives the review email](#who-receives-the-review-email) above.

---

## Related pages

- [Content Pipelines](./content-pipelines.md) — The module that drives ContentPen integration and post-publish processing.
- [ContentPen integration](../integrations/contentpen.md) — How to connect ContentPen to your SyteOps site.
