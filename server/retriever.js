/**
 * @TODO write tests
 * @TODO Document
 * @TODO protect against failure in parser
 */
/*jshint node:true*/
"use strict";
function retrieve(mensa, week, success, error){
	var request = require("request"),
	    urls = require("./urls.js").urls,
	    parser = require("./parser.js").parser;
	if( urls.mensenWeek[mensa] && !isNaN(parseInt(week,10)) ){ // this, next week
		console.log(new Date(), "retrieve", urls.mensenWeek[mensa].replace(/\{\{week\}\}/, week));
		request({ 
			uri: urls.mensenWeek[mensa].replace(/\{\{week\}\}/, week)
		}, function(err, response, body) {
			if(!err){
				success( parser[urls[mensa].parser](body, mensa, week) );
			} else {
				console.log(new Date(), err);
				error();
			}
		});
	} else {
		console.log( new Date(), "invalid:", mensa, week, urls.mensenWeek[mensa], parseInt(week,10) );
		error();
	}
}

exports.retrieve = retrieve;
