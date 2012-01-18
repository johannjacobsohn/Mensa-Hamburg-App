function MenuAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MenuAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	// cleanup Data
	storage.cleanData();

	// Rerender Menu
	storage.filter(function(json){
		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.setWidgetModel("menu", {"items": json});
	});

	// Rerender Filter
	storage.getTypes(function(types){
		console.log("get Types" + types.length);
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
		command : "type-all"
	}];
	var mensen = conf.getSavedURLs();
	for(var i=0; i<mensen.length; i++){
		mediaMenuModel.items[1].items.push({label: mensen[i], command: "mensa-" + mensen[i] });
	}
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
	// Swipe gestures
	Mojo.Event.listen(this.controller.topContainer(), Mojo.Event.flick, function(event) {
		if(event.velocity.x > 1000){
			yesterday();
		} else if (event.velocity.x < -1000){
			tomorrow();
		}
	});
	
	mediaMenuModel = {
		items: [
			{
				label: "Filtern nach Gericht",
				items : [{
					label : "Alle",
					command : "type-all"
				}]
			},
			{
				label: "Filtern nach Mensa",
				items : [{
					label : "Alle",
					command : "mensa-all"
				}]
			},
			{
				label: "Mensen konfigurieren",
				command : "conf"
			},
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, {}, mediaMenuModel);

	headerMenu = {
		visible: true,
		items: [{
			items: [
				{ label: $L('Yesterday') ,icon: "back"   , command: 'yesterday'},
				{ label: "Mensa Heute"   , width: 210 },
				{ label: $L('Refresh')   , icon:'forward', command:'tomorrow'  }
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
		dividerFunction : function(listitem){
			return listitem.mensaName;
		},
	}, 
	{"items": []} // Modell
	);

	date = new Date();
	dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());

	storage.setDateFilter(dateString);
	storage.filter(function(json){
		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.setWidgetModel("menu", {"items": json});
	});

	storage.getTypes(function(types){
		for(var i=0; i<types.length; i++){
			mediaMenuModel.items[0].items.push({label: types[i], command: "type-" + types[i] });
		}
	});
	(function(){
		var mensen = conf.getSavedURLs();
		for(var i=0; i<mensen.length; i++){
			mediaMenuModel.items[1].items.push({label: mensen[i], command: "mensa-" + mensen[i] });
		}
	})();

	function fetch(json){
		if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"

		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.setWidgetModel("menu", {"items": json});

		var dayString = dateToString(dateString);
		headerMenu.items[0].items[1].label = "Mensa " + dayString;

		this.controller.modelChanged(headerMenu, this);
	}

	function tomorrow(){
		date = new Date(date.valueOf() + 60 * 60 * 24 * 1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		storage.setDateFilter(dateString);
		storage.filter(fetch);
	}
	
	function yesterday(){
		date = new Date(date.valueOf() - 60 * 60 * 24 * 1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		storage.setDateFilter(dateString);
		storage.filter(fetch);
	}

	// handle menu commands
	StageAssistant.prototype.handleCommand = function(event) {
		if(event.type == Mojo.Event.command) {
			if(event.command === "tomorrow"){
				tomorrow();
				return;
			} else if(event.command === "yesterday"){
				yesterday();
				return;
			} else if(event.command === "conf"){
				this.controller.pushScene("config");
				return;
			} else {
				var temp = event.command.split("-");
				this.controller = Mojo.Controller.stageController.activeScene();
				switch (temp[0]) {
					case "type": {
						if(temp[1] === "all") storage.unsetNameFilter();
						else storage.setNameFilter(temp[1]);
						storage.filter(function(json){
							this.controller.setWidgetModel("menu", {"items": json});
						});
						break;
					} case "mensa" : {
						if(temp[1] === "all") storage.unsetMensaFilter();
						else storage.setMensaFilter(temp[1]);
						storage.filter(function(json){
							this.controller.setWidgetModel("menu", {"items": json});
						});
						break;
					}
				}
			}
		}
	};
};
