// required
jo.load();

var App = (function() {
	var scn;
	var stack;
	var menuList;
	var date = new Date();
	var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());	var cards = {
		lists: function() {
			menuList = new joList([]);
			menuList.formatItem = function(item, index) {
				var element = document.createElement('jolistitem');
				element.innerHTML = item.dish;
				element.setAttribute("index", index);

				return element;
			};
			return new joCard([menuList]).setTitle("Mensen");
		},
		config: function(){
			var rec = {},
			   rows = [],
			   json = conf.getMensaInfo();
			for(i=0; i<json.length; i++){
				rec[json[i].name] = json[i].active;
			}
			record = new joRecord(rec).setAutoSave(false);

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
		console.log("nextDay")
		date = new Date(date.valueOf() + 60 * 60 * 24 * 1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		getData();
	}
	function prevDay() {
		console.log("prevDay")
		date = new Date(date.valueOf() - 60 * 60 * 24 * 1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		getData();
	}
	function getData(){
		console.log("getData")
		storage.setDateFilter(dateString);
		storage.filter(function(json){
			menuList.data = json;
			menuList.refresh();
			console.log(json)
		});
	}

	function init() {
		//var nav;
		
		for(var cardName in cards) {
			joCache.set(cardName, cards[cardName]);
		}
		
		scn = new joScreen(
			new joContainer([
				new joFlexcol([
					nav = new joNavbar(),
					stack = new joStackScroller()
				]),
				this.toolbar = new joToolbar([
					new joFlexrow([
						edit = new joButton("Edit"),
						mensaSelect = new joSelect([ "Apples", "Oranges", "Grapes" ]),
						dishSelect  = new joSelect([ "Apples", "Oranges", "Grapes" ], 2)
					])
				])
			])
		);
		

		var yesterdayButton = new joBackButton("Gestern").setStyle("active").selectEvent.subscribe(prevDay)
		var tomorrowButton = new joBackButton("Morgen"  ).setStyle("active").selectEvent.subscribe(nextDay)
		nav.row.push(yesterdayButton);
		nav.row.push(tomorrowButton);

		var urls = conf.getSavedURLs()
//		mensaSelect.data = urls;
//		mensaSelect.refresh()
		
		// respond to the change event
		mensaSelect.changeEvent = function(value, list) {
			console.log("Fruit: " + list.getNodeValue(value));
		};
		
		edit.selectEvent.subscribe(function() {
			navigate("config");
		});

		nav.setStack(stack);
		navigate("lists");
		getData();
	}

	// public stuff
	return {
		"init": init,
		"getStack": function() { return stack; },
		"prevDay": prevDay,
		"nextDay": nextDay,
	}
}());
