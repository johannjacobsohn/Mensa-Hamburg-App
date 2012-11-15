#/bin/bash

set -e # abort on error
set -u # abort on undefined
set -x # verbose

# clear old builds
set +e
rm -r build
rm -r ../enyo2/tablet/deploy/*
set -e

cd ../enyo2/tablet/tools
./deploy.sh
cd -
mv ../enyo2/tablet/deploy/* build
cp -L manifest.json icon-16.png icon-48.png icon-128.png build

chromium-browser --pack-extension=build --pack-extension-key=../keys/chrome/chrome.pem
cd build
zip -rq ../build.zip .
cd ..
