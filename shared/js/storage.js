/**
 * Storage
 *
 *
 *
 *
 *
 * @class storage
 */
var storage = (function(){ // its a trap!
	"use strict";
	var weekMenu         = [], // Cache
		filteredWeekMenu = [], // Cache
		isFiltered       = false,
		date = new Date(), //now
		week = function(){ return date.getWeek(); },
		lock = {},
		dataHasChanged = false,
		/**
		 *     loadedMensen{
		 *         mensa1 : {
		 *             week1 : {},
		 *             week2 : {...}
		 *         },
		 *         mensa2 : {...}
		 *     }
		 */
		loadedMensen = {},
		menuCallbackQueue = [],

		/*
		 * Events:
		 */
		 
		/*
		* All subscriptions to all defined events
		*/
		subscriptions = {
			update : [] // triggers once menu data has been updated
		},
		/**
		 * Subscripe to an event
		 * 
		 * eg. 
		 *   storage.on( "update", callback );
		 *
		 * @method on
		 * @param {{string}} type
		 * @param {{fkt}} callback
		 * @return this
		 */
		on = function(type, fkt) {
			if( subscriptions[type] ) {

				// add subscription just once
				if(  !subscriptions[type].some(function(item){ return item.toString() === fkt.toString; }) ){
					subscriptions[type].push( fkt );
				}
			} else {
				log("event '" + type +"' does not exist");
			}
			return this;
		},
		/**
		 * trigger an event
		 * 
		 * fire( "update" );
		 *
		 * @method fire
		 * @private
		 * @param {string} type
		 * @param  args Weitere Argumente an die Abonnenten
		 * @return this
		 */
		fire = function(type, args) {
			var i = 0;
			if(subscriptions[type]){
				for(i=0; i < subscriptions[type].length; i++){
					subscriptions[type][i](args);
				}
			} else {
				log("event '" + type +"' does not exist");
			}
			return this;
		},

		/*
		 * Filters
		 *
		 */
		 
		// Flag if filters should be remembered
		persistentFilters = data.get("persistentFilters") || "1",

		/**
		 * Make Filters persistent
		 *
		 * @method setPersistentFilters
		 * @param {Boolean} switch if filters should be persistent
		 */
		setPersistentFilters = function(save){
			persistentFilters = save ? "1" : "0";
			data.set("persistentFilters", persistentFilters);
		},
		/**
		 * Find out if filters are persistent
		 *
		 * @method getPersistentFilters
		 * @return {Boolean} switch if filters are persistent
		 */
		getPersistentFilters = function(){
			return persistentFilters === "1";
		},
		filterProperties = {},
		filterValues = {},
		
		/**
		 * Get filter setting from storage and populate properties
		 *
		 * @method {String} loadFilters
		 * @private
		 */
		loadFilters = function(){
			if( persistentFilters === "1" ){
				filterProperties  = JSON.parse( data.get("filterProperties")  || "{}" );
				filterValues      = JSON.parse( data.get("filterValues")      || "{}" );
			}
		},
		/**
		 * Save filter settings
		 *
		 * @method saveFilters
		 */
		saveFilters = function(){
			if( persistentFilters === "1" ){
				data.set("filterProperties",  JSON.stringify(filterProperties)  );
				data.set("filterValues",      JSON.stringify(filterValues)      );
			}
		},
		/**
		 * filter function
		 * 
		 * @TODO: needs optimization!
		 * 
		 * @private
		 * @method filterByProp
		 * 
		 * @param prop
		 * @param includes
		 * @param excludes
		 * @param includesAreSet
		 * @param item
		 * @return bool
		 */
		filterByProp = function(prop, includes, excludes, includesAreSet, item){
			/* if property is string THEN
			 *     return true if
			 *     - is prop AND should be prop
			 *       OR
			 *     - is not prop AND should not be prop
			 *
			 * else if property is array
			 *     return false if
			 *     - includes prop in array AND should not include prop
			 *       OR
			 *     - does not include prop in array AND should include prop
			 *
			 *
			 *
			 * if one excluding property is set, return false, else return true
			 * if one including property is set, return true, else return false
			 */
			if(typeof item[prop] === "string") {
				var result;
				// includes overwrite excludes; ignore excludes if includes are set
				if(includesAreSet){
					result = filterValues[prop].some(function(i){
						return i.type === "include" && i.value === item[prop];
					});
				} else {
					result = filterValues[prop].every(function(i){
						return i.type === "exclude" && i.value !== item[prop];
					});
				}
				
				return result;
			} else {
				//find out if one of the properties is either in- or excluded
				var inc =  includeAll(includes, item[prop]);
				var exc =  exclude(excludes, item[prop]);
				if(includes.length === 0){
					return exc;
				}
				if(excludes.length === 0){
					return inc;
				}
				return inc && exc;
			}
		},
		/**
		 * do the filtering
		 *
		 *
		 * filterName
		 * filterValues
		 *
		 * @method filter
		 * @param {Function} callback with filtered menu
		 */
		filter = function(callback){
			getWeekMenu(function(){
				var i = 0, l = 0, includes = [], excludes = [];
				if(!isFiltered) { // skip if already filtered
					// copy weekMenu to filteredWeekMenu
					filteredWeekMenu = [];
					for(i = 0, l = weekMenu.length; i < l; i++){
						filteredWeekMenu[i] = weekMenu[i];
					}

					// filter filteredWeekMenu
					var isInclude = function(item){ return item.type === "include"; };
					var isExclude = function(item){ return item.type === "exclude"; };
					var returnValue = function(item){ return item.value; };
					for( var prop in filterProperties ){
						if( filterProperties.hasOwnProperty(prop) ){
							// split filtervalues in includes and excludes
							includes = filterValues[prop].filter( isInclude ).map( returnValue );
							excludes = filterValues[prop].filter( isExclude ).map( returnValue );
							var includesAreSet = filterValues[prop].some( isInclude );
							filteredWeekMenu = filteredWeekMenu.filter( filterByProp.bind(this, prop, includes, excludes, includesAreSet) );
						}
					}
					isFiltered = true;
				}

				callback(filteredWeekMenu);
			});
		},
		
		/**
		 * return if one element of array a is in array b
		 * http://jsperf.com/of-an-array-is-in-another-array/2
		 * 
		 * @private
		 * @method include
		 * 
		 * @param Array a
		 * @param Array b
		 * @return 
		 */
		exclude = function(a,b) {
			for (var i = 0; i < a.length; i++){
				if( b.indexOf(a[i]) !== -1 ){
					return false;
				}
			}
			return true;
		},
		
		/**
		 * return if every element of array a is in array b
		 * 
		 * @private
		 * @method include
		 * 
		 * @param Array a
		 * @param Array b
		 * @return 
		 */
		includeAll = function(a,b) {
			for (var i = 0; i < a.length; i++){
				if( b.indexOf(a[i]) === -1 ){
					return false;
				}
			}
			return true;
		},

		/**
		 * Set an arbitrary filter by supplying both property and expected value(s)
		 *
		 * @method setFilter
		 * @example
		 *     setFilter("price", "2,50");
		 *     setFilter("price", ["2,50", "2,00"]);
		 *     setFilter("price", [{value: "2,50", type: "include"}, {"2,00", type: "include"}]);
		 * @param {String} Property; the filtered property becomes the name of the filter
		 * @param {String} {Array} Valid value string or array of valid values
		 * @param {String} Type of comparison, either include or exclude
		 * */
		setFilter = function(prop, value){
			isFiltered = false;
			value = (typeof value === "string")  ? [ { value: value, type: "include" } ] : value;

			if(typeof value[0] === "string"){
				for (var i=0; i<value.length; i++ ){
					value[i] = { value: value[i], type: "include" };
				}
			}
			// if we change the date filter we need to change the date as well,
			// so next week data for the next week gets picked up
			// @TODO: Rethink...
			if(prop === "date"){
				date = dateStringToDate( value.sort()[ value.length - 1 ].value );
			}

			filterProperties[prop]  = prop;
			filterValues[prop]      = value;

			saveFilters();
		},
		/**
		 * Delete Filter
		 *
		 * 
		 * @method unsetFilter
		 * @param {String} Name of Filter
		 */
		unsetFilter = function(type){
			isFiltered = false;
			delete filterProperties[type];
			delete filterValues[type];
			saveFilters();
		},
		/**
		 * Clear all filters
		 *
		 * @TODO: probably broken
		 * @method unsetFilters
		 */
		unsetFilters = function(){
			isFiltered = false;
			filterProperties = {};
			filterValues = {};
			
			saveFilters();
		},
		/** 
		 * Sort callback for menu, used in getSortedSegmented
		 * 
		 * Performance tests: http://jsperf.com/sorting-by-multiple-parameters/2
		 * 
		 * @private 
		 */
		sort = function(a, b){
			var nameA, nameB;
			if (a.date === b.date){
				nameA = a.mensa.toLowerCase();
				nameB = b.mensa.toLowerCase();
				if(nameA === nameB){
					return 0;
				} else {
					return nameA > nameB ? 1 : -1;
				}
			} else {
				return a.date > b.date ? 1 : -1;
			}
		},
		/**
		 * Get a segmented and sorted JSON representation of the current menu,
		 * suitable for easy displaying
		 *
		 * @TODO: streamline
		 *
		 * @method getSortedSegmented
		 * @param {Function} callback with the menu supplied as an argument
		 */
		getSortedSegmented = function(callback){
			filter(function(json){
				var sorted = json.sort(sort),
					segmented = [],
					mensa = "",
					date = "",
					i = 0,
					l = sorted.length,
					first = false,
					savedMensenLength = (conf.getSavedURLs()).length,
					savedMensenExist = savedMensenLength > 1 || true, // FIXME
					isMensaFilterSet = typeof filterValues.mensa !== "undefined",
					ex = filterValues.mensa ? filterValues.mensa.filter(function(item){ return item.type === "exclude"; }) : [],
					inc =  filterValues.mensa ? filterValues.mensa.filter(function(item){ return item.type !== "exclude"; }) : [],
					filteredByMensenLength = inc.length ? inc.length : savedMensenLength - ex.length,
					isDateFilterSet = typeof filterValues.date !== "undefined" && filterValues.date.length === 1 && filterValues.date[0].type === "include";

				/*
				 * wenn nur eine Mensa gewählt ist sollte diese als erstes in den Headern stehen
				 */
				 if( json[0] && ((isMensaFilterSet && filteredByMensenLength === 1) || savedMensenLength === 1)){
					segmented.push({
						header     : json[0].mensa,
						type       : "header",
						headerType : "mensa"
					});
				}

				for( i = 0; i < l; i++ ){
					first = i === 0;
					if(date !== sorted[i].date && !isDateFilterSet){
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
					if(mensa !== sorted[i].mensa && (!isMensaFilterSet || filteredByMensenLength !== 1) && savedMensenLength !== 1 && savedMensenExist){
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
					sorted[i].first = first; //(mensa != sorted[i].mensa && savedMensenExist);
					sorted[i].last  = false;
					segmented.push(sorted[i]);
					
					mensa = sorted[i].mensa;
					date = sorted[i].date;
				}
				if(segmented.length > 0) {
					segmented[segmented.length - 1].last = true;
				}
				callback(segmented);
			});
		},
		/**
		 * Find and delete Data of urls that are not saved
		 *
		 * @TODO: Just clean if execcive data exits (no need to do all the work when there is really nothing to do)
		 * @TODO: write tests
		 * 
		 * @method cleanData
		 * @param void
		 * @return this
		 */
		cleanData = function(){
			var validUrls   = conf.getSavedURLs(),
				day         = "",
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
			// @TODO: cleanup
			var filterByMensaAndWeek = function(mensa, week, item){
				return (mensa === item.mensa && parseInt(week, 10) === item.week);
			};
			for(var mensa in loadedMensen){
				if( loadedMensen.hasOwnProperty(mensa) ){
					for(var week in loadedMensen[mensa]){
						if(loadedMensen[mensa].hasOwnProperty(week)){
							loadedMensen[mensa][week] = weekMenu.some(filterByMensaAndWeek.bind(this, mensa, week));
						}
					}
				}
			}

			// unset MensaFilter to prevent an inconsistent state where
			// we are filtering by a mensa which doesn't exist anymore
			unsetFilter("mensa");

			// sync cache
			cache();

			return this;
		},
		/**
		 * Get menu data (for a given week)
		 *
		 * @method getWeekMenu
		 * @chainable
		 * @param {Function} optional callback
		 * @param {Integer}  optional Weeknumber, defaults to this week
		 */
		getWeekMenu = function(callback, week){
			week = week || date.getWeek(); // get Week from date
			var allLoaded = ( conf.getSavedURLs() ).every(function( item ){
				return typeof loadedMensen[item] !== "undefined" && !!loadedMensen[item][week];
			});

			if ( allLoaded ) { // avoid running through the whole callback stack if all mensen are already loaded
				callback( weekMenu );
			} else {
				// enqueue the callback to be executed when everything has been loaded
				menuCallbackQueue.push(callback);
				retrieveData( week );
			}
			return this;
		},
		/**
		 * Retrieve menu data (for a given week)
		 *
		 * @method retrieveData
		 * @param {Integer}  optional Weeknumber, defaults to this week
		 * @param {bool} force loading of data, even if already loaded
		 */
		retrieveData = function(week, force){
			var mensenArr = conf.getSavedURLs(),
			    mensa = "",
			    thisWeek = (new Date()).getWeek(),  // get this week's number
			    url = "";
			week = week || date.getWeek(); // get Week from date

			for(var m = 0; m<mensenArr.length; m++){
				mensa = mensenArr[m];
				loadedMensen[mensa] = loadedMensen[mensa] || {};

				// skip loading if this mensa has been already loaded,
				// its currently loading or date is not this or next week
				// -> there won't be any data on the server
				// load anyway if forced to
				if( ((!loadedMensen[mensa][week] || force) && !lock[mensa + week] && ( week === thisWeek || week === thisWeek + 1 )) ){
					isFiltered = false;

					// lock execution of callback queue to prevent race conditions
					lock[mensa + week] = true;

					// load and parse URL with correct week number
					// @TODO: change to urls.mensen
					url = urls.mensenWeek[mensa].replace("{{week}}", week);

					// Trigger AJAX-Call
					// @TODO: remove additional_args and use bind instead
					xhr.get(url, success, error, {
						mensa : mensa,
						week : week
					});
				}
			}

			runMenuCallbacks();
		},
		// @TODO document
		success = function(resp, additional_args){
			var mensa = additional_args.mensa;
			var week = additional_args.week;
			
			// parse HTML
			var newWeekMenu = JSON.parse(resp || "[]");

			// mark as cached only if new dishes where found
			// data has changed!
			if( newWeekMenu && newWeekMenu.length > 0 ){
				// splice menu together
				weekMenu = weekMenu.filter(function( item ){ return (parseInt(item.week, 10) !== week || item.mensa !== mensa); });
				weekMenu = weekMenu.concat( newWeekMenu ); 

				loadedMensen[mensa][week] = true;
				dataHasChanged = true;
			}

			// release lock
			delete lock[additional_args.mensa+additional_args.week];

			// try to run callbacks
			runMenuCallbacks();
		},

		// @TODO document
		error = function (resp, additional_args){
			log("xhr error");

			// release lock
			delete lock[additional_args.mensa+additional_args.week];

			// try to run callbacks
			runMenuCallbacks();
		},

		/**
		 * Try to run callback queue
		 * 
		 * @method runMenuCallbacks
		 * @private
		 */
		runMenuCallbacks = function(){
			// only execute callback queue if all locks are released
			if(Object.keys(lock).length === 0){
				if(filteredWeekMenu.length === 0){
					filteredWeekMenu = weekMenu;
				}

				while (menuCallbackQueue.length > 0){
					( menuCallbackQueue.pop() )( filteredWeekMenu );
				}

				// do stuff if data has changed
				if(dataHasChanged){
					// sync cache
					cache();

					// trigger update event
					fire( "update" );

					dataHasChanged = false;
				}
			}
		},
		/**
		 * Save Menu to disk
		 * 
		 * @method cache
		 * @private
		 */
		cache = function(){
			data.save("menu", JSON.stringify(weekMenu) );
			data.save("loadedMensen", JSON.stringify(loadedMensen) );
		},
		/**
		 * Get Menu from disk
		 * 
		 * @TODO: only load from cached if not already loaded
		 *
		 * @method loadCachedData
		 */
		loadCachedData = function(){
			try {
				weekMenu = JSON.parse( data.get("menu") ) || [];
			} catch (e) {
				weekMenu = [];
			}
			try {
				loadedMensen = JSON.parse( data.get("loadedMensen") ) || {};
			} catch (e) {
				loadedMensen = {};
			}
		},
		/**
		 * clear cache
		 *
		 * @method clearCache
		 */
		clearCache = function(){
			data.remove("menu");
			data.remove("loadedMensen");
		},
		/**
		 * clean up old data from cache
		 *
		 * @method cleanUpOldData
		 * @private
		 */
		cleanUpOldData = function(){
			var week = (new Date()).getWeek(), day = "";
			weekMenu = weekMenu.filter(function(item){
				return (week === parseInt(item.week, 10) || week + 1 === parseInt(item.week, 10));
			});

			cache();
		},
		/**
		* list all Types/Names
		* 
		* @method getTypes
		* @depreciated
		* @param {Function} callback
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
		/**
		* get Informations about all Types/Names
		*
		* @method getTypeInfo
		* @param {Function} callback
		*/
		getTypeInfo = function(callback){
			getWeekMenu(function(){
				var type, types = {}, typesArr = [], l = weekMenu.length, valueEqualType = function(type, item){ return item.value === type; };
				while ( l-- ){
					types[weekMenu[l].name] = true;
				}
				
				for(type in types){
					if( types.hasOwnProperty(type) ){
						typesArr.push({
							content  : type,
							name     : type,
							filtered : typeof filterValues.name !== "undefined" && filterValues.name.some(valueEqualType.bind(this, type)),
							filter   : filterValues.name ? filterValues.name.filter(valueEqualType.bind(this, type))[0] : []
						});
					}
				}
				callback(typesArr);
			});
		},
		/**
		 * 
		 * @method getDetails
		 * @private
		 * @param type
		 * @param callback 
		 */
		getDetails = function(type, callback){
			getWeekMenu(function(){
				var property, properties = {}, propertiesArr = [], l = weekMenu.length, valueEqualsProperty = function(property, item){ return item.value === property; };
				while ( l-- ){
					for(var i = 0; i<weekMenu[l][type].length; i++){
						properties[weekMenu[l][type][i]] = true;
					}
				}

				for(property in properties){
					if( properties.hasOwnProperty(property) ){
						propertiesArr.push({
							content    : property,
							name       : property,
							filtered   : typeof filterProperties.name !== "undefined" && filterValues.name.indexOf( property ) !== -1,
							filterType : (typeof filterProperties.name !== "undefined" && filterValues.name.indexOf( property ) !== -1) ,
							filter     : filterValues[type] ? filterValues[type].filter(valueEqualsProperty.bind(this, property))[0] : []
						});
					}
				}
				callback(propertiesArr);
			});
		},
		/**
		* getPropertiesInfo
		*
		* @method getPropertiesInfo
		* @param {Function} callback
		*/
		getPropertiesInfo = function(callback){
			getDetails("properties", callback);
		},
		/**
		* getAdditivesInfo
		* 
		* @method getAdditivesInfo
		* @param {Function} callback
		*/
		getAdditivesInfo = function(callback){
			getDetails("additives", callback);
		},
		/**
		 * getMensaInfo
		 *
		 * @method getMensaInfo
		 * @param {Function} callback
		 */
		getMensaInfo = function(callback){
			var mensen = urls.mensen;
			var b = conf.getSavedURLs();
			mensen.forEach(function(mensa, i){
				mensa.content  = mensa.name; // for compability to the other filters
				mensa.active   = b.indexOf( mensa.name ) !== -1; // mark mensen which are active 
				mensa.filtered = typeof filterValues.mensa !== "undefined" && filterValues.mensa.some(function(item){ return item.value === mensa.name; });
				mensa.filter   = filterValues.mensa ? filterValues.mensa.filter(function(item){ return item.value === mensa.name; })[0] : [];
			});

			// since mensa information is inherently synchronious (its
			// read from a static config file) we can directly return
			// the result, but in keeping with getTypeInfo et. al. we
			// call a callback as well
			if(callback) { callback(mensen); }
			return mensen;
		},
		/**
		 * getDateInfo
		 *
		 * @method getDateInfo
		 * @param {Function} callback
		 */
		getDateInfo = function(callback){
			var dates = getAvailableDates(true);
			var l = dates.length;
			var valueEq = function(d, item){ return item.value === d; };
			while( l-- ){
				dates[l] = {
					filtered : typeof filterProperties.date !== "undefined" && filterValues.date.some( valueEq.bind(this, dates[l]) ),
					name     : dates[l],
					content  : dateToString(dates[l]),
					filter   : filterValues.date ? filterValues.date.filter( valueEq.bind(this, dates[l]) )[0] : []
				};
			}
			callback (dates);
		},
		/**
		 * get information
		 *
		 * @chainable
		 * @method getInfo
		 * @param {String} type
		 * @param {Function} callback
		 */
		getInfo = function(type, callback){
			if(type === "date"){
				getDateInfo(callback);
			} else if(type === "mensa") {
				getMensaInfo(callback);
			} else if(type === "name") {
				getTypeInfo(callback);
			} else if(type === "additives") {
				getAdditivesInfo(callback);
			} else if(type === "properties") {
				getPropertiesInfo(callback);
			}
			return this;
		},
		/**
		 * list all dates
		 *
		 * @method getAvailableDates
		 * @param {Boolean} getNextWeek
		 * @return {Array} dates
		 */
		getAvailableDates = function(getNextWeek){
			var noOfDays = getNextWeek ? 12 : 5,
			    d = new Date(),
			    monday = d.setDate(d.getDate() - (d.getDay() + 6)%7),
			    dates = [];
			for(var i = 0; i < noOfDays; i++){
				if(i !== 5 && i !== 6) {
					d = new Date(monday.valueOf() + i * 3600 * 24 * 1000);
					dates.push( dateToDateString( d ) );
				}
			}
			return dates;
		},
		/**
		 * Get this day's menu
		 *
		 * @method thisDay
		 * @param callback {Function}
		 * @param sortedSegmented {Boolean}
		 */
		thisDay = function(callback, sortedSegmented){
			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;
			date.setHours(0); date.setMinutes(0); date.setSeconds(0);  date.setMilliseconds(0);

			if ( date.getDay() === 6 ){ // Saturday
				date.setDate( date.getDate() + 2 );
			} else if ( date.getDay() === 0 ){ // Sunday
				date.setDate( date.getDate() + 1 );
			}

			day(date, sortedSegmented, callback);
		},
		/**
		 * Get todays menu
		 *
		 * @method today
		 * @param callback {Function}
		 * @param sortedSegmented {Boolean}
		 */
		today = function(callback, sortedSegmented){
			date = new Date(); //now
			date.setHours(0); date.setMinutes(0); date.setSeconds(0);  date.setMilliseconds(0);
			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;

			if ( date.getDay() === 6 ){ // Saturday
				date.setDate( date.getDate() + 2 );
			} else if ( date.getDay() === 0 ){ // Sunday
				date.setDate( date.getDate() + 1 );
			}

			day(date, sortedSegmented, callback);
		},
		/**
		 * get next day's menu
		 *
		 * @method nextDay
		 * @param  {Function} callback         
		 * @param  {bool}     sortedSegmented  
		 * @return {object}   this             
		 */
		nextDay = function(callback, sortedSegmented){
			var thisDay = date.getDay();
			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;

			// skip Weekends
			if ( thisDay === 5 ) {
				date.setDate( date.getDate() + 3 );
			} else {
				date.setDate( date.getDate() + 1 );
			}

			day(date, sortedSegmented, callback);
			return this;
		},

		/**
		 * Get menu of previous date
		 *
		 * @method prevDay
		 * @param callback {Function}
		 * @param sortedSegmented {Boolean}
		 */
		prevDay = function(callback, sortedSegmented){
			var thisDay = date.getDay();
			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;
			// skip Weekends
			if ( thisDay === 1 ) {
				date.setDate( date.getDate() - 3 );
			} else {
				date.setDate( date.getDate() - 1 );
			}

			day(date, sortedSegmented, callback);
		},

		/**
		 * Get menu for a specific date
		 * 
		 * @method day
		 * @param date {Object}
		 * @param sortedSegmented {Boolean}
		 * @param callback {Function}
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
		/**
		 * Find out if the previous day is available
		 * 
		 * @method isPrevDayAvailable
		 * @param void
		 * @return bool 
		 */
		isPrevDayAvailable = function(){
			var testDate = new Date(date.valueOf()),
			    thisDay = date.getDay();

			// skip Weekends
			if ( thisDay === 1 ) {
				testDate.setDate( testDate.getDate() - 3 );
			} else {
				testDate.setDate( testDate.getDate() - 1 );
			}

			return (getAvailableDates(true)).indexOf( dateToDateString( testDate ) ) !== -1;
		},
		/**
		 * Find out if the previous day is available
		 * 
		 * @method isPrevDayAvailable
		 * @param void
		 * @return bool 
		 */
		isNextDayAvailable = function(){
			var testDate = new Date( date.valueOf() ),
			    thisDay = date.getDay();
			
			// skip Weekends
			if ( thisDay === 5 ) {
				testDate.setDate( date.getDate() + 3 );
			} else {
				testDate.setDate( date.getDate() + 1 );
			}

			return (getAvailableDates(true)).indexOf( dateToDateString( testDate ) ) !== -1;
		},

		/**
		 * manually trigger update of data
		 * 
		 * @method update
		 * @param void
		 * @return void
		 */
		update = function(){
			var week = (new Date()).getWeek();
			retrieveData(week    , true);
			retrieveData(week + 1, true);
		},

		/**
		 *  periodically check for new data on the server
		 * 
		 * @method checkForData
		 * @param void
		 * @return void
		 */
		lasttimechecked = 0,
		checkForData = function(){
			var now = +new Date(),
			    checkInterval = 3600 * 24 * 1000; // check every day
			if( now - lasttimechecked > checkInterval ){
				update();
				lasttimechecked = now;
			}
			setTimeout(checkForData, 3600 * 1000); // try again in an hour
		},

		// Helpers
		/**
		 * convert date to datestring
		 *
		 * @method dateToDateString
		 * @param {Object} Date
		 * @return {String} Datestring
		 */
		dateToDateString = function(date){
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		},

		/**
		 * convert datestring to date object
		 *
		 * @method dateStringToDate
		 * @param {String} dateString
		 * @return {Object} date
		 */
		dateStringToDate = function(dateString){
			dateString = dateString.split("-");
			return new Date(dateString[0], dateString[1]-1 ,dateString[2]);
		};

		////////////////////////////////////////////////
		// init                                       //
		////////////////////////////////////////////////

		// populate loadedMensen and weekMenu from cache
		loadCachedData();

		// load saved Filters
		loadFilters();

		// remove old data for performance
		cleanUpOldData();

		// periodically (every day) check data
		checkForData();

	return {
		// cache control:
		clearCache : clearCache,
		cleanData  : cleanData,

		// additional information:
		getInfo      : getInfo,
		getTypeInfo  : getTypeInfo,
		getMensaInfo : getMensaInfo,
		getDateInfo  : getDateInfo,
		getPropertiesInfo : getPropertiesInfo,
		getAdditivesInfo  : getAdditivesInfo,
		getTypes          : getTypes, // DEPRECIATED
		getAvailableDates : getAvailableDates,

		// filters:
		setFilter        : setFilter,
		unsetFilter      : unsetFilter,
		unsetFilters     : unsetFilters,

		// shortcuts and legacy:
		/**
		 * set mensa filter
		 * 
		 * Depreciated, use setFilter("mensa", val) instead.
		 *
		 * @depreciated
		 * @method setMensaFilter
		 */
		setMensaFilter   : function(val){   setFilter("mensa", val); },
		/**
		 * unset mensa filter
		 *
		 * Depreciated, use unsetFilter("mensa", val) instead.
		 *
		 * @depreciated
		 * @method unsetMensaFilter
		 */
		unsetMensaFilter : function(){      unsetFilter("mensa"); },
		/**
		 * set name filter
		 *
		 * Depreciated, use setFilter("name", val) instead.
		 *
		 * @depreciated
		 * @method setNameFilter
		 */
		setNameFilter    : function(val){   setFilter("name", val);  },
		/**
		 * unset name filter
		 *
		 * Depreciated, use unsetFilter("name", val) instead.
		 *
		 * @depreciated
		 * @method unsetNameFilter
		 */
		unsetNameFilter  : function(){      unsetFilter("name");  },
		/**
		 * set date filter
		 *
		 * Depreciated, use setFilter("date", val) instead.
		 *
		 * @depreciated
		 * @method setDateFilter
		 */
		setDateFilter    : function(val){   setFilter("date", val);  },
		/**
		 * unset date filter
		 *
		 * Depreciated, use unsetFilter("date", val) instead.
		 *
		 * @depreciated
		 * @method unsetDateFilter
		 */
		unsetDateFilter  : function(){      unsetFilter("date");  },

		// permanent filters:
		setPersistentFilters : setPersistentFilters,
		getPersistentFilters : getPersistentFilters,

		// data retrieval:
		getWeekMenu        : getWeekMenu,
		getSortedSegmented : getSortedSegmented,
		filter             : filter,

		// day based navigation:
		isNextDayAvailable: isNextDayAvailable,
		isPrevDayAvailable: isPrevDayAvailable,
		thisDay : thisDay,
		nextDay : nextDay,
		prevDay : prevDay,
		today   : today,
		day     : day,

		// events:
		on: on,
		
		update : update,

		// Helpers:
		dateToDateString : dateToDateString,
		dateStringToDate : dateStringToDate
	};
})();
