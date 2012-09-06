function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}
StageAssistant.prototype.setup = function() {
	this.controller.pushScene("menu");
};
// handle menu commands
StageAssistant.prototype.handleCommand = function(event) {
	var activeScene = Mojo.Controller.stageController.activeScene();

	if(event.type == Mojo.Event.command) {
//		console.log(MenuAssistant)
//		for( item in MenuAssistant ){
//			console.log(item)
//		}
		
//		for( item in StageAssistant ){
//			console.log(item)
//		}
		
		if( event.command === "prevDay" || event.command === "nextDay" || event.command === "today" ){
			MenuAssistant.load( event.command );
		} else if(event.command === "config" || event.command === "filter"){
			this.controller.pushScene( event.command );
		} else if(event.command === "reset"){
			data.clear();
			location.reload();
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
		}
	}
};
