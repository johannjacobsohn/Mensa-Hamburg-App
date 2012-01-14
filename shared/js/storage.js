/*
 * abstrahiert den Zugriff auf AJAX bzw. lokalen Speicher
 *
 * @TODO:
 * - nächste Woche
 * - globale finden und entfernen
 * - reload neue urls
 * 
 */
 
(function(){ // its a trap!
	storage = {
		weekMenu         : [], // Cache
		filteredWeekMenu : [], // Cache
		lock : [],
		loadedMensen : {},
		menuCallbackQueue : [],
		filters : [],
		filterByMensa : function(item){
			return item.mensaName === args.mensa;
		},
		filterByName : function(item){
			return item.name === args.name;
		},
		filterByDate : function(item){
			return item.date === args.date;
		},
		filter : function(callback){
			this.getWeekMenu(function(){
				var i;
				//copy weekMenu to filteredWeekMenu
				storage.filteredWeekMenu = [];
				for(i=0; i < storage.weekMenu.length; i++){
					storage.filteredWeekMenu.push(storage.weekMenu[i]);
				}
				// filter filteredWeekMenu
				for(i=0; i < storage.filters.length; i++){
					// ? args
					args = storage.filters[i].args;
					storage.filteredWeekMenu = storage.filteredWeekMenu.filter(storage.filters[i].fkt);
				}
				callback(storage.filteredWeekMenu);
			});
		},

		getSortedSegmented : function(callback){
			this.filter(function(json){
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

					dateWeight = parseInt(dateA[0])*1000 + parseInt(dateA[1])*100 + parseInt(dateA[2]) - parseInt(dateB[0])*1000 - parseInt(dateB[1])*100 - parseInt(dateB[2]);

					return mensaNameWeight + dateWeight;
				});

				var isDateFilterSet = storage.filters.filter(function(item){
					return item.fkt === storage.filterByDate;
				}).length !== 0;

				var isMensaFilterSet = storage.filters.filter(function(item){
					return item.fkt === storage.filterByMensa;
				}).length !== 0;
			
				var segmented = [], mensaName = "", date = "", i, first=false;
				for(i=0; i<sorted.length; i++){
					first = false;
					if(date != sorted[i].date && !isDateFilterSet){
						// wenn Header dann dieses und nächsten Eintrag als "First" oder "Last" kennzeichnen
						if(segmented.length>0) segmented[segmented.length-1].last = true;
						first = true;

						segmented.push({header:sorted[i].date, type: "header", headerType: "date"});
					}
					if(mensaName != sorted[i].mensaName && !isMensaFilterSet){
						// wenn Header dann dieses und nächsten Eintrag als "First" oder "Last" kennzeichnen
						if(segmented.length>0) segmented[segmented.length-1].last = true;
						first = true;
						segmented.push({header:sorted[i].mensaName, type: "header", headerType: "mensa"});
					}
					sorted[i].type = "item";
					sorted[i].first = first;
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
		cleanData : function(){
			var validUrls = conf.getSavedURLs();
			this.weekMenu = this.weekMenu.filter(function(item){
				return validUrls.indexOf(item.mensaName) !== -1;
			});
			this.filteredWeekMenu = this.filteredWeekMenu.filter(function(item){
				return validUrls.indexOf(item.mensaName) !== -1;
			});
			
			// cleanup loadedMensen
			for(var mensa in this.loadedMensen){
				this.loadedMensen[mensa] = this.weekMenu.filter(function(item){
					return mensa === item.mensaName;
				}).length > 0
			}

			// unset MensaFilter
			this.unsetMensaFilter();
		},
		
		/*
		 * 
		 * @param function                        !: callback kann mehrfach aufgerufen werden
		 * @return void
		 */
		// @TODO: cleanup vars & documentation
		getWeekMenu : function(callback){
			if(callback) { this.menuCallbackQueue.push(callback);}
			mensenArr = conf.getSavedURLs();
			for(var m = 0; m<mensenArr.length; m++){
				mensa = mensenArr[m];
				if(!this.loadedMensen[mensa] && typeof this.lock[mensa] === "undefined"){
					// lock execution of callback queue to prevent race conditions
					this.lock[mensa] = true;

					// get current Week from date
					// @TODO: Figure out if this or next weel is meant
					var now = new Date();
					var week = now.getWeek();

					// load and parse URL with correct week number
					if(typeof debug !== "undefined" && debug){
						url = urls.mock[mensa].replace(/{{week}}/, week);
					} else {
						url = urls.mensenWeek[mensa].replace(/{{week}}/, week);
					}

					// Trigger AJAX-Call
					xhr.get(url, function(resp, additional_args){
						var tds, trs, dish, dishName, date, dateString, obj;
						var tempDiv = document.createElement('div');

						tempDiv.innerHTML = resp.replace(/<img(.|\s)*?\>/g, '').replace(/<script(.|\s)*?\/script>/g, '');
						try{
							trs = tempDiv.getElementsByTagName("table")[1].getElementsByTagName("tr");
						} catch(e){
							console.log(resp);
							return;
						}
						// extract and parse date field
						var datefield = trs[0].getElementsByTagName("td")[0].innerText;
						germanStartdate = datefield.split("-")[0];//.trim();
						germanStartdateArr = germanStartdate.split(".");
						startdate = new Date(germanStartdateArr[2],(germanStartdateArr[1]-1),germanStartdateArr[0]);

						for (var j=2; j<trs.length; j++){ // erste beiden überspringen
							try{
								tds = trs[j].getElementsByTagName("td");
							} catch(e){
								console.log(e);
								continue;
							}

							// Parse Dishname
							dishName = tds[0].innerText.replace(/\s+$/, "").replace(/^\s+/, ""); //trim
							dishName = dishName.replace(/_+$/, ""); //remove trailing underscore

							// Parse dish
							for (var i = 1; i<=5; i++){
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
										priceEl = p[k].getElementsByClassName("fliesstextklorange")[0];
									} else {
										var t = p[k].getElementsByTagName("*");
										var tl = t.length;
										for(var l=0; l < tl; l++){
											if(t[l].className === "fliesstextklorange"){
												priceEl = t[l];
												break;
											}
										}
									}

									price = priceEl.innerHTML.replace("€","").replace(" ","").split("/");
									studPrice = price[0].replace(/[^0-9,]/g,"");
									normalPrice = price[1].replace(/[^0-9,]/g,"");

									// Parse out dish
									p[k].removeChild(priceEl); // remove price
									dish = p[k].innerText;
									dish = dish.replace(/&nbsp;/g, "").replace(/\s+$/, "").replace(/^\s+/, ""); //trim
									dish = dish.replace(/\(([0-9]+,?)*\)/g, ""); //Zusatzstoffe entfernen

									// Figure out date
									date = new Date(startdate.valueOf() + (i-1) * 24 * 60 * 60 * 1000);
									dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

									if(dish !== ""){
										storage.weekMenu.push({
											mensaName   : additional_args.mensaName,
											name        : dishName,
											dish        : dish,
											studPrice   : studPrice,
											normalPrice : normalPrice,
											date        : dateString
										});
									}
								}
							}
						}

						// mark as cached
						storage.loadedMensen[additional_args.mensaName] = true;

						// release lock
						delete storage.lock[additional_args.mensaName];
						
						// try to run callbacks
						storage.runMenuCallbacks();
						
					}, function(resp, additional_args){
						console.log("xhr error");

						// release lock
						delete storage.lock[additional_args.mensaName];
						
						// try to run callbacks
						storage.runMenuCallbacks();
					},
					{
						mensaName : mensa
					}
					);
				}
			}
			
			this.runMenuCallbacks();
		},

		runMenuCallbacks : function(){
			// only execute callback queue if all locks are released
			if(isEmpty(this.lock)){
				while (this.menuCallbackQueue.length>0){
					fkt = this.menuCallbackQueue.pop();
					fkt(this.filteredWeekMenu);
				}
				return true;
			} else {
				return false;
			}
		},

		/*
		* list all Types
		*/
		getTypes : function(callback){
			this.getWeekMenu(function(){
				var type, types = {}, typesArr = [];
				for (var i=0; i<storage.weekMenu.length; i++){
					types[storage.weekMenu[i].name] = storage.weekMenu[i].name
				}
				
				for(type in types){
					typesArr.push(type); 
				}
				callback(typesArr);
			});
		},

		/*
		* list all MensaNames
		*/
		getMensen : function(callback){
			console.log("storage.getMensen is depreciated, use conf.getSavedURLs or conf.getMensaInfo");
			callback(conf.getSavedURLs());
		},
		/*
		* list all dates
		*/
		getAvailableDates: function(callback){
			this.getWeekMenu(function(){
				var date, dates = {}, datesArr = [];
				for (var i=0; i<storage.weekMenu.length; i++){
					dates[storage.weekMenu[i].date] = storage.weekMenu[i].date
				}
				
				for(date in dates){
					datesArr.push(date); 
				}

				datesArr.sort(function(a, b){
					a = a.split("-");
					b = b.split("-");
					return parseInt(a[0])*1000 + parseInt(a[1])*100 + parseInt(a[2]) - parseInt(b[0])*1000 - parseInt(b[1])*100 - parseInt(b[2]);
				});

				callback(datesArr);
			});
		},

		getMenuByDate : function(date, callback){
			console.log("getMenuByDate is depreciated");
			this.getWeekMenu(function(){
				storage.filters = [{fkt:storage.filterByDate,args:{date:date}}];
				storage.filter(callback);
			});
		},

		/*
		* get dishes by dish type
		*/
		getByType : function(type, callback){
			console.log("getByType is depreciated")
			this.getWeekMenu(function(){
				storage.filters = [{fkt:storage.filterByType,args:{type:type}}];
				storage.filter(callback);
			});
		},

		/*
		* get dishes by mensa name
		*/
		getByMensa : function(mensa, callback){
			console.log("getByMensa is depreciated "+ mensa);
			this.getWeekMenu(function(){
				storage.filters = [{fkt:storage.filterByMensa,args:{mensa:mensa}}];
				storage.filter(callback);
			});
		},

		/*
		* 
		*/
		setMensaFilter : function(mensa){
			this.unsetMensaFilter();
			storage.filters.push({fkt:storage.filterByMensa,args:{mensa:mensa}});
		},
		/*
		* 
		*/
		unsetMensaFilter : function(){
			storage.filters = storage.filters.filter(function(item){
				return item.fkt !== storage.filterByMensa;
			});
		},

		/*
		* 
		*/
		setNameFilter : function(name){
			this.unsetNameFilter();
			storage.filters.push({fkt:storage.filterByName,args:{name:name}});
		},
		/*
		* 
		*/
		unsetNameFilter : function(){
			storage.filters = storage.filters.filter(function(item){
				return item.fkt !== storage.filterByName;
			});
		},
		
		/*
		* 
		*/
		setDateFilter : function(date){
			this.unsetDateFilter();
			this.filters.push({fkt:this.filterByDate,args:{date:date}});
		},
		/*
		* 
		*/
		unsetDateFilter : function(){
			this.filters = this.filters.filter(function(item){
				return item.fkt !== storage.filterByDate;
			});
		},
		
		/*
		* 
		*/
		unsetFilters : function(){
			this.filters = [];
		}
	}
})();
