

enyo.kind({
	name: "Divider",
	kind: "FittableColumns",
	noStretch: true,
	caption: "Divider",
	components: [
		{ name: "before", style: "", classes: "before-caption" },
		{ name: "caption", content: "Divider", classes: "caption" },
		{ name: "after", classes: "after-caption", fit: true }
	],
	create: function(){
		this.inherited(arguments);
		this.setCaption( this.caption );
	},
	setCaption: function( caption ){
		this.caption = caption;
		this.$.caption.setContent( caption );
	}
});
