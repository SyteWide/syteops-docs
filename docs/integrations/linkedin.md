---
sidebar_position: 31
title: LinkedIn Integration
description: Let people post a live article to their own LinkedIn profile from the Review Portal's Share to menu, with the link shown as a preview card.
---

# LinkedIn Integration

**Tier: Extended** — Lets each person connect their own LinkedIn account from the Review Portal and post a live article to their LinkedIn profile. There is no LinkedIn app to create and nothing to paste: LinkedIn sign-in is provided to your site through its Management Connection.

Once this is set up, the **Share to** menu in the Review Portal's top bar can post a live article straight to the reviewer's own LinkedIn profile. The person writes the post, sees the link attached as a preview card (title, summary and featured picture), and presses **Post to LinkedIn** without leaving the portal. The link carries the LinkedIn tracking tags your share links already use.

Without it, the LinkedIn row in Share to still works: it copies the text and opens LinkedIn's own share window with the link.

## Before you start

- The site is connected to its Management Server (a Management Connection; see [Server Connections](../features/server-connections.md)), and that server offers LinkedIn sign-in. The site checks about once a day, and again when an administrator opens the Integrations tab while sign-in is not offered yet (at most every 10 minutes), so a newly offered sign-in shows up as soon as you open that tab.
- The site is served over **HTTPS**. Sign-in returns only to a secure address.
- The **Share to menu** permission open for the people who should post (Content Pipelines → Review Portal → Reviewer editing permissions). It is hidden for reviewers until you open it; SyteOps Admins always have it.

## Setup

Under **Integrations**, switch **LinkedIn** on and save. The LinkedIn tile then says whether people can connect yet:

- **"People connect their own LinkedIn account from the Review Portal's Share to dialog"**: you are done.
- **"LinkedIn sign-in is not offered to this site yet"**: the site has no Management Connection, or its Management Server does not offer LinkedIn sign-in. Share to keeps opening LinkedIn's own share window until it does.

## Connecting and posting

Each person connects their own account once:

1. Open a **live** article in the Review Portal, then **Share to → LinkedIn**.
2. Choose **Connect LinkedIn**. A small window opens with a confirmation page that names your site: choose **Continue** only if you started this from that site. Then sign in to LinkedIn and allow access. Nothing is posted yet.
3. The window closes and the dialog shows your name and picture. Write your post (up to 3,000 characters) and choose **Post to LinkedIn**.
4. The status line reads **Posted to LinkedIn · View post**. Each post is recorded on the article.

The post is public and goes to your own profile. Posting to a Company Page comes in a later release.

Posting the same text twice within a minute is refused, so a double click or a retry cannot post twice. Your text posts exactly as you wrote it. A word that starts with `#`, such as `#launch`, becomes a LinkedIn hashtag. LinkedIn counts a backslash for each of these characters in the 3,000 limit: `\ | { } @ [ ] ( ) < > # * _ ~`. A WebP or AVIF featured picture is converted to JPEG for the card.

## Reconnecting and disconnecting

- LinkedIn's sign-in lasts about 60 days, and LinkedIn does not give apps like this one a way to renew it on their own. When it runs out, the dialog shows **Reconnect LinkedIn**; sign in again the same way.
- **Disconnect**, beside your name in the dialog, removes your connection from this site. LinkedIn offers apps no way to withdraw the permission themselves, so to remove it on LinkedIn's side too, remove the app in your LinkedIn privacy settings.
- Switching the integration off stops new connections and posts at once; people's stored connections stay until they disconnect. The same happens when the site's Management Server stops offering LinkedIn sign-in.

## Troubleshooting

- **"We could not confirm the post"**: LinkedIn did not answer in time, so the post may exist. Check your LinkedIn profile before posting again; the same text stays blocked for 10 minutes so it cannot be posted twice by accident.
- **"did not allow this post"** or **"refused this post"**: LinkedIn rejected the request itself, so trying again will not help. For the first, reconnect and approve posting; for the second, check the text, or copy it and post it yourself.

- **"Signing in to LinkedIn did not finish"**: the sign-in was interrupted or took too long. Close the window and choose Connect again.
- **"Signing in to LinkedIn is not offered to this site right now"**: the Management Server stopped offering LinkedIn sign-in. The dialog switches to LinkedIn's own share window; the LinkedIn tile on the Integrations tab shows when it is offered again.
- **"needs a secure HTTPS connection"**: the site, or its Management Server, is not served over HTTPS on the standard port. Trying again will not help until it is.
- **"Too many sign-ins were started just now"**: wait a minute, then choose Connect again.
- **Connect LinkedIn does not appear, or the window closes with an error at once**: check the LinkedIn tile on the Integrations tab (see Setup), and that the site is served over HTTPS.
- **The sign-in window says the link expired or was already used**: a sign-in link works once and for 10 minutes. Close the window and choose Connect again.
- **The window was blocked**: allow pop-ups for your site and try again.
- **The post appears without a picture**: the article has no featured picture, or LinkedIn refused the upload. The link and its title are still posted.
- LinkedIn limits how often one person can post through apps each day.
