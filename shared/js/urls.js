/** 
 * Static conf file for urls to load data from
 *
 * @class urls
*/
/*jshint smarttabs:true browser:true */
(function(){
	var baselink = "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/";
	urls = {
		mensenWeek : {
			"Alexanderstrasse"      : baselink + "660/2012/{{week}}/",
			"Armgartstrasse"        : baselink + "590/2012/{{week}}/",
			"Averhoffstrasse"       : baselink + "650/2012/{{week}}/",
			"Bergedorf"             : baselink + "520/2012/{{week}}/",
			"Berliner Tor"          : baselink + "530/2012/{{week}}/",
			"Botanischer Garten"    : baselink + "560/2012/{{week}}/",
			"Bucerius Law School"   : baselink + "410/2012/{{week}}/",
			"Campus"                : baselink + "340/2012/{{week}}/",
			"City Nord"             : baselink + "550/2012/{{week}}/",
			"Finkenau"              : baselink + "620/2012/{{week}}/",
			"Geomatikum"            : baselink + "540/2012/{{week}}/",
			"Harburg"               : baselink + "570/2012/{{week}}/",
			"Jungiusstrasse"        : baselink + "610/2012/{{week}}/",
			"Philosophenturm"       : baselink + "350/2012/{{week}}/",
			"Stellingen"            : baselink + "580/2012/{{week}}/",
			"Studierendenhaus"      : baselink + "310/2012/{{week}}/"
		},

		mensen : [
			{
				name: "Alexanderstrasse",
				url:  baselink + "660/2012/{{week}}/",
				address: "Alexanderstraße 1, 20099 Hamburg",
				open: "Montag - Donnerstag: 07:45 - 18:00 Uhr, Freitag: 07:45 - 16:00 Uhr",
				misc: "Vom 23.07.2012-07.09.2012 geschlossen"
			},
			{
				name: "Armgartstrasse",
				url:  baselink + "590/2012/{{week}}/",
				address: "Armgartstraße 24, 22087 Hamburg",
				open: "Montag - Donnerstag: 09:00 - 15:00 Uhr; Freitag: 09:00 - 14:30 Uhr",
				misc: "Vom 16.07.2012-14.09.2012 geschlossen"
			},
			{
				name: "Averhoffstrasse",
				url:  baselink + "650/2012/{{week}}/",
				address: "Averhoffstraße 38, 22085 Hamburg",
				open: "Montag - Donnerstag: 09:00 - 16:15 Uhr; Freitag: 09:00 - 14:00 Uhr",
				misc: "Vom 16.07.2012-28.09.2012 geschlossen"
			},
			{
				name: "Bergedorf",
				url:  baselink + "520/2012/{{week}}/",
				address: "Lohbrügger Kirchstraße 65, 21033 Hamburg",
				open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr"
			},
			{
				name: "Berliner Tor",
				url:  baselink + "530/2012/{{week}}/",
				address: "Berliner Tor 7, 20099 Hamburg",
				open: "Montag - Freitag: 11:15 - 14:30 Uhr"
			},
			{
				name: "Botanischer Garten",
				url:  baselink + "560/2012/{{week}}/",
				address: "Ohnhorstraße 18, 22609 Hamburg",
				open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr",
				misc: "Vom 16.07.2012-10.08.2012 geschlossen"
			},
			{
				name: "Bucerius Law School",
				url:  baselink + "410/2012/{{week}}/",
				address: "Jungiusstraße 6, 20355 Hamburg",
				open: "Montag - Freitag: 11:30 - 14:00 Uhr"
			},
			{
				name: "Campus",
				url:  baselink + "340/2012/{{week}}/",
				address: "Von-Melle-Park 5, 20146 Hamburg",
				open: "Montag - Donnerstag: 10:00 - 16:00 Uhr; Freitag: 10:00 - 15:30 Uhr"
			},
			{
				name: "City Nord",
				url:  baselink + "550/2012/{{week}}/",
				address: "Hebebrandstraße 1, 22297 Hamburg",
				open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-24.08.2012 geschlossen"
			},
			{
				name: "Finkenau",
				url:  baselink + "620/2012/{{week}}/",
				address: "Finkenau 35, 22081 Hamburg",
				open: "Montag - Freitag: 08:00 - 18:00 Uhr",
				misc: "Vom 13.08.2012-31.08.2012 geschlossen"
			},
			{
				name: "Geomatikum",
				url:  baselink + "540/2012/{{week}}/",
				address: "Bundesstraße 55, 20146 Hamburg",
				open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr"
			},
			{
				name: "Harburg",
				url:  baselink + "570/2012/{{week}}/",
				address: "Denickestraße 22, 21073 Hamburg",
				open: "Montag - Freitag: 07:45 - 18:00 Uhr"
			},
			{
				name: "Jungiusstrasse",
				url:  baselink + "610/2012/{{week}}/",
				address: "Jungiusstraße 9, 20355 Hamburg",
				open: "Montag - Freitag: 10:00- 16:30 Uhr",
				misc: "Vom 16.07.2012-31.08.2012 geschlossen"
			},
			{
				name: "Philosophenturm",
				url:  baselink + "350/2012/{{week}}/",
				address: "Von-Melle-Park 6, 20146 Hamburg",
				open: "Montag - Freitag: 08:00 - 19:00 Uhr, Samstag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-25.08.2012 geschlossen"
			},
			{
				name: "Stellingen",
				url:  baselink + "580/2012/{{week}}/",
				address: "Vogt-Kölln-Straße 30, 22527 Hamburg",
				open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-24.08.2012 geschlossen"
			},
			{
				name: "Studierendenhaus",
				url:  baselink + "310/2012/{{week}}/",
				address: "Von-Melle-Park 2, 20146 Hamburg",
				open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr"
			}
		]
	}
})();
