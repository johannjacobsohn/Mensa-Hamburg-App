enyo.kind({
	name: "Divider",
	kind: "FittableColumns",
	noStretch: true,
	classes: "divider",
	published: {
		caption: "Divider"
	},
	components: [
		{ name: "before", style: "", classes: "before-caption" },
		{ name: "caption", content: "Divider", classes: "caption" },
		{ name: "after", classes: "after-caption"}
	],
	create: function(){
		this.inherited(arguments);
		this.captionChanged();
	},
	captionChanged: function(){
		this.$.caption.setContent( this.caption );
		this.reflow();
	}
});
