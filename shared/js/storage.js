/**
 * Storage
 *
 *
 *
 *
 *
 */
var storage = {};
storage = (function(){ // its a trap!
	"use strict";
	var weekMenu         = [], // Cache
		filteredWeekMenu = [], // Cache
		isFiltered       = false,
		date = new Date(), //now
		locked = {},
		defaults = {
			loadBothWeeks: false
		},
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
		 * Get the filtered week menu
		 *
		 * @method filter
		 * @param {Function} callback with filtered menu
		 */
		filter = function(callback){
			getWeekMenu(function(){
				callback( getFilteredMenu() );
			});
		},
		/**
		 * get the filtered weekMenu. Synchronous variant of filter
		 *
		 * @private
		 */
		getFilteredMenu = function(){
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
				for( var p in filterProperties ){
					if( filterProperties.hasOwnProperty(p) ){
						// split filtervalues in includes and excludes
						includes = filterValues[p].filter( isInclude ).map( returnValue );
						excludes = filterValues[p].filter( isExclude ).map( returnValue );
						var includesAreSet = filterValues[p].some( isInclude );
						filteredWeekMenu = filteredWeekMenu.filter( filterByProp.bind(this, p, includes, excludes, includesAreSet) );
					}
				}
				isFiltered = true;
			}

			return filteredWeekMenu;
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
		includeAll = function(a, b) {
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
		 */
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
		 * Sort callback for menu, used in success
		 *
		 * Performance tests: http://jsperf.com/sorting-by-multiple-parameters/2
		 *
		 * @private
		 */
		sort = function(a, b){
			var nameA, nameB;
			if (a.date === b.date){
				nameA = a.mensaId + a.type;
				nameB = b.mensaId + b.type;
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
		 * @method getSortedSegmented
		 * @param {Function} callback with the menu supplied as an argument
		 */
		getSortedSegmented = function(callback){
			getWeekMenu(function(){
				callback( getSortedSegmentedMenu() );
			});
		},
		/**
		 * synchronous variant of getSortedSegmented
		 * @TODO: streamline
		 * @private
		 */
		getSortedSegmentedMenu = function(){
			var sorted = getFilteredMenu(),
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
			if( sorted[0] && ((isMensaFilterSet && filteredByMensenLength === 1) || savedMensenLength === 1)){
				segmented.push({
					header     : sorted[0].mensa,
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
			return segmented;
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
			var validUrls = conf.getSavedMensen();

			// Make sure we load the cache before we cleanup and save an empty menu
			loadCachedData();

			// filter menu
			var isValid = function(item){
				return validUrls.indexOf(item.mensaId) !== -1;
			};

			weekMenu = weekMenu.filter(isValid);
			filteredWeekMenu = filteredWeekMenu.filter(isValid);

			// cleanup loadedMensen
			var loaded = {};
			weekMenu.forEach(function(item){
				loaded[item.mensaId] = loaded[item.mensaId] || {};
				loaded[item.mensaId][item.week] = 1;
			});
			loadedMensen = loaded;

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
			var thisWeek = new Date().getWeek();
			var nextWeek = new Date( +new Date() + 7 * 24 * 3600 * 1000 ).getWeek();
			week = week || thisWeek;
			week = defaults.loadBothWeeks ? [thisWeek, nextWeek] : [week];

			// enqueue the callback to be executed when everything has loaded
			menuCallbackQueue.push(callback);
			retrieveData(week);

			return this;
		},
		/**
		 * Retrieve menu data (for a given week)
		 *
		 * @method retrieveData
		 * @param {Array} optional array of week numbers, defaults to this week
		 * @param {bool} force loading of data, even if already loaded
		 */
		retrieveData = function(weeks, force){
			var mensen = conf.getSavedMensen();
			weeks = weeks || [date.getWeek()]; // get Week from date

			// get missing mensen & weeks
			var missing = mensen.filter(function(mensa){
				return force || !weeks.every(function(week){
					return loadedMensen[mensa] && loadedMensen[mensa][week];
				});
			});

			if(missing.length && !locked[weeks.toString()]){
				// do not lock the callback queue when forced - no callbacks have been enqueue anyway
				if(!force){
					locked[weeks.toString()] = 1;
				}
				// Trigger AJAX-Call
				xhr.get(urls.combine(missing, weeks), success.bind(this, weeks), error.bind(this, weeks));
			}

			setTimeout(runMenuCallbacks, 1);
		},
		/**
		 *
		 * @TODO document
		 * @private
		 */
		success = function(weeks, resp){
			var newWeekMenu, tempMensen = {};
			try{
				newWeekMenu = JSON.parse(resp).menu;
			} catch(e){
				newWeekMenu = [];
			}

			// mark as cached only if new dishes where found
			// data has changed!
			if( newWeekMenu && newWeekMenu.length > 0 ){
				// get unique loaded mensen
				newWeekMenu = newWeekMenu
					.map(function(item){
						tempMensen[item.mensaId] = 1;
						item.week = (new Date(item.date)).getWeek();
						item.date = dateToDateString( new Date(item.date) );
						item.mensa = urls.byId[item.mensaId].name;

						// backwards compatibility
						item.dish = item.name;
						item.name = item.type;
						return item;
					});

				weekMenu = weekMenu
					// remove old data before appending new data to prevent duplicates
					.filter(function(item){
						return weeks.indexOf(parseInt(item.week, 10)) === -1 || !tempMensen[item.mensaId];
					})
					// append new data
					.concat(newWeekMenu);

				// sort new collection
				weekMenu = weekMenu.sort(sort);

				// remember which mensen are currently loaded
				loadedMensen = {};
				weekMenu.forEach(function(item){
					loadedMensen[item.mensaId] = loadedMensen[item.mensaId] || {};
					loadedMensen[item.mensaId]["" + item.week] = 1;
				});
				dataHasChanged = true;
			}
			delete locked[weeks.toString()];
			runMenuCallbacks();
		},

		// @TODO document
		error = function (weeks, resp, additional_args){
			log("xhr error");

			// release lock
			delete locked[weeks.toString()];
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
			if(!Object.keys(locked).length){
				if(filteredWeekMenu.length === 0 || dataHasChanged){
					filteredWeekMenu = weekMenu;
				}
				// do stuff if data has changed
				if(dataHasChanged){
					// sync cache
					cache();

					// trigger update event
					fire( "update" );

					dataHasChanged = false;
				}

				// use for loop to ensure that called callbacks do not enqueue more callbacks
				// (which would then be synchronious)
				for (var i = menuCallbackQueue.length; i; i--){
					( menuCallbackQueue.shift() )( filteredWeekMenu );
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
			var week = (new Date()).getWeek();
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
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);

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
		 * @param calldayback {Function}
		 * @param sortedSegmented {Boolean}
		 */
		today = function(callback, sortedSegmented){
			date = new Date(); //now
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
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

			// limit day to the highest available date
			var availableDates = getAvailableDates(true);
			if (availableDates.indexOf( dateToDateString(date) ) === -1){
				date = dateStringToDate( availableDates[availableDates.length-1] );
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

			// limit day to the lowest available date
			var availableDates = getAvailableDates(true);
			if (availableDates.indexOf( dateToDateString(date) ) === -1){
				date = dateStringToDate( availableDates[0] );
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
		day = function(date, getSorted, callback){
			var dateString = dateToDateString(date);
			getWeekMenu(function(){
				setFilter("date", dateString);
				callback(getSorted ? getSortedSegmentedMenu() : getFilteredMenu(), dateString, dateStringToDate(dateString));
			}, date.getWeek());
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
			retrieveData([week, week + 1], true);
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

		// settings
		set: function(defaultName, newValue){
			defaults[defaultName] = newValue;
		},

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
