enyo.kind({
	name: "mensaList",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Scroller", flex: 1, components: [
			{kind: "Repeater", onSetupRow: "listSetupRow"}
		]}
	],
	data : [
		"WIWI",
		"GEO"
	],
	create: function() {
		this.inherited(arguments);
		var that = this;
		storage.getMensen(function(json){
			that.data = json;
			that.$.repeater.render();
		});
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			return {kind: "Item", layoutKind: "HFlexLayout", components: [
				{content: row, flex: 1, onclick: "itemClick"}
			]};
		}
	},
	itemClick : function(element){
		var menuList = this.owner.$.menuList;
		storage.setMensaFilter(element.content)
		storage.filter(function(json){
			menuList.data = json;
			menuList.render();
		});
	}
});
