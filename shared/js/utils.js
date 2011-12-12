
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
        if(obj.hasOwnProperty(prop))
            return false;
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
