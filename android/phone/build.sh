#!/bin/bash

# build enyo
rm -r ../enyo2/phone/deploy/*
cd ../../enyo2/phone/tools

./deploy.sh
cd -
rm -r assets/www
mv ../enyo2/phone/deploy/* assets/www/

# cordova/BOOM
# build and deploy to device
ant release install
