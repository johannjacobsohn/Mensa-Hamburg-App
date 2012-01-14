(function(){
	data = {
		save : function(key, value){
			return System.Gadget.Settings.write(key, value);
		},
		get : function(key){
//			window.prompt("get","")
			try{
//				window.prompt("try", System.Gadget.Settings.read(key))
				res = System.Gadget.Settings.read(key);
				return (res === "" ? "[]" : res);
			} catch(e){
//				window.prompt("catch","")
				return "[]";
			}
		}
	};
})();
