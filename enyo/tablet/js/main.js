/*
 * Bootstrap
 */
window.addEventListener("load", function(){
	app = new main().renderInto(document.body);
	if(!conf.isConfigured()) app.openConfig();
});

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

			{name: "datePanel"           , type: "date",  kind:"filterPanel", title: "Tag" },
			{name: "mensaPanel" , type: "mensa", kind:"filterPanel", title: "Mensa" },
			{name: "namePanel"        , type: "name",  kind:"filterPanel", title: "Gericht" },

			{name: "right", kind:"SlidingView", flex: 1, peekWidth: 150, components: [
					{kind: "Header", components : [
						{content:"Speisekarte",  flex: 1}
					]},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "menuList",
							kind: "menuList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"},
						{content: "Mensa Hamburg", onclick: "openAbout"},
						{icon: "images/Gear.png", onclick: "openConfig"}
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
		app.$.about.close();
		app.$.conf.close();
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
		this.owner.$.main.$.mensaPanel.load(); // Mensa
		this.owner.$.main.$.namePanel.load();  // Names/Types

		this.owner.$.main.$.menuList.load();  // Menu

		this.closePopup(inSender, inEvent)
	},
	create: function() {
		this.inherited(arguments);
		this.data = conf.getURLs();
		var that = this;

		// Reload date filter every three hours
		setInterval(function(){
			that.owner.$.main.$.datePanel.load();
		}, 3 * 3600 * 1000);
	}
});
