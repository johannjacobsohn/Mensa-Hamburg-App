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
				{kind: "onyx.Button", content: "Zur Projektseite", style:"width: 100%; margin-bottom: .5em", onclick: "moreInfo"},
				{kind: "onyx.Button", content: "Email schreiben", style:"width: 100%; margin-bottom: .5em", onclick: "email"},
				{kind: "onyx.Button", content: "App zurücksetzen", style:"width: 100%; margin-bottom: .5em", classes: "onyx-negative", onclick: "reset"},
			]
		}
	],
	moreInfo : function(me, inEvent){
		location.href = info.appURL;
	},
	email : function(me, inEvent){
		location.href = "mailto:" + info.appEmail + "?subject=Mensa%20Hamburg%20App&body=Moin!" ;
	},
	reset : function(inSender, inEvent){
		data.clear();
		location.reload();
	},
//	create : function(){
//		this.inherited(arguments);
//	},
	load: function(){}
});
