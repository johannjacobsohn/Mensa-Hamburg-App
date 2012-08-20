/**
 *
 *
 * @kind filterPanel
 */
enyo.kind({
	name : "menuPanel",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", name : "title"},
		
		{name: "spinner", components: [
			{kind: "onyx.Spinner", classes: "onyx-light"}
		], style: "text-align:center", showing: false},

		{kind: "Scroller",
			fit: true,
			components: [
				{kind: "Repeater", name: "list", classes: "enyo-unselectable preventDragTap", onSetupItem: "setupItem", components: [
					{name: "item", kind: "menuItem"}
				]}
			]
		},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber"}
		]},
	],
	data : [],
	type : "",
	create : function(){
		this.inherited(arguments); // @TODO: understand what this actually does
		this.load();
		this.$.title.setContent(this.title);
	},
	load : function(){
		var that = this;
		this.$.spinner.show();
		storage.getSortedSegmented(function(json){
			that.$.spinner.hide();
			that.data = json;
			that.$.list.setCount(json.length);
			that.reflow();
		});
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index, r = this.data[i], item = inEvent.item.$.item;
		item.setMenuItem(r);
	}
});




/**
 * kind für Einstellungen
 * 
 */
// {name: "item", kind: "GTS.ToggleBar", label: "Mensaname", sublabel:"Immanuelstieg 6, 20539 Hamburg", classes: "item enyo-border-box", ontap: "itemTap"}
