function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}
StageAssistant.prototype.setup = function() {
	window.PalmSystem.setWindowOrientation(data.get("freeOrientation") || "up");
	this.controller.pushScene("menu");
};
// handle menu commands
StageAssistant.prototype.handleCommand = function(event) {
	var activeScene = Mojo.Controller.stageController.activeScene();

	if(event.type == Mojo.Event.command) {
		if(event.command === "config" || event.command === "filter" || event.command === "info"){
			this.controller.pushScene( event.command );
		} else if(event.command === "menu"){
			this.controller.popScenesTo( event.command ); 
		} else if(event.command === "reset"){
			data.clear();
			location.reload();
		}
	}
};
