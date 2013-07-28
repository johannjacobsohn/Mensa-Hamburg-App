/*
 * - Dokumentation
 * - Strings auslagern
 */

// startup
var mensaApp;
document.addEventListener("webworksready", function(e) {
	mensaApp = new App().renderInto(document.body);
}, false);

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

enyo.kind({
	name: "App",
	components: [
		{kind: "bbUI.Init", controlsDark: true, listsDark: false},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{fit: true, components: [
				{name: "menu", kind: "menuView", style: "height: 100%"},
				{name: "settings", kind: "settingsView", style: "height: 100%", showing: false},
				{name: "filter", kind: "filterView", style: "height: 100%", showing: false},
				{name: "info", kind: "infoView", style: "height: 100%", showing: false}
			]},
			{kind: "bbUI.ActionBar", name: "toolbar", components: [
				{kind: "bbUI.Action", type: "tab", selected: true, img: "assets/ic_info.png", caption: "Menu", ontap: "switchtap"},
				{kind: "bbUI.Action", type: "tab", img: "assets/ic_settings.png", caption: "Filter", ontap: "switchtap"},
				{kind: "bbUI.Action", type: "tab", img: "assets/ic_info.png", caption: "Info", ontap: "switchtap"},
				{kind: "bbUI.Action", name: "settingsTap", type: "tab", img: "assets/ic_settings.png", caption: "Settings", ontap: "switchtap"}
			]}
		]},
		{kind: "enyo.Popup", ontap: "closePopup", name: "introPopup", centered: true, modal: true, floating: true, style : "height: 100%; background: rgba(0,0,0,0.8); text-align: center; padding-top: 30%; padding: 30% 4% 0 4%; box-sizing: border-box;", components: [
			{content: info.notConfText},
			{content: "Jaja", kind: "bbUI.Button", style: "margin-top: 10px;"}
		]},
		{name: "newVersionPopup", style: "background: #eee;color: black; width: 300px", kind: "enyo.Popup", centered: true, floating: true, scrim: true, components: [
			{content: info.onUpdateTitel, classes: "popup-header"},
			{content: info.onUpdateText, classes: "popup-content"},
			{kind: "bbUI.Button", content: "Mehr Informationen zu dieser Version", ontap:"gotoNewVersion"},
			{kind: "bbUI.Button", content: "Schließen", ontap: "closePopup"}
		]}
	],
	switchtap: function(inSender){
		if(inSender.caption === "Settings"){
			this.$.menu.hide();
			this.$.info.hide();
			this.$.filter.hide();
			this.$.settings.show();
		} else if(inSender.caption === "Info"){
			this.$.menu.hide();
			this.$.info.show();
			this.$.filter.hide();
			this.$.settings.hide();
		} else if(inSender.caption === "Filter"){
			this.$.menu.hide();
			this.$.info.hide();
			this.$.filter.show();
			this.$.settings.hide();
		} else {
			this.$.menu.show();
			this.$.info.hide();
			this.$.filter.hide();
			this.$.settings.hide();

			setTimeout(this.$.menu.reflow.bind(this.$.menu), 10);
		}

		setTimeout(this.reflow.bind(this), 10);
	},
	gotoNewVersion: function(){
		if (enyo.platform.android || enyo.platform.androidChrome) {
			location.href = info.releaseNotes.androidPhone;
		} else if (enyo.platform.ios) {
			location.href = info.releaseNotes.iphone;
		}
	},
	closePopup: function(){
		this.$.introPopup.setShowing(false);
		this.$.newVersionPopup.setShowing(false);
	},
	rendered: function(){
		this.inherited( arguments );
		if(!conf.isConfigured()){
			this.$.introPopup.show();
			this.$.settingsTap.bubble("ontap");
		} else if( conf.versionHasChanged ){
			this.$.newVersionPopup.setShowing(true);
			this.$.newVersionPopup.reflow();
		}
	}
});
