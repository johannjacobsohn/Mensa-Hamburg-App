/*
 * abstrahiert den Zugriff auf AJAX bzw. lokalen Speicher
 * 
 * 
 */
 function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


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
//				console.log(mensa + ": " + this.loadedMensen[mensa] + "");
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
						
						// mark as cached
//						storage.loadedMensen[additional_args.mensaName] = true;
//						console.log("loaded " + additional_args.mensaName + ": " + storage.loadedMensen[additional_args.mensaName]);
					
	//					console.log(storage.menu.length);
								
						// release lock
						delete storage.lock[additional_args.mensaName];
						
						// try to run callbacks
						storage.runMenuCallbacks();
					},
						{mensaName : mensa}
					);
				}
			}
			
			
			console.log("call to run callbacks: "+this.menuCallbackQueue.length);
			
			this.runMenuCallbacks();
		},
		runMenuCallbacks : function(){
		//	console.log("running menu callbacks...");
			if(isEmpty(this.lock)){
	//			console.log("no lock present");
				console.log("running menu callbacks...");
				while (this.menuCallbackQueue.length>0){
					fkt = this.menuCallbackQueue.pop();
//					console.log("running callback " + fkt);
					fkt(this.menu);
				}
				return true;
			} else {
		//		console.log("locked")
				return false;
			}
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
		* list all Types
		*/
		getTypes : function(callback){
//			Mojo.log("getTypes");
			this.getMenu(function(){
//				Mojo.log("getting Types...");
				var types = {};
				var typesArr = [];
				for (var i=0; i<storage.menu.length; i++){
					types[storage.menu[i].name] = storage.menu[i].name
				}
				
				for(type in types){
					typesArr.push({ name : type }); 
				}
				
				console.log("types: "+ typesArr.length);
				
				callback(typesArr);
			});
		}
	}
})();
