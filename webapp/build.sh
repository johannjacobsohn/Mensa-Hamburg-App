#!/bin/bash
#
# usage: build.sh (phone|tablet) [release]
#
set -u
set -x
set -e

type=$1
release=${2-dev}

path="../enyo2/$type"
build="$path/deploy/$type";
if [ $release == "release" ]; then
	target="$type";
else
	target="$type-dev";
fi

# clear old builds
set +e
rm -r $target
rm -r $build
set -e

# build app
cd $path
tools/deploy.sh
cd -
mv $build $target

# copy icons
cp 64x64.png 72x72.png 128x128.png 60x60.png 144x144.png 144x144_.png favicon.ico $target

# copy manifests and other files
cp app.appcache landscape-ipad.png portrait-ipad.png index.html $target
cp .htaccess $target

# copy version specific files
cp manifest.webapp.$type $target/manifest.webapp

# mock version specific files (so that we only need one appcache manifest)
mkdir -p $target/lib/Carousels
touch $target/lib/Carousels/newness.Carousels.js $target/lib/Carousels/package.js $target/assets/icn-share.png $target/assets/icon-email.png $target/assets/shadow.png

# upload new version
rsync -r $target/ root@$target.mensaapp.org:$target/

exit;
