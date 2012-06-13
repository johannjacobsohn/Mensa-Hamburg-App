#!/bin/sh

cd source/
./minify.sh
cd ..

mkdir temp

cp -Lr release/* config*.xml temp

cd temp

# TODO: nutzlose Dateien entfernen und damit das zip klein halten

# normalen Release erstellen
zip -r ../release-tablet.zip .

# Android-Release erstellen, weil die aus historischen Gründen Android die Appid jjacobsohn.mensaApp.android hat...
mv config.android.xml config.xml
zip -r ../release-tablet.android.zip .

cd ..

# Aufräumen
rm -r temp

exit
