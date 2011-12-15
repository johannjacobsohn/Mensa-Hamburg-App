/*
 * URLs speichern und lesen
 *
 */
(function(){
	conf = {
		getSavedURLs : function(){
			if(this.isConfigured()){
				try{
					var urls = JSON.parse(localStorage.getItem("urls"));
					return urls.length > 0 ? urls : this.getURLs();
				} catch(e){
					return this.getURLs();
				}
			} else {
				return this.getURLs();
			}
		},
		getURLs : function(){
			var array = [], item;
			for(item in urls.mensenWeek) array.push(item);
			return array;
		},
		setURLs : function(urls){
			return localStorage.setItem("urls", JSON.stringify(urls));
		},
		isConfigured : function(urls){
			return typeof localStorage.getItem("urls") === "string";
		}
	};
})();
