/**
 * 
 * @TODO Write tests
 * @TODO test week; test mensa
 * @TODO ignore case
 * @TODO create lock file so no other threat is requesting not-yet-retrieved data
 * <100 lines
 * 
 * 
 *  server.js
 *    |
 *   get.js
 *    |     \
 *   read    retriever.js
 * from file    \ 
 *             parser.js
 */
/*jshint node:true*/
"use strict";
var sys = require("sys"),
	url = require("url"),
	express = require('express'),
	fs = require("fs"),
	get = require("./get.js").get,
	port = 8080,
	// https://gist.github.com/2344435
	allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');
		// intercept OPTIONS method
		if ('OPTIONS' === req.method) {
			res.send(200);
		} else {
			next();
		}
	};

// log exceptions
//process.on('uncaughtException', function (err) {
//	console.log(new Date(), 'Caught exception: ' + err);
//});

var logFile = fs.createWriteStream('./access.log', {flags: 'a'});
var app = express()
 .use(allowCrossDomain)
 .use(express.logger({stream: logFile}))
 .use(express.compress())
 .use(function(err, req, res, next){
	console.error(new Date(), err.stack);
	res.send(500, '[]');
})
.use(function(req, res){
	var uri = url.parse(req.url).pathname;
	var s = uri.split("/"),
	mensen = s[1].split(","),
	weeks  = s[2] ? s[2].split(",") : ["this"];
	get(mensen, weeks, function(json){
		res.send(json);
	}, function(){
		console.error(new Date(), mensen, weeks, "getFile error");
		res.send(500, '[]');
	});
})
.listen(port);

sys.puts("Server running at http://localhost:"+port+"/"); 
