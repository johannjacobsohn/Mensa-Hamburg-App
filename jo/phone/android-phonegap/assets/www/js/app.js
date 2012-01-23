// required
jo.load();

//debug = true;

var App = (function() {
	var scn;
	var stack;
	var menuList;
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
//					element.innerHTML = (item.headerTyp === "date") ? dateToString(item.header) : item.header;
//					element.className = "header";
				} else {
//					element.innerHTML = item.dish;
					var contain = new joContainer([
						new joFlexrow([
							item.dish,
							item.name
						])
					]);
					z = document.createElement('jolistitem');
//					z.appendChild(contain.container);
					z.innerHTML = "<h2>" + item.dish + "</h2>" + 
						"<p class='name'>" + item.name + "</p>" +
						"<p class='price'>" + item.studPrice + "€</p>";
				}
				return z;
			};
			card = new joCard([menuList]).setTitle("Mensen")
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
				checkboxes = new joGroup(rows),
			]).setTitle("Mensen laden");

			return card;
		}
	};
	function navigate(card, event, param) {
		// assume single argument is from direct call (rather than event) so map to param
		if(arguments.length === 1) {
			param = card;
		}
		stack.push(joCache.get(param));
	};
	function nextDay() {
		storage.nextDay(setData);
	}
	function prevDay() {
		storage.prevDay(setData);
	}
	function setData(json, dateStr){
		menuList.data = json;
		menuList.refresh();
		if(dateStr) document.querySelectorAll("joview.title")[0].innerHTML = dateToString(dateStr);
	}

	function init() {
		for(var cardName in cards) {
			joCache.set(cardName, cards[cardName]);
		}
		
		scn = new joScreen(
			new joContainer([
				new joFlexcol([
					nav = new joNavbar(),
					stack = new joStackScroller(),
				]),
				this.toolbar = new joToolbar([
					new joFlexrow([
						edit = new joButton("Edit"),
						mensaSelect = new joSelect([ "Alle" ]),
						dishSelect  = new joSelect([ "Alle" ])
					])
				])
			])
		);

		var yesterdayButton = new joBackButton("Gestern").setStyle("active").selectEvent.subscribe(prevDay);
		var tomorrowButton = new joBackButton("Morgen"  ).setStyle("active").selectEvent.subscribe(nextDay);
		nav.row.push(yesterdayButton);
		nav.row.push(tomorrowButton);

		var urls = conf.getSavedURLs();
		urls.unshift("Alle");
		mensaSelect.list.data = urls;
		mensaSelect.list.refresh();

		storage.getTypes(function(json){
			json.unshift("Alle");
			dishSelect.list.data = json;
			dishSelect.list.refresh();
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

			var urls = conf.getSavedURLs();
			urls.unshift("Alle");
			mensaSelect.list.data = urls;
			mensaSelect.list.refresh();

			storage.getTypes(function(json){
				json.unshift("Alle");
				dishSelect.list.data = json;
				dishSelect.list.refresh();
			});
		});

		mensaSelect.selectEvent.subscribe(function(value, list) {
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

		edit.selectEvent.subscribe(function() {
			navigate("config");
		});

		nav.setStack(stack);
		navigate("lists");

		storage.thisDay(setData);
	}

	// public stuff
	return {
		"init": init,
		"getStack": function() { return stack; }
	}
}());
