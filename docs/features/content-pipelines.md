---
sidebar_position: 12
title: Content Pipelines
description: Automate content processing workflows that run on publish — cross-linking, SEO, and llms.txt — with the Content Pipelines module.
---

# Content Pipelines

Content Pipelines is a SyteOps module that automatically runs a sequence of content-processing stages when a post is published. Each pipeline recipe defines which stages run, in what order, and under what conditions.

## Getting Started

### 1. Upload and activate the module

1. Go to **SyteOps → Modules**
2. Upload the `syteops-content-pipelines-module.zip` file
3. Click **Activate** on the Content Pipelines card

Once active, a **Content Pipelines** tab appears in the main SyteOps navigation.

## The Content Pipelines Tab

Open Content Pipelines from the **Content Pipelines** link in the SyteOps admin sidebar (or the Content Pipelines tab in SyteOps settings). The tab has two views, accessible from the quick-nav pills at the top.

### Runs dashboard

The Runs dashboard shows every pipeline execution:

- **Stat cards** show total runs, runs in the last 7 days, posts that were changed, and error counts.
- **Filter pills** let you filter by recipe or status (OK, Errors, Skipped).
- **Run now** lets you trigger a pipeline manually for any post — choose a recipe, enter a Post ID, and optionally enable dry-run mode to preview changes without writing them.
- **Runs table** lists each execution with the source (pipeline trigger or ContentPen), the recipe used, post, status, which stages ran, whether the post was changed, and the trigger type.
- Click a row to expand the **stage drawer**, which shows the result of each stage with its message and duration.

### Provider status cards

At the very top of the Runs view, above the stat cards, a row of cards shows whether each pipeline provider is wired up:

- **ContentPen** — the inbound webhook source.
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
