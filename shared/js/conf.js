/*
 * URLs speichern und lesen
 *
 */
(function(){
	conf = {
		getSavedURLs : function(){
			var urls = JSON.parse(localStorage.getItem("urls"));
			return urls.length > 0 ? urls : this.getURLs();
		},
		getURLs : function(){
			return urls.mensenWeek;
		},
		setURLs : function(urls){
			return localStorage.setItem("urls", JSON.stringify(urls));
		}
	};
})();
