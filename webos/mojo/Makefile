GREP = grep
CUT = /usr/bin/cut
CAT = cat

NAME = `$(CAT) appinfo.json | $(GREP) '"id"' | $(CUT) -d \" -f 4`
VERSION = `$(CAT) appinfo.json | $(GREP) '"version"' | $(CUT) -d \" -f 4`

all :: package deploy run

package:
	palm-package .

deploy:
	palm-install $(NAME)_$(VERSION)_all.ipk

run:
	palm-launch $(NAME)

log:
	palm-log -f $(NAME)

watch:
	while true; do inotifywait -e modify -r . && make; done
