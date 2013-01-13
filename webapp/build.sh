#!/bin/bash
#
#

set -u
set -x
set -e

type=$1

path="../enyo2/$type"
build="$path/deploy/$type";
target="$type";

# clear old builds
set +e
rm -r $target
rm -r $build
set -e
cd $path
tools/deploy.sh
cd -
mv $build $target
cp 64x64.png 72x72.png 144x144.png app.appcache landscape-ipad.png portrait-ipad.png index.html favicon.ico $target
mkdir -p $target/lib/Carousels
touch $target/lib/Carousels/newness.Carousels.js $target/lib/Carousels/package.js $target/assets/icn-share.png $target/assets/icon-email.png $target/assets/shadow.png

rsync -r $target/ root@$target.mensaapp.org:$target/

exit;
