/**
 * 
 * A very simple XMLHttpRequest-Interface
 *
 * @class xhr
 */

(function(){
	xhr = {
		/**
		 * Make a HTTP-Get-Request
		 *
		 * @method get
		 * @param {String} url
		 * @param {Function} success-callback
		 * @param {Function} error-callback
		 * @param additional_args
		 */
		get : function(url, success, error, additional_args){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if(xhr.status === 200){
						success(xhr.responseText, additional_args);
					} else if (xhr.status === 0) {
						success(xhr.responseText, additional_args);
					} else if(typeof error === "function"){
						error(xhr.responseText, additional_args);
					}
				}
			};
			xhr.send(null);
		},
		/**
		 * Get JSON-Data from a server
		 *
		 * Just a wrapper for xhr.get, but tries to optain JSON
		 *
		 * @method getJSON
		 * @param {String} url
		 * @param {Function} success-callback
		 * @param {Function} error-callback
		 * @param additional_args
		 */
		getJSON : function(url, success, error, additional_args){
			this.get(url, function(resp, additional_args){
				success(JSON.parse(resp), additional_args);
			}, error);
		}
	};
})();
