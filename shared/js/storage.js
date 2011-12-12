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
		weekMenu         : {}, // Cache
		filteredWeekMenu : {}, // Cache
		lock : [],
		loadedMensen : {},
		menuCallbackQueue : [],
		activeFilters : {},
		/*
		 * 
		 * @param int date   yyyy-mm-dd, eg. 2011-12-14
		 * @param function                        !: callback kann mehrfach aufgerufen werden
		 * @return void
		 */
		// @TODO: cleanup vars & documentation
		getMenuByDate : function(date, callback){
			this.getWeekMenu(function(){
				callback(storage.filteredWeekMenu[date]);
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
										obj = {
											mensaName : additional_args.mensaName,
											name        : dishName,
											dish        : dish,
											studPrice   : studPrice,
											normalPrice : normalPrice
										};
										//@TODO: doppelt ist doof
										if(typeof storage.weekMenu[dateString] === "undefined") storage.weekMenu[dateString] = [];
										storage.weekMenu[dateString].push(obj);
										if(typeof storage.filteredWeekMenu[dateString] === "undefined") storage.filteredWeekMenu[dateString] = [];
										storage.filteredWeekMenu[dateString].push(obj);
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
				var daymenu, day, type, types = {}, typesArr = [];
				for (day in storage.weekMenu){
					daymenu = storage.weekMenu[day];
					for (var i=0; i<daymenu.length; i++){
						types[daymenu[i].name] = daymenu[i].name
					}
				}
				
				for(type in types){
					typesArr.push({ name : type }); 
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
			var array=["2011-12-12","2011-12-13","2011-12-14","2011-12-15","2011-12-16"]
			callback(array);
		},

		/*
		* get dishes by dish type
		*/
		getByType : function(type, callback){
			this.getWeekMenu(function(){
				var dayMenu;
				for(var day in storage.weekMenu){
					dayMenu = storage.weekMenu[day];
					storage.filteredWeekMenu[day] = [];
					for (var i=0; i<dayMenu.length; i++){
						if(storage.weekMenu[day][i].name === type || type === "all"){
							storage.filteredWeekMenu[day].push(storage.weekMenu[day][i]);
						}
					}
				}
				callback(storage.filteredWeekMenu);
			});
		},

		/*
		* get dishes by mensa name
		*/
		getByMensa : function(mensaName, callback){
//			console.log("MENSANAME: " +mensaName);
			this.getWeekMenu(function(filteredWeekMenu){
				for(var day in storage.weekMenu){
					var dayMenu = storage.weekMenu[day];
					storage.filteredWeekMenu[day] = [];
//					console.log(storage.weekMenu[day])
					for (var i=0; i<dayMenu.length; i++){
//						console.log(mensaName);
						if(dayMenu[i].mensaName === mensaName || mensaName === "all"){
							storage.filteredWeekMenu[day].push(dayMenu[i]);
						}
					}
				}
				callback(storage.filteredWeekMenu);
			});
		},

	}
})();
