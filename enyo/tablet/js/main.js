/*
 * @TODO: Datumsfilter laden alle 3 Stunden
 *
 */

enyo.kind({
	name: "main",
	kind: enyo.VFlexBox,
	components: [
		{kind: "AppMenu", components: [
			{caption: "Konfigurieren", onclick: "conf", onclick: "openConfig"},
			{caption: "Über diese App", onclick: "about", onclick: "openAbout"},
			{caption: "Zurücksetzen", onclick: "reset", onclick: "reset"},
		]},
		{kind: "ModalDialog", name: "about", caption: info.appName, components:[
			{ content: info.appDesc },
			{kind: "Button", className: "enyo-button-affirmative", caption: $L("Ok"), onclick: "closePopup"},
			{kind: "Button", caption: $L("Zur Projektseite"), onclick: "moreInfo"},
			{kind: "Button", caption: $L("Email schreiben"), onclick: "email"},
		]},
		{
			name : "openEmail",
			kind : "PalmService",
			service : "palm://com.palm.applicationManager",
			method : "open",
			onSuccess : "openEmailSuccess",
			onFailure : "openEmailFailure",
			subscribe : true
		},
		{name: "slidingPane", kind: "SlidingPane", flex: 1, components: [
			{name: "left", width: "160px", kind:"SlidingView", components: [
					{kind: "Header", content:"Tage"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "dateList",
							flex: 1,
							type: "date",
							peekWidth: 100,
							kind: "filterList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "mensalistpanel", width: "160px", kind:"SlidingView", peekWidth: 50, components: [
					{kind: "Header", content:"Mensen"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "mensaList",
							flex: 1,
							type: "mensa",
							peekWidth: 100,
							kind: "filterList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "middle2", width: "160px", kind:"SlidingView", peekWidth: 100, components: [
					{kind: "Header", content:"Gerichte"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "nameList",
							flex: 1,
							type: "name",
							peekWidth: 100,
							kind: "filterList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "right", kind:"SlidingView", flex: 1, components: [
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
						{kind: "GrabButton"},
						{content: "Mensa Hamburg", onclick: "openAbout"},
						{icon: "images/Gear.png", onclick: "closePopup", onclick: "openConfig"}
					]}
			]},
			/* Scrollable */
			{kind: "ModalDialog", name: "conf", caption: "Zu ladene Mensen", components:[
				{kind: "Group", components: [
					{
						kind: "Picker",
						value: conf.displayStudentPrices(),
						items: [
							{caption: "Studentenpreise anzeigen",       value: true},
							{caption: "Nicht-Studentenpreise anzeigen", value: false}
						],
						onChange: "changeStudentPrice"
					},

					{kind:"Scroller", height: "230px", components:[
						{kind: "Repeater", onSetupRow: "listSetupRow"}
					]}
				]},
				{kind: "Button", className: "enyo-button-affirmative", caption: $L("Speichern"), onclick: "saveConf"},
				{kind: "Button", className: "enyo-button-negative", caption: $L("App zurücksetzen"), onclick: "reset"}
			]}
		]}
	],
	openConfig: function(inSender, inEvent) {
		this.$.conf.openAtCenter();
	},
	openAbout: function(inSender, inEvent) {
		this.$.about.openAtCenter();
	},
	data : [],
	listSetupRow: function(inSender, inIndex) {
		var row = this.data[inIndex],
		    savedUrls = conf.getSavedURLs(),
		    isConfigured = conf.isConfigured();
		if(row){
			return {kind: "RowItem", layoutKind: "HFlexLayout", components: [
				{content: row, flex: 1},
				{kind: "ToggleButton", state: isConfigured && savedUrls.indexOf(row) != -1}
			]};
		}
	},
	moreInfo : function(inSender, inEvent){
		location.href = info.appURL;
		this.closePopup(inSender, inEvent);
	},
	email : function(inSender, inEvent){
		location.href = "mailto: " + info.appEmail;
		this.closePopup(inSender, inEvent);
	},
	reset : function(inSender, inEvent){
		data.clear();
		location.reload();
	},
	closePopup : function(inSender, inEvent){
		inSender.parent.parent.parent.close();
	},
	changeStudentPrice : function(instance, value){
		conf.setStudentPrices(value);
		this.$.menuList.displayStudentPrices = value;
	},
	saveConf: function(inSender, inEvent) {
		var array = [], i, controls = inSender.parent.children[0].children[1].children[1].children[0].children[0].children;
		// @TODO: eleganter?
		for(i=0; i<controls.length; i++){
			if(controls[i].children[1].state){
				array.push(controls[i].children[0].content)
			}
		}

		// Save URLs
		conf.setURLs(array);

		// Reload Data
		storage.cleanData();
		
		//Refresh
		this.owner.$.main.$.mensaList.load(); // Mensa
		this.owner.$.main.$.nameList.load();  // Names/Types
		this.owner.$.main.$.menuList.load();  // Menu
		
		this.closePopup(inSender, inEvent)
	},

	create: function() {
		this.inherited(arguments);
		this.data = conf.getURLs();
		var confPopup = this.$.conf;
		window.addEventListener("load", function(){
			if(!conf.isConfigured()) confPopup.openAtCenter();
		}, false);
	}
});

