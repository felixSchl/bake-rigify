Bake Rigify
================================================================================

> Strips rigify-styled rigs down to their deformation bones and bakes their animations.

## How it works

In essence, the operator

* Duplicates the selected armature
* Creates a bone for each deformation bone (called `DEF-` bones) in armature (called `EXP-` bones)
* Parents each bone to the `root` bone (that bone must exist in the original armature)
* Parent constraints the new bones to their deformation bone counterparts
* Bakes the selected set of actions (all | selected | active)
* Discards all but duplicated bones
* Renames remaining `EXP-` bones back to what they were called, so assigned weights will work etc.

## Installation

* Download the [Latest Release archive zip](https://github.com/felixSchl/bake-rigify/releases)
* In Blender's add-on manager (File-->User Preferences-->Addons), using
  `Install from File`, install the zip downloaded.
* Now enable the `Bake Rigify` addon.

## Usage

* Select an armature in Object mode.
* In the Properties Panel, under the Armature data tab, expand `Rigify Bake` and hit the button there.

## Using a non-rigify rig

This script is making use of rigify conventions, where

* There is one `root` bone named `root`.
* Deformation bones are called `DEF-`. These are the only bones that will be exported apart from the special `root` bone.

## Caveats

This tool discards all hierarichal information. All bones have a single parent, the `root`.
