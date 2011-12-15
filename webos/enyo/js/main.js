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
			{name: "mensalistpanel", width: "200px", kind:"SlidingView", peekWidth: 50, components: [
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
						{icon: "images/Gear.png", onclick: "closePopup", onclick: "openConfig"}
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
			{kind: "ModalDialog", name: "scrollerExample", caption: "Zu ladene Mensen", components:[
				{kind: "Group", components: [
					{kind:"Scroller", height: "230px", components:[
						{kind: "Repeater", onSetupRow: "listSetupRow"}
					]}
				]},
				{kind: "Button", className: "enyo-button-affirmative", caption: $L("Speichern"), onclick: "closePopup"},
			]}
		]}
	],
	openConfig: function(inSender, inEvent) {
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

		// Save URLs
		conf.setURLs(array);

		// Reload Data
		storage.cleanData();
		storage.getWeekMenu();
		
		//Refresh views
		// MensaList:
		var mensaList = this.owner.$.main.$.mensaList;
		storage.getMensen(function(json){
			mensaList.data = json;
			mensaList.data.unshift("Alle");
			mensaList.$.repeater.render();
		});
		// NameList:
		var nameList = this.owner.$.main.$.nameList;
		storage.getTypes(function(json){
			nameList.data = json;
			nameList.data.unshift("Alle");
			nameList.$.repeater.render();
		});
		// MenuList:
		var menuList = this.owner.$.main.$.menuList;
		storage.filter(function(json){
			menuList.data = json;
			menuList.render();
		});

		inSender.parent.parent.parent.close();
	},

	create: function() {
		this.inherited(arguments);
		this.data = conf.getURLs();
	}
});
