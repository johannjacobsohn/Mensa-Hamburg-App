/**
 *
 * Abstract i/o-Operations
 * Mostly just a wrapper to localstorage
 *
 *
 * @class data
 */
/*jshint smarttabs:true browser:true */
var data = (function(){
	var version = "3", // we might want to trigger a reload of cached data (if the)

	cache = {},

	/**
	 * Get Item
	 * 
	 * @memberof data
	 * @method get
	 * @param {String} key
	 * @return {String} value
	 */
	get = function(key){
		return typeof cache[key] !== "undefined" ? cache[key] : localStorage.getItem(key);
	},

	/**
	 * Set (Save) Item
	 * 
	 * @memberof data
	 * @method set
	 * @param {String} key
	 * @param {String} value
	 * @return {Boolean} success
	 */
	set = function(key, value){
		cache[key] = value;
		return localStorage.setItem(key, value);
	},

	/**
	 * Remove (Delete) Item
	 * 
	 * @memberof data
	 * @method remove
	 * @param {String} key
	 * @return {Boolean} success
	 */
	remove = function(key){
		delete cache[key];
		return localStorage.removeItem(key);
	},

	/**
	 * Clear cache and storage
	 * Useful for resetting in case of panic
	 * 
	 * @memberof data
	 * @method clear
	 */
	clear = function(){
		cache = {};
		return localStorage.clear();
	};

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
