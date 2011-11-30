/*
 * Getter/Setter für die Konfiguration
 */
(function(){
	conf = {
	
		/*
		* @param void
		* @return bool
		*/
		isConfigured : function(){
			return localStorage.getItem("redmineUrl") && localStorage.getItem("redmineKey");
		},
		/*
		* @param callback
		* @return void
		*/
		checkConf : function(success, error){
			var url = urls.getCurrentUserData()
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if(xhr.status === 200) success();
					else error();
				}
			};
			xhr.send(null);
		},
		/*
		* @param void
		* @return string base-url der redmine-installation
		*/
		getUrl : function(){
			return localStorage.getItem("redmineUrl"); // "https://projects.satzmedia.de/";
//			return "https://projects.satzmedia.de/";
		},
		/*
		* @param string neue URL der Redmine-installation
		* @return bool success
		*/
		setUrl : function(url){
			return localStorage.setItem("redmineUrl", url);
		},
		/*
		* @param void
		* @return string base-url der redmine-installation
		*/
		getKey : function(){
			return localStorage.getItem("redmineKey");
//			return "5c8d91b66ce9184922c72a916140610833e8a2b1";
		},
		/*
		* @param string Zugangsschlüssel für Redmine
		* @return bool success
		*/
		setKey : function(key){
			return localStorage.setItem("redmineKey", key);
		}
	}
})();
