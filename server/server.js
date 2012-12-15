/**
 * 
 * @TODO Write tests
 * @TODO test week; test mensa
 * @TODO ignore case
 * 
 * <100 lines
 * 
 */
var sys = require("sys"),
	http = require("http"),
	url = require("url"),
	path = require("path"),
	scraper = require("./scrape.js"),
	zlib = require('zlib');


		var fs = require("fs");

// http://syn.ac/tech/19/get-the-weeknumber-with-javascript/
Date.prototype.getWeek = function() {
	var determinedate = new Date();
	determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
	var D = determinedate.getDay();
	if(D === 0){ D = 7; }
	determinedate.setDate(determinedate.getDate() + (4 - D));
	var YN = determinedate.getFullYear();
	var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
	var WN = 1 + Math.floor(ZBDoCY / 7);
	return WN;
};

var getFile = function(mensa, week, success, error){
	if(!week || week === "this"){
		week = (new Date()).getWeek();
	} else if(week === "next"){
		week = new Date(+(new Date())+7*24*3600*1000).getWeek();
	}

	var filename = path.join(process.cwd(), "data", mensa, ""+week);
	path.exists(filename, function(exists) {
		var fs = require("fs");
		if(exists) {
			console.log(filename + " exists")
			fs.readFile(filename, function(err, file) {  
				if(err) { error(); } else { success(file); }
			});
		} else {
			console.log("scrape")
			scraper.scrape(mensa, week, function(plan){
				var fs = require("fs");
				plan = JSON.stringify(plan);
				fs.writeFile(filename, plan);
				success(plan);
			}, error); 
		}
	});
}

var getFiles = function(mensen, weeks, success, error){
	weeks = weeks || ["this"];
	var complete_plan = [];
	var ml, wl, lock=0, mensa, week;
	for(wl=weeks.length-1; wl>=0; wl--){
		for(ml=mensen.length-1; ml>=0; ml--){
			(function(){
			console.log(wl, ml)
			lock++;
			if(weeks[wl] === "this"){
				weeks[wl] = (new Date()).getWeek();
			} else if(weeks[wl] === "next"){
				weeks[wl] = new Date(+(new Date())+7*24*3600*1000).getWeek();
			}
			
			var mensa = mensen[ml];
			var week = weeks[wl];
			console.log("get", week, mensa)

			var p = path.join(process.cwd(), "data", mensen[ml]);
			var filename = path.join(p, ""+weeks[wl]);
			path.exists(filename, function(mensa, week, exists) {
				console.log("exist?", mensa, week)
				var fs = require("fs");
				if(exists) {
					console.log(filename + " exists")
					fs.readFile(filename, 'utf8', function(err, plan) {
						if(!err && plan){
							lock--;
							plan = JSON.parse(plan);

							console.log(complete_plan.length)
							if(plan){
								console.log("done", mensa, week)
								complete_plan = complete_plan.concat(plan);
							} else {
								console.error("no plan?!")
							}
							console.log(complete_plan.length)
							console.log("lock", lock)
							if(!lock) {
								console.log("success", complete_plan.length)
								success(JSON.stringify(complete_plan));
							}
						} else {
							console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
							console.error("cannot read", filename)
							console.log(plan)
							console.error(err);
							error();
						}
					});
				} else {
					console.log("scrape");
					scraper.scrape(mensa, week, function(plan){
						lock--;
						var fs = require("fs");
						console.log("scraped");
						if(plan){ complete_plan = complete_plan.concat(plan);
						}
						console.log("locks", lock)
						if(!lock){
							success(JSON.stringify(complete_plan));
						}
						console.log("try write", filename)
						path.exists(p, function(exists){
							console.log(arguments)
							if(!exists){
								fs.mkdir(p, function(err){
									if(!err){
										fs.writeFile(filename, JSON.stringify(plan), function(err){
											if(err) console.error(err)
										});
									} else {
										if(err) console.error(err)
									}
								});
							} else {
								console.log("path exists", p)
								fs.writeFile(filename, JSON.stringify(plan), function(err){
									if(err) console.error(err)
								});
							}
						});
					}, error); 
				}
			}.bind(this, mensa, week));
			console.log("bound", mensa, week)
			})();
		}
	}
}

http.createServer(function(request, response) {  
	var uri = url.parse(request.url).pathname;
	//@TODO: dreckig:
	var s = uri.split("/"),
	mensen = s[1].split(","),
	weeks  = s[2] ? s[2].split(",") : ["this"];

	getFiles(mensen, weeks, function(payload){
		response.writeHead(200, { 'Content-Type': 'text/javascript; charset=UTF-8' });
		response.write(payload);
		response.end();
	}, function(){
		console.log("getFile error")
		response.writeHeader(500);
		response.end();
	});
}).listen(8080);

sys.puts("Server running at http://localhost:8080/"); 
