enyo.kind({
	name: "main",
	kind: enyo.VFlexBox,
	components: [
		{name: "slidingPane", kind: "SlidingPane", flex: 1, components: [
			{name: "left", width: "200px", kind:"SlidingView", components: [
					{kind: "Header", content:"Tage"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "dateList",
							flex: 1,
							peekWidth: 100,
							kind: "dateList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "middle", width: "200px", kind:"SlidingView", peekWidth: 50, components: [
					{kind: "Header", content:"Mensen"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "mensaList",
							flex: 1,
							peekWidth: 100,
							kind: "mensaList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"},
						{kind: "Button", caption: "Konfig", onclick: "example3Click"}
					]}
			]},
			{name: "middle2", width: "200px", kind:"SlidingView", peekWidth: 100, components: [
					{kind: "Header", content:"Gerichte"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "nameList",
							flex: 1,
							peekWidth: 100,
							kind: "nameList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "right", kind:"SlidingView", flex: 1, peekWidth: 150, components: [
					{kind: "Header", content:"Speisekarte"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "menuList",
							flex: 1,
							peekWidth: 100,
							kind: "menuList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			/* Scrollable */
//			{kind: "Button", caption: "Scrollable Items in A Modal Dialog", onclick: "example3Click"},
			{kind: "ModalDialog", name: "scrollerExample", caption: "Zu ladene Mensen", components:[
				{kind: "Group", components: [
					{kind:"Scroller", height: "230px", components:[

						{kind: "Repeater", onSetupRow: "listSetupRow"}
/*
						{kind: "RowItem", className: "enyo-first", layoutKind: "HFlexLayout", components: [
							{content: "Living Room", flex: 1},
							{kind: "ToggleButton"}
						]},
						{kind: "RowItem", layoutKind: "HFlexLayout", components: [
							{content: "Dining Room", flex: 1},
							{kind: "ToggleButton"}
						]},
						{kind: "RowItem", layoutKind: "HFlexLayout", components: [
							{content: "Bedroom", flex: 1},
							{kind: "ToggleButton"}
						]},
						{kind: "RowItem", layoutKind: "HFlexLayout", components: [
							{content: "Kitchen", flex: 1},
							{kind: "ToggleButton"}
						]},
						{kind: "RowItem", layoutKind: "HFlexLayout", components: [
							{content: "Bathroom", flex: 1},
							{kind: "ToggleButton"}
						]},
						{kind: "RowItem", className: "enyo-last", layoutKind: "HFlexLayout", components: [
							{content: "Garage", flex: 1},
							{kind: "ToggleButton"}
						]},
*/
					],
					listSetupRow: function(inSender, inIndex) {
						console.log("listSetupRow")
				//		var row = this.data[inIndex];
				//		if (row) {
				//			return {kind: "Item", className: (row === "Alle") ? "enyo-held" : "dummy", layoutKind: "HFlexLayout", onclick: "itemClick", components: [
				//				{content: row, flex: 1}
				//			]};
				//		}
					}
				}
				]},
				{kind: "Button", className: "enyo-button-affirmative", caption: $L("Speichern"), onclick: "closePopup"},
			]}
		]}
	],
	
	example3Click: function(inSender, inEvent) {
		this.$.scrollerExample.openAtCenter();
	},
	data : [],
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		//figure out if url has been saved
		savedUrls = conf.getSavedURLs();
		if(row){
			return {kind: "RowItem", layoutKind: "HFlexLayout", components: [
				{content: row, flex: 1},
				{kind: "ToggleButton", state: savedUrls.indexOf(row) != -1}
			]};
		}
	},

	closePopup: function(inSender, inEvent) {
		var array = [], i, controls = inSender.parent.children[0].children[1].children[0].children[0].children[0].children;
		for(i=0; i<controls.length; i++){
			if(controls[i].children[1].state){
				array.push(controls[i].children[0].content)
			}
		}

		conf.setURLs(array);
		// @TODO: Reload App


		inSender.parent.parent.parent.close();
	},

	create: function() {
		this.inherited(arguments);
		this.data = conf.getURLs();
	}
});
