function InfoAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

InfoAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

InfoAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

InfoAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

InfoAssistant.prototype.setup = function() {
	document.getElementById("header").innerHTML = info.appName;
	document.getElementById("text").innerHTML = info.appDesc;

	// render app menu
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, {
		items: [
			{ label: "Menu",           command : "menu"  },
			{ label: "Konfigurieren",  command : "config"},
			{ label: "Filtern",        command : "filter"},
			{ label: "Über diese App", command : "info" , disabled: true },
			{ label: "Zurücksetzen",   command : "reset" }
		]
	});

	this.controller.setupWidget("email", {}, { label : "An die Entwickler schreiben"});
	this.controller.setupWidget("more-info", {}, { label : "Zur Projektseite"});
	this.controller.setupWidget("close", {}, { label : "Schließen"});

	Mojo.Event.listen(this.controller.get("close"), Mojo.Event.tap, function(){
		Mojo.Controller.stageController.popScene("menu");
	}); 
	Mojo.Event.listen(this.controller.get("email"),     Mojo.Event.tap, function(){
		this.controller.serviceRequest("palm://com.palm.applicationManager", {
			method: "launch",
			parameters: {
				id: "com.palm.app.email",
				params: {
					summary: "Mensa Hamburg App",
					text: "Moin!",
					recipients:[{
						"type": "email",
						"contactDisplay": "Team Mensa App",
						"role": 1,
						"value": info.appEmail
					}]
				}
			}
		});
	}.bind(this)); 
	Mojo.Event.listen(this.controller.get("more-info"), Mojo.Event.tap, function(){
		location.href = info.appURL;
	}); 
};
