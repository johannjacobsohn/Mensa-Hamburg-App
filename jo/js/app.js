// required
jo.load();

var App = (function() {
	var scn;
	var stack;
	var menuList;
	var date = "";
	
	var cards = {
		lists: function() {
			menuList = new joList([]);
			menuList.formatItem = function(item, index) {
				var element = document.createElement('jolistitem');
				if (item.type === "header") {
					z = new joContainer([
						new joTitle((item.headerTyp === "date") ? dateToString(item.header) : item.header),
						// a simple row of things
					]);
				} else {
					var contain = new joContainer([
						new joFlexrow([
							item.dish,
							item.name
						])
					]);
					z = document.createElement('jolistitem');
					z.innerHTML = "<h2>" + item.dish + "</h2>" + 
						"<p class='name'>" + item.name + "</p>" +
						"<p class='price'>" + (conf.displayStudentPrices() ? item.studPrice : item.normalPrice) + "€</p>";
				}
				return z;
			};
			card = new joCard([
					menuList
				]).setTitle("Mensen")
			return card;
		},
		config: function(){
			var rec = {},
			   rows = [],
			   json = conf.getMensaInfo();
			for(i=0; i<json.length; i++){
				rec[json[i].name] = json[i].active;
			}
			record = new joRecord(rec).setAutoSave(true);

			for(i=0; i<json.length; i++){
				rows.push(
					new joFlexrow([
						new joLabel(json[i].name).setStyle("left"),
						new joToggle(record.link(json[i].name))
					])
				);
			}

			var card = new joCard([
				new joGroup([
					priceSelect = new joSelect([ "Studentenpreise anzeigen", "Normalpreise anzeigen" ], conf.displayStudentPrices() ? 0 : 1 )
				]),
				checkboxes = new joGroup(rows),
			]).setTitle("Mensen laden");

			priceSelect.selectEvent.subscribe(function(){
				// @TODO: Keine Stringvergleiche
				conf.setStudentPrices(priceSelect.field.data === "Studentenpreise anzeigen")
			})

			return card;
		},
		filter: function(){
			var card = new joCard([
				new joGroup([
					
						new joCaption("Nach Mensa filtern"),
						mensaFilter = new joSelect([ "Alle" ], 0),
						new joCaption("Nach Gericht filtern"),
						dishSelect  = new joSelect([ "Alle" ], 0),
				])
			]).setTitle("Mensen laden");

			mensaFilter.selectEvent.subscribe(function(value, list) {
				if(list.data[value] === "Alle") {
					storage.unsetMensaFilter();
				} else {
					storage.setMensaFilter(list.data[value]);
				}
				storage.getSortedSegmented(setData);
			});

			dishSelect.selectEvent.subscribe(function(value, list) {
				if(list.data[value] === "Alle") {
					storage.unsetNameFilter();
				} else {
					storage.setNameFilter(list.data[value]);
				}
				storage.getSortedSegmented(setData);
			});

			var urls = conf.getSavedURLs();
			urls.unshift("Alle");
			mensaFilter.list.data = urls;
			mensaFilter.list.refresh();

			storage.getTypes(function(json){
				json.unshift("Alle");
				dishSelect.list.data = json;
				dishSelect.list.refresh();
			});

			return card;
		},
		about: function(){
			console.log("about")
			var card = new joCard([
				new joGroup(
					new joHTML(
						"<h1>" + info.appName + "</h1>" + 
						"<p>"  + info.appDesc + "</p>"
					)
				)
			]).setTitle("Mensen laden");
			return card;
		}
	};
 
	joCache.set("infopopup", function() {
		var popup = [
			new joTitle( info.appName ),
			new joGroup( info.appDesc ),
			new joButton("Ok").selectEvent.subscribe(pop),
			new joButton("Seite laden").selectEvent.subscribe(web),
			new joButton("Email schreiben").selectEvent.subscribe(email)
		];
		
		function pop() {
			App.scn.hidePopup();
		}
		function web() {
			location.href = info.appURL
		}
		function email(){
			location.href = "mailto:" + info.appEmail
			App.scn.hidePopup();
		}
		
		return popup;
	});

	joCache.set("filterpopup", function() {
		var popup = [
				new joTitle( "Filtern" ),
				new joGroup([
					new joGroup([
						new joCaption("Nach Mensa filtern"),
						mensaFilter = new joSelect([ "Alle" ], 0),
						new joCaption("Nach Gericht filtern"),
						dishSelect  = new joSelect([ "Alle" ], 0),
					]),
					new joButton("Filtern").selectEvent.subscribe(pop)
				])
			]

			mensaFilter.selectEvent.subscribe(function(value, list) {
				if(list.data[value] === "Alle") {
					storage.unsetMensaFilter();
				} else {
					storage.setMensaFilter(list.data[value]);
				}
				storage.getSortedSegmented(setData);
			});

			dishSelect.selectEvent.subscribe(function(value, list) {
				if(list.data[value] === "Alle") {
					storage.unsetNameFilter();
				} else {
					storage.setNameFilter(list.data[value]);
				}
				storage.getSortedSegmented(setData);
			});

			var urls = conf.getSavedURLs();
			urls.unshift("Alle");
			mensaFilter.list.data = urls;
			mensaFilter.list.refresh();

			storage.getTypes(function(json){
				json.unshift("Alle");
				dishSelect.list.data = json;
				dishSelect.list.refresh();
			});

		return popup;
	});

	function pop() {
		App.scn.hidePopup();
	}
	
	function navigate(card) {
		stack.push(joCache.get(card));
	};
	function nextDay() {
		storage.nextDay(setData);
	}
	function prevDay() {
		storage.prevDay(setData);
	}
	var date;
	function setData(json, dateStr){
//		console.log("date", date)
//		console.log(json, dateStr)

		if(typeof dateStr === "undefined") {
			dateStr = date;
		} else {
			date = dateStr;
		}
		s = stack;
		console.log("date", date, dateStr)
		joCache.set(dateStr, cards.lists);
		stack.push(joCache.clear(dateStr).get(dateStr));
		nav.back.setStyle("")

		menuList.data = json;
		menuList.refresh();
		if(dateStr) document.querySelectorAll("joview.title")[0].innerHTML = dateToString(dateStr);
	}

	function init() {
		for(var cardName in cards) {
			joCache.set(cardName, cards[cardName]);
		}
		
		App.scn = new joScreen(
			new joContainer([

				new joFlexcol([
					nav = new joNavbar(),
					stack = new joStackScroller(),
				]),
				this.toolbar = new joToolbar([
					new joFlexrow([
						edit = new joButton("Edit"),
						about = new joButton("Info"),
						filter = new joButton("Filtern")
					])
				])
			])
		);

		var yesterdayButton = new joBackButton("Gestern").setStyle("prev active").selectEvent.subscribe(prevDay);
		var tomorrowButton = new joBackButton("Morgen"  ).setStyle("next active").selectEvent.subscribe(nextDay);
		nav.row.push(yesterdayButton);
		nav.row.push(tomorrowButton);

		y = yesterdayButton;
		t = tomorrowButton;

		about.selectEvent.subscribe(function() {
			App.scn.showPopup(joCache.get("infopopup"));
		});
		
		edit.selectEvent.subscribe(function() {
			y.setStyle(""); 
			t.setStyle("");
			navigate("config");
		});
		filter.selectEvent.subscribe(function() {

			navigate("filter")
//			App.scn.showPopup(joCache.get("filterpopup"));
		});

		// 
		nav.back.selectEvent.subscribe(function(){
			mensen = [];
			for(r in record.data){
				if(record.data[r]) mensen.push(r)
			}
			conf.setURLs(mensen);
			storage.cleanData();
			storage.getSortedSegmented(setData);
		});

		nav.setStack(stack);
//		navigate("lists");

		storage.thisDay(setData);
	}

	// public stuff
	return {
		"init": init
	}
}());
