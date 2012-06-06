#
#
# Build script
# 
#

set -u
set -x

# @TODO: unit tests laufen lassen

# von phonegap build phone-packages produzieren lassen
cd phone
./build.sh
cd ..
curl -u johann.jacobsohn@directbox.com -X PUT -F file=@phone/release-phone.zip https://build.phonegap.com/api/v1/apps/131163


exit;
