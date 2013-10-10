/**
 * 
 * 
 * 
 * 
 */
if(typeof log === "undefined"){
	function log(){
		var r = "", i = 0;
		if(console && console.log){
			for(; i < arguments.length; i++){
				r += " " + arguments[i];
			}
			console.log(r);
		}
	}
}
/**
 * Format number to german format
 *
 * @example:
	formatNumberTest = function(){
		console.assert(formatNumber(07) === "7,00", "Führende Null");
		console.assert(formatNumber(121212128.1212121212) === "121212128,12", "Lange Zahl");
		console.assert(formatNumber("8,23") === "8,23", "String im korrekten Format");
		console.assert(formatNumber("8.235") === "8,24", "korrektes aufrunden");
		console.assert(formatNumber("8.234") === "8,23", "korrektes abrunden");
		console.assert(formatNumber("8") === "8,00", "Ganze Zahl als String");
		console.assert(formatNumber(0) === "0,00", "Null als Int");
		console.assert((formatNumber()).toString() === "0,00", "Kein Argument sollte 0,00 zurückgeben");
		console.assert((formatNumber("test").toString() === "NaN"), "Nicht parsebare Zahl sollte NaN zurückgeben");
	}
	formatNumberTest()
 * @param             n die zu formatierende Zahl - kann String, Int oder Float sein
 * @param  {{int}}    precision (optional) - Anzahl an Nachkommastellen, voreingestellt sind 2 
 * @return {{string}} der formatierte String
 */
var formatNumber = function(n, precision){
	precision = precision || 2;
	var p = Math.pow(10, precision);
	n = n || 0; // Test "Kein Argument sollte 0,00 zurückgeben; "
	n = parseFloat(n.toString().replace(",",".")); // Test "String im korrekten Format"
	n = Math.round(n * p)/p;
	return n.toFixed( precision ).toString().replace(".",",");
};

/**
 * Create a nicely formated string representation of any given Date
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


///////////////
// Polyfills //
///////////////

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;
 
    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
 
      var result = [];
 
      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }
 
      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
};

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
 
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };
 
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
 
    return fBound;
  };
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

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisp */)
  {
    "use strict";
 
    if (this == null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
 
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisp, t[i], i, t))
        return false;
    }
 
    return true;
  };
}


if (!Array.prototype.filter)  
{  
  Array.prototype.filter = function(fun /*, thisp */)  
  {  
    "use strict";  
  
    if (this == null)  
      throw new TypeError();  
  
    var t = Object(this);  
    var len = t.length >>> 0;  
    if (typeof fun != "function")  
      throw new TypeError();  
  
    var res = [];  
    var thisp = arguments[1];  
    for (var i = 0; i < len; i++)  
    {  
      if (i in t)  
      {  
        var val = t[i]; // in case fun mutates this  
        if (fun.call(thisp, val, i, t))  
          res.push(val);  
      }  
    }  
  
    return res;  
  };  
}  

//https://gist.github.com/2864711
//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){
	if(win.addEventListener)return;		//No need to polyfill
 
	function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			var e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
			fn.call(self, e);
		});
	}
	function addListen(obj, i){
		if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}
 
	addListen([doc, win]);
	if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
	else{		//IE < 8
		doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		addListen(doc.all);	
	}
})(window, document);

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisp */)
  {
    "use strict";
 
    if (this == null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
 
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisp, t[i], i, t))
        return true;
    }
 
    return false;
  };
}
