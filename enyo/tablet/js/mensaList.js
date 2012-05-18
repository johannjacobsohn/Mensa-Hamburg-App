enyo.kind({
	name: "mensaList",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Scroller", flex: 1, components: [
			{kind: "Repeater", onSetupRow: "listSetupRow"}
		]}
	],
	data : [],
	create: function() {
		this.inherited(arguments);
		this.data = conf.getSavedURLs();

		this.data.unshift("Alle");
		this.$.repeater.render();
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			return {kind: "Item", className: (row === "Alle") ? "enyo-held" : "dummy", layoutKind: "HFlexLayout", onclick: "itemClick", components: [
				{content: row, flex: 1}
			]};
		}
	},
	filterList : [],
	itemClick : function(element){
		//t = (new Date()).valueOf();

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
			storage.unsetMensaFilter()
		} else {
			storage.setMensaFilter(this.filterList)
		}
		storage.getSortedSegmented(function(json){
			menuList.data = json;
			menuList.render();
		});
	}
});
