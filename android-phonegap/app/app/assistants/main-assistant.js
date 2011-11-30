function MainAssistant(nodes) {
    this.nodes = nodes;
}

MainAssistant.prototype.setup = function() {
	this.controller.sceneElement.appendChild(this.nodes);
	this.nodes = null; // unset to release references

	// Setup Menu
	// Remove everything but standard edit and help items
	// (the latter is required for app catalog approval)
	Mojo.Menu.helpItem.checkEnabled = false;

	this.controller.setupWidget(
		Mojo.Menu.appMenu,
		{ omitDefaultItems: true }, // attributes
		{ // model
			items: [Mojo.Menu.editItem, Mojo.Menu.helpItem]
		}
	);
}
