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
		}
	}
})();

var todo = 0;
var done = 0;
globalWeekMenu = [];
for( key in urls.mensenWeek ){
	todo++
	(function(){
		var kay = key
		var url = urls.mensenWeek[kay].replace("{{week}}", "26");
		var page = require('webpage').create();
		page.onConsoleMessage = function (msg) {
			console.log( msg );
		};
		page.open(url, function (status) {
			var weekMenu = evalPage(page);
			globalWeekMenu = globalWeekMenu.concat(weekMenu);
			done++;
//			console.log(globalWeekMenu);
//			console.log(kay + " " + weekMenu);
//			console.log(weekMenu.concat(weekMenu))
			if(todo === done){
				console.log(JSON.stringify(globalWeekMenu));
				phantom.exit();
			}
		});
	})();
}


function evalPage(page) {
	return page.evaluate(function () {
		var weekMenu = [];
		parseMensaHTML(document.getElementsByTagName("body")[0].innerHTML, "Averhoffstraße", 23);
		return weekMenu;

		function parseMensaHTML(html, mensa, week){
			var tds, trs, dish, dishName, date, dateString, obj,
				properties = [],
				additives = [],
				imgs,
				spans,
				tempDiv = document.createElement('div');

			tempDiv.innerHTML = html.replace(/src="(.)*?"/g, '').replace(/<script(.|\s)*?\/script>/g, '');
			//console.log(tempDiv.innerHTML)
			try{
				trs = tempDiv.getElementsByTagName("table")[0].getElementsByTagName("tr");
			} catch(e){
				return;
			}
			// extract and parse date field
			var datefield = trs[0].getElementsByTagName("th")[0].innerHTML.split("<br>")[1];
			var germanStartdate = datefield.split("-")[0].trim(); //@TODO: Test in Explorer!
			var germanStartdateArr = germanStartdate.split(".");
			var startdate = new Date(germanStartdateArr[2],(germanStartdateArr[1]-1),germanStartdateArr[0]);

			for (var j = 1; j < trs.length; j++){ // erste überspringen
				try{
					tds = trs[j].getElementsByTagName("td");
					ths = trs[j].getElementsByTagName("th");
				} catch(e){
					console.log(e);
					continue;
				}

				// Parse Dishname
				dishName = ths[0].innerText.trim();
				dishName = dishName.replace(/_+$/, ""); //remove trailing underscore

				// Parse dish
				for (var i = 0; i<=4; i++){
					// try to get p-tags which equals one dish;
					// if there aren't any there is no dish 
					try{
						p = tds[i].getElementsByTagName("p");
					} catch(e){
						console.log(e);
						continue;
					}
			
					for (var k=0; k<p.length; k++){
						// Extract Price

						// Windows Desktop Gadgets run under IE8 (at most),
						// so they dont know about getElementsByClassName
						if(p[k].getElementsByClassName){
							priceEl = p[k].getElementsByClassName("price")[0];
						} else {
							var t = p[k].getElementsByTagName("*");
							var tl = t.length;
							for(var l=0; l < tl; l++){
								if(t[l].className === "price"){
									priceEl = t[l];
									break;
								}
							}
						}
						if(priceEl){
							price = priceEl.innerHTML.replace("€","").replace(" ","").split("/");
							p[k].removeChild(priceEl); // remove price
						} else {
							// try to match the price with a regexp
							price = p[k].innerText.match(/[0-9]+,[0-9][0-9]/g) || ["0", "0"];
							price = price.length === 2 ? price : ["0", "0"];
							p[k].innerHTML = p[k].innerHTML.replace(/[0-9]+,[0-9][0-9]/g,"")// remove Price from String
						}
						studPrice = price[0].replace(/[^0-9,]/g,"");
						normalPrice = price[1].replace(/[^0-9,]/g,"");

						// Parse Properties
						properties = [];
						tempObj = {};
						imgs = p[k].getElementsByTagName("img");
						for ( l = 0; l < imgs.length; l++ ) {
							tempObj[imgs[l].title] = imgs[l].title;
						}
						
						for ( key in tempObj ) {
							properties.push({ name : key });
						}

						// Parse Additives
						additives = [];
						tempObj = {};
						spans = p[k].getElementsByTagName("span"); // no getElementsByClassName for IE
						for ( l = 0; l < spans.length; l++ ) {
							if(spans[l].className === "tooltip") {
								//additives.push({ name : spans[l].title });
								tempObj[spans[l].title] = spans[l].title;
							}
						}
						
						for ( key in tempObj ) {
							additives.push({ name : key });
						}

						// Parse out dish
						dish = p[k].innerText;
						dish = dish.replace(/&nbsp;/g, "").trim();
						dish = dish.replace(/\(([0-9.]+,?[\s]*)*\)/g, ""); //remove additives

						// Figure out date
						date = new Date(startdate.valueOf() + (i) * 24 * 60 * 60 * 1000);
						dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

						if(dish !== ""){
//								console.log(dishName);
							weekMenu.push({
								mensa       : mensa,
								week        : week,
								name        : dishName,
								dish        : dish,
								studPrice   : studPrice,
								normalPrice : normalPrice,
								date        : dateString,
								properties  : properties,
								additives   : additives
							});
						}
					}
				}
			}
		}
	});
}
