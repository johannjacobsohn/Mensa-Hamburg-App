setup:
	npm install

lint:
	node_modules/.bin/jshint .

test:
	node_modules/.bin/mocha-phantomjs tests/client/runner.html -s localToRemoteUrlAccessEnabled=true -s webSecurityEnabled=false

.PHONY: test
