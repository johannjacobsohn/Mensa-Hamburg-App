/*
 * @TODO:
 * - Seitenübergänge zu morgen/gestern
 *
 */
$(document).ready(function(){
	var date = new Date();
	
	//debug
//	date = new Date(2011, 11, 12);
//	debug = true;

	var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());
	storage.setDateFilter(dateString);
	storage.getSortedSegmented(fetch);
	
	// Templates konfigurieren
	var mainListTemplate      = Hogan.compile(document.getElementById("mainList").innerHTML);
	selectOptionsTemplate = Hogan.compile(document.getElementById("selectOptions").innerHTML);
	var mensaCheckboxTemplate = Hogan.compile(document.getElementById("mensaCheckbox").innerHTML);

	$(".footer a").click(function(e){
		e.preventDefault();
		$("#stage").addClass("show_config");
	});
	
	$("#config form").submit(function(e){
		var inputs = [];

		e.preventDefault();

		$(this).find("input[type=checkbox]:checked").each(function(){
			inputs.push( $(this).val() );
		});

		// Save URLs
		console.log(inputs);
		conf.setURLs(inputs);

		// Reload data and refresh menulist
		storage.cleanData();
		storage.getSortedSegmented(fetch);

		// Reset Mensaselect
		setMensaSelect();
	
		// Reset Dishselect
		setDishSelect();

		// Transistion back
		$("#stage").removeClass("show_config").addClass("show_menu");
	});
	
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
	
	var json = conf.getMensaInfo();
	$("#mensenlist").html(mensaCheckboxTemplate.render({"mensen" : json}));//.parent().trigger("create").find("input").checkboxradio();

	function fetch(json){
		if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"
		$("#title").text(dateToString(dateString));		
		$("#dishes").html(mainListTemplate.render({"json" : json}));
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
		
		$("#mensa-select").html(selectOptionsTemplate.render({"options" : obj}));
	});
}

function setDishSelect(){
	storage.getTypes(function(json){
		var obj = [{name:"Alle", value:"all"}];
		for(var i=0; i<json.length; i++) obj.push({name:json[i], value:json[i] });
		$("#dish-select").html(selectOptionsTemplate.render({"options" : obj}));
	});
}
