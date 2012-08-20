/**
 *
 *
 * @kind filterPanel
 */
enyo.kind({
	name : "filterPanel",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", name: "title", content : "title" },
//		{kind: "SpinnerLarge", showing: true},
		{kind: "List", fit: true, touch: true, classes: "enyo-unselectable preventDragTap", onSetupItem: "setupItem", components: [
			{name: "item", classes: "item enyo-border-box", ontap: "itemTap", components : [
				{name: "content"}
			]}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber"}
		]}
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
//		this.$.spinnerLarge.show();
		storage.getInfo( this.type, function(json){
//			that.$.spinnerLarge.hide();
			that.data = json;
			that.data.unshift({ content : "Alle", value: "all", filtered: json.filter(function(i){return i.filtered;}).length===0 });
			that.$.list.setCount(that.data.length);
		});
	},
	setupItem: function(inSender, inIndex) {
		var i = inIndex.index, r = this.data[i];
		this.$.content.setContent( r.content );
	},
	filters: [],
	itemTap : function(caller, event){
		if(caller.hasClass("onyx-selected")){
			storage.unsetFilter(this.type);
			caller.removeClass("selected");
		} else {
			this.filters.push(caller.content);
			storage.setFilter(this.type, this.filters);
			caller.addClass("selected");
		}
		this.bubble("load");
	}
});
