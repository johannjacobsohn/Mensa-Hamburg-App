function MenuAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

MenuAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
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
	storage.getMensen(function(mensen){
		for(var i=0; i<mensen.length; i++){
			mediaMenuModel.items[1].items.push({label: mensen[i], command: "mensa-" + mensen[i] });
		}
	});


	function fetch(json){
		 var dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend"];
		if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"

		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.setWidgetModel("menu", {"items": json});

		now = new Date();
		if(date.getDate() === now.getDate()){
			dayString = "Heute";
		} else if(date.getDate() === now.getDate()-1){
			dayString = "Gestern";
		} else if(date.getDate() === now.getDate()+1){
			dayString = "Morgen";
		} else {
			dayString = dayNames[date.getDay()];
		}
		headerMenu.items[0].items[1].label = "Mensa " + dayString;


		this.controller.modelChanged(headerMenu, this);
	}

	// handle menu commands
	StageAssistant.prototype.handleCommand = function(event) {
		if(event.type == Mojo.Event.command) {
			if(event.command === "tomorrow"){
				date = new Date(date.valueOf() + 60 * 60 * 24 * 1000);
				dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
				storage.setDateFilter(dateString);
				storage.filter(fetch);
				return;
			}
			if(event.command === "yesterday"){
				date = new Date(date.valueOf() - 60 * 60 * 24 * 1000);
				dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
				storage.setDateFilter(dateString);
				storage.filter(fetch);
				return;
			}
			
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
	};
/**/
};
