enyo.kind({
	name: "Panel",
	kind: "Control",
	components: [{
		kind: "onyx.Slideable",
		value: -100,
		min: -100,
		max: 0,
		unit: "%",
		classes: "enyo-fit",
		preventDragPropagation: true,
		style: "width: 90%;"
	}]
});
