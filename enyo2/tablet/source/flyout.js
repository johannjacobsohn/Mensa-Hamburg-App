/*
 *
 *
 *
 */
enyo.kind({
	name: "flyout",
	events: {
		onClose: "",
		onOpen: ""
	},
	handlers: {
		onCloseMe: "hide"
	},
	components: [{
		kind: "enyo.Slideable",
		name: "client",
		classes: "flyout",
		style: "z-index: 10; position: absolute; right: 0; top: 0; width: 300px; height: 100%;",
		unit: "%",
		min: 0,
		max: 100,
		value: 100,
		onAnimateFinish: "finit"
	}],
	hide : function(){
		this.$.client.animateToMax();
	},
	show : function(){
		this.$.client.animateToMin();
	},
	toggle: function(){
		this.$.client.toggleMinMax();
	},
	finit: function(inSender, inEvent){
		if(inEvent.endValue === 100){
			this.doClose();
		} else if(inEvent.endValue === 0) {
			this.doOpen();
		}
	}
});
