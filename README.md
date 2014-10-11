Bake Rigify
================================================================================

Bakes a rigify rig right down to a set of plain old bones and bakes animations
for that set of bones, ready for export to a game engine.

## How it works

It essentially duplicates the currently __active armature__, creates a plain old
bone for each deform bone and sets up a parent constraint. It then bakes the
currently __active action__ and, once finished, discards all but the new bones
in the armature. It also makes sure to rename the bones properly, so that
weightpainting and animation transfer still works.

It is important to look at this tool not as a tool that just generates a new rig
only, but as a tool that allows to generate the animations that suit a baked
rig. Since Blender is cool about sharing animations, e.g. it just cares about
names, the baked animations are valid across all baked rigs for as long as the
source rigify rig and the original animations did not change.
