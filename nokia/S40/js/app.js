/*
 * @TODO:
 * - Seitenübergänge zu morgen/gestern
 *
 */
$(document).ready(function(){
	var date = new Date();
	
	//debug
	date = new Date(2011, 11, 12);
	debug = true;

	var dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());
	storage.setDateFilter(dateString)
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
		
		conf.setURLs(inputs);

		storage.cleanData();
		storage.getSortedSegmented(fetch);
		
		$("#stage").addClass("show_menu");
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
			$("#dishes").html(mainListTemplate.render({"json" : json}));
			$("#dishes").listview('refresh');
		});
	
		// Reset Mensaselect
		setMensaSelect();
	
		// Reset Dishselect
		setDishSelect();
	});

	var json = conf.getMensaInfo();
	$("#mensenlist").html(mensaCheckboxTemplate.render({"mensen" : json}));//.parent().trigger("create").find("input").checkboxradio();

	function fetch(json){
		if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"
		var dayString = dateToString(dateString);
		$("#header .date").text(dayString);
		
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

/*
function init(){
    //  Add your code which you need to initialize at the time application launch
	date = new Date();
	dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());

//	document.getElementById('toc').innerHTML = '<div>hier!</div>';
	dateString = "2012-1-4";
	storage.setDateFilter(dateString);
	storage.getSortedSegmented(function(json){
		var i, html="";
		for(i=0; i<json.length; i++){
			html += "<li><h2>" + json[i].dish + "</h2></li>";	
		}
		document.getElementById("today").innerHTML = html;
	});

	
	
//	mwl.switchClass('#slider', 'show_toc', 'show_scratchpad');
//	mwl.setGroupTarget('#homeImgs','#home1', 'show', 'hide');

}
*/
