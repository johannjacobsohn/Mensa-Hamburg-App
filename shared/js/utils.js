
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

function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop)){
			return false;
		}
	}
	return true;
}

/**
 * Create a nicely formated string representation of any given Date <br/>
 *
 * Just a legacy wrapper for formatDate
 * 
 * @param  {string} isoDate  Date in iso format (yyyy-mm-dd)
 * @param  {string} optional language identifier, eg. "de" or "en"
 * @return {string} formated String
 */
function dateToString(isoDate, lang){
	var d = isoDate.split("-");
	return formatDate(new Date( d[0], d[1]-1, d[2] ), lang);
	// new Date( isoDate )  should be possible too, but fails badly in safari/ios
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
		};

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
	};
}

//http://blog.stevenlevithan.com/archives/faster-trim-javascript
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};
}


// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
// Production steps of ECMA-262, Edition 5, 15.4.4.18  
// Reference: http://es5.github.com/#x15.4.4.18  
if ( !Array.prototype.forEach ) {  
  
  Array.prototype.forEach = function( callback, thisArg ) {  
  
	var T, k;  
  
	if ( this == null ) {  
	  throw new TypeError( "this is null or not defined" );  
	}  
  
	// 1. Let O be the result of calling ToObject passing the |this| value as the argument.  
	var O = Object(this);  
  
	// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".  
	// 3. Let len be ToUint32(lenValue).  
	var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
  
	// 4. If IsCallable(callback) is false, throw a TypeError exception.  
	// See: http://es5.github.com/#x9.11  
	if ( {}.toString.call(callback) != "[object Function]" ) {  
	  throw new TypeError( callback + " is not a function" );  
	}  
  
	// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.  
	if ( thisArg ) {  
	  T = thisArg;  
	}  
  
	// 6. Let k be 0  
	k = 0;  
  
	// 7. Repeat, while k < len  
	while( k < len ) {  
  
	  var kValue;  
  
	  // a. Let Pk be ToString(k).  
	  //   This is implicit for LHS operands of the in operator  
	  // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.  
	  //   This step can be combined with c  
	  // c. If kPresent is true, then  
	  if ( k in O ) {  
  
		// i. Let kValue be the result of calling the Get internal method of O with argument Pk.  
		kValue = O[ k ];  
  
		// ii. Call the Call internal method of callback with T as the this value and  
		// argument list containing kValue, k, and O.  
		callback.call( T, kValue, k, O );  
	  }  
	  // d. Increase k by 1.  
	  k++;  
	}  
	// 8. return undefined  
  };  
}  

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/map
// Production steps of ECMA-262, Edition 5, 15.4.4.19  
// Reference: http://es5.github.com/#x15.4.4.19  
if (!Array.prototype.map) {  
  Array.prototype.map = function(callback, thisArg) {  
  
	var T, A, k;  
  
	if (this == null) {  
	  throw new TypeError(" this is null or not defined");  
	}  
  
	// 1. Let O be the result of calling ToObject passing the |this| value as the argument.  
	var O = Object(this);  
  
	// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".  
	// 3. Let len be ToUint32(lenValue).  
	var len = O.length >>> 0;  
  
	// 4. If IsCallable(callback) is false, throw a TypeError exception.  
	// See: http://es5.github.com/#x9.11  
	if ({}.toString.call(callback) != "[object Function]") {  
	  throw new TypeError(callback + " is not a function");  
	}  
  
	// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.  
	if (thisArg) {  
	  T = thisArg;  
	}  
  
	// 6. Let A be a new array created as if by the expression new Array(len) where Array is  
	// the standard built-in constructor with that name and len is the value of len.  
	A = new Array(len);  
  
	// 7. Let k be 0  
	k = 0;  
  
	// 8. Repeat, while k < len  
	while(k < len) {  
  
	  var kValue, mappedValue;  
  
	  // a. Let Pk be ToString(k).  
	  //   This is implicit for LHS operands of the in operator  
	  // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.  
	  //   This step can be combined with c  
	  // c. If kPresent is true, then  
	  if (k in O) {  
  
		// i. Let kValue be the result of calling the Get internal method of O with argument Pk.  
		kValue = O[ k ];  
  
		// ii. Let mappedValue be the result of calling the Call internal method of callback  
		// with T as the this value and argument list containing kValue, k, and O.  
		mappedValue = callback.call(T, kValue, k, O);  
  
		// iii. Call the DefineOwnProperty internal method of A with arguments  
		// Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},  
		// and false.  
  
		// In browsers that support Object.defineProperty, use the following:  
		// Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });  
  
		// For best browser support, use the following:  
		A[ k ] = mappedValue;  
	  }  
	  // d. Increase k by 1.  
	  k++;  
	}  
  
	// 9. return A  
	return A;  
  };        
}  
