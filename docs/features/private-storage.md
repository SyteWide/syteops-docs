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

## The location never travels

The path of the folder is a fact about the server your site runs on, so it stays with the site. A configuration export does not
contain it, and importing a configuration file, restoring a backup or a restore point, resetting all settings, saving a settings tab
or a Manage API write never replaces it or removes it. Only SyteOps itself, when it chooses the location, changes it.

## When the folder in use may belong to another site

A private storage folder carries a small marker file that names the installation it belongs to. The marker holds no address, no
directory and nothing secret: it holds a fingerprint of the installation's database (its name and table prefix) and, on a network,
which site it is. That fingerprint is the same on every request, so a change of your site's address, or a move of the files to a new
folder, changes nothing. Folders created by an earlier release have no marker yet: SyteOps adds one the first time it runs after the
update, but only to a folder that carries the short code it would have given the address your site is being served from at that moment.
A copy of a site that kept the original's saved address in its database but is served from its own is therefore never marked as
owning the original's folder: SyteOps asks instead.

If you run two installations whose database name and table prefix are identical (on different database servers that share one
directory, for example), SyteOps cannot tell them apart by fingerprint. Give each a distinct identity: define the constant
`SYTEOPS_INSTALL_IDENTITY` in `wp-config.php` (any distinct text, for example the server name); developers can instead return such a
string from the filter named in the developer documentation. It replaces the database name and table prefix in the fingerprint. Choose it once and keep it: changing
it later makes the folders marked with the old fingerprint look like another installation's, and SyteOps will ask again.

SyteOps never switches folders by itself. Your site keeps using the folder it uses, always. But when that folder is marked as belonging
to another installation, or has no marker and was not created for this site, a plugin administrator sees a notice on the SyteOps
screens, the Plugins screen and the Dashboard, with the folder's path. This happens when a site is copied, when it is moved between
databases or addresses, or when a single site becomes a network. **Nothing has been changed**: until you answer, a copied site keeps
sharing the original's folder, as it did before.

| Choice | What it does |
| --- | --- |
| **This is this site's folder** | After you confirm, the folder is treated as yours from now on. SyteOps writes your installation's marker into it. No files move. Another site that uses the same folder is warned, and uninstalling this site (or deleting it from a network) may remove the folder. It is refused for a link or a protected location, and when the folder is not the one the site is using. |
| **Stop using it** | After you confirm, your site gets a new, empty private storage folder of its own, with the protective files and your marker. It is created beside the old one, or next to the WordPress folder, but only in a place outside the web root; if there is none, nothing is created and nothing changes. **Nothing is copied or moved**: files already in the old folder stay there, and links to them stop working until an administrator moves them by hand. If anything fails, nothing changes. |

On a network, the standard `wp-content` folder is shared by every site, while a relocated folder belongs to one site. Both choices are
available only to a network administrator, and a site administrator sees no notice. A folder that belongs to another site of the same
network is never touched by your site's choices or by your site's uninstall. When a site is deleted from the network, its own marked
private storage folder is removed with it; the shared folder and any folder without that site's marker are left alone.

**Known limit on a network:** the first site to move its private storage out of the web root takes the contents of the shared `wp-content`
folder with it, including files other sites put there. That is how it has always worked and this release does not change it.

A move to a new location that fails is cleaned up at once: SyteOps removes exactly the folders and files that attempt created and
nothing that was already there, keeps using the old location, and records the reason; it does not try that move again. Each file is
copied under a temporary name and given its real name only after it verified. A move that was cut off in the middle (the request was
killed, so nothing was recorded) is completed by a later request, which first removes only the leftover temporary files of that exact
name.

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
exception: the `backups` subfolder survives, because that is where the pre-uninstall copies are written:
the configuration archive, a backup of your Lead Attribution records, a spreadsheet (CSV) file of the lead
records, a CSV file of the lead activity (events) records, and, when a content source has its own post type, a
small file describing those post types. Every file carries a long random name. The CSV files are written
before the lead records and the lead activity table are removed, and they are safe to open in a spreadsheet:
a value that starts with a formula character is stored as plain text. When the folder sits outside the web
root, the files cannot be reached from the web at all; when the folder has to stay inside `wp-content`, only
the random name and the folder's guard files protect them, so download anything you want to keep before you
uninstall and delete the files afterward. If the `backups` folder cannot be written, the same files are placed
in the `wp-content` folder under the same random names instead.

Lead records are removed only after a copy of them has been saved. If the spreadsheet or backup file of the lead
records could not be written, uninstalling keeps the lead records in the database; if the file of lead activity
records could not be written, it keeps the lead activity table. In both cases it also keeps the few saved keys those
records need to stay usable, and says so in the uninstall log line, with the row counts. Saved connection
credentials for RingTonic are still removed. A lead record is also kept when it could not be read at all.
Otherwise the log line says which files were written and where.

**A settings snapshot is kept too, when you chose to keep your FlowMattic variables.** If the variables are
kept when the plugin is deleted, the `backups` folder also receives one settings snapshot file per site. It
holds the settings those variables come from, your integration switches and your variable-set tabs. Saved keys
inside it stay encrypted and can only be read back on the same site with the same security keys; license and lock
state, the private storage location and the stored password of the Licensing Gateway module are never written to it.
A small marker file in the `wp-content` folder records that kept variables exist, so a reinstall still pauses syncing
if the snapshot is missing. When you reinstall the plugin on that site it pauses all syncing to FlowMattic and offers
to restore the settings or start fresh; either choice deletes the snapshot and the marker. If you chose to remove the
variables, neither is kept and older ones are deleted.

**A settings snapshot is kept too, when you chose to keep your FlowMattic variables.** If the variables are
kept when the plugin is deleted, the `backups` folder also receives one settings snapshot file per site. It
holds the settings those variables come from, your integration switches and your variable-set tabs. Saved keys
inside it stay encrypted, and they can only be read back on the same site with the same security keys. When
you reinstall the plugin on that site it finds the snapshot, pauses all syncing to FlowMattic and offers
to restore the settings or start fresh; either choice deletes the snapshot file. If you chose to remove the
variables, no snapshot is kept and an older one is deleted.

**Posts in a content source's own post type are not deleted.** If you created a content source with its own
post type, those posts are your site's published content, so uninstalling leaves them in the database along
with their comments, categories, tags and images. The custom-field values a content source filled in (for
example price, address or date) are kept as well, on every post. Because the post type is registered by
SyteOps, WordPress no longer lists or shows those posts until a post type with the same key is registered
again. A small "kept post types" file in the `backups` folder
lists each content source, its post type's key and settings, its custom fields and how many posts it
holds, so you can restore them. It contains no post text, secrets or forwarding addresses. Only SyteOps' own
bookkeeping information on those posts is removed.

Two things are still removed from media: a picture attached to one of those posts whose file was
moved into the private storage folder that is being removed, and the logo pictures the plugin itself added to your
Media Library (the Theme Logo Box and Theme Logo Wide copies of its own artwork). A copy of your own logo that you
brought in through a logo field is your content and is kept, and it shows in the Media Library again.

The CSV files do not carry a byte-order mark, so when you open one in Excel use the option to import it as
UTF-8, or accented and non-Latin characters will look wrong. A value that begins with `-` is saved with a
leading apostrophe, the same protection the Leads export uses.

SyteOps empties only a folder it can recognize as its own private storage. A saved location that is not a
real folder that is this site's own SyteOps private storage, or that is `wp-content` itself or a folder
holding it, is left untouched. That includes a folder that may belong to another site (see
above): SyteOps removes a private storage folder only when it can prove it is yours, otherwise the folder is named in the uninstall
log line and left exactly as it is. A leftover relocation folder of your own
site that holds nothing but protective files is removed.
