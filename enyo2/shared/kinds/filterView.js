/**
 * Filteransicht
 *
 */
enyo.kind({
	name: "filterView",
	fit : true,
		kind: "FittableRows",
		components: [
			{kind: "onyx.Toolbar", components: [
				{ content: "Gerichte filtern" },
			]},
			{ kind: "onyx.PickerDecorator", onchange: "changePreserveFilters", components: [
				{},
				{kind: "onyx.Picker", components: [
					{content: "Permanent", active: true},
					{content: "Flüchtig" },
				]}
			]},
			{kind: "Scroller", fit: true, components: [
				{kind: "filterNROBERT", title: "Nach Gericht filtern", type: "name"},
				{kind: "filterNROBERT", title: "Nach Zusatzstoffen filtern", type: "additives"},
				{kind: "filterNROBERT", title: "Nach Eigenschaften filtern", type: "properties"},
				{kind: "filterNROBERT", title: "Nach Mensen filtern", type: "mensa"},
			]},
			{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "applyFilters"},
		],
	applyFilters : function(){
		this.setFilter("name").setFilter("mensa").display("thisDay").openPage("menu");
	},
	setFilter : function(type){
		var items = this.$[type + "Filter"].children;
		var l = items.length;
		var filters = [];
		var itm;
		var active;

		for( var i = 0; i<l; i++ ){
			itm = items[i].children[0].children[0];
			active = itm.children[0].getValue();

			this.cache[type][i].active = active;

			if( active ){
				filters.push( itm.children[1].content );
			}
		}

		if(filters.length === 0 || filters.length === l){
			storage.unsetFilter(type);
		} else {
			storage.setFilter(type, filters);
		}
		return this;
	},
	load : function(inCaller) {},
	changePreserveFilters : function(inSender){
		storage.setPersistentFilters( inSender.$.toggle.getValue() );
	},
	create : function(){
		this.inherited(arguments);
	}
});

enyo.kind({
	name: "YESNOitem",
	classes: "item enyo-border-box",
	kind: "FittableColumns",
	label: "",
	components: [
		{ content: "", name: "label", fit: true },
		{ kind: "onyx.PickerDecorator", name: "picker",  style: "width: 100px", components: [
			{ name: "pickerButton" },
			{kind: "onyx.Picker", components: [
				{content: "Egal", active: true},
				{content: "Ja"},
				{content: "Nein"}
			]}
		]}
	],
	ontap: "tap",
	tap: function(inSender, inEvent){
		this.$.pickerButton.tap()
	},
	load: function(){
		this.$.label.setContent( this.label );
	}
});


enyo.kind({
	name: "filterNROBERT",
	title: "Nach Eigenschaften filtern",
	type: "properties", 
	classes: "enyo-unselectable preventDragTap",
	kind: "onyx.Groupbox",
	components: [
		{kind: "onyx.GroupboxHeader", name: "header", ontap:"activate", style: "padding: 10px"},
		{name: "drawer", kind: "onyx.Drawer", components: [
			{name: "repeater", kind: "Repeater", onSetupItem: "setupItem", components: [
				{ kind: "YESNOitem" }
			]}
		]}
	],
	activate: function() {
		"use strict";
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	cache: [],
	setupItem: function(inSender, inEvent) {
		"use strict";
		var i = inEvent.index, r = this.cache[i], item = inEvent.item.$.yESNOitem;
		item.label = r.content;
		item.value = r.filtered;
		item.load();
	},
	load: function(){
		"use strict";
		var that = this;
		storage.getInfo(this.type, function(values){
			that.cache = values;
			that.$.repeater.setCount(values.length);
		});
	},
	create: function(){
		this.inherited( arguments );
		this.$.header.setContent( this.title );
		this.load();
	}
});

