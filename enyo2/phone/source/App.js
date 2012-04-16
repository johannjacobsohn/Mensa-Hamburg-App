/*
 *
 * - Conf
 * -- Conf-Mensa-List-Höhe
 * - Aufräumen
 * -- CSS aufräumen
 * -- panel eigenen Kind
 * - initialer Aufruf - showNotConfigured
 * - Dokumentation
 * - App-Icon
 * - Icons nochmal überarbeiten
 * - Strings auslagern
 * - nicht über die möglichen Tage hinaus
 * - Ziel: 400 Z inkl. Doku
 * x Filtern
 * x Toolbars kleiner
 * x Headerinhalt (Heute, morgen, etc)
 * x Listeneinträge übersichtlicher
 * x Warteindikator in Header
 * x reset
 * x Leere Seite
 * x Wird geladen text
 */

// Should allow touch scrolling on all devices that do not have it natively.
enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();

enyo.kind({
	name: "App",
	kind: "Control",
	components: [
		{kind: "FittableRows", style: "height: 100%", components: [
			{kind: "onyx.Toolbar", components: [
				{kind: "FittableColumns", style:"width: 100%;", components: [
					{kind: "onyx.IconButton", style: "height: 32px;", src: "img/menu-icon-back.png", ontap: "yesterday"},
					{content: "Header", name: "mainHeader", fit: true, ontap: "today", style:"text-align: center;"},
					{kind: "onyx.IconButton", style:"height: 32px;", src: "img/menu-icon-forward.png", ontap: "tomorrow"}
				]}
			]},
			{name: "spinner", tag: "img", src: "img/spinner.gif", showing: false, classes: "search-spinner"},
			{name: "emptyMessage", classes: "empty-message", content: "Heute kein Essen", showing: false},
			{name: "loadingMessage", classes: "loading-message", content: "Wird geladen...", showing: false},

			{	fit: true, 
				name: "results",
				kind: "Scroller",
				horizontal: "hidden",
				classes: "list enyo-unselectable",
				ondragfinish: "preventDragTap"
			},
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.IconButton", style: "width: 33%;height: 32px;", src: "img/Gear.png", ontap: "settings"},
				{kind: "onyx.IconButton", style: "width: 33%;height: 32px;", src: "img/filter.png", ontap: "filter"},
				{kind: "onyx.IconButton", style: "width: 33%;height: 32px;", src: "img/info.png", ontap: "info"}
			]},
		]},

		{
			kind: "onyx.Slideable",
			name: "settings",
			value: -100,
			min: -100,
			max: 0,
			unit: "%",
			classes: "enyo-fit",
			preventDragPropagation: true,
			style: "width: 90%;",
			components: [
				{kind: "FittableRows", style: "height: 300px", components: [
					{kind: "onyx.Toolbar", components: [
						{ content: "Einstellungen" },
					]},
					{kind: "Select", style:"padding: 4px; display:block;", onchange: "setPrices", selected: conf.displayStudentPrices(), components: [
						{content: "Studentenpreise anzeigen", value: true},
						{content: "Normale Preise anzeigen", value: false}
					]},
					{
						kind: "Scroller",
						fit: true,
						name: "availableMensen",
						horizontal: "hidden",
						classes: "en3yo-fit l3sist en3yo-unselectable",
						ondragfinish: "preventDragTap"
					},
					{kind: "onyx.Button", content: "Speichern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "saveMensen"},
					{kind: "onyx.Grabber", style: "position: absolute; bottom: 14px; right: 14px;"}
				]}
			]
		},

		{
			kind: "onyx.Slideable",
			name: "info",
			value: -100,
			min: -100,
			max: -0,
			unit: "%",
			classes: "enyo-fit",
			style: "width: 90%;",
			preventDragPropagation: true,
			components: [
				{kind: "onyx.Toolbar", components: [
					{ content: info.appName },
				]},
				{ style:"margin: 1em;", content: info.appDesc },
				{components: [
					{kind: "onyx.Button", content: "Ok", style:"width: 100%; margin-bottom: .5em;", classes: "onyx-affirmative", onclick: "closePanel"},
				]},
				{components: [
					{kind: "onyx.Button", content: "Zur Projektseite", style:"width: 100%; margin-bottom: .5em", onclick: "moreInfo"},
				]},
				{components: [
					{kind: "onyx.Button", content: "Email schreiben", style:"width: 100%; margin-bottom: .5em", onclick: "email"},
				]},
				{components: [
					{kind: "onyx.Button", content: "App zurücksetzen", style:"width: 100%; margin-bottom: .5em", classes: "onyx-negative", onclick: "reset"},
				]},
				{kind: "onyx.Grabber", style: "position: absolute; bottom: 14px; right: 14px;"},
			]
		},

		{
			kind: "onyx.Slideable",
			name: "filter",
			value: -100,
			min: -100,
			max: -0,
			unit: "%",
			classes: "enyo-fit",
			style: "width: 90%;",
			preventDragPropagation: true,
			components: [
				{kind: "onyx.Toolbar", components: [
					{ content: "Gerichte filtern" },
				]},
				{kind: "Select", name: "filterMensen", onchange: "filterByMensa", style: "width: 100%; margin-bottom: 1em;"},
				{kind: "Select", name: "filterTypes", onchange: "filterByType", style: "width: 100%; margin-bottom: 1em;"},
				{components: [
					{kind: "onyx.Button", content: "Filtern", style:"width: 100%;", classes: "onyx-affirmative", onclick: "closePanel"},
				]},
				{kind: "onyx.Grabber", style: "position: absolute; bottom: 14px; right: 14px;"}
			]
		}
	],
	create: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		this.today();

		if(!conf.isConfigured()){
			this.showNotConfigured();
			this.settings();
		}
	},
	closePanel: function(me, e){
		me.container.container.animateToMin();
	},
	moreInfo : function(me, inEvent){
		location.href = info.appURL;
		me.container.container.animateToMin();
	},
	email : function(me, inEvent){
		location.href = "mailto:" + info.appEmail;
		me.container.container.animateToMin();
	},
	reset : function(inSender, inEvent){
		data.clear();
		location.reload();
	},
	loading : function(bool){
//		showEmptyMessage(false);

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
		this.$.spinner.setShowing(bool);
	},
	today : function() {
		this.display("today");
	},
	yesterday : function() {
		this.display("prevDay");
	},
	tomorrow : function() {
		this.display("nextDay");
	},
	display : function(type){
		var that = this;
		this.loading(true);

		this.$.results.destroyClientControls();
		this.$.results.render();

		setTimeout(function(){
			storage[type](function(json, dateStr, date){
				that.showResults(json);
				that.setHeader(dateToString(dateStr));
				that.loading(false);
			});
		}, 10);
	},
	
	filter : function() {
		var savedMensen = conf.getSavedURLs(),
		    that = this,
		    filterMensen = this.$.filterMensen;

		filterMensen.destroyClientControls();
		filterMensen.createComponent({content: "Alle"});
		for(i=0; i<savedMensen.length; i++){
			filterMensen.createComponent({content: savedMensen[i]});
		}
		filterMensen.render();

		storage.getTypes(function(types){
			var t = that.$.filterTypes;
			t.destroyClientControls();

			t.createComponent({content: "Alle"});
			for(i=0; i<types.length; i++){
				t.createComponent({content: types[i]});
			}
			t.render();
		});

		this.$.filter.animateToMax();
	},
	info : function() {
		this.$.info.animateToMax();
	},
	setPrices : function(me){
		conf.setStudentPrices(me.selected)
	},
	settings : function() {
		var mensen = conf.getMensaInfo(),
		    isConfigured = conf.isConfigured(),
		    component = {};
		this.$.availableMensen.destroyClientControls();

		for (var i = 0; i < mensen.length; i++){
			component = {kind: "FittableColumns", components: [
				{content: mensen[i].name, fit: true},
				{kind: "onyx.ToggleButton", onChange: "buttonToggle",  value: mensen[i].active},
			]};
			this.$.availableMensen.createComponent(component);
		}
		this.$.availableMensen.render();
		this.$.settings.animateToMax();
	},
	saveMensen : function(me){
		var array = [],
		    items = this.$.availableMensen.children[0].children[0].children;

		for(i = 0; i<items.length; i++){
			if(items[i].children[1].value){
				array.push(items[i].children[0].content)
			}
		}

		// Save URLs
		conf.setURLs(array);

		// Reload Data
		storage.cleanData();

		// Rerender Menu
		this.display("thisDay");

		// Panel schließen
		me.container.animateToMin();
	},

	filterByMensa : function( instance ){
		var value = instance.controls[instance.selected].content;

		if(value === "Alle"){
			storage.unsetMensaFilter()
		} else {
			storage.setMensaFilter( value )
		}

		this.display("thisDay");
	},
	filterByType  : function( instance ){
		var value = instance.controls[instance.selected].content;

		if(value === "Alle"){
			storage.unsetNameFilter()
		} else {
			storage.setNameFilter( value )
		}

		this.display("thisDay");
	},
	
	showResults: function(inResults) {
		var that = this;
//		setTimeout(function(){
//			var time = (new Date()).getTime();
//			var timer = [];
			var results = that.$.results,
			displayStudentPrices = conf.displayStudentPrices(),
			component = {
				attributes : {draggable: false},
				owner      : that,
				components : []
			};

			results.destroyClientControls();

			this.showEmptyMessage(inResults.length === 0);
//			timer.push( (new Date()).getTime() - time)
//			time = (new Date()).getTime();
			for (var i=0,r; r=inResults[i]; i++) {
				component.data    = r;
				if(r.type === "header"){
					component.components = [{content: r.headerType === "date" ? dateToString(r.header) : r.header}];
					component.classes = " seperator";
				} else {
					component.classes = "item";
					component.classes += r.first ? " first" : "";
					component.classes += r.last ? " last" : ""; 
					component.components = [
						{content: r.dish, classes : "dish" },
						
						{kind: "FittableColumns", style: "width: 100%",
							components : [
								{content: r.name, fit: true},
								{content: (displayStudentPrices ? r.studPrice : r.normalPrice) + "€"},
							]
						}
					]
				}
				results.createComponent(component);
			}
	//			timer.push((new Date()).getTime() - time)
	//			time = (new Date()).getTime();
				results.render();

	//			timer.push((new Date()).getTime() - time)
	//			time = (new Date()).getTime();
		//		alert(timer.join(","));
	//	},10);
	},
	
	setHeader: function(str) {
		var h = this.$.mainHeader;
		h.content = str;
		h.render();
	},

	showNotConfigured : function(){


	}

});
