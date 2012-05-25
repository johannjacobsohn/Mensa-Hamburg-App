/*
 *
 * RC:
 * - Icons aktiv zeigen wenn in Seite gewechselt
 * - nichts zeigen während Wartemessage
 * - nicht über die möglichen Tage hinaus
 * - Header schmaler
 * - @FIXMEs
 * - Filter speichern
 * 
 * - Dokumentation
 * - Strings auslagern
 * - Ziel: 400 Z inkl. Doku
 * - Unit-Tests
 * - Performancetests
 *
 */

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

enyo.kind({
	name: "App",
	kind: "Control",
	components: [
		{kind: "FittableRows", style: "height: 100%", components: [

			/**
			 *
			 *
			 *
			 *
			 * Menuansicht
			 *
			 */
//			{name: "spinner", tag: "img", src: "img/spinner.gif", showing: false, classes: "search-spinner"},
			{name: "emptyMessage", classes: "empty-message", content: "Heute kein Essen", showing: false},
			{name: "loadingMessage", classes: "loading-message", content: "Wird geladen...", showing: false},


			{kind: "onyx.Toolbar", name:"menuHeader", components: [
				{kind: "FittableColumns", style:"width: 100%; margin: 0px", components: [
					{kind: "onyx.IconButton", style: "height: 32px;", src: "img/menu-icon-back.png", ontap: "yesterday", name: "yesterdayControl"},
					{content: "Header", name: "mainHeader", fit: true, ontap: "today", style:"text-align: center;"},
					{kind: "onyx.IconButton", style:"height: 32px;", src: "img/menu-icon-forward.png", ontap: "tomorrow", name: "tomorrowControl"}
				]}
			]},

			{
				kind: "List",
				fit: true,
				classes: "enyo-unselectable preventDragTap",
				name: "menu",
				onSetupItem: "setupRow",
				components: [
					{name: "divider", classes: "divider"},
					{name: "item", kind: "menuItem", classes: "item enyo-border-box"}
				]
			},

			/**
			 *
			 *
			 *
			 *
			 * Weitere Informationen
			 *
			 */
			{
				name: "info",
				showing : false,
				fit: true,
				kind: "FittableRows",
				components: [
					{kind: "onyx.Toolbar", components: [
						{kind: "FittableColumns", style:"width: 100%;", components: [
							{ content: info.appName }
						]}
					]},
					{
						kind: "Scroller",
						fit: true,
						components : [
							// @FIXME
							{ style:"margin: 1em;", content: info.appDesc },
							{components: [
								{kind: "onyx.Button", content: "Ok", style:"width: 100%; margin-bottom: .5em;", classes: "onyx-affirmative", onclick: "menuView"},
							]},
							{components: [
								{kind: "onyx.Button", content: "Zur Projektseite", style:"width: 100%; margin-bottom: .5em", onclick: "moreInfo"},
							]},
							{components: [
								{kind: "onyx.Button", content: "Email schreiben", style:"width: 100%; margin-bottom: .5em", onclick: "email"},
							]},
							{components: [
								{kind: "onyx.Button", content: "App zurücksetzen", style:"width: 100%; margin-bottom: .5em", classes: "onyx-negative", onclick: "reset"},
							]}
						]
					},
				]
			},
			
			/**
			 *
			 *
			 *
			 *
			 * Einstellungen
			 *
			 */
			{
				name: "settings",
				showing : false,
				kind: "FittableRows",
				fit: true,
				components: [
					{kind: "onyx.Toolbar", components: [
						{ content: "Einstellungen" },
					]},
					{kind: "Select", style:"padding: 4px; display:block;", onchange: "setPrices", selected: conf.displayStudentPrices(), components: [
						{content: "Studentenpreise anzeigen", value: true},
						{content: "Normale Preise anzeigen", value: false}
					]},
					{kind: "Scroller", fit: true, components: [
						{name: "availableMensen", kind: "Repeater", onSetupItem: "setupMensaRow", components: [
							{kind: "toggleItem", classes: "item enyo-border-box"}
						]}
					]},
					{kind: "onyx.Button", content: "Speichern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "saveMensen"}
				]
			},

			/**
			 *
			 *
			 *
			 *
			 * Filteransicht
			 *
			 */
			{
				name: "filter",
				showing : false,
				fit : true,
				kind: "FittableRows",
				components: [
					{kind: "onyx.Toolbar", components: [
						{ content: "Gerichte filtern" },
					]},
					{kind: "toggleItem", name:"preserveFilters"},
					{kind: "Scroller", fit: true, components: [
						{kind: "onyx.Groupbox", components: [
							{kind: "onyx.GroupboxHeader", content: "Nach Gericht filtern"},
							{name: "typeFilter", kind: "Repeater", onSetupItem: "setupNameRow", components: [
								{kind: "toggleItem"}
							]}
						]},
/* @TODO
						{kind: "onyx.Groupbox", components: [
							{kind: "onyx.GroupboxHeader", content: "Nach Eigenschaft filtern"},
							{name: "propFilter", items: 20, kind: "Repeater", onSetupItem: "setupNameRow", components: [
								{kind: "toggleItem", classes: "item enyo-border-box"}
							]}
						]},
*/
						{kind: "onyx.Groupbox", components: [
							{kind: "onyx.GroupboxHeader", content: "Nach Mensa filtern"},
							{name: "mensenFilter", kind: "Repeater", onSetupItem: "setupMensaRow2", components: [
								{kind: "toggleItem", classes: "item enyo-border-box"}
							]}
						]},
					]},
					{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "filterfilter"},
				]
			},

			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.IconButton", style: "width: 25%;height: 32px;", src: "img/menu.png",    ontap: "menuView" },
				{kind: "onyx.IconButton", style: "width: 25%;height: 32px;", src: "img/Gear.png",    ontap: "settings" },
				{kind: "onyx.IconButton", style: "width: 25%;height: 32px;", src: "img/filter.png",  ontap: "filter"   },
				{kind: "onyx.IconButton", style: "width: 25%;height: 32px;", src: "img/info.png",    ontap: "info"     }
			]}
		]},
		{name: "popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, components: [
			{content: info.notConfText}
		]}
	],

	/**
	 *
	 * (cached) values
	 *
	 */
	//@FIXME: neu setzen
	mensen : conf.getMensaInfo(),
	
	//@FIXME: neu setzen
	savedMensen : conf.getSavedURLs(),

	//@FIXME: bei Änderung neu setzen
	displayStudentPrices : conf.displayStudentPrices(),
	
	menu : [],

	types : [], // conf.savedTypeFilter(), //@FIXME: Speichern

	/**
	 *
	 * Eventlisteners
	 * 
	 */
	
	create: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		this.today();
	},
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.menu[i];
		if(r.type === "header"){
			this.$.divider.canGenerate = true;
			this.$.item.canGenerate = false;
			this.$.divider.setContent( r.header );
		} else {
			this.$.divider.canGenerate = false;
			this.$.item.canGenerate = true;
			this.$.item.setMenuItem(r);
		}
	},

	setupMensaRow: function(inSender, inEvent) {
		console.log("setupMensaRow")
		var i = inEvent.index, r = this.mensen[i];
		inEvent.item.$.toggleItem.setItem(r.active, r.name);
	},

	setupMensaRow2: function(inSender, inEvent) {
		console.log("setupMensaRow2")
		var i = inEvent.index, r = this.savedMensen[i];
		inEvent.item.$.toggleItem.setItem(r.active, r.label);
	},

	setupNameRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.types[i];
		inEvent.item.$.toggleItem.setItem(r.active, r.label);
	},
	saveAndFilter : function(){
		console.log("saveAndFilter")
		// @FIXME
	},
	filterfilter : function(){
		var items = this.$.typeFilter.children;
		var l = items.length;
		var filters = [];
		var itm;
		var active;
		for( var i = 0; i<l; i++ ){
			itm = items[i].children[0].children[0];
			active = itm.children[0].getValue();

			this.types[i].active = active;
			
			if( active ){
				filters.push( itm.children[1].content );
			}
		}

		if(filters.length === 0 || filters.length === l){
			storage.unsetNameFilter();
		} else {
			storage.setNameFilter(filters);
		}
		this.openPage("menu");
	},

	/**
	 *
	 * Methods
	 *
	 */

	setHeader: function(str) {
		var h = this.$.mainHeader;
		h.content = str;
		h.render();
	},

	moreInfo : function(me, inEvent){
		location.href = info.appURL;
	},
	email : function(me, inEvent){
		location.href = "mailto:" + info.appEmail;
	},
	reset : function(inSender, inEvent){
		data.clear();
		location.reload();
	},
	loading : function(bool){
//		showEmptyMessage(false);
// @FIXME 

		// Timeout, damit nur gezeigt wird wenn wir länger warten müssen
		var timeout = 100,
		    long_timeout = 1000,
		    that = this;
		if(this.timer && !bool){
			this.showloadingMessage(false);
			this.showloadingSpinner(false);
			clearTimeout(this.timer);
			clearTimeout(this.long_timer);
			delete this.timer;
			delete this.long_timer;
		} else if(bool && typeof this.timer !== "number") {
			this.timer      = setTimeout(function(){ that.showloadingMessage(true) }, timeout);
			this.long_timer = setTimeout(function(){ that.showloadingSpinner(true) }, long_timeout);
		}
	},
	showEmptyMessage : function(bool){
		this.$.emptyMessage.setShowing(bool)
	},
	showloadingMessage : function(bool){
		var msgs = [
			"Bin dabei...",
			"Kommt gleich...",
			"abwarten...",
			"wird geladen...",
			"Eile mit Weile..."
		];
		this.$.loadingMessage.content = msgs[ Math.round( Math.random() * (msgs.length-1) ) ];
		this.$.loadingMessage.render();
		this.$.loadingMessage.setShowing(bool)
	},
	showloadingSpinner : function(bool){
//		this.$.spinner.setShowing(bool);
	},
	today : function(caller) {
		this.display("today");
	},
	yesterday : function(caller) {
		caller = caller || this.$.yesterdayControl;
		caller.addClass('active');
		this.display("prevDay", function(){
			caller.removeClass('active');
		});
	},
	tomorrow : function(caller) {
		caller = caller || this.$.tomorrowControl;
		caller.addClass('active');
		this.display("nextDay", function(){
			caller.removeClass('active');
		});
	},
	display : function(type, callback){
		console.log("display", type);

		var that = this;
		this.loading(true);

		setTimeout(function(){
//			var d = new Date();
			storage[type](function(json, dateStr, date){

//				console.log("getData " + (new Date() - d));
//				console.log(json.length);
				d = new Date();
				that.menu = json;
				that.$.menu.setCount(json.length);
				that.$.menu.render();

//				console.log("displayData " + (new Date() - d));

				that.setHeader(dateToString(dateStr));
				that.loading(false);
				if(callback) callback();
			});
		}, 10);
	},

	filter : function() {
		var savedMensen  = conf.getSavedURLs(),
			that         = this,
			filterMensen = this.$.filterMensen,
			mensen = []

		this.$.preserveFilters.setItem(true, "Filter permanent")

		var l = savedMensen.length;
		for(var i=0; i<l; i++){
			mensen.push({label: savedMensen[i], active: true})
		}
		console.log ( savedMensen )

		mensen.unshift({label: "Alle", active: true})
		this.savedMensen = mensen;
		
		this.$.mensenFilter.setCount(l);

		storage.getTypes(function(types){
			var i = 0;
			var l = types.length;

			that.types = [{label: "Alle", active: true}];
			
			for( i = 0; i < l; i++ ){
				that.types.push({label: types[i], active: true});
			}

			that.$.typeFilter.setCount(l+1);
		});

		this.openPage("filter");
	},
	info : function() {
		this.openPage("info");
	},
	menuView : function() {
		this.openPage("menu");
	},
	setPrices : function(me){
		conf.setStudentPrices(me.selected)
	},
	settings : function() {
		console.log(this.$.availableMensen, this.mensen.length)
		this.$.availableMensen.setCount(this.mensen.length);
		this.openPage("settings");
	},
	openPage : function(page){
		this.$.menu.setShowing( false );
		this.$.menuHeader.setShowing( false );

		this.$.settings.setShowing( false );
		this.$.filter.setShowing( false );
		this.$.info.setShowing( false );

		this.$[page].setShowing( true );
		this.$[page + "Header"] && this.$[page + "Header"].setShowing( true );
		this.render();
	},
	saveMensen : function(me){
		var array = [],
		// @TODO: Buggy - not enyo-like
			items = document.getElementById("app_availableMensen").getElementsByClassName("enyo-checkbox"),
			i = 0,
			item,
			l = items.length;

		for(i = 0; i < l; i++){
			item = items[i];
			if(item.checked){
				array.push(this.mensen[i].name)
			}
		}

		// Save URLs
		conf.setURLs(array);
		this.mensen = conf.getMensaInfo();

		// Reload Data
		storage.cleanData();

		// Rerender Menu
		this.display("thisDay");
		this.openPage("menu");
	},

	filterByMensa : function( instance ){
		var value = instance.controls[instance.selected].content;

		if(value === "Alle"){
			storage.unsetMensaFilter()
		} else {
			storage.setMensaFilter( value )
		}

		this.openPage("menu");
		this.display("thisDay");
	},
	filterByType  : function( instance ){
		var value = instance.controls[instance.selected].content;

		if(value === "Alle"){
			storage.unsetNameFilter()
		} else {
			storage.setNameFilter( value )
		}

		this.openPage("menu");
		this.display("thisDay");
	},

	showNotConfigured : function(){
		this.$.popup.show();
	}
});


/**
 *
 * Kind für menuItems
 *
 *
 */
enyo.kind({
	name: "menuItem",
	classes : "item",
	components: [
		{name : "name",   classes : "name" },
		{name : "dish" ,  classes : "dish" },
		{name : "price",  classes : "price"},
		{name : "mensa" , classes : "mensa" },
	],
	setMenuItem: function(item) {
		
		this.removeClass("first");
		this.removeClass("last");
		if(item.first){
			this.addClass("first");
		}
		if(item.last){
			this.addClass("last");
		}
		this.$.name.setContent ( item.name );
		this.$.price.setContent( (this.displayStudentPrices ? item.studPrice : item.normalPrice) + "€" );
		this.$.dish.setContent ( item.dish );
		this.$.mensa.setContent( item.mensaName );
	}
});

/**
 *
 * Kind für toggleItems
 *
 */
enyo.kind({
	name: "toggleItem",
	classes : "item",
	components: [
		{
			kind : "FittableRows",
			ontap : "toggleItemClick",
			components : [
				{name: "toggle", kind: "onyx.Checkbox"},
				{name: "label" , fit: true, style:"display:inline;" }
			]
		}
	],
	setItem: function(value, label) {
		this.$.toggle.setValue( value );
		this.$.label.setContent( label );
	},
	toggleItemClick : function(inSender){
		this.$.toggle.setValue( !this.$.toggle.getValue() );
		
		if( this.$.label.getContent( ) === "Alle" ){
			var l = this.parent.parent.children.length;
			for (var i=1; i<l; i++){
				this.parent.parent.children[i].children[0].children[0].children[0].setValue( true )
			}
		} else if( this.parent.parent.children[0].children[0].children[0].children[1].getContent() === "Alle" ){
			this.parent.parent.children[0].children[0].children[0].children[0].setValue( false )
		}
	}
});


