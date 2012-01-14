/*
 * should work according to
 *   http://www.developer.nokia.com/Community/Wiki/Series_40_web_apps_-_FAQ
 * and
 *   http://www.netrunner.ie/index.php/blog/48-porting-widgets-to-nokia-s40.html
 * but doesn't in simmulator
 */


data = (function(){
	return {
		save : function(key, value){
			return widget.preferences.setItem(key, value);
		},
		get : function(key){
			return widget.preferences.getItem(key);
		}
	};
})();
