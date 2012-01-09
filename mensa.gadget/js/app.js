
var mainListTemplate = {},
    mensaCheckboxTemplate = {},
    selectOptionsTemplate = {},
    date = new Date(),
    dateString = "",
    body = document.getElementsByTagName("body")[0];


body.onload = function(){
	// Templates konfigurieren
	
//	debug = document.getElementById("debug");
//	debug.innerHTML = "Debugger...";
	
	
   //window.prompt("alive and", "breathing");
    
	mainListTemplate      = Hogan.compile(document.getElementById("mainList").innerHTML);
	selectOptionsTemplate = Hogan.compile(document.getElementById("selectOptions").innerHTML);
	mensaCheckboxTemplate = Hogan.compile(document.getElementById("mensaCheckbox").innerHTML);
	
	dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());

	storage.setDateFilter(dateString);
//							window.prompt("S","")

	storage.getSortedSegmented(fetch);


	document.getElementById("next").onclick = function(e){
		date = new Date(date.valueOf() + 60*60*24*1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());

		storage.setDateFilter(dateString);
		storage.getSortedSegmented(fetch);
		return false;
	}
	document.getElementById("prev").onclick = function(){
		date = new Date(date.valueOf() - 60*60*24*1000);
		dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate());

		storage.setDateFilter(dateString);
		storage.getSortedSegmented(fetch);
		return false;
	}

}

function fetch(json){
//	window.prompt("fetch", typeof json);
	if(typeof json === "undefined") json = []; // @TODO: gehört hier nicht hin - storage sollte nicht "undefined zurückgeben"
	var dayString = dateToString(dateString);
	document.getElementById("header").getElementsByTagName("h1")[0].innerHTML = dayString;
/*
json = [
{
											mensaName   : "WIWI",
											name        : "A",
											dish        : "Dish",
											studPrice   : "1,00",
											normalPrice : "2,00",
											date        : "2011-1-9"
},
{
											mensaName   : "Geo",
											name        : "dishName",
											dish        : "dish",
											studPrice   : "studPrice",
											normalPrice : "normalPrice",
											date        : "dateString"
}]
/**/
	var html = mainListTemplate.render({"json" : json});
//	window.prompt(html, " " + json.length);
//	html = "hallo Welt";
	document.getElementById("dishes").innerHTML =  html;
}
