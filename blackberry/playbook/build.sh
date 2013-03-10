#
# Build IPad 
#

#set -u
set -x

pathToSource="../../enyo2/tablet"
pathToBuild="build"

mkdir -p "$pathToBuild"

rm -r "$pathToBuild" "$pathToSource/deploy/tablet"
cd "$pathToSource"
./tools/deploy.sh
cd -
mv "$pathToSource/deploy/tablet" "$pathToBuild"
cp -r config.xml loading_foreground "$pathToBuild"

exit;
