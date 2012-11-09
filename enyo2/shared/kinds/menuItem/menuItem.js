/**
 *
 * Kind for menuItems
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
			{classes: "additives", components: [
				{content: "Zusatzstoffe", classes: "details-header"},
				{kind: "Repeater", name: "additives", onSetupItem: "setupItemAdditives", components: [ {name:"item"} ] }
			]},
			{classes: "properties", components: [
				{content: "Eigenschaften", classes: "details-header"},
				{kind: "Repeater", name: "properties", onSetupItem: "setupItemProperties", components: [ {name:"item"} ] }
			]}
		]}
	],
	onTap: "itemTap",
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
		if(item.showDetails){
			this.$.additives.setCount(this.data.additives.length);
			this.$.properties.setCount(this.data.properties.length);
		}
		this.$.moreInfo.setShowing(item.showDetails === true);
		this.addRemoveClass("first", item.first);
		this.addRemoveClass("last", item.last);
		this.$.name.setContent ( item.name );
		this.$.price.setContent( (conf.displayStudentPrices() ? item.studPrice : item.normalPrice) + "€" );
		this.$.dish.setContent ( item.dish );
		this.$.mensa.setContent( item.mensa );
		return true;
	}
});
