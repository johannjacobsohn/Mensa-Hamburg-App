Mensa Hamburg App
=================

The Mensa Hamburg App is a _multiplatform_ app that delivers formatted 
mensa menu information to the curious and hungry.

At the moment it displays exclusively the mensa plans of the Studentenwerk 
Hamburg, but that may change in the future.

The Mensa Hamburg App aims

- to be as platform agnostic as possible; to be available on as many platforms
available as possible
- to be as user friendly as possible,
- to provide the fastest user experience, not just in terms of application
performance, but in terms of how fast a user can get the desired information

There are three major version available at the moment: a general _phone 
version_, which supports any kind of small screen device or application and a 
_tablet or desktop version_ which tries to put more screen estate to good use.
Both Versions are written in enyo2.

 ![][ios-devices]
 ![][android-devices]

There also is a specialized version for webOS-Phones which uses the mojo 
framework, since webOS-Phones tend to have a significant smaller screen and 
generally do not work as well with Enyo. Also, Mojo is the official 
framework for webOS 2.

 ![][mojo-device]

There are other versions, frameworks and platforms, which are not supported
(any more).

All versions depend on a single core ("shared", "kernel", whatever) which 
retrieves and handles the data from the server and does the "heavy lifting", 
but should not impose constrain on the ui.

Here, let me doodle that for you:

<pre>
                core
         ,-------^---------------------------------------------------\
         |        \-----------\                                       \
       phone                 tablet                                  mojo
 (written in Enyo2)      (written in Enyo2)                    (written in Mojo)
   |          |          / | |   |       \                             |
iPhone     Android   iPad  | | Playbook  HP Touchpad             HP/Palm Phones
           (Phone)        /   \          
                      Chrome  Android (Tablet)
                              
</pre>


Planned features
----------------
- support for win8
- support for Intel AppUp
- support for Firefox Market
- support for win7 phone 
- support for multiple languages, particularly English
- launch a hosted web app
- support for (some) Blackberry handhelds 
- improved test coverage


Getting Started
===

Set up git
-----
	$ git clone https://github.com/johannjacobsohn/Mensa-Hamburg-App.git
	$ cd Mensa-Hamburg-App
	$ git submodule init
	$ git submodule update
or just download the latest [zipped code][zipped-code]


Try with Google Chrome
---
Since the app loads data from the internet you need to circumvent the 
[same origin policy][same-origin-policy] to load anything.

You may start Chrome or Chromium with command line arguments that disables 
the same origin policy and allows testing of the app:

    $ chromium-browser --disable-web-security  enyo2/[tablet|phone]/debug.html


Deploy to webOS
----

To deploy to webOS you'll need the [palm SDK][palm-sdk] and either a webOS
device or [an emulator][palm-emulator].

To deploy the app to a device or emulator:

    $ cd webos/[touchpad|mojo]/
    $ ./build.sh


Deploy to android
---
You'll need the [android sdk][android-sdk]. Once 
you've set that up plug in you android device or start your 
emulator, then

    $ cd android/[tablet|phone]/
    $ ./build.sh


[ios-devices]: http://johannjacobsohn.github.com/Mensa-Hamburg-App/assets/devices/ios-small.png
[android-devices]: http://johannjacobsohn.github.com/Mensa-Hamburg-App/assets/devices/android.png
[mojo-device]: http://johannjacobsohn.github.com/Mensa-Hamburg-App/assets/devices/mojo.png
[zipped-code]: https://github.com/johannjacobsohn/Mensa-Hamburg-App/archive/master.zip
[same-origin-policy]: https://en.wikipedia.org/wiki/Same_origin_policy
[palm-skd]: https://developer.palm.com/content/resources/develop/sdk_pdk_download.html
[palm-emulator]: https://developer.palm.com/content/api/dev-guide/tools/emulator.html
[android-sdk]: https://developer.android.com/sdk
