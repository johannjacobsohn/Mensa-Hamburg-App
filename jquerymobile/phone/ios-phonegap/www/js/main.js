

$(document).ready(function(){
				  alert("ready!");
				  
						storage.getMenu(function(json){
								 alert("Menu loaded!");
											 $("#dishes").html(ich.mainList({"json" : json}));
									 });

});