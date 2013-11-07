/**
 * Handle configuration
 *
 * @class conf
 */
(function(){
	conf = {
		/** @property majorVersion */
		majorVersion: 4,
		/** @property minorVersion */
		minorVersion: 4,
		/** @property versionHasChanged */
		versionHasChanged: false,
		/**
		 * get all active mensen
		 *
		 * @method getURLs
		 * @return {Array} an Array of mensa names
		 */
		getSavedMensen: function(){
			try {
				return JSON.parse(data.get("urls")) || [];
			} catch (e) {
				return [];
			}
		},
		/**
		 * get all active mensen
		 *
		 * @method getURLs
		 * @return {Array} an Array of mensa names
		 */
		getSavedURLs : function(){
			return this.getSavedMensen().map(function(mensa){
				return urls.byId[mensa] ? urls.byId[mensa].name : mensa;
			});
		},
		/**
		 * get all known mensen
		 *
		 * @method getURLs
		 * @return {Array} an Array of mensa names
		 */
		getURLs: function(){
			return urls.mensen.map(function( item ){ return item.id; });
		},
		/**
		 * set active mensen
		 * @method setURLs
		 * @param {Array} urls ein Array an Mensennamen
		 * @return {Boolean} success
		 */
		setURLs : function(mensen){
			mensen = mensen.map(function(mensa){
				return urls.byName[mensa] ? urls.byName[mensa].id : mensa;
			});
			return data.save("urls", JSON.stringify(mensen));
		},
		/**
		 * Find out if app has been configured
		 *
		 * @method isConfigured
		 */
		isConfigured : function(){
			try{
				return typeof data.get("urls") === "string";
			} catch(e) {
				return false;
			}
		},
		/**
		 * Get a list of all mensa names and status
		 * depreciated, use storage.getMensaInfo
		 *
		 * @depreciated
		 * @method getMensaInfo
		 * @return {JSON} json
		 */
		getMensaInfo : function(){
			log( "conf.getMensaInfo is depreciated" );
			return storage.getMensaInfo();
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
			return data.get("displayStudentPrices") !== "0";
		}
	};

	// version has changed if majorversion or minorversion differ from
	// saved value and there is no saved menu (it could be a fresh install otherwise)
	if( data.get("menu") && parseInt(data.get("minorversion"), 10) !== conf.minorVersion ){
		conf.versionHasChanged = true;
	}

	// ☢ nuke all saved data if major version has changed
	if( data.get("menu") && parseInt(data.get("majorversion"), 10) !== conf.majorVersion ){
		conf.versionHasChanged = true;
		data.clear();
	}

	data.set("majorversion", conf.majorVersion);
	data.set("minorversion", conf.minorVersion);
})();
