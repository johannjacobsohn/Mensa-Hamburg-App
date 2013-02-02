#!/bin/bash
set -x 
set -u

mv src src.backup
cp -Lr src.backup src-temp
jscoverage src-temp src
mocha-phantomjs runner.html -R json-cov | json2htmlcov > coverage.html
rm -r src src-temp
mv src.backup src

chromium-browser coverage.html
