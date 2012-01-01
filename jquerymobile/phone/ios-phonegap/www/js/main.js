/*
 * @TODO:
 * - Seitenübergänge zu morgen/gestern
 *
 */
$(document).ready(function(){
alert("ready")
				  //	$('#main').live( 'pageinit',function(event){
		date = new Date();
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());
		alert(dateString)
//		dateString = "2011-12-14"; // Mock

		storage.setDateFilter(dateString)
		storage.getSortedSegmented(function(json){
			$("#dishes").html(ich.mainList({"json" : json}));
			$("#dishes").listview('refresh');
		});
//	});

	$("#mensa-select").change(function(){
		var val = $(this).val();
		if(val == "all") storage.unsetMensaFilter();
		else storage.setMensaFilter(val);
		storage.getSortedSegmented(fetch);
	});
	$("#dish-select").change(function(){
		var val = $(this).val();
		if(val === "all") storage.unsetNameFilter();
		else storage.setNameFilter(val);
		storage.getSortedSegmented(fetch);
	});

$("#mensen form").submit(function(e){
	e.preventDefault();
	var inputs = $(this).serializeArray();
	var array = [];
	for(var i=0; i<inputs.length; i++){
		array.push(inputs[i].value);
	}

	// Save URLs
	conf.setURLs(array);

	// Reload Data
	storage.cleanData();
	storage.getWeekMenu();

	// Refresh Menulist
	storage.getSortedSegmented(function(json){
		$("#dishes").html(ich.mainList({"json" : json}));
		$("#dishes").listview('refresh');
	});

	// Reset Mensaselect
	setMensaSelect();

	// Reset Dishselect
	setDishSelect();

	// close Dialog
	$('.ui-dialog').dialog('close');
});


$('#mensen').live('pageinit', function(event){
	var json = conf.getMensaInfo();
	$("#mensenlist").html(ich.mensaCheckbox({"mensen" : json})).parent().trigger("create").find("input").checkboxradio();
});

	function fetch(json){
		if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"
		var dayString = dateToString(dateString);
		$("#header .date").text(dayString);
		
		$("#dishes").html(ich.mainList({"json" : json}));
		$("#dishes").listview('refresh');
	}

	$("#next-day").click(function(e){
		e.preventDefault();
		date = new Date(date.valueOf() + 60 * 60 * 24 * 1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

		storage.setDateFilter(dateString);
		storage.getSortedSegmented(fetch);
		return;
	});

	$("#prev-day").click(function(e){
		e.preventDefault();
		date = new Date(date.valueOf() - 60 * 60 * 24 * 1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

		storage.setDateFilter(dateString);
		storage.getSortedSegmented(fetch);
		return;
	});

	setMensaSelect();
	setDishSelect();
});


function setMensaSelect(){
	storage.getMensen(function(json){
		var obj = [{name:"Alle", value:"all"}];
		for(var i=0; i<json.length; i++) obj.push({name:json[i], value:json[i] })
		$("#mensa-select").html(ich.selectOptions({"options" : obj})).trigger("create");
	});
}

function setDishSelect(){
	storage.getTypes(function(json){
		var obj = [{name:"Alle", value:"all"}];
		for(var i=0; i<json.length; i++) obj.push({name:json[i], value:json[i] })
		$("#dish-select").html(ich.selectOptions({"options" : obj})).trigger("create");
	});
}
