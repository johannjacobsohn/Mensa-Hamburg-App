/*
 * URLs speichern und lesen
 *
 */
(function(){
	conf = {
		getSavedURLs : function(){
			var urls = [];
			if(this.isConfigured()){
				urls = JSON.parse(data.get("urls"));
				return urls.length > 0 ? urls : this.getURLs();
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
				return data.save("urls", JSON.stringify(urls));
			} catch(e){
				console.log("data.js missing!");
				return localStorage.setItem("urls", JSON.stringify(urls));
			}
		},
		isConfigured : function(urls){
			try{
				return typeof data.get("urls") === "string";
			} catch(e){
				console.log("data.js missing!");
				try{
					return typeof localStorage.getItem("urls") === "string";
				} catch(e) {
					return false;
				}
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
		},

		setStudentPrices : function(state){
			return data.save("displayStudentPrices", state ? "1" : "0");
		},

		displayStudentPrices : function(){
			return (typeof data.get("displayStudentPrices") === "undefined" ||  data.get("displayStudentPrices") === null || data.get("displayStudentPrices") === "1")
		}
	};
})();
