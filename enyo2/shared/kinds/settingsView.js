/**
 * Einstellungen
 *
 */
enyo.kind({
	name: "settingsView",
	kind: "FittableRows",
	style: "height: 100%;",
	components: [
		{kind: "onyx.Toolbar", content: "Einstellungen" },

		{kind: "GTS.SelectorBar", style: "background: #eee", label: "Preise", choices: [{content: "Studentenpreise anzeigen", value: true},{content: "Normale Preise anzeigen", value: false}], name:"price", onChange: "changePrice"},
		{kind: "Scroller", fit: true, components: [	
			{name: "mensaList", kind: "Repeater", classes: "enyo-unselectable preventDragTap", onSetupItem: "setupRow", components: [
				{kind: "GTS.ToggleBar", label: "yes", name:"toggleItem", classes: "item enyo-border-box", onChange: "changeMensa"}
			]}
		]},
		{kind: "onyx.Button", content: "Speichern", style:"width: 100%;", classes: "onyx-affirmative", ontap: "saveMensen"}
	],
	changePrice: function(inSender, inEvent){
		conf.setStudentPrices( inEvent.selected.value );
		enyo.Signals.send("onDisplayPricesChange");
		return true;
	},
	changeMensa: function(inSender, inEvent){
		var label = inEvent.originator.label;
		this.savedMensen = this.savedMensen.filter(function(item){ return label !== item; });
		if( inEvent.value && label){
			this.savedMensen.push( label );
		}
		return true;
	},
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.availableMensen[i], item = inEvent.item.$.toggleItem;
		item.label    = r.name;
		item.value    = r.active;
		item.sublabel = r.address;
	},
	saveMensen : function(){
		var changed = false;
		if(JSON.stringify(this.savedMensen) !== JSON.stringify(conf.getSavedURLs())){
			// Save URLs
			conf.setURLs(this.savedMensen);

			// Reload Data
			storage.cleanData();
			
			// set changed to true so listeners to onSettingsChange can reload
			changed = true;
		}
		// send signal that we're done here
		enyo.Signals.send("onSettingsChange", {changed: changed});
	},
	/**
	 * (cached) values
	 */
	savedMensen     : conf.getSavedURLs(),
	availableMensen : storage.getMensaInfo(),
	loaded: false,
	load: function(){
		if(!this.loaded){
			this.loaded = true;
			this.$.mensaList.setCount(this.availableMensen.length);
			this.$.price.setValue( conf.displayStudentPrices() );
		}
	}
});

