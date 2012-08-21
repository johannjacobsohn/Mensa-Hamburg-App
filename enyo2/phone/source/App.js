/*
 * - @FIXMEs
 * - Dokumentation
 * - Strings auslagern
 * - Performancetests
 * - header iPhone
 * - manchmal im iPhone nicht korrekt geladen
 */

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

if(enyo.platform.webos) {
	window.PalmSystem.stageReady();
}

// startup
window.addEventListener("load", function(){
	var mensaApp = new App().renderInto(document.body);

	if(!conf.isConfigured()){
		enyo.Signals.send("onRequestOpen", { page: "settings" })

		mensaApp.showNotConfigured();
	}
}, false);


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
				{kind: "onyx.IconButton", name: "menuButton",     src: "img/menu.png",     ontap: "openView", target: "menu"    , style: "width: 25%", classes: "navButton active"},
				{kind: "onyx.IconButton", name: "settingsButton", src: "img/settings.png", ontap: "openView", target: "settings", style: "width: 25%", classes: "navButton"},
				{kind: "onyx.IconButton", name: "filterButton",   src: "img/filter.png",   ontap: "openView", target: "filter"  , style: "width: 25%", classes: "navButton"},
				{kind: "onyx.IconButton", name: "infoButton",     src: "img/info.png",     ontap: "openView", target: "info"    , style: "width: 25%", classes: "navButton"}
			]}
		]},
		{
			name: "popup",
			kind: "onyx.Popup",
			centered: true,
			modal: true,
			floating: true,
			style : "margin: 10px",
			content: info.notConfText
		},
		{ kind: enyo.Signals, onRequestMenu: "openMenu", onRequestOpen: "open"}
	],
	open: function( inSender, payload ){
		this.openPage( payload.page );
	},
	openMenu: function(){
		this.setActiveButton( this.$.menuButton )
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
		this.setActiveButton(inEvent.originator);
		this.openPage(inEvent.originator.target);
	},
	pages : [ "menu", "settings", "filter", "info"],
	openPage : function(activePage){
		var index = this.pages.indexOf(activePage);
		this.$.panels.setIndex(index);
		console.log(this.$, activePage)
		this.$[activePage].load();
	},
	showNotConfigured : function(){
		var popup = this.$.popup;
		popup.show();
		popup.applyStyle("left", 0);
	}
});
