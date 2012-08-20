#!/bin/bash

# build enyo
pushd ../enyo/minify > /dev/null
./minify.sh
popd > /dev/null

# build app
cd source
../../enyo/tools/minify.sh package.js -output ../build/app

# build package
cd ..
rm -r release
#mkdir release
#cp -r build index.html img release
#cd release
# lib/onyx/deploy.sh ~/git/mensaApp/enyo2/phone/build/lib/onyx
#mkdir release
mkdir -p release/lib
cp -r -L build index.html img icon.png splash.png release

lib/onyx/deploy.sh ~/git/mensaApp/enyo2/phone/release/lib/onyx

cp -r -L lib/layout release/lib/

#cd release
#zip -r ../release.zip .
#cd ..
#	rm -r release
