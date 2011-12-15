enyo.kind({
	name: "dateList",
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
		storage.getAvailableDates(function(json){
			that.data = json;
			that.data.unshift("Alle")
			that.$.repeater.render();
		});
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			var content = (row === "Alle") ? "Alle" : dateToString(row);
			return {kind: "Item", className: (row === "Alle") ? "enyo-held" : "dummy", layoutKind: "HFlexLayout", onclick: "itemClick", components: [
				{content: content, value: row, flex: 1}
			]};
		}
	},
	itemClick : function(element, b, c, d){
		var menuList = this.owner.$.menuList;

		for(var i=0; i<element.parent.children.length; i++){
			element.parent.children[i].removeClass("enyo-held");
		}
		element.addClass("enyo-held");

		if(element.children[0].value === "Alle"){
			storage.unsetDateFilter()
		} else {
			storage.setDateFilter(element.children[0].value)
		}
		storage.filter(function(json){
			menuList.data = json;
			menuList.render();
		});
	}
});
