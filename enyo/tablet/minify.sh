#!/bin/sh

node ../shared/enyo-1/support/enyo-compress/enyo-compress.js .

# @FIXME: images-ordner falsch...
# HOTFIX:
mv build/enyo/build/palm/themes/Onyx/images-1.5/  build/enyo/build/palm/themes/Onyx/images/ 
