function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	var body = this.controller.body,
		fragment = this.controller.document.createDocumentFragment(),
		node;

	while (node = body.firstChild) {
		fragment.appendChild(node);
	}

	var scene = this.controller.pushScene("main", fragment);
}

StageAssistant.prototype.handleCommand = function(event) {
    if (event.type === Mojo.Event.command && event.command === Mojo.Menu.helpCmd) {
		// Show help for the app. Palm requires this for app catalog approval
	}
}
