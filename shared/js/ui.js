/*
 * Formatiert die Daten auf den Screen und sorgt sich um die Eventhandler. 
 * 
 */
(function(){
	ui = {
		renderList : function(){
			storage.getMenu(function(json){
				var html = "";
				for(var i = 0; i<json.issues.length; i++){
					html += "<li><a href='#ticket' data-issueId='" + json.issues[i].id + "'>" + json.issues[i].subject + "</a></li>"
				}
				$("#issuelist").html(html).listview('refresh');
			});
			$("#issuelist").delegate("a", "click", function(){
				ui.renderTicket($(this).attr("data-issueId"));
			});
		}
})();
