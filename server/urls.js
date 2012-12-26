/** 
 * Static conf file for urls to load data from
 *
 * @class urls
*/
/*jshint node:true*/
"use strict";
(function(){
	var baselink = "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/";
	var urls = {
		mensenWeek : {},
		mensen : [
			{
				name: "Alexanderstrasse",
				url:  baselink + "660/2012/{{week}}/",
				address: "Alexanderstraße 1, 20099 Hamburg",
				open: "Montag - Donnerstag: 07:45 - 18:00 Uhr, Freitag: 07:45 - 16:00 Uhr",
				misc: "Vom 23.07.2012-07.09.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Armgartstrasse",
				url:  baselink + "590/2012/{{week}}/",
				address: "Armgartstraße 24, 22087 Hamburg",
				open: "Montag - Donnerstag: 09:00 - 15:00 Uhr; Freitag: 09:00 - 14:30 Uhr",
				misc: "Vom 16.07.2012-14.09.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Averhoffstrasse",
				url:  baselink + "650/2012/{{week}}/",
				address: "Averhoffstraße 38, 22085 Hamburg",
				open: "Montag - Donnerstag: 09:00 - 16:15 Uhr; Freitag: 09:00 - 14:00 Uhr",
				misc: "Vom 16.07.2012-28.09.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Bergedorf",
				url:  baselink + "520/2012/{{week}}/",
				address: "Lohbrügger Kirchstraße 65, 21033 Hamburg",
				open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr",
				parser: "studhh"
			},
			{
				name: "BerlinerTor",
				url:  baselink + "530/2012/{{week}}/",
				address: "Berliner Tor 7, 20099 Hamburg",
				open: "Montag - Freitag: 11:15 - 14:30 Uhr",
				parser: "studhh"
			},
			{
				name: "BotanischerGarten",
				url:  baselink + "560/2012/{{week}}/",
				address: "Ohnhorstraße 18, 22609 Hamburg",
				open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr",
				misc: "Vom 16.07.2012-10.08.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "BuceriusLawSchool",
				url:  baselink + "410/2012/{{week}}/",
				address: "Jungiusstraße 6, 20355 Hamburg",
				open: "Montag - Freitag: 11:30 - 14:00 Uhr",
				parser: "studhh"
			},
			{
				name: "Campus",
				url:  baselink + "340/2012/{{week}}/",
				address: "Von-Melle-Park 5, 20146 Hamburg",
				open: "Montag - Donnerstag: 10:00 - 16:00 Uhr; Freitag: 10:00 - 15:30 Uhr",
				parser: "studhh"
			},
			{
				name: "CityNord",
				url:  baselink + "550/2012/{{week}}/",
				address: "Hebebrandstraße 1, 22297 Hamburg",
				open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-24.08.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Finkenau",
				url:  baselink + "620/2012/{{week}}/",
				address: "Finkenau 35, 22081 Hamburg",
				open: "Montag - Freitag: 08:00 - 18:00 Uhr",
				misc: "Vom 13.08.2012-31.08.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Geomatikum",
				url:  baselink + "540/2012/{{week}}/",
				address: "Bundesstraße 55, 20146 Hamburg",
				open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr",
				parser: "studhh"
			},
			{
				name: "Harburg",
				url:  baselink + "570/2012/{{week}}/",
				address: "Denickestraße 22, 21073 Hamburg",
				open: "Montag - Freitag: 07:45 - 18:00 Uhr",
				parser: "studhh"
			},
			{
				name: "Jungiusstrasse",
				url:  baselink + "610/2012/{{week}}/",
				address: "Jungiusstraße 9, 20355 Hamburg",
				open: "Montag - Freitag: 10:00- 16:30 Uhr",
				misc: "Vom 16.07.2012-31.08.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Philosophenturm",
				url:  baselink + "350/2012/{{week}}/",
				address: "Von-Melle-Park 6, 20146 Hamburg",
				open: "Montag - Freitag: 08:00 - 19:00 Uhr, Samstag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-25.08.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Stellingen",
				url:  baselink + "580/2012/{{week}}/",
				address: "Vogt-Kölln-Straße 30, 22527 Hamburg",
				open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-24.08.2012 geschlossen",
				parser: "studhh"
			},
			{
				name: "Studierendenhaus",
				url:  baselink + "310/2012/{{week}}/",
				address: "Von-Melle-Park 2, 20146 Hamburg",
				open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr",
				parser: "studhh"
			},
			{
				name: "CafeCFEL",
				url: baselink + "/680/2012/{{week}}/",
				address: "Notkestrasse 85, 22607 Hamburg",
				open: "Montag - Freitag: 08:00 - 15:00 Uhr",
				parser: "studhh"
			}
		]
	};
	
	/*
	 * copy urls.mensen into legacy urls.mensenWeek
	 */
	urls.mensen.forEach(function( mensa ){
//		mensa.url = baselink + mensa.name + "/";
		urls.mensenWeek[ mensa.name ] = mensa.url;
		urls[mensa.name] = mensa;
//		console.log(mensa.name, urls.mensenWeek)
	});
	
	exports.urls = urls;
})();
