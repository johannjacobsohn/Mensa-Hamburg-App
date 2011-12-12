﻿enyo.kind({
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
		that = this;
		storage.getAvailableDates(function(json){
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
		that = this;
		storage.getMenuByDate(element.content, function(json){
//			console.log(that);
			menuList.data = json;
			menuList.render();
		});
	}
});
