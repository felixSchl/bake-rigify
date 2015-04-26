Bake Rigify
================================================================================

> Strips rigify-styled rigs down to their deformation bones and bakes their animations.

[More information](http://felixschlitter.com/tool/bake-rigify)

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

* Clone the repo to into, e.g.  [...]/blender.app/Contents/Resources/2.74/scripts/addons/bake-rigify
* In Blender's add-on manager (File-->User Preferences-->Addons), search and enable the `bake rigify` add on.

# Usage

* Select an armature in Object mode.
* In the Properties Panel, under the Armature data tab, expand `Rigify Bake` and hit the button there.

## Using a non-rigify rig

This script is making use of rigify conventions, where

* There is one `root` bone named `root`.
* Deformation bones are called `DEF-`. These are the only bones that will be exported apart from the special `root` bone.

## Caveats

This tool discards all hierarichal information. All bones have a single parent, the `root`.
