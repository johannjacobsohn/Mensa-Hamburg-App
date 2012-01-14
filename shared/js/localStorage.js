data = (function(){
	return {
		save : function(key, value){
			return localStorage.setItem(key, value)
		},
		get : function(key){
			return localStorage.getItem(key);
		}
	};
})();
