#!/bin/bash

# build enyo
rm ../../enyo2/tablet/deploy/* -r 
cd ../../enyo2/tablet
./tools/deploy.sh
cd -
mv ../../enyo2/tablet/deploy/* build
cp Makefile appinfo.json framework_config.json build
cd build
make
mv jjacobsohn.mensaapp.enyo_*_all.ipk ..
cd -

rm -r build

exit 1
