/*
 * - Dokumentation
 * - Strings auslagern
 * - Performancetests
 */

// startup
var mensaApp;
window.addEventListener("load", function(){
	mensaApp = new App().renderInto(document.body);
}, false);

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

enyo.kind({
	name: "App",
	components: [
		{kind: "FittableRows", classes:"enyo-fit", components: [
			{
				kind: "Panels",
				draggable: false,
//				arrangerKind: "CardSlideInArranger", //"CardSlideInArranger", //"CollapsingArranger" "TopBottomArranger",
				name: "panels",
				fit: true,
				components: [
					{ name: "menu",     kind: "menuView" },
					{ name: "settings", kind: "settingsView" },
					{ name: "filter",   kind: "filterView"},
					{ name: "info",     kind: "infoView"}
				]
			},

			{kind: "onyx.Toolbar", name: "toolbar", components: [
				{kind: "FittableColumns",  classes: "enyo-center", style: "width: 100%; margin-left: 0;", components: [
					{ontap: "openView", classes: "navButton", target: "menu", components: [
						{kind: "onyx.IconButton", name: "menuButton",     src: "assets/menu.png", classes: "active" }
					]},
					{ontap: "openView", classes: "navButton", target: "settings", components: [
						{kind: "onyx.IconButton", name: "settingsButton", src: "assets/settings.png" }
					]},
					{ontap: "openView", classes: "navButton", target: "filter", components: [
						{kind: "onyx.IconButton", name: "filterButton",   src: "assets/filter.png"   }
					]},
					{ontap: "openView", classes: "navButton", target: "info", components: [
						{kind: "onyx.IconButton", name: "infoButton",     src: "assets/info.png"     }
					]}
					
				]}
			]}
		]},
		{ kind: "onyx.Popup", name: "introPopup", centered: true, modal: true, floating: true, style : "margin: 10px", content: info.notConfText },
		{ name: "newVersionPopup", style: "background: #eee;color: black; width: 300px", kind: "onyx.Popup", centered: true, floating: true, scrim: true, components: [
			{content: info.onUpdateTitel, classes: "popup-header"},
			{content: info.onUpdateText, classes: "popup-content"},
			{kind: "onyx.Button", content: "Mehr Informationen zu dieser Version", ontap:"gotoNewVersion", classes: "onyx-affirmative"},
			{kind: "onyx.Button", content: "Schließen", ontap: "closePopup"}
		]},
		{ kind: enyo.Signals, onSettingsChange: "openMenu", onRequestMenu: "openMenu", onRequestOpen: "open"}
	],
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
	handlers: {"onCloseMe": "openMenu"},
	open: function( inSender, payload ){
		this.openPage( payload.page );
	},
	openMenu: function(){
		this.setActiveButton( this.$.menuButton );
		this.openPage("menu");
	},
	setActiveButton: function(active){
		this.$.menuButton.removeClass("active");
		this.$.settingsButton.removeClass("active");
		this.$.filterButton.removeClass("active");
		this.$.infoButton.removeClass("active");
		active.addClass("active");
	},
	openView: function(inSender, inEvent){
		this.setActiveButton( inSender.children[0] );
		this.openPage(inSender.target);
	},
	pages : [ "menu", "settings", "filter", "info" ],
	openPage : function(activePage){
		var index = this.pages.indexOf(activePage);
		this.$.panels.setIndex(index);
		setTimeout(function(){
			this.$[activePage].load();
		}.bind(this), 1);
	},
	showNotConfigured : function(){
		var popup = this.$.popup;
		popup.show();
		popup.applyStyle("left", 0);
	},
	rendered: function(){
		this.inherited( arguments );

		if(!conf.isConfigured()){
			enyo.Signals.send("onRequestOpen", { page: "settings" });
			this.showNotConfigured();
		} else if( conf.versionHasChanged ){
			this.$.newVersionPopup.setShowing(true);
			this.$.newVersionPopup.reflow();
		}

//		document.addEventListener("deviceready", function(){
//			navigator.splashscreen.hide();
//		}, false);
	}
});
