# Silverstripe CMS Build dashboard

This project displays a list of broken builds for the Silverstripe CMS project.

Codebase is based on https://github.com/innFactory/create-react-app-material-typescript-redux

[View the live dashboard](https://maxime-rainville.github.io/travis-dashboard/)

## How does this thing work

The [`silverstripe-cms-dashboard`](https://github.com/maxime-rainville/silverstripe-cms-dashboard/) CLI utility is used to fetch:
- travis build data
- list of branches with outstanding merges up
- list of branches with unrlesead commins

Each data set is saved to a JSON file that gets loaded by the dashboard.

The dashboard is rebuilt every hour by a Git Hub action job. Note that if nothing has changed since the last built the nothing will be pushed to Git Hub Pages and the last "updated date" will not be updated.

## List of modules

The list of modules to fetch and the meta data about each module is controlled by the [`silverstripe-cms-meta`](https://github.com/maxime-rainville/silverstripe-cms-meta/) packages. When a module is released, moved to another organsiation or its support status is changed, `silverstripe-cms-meta` has to be updated and republished.

The Git Hub action rebuilding the dashboard always installs the latest version of `silverstripe-cms-meta`, so there's no need to update the dashboard lock file for it to get the updated metadata.
