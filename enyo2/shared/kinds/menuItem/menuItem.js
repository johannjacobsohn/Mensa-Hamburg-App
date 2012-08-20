/**
 *
 * Kind für menuItems
 *
 *
 */
enyo.kind({
	name: "menuItem",
	classes : "item",
	components: [
		{name : "name",   classes : "name" },
		{name : "dish" ,  classes : "dish" },
		{name : "price",  classes : "price"},
		{name : "mensa" , classes : "mensa" },
		{name : "moreInfo", kind: "FittableColumns", showing: false, components: [
			{kind: "Repeater", name: "additives", style: "width: 50%;",  onSetupItem: "setupItemAdditives", components: [ {name:"item"} ] },
			{kind: "Repeater", name: "properties", style: "width: 50%;", onSetupItem: "setupItemProperties", components: [ {name:"item"} ] }
		]},
	],
	tap: function(){
		var m = this.$.moreInfo;
		m.setShowing(!m.showing);
		this.$.additives.setCount(this.data.additives.length);
		this.$.properties.setCount(this.data.properties.length);
		return true;
	},
	setupItemAdditives: function(inSender, inEvent){
		var i = inEvent.index, c = this.data.additives[i], item = inEvent.item.$.item;
		item.setContent( c );
		return true;
	},
	setupItemProperties: function(inSender, inEvent){
		var i = inEvent.index, c = this.data.properties[i], item = inEvent.item.$.item;
		item.setContent( c );
		return true;
	},
	setMenuItem: function(item) {
		this.data = item;
		this.addRemoveClass("first", item.first);
		this.addRemoveClass("last", item.last);
		this.$.name.setContent ( item.name );
		this.$.price.setContent( (conf.displayStudentPrices() ? item.studPrice : item.normalPrice) + "€" );
		this.$.dish.setContent ( item.dish );
		this.$.mensa.setContent( item.mensa );
	}

});
