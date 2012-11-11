#!/bin/bash

set -x
set -u

path="../../enyo2/phone";

# build enyo
rm -r $path/deploy/*
cd $path/tools
./deploy.sh
cd -
rm -r assets/www
mv $path/deploy/* assets/www/

# cordova/BOOM
# build and deploy to device
ant release install
