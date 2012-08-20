/**
 * Einstellungen
 *
 */
enyo.kind({
	name: "settingsView",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", content: "Einstellungen" },
		{kind: "settingsList", fit: true}
	],
	load: function(){
		this.$.settingsList.load();
	},
	create : function(){
		this.inherited(arguments);
	}
});


enyo.kind({
	name: "settingsMensaItem",
	content: "Item"
});

enyo.kind({
	name: "settingsList",
	kind: "FittableRows",
	components: [
		{kind: "Scroller", fit: true, components: [
			{kind: "onyx.PickerDecorator", components: [
				{},
				{kind: "onyx.Picker",  components: [
					{content: "Studentenpreise anzeigen", active: true},
					{content: "Normale Preise anzeigen", active: false}
				]}
			]},
			{name: "mensaList", kind: "Repeater", classes: "enyo-unselectable preventDragTap", onSetupItem: "setupRow", components: [
				{kind: "GTS.ToggleBar", label: "jes", name:"toggleItem", classes: "item enyo-border-box", onChange: "changeMensa"}
			]}
		]},
		{kind: "onyx.Button", content: "Speichern", style:"width: 100%;", classes: "onyx-affirmative", ontap: "saveMensen"}
	],
	changeMensa: function(inSender, inEvent){
		var o = inEvent.originator;
		this.savedMensen = this.savedMensen.filter(function(item){ return o.l !== item; });
		if( inEvent.value && o.label){
			this.savedMensen.push( o.label );
		}
		return true;
	},
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.availableMensen[i];
		console.log(this.mensaInfo[i].active)
		inEvent.item.$.toggleItem.label = r.name;
		inEvent.item.$.toggleItem.value = this.mensaInfo[i].active;
		inEvent.item.$.toggleItem.sublabel = r.address;
		inEvent.item.$.toggleItem.render();
	},
	saveMensen : function(me){
		// Save URLs
		conf.setURLs(this.savedMensen);
		this.availableMensen = conf.getMensaInfo();

		// Reload Data
		storage.cleanData();

		enyo.Signals.send("onRequestMenu");
	},
	/**
	 * (cached) values
	 */
	savedMensen     : conf.getSavedURLs(),
	mensaInfo     : conf.getMensaInfo(),
	availableMensen : urls.mensen,
	setPrices : function(me){
		conf.setStudentPrices(me.children[me.selected].value);
	},
	load: function(){ },
	create : function(){
		this.inherited(arguments);
		this.$.mensaList.setCount(this.availableMensen.length);
	}
});

