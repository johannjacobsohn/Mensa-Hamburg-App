#!/bin/bash

set -x
set -u

path="../../enyo2/tablet";

# build enyo
rm -r $path/deploy/*
cd $path/tools
./deploy.sh
cd -
rm -r assets/www
mv $path/deploy/* assets/www/
cp cordova-2.2.0.js assets/www/

# cordova/BOOM
# build and deploy to device
ant release install
