/**
 * Filter view
 * 
 */
enyo.kind({
	name: "filterView",
	fit : true,
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", content: "Gerichte filtern" },
		{kind: "Scroller", fit: true, components: [
			{kind: "filterList", filterKind: "filter-item-double",  name:"mensaFilter",      title: "Nach Mensen filtern",        type: "mensa"},
			{kind: "filterList", filterKind: "filter-item-double",  name:"nameFilter",       title: "Nach Gericht filtern",       type: "name"},
			{kind: "filterList", filterKind: "filter-item-trippel", name:"additivesFilter",  title: "Nach Zusatzstoffen filtern", type: "additives"},
			{kind: "filterList", filterKind: "filter-item-trippel", name:"propertiesFilter", title: "Nach Eigenschaften filtern", type: "properties"}
		]},
		{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "applyFilters"},
	],
	applyFilters : function(){
		this.setFilter("name").setFilter("mensa").setFilter("properties").setFilter("additives");
		enyo.Signals.send("onRequestMenu");
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
	load : function(inCaller) {
		if(!this.loaded){
			this.$.mensaFilter.load();
			this.$.nameFilter.load();
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
	classes: "item enyo-border-box",
	kind: "FittableColumns",
	published: {
		label: "",
		state: "include"
	},
	components: [
		{ content: "", name: "label", fit: true },
		{ style: "width: 84px", kind: "onyx.ToggleButton", name: "pickerButton", onContent: "Mit", offContent: "Ohne", onChange: "change" }
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
	classes: "item enyo-border-box",
	kind: "FittableColumns",
	published: {
		label: "",
		state: "none",
	},
	components: [
		{ content: "", name: "label", fit: true },
		{style: "width: 70px;", components:[
			{style: "width: 32px; float: left;", components: [
				{kind: "onyx.Checkbox", onchange: "change", name: "include"},
				{ content: "Mit", style: "font-size: 10px; text-align: center;"},
			]},
			{style: "width: 32px; float: left;", components: [
				{kind: "onyx.Checkbox", onchange: "change", name: "exclude"},
				{ content: "Ohne", style: "font-size: 10px; text-align: center;"}
			]}
		]}
 	],
	change: function(inSender, inEvent){
		var o = inEvent.originator;
		if(o.checked){
			this.$[ o.name === "exclude" ? "include" : "exclude" ].setChecked( false );
		}

		this.bubble( "onChange", { 
			content : this.label,
			state   : o.checked ? o.name : "none"
		});
	},
	load: function(){
		this.$.label.setContent( this.label );
		if(this.state && this.state !== "none")
			this.$[ this.state ].setChecked( true );
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
	kind: "onyx.Groupbox",
	components: [
		{kind: "onyx.GroupboxHeader", name: "header", ontap:"activate", style: "padding: 10px"},
		{name: "drawer", kind: "onyx.Drawer", components: [
			{name: "repeater", kind: "Repeater", onSetupItem: "setupItem", components: [
				{ content: "" }
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
		this.filteredBy[this.name] = this.filteredBy[this.name] || {};
		if( type === "none" ){
			delete this.filteredBy[this.name][value];
		} else {
			this.filteredBy[this.name][value] = type;
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
		var i = inEvent.index, r = this.cache[i], item = inEvent.item.$[this.filterKind];
		item.label = r.content;
		this.filteredBy[this.name] = this.filteredBy[this.name] || {};
		if(r.filter && r.filter.type){
			item.state = r.filter.type;
			this.filteredBy[this.name][r.name] = item.state;
		} else {
			this.filteredBy[this.name][r.name] = "include";
		}
		item.load();
	},
	load: function(){
		"use strict";
		this.$.header.setContent( this.title );
		this.$.repeater.itemComponents[0].kind = this.filterKind;
		storage.getInfo(this.type, function(values){
			if(this.type === "mensa") {
				values = values.filter(function(item){ return item.active });
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
