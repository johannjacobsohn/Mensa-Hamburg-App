enyo.kind({
	name: "menuList",
	classes: "menuList",
	style: "height: 100%;",
	components: [
		{name: "spinner", tag: "img", src: "assets/spinner.gif", showing: false, classes: "search-spinner"},
		{name: "loadingMessage", classes: "loading-message", content: "Wird geladen...", showing: false},
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
	/* @TODO: change to be an published property*/
	loading : function(bool){
		// Timeout, damit nur gezeigt wird wenn wir länger warten müssen
		var timeout = 1,
		    long_timeout = 1000;
		if(this.timer && !bool){
			this.showloadingMessage(false);
			this.showloadingSpinner(false);
			clearTimeout(this.timer);
			clearTimeout(this.long_timer);
			delete this.timer;
			delete this.long_timer;
		} else if(bool && typeof this.timer !== "number") {
			this.timer      = setTimeout( this.showloadingMessage.bind(this, true), timeout);
			this.long_timer = setTimeout( this.showloadingSpinner.bind(this, true), long_timeout);
		}
	},
	showloadingMessage : function(bool){
		var msgs = [
			"Bin dabei...",
			"Kommt gleich...",
			"abwarten...",
			"wird geladen...",
			"Eile mit Weile...", 
			"Is' unterwegs...",
			"Wird gleich..."
		];

		if(bool){
			this.$.menu.setCount(0);
			this.$.menu.refresh();
			this.$.loadingMessage.setContent( msgs[ Math.round( Math.random() * (msgs.length-1) ) ] );
		}
		this.$.loadingMessage.setShowing( bool );
	},
	showloadingSpinner : function(bool){
		this.$.spinner.setShowing(bool);
	},
	load: function(){
		this.$.menu.setCount(this.menu.length);
		this.$.menu.refresh();
	}
});
