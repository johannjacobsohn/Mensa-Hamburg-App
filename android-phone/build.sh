#!/bin/bash

# build enyo
cd ../enyo2/phone/tools
./deploy.sh
cd ../../../android-phone
rm -r assets/www
mv ../enyo2/phone/deploy/* assets/www/

# cordova/BOOM
# build and deploy to device
ant release install
