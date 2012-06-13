#
#
# Build script
# 
#

set -u
# set -x

build=$1
phongap_pwd=$2

# AppIDs:
declare -A ids
ids[phone]=131163
ids[phoneAndroid]=136804
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
if [ $build == "phone" ] || [ $build = "all" ]; then
	cd phone
	./build.sh
	cd ..
	# phone
	curl -u johann.jacobsohn@directbox.com -X PUT -F file=@phone/release-phone.zip https://build.phonegap.com/api/v1/apps/${ids[phone]}
	# android-phone
#	curl -u johann.jacobsohn@directbox.com -X PUT -F file=@phone/release-phone.android.zip https://build.phonegap.com/api/v1/apps/${ids[phoneAndroid]}
fi;

##########
# Tablet #
##########
if [ $build = "tablet" ] || [ $build = "all" ]; then
	cd tablet
	./build.sh
	cd ..
	curl -u johann.jacobsohn@directbox.com -X PUT -F file=@tablet/release-tablet.zip https://build.phonegap.com/api/v1/apps/${ids[tablet]}
	curl -u johann.jacobsohn@directbox.com -X PUT -F file=@tablet/release-tablet.android.zip https://build.phonegap.com/api/v1/apps/${ids[tabletAndroid]}
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





exit;
