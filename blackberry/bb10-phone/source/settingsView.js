/**
 * Einstellungen
 *
 */
enyo.kind({
	name: "settingsView",
	kind: "Scroller",
	strategyKind: "TransitionScrollStrategy",
	components: [
		{kind: "bbUI.Select", name: "price", label: "Preise", selected: 0, onChange: "changePrice", components: [
			{kind: "bbUI.Option", content: "Studentenpreise anzeigen", accentText: "Subcaption", value: true},
			{kind: "bbUI.Option", content: "Normale Preise anzeigen", accentText: "Subcaption", value: false}
		]},
		//~ {kind: "bbUI.Select", name: "lang", label: "Sprache", selected: 0, onChange: "changePrice", components: [
			//~ {kind: "bbUI.Option", content: "English", accentText: "Subcaption", value: true},
			//~ {kind: "bbUI.Option", content: "Deutsch", accentText: "Subcaption", value: false}
		//~ ]},
		{name: "mensaList", kind: "Repeater", classes: "enyo-unselectable preventDragTap", onSetupItem: "setupRow", components: [
			{kind: "bbUI.ToggleButton", mensa: "", onChange: "changeMensa", style: "float: left; clear: left;"},
			{style: "float: left; height: 95px; padding-top: 12px; overflow: hidden; width: 60%", ontap: "check", components: [
				{name: "mensa", style: "line-height: 44px;"},
				{name: "address", style: "line-height: 25px;font-size: 25px; color: #bbb;"}
			]}
		]}
	],
	check: function(){},
	changePrice: function(inSender, inEvent){
		conf.setStudentPrices( inEvent.selected.value );
		enyo.Signals.send("onSettingsChange");
		return true;
	},
	changeMensa: function(inSender, inEvent){
		var label = inEvent.originator.mensa;
		this.savedMensen = this.savedMensen.filter(function(item){ return label !== item; });
		if( inEvent.value && label ){
			this.savedMensen.push( label );
		}
		this.saveMensen();
		return true;
	},
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.availableMensen[i], item = inEvent.item.$;
		item.toggleButton.setValue(r.active);
		item.toggleButton.mensa = r.name;
		item.mensa.content = r.name;
		item.mensa.content = r.name;
		item.address.content = r.address;
	},
	saveMensen : function(){
		if(JSON.stringify(this.savedMensen) !== JSON.stringify(conf.getSavedURLs())){
			// Save URLs
			conf.setURLs(this.savedMensen);

			// Reload Data
			storage.cleanData();

			enyo.Signals.send("onSettingsChange");
		}
	},
	/**
	 * (cached) values
	 */
	savedMensen     : conf.getSavedURLs(),
	availableMensen : storage.getMensaInfo(),
	loaded: false,
	create: function(){
		this.inherited(arguments);
		//~ if(!this.loaded){
		this.loaded = true;
		this.$.mensaList.setCount(this.availableMensen.length);
			//~ this.$.price.setValue( conf.displayStudentPrices() );
		//~ }
	}
});

