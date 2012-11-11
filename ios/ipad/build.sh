#
# Build IPad 
#

set -u
set -x

#phongap_pwd=$1
id=137859

# clear old builds
rm -r build build.zip

rm -r ../../enyo2/tablet/deploy/*
cd ../../enyo2/tablet/tools
./deploy.sh
cd -
mv ../../enyo2/tablet/deploy/* build
cp -r config.xml icons splash build

cd build
#zip ../build.zip .
zip -rq ../build.zip .
cd -

# send to phonegap build
curl -u johann.jacobsohn@directbox.com -X PUT -F file=@build.zip https://build.phonegap.com/api/v1/apps/${id}

rm -r build build.zip

exit;
