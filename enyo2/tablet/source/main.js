enyo.kind({
	name : "MainView",
	published: {
		activePanels : JSON.parse(data.get("activePanels") || "{\"date\":true,\"mensa\":true,\"name\":true,\"additives\":false,\"properties\":false}")
	},
	components: [
		{kind : "Panels", classes: "enyo-unselectable enyo-fit panels", arrangerKind: "CollapsingArranger", narrowFit: false, realtimeFit: false, peekWidth: 20, components : [
			{ kind: "filterPanel", name : "date",       filter: "date",       type : "ternary", title : "Datum"        },
			{ kind: "filterPanel", name : "mensa",      filter: "mensa",      type : "ternary", title : "Mensa"        },
			{ kind: "filterPanel", name : "name",       filter: "name",       type : "ternary", title : "Gericht"      },
			{ kind: "filterPanel", name : "additives",  filter: "additives",  type : "ternary", title : "Zusatzstoffe" },
			{ kind: "filterPanel", name : "properties", filter: "properties", type : "ternary", title : "Eigenschaften"},
			{ kind: "menuPanel" }
		]},
		{ name: "panelPopup", style: "background: #eee;color: black;", kind: "onyx.Popup", centered: true, floating: true, scrim: true, components: [
			{classes: "popup-header", content: "Filter wählen"},
			{kind: "GTS.ToggleBar", name: "dateToggle",       label: "Datum",         sublabel: "z.B. Heute und Morgen",     onChange: "panelChange", type: "date"      },
			{kind: "GTS.ToggleBar", name: "mensaToggle",      label: "Mensa",         sublabel: "z.B. Philomensa",           onChange: "panelChange", type: "mensa"     },
			{kind: "GTS.ToggleBar", name: "nameToggle",       label: "Gericht",       sublabel: "nur bestimmte Gerichte",    onChange: "panelChange", type: "name"      },
			{kind: "GTS.ToggleBar", name: "additivesToggle",  label: "Zusatzstoffe",  sublabel: "z.B. ohne Sojaerzeugnisse", onChange: "panelChange", type: "additives" },
			{kind: "GTS.ToggleBar", name: "propertiesToggle", label: "Eigenschaften", sublabel: "z.B. Vegan",                onChange: "panelChange", type: "properties"},
			{kind: "onyx.Button", content: "Fertig", classes: "onyx-affirmative", ontap: "closePopup"}
		]},
		{ kind: enyo.Signals, onChangePanels: "changePanels"}
	],
	closePopup: function(){
		this.$.panelPopup.setShowing(false);
	},
	oldactivePanels : enyo.clone(this.activePanels),
	activePanelsChanged : function(){
		for( var name in this.activePanels ){
			if( this.activePanels.hasOwnProperty(name) && this.activePanels[name] !== this.oldactivePanels[name]){
				this.$[name].setShowing( this.activePanels[name] );
				if(this.activePanels[name]){
					this.$[name].load().reflow();
				}
			}
		}

		this.$.panels.reflow();
		data.set("activePanels", JSON.stringify(this.activePanels));
		this.oldactivePanels = enyo.clone(this.activePanels);
	},
	panelChange : function(inSender, inEvent){
		this.activePanels[inSender.type] = inEvent.value;
		this.activePanelsChanged();
	},
	changePanels: function(){
		this.setPanelToggles();
		this.$.panelPopup.setShowing(true);
	},
	setPanelToggles: function(){
		var name, activePanels = this.getActivePanels();
		for( name in activePanels ){
			if( activePanels.hasOwnProperty(name) ){
				this.$[name+"Toggle"].value = activePanels[name];
			}
		}
		this.setPanelToggles = function(){};
	},
	rendered: function(){
		this.inherited( arguments );
		this.activePanelsChanged();
	}
});
