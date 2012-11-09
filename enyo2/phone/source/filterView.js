/**
 * Filteransicht
 *
 */
enyo.kind({
	name: "filterView",
	fit : true,
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", classes: "header", components: [
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
			{kind: "filter-double",  name:"mensaFilter",      title: "Nach Mensen filtern",        type: "mensa"},
			{kind: "filter-double",  name:"nameFilter",       title: "Nach Gericht filtern",       type: "name"},
			{kind: "filter-trippel", name:"additivesFilter",  title: "Nach Zusatzstoffen filtern", type: "additives"},
			{kind: "filter-trippel", name:"propertiesFilter", title: "Nach Eigenschaften filtern", type: "properties"}
		]},
		{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "applyFilters"},
	],
	applyFilters : function(){
		this.setFilter("name").setFilter("mensa").setFilter("properties").setFilter("additives");
	},
	setFilter : function(type){
		var filters = this.$[type + "Filter"].getStatus();
		// filters need to be in this form:
		// [{value: "a", type: "include"}, {"b", type: "include"}]
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
	}
});


enyo.kind({
	name: "filter-item-double",
	classes: "item enyo-border-box",
	kind: "FittableColumns",
	label: "",
	components: [
		{ content: "", name: "label", fit: true },
		{ kind: "onyx.ToggleButton", onContent: "Mit", offContent: "Ohne", onChange: "buttonToggle" }
	],
	change: function(inSender, inEvent){
		var state;
		var that = this;
		setTimeout( function(){
			if( typeof inEvent.index === "undefined" ) return;
			
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
	name: "filter-item-trippel",
	classes: "item enyo-border-box",
	kind: "FittableColumns",
	label: "",
	components: [
		{ content: "", name: "label", fit: true },
		{style: "width: 70px;", components:[
			{style: "width: 32px; float: left;", components: [
				{kind: "onyx.Checkbox", onchange: "checkboxClicked"},
				{ content: "Mit", style: "font-size: 10px; text-align: center;"},
			]},
			{style: "width: 32px; float: left;", components: [
				{kind: "onyx.Checkbox", onchange: "checkboxClicked"},
				{ content: "Ohne", style: "font-size: 10px; text-align: center;"}
			]}
		]}
 	],
	checkboxClicked: function(inSender) {
		if (inSender.getValue()) { this.log("I've been checked!"); }
	},
	change: function(inSender, inEvent){
		var state;
		var that = this;
		setTimeout( function(){
			if( typeof inEvent.index === "undefined" ) return;
			
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
	name: "filter-double",
	title: "Nach Eigenschaften filtern",
	type: "properties", 
	classes: "enyo-unselectable preventDragTap",
	kind: "onyx.Groupbox",
	components: [
		{kind: "onyx.GroupboxHeader", name: "header", ontap:"activate", style: "padding: 10px"},
		{name: "drawer", kind: "onyx.Drawer", components: [
			{name: "repeater", kind: "Repeater", onSetupItem: "setupItem", components: [
				{ kind: "filter-item-double" }
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

		if( type === "none" ){
			delete this.filteredBy[value];
		} else {
			this.filteredBy[value] = type;
		}

		return true;
	},
	activate: function() {
		"use strict";
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	cache: [],
	setupItem: function(inSender, inEvent) {
		"use strict";
		var i = inEvent.index, r = this.cache[i], item = inEvent.item.$["filter-item-double"];
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
	getStatus: function(){
		"use strict";
		var filter = [], value;
		// filters need to be returned in this form:
		// [{value: "a", type: "include"}, {"b", type: "include"}]
		for( value in this.filteredBy ){
			if( this.filteredBy.hasOwnProperty(value) ){
				filter.push( { value: value, type: this.filteredBy[value] } );
			}
		}
		return filter;
	},
	create: function(){
		this.inherited( arguments );
		this.$.header.setContent( this.title );
		this.load();
	}
});

enyo.kind({
	name: "filter-trippel",
	title: "Nach Eigenschaften filtern",
	type: "properties", 
	classes: "enyo-unselectable preventDragTap",
	kind: "onyx.Groupbox",
	components: [
		{kind: "onyx.GroupboxHeader", name: "header", ontap:"activate", style: "padding: 10px"},
		{name: "drawer", kind: "onyx.Drawer", components: [
			{name: "repeater", kind: "Repeater", onSetupItem: "setupItem", components: [
				{ kind: "filter-item-trippel" }
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

		if( type === "none" ){
			delete this.filteredBy[value];
		} else {
			this.filteredBy[value] = type;
		}

		return true;
	},
	activate: function() {
		"use strict";
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	cache: [],
	setupItem: function(inSender, inEvent) {
		"use strict";
		var i = inEvent.index, r = this.cache[i], item = inEvent.item.$["filter-item-trippel"];
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
	getStatus: function(){
		"use strict";
		var filter = [], value;
		// filters need to be returned in this form:
		// [{value: "a", type: "include"}, {"b", type: "include"}]
		for( value in this.filteredBy ){
			if( this.filteredBy.hasOwnProperty(value) ){
				filter.push( { value: value, type: this.filteredBy[value] } );
			}
		}
		return filter;
	},
	create: function(){
		this.inherited( arguments );
		this.$.header.setContent( this.title );
		this.load();
	}
});
