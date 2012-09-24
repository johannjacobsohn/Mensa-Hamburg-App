/**
 *
 *
 * Storage
 *
 *
 *
 *
 *
 * @class storage
 *
 * 
 */
/*jshint smarttabs:true, browser:true, forin:true, noarg:true, curly:true, eqeqeq:true*/
/*global data:false, conf:false, urls:false, isEmpty:true, xhr:false, console:true, dateToString:false */
var storage = (function(){ // its a trap!
	"use strict";
	var weekMenu         = [], // Cache
		filteredWeekMenu = [], // Cache
		isFiltered       = false,
		date = new Date(), //now
		week = function(){ return date.getWeek(); },
		lock = [],
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
				if(  !subscriptions[type].some(function(item){ return item.toString() === fkt.toString }) ){
					subscriptions[type].push( fkt );
				}
			} else {
				console.warn("event '" + type +"' does not exist");
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
				console.warn("event '" + type +"' does not exist");
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
		filterCompareType = {},
		
		/**
		 * Get filter setting from storage and populate properties
		 *
		 * @method {String} loadFilters
		 * @private
		 */
		loadFilters = function(){
			/// @TODO
			if( persistentFilters ){
				filterProperties  = JSON.parse( data.get("filterProperties")  || "{}" );
				filterValues      = JSON.parse( data.get("filterValues")      || "{}" );
				filterCompareType = JSON.parse( data.get("filterCompareType") || "{}" );
			}
		},
		/**
		 * Save filter settings
		 *
		 * @method saveFilters
		 */
		saveFilters = function(){
			if( persistentFilters ){
				data.set("filterProperties",  JSON.stringify(filterProperties)  );
				data.set("filterValues",      JSON.stringify(filterValues)      );
				data.set("filterCompareType", JSON.stringify(filterCompareType) );
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
		 * @param item
		 * @return bool
		 */
		filterByProp = function(prop, includes, excludes, item){
			/* if property is string THEN
			 *     return true if
			 *     - includes prop AND should include prop
			 *       OR
			 *     - does not include prop AND should not include prop
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

			var a = true;
			var b = true;
			
			if(typeof item[prop] === "string") {
				for(var i = 0; i<filterValues[prop].length; i++){
					a = filterValues[prop][i].type === "include";
					b = filterValues[prop][i].value.indexOf( item[prop] ) !== -1;
					if (a && b || !a && !b){
						return true
					}
				}
			} else {
				//find out if one of the properties is in or excluded
				var inc =  include(includes, item[prop]);
				var exc = !include(excludes, item[prop]);
				if(includes.length === 0){
					return exc
				}
				if(excludes.length === 0){
					return inc
				}
				return inc && exc;
			}
			return false;
		},
		/**
		 * do the filtering
		 *
		 *
		 * filterName
		 * filterValues
		 * filterCompareType  => includes/excludes
		 *
		 * @method filter
		 * @param {Function} callback with filtered menu
		 */
		filter = function(callback){
			getWeekMenu(function(){
				var i = 0, includes = [], excludes = [];
				if(!isFiltered) { // skip if already filtered
					// copy weekMenu to filteredWeekMenu
					filteredWeekMenu = [];
					for(i = 0; i < weekMenu.length; i++){
						filteredWeekMenu.push( weekMenu[i] );
					}

					// filter filteredWeekMenu
					for( var prop in filterProperties ){
						if( filterProperties.hasOwnProperty(prop) ){
							// split filtervalues in includes and excludes
							includes = filterValues[prop].filter(function(item){ return item.type === "include"} ).map(function(item){ return item.value });
							excludes = filterValues[prop].filter(function(item){ return item.type === "exclude"} ).map(function(item){ return item.value });

							filteredWeekMenu = filteredWeekMenu.filter( filterByProp.bind(this, prop, includes, excludes) );
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
		include = function(a,b) {
			for (var i = 0; i < a.length; i++){
				if( b.indexOf(a[i]) != -1 ){
					return true
				}
			}
			return false
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
			delete filterCompareType[type];
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
			filterCompareType = {};
			
			saveFilters();
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
				var sorted = json.sort(function(a, b){
					var mensaWeight = 0,
					    dateWeight = 0,
					    nameA = a.mensa.toLowerCase(),
					    nameB = b.mensa.toLowerCase(),
					    dateA = a.date.split("-"),
					    dateB = b.date.split("-");
					if (nameA < nameB){
						mensaWeight = -10;
					} else if (nameA > nameB) {
						mensaWeight =  10;
					}

					dateWeight = parseInt(dateA[0], 10) * 100 +
					           parseInt(dateA[1], 10) * 10 +
					           parseInt(dateA[2], 10) -
					           parseInt(dateB[0], 10) * 100 -
					           parseInt(dateB[1], 10) * 10 -
					           parseInt(dateB[2], 10);

					return mensaWeight + dateWeight * 100;
				});

				var isMensaFilterSet = typeof filterValues.mensa !== "undefined";
				var filteredByMensenLength = isMensaFilterSet && filterValues.mensa.length || 0;

				var isDateFilterSet = typeof filterValues.date !== "undefined" && filterValues.date.length === 1;

				var segmented = [],
					mensa = "",
					date = "",
					i = 0,
					l = sorted.length,
					first = false,
					savedMensenExist = (conf.getSavedURLs()).length > 1 || true; // FIXME

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
					if(mensa !== sorted[i].mensa && (!isMensaFilterSet || filteredByMensenLength !== 1) && savedMensenExist){
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
		 * @TODO: Just clean if execcive data exits
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
			// @TODO: probably broken
			// @TODO: cleanup
			var filterByMensaAndWeek = function(item){
				return (mensa === item.mensa && parseInt(week, 10) === item.week);
			};
			for(var mensa in loadedMensen){
				if( loadedMensen.hasOwnProperty(mensa) ){
					for(var week in loadedMensen[mensa]){
						if(loadedMensen[mensa].hasOwnProperty(week)){
							mensaLength = weekMenu.filter(filterByMensaAndWeek).length;
							loadedMensen[mensa][week].loaded = mensaLength > 0;
						}
					}
				}
			}

			// unset MensaFilter
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
			var allLoaded = ( conf.getSavedURLs() ).some(function( item ){ return typeof loadedMensen[item] !== "undefined" && typeof loadedMensen[item][week] !== "undefined"; })

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

				// skip loading if this mensa has been already loaded, its currently loading or date is not this or next week -> there won't be any data on the server
				// load anyway if forced to
				if( ((!loadedMensen[mensa][week] || force) && !lock[mensa + week] && ( week === thisWeek || week === thisWeek + 1 )) ){
					isFiltered = false;

					// lock execution of callback queue to prevent race conditions
					lock[mensa + week] = true;

					// load and parse URL with correct week number
					url = urls.mensenWeek[mensa].replace(/\{\{week\}\}/, week);

					// Trigger AJAX-Call
					xhr.get(url, success, error, {
						mensa : mensa,
						week : week
					});
				}
			}

			function success(resp, additional_args){
				var mensa = additional_args.mensa;
				var week = additional_args.week;
				
				// parse HTML
				var newWeekMenu = parseMensaHTML(resp, mensa, week);

				// mark as cached only if new dishes where found
				// data has changed!
				if( newWeekMenu.length > 0 ){
					// splice menu together
					weekMenu = weekMenu.filter(function( item ){ return !(item.week === week && item.mensa === mensa) });
					weekMenu = weekMenu.concat( newWeekMenu ); 

					loadedMensen[mensa][week] = true;
					dataHasChanged = true;
				}

				// release lock
				delete lock[additional_args.mensa+additional_args.week];

				// try to run callbacks
				runMenuCallbacks();
			}

			function error(resp, additional_args){
				console.error("xhr error");

				// release lock
				delete lock[additional_args.mensa+additional_args.week];

				// try to run callbacks
				runMenuCallbacks();
			}

			runMenuCallbacks();
		},
		/**
		 * parses retrieved html from the mensa pages and returns retreaved data
		 *
		 * @private
		 * @method parseMensaHTML
		 * @param  {String}  html
		 * @param  {String}  mensa
		 * @param  {Integer} week
		 * @return {Array}   fetched dishes
		 */
		parseMensaHTML = function(html, mensa, week){
			var tds, trs, dish, dishName, date, dateString, obj,
				properties = [],
				additives = [],
				l = 0,
				imgs,
				spans,
				tempDiv = document.createElement('div'),
				p,
				priceEl,
				price,
				studPrice,
				normalPrice,
				ths,
				tempObj,
				weekMenu = [];

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
							for(l = 0; l < tl; l++){
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
							p[k].innerHTML = p[k].innerHTML.replace(/[0-9]+,[0-9][0-9]/g,""); // remove Price from String
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
						
						for ( var key in tempObj ) {
							if( tempObj.hasOwnProperty(key) ){
								properties.push(key);
							}
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
							if( tempObj.hasOwnProperty(key) ){
								additives.push(key);
							}
						}

						// Parse out dish
						dish = p[k].innerText;
						dish = dish.replace(/&nbsp;/g, "").trim();
						dish = dish.replace(/\(([0-9.]+,?[\s]*)*\)/g, ""); //remove additives

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
			return weekMenu;
		},
		/**
		 * Try to run callback queue
		 * 
		 * @method runMenuCallbacks
		 * @private
		 * @return {Boolean} Callbacks have been called
		 */
		runMenuCallbacks = function(){
			// only execute callback queue if all locks are released
			if(isEmpty(lock)){
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
				return true;
			} else {
				return false;
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
				return (week === item.week || week + 1 === item.week);
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
				var type, types = {}, typesArr = [], l = weekMenu.length;
				while ( l-- ){
					types[weekMenu[l].name] = true;
				}

				for(type in types){
					if( types.hasOwnProperty(type) ){
						typesArr.push({
							content  : type,
							name     : type,
							filtered : typeof filterValues.name !== "undefined" && filterValues.name.some(function(item){ return item.value === type }),
							filter   : filterValues.name ? filterValues.name.filter(function(item){ return item.value === type })[0] : []
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
				var property, properties = {}, propertiesArr = [], l = weekMenu.length;
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
							filter     : filterValues[type] ? filterValues[type].filter(function(item){ return item.value === property })[0] : []
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
				mensa.active   = b.indexOf( mensa.name ) != -1; // mark mensen which are active 
				mensa.filtered = typeof filterValues.mensa !== "undefined" && filterValues.mensa.some(function(item){ return item.value === mensa.name });
				mensa.filter   = filterValues.mensa ? filterValues.mensa.filter(function(item){ return item.value === mensa.name })[0] : [];
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
			while( l-- ){
				dates[l] = {
					filtered : typeof filterProperties.date !== "undefined" && filterValues.date.indexOf( dates[l] ) !== -1,
					name     : dates[l],
					content  : dateToString(dates[l])
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
			console.log( week + 1)
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
		lasttimechecked = new Date(),
		checkForData = function(){
			var now = new Date(),
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

		// additional 	information:
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
