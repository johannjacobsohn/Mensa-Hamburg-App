setup:
	npm install

lint:
	node_modules/.bin/jshint .

test:
	node_modules/.bin/mocha-phantomjs shared/test/testrunner.html -s localToRemoteUrlAccessEnabled=true -s webSecurityEnabled=false

.PHONY: test
