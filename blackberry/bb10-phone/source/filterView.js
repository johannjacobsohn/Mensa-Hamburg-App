/**
 * Filter view
 * 
 */
enyo.kind({
	name: "filterView",
	//~ kind: "FittableRows",
	components: [
		{kind: "Scroller", style: "height: 100%", components: [
			{kind: "filterList", filterKind: "filter-item-double",  name: "mensaFilter",      title: "Nach Mensen filtern",        type: "mensa"},
			{kind: "filterList", filterKind: "filter-item-double",  name: "nameFilter",       title: "Nach Gericht filtern",       type: "name"},
			{kind: "filterList", filterKind: "filter-item-trippel", name: "additivesFilter",  title: "Nach Zusatzstoffen filtern", type: "additives"},
			{kind: "filterList", filterKind: "filter-item-trippel", name: "propertiesFilter", title: "Nach Eigenschaften filtern", type: "properties"}
		]}
	],
	handlers: {
		onchange: "applyFilters"
	},
	applyFilters : function(){
		this.setFilter("name").setFilter("mensa").setFilter("properties").setFilter("additives");
		enyo.Signals.send("onSettingsChange");
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
	loaded: false,
	create : function(inCaller) {
		this.inherited(arguments);
		if(!this.loaded){
			this.$.mensaFilter.load();
			//~ this.$.nameFilter.load();
			this.$.additivesFilter.load();
			this.$.propertiesFilter.load();
			this.loaded = true;
		}
	},
	changePreserveFilters : function(inSender){
		storage.setPersistentFilters( inSender.$.toggle.getValue() );
	}
});

enyo.kind({
	name: "filter-item-double",
	classes: "item enyo-border-box filter-item-double",
	kind: "FittableColumns",
	style: "height: 120px;position: relative;",
	published: {
		label: "",
		state: "include"
	},
	components: [
		{classes: "input", style: "width: 84px", kind: "bbUI.ToggleButton", name: "pickerButton", onContent: "Mit", offContent: "Ohne", onChange: "change"},
		{classes: "label", name: "label", fit: true}
	],
	stateChanged: function(){
		this.$.pickerButton.value = this.state === "include";
	},
	change: function(inSender, inEvent){
		this.bubble( "onChange", {
			content : this.label,
			state   : inEvent.value ? "include" : "exclude"
		});
	},
	load: function(){
		this.$.label.setContent( this.label );
		this.stateChanged();
	}
});

enyo.kind({
	name: "filter-item-trippel",
	classes: "item enyo-border-box filter-item-double",
	kind: "FittableColumns",
	published: {
		label: "",
		state: "none"
	},
	components: [
		{classes: "label", content: "", name: "label", fit: true },
		{style: "", components:[
			{style: "float: left;", components: [
				{kind: "bbUI.Checkbox", onActivate: "change", name: "include"},
				{content: "Mit", style: "text-align: center; margin-top: -20px; font-size: 60%;"}
			]},
			{style: "float: left;", components: [
				{kind: "bbUI.Checkbox", onActivate: "change", name: "exclude"},
				{content: "Ohne", style: "text-align: center; margin-top: -20px; font-size: 60%;"}
			]}
		]}
	],
	change: function(inSender, inEvent){
		var o = inEvent.originator;
		if(o.checked){
			this.$[ o.name === "exclude" ? "include" : "exclude" ].setChecked(false);
		}

		this.bubble( "onChange", {
			content : this.label,
			state   : o.checked ? o.name : "none"
		});
	},
	load: function(){
		this.$.label.setContent( this.label );
		if(this.state && this.state !== "none"){
			this.$[ this.state ].setChecked( true );
		}
	}
});

enyo.kind({
	name: "filterList",
	published: {
		title: "Nach Eigenschaften filtern",
		filterKind: "",
		type: "properties"
	},
	classes: "enyo-unselectable preventDragTap",
	components: [
		{name: "header", style: "padding: 10px"},
		{name: "repeater", kind: "Repeater", onSetupItem: "setupItem", components: [
			{content: "", label: ""}
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
		if( typeof value === "undefined"  || typeof type === "undefined"  ){
			return true;
		}
		this.filteredBy[this.name] = this.filteredBy[this.name] || {};
		if( type === "none" ){
			delete this.filteredBy[this.name][value];
		} else {
			this.filteredBy[this.name][value] = type;
		}
		this.bubble("onchange");
		return true;
	},
	cache: [],
	setupItem: function(inSender, inEvent) {
		"use strict";
		var i = inEvent.index, r = this.cache[i], item = inEvent.item.$[this.filterKind];
		item.label = r.content;
		this.filteredBy[this.name] = this.filteredBy[this.name] || {};
		if(r.filter && r.filter.type){
			item.state = r.filter.type;
			this.filteredBy[this.name][r.name] = item.state;
		} else if ( this.filterKind === "filter-item-double") {
			this.filteredBy[this.name][r.name] = "include";
		} else {
			this.filteredBy[this.name][r.name] = "none";
		}
		item.load();
	},
	load: function(){
		"use strict";
		this.$.header.setContent( this.title );
		this.$.repeater.itemComponents[0].kind = this.filterKind;
		storage.getInfo(this.type, function(values){
			if(this.type === "mensa") {
				values = values.filter(function(item){ return item.active; });
			}
			this.cache = values;
			this.$.repeater.setCount(this.cache.length);
		}.bind(this));
	},
	getStatus: function(){
		"use strict";
		var filter = [], value;
		// filters need to be returned in this form:
		// [{value: "a", type: "include"}, {"b", type: "include"}]
		for( value in this.filteredBy[this.name] ){
			if( this.filteredBy[this.name].hasOwnProperty(value) ){
				filter.push( { value: value, type: this.filteredBy[this.name][value] } );
			}
		}
		return filter;
	}
});
