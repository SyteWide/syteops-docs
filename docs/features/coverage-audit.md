---
sidebar_position: 12.7
title: Coverage (Answer-Engine Audit)
description: Audit every article your answer engines describe — what the AI analysis has covered, what is missing, and what is still waiting for review — and analyze a batch of articles in one go.
---

# Coverage — Answer-Engine Audit

The **Coverage** view answers one question: across all the articles your AI answer files describe, what has actually been run against each one?

It puts every one of those articles in a single table — whether the GEO analysis has ever run, how the article scored, how many questions and answers it has, whether anyone has reviewed those answers, and whether its meta description, SEO title, focus keyword and pillar mark are filled in. From the same table you can run the GEO analysis over a batch of articles at once, instead of opening them one at a time.

## Where to find it

Open the **Content Pipelines** tab and click the **Coverage** pill in the row of view links at the top.

Coverage is for SyteOps administrators only. It is deliberately **not** part of the [Review Portal](review-and-publish-your-post.md) — a reviewer working on one article already has an **Analyze GEO readiness** button in that article's GEO panel, and that is a different, one-article-at-a-time action. Coverage is the whole-library view.

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

## What a run will and will not do

The limits are deliberate, and each one is visible to you rather than silent:

- **At most 25 articles per run.** Ask for more and the run is **refused outright** — it is not quietly trimmed to the first 25, because then you would believe articles had been analyzed when they had not.
- **Articles are analyzed one at a time**, so the progress you see is real progress, not a guess. The button reports which article it is on.
- **Clicking the button a second time stops the run** after the article in progress finishes. You never lose a call you have already paid for, and you never have to wait out a batch you changed your mind about.
- **Only one bulk run can be in flight at a time**, across the whole site. If someone else is already running one, you are told to wait rather than doubling up the AI calls.
- **Some articles are skipped**, and every skip is reported with its reason:
  - An article **somebody currently has open in the Review Portal** is skipped, so a bulk run cannot overwrite work happening under a reviewer's hands.
  - An article whose **exact current text already failed** is skipped, rather than being sent to the provider to fail identically and bill you again. **Editing the article makes it eligible again** — different text is a different attempt. The **Retry** link on a failed row clears that block for a single article when you want to try it as-is.

When the run finishes you get a summary of what was analyzed, what failed and what was skipped. Reload the page to see the updated table.

## Where the run is recorded

Every bulk run writes **one row** in the Content Pipelines [Runs dashboard](content-pipelines.md#runs-dashboard) — one row for the run, not one per article, so a 25-article batch does not bury the rest of your history.

Filter the Runs table with the **Coverage** source pill to see only these runs. Each row records how many articles were **analyzed**, how many **failed** and how many were **skipped**, along with the model that was billed — so the spending is answerable after the fact, not just at the moment you approved it.
