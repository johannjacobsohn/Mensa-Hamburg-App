/*
 * @TODO:
 * - Seitenübergänge zu morgen/gestern
 * - Segmentierte Liste für einzelne Mensen
 *
 *
 */


$(document).ready(function(){
	console.log("loaded");
//	$('#main').live( 'pageinit',function(event){

		var date = new Date();
		var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());
		storage.getMenuByDate(dateString, function(json){
			$("#dishes").html(ich.mainList({"json" : json}));
			$("#dishes").listview('refresh');
		});
//	});


	function fetch(json){
		 var dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend"];
		if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"
		
		now = new Date();
		if(date.getDate() === now.getDate()){
			dayString = "Heute";
		} else if(date.getDate() === now.getDate()-1){
			dayString = "Gestern";
		} else if(date.getDate() === now.getDate()+1){
			dayString = "Morgen";
		} else {
			dayString = dayNames[date.getDay()];
		}

		$("#header .date").text(dayString);
		
		$("#dishes").html(ich.mainList({"json" : json}));
		$("#dishes").listview('refresh');
	}

		$("#next-day").click(function(e){
			e.preventDefault();
			date = new Date(date.valueOf() + 60 * 60 * 24 * 1000);
			dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

			storage.getMenuByDate(dateString, fetch);
			return;
		});

		$("#prev-day").click(function(){
			date = new Date(date.valueOf() - 60 * 60 * 24 * 1000);
			dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

			storage.getMenuByDate(dateString, fetch);
			return;
		});

});
