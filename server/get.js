/**
 * 
 * 
 * 
 * 
 * 
 */
/*jshint node:true*/
"use strict";
var retriever = require("./retriever.js"),
    path = require("path"),
    fs = require("fs");

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

var get = function(mensen, weeks, success, error){
	weeks = weeks || ["this"];
	var complete_plan = [], ml=mensen.length-1, wl=weeks.length-1, lock=0, mensa, week;
	for(; wl>=0; wl--){
		for(; ml>=0; ml--){
			(function(){
				lock++;
				if(weeks[wl] === "this"){
					weeks[wl] = (new Date()).getWeek();
				} else if(weeks[wl] === "next"){
					weeks[wl] = (new Date(+(new Date())+7*24*3600*1000)).getWeek();
				}
				
				var mensa = mensen[ml];
				var week = weeks[wl];
				console.log(new Date(), "get", week, mensa);

				var p = path.join(process.cwd(), "data", mensa);
				var filename = path.join(p, ""+weeks[wl]);
				path.exists(filename, function(mensa, week, exists) {
					if(exists) {
						console.log(filename + " exists");
						fs.readFile(filename, 'utf8', function(err, plan) {
							lock--;
							if(!err && plan){
								plan = JSON.parse(plan);
								complete_plan = complete_plan.concat(plan);
								if(!lock) {
									success(JSON.stringify(complete_plan));
								}
							} else {
								console.error(new Date(), mensa, week, "cannot read", filename, err, plan);
								error();
							}
						});
					} else {
						retriever.retrieve(mensa, week, function(plan){
							lock--;
							if(plan){
								complete_plan = complete_plan.concat(plan);
							}
							if(!lock){
								success(JSON.stringify(complete_plan));
							}
							var write = function(filename, plan){
								fs.writeFile(filename, JSON.stringify(plan), function(err){
									if(err){
										console.error(new Date(), err);
									}
								});
							};
							path.exists(p, function(exists){
								if(exists){
									write(filename, plan);
								} else {
									fs.mkdir(p, function(err){
										if(!err){
											write(filename, plan);
										} else {
											console.error(new Date(), err);
										}
									});
								}
							});
						}, error); 
					}
				}.bind(this, mensa, week));
			})();
		}
	}
};

exports.get = get;
