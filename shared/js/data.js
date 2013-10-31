/**
 *
 * Abstract i/o-Operations
 * Mostly just a wrapper to localstorage
 *
 * @TODO: write benchmarks for cache
 * @class data
 */
var data = {};
data = (function(){
	"use strict";

	/**
	 * since localstorage is quite slow, values get cached
	 */
	var cache = {},

	/**
	 * Get Item
	 *
	 * @memberof data
	 * @method get
	 * @param {String} key
	 * @return {String} value
	 */
	get = function(key){
		if( typeof cache[key] === "undefined" ) {
			cache[key] = localStorage.getItem(key);
		}
		return cache[key];
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

	return {
		save   : set,
		set    : set,
		get    : get,
		remove : remove,
		clear  : clear
	};
})();
