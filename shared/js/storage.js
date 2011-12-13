/*
 * abstrahiert den Zugriff auf AJAX bzw. lokalen Speicher
 *
 * @TODO:
 * - on the fly filtern? Filterliste?
 * - nächste Woche
 * - globale finden und entfernen
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
			return item.mensaName === args.mensa
		},
		filterByName : function(item){
			return item.name === args.name
		},
		filterByDate : function(item){
			return item.date === args.date
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
					
					args = storage.filters[i].args
					storage.filteredWeekMenu = storage.filteredWeekMenu.filter(storage.filters[i].fkt);
				}
				callback(storage.filteredWeekMenu);
			});
		},
		
		/*
		 * 
		 * @param function                        !: callback kann mehrfach aufgerufen werden
		 * @return void
		 */
		// @TODO: cleanup vars & documentation
		getWeekMenu : function(callback){
			if(callback) { this.menuCallbackQueue.push(callback);}
			for(var mensa in urls.mensenWeek){
				if(typeof this.loadedMensen[mensa] === "undefined" && typeof this.lock[mensa] === "undefined"){

					// lock execution of callback queue to prevent race conditions
					this.lock[mensa] = true;
					
					// get current Week from date
					var now = new Date();
					var week = now.getWeek();
					
					// load and parse URL with correct week number
					url = urls.mensenWeek[mensa].replace(/{{week}}/, week);
					            
					// Trigger AJAX-Call
					xhr.get(url, function(resp, additional_args){
						var tds, trs, dish, dishName, date, dateString, obj;
						var tempDiv = document.createElement('div');
						tempDiv.innerHTML = resp.replace(/<script(.|\s)*?\/script>/g, '');
						trs = tempDiv.getElementsByTagName("table")[1].getElementsByTagName("tr");

						// extract and parse date field
						var datefield = trs[0].getElementsByTagName("td")[0].innerText;
						germanStartdate = datefield.split("-")[0].trim();
						germanStartdateArr = germanStartdate.split(".");
						startdate = new Date(germanStartdateArr[2],(germanStartdateArr[1]-1),germanStartdateArr[0]);

						for (var j=2; j<trs.length; j++){ // erste beiden überspringen
							tds = trs[j].getElementsByTagName("td");

							// Parse Dishname
							dishName = tds[0].innerText.replace(/\s+$/, "").replace(/^\s+/, ""); //trim

							// Parse dish
							for (var i = 1; i<=5; i++){
								p = tds[i].getElementsByTagName("p");
								for (var k=0; k<p.length; k++){

									// Extract Price
									price = p[k].getElementsByClassName("fliesstextklorange")[0].innerHTML.replace("€","").replace(" ","").split("/");
									studPrice = price[0];
									normalPrice = price[1];

									// Parse out dish
									p[k].removeChild(p[k].getElementsByClassName("fliesstextklorange")[0]); // remove price
									dish = p[k].innerText;
									dish = dish.replace(/&nbsp;/g, "").replace(/\s+$/, "").replace(/^\s+/, ""); //trim
									dish = dish.replace(/\(([0-9]+,?)*\)/g, ""); //Zusatzstoffe entfernen

									// Figure out date
									date = new Date(startdate.valueOf() + (i-1) * 24 * 60 * 60 * 1000);
									dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

									if(dish !== ""){
										storage.weekMenu.push({
											mensaName : additional_args.mensaName,
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
			var array=[], name;
			for(name in urls.mensenWeek){
				array.push(name);
			}
			callback(array);
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
				console.log(datesArr);
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
			storage.filters.push({fkt:storage.filterByDate,args:{date:date}});
		},
		/*
		* 
		*/
		unsetDateFilter : function(){
			storage.filters = storage.filters.filter(function(item){
				return item.fkt !== storage.filterByDate;
			});
		},
		
		/*
		* 
		*/
		unsetFilters : function(){
			this.filters = [];
		},
	}
})();
