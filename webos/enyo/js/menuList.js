enyo.kind({
	name: "menuList",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Scroller", flex: 1, components: [
			{kind: "Repeater", onSetupRow: "listSetupRow"}
		]}
	],
	data : [
		{
/*			dish: "Grießflammeri  mit  Kirschkompott ",
			mensaName: "WIWI",
			name: "Aus dem Suppentopf und Süßes",
			normalPrice: "2,20",
			studPrice: "1,20€",
			date : ""
*/		}
	],
	create: function() {
		this.inherited(arguments);
		var that = this;
		storage.getSortedSegmented(function(json){
			that.data = json;
			that.$.repeater.render();
		});
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			if(row.type === "header"){
				return {kind: "Divider", caption: row.header}
			} else {
				return {kind: "Item", components: [
					{content: row.dish},
					{layoutKind: "HFlexLayout", style: "font-size: 0.8em", 
						components: [
							{content: row.name, flex: 1},
							{content: row.studPrice+"€"},
						]
					}
				]};
			}
		}
	}
});
