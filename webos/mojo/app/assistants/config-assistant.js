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
};

ConfigAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	var arr = [], mensa = "";
	for(mensa in mensaTogglemodels){
		if(mensaTogglemodels[mensa].value) arr.push(mensa);
	}

	conf.setURLs(arr);

	// cleanup Data
	storage.cleanData();
};

ConfigAssistant.prototype.setup = function() {
	mensaTogglemodels = {};
	var mensen = conf.getMensaInfo(),
		html = "";
	/* @TODO: WTF? */
	for(i=0; i<mensen.length; i++){
		html = '<div class="palm-row">' +
			'<div x-mojo-element="ToggleButton" id="mensa' + i + '" class="mensaToggle"  name="mensa' + i + '"></div>' +
				mensen[i].name +
		'</div>';
		document.getElementById("config-content").innerHTML += html;
		this.controller.setupWidget("mensa" + i,
		  this.attributes = {
			  trueValue: true,
			  falseValue: false
		  },
		  mensaTogglemodels[mensen[i].name] = {
			  value: mensen[i].active,
		  }
		);
	}

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
};
