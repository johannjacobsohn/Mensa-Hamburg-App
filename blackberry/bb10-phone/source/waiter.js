
enyo.kind({
	name: "Waiter",
	components: [
		{name: "spinner", kind: "Image", noEvents: true, src: "assets/spinner.gif", showing: false, classes: "search-spinner"},
		{name: "loadingMessage", classes: "loading-message", content: "...", showing: false}
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
