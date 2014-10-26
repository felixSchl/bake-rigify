Bake Rigify
================================================================================

> Strips rigify-styled rigs down to their deformation bones and bakes their animations.

## How it works

* Duplicate selected armature
* Create bone for each deformation bone (called `DEF-` bones) in armature (called `EXP-` bones)
* Parent each bone to the `root` bone (that bone must exist in the original armature)
* Parent constraint the new bones to their deformation bone counterparts
* Bake the selected set of actions (all | selected | active)
* Discard all but duplicated bones
* Rename remaining `EXP-` bones back to what they were called, so assigned weights will work etc.

## Using a non-rigify rig

This script is making use of rigify conventions, where

* There is one `root` bone named `root`.
* Deformation bones are called `DEF-`. These are the only bones that will be exported apart from the special `root` bone.

## Caveats

This tool discards all hierarichal information. All bones have a single parent, the `root`.
