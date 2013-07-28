/**
 * Weitere Informationen
 *
 */
enyo.kind({
	name: "infoView",
	kind: "Scroller",
	strategyKind: "TransitionScrollStrategy",
	style: "height: 100%;",
	components: [
		{style:"text-align: center; font-size: 2em;",content: info.appName },
		{style:"margin: 1em;", content: info.appDesc},
		{kind: "bbUI.Button", content: "Zur Projektseite", style:"width: 95%; margin: .5em auto; display: block;", onclick: "moreInfo"},
		{kind: "bbUI.Button", content: "Email an die Entwickler schreiben", style:"width: 95%; margin: .5em auto; display: block;", onclick: "email"},
		{kind: "bbUI.Button", content: "App zurücksetzen", style:"width: 95%; margin: .5em auto; display: block;", classes: "onyx-negative", onclick: "reset"}
	],
	moreInfo : function(inSender, inEvent){
		if (enyo.platform.blackberry) {
			window.open(info.appURL);
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
