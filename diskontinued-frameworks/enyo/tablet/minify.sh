#!/bin/sh
set -x
# set -u
rm -r build
node ../shared/enyo-1/support/enyo-compress/enyo-compress.js .

rm -r build/enyo/source
rm -r build/enyo/lib
rm -r build/enyo/build/base
rm -r build/enyo/build/palm/themes/Heritage
rm -r build/enyo/build/palm/themes/Onyx/images-1.5
rm -r build/enyo/build/palm/system
rm -r build/enyo/build/palm/tellurium
rm -r build/enyo/build/palm/services
rm -r build/enyo/build/palm/list2
rm -r build/enyo/build/dom
rm -r build/enyo/build/g11n
