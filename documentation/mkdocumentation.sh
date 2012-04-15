#!/bin/sh

set -x
set -u

jsdoc_path=~/bin/jsdoc/jsdoc
target="../shared/js"

# make JS Doc 3 Documentation
$jsdoc_path $target


# cloc . --exclude-dir js/lib 


exit;
