function ConfigAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

ConfigAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

ConfigAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */

	// cleanup Data
	storage.cleanData();
};

ConfigAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

ConfigAssistant.prototype.setup = function() {
	this.mensen = storage.getMensaInfo();

	// render app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, {
		items: [
			{ label: "Menu",           command : "menu" },
			{ label: "Einstellungen",  command : "config", disabled: true },
			{ label: "Filtern",        command : "filter" },
			{ label: "Über diese App", command : "about"  },
			{ label: "Zurücksetzen",   command : "reset"  }
		]
	});

	// get list data async
	this.controller.setupWidget("mensen",
		{ itemTemplate: "config/mensa-item" }, 
		{ items: this.mensen} // Modell
	);

	this.controller.setupWidget('mensaToggleButton', {
		trueLabel: "An",
		falseLabel: "Aus",
		modelProperty : "active"
	});

	Mojo.Event.listen(document.getElementById("mensen"), Mojo.Event.propertyChange, this.listPropertyChangeHandler.bind(this));

	this.controller.setupWidget("studPrices",
		this.attributes = {
			choices: [
				{label: "Studentenpreise", value: 1},
				{label: "Nicht-Studentenpreise", value: 0}
			]
		},
		this.model = {
			value: 0 + conf.displayStudentPrices()
		}
	);
	Mojo.Event.listen(this.controller.get("studPrices"), Mojo.Event.propertyChange, function(o){
		conf.setStudentPrices(o.value === "1");
	});
	
	this.controller.setupWidget("permanentFilters",
		this.attributes = {
			choices: [
				{label: "Filter merken", value: 1},
				{label: "Filter beim Starten zurücksetzen", value: 0}
			]
		},
		this.model = {
			value: 0 + storage.getPersistentFilters()
		}
	);
	Mojo.Event.listen(this.controller.get("permanentFilters"), Mojo.Event.propertyChange, function(o){
		conf.setPersistentFilters(o.value === "1");
	});
};

ConfigAssistant.prototype.listPropertyChangeHandler = function(event){
	var newValue = event.model.active;
	var name = event.model.name;
	var arr = [];

	// change values in this.mensen and change back
	this.mensen.filter(function(item){ return item.name === name })[0].active = newValue;

	this.mensen.forEach(function(item){
		if(item.active) {
			arr.push(item.name);
		}
	});

	// set config
	conf.setURLs(arr);
}

