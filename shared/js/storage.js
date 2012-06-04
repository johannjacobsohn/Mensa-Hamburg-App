/**
 *
 *
 *
 *
 *
 *
 *
 * Internal data format
 * ====================
 *
 * loadedMensen{
 *     mensa1 : {
 *         week1 : {},
 *         week2 : {...}
 *     },
 *     mensa2 : {...}
 * } 
 *
 *
 * @TODO: DateFilter
 *
 *
 *
 *
 *
 *
 * @module storage
 *
 * 
 */ 
var storage = (function(){ // its a trap!
	var weekMenu         = [], // Cache
		filteredWeekMenu = [], // Cache
		isFiltered       = false,
		date = typeof debug !== "undefined" && debug ? new Date(2012, 0, 24) : new Date(), //now
		getDateStr = function(){ return dateToDateString(date) },
		week = function(){ return date.getWeek() },
		lock = [],
		loadedMensen = {},
		menuCallbackQueue = [],

		/*
		 * Filters
		 *
		 */
		 
		// Flag if filters should be remembered
		persistentFilters = data.get("persistentFilters") || true,
		
		setPersistentFilters = function(save){
			persistentFilters = save;
			data.set("persistentFilters", persistentFilters);
		},
		getPersistentFilters = function(){
			return persistentFilters;
		},

		filterProperties = {},
		filterValues = {},

		loadFilters = function(){
			/// @TODO
			if( persistentFilters ){
				filterProperties = JSON.parse( data.get("filterProperties") || "{}" );
				filterValues     = JSON.parse( data.get("filterValues")     || "{}" );
			}
		},

		saveFilters = function(){
			if( persistentFilters ){
				data.set("filterProperties", JSON.stringify(filterProperties) );
				data.set("filterValues",     JSON.stringify(filterValues)     );
			}
		},

		// do the filtering
		filter = function(callback){
			getWeekMenu(function(){
				var i = 0, prop;
				if(!isFiltered) { // skip if already filtered
					// copy weekMenu to filteredWeekMenu
					filteredWeekMenu = [];
					for(i=0; i < weekMenu.length; i++){
						filteredWeekMenu.push(weekMenu[i]);
					}

					// filter filteredWeekMenu
					for( prop in filterProperties ){
						if( filterProperties.hasOwnProperty(prop) ){
							filteredWeekMenu = filteredWeekMenu.filter( function(item){
								return filterValues[prop].indexOf( item[prop] ) !== -1;
							} );
						}
					}
					isFiltered = true;
				}

				callback(filteredWeekMenu);
			});
		},

		setFilter = function(prop, value){
			isFiltered = false;
			if(typeof value === "string") value = [value];

//			console.log(persistentFilters, filterProperties, filterValues)
			filterProperties[prop] = prop;
			filterValues[prop] = value;

			saveFilters();
		},

		unsetFilter = function(type){
			isFiltered = false;
			delete filterProperties[type];
			delete filterValues[type];
			saveFilters();
		},

		/*
		* 
		*/
		unsetFilters = function(){
			isFiltered = false;
			filterLength = {};
			filters = {};
			
			saveFilters();
		},

		/**
		 *
		 * @TODO: streamline
		 */
		getSortedSegmented = function(callback){
			filter(function(json){
				var sorted = json.sort(function(a, b){
					var mensaWeight = 0,
					    dateWeight = 0,
					    nameA = a.mensa.toLowerCase(),
					    nameB = b.mensa.toLowerCase(),
					    dateA = a.date.split("-"),
					    dateB = b.date.split("-")
					if (nameA < nameB){
						mensaWeight = -10;
					} else if (nameA > nameB) {
						mensaWeight =  10;
					}

					dateWeight = parseInt(dateA[0]) * 100
					             + parseInt(dateA[1]) * 10
					             + parseInt(dateA[2])
					             - parseInt(dateB[0])*100
					             - parseInt(dateB[1])*10
					             - parseInt(dateB[2]);

					return mensaWeight + dateWeight * 100;
				});

				var isMensaFilterSet = typeof filterValues["mensa"] !== "undefined";
				var filteredByMensenLength = isMensaFilterSet && filterValues["mensa"].length || 0;

				var isDateFilterSet = typeof filterValues["date"] !== "undefined" && filterValues["date"].length === 1;

				var segmented = [],
					mensa = "",
					date = "",
					i = 0,
					l = sorted.length,
					first = false,
					savedMensenExist = (conf.getSavedURLs()).length > 1;

				/*
				 * wenn nur eine Mensa gewählt ist sollte diese als erstes in den Headern stehen
				 */
				 if( isMensaFilterSet && filteredByMensenLength === 1 && json[0]){
					segmented.push({
						header     : json[0].mensa,
						type       : "header",
						headerType : "mensa"
					});
				}

				for( i = 0; i < l; i++ ){
					first = false;
					if(date != sorted[i].date && !isDateFilterSet){
						if( segmented.length > 0 ) {// wenn Header dann dieses und nächsten Eintrag als "First" bzw. "Last" kennzeichnen
							segmented[segmented.length - 1].last = true;
						}
						first = true;

						segmented.push({
							header     : sorted[i].date,
							type       : "header",
							headerType : "date"
						});
					}

					if(mensa != sorted[i].mensa && (!isMensaFilterSet || filteredByMensenLength !== 1) && savedMensenExist){
						// wenn Header dann dieses und nächsten Eintrag als "First" bzw. "Last" kennzeichnen
						if( segmented.length > 0 ){
							segmented[segmented.length-1].last = true;
						}
						first = true;

						segmented.push({
							header    : sorted[i].mensa,
							type      : "header",
							headerType: "mensa"
						});
					}
					sorted[i].type  = "item";
					sorted[i].first = first;
					sorted[i].last  = false;
					segmented.push(sorted[i]);
					
					mensa = sorted[i].mensa;
					date = sorted[i].date;
				}

				callback(segmented);
			});
		},

		/**
		 * Find and delete Data of urls that are not saved
		 *
		 * @param void
		 * @return this
		 */
		cleanData = function(){
			var validUrls   = conf.getSavedURLs(),
				day         = "",
				mensa       = "",
				week        = 0,
				mensaLength = 0;

			// Make sure we load the cache before we cleanup and save an empty menu
			loadCachedData();

			// filter menu
			weekMenu = weekMenu.filter(function(item){
				return validUrls.indexOf(item.mensa) !== -1;
			});

			filteredWeekMenu = filteredWeekMenu.filter(function(item){
				return validUrls.indexOf(item.mensa) !== -1;
			});

			// cleanup loadedMensen
			for(mensa in loadedMensen){
				for(week in loadedMensen[mensa]){
					mensaLength = weekMenu.filter(function(item){
						return (mensa === item.mensa && week == item.week); // intentionally week comparison, since week can be a number or a string
					}).length;

					loadedMensen[mensa][week].loaded = mensaLength > 0
				}
			}

			// unset MensaFilter
			unsetFilter("mensa");

			// sync cache
			cache();

			return this;
		},
		
		/**
		 *
		 * get weekmenu
		 *
		 * retrieves menu data for a given date
		 * 
		 * @param function
		 * @return this
		 */
		getWeekMenu = function(callback, week){
			var mensenArr = conf.getSavedURLs(),
			    mensa = "",
			    now = new Date(),
			    thisWeek = now.getWeek(),  // get this week's number
			    week = week || date.getWeek(), // get Week from date
				url = "";

			// enqueue the callback to be executed when everything has been loaded
			if(callback) { menuCallbackQueue.push(callback);}

			for(var m = 0; m<mensenArr.length; m++){
				mensa = mensenArr[m];
				loadedMensen[mensa] = loadedMensen[mensa] || {};
				// skip loading if this mensa has been already loaded, its currently loading or date is not this or next week -> there won't be any data on the server
				// @TODO: think of better way to do this

				if(!loadedMensen[mensa][week] && typeof lock[mensa] === "undefined" && ( week === thisWeek || week === thisWeek + 1 ) ){

					isFiltered = false;

					// lock execution of callback queue to prevent race conditions
					lock[mensa] = true;

					// load and parse URL with correct week number
					if(typeof debug !== "undefined" && debug){
						url = urls.mock[mensa].replace(/{{week}}/, week);
					} else {
						url = urls.mensenWeek[mensa].replace(/{{week}}/, week);
					}

					// Trigger AJAX-Call
					xhr.get(url, function(resp, additional_args){
						// parse HTML
						var day = "", oldWeekMenuLength = weekMenu.length, newWeekMenuLength = 0;

						parseMensaHTML(resp, additional_args.mensa, additional_args.week);

						// mark as cached only if new dishes where found
						newWeekMenuLength = weekMenu.length;

						if(oldWeekMenuLength < newWeekMenuLength){
							loadedMensen[additional_args.mensa][additional_args.week] = true;
						}

						// release lock
						delete lock[additional_args.mensa];
						
						// try to run callbacks
						runMenuCallbacks();
					}, function(resp, additional_args){
						console.error("xhr error");

						// release lock
						delete lock[additional_args.mensa];

						// try to run callbacks
						runMenuCallbacks();
					},
					{
						mensa : mensa,
						week : week
					}
					);
				}
			}

			runMenuCallbacks();
		},

		/**
		 * parseMensaHTML
		 *
		 * parses retrieved html from the mensa pages and returns retreaved data
		 *
		 * @param  {string} html
		 * @param  {string} mensa
		 * @param  {int}    week
		 * @return {object} fetched dishes
		 */
		parseMensaHTML = function(html, mensa, week){

			var tds, trs, dish, dishName, date, dateString, obj,
				properties = [],
				additives = [],
				imgs,
				spans,
				tempDiv = document.createElement('div');

			tempDiv.innerHTML = html.replace(/src="(.)*?"/g, '').replace(/<script(.|\s)*?\/script>/g, '');
			try{
				trs = tempDiv.getElementsByTagName("table")[0].getElementsByTagName("tr");
			} catch(e){
				return;
			}
			// extract and parse date field
			var datefield = trs[0].getElementsByTagName("th")[0].innerHTML.split("<br>")[1];
			var germanStartdate = datefield.split("-")[0].trim(); //@TODO: Test in Explorer!
			var germanStartdateArr = germanStartdate.split(".");
			var startdate = new Date(germanStartdateArr[2],(germanStartdateArr[1]-1),germanStartdateArr[0]);

			for (var j = 1; j < trs.length; j++){ // erste überspringen
				try{
					tds = trs[j].getElementsByTagName("td");
					ths = trs[j].getElementsByTagName("th");
				} catch(e){
					console.log(e);
					continue;
				}

				// Parse Dishname
				dishName = ths[0].innerText.trim();
				dishName = dishName.replace(/_+$/, ""); //remove trailing underscore

				// Parse dish
				for (var i = 0; i<=4; i++){
					// try to get p-tags which equals one dish;
					// if there aren't any there is no dish 
					try{
						p = tds[i].getElementsByTagName("p");
					} catch(e){
						console.log(e);
						continue;
					}
			
					for (var k=0; k<p.length; k++){
						// Extract Price

						// Windows Desktop Gadgets run under IE8 (at most),
						// so they dont know about getElementsByClassName
						if(p[k].getElementsByClassName){
							priceEl = p[k].getElementsByClassName("price")[0];
						} else {
							var t = p[k].getElementsByTagName("*");
							var tl = t.length;
							for(var l=0; l < tl; l++){
								if(t[l].className === "price"){
									priceEl = t[l];
									break;
								}
							}
						}
						if(priceEl){
							price = priceEl.innerHTML.replace("€","").replace(" ","").split("/");
							p[k].removeChild(priceEl); // remove price
						} else {
							// try to match the price with a regexp
							price = p[k].innerText.match(/[0-9]+,[0-9][0-9]/g) || ["0", "0"];
							price = price.length === 2 ? price : ["0", "0"];
							p[k].innerHTML = p[k].innerHTML.replace(/[0-9]+,[0-9][0-9]/g,"")// remove Price from String
						}
						studPrice = price[0].replace(/[^0-9,]/g,"");
						normalPrice = price[1].replace(/[^0-9,]/g,"");

						// Parse Properties
						properties = [];
						tempObj = {};
						imgs = p[k].getElementsByTagName("img");
						for ( l = 0; l < imgs.length; l++ ) {
							tempObj[imgs[l].title] = imgs[l].title;
						}
						
						for ( key in tempObj ) {
							properties.push({ name : key });
						}

						// Parse Additives
						additives = [];
						tempObj = {};
						spans = p[k].getElementsByTagName("span"); // no getElementsByClassName for IE
						for ( l = 0; l < spans.length; l++ ) {
							if(spans[l].className === "tooltip") {
								//additives.push({ name : spans[l].title });
								tempObj[spans[l].title] = spans[l].title;
							}
						}
						
						for ( key in tempObj ) {
							additives.push({ name : key });
						}

						// Parse out dish
						dish = p[k].innerText;
						dish = dish.replace(/&nbsp;/g, "").trim();
						dish = dish.replace(/\(([0-9.]+,?)*\)/g, ""); //remove additives

						// Figure out date
						date = new Date(startdate.valueOf() + (i) * 24 * 60 * 60 * 1000);
						dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

						if(dish !== ""){
							weekMenu.push({
								mensa       : mensa,
								week        : week,
								name        : dishName,
								dish        : dish,
								studPrice   : studPrice,
								normalPrice : normalPrice,
								date        : dateString,
								properties  : properties,
								additives   : additives
							});
						}
					}
				}
			}
		},

		runMenuCallbacks = function(){
			var fkt;
			// only execute callback queue if all locks are released
			if(isEmpty(lock)){
				while (menuCallbackQueue.length>0){
					fkt = menuCallbackQueue.pop();
					fkt(filteredWeekMenu);
				}

				// sync cache
				cache();

				return true;
			} else {
				return false;
			}
		},

		cache = function(){
			data.save("menu", JSON.stringify(weekMenu) );
			data.save("loadedMensen", JSON.stringify(loadedMensen) );
		},

		loadCachedData = function(){
			try {
				weekMenu = JSON.parse( data.get("menu") ) || [];
			} catch (e) {
				weekMenu = []
			}
			try {
				loadedMensen = JSON.parse( data.get("loadedMensen") ) || {};
			} catch (e) {
				loadedMensen = {}
			}
		},

		clearCache = function(){
			data.remove("menu");
			data.remove("loadedMensen");
		},

		cleanUpOldData = function(){
			var week = (new Date()).getWeek(), day = "";
			weekMenu = weekMenu.filter(function(item){
				return (week === item.week || week + 1 === item.week);
			});

			cache();
		},

		/*
		* list all Types
		* @depreciated
		*/
		getTypes = function(callback){
			getWeekMenu(function(){
				var type, types = {}, typesArr = [], l = weekMenu.length;
				while ( l-- ){
					types[weekMenu[l].name] = true;
				}

				for(type in types){
					if( types.hasOwnProperty(type) ){
						typesArr.push(type);
					}
				}
				callback(typesArr);
			});
		},

		/*
		* list all Types
		*/
		getTypeInfo = function(callback){
			getWeekMenu(function(){
				var type, types = {}, typesArr = [], l = weekMenu.length;
				while ( l-- ){
					types[weekMenu[l].name] = true;
				}

				for(type in types){
					if( types.hasOwnProperty(type) ){
						typesArr.push({
							content  : type,
							name     : type,
							filtered : typeof filterProperties["name"] !== "undefined" && filterValues["name"].indexOf( type ) !== -1
						});
					}
				}
				callback(typesArr);
			});
		},

		/*
		* list all Mensen
		*/
		getMensaInfo = function(callback){
			var mensen = conf.getMensaInfo();
			var l = mensen.length;
			var i = 0;
			var activeMensen = [];
			for( i=0; i < l; i++ ){
				if( mensen[i].active ) {
					mensen[i].filtered = typeof filterProperties["mensa"] !== "undefined"
						&& filterValues["mensa"].indexOf( mensen[i].name ) !== -1;

					mensen[i].content = mensen[i].name;
					activeMensen.push(mensen[i]);
					
				}
			}
			callback(activeMensen);
		},

		getDateInfo = function(callback){
			var dates = getAvailableDates(true);
			var l = dates.length;
			while( l-- ){
				dates[l] = {
					filtered : typeof filterProperties["date"] !== "undefined" && filterValues["date"].indexOf( dates[l] ) !== -1,
					name     : dates[l],
					content  : dateToString(dates[l])
				}
			}
			callback (dates);
		},

		getInfo = function(type, callback){
			switch(type){
				case "date" : {
					getDateInfo(callback);
					break;
				}
				case "mensa" : {
					getMensaInfo(callback);
					break;
				}
				case "name" : {
					getTypeInfo(callback);
					break;
				}
			}
			return this;
		},
		/*
		* list all dates
		* @TODO: nicht zuverlässig am Sonntag?
		*/
		getAvailableDates = function(getNextWeek){
			var noOfDays = getNextWeek ? 12 : 5,
			    today = new Date(),
			    monday = today.getDate() - today.getDay()
			    d    = new Date ( today.setDate( monday ) ),
			    dates = [];
			for(var i = 0; i < noOfDays; i++){
				d = new Date ( d.valueOf() + 60 * 60 * 24 * 1000 );
				if(i !== 5 && i !== 6) {
					dates.push( dateToDateString(d) );
				}
			}

			return dates;
		},
		
		/*
		* convinient method to get this days' menu
		*/
		thisDay = function(callback, sortedSegmented){
			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;

			day(date, sortedSegmented, callback);
		},
		/*
		* convinient method to get today menu
		*/
		today = function(callback, sortedSegmented){
			date = typeof debug !== "undefined" && debug ? new Date(2012, 0, 24) : new Date(); //now
			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;

			if ( date.getDay() === 6 ){ // Saturday
				date.setDate( date.getDate() + 2 );
			} else if ( date.getDay() === 0 ){ // Sunday
				date.setDate( date.getDate() + 1 );
			}

			day(date, sortedSegmented, callback);
		},
		/*
		* convinient method to get the next Day
		*/
		nextDay = function(callback, sortedSegmented){
			var sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented,
			    thisDay = date.getDay();

			// skip Weekends
			if ( thisDay === 5 ) {
				date.setDate( date.getDate() + 3 );
			} else {
				date.setDate( date.getDate() + 1 );
			}

			day(date, sortedSegmented, callback);
		},

		/*
		* convinient method to get the next Day
		*/
		prevDay = function(callback, sortedSegmented){
			var sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented,
//			    oldDate = date,
			    thisDay = date.getDay();
			    
			// skip Weekends
			if ( thisDay === 1 ) {
				date.setDate( date.getDate() - 3 );
			} else {
				date.setDate( date.getDate() - 1 );
			}

			// reject if new date is not available
			// @FIXME
//			if ( getAvailableDates.indexOf( dateToDateString(date) ) === "-1" ){
//				date = oldDate; //! @TEST: Pass by reference?! 
//			}

			day(date, sortedSegmented, callback);
		},

		/**
		 *
		 * @private
		 */
		day = function(date, sortedSegmented, callback){
			setFilter("date", dateToDateString(date));

			if(sortedSegmented){
				getSortedSegmented(function(json){
					callback(json, dateToDateString(date), date);
				});
			} else {
				filter(function(json){
					callback(json, dateToDateString(date), date);
				});
			}
		},

		// Helpers
		dateToDateString = function(date){
			date = new Date(date.valueOf());
			return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
		},

		dateStringToDate = function(dateString){
			dateString = dateString.split("-");
			return new Date(dateString[0], dateString[1]-1 ,dateString[2]);
		}


		// init

		// populate loadedMensen and weekMenu from cache
		loadCachedData();

		// reset saved Filters
		loadFilters();

		// remove old data for performance
		cleanUpOldData();

	return {
		clearCache : clearCache,
		cleanData  : cleanData,


		getInfo      : getInfo,
		getTypeInfo  : getTypeInfo,
		getMensaInfo : getMensaInfo,
		getDateInfo  : getDateInfo,

		// DEPRECIATED:
		getTypes          : getTypes,
		getAvailableDates : getAvailableDates,

		setFilter        : setFilter,
		unsetFilter      : unsetFilter,
		unsetFilters     : unsetFilters,
		// shortcuts and legacy
		setMensaFilter   : function(val){   setFilter("mensa", val); },
		unsetMensaFilter : function(){      unsetFilter("mensa"); },
		setNameFilter    : function(val){   setFilter("name", val);  },
		unsetNameFilter  : function(){      unsetFilter("name");  },
		setDateFilter    : function(val){   setFilter("date", val);  },
		unsetDateFilter  : function(){      unsetFilter("date");  },

		setPersistentFilters : setPersistentFilters,
		getPersistentFilters : getPersistentFilters,

		getWeekMenu        : getWeekMenu,
		getSortedSegmented : getSortedSegmented,
		filter             : filter,

		thisDay : thisDay,
		nextDay : nextDay,
		prevDay : prevDay,
		today   : today
	}
})();
