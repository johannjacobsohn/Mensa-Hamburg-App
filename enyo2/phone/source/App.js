/*
 *
 * - @FIXMEs
 * - nicht über die möglichen Tage hinaus
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
			{name: "spinner", tag: "img", src: "img/spinner.gif", showing: false, classes: "search-spinner"},
			{name: "loadingMessage", classes: "loading-message", content: "Wird geladen...", showing: false},


			{kind: "onyx.Toolbar", name:"menuHeader", components: [
				{kind: "FittableColumns", style:"width: 100%; margin: 0px", components: [
					{kind: "onyx.IconButton", style: "height: 32px;", src: "img/menu-icon-back.png", ontap: "yesterday", name: "yesterdayControl"},
					{content: "", name: "mainHeader", fit: true, ontap: "today", style:"text-align: center;"},
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
					{kind: "Select", style:"padding: 3%; display:block; width: 100%;", onchange: "setPrices", selected: conf.displayStudentPrices() ? 0 : 1, components: [
						{content: "Studentenpreise anzeigen", value: true},
						{content: "Normale Preise anzeigen", value: false}
					]},
					{kind: "Scroller", fit: true, components: [
						{name: "availableMensen", kind: "Repeater", onSetupItem: "setupAllMensaRows", components: [
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
					{name: "preserveFilters", kind: "toggleItem", onclick : "changePreserveFilters",  onSetupItem: "setupNameRow"},
					{kind: "Scroller", fit: true, components: [
						{kind: "onyx.Groupbox", components: [
							{kind: "onyx.GroupboxHeader", content: "Nach Gericht filtern"},
							{name: "nameFilter", kind: "Repeater", onSetupItem: "setupNameRow", components: [
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
							{name: "mensaFilter", kind: "Repeater", onSetupItem: "setupMensaRow", components: [
								{kind: "toggleItem", classes: "item enyo-border-box"}
							]}
						]},
					]},
					{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "applyFilters"},
				]
			},

			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.IconButton", name: "menuButton",     style: "width: 25%;height: 32px;", src: "img/menu.png",     ontap: "menuView", classes: "navButton active"},
				{kind: "onyx.IconButton", name: "settingsButton", style: "width: 25%;height: 32px;", src: "img/settings.png", ontap: "settings", classes: "navButton"},
				{kind: "onyx.IconButton", name: "filterButton",   style: "width: 25%;height: 32px;", src: "img/filter.png",   ontap: "filter"  , classes: "navButton"},
				{kind: "onyx.IconButton", name: "infoButton",     style: "width: 25%;height: 32px;", src: "img/info.png",     ontap: "info"    , classes: "navButton"}
			]}
		]},
		{
			name: "popup",
			kind: "onyx.Popup",
			centered: true,
			modal: true,
			floating: true,
			style : "margin: 10px",
			content: info.notConfText
		}
	],

	/**
	 *
	 * (cached) values
	 *
	 */

	menu : [],

	cache : {
		name            : [],
		mensa           : [],
		availableMensen : conf.getMensaInfo(),
	},

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
		var i = inEvent.index, r = this.cache.mensa[i];
		inEvent.item.$.toggleItem.setItem(r.active, r.name || r.label);
	},
	setupAllMensaRows: function(inSender, inEvent) {
		var i = inEvent.index, r = this.cache.availableMensen[i];
		inEvent.item.$.toggleItem.setItem(r.active, r.name || r.label);
	},
	setupNameRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.cache.name[i];
		inEvent.item.$.toggleItem.setItem(r.active, r.label);
	},
	changePreserveFilters : function(inSender){
		storage.setPersistentFilters( inSender.$.toggle.getValue() );
	},
	applyFilters : function(){
		this.setFilter("name").setFilter("mensa").openPage("menu");
	},

	setFilter : function(type){
		var items = this.$[type + "Filter"].children;
		var l = items.length;
		var filters = [];
		var itm;
		var active;

		for( var i = 0; i<l; i++ ){
			itm = items[i].children[0].children[0];
			active = itm.children[0].getValue();

			this.cache[type][i].active = active;

			if( active ){
				filters.push( itm.children[1].content );
			}
		}

		if(filters.length === 0 || filters.length === l){
			storage.unsetFilter(type);
		} else {
			storage.setFilter(type, filters);
		}
		return this;
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
	showloadingMessage : function(bool){
		var msgs = [
			"Bin dabei...",
			"Kommt gleich...",
			"abwarten...",
			"wird geladen...",
			"Eile mit Weile..."
		];

		if(bool){
			this.$.menu.setCount(0);
			this.$.menu.render();
			this.$.loadingMessage.content = msgs[ Math.round( Math.random() * (msgs.length-1) ) ];
			this.$.loadingMessage.render();
		}
		this.$.loadingMessage.setShowing(bool)
	},
	showloadingSpinner : function(bool){
		this.$.spinner.setShowing(bool);
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
		var that = this;
		this.loading(true);

		setTimeout(function(){
			storage[type](function(json, dateStr, date){
				that.menu = json;
				that.$.menu.setCount(json.length);
				that.$.menu.render();

				that.setHeader(dateToString(dateStr));
				that.loading(false);
				if(callback) callback();
			});
		}, 1);
	},

	filter : function(inCaller) {
		var that = this;

		this.$.preserveFilters.setItem( storage.getPersistentFilters(), "Filter permanent")

		// Set mensa filter
		storage.getMensaInfo(function(mensen){
			var allActive = mensen.filter(function(item){return item.filtered}).length === 0;

			that.cache.mensa = [ {label: "Alle", active: allActive} ];
			
			mensen.forEach(function(mensa){
				that.cache.mensa.push({label: mensa.name, active: mensa.filtered || allActive})
			});

			that.$.mensaFilter.setCount(that.cache.mensa.length);
		});

		// set name filter
		storage.getTypeInfo(function(names){
			var allActive = names.filter(function(item){return item.filtered}).length === 0;

			that.cache.name = [{label: "Alle", active: allActive}];

			names.forEach(function(name){
				that.cache.name.push({label: name.name, active: name.filtered || allActive});
			});

			that.$.nameFilter.setCount(that.cache.name.length);
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
		conf.setStudentPrices(me.children[me.selected].value);
	},
	settings : function() {
		this.$.availableMensen.setCount(this.cache.availableMensen.length);
		this.openPage("settings");
	},
	openPage : function(activePage){
		var pages = ["settings", "info", "menu", "filter"];
		var that = this;
		pages.forEach(function(page){
			if(page === activePage){
				that.$[page].setShowing( true );
				that.$[page + "Header"] && that.$[page + "Header"].setShowing( true ); // @TODO: Remove
				that.$[page + "Button"].addClass("active");
			} else {
				that.$[page].setShowing( false );
				that.$[page + "Header"] && that.$[page + "Header"].setShowing( false ); // @TODO: Remove
				that.$[page + "Button"].removeClass("active");
			}
		});

		this.render();
	},
	saveMensen : function(me){
		var that = this,
			array = [],
			items = document.getElementById("app_availableMensen").getElementsByClassName("enyo-checkbox");	// @TODO: Buggy - not enyo-like
		Array.prototype.forEach.call(items, function(item, index){
			if(item.checked){
				array.push(that.cache.availableMensen[index].name)
			}
		});

		// Save URLs
		conf.setURLs(array);
		this.cache.availableMensen = conf.getMensaInfo();

		// Reload Data
		storage.cleanData();

		// Rerender Menu
		this.display("thisDay");
		this.openPage("menu");
	},

	showNotConfigured : function(){
		var popup = this.$.popup;
		popup.show();
		popup.applyStyle("left", 0);
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
		this.$.price.setContent( (conf.displayStudentPrices() ? item.studPrice : item.normalPrice) + "€" );
		this.$.dish.setContent ( item.dish );
		this.$.mensa.setContent( item.mensa );
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
		var l = this.parent.parent.children.length;

		// @FIXME: Wahnsinn: 
		try{
			if( this.$.label.getContent( ) === "Alle" ){
				for (var i=1; i<l; i++){
					this.parent.parent.children[i].children[0].children[0].children[0].setValue( true )
				}
			} else if( this.parent.parent.children[0].children[0].children[0].children[1].getContent() === "Alle" ){
				this.parent.parent.children[0].children[0].children[0].children[0].setValue( false )
			}
		} catch(e) {}
	}
});
