---
sidebar_position: 12.9
title: Replaced pictures
description: When you replace a picture file and keep its name, SyteOps gives only that picture a new web address, so visitors see the new picture and every other picture stays cached.
---

# Replaced pictures

When you replace the file of a picture in the media library and keep the same file name, the picture's web address does not change. Image delivery networks tell browsers to keep a picture for up to a year, so a visitor who saw the old picture can keep seeing it long after you replaced it.

SyteOps fixes this for the pictures you replaced, and only for those. A replaced picture gets a short version tag at the end of its web address (a question mark followed by a few letters and digits). A browser that holds the old picture has never seen that address, so it fetches the new one. Every other picture keeps its address, so nothing else is downloaded again.

## When a picture counts as replaced

SyteOps watches the picture's ORIGINAL file, the one you uploaded, not the smaller copies it makes. When the original is replaced under the same name through WordPress, for example with a media replace plugin, the picture is marked. A picture that is brand new is never marked, and neither is a picture whose thumbnails were rebuilt, whose large copy was rewritten by an image optimizer, or that was renamed (a new file name is a new web address anyway). A replacement that rewrites only the large copy and leaves the original alone is not detected.

The automatic marks have two limits, so a bulk job can never make a whole site download its pictures again: at most 20 pictures are marked on their own per hour (a site manager can change that number), and when the list of 500 marks is full of marks less than a day old, new automatic marks wait instead of pushing the recent ones out. Marks a site manager asks for are not limited this way.

SyteOps cannot see a file that was copied over the old one by FTP or on the server with nothing else touching the picture. For those, ask your site manager to mark the pictures, using the site's management interface or the command line tool. The list of pictures marked most recently is part of the cache state the management interface reports.

## What happens when a picture is marked

- The picture's addresses in pages, in the picture's other sizes and in lazy-loaded images carry the new version tag.
- The pages that show the picture, and the picture's own addresses, are purged from the page caches SyteOps knows about, so the next visitor gets a page with the new address. Pages that mention the picture are found by a search that stops at a limit, so on a very large site a page that was missed shows the new address once its own cache expires.
- If your site uses Easy IO from EWWW Image Optimizer, the tag is added to the Easy IO address. Easy IO has no way to clear a single picture, but the new address makes it fetch the new file.

A mark is kept for 400 days, which is longer than the year a browser keeps a picture, and SyteOps keeps at most 500 marks at a time, dropping the oldest first.

Marked pictures are not listed on a screen and need no setting. A site manager can switch the whole feature off.
