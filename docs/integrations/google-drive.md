---
sidebar_position: 30
title: Google Drive Integration
description: Connect a Google Drive folder to the Review Portal's cloud image library with a read-only service account, and pick pictures from it while reviewing.
---

# Google Drive Integration

**Tier: Extended** — Stores a Google service account key (encrypted) and adds a **Cloud image library** card to the Review Portal settings, where you connect, choose the folder, name the library, switch it on, test and disconnect.

This integration lets the Review Portal read pictures from one Google Drive folder you choose. **SyteOps only ever reads from your cloud folder. It never creates, changes, moves or deletes anything there**, and the access it asks Google for is read-only. Removing a picture from your WordPress media library never touches the original in Drive.

## Before you start

- A Google account that can use [Google Cloud](https://console.cloud.google.com/) and a Drive folder you can share.
- Permission to create a service account and a key in your Google Cloud project.
- We recommend one service account per website, so you can remove one site's access without affecting the others.

## Setup

### 1. Create a Google Cloud project and turn on the Drive API

In the [Google Cloud console](https://console.cloud.google.com/), create a project (or pick an existing one), open **APIs & Services → Library**, search for **Google Drive API** and choose **Enable**.

### 2. Create a service account and a JSON key

Open **IAM & Admin → Service Accounts** and choose **Create service account**. Give it a name and finish without granting it any project roles. Open the new account, go to **Keys → Add key → Create new key**, choose **JSON**, and download the file. Keep it somewhere safe: anyone holding this file can read whatever the account can read.

The file holds the account's email address (it looks like `your-account@your-project.iam.gserviceaccount.com`), a private key, and some project details.

### 3. Share your folder with the service account

In [Google Drive](https://drive.google.com/), share the folder with the service account's email address and give it the **Viewer** role. Viewer is all that is needed.

### 4. Turn the integration on and connect

In SyteOps, open the **Integrations** tab, switch **Google Drive** on and save. Then open **Content Pipelines → Review Portal** and find the **Cloud image library** card. Open the downloaded file in a text editor, copy everything in it, paste it into the card and choose **Connect**.

SyteOps checks the key with Google before saving it. Once connected, the card shows the service account's email address, so you can copy it for the sharing step, and a short fingerprint that identifies the key without revealing it.

### 5. Choose the folder

Once connected, the card has a **Folder** row. Choose **Choose folder** to list the folders shared with the service account and pick one. If you would rather not use the list, open the folder in Google Drive, copy its address from the browser, paste it into **or paste a folder link** and choose **Use this folder**.

SyteOps checks the folder with Google before keeping it, and then shows its name and how many usable pictures it holds at the top level. If the list is empty, or Google cannot open the folder you pasted, the usual cause is that the folder has not been shared with the service account yet: go back to step 3, using the email address the card shows, and try again. If the list stays empty after sharing, open the folder in Google Drive, copy its address and paste it into **or paste a folder link** instead. Only the one folder you choose, and the folders inside it, are ever available.

### 6. Name the library and switch it on

**Library name** is the label of the button reviewers will click to open the library; it can be up to 40 characters, and "Image library" is used when you leave it blank. **Enable library** turns the library on for reviewers. It cannot work until a connection and a folder exist, and choosing a folder never switches it on by itself. If the switch arrives on without a key or folder (for example after importing settings from another site), the card says it is on but not working yet. It is saved with the rest of the Review Portal settings, so choose **Save settings** after changing it.

### 7. Test the connection

Choose **Test connection** at any time. Each test asks Google again, so it shows a problem if the key has since been deleted or disabled. With a folder chosen it also confirms the folder can be read and shows its name and picture count; if the folder has been unshared since, the card says it is no longer shared. **Disconnect** removes the key and the chosen folder from your site and switches the library off.

If the card says the stored key can no longer be read on this site (this can happen after the site is cloned or moved to a new server), paste the key again, or choose **Remove stored key**.

## How reviewers use the library

Once the library is switched on, reviewers who may change pictures see a button named after your library (for example **Client photos**) in the Review Portal. It is in **Image Details**, beside **Choose from library**, and it appears for a picture in an article, for the featured image and for a picture on a page.

- **Browse.** The library opens on the folder you chose. Folders are listed first; click one to go in, and use the trail at the top to go back. **Load more** brings the next pictures of a large folder, and the round arrow asks your cloud folder for a fresh list.
- **Look closer.** Hover a picture to see it larger. With the keyboard, Tab to a picture's **Use** button and the larger picture appears; press Escape to close it. On a phone or tablet, tap the picture to open it larger and tap it again, or anywhere else, to close it.
- **Use it.** Choose **Use** under a picture. SyteOps copies it into your media library and puts it in place: on the picture you clicked, as the featured image, or as the replacement on a page. A large picture can take a little while to copy, and only one picture is copied at a time. In the article, the new picture's own description (alt text) replaces the old picture's; if it has none, the description is cleared and you are asked to write one.
- **Nothing is copied twice.** A picture that was already copied in is reused, on any post or page, and the panel says so. If the picture is later changed in your cloud folder, the changed version is copied as a new picture.
- **See what is already in use.** A **Used** badge marks a picture that is already used on the site. Hover it to see which of your posts and pages use it. Posts and pages you cannot edit are only counted, never named.
- **Only usable pictures appear.** Only folders and pictures are shown. Pictures in a format the site cannot use, and pictures their owner does not allow to be copied, are left out, and one line under the pictures says how many.

Reviewers see the button only when their **Modify with AI and image libraries** permission allows it and their account may add media to the site. If the folder stops being shared, or the library is switched off, the panel says so in plain words.

## Things that can block setup

- **Key creation is blocked.** Many Google Workspace organizations switch on a policy that disables service account key creation. If Google refuses to create the key, an organization administrator has to allow it for your project.
- **External sharing is blocked.** If your Workspace does not allow sharing outside your organization, the service account may not be allowed to receive the share. Ask an administrator to allow it.
- **The Drive API is off.** Connecting only proves the key, so this shows up later, when a folder is tested or read and Google refuses. Check that the Google Drive API is enabled for the project the key belongs to.

## Your key and your files

- The key is stored encrypted on your site and is never shown again after you connect.
- Access is read-only: nothing in your Drive can be changed or deleted through this connection.
- A backup or export does not include the key or the chosen folder, so after restoring a site you paste the key again and choose the folder again. The **Enable library** switch and the library name do travel with exported settings. Connecting a different key also clears the chosen folder, because the new account may not see it.
- Only SyteOps administrators can connect, test, disconnect, choose the folder, switch the library on or off or change its name.
- To cut off access completely, disconnect in SyteOps and delete the key (or the service account) in Google Cloud.
