#
#
# Build script
# 
#

set -u
set -x

build=$1
phongap_pwd=$2

# AppIDs:
declare -A ids
ids[phone]=131163
# ids[phoneAndroid]=136804
ids[tablet]=137859
ids[tabletAndroid]=137860

#########
# Unit #
#########
if [ $build == "unit" ] || [ $build = "all" ]; then
	cd tests
#	./run-testserver.sh
	./run-tests.sh
	cd ..
fi;


#########
# Phone #
#########
if [ $build == "phone" ] || [ $build == "phone-ios" ] || [ $build == "phone-android" ] || [ $build = "all" ]; then
	cd phone
	./build.sh
	cd ..
	# iphone
	if [ $build == "phone-ios" ] || [ $build == "phone" ] || [ $build = "all" ]; then
		curl -u johann.jacobsohn@directbox.com -X PUT -F file=@phone/release-phone.zip https://build.phonegap.com/api/v1/apps/${ids[phone]}
	fi;
	# android-phone
	if [ $build == "phone-android" ] || [ $build == "phone" ] || [ $build = "all" ]; then
		cd android-phone
		./build.sh
		cd ..
	fi;
fi;

##########
# Tablet #
##########
if [ $build == "tablet" ] || [ $build == "tablet-ios" ] || [ $build == "tablet-android" ] || [ $build = "all" ]; then
	cd tablet
	./build.sh
	cd ..
	# ipad
	if [ $build == "tablet-ios" ] || [ $build == "tablet" ] || [ $build = "all" ]; then
		curl -u johann.jacobsohn@directbox.com -X PUT -F file=@tablet/release-tablet.zip https://build.phonegap.com/api/v1/apps/${ids[tablet]}
	fi;
	# android tablet
	if [ $build == "tablet-android" ] || [ $build == "tablet" ] || [ $build = "all" ]; then
		curl -u johann.jacobsohn@directbox.com -X PUT -F file=@tablet/release-tablet.android.zip https://build.phonegap.com/api/v1/apps/${ids[tabletAndroid]}
	fi;
fi;

#########
# AppUp #
#########
if [ $build = "appup" ] || [ $build = "all" ]; then
	echo "todo"
fi;

###########
# Widgets #
###########





#################
# Google Chrome #
#################
if [ $build = "chrome-release" ] || [ $build = "chrome" ] || [ $build = "all" ]; then
	google-chrome --pack-extension=chrome --pack-extension-key=keys/chrome.pem
fi;
if [ $build = "chrome-test" ] || [ $build = "chrome" ] || [ $build = "all" ]; then
	google-chrome --pack-extension=chrome --pack-extension-key=keys/chrome.pem
fi;

exit;
