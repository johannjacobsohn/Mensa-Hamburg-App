
// minifier: path aliases

enyo.path.addPaths({onyx: "/home/jjacobsohn/git/mensaApp/enyo2/phone/enyo/../lib/onyx/", onyx: "/home/jjacobsohn/git/mensaApp/enyo2/phone/enyo/../lib/onyx/source/", layout: "/home/jjacobsohn/git/mensaApp/enyo2/phone/enyo/../lib/layout/", ToggleBar: "/home/jjacobsohn/git/mensaApp/enyo2/phone/enyo/../lib/ToggleBar/", SelectorBar: "/home/jjacobsohn/git/mensaApp/enyo2/phone/enyo/../lib/SelectorBar/", Carousels: "/home/jjacobsohn/git/mensaApp/enyo2/phone/enyo/../lib/Carousels/"});

// source/core/utils.js

function dateToString(e, t) {
var n = e.split("-");
return formatDate(new Date(n[0], n[1] - 1, n[2]), t);
}

function formatDate(e, t) {
var t = t || "de", n = 864e5, r = daysBetween(new Date, e), i = {
de: {
"-1": "Gestern",
"0": "Heute",
"1": "Morgen"
},
en: {
"-1": "Yesterday",
"0": "Today",
"1": "Tomorrow"
}
}, s = {
de: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend" ],
en: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
}, o = {
de: s[t][e.getDay()] + ", " + e.getDate() + "." + (e.getMonth() + 1) + ".",
en: s[t][e.getDay()] + ", " + e.getDate() + "." + (e.getMonth() + 1) + "."
};
return r >= -1 && r <= 1 ? i[t][r] : o[t];
}

function daysBetween(e, t) {
var n = new Date(e.getFullYear(), e.getMonth(), e.getDate()), r = new Date(t.getFullYear(), t.getMonth(), t.getDate()), i = 864e5, s = r.getTime() - n.getTime(), o = s / i;
return Math.floor(o);
}

if (typeof log == "undefined") function log() {
var e = "", t = 0;
if (console && console.log) {
for (; t < arguments.length; t++) e += " " + arguments[t];
console.log(e);
}
}

Date.prototype.getWeek = function() {
var e = new Date;
e.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
var t = e.getDay();
t === 0 && (t = 7), e.setDate(e.getDate() + (4 - t));
var n = e.getFullYear(), r = Math.floor((e.getTime() - new Date(n, 0, 1, -6)) / 864e5), i = 1 + Math.floor(r / 7);
return i;
}, Object.keys || (Object.keys = function() {
var e = Object.prototype.hasOwnProperty, t = !{
toString: null
}.propertyIsEnumerable("toString"), n = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], r = n.length;
return function(i) {
if (typeof i != "object" && typeof i != "function" || i === null) throw new TypeError("Object.keys called on non-object");
var s = [];
for (var o in i) e.call(i, o) && s.push(o);
if (t) for (var u = 0; u < r; u++) e.call(i, n[u]) && s.push(n[u]);
return s;
};
}()), Function.prototype.bind || (Function.prototype.bind = function(e) {
if (typeof this != "function") throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
var t = Array.prototype.slice.call(arguments, 1), n = this, r = function() {}, i = function() {
return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)));
};
return r.prototype = this.prototype, i.prototype = new r, i;
}), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
for (var n = t || 0, r = this.length; n < r; n++) if (this[n] === e) return n;
return -1;
}), String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
var n, r;
if (this == null) throw new TypeError("this is null or not defined");
var i = Object(this), s = i.length >>> 0;
if ({}.toString.call(e) != "[object Function]") throw new TypeError(e + " is not a function");
t && (n = t), r = 0;
while (r < s) {
var o;
r in i && (o = i[r], e.call(n, o, r, i)), r++;
}
}), Array.prototype.map || (Array.prototype.map = function(e, t) {
var n, r, i;
if (this == null) throw new TypeError(" this is null or not defined");
var s = Object(this), o = s.length >>> 0;
if ({}.toString.call(e) != "[object Function]") throw new TypeError(e + " is not a function");
t && (n = t), r = new Array(o), i = 0;
while (i < o) {
var u, a;
i in s && (u = s[i], a = e.call(n, u, i, s), r[i] = a), i++;
}
return r;
}), Array.prototype.every || (Array.prototype.every = function(e) {
"use strict";
if (this == null) throw new TypeError;
var t = Object(this), n = t.length >>> 0;
if (typeof e != "function") throw new TypeError;
var r = arguments[1];
for (var i = 0; i < n; i++) if (i in t && !e.call(r, t[i], i, t)) return !1;
return !0;
}), Array.prototype.filter || (Array.prototype.filter = function(e) {
"use strict";
if (this == null) throw new TypeError;
var t = Object(this), n = t.length >>> 0;
if (typeof e != "function") throw new TypeError;
var r = [], i = arguments[1];
for (var s = 0; s < n; s++) if (s in t) {
var o = t[s];
e.call(i, o, s, t) && r.push(o);
}
return r;
});

// source/core/info.js

info = {
appName: "Mensa-Hamburg App",
appDesc: "Dies ist eine Open Source App (auf github) f\u00fcr viele Betriebssysteme von Studenten f\u00fcr Studenten!\n Hast Du einen Fehler gefunden oder Verbesserungsvorschl\u00e4ge? Schreib an die Entwickler oder schau auf die Projektseite. Dein Feedback ist immer Willkommen!",
appURL: "http://mensaapp.org/",
appEmail: "mensa-hamburg-app@directbox.com",
onUpdateTitel: "Neue Version",
onUpdateText: "Yay, Du hast eine neue Version der Mensa App! F\u00fcr mehr Informationen gibt es eine Seite mit einer \u00dcbersicht \u00fcber die letzten \u00c4nderungen und weiteren Informationen:",
notConfTitle: "Noch nicht konfiguriert",
notConfText: "Uh, scheinbar ist hier noch nichts konfiguriert, daher werden *keine* Mensen geladen... Du musst welche aktivieren um etwas zu sehen.",
releaseNotes: {
mojo: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/",
touchpad: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/",
playbook: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/",
ipad: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/",
iphone: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/",
androidPhone: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/",
androidTablet: "http://mensaapp.org/blog/2013/kritisches-update-fur-alle-plattformen/"
}
};

// source/core/data.js

var data = function() {
"use strict";
var e = {}, t = function(t) {
return typeof e[t] == "undefined" && (e[t] = localStorage.getItem(t)), e[t];
}, n = function(t, n) {
return e[t] = n, localStorage.setItem(t, n);
}, r = function(t) {
return delete e[t], localStorage.removeItem(t);
}, i = function() {
return e = {}, localStorage.clear();
};
return {
save: n,
set: n,
get: t,
remove: r,
clear: i
};
}();

// source/core/conf.js

(function() {
conf = {
majorVersion: 3,
minorVersion: 3,
versionHasChanged: !1,
getSavedURLs: function() {
try {
return JSON.parse(data.get("urls")) || [];
} catch (e) {
return [];
}
},
getURLs: function() {
return urls.mensen.map(function(e) {
return e.name;
});
},
setURLs: function(e) {
return data.save("urls", JSON.stringify(e));
},
isConfigured: function(e) {
try {
return typeof data.get("urls") == "string";
} catch (t) {
return !1;
}
},
getMensaInfo: function() {
return log("conf.getMensaInfo is depreciated"), storage.getMensaInfo();
},
setStudentPrices: function(e) {
return data.save("displayStudentPrices", e ? "1" : "0");
},
displayStudentPrices: function() {
return data.get("displayStudentPrices") !== "0";
}
}, data.get("menu") && parseInt(data.get("minorversion"), 10) !== conf.minorVersion && (conf.versionHasChanged = !0);
if (data.get("menu") && parseInt(data.get("majorversion"), 10) !== conf.majorVersion) {
conf.versionHasChanged = !0;
var e = data.get("urls");
data.clear(), e && data.set("urls", e);
}
data.set("majorversion", conf.majorVersion), data.set("minorversion", conf.minorVersion);
})();

// source/core/urls.js

(function() {
var e = "http://menu.mensaapp.org/";
urls = {
mensenWeek: {},
mensen: [ {
name: "Alexanderstrasse",
url: e + "Alexanderstrasse/{{week}}",
address: "Alexanderstra\u00dfe 1, 20099 Hamburg",
open: "Montag - Donnerstag: 07:45 - 18:00 Uhr, Freitag: 07:45 - 16:00 Uhr",
misc: "Vom 23.07.2012-07.09.2012 geschlossen"
}, {
name: "Armgartstrasse",
url: e + "Armgartstrasse/{{week}}/",
address: "Armgartstra\u00dfe 24, 22087 Hamburg",
open: "Montag - Donnerstag: 09:00 - 15:00 Uhr; Freitag: 09:00 - 14:30 Uhr",
misc: "Vom 16.07.2012-14.09.2012 geschlossen"
}, {
name: "Averhoffstrasse",
url: e + "Averhoffstrasse/{{week}}/",
address: "Averhoffstra\u00dfe 38, 22085 Hamburg",
open: "Montag - Donnerstag: 09:00 - 16:15 Uhr; Freitag: 09:00 - 14:00 Uhr",
misc: "Vom 16.07.2012-28.09.2012 geschlossen"
}, {
name: "Bergedorf",
url: e + "Bergedorf/{{week}}/",
address: "Lohbr\u00fcgger Kirchstra\u00dfe 65, 21033 Hamburg",
open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr"
}, {
name: "Berliner Tor",
url: e + "BerlinerTor/{{week}}/",
address: "Berliner Tor 7, 20099 Hamburg",
open: "Montag - Freitag: 11:15 - 14:30 Uhr"
}, {
name: "Botanischer Garten",
url: e + "BotanischerGarten/{{week}}/",
address: "Ohnhorstra\u00dfe 18, 22609 Hamburg",
open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr",
misc: "Vom 16.07.2012-10.08.2012 geschlossen"
}, {
name: "Bucerius Law School",
url: e + "BuceriusLawSchool/{{week}}/",
address: "Jungiusstra\u00dfe 6, 20355 Hamburg",
open: "Montag - Freitag: 11:30 - 14:00 Uhr"
}, {
name: "Campus",
url: e + "Campus/{{week}}/",
address: "Von-Melle-Park 5, 20146 Hamburg",
open: "Montag - Donnerstag: 10:00 - 16:00 Uhr; Freitag: 10:00 - 15:30 Uhr"
}, {
name: "City Nord",
url: e + "CityNord/{{week}}/",
address: "Hebebrandstra\u00dfe 1, 22297 Hamburg",
open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
misc: "Vom 23.07.2012-24.08.2012 geschlossen"
}, {
name: "Finkenau",
url: e + "Finkenau/{{week}}/",
address: "Finkenau 35, 22081 Hamburg",
open: "Montag - Freitag: 08:00 - 18:00 Uhr",
misc: "Vom 13.08.2012-31.08.2012 geschlossen"
}, {
name: "Geomatikum",
url: e + "Geomatikum/{{week}}/",
address: "Bundesstra\u00dfe 55, 20146 Hamburg",
open: "Montag - Donnerstag: 11:15 - 15:00 Uhr; Freitag: 11:15 - 14:30 Uhr"
}, {
name: "Harburg",
url: e + "Harburg/{{week}}/",
address: "Denickestra\u00dfe 22, 21073 Hamburg",
open: "Montag - Freitag: 07:45 - 18:00 Uhr"
}, {
name: "Jungiusstrasse",
url: e + "Jungiusstrasse/{{week}}/",
address: "Jungiusstra\u00dfe 9, 20355 Hamburg",
open: "Montag - Freitag: 10:00- 16:30 Uhr",
misc: "Vom 16.07.2012-31.08.2012 geschlossen"
}, {
name: "Philosophenturm",
url: e + "Philosophenturm/{{week}}/",
address: "Von-Melle-Park 6, 20146 Hamburg",
open: "Montag - Freitag: 08:00 - 19:00 Uhr, Samstag: 08:00 - 14:30 Uhr",
misc: "Vom 23.07.2012-25.08.2012 geschlossen"
}, {
name: "Stellingen",
url: e + "Stellingen/{{week}}/",
address: "Vogt-K\u00f6lln-Stra\u00dfe 30, 22527 Hamburg",
open: "Montag - Donnerstag: 08:00 - 15:00 Uhr; Freitag: 08:00 - 14:30 Uhr",
misc: "Vom 23.07.2012-24.08.2012 geschlossen"
}, {
name: "Studierendenhaus",
url: e + "Studierendenhaus/{{week}}/",
address: "Von-Melle-Park 2, 20146 Hamburg",
open: "Montag - Donnerstag: 11:00 - 15:00 Uhr, Freitag: 11:00 - 14:30 Uhr"
}, {
name: "Cafe CFEL",
url: e + "CafeCFEL/{{week}}/",
address: "Notkestrasse 85, 22607 Hamburg",
open: "Montag - Freitag: 08:00 - 15:00 Uhr"
} ]
}, urls.mensen.forEach(function(e) {
urls.mensenWeek[e.name] = e.url;
});
})();

// source/core/xhr.js

(function() {
xhr = {
get: function(e, t, n, r) {
var i = new XMLHttpRequest;
i.open("GET", e, !0), i.onreadystatechange = function() {
i.readyState === 4 && (i.status === 200 ? t(i.responseText, r) : i.status === 0 ? t(i.responseText, r) : typeof n == "function" && n(i.responseText, r));
}, i.send(null);
},
getJSON: function(e, t, n, r) {
this.get(e, function(e, n) {
t(JSON.parse(e), n);
}, n);
}
};
})();

// source/core/storage.js

var storage = function() {
"use strict";
var e = [], t = [], n = !1, r = new Date, i = function() {
return r.getWeek();
}, s = {}, o = !1, u = {}, a = [], f = {
update: []
}, l = function(e, t) {
return f[e] ? f[e].some(function(e) {
return e.toString() === t.toString;
}) || f[e].push(t) : log("event '" + e + "' does not exist"), this;
}, c = function(e, t) {
var n = 0;
if (f[e]) for (n = 0; n < f[e].length; n++) f[e][n](t); else log("event '" + e + "' does not exist");
return this;
}, h = data.get("persistentFilters") || "1", p = function(e) {
h = e ? "1" : "0", data.set("persistentFilters", h);
}, d = function() {
return h === "1";
}, v = {}, m = {}, g = function() {
h === "1" && (v = JSON.parse(data.get("filterProperties") || "{}"), m = JSON.parse(data.get("filterValues") || "{}"));
}, y = function() {
h === "1" && (data.set("filterProperties", JSON.stringify(v)), data.set("filterValues", JSON.stringify(m)));
}, b = function(e, t, n, r, i) {
if (typeof i[e] == "string") {
var s;
return r ? s = m[e].some(function(t) {
return t.type === "include" && t.value === i[e];
}) : s = m[e].every(function(t) {
return t.type === "exclude" && t.value !== i[e];
}), s;
}
var o = S(t, i[e]), u = E(n, i[e]);
return t.length === 0 ? u : n.length === 0 ? o : o && u;
}, w = function(r) {
A(function() {
var i = 0, s = 0, o = [], u = [];
if (!n) {
t = [];
for (i = 0, s = e.length; i < s; i++) t[i] = e[i];
var a = function(e) {
return e.type === "include";
}, f = function(e) {
return e.type === "exclude";
}, l = function(e) {
return e.value;
};
for (var c in v) if (v.hasOwnProperty(c)) {
o = m[c].filter(a).map(l), u = m[c].filter(f).map(l);
var h = m[c].some(a);
t = t.filter(b.bind(this, c, o, u, h));
}
n = !0;
}
r(t);
});
}, E = function(e, t) {
for (var n = 0; n < e.length; n++) if (t.indexOf(e[n]) !== -1) return !1;
return !0;
}, S = function(e, t) {
for (var n = 0; n < e.length; n++) if (t.indexOf(e[n]) === -1) return !1;
return !0;
}, x = function(e, t) {
n = !1, t = typeof t == "string" ? [ {
value: t,
type: "include"
} ] : t;
if (typeof t[0] == "string") for (var i = 0; i < t.length; i++) t[i] = {
value: t[i],
type: "include"
};
e === "date" && (r = st(t.sort()[t.length - 1].value)), v[e] = e, m[e] = t, y();
}, T = function(e) {
n = !1, delete v[e], delete m[e], y();
}, N = function() {
n = !1, v = {}, m = {}, y();
}, C = function(e, t) {
var n, r;
return e.date === t.date ? (n = e.mensa.toLowerCase(), r = t.mensa.toLowerCase(), n === r ? 0 : n > r ? 1 : -1) : e.date > t.date ? 1 : -1;
}, k = function(e) {
w(function(t) {
var n = t.sort(C), r = [], i = "", s = "", o = 0, u = n.length, a = !1, f = conf.getSavedURLs().length, l = f > 1 || !0, c = typeof m.mensa != "undefined", h = m.mensa ? m.mensa.filter(function(e) {
return e.type === "exclude";
}) : [], p = m.mensa ? m.mensa.filter(function(e) {
return e.type !== "exclude";
}) : [], d = p.length ? p.length : f - h.length, v = typeof m.date != "undefined" && m.date.length === 1 && m.date[0].type === "include";
t[0] && (c && d === 1 || f === 1) && r.push({
header: t[0].mensa,
type: "header",
headerType: "mensa"
});
for (o = 0; o < u; o++) a = o === 0, s !== n[o].date && !v && (r.length > 0 && (r[r.length - 1].last = !0), a = !0, r.push({
header: n[o].date,
type: "header",
headerType: "date"
})), i !== n[o].mensa && (!c || d !== 1) && f !== 1 && l && (r.length > 0 && (r[r.length - 1].last = !0), a = !0, r.push({
header: n[o].mensa,
type: "header",
headerType: "mensa"
})), n[o].type = "item", n[o].first = a, n[o].last = !1, r.push(n[o]), i = n[o].mensa, s = n[o].date;
r.length > 0 && (r[r.length - 1].last = !0), e(r);
});
}, L = function() {
var n = conf.getSavedURLs(), r = "", i = 0;
B(), e = e.filter(function(e) {
return n.indexOf(e.mensa) !== -1;
}), t = t.filter(function(e) {
return n.indexOf(e.mensa) !== -1;
});
var s = function(e, t, n) {
return e === n.mensa && parseInt(t, 10) === n.week;
};
for (var o in u) if (u.hasOwnProperty(o)) for (var a in u[o]) u[o].hasOwnProperty(a) && (u[o][a] = e.some(s.bind(this, o, a)));
return T("mensa"), H(), this;
}, A = function(t, n) {
n = n || r.getWeek();
var i = conf.getSavedURLs().every(function(e) {
return typeof u[e] != "undefined" && !!u[e][n];
});
return i ? t(e) : (a.push(t), O(n)), this;
}, O = function(e, t) {
var i = conf.getSavedURLs(), o = "", a = (new Date).getWeek(), f = "";
e = e || r.getWeek();
for (var l = 0; l < i.length; l++) o = i[l], u[o] = u[o] || {}, (!u[o][e] || t) && !s[o + e] && (e === a || e === a + 1) && (n = !1, s[o + e] = !0, f = urls.mensenWeek[o].replace("{{week}}", e), xhr.get(f, M, _, {
mensa: o,
week: e
}));
P();
}, M = function(t, n) {
var r = n.mensa, i = n.week, a = JSON.parse(t || "[]");
a && a.length > 0 && (e = e.filter(function(e) {
return parseInt(e.week, 10) !== i || e.mensa !== r;
}), e = e.concat(a), u[r][i] = !0, o = !0), delete s[n.mensa + n.week], P();
}, _ = function(e, t) {
log("xhr error"), delete s[t.mensa + t.week], P();
}, D = function(e, t, n) {
var r, i, s, o, u, a, f, l = [], c = [], h = 0, p, d, v = document.createElement("div"), m, g, y, b, w, E, S, x = [];
v.innerHTML = e.replace(/src="(.)*?"/g, "").replace(/<script(.|\s)*?\/script>/g, "");
try {
i = v.getElementsByTagName("table")[0].getElementsByTagName("tr");
} catch (T) {
return log("return: tr not found for " + t + " on week " + n), [];
}
var N = i[0].getElementsByTagName("th")[0].innerHTML.split("<br>")[1], C = N.split("-")[0].trim(), k = C.split("."), L = new Date(k[2], k[1] - 1, k[0]);
for (var A = 1; A < i.length; A++) {
try {
r = i[A].getElementsByTagName("td"), E = i[A].getElementsByTagName("th");
} catch (T) {
log(T);
continue;
}
o = E[0].innerText.trim(), o = o.replace(/_+$/, "");
for (var O = 0; O <= 4; O++) {
try {
m = r[O].getElementsByTagName("p");
} catch (T) {
log(T);
continue;
}
for (var M = 0; M < m.length; M++) {
if (m[M].getElementsByClassName) g = m[M].getElementsByClassName("price")[0]; else {
var _ = m[M].getElementsByTagName("*"), D = _.length;
for (h = 0; h < D; h++) if (_[h].className === "price") {
g = _[h];
break;
}
}
g ? (y = g.innerHTML.replace("\u20ac", "").replace(" ", "").split("/"), m[M].removeChild(g)) : (y = m[M].innerText.match(/[0-9]+,[0-9][0-9]/g) || [ "0", "0" ], y = y.length === 2 ? y : [ "0", "0" ], m[M].innerHTML = m[M].innerHTML.replace(/[0-9]+,[0-9][0-9]/g, "")), b = y[0].replace(/[^0-9,]/g, ""), w = y[1].replace(/[^0-9,]/g, ""), l = [], S = {}, p = m[M].getElementsByTagName("img");
for (h = 0; h < p.length; h++) S[p[h].title] = p[h].title;
for (var P in S) S.hasOwnProperty(P) && l.push(P);
c = [], S = {}, d = m[M].getElementsByTagName("span");
for (h = 0; h < d.length; h++) d[h].className === "tooltip" && (S[d[h].title] = d[h].title);
for (P in S) S.hasOwnProperty(P) && c.push(P);
s = m[M].innerText, s = s.replace(/&nbsp;/g, ""), s = s.replace(/\(([0-9.]+,?[\s]*)*\)/g, " "), s = s.replace(/[\s]+,[\s]*/g, ", "), s = s.replace(/[\s]+/g, " ").trim(), u = new Date(L.valueOf() + O * 24 * 60 * 60 * 1e3), a = u.getFullYear() + "-" + (u.getMonth() + 1) + "-" + u.getDate(), s !== "" && x.push({
mensa: t,
week: n,
name: o,
dish: s,
studPrice: b,
normalPrice: w,
date: a,
properties: l,
additives: c
});
}
}
}
return x;
}, P = function() {
if (Object.keys(s).length === 0) {
t.length === 0 && (t = e);
while (a.length > 0) a.pop()(t);
o && (H(), c("update"), o = !1);
}
}, H = function() {
data.save("menu", JSON.stringify(e)), data.save("loadedMensen", JSON.stringify(u));
}, B = function() {
try {
e = JSON.parse(data.get("menu")) || [];
} catch (t) {
e = [];
}
try {
u = JSON.parse(data.get("loadedMensen")) || {};
} catch (t) {
u = {};
}
}, j = function() {
data.remove("menu"), data.remove("loadedMensen");
}, F = function() {
var t = (new Date).getWeek(), n = "";
e = e.filter(function(e) {
return t === parseInt(e.week, 10) || t + 1 === parseInt(e.week, 10);
}), H();
}, I = function(t) {
A(function() {
var n, r = {}, i = [], s = e.length;
while (s--) r[e[s].name] = !0;
for (n in r) r.hasOwnProperty(n) && i.push(n);
t(i);
});
}, q = function(t) {
A(function() {
var n, r = {}, i = [], s = e.length, o = function(e, t) {
return t.value === e;
};
while (s--) r[e[s].name] = !0;
for (n in r) r.hasOwnProperty(n) && i.push({
content: n,
name: n,
filtered: typeof m.name != "undefined" && m.name.some(o.bind(this, n)),
filter: m.name ? m.name.filter(o.bind(this, n))[0] : []
});
t(i);
});
}, R = function(t, n) {
A(function() {
var r, i = {}, s = [], o = e.length, u = function(e, t) {
return t.value === e;
};
while (o--) for (var a = 0; a < e[o][t].length; a++) i[e[o][t][a]] = !0;
for (r in i) i.hasOwnProperty(r) && s.push({
content: r,
name: r,
filtered: typeof v.name != "undefined" && m.name.indexOf(r) !== -1,
filterType: typeof v.name != "undefined" && m.name.indexOf(r) !== -1,
filter: m[t] ? m[t].filter(u.bind(this, r))[0] : []
});
n(s);
});
}, U = function(e) {
R("properties", e);
}, z = function(e) {
R("additives", e);
}, W = function(e) {
var t = urls.mensen, n = conf.getSavedURLs();
return t.forEach(function(e, t) {
e.content = e.name, e.active = n.indexOf(e.name) !== -1, e.filtered = typeof m.mensa != "undefined" && m.mensa.some(function(t) {
return t.value === e.name;
}), e.filter = m.mensa ? m.mensa.filter(function(t) {
return t.value === e.name;
})[0] : [];
}), e && e(t), t;
}, X = function(e) {
var t = $(!0), n = t.length, r = function(e, t) {
return t.value === e;
};
while (n--) t[n] = {
filtered: typeof v.date != "undefined" && m.date.some(r.bind(this, t[n])),
name: t[n],
content: dateToString(t[n]),
filter: m.date ? m.date.filter(r.bind(this, t[n]))[0] : []
};
e(t);
}, V = function(e, t) {
return e === "date" ? X(t) : e === "mensa" ? W(t) : e === "name" ? q(t) : e === "additives" ? z(t) : e === "properties" && U(t), this;
}, $ = function(e) {
var t = e ? 12 : 5, n = new Date, r = n.setDate(n.getDate() - (n.getDay() + 6) % 7), i = [];
for (var s = 0; s < t; s++) s !== 5 && s !== 6 && (n = new Date(r.valueOf() + s * 3600 * 24 * 1e3), i.push(it(n)));
return i;
}, J = function(e, t) {
t = typeof t == "undefined" ? !0 : t, r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0), r.getDay() === 6 ? r.setDate(r.getDate() + 2) : r.getDay() === 0 && r.setDate(r.getDate() + 1), Y(r, t, e);
}, K = function(e, t) {
r = new Date, r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0), t = typeof t == "undefined" ? !0 : t, r.getDay() === 6 ? r.setDate(r.getDate() + 2) : r.getDay() === 0 && r.setDate(r.getDate() + 1), Y(r, t, e);
}, Q = function(e, t) {
var n = r.getDay();
return t = typeof t == "undefined" ? !0 : t, n === 5 ? r.setDate(r.getDate() + 3) : r.setDate(r.getDate() + 1), Y(r, t, e), this;
}, G = function(e, t) {
var n = r.getDay();
t = typeof t == "undefined" ? !0 : t, n === 1 ? r.setDate(r.getDate() - 3) : r.setDate(r.getDate() - 1), Y(r, t, e);
}, Y = function(e, t, n) {
x("date", it(e)), t ? k(function(t) {
n(t, it(e), e);
}) : w(function(t) {
n(t, it(e), e);
});
}, Z = function() {
var e = new Date(r.valueOf()), t = r.getDay();
return t === 1 ? e.setDate(e.getDate() - 3) : e.setDate(e.getDate() - 1), $(!0).indexOf(it(e)) !== -1;
}, et = function() {
var e = new Date(r.valueOf()), t = r.getDay();
return t === 5 ? e.setDate(r.getDate() + 3) : e.setDate(r.getDate() + 1), $(!0).indexOf(it(e)) !== -1;
}, tt = function() {
var e = (new Date).getWeek();
O(e, !0), O(e + 1, !0);
}, nt = 0, rt = function() {
var e = +(new Date), t = 864e5;
e - nt > t && (tt(), nt = e), setTimeout(rt, 36e5);
}, it = function(e) {
return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
}, st = function(e) {
return e = e.split("-"), new Date(e[0], e[1] - 1, e[2]);
};
return B(), g(), F(), rt(), {
clearCache: j,
cleanData: L,
getInfo: V,
getTypeInfo: q,
getMensaInfo: W,
getDateInfo: X,
getPropertiesInfo: U,
getAdditivesInfo: z,
getTypes: I,
getAvailableDates: $,
setFilter: x,
unsetFilter: T,
unsetFilters: N,
setMensaFilter: function(e) {
x("mensa", e);
},
unsetMensaFilter: function() {
T("mensa");
},
setNameFilter: function(e) {
x("name", e);
},
unsetNameFilter: function() {
T("name");
},
setDateFilter: function(e) {
x("date", e);
},
unsetDateFilter: function() {
T("date");
},
setPersistentFilters: p,
getPersistentFilters: d,
getWeekMenu: A,
getSortedSegmented: k,
filter: w,
isNextDayAvailable: et,
isPrevDayAvailable: Z,
thisDay: J,
nextDay: Q,
prevDay: G,
today: K,
day: Y,
on: l,
update: tt,
dateToDateString: it,
dateStringToDate: st
};
}();

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
onclick: ""
},
tap: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !this.disabled;
},
dragstart: function() {}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v",
animated: !0
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.animatedChanged(), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
animatedChanged: function() {
!this.animated && this.hasNode() && this.$.animator.isAnimating() && (this.$.animator.stop(), this.animatorEnd());
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.animated ? this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
}) : this.animatorEnd();
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
this.$.client.domCssText = enyo.Control.domStylesToCssText(this.$.client.domStyles);
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left", r = this.$.client.hasNode();
r && (r.style[n] = this.$.client.domStyles[n] = null), this.node && (this.node.style[t] = this.domStyles[t] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling && this.createComponents(this.childComponents, {
isChrome: !0
}), this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling && this.getScroller().setMaxHeight(this.maxHeight + "px");
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling && this.getScroller().setShowing(this.showing), this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop && this.getScroller().setMaxHeight(this.maxHeight + "px"), this.removeClass("onyx-menu-up"), this.floating || this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: r - e.width
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
events: {
onSelect: "",
onItemContentChange: ""
},
classes: "onyx-menu-item",
tag: "div",
create: function() {
this.inherited(arguments), this.active && this.bubble("onActivate");
},
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
},
contentChanged: function(e) {
this.inherited(arguments), this.doItemContentChange({
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
t.content !== undefined && this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
handlers: {
onItemContentChange: "itemContentChange"
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
itemContentChange: function(e, t) {
t.originator == this.selected && this.doChange({
selected: this.selected,
content: this.selected.content
});
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments), this.$.flyweight.$.client.children[0].setActive(!0);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e !== undefined && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e)), this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected");
var t = this.$.flyweight.fetchRowNode(this.selected);
this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// DatePicker.js

enyo.kind({
name: "onyx.DatePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: "en_us",
dayHidden: !1,
monthHidden: !1,
yearHidden: !1,
minYear: 1900,
maxYear: 2099,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments), enyo.g11n && (this.locale = enyo.g11n.currentLocale().getLocale()), this.initDefaults();
},
initDefaults: function() {
var e = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
enyo.g11n && (this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getMonthFields()), this.setupPickers(this._tf ? this._tf.getDateFieldOrder() : "mdy"), this.dayHiddenChanged(), this.monthHiddenChanged(), this.yearHiddenChanged();
var t = this.value = this.value || new Date;
for (var n = 0, r; r = e[n]; n++) this.$.monthPicker.createComponent({
content: r,
value: n,
active: n == t.getMonth()
});
var i = t.getFullYear();
this.$.yearPicker.setSelected(i - this.minYear);
for (n = 1; n <= this.monthLength(t.getYear(), t.getMonth()); n++) this.$.dayPicker.createComponent({
content: n,
value: n,
active: n == t.getDate()
});
},
monthLength: function(e, t) {
return 32 - (new Date(e, t, 32)).getDate();
},
setupYear: function(e, t) {
this.$.year.setContent(this.minYear + t.index);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "d":
this.createDay();
break;
case "m":
this.createMonth();
break;
case "y":
this.createYear();
break;
default:
}
}
},
createYear: function() {
var e = this.maxYear - this.minYear;
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateYear",
components: [ {
classes: "onyx-datepicker-year",
name: "yearPickerButton",
disabled: this.disabled
}, {
name: "yearPicker",
kind: "onyx.FlyweightPicker",
count: ++e,
onSetupItem: "setupYear",
components: [ {
name: "year"
} ]
} ]
});
},
createMonth: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMonth",
components: [ {
classes: "onyx-datepicker-month",
name: "monthPickerButton",
disabled: this.disabled
}, {
name: "monthPicker",
kind: "onyx.Picker"
} ]
});
},
createDay: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateDay",
components: [ {
classes: "onyx-datepicker-day",
name: "dayPickerButton",
disabled: this.disabled
}, {
name: "dayPicker",
kind: "onyx.Picker"
} ]
});
},
localeChanged: function() {
this.refresh();
},
dayHiddenChanged: function() {
this.$.dayPicker.getParent().setShowing(this.dayHidden ? !1 : !0);
},
monthHiddenChanged: function() {
this.$.monthPicker.getParent().setShowing(this.monthHidden ? !1 : !0);
},
yearHiddenChanged: function() {
this.$.yearPicker.getParent().setShowing(this.yearHidden ? !1 : !0);
},
minYearChanged: function() {
this.refresh();
},
maxYearChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
disabledChanged: function() {
this.$.yearPickerButton.setDisabled(this.disabled), this.$.monthPickerButton.setDisabled(this.disabled), this.$.dayPickerButton.setDisabled(this.disabled);
},
updateDay: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), this.value.getMonth(), t.selected.value);
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateMonth: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), t.selected.value, this.value.getDate());
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateYear: function(e, t) {
if (t.originator.selected != -1) {
var n = this.calcDate(this.minYear + t.originator.selected, this.value.getMonth(), this.value.getDate());
this.doSelect({
name: this.name,
value: n
}), this.setValue(n);
}
return !0;
},
calcDate: function(e, t, n) {
return new Date(e, t, n, this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// TimePicker.js

enyo.kind({
name: "onyx.TimePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: "en_us",
is24HrMode: null,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments), enyo.g11n && (this.locale = enyo.g11n.currentLocale().getLocale()), this.initDefaults();
},
initDefaults: function() {
var e = "AM", t = "PM";
this.is24HrMode == null && (this.is24HrMode = !1), enyo.g11n && (this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getAmCaption(), t = this._tf.getPmCaption(), this.is24HrMode == null && (this.is24HrMode = !this._tf.isAmPm())), this.setupPickers(this._tf ? this._tf.getTimeFieldOrder() : "hma");
var n = this.value = this.value || new Date, r;
if (!this.is24HrMode) {
var i = n.getHours();
i = i === 0 ? 12 : i;
for (r = 1; r <= 12; r++) this.$.hourPicker.createComponent({
content: r,
value: r,
active: r == (i > 12 ? i % 12 : i)
});
} else for (r = 0; r < 24; r++) this.$.hourPicker.createComponent({
content: r,
value: r,
active: r == n.getHours()
});
for (r = 0; r <= 59; r++) this.$.minutePicker.createComponent({
content: r < 10 ? "0" + r : r,
value: r,
active: r == n.getMinutes()
});
n.getHours() >= 12 ? this.$.ampmPicker.createComponents([ {
content: e
}, {
content: t,
active: !0
} ]) : this.$.ampmPicker.createComponents([ {
content: e,
active: !0
}, {
content: t
} ]), this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "h":
this.createHour();
break;
case "m":
this.createMinute();
break;
case "a":
this.createAmPm();
break;
default:
}
}
},
createHour: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateHour",
components: [ {
classes: "onyx-timepicker-hour",
name: "hourPickerButton",
disabled: this.disabled
}, {
name: "hourPicker",
kind: "onyx.Picker"
} ]
});
},
createMinute: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMinute",
components: [ {
classes: "onyx-timepicker-minute",
name: "minutePickerButton",
disabled: this.disabled
}, {
name: "minutePicker",
kind: "onyx.Picker"
} ]
});
},
createAmPm: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateAmPm",
components: [ {
classes: "onyx-timepicker-ampm",
name: "ampmPickerButton",
disabled: this.disabled
}, {
name: "ampmPicker",
kind: "onyx.Picker"
} ]
});
},
disabledChanged: function() {
this.$.hourPickerButton.setDisabled(this.disabled), this.$.minutePickerButton.setDisabled(this.disabled), this.$.ampmPickerButton.setDisabled(this.disabled);
},
localeChanged: function() {
this.is24HrMode = null, this.refresh();
},
is24HrModeChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
updateHour: function(e, t) {
var n = t.selected.value;
if (!this.is24HrMode) {
var r = this.$.ampmPicker.getParent().controlAtIndex(0).content;
n = n + (n == 12 ? -12 : 0) + (this.isAm(r) ? 0 : 12);
}
return this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateMinute: function(e, t) {
return this.value = this.calcTime(this.value.getHours(), t.selected.value), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateAmPm: function(e, t) {
var n = this.value.getHours();
return this.is24HrMode || (n += n > 11 ? this.isAm(t.content) ? -12 : 0 : this.isAm(t.content) ? 0 : 12), this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
calcTime: function(e, t) {
return new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), e, t, this.value.getSeconds(), this.value.getMilliseconds());
},
isAm: function(e) {
var t, n, r;
try {
t = this._tf.getAmCaption(), n = this._tf.getPmCaption();
} catch (i) {
t = "AM", n = "PM";
}
return e == t ? !0 : !1;
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
defaultKind: "onyx.RadioButton",
highlander: !0
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.updateVisualState();
},
updateVisualState: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value);
},
valueChanged: function() {
this.updateVisualState(), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// ToggleIconButton.js

enyo.kind({
name: "onyx.ToggleIconButton",
kind: "onyx.Icon",
published: {
active: !1,
value: !1
},
events: {
onChange: ""
},
classes: "onyx-icon-button onyx-icon-toggle",
activeChanged: function() {
this.addRemoveClass("active", this.value), this.bubble("onActivate");
},
updateValue: function(e) {
this.disabled || (this.setValue(e), this.doChange({
value: this.value
}));
},
tap: function() {
this.updateValue(!this.value);
},
valueChanged: function() {
this.setActive(this.value);
},
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active);
},
rendered: function() {
this.inherited(arguments), this.valueChanged(), this.removeClass("onyx-icon");
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0,
increment: 0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
calcIncrement: function(e) {
return Math.round(e / this.increment) * this.increment;
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return n = this.increment ? this.calcIncrement(n) : n, this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return n = this.increment ? this.calcIncrement(n) : n, this.tapped = !0, this.animateTo(n), !0;
}
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// RangeSlider.js

enyo.kind({
name: "onyx.RangeSlider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
rangeMin: 0,
rangeMax: 100,
rangeStart: 0,
rangeEnd: 100,
beginValue: 0,
endValue: 0
},
events: {
onChange: "",
onChanging: ""
},
showStripes: !1,
showLabels: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
ondown: "down"
},
moreComponents: [ {
name: "startKnob",
classes: "onyx-slider-knob"
}, {
name: "endKnob",
classes: "onyx-slider-knob onyx-range-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.initControls();
},
rendered: function() {
this.inherited(arguments);
var e = this.calcPercent(this.beginValue);
this.updateBarPosition(e);
},
initControls: function() {
this.$.bar.applyStyle("position", "relative"), this.refreshRangeSlider(), this.showLabels && (this.$.startKnob.createComponent({
name: "startLabel",
kind: "onyx.RangeSliderKnobLabel"
}), this.$.endKnob.createComponent({
name: "endLabel",
kind: "onyx.RangeSliderKnobLabel"
}));
},
refreshRangeSlider: function() {
this.beginValue = this.calcKnobPercent(this.rangeStart), this.endValue = this.calcKnobPercent(this.rangeEnd), this.beginValueChanged(), this.endValueChanged();
},
calcKnobRatio: function(e) {
return (e - this.rangeMin) / (this.rangeMax - this.rangeMin);
},
calcKnobPercent: function(e) {
return this.calcKnobRatio(e) * 100;
},
beginValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.beginValue);
this.updateKnobPosition(t, this.$.startKnob);
}
},
endValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.endValue);
this.updateKnobPosition(t, this.$.endKnob);
}
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
updateKnobPosition: function(e, t) {
t.applyStyle("left", e + "%"), this.updateBarPosition();
},
updateBarPosition: function() {
if (this.$.startKnob !== undefined && this.$.endKnob !== undefined) {
var e = this.calcKnobPercent(this.rangeStart), t = this.calcKnobPercent(this.rangeEnd) - e;
this.$.bar.applyStyle("left", e + "%"), this.$.bar.applyStyle("width", t + "%");
}
},
calcRangeRatio: function(e) {
return e / 100 * (this.rangeMax - this.rangeMin) + this.rangeMin - this.increment / 2;
},
swapZIndex: function(e) {
e === "startKnob" ? (this.$.startKnob.applyStyle("z-index", 1), this.$.endKnob.applyStyle("z-index", 0)) : e === "endKnob" && (this.$.startKnob.applyStyle("z-index", 0), this.$.endKnob.applyStyle("z-index", 1));
},
down: function(e, t) {
this.swapZIndex(e.name);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t), r, i, s;
if (e.name === "startKnob" && n >= 0) {
if (!(n <= this.endValue && t.xDirection === -1 || n <= this.endValue)) return this.drag(this.$.endKnob, t);
this.setBeginValue(n), r = this.calcRangeRatio(this.beginValue), i = this.increment ? this.calcIncrement(r + .5 * this.increment) : r, s = this.calcKnobPercent(i), this.updateKnobPosition(s, this.$.startKnob), this.setRangeStart(i), this.doChanging({
value: i
});
} else if (e.name === "endKnob" && n <= 100) {
if (!(n >= this.beginValue && t.xDirection === 1 || n >= this.beginValue)) return this.drag(this.$.startKnob, t);
this.setEndValue(n), r = this.calcRangeRatio(this.endValue), i = this.increment ? this.calcIncrement(r + .5 * this.increment) : r, s = this.calcKnobPercent(i), this.updateKnobPosition(s, this.$.endKnob), this.setRangeEnd(i), this.doChanging({
value: i
});
}
return !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, t.preventTap();
var n;
return e.name === "startKnob" ? (n = this.calcRangeRatio(this.beginValue), this.doChange({
value: n,
startChanged: !0
})) : e.name === "endKnob" && (n = this.calcRangeRatio(this.endValue), this.doChange({
value: n,
startChanged: !1
})), !0;
},
rangeMinChanged: function() {
this.refreshRangeSlider();
},
rangeMaxChanged: function() {
this.refreshRangeSlider();
},
rangeStartChanged: function() {
this.refreshRangeSlider();
},
rangeEndChanged: function() {
this.refreshRangeSlider();
},
setStartLabel: function(e) {
this.$.startKnob.waterfallDown("onSetLabel", e);
},
setEndLabel: function(e) {
this.$.endKnob.waterfallDown("onSetLabel", e);
}
}), enyo.kind({
name: "onyx.RangeSliderKnobLabel",
classes: "onyx-range-slider-label",
handlers: {
onSetLabel: "setLabel"
},
setLabel: function(e, t) {
this.setContent(t);
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", !0, t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", !1, t);
},
statics: {
addRemoveFlyweightClass: function(e, t, n, r, i) {
var s = r.flyweight;
if (s) {
var o = i !== undefined ? i : r.index;
s.performOnRow(o, function() {
e.addRemoveClass(t, n);
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
noStretch: !0,
fit: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu"
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e, null);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex !== undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex === undefined && (c.toolbarIndex = t);
}
}
});

// IntegerPicker.js

enyo.kind({
name: "onyx.IntegerPicker",
kind: "onyx.Picker",
published: {
value: 0,
min: 0,
max: 9
},
create: function() {
this.inherited(arguments), this.rangeChanged();
},
minChanged: function() {
this.destroyClientControls(), this.rangeChanged(), this.render();
},
maxChanged: function() {
this.destroyClientControls(), this.rangeChanged(), this.render();
},
rangeChanged: function() {
for (var e = this.min; e <= this.max; e++) this.createComponent({
content: e,
active: e === this.value ? !0 : !1
});
},
valueChanged: function(e) {
var t = this.getClientControls(), n = t.length;
this.value = this.value >= this.min && this.value <= this.max ? this.value : this.min;
for (var r = 0; r < n; r++) if (this.value === parseInt(t[r].content)) {
this.setSelected(t[r]);
break;
}
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
})), this.value = parseInt(this.selected.content);
}
});

// ContextualPopup.js

enyo.kind({
name: "onyx.ContextualPopup",
kind: "enyo.Popup",
modal: !0,
autoDismiss: !0,
floating: !1,
classes: "onyx-contextual-popup enyo-unselectable",
published: {
maxHeight: 100,
scrolling: !0,
title: undefined,
actionButtons: []
},
vertFlushMargin: 60,
horizFlushMargin: 50,
widePopup: 200,
longPopup: 200,
horizBuffer: 16,
events: {
onTap: ""
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestShow",
onRequestHideMenu: "requestHide"
},
components: [ {
name: "title",
classes: "onyx-contextual-popup-title"
}, {
classes: "onyx-contextual-popup-scroller",
components: [ {
name: "client",
kind: "enyo.Scroller",
vertical: "auto",
classes: "enyo-unselectable",
thumb: !1,
strategyKind: "TouchScrollStrategy"
} ]
}, {
name: "actionButtons",
classes: "onyx-contextual-popup-action-buttons"
} ],
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged(), this.titleChanged(), this.actionButtonsChanged();
},
getScroller: function() {
return this.$[this.scrollerName];
},
titleChanged: function() {
this.$.title.setContent(this.title);
},
actionButtonsChanged: function() {
for (var e = 0; e < this.actionButtons.length; e++) this.$.actionButtons.createComponent({
kind: "onyx.Button",
content: this.actionButtons[e].content,
classes: this.actionButtons[e].classes + " onyx-contextual-popup-action-button",
name: this.actionButtons[e].name ? this.actionButtons[e].name : "ActionButton" + e,
index: e,
tap: enyo.bind(this, this.tapHandler)
});
},
tapHandler: function(e, t) {
return t.actionButton = !0, t.popup = this, this.bubble("ontap", t), !0;
},
maxHeightChanged: function() {
this.scrolling && this.getScroller().setMaxHeight(this.maxHeight + "px");
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling && this.getScroller().setShowing(this.showing), this.adjustPosition();
},
requestShow: function(e, t) {
var n = t.activator.hasNode();
return n && (this.activatorOffset = this.getPageOffset(n)), this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = this.getBoundingRect(e), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.resetPositioning();
var e = this.getViewWidth(), t = this.getViewHeight(), n = this.vertFlushMargin, r = t - this.vertFlushMargin, i = this.horizFlushMargin, s = e - this.horizFlushMargin;
if (this.activatorOffset.top + this.activatorOffset.height < n || this.activatorOffset.top > r) {
if (this.applyVerticalFlushPositioning(i, s)) return;
if (this.applyHorizontalFlushPositioning(i, s)) return;
if (this.applyVerticalPositioning()) return;
} else if (this.activatorOffset.left + this.activatorOffset.width < i || this.activatorOffset.left > s) if (this.applyHorizontalPositioning()) return;
var o = this.getBoundingRect(this.node);
if (o.width > this.widePopup) {
if (this.applyVerticalPositioning()) return;
} else if (o.height > this.longPopup && this.applyHorizontalPositioning()) return;
if (this.applyVerticalPositioning()) return;
if (this.applyHorizontalPositioning()) return;
}
},
initVerticalPositioning: function() {
this.resetPositioning(), this.addClass("vertical");
var e = this.getBoundingRect(this.node), t = this.getViewHeight();
return this.floating ? this.activatorOffset.top < t / 2 ? (this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height,
bottom: "auto"
}), this.addClass("below")) : (this.applyPosition({
top: this.activatorOffset.top - e.height,
bottom: "auto"
}), this.addClass("above")) : e.top + e.height > t && t - e.bottom < e.top - e.height ? this.addClass("above") : this.addClass("below"), e = this.getBoundingRect(this.node), e.top + e.height > t || e.top < 0 ? !1 : !0;
},
applyVerticalPositioning: function() {
if (!this.initVerticalPositioning()) return !1;
var e = this.getBoundingRect(this.node), t = this.getViewWidth();
if (this.floating) {
var n = this.activatorOffset.left + this.activatorOffset.width / 2 - e.width / 2;
n + e.width > t ? (this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width - e.width
}), this.addClass("left")) : n < 0 ? (this.applyPosition({
left: this.activatorOffset.left
}), this.addClass("right")) : this.applyPosition({
left: n
});
} else {
var r = this.activatorOffset.left + this.activatorOffset.width / 2 - e.left - e.width / 2;
e.right + r > t ? (this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width - e.right
}), this.addRemoveClass("left", !0)) : e.left + r < 0 ? this.addRemoveClass("right", !0) : this.applyPosition({
left: r
});
}
return !0;
},
applyVerticalFlushPositioning: function(e, t) {
if (!this.initVerticalPositioning()) return !1;
var n = this.getBoundingRect(this.node), r = this.getViewWidth();
return this.activatorOffset.left + this.activatorOffset.width / 2 < e ? (this.activatorOffset.left + this.activatorOffset.width / 2 < this.horizBuffer ? this.applyPosition({
left: this.horizBuffer + (this.floating ? 0 : -n.left)
}) : this.applyPosition({
left: this.activatorOffset.width / 2 + (this.floating ? this.activatorOffset.left : 0)
}), this.addClass("right"), this.addClass("corner"), !0) : this.activatorOffset.left + this.activatorOffset.width / 2 > t ? (this.activatorOffset.left + this.activatorOffset.width / 2 > r - this.horizBuffer ? this.applyPosition({
left: r - this.horizBuffer - n.right
}) : this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width / 2 - n.right
}), this.addClass("left"), this.addClass("corner"), !0) : !1;
},
initHorizontalPositioning: function() {
this.resetPositioning();
var e = this.getBoundingRect(this.node), t = this.getViewWidth();
return this.floating ? this.activatorOffset.left + this.activatorOffset.width < t / 2 ? (this.applyPosition({
left: this.activatorOffset.left + this.activatorOffset.width
}), this.addRemoveClass("left", !0)) : (this.applyPosition({
left: this.activatorOffset.left - e.width
}), this.addRemoveClass("right", !0)) : this.activatorOffset.left - e.width > 0 ? (this.applyPosition({
left: this.activatorOffset.left - e.left - e.width
}), this.addRemoveClass("right", !0)) : (this.applyPosition({
left: this.activatorOffset.width
}), this.addRemoveClass("left", !0)), this.addRemoveClass("horizontal", !0), e = this.getBoundingRect(this.node), e.left < 0 || e.left + e.width > t ? !1 : !0;
},
applyHorizontalPositioning: function() {
if (!this.initHorizontalPositioning()) return !1;
var e = this.getBoundingRect(this.node), t = this.getViewHeight(), n = this.activatorOffset.top + this.activatorOffset.height / 2;
return this.floating ? n >= t / 2 - .05 * t && n <= t / 2 + .05 * t ? this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height / 2 - e.height / 2,
bottom: "auto"
}) : this.activatorOffset.top + this.activatorOffset.height < t / 2 ? (this.applyPosition({
top: this.activatorOffset.top - this.activatorOffset.height,
bottom: "auto"
}), this.addRemoveClass("high", !0)) : (this.applyPosition({
top: this.activatorOffset.top - e.height + this.activatorOffset.height * 2,
bottom: "auto"
}), this.addRemoveClass("low", !0)) : n >= t / 2 - .05 * t && n <= t / 2 + .05 * t ? this.applyPosition({
top: (this.activatorOffset.height - e.height) / 2
}) : this.activatorOffset.top + this.activatorOffset.height < t / 2 ? (this.applyPosition({
top: -this.activatorOffset.height
}), this.addRemoveClass("high", !0)) : (this.applyPosition({
top: e.top - e.height - this.activatorOffset.top + this.activatorOffset.height
}), this.addRemoveClass("low", !0)), !0;
},
applyHorizontalFlushPositioning: function(e, t) {
if (!this.initHorizontalPositioning()) return !1;
var n = this.getBoundingRect(this.node), r = this.getViewWidth();
return this.floating ? this.activatorOffset.top < innerHeight / 2 ? (this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height / 2
}), this.addRemoveClass("high", !0)) : (this.applyPosition({
top: this.activatorOffset.top + this.activatorOffset.height / 2 - n.height
}), this.addRemoveClass("low", !0)) : n.top + n.height > innerHeight && innerHeight - n.bottom < n.top - n.height ? (this.applyPosition({
top: n.top - n.height - this.activatorOffset.top - this.activatorOffset.height / 2
}), this.addRemoveClass("low", !0)) : (this.applyPosition({
top: this.activatorOffset.height / 2
}), this.addRemoveClass("high", !0)), this.activatorOffset.left + this.activatorOffset.width < e ? (this.addClass("left"), this.addClass("corner"), !0) : this.activatorOffset.left > t ? (this.addClass("right"), this.addClass("corner"), !0) : !1;
},
getBoundingRect: function(e) {
var t = e.getBoundingClientRect();
return !t.width || !t.height ? {
left: t.left,
right: t.right,
top: t.top,
bottom: t.bottom,
width: t.right - t.left,
height: t.bottom - t.top
} : t;
},
getViewHeight: function() {
return window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight;
},
getViewWidth: function() {
return window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
},
resetPositioning: function() {
this.removeClass("right"), this.removeClass("left"), this.removeClass("high"), this.removeClass("low"), this.removeClass("corner"), this.removeClass("below"), this.removeClass("above"), this.removeClass("vertical"), this.removeClass("horizontal"), this.applyPosition({
left: "auto"
}), this.applyPosition({
top: "auto"
});
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: ""
},
events: {
onSetupItem: ""
},
bottomUp: !1,
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
create: function() {
this.inherited(arguments), this.noSelectChanged(), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
noSelectChanged: function() {
this.noSelect && this.$.selection.clear();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("data-enyo-index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
if (this.noSelect) return;
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
var t = this.fetchRowNode(e);
t && (this.setupItem(e), t.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(e) {
if (this.hasNode()) {
var t = this.node.querySelectorAll('[data-enyo-index="' + e + '"]');
return t && t[0];
}
},
rowForEvent: function(e) {
var t = e.target, n = this.hasNode().id;
while (t && t.parentNode && t.id != n) {
var r = t.getAttribute && t.getAttribute("data-enyo-index");
if (r !== null) return Number(r);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n = t && t.querySelectorAll("#" + e.id);
n = n && n[0], e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1
},
events: {
onSetupItem: ""
},
handlers: {
onAnimateFinish: "animateFinish"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
} ]
} ],
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.noSelectChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
noSelectChanged: function() {
this.$.generator.setNoSelect(this.noSelect);
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
generatePage: function(e, t) {
this.page = e;
var n = this.$.generator.rowOffset = this.rowsPerPage * this.page, r = this.$.generator.count = Math.min(this.count - n, this.rowsPerPage), i = this.$.generator.generateChildHtml();
t.setContent(i);
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
o != s && s > 0 && (this.pageHeights[e] = s, this.portSize += s - o);
}
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 === 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0), s = i % 2 === 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0), t && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return {
no: t,
height: r,
pos: n + r
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
return this.pageHeights[e] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments);
return this.update(this.getScrollTop()), n;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToRow: function(e) {
var t = Math.floor(e / this.rowsPerPage), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
deselect: function(e) {
return this.getSelection().deselect(e);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.inherited(arguments);
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath, i = r.y;
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath;
e.setScrollY(e.y - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0, this.$.strategy.$.scrollMath.setScrollY(this.pullHeight), this.$.strategy.$.scrollMath.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// AroundList.js

enyo.kind({
name: "enyo.AroundList",
kind: "enyo.List",
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "aboveClient"
}, {
name: "generator",
kind: "enyo.FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "belowClient"
} ]
} ],
aboveComponents: null,
initComponents: function() {
this.inherited(arguments), this.aboveComponents && this.$.aboveClient.createComponents(this.aboveComponents, {
owner: this.owner
}), this.belowComponents && this.$.belowClient.createComponents(this.belowComponents, {
owner: this.owner
});
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.aboveHeight = this.$.aboveClient.getBounds().height, this.belowHeight = this.$.belowClient.getBounds().height, this.portSize = this.aboveHeight + this.belowHeight;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e), r = this.bottomUp ? this.belowHeight : this.aboveHeight;
n += r, t.applyStyle(this.pageBound, n + "px");
},
scrollToContentStart: function() {
var e = this.bottomUp ? this.belowHeight : this.aboveHeight;
this.setScrollPosition(e);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
calcArrangementDifference: function(e, t, n, r) {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android && enyo.platform.ie !== 10) {
var i = t.left, s = t.top;
i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r, enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n === 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex;
t = this.container.toIndex, this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds, r, i, s, o, u;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var a;
for (r = 0, s = 0; u = e[r]; r++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (a = u);
if (a) {
var f = n.width - s;
a.width = f >= 0 ? f : a.width;
}
for (r = 0, i = t.left; u = e[r]; r++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n, r, i, s, o = this.container.getPanels(), u = this.container.clamp(t), a = this.containerBounds.width;
for (n = u, i = 0; s = o[n]; n++) {
i += s.width + s.marginWidth;
if (i > a) break;
}
var f = a - i, l = 0;
if (f > 0) {
var c = u;
for (n = u - 1, r = 0; s = o[n]; n--) {
r += s.width + s.marginWidth;
if (f - r <= 0) {
l = f - r, u = n;
break;
}
}
}
var h, p;
for (n = 0, p = this.containerPadding.left + l; s = o[n]; n++) h = s.width + s.marginWidth, n < u ? this.arrangeControl(s, {
left: -h
}) : (this.arrangeControl(s, {
left: Math.floor(p)
}), p += h);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o; o = n[r]; r++) this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
var n, r, i, s;
if (this.container.getPanels().length == 1) {
s = {}, s[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], s);
return;
}
var o = Math.floor(this.container.getPanels().length / 2), u = this.getOrderedControls(Math.floor(t) - o), a = this.containerBounds[this.axisSize] - this.margin - this.margin, f = this.margin - a * o;
for (n = 0; r = u[n]; n++) s = {}, s[this.axisPosition] = f, this.arrangeControl(r, s), f += a;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
onscroll: "domScroll"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged(), this.setAttribute("onscroll", enyo.bubbler);
},
domScroll: function(e, t) {
this.hasNode() && this.node.scrollLeft > 0 && (this.node.scrollLeft = 0);
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
destroy: function() {
this.destroying = !0, this.inherited(arguments);
},
removeControl: function(e) {
this.inherited(arguments), this.destroying && this.controls.length > 0 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels(), t = this.index % e.length;
return t < 0 ? t += e.length : enyo.nop, e[t];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), !this.dragging && this.$.animator && (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator && this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// ImageViewPin.js

enyo.kind({
name: "enyo.ImageViewPin",
kind: "enyo.Control",
published: {
highlightAnchorPoint: !1,
anchor: {
top: 0,
left: 0
},
position: {
top: 0,
left: 0
}
},
style: "position:absolute;z-index:1000;width:0px;height:0px;",
handlers: {
onPositionPin: "reAnchor"
},
create: function() {
this.inherited(arguments), this.styleClientControls(), this.positionClientControls(), this.highlightAnchorPointChanged(), this.anchorChanged();
},
styleClientControls: function() {
var e = this.getClientControls();
for (var t = 0; t < e.length; t++) e[t].applyStyle("position", "absolute");
},
positionClientControls: function() {
var e = this.getClientControls();
for (var t = 0; t < e.length; t++) for (p in this.position) e[t].applyStyle(p, this.position[p] + "px");
},
highlightAnchorPointChanged: function() {
this.highlightAnchorPoint ? this.addClass("pinDebug") : this.removeClass("pinDebug");
},
anchorChanged: function() {
var e = null, t = null;
for (t in this.anchor) {
e = this.anchor[t].toString().match(/^(\d+(?:\.\d+)?)(.*)$/);
if (!e) continue;
this.anchor[t + "Coords"] = {
value: e[1],
units: e[2] || "px"
};
}
},
reAnchor: function(e, t) {
var n = t.scale, r = t.bounds, i = this.anchor.right ? this.anchor.rightCoords.units == "px" ? r.width + r.x - this.anchor.rightCoords.value * n : r.width * (100 - this.anchor.rightCoords.value) / 100 + r.x : this.anchor.leftCoords.units == "px" ? this.anchor.leftCoords.value * n + r.x : r.width * this.anchor.leftCoords.value / 100 + r.x, s = this.anchor.bottom ? this.anchor.bottomCoords.units == "px" ? r.height + r.y - this.anchor.bottomCoords.value * n : r.height * (100 - this.anchor.bottomCoords.value) / 100 + r.y : this.anchor.topCoords.units == "px" ? this.anchor.topCoords.value * n + r.y : r.height * this.anchor.topCoords.value / 100 + r.y;
this.applyStyle("left", i + "px"), this.applyStyle("top", s + "px");
}
});

// ImageView.js

enyo.kind({
name: "enyo.ImageView",
kind: enyo.Scroller,
touchOverscroll: !1,
thumb: !1,
animate: !0,
verticalDragPropagation: !0,
horizontalDragPropagation: !0,
published: {
scale: "auto",
disableZoom: !1,
src: undefined
},
events: {
onZoom: ""
},
touch: !0,
preventDragPropagation: !1,
handlers: {
ondragstart: "dragPropagation"
},
components: [ {
name: "animator",
kind: "Animator",
onStep: "zoomAnimationStep",
onEnd: "zoomAnimationEnd"
}, {
name: "viewport",
style: "overflow:hidden;min-height:100%;min-width:100%;",
classes: "enyo-fit",
ongesturechange: "gestureTransform",
ongestureend: "saveState",
ontap: "singleTap",
ondblclick: "doubleClick",
onmousewheel: "mousewheel",
components: [ {
kind: "Image",
ondown: "down"
} ]
} ],
create: function() {
this.inherited(arguments), this.canTransform = enyo.dom.canTransform(), this.canTransform || this.$.image.applyStyle("position", "relative"), this.canAccelerate = enyo.dom.canAccelerate(), this.bufferImage = new Image, this.bufferImage.onload = enyo.bind(this, "imageLoaded"), this.bufferImage.onerror = enyo.bind(this, "imageError"), this.srcChanged(), this.getStrategy().setDragDuringGesture(!1), this.getStrategy().$.scrollMath.start();
},
down: function(e, t) {
t.preventDefault();
},
dragPropagation: function(e, t) {
var n = this.getStrategy().getScrollBounds(), r = n.top === 0 && t.dy > 0 || n.top >= n.maxTop - 2 && t.dy < 0, i = n.left === 0 && t.dx > 0 || n.left >= n.maxLeft - 2 && t.dx < 0;
return !(r && this.verticalDragPropagation || i && this.horizontalDragPropagation);
},
mousewheel: function(e, t) {
t.pageX |= t.clientX + t.target.scrollLeft, t.pageY |= t.clientY + t.target.scrollTop;
var n = (this.maxScale - this.minScale) / 10, r = this.scale;
if (t.wheelDelta > 0 || t.detail < 0) this.scale = this.limitScale(this.scale + n); else if (t.wheelDelta < 0 || t.detail > 0) this.scale = this.limitScale(this.scale - n);
return this.eventPt = this.calcEventLocation(t), this.transformImage(this.scale), r != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null, t.preventDefault(), !0;
},
srcChanged: function() {
this.src && this.src.length > 0 && this.bufferImage && this.src != this.bufferImage.src && (this.bufferImage.src = this.src);
},
imageLoaded: function(e) {
this.originalWidth = this.bufferImage.width, this.originalHeight = this.bufferImage.height, this.scaleChanged(), this.$.image.setSrc(this.bufferImage.src), enyo.dom.transformValue(this.getStrategy().$.client, "translate3d", "0px, 0px, 0"), this.positionClientControls(this.scale);
},
resizeHandler: function() {
this.inherited(arguments), this.$.image.src && this.scaleChanged();
},
scaleChanged: function() {
var e = this.hasNode();
if (e) {
this.containerWidth = e.clientWidth, this.containerHeight = e.clientHeight;
var t = this.containerWidth / this.originalWidth, n = this.containerHeight / this.originalHeight;
this.minScale = Math.min(t, n), this.maxScale = this.minScale * 3 < 1 ? 1 : this.minScale * 3, this.scale == "auto" ? this.scale = this.minScale : this.scale == "width" ? this.scale = t : this.scale == "height" ? this.scale = n : (this.maxScale = Math.max(this.maxScale, this.scale), this.scale = this.limitScale(this.scale));
}
this.eventPt = this.calcEventLocation(), this.transformImage(this.scale);
},
imageError: function(e) {
enyo.error("Error loading image: " + this.src), this.bubble("onerror", e);
},
gestureTransform: function(e, t) {
this.eventPt = this.calcEventLocation(t), this.transformImage(this.limitScale(this.scale * t.scale));
},
calcEventLocation: function(e) {
var t = {
x: 0,
y: 0
};
if (e && this.hasNode()) {
var n = this.node.getBoundingClientRect();
t.x = Math.round(e.pageX - n.left - this.imageBounds.x), t.x = Math.max(0, Math.min(this.imageBounds.width, t.x)), t.y = Math.round(e.pageY - n.top - this.imageBounds.y), t.y = Math.max(0, Math.min(this.imageBounds.height, t.y));
}
return t;
},
transformImage: function(e) {
this.tapped = !1;
var t = this.imageBounds || this.innerImageBounds(e);
this.imageBounds = this.innerImageBounds(e), this.scale > this.minScale ? this.$.viewport.applyStyle("cursor", "move") : this.$.viewport.applyStyle("cursor", null), this.$.viewport.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px"
}), this.ratioX = this.ratioX || (this.eventPt.x + this.getScrollLeft()) / t.width, this.ratioY = this.ratioY || (this.eventPt.y + this.getScrollTop()) / t.height;
var n, r;
this.$.animator.ratioLock ? (n = this.$.animator.ratioLock.x * this.imageBounds.width - this.containerWidth / 2, r = this.$.animator.ratioLock.y * this.imageBounds.height - this.containerHeight / 2) : (n = this.ratioX * this.imageBounds.width - this.eventPt.x, r = this.ratioY * this.imageBounds.height - this.eventPt.y), n = Math.max(0, Math.min(this.imageBounds.width - this.containerWidth, n)), r = Math.max(0, Math.min(this.imageBounds.height - this.containerHeight, r));
if (this.canTransform) {
var i = {
scale: e
};
this.canAccelerate ? i = enyo.mixin({
translate3d: Math.round(this.imageBounds.left) + "px, " + Math.round(this.imageBounds.top) + "px, 0px"
}, i) : i = enyo.mixin({
translate: this.imageBounds.left + "px, " + this.imageBounds.top + "px"
}, i), enyo.dom.transform(this.$.image, i);
} else this.$.image.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px",
left: this.imageBounds.left + "px",
top: this.imageBounds.top + "px"
});
this.setScrollLeft(n), this.setScrollTop(r), this.positionClientControls(e);
},
limitScale: function(e) {
return this.disableZoom ? e = this.scale : e > this.maxScale ? e = this.maxScale : e < this.minScale && (e = this.minScale), e;
},
innerImageBounds: function(e) {
var t = this.originalWidth * e, n = this.originalHeight * e, r = {
x: 0,
y: 0,
transX: 0,
transY: 0
};
return t < this.containerWidth && (r.x += (this.containerWidth - t) / 2), n < this.containerHeight && (r.y += (this.containerHeight - n) / 2), this.canTransform && (r.transX -= (this.originalWidth - t) / 2, r.transY -= (this.originalHeight - n) / 2), {
left: r.x + r.transX,
top: r.y + r.transY,
width: t,
height: n,
x: r.x,
y: r.y
};
},
saveState: function(e, t) {
var n = this.scale;
this.scale *= t.scale, this.scale = this.limitScale(this.scale), n != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null;
},
doubleClick: function(e, t) {
enyo.platform.ie == 8 && (this.tapped = !0, t.pageX = t.clientX + t.target.scrollLeft, t.pageY = t.clientY + t.target.scrollTop, this.singleTap(e, t), t.preventDefault());
},
singleTap: function(e, t) {
setTimeout(enyo.bind(this, function() {
this.tapped = !1;
}), 300), this.tapped ? (this.tapped = !1, this.smartZoom(e, t)) : this.tapped = !0;
},
smartZoom: function(e, t) {
var n = this.hasNode(), r = this.$.image.hasNode();
if (n && r && this.hasNode() && !this.disableZoom) {
var i = this.scale;
this.scale != this.minScale ? this.scale = this.minScale : this.scale = this.maxScale, this.eventPt = this.calcEventLocation(t);
if (this.animate) {
var s = {
x: (this.eventPt.x + this.getScrollLeft()) / this.imageBounds.width,
y: (this.eventPt.y + this.getScrollTop()) / this.imageBounds.height
};
this.$.animator.play({
duration: 350,
ratioLock: s,
baseScale: i,
deltaScale: this.scale - i
});
} else this.transformImage(this.scale), this.doZoom({
scale: this.scale
});
}
},
zoomAnimationStep: function(e, t) {
var n = this.$.animator.baseScale + this.$.animator.deltaScale * this.$.animator.value;
this.transformImage(n);
},
zoomAnimationEnd: function(e, t) {
this.doZoom({
scale: this.scale
}), this.$.animator.ratioLock = undefined;
},
positionClientControls: function(e) {
this.waterfallDown("onPositionPin", {
scale: e,
bounds: this.imageBounds
});
}
});

// ImageCarousel.js

enyo.kind({
name: "enyo.ImageCarousel",
kind: enyo.Panels,
arrangerKind: "enyo.CarouselArranger",
defaultScale: "auto",
disableZoom: !1,
lowMemory: !1,
published: {
images: []
},
handlers: {
onTransitionStart: "transitionStart",
onTransitionFinish: "transitionFinish"
},
create: function() {
this.inherited(arguments), this.imageCount = this.images.length, this.images.length > 0 && (this.initContainers(), this.loadNearby());
},
initContainers: function() {
for (var e = 0; e < this.images.length; e++) this.$["container" + e] || (this.createComponent({
name: "container" + e,
style: "height:100%; width:100%;"
}), this.$["container" + e].render());
for (e = this.images.length; e < this.imageCount; e++) this.$["image" + e] && this.$["image" + e].destroy(), this.$["container" + e].destroy();
this.imageCount = this.images.length;
},
loadNearby: function() {
this.images.length > 0 && (this.loadImageView(this.index - 1), this.loadImageView(this.index), this.loadImageView(this.index + 1));
},
loadImageView: function(e) {
return this.wrap && (e = (e % this.images.length + this.images.length) % this.images.length), e >= 0 && e <= this.images.length - 1 && (this.$["image" + e] ? (this.$["image" + e].src != this.images[e] && this.$["image" + e].setSrc(this.images[e]), this.$["image" + e].setScale(this.defaultScale), this.$["image" + e].setDisableZoom(this.disableZoom)) : (this.$["container" + e].createComponent({
name: "image" + e,
kind: "ImageView",
scale: this.defaultScale,
disableZoom: this.disableZoom,
src: this.images[e],
verticalDragPropagation: !1,
style: "height:100%; width:100%;"
}, {
owner: this
}), this.$["image" + e].render())), this.$["image" + e];
},
setImages: function(e) {
this.setPropertyValue("images", e, "imagesChanged");
},
imagesChanged: function() {
this.initContainers(), this.loadNearby();
},
indexChanged: function() {
this.loadNearby(), this.lowMemory && this.cleanupMemory(), this.inherited(arguments);
},
transitionStart: function(e, t) {
if (t.fromIndex == t.toIndex) return !0;
},
transitionFinish: function(e, t) {
this.loadImageView(this.index - 1), this.loadImageView(this.index + 1), this.lowMemory && this.cleanupMemory();
},
getActiveImage: function() {
return this.getImageByIndex(this.index);
},
getImageByIndex: function(e) {
return this.$["image" + e] || this.loadImageView(e);
},
cleanupMemory: function() {
for (var e = 0; e < this.images.length; e++) (e < this.index - 1 || e > this.index + 1) && this.$["image" + e] && this.$["image" + e].destroy();
}
});

// ToggleBar.js

enyo.kind({
name: "GTS.ToggleBar",
kind: "onyx.Item",
classes: "gts-ToggleBar",
published: {
label: "Toggle Button",
sublabel: "",
onContent: "On",
offContent: "Off",
value: !1
},
events: {
onChange: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
components: [ {
fit: !0,
components: [ {
name: "label"
}, {
name: "sublabel",
style: "font-size: 75%;"
} ]
}, {
name: "switch",
kind: "onyx.ToggleButton",
ontap: "switchToggled",
onChange: "doChange"
} ]
} ],
handlers: {
ontap: "barTapped"
},
rendered: function() {
this.inherited(arguments), this.labelChanged(), this.sublabelChanged(), this.onContentChanged(), this.offContentChanged(), this.valueChanged();
},
reflow: function() {
this.$.base.reflow();
},
barTapped: function() {
this.$["switch"].setValue(!this.getValue()), this.doChange(this.$["switch"]);
},
switchToggled: function(e, t) {
return !0;
},
labelChanged: function() {
this.$.label.setContent(this.label);
},
sublabelChanged: function() {
this.$.sublabel.setContent(this.sublabel);
},
onContentChanged: function() {
this.$["switch"].setOnContent(this.onContent);
},
offContentChanged: function() {
this.$["switch"].setOffContent(this.offContent);
},
valueChanged: function() {
this.$["switch"].setValue(this.value), this.reflow();
},
getValue: function() {
return this.$["switch"].getValue();
}
});

// SelectorBar.js

enyo.kind({
name: "GTS.SelectorBar",
kind: "onyx.Item",
classes: "gts-selectorBar",
published: {
label: "Select One",
sublabel: "",
choices: [],
value: "",
disabled: !1
},
events: {
onChange: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
components: [ {
name: "valueIcon",
kind: "enyo.Image",
style: "margin-right: 1em;"
}, {
name: "valueDisplay",
fit: !0
}, {
kind: "onyx.MenuDecorator",
components: [ {
name: "labelButton",
kind: "onyx.Button",
classes: "label arrow"
}, {
name: "menu",
kind: "onyx.Menu",
floating: !0,
onSelect: "selectionChanged",
components: []
} ]
} ]
}, {
name: "sublabel",
classes: "sub-label"
} ],
rendered: function() {
this.inherited(arguments), this.labelChanged(), this.sublabelChanged(), this.choicesChanged(), this.valueChanged(), this.disabledChanged();
},
reflow: function() {
this.$.base.reflow();
},
labelChanged: function() {
this.$.labelButton.setContent(this.label);
},
sublabelChanged: function() {
this.$.sublabel.setContent(this.sublabel), this.sublabel === "" ? this.$.sublabel.hide() : this.$.sublabel.show();
},
choicesChanged: function() {
this.$.menu.destroyClientControls(), this.$.menu.createComponents(this.choices), this.valueChanged();
},
disabledChanged: function() {
this.$.labelButton.setDisabled(this.disabled);
},
setValue: function(e) {
this.value = e, this.valueChanged();
},
valueChanged: function() {
if (this.choices.length === 0) return;
this.value === null && (this.value = this._getValue(this.choices[0]));
for (var e = 0; e < this.choices.length; e++) if (this.value === this._getValue(this.choices[e])) {
this.$.valueDisplay.setContent(this.choices[e].content), this.choices[e].icon ? (this.$.valueIcon.setSrc(this.choices[e].icon), this.$.valueIcon.show()) : this.$.valueIcon.hide();
break;
}
this.reflow();
},
_getValue: function(e) {
return e.hasOwnProperty("value") ? e.value : e.content;
},
selectionChanged: function(e, t) {
return this.value = t.selected.hasOwnProperty("value") ? t.selected.value : t.content, this.valueChanged(), this.doChange(t), !0;
}
});

// newness.Carousels.js

enyo.kind({
name: "newness.CarouselInternal",
kind: "Panels",
arrangerKind: "CarouselArranger",
classes: "newness-carousel",
events: {
onViewIndexChanged: ""
},
handlers: {
onTransitionStart: "panelTransitionStartHandler",
onTransitionFinish: "panelTransitionFinishHandler"
},
kindComponents: [ {
name: "left",
classes: "newness-carousel-page",
style: "width: 100%;"
}, {
name: "center",
classes: "newness-carousel-page",
style: "width: 100%;"
}, {
name: "right",
classes: "newness-carousel-page",
style: "width: 100%;"
} ],
centerIndex: 1,
fetchView: function(e) {
switch (e) {
case "left":
return this.findView(this.$.left);
case "right":
return this.findView(this.$.right);
case "center":
default:
return this.findView(this.$.center);
}
},
fetchCurrentView: function() {
return this.fetchView("center");
},
newView: function(e, t, n) {
e === undefined ? this._info = t : (e.setShowing(t ? !0 : !1), t && (t.owner || (t.owner = this), e.destroyClientControls(), e.createComponent(t, {}), n && this.render()));
},
moveView: function(e, t) {
e.showing || e.show(), e.destroyClientControls(), t.setContainer(e), t.setParent(e);
},
findView: function(e) {
var t = e.getControls();
if (t.length) return t[0];
},
previous: function() {
if (this.index !== this.centerIndex || this.$.left.showing) this.index !== this.centerIndex && this._adjustViews(), this.inherited(arguments);
},
next: function() {
if (this.index !== this.centerIndex || this.$.right.showing) this.index !== this.centerIndex && this._adjustViews(), this.inherited(arguments);
},
dragstart: function(e, t) {
return this.index !== this.centerIndex && this._adjustViews(), this.inherited(arguments), !0;
},
panelTransitionFinishHandler: function(e, t) {
t.fromIndex === 1 && this._adjustViews();
}
}), enyo.kind({
name: "newness.Carousel",
kind: newness.CarouselInternal,
events: {
onGetLeft: "",
onGetRight: "",
onViewChanged: ""
},
setCenterView: function(e) {
this.$.left.setShowing(this.doGetLeft({
originator: this.$.left,
snap: !1
})), this.newView(this.$.center, e), this.$.right.setShowing(this.doGetRight({
originator: this.$.right,
snap: !1
})), this.index = this.centerIndex, this.hasNode() && this.render();
},
updateView: function(e, t) {
this.newView(this.$[e], t, !0);
},
panelTransitionFinishHandler: function(e, t) {
t.fromIndex !== 1 && this.doViewChanged({
fromView: t.fromIndex > t.toIndex ? "Right" : "Left"
}), this.inherited(arguments);
},
_adjustViews: function() {
var e = this.index > this.centerIndex, t = !1;
if (this.index != this.centerIndex || !this._info) t = this["doGet" + (e ? "Right" : "Left")]({
originator: undefined,
snap: !0
});
if (this.index != this.centerIndex && t === !0) {
var n = e ? this.$.right : this.$.left, r = e ? this.$.left : this.$.right, i = this.$.center;
this.moveView(r, this.findView(i)), this.moveView(i, this.findView(n)), this.newView(n, this._info, !0), this.setIndexDirect(this.centerIndex);
}
}
}), enyo.kind({
name: "newness.FlyweightCarousel",
kind: newness.CarouselInternal,
published: {
viewKind: null
},
events: {
onSetupView: ""
},
viewIndex: 0,
create: function() {
this.inherited(arguments), this.viewKindChanged();
},
viewKindChanged: function(e) {
this.viewKind === null ? console.error("No viewKind defined") : this.createViewsFromViewKind(!0);
},
renderViews: function(e, t) {
this.oldIndex = null, this.viewIndex = e || 0, this.index = this.centerIndex, this.createViewsFromViewKind(t), this.updateView(this.$.left, this.viewIndex - 1, !0), this.updateView(this.$.center, this.viewIndex, !0), this.updateView(this.$.right, this.viewIndex + 1, !0);
},
createViewsFromViewKind: function(e) {
if (!this._viewsCreated || e) this.newView(this.$.left, this.viewKind), this.newView(this.$.center, this.viewKind), this.newView(this.$.right, this.viewKind), this.hasNode() && this.render(), this._viewsCreated = !0;
},
moveView: function(e, t) {
e.showing || e.show(), t.setContainer(e), t.setParent(e);
},
updateView: function(e, t, n) {
var r = this.doSetupView({
originator: this.findView(e),
viewIndex: t
});
return !r && this.oldIndex && (this.viewIndex = this.oldIndex), n && e.setShowing(r ? !0 : !1), r && this.findView(e).render(), this.flow(), this.reflow(), r;
},
_adjustViews: function() {
this.oldIndex = this.viewIndex;
var e = this.index > this.centerIndex, t = e ? this.$.right : this.$.left, n = e ? this.$.left : this.$.right;
e ? ++this.viewIndex : --this.viewIndex, this.doViewIndexChanged({
viewIndex: this.viewIndex
});
if (this.index !== this.centerIndex && this.updateView(n, e ? this.viewIndex + 1 : this.viewIndex - 1)) {
var r = this.findView(this.$.center);
this.moveView(this.$.center, this.findView(t)), this.moveView(t, this.findView(n)), this.moveView(n, r), this.render(), this.setIndexDirect(this.centerIndex);
}
}
});

// menuItem.js

enyo.kind({
name: "menuItem",
classes: "item",
components: [ {
name: "name",
classes: "name"
}, {
name: "dish",
classes: "dish"
}, {
name: "price",
classes: "price"
}, {
name: "mensa",
classes: "mensa"
}, {
name: "moreInfo",
kind: "FittableColumns",
showing: !1,
components: [ {
classes: "additives",
components: [ {
content: "Zusatzstoffe",
classes: "details-header"
}, {
kind: "Repeater",
name: "additives",
onSetupItem: "setupItemAdditives",
components: [ {
name: "item",
classes: "details-item"
} ]
} ]
}, {
classes: "properties",
components: [ {
content: "Eigenschaften",
classes: "details-header"
}, {
kind: "Repeater",
name: "properties",
onSetupItem: "setupItemProperties",
components: [ {
name: "item",
classes: "details-item"
} ]
} ]
} ]
} ],
onTap: "itemTap",
setupItemAdditives: function(e, t) {
var n = t.index, r = this.data.additives[n], i = t.item.$.item;
return i.setContent(r), !0;
},
setupItemProperties: function(e, t) {
var n = t.index, r = this.data.properties[n], i = t.item.$.item;
return i.setContent(r), !0;
},
setMenuItem: function(e) {
return this.data = e, e.showDetails && (this.$.additives.setCount(this.data.additives.length), this.$.properties.setCount(this.data.properties.length)), this.$.moreInfo.setShowing(e.showDetails === !0), this.addRemoveClass("first", e.first), this.addRemoveClass("last", e.last), this.$.name.setContent(e.name), this.$.price.setContent((conf.displayStudentPrices() ? e.studPrice : e.normalPrice) + "\u20ac"), this.$.dish.setContent(e.dish), this.$.mensa.setContent(e.mensa), !0;
}
});

// Divider.js

enyo.kind({
name: "Divider",
kind: "FittableColumns",
noStretch: !0,
classes: "divider",
published: {
caption: "Divider"
},
components: [ {
name: "before",
style: "",
classes: "before-caption"
}, {
name: "caption",
content: "Divider",
classes: "caption"
}, {
name: "after",
classes: "after-caption"
} ],
create: function() {
this.inherited(arguments), this.captionChanged();
},
captionChanged: function() {
this.$.caption.setContent(this.caption), this.reflow();
}
});

// source/kinds/settingsView.js

enyo.kind({
name: "settingsView",
kind: "FittableRows",
style: "height: 100%;",
components: [ {
kind: "onyx.Toolbar",
content: "Einstellungen"
}, {
kind: "GTS.SelectorBar",
style: "background: #eee",
label: "Preise",
choices: [ {
content: "Studentenpreise anzeigen",
value: !0
}, {
content: "Normale Preise anzeigen",
value: !1
} ],
name: "price",
onChange: "changePrice"
}, {
kind: "Scroller",
fit: !0,
components: [ {
name: "mensaList",
kind: "Repeater",
classes: "enyo-unselectable preventDragTap",
onSetupItem: "setupRow",
components: [ {
kind: "GTS.ToggleBar",
label: "yes",
name: "toggleItem",
classes: "item enyo-border-box",
onChange: "changeMensa"
} ]
} ]
}, {
kind: "onyx.Button",
content: "Speichern",
style: "width: 100%;",
classes: "onyx-affirmative",
ontap: "saveMensen"
} ],
changePrice: function(e, t) {
return conf.setStudentPrices(t.selected.value), enyo.Signals.send("onDisplayPricesChange"), !0;
},
changeMensa: function(e, t) {
var n = t.originator.label;
return this.savedMensen = this.savedMensen.filter(function(e) {
return n !== e;
}), t.value && n && this.savedMensen.push(n), !0;
},
setupRow: function(e, t) {
var n = t.index, r = this.availableMensen[n], i = t.item.$.toggleItem;
i.label = r.name, i.value = r.active, i.sublabel = r.address;
},
saveMensen: function() {
var e = !1;
JSON.stringify(this.savedMensen) !== JSON.stringify(conf.getSavedURLs()) && (conf.setURLs(this.savedMensen), storage.cleanData(), e = !0), enyo.Signals.send("onSettingsChange", {
changed: e
});
},
savedMensen: conf.getSavedURLs(),
availableMensen: storage.getMensaInfo(),
loaded: !1,
load: function() {
this.loaded || (this.loaded = !0, this.$.mensaList.setCount(this.availableMensen.length), this.$.price.setValue(conf.displayStudentPrices()));
}
});

// source/kinds/infoView.js

enyo.kind({
name: "infoView",
fit: !0,
kind: "FittableRows",
components: [ {
kind: "onyx.Toolbar",
content: info.appName
}, {
kind: "Scroller",
fit: !0,
components: [ {
style: "margin: 1em;",
content: info.appDesc
}, {
kind: "onyx.Button",
content: "Zur Projektseite",
style: "width: 95%; margin: .5em auto; display: block;",
onclick: "moreInfo"
}, {
kind: "onyx.Button",
content: "Email an die Entwickler schreiben",
style: "width: 95%; margin: .5em auto; display: block;",
onclick: "email"
}, {
kind: "onyx.Button",
content: "App zur\u00fccksetzen",
style: "width: 95%; margin: .5em auto; display: block;",
classes: "onyx-negative",
onclick: "reset"
}, {
kind: "onyx.Button",
content: "Schlie\u00dfen",
style: "width: 95%; margin: .5em auto; display: block;",
classes: "onyx-affirmative",
onclick: "close"
} ]
} ],
close: function() {
this.bubble("onCloseMe");
},
moreInfo: function(e, t) {
location.href = info.appURL;
},
email: function(e, t) {
location.href = "mailto:" + info.appEmail + "?subject=Mensa%20Hamburg%20App&body=Moin!";
},
reset: function(e, t) {
data.clear(), location.reload();
},
load: function() {}
});

// source/kinds/menuList.js

enyo.kind({
name: "menuList",
classes: "menuList",
style: "height: 100%;",
published: {
loading: !1
},
components: [ {
kind: "Waiter"
}, {
kind: "List",
name: "menu",
style: "height: 100%;",
classes: "enyo-unselectable preventDragTap menu",
onSetupItem: "setupRow",
toggleSelected: !0,
components: [ {
name: "divider",
kind: "Divider"
}, {
kind: "menuItem",
classes: "item enyo-border-box"
} ]
} ],
tap: function() {
this.$.menu.refresh();
},
setupRow: function(e, t) {
var n = t.index, r = this.menu[n], i = this.$.menuItem, s = this.$.divider;
return r.type === "header" ? (i.hide(), s.show(), s.setCaption(r.headerType === "date" ? formatDate(storage.dateStringToDate(r.header)) : r.header)) : (s.hide(), i.show(), r.showDetails = t.selected, i.setMenuItem(r)), !0;
},
loadingChanged: function() {
this.loading && (this.$.menu.setCount(0), this.$.menu.refresh()), this.$.waiter.setShowing(this.loading);
},
load: function() {
this.$.menu.setCount(this.menu.length), this.$.menu.refresh(), this.setLoading(!1);
}
}), enyo.kind({
name: "Waiter",
components: [ {
name: "spinner",
kind: "Image",
noEvents: !0,
src: "assets/spinner.gif",
showing: !1,
classes: "search-spinner"
}, {
name: "loadingMessage",
classes: "loading-message",
content: "...",
showing: !1
} ],
showingChanged: function() {
this.inherited(arguments), this.showloadingMessage(this.showing), this.showloadingSpinner(this.showing);
},
msgs: [ "Bin dabei...", "Kommt gleich...", "abwarten...", "wird geladen...", "Eile mit Weile...", "Is' unterwegs...", "Wird gleich..." ],
showloadingMessage: function(e) {
e && this.$.loadingMessage.setContent(this.msgs[Math.round(Math.random() * (this.msgs.length - 1))]), this.$.loadingMessage.setShowing(e);
},
showloadingSpinner: function(e) {
this.$.spinner.setShowing(e);
}
});

// source/menuView.js

enyo.kind({
name: "menuView",
fit: !0,
components: [ {
name: "carousel",
kind: "newness.Carousel",
onGetLeft: "getLeft",
onGetRight: "getRight",
onTransitionFinish: "transitionFinish",
style: "height: 100%;"
}, {
kind: enyo.Signals,
onGoToToday: "today",
onGoToYesterday: "yesterday",
onGoToTomorrow: "tomorrow"
} ],
menu: [],
date: +(new Date),
availableDates: storage.getAvailableDates(!0),
dateIsAvailable: function(e) {
return e >= 0 && e < 10;
},
getView: function(e) {
return {
kind: "menuPanel",
index: e,
dateString: this.availableDates[e]
};
},
getLeft: function(e, t) {
var n = this.index;
return t.snap && this.index--, this.dateIsAvailable(this.index - 1) ? (this.$.carousel.newView(t.originator, this.getView(this.index - 1)), !0) : (this.index = n, !1);
},
getRight: function(e, t) {
var n = this.index;
return t.snap && this.index++, this.dateIsAvailable(this.index + 1) ? (this.$.carousel.newView(t.originator, this.getView(this.index + 1)), !0) : (this.index = n, !1);
},
today: function(e, t) {
var n = new Date;
n.getDay() === 6 && (n = new Date(n.valueOf() + 1728e5)), n.getDay() === 0 && (n = new Date(n.valueOf() + 864e5)), n = storage.dateToDateString(n), this.index = this.availableDates.indexOf(n), this.$.carousel.setCenterView(this.getView(this.index));
},
yesterday: function() {
return this.$.carousel.previous(), !0;
},
tomorrow: function() {
return this.$.carousel.next(), !0;
},
create: function() {
this.inherited(arguments), this.load();
},
load: function() {
this.today();
}
}), enyo.kind({
name: "menuPanel",
classes: "menuList",
kind: "FittableRows",
style: "height: 100%;",
components: [ {
kind: "onyx.Toolbar",
name: "menuHeader",
classes: "header",
components: [ {
kind: "FittableColumns",
style: "width: 100%; margin: 0px",
components: [ {
kind: "onyx.IconButton",
style: "height: 32px;",
src: "assets/menu-icon-back.png",
ontap: "yesterday",
name: "yesterdayControl"
}, {
content: "",
name: "header",
fit: !0,
ontap: "today",
style: "text-align: center; line-height: 32px"
}, {
kind: "onyx.IconButton",
style: "height: 32px;",
src: "assets/menu-icon-forward.png",
ontap: "tomorrow",
name: "tomorrowControl"
} ]
} ]
}, {
kind: "menuList"
} ],
setHeader: function() {
this.$.header.setContent(formatDate(this.date)), this.$.yesterdayControl.setShowing(storage.isPrevDayAvailable()), this.$.tomorrowControl.setShowing(storage.isNextDayAvailable());
},
today: function() {
enyo.Signals.send("onGoToToday");
},
yesterday: function() {
enyo.Signals.send("onGoToYesterday");
},
tomorrow: function() {
enyo.Signals.send("onGoToTomorrow");
},
create: function(e, t) {
this.inherited(arguments), this.load();
},
load: function() {
this.date = storage.dateStringToDate(this.dateString), this.$.menuList.setLoading(!0), storage.day(this.date, !0, function(e, t) {
this.$.menuList.menu = e, this.$.menuList.load();
}.bind(this)), this.setHeader();
}
});

// source/filterView.js

enyo.kind({
name: "filterView",
fit: !0,
kind: "FittableRows",
components: [ {
kind: "onyx.Toolbar",
content: "Gerichte filtern"
}, {
kind: "Scroller",
fit: !0,
components: [ {
kind: "filterList",
filterKind: "filter-item-double",
name: "mensaFilter",
title: "Nach Mensen filtern",
type: "mensa"
}, {
kind: "filterList",
filterKind: "filter-item-double",
name: "nameFilter",
title: "Nach Gericht filtern",
type: "name"
}, {
kind: "filterList",
filterKind: "filter-item-trippel",
name: "additivesFilter",
title: "Nach Zusatzstoffen filtern",
type: "additives"
}, {
kind: "filterList",
filterKind: "filter-item-trippel",
name: "propertiesFilter",
title: "Nach Eigenschaften filtern",
type: "properties"
} ]
}, {
kind: "onyx.Button",
content: "Filtern",
style: "width: 100%;",
classes: "onyx-affirmative",
onclick: "applyFilters"
} ],
applyFilters: function() {
this.setFilter("name").setFilter("mensa").setFilter("properties").setFilter("additives"), enyo.Signals.send("onRequestMenu");
},
setFilter: function(e) {
var t = this.$[e + "Filter"].getStatus();
return t.length === 0 ? storage.unsetFilter(e) : storage.setFilter(e, t), this;
},
loaded: !1,
load: function(e) {
this.loaded || (this.$.mensaFilter.load(), this.$.nameFilter.load(), this.$.additivesFilter.load(), this.$.propertiesFilter.load(), this.loaded = !0);
},
changePreserveFilters: function(e) {
storage.setPersistentFilters(e.$.toggle.getValue());
}
}), enyo.kind({
name: "filter-item-double",
classes: "item enyo-border-box",
kind: "FittableColumns",
published: {
label: "",
state: "include"
},
components: [ {
content: "",
name: "label",
fit: !0
}, {
style: "width: 84px",
kind: "onyx.ToggleButton",
name: "pickerButton",
onContent: "Mit",
offContent: "Ohne",
onChange: "change"
} ],
stateChanged: function() {
this.$.pickerButton.value = this.state === "include";
},
change: function(e, t) {
this.bubble("onChange", {
content: this.label,
state: t.value ? "include" : "exclude"
});
},
load: function() {
this.$.label.setContent(this.label), this.stateChanged();
}
}), enyo.kind({
name: "filter-item-trippel",
classes: "item enyo-border-box",
kind: "FittableColumns",
published: {
label: "",
state: "none"
},
components: [ {
content: "",
name: "label",
fit: !0
}, {
style: "width: 70px;",
components: [ {
style: "width: 32px; float: left;",
components: [ {
kind: "onyx.Checkbox",
onchange: "change",
name: "include"
}, {
content: "Mit",
style: "font-size: 10px; text-align: center;"
} ]
}, {
style: "width: 32px; float: left;",
components: [ {
kind: "onyx.Checkbox",
onchange: "change",
name: "exclude"
}, {
content: "Ohne",
style: "font-size: 10px; text-align: center;"
} ]
} ]
} ],
change: function(e, t) {
var n = t.originator;
n.checked && this.$[n.name === "exclude" ? "include" : "exclude"].setChecked(!1), this.bubble("onChange", {
content: this.label,
state: n.checked ? n.name : "none"
});
},
load: function() {
this.$.label.setContent(this.label), this.state && this.state !== "none" && this.$[this.state].setChecked(!0);
}
}), enyo.kind({
name: "filterList",
published: {
title: "Nach Eigenschaften filtern",
filterKind: "",
type: "properties"
},
classes: "enyo-unselectable preventDragTap",
kind: "onyx.Groupbox",
components: [ {
kind: "onyx.GroupboxHeader",
name: "header",
ontap: "activate",
style: "padding: 10px"
}, {
name: "drawer",
kind: "onyx.Drawer",
components: [ {
name: "repeater",
kind: "Repeater",
onSetupItem: "setupItem",
components: [ {
content: ""
} ]
} ]
} ],
handlers: {
onChange: "changed"
},
filteredBy: {},
changed: function(e, t) {
"use strict";
var n = t.state, r = t.content;
return typeof r == "undefined" || typeof n == "undefined" ? !0 : (this.filteredBy[this.name] = this.filteredBy[this.name] || {}, n === "none" ? delete this.filteredBy[this.name][r] : this.filteredBy[this.name][r] = n, !0);
},
activate: function() {
"use strict";
this.$.drawer.setOpen(!this.$.drawer.open);
},
cache: [],
setupItem: function(e, t) {
"use strict";
var n = t.index, r = this.cache[n], i = t.item.$[this.filterKind];
i.label = r.content, this.filteredBy[this.name] = this.filteredBy[this.name] || {}, r.filter && r.filter.type ? (i.state = r.filter.type, this.filteredBy[this.name][r.name] = i.state) : this.filterKind === "filter-item-double" ? this.filteredBy[this.name][r.name] = "include" : this.filteredBy[this.name][r.name] = "none", i.load();
},
load: function() {
"use strict";
this.$.header.setContent(this.title), this.$.repeater.itemComponents[0].kind = this.filterKind, storage.getInfo(this.type, function(e) {
this.type === "mensa" && (e = e.filter(function(e) {
return e.active;
})), this.cache = e, this.$.repeater.setCount(this.cache.length);
}.bind(this));
},
getStatus: function() {
"use strict";
var e = [], t;
for (t in this.filteredBy[this.name]) this.filteredBy[this.name].hasOwnProperty(t) && e.push({
value: t,
type: this.filteredBy[this.name][t]
});
return e;
}
});

// source/App.js

var mensaApp;

window.addEventListener("load", function() {
mensaApp = (new App).renderInto(document.body);
}, !1), enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling(), enyo.kind({
name: "App",
components: [ {
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
kind: "Panels",
draggable: !1,
name: "panels",
fit: !0,
components: [ {
name: "menu",
kind: "menuView"
}, {
name: "settings",
kind: "settingsView"
}, {
name: "filter",
kind: "filterView"
}, {
name: "info",
kind: "infoView"
} ]
}, {
kind: "onyx.Toolbar",
name: "toolbar",
components: [ {
kind: "FittableColumns",
classes: "enyo-center",
style: "width: 100%; margin-left: 0;",
components: [ {
ontap: "openView",
classes: "navButton",
target: "menu",
components: [ {
kind: "onyx.IconButton",
name: "menuButton",
src: "assets/menu.png",
classes: "active"
} ]
}, {
ontap: "openView",
classes: "navButton",
target: "settings",
components: [ {
kind: "onyx.IconButton",
name: "settingsButton",
src: "assets/settings.png"
} ]
}, {
ontap: "openView",
classes: "navButton",
target: "filter",
components: [ {
kind: "onyx.IconButton",
name: "filterButton",
src: "assets/filter.png"
} ]
}, {
ontap: "openView",
classes: "navButton",
target: "info",
components: [ {
kind: "onyx.IconButton",
name: "infoButton",
src: "assets/info.png"
} ]
} ]
} ]
} ]
}, {
kind: "onyx.Popup",
name: "introPopup",
centered: !0,
modal: !0,
floating: !0,
style: "margin: 10px",
content: info.notConfText
}, {
name: "newVersionPopup",
style: "background: #eee;color: black; width: 300px",
kind: "onyx.Popup",
centered: !0,
floating: !0,
scrim: !0,
components: [ {
content: info.onUpdateTitel,
classes: "popup-header"
}, {
content: info.onUpdateText,
classes: "popup-content"
}, {
kind: "onyx.Button",
content: "Mehr Informationen zu dieser Version",
ontap: "gotoNewVersion",
classes: "onyx-affirmative"
}, {
kind: "onyx.Button",
content: "Schlie\u00dfen",
ontap: "closePopup"
} ]
}, {
kind: enyo.Signals,
onSettingsChange: "openMenu",
onRequestMenu: "openMenu",
onRequestOpen: "open"
} ],
gotoNewVersion: function() {
enyo.platform.android || enyo.platform.androidChrome ? location.href = info.releaseNotes.androidPhone : enyo.platform.ios && (location.href = info.releaseNotes.iphone);
},
closePopup: function() {
this.$.introPopup.setShowing(!1), this.$.newVersionPopup.setShowing(!1);
},
handlers: {
onCloseMe: "openMenu"
},
open: function(e, t) {
this.openPage(t.page);
},
openMenu: function() {
this.setActiveButton(this.$.menuButton), this.openPage("menu");
},
setActiveButton: function(e) {
this.$.menuButton.removeClass("active"), this.$.settingsButton.removeClass("active"), this.$.filterButton.removeClass("active"), this.$.infoButton.removeClass("active"), e.addClass("active");
},
openView: function(e, t) {
this.setActiveButton(e.children[0]), this.openPage(e.target);
},
pages: [ "menu", "settings", "filter", "info" ],
openPage: function(e) {
var t = this.pages.indexOf(e);
this.$.panels.setIndex(t), setTimeout(function() {
this.$[e].load();
}.bind(this), 1);
},
showNotConfigured: function() {
var e = this.$.introPopup;
e.show(), e.applyStyle("left", 0);
},
rendered: function() {
this.inherited(arguments), conf.isConfigured() ? conf.versionHasChanged && (this.$.newVersionPopup.setShowing(!0), this.$.newVersionPopup.reflow()) : (enyo.Signals.send("onRequestOpen", {
page: "settings"
}), this.showNotConfigured());
}
});