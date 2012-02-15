var jQT = new $.jQTouch({
	icon: 'icon.png',
	addGlossToIcon: false,
	startupScreen: 'jqt_startup.png',
	statusBar: 'black'
});


$(document).ready(function(){
	var dayTemplate = Hogan.compile ( document.getElementById("day-template").innerHTML ),
	    listTemplate = Hogan.compile ( document.getElementById("list-template").innerHTML ),
	    wrapper = document.getElementById("jqt"),
	    dataVersion = 1,
	    goto = function(json, dateStr){
			$(".in.current").removeClass("in current undefined"); // Hack

			if( $("#id" + dateStr).length === 0 || !$("#id" + dateStr).data("loaded") ){
				var html = dayTemplate.render( { dishes : json, date : dateStr, dataVersion : dataVersion }, {listTemplate : listTemplate} );
				
				jQT.insertPages( html, "slide" );
			}
			jQT.goTo("#id" + dateStr, "slide");
		}
		
	storage.thisDay(goto);

	$(".next").live("click", function(){
		storage.nextDay(goto);
	});
	
	$(".prev").live("click", function(){
		storage.prevDay(goto);
	});

	$("#edit").bind('pageAnimationStart', function(e, info){
		var json = conf.getMensaInfo();
		var mensaTemplate = Hogan.compile( document.getElementById("mensaCheckbox").innerHTML );
		$("#edit ul").html( mensaTemplate.render({mensen : json}) );
	});

	$("[data-class=day]").live('pageAnimationStart', function(e, info){
		//liste neu laden
		console.log(dataVersion, $(this).attr("data-dataVersion"))
		if(dataVersion !=$(this).attr("data-dataVersion")){
		console.log("neu laden")
			$(this).attr("data-dataVersion", dataVersion);
			storage.setDateFilter($(this).data("date"));
			storage.getSortedSegmented(function(json){
				$(this).find("ul").html( listTemplate.render({mensen : json}) );
			});
		}
	});

	$("#filter").bind('pageAnimationStart', function(e, info){
		var selectOptions = Hogan.compile( document.getElementById("selectOptions").innerHTML);

		// names
		storage.getTypes(function(json){
			json.unshift("Alle")
			$("#dishfilter").html( selectOptions.render({options : json}) );
		});

		var options = conf.getSavedURLs();
		options.unshift("Alle");
		$("#mensafilter").html( selectOptions.render({options : options }) );
	});

	$("#mensafilter").change(function(){
		var val = $(this).val();
		if( val === "Alle" ) {
			storage.unsetMensaFilter();
		} else {
			storage.setMensaFilter( val );
		}
		$("[data-class=day]").remove();
		dataVersion++;
	});

	$("#dishfilter").change(function(){
		var val = $(this).val();
		if( val === "Alle" ) {
			storage.unsetNameFilter();
		} else {
			storage.setNameFilter( val );
		}
		$("[data-class=day]").removeAttr("data-loaded");
		dataVersion++;
	});



//$("#about").find("h1").text( info. )

});
