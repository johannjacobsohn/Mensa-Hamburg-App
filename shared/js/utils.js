// http://syn.ac/tech/19/get-the-weeknumber-with-javascript/
Date.prototype.getWeek = function() {
	var determinedate = new Date();
	determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
	var D = determinedate.getDay();
	if(D == 0) D = 7;
	determinedate.setDate(determinedate.getDate() + (4 - D));
	var YN = determinedate.getFullYear();
	var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
	var WN = 1 + Math.floor(ZBDoCY / 7);
	return WN;
}

function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop)){
			return false;
		}
	}
	return true;
}

//http://james.padolsey.com/javascript/deep-copying-of-objects-and-arrays/
function deepCopy(o) {
    var copy = o,k;
 
    if (o && typeof o === 'object') {
        copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
        for (k in o) {
            copy[k] = deepCopy(o[k]);
        }
    }
 
    return copy;
}

/**
 * Create a nicely formated string representation of any given Date <br/>
 *
 * Just a legacy wrapper for formatDate
 * 
 * @depreciated
 * 
 * @param  {string} isoDate  Date in iso format (yyyy-mm-dd)
 * @param  {string} optional language identifier, eg. "de" or "en"
 * @return {string} formated String
 */
function dateToString(isoDate, lang){
	return formatDate(new Date(isoDate), lang);
}

/**
 * Create a nicely formated string representation of any given Date
 *
 * @param  {object} date object
 * @param  {string} optional language identifier, eg. "de" or "en"
 * @return {string} formated String
 */
function formatDate(date, lang){
	var lang = lang || "de",
		millisecondsInDay = 60 * 60 * 24 * 1000,
		dateDiff = daysBetween(new Date(), date),
		dayStrings = {
			de : {
				"-1" : "Gestern",
				"0"  : "Heute",
				"1"  : "Morgen"
			},
			en : {
				"-1" : "Yesterday",
				"0"  : "Today",
				"1"  : "Tomorrow"
			}
		},
		dayNames  = {
			"de" : ["Sonntag", "Montag", "Dienstag", "Mittwoch" , "Donnerstag", "Freitag", "Sonnabend"],
			"en" : ["Sunday" , "Monday", "Tuesday" , "Wednesday", "Thursday"  , "Friday" , "Saturday"]
		},
		dateFormats = {
			"de" : dayNames[lang][date.getDay()] + ", " + date.getDate() + "." + (date.getMonth() + 1) + ".",
			"en" : dayNames[lang][date.getDay()] + ", " + date.getDate() + "." + (date.getMonth() + 1) + "."
		}

	return dateDiff >= -1 && dateDiff <= 1 ? dayStrings[lang][dateDiff] : dateFormats[lang];
}

/*
 * http://stackoverflow.com/questions/1036742/date-difference-in-javascript-ignoring-time-of-day
 */
function daysBetween(first, second) {
	// Copy date parts of the timestamps, discarding the time parts.
	var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
	var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

	// Do the math.
	var millisecondsPerDay = 1000 * 60 * 60 * 24;
	var millisBetween = two.getTime() - one.getTime();
	var days = millisBetween / millisecondsPerDay;

	// Round down.
	return Math.floor(days);
}


/*
http://stackoverflow.com/questions/1744310/how-to-fix-array-indexof-in-javascript-for-ie-browsers
*/
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	}
}

//http://blog.stevenlevithan.com/archives/faster-trim-javascript
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
}
