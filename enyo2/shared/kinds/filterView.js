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
				{kind: "filterNROBERT", name:"nameFilter", title: "Nach Gericht filtern", type: "name"},
				{kind: "filterNROBERT", name:"additivesFilter", title: "Nach Zusatzstoffen filtern", type: "additives"},
				{kind: "filterNROBERT", name:"propertiesFilter", title: "Nach Eigenschaften filtern", type: "properties"},
				{kind: "filterNROBERT", name:"mensaFilter", title: "Nach Mensen filtern", type: "mensa"},
			]},
			{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "applyFilters"},
		],
	applyFilters : function(){
		this.setFilter("name").setFilter("mensa").setFilter("properties").setFilter("additives");
	},
	setFilter : function(type){
		console.log(type + "Filter", this.$, this.$[type + "Filter"])
		var filters = this.$[type + "Filter"].getStatus();
		// filters need to be in this form:
		// [{value: "a", type: "include"}, {"b", type: "include"}]
console.log(filters)
		if( filters.length === 0 ){
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

{kind: "Toggle3Button", onContent: "foo", offContent: "bar", neutralContent: "baz", onChange: "buttonToggle"}
/*		{ kind: "onyx.PickerDecorator", name: "picker",  style: "width: 100px", components: [
			{ name: "pickerButton" },
			{kind: "onyx.Picker", components: [
				{content: "Egal", active: true},
				{content: "Ja"},
				{content: "Nein"}
			], onChange: "change"}
		]}
*/	],
	change: function(inSender, inEvent){
		var state;
		var that = this;
		setTimeout( function(){
			if( typeof inEvent.index === "undefined" ) return;
			console.log( "index", inEvent.selected )
			
			if( inEvent.selected.content === "Ja" ){
				state = "include";
			} else if( inEvent.selected.content === "Nein" ){
				state = "exclude";
			} else{
				state = "none";
			}

			that.bubble( "onChange", { 
				content : that.label,
				state   : state
			});
		}, 10);
	},
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
	handlers: {
		"onChange" : "changed"
	},
	filteredBy : {},
	changed: function(inSender, inEvent){
		"use strict";
		var type = inEvent.state,    // include, exclude, none
		    value = inEvent.content;  //
		if( typeof value === "undefined"  || typeof type === "undefined"  ) return
		type !== "none" && console.log(type, value)

		if( type === "none" ){
			delete this.filteredBy[value];
		} else {
			this.filteredBy[value] = type;
		}

type !== "none" && console.log(this.filteredBy)
		return true;
	},
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
			console.log(values)
			that.cache = values;
			that.$.repeater.setCount(values.length);
		});
	},
	getStatus: function(){
		"use strict";
		var filter = [], value;
		// filters need to be returned in this form:
		// [{value: "a", type: "include"}, {"b", type: "include"}]
		console.log("this.filteredBy", this.filteredBy)
		for( value in this.filteredBy ){
			if( this.filteredBy.hasOwnProperty(value) ){
				filter.push( { value: value, type: this.filteredBy[value] } );
			}
		}
console.log("getStatus", filter)
		return filter;
	},
	create: function(){
		this.inherited( arguments );
		this.$.header.setContent( this.title );
		this.load();
	}
});

