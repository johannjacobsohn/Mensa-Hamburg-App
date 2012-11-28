#
# Build Appup
#

set -u
set -x

path=../../enyo2/tablet

# clear old builds
rm -r build build.zip

rm -r $path/deploy/tablet
cd $path
tools/deploy.sh
cd -
mv $path/deploy/tablet build
cp -r icon.png build

cd build
zip -rq ../build.zip .
cd -

rm -r build

exit;
