#/bin/bash

set -e # abort on error
set -u # abort on undefined
set -x # verbose

# clear old builds
set +e
rm -r build
rm -r ../../enyo2/tablet/deploy/*
set -e

cd ../../enyo2/tablet/tools
./deploy.sh
cd -
mv ../../enyo2/tablet/deploy/* build
cp -L manifest.webapp icon-128.png build

cd build
zip -rq ../build.zip .
cd -
# rm -r build
