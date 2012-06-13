#!/bin/sh

# make enyo


# make tablet
node ./shared/enyo-1/support/enyo-compress/enyo-compress.js tablet

cd build
zip -r ../release/tablet.zip .
cd ..

# make phone
#node ./shared/enyo-1/support/enyo-compress/enyo-compress.js phone
#cd build
#zip -r ../release/phone.zip .
#cd ..
