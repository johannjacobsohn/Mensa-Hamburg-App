/**
 *
 *
 *
 *
 */
var mensaApp;
window.addEventListener("load", function(){
	mensaApp = new App().renderInto(document.body);
});

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

enyo.kind({
	name : "App",
	components : [
		{ kind: "main" },
		{ kind: "flyout", name : "settings", components: [ {kind: "settingsView"} ], onClose: "saveSettings"},
		{ kind: "flyout", name : "info",     components: [ {kind: "infoView", style:"height: 100%;"} ]},
		
		{ name: "panelPopup", style: "background: #eee;color: black;", kind: "onyx.Popup", centered: true, floating: true, scrim: true, components: [
			{classes: "popup-header", content: "Filter wählen"},
			{kind: "GTS.ToggleBar", name: "dateToggle", label: "Datum", sublabel: "z.B. Heute und Morgen", onChange: "panelChange", type: "date"},
			{kind: "GTS.ToggleBar", name: "mensaToggle", label: "Mensa", sublabel: "z.B. Philomensa", onChange: "panelChange", type: "mensa"},
			{kind: "GTS.ToggleBar", name: "nameToggle", label: "Gericht", sublabel: "nur bestimmte Gerichte", onChange: "panelChange", type: "name"},
			{kind: "GTS.ToggleBar", name: "additivesToggle", label: "Zusatzstoffe", sublabel: "z.B. ohne Sojaerzeugnisse", onChange: "panelChange", type: "additives"},
			{kind: "GTS.ToggleBar", name: "propertiesToggle", label: "Eigenschaften", sublabel: "z.B. Vegan", onChange: "panelChange", type: "properties"},
			{kind: "onyx.Button", content: "Fertig", classes: "onyx-affirmative", ontap: "closePopup"}
		]},
		{ name: "introPopup", style: "background: #eee;color: black; width: 300px", kind: "onyx.Popup", centered: true, floating: true, scrim: true, components: [
			{content: info.notConfTitle, classes: "popup-header"},
			{content: info.notConfText, classes: "popup-content"},
			{kind: "onyx.Button", content: "Schließen", ontap: "closeIntro"}
		]},
		{ name: "newVersionPopup", style: "background: #eee;color: black; width: 300px", kind: "onyx.Popup", centered: true, floating: true, scrim: true, components: [
			{content: info.onUpdateTitel, classes: "popup-header"},
			{content: info.onUpdateText, classes: "popup-content"},
			{kind: "onyx.Button", content: "Mehr Informationen zu dieser Version", ontap:"gotoNewVersion", classes: "onyx-affirmative"},
			{kind: "onyx.Button", content: "Schließen", ontap: "closePopup"}
		]},

		{ kind: enyo.Signals, onChangePanels: "changePanels", onRequestSettings: "openSettings", onRequestInfo: "openInfo", onSettingsChange: "closeSettings"}
	],
	gotoNewVersion: function(){
		if(enyo.platform.webos) {
			location.href = "http://johannjacobsohn.github.com/Mensa-Hamburg-App/blog/2012/neue-version-furs-hp-touchpad/";
		}
	},
	saveSettings: function(){
		this.$.settingsView.saveMensen();
	},
	//@TODO: move to main.js
	panelChange : function(inSender, inEvent){
		var activePanels = enyo.clone(this.$.main.getActivePanels());
		activePanels[inSender.type] = inEvent.value;
		this.$.main.setActivePanels( activePanels );
		return true;
	},
	//@TODO: move to main.js
	changePanels: function(){
		this.$.panelPopup.setShowing(true);
	},
	closeIntro: function(){
		this.closePopup();
		setTimeout(this.openSettings.bind(this), 100);
	},
	closePopup: function(){
		this.$.panelPopup.setShowing(false);
		this.$.introPopup.setShowing(false);
		this.$.newVersionPopup.setShowing(false);
	},
	openSettings: function(){
		this.$.settings.toggle();
		this.$.settingsView.load();
	},
	closeSettings: function(){
		this.$.settings.hide();
	},
	openInfo: function(){
		this.$.info.toggle();
	},
	create: function(){
		this.inherited( arguments );

		//@TODO: move to main.js
		var name, activePanels = this.$.main.getActivePanels();
		for( name in activePanels ){
			if( activePanels.hasOwnProperty(name) ){
				this.$[name+"Toggle"].value = activePanels[name];
			}
		}

	},
	rendered: function(){
		this.inherited( arguments );
		
		if(!conf.isConfigured()){
			this.$.introPopup.setShowing(true);
		}
		if( conf.versionHasChanged ){
			this.$.newVersionPopup.setShowing(true);
			this.$.newVersionPopup.reflow();
		}
		
		setTimeout( this.reloadDateFilter.bind(this), this.dateTimeout );
		
		if(enyo.platform.webos) {
			window.PalmSystem.stageReady();
		}
	},
	dateTimeout : 1000 * 60 * 10, // reload date filter every 10 minutes
	reloadDateFilter: function(){
		this.$.main.$.date.load();
		setTimeout( this.reloadDateFilter.bind(this), this.dateTimeout );
	}
});
