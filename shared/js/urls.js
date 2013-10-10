/** 
 * Static conf file for urls to load data from
 *
 * @class urls
*/
(function(){
	var baselink = "http://data.mensaapp.org/";
	urls = {
		mensen : [
			{
				name: "Alexanderstrasse",
				id: "alexanderstrasse",
				url: baselink + "Alexanderstrasse/{{week}}",
				address: "Alexanderstraße 1, 20099 Hamburg"
			},
			{
				name: "Armgartstrasse",
				id: "armgartstrasse",
				url: baselink + "Armgartstrasse/{{week}}/",
				address: "Armgartstraße 24, 22087 Hamburg"
			},
			{
				name: "Averhoffstrasse",
				id: "averhoffstrasse",
				url: baselink + "Averhoffstrasse/{{week}}/",
				address: "Averhoffstraße 38, 22085 Hamburg"
			},
			{
				name: "Bergedorf",
				id: "bergedorf",
				url: baselink + "Bergedorf/{{week}}/",
				address: "Lohbrügger Kirchstraße 65, 21033 Hamburg"
			},
			{
				name: "Berliner Tor",
				id: "berlinertor",
				url: baselink + "BerlinerTor/{{week}}/",
				address: "Berliner Tor 7, 20099 Hamburg"
			},
			{
				name: "Botanischer Garten",
				id: "botanischergarten",
				url: baselink + "BotanischerGarten/{{week}}/",
				address: "Ohnhorstraße 18, 22609 Hamburg"
			},
			{
				name: "Bucerius Law School",
				id: "buceriuslawschool",
				url: baselink + "BuceriusLawSchool/{{week}}/",
				address: "Jungiusstraße 6, 20355 Hamburg"
			},
			{
				name: "Campus",
				id: "campus",
				url: baselink + "Campus/{{week}}/",
				address: "Von-Melle-Park 5, 20146 Hamburg"
			},
			{
				name: "City Nord",
				id: "citynord",
				url: baselink + "CityNord/{{week}}/",
				address: "Hebebrandstraße 1, 22297 Hamburg"
			},
			{
				name: "Finkenau",
				id: "finkenau",
				url: baselink + "Finkenau/{{week}}/",
				address: "Finkenau 35, 22081 Hamburg"
			},
			{
				name: "Geomatikum",
				id: "geomatikum",
				url: baselink + "Geomatikum/{{week}}/",
				address: "Bundesstraße 55, 20146 Hamburg"
			},
			{
				name: "Harburg",
				id: "harburg",
				url: baselink + "Harburg/{{week}}/",
				address: "Denickestraße 22, 21073 Hamburg"
			},
			{
				name: "Jungiusstrasse",
				id: "jungiusstrasse",
				url: baselink + "Jungiusstrasse/{{week}}/",
				address: "Jungiusstraße 9, 20355 Hamburg"
			},
			{
				name: "Philosophenturm",
				id: "philosophenturm",
				url: baselink + "Philosophenturm/{{week}}/",
				address: "Von-Melle-Park 6, 20146 Hamburg"
			},
			{
				name: "Stellingen",
				id: "stellingen",
				url: baselink + "Stellingen/{{week}}/",
				address: "Vogt-Kölln-Straße 30, 22527 Hamburg"
			},
			{
				name: "Studierendenhaus",
				id: "studierendenhaus",
				url: baselink + "Studierendenhaus/{{week}}/",
				address: "Von-Melle-Park 2, 20146 Hamburg"
			},
			{
				name: "Cafe CFEL",
				id: "cafecfel",
				url: baselink + "CafeCFEL/{{week}}/",
				address: "Notkestrasse 85, 22607 Hamburg"
			},
			{
				name: "UKE",
				id: "uke",
				url: baselink + "CafeCFEL/{{week}}/",
				address: "SEHR EXPERIMENTELL!"
			}
		]
	};

	/*
	 * create helpers
	 */
	urls.byName = {};
	urls.byId = {};
	urls.mensenWeek = {}; // careful: if you combine these statements, all three will point to the *same* object
	urls.mensen.forEach(function( m ){
		urls.mensenWeek[m.name] = m.url; // copy urls.mensen into legacy urls.mensenWeek
		urls.byName[m.name] = urls.byId[m.id] = m;
	});
	urls.combine = function(mensen, weeks){
		return baselink + mensen.join(",") + "/" + weeks.join(",");
	};
})();
