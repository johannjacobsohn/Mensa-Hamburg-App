/**
 *
 *
 * @kind filterPanel
 */
enyo.kind({
	name : "filterPanel",
	kind: "FittableRows",
	classes: "panel",
	components: [
		{kind: "onyx.Toolbar", name: "title", content : "title" },
		{fit: true, components: [
			{kind: "onyx.Spinner", classes: "onyx-light"},
			{kind: "List", style: "height: 100%;", toggleSelected: true,  classes: "enyo-unselectable preventDragTap", onSetupItem: "setupItem", components: [
				{ kind: "FittableColumns", name: "item", classes: "item enyo-border-box", ontap: "itemTap", components: [
					{name: "exclude", classes: "filter-qantifier", showing: false, content: "Nur ohne"},
					{name: "include", classes: "filter-qantifier", showing: false, content: "Nur mit"},
					{name: "content", classes: "filter-content", fit: true}
				]}
			]}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber"}
		]},
		{kind: enyo.Signals, onSettingsChange: "load"}
	],
	data : [],
	filter : "",
	create : function(){
		this.inherited(arguments);
		this.$.title.setContent(this.title);
		this.states = this.type === "ternary" ? [ false, "include", "exclude" ] : [ false, "include" ];
	},
	load : function(){
		this.$.list.setShowing(false);
		this.$.spinner.show();
		storage.getInfo( this.filter, function(json){
			if(this.filter === "mensa"){
				json = json.filter(function(item){ return item.active; });
			}
			this.$.spinner.hide();
			this.data = json;
//			this.data.unshift({ content : "Alle", value: "all", filtered: json.filter(function(i){return i.filtered;}).length===0 });
			this.$.list.setShowing(true);
			this.$.list.setCount(this.data.length);
			setTimeout( this.$.list.refresh.bind(this.$.list), 1 );
		}.bind(this));
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index, r = this.data[i], item = this.$.item;
		item.removeClass( "include" );
		item.removeClass( "exclude" );
		r.filter = r.filter || {};
		r.filter.type = r.filter.type || false;
		
		if( r.filter.type ){
			item.addClass( r.filter.type );
		}
		this.$.include.setShowing( r.filter.type === "include" );
		this.$.exclude.setShowing( r.filter.type === "exclude" );
		this.$.content.setContent( r.content );
	},
	itemTap : function(inSender, inEvent){
		var i = inEvent.index, r = this.data[i];
		r.filter.type = this.states[(this.states.indexOf(r.filter.type)+1)%this.states.length];
		this.setFilter();
	},
	setFilter : function(){
		var filters = [];
		for( var i=0, l = this.data.length; i<l; i++ ){
			if( this.data[i].filter.type){
				filters.push( { value: this.data[i].name, type: this.data[i].filter.type } );
			}
		}
		
		// set filter
		if(filters.length > 0){
			storage.setFilter(this.filter, filters);
		} else {
			storage.unsetFilter(this.filter);
		}

		enyo.Signals.send("onFilterChange");
	}
});
