enyo.kind({
	name : "main",
	kind : "Panels",
	classes: "enyo-unselectable enyo-fit panels",
	arrangerKind: "PeekCollapsingArranger",
	narrowFit: false,
//	realtimeFit: true,
	published: {
		activePanels : JSON.parse(data.get("activePanels") || '{\"date\":true,\"mensa\":true,\"name\":true,\"additives\":false,\"properties\":false}')
	},
	components : [
		{ kind: "filterPanel", name : "date",       filter: "date",       type : "ternary",  title : "Datum"         , showing: false },
		{ kind: "filterPanel", name : "mensa",      filter: "mensa",      type : "ternary",  title : "Mensa"         , showing: false },
		{ kind: "filterPanel", name : "name",       filter: "name",       type : "ternary",  title : "Gericht"       , showing: false },
		{ kind: "filterPanel", name : "additives",  filter: "additives",  type : "ternary", title : "Zusatzstoffe"  , showing: false },
		{ kind: "filterPanel", name : "properties", filter: "properties", type : "ternary", title : "Eigenschaften" , showing: false },
		{ kind: "menuPanel" }
	],
	oldactivePanels : enyo.clone(this.activePanels),
	activePanelsChanged : function(){
		var name;
		for( name in this.activePanels ){
			if( this.activePanels.hasOwnProperty(name) && this.activePanels[name] === !(this.oldactivePanels[name])){
				this.$[name].setShowing( this.activePanels[name] );
				this.$[name].load();
				this.$[name].reflow();
			}
		}
		this.reflow();
		data.set("activePanels", JSON.stringify(this.activePanels));
		this.oldactivePanels = enyo.clone(this.activePanels);
	}
}); 
