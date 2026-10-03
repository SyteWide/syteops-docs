---
sidebar_position: 12.8
title: Removed pictures
description: See every picture SyteOps is keeping after it was removed, restore one, delete one before its time, and manage the pictures people marked to always keep.
---

# Removed pictures

When a picture is removed with **Delete unused**, from a picture's versions, by the automatic storage clean-up, or with **Delete image** on a profile picture or theme logo, SyteOps does not destroy it straight away. It keeps it for the number of days set in **Keep removed pictures** (default 30). The **Removed pictures** view is the one place that lists all of them for the whole site.

## Where to find it

Open the **Content Pipelines** tab and click the **Removed pictures** pill in the row of view links at the top. The view is for SyteOps administrators. The **Mode** pills switch between **Removed** (pictures being kept) and **Kept** (pictures a person marked to always keep).

## Removed mode

Above the list a line says how many pictures are being kept and how much disk they take, for example "7 pictures held, 805 KB on disk." Each row shows:

- a small thumbnail and the file name, with a **Removed anyway** mark when an administrator removed it after confirming it might still be in use;
- where it was removed from, in plain words: **Unused pictures** on an article, **Picture version** on an article, **Automatic clean-up** on an article, or **Profile picture / theme logo in settings**. The article is a link when it still exists and you may edit it;
- who removed it (**Automatic** for the storage clean-up) and on what day;
- the days left, or **Due** once the period is over;
- the size on disk.

Filter by where it came from, or show only the pictures **Past their date**. Click **Days left** to reverse the order. Notices above the list tell you when pictures are past their date and the daily clean-up could not finish with them, when the last clean-up found kept pictures that something else had deleted, and when a database clean-up plugin on your site would delete the pictures being kept.

### Restore

**Restore** puts the picture back in the media library exactly as it was. A picture removed from an article's versions goes back into its place there. A profile picture or theme logo is restored to the media library only: it is not set again, so choose it again in settings.

### Delete now

**Delete now** deletes a kept picture before its period ends. It is never blind: SyteOps checks the whole site for another use of the picture first, the same way the daily clean-up does. A picture that is still used, that might still be in use, or that the check cannot confirm is **not** deleted and stays kept, and the result names why. Pictures you removed anyway are deleted when nothing new refers to them. Before anything is deleted the confirmation states how many pictures and how much disk they take, and that it cannot be undone.

A picture that has left the list (restored by a colleague, by an import that reused it, or deleted when its period ended) is not explained here: the **Log** view records each restore and each deletion. If you press Restore on a row that has already left, it is reported as no longer held, not as an error.

## Kept mode

Lists the pictures a person marked **Always keep**, with who kept them, when, and the article they were kept from. When that article has since been deleted the row says "article no longer exists": nothing else can clear such a keep, so use **Stop keeping**. A picture that is no longer kept can be removed by the clean-up tools again.

## Several at once

Tick rows, or press **Select all on this page**, then use **Restore selected**, **Delete now selected** or **Stop keeping selected**. Large selections are handled a few pictures at a time with progress shown. If one picture cannot be handled it is named in the result line and stays in the list, and the others carry on. The result also stays written under the buttons after the pop-up message goes away.
