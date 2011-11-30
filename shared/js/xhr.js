/*
 * Stellt ein primitives XMLHttpRequest-Interface zur Verfügung
 *
 * */

(function(){
	xhr = {
		get : function(url, success, error, additional_args){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if(xhr.status === 200){
						success(xhr.responseText, additional_args);
					}
					else if(typeof error === "function"){
						error(xhr.responseText, additional_args);
					}
				}
			};
			xhr.send(null);
		},
		getJSON : function(url, success, error){
			this.get(url, function(resp){
				success(JSON.parse(resp));
			}, error);
		},
		putJSON : function(url, json, success, error){
			var xhr = new XMLHttpRequest();
			xhr.open('PUT', url, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if(xhr.status === 200){
						success(xhr.responseText);
					}
					else if(typeof error === "function"){
						error(xhr.responseText);
					}
				}
			};
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify(json));
		}
	};
})();
