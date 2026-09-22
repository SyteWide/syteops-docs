---
sidebar_position: 20
title: Private Storage
description: Where SyteOps keeps files that must never be served to visitors, and how it proves they are not.
---

# Private Storage

Some of the files SyteOps creates are not meant for visitors: configuration backups, exported data,
diagnostic logs, and private uploads that a workflow moved out of the Media Library. They all live in
one folder, called **private storage**.

This page explains where that folder is, why it sometimes moves, and how to read the status card.

## Where the folder lives

SyteOps picks the location for you, once, the first time it needs the folder.

**Outside the web root** is the preferred choice. The folder is created next to your WordPress
installation rather than inside it, with a name unique to your site. A web server has no address for
a folder it does not serve, so nothing in it can be fetched by anyone, on any host.

**Inside the web root** is the fallback: a private storage folder inside `wp-content`. SyteOps uses
it when the folder above your WordPress installation is not writable, or when that folder is itself part
of the public site, which is the usual shape of a WordPress install that lives in a subdirectory.

Either way, SyteOps writes two protective files into every folder it creates there: a blank
`index.php` so nothing lists the contents, and an `.htaccess` that tells the web server to refuse
every request for the folder.

## Why the protective files are not enough on their own

`.htaccess` rules are a request, not a guarantee, and different web servers answer differently.

- **Apache** and **LiteSpeed Enterprise** honor them.
- **OpenLiteSpeed** ignores the plain "deny" rule. It does honor a rewrite-based refusal, but only
  for the exact folder holding the file — not for folders beneath it — and it can keep serving a
  folder it had already decided has no rules until the server is restarted.
- **nginx** does not read `.htaccess` files at all.

That is why SyteOps prefers a location the web server simply cannot reach, and why it checks its own
work when it cannot get there.

## The web check

When private storage has to stay inside the web root, SyteOps tests it the only honest way: it writes
a small file with a random value into the folder, asks your own site for that file over HTTP, and
deletes the file again straight away. The result is one of:

| Result | What it means |
| --- | --- |
| **Not addressable from the web** | The folder is outside the web root. No request is needed, and nothing can reach it. |
| **Blocked by the web server** | The folder is inside the web root, and your server correctly refused the request. |
| **Reachable from the web** | Your server served the file. Anything in this folder is public. Act on this. |
| **Unknown** | The check could not complete — for example the request failed, or the server answered in a way SyteOps cannot interpret. |

The check runs once a day, whenever you open the card and the last answer has gone stale, and
whenever you press **Check now**. If the answer is *Reachable from the web*, SyteOps also shows a
dismissible warning across the admin until you deal with it.

### If the check says "Reachable from the web"

Two things fix it:

- Ask your host to honor the deny rules for that folder, or to move your site to a configuration
  where the folder above WordPress is writable, or
- Have a developer pin private storage to a folder of your choosing outside the web root, using the
  base-directory filter named in the warning itself. A location set that way always wins, and SyteOps
  will not second-guess it.

## Moving an existing folder

If SyteOps decides the outside location is available and you already have files in the `wp-content`
folder, it moves them for you. Every file is copied first and checked
byte for byte against the original, and the originals are deleted only once every single file has
passed. If any file fails that check, nothing is deleted, the folder stays where it was, and the card
tells you why. The card also shows where the files came from and how many moved.

## Protected upload folders

Some plugins write files you would rather nobody could download into the ordinary WordPress uploads
folder — a cookie banner that keeps a daily proof-of-consent record, an export tool that leaves its
output behind, a form plugin that stores what people attached. Those folders are public, and the
files sit there until somebody notices.

**Protected upload folders** is a list of folders under `wp-content/uploads` that SyteOps empties into
private storage for you, on a schedule. For each folder on the list, every sweep:

1. Writes the two protective files into the source folder, so anything that lands there next is
   already covered on servers that honor them.
2. Takes each file sitting directly in the folder, copies it into
   `protected/<your folder>/` inside private storage under a dated name such as
   `2026-09-21-132600-consent-log.txt`, checks the copy against the original byte for byte, and only
   then deletes the original.
3. Recognizes a file it has already archived by its contents, not its name. A second copy of a file
   already in the archive is simply deleted rather than stored twice — which is what makes this safe
   for a plugin that rewrites the same daily file over and over.

Anything that is not a plain file directly inside the folder is left alone: subfolders are never
followed, and the protective files, hidden files and symbolic links are skipped.

### Setting it up

On **SyteOps → Systems / API → Private Storage**, add one folder per row, written as a path relative
to the uploads folder — `wpfp/consents`, for example. Paths are lowercase, up to four levels deep, and
you can list up to twenty. Choose how often the sweep runs (every 1, 5 or 15 minutes) and save the
tab. **Sweep now** runs it immediately, and the line above the button reports the last run:
how long ago it was, how many files moved, how many duplicates were removed and how many errors
there were.

Clearing the list stops the schedule entirely.

### What the interval really means

A file is only protected once it has been swept. Between the moment a plugin writes a file into one
of these folders and the moment the next sweep runs, that file is an ordinary file in an ordinary
uploads folder — and on a server that ignores the protective files, it can be downloaded by anyone
who knows the address. **The sweep interval is therefore your window of exposure**: at five minutes,
a newly written file can be public for up to five minutes.

Shorten the interval if that matters for the files in question. The real fix for a host that ignores
the protective files is the one described above — private storage outside the web root — and the
sweep is what carries these files there.

### If something goes wrong

A sweep never risks the original. A file is deleted only after a verified copy exists; a copy that
fails its check is thrown away and the original stays exactly where it was, counted as an error. A
folder that does not exist, that is a symbolic link, or that does not actually sit inside the uploads
directory is refused outright and counted as an error too, so a mistyped path can never point the
sweep somewhere else on the server.

## Finding the card

Go to **SyteOps → Systems / API** and look for **Private Storage**. It shows the folder's path, which
mode it is in, the last web-check result and when it ran, and — where it applies — the reason the
folder could not move.

To look inside the folder or download its contents, use **Open Private Storage Browser**, which opens
the file browser from the Debug Tools page.

## On uninstall

Uninstalling SyteOps removes the private storage folder wherever it ended up, with one deliberate
exception: the `backups` subfolder survives, because that is where the pre-uninstall configuration
archive is written. Download anything you want to keep before you uninstall.
