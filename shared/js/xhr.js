/**
 * 
 * A very simple XMLHttpRequest-Interface
 *
 * @class xhr
 */
(function(){
	// http://www.html5rocks.com/en/tutorials/cors/
	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest !== "undefined") {
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// Otherwise, CORS is not supported by the browser.
			xhr = null;
		}
		return xhr;
	}

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
			var xhr = createCORSRequest("GET", url);
			xhr.onload = function() {
				success(xhr.responseText, additional_args);
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
