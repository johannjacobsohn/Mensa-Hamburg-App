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
//							location.href = "http://johannjacobsohn.github.com/Mensa-Hamburg-App/blog/2012/neue-version-fur-hp-slash-palm-telefone/";
//							location.href = "http://johannjacobsohn.github.com/Mensa-Hamburg-App/blog/2012/bugfixes-fur-fur-hp-slash-palm-telefone-1-dot-5-2/";
							location.href = "http://johannjacobsohn.github.com/Mensa-Hamburg-App/blog/2012/neue-version-fur-hp-slash-palm-phones-1-dot-5-3/";
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
	var activeScene = Mojo.Controller.stageController.activeScene();

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
