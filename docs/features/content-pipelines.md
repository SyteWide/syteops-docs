---
sidebar_position: 12
title: Content Pipelines
description: Automate content processing workflows that run on publish — cross-linking, SEO, and llms.txt — with Content Pipelines.
---

# Content Pipelines

Content Pipelines is a built-in SyteOps feature that automatically runs a sequence of content-processing stages when a post is published. Each pipeline recipe defines which stages run, in what order, and under what conditions.

## Getting Started

Content Pipelines is built in to SyteOps — there's nothing to upload or activate. It's available out of the box, and you'll find it in its own **Content Pipelines** tab in the SyteOps admin.

## The Content Pipelines Tab

Open Content Pipelines from the **Content Pipelines** link in the SyteOps admin sidebar (or the Content Pipelines tab in SyteOps settings). The tab has two views, accessible from the quick-nav pills at the top.

### Runs dashboard

The Runs dashboard shows every pipeline execution:

- **Stat cards** show total runs, runs in the last 7 days, posts that were changed, and error counts.
- **Filter pills** let you filter by recipe, status (OK, Errors, Skipped), or source (Pipeline, each content source, and ContentPen when its integration is in use).
- **Run now** lets you trigger a pipeline manually for any post — choose a recipe, enter a Post ID, and optionally enable dry-run mode to preview changes without writing them.
- **Runs table** lists each execution with the source (pipeline trigger or ContentPen), the recipe used, post, status, which stages ran, whether the post was changed, and the trigger type.
- Click a row to expand the **stage drawer**, which shows the result of each stage with its message and duration.

### Provider status cards

At the very top of the Runs view, above the stat cards, a row of cards shows whether each pipeline provider is wired up:

- **Content sources** — one card for each content source you've registered, shown by its name, indicating whether it's connected and receiving content. If you also use the built-in **ContentPen** integration, it appears here too with its own status.
- **Link Engines**, **SEO**, and **GEO** — the processing stages.

Each card shows a status — **Ready**, **Off**, **Needs setup**, or **Not installed** — and a
link that takes you straight to that provider's settings to finish wiring it up. Use it as a
quick checklist: every card should read **Ready** before you rely on a recipe that uses that stage.

The **GEO** card (when it uses the built-in `llms.txt` engine) adds a one-click **Turn on** / **Turn off** button that enables or disables AI Search Discovery right from the card — no need to leave the page.

### Recipes

Recipes define how your pipeline behaves:

- The **default recipe** runs all available stages in sequence. It cannot be deleted.
- **Custom recipes** let you configure stage order, enable or disable individual stages, adjust LinkCentral dial-in settings, set trigger conditions (post types, tags), and define policies (skip unchanged posts, stop or continue on error, dry-run mode).
- Use the **Add recipe** button to open the recipe builder.

## Recipe Builder

The builder walks you through four sections:

1. **Recipe name and priority** — Give the recipe a name and set its priority (lower numbers run first when multiple recipes match).
2. **Stages** — Enable or disable individual stages and drag them into the order you want. The Link Engines stage includes LinkCentral dial-in settings to fine-tune cross-linking behavior.
3. **Trigger** — Choose when the recipe fires: on auto-publish or manual trigger only. Optionally restrict to specific post types or tag slugs.
4. **Policy** — Control what happens when content hasn't changed (skip it), when a stage errors (stop or continue), and whether to run in dry-run (preview) mode.

## Available Stages

| Stage | What it does |
|---|---|
| **Link Engines** | Adds cross-links to published content based on your LinkCentral keyword index |
| **SEO** | Applies Squirrly SEO metadata using your configured settings |
| **GEO** | Regenerates your llms.txt file to reflect the new content |

Stages that depend on other integrations (LinkCentral, Squirrly SEO) are available only when those integrations are active and configured.

The **GEO** step has a swappable engine. By default it uses the built-in `llms.txt` generator; if the [LLMS Amplifier](../integrations/llms-amplifier) plugin is installed and its integration is enabled, you can select **LLMS Amplifier** as the GEO engine on the recipe's GEO stage row for richer `llms.txt` / `llms-full.txt` output.

When LLMS Amplifier is the GEO engine and isn't set to "Manual," the GEO provider card shows a one-click **Set to Manual** button, and you can also adjust its update frequency from **System / API → LLMS Amplifier**.

## Dry-Run Mode

Enable **dry-run** on a recipe or on a manual run to preview what would change without actually writing to the database. Dry-run results appear in the Runs dashboard with a "Preview" badge.

## ContentPen Integration

When you publish content through ContentPen, each article automatically creates a run entry in the Runs dashboard with `source: contentpen`. The pipeline stages that are enabled in the matching recipe apply to ContentPen-published posts the same way they apply to manually published posts.

## Content Sources

Content Sources let **any** external application — not just ContentPen — send finished articles into SyteOps as review-ready drafts. Each source you register gets its own **Ingest URL** and a **webhook secret**. When the app posts an article to that URL, SyteOps maps the incoming fields onto the editor and creates a draft in the [Review & Publish portal](./review-and-publish-your-post.md), where your team reviews and publishes it.

Open the **Content Sources** view from the quick-nav pills at the top of the Content Pipelines tab.

### Register a content source

1. In the **Content Sources** card, enter a **Source name** (for example, "Marketing CMS").
2. Choose an **Auth mode** — how the sending app proves each request is genuine:
   - **HMAC signature** (recommended) — the app signs every request with the secret.
   - **Bearer token** — the app sends the secret in an `Authorization` header.
   - **HMAC or bearer** — accept either.
3. Click **Add source**.

SyteOps then shows the **Ingest URL** and the **Webhook secret** in a highlighted box labeled **Save this secret now — it is shown only once.** Copy the secret and store it somewhere safe (a password manager, or the sending app's settings). If you ever lose it, use **Rotate secret** on the source to generate a new one — the old secret stops working immediately.

### Point your app at the Ingest URL

Configure the sending application's webhook to POST its article as JSON to the source's **Ingest URL**. How it authenticates depends on the **Auth mode** you chose:

| Auth mode | What the app sends |
|---|---|
| **HMAC signature** | An `X-SyteOps-Signature` header in the form `t=<timestamp>,v1=<hex>`, signed with the secret. If your secret begins with `whsec_`, drop that prefix and sign with the remaining characters. |
| **Bearer token** | An `Authorization: Bearer <secret>` header using the **full** secret string, including any `whsec_` prefix. |

You can copy the URL again at any time with **Copy URL** on the source card.

### Send a sample and approve the mapping

Before content flows automatically, SyteOps needs to learn how the app's JSON maps onto editor fields (title, body, excerpt, and so on).

1. Have the app send one article to the Ingest URL. SyteOps captures it and holds the source in a **pending** state — no draft is created yet. (You can also paste an example into the **Sample payload (JSON)** box on the source card.)
2. Click **Learn from sample**. SyteOps proposes a **Field mapping**, filling each row's **Path** (a location inside the payload), an optional **Transform**, and a **Confidence** score. You can hand-write or adjust any row yourself.
3. Click **Test with sample** to preview what each field would receive.
4. When the mapping looks right, click **Approve mapping**.

Once approved, the source goes **active**: every future post to its Ingest URL becomes a Review & Publish draft automatically, using the same mapping. Any field the mapping doesn't fill is simply left blank for the reviewer to complete.

### Per-source settings

Expand **Settings** on a source card to control:

| Setting | What it does |
|---|---|
| **Source name** | The label shown for this source. |
| **Default author** | The WordPress user credited as the post author. Tick **Always use this author** to override whatever the payload suggests. |
| **Default post status** | **Draft** or **Publish**. This is set here only — the incoming payload can never publish content on its own. |
| **Auth mode** | Change the accepted authentication style. |

Use **Rotate secret** to replace a leaked or aging secret, **Disable** to pause a source without deleting it, and **Delete** to remove it permanently.

### Choose where drafts land

By default, every source's drafts are created as regular **Posts**. You can point a source somewhere else instead — either when you register it, or later from its card.

- **Send into an existing content type** — Expand **Settings** on the source's card and choose from **Land drafts into**: Posts, Pages, or any other content type already on your site (including a type created by another content source).
- **Define a brand-new content type** — When registering the source, set **Land drafts into** to **Define a new type**, then fill in:

| Field | What it does |
|---|---|
| **Singular name / Plural name** | What the content type is called (for example "Listing" / "Listings"). |
| **Supports** | Which editing features it has: Title, Content editor, Excerpt, Featured image, Custom fields, Author. |
| **Taxonomies** | Whether it uses Categories, Tags, or both. |

SyteOps creates the content type for you, and every draft from this source lands there from then on. A new type's name, supported features, and taxonomies are locked in when the source is created and can't be changed afterward, so plan them before you register the source. (You can still switch the source to a different **existing** content type later from its card — only defining a brand-new type is a one-time choice.)

### Add custom fields

If a source's articles carry information beyond the standard title, body, and excerpt — a SKU, a price, a source URL — expand **Custom fields (post meta)** on its card and add one row per field:

| Column | What it does |
|---|---|
| **Field key** | A short internal name (lowercase letters, numbers, underscores). |
| **Label** | The friendly name shown in the mapping table. |
| **Type** | How the value is handled: Text, Text area, Number, Yes/No, URL, or Date. |

Click **Add field** for each one you need, then **Save custom fields**. Every field you define shows up as its own row in **Field mapping**, so you can point it at the right location in the incoming payload just like the built-in fields. Once mapped, the values are saved as custom fields (post meta) on the draft.

### FlowMattic config variables

Expand **FlowMattic config variables** on a source's card to define named values that automations can read for that specific source — a brand name, a campaign id, a routing tag, or anything else your workflows need.

1. Enter a **Key** (lowercase letters, numbers, and underscores) and a **Value**.
2. SyteOps shows the resulting **FlowMattic variable** name next to each entry — copy that exact name to reference it in your FlowMattic workflows.
3. Click **Add variable** for each one you need, then **Save FlowMattic variables**.

Because each source's variables are named after that source, two sources can use the same key (for example, both defining a `brand` value) without colliding.

### Forward to a workflow

Expand **Forward to workflow** on a source's card to also send each mapped article to a FlowMattic workflow webhook, in addition to creating the Review & Publish draft.

1. Turn on **Enable forwarding**.
2. Enter the **Workflow webhook URL** from FlowMattic.
3. Pick an **Auth mode** — **None**, **Bearer token**, **Basic auth**, or **Bearer + Basic** — to match what the workflow expects, and enter the matching **Auth secret** (leave it blank to keep whatever secret is already saved).
4. Click **Save forwarding settings**.

Forwarding is optional and never gets in the way: SyteOps always creates the Review & Publish draft first, then sends a copy of the mapped content to your workflow in the background. A slow or unreachable workflow endpoint never delays or blocks the draft.
