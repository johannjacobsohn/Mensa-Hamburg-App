/**
 * @TODO write tests
 * @TODO Document
 * @TODO use correct parser
 * @TODO protect against failure in parser
 */
function scrape(mensa, week, success, error){
	var request = require("request"),
	    urls = require("./urls.js").urls,
	    parser = require("./parser.js").parser;
	if( urls.mensenWeek[mensa] && !isNaN(parseInt(week,10)) ){
		console.log("load", urls.mensenWeek[mensa].replace(/\{\{week\}\}/, week));
		request({
			uri: urls.mensenWeek[mensa].replace(/\{\{week\}\}/, week),
		}, function(errorCode, response, body) {
			if(!errorCode){
				success( parser[urls[mensa].parser](body, mensa, week) );
			} else {
				console.log(errorCode)
				error();
			}
		}.bind(this));
	} else {
		console.log( "invalid:", mensa, week, urls.mensenWeek[mensa], parseInt(week,10) )
		error();
	}
}

exports.scrape = scrape;
