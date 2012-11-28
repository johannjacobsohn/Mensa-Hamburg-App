#!/bin/bash

set -x
set -u

path="../../enyo2/phone";
build="$path/deploy/phone";
target="assets/www";
# build enyo
rm -r $build
cd $path
tools/deploy.sh
cd -
rm -r $target
mv $build $target
cp cordova-2.2.0.js assets/www/

# cordova/BOOM
# build and deploy to device
ant release install
