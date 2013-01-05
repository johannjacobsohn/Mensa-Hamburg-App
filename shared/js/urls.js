/** 
 * Static conf file for urls to load data from
 *
 * @class urls
*/
(function(){
	var baselink = "http://menu.mensaapp.org/";
	urls = {
		mensenWeek : {},
		mensen : [
			{
				name: "Alexanderstrasse",
				url:  baselink + "Alexanderstrasse/{{week}}",
				address: "Alexanderstraße 1, 20099 Hamburg",
				open: "Montag - Donnerstag: 07:45 - 18:00 Uhr, Freitag: 07:45 - 16:00 Uhr",
				misc: "Vom 23.07.2012-07.09.2012 geschlossen"
			},
			{
				name: "Armgartstrasse",
				url:  baselink + "Armgartstrasse/{{week}}/",
				address: "Armgartstraße 24, 22087 Hamburg",
				open: "Montag - Donnerstag: 09:00 - 15:00 Uhr; Freitag: 09:00 - 14:30 Uhr",
				misc: "Vom 16.07.2012-14.09.2012 geschlossen"
			},
			{
				name: "Averhoffstrasse",
				url:  baselink + "Averhoffstrasse/{{week}}/",
				address: "Averhoffstraße 38, 22085 Hamburg",
				open: "Montag - Donnerstag: 09:00 - 16:15 Uhr; Freitag: 09:00 - 14:00 Uhr",
				misc: "Vom 16.07.2012-28.09.2012 geschlossen"
			},
			{
				name: "Bergedorf",
				url:  baselink + "Bergedorf/{{week}}/",
				address: "Lohbrügger Kirchstraße 65, 21033 Hamburg",
				open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr"
			},
			{
				name: "Berliner Tor",
				url:  baselink + "BerlinerTor/{{week}}/",
				address: "Berliner Tor 7, 20099 Hamburg",
				open: "Montag - Freitag: 11:15 - 14:30 Uhr"
			},
			{
				name: "Botanischer Garten",
				url:  baselink + "BotanischerGarten/{{week}}/",
				address: "Ohnhorstraße 18, 22609 Hamburg",
				open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr",
				misc: "Vom 16.07.2012-10.08.2012 geschlossen"
			},
			{
				name: "Bucerius Law School",
				url:  baselink + "BuceriusLawSchool/{{week}}/",
				address: "Jungiusstraße 6, 20355 Hamburg",
				open: "Montag - Freitag: 11:30 - 14:00 Uhr"
			},
			{
				name: "Campus",
				url:  baselink + "Campus/{{week}}/",
				address: "Von-Melle-Park 5, 20146 Hamburg",
				open: "Montag - Donnerstag: 10:00 - 16:00 Uhr; Freitag: 10:00 - 15:30 Uhr"
			},
			{
				name: "City Nord",
				url:  baselink + "CityNord/{{week}}/",
				address: "Hebebrandstraße 1, 22297 Hamburg",
				open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-24.08.2012 geschlossen"
			},
			{
				name: "Finkenau",
				url:  baselink + "Finkenau/{{week}}/",
				address: "Finkenau 35, 22081 Hamburg",
				open: "Montag - Freitag: 08:00 - 18:00 Uhr",
				misc: "Vom 13.08.2012-31.08.2012 geschlossen"
			},
			{
				name: "Geomatikum",
				url:  baselink + "Geomatikum/{{week}}/",
				address: "Bundesstraße 55, 20146 Hamburg",
				open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr"
			},
			{
				name: "Harburg",
				url:  baselink + "Harburg/{{week}}/",
				address: "Denickestraße 22, 21073 Hamburg",
				open: "Montag - Freitag: 07:45 - 18:00 Uhr"
			},
			{
				name: "Jungiusstrasse",
				url:  baselink + "Jungiusstrasse/{{week}}/",
				address: "Jungiusstraße 9, 20355 Hamburg",
				open: "Montag - Freitag: 10:00- 16:30 Uhr",
				misc: "Vom 16.07.2012-31.08.2012 geschlossen"
			},
			{
				name: "Philosophenturm",
				url:  baselink + "Philosophenturm/{{week}}/",
				address: "Von-Melle-Park 6, 20146 Hamburg",
				open: "Montag - Freitag: 08:00 - 19:00 Uhr, Samstag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-25.08.2012 geschlossen"
			},
			{
				name: "Stellingen",
				url:  baselink + "Stellingen/{{week}}/",
				address: "Vogt-Kölln-Straße 30, 22527 Hamburg",
				open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
				misc: "Vom 23.07.2012-24.08.2012 geschlossen"
			},
			{
				name: "Studierendenhaus",
				address: "Von-Melle-Park 2, 20146 Hamburg",
				open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr"
			},
			{
				name: "Cafe CFEL",
				address: "Notkestrasse 85, 22607 Hamburg",
				open: "Montag - Freitag: 08:00 - 15:00 Uhr"
			}
		]
	};
	
	/*
	 * copy urls.mensen into legacy urls.mensenWeek
	 */
	urls.mensen.forEach(function( mensa ){
		mensa.url = baselink + mensa.name + "/";
		urls.mensenWeek[ mensa.name ] = mensa.url;
	});

})();
