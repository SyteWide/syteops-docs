---
sidebar_position: 28
title: Rank Math Integration
description: How SyteOps writes the SEO title, meta description, focus keyword and pillar-content flag into Rank Math from Content Pipelines and the Review Portal.
---

# Rank Math Integration

**Tier: Basic** — Plugin-based toggle integration. When Rank Math is installed and the integration is enabled, SyteOps writes SEO metadata into Rank Math's own fields. There is no separate settings screen.

SyteOps can use [Rank Math](https://rankmath.com/?ref=chetbohley&campaign=Blog) as the SEO engine for **Content Pipelines** and the **Review & Publish Portal**. With the integration on, the SEO **title**, **meta description**, **focus keyword** and **pillar content** flag that a pipeline produces — or that a reviewer sets in the portal — are written into the fields Rank Math already reads, so they appear in its metabox exactly as if they had been typed there.

:::important One SEO plugin at a time
SyteOps connects to **one** SEO plugin at a time. Turning on Rank Math automatically turns off Squirrly SEO or Yoast SEO if either was on. This is deliberate: two plugins writing the same page's title is how a site ends up with a `<title>` nobody can account for.
:::

## What it does

- **SEO title** — written only when someone actually sets one, in the Review Portal's SEO panel. See "About the SEO title" below; this behavior is different from the Squirrly integration and it matters.
- **Meta description** — the description a pipeline generates, or that a reviewer edits in the portal.
- **Focus keyword** — the article's target keyword, so Rank Math's own analysis has something to score against.
- **Pillar content** — an article you mark as a **pillar** in the Review Portal is flagged as pillar content in Rank Math.

## Requirements

- SyteOps installed and activated
- Rank Math installed and activated
- The Rank Math integration enabled in SyteOps

## Setup

1. Go to the **Integrations** tab in SyteOps.
2. Toggle **Rank Math** on. If another SEO plugin was connected, it switches off.
3. Save.

That's the whole setup. Content Pipelines and the Review Portal start writing to Rank Math on the next article.

## About the SEO title

**Leave the SEO title blank unless you want to override it.** Rank Math builds a page's title from the template you set under *Rank Math → Titles & Meta* — by default `%title% %sep% %sitename%`. That template is used only while the per-article SEO title is **empty**. The moment an article has its own SEO title, the template is ignored for that article.

So SyteOps never invents one. Nothing is written to the SEO title field unless a reviewer deliberately types one in the Review Portal's SEO panel, and clearing that field removes the override and hands the article back to your template.

This is the one place the Rank Math integration behaves differently from the Squirrly SEO integration, which does auto-generate a title. If you have used the Squirrly integration before, expect the SEO title field here to stay empty — that is correct, and your titles are coming from your Rank Math template.

## Pillar content

Marking an article as a **pillar** in the Review Portal's GEO panel also marks it as **pillar content** in Rank Math, so it appears under the Pillar Content filter on the posts list. Unmarking it removes the flag.

The mark travels one way only — SyteOps to Rank Math. Flagging an article as pillar content inside Rank Math does not make it a pillar in SyteOps, because SyteOps keeps its own record of which articles carry the site's authority and uses it for more than Rank Math.

## Troubleshooting

### The Rank Math toggle switched itself off

Another SEO plugin was turned on. Only one SEO plugin can be connected at a time; whichever was switched on most recently wins.

### The toggle says "Not Installed"

Rank Math is not active on this site. Install and activate it, then reload the Integrations tab.

### The SEO title field is empty in Rank Math

That is the expected state — see "About the SEO title" above. Your title is coming from your Rank Math title template. Type a title in the Review Portal's SEO panel only when a specific article needs to differ.

### Values are not appearing

1. Confirm the Rank Math integration is toggled **on**.
2. Confirm the Rank Math plugin is active.
3. Confirm the article actually went through a Content Pipeline, or had its SEO set in the Review Portal — those are the only paths that write.
