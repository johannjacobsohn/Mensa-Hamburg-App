/**
 * Handle configuration
 *
 * @class conf
 */
(function(){
	conf = {
		/**
		 * get all active mensen
		 * 
		 * @method getURLs
		 * @return {Array} an Array of mensa names
		 */
		getSavedURLs : function(){
			try {
				return JSON.parse(data.get("urls")) || [];
			} catch (e) {
				return [];
			}
		},
		/**
		 * get all known mensen
		 * 
		 * @method getURLs
		 * @return {Array} an Array of mensa names
		 */
		getURLs : function(){
			var array = [], item = "";
			for(item in urls.mensenWeek) array.push(item);
			return array;
		},
		/**
		 * set active mensen
		 * @method setURLs
		 * @param {Array} urls ein Array an Mensennamen
		 * @return {Boolean} success
		 */
		setURLs : function(urls){
			return data.save("urls", JSON.stringify(urls));
		},
		/**
		 * Find out if app has been configured
		 * 
		 * @method isConfigured
		 * @param {Array} names of mensen
		 */
		isConfigured : function(urls){
			try{
				return typeof localStorage.getItem("urls") === "string";
			} catch(e) {
				return false;
			}
		},
		/**
		 * Get a list of all mensa names and status
		 * 
		 * @method getMensaInfo
		 * @return {JSON} json
		 */
		getMensaInfo : function(){
			var json = [];
			var a = this.getURLs();
			var b = this.getSavedURLs();
			var i = 0;
			for(i=0; i < a.length; i++){
				json.push({
					"name"   : a[i],
					"active" : b.indexOf(a[i]) != -1
				});
			}
			return json;
		},
		/**
		 * Set setStudentPrices
		 *
		 * @method setStudentPrices
		 * @param {Boolean} state
		 * @return {Boolean} success
		 */
		setStudentPrices : function(state){
			return data.save("displayStudentPrices", state ? "1" : "0");
		},
		/**
		 * get displayStudentPrices
		 *
		 * @method displayStudentPrices
		 * @return {Boolean} state
		 */
		displayStudentPrices : function(){
			return (typeof data.get("displayStudentPrices") === "undefined" ||  data.get("displayStudentPrices") === null || data.get("displayStudentPrices") === "1");
		}
	};
})();
