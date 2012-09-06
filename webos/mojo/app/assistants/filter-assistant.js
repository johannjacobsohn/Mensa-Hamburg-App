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
	// get list data async
	var that = this;

	function abcd(name){
		storage.getInfo(name, function(items){
			console.log(name + ": " + items.length)

			if(name === "mensa"){
				items = items.filter(function(item){ return item.active; })
			}
			
			items.map(function(item){ item.value = item.filtered; })

			console.log(items[0].name)
			that[name] = items;
			that.controller.setupWidget("filter-" + name,
				{
					itemTemplate: "filter/filter-item"
				}, 
				{"items": that[name]} // Modell
			);

			Mojo.Event.listen(document.getElementById("filter-" + name), Mojo.Event.propertyChange, that.listPropertyChangeHandler.bind(this));
		});
	}

//	this.controller.setupWidget('filterToggleButton', { trueLabel: "Mit", falseLabel: "Egal" });
	this.controller.setupWidget('filterRadioButton', { choices: [
		{label: "Ohne", value: -1},
		{label: "Egal", value: 0},
		{label: "Mit", value: 1}
	]});



	abcd("name");
	abcd("mensa");
	abcd("properties");
	abcd("additives");
};


FilterAssistant.prototype.listPropertyChangeHandler = function(event){
	var newValue = event.model.value;
	var name = event.model.name;

	console.log(name + " " + newValue);
	console.log( JSON.stringify(event) )
}


