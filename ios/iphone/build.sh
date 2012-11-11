#
# Build IPad 
#

set -u
set -x

#phongap_pwd=$1
id=131163
path="../../enyo2/phone"

# clear old builds
rm -r build build.zip

rm -r /deploy/*
cd $path/tools
./deploy.sh
cd -
mv $path/deploy/* build
cp -r config.xml icons build

cd build
#zip ../build.zip .
zip -rq ../build.zip .
cd -

# send to phonegap build
curl -u johann.jacobsohn@directbox.com -X PUT -F file=@build.zip https://build.phonegap.com/api/v1/apps/${id}

rm -r build build.zip

exit;
