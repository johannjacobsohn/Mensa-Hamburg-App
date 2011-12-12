enyo.kind({
	name: "menuList",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Scroller", flex: 1, components: [
			{kind: "Repeater", onSetupRow: "listSetupRow"}
		]}
	],
	data : [
		{
/*			dish: "Grießflammeri  mit  Kirschkompott ",
			mensaName: "WIWI",
			name: "Aus dem Suppentopf und Süßes",
			normalPrice: "2,20",
			studPrice: "1,20€",
			date : ""
*/		}
	],
	create: function() {
		this.inherited(arguments);
		that = this;
		storage.getMenuByDate("2011-12-12", function(json){
			that.data = json;
			that.$.repeater.render();
		});
	},
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex];
		if (row) {
			return {kind: "Item", layoutKind: "HFlexLayout", components: [
				{content: row.dish, flex: 1},
				{content: row.studPrice}
			]};
		}
	}
});
/*
enyo.kind({
	name: "main",
	kind: enyo.VFlexBox,
	onSetupRow: "setupRow",
	onAcquirePage: "acquireListPage",
	components: [
		{kind: "PageHeader", components: [
			{content: "VirtualRepeater Example", flex: 1},
			{kind: "Button", caption: "Configure", onclick: "configureClick"}
		]},
		{kind: "Scroller", flex: 1, components: [
			{name: "list", kind: "VirtualList", onSetupRow: "setupRow", components: [
				{kind: "Item", layoutKind: "HFlexLayout", onclick: "itemClick",
					components: [
						{name: "caption", flex: 1},
						{kind: "Button"}
					]
				}
			],
			data: [
				{animal: "cat", greeting: "Meow"},
				{animal: "small dog", greeting: "Arf"},
				{animal: "big dog", greeting: "Woof"}
			],
			setupRow: function(inSender, inIndex) {
				console.log("setup Row");
				var row = this.data[inIndex];
				if (row) {
					console.log(this.$.caption);
					console.log(row.animal + inIndex);
					if (this.$.caption) {
						this.$.caption.setContent("I am item: " + row.animal);
					}
//					inSender.$.caption.setContent("Greet a " + row.animal + ":");
//					this.$.button.setCaption(row.greeting);
					return true;
				}
			},
/			itemClick: function(inSender, inEvent) {
				console.log("itemClick")
			},
			}
		]}
	],
	dataResponse: function(inSender, inResponse, inRequest) {
		console.log("dataResponse");
		// put the retrieved data into the application's store of data
		// (method omitted)
		this.storeData(inRequest.index, inResponse.results);
		//
		// prompt the list to render.
		this.$.list.refresh();
	},
	create: function() {
		console.log("create")
		console.log(this)
		this.inherited(arguments);
//		this.$.scroller.setScrollTop(0);
		this.$.list.render();
	}
});

/*
﻿enyo.kind({
	name: "main",
	kind: enyo.VFlexBox,
	components: [
		{name: "slidingPane", kind: "SlidingPane", flex: 1, components: [
			{name: "left", width: "320px", kind:"SlidingView", components: [
				{kind: "Header", content:"Datum"},
					{name:"datum", kind: "Scroller", flex: 1, components: [
						{kind: "Divider", caption: "VIEW BASICS"}
						
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "middle", width: "320px", kind:"SlidingView", peekWidth: 50, components: [
					{kind: "Header", content:"Gericht"},
					{kind: "Scroller", flex: 1, components: [
						//Insert your components here
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "right", kind:"SlidingView", flex: 1, components: [
					{kind: "Header", content:"Auswahl"},
					{kind: "Scroller", flex: 1, components: [
						//Insert your components here
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]}
		]}
	]
});


*/
