/*
 *
 *
 *
 */
enyo.kind({
	name: "flyout",
	kind: "enyo.Slideable",
	classes: "pullout",
	top: 140,
	style: "z-index: 10; position: absolute; left: -200px; top: 60px; width: 200px;",
	unit: "%",
	min: -100,
	value: 100,
	components: [
		{classes: "pullout-controls", components: [
			{content: info.appName},
			{content: info.appDesc}
		]},
		{kind: "onyx.Grabber", classes: "pullout-grabbutton"}
	],
	create : function(){
		this.inherited(arguments)
//		this.style = "z-index: 10; position: absolute; right: -180px; top: " + this.top + "px;";
	}
});
