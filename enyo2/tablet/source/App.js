/**
 *
 *
 *
 *
 */
 
window.addEventListener("load", function(){
	mensaApp = new App().renderInto(document.body);
});

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

if(enyo.platform.webos) {
	window.PalmSystem.stageReady();
}

enyo.kind({
	name : "App",
	components : [
		{ kind: "panels" },
		{ kind: flyout, name : "settings", top: 100 },
//		{ kind: flyout, name : "settings", top: 150 },
//		{ kind: flyout, name : "settings", top: 200 }
	],
	create : function(){
		this.inherited(arguments);
	}
});

enyo.kind({
	name : "panels",
	kind : "Panels",
	style: "width: 100%; height: 100%;",
	classes: "app enyo-unselectable",
	arrangerKind: "CollapsingArranger",
	realtimeFit: true,
	handlers : {
		load : "load"
	},
	components : [
		{ kind: filterPanel, name : "datePanel",     type: "date",       title : "Datum"         },
		{ kind: filterPanel, name : "mensaPanel",    type: "mensa",      title : "Mensa"         },
		{ kind: filterPanel, name : "namePanel",     type: "name",       title : "Gericht"       },
		{ kind: filterPanel, name : "additivePanel", type: "additives",  title : "Zusatzstoffe"  },
		{ kind: filterPanel, name : "propertyPanel", type: "properties", title : "Eigenschaften" },
		{ kind: menuPanel,   name : "menuPanel",                         title : "Menü"          },
//		{ kind: flyout, name : "settings" },
//		{ kind: flyout, name : "panels" },
//		{ kind: flyout, name : "info" }
	],
	create : function(){
		this.inherited(arguments);
	},
	load : function(){
		console.log("load")
	}
});
