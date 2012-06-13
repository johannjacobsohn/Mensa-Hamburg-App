enyo.kind({
	name: "menuList",
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
		this.load();
	},
	displayStudentPrices : conf.displayStudentPrices(),
	load : function(){
		var that = this;
		this.$.spinnerLarge.hide();
		storage.getSortedSegmented(function(json){
			that.$.spinnerLarge.hide();
			that.data = json;
			that.$.repeater.render();
		});
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			if(row.type === "header"){
				return {kind: "Divider", caption: row.headerType === "date" ? dateToString(row.header) : row.header}
			} else if( row.dish ) {
				return {kind: "Item", className: "enyo-item" + (row.first ? " enyo-first" : "") + (row.last ? " enyo-last" : ""), components: [
					{content: row.dish },
					{layoutKind: "HFlexLayout", style: "font-size: 0.8em", 
						components: [
							{content: row.name, flex: 1},
							{content: (this.displayStudentPrices ? row.studPrice : row.normalPrice) + "€"},
						]
					}
				]};
			}
		}
	}
});
