---
sidebar_position: 27
title: Yoast SEO Integration
description: How SyteOps writes the SEO title, meta description, focus keyword and cornerstone flag into Yoast SEO from Content Pipelines and the Review Portal.
---

# Yoast SEO Integration

**Tier: Basic** — Plugin-based toggle integration. When Yoast SEO is installed and the integration is enabled, SyteOps writes SEO metadata into Yoast's own fields. There is no separate settings screen.

SyteOps can use [Yoast SEO](https://yoast.com) as the SEO engine for **Content Pipelines** and the **Review Portal**. With the integration on, the SEO **title**, **meta description**, **focus keyword** and **cornerstone** flag that a pipeline produces — or that a reviewer sets in the portal — are written into the fields Yoast already reads, so they appear in the Yoast sidebar and metabox exactly as if they had been typed there.

:::important One SEO plugin at a time
SyteOps connects to **one** SEO plugin at a time. Turning on Yoast SEO automatically turns off Squirrly SEO or Rank Math if either was on. This is deliberate: two plugins writing the same page's title is how a site ends up with a `<title>` nobody can account for.
:::

## What it does

- **SEO title** — written only when someone actually sets one, in the Review Portal's SEO panel. See "About the SEO title" below; this behavior is different from the Squirrly integration and it matters.
- **Meta description** — the description a pipeline generates, or that a reviewer edits in the portal.
- **Focus keyword** — the article's target keyword, so Yoast's own analysis has something to score against.
- **Cornerstone content** — an article you mark as a **pillar** in the Review Portal is flagged as cornerstone content in Yoast.

## Requirements

- SyteOps installed and activated
- Yoast SEO installed and activated
- The Yoast SEO integration enabled in SyteOps

## Setup

1. Go to the **Integrations** tab in SyteOps.
2. Toggle **Yoast SEO** on. If another SEO plugin was connected, it switches off.
3. Save.

That's the whole setup. Content Pipelines and the Review Portal start writing to Yoast on the next article.

## About the SEO title

**Leave the SEO title blank unless you want to override it.** Yoast builds a page's title from the template you set under *Yoast SEO → Settings → Content types* — usually something like `Title | Site Name`. That template is used only while the per-article SEO title is **empty**. The moment an article has its own SEO title, the template is ignored for that article.

So SyteOps never invents one. Nothing is written to the SEO title field unless a reviewer deliberately types one in the Review Portal's SEO panel, and clearing that field removes the override and hands the article back to your template.

This is the one place the Yoast integration behaves differently from the Squirrly SEO integration, which does auto-generate a title. If you have used the Squirrly integration before, expect the SEO title field here to stay empty — that is correct, and your titles are coming from your Yoast template.

## Cornerstone content

Marking an article as a **pillar** in the Review Portal's GEO panel also marks it as **cornerstone content** in Yoast. Unmarking it removes the flag.

The mark travels one way only — SyteOps to Yoast. Flagging an article as cornerstone inside Yoast does not make it a pillar in SyteOps, because SyteOps keeps its own record of which articles carry the site's authority and uses it for more than Yoast.

## Troubleshooting

### The Yoast toggle switched itself off

Another SEO plugin was turned on. Only one SEO plugin can be connected at a time; whichever was switched on most recently wins.

### The toggle says "Not Installed"

Yoast SEO is not active on this site. Install and activate it, then reload the Integrations tab.

### The SEO title field is empty in Yoast

That is the expected state — see "About the SEO title" above. Your title is coming from your Yoast title template. Type a title in the Review Portal's SEO panel only when a specific article needs to differ.

### Values are not appearing

1. Confirm the Yoast SEO integration is toggled **on**.
2. Confirm the Yoast SEO plugin is active.
3. Confirm the article actually went through a Content Pipeline, or had its SEO set in the Review Portal — those are the only paths that write.
