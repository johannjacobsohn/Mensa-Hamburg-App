function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}
StageAssistant.prototype.setup = function() {
	window.PalmSystem.setWindowOrientation(data.get("freeOrientation") || "up");
	this.controller.pushScene("menu");

	if( conf.versionHasChanged ){
		setTimeout(function(){
			var activeScene = Mojo.Controller.stageController.activeScene();
			activeScene.showAlertDialog({
				onChoose: function(value) {
					if(value === "goto"){
						location.href = info.releaseNotes.mojo;
					}
				},
				title   : info.onUpdateTitel,
				message : info.onUpdateText,
				choices : [
					{ label: $L("Projektseite öffnen"), value: "goto" },
					{ label: $L("Schließen"), value: ""}
				]
			});
		}, 1000);
	}
};
// handle menu commands
StageAssistant.prototype.handleCommand = function(event) {
	if(event.type === Mojo.Event.command) {
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
