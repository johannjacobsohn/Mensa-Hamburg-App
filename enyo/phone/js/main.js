enyo.kind({
	name: "main",
	kind: enyo.VFlexBox,
	components: [
		{kind: "Header", components: [
			{kind: "IconButton", icon: "images/menu-icon-back.png", onclick: "prev"},
			{content: "Header", flex: 1, style: "text-align:center"},
			{kind: "IconButton", icon: "images/menu-icon-forward.png", onclick: "next"}
		]},
		{kind: "Scroller", flex: 1, components: [{
			name: "menuList",
			flex: 1,
			peekWidth: 100,
			kind: "menuList"
		}]},
		{kind: "Toolbar", components: [
			{icon: "images/Gear.png", onclick: "openConfig"},
			{icon: "images/lab_funnel.png", onclick: "openFilter"},
			{icon: "images/info-icon.png", onclick: "openAbout"}
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
			{kind: "Button", className: "enyo-button-negative", caption: $L("App Zurücksetzen"), onclick: "reset"},
		]},

		{kind: "ModalDialog", name: "about", caption: info.appName, components:[
			{ content: info.appDesc },
			{kind: "Button", className: "enyo-button-affirmative", caption: $L("Ok"), onclick: "closePopup"},
			{kind: "Button", caption: $L("Zur Projektseite"), onclick: "moreInfo"},
			{kind: "Button", caption: $L("Email schreiben"), onclick: "email"},
		]},

		{kind: "ModalDialog", name: "filter", caption: "Zu ladene Mensen", components:[
			{kind: "Group", components: [
				{
					kind: "Picker",
					name: "mensaFilter",
					value: 0,
					label: "Nach Mensa filtern",
					items: ["Alle"],
					onChange: "filterByMensa"
				},
				{
					kind: "Picker",
					name: "typeFilter",
					label: "Nach Gericht filtern",
					value: 0,
					items: ["Alle"],
					onChange: "filterByType"
				},
			]},
			{kind: "Button", className: "enyo-button-affirmative", caption: $L("Filtern"), onclick: "filter"},
		]}
	],
	filterByMensa : function( instance, value ){
		if(value === "Alle"){
			storage.unsetMensaFilter()
		} else {
			storage.setMensaFilter( value )
		}
	},
	filterByType  : function( instance, value ){
		console.log(arguments)
		if(value === "Alle"){
			storage.unsetNameFilter()
		} else {
			storage.setNameFilter( value )
		}
	},
	filter : function(inSender, inEvent){
		var menuList = this.owner.$.main.$.menuList;
		storage.thisDay(function(json, dateStr){
			document.getElementById("main_control").innerText = dateToString(dateStr);
			menuList.data = json;
			menuList.render();
		});
		this.closePopup(inSender, inEvent);
	},
	openConfig: function(inSender, inEvent) {
		this.$.conf.openAtCenter();
	},
	openFilter: function(inSender, inEvent) {
		this.$.filter.openAtCenter();
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
		location.href = "mailto:" + info.appEmail;
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
	},
	saveConf: function(inSender, inEvent) {
		var array = [], i, controls = inSender.parent.children[0].children[1].children[1].children[0].children[0].children;
		for(i=0; i<controls.length; i++){
			if(controls[i].children[1].state){
				array.push(controls[i].children[0].content)
			}
		}

		// Save URLs
		conf.setURLs(array);

		// Reload Data
		storage.cleanData();

		// MenuList:
		var menuList = this.owner.$.main.$.menuList;
		menuList.$.spinnerLarge.show();
		storage.thisDay(function(json){
			menuList.$.spinnerLarge.hide();
			menuList.data = json;
			menuList.render();
		});

		if(this.$.mensaFilter){
			this.$.mensaFilter.setItems( ["Alle"].concat(array) );
			this.$.mensaFilter.render();
		} else {
			this.$.filter.components[0].components[0].items = ["Alle"].concat( conf.getSavedURLs() );
		}

		var that = this
		storage.getTypes(function(types){
			if(that.$.typeFilter){
				that.$.typeFilter.setItems( ["Alle"].concat(types) );
				that.$.typeFilter.render();
			} else {
				that.$.filter.components[0].components[1].items = ["Alle"].concat( types );
			}
		});

		this.closePopup(inSender, inEvent)
	},
	next: function(inSender, inEvent) {
		var menuList = this.owner.$.main.$.menuList;
			menuList.$.spinnerLarge.show();
		storage.nextDay(function(json, dateStr){
			menuList.$.spinnerLarge.hide();
			document.getElementById("main_control").innerText = dateToString(dateStr);
			menuList.data = json;
			menuList.render();
		});
	},
	prev: function(inSender, inEvent) {
		var menuList = this.owner.$.main.$.menuList;
			menuList.$.spinnerLarge.show();
		storage.prevDay(function(json, dateStr){
			menuList.$.spinnerLarge.hide();
			document.getElementById("main_control").innerText = dateToString(dateStr);
			menuList.data = json;
			menuList.render();
		});
	},

	create: function() {
		this.inherited(arguments);
		this.data = conf.getURLs();
		var confPopup = this.$.conf;
		window.addEventListener("load", function(){
			if(!conf.isConfigured()) confPopup.openAtCenter();
		}, false);

		this.$.filter.components[0].components[0].items = ["Alle"].concat( conf.getSavedURLs() );
		var that = this
		storage.getTypes(function(types){
			that.$.filter.components[0].components[1].items = ["Alle"].concat( types );
		});
	}
});
