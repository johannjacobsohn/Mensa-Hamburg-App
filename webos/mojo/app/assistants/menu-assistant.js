function MenuAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MenuAssistant.prototype.activate = function(event) {
	d = 0
	storage.unsetFilters();
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	// Rerender Menu
	this.controller = Mojo.Controller.stageController.activeScene();
	
	this.controller.get('spinner').mojo.start();
	storage.today( MenuAssistant.fetch, false);

	// Rerender Filter
/*	storage.getTypes(function(types){
		mediaMenuModel.items[0].items = [{
			label : "Alle",
			command : "type-all"
		}];
		for(var i=0; i<types.length; i++){
			mediaMenuModel.items[0].items.push({label: types[i], command: "type-" + types[i] });
		}
	});
	mediaMenuModel.items[1].items = [{
		label : "Alle",
		command : "mensa-all"
	}];
	var mensen = conf.getSavedURLs();
	for(var i=0; i<mensen.length; i++){
		mediaMenuModel.items[1].items.push({label: mensen[i], command: "mensa-" + mensen[i] });
	}
*/
};

MenuAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MenuAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

MenuAssistant.prototype.setup = function() {
	// render app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, {
		items: [
			{ label: "Konfigurieren",  command : "config" },
			{ label: "Filtern",        command : "filter" },
			{ label: "Zurücksetzen",   command : "reset"  },
			{ label: "Über diese App", command : "about"  }
		]
	});

	//
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
	Mojo.Event.listen(this.controller.topContainer(), Mojo.Event.flick, function(event) {
		if(event.velocity.y > 200) return; // detect only vertical swipes

		if(event.velocity.x > 600){
			yesterday();
		} else if (event.velocity.x < -600){
			tomorrow();
		}
	});

	this.controller.setupWidget("spinner",
		this.attributes = {
			spinnerSize: "large"
		},
		this.model = {
			spinning: true
		}
	); 

	headerMenu = {
		visible: true,
		items: [{
			items: [
				{ label: $L('Yesterday'), icon  : "back"   , command: 'prevDay' },
				{ label: "Heute"        , width : 210      , command: 'today'     },
				{ label: $L('Refresh')  , icon  :'forward' , command: 'nextDay'  }
			]
		}]
	};

	this.controller.setupWidget(Mojo.Menu.viewMenu,
		{ spacerHeight: 0, menuClass:'no-fade' },
		headerMenu
	);

	// get list data async
	this.controller.setupWidget("menu",{
		itemTemplate: "menu/static-list-menu-entry",
		emptyTemplate:"menu/emptylist",
		dividerTemplate: "menu/dividerTemplate",
		renderLimit : 10,
		dividerFunction: function(listitem){
			return listitem.mensa;
		},
//		onItemRendered: function(listWidget, itemModel, itemNode){
//			console.log("rendered")
/*
			itemModel.setupWidget("drawerId",
				this.attributes = {
					modelProperty: 'open',
					unstyled: false
				},
				this.model = {
					open: true
				}
			); 
*/
//		},
	}, 
	{"items": []} // Modell
	);

	this.controller.instantiateChildWidgets(menu);
	this.controller.listen('menu', Mojo.Event.listTap, this.handleTap);

//	this.controller.setupWidget("drawer", {unstyled: true});

/*	(function(){
		var mensen = conf.getSavedURLs();
		for(var i=0; i<mensen.length; i++){
			mediaMenuModel.items[1].items.push({label: mensen[i], command: "mensa-" + mensen[i] });
		}
	})();
*/
};
MenuAssistant.prototype.handleTap = function(event){
	var activeScene = Mojo.Controller.stageController.activeScene();

	//changes the open property in the drawer
	event.item.open = !event.item.open;
	event.item.propertiesString = "";
	event.item.additivesString = "";
	var i; 
	for(i = 0; i<event.item.properties.length; i++) {
		event.item.propertiesString += "<li>" + event.item.properties[i] + "</li>";
	}

	for(i = 0; i<event.item.additives.length; i++) {
		event.item.additivesString += "<li>" + event.item.additives[i] + "</li>";
	}
//	event.item.price = "1000";
//	event.item.name = "Johann";
//	console.log( event.model.items[event.index] )
//	for( item in this.mojo ){
//		console.log(item)
//	}

	// instantiateChildWidgets,

//	activeScene.modelChanged( event.item );
//	activeScene.revealElement( event.item );
//	$('menu').mojo.noticeUpdatedItems(0);
	this.mojo.invalidateItems(0);
//	this.mojo.revealItem( event.item )
//	instantiateChildWidgets
//	Event.stop(event);
}

MenuAssistant.load = function(type){
	d = +new Date();
	var activeScene = Mojo.Controller.stageController.activeScene();
	activeScene.get('spinner').mojo.start();
	activeScene.setWidgetModel("menu", {"items": []});
	console.log( (+new Date()-d) + "base") 
	d = +new Date();
	storage[type]( this.fetch, false);
};

MenuAssistant.tomorrow = function(){
	this.load("prevDay");
}

MenuAssistant.yesterday = function(){
	this.load("nextDay");
}

MenuAssistant.today = function(){
	this.load("today");
}

MenuAssistant.fetch = function(json, dateString, date){
	json = json || [];
	
	console.log((+new Date() - d) + "loaded");
	d = +new Date();
	var activeScene = Mojo.Controller.stageController.activeScene();
	activeScene.get('spinner').mojo.stop();

	// Preise unterscheiden
	var studentPrices = conf.displayStudentPrices();
	
	for(var i=0; i<json.length; i++){
		json[i].price = studentPrices ? json[i].studPrice : json[i].normalPrice;
		json[i].open  = false;
	}

	console.log(+new Date() - d);
	d = +new Date();

	activeScene.setWidgetModel("menu", {"items": json});
	console.log(+new Date() - d);

	if(date){
		headerMenu.items[0].items[1].label = formatDate(date)
		activeScene.modelChanged(headerMenu, this);
	}
}
