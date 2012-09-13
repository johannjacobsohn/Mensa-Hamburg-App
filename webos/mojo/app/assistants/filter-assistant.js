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
	this.modelP = {};

	// render app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, {
		items: [
			{ label: "Menu",           command : "menu" },
			{ label: "Konfigurieren",  command : "config"},
			{ label: "Filtern",        command : "filter", disabled: true  },
			{ label: "Über diese App", command : "about"  },
			{ label: "Zurücksetzen",   command : "reset"  }
		]
	});

	this.filterList("name", "double");
	this.filterList("mensa", "double");
	this.filterList("properties", "trippel");
	this.filterList("additives", "trippel");
	
	this.controller.setupWidget('wo', { 
		trueValue: "-1",
		falseValue: "0",
		modelProperty : "wo"
	});
	this.controller.setupWidget('with', { 
		trueValue: "1",
		falseValue: "0",
		modelProperty : "with"
	});

	this.controller.setupWidget('filterToggleButton', { 
		trueValue: "-1",
		falseValue: "1"
	});
//	this.controller.setupWidget('filterToggleButton', { trueLabel: "Mit", falseLabel: "Egal" });
//	this.controller.setupWidget('filterRadioButton', { choices: [
//		{label: "Ohne", value: -1},
//		{label: "Egal", value: 0},
//		{label: "Mit", value: 1}
//	]});
	
};

FilterAssistant.prototype.filterList = function(name, type){
	var that = this;
	that.model[name] = [];
	that.modelP[name] = [];
	that.controller.setupWidget("filter-" + name,
		{ itemTemplate : "filter/filter-item-" + type }, 
		that.modelP[name] = { items : that.model[name] } // Modell
	);

	Mojo.Event.listen(document.getElementById("filter-" + name), Mojo.Event.propertyChange, this.listPropertyChangeHandler.bind(this));
	// In order to hear the checkbox event changes, this must be listened to
//	Mojo.Event.listen(document.getElementById("filter-" + name), Mojo.Event.listChange, this.listPropertyChangeHandler.bind(this));

//	console.log("get " + name)
	storage.getInfo(name, function(items){
//		console.log("got " + name)

		if(name === "mensa"){
			items = items.filter(function(item){ return item.active; })
		}

		items.map(function(item, i){
			console.log( JSON.stringify( arguments ) );
			item.value = item.filtered;
			item.with = 0;
			item.wo = 0;
			item.filterType = name;
			item.i = i;
		});
		
		that.model[name] = items;
		that.modelP[name].items = items;

		that.controller.setWidgetModel("filter-" + name, that.modelP[name] );
	});
}

FilterAssistant.prototype.listPropertyChangeHandler = function(event){
	var value   = event.model.value;
	var name    = event.model.name;
	var type    = event.model.filterType;
	var filters = [];

//	if(value === true){
//		console.log("true")
//		this.modelP[type].items[event.model.i].with = true;
//	}


// event.model.name = "Johann";
//console.log( event.model.i )
//console.log( "value " + this.modelP[type].items[event.model.i].wo )
//console.log( this.modelP[type].length )
//console.log( this.modelP[type].items[event.model.i] )

//	this.modelP[type].items[event.model.i].with = 1;
//	this.modelP[type].items[event.model.i].wo = -1;
	//this.modelP[type].items[event.model.i].name = "Johann";

	// toggle between checkboxes - there can be only one active
	if( event.property === "with" && event.value == 1 ){
		this.modelP[type].items[event.model.i].wo = 0;
		filters.push( { value: event.model.name, type: "required" } )
	} else if( event.property === "wo" && event.value == -1 ){
		this.modelP[type].items[event.model.i].with = 0
	} else {
		 // none is active
		 
	}
	
	// reload model
	this.controller.modelChanged( this.modelP[type] );
	
	
//	this.controller.revealElement( event.item );
//	this.mojo.invalidateItems(0);

//	this.mojo.revealItem( event.item )
//	for( k in event ){
//		console.log(k)
//		console.log(event[k])
//		console.log("---")
//	}
//	console.log(JSON.stringify(event.model));
//	storage.setFilter("additives", )
	
//	type = event.model.value === 1 ? "include" : "exclude";
//	console.log( name + ": " + value );
//	console.log( type );
//	console.log( JSON.stringify( this.model[type] ) );
//	for( item in event.model ){
//		console.log( item );
//		console.log( event.model[item] );
//		console.log("---")
//		if( item.val )
//		filters.push({value: item.value, type: "exclude"})
//	}


//	this.model[type].map(function(item){
//		console.log( item.value );
//		if( item.val )
//		filters.push({value: item.value, type: "exclude"})
//	});

//	console.log( JSON.stringify( filters ) )

	storage.setFilter(type, filters);
}

