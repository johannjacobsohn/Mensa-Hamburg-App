var data = (function(){
	var version = "3", // we might want to trigger a reload of cached data (if the)

	get = function(key){
		return localStorage.getItem(key);
	},

	set = function(key, value){
		return localStorage.setItem(key, value);
	},

	remove = function(key){
		return localStorage.removeItem(key);
	},

	clear = function(){
		return localStorage.clear();
	}

	// setup
	if( get("version") !== version ){
		clear();
		set("version", version);
	}
	
	return {
		save   : set,
		set    : set,
		get    : get,
		remove : remove,
		clear  : clear
	};
})();
