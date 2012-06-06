#!/bin/sh

cd source/
./minify.sh
cd ..

mkdir temp

cp -Lr release/* config.xml temp

cd temp
# todo: nutzlose Dateien entfernen und damit das zip klein halten
rm -r lib/layout/panels/
rm -r lib/layout/tree/
rm -r lib/layout/list/examples/
rm -r lib/layout/fittable/examples/
zip -r ../release-phone.zip .

cd ..


rm -r temp


exit
