/*
 * abstrahiert den Zugriff auf AJAX bzw. lokalen Speicher
 * 
 * 
 */

(function(){ // its a trap!
	storage = {
		menu : [], // Cache
		lock : [],
		loadedMensen : {},
		menuCallbackQueue : [],
		/*
		 * 
		 * @param int ticketId
		 * @param function                        !: callback kann mehrfach aufgerufen werden
		 * @return void
		 */
		getMenu : function(callback){
			if(callback) { this.menuCallbackQueue.push(callback);}
			for(var mensa in urls.mensen){
				if(typeof this.loadedMensen[mensa] === "undefined" && typeof this.lock[mensa] === "undefined"){
					this.lock[mensa] = true;
					xhr.get(urls.mensen[mensa], function(resp, additional_args){
						var tds, trs, dish, dishName;
						var tempDiv = document.createElement('div');
						tempDiv.innerHTML = resp.replace(/<script(.|\s)*?\/script>/g, '');
						trs = tempDiv.getElementsByTagName("table")[2].getElementsByTagName("tr")
						for (var j=2; j<trs.length; j++){ // erste beiden überspringen
								tds = trs[j].getElementsByTagName("td");
							
								// Parse Dishname
								dishName = tds[0].innerText.replace(/\s+$/, "").replace(/^\s+/, ""); //trim
			
								// Parse dish
								dish = tds[1].innerText;
								dish = dish.replace(/\s+$/, "").replace(/^\s+/, ""); //trim
								dish = dish.replace(/\(([0-9]+,?)*\)/g, ""); //Zusatzstoffe

								storage.menu.push({
									mensaName : additional_args.mensaName,
									name : dishName,
									dish : dish
								});
						}

						// mark as cached
						storage.loadedMensen[additional_args.mensaName] = true;

						// release lock
						delete storage.lock[additional_args.mensaName];
						
						// try to run callbacks
						storage.runMenuCallbacks();
						
					}, function(resp, additional_args){
						console.log("xhr error");
						storage.menu.push({
							mensaName : additional_args.mensaName,
							name : "Nicht geladen",
							dish : "Ladefehler"
						});

						// release lock
						delete storage.lock[additional_args.mensaName];
						
						// try to run callbacks
						storage.runMenuCallbacks();
					},
						{mensaName : mensa}
					);
				}
			}
			
			this.runMenuCallbacks();
		},
		runMenuCallbacks : function(){
			if(isEmpty(this.lock)){
				while (this.menuCallbackQueue.length>0){
					fkt = this.menuCallbackQueue.pop();
					fkt(this.menu);
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
			this.getMenu(function(){
				var types = {};
				var typesArr = [];
				for (var i=0; i<storage.menu.length; i++){
					types[storage.menu[i].name] = storage.menu[i].name
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
			for(name in urls.mensen){
				array.push(name);
			}
			callback(array);
		},

		/*
		* get dishes by dish type
		*/
		getByType : function(type, callback){
			this.getMenu(function(menu){
				var filtertDishes = [];
				for (var i=0; i<menu.length; i++){
					if(menu[i].name === type || type === "all")
						filtertDishes.push(menu[i]);
				}
				callback(filtertDishes);
			});
		},

		/*
		* get dishes by mensa name
		*/
		getByMensa : function(mensaName, callback){
			this.getMenu(function(menu){
				var filtertDishes = [];
				for (var i=0; i<menu.length; i++){
					if(menu[i].mensaName === mensaName || type === "all")
						filtertDishes.push(menu[i]);
				}
				callback(filtertDishes);
			});
		},

	}
})();
