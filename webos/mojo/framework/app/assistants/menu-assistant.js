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
				label: "Filtern",
				items : [{
					label : "Alle",
					command : "all"
				}]
			},
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, {}, mediaMenuModel);
    
	// get list data async	
	this.controller.setupWidget("menu",{
		itemTemplate: "menu/static-list-menu-entry",
		emptyTemplate:"menu/emptylist",
		dividerTemplate: "menu/dividerTemplate",  
		dividerFunction : function(listitem){
			return listitem.mensaName;
		},
/*		itemsCallback: function(listWidget, offset, items) {
//			console.log("itemsCallback");
			storage.getMenu(function(json){
//				console.log("noticeUpdatedItems: " + json.length);
				listWidget.mojo.noticeUpdatedItems(offset, json);
			});
		}
*/	}, 
	{"items": []} // Modell
	);
	
	storage.getMenu(function(json){
		this.controller = Mojo.Controller.stageController.activeScene();
		this.controller.setWidgetModel("menu", {"items": json});
	});
		
	storage.getTypes(function(types){
		for(var i=0; i<types.length; i++){
			mediaMenuModel.items[0].items.push({label: types[i].name, command: types[i].name });
		}
	});
	
	// handle menu commands
	StageAssistant.prototype.handleCommand = function(event) {
		if(event.type == Mojo.Event.command) {
			storage.getByType(event.command, function(json){
				this.controller = Mojo.Controller.stageController.activeScene();
				this.controller.setWidgetModel("menu", {"items": json});
			});
		}
	};
};