#!/bin/sh

cd ..
palm-package enyo
palm-install com.jjacobsohn.mensaapp_1.0.0_all.ipk 
palm-launch com.jjacobsohn.mensaapp
rm com.jjacobsohn.mensaapp_1.0.0_all.ipk 
