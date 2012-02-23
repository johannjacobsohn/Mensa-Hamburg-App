/*
 * 
 */
var storage = (function(){ // its a trap!
	var weekMenu         = {}, // Cache
		filteredWeekMenu = {}, // Cache
		isFiltered       = false;
		isDateFilterSet  = false;
		date = typeof debug !== "undefined" && debug ? new Date(2012, 0, 24) : new Date(), //now
		getDateStr = function(){ return dateToDateString(date) },
		week = function(){ return date.getWeek() },
		lock = [],
		loadedMensen = {},
		menuCallbackQueue = [],
		filters = [],
		filterByMensa = function(item){
			return item.mensaName === args.mensa;
		},
		filterByName = function(item){
			return item.name === args.name;
		},
		filter = function(callback){
			getWeekMenu(function(){
				var i = 0, day = "";
				if(!isFiltered) {
					// @TODO: remove "global"
					args = {};
					// copy weekMenu to filteredWeekMenu
					filteredWeekMenu = {};
					for (day in weekMenu){
						filteredWeekMenu[day] = [];
						for(i=0; i < weekMenu[day].length; i++){
							filteredWeekMenu[day].push(weekMenu[day][i]);
						}
					}

					// filter filteredWeekMenu
					for (day in filteredWeekMenu){
						for(i=0; i < filters.length; i++){
							args = filters[i].args;
							filteredWeekMenu[day] = filteredWeekMenu[day].filter(filters[i].fkt);
						}
					}
					isFiltered = true;
				}

				if(isDateFilterSet){
					callback(filteredWeekMenu[getDateStr()] || []);
				} else { // flatten Object into Array
					var tmpArr = []
					for (day in filteredWeekMenu){
						tmpArr = tmpArr.concat(filteredWeekMenu[day])
					}
					callback(tmpArr);
					
				}
			});
		},

		getSortedSegmented = function(callback){
			filter(function(json){
				var sorted = json.sort(function(a, b){
					var mensaNameWeight = 0,
					    dateWeight = 0,
					    nameA = a.mensaName.toLowerCase(),
					    nameB = b.mensaName.toLowerCase(),
					    dateA = a.date.split("-"),
					    dateB = b.date.split("-")
					if (nameA < nameB){
						mensaNameWeight = -10;
					} else if (nameA > nameB) {
						mensaNameWeight =  10;
					}

					dateWeight = parseInt(dateA[0]) * 100
					             + parseInt(dateA[1]) * 10
					             + parseInt(dateA[2])
					             - parseInt(dateB[0])*100
					             - parseInt(dateB[1])*10
					             - parseInt(dateB[2]);

					return mensaNameWeight + dateWeight * 100;
				});

				var isMensaFilterSet = filters.filter(function(item){
					return item.fkt === filterByMensa;
				}).length !== 0;
			
				var segmented = [], mensaName = "", date = "", i, first=false, savedMensenExist = (conf.getSavedURLs()).length > 1;
				for(i=0; i<sorted.length; i++){
					first = false;
					if(date != sorted[i].date && !isDateFilterSet){
						// wenn Header dann dieses und nächsten Eintrag als "First" bzw. "Last" kennzeichnen
						if(segmented.length>0) segmented[segmented.length-1].last = true;
						first = true;

						segmented.push({header:sorted[i].date, type: "header", headerType: "date"});
					}
					if(mensaName != sorted[i].mensaName && !isMensaFilterSet && savedMensenExist){
						// wenn Header dann dieses und nächsten Eintrag als "First" bzw. "Last" kennzeichnen
						if(segmented.length>0) segmented[segmented.length-1].last = true;
						first = true;

						segmented.push({header:sorted[i].mensaName, type: "header", headerType: "mensa"});
					}
					sorted[i].type = "item";
					sorted[i].first = first;
					sorted[i].last = false;
					segmented.push(sorted[i]);
					mensaName = sorted[i].mensaName;
					date = sorted[i].date;
				}

				callback(segmented);
			});
		},

		/*
		 * Find and delete Data of urls that are not saved
		 */
		cleanData = function(){
			var validUrls = conf.getSavedURLs(), day = "";

			// Make sure we load the cache before we save an empty menu
			loadCachedData();

			// filter menu
			for(day in weekMenu){
				weekMenu[day] = weekMenu[day].filter(function(item){
					return validUrls.indexOf(item.mensaName) !== -1;
				});
			}
			for(day in filteredWeekMenu){
				filteredWeekMenu[day] = filteredWeekMenu[day].filter(function(item){
					return validUrls.indexOf(item.mensaName) !== -1;
				});
			}

			// cleanup loadedMensen
			for(var mensa in loadedMensen){
				for(var week in loadedMensen[mensa]){
					var mensaLength = 0,
						day = "";
					for (day in weekMenu){
						mensaLength += weekMenu[day].filter(function(item){
							return (mensa === item.mensaName && week == item.week); // intentionally week comparison, since week can be a number or a string
						}).length > 0
					}
					loadedMensen[mensa][week] = mensaLength > 0
				}
			}

			// unset MensaFilter
			unsetMensaFilter();

			// sync cache
			cache();
		},
		
		/*
		 * 
		 * @param function
		 * @return void
		 */
		// @TODO: cleanup vars & documentation
		getWeekMenu = function(callback, week){
			var mensenArr = conf.getSavedURLs(),
			    mensa = "",
			    now = new Date(),
			    thisWeek = now.getWeek(),  // get this week's number
			    week = week ? week : date.getWeek() // get Week from date

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
						var day = "", oldWeekMenuLength = 0, newWeekMenuLength = 0;
						for(day in weekMenu){
							oldWeekMenuLength += weekMenu[day].length;
						}
						parseMensaHTML(resp, additional_args.mensaName, additional_args.week);

						// mark as cached only if new dishes where found
						for(day in weekMenu){
							newWeekMenuLength += weekMenu[day].length;
						}
						if(oldWeekMenuLength < newWeekMenuLength){
							loadedMensen[additional_args.mensaName][additional_args.week] = true;
						}

						// release lock
						delete lock[additional_args.mensaName];
						
						// try to run callbacks
						runMenuCallbacks();
					}, function(resp, additional_args){
						console.error("xhr error");

						// release lock
						delete lock[additional_args.mensaName];

						// try to run callbacks
						runMenuCallbacks();
					},
					{
						mensaName : mensa,
						week : week
					}
					);
				}
			}

			runMenuCallbacks();
		},

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
			dtrs = trs;
			var datefield = trs[0].getElementsByTagName("th")[0].innerHTML.split("<br>")[1];
			germanStartdate = datefield.split("-")[0].trim(); //@TODO: Test in Explorer!
			germanStartdateArr = germanStartdate.split(".");
			startdate = new Date(germanStartdateArr[2],(germanStartdateArr[1]-1),germanStartdateArr[0]);

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
						dish = dish.replace(/\(([0-9]+,?)*\)/g, ""); //remove additives

						// Figure out date
						date = new Date(startdate.valueOf() + (i) * 24 * 60 * 60 * 1000);
						dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

						if(dish !== ""){
							if(!weekMenu[dateString]){
								weekMenu[dateString] = [];
							}
							weekMenu[dateString].push({
								mensaName   : mensa,
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
				weekMenu = JSON.parse( data.get("menu") ) || {};
			} catch (e) {
				weekMenu = {}
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
			for(day in weekMenu){
				weekMenu[day] = weekMenu[day].filter(function(item){
					return (week === item.week || week + 1 === item.week);
				});
			}
			cache();
		},

		/*
		* list all Types
		*/
		getTypes = function(callback){
			getWeekMenu(function(){
				var type, types = {}, typesArr = [], day = "", i = 0;
				for(day in weekMenu){
					for (i=0; i<weekMenu[day].length; i++){	
						types[weekMenu[day][i].name] = weekMenu[day][i].name
					}
				}
				for(type in types){
					typesArr.push(type); 
				}
				callback(typesArr);
			});
		},

		/*
		* list all dates
		*/
		getAvailableDates= function(getNextWeek){
			var noOfDays = getNextWeek ? 13 : 5,
			    today = new Date(),
			    day = today.getDay(),
			    date = today.getDate(),
			    dates = [];
			for(var i = 0; i < noOfDays-1; i++){
				if(i === 5 || i === 6) continue;
				dates.push(
					dateToDateString(new Date( today.setDate( date - day + i + 1 )))
				);
			}

			return dates;
		},

		getMenuByDate = function(date, callback){
			console.log("getMenuByDate is depreciated");
			getWeekMenu(function(){
				filters = [{fkt:filterByDate,args:{date:date}}];
				filter(callback);
			});
		},


		setDateFilter = function(dateStr){
			isDateFilterSet = true;
			date = dateStringToDate(dateStr);
		}

		unsetDateFilter = function(dateStr){
			isDateFilterSet = false;
		}

		/*
		* 
		*/
		setMensaFilter = function(mensa){
			isFiltered = false;
			unsetMensaFilter();
			filters.push({fkt:filterByMensa,args:{mensa:mensa}});
		},
		/*
		* 
		*/
		unsetMensaFilter = function(){
			isFiltered = false;
			filters = filters.filter(function(item){
				return item.fkt !== filterByMensa;
			});
		},

		/*
		* 
		*/
		setNameFilter = function(name){
			isFiltered = false;
			unsetNameFilter();
			filters.push({fkt:filterByName,args:{name:name}});
		},
		/*
		* 
		*/
		unsetNameFilter = function(){
			isFiltered = false;
			filters = filters.filter(function(item){
				return item.fkt !== filterByName;
			});
		},

		/*
		* 
		*/
		unsetFilters = function(){
			isFiltered = false;
			filters = [];
		},

		/*
		* convinient method to get today menu
		*/
		thisDay = function(callback, sortedSegmented){
			date = typeof debug !== "undefined" && debug ? new Date(2012, 0, 24) : new Date(); //now

			if ( date.getDay() === 6 ){ // Saturday
				date.setDate( date.getDate() + 2 );
			} else if ( date.getDay() === 0 ){ // Sunday
				date.setDate( date.getDate() + 1 );
			}

			sortedSegmented = typeof sortedSegmented === "undefined" ? true : sortedSegmented;
			
			setDateFilter(dateToDateString(date));

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

			setDateFilter(dateToDateString(date));

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
//			if ( getAvailableDates.indexOf( dateToDateString(date) ) === "-1" ){
//				date = oldDate; //! @TEST: Pass by reference?! 
//			}

			setDateFilter(dateToDateString(date));

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

		// remove old data for performance
		cleanUpOldData();

	return {
		clearCache : clearCache,
		cleanData : cleanData,
		
		getTypes : getTypes,
		getAvailableDates: getAvailableDates,

		setMensaFilter : setMensaFilter,
		unsetMensaFilter : unsetMensaFilter,
		setNameFilter : setNameFilter,
		unsetNameFilter : unsetNameFilter,
		setDateFilter : setDateFilter,
		unsetDateFilter : unsetDateFilter,
		unsetFilters : unsetFilters,

		getWeekMenu : getWeekMenu,
		getSortedSegmented : getSortedSegmented,
		filter : filter,

		thisDay : thisDay,
		nextDay : nextDay,
		prevDay : prevDay
	}
})();
