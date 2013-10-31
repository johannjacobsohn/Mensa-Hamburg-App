function MenuAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MenuAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	// Rerender Menu
	this.load( "thisDay" );

	/* periodically set header as to pick up date changes */
	this.headerReloadTimeout = 1000 * 60 * 10; // every ten minutes ought to be enough
	this.headerReloadTimer = setTimeout( this.reloadHeader.bind(this), this.headerReloadTimeout );
};

MenuAssistant.prototype.reloadHeader = function(event) {
	this.setHeader();
	this.headerReloadTimer = setTimeout( this.reloadHeader.bind(this), this.headerReloadTimeout ); // rinse, repeat
};

MenuAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	clearTimeout( this.headerReloadTimer );
};

MenuAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

MenuAssistant.prototype.handleFlick = function(event) {
	var minXVel = 200;
	var x = event.velocity.x;
	var y = event.velocity.y;
	if(Math.abs(x) > Math.abs(y)){
		if( x > minXVel && storage.isPrevDayAvailable() ){
			this.load("prevDay");
		} else if ( x < -minXVel && storage.isNextDayAvailable() ) {
			this.load("nextDay");
		}
	}
};

MenuAssistant.prototype.setup = function() {
	// render app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, {
		items: [
			{ label: "Menu",           command : "menu", disabled: true   },
			{ label: "Konfigurieren",  command : "config" },
			{ label: "Filtern",        command : "filter" },
			{ label: "Über diese App", command : "info"  },
			{ label: "Zurücksetzen",   command : "reset"  }
		]
	});

	if(!conf.isConfigured()){
		this.controller.showAlertDialog({
			onChoose: function(value) {
				if(value === "conf"){
					Mojo.Controller.stageController.pushScene("config");
				}
			},
			title   : info.notConfTitle,
			message : info.notConfText,
			choices : [
				{ label: $L("Jetzt konfigurieren"), value: "conf" }
			]
		});
	}

	// Swipe gestures
	Mojo.Event.listen(this.controller.topContainer(), Mojo.Event.flick, this.handleFlick.bind(this));

	// activity indicator
	this.controller.setupWidget("spinner", {spinnerSize: "large"}, { spinning: false });

	this.controller.setupWidget(Mojo.Menu.viewMenu,
		{spacerHeight: 0, menuClass: "no-fade"},
		this.headerMenu = {
			visible: true,
			items: [
				{}, // <-- helps to center the menu
				{
					items: [
						{ label: $L("Yesterday"), icon  : "back"   , command: "prevDay" }, // left
						{ label: "Heute"        , width : 200      , command: "today"   }, // center
						{ label: $L("Refresh")  , icon  :"forward" , command: "nextDay" }  // right
					]
				},
				{} // <-- helps to center the menu
			]
		}
	);

	// get list data async
	// Data is fetched in activate...
	this.controller.setupWidget("menu",{
		itemTemplate: "menu/static-list-menu-entry",
		emptyTemplate:"menu/emptylist",
		dividerTemplate: "menu/dividerTemplate",
		fixedHeightItems: true,
		hasNoWidgets: true,
		dividerFunction: function(listitem){
			return listitem.mensa;
		}
	},
	this.items = {"items": []} // Modell
	);

	this.menu = this.controller.get("menu");

	this.controller.listen("menu", Mojo.Event.listTap, this.handleTap.bind(this));

	// implement a filterField widget for real time filtering
	this.controller.setupWidget("filterField", { delay: 200 });
	this.filterField = this.controller.get("filterField");
	Mojo.Event.listen(this.filterField, Mojo.Event.filter, this.handleFilter.bind(this));
	Mojo.Event.listen(this.filterField, Mojo.Event.filterImmediate, this.handleFilterDisplay.bind(this));
};

// handle in-place filtering of list
MenuAssistant.prototype.filterString = "";
MenuAssistant.prototype.applyFilter = function(){
	this.items.items = this.json.filter(function(item){
		return this.filterString === "" || ((item.dish + item.name + item.mensa).toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1);
	}.bind(this));
};
MenuAssistant.prototype.handleFilter = function(event){
	this.filterString = event.filterString;
	this.applyFilter();
	this.filterField.mojo.setCount(this.items.items.length);
	this.menu.mojo.revealItem(0, false);
	setTimeout(function(){
		this.menu.mojo.setLengthAndInvalidate(this.items.items.length);
	}.bind(this), 10);
};
MenuAssistant.prototype.handleFilterDisplay = function(event){
	var main = document.getElementById("main");
	if(event.filterString.length){
		main.className = main.className.replace("palm-hasheader", "");
	} else {
		main.className += " palm-hasheader";
	}

	this.headerMenu.visible = event.filterString === "";
	this.controller.modelChanged( this.headerMenu, this);
};

MenuAssistant.prototype.handleTap = function(event){
	//changes the open property in the drawer
	event.item.open = !event.item.open;
	event.item.drawerDisplay = event.item.open ? "block" : "none";
	if( !event.item.propertiesString && !event.item.additivesString){
		event.item.propertiesString = "";
		event.item.additivesString = "";
		var i;
		for(i = 0; i<event.item.properties.length; i++) {
			event.item.propertiesString += "<li>" + event.item.properties[i] + "</li>";
		}

		for(i = 0; i<event.item.additives.length; i++) {
			event.item.additivesString += "<li>" + event.item.additives[i] + "</li>";
		}

		event.item.propertiesString = event.item.propertiesString ? event.item.propertiesString : "<li><i>keine</i></li>";
		event.item.additivesString = event.item.additivesString ? event.item.additivesString : "<li><i>keine</i></li>";
	}
	// invalidate list elements (= rerender list items);
	// to avoid duplicate dividers invalidate surrounding items as well
	this.menu.mojo.invalidateItems(event.index-2, 5);
};

MenuAssistant.prototype.handleCommand = function(event) {
	if( event.command === "prevDay" || event.command === "nextDay" || event.command === "today" ){
		this.load( event.command );
	}
};

MenuAssistant.prototype.load = function(type){
	storage[type](this.fetch.bind(this), false);
	this.timedOut = false;
	this.showLoaderTimer = setTimeout(this.showLoader.bind(this), 100);
};

MenuAssistant.prototype.timedOut = true;
MenuAssistant.prototype.showLoaderTimer = false;

MenuAssistant.prototype.showLoader = function(type){
	this.controller.get("spinner").mojo.start();
	this.menu.style.display = "none";
	this.timedOut = true;
};

MenuAssistant.prototype.fetch = function(json, dateString, date){
	// stop wait indicator
	clearTimeout(this.showLoaderTimer);
	if(this.timedOut){
		this.controller.get("spinner").mojo.stop();
		this.menu.style.display = "block";
	}

	this.json = [];

	// Set price
	// @TODO: move to storage
	var studentPrices = conf.displayStudentPrices();
	for(var i=0; i<json.length; i++){
		json[i].price = studentPrices ? json[i].studPrice : json[i].normalPrice;
		json[i].price = json[i].price ? Mojo.Format.formatCurrency(json[i].price, {fractionDigits: 2, countryCode : "de"}) : "";
		json[i].drawerDisplay = "none";
		this.json[i] = json[i];
	}

	// update menu
	this.items.items = json;
	this.applyFilter();
	this.menu.mojo.revealItem(0, false);

	this.menu.mojo.setLengthAndInvalidate( Math.min(6, this.items.items.length) );
	setTimeout(function(){
//		this.controller.modelChanged( this.items, this);
		this.menu.mojo.setLength(this.items.items.length);
	}.bind(this), 1);

	// update header
	this.date = date;
	this.setHeader();
};

MenuAssistant.prototype.setHeader = function(){
	this.headerMenu.items[1].items[0].disabled = !storage.isPrevDayAvailable(); // left
	this.headerMenu.items[1].items[1].label = formatDate(this.date);            // center
	this.headerMenu.items[1].items[2].disabled = !storage.isNextDayAvailable(); // right

	this.controller.modelChanged( this.headerMenu, this);
};
