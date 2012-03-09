
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
 * Create a nicely formated string representation of any given Date
 *
 * @param  {string} isoDate  Date in iso format (yyyy-mm-dd)
 * @return {string} formated String
 */
function dateToString(isoDate){
	var isoDateArr = isoDate.split("-");
	var date = new Date(isoDateArr[0], isoDateArr[1]-1, isoDateArr[2]);

	var dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend"];
	var now = new Date();
	if(date.getDate() === now.getDate()){
		dayString = "Heute";
	} else if(date.getDate() === now.getDate()-1){
		dayString = "Gestern";
	} else if(date.getDate() === now.getDate()+1){
		dayString = "Morgen";
	} else {
		dayString = dayNames[date.getDay()] + ", " + date.getDate() + "." + (date.getMonth() + 1) + "." ;
	}
	return dayString;
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
