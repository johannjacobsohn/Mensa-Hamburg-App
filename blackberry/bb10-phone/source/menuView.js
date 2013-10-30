/**
 * menuView
 * 
 * @kind menuView
 */
enyo.kind({
	name: "menuView",
	classes: "menuList",
	kind: "FittableRows",
	style: "height: 100%;",
	rowHeight: 120,
	change: function(){
		if(this.isJumping || !this.days || !this.menu || !this.headers){
			return true;
		}
		var row = this.$.list.getScrollTop()/this.rowHeight;
		for(var i=0; i<this.days.length; i++){
			if(this.days[i] > row+2){
				break;
			}
		}
		for(var j=0; j < this.headers.length; j++){
			if(this.headers[j] > row+1){
				break;
			}
		}
		this.currentHeaderIndex = Math.max(j-1,0);
		var item = this.menu[this.headers[ this.currentHeaderIndex ] ];
		if(item){
			var string = item.headerType === "date" ? dateToString(item.header) : item.header;
			this.$.fixedHeader.setContent(string);
			this.$.pillButtons.setSelectedIndex(i-1);
		}
		return true;
	},
	// @FIXME: onChange-Event der PillButtons
	s: function(inSender, inEvent){
		//~ this.$.list.strategyKind = "TransitionScrollStrategy";
		this.$.fixedHeader.setContent("Wiiiiiii");
		this.$.list.scrollTo(0, this.days[inSender.i] * this.rowHeight);
		this.isJumping = true;
	},
	releaseJumper: function(){
		this.isJumping = false;
		//~ this.$.list.strategyKind = "TransitionScrollStrategy";
	},
	components: [
		{kind: "bbUI.PillButtons", style: "padding: 2px!important", components: [
			{kind: "bbUI.PillButton", allowHtml: true, content: "Mo<small>22.</small>", name:"mo", i: 0, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Di<small>23.</small>", name:"di", i: 1, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Mi<small>24.</small>", name:"mi", i: 2, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Do<small>25.</small>", name:"don", i: 3, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Fr<small>26.</small>", name:"fr", i: 4, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Mo<small>29.</small>", name:"mo2", i: 5, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Di<small>30.</small>", name:"di2", i: 6, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Mi<small>31.</small>", name:"mi2", i: 7, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Do<small>1.</small>", name:"don2", i: 8, ontap: "s"},
			{kind: "bbUI.PillButton", allowHtml: true, content: "Fr<small>2.</small>", name:"fr2", i: 9, ontap: "s"}
		]},
		{name: "fixedHeader", content: "... läd ...", style: "text-align: center; position: fixed; width: 100%; font-size: 30px; background-color: rgba(0,0,0,.8);z-index: 1000; border-bottom: 1px solid #ccc;"},
		{kind: "Waiter"},
		{kind: "List", strategyKind: "TranslateScrollStrategy", translateOptimized: true, fixedHeight: true, onScrollStop: "releaseJumper", onScroll: "handleScroll", rowsPerPage: 20, fit: true, /* classes: "enyo-unselectable preventDragTap menu", */ onSetupItem: "setupRow", toggleSelected: true, components: [
			{kind: "menuItem"}
		]},
		{kind: "Signals", onkeyup: "keyup", onSettingsChange: "load"}
	],
	keyup: function(inSender, inEvent){
		// 68 = d
		// 85 = u
		// 84 = t
		// 66 = b
		// 80 = p
		// 78 = n

		// @TODO:
		// space       up
		// shift space down

		if(inEvent.keyCode === 66){ // b = bottom = end of list
			this.$.list.scrollToBottom();
		} else if(inEvent.keyCode === 84){ // t = top = start of list
			this.$.list.scrollToTop();
		} else if(inEvent.keyCode === 78){ // n = next
			this.currentHeaderIndex++;
			this.$.list.scrollTo(0, this.headers[this.currentHeaderIndex] * this.rowHeight );
		} else if(inEvent.keyCode === 80){ // p = previous
			this.currentHeaderIndex--;
			this.$.list.scrollTo(0, this.headers[this.currentHeaderIndex] * this.rowHeight );
		}
	},
	handleScroll: function(){
		if(!this.isJumping){
			enyo.job.throttle("change", enyo.bind(this, "change"), 200);
		}
	},
	setupRow: function(inSender, inEvent) {
		var i = inEvent.index, r = this.menu[i];
		r.showDetails = inEvent.selected;
		this.$.menuItem.setMenuItem(r);
		return true;
	},
	create : function(type, callback){
		this.inherited(arguments);
		this.load();
	},
	headers: [],
	days: [],
	load: function(){
		this.$.waiter.show();
		// @FIXME: bindSafely
		storage.getSortedSegmented(this.reloadList.bind(this));
	},
	reloadList: function(json, dateStr){
		for(var i = 0, l = json.length; i < l; i++){
			if(json[i].header){
				if(json[i].headerType === "date"){
					this.days.push(i);
				}
				this.headers.push(i);
			}
		}
		var today = new Date().getDay() - 1;
		if(today === -1 || today === 5){
			today = 5;
		}
		if(this.$.pillButtons.children[today].hasNode()){
			this.$.pillButtons.children[today].node.classList.add("today");
		}

		this.menu = json;
		this.$.waiter.hide();
		this.$.list.setCount(this.menu.length);
		this.$.list.refresh();

		this.$.list.setScrollTop(this.days[today] * this.rowHeight);

		this.change();
		setTimeout(this.reflow.bind(this), 10);
	}
});
