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
	this.controller = Mojo.Controller.stageController.activeScene();
	this.controller.get('spinner').mojo.start();
	storage.today(fetch, false);

	// Rerender Filter
	storage.getTypes(function(types){
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
			{
				label: "Zurücksetzen",
				command : "reset"
			},
			{
				label: "Über diese App",
				command : "about"
			}
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems:true}, mediaMenuModel);

	spinner = this.controller.setupWidget("spinner",
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
				{ label: $L('Yesterday'), icon  : "back"   , command: 'yesterday' },
				{ label: "Heute"        , width : 210      , command: 'today'     },
				{ label: $L('Refresh')  , icon  :'forward' , command: 'tomorrow'  }
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

	(function(){
		var mensen = conf.getSavedURLs();
		for(var i=0; i<mensen.length; i++){
			mediaMenuModel.items[1].items.push({label: mensen[i], command: "mensa-" + mensen[i] });
		}
	})();

	function tomorrow(){
		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.get('spinner').mojo.start();
		storage.nextDay(fetch, false);
	}
	
	function yesterday(){
		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.get('spinner').mojo.start();
		storage.prevDay(fetch, false);
	}

	function today(){
		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.get('spinner').mojo.start();
		storage.today(fetch, false);
	}

	// handle menu commands
	StageAssistant.prototype.handleCommand = function(event) {
		var activeScene = Mojo.Controller.stageController.activeScene();

		if(event.type == Mojo.Event.command) {
			if(event.command === "tomorrow"){
				tomorrow();
				return;
			} else if(event.command === "yesterday"){
				yesterday();
				return;
			} else if(event.command === "today"){
				today();
				return;
			} else if(event.command === "conf"){
				this.controller.pushScene("config");
				return;
			} else if(event.command === "reset"){
				data.clear();
				location.reload();
				return;
			} else if(event.command === "about"){
				activeScene.showAlertDialog({
					onChoose: function(value) {
						if(value === "more-info"){
							location.href = info.appURL
						} else if (value === "email"){
							this.controller.serviceRequest('palm://com.palm.applicationManager', {
								method: 'launch',
								parameters: {
									id: 'com.palm.app.email',
									params: {
										summary: 'Mensa Hamburg App',
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

						}
					},
					title   : info.appName,
					message : info.appDesc,
					choices : [
						{label:$L("OK"), value:""},
						{label:$L("Mehr Infos"), value: "more-info"},
						{label:$L("Eine Email schreiben"), value: "email"}
					]
				});

				return;
			} else {
				var temp = event.command.split("-");
				switch (temp[0]) {
					case "type": {
						if(temp[1] === "all"){
							storage.unsetNameFilter();
						} else {
							storage.setNameFilter(temp[1]);
						}
						break;
					} case "mensa" : {
						if(temp[1] === "all"){
							storage.unsetMensaFilter();
						} else {
							storage.setMensaFilter(temp[1]);
						}
						break;
					}
				}
				storage.filter(fetch);
			}
		}
	};
};


function fetch(json, dateString, date){
		json = json || [];

		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.get('spinner').mojo.stop();

		// Preise unterscheiden
		var studentPrices = conf.displayStudentPrices();
		
		for(var i=0; i<json.length; i++){
			json[i].price = studentPrices ? json[i].studPrice : json[i].normalPrice;
		}

		this.controller.setWidgetModel("menu", {"items": json});

		if(date){
			headerMenu.items[0].items[1].label = formatDate(date)
			this.controller.modelChanged(headerMenu, this);
		}
	}
