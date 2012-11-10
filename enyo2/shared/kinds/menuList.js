enyo.kind({
	name: "menuList",
	classes: "menuList",
	style: "height: 100%;",
	published: {
		loading: false,
	},
	components: [
		{kind: "Waiter"},
		{kind: "List", name: "menu", style: "height: 100%;", classes: "enyo-unselectable preventDragTap menu", onSetupItem: "setupRow", toggleSelected: true, components: [
			{name: "divider", kind: "Divider"},
			{kind: "menuItem", classes: "item enyo-border-box"}
		]}
	],
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.menu[i], item = this.$.menuItem, divider = this.$.divider;
		if(r.type === "header"){
			item.hide();
			divider.show();
			divider.setCaption( r.headerType === "date" ? formatDate(storage.dateStringToDate(r.header)) : r.header );
		} else {
			divider.hide();
			item.show();
			r.showDetails = inEvent.selected;
			item.setMenuItem(r);
		}
		return true;
	},
	loadingChanged : function(){
		if(this.loading){
			this.$.menu.setCount(0);
			this.$.menu.refresh();
		}
		this.$.waiter.setShowing( this.loading )
	},
	load: function(){
		this.$.menu.setCount(this.menu.length);
		this.$.menu.refresh();
		this.setLoading(false);
	}
});

enyo.kind({
	name: "Waiter",
	components: [
		{name: "spinner", kind: "Image", noEvents: true, src: "assets/spinner.gif", showing: false, classes: "search-spinner"},
		{name: "loadingMessage", classes: "loading-message", content: "...", showing: false},
	],
	showingChanged: function(){
		this.inherited(arguments);
		this.showloadingMessage(this.showing);
		this.showloadingSpinner(this.showing);
	},
	msgs : [
		"Bin dabei...",
		"Kommt gleich...",
		"abwarten...",
		"wird geladen...",
		"Eile mit Weile...", 
		"Is' unterwegs...",
		"Wird gleich..."
	],
	showloadingMessage : function(bool){
		if(bool){
			this.$.loadingMessage.setContent( this.msgs[ Math.round( Math.random() * (this.msgs.length-1) ) ] );
		}
		this.$.loadingMessage.setShowing( bool );
	},
	showloadingSpinner : function(bool){
		this.$.spinner.setShowing(bool);
	}
});
