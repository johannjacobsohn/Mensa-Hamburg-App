/* 
 * Mehr oder minder statische Konfigurationsdatei für URLs
 * 
 */
(function(){
	urls = {
		mensen : {
//			"Armgartstraße"         : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Armgartstraße",
//			"Bergedorf"             : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Bergedorf",
//			"Berliner Tor"          : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Berliner Tor",
//			"Bistro Averhoffstraße" : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Bistro Averhoffstraße",
//			"Botanischer Garten"    : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Botanischer Garten",
//			"Café Alexanderstraße"  : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Café Alexanderstraße",
//			"Finkenau"              : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Finkenau",
//			"Stellingen"            : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Stellingen",
//			"Harburg"               : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Harburg",
			"WIWI"                  : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Campus", 
			"Philo"                 : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Philosophenturm",
			"Geo"                   : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Geomatikum",
			"Schweinemensa"         : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Studierendenhaus",
//			"Physik"                : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Caf%C3%A9%20Jungiusstra%C3%9Fe",
//			"FH Buzze"              : "http://www.studierendenwerk-hamburg.de/essen/tag_bls.php?haus=Bucerius%20Law%20School"
//			"Bucerius Law School"   : "http://www.studierendenwerk-hamburg.de/essen/tag.php?haus=Bucerius Law School",
		},
		
		mensenWeek : {
			"Armgartstraße"         : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Armgartstra%DFe&kw={{week}}",
			"Bergedorf"             : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Bergedorf&kw={{week}}",
			"Berliner Tor"          : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Berliner Tor&kw={{week}}",
			"Bistro Averhoffstraße" : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Bistro Averhoffstraße&kw={{week}}",
			"Botanischer Garten"    : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Botanischer Garten&kw={{week}}",
			"Café Alexanderstraße"  : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Café Alexanderstraße&kw={{week}}",
			"Finkenau"              : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Finkenau&kw={{week}}",
			"Stellingen"            : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Stellingen&kw={{week}}",
			"Harburg"               : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Harburg&kw={{week}}",
			"WIWI"                  : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Campus&kw={{week}}",
			"Philo"                 : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Philosophenturm&kw={{week}}",
			"Geo"                   : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Geomatikum&kw={{week}}",
			"Schweinemensa"         : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Studierendenhaus&kw={{week}}",
			"Physik"                : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=Caf%C3%A9%20Jungiusstra%C3%9Fe&kw={{week}}",
			"Bucerius Law School"   : "http://www.studierendenwerk-hamburg.de/essen/woche_bls.php?haus=Bucerius Law School&kw={{week}}",// "FH Buzze"
			"City Nord"             : "http://www.studierendenwerk-hamburg.de/essen/woche.php?haus=City%20Nord&kw={{week}}"
		},

		mock: {
			"Armgartstraße"         : "mock/armgardtstraße.html",
			"Bergedorf"             : "mock/bergedorf.html",
			"Berliner Tor"          : "mock/berlinertor.html",
			"Bistro Averhoffstraße" : "mock/averhoffstraße.html",
			"Botanischer Garten"    : "mock/botanischergarten.html",
			"Café Alexanderstraße"  : "mock/alexanderstraße.html",
			"Finkenau"              : "mock/finkenau.html",
			"Stellingen"            : "mock/stellingen.html",
			"Harburg"               : "mock/harburg.html",
			"WIWI"                  : "mock/campus.html",
			"Philo"                 : "mock/philosophenturm.html",
			"Geo"                   : "mock/geomatikum.html",
			"Schweinemensa"         : "mock/studierendenhaus.html",
			"Physik"                : "mock/jungiusstrasse.html",
			"Bucerius Law School"   : "mock/buzze.html",// "FH Buzze"
			"City Nord"             : "mock/citynord.html"
		}

	}
})();
