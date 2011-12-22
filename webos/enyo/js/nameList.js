enyo.kind({
	name: "nameList",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Scroller", flex: 1, components: [
			{kind: "Repeater", onSetupRow: "listSetupRow"}
		]}
	],
	data : [],
	create: function() {
		this.inherited(arguments);
		var that = this;
		storage.getTypes(function(json){
			that.data = json;
			that.data.unshift("Alle");
			that.$.repeater.render();
		});
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			return {kind: "Item", layoutKind: "HFlexLayout", className: (row === "Alle") ? "enyo-held" : "dummy", onclick: "itemClick", components: [
				{content: row, flex: 1}
			]};
		}
	},
	itemClick : function(element){
		var menuList = this.owner.$.menuList;
		
		for(var i=0; i<element.parent.children.length; i++){
			element.parent.children[i].removeClass("enyo-held");
		}
		element.addClass("enyo-held");

		if(element.children[0].content === "Alle"){
			storage.unsetNameFilter()
		} else {
			storage.setNameFilter(element.children[0].content)
		}
		storage.getSortedSegmented(function(json){
			menuList.data = json;
			menuList.render();
		});
	}
});
