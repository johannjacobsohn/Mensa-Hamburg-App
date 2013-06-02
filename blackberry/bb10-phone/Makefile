export pathToSource := "../../enyo2/phone"
export pathToBuild := "build"

build:
	mkdir -p "$(pathToBuild)"
	touch "$(pathToBuild)" "$(pathToSource)/deploy/phone"
	rm -r "$(pathToBuild)" "$(pathToSource)/deploy/phone"
	
	cd "$(pathToSource)" && tools/deploy.sh
	cd -
	mv "$(pathToSource)/deploy/phone" "$(pathToBuild)"
	cp -r config.xml "$(pathToBuild)"
	cp ../../shared/img/res/128x128_.png "$(pathToBuild)"/icon.png

	cd "$(pathToBuild)" && zip -rq "../phone.zip" .

	read -p "Enter bb password:" passwd && ./sdk/bbwp --password $$passwd phone.zip -d -o .;
	read -p "Enter device password:" passwd &&./sdk/dependencies/tools/bin/blackberry-deploy -installApp -password $$passwd -device 192.168.1.22 -package device/phone.bar

clean:
	rm -r "$(pathToBuild)" phone.zip simulator device

deploy: build clean

.PHONY: build
