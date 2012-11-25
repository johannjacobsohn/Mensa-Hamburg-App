/**
 * Menu view
 *
 * @kind menuView
 */
enyo.kind({
	name: "menuView",
	fit: true,
	components: [
		{ name: "carousel", kind: "newness.Carousel", onGetLeft: "getLeft", onGetRight: "getRight", onTransitionFinish: "transitionFinish", style: "height: 100%;"},
		{ kind: enyo.Signals, onGoToToday: "today", onGoToYesterday: "yesterday", onGoToTomorrow: "tomorrow"}
	],
	menu : [],
	date : +(new Date()),
	availableDates : storage.getAvailableDates( true ),
	dateIsAvailable: function(index){
		return index >= 0 && index < 10;
	},
	getView: function(inIndex) {
		return { kind: "menuPanel", index: inIndex, dateString: this.availableDates[inIndex] };
	},
	getLeft: function(inSender, inEvent) {
		var oldIndex = this.index;
		if(inEvent.snap) { this.index--; }
		if( !this.dateIsAvailable(this.index - 1) ){
			this.index = oldIndex;
			return false;
		}
		this.$.carousel.newView( inEvent.originator, this.getView( this.index - 1 ) );
		return true;
	},
	getRight: function(inSender, inEvent) {
		var oldIndex = this.index;
		if(inEvent.snap) { this.index++; }
		if( !this.dateIsAvailable(this.index + 1) ){
			this.index = oldIndex;
			return false;
		}
		this.$.carousel.newView( inEvent.originator, this.getView( this.index + 1 ) );
		return true;
	},
	today : function(inSender, inEvent) {
		var today = new Date();
		if( today.getDay() === 6 ){ // saturday => monday - 2 days
			today = new Date( today.valueOf() + 2 * 1000 * 60 * 60 * 24);
		}
		if( today.getDay() === 0 ){ // sunday => monday - 1 day
			today = new Date( today.valueOf() + 1 * 1000 * 60 * 60 * 24);
		}
		today = storage.dateToDateString( today );
		this.index = this.availableDates.indexOf( today );
		this.$.carousel.setCenterView(this.getView(this.index));
	},
	yesterday : function() {
		this.$.carousel.previous();
		return true;
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
 * menuPanel
 * 
 * @kind menuPanel
 */
enyo.kind({
	name: "menuPanel",
	classes: "menuList",
	kind: "FittableRows",
	style: "height: 100%;",
	components: [
		{kind: "onyx.Toolbar", name: "menuHeader", classes: "header", components: [
			{kind: "FittableColumns", style:"width: 100%; margin: 0px", components: [
				{kind: "onyx.IconButton", style: "height: 32px;", src: "assets/menu-icon-back.png", ontap: "yesterday", name: "yesterdayControl"},
				{content: "", name: "header", fit: true, ontap: "today", style:"text-align: center; line-height: 32px"}, //@TODO -> CSS!
				{kind: "onyx.IconButton", style:"height: 32px;", src: "assets/menu-icon-forward.png", ontap: "tomorrow", name: "tomorrowControl"}
			]}
		]},
		{kind: "menuList"}
	],
	setHeader: function(){
		this.$.header.setContent( formatDate( this.date ) );
		this.$.yesterdayControl.setShowing(storage.isPrevDayAvailable());
		this.$.tomorrowControl.setShowing(storage.isNextDayAvailable());
//		this.$.header.render();
	},
	today: function(){
		enyo.Signals.send("onGoToToday");
	},
	yesterday: function(){
		enyo.Signals.send("onGoToYesterday");
	},
	tomorrow: function(){
		enyo.Signals.send("onGoToTomorrow");
	},
	create : function(type, callback){
		this.inherited(arguments);
		this.load();
	},
	load: function(){
		this.date = storage.dateStringToDate(this.dateString);
		this.$.menuList.setLoading(true);
		storage.day(this.date, true, function(json, dateStr){
			this.$.menuList.menu = json;
			this.$.menuList.load();
		}.bind(this));
		this.setHeader();
	}
});

