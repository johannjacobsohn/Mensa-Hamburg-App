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
		{name : "name",  classes : "name" },
		{name : "dish" , classes : "dish" },
		{name : "price", classes : "price"}
	],
	moreInfoComponents: [
		{name : "moreInfo", kind: "FittableColumns", components: [
			{classes: "additives", components: [
				{content: "Zusatzstoffe", classes: "details-header"},
				{kind: "Repeater", name: "additives", onSetupItem: "setupItemAdditives", components: [ {name:"item", classes: "details-item"} ] }
			]},
			{classes: "properties", components: [
				{content: "Eigenschaften", classes: "details-header"},
				{kind: "Repeater", name: "properties", onSetupItem: "setupItemProperties", components: [ {name:"item", classes: "details-item"} ] }
			]}
		]}
	],
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
		if(item.showDetails && !item.header){
			this.data = item;
			this.createComponents(this.moreInfoComponents,{owner: this});
			this.$.additives.setCount(this.data.additives.length);
			this.$.properties.setCount(this.data.properties.length);
			this.$.moreInfo.render();
			this.addClass("details");
		} else {
			if(this.$.moreInfo){
				this.$.moreInfo.destroy();
			}
			this.removeClass("details");
		}

		//@FIXME: testen wie oft sicht dish und price unterscheidet
		if(item.header){
			item.dish = item.headerType === "date" ? dateToString(item.header) : item.header;
		} else {
			this.$.price.setContent( (conf.displayStudentPrices() ? item.studPrice : item.normalPrice) + "€" );
			this.$.name.setContent(item.name);
		}
		this.$.dish.setContent(item.dish);

		this.addRemoveClass("divider", item.header);

		return true;
	}
});
