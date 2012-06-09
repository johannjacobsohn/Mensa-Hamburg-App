/**
 * URLs speichern und lesen
 *
 */
(function(){
	conf = {
		getSavedURLs : function(){
			try {
				return JSON.parse(data.get("urls")) || [];
			} catch (e) {
				return [];
			}
		},
		getURLs : function(){
			var array = [], item = "";
			for(item in urls.mensenWeek) array.push(item);
			return array;
		},
		/**
		 * mensen setzen
		 * @param {array} urls ein Array an Mensennamen
		 * @return {void}
		 */
		setURLs : function(urls){
			return data.save("urls", JSON.stringify(urls));
		},
		isConfigured : function(urls){
			try{
				return typeof localStorage.getItem("urls") === "string";
			} catch(e) {
				return false;
			}
		},
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

		setStudentPrices : function(state){
			return data.save("displayStudentPrices", state ? "1" : "0");
		},

		displayStudentPrices : function(){
			return (typeof data.get("displayStudentPrices") === "undefined" ||  data.get("displayStudentPrices") === null || data.get("displayStudentPrices") === "1");
		}
	};
})();
