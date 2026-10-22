---
sidebar_position: 12.7
title: Google index status
description: Connect Google Search Console with a read-only service account so the Review Portal shows whether Google has indexed a published page.
---

# Google index status

Once Search Console is connected, the **SEO** card of the Review Portal shows whether Google has indexed a published page or post, for example **Google: Indexed (last crawled October 3, 2026)** or **Google: Not indexed: Discovered - currently not indexed**. When Google has not indexed the page, the **Request indexing on Google** row of the **Copy link** or **Share to** menu is highlighted, because that is the next step.

SyteOps only ever **reads** from Search Console. It uses Google's URL Inspection, the same check as the inspection bar in Search Console, with read-only access. It never submits, removes or changes anything in Google, and it never uses Google's Indexing API.

## Before you start

- A Google account that can use the [Google Cloud console](https://console.cloud.google.com/).
- Owner access to the site's property in [Google Search Console](https://search.google.com/search-console), so you can add a user.
- We recommend one service account for all your sites, or one per client: a service account can be added to as many Search Console properties as you like, and removing it from one property leaves the others working.

## One-time setup in Google

### 1. Create a project and turn on the Search Console API

In the [Google Cloud console](https://console.cloud.google.com/), create a project (or pick an existing one), open **APIs & Services → Library**, search for **Google Search Console API** and choose **Enable**.

### 2. Create a service account and a JSON key

Open **IAM & Admin → Service Accounts** and choose **Create service account**. Give it a name and finish without granting it any project roles. Open the new account, go to **Keys → Add key → Create new key**, choose **JSON**, and download the file. Keep it somewhere safe.

If Google Cloud says that creating keys is disabled, your organization blocks service account keys with the **iam.disableServiceAccountKeyCreation** policy (Google turns it on for organizations created since 2024). An organization administrator can allow keys for this one project under **IAM & Admin → Organization policies**, or you can create the project under a Google account that is not part of the organization.

The file holds the account's email address (it looks like `your-account@your-project.iam.gserviceaccount.com`), a private key, and some project details.

## For each site

### 3. Add the service account to the site's property

In Search Console, open the site's property, then **Settings → Users and permissions → Add user**. Enter the service account's email address and choose **Restricted** (or **Full**, if checks say the account cannot see the property). SyteOps only uses the account to read Search Console, whichever you choose.

The property must be the one SyteOps checks: the **Search Console property** set under **Request indexing** in the Review Portal settings, or your site's domain property (`sc-domain:` followed by your domain) when that field is blank.

### 4. Paste the key into SyteOps

Open **Content Pipelines**, then the Review Portal settings, and find **Request indexing** under **Social sharing**. Open the downloaded file in a text editor, copy everything in it, paste it into **Index status** and choose **Save key**.

SyteOps checks that it is a service account key and asks Google to accept it (a sign-in only, which uses none of your daily checks), then stores it encrypted on your site; it is never shown again. A key Google does not accept is not saved, and the message says why. The row then shows the service account's email address with a copy button, and the reminder to add it on the property. **Save key** and **Remove key** act at once; they do not wait for **Save settings**.

To stop showing the index status, choose **Remove key**. If the row says the stored key can no longer be read on this site (this can happen after the site is cloned or moved to a new server), choose **Remove stored key** and paste the key again.

## In the Review Portal

The status line appears in the **SEO** card for people who can publish the page, once it is published and public (not password protected, private or marked noindex). Other reviewers do not see it.

- **Google: not checked yet** — nobody has checked this address yet. The portal checks it a moment after the page opens.
- **Google: Indexed** — Google has indexed the page; the date it last crawled it follows when Google reports one.
- **Google: Not indexed: …** — Google has not indexed the page, followed by Google's own reason, such as **Discovered - currently not indexed** or **Crawled - currently not indexed**. Use **Request indexing on Google** in the **Copy link** or **Share to** menu to ask Google to look at it.
- **Search Console isn't connected.** — no key is saved yet. Only a SyteOps Admin, who can paste the key, sees this hint; other publishers see no line until Search Console is connected.

**Check now** asks Google again straight away, unless the page was checked in the last minute: then it shows that answer again. Otherwise a result is kept for a day when the page is indexed, and for an hour when it is not, and opening the portal after that checks again by itself. Changing the page's address counts as a new page.

If a check fails, the line keeps the last answer and **Check now** says why:

- **The connected service account cannot see this Search Console property.** Add its address as a user on the property (step 3), and make sure the property in the settings is the right one.
- **The Search Console API is turned off in the service account's Google Cloud project.** Turn on **Google Search Console API** in that project (step 1), then check again.
- **Google refused the check: this page is not part of the Search Console property in the settings.** Make sure the **Search Console property** under **Request indexing** covers this site's address.
- **Google is limiting index checks right now.** Wait a while and try again.
- **Daily check limit reached.** Each site makes at most 300 checks a day. Google allows 2,000 a day for each property, but every tool that reads the same property through Google's API (an SEO or rank-tracking tool, for example) shares that allowance, so SyteOps keeps to a modest share. Checks you make by hand in the Search Console website don't count. The count starts again at midnight Pacific time. A developer can change the limit with a filter, up to Google's 2,000.
- **Google could not be reached.** A temporary problem; try again in a minute.
- **Search Console is not connected, or Google no longer accepts its key.** Paste the key again, or create a new key if the old one was deleted or disabled.

## Backups and other sites

The key is never included in a backup, a restore point or a settings export. After restoring or importing settings, paste the key again on each site.
