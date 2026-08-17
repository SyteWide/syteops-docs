---
sidebar_position: 25
title: LLMS Amplifier Integration
description: Use LLMS Amplifier as the GEO engine for Content Pipelines to generate rich llms.txt and llms-full.txt files for AI search engines.
---

# LLMS Amplifier Integration

**Tier: Extended** — Plugin-based integration with its own settings area. When the LLMS Amplifier plugin is installed, enabling this integration makes it the engine for the GEO step in Content Pipelines instead of the built-in generator (an either/or choice) — no separate setup step.

[LLMS Amplifier](https://brianwinum.com/llms-amplifier) generates `llms.txt` and `llms-full.txt` files that describe your site's content for AI search engines. SyteOps can drive LLMS Amplifier's regeneration as the **GEO** stage of a content pipeline, so your AI-discovery files refresh automatically after cross-linking and SEO have run.

## Native GEO vs. LLMS Amplifier

SyteOps ships a built-in GEO engine that generates a basic `llms.txt`. LLMS Amplifier is an optional, richer alternative:

| | Built-in GEO | LLMS Amplifier |
|---|---|---|
| Files | `llms.txt` | `llms.txt` + `llms-full.txt` |
| Content sources | Posts | Posts, page content, SEO descriptions, custom fields, products |
| Preview (dry-run) | Yes | No |
| Requires a plugin | No | Yes (LLMS Amplifier) |

GEO is either/or: the built-in engine stays the default until you turn LLMS Amplifier on, at which point it — and only it — generates `/llms.txt`. Turning LLMS Amplifier off switches straight back to the built-in engine.

## Requirements

- SyteOps installed and activated
- The Content Pipelines module activated
- LLMS Amplifier plugin installed and activated
- LLMS Amplifier integration enabled in SyteOps

## Setup

Turning LLMS Amplifier on makes it your GEO engine — there's no separate engine-selection step, and nothing else to configure by hand.

### Turn it on

Either of these does the same thing:

- **From the Integrations tab** — go to **Integrations**, toggle **LLMS Amplifier** ON, and save.
- **From the Content Pipelines tab** — open the **GEO** provider card on the Runs dashboard and click **Use LLMS Amplifier engine**.

If the toggle shows **Not Installed** (or the GEO card shows no engine-switch button), install and activate the LLMS Amplifier plugin first.

Turning it on automatically:

- Sets LLMS Amplifier's own **Update Frequency** to **Manual**, so it regenerates only when a Content Pipeline runs — never on a separate schedule of its own.
- Turns **AI Search Discovery** (GEO) on, if it wasn't already.
- Makes LLMS Amplifier the engine behind `/llms.txt` and `/llms-full.txt`, standing the built-in generator down.

The GEO provider card on the Content Pipelines Runs dashboard reads **LLMS Amplifier** once this is done.

### Turn it off

Toggle **LLMS Amplifier** off on the Integrations tab, or click **Use native engine** on the GEO card — either reverts to the built-in generator immediately. AI Search Discovery itself stays on; only the engine changes.

:::note
The built-in generator serves `llms.txt` *virtually* — it does not write a file to disk. LLMS Amplifier, by contrast, writes real `llms.txt` / `llms-full.txt` files at your site root. If you switch back to the built-in generator and those files are still on disk, your web server keeps serving the older file instead of the fresh virtual one. If you want the built-in output to take over, remove the leftover `llms.txt` (and `llms-full.txt`) files LLMS Amplifier created.
:::

## How it runs

When a pipeline runs the GEO stage with LLMS Amplifier as the engine, SyteOps asks LLMS Amplifier to rebuild its files for the whole site. Because GEO runs after the cross-linking and SEO stages, the rebuilt files reflect those changes. Dry-run (preview) mode is not available for LLMS Amplifier — preview runs report that the step was skipped.

SyteOps also rebuilds LLMS Amplifier's files on its own when something changes what they should say but no pipeline run would have fired: editing an article's answers after it is live, marking it as a pillar, excluding it from `llms.txt`, changing which content types are covered, publishing content of a type either side covers, or unpublishing, trashing or deleting an article. Those rebuilds are batched, so a run of edits produces one rebuild, they happen in the background, and if something else rebuilt the files in the meantime SyteOps skips its own pass.

"Either side" matters here: SyteOps watches both its own **Content types** setting and LLMS Amplifier's own **Post Types** list. Because SyteOps switches LLMS Amplifier to Manual, it is the only thing left that rebuilds those files — so it has to cover everything they describe, not only the types it analyses itself.

Setting **Update Frequency** to Manual stops LLMS Amplifier scheduling its own recurring rebuilds; it does not stop it repairing a file that is missing or invalid when someone requests it. SyteOps leaves that repair alone.

## Publishing into llms-index.json

Two SyteOps options — **Questions in the LLMS Amplifier index** and **Business identity in the LLMS Amplifier index**, both under Content Pipelines → Review Portal → Answer-engine publishing — write into LLMS Amplifier's `llms-index.json` file.

:::caution The JSON index has to be switched on
Those two options can only publish if LLMS Amplifier is generating `llms-index.json` in the first place. If its JSON index is off, both options sit there switched on and publish nothing.

SyteOps tells you when that is the case: a warning appears above the two options on the Answer-engine publishing card, and an entry appears in LLMS Amplifier's own health panel. Switch the JSON index on in LLMS Amplifier's settings and both start publishing.
:::

Articles you have marked as **Pillar article (cornerstone)** are listed first in that index and carry a `content_role` of `pillar`, so they survive LLMS Amplifier's maximum-pages limit and are the ones an AI tool is pointed to.

## A separate front end (headless)

If LLMS Amplifier is serving a decoupled front end, it works out each article's public address from its own **public routing** settings, and a content type with no route there has no address it can publish. SyteOps never invents one — those entries are published without a link rather than with a wrong one.

Since the two halves of that decision live on two different screens, SyteOps names any content type it covers that has no route: beside the **Content types** setting on the Answer-engine publishing card, and as an entry in LLMS Amplifier's own health panel. Add the route in LLMS Amplifier, or untick the type in SyteOps.

## Update frequency

SyteOps sets LLMS Amplifier's **Update Frequency** to **Manual** automatically the moment it becomes your GEO engine — there's nothing to set yourself. If you also use LLMS Amplifier outside of SyteOps and change its Update Frequency directly on the LLMS Amplifier settings page, know that turning the integration off and back on in SyteOps sets it back to Manual again.

## Troubleshooting

### The GEO step says "unavailable"

1. Confirm the LLMS Amplifier plugin is installed and activated
2. Confirm the LLMS Amplifier integration is toggled ON in the Integrations tab (or turned on from the Content Pipelines GEO card)

### llms.txt regenerates twice

This shouldn't normally happen — SyteOps sets LLMS Amplifier to Manual automatically as soon as it becomes your GEO engine, and re-applies Manual on its own if it ever drifts while LLMS Amplifier is your engine. If you still see double regeneration, set the Update Frequency back to **Manual** on the LLMS Amplifier settings page, or turn the LLMS Amplifier integration off and back on in SyteOps to re-apply it.
