---
sidebar_position: 12.7
title: Coverage (Answer-Engine Audit)
description: Audit every article your answer engines describe — what the AI analysis has covered, what is missing, and what is still waiting for review — analyze a batch of articles in one go, and fill in missing SEO titles, meta descriptions, focus keywords and picture alt text with AI suggestions you approve one by one.
---

# Coverage — Answer-Engine Audit

The **Coverage** view answers one question: across all the articles your AI answer files describe, what has actually been run against each one?

It has two modes. **GEO** is the answer-engine audit described below. **SEO** turns the same table into a bulk pass over your SEO titles, meta descriptions, focus keywords and the alt text on your pictures — see [Filling in SEO fields in bulk](#filling-in-seo-fields-in-bulk) and [Describing your pictures](#describing-your-pictures).

In GEO mode it puts every one of those articles in a single table — whether the GEO analysis has ever run, how the article scored, how many questions and answers it has, whether anyone has reviewed those answers, and whether its meta description, SEO title, focus keyword and pillar mark are filled in. From the same table you can run the GEO analysis over a batch of articles at once, or mark existing stored answers as reviewed in a batch without re-running AI.

## Where to find it

Open the **Content Pipelines** tab and click the **Coverage** pill in the row of view links at the top. The **Mode** pills just under the heading switch between **GEO** and **SEO**.

Coverage is for SyteOps administrators only. It is deliberately **not** part of the [Review Portal](review-and-publish-your-post.md) — a reviewer working on one article already has an **Analyze GEO** button in that article's GEO panel, and that is a different, one-article-at-a-time action. Coverage is the whole-library view.

## Which articles are listed

Coverage lists exactly the content your answer engines describe — the same content types you picked under **Content Pipelines → Review Portal settings → Answer-engine publishing → Content types**. Change that setting and Coverage follows it, so the two can never disagree about what is in scope. (See [Choosing which content types are covered](llms-txt.md#choosing-which-content-types-are-covered).)

Beyond that:

- **Published articles only**, unless you switch on the **Include drafts & scheduled** filter — useful when you want to get a draft into shape before it goes live.
- **Password-protected articles are never listed.** They are not public, so nothing SyteOps publishes describes them.

## What each column tells you

| Column | What it shows |
| --- | --- |
| **Article** | The article title, linked straight to its editor so you can open it without hunting for it. |
| **GEO analysis** | Which of the four states the analysis is in — see [The four GEO states](#the-four-geo-states) below. |
| **Readiness** | The readiness score from the last analysis: how well the article is structured to be picked up and cited by AI answer engines. |
| **Answers** | How many of the article's recorded questions have an answer written for them. A question with no answer is not much use to an answer engine. |
| **Reviewed** | Whether someone has ticked **I have reviewed these answers** for this article. Until they have, its answers are held back from every answer-engine surface. |
| **Awaiting review** | How many of the article's answers are currently being held back, waiting for that confirmation. |
| **Meta description** | Whether the article has one. This is taken from the article's excerpt. |
| **SEO title** | Whether a search-result headline has been set. |
| **Focus keyword** | Whether a focus keyword has been set. |
| **Pillar** | Whether the article is marked as a pillar (cornerstone) article — see [Pillar articles](llms-txt.md#pillar-articles). |

The **SEO title** and **Focus keyword** columns appear only when you have an SEO tool integration switched on. With no SEO plugin connected there is nowhere for those values to live, so the columns stay out of the way.

## The four GEO states

| State | What it means |
| --- | --- |
| **Never analyzed** | The GEO analysis has never run on this article. Nothing has been recorded for it at all. |
| **Stale** | The analysis ran, but the article has been edited since. What was recorded describes an older version of the text. |
| **Current** | The analysis matches the article's current words. Nothing is owed here. |
| **Analysis failed** | The last attempt errored. The row shows the reason and a **Retry** link so you can try that article again. |

:::note "Never analyzed" is not the same as a score of zero
A readiness score of 0 is a result — the analysis ran and found the article poorly structured for answer engines. **Never analyzed** means no analysis has happened, so there is no result to read. Treat the first as something to fix in the article, and the second as something to run.
:::

## Filtering the list

Three sets of filters sit above the table, and they combine:

- **By GEO state** — **Never analyzed**, **Stale**, **Current** or **Analysis failed**. Filtering to *Never analyzed* is the usual way to find everything that has never been looked at.
- **By gap** — **Answers awaiting review**, **No meta description**, **No focus keyword** or **No SEO title**. Each one narrows the table to articles missing that single thing, so you can clear one kind of gap across the whole library in one sitting. The keyword and SEO title filters appear only when an SEO tool integration is switched on.
- **Include drafts & scheduled** — a toggle that widens the list beyond published articles.

**Clear filters** puts you back to the full list.

## Analyzing several articles at once

Tick the articles you want — there is a **Select all on this page** box if you want the visible page — and click **Analyze N selected**.

Before anything runs, a confirmation dialog tells you exactly what you are about to spend:

- The **AI provider** that will be called.
- The **model** it will use.
- The **maximum tokens per article**.

It also states plainly that **this spends money on your own AI account, one call per article**. SyteOps does not estimate a dollar figure, because token pricing differs per provider and changes without notice — a number there would look authoritative and be wrong. The provider, model and ceiling are the facts you need to judge the cost yourself.

:::warning The "waiting for review" count will go up
A run writes new questions and answers, and new answers are held back until a person reviews them. So the number of articles with answers waiting for review will **increase** after a bulk run — often sharply, if you analyzed a large batch.

That is the review gate working exactly as designed, not a fault. Work through those articles in the [Review Portal](review-and-publish-your-post.md) and tick **I have reviewed these answers** on each; the answers reach your answer-engine surfaces at that point. See [Reviewing the answers before they go live](llms-txt.md#reviewing-the-answers-before-they-go-live).
:::

## Accepting stored answers as reviewed

Use **Accept answers as reviewed** when articles already have stored question-and-answer pairs and you only need to confirm them for publication. It uses the same row selection and **Select all on this page** control as bulk analysis.

Before the run starts, a confirmation dialog explains that this **publishes answers that were held back for review** onto your answer-engine surfaces. It does **not** run AI and does **not** spend against your AI account.

The run works the same way as analysis — one article at a time, a **Stop** control, and at most one bulk Coverage run at a time across the site. Articles with **no stored answers** are skipped, as are articles **somebody currently has open in the Review Portal**.

When the run finishes you get a summary of what was accepted, what failed and what was skipped. Reload the page to see the updated **Reviewed** column. Until answers are reviewed this way (or in the Review Portal), they stay off public answer-engine surfaces.

## What a bulk run will and will not do

Both **Analyze** and **Accept** share the same run mechanics — one article at a time, a **Stop** control on the button you started, and at most one bulk Coverage run at a time across the site. If someone else is already running one, you are told to wait.

The limits below apply to **both** run types unless a bullet says otherwise:

- **At most 25 articles per run.** Ask for more and the run is **refused outright** — it is not quietly trimmed to the first 25.
- **Articles are processed one at a time**, so the progress you see is real progress.
- **Clicking Stop** on the active button halts the run after the article in progress finishes.
- **Only one bulk run can be in flight at a time** on the site.
- **Some articles are skipped**, and every skip is reported with its reason:
  - An article **somebody currently has open in the Review Portal** is skipped.
  - **Analyze only:** an article whose **exact current text already failed** is skipped rather than being sent to the provider to fail identically and bill you again. **Editing the article makes it eligible again.** The **Retry** link on a failed row clears that block for a single article.
  - **Accept only:** an article with **no stored answers** is skipped.

### After an Analyze run

When an analyze run finishes you get a summary of what was analyzed, what failed and what was skipped. Reload the page to see the updated table. You may lose a paid completion you have already started if you stop mid-run, but you never have to wait out a batch you changed your mind about.

### After an Accept run

When an accept run finishes you get a summary of what was accepted, what failed and what was skipped. Reload the page to see the updated **Reviewed** column. Accept does not spend against your AI account.

## Filling in SEO fields in bulk

Switch **Mode** to **SEO** and the table changes to four columns — **SEO title**, **Meta description**, **Focus keyword** and **Structure** — showing what each article holds today, with a **Missing** badge where there is nothing. The row picker, **Select all on this page**, the gap filters and the **Include drafts & scheduled** toggle all work exactly as they do in GEO mode. The **Structure** column is a read-only report on the article body itself — nothing here proposes or writes anything — giving a one-line summary of its headings, images and links (hover it for the full list of anything worth a second look), with four filter pills that narrow the table to a specific problem: **Multiple H1** (more than one top-level heading), **Heading order** (a heading level skipped, such as jumping from an H2 straight to an H4), **Images without alt** (a picture in the body with no alt text), and **No internal links** (nothing in the body linking to another page on your own site); because it reads the article's content directly, it works even with no SEO tool integration switched on.

This is a **two-step** workflow, and the split is deliberate: unlike answers, an SEO title appears in a search result the moment it is stored, so nothing is written until you say so.

### Step 1 — Propose

Tick the articles you want and click **Propose for N selected**. A confirmation dialog names the AI provider, the model and the maximum tokens per article, states that this **spends money on your own AI account**, and says plainly that **nothing is written yet**.

The run works one article at a time, with a **Stop** control, and produces a suggestion for each field that is empty:

- **Focus keyword** — one short phrase drawn from the article body.
- **SEO title** — a search-result headline, kept under 60 characters, and written around the focus keyword when the article has one (or the one just suggested for it).
- **Meta description** — the same writer the Review Portal's **Generate with AI** button uses.

Two optional tick boxes sit beside the buttons and change what the run is allowed to touch:

- **Re-propose existing keyword** — also suggests a keyword for articles that already have one.
- **Overwrite existing values** — also suggests for fields that are already filled, in all three columns.

Both are **off** by default, so a plain run only fills gaps and never proposes over work somebody already did. Whichever you tick is named in the confirmation dialog before the run starts.

Articles are skipped, with the reason reported, when somebody currently has them **open in the Review Portal**, when they are **out of scope**, or when **every field the run may touch is already filled**.

### Step 2 — Review and accept

Each suggestion appears under the current value in its own cell, with a tick box. Everything a run proposed starts ticked.

- Untick anything you do not want — that is **Skip** for that field.
- **Accept all fields** and **Skip all fields** tick or untick everything on the page at once.
- Click **Accept N selected** to write the ticked fields.

The accept run does **not** run AI and does **not** spend against your AI account. Its confirmation dialog tells you how many fields will be written and reminds you that they appear in search results as soon as they are stored.

Three things are refused rather than written, and each is reported:

- **The value changed since it was proposed.** If somebody edited that SEO title in the Review Portal after the suggestion was made, the suggestion is discarded rather than written over their work. The article goes back into the propose queue.
- **The field is already filled** and this run was not started with **Overwrite existing values** ticked.
- **No SEO tool is switched on**, so there is nowhere for the value to be stored. Turn one on under **Integrations** first. (Proposing still works without one — only writing needs it.)

Suggestions are kept with the article, so you can propose today, reload, and accept tomorrow.

### What the SEO mode writes

Accepted values go through exactly the same path the Review Portal uses, so an article filled in here and one filled in by a reviewer end up in the same state. The meta description is stored as the article's excerpt and mirrored into your SEO plugin; the SEO title and focus keyword go into whichever SEO plugin you have connected.

Both SEO runs share the same limits as the GEO ones: **at most 25 articles per run**, one at a time, **one bulk Coverage run at a time** across the whole site, and a **Stop** control that halts after the article in progress. The picture runs share all of that and add a second ceiling of their own: **at most 50 pictures per run**.

## Describing your pictures

The same SEO table has two more columns — **Pictures** and **File name** — and its own pair of buttons below the SEO ones.

**Pictures** lists every image the article shows that also lives in your media library: its featured image and every picture in the body. A badge says how many still need work, meaning the picture has no alt text, has alt text that is really just the file's name, or has no title on its media record. If some of the article's images are hotlinked from another site, a note says so — there is no media record for those, so nothing SyteOps writes can reach them.

Like the SEO fields, this is a **two-step** workflow.

### Step 1 — Describe

Tick the articles you want and click **Describe pictures**. The confirmation dialog tells you how many **pictures** will be described, because that is what you are billed for — one AI call per picture, not per article. It also names the provider, the model and the token ceiling, and says plainly that nothing is written yet.

The AI looks at the picture itself and, using the article around it for context, suggests three things: **alt text** (one plain sentence for someone who cannot see the image), a **caption**, and a **title** for the media record.

- **At most 50 pictures per run.** Ask for more and the run is **refused outright** — it is not quietly trimmed.
- A picture that is already described is skipped, and so is one that already has a suggestion waiting for you.
- A picture the AI could not read, or whose file type it does not accept, is **remembered** so the next run does not pay to be told the same thing again. Replacing the file makes it eligible once more.

One optional tick box changes what a run is allowed to touch:

- **Overwrite existing picture text** — also describes pictures that already have alt text or a title.

### Step 2 — Review and accept

Each suggestion appears in the Pictures cell under the picture's file name, with a tick box, already ticked. **Accept all picture fields** and **Skip all picture fields** tick or untick everything on the page. Click **Accept picture text** to write what is left ticked. That step runs no AI and spends nothing.

:::warning Alt text belongs to the picture, not to the article
If the same picture appears on three articles, changing its alt text changes how all three describe it. SyteOps will **not** replace alt text on a picture another article is showing unless you tick **Overwrite shared pictures** — and the confirmation dialog says so before the run starts.
:::

Suggestions are refused rather than written, with the reason reported, when:

- **The value changed since it was suggested** — somebody typed real alt text in between, and their wording wins. That picture goes back into the describe queue.
- **The field is already filled** and the run was not started with **Overwrite existing picture text** ticked. The exception is text that is only the file's own name, which is replaced without asking, because nobody chose it.
- **Another article shows that picture** and **Overwrite shared pictures** was not ticked.

### The File name column

This column reports pictures whose media record says nothing the file name does not already say — an `IMG_4821.jpg` with no title, for example. It is **report only**. Renaming a file means finding and updating every place it is referenced, so it is not done from this screen; each name links to that picture in the **Media Library**.

## Where the run is recorded

Every bulk run writes **one row** in the Content Pipelines [Log](content-pipelines.md#log) — one row for the run, not one per article, so a 25-article batch does not bury the rest of your history.

Filter the runs list with the **Coverage** source pill to see only these runs. Each row records how many articles were **analyzed**, **accepted**, **proposed** for, **described** or **written**, how many **failed** and how many were **skipped**, and — for SEO and picture runs — which fields moved on each article. Runs that call AI also record the model that was billed, so AI spending is answerable after the fact, not just at the moment you approved it.
