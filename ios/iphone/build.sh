#
# Build IPad 
#

set -u
#set -x

#phongap_pwd=$1
id=131163
path="../../enyo2/phone"
build="$path/deploy/phone";
target="build";

# clear old builds
rm -r $target build.zip

rm -r $build
cd $path
tools/deploy.sh
cd -
mv $build $target
cp -r config.xml icons splash $target

cd $target
#zip ../build.zip .
zip -rq ../build.zip .
cd -

# send to phonegap build
curl -u johann.jacobsohn@directbox.com -X PUT -F file=@build.zip https://build.phonegap.com/api/v1/apps/${id}

rm -r $target build.zip

exit;
