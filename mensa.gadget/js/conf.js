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
			try{
				return localStorage.setItem("urls", JSON.stringify(urls));
			} catch(e){
				return false;
			}
		},
		isConfigured : function(urls){
			try{
				return typeof localStorage.getItem("urls") === "string";
			} catch(e){
				return false;
			}
		},
		getMensaInfo : function(){
			var json = [];
			var a = this.getURLs();
			var b = this.getSavedURLs();
			for(i=0; i < a.length; i++){
				json.push({
					"name"   : a[i],
					"active" : b.indexOf(a[i]) != -1
				});
			}
			return json;
		}
	};
})();
