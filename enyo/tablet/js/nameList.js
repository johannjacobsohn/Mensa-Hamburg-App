﻿enyo.kind({
	name: "nameList",
	kind: enyo.VFlexBox,
	components: [
		{kind: "SpinnerLarge", showing: true},
		{kind: "Scroller", flex: 1, components: [
			{kind: "Repeater", onSetupRow: "listSetupRow"}
		]}
	],
	data : [],
	create: function() {
		this.inherited(arguments);
		var that = this;
		storage.getTypes(function(json){
			that.$.spinnerLarge.hide();
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
	filterList : [],
	itemClick : function(element){

		var menuList = this.owner.$.menuList;
		var l = element.parent.children.length;
		var isAll = element.children[0].content === "Alle";
		var parent = element.parent;
		var child;

		this.filterList = [];
		
		if(element.hasClass("enyo-held")){
			element.removeClass("enyo-held");
		} else {
			element.parent.children[0].removeClass("enyo-held")
			element.addClass("enyo-held");
		}

		for(var i=1; i < l; i++){
			child = parent.children[i];
			if(child.hasClass("enyo-held")){
				if( isAll ){
					child.removeClass("enyo-held");
				} else {
					this.filterList.push( child.children[0].content );
				}
			}
		}

		if(this.filterList.length === 0){
			element.parent.children[0].addClass("enyo-held");
			isAll = true;
		}

		if(isAll){
			storage.unsetNameFilter()
		} else {
			storage.setNameFilter(this.filterList);
		}

		storage.getSortedSegmented(function(json){
			menuList.data = json;
			menuList.render();
		});
	}
});
