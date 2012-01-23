debug = true;

App = {
	init : function(){
		storage.getAvailableDates(function(dates){
			var i = 0,
				l = 10;
				listTemplate = Hogan.compile(document.getElementById("list-template").innerHTML),
				body = document.getElementsByTagName("body")[0],
				panels = []
			for ( i=0; i<dates.length; i++ ) {
				storage.getSortedSegmented(function(json){
					body.innerHTML += listTemplate.render({
						title  : dates[i],
						date   : dates[i],
						dishes : json
					});
				});
			}
			
				// @TODO: merge mit oben
				panels = document.getElementsByClassName("panel");
				for (i = 0; i < panels.length; i++){
					panels[i].setAttribute("data-date", dates[ i ]);
					panels[i].setAttribute("data-tomorrow", dates[ i + 1 ]);
					panels[i].setAttribute("data-yesterday", dates[ i - 1 ]);

					console.log(panels[i]);
					
					panels[i].onfocus = function (d) {
						console.log(document.getElementById("yesterday"));
						document.getElementById("yesterday").href = "#id" + this.getAttribute("data-yesterday");
						document.getElementById("tomorrow" ).href = "#id" + this.getAttribute("data-tomorrow" );
					};
				}
				
				iui.showPageById("id2011-12-13"); //  @TODO: Bug?
				iui.showPageById("id2011-12-14");
		});
	},
	goToDate : function(date){

	},
	goToTomorrow : function(date){

	},
	goToYesterday : function(date){

	}
	
}

App.init();
