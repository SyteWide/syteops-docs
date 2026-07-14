---
sidebar_position: 19
title: Social Publishing
description: Turn any post into a ready-to-send social update — compose it in a chosen voice with AI, then send it to LinkedIn, Slack, or any webhook.
---

# Social Publishing

Social Publishing lets you turn a post into a short, ready-to-share update — written in a voice you define — and send it straight to a webhook destination such as Slack, or to an automation tool like Make, Zapier, or n8n that posts it to LinkedIn on your behalf.

Every send starts as a manual, human-reviewed action — you always review and edit the generated text before it goes out. You can deliver it immediately, or [schedule it](#scheduling--post-type) for a specific time or for the moment the post publishes; nothing is ever composed or sent without you first approving the text.

---

## What it is

When you're ready to promote a post, Social Publishing:

1. Asks the AI to summarize the post's title and content into a short update, written in a **voice profile** you've defined (tone, length limit, and whether to include the post's link).
2. Shows you the generated text so you can edit it however you like.
3. Sends the final text to a **destination** — a webhook URL you've configured.

SyteOps does not connect directly to LinkedIn or any other social network. For LinkedIn, point your destination's webhook at a scenario in an automation tool such as **Make**, **Zapier**, or **n8n** — that tool holds the actual LinkedIn connection and publishes the post on your behalf. For Slack, you can point a destination straight at a Slack **Incoming Webhook** URL. You can also point a destination at any custom endpoint you control.

---

## Enabling Social Publishing

1. Go to **SyteOps → Content Pipelines**.
2. Find the **Social Publishing** settings card.
3. Turn on **Enable Social Publishing**.

With the feature enabled, you'll set up an AI provider, at least one voice profile, and at least one destination before the send buttons appear anywhere in the admin.

### Choosing an AI provider

The Social Publishing settings card (found on the **Content Pipelines** settings panel, in the **Social Publishing** section) has its own AI provider setup, separate from the AI providers used elsewhere in SyteOps:

- **AI provider** — choose which configured AI provider composes social updates.
- **Model** — fetch and select a model for that provider.
- **Max tokens** — the response-length ceiling for the AI call.

If a provider shows **"(No API key)"** in the list, add a key for that provider first under **SyteOps → Admin → AI Providers**.

---

## Adding a Voice profile

A voice profile tells the AI how to write your update. In the Social Publishing settings card, under **Voice profiles**:

1. Click **Add profile**.
2. Fill in:
   - **Name** — a label you'll recognize later, like "LinkedIn — Professional" or "Slack — Casual."
   - **Voice / tone** — a short instruction describing the style you want, for example *"witty and concise"* or *"formal, no exclamation points."*
   - **Max chars** — the maximum length of the generated update (50–3,000 characters).
   - **Link** — check this box to automatically append the post's web address to the end of the generated text.
3. Click **Save Social Publishing**.

Add as many profiles as you like — for example, a punchy version for LinkedIn and a more relaxed one for an internal Slack channel — and pick the right one each time you send.

---

## Adding a Destination

A destination is where the generated update is sent. Under **Destinations** in the same settings card:

1. Click **Add destination**.
2. Fill in:
   - **Name** — a label for the destination, like "LinkedIn (via Zapier)" or "Marketing Slack."
   - **Webhook URL** — the address the update will be sent to.
   - **Auth** — how the destination expects to be authenticated: **none**, **bearer** (an `Authorization: Bearer` header), **basic** (a basic-auth header), or **both**.
   - **Secret** — the token, key, or credential your webhook requires, if any. Leave this blank when editing an existing destination to keep the value that's already saved — only fill it in when setting a new secret. It's stored encrypted and is never shown back to you in the field.
3. Click **Save Social Publishing**.

**For LinkedIn:** SyteOps doesn't post to LinkedIn directly. Set the Webhook URL to a trigger in Make, Zapier, or n8n, and build the rest of the automation (the LinkedIn post step, with its own LinkedIn connection) inside that tool.

**For Slack:** paste in a Slack Incoming Webhook URL and set Auth to **none** — Slack's webhook URL is the credential.

---

## Sending a post

Once the feature is enabled with at least one voice profile and one destination, two send buttons appear:

### From the Review Portal

While reviewing a post in the secure Review & Publish portal, click **Post to Social** in the action bar at the bottom of the page.

### From the Posts list

On the standard WordPress **Posts** (or **Pages**) list, hover over any post you can edit and click **Send to Social** among its row actions.

### Compose and send

Both entry points open the same modal:

1. Choose a **Destination** and a **Voice** from the dropdowns.
2. Click **Generate**. The AI rewrites the post into a short update in the chosen voice, respecting that profile's character limit and, if enabled, appending the post's link.
3. Review the text in the box that appears — edit it freely. A character counter shows how close you are to the voice profile's limit.
4. Click **Send** to deliver the final text to the selected destination's webhook.

You'll see a confirmation once the send succeeds, or an error message if it fails so you can try again. If the AI can't generate text (for example, if the provider is unavailable), you can always type or paste your own update into the box and send it manually.

:::note Who can send
Sending requires permission to edit the specific post and permission to publish that type of content. A contributor who can only edit their own drafts won't see the send option.
:::

---

## Scheduling & post type

### Send now, at a time, or when the post publishes

The compose modal's **When to send** option lets you deliver the reviewed text on your own timeline instead of immediately:

- **Send now** — delivers the update right away, same as before.
- **At a time** — pick a future date and time; the update is sent automatically at that moment.
- **When the post publishes** — holds the update until the post itself transitions to *Published* (available only for a post that isn't already live), then sends it automatically.

This is still a manual, human-approved send — you compose and review the text yourself, you just choose *when* it goes out instead of clicking Send immediately. A pending list of your scheduled updates for the post appears in the modal with a **Cancel** button for each one, so you can back out any time before it fires.

### Compose now, deliver later

Because the text is generated and approved up front, "at a time" and "when the post publishes" both let you compose-now-deliver-later: finish writing (or AI-generating and editing) the social update whenever it's convenient, and let SyteOps handle the timing so the announcement doesn't go out before the content itself is live.

### Choosing a post type when publishing

The Review & Publish portal's **Publish as** control lets a reviewer choose which post type a draft is published under, instead of always publishing to the type it was created as. An administrator sets the type that's pre-selected for reviewers under **SyteOps → Content Pipelines → Review & Approval Rules → Default publish type**; a reviewer can still change it per-post at publish time if they hold the publish capability for the target type.

:::caution Changing post type doesn't move type-specific data
Switching a draft to a different post type at publish time changes only the post's type — it does **not** migrate taxonomies, terms, or custom fields that only apply to the original type. If the original type has its own categories/tags or custom fields, review and re-set anything type-specific after switching, since it won't carry over automatically.
:::

---

## Related pages

- [Review & Publish Your Post](./review-and-publish-your-post.md) — The secure portal where the Post to Social button also appears.
- [AI Providers](./ai-providers.md) — Configure the AI providers and API keys used to compose social updates.
