function FilterAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FilterAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

FilterAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

FilterAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

FilterAssistant.prototype.setup = function() {
	this.model = {};

	// render app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, {
		items: [
			{ label: "Menu",           command : "menu" },
			{ label: "Konfigurieren",  command : "config"},
			{ label: "Filtern",        command : "filter", disabled: true  },
			{ label: "Über diese App", command : "info"  },
			{ label: "Zurücksetzen",   command : "reset"  }
		]
	});

	this.filterList("mensa", "double");
	this.filterList("name", "double");
	this.filterList("properties", "trippel");
	this.filterList("additives", "trippel");

	this.controller.setupWidget("wo", {
		modelProperty : "wo",
		trueValue: "exclude",
		falseValue: "ignore"
	});
	this.controller.setupWidget("with", {
		modelProperty : "w",
		trueValue: "include",
		falseValue: "ignore"
	});
	this.controller.setupWidget("filterToggleButton", {
		modelProperty : "toggle",
		trueLabel: "Mit",
		falseLabel: "Ohne",
		trueValue: "include",
		falseValue: "exclude"
	});
};

FilterAssistant.prototype.filterList = function(name, type){
	this.controller.setupWidget("filter-" + name,
		{ itemTemplate : "filter/filter-item-" + type },
		this.model[name] = { items: [] } // Modell
	);

	// listen for Event
	Mojo.Event.listen( document.getElementById("filter-" + name),
	                   Mojo.Event.propertyChange,
	                   this.listPropertyChangeHandler.bind(this) );

	// load data
	storage.getInfo( name, this.updateFilterList.bind(this, name) );
};

FilterAssistant.prototype.updateFilterList = function( name, items ){
	// only show active mensen
	if(name === "mensa"){
		items = items.filter(function(item){ return item.active; });
	}

	items.forEach(function(item, i){
		item.w          =  item.filter && item.filter.type === "include" ? "include" : "ignore";
		item.wo         =  item.filter && item.filter.type === "exclude" ? "exclude" : "ignore";
		item.filterType = name;
		item.i          = i;
		if(name === "mensa" || name === "name" ){
			item.toggle = (item.filter && item.filter.type === "include") || !item.filter || !item.filter.type  ? "include" : "exclude"; //!item.wo;
		}
	});

	this.model[name].items = items;
	this.controller.modelChanged( this.model[name] );
};

FilterAssistant.prototype.listPropertyChangeHandler = function(event){
	var type    = event.model.filterType;
	var filters = [];

	// toggle between checkboxes - there can be only one active
	if( event.value ===  "include" ){
		this.model[type].items[event.model.i].wo = "ignore";
	} else if( event.value ===  "exclude" ){
		this.model[type].items[event.model.i].w = "ignore";
	}

	this.model[type].items.forEach(function(item){
		if( item.w === "include" || item.toggle === "include" ){
			filters.push( { value: item.name, type: "include" } );
		} else if( item.wo === "exclude" || item.toggle === "exclude"  ){
			filters.push( { value: item.name, type: "exclude" } );
		}
	});
	// reload model
	this.controller.modelChanged( this.model[type] );

	// set filter
	storage.setFilter(type, filters);
};
