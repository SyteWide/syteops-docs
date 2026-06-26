---
sidebar_position: 25
title: LLMS Amplifier Integration
description: Use LLMS Amplifier as the GEO engine for Content Pipelines to generate rich llms.txt and llms-full.txt files for AI search engines.
---

# LLMS Amplifier Integration

**Tier: Extended** — Plugin-based integration with its own settings area. When the LLMS Amplifier plugin is installed, you can choose it as the engine for the GEO step in Content Pipelines instead of the built-in generator.

[LLMS Amplifier](https://brianwinum.com/llms-amplifier) generates `llms.txt` and `llms-full.txt` files that describe your site's content for AI search engines. SyteOps can drive LLMS Amplifier's regeneration as the **GEO** stage of a content pipeline, so your AI-discovery files refresh automatically after cross-linking and SEO have run.

## Native GEO vs. LLMS Amplifier

SyteOps ships a built-in GEO engine that generates a basic `llms.txt`. LLMS Amplifier is an optional, richer alternative:

| | Built-in GEO | LLMS Amplifier |
|---|---|---|
| Files | `llms.txt` | `llms.txt` + `llms-full.txt` |
| Content sources | Posts | Posts, page content, SEO descriptions, custom fields, products |
| Preview (dry-run) | Yes | No |
| Requires a plugin | No | Yes (LLMS Amplifier) |

The built-in engine stays the default. LLMS Amplifier is used only when you select it.

## Requirements

- SyteOps installed and activated
- The Content Pipelines module activated
- LLMS Amplifier plugin installed and activated
- LLMS Amplifier integration enabled in SyteOps

## Setup

### 1. Enable the integration

1. Go to the **Integrations** tab in SyteOps
2. Toggle **LLMS Amplifier** ON
3. Save

If the toggle shows **Not Installed**, install and activate the LLMS Amplifier plugin first.

### 2. Select it as the GEO engine

1. Open the **Content Pipelines** tab and edit (or add) a recipe
2. On the **GEO** stage row, use the **Engine** selector and choose **LLMS Amplifier**
3. Save the recipe

The GEO provider card on the Runs dashboard will now read **LLMS Amplifier** when it is the active engine.

### 3. Set LLMS Amplifier to Manual

LLMS Amplifier can regenerate on its own after each publish. To avoid it running at the same time as the pipeline, set its update frequency to **Manual** so the pipeline is the only trigger:

1. Open the LLMS Amplifier settings page
2. Set **Update Frequency** to **Manual**
3. Save

If LLMS Amplifier is not set to Manual, the GEO provider card shows a reminder.

## How it runs

When a pipeline runs the GEO stage with LLMS Amplifier selected, SyteOps asks LLMS Amplifier to rebuild its files for the whole site. Because GEO runs after the cross-linking and SEO stages, the rebuilt files reflect those changes. Dry-run (preview) mode is not available for LLMS Amplifier — preview runs report that the step was skipped.

## Managing update frequency from SyteOps

When LLMS Amplifier is the GEO engine in a Content Pipeline, it should regenerate `llms.txt` only when the pipeline runs — not also on its own publish trigger. You can control this from inside SyteOps:

- **System / API tab → LLMS Amplifier → Update Frequency** — choose Immediate, Daily, Weekly, or **Manual only**. Set it to **Manual only** so the pipeline is the sole trigger.
- The GEO card on the Content Pipelines → Runs view also shows a one-click **Set to Manual** button whenever Amplifier isn't already set to Manual.

These controls adjust LLMS Amplifier's own setting; you can change it back at any time.

## Troubleshooting

### The GEO step says "unavailable"

1. Confirm the LLMS Amplifier plugin is installed and activated
2. Confirm the LLMS Amplifier integration is toggled ON in the Integrations tab
3. Confirm **LLMS Amplifier** is the selected engine on the recipe's GEO stage

### llms.txt regenerates twice

Set LLMS Amplifier's **Update Frequency** to **Manual** so only the pipeline triggers it (see Setup step 3).
