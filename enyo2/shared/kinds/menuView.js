/**
 * Menuansicht
 *
 * @kind menuView
 */
enyo.kind({
	name: "menuView",
	fit: true,
	components: [
		{kind: "onyx.IconButton", style: "height: 32px;", src: "img/menu-icon-back.png", ontap: "yesterday", name: "yesterdayControl", style: "position: absolute;left:0;z-index: 10;"},
		{kind: "onyx.IconButton", style:"height: 32px;", src: "img/menu-icon-forward.png", ontap: "tomorrow", name: "tomorrowControl", style: "position: absolute;right:0;z-index: 10;"},

		{name: "spinner", tag: "img", src: "img/spinner.gif", showing: false, classes: "search-spinner"},
		{name: "loadingMessage", classes: "loading-message", content: "Wird geladen...", showing: false},

		{ name: "carousel", kind: "newness.Carousel", onGetLeft: "getLeft", onGetRight: "getRight", onTransitionFinish: "transitionFinish", style: "height: 100%;"},
	],
	index: 1,
	menu : [],
	date : +(new Date()),
	availableDates : storage.getAvailableDates(1),
	dateIsAvailable: function(index){
		var date = new Date( this.date + index * 1000 * 60 * 60 * 24 );
		var d = storage.dateToDateString( date );
		console.log(this.availableDates, index, this.availableDates.indexOf( d ))
		return this.availableDates.indexOf( d ) !== -1;
		return index < 3 && index > -3;
	},
	getView: function(inIndex) {
		var date = this.date + inIndex * 1000 * 60 * 60 * 24;
//		console.log(inIndex)
//		console.log( formatDate( new Date( date ) ) );
		return { kind: "menuList", index: inIndex, date: new Date( date ) };
	},
	getLeft: function(inSender, inEvent) {
		var oldIndex = this.index;
		inEvent.snap && this.index--;
		var date = new Date(this.date + this.index * 1000 * 60 * 60 * 24);
		if( date.getDay() == 1) this.index = this.index - 2

		if( !this.dateIsAvailable(this.index - 1) ){
			this.index = oldIndex;
			return false
		}
		this.$.carousel.newView( inEvent.originator, this.getView( this.index - 1 ) );
		return true;
	},
	getRight: function(inSender, inEvent) {
		var oldIndex = this.index;
		inEvent.snap && this.index++;
		var date = new Date(this.date + this.index * 1000 * 60 * 60 * 24);
		if( date.getDay() == 5) this.index = this.index + 2
		
		if( !this.dateIsAvailable(this.index + 1) ){
			this.index = oldIndex;
			return false
		}
		this.$.carousel.newView( inEvent.originator, this.getView( this.index + 1 ) );
		return true;
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
		return
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
	today : function(inSender, inEvent) {
		this.index = 0;
		this.$.carousel.setCenterView(this.getView(this.index));
	},
	yesterday : function() {
		this.$.carousel.previous();
		return true
	},
	tomorrow : function() {
		this.$.carousel.next();
		return true;
	},
	create: function() {
		this.inherited(arguments);
		this.load();
	},
	load: function(){
		this.today();
	}
});

/**
 * Menulist
 * 
 * @kind menuList
 */
enyo.kind({
	name: "menuList",
	kind: "FittableRows",
	style: "height: 100%;",
	components: [
		{kind: "onyx.Toolbar", name:"menuHeader", components: [
			{kind: "FittableColumns", style:"width: 100%; margin: 0px", components: [
				{content: "", name: "header", fit: true, ontap: "today", style:"text-align: center;"}
			]}
		]},
		{
			kind: "Scroller",
			style: "border-left: 1px solid rgba(255, 255, 255, 0.5); border-right: 1px solid rgba(0, 0, 0, 0.2);",
			fit: true,
			classes: "enyo-unselectable preventDragTap",
			components: [{
				kind: "Repeater",
				onSetupItem: "setupRow",
				name: "menu",
				components: [
					{name: "divider", classes: "divider"},
					{kind: "menuItem", classes: "item enyo-border-box"}
				]}
			],
		}
	],
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.menu[i], item = inEvent.item.$.menuItem, divider = inEvent.item.$.divider;
		if(r.type === "header"){
			item.destroy();
			divider.setContent( r.header );
		} else {
			divider.destroy();
			item.setMenuItem(r);
		}
	},
	create : function(type, callback){
		this.inherited(arguments);
		this.setHeader();
		this.load();
	},
	setHeader: function(){
		this.$.header.setContent( formatDate( this.date ) );
		this.$.header.render();
	},
	load: function(){
		var type = "day"
		var that = this;
//		this.loading(true);

//console.log(new Date(this.date));
		var dateString = storage.dateToDateString(this.date)
		console.log(dateString);
		storage.setDateFilter(dateString);
		storage[type](this.date, true, function(json, dateStr){
			that.menu = json;
			that.$.menu.setCount(json.length);
//			that.setHeader(formatDate(date));
//			that.loading(false);
		});
	
		return this;
	},
});
