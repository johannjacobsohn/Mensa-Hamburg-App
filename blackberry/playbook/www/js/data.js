var data = (function(){
	var version = "2", // we might want to trigger a reload of cached data (if the)
	
		get = function(key){
			return localStorage.getItem(key);
		},

		save = function(key, value){
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
		save("version", version);
	}
	
	return {
		save   : save,
		get    : get,
		remove : remove,
		clear  : clear
	};
})();
