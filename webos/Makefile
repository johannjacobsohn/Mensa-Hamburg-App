GREP = grep
CUT = /usr/bin/cut
CAT = cat

NAME = `$(CAT) enyo/appinfo.json | $(GREP) '"id"' | $(CUT) -d \" -f 4`
VERSION = `$(CAT) enyo/appinfo.json | $(GREP) '"version"' | $(CUT) -d \" -f 4`

all :: package deploy run

package:
	palm-package enyo

deploy:
	palm-install $(NAME)_$(VERSION)_all.ipk

run:
	palm-launch $(NAME)
