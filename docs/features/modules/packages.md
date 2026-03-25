---
sidebar_position: 3
title: Encrypted Packages (.sytepkg)
description: Installing and creating encrypted module and workflow packages.
---

# Encrypted Packages (.sytepkg)

`.sytepkg` is SyteOps' encrypted package format for securely distributing modules and workflow templates. Packages are encrypted and digitally signed so that source code is protected and tampering is detected. Whether you are installing a first-party SyteWide module or a package built by your agency, the process is the same.

## What's Inside a .sytepkg File

An encrypted module or workflow template. There are two types:

- **Module packages** contain a full installable module -- all the code, assets, and metadata needed to add a new capability to SyteOps.
- **Workflow template packages** contain FlowMattic workflow definitions and associated variables, ready for deployment to another site.

Both types are encrypted so the contents cannot be read without a valid license. This protects source code during distribution and ensures only authorized sites can install the package.

## Requirements

A valid **SyteWide Product License** is required to install encrypted packages.

Your license automatically delivers the encryption key needed to open packages -- no manual key configuration is required. The key is provisioned during license activation and refreshed automatically.

If you see a **"package key not available"** error, your license needs to be re-validated:

1. Go to **Admin tab > Product License**
2. Click **Recheck**
3. The encryption key is re-provisioned when the license validates successfully

## Installing a Module Package

The installation flow is the same as any module:

1. Navigate to **Admin > Modules > Upload**
2. Select the `.sytepkg` file
3. SyteOps validates the digital signature to confirm the package is authentic and untampered
4. The contents are decrypted and installed
5. The module appears in your modules list, ready to activate

From there, toggle the module ON to start using it. All standard module behaviors apply -- settings are preserved across activate/deactivate cycles, and FlowMattic variables sync automatically for modules that declare them.

## Importing a Workflow Template Package

Workflow template packages are imported through the workflow import interface rather than the module upload flow.

1. Upload the `.sytepkg` file through the workflow import interface
2. **FlowMattic must be installed and active** -- workflow imports require FlowMattic

### Preview before import

Before the import runs, you can preview which workflows are included in the package and whether any conflict with workflows already on your site.

### Conflict resolution

If an imported workflow matches an existing workflow, you choose how to handle it:

| Option | Behavior |
|---|---|
| **Skip** | Keep your existing workflow unchanged; the imported version is not applied |
| **Overwrite** | Replace the existing workflow with the imported version |
| **Create New** | Import the workflow alongside the existing one, with a timestamp suffix to distinguish them |

### Variable handling

Associated FlowMattic variables are imported automatically along with the workflows.

Variables marked as **sensitive** (API keys, credentials, secrets) are imported with placeholder values. After import, navigate to the relevant variable configuration and enter the correct values for your site. This prevents credentials from being transferred between environments.

## Creating Your Own Packages

If you build modules or workflow templates and need to distribute them, the **Package Builder** module handles encryption and packaging.

1. Install and activate the Package Builder module
2. Select a module or FlowMattic workflows to package
3. Package Builder encrypts and signs the contents, producing a `.sytepkg` file ready for distribution

Recipients install the package through the standard flows described above. This requires builder mode configuration before you can create packages.

See [First-Party Module Guides](module-guides#package-builder) for Package Builder setup instructions.

## Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| "Package key not available" | License has not been validated yet | Go to **Admin > Product License > Recheck** |
| "Signature verification failed" | Package file is corrupted or from an untrusted source | Re-download the package; contact the package provider |
| "FlowMattic unavailable" | FlowMattic not installed for workflow import | Install and activate FlowMattic before importing workflow templates |
| "Unsupported schema version" | Package was built with a newer version of SyteOps | Update SyteOps to the latest version |
