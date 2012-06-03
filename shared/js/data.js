var data = (function(){
	var version = "3", // we might want to trigger a reload of cached data (if the)

	cache = {},

	get = function(key){
		return typeof cache[key] !== "undefined" ? cache[key] : localStorage.getItem(key);
	},

	set = function(key, value){
		cache[key] = value;
		return localStorage.setItem(key, value);
	},

	remove = function(key){
		delete cache[key];
		return localStorage.removeItem(key);
	},

	clear = function(){
		cache = {};
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
