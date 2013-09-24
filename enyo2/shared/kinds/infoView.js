/**
 * Weitere Informationen
 *
 */
enyo.kind({
	name: "infoView",
	fit: true,
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", content: info.appName },
		{
			kind: "Scroller",
			fit: true,
			components : [
				// @FIXME
				{ style:"margin: 1em;", content: info.appDesc },
				{kind: "onyx.Button", content: "Zur Projektseite", style:"width: 95%; margin: .5em auto; display: block;", onclick: "moreInfo"},
				{kind: "onyx.Button", content: "Email an die Entwickler schreiben", style:"width: 95%; margin: .5em auto; display: block;", onclick: "email"},
				{kind: "onyx.Button", content: "App zurücksetzen", style:"width: 95%; margin: .5em auto; display: block;", classes: "onyx-negative", onclick: "reset"},
				{kind: "onyx.Button", content: "Schließen", style:"width: 95%; margin: .5em auto; display: block;", classes: "onyx-affirmative", onclick: "close"}
			]
		}
	],
	close: function(){
		this.bubble("onCloseMe");
	},
	moreInfo : function(inSender, inEvent){
		if (enyo.platform.blackberry) {
			window.open(info.appURL);
		} else if (enyo.platform.android || enyo.platform.androidChrome) {
			navigator.app.loadUrl(info.appURL, { openExternal:true } );
		} else {
			location.href = info.appURL;
		}
	},
	email : function(inSender, inEvent){
		location.href = "mailto:" + info.appEmail + "?subject=Mensa%20Hamburg%20App&body=Moin!" ;
	},
	reset : function(inSender, inEvent){
		data.clear();
		location.reload();
	},
	load: function(){}
});
