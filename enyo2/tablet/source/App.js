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
		{ kind: "MainView" },
		{ kind: "flyout", name: "settings", components: [ {kind: "settingsView"} ], onClose: "saveSettings"},
		{ kind: "flyout", name: "info",     components: [ {kind: "infoView", style:"height: 100%;"} ]},
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

		{ kind: enyo.Signals, onRequestSettings: "openSettings", onRequestInfo: "openInfo", onSettingsChange: "closeSettings"}
	],
	gotoNewVersion: function(){
		if(enyo.platform.webos) {
			location.href = info.releaseNotes.touchpad;
		} else if (enyo.platform.android || enyo.platform.androidChrome) {
			location.href = info.releaseNotes.androidTablet;
		} else if (enyo.platform.chrome) {
			location.href = info.releaseNotes.chrome;
		} else if (enyo.platform.ios) {	
			location.href = info.releaseNotes.ipad;
// touchpad?
//		} else if (enyo.platform.android) {
//			location.href = "";
// win8?
		}
		else if (typeof blackberry !== 'undefined') {
			var args = new blackberry.invoke.BrowserArguments(info.releaseNotes.playbook);
			blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
		}
	},
	saveSettings: function(){
		this.$.settingsView.saveMensen();
	},
	closeIntro: function(){
		this.closePopup();
		setTimeout(this.openSettings.bind(this), 100);
	},
	closePopup: function(){
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
