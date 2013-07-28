export pathToSource := "."
export pathToBuild := "deployable"
export deviceIP := "192.168.1.161"
export simulatorIP := "192.168.1.161"

build:
	mkdir -p "$(pathToBuild)"
	touch "$(pathToBuild)" "$(pathToSource)/deploy/bb10-phone"
	rm -r "$(pathToBuild)" "$(pathToSource)/deploy/bb10-phone"
	
	cd "$(pathToSource)" && tools/deploy.sh
	cd -
	mv "$(pathToSource)/deploy/bb10-phone" "$(pathToBuild)"
	cp -r config.xml "$(pathToBuild)"
	cp ../../shared/img/res/128x128_.png "$(pathToBuild)"/icon.png

	cd "$(pathToBuild)" && zip -rq "../phone.zip" .

	stty -echo && read -p "Enter bb password:" passwd && stty echo && ./sdk/bbwp --password $$passwd phone.zip -d -o .;

device: build
	stty -echo && read -p "Enter device password:" passwd && stty echo && ./sdk/dependencies/tools/bin/blackberry-deploy -installApp -password $$passwd -device $(deviceIP) -package device/phone.bar

simulator: 
	stty -echo && read -p "Enter device password:" passwd && stty echo && ./sdk/dependencies/tools/bin/blackberry-deploy -installApp -device $(simulatorIP) -package simulator/phone.bar

clean:
	rm -r "$(pathToBuild)" phone.zip simulator device

deploy: build clean

.PHONY: build simulator device
