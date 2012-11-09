enyo.kind({
	name : "menuPanel",
	kind: "FittableRows",
	classes: "panel",
	components: [
		{kind: "onyx.Toolbar", name : "title", content: "Menü"},
		{kind: "menuList", fit:true},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber"},
//			{kind: "onyx.Button", content: "Einstellungen", ontap: "openSettings"},
//			{kind: "onyx.Button", content: "Info",          ontap: "openInfo"    },	
			{classes: "menu-button", ontap: "openSettings", kind: "onyx.IconButton", src: "assets/settings.png" },
			{classes: "menu-button", ontap: "openInfo", kind: "onyx.IconButton", src: "assets/info.png"   },
			{classes: "menu-button", ontap: "openPanels", kind: "onyx.IconButton", src: "assets/filter.png"   }
		]},
		{kind: enyo.Signals, onFilterChange: "load", onDisplayPricesChange: "load", onSettingsChange: "load"}
	],
	openPanels: function(){
		enyo.Signals.send("onChangePanels");
	},
	openSettings: function(){
		enyo.Signals.send("onRequestSettings");
	},
	openInfo: function(){
		enyo.Signals.send("onRequestInfo");
	},
	create : function(){
		this.inherited(arguments);
		this.load();
	},
	load : function(){
		this.$.menuList.loading(true);
//		console.time("get");
		storage.getSortedSegmented(function(json){
//			console.timeEnd("get");
			this.$.menuList.loading(false);
			this.$.menuList.menu = json;
//			console.time("list");
			this.$.menuList.load();
//			console.timeEnd("list");
//			console.time("reflow");
			this.reflow();
//			console.timeEnd("reflow");
		}.bind(this));
	}
});
