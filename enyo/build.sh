#!/bin/sh

node ./shared/enyo-1/support/enyo-compress/enyo-compress.js --make-enyo tablet
cd build
zip -r ../release/tablet.zip .
cd ..

node ./shared/enyo-1/support/enyo-compress/enyo-compress.js --make-enyo phone
cd build
zip -r ../release/phone.zip .
cd ..
