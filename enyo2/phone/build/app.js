
// minifier: path aliases

enyo.path.addPaths({onyx: "/home/jjacobsohn/git/mensaApp/enyo2/enyo/tools/../../lib/onyx/", onyx: "/home/jjacobsohn/git/mensaApp/enyo2/enyo/tools/../../lib/onyx/source/", layout: "/home/jjacobsohn/git/mensaApp/enyo2/enyo/tools/../../lib/layout/"});

// utils.js

function isEmpty(a) {
for (var b in a) if (a.hasOwnProperty(b)) return !1;
return !0;
}

function deepCopy(a) {
var b = a, c;
if (a && typeof a == "object") {
b = Object.prototype.toString.call(a) === "[object Array]" ? [] : {};
for (c in a) b[c] = deepCopy(a[c]);
}
return b;
}

function dateToString(a, b) {
return formatDate(new Date(a), b);
}

function formatDate(a, b) {
var b = b || "de", c = 864e5, d = daysBetween(new Date, a), e = {
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
}, f = {
de: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Sonnabend" ],
en: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
}, g = {
de: f[b][a.getDay()] + ", " + a.getDate() + "." + (a.getMonth() + 1) + ".",
en: f[b][a.getDay()] + ", " + a.getDate() + "." + (a.getMonth() + 1) + "."
};
return d >= -1 && d <= 1 ? e[b][d] : g[b];
}

function daysBetween(a, b) {
var c = new Date(a.getFullYear(), a.getMonth(), a.getDate()), d = new Date(b.getFullYear(), b.getMonth(), b.getDate()), e = 864e5, f = d.getTime() - c.getTime(), g = f / e;
return Math.floor(g);
}

Date.prototype.getWeek = function() {
var a = new Date;
a.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
var b = a.getDay();
b == 0 && (b = 7), a.setDate(a.getDate() + (4 - b));
var c = a.getFullYear(), d = Math.floor((a.getTime() - new Date(c, 0, 1, -6)) / 864e5), e = 1 + Math.floor(d / 7);
return e;
}, Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
for (var c = b || 0, d = this.length; c < d; c++) if (this[c] === a) return c;
return -1;
}), String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}), Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
var c, d;
if (this == null) throw new TypeError("this is null or not defined");
var e = Object(this), f = e.length >>> 0;
if ({}.toString.call(a) != "[object Function]") throw new TypeError(a + " is not a function");
b && (c = b), d = 0;
while (d < f) {
var g;
d in e && (g = e[d], a.call(c, g, d, e)), d++;
}
}), Array.prototype.map || (Array.prototype.map = function(a, b) {
var c, d, e;
if (this == null) throw new TypeError(" this is null or not defined");
var f = Object(this), g = f.length >>> 0;
if ({}.toString.call(a) != "[object Function]") throw new TypeError(a + " is not a function");
b && (c = b), d = new Array(g), e = 0;
while (e < g) {
var h, i;
e in f && (h = f[e], i = a.call(c, h, e, f), d[e] = i), e++;
}
return d;
});

// info.js

(function() {
info = {
appName: "Mensa-Hamburg App",
appDesc: "Dies ist eine App von Studenten f\u00fcr Studenten und sie ist Open Source!\n Dein Feedback ist immer Willkommen!",
appURL: "http://johannjacobsohn.github.com/Mensa-Hamburg-App/",
appEmail: "mensa-hamburg-app@directbox.com",
notConfTitle: "Noch nicht konfiguriert",
notConfText: "Uh, scheinbar ist hier noch nichts konfiguriert, daher werden *keine* Mensen geladen... Du musst welche aktivieren um etwas zu sehen."
};
})();

// data.js

var data = function() {
var a = "3", b = {}, c = function(a) {
return typeof b[a] != "undefined" ? b[a] : localStorage.getItem(a);
}, d = function(a, c) {
return b[a] = c, localStorage.setItem(a, c);
}, e = function(a) {
return delete b[a], localStorage.removeItem(a);
}, f = function() {
return b = {}, localStorage.clear();
};
return c("version") !== a && (f(), d("version", a)), {
save: d,
set: d,
get: c,
remove: e,
clear: f
};
}();

// conf.js

(function() {
conf = {
getSavedURLs: function() {
try {
return JSON.parse(data.get("urls")) || [];
} catch (a) {
return [];
}
},
getURLs: function() {
var a = [], b = "";
for (b in urls.mensenWeek) a.push(b);
return a;
},
setURLs: function(a) {
return data.save("urls", JSON.stringify(a));
},
isConfigured: function(a) {
try {
return typeof localStorage.getItem("urls") == "string";
} catch (b) {
return !1;
}
},
getMensaInfo: function() {
var a = [], b = this.getURLs(), c = this.getSavedURLs();
for (i = 0; i < b.length; i++) a.push({
name: b[i],
active: c.indexOf(b[i]) != -1
});
return a;
},
setStudentPrices: function(a) {
return data.save("displayStudentPrices", a ? "1" : "0");
},
displayStudentPrices: function() {
return typeof data.get("displayStudentPrices") == "undefined" || data.get("displayStudentPrices") === null || data.get("displayStudentPrices") === "1";
}
};
})();

// storage.js

var storage = function() {
var a = [], b = [], c = !1, e = typeof debug != "undefined" && debug ? new Date(2012, 0, 24) : new Date, f = function() {
return R(e);
}, g = function() {
return e.getWeek();
}, h = [], i = {}, j = [], k = data.get("persistentFilters") || !0, l = function(a) {
k = a, data.set("persistentFilters", k);
}, m = function() {
return k;
}, n = {}, o = {}, q = function() {
k && (n = JSON.parse(data.get("filterProperties") || "{}"), o = JSON.parse(data.get("filterValues") || "{}"));
}, r = function() {
k && (data.set("filterProperties", JSON.stringify(n)), data.set("filterValues", JSON.stringify(o)));
}, s = function(d) {
y(function() {
var e = 0, f;
if (!c) {
b = [];
for (e = 0; e < a.length; e++) b.push(a[e]);
for (f in n) n.hasOwnProperty(f) && (b = b.filter(function(a) {
return o[f].indexOf(a[f]) !== -1;
}));
c = !0;
}
d(b);
});
}, t = function(a, b) {
c = !1, typeof b == "string" && (b = [ b ]), n[a] = a, o[a] = b, r();
}, u = function(a) {
c = !1, delete n[a], delete o[a], r();
}, v = function() {
c = !1, filterLength = {}, filters = {}, r();
}, w = function(a) {
s(function(b) {
var c = b.sort(function(a, b) {
var c = 0, d = 0, e = a.mensa.toLowerCase(), f = b.mensa.toLowerCase(), g = a.date.split("-"), h = b.date.split("-");
return e < f ? c = -10 : e > f && (c = 10), d = parseInt(g[0]) * 100 + parseInt(g[1]) * 10 + parseInt(g[2]) - parseInt(h[0]) * 100 - parseInt(h[1]) * 10 - parseInt(h[2]), c + d * 100;
}), d = typeof o.mensa != "undefined", e = d && o.mensa.length || 0, f = typeof o.date != "undefined" && o.date.length === 1, g = [], h = "", i = "", j = 0, k = c.length, l = !1, m = conf.getSavedURLs().length > 1;
d && e === 1 && b[0] && g.push({
header: b[0].mensa,
type: "header",
headerType: "mensa"
});
for (j = 0; j < k; j++) l = !1, i != c[j].date && !f && (g.length > 0 && (g[g.length - 1].last = !0), l = !0, g.push({
header: c[j].date,
type: "header",
headerType: "date"
})), h != c[j].mensa && (!d || e !== 1) && m && (g.length > 0 && (g[g.length - 1].last = !0), l = !0, g.push({
header: c[j].mensa,
type: "header",
headerType: "mensa"
})), c[j].type = "item", c[j].first = l, c[j].last = !1, g.push(c[j]), h = c[j].mensa, i = c[j].date;
a(g);
});
}, x = function() {
var c = conf.getSavedURLs(), d = "", e = "", f = 0, g = 0;
C(), a = a.filter(function(a) {
return c.indexOf(a.mensa) !== -1;
}), b = b.filter(function(a) {
return c.indexOf(a.mensa) !== -1;
});
for (e in i) for (f in i[e]) g = a.filter(function(a) {
return e === a.mensa && f == a.week;
}).length, i[e][f].loaded = g > 0;
return u("mensa"), B(), this;
}, y = function(b, d) {
var f = conf.getSavedURLs(), g = "", k = new Date, l = k.getWeek(), d = d || e.getWeek(), m = "";
b && j.push(b);
for (var n = 0; n < f.length; n++) g = f[n], i[g] = i[g] || {}, !i[g][d] && typeof h[g] == "undefined" && (d === l || d === l + 1) && (c = !1, h[g] = !0, typeof debug != "undefined" && debug ? m = urls.mock[g].replace(/{{week}}/, d) : m = urls.mensenWeek[g].replace(/{{week}}/, d), xhr.get(m, function(b, c) {
var d = "", e = a.length, f = 0;
z(b, c.mensa, c.week), f = a.length, e < f && (i[c.mensa][c.week] = !0), delete h[c.mensa], A();
}, function(a, b) {
console.error("xhr error"), delete h[b.mensa], A();
}, {
mensa: g,
week: d
}));
A();
}, z = function(b, c, d) {
var e, f, g, h, i, j, k, l = [], m = [], n, o, q = document.createElement("div");
q.innerHTML = b.replace(/src="(.)*?"/g, "").replace(/<script(.|\s)*?\/script>/g, "");
try {
f = q.getElementsByTagName("table")[0].getElementsByTagName("tr");
} catch (r) {
return;
}
var s = f[0].getElementsByTagName("th")[0].innerHTML.split("<br>")[1], t = s.split("-")[0].trim(), u = t.split("."), v = new Date(u[2], u[1] - 1, u[0]);
for (var w = 1; w < f.length; w++) {
try {
e = f[w].getElementsByTagName("td"), ths = f[w].getElementsByTagName("th");
} catch (r) {
console.log(r);
continue;
}
h = ths[0].innerText.trim(), h = h.replace(/_+$/, "");
for (var x = 0; x <= 4; x++) {
try {
p = e[x].getElementsByTagName("p");
} catch (r) {
console.log(r);
continue;
}
for (var y = 0; y < p.length; y++) {
if (p[y].getElementsByClassName) priceEl = p[y].getElementsByClassName("price")[0]; else {
var z = p[y].getElementsByTagName("*"), A = z.length;
for (var B = 0; B < A; B++) if (z[B].className === "price") {
priceEl = z[B];
break;
}
}
priceEl ? (price = priceEl.innerHTML.replace("\u20ac", "").replace(" ", "").split("/"), p[y].removeChild(priceEl)) : (price = p[y].innerText.match(/[0-9]+,[0-9][0-9]/g) || [ "0", "0" ], price = price.length === 2 ? price : [ "0", "0" ], p[y].innerHTML = p[y].innerHTML.replace(/[0-9]+,[0-9][0-9]/g, "")), studPrice = price[0].replace(/[^0-9,]/g, ""), normalPrice = price[1].replace(/[^0-9,]/g, ""), l = [], tempObj = {}, n = p[y].getElementsByTagName("img");
for (B = 0; B < n.length; B++) tempObj[n[B].title] = n[B].title;
for (key in tempObj) l.push({
name: key
});
m = [], tempObj = {}, o = p[y].getElementsByTagName("span");
for (B = 0; B < o.length; B++) o[B].className === "tooltip" && (tempObj[o[B].title] = o[B].title);
for (key in tempObj) m.push({
name: key
});
g = p[y].innerText, g = g.replace(/&nbsp;/g, "").trim(), g = g.replace(/\(([0-9.]+,?)*\)/g, ""), i = new Date(v.valueOf() + x * 24 * 60 * 60 * 1e3), j = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate(), g !== "" && a.push({
mensa: c,
week: d,
name: h,
dish: g,
studPrice: studPrice,
normalPrice: normalPrice,
date: j,
properties: l,
additives: m
});
}
}
}
}, A = function() {
var a;
if (isEmpty(h)) {
while (j.length > 0) a = j.pop(), a(b);
return B(), !0;
}
return !1;
}, B = function() {
data.save("menu", JSON.stringify(a)), data.save("loadedMensen", JSON.stringify(i));
}, C = function() {
try {
a = JSON.parse(data.get("menu")) || [];
} catch (b) {
a = [];
}
try {
i = JSON.parse(data.get("loadedMensen")) || {};
} catch (b) {
i = {};
}
}, D = function() {
data.remove("menu"), data.remove("loadedMensen");
}, E = function() {
var b = (new Date).getWeek(), c = "";
a = a.filter(function(a) {
return b === a.week || b + 1 === a.week;
}), B();
}, F = function(b) {
y(function() {
var c, d = {}, e = [], f = a.length;
while (f--) d[a[f].name] = !0;
for (c in d) d.hasOwnProperty(c) && e.push(c);
b(e);
});
}, G = function(b) {
y(function() {
var c, d = {}, e = [], f = a.length;
while (f--) d[a[f].name] = !0;
for (c in d) d.hasOwnProperty(c) && e.push({
content: c,
name: c,
filtered: typeof n.name != "undefined" && o.name.indexOf(c) !== -1
});
b(e);
});
}, H = function(a) {
var b = conf.getMensaInfo(), c = b.length, d = 0, e = [];
for (d = 0; d < c; d++) b[d].active && (b[d].filtered = typeof n.mensa != "undefined" && o.mensa.indexOf(b[d].name) !== -1, b[d].content = b[d].name, e.push(b[d]));
a(e);
}, I = function(a) {
var b = K(!0), c = b.length;
while (c--) b[c] = {
filtered: typeof n.date != "undefined" && o.date.indexOf(b[c]) !== -1,
name: b[c],
content: dateToString(b[c])
};
a(b);
}, J = function(a, b) {
switch (a) {
case "date":
I(b);
break;
case "mensa":
H(b);
break;
case "name":
G(b);
}
return this;
}, K = function(a) {
var b = a ? 12 : 5, c = new Date, e = c.getDate() - c.getDay();
d = new Date(c.setDate(e)), dates = [];
for (var f = 0; f < b; f++) d = new Date(d.valueOf() + 864e5), f !== 5 && f !== 6 && dates.push(R(d));
return dates;
}, L = function(a, b) {
console.log("getMenuByDate is depreciated");
}, M = function(a, b) {
b = typeof b == "undefined" ? !0 : b, Q(e, b, a);
}, N = function(a, b) {
e = typeof debug != "undefined" && debug ? new Date(2012, 0, 24) : new Date, b = typeof b == "undefined" ? !0 : b, e.getDay() === 6 ? e.setDate(e.getDate() + 2) : e.getDay() === 0 && e.setDate(e.getDate() + 1), Q(e, b, a);
}, O = function(a, b) {
var b = typeof b == "undefined" ? !0 : b, c = e.getDay();
c === 5 ? e.setDate(e.getDate() + 3) : e.setDate(e.getDate() + 1), Q(e, b, a);
}, P = function(a, b) {
var b = typeof b == "undefined" ? !0 : b, c = e.getDay();
c === 1 ? e.setDate(e.getDate() - 3) : e.setDate(e.getDate() - 1), Q(e, b, a);
}, Q = function(a, b, c) {
t("date", R(a)), b ? w(function(b) {
c(b, R(a), a);
}) : s(function(b) {
c(b, R(a), a);
});
}, R = function(a) {
return a = new Date(a.valueOf()), a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
}, S = function(a) {
return a = a.split("-"), new Date(a[0], a[1] - 1, a[2]);
};
return C(), q(), E(), {
clearCache: D,
cleanData: x,
getInfo: J,
getTypeInfo: G,
getMensaInfo: H,
getDateInfo: I,
getTypes: F,
getAvailableDates: K,
setFilter: t,
unsetFilter: u,
unsetFilters: v,
setMensaFilter: function(a) {
t("mensa", a);
},
unsetMensaFilter: function() {
u("mensa");
},
setNameFilter: function(a) {
t("name", a);
},
unsetNameFilter: function() {
u("name");
},
setDateFilter: function(a) {
t("date", a);
},
unsetDateFilter: function() {
u("date");
},
setPersistentFilters: l,
getPersistentFilters: m,
getWeekMenu: y,
getSortedSegmented: w,
filter: s,
thisDay: M,
nextDay: O,
prevDay: P,
today: N
};
}();

// urls.js

(function() {
urls = {
mensenWeek: {
Alexanderstrasse: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/660/2012/{{week}}/",
Armgartstrasse: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/590/2012/{{week}}/",
Averhoffstrasse: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/650/2012/{{week}}/",
Bergedorf: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/520/2012/{{week}}/",
"Berliner Tor": "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/530/2012/{{week}}/",
"Botanischer Garten": "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/560/2012/{{week}}/",
"Bucerius Law School": "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/410/2012/{{week}}/",
Campus: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/340/2012/{{week}}/",
"City Nord": "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/550/2012/{{week}}/",
Finkenau: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/620/2012/{{week}}/",
Geomatikum: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/540/2012/{{week}}/",
Harburg: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/570/2012/{{week}}/",
Jungiusstrasse: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/610/2012/{{week}}/",
Philosophenturm: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/350/2012/{{week}}/",
Stellingen: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/580/2012/{{week}}/",
Studierendenhaus: "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/310/2012/{{week}}/"
},
mock: {
Alexanderstrasse: "mock/alexanderstrasse.html",
Armgartstrasse: "mock/armgardtstrasse.html",
Averhoffstrasse: "mock/averhoffstrasse.html",
Bergedorf: "mock/bergedorf.html",
"Berliner Tor": "mock/berlinertor.html",
"Botanischer Garten": "mock/botanischergarten.html",
"Bucerius Law School": "mock/buzze.html",
Campus: "mock/campus.html",
"City Nord": "mock/citynord.html",
Finkenau: "mock/finkenau.html",
Geomatikum: "mock/geomatikum.html",
Harburg: "mock/harburg.html",
Jungiusstrasse: "mock/jungiusstrasse.html",
Philosophenturm: "mock/philosophenturm.html",
Stellingen: "mock/stellingen.html",
Studierendenhaus: "mock/studierendenhaus.html"
}
};
})();

// xhr.js

(function() {
xhr = {
get: function(a, b, c, d) {
var e = new XMLHttpRequest;
e.open("GET", a, !0), e.onreadystatechange = function() {
e.readyState === 4 && (e.status === 200 ? b(e.responseText, d) : e.status === 0 ? b(e.responseText, d) : typeof c == "function" && c(e.responseText, d));
}, e.send(null);
},
getJSON: function(a, b, c) {
this.get(a, function(a) {
b(JSON.parse(a));
}, c);
},
putJSON: function(a, b, c, d) {
var e = new XMLHttpRequest;
e.open("PUT", a, !0), e.onreadystatechange = function() {
e.readyState === 4 && (e.status === 200 ? c(e.responseText) : typeof d == "function" && d(e.responseText));
}, e.setRequestHeader("Content-Type", "application/json"), e.send(JSON.stringify(b));
}
};
})();

// App.js

enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling(), enyo.kind({
name: "App",
kind: "Control",
components: [ {
kind: "FittableRows",
style: "height: 100%",
components: [ {
name: "spinner",
tag: "img",
src: "img/spinner.gif",
showing: !1,
classes: "search-spinner"
}, {
name: "loadingMessage",
classes: "loading-message",
content: "Wird geladen...",
showing: !1
}, {
kind: "onyx.Toolbar",
name: "menuHeader",
components: [ {
kind: "FittableColumns",
style: "width: 100%; margin: 0px",
components: [ {
kind: "onyx.IconButton",
style: "height: 32px;",
src: "img/menu-icon-back.png",
ontap: "yesterday",
name: "yesterdayControl"
}, {
content: "",
name: "mainHeader",
fit: !0,
ontap: "today",
style: "text-align: center;"
}, {
kind: "onyx.IconButton",
style: "height: 32px;",
src: "img/menu-icon-forward.png",
ontap: "tomorrow",
name: "tomorrowControl"
} ]
} ]
}, {
kind: "List",
fit: !0,
classes: "enyo-unselectable preventDragTap",
name: "menu",
onSetupItem: "setupRow",
components: [ {
name: "divider",
classes: "divider"
}, {
name: "item",
kind: "menuItem",
classes: "item enyo-border-box"
} ]
}, {
name: "info",
showing: !1,
fit: !0,
kind: "FittableRows",
components: [ {
kind: "onyx.Toolbar",
components: [ {
kind: "FittableColumns",
style: "width: 100%;",
components: [ {
content: info.appName
} ]
} ]
}, {
kind: "Scroller",
fit: !0,
components: [ {
style: "margin: 1em;",
content: info.appDesc
}, {
components: [ {
kind: "onyx.Button",
content: "Ok",
style: "width: 100%; margin-bottom: .5em;",
classes: "onyx-affirmative",
onclick: "menuView"
} ]
}, {
components: [ {
kind: "onyx.Button",
content: "Zur Projektseite",
style: "width: 100%; margin-bottom: .5em",
onclick: "moreInfo"
} ]
}, {
components: [ {
kind: "onyx.Button",
content: "Email schreiben",
style: "width: 100%; margin-bottom: .5em",
onclick: "email"
} ]
}, {
components: [ {
kind: "onyx.Button",
content: "App zur\u00fccksetzen",
style: "width: 100%; margin-bottom: .5em",
classes: "onyx-negative",
onclick: "reset"
} ]
} ]
} ]
}, {
name: "settings",
showing: !1,
kind: "FittableRows",
fit: !0,
components: [ {
kind: "onyx.Toolbar",
components: [ {
content: "Einstellungen"
} ]
}, {
kind: "Select",
style: "padding: 3%; display:block; width: 100%;",
onchange: "setPrices",
selected: conf.displayStudentPrices() ? 0 : 1,
components: [ {
content: "Studentenpreise anzeigen",
value: !0
}, {
content: "Normale Preise anzeigen",
value: !1
} ]
}, {
kind: "Scroller",
fit: !0,
components: [ {
name: "availableMensen",
kind: "Repeater",
onSetupItem: "setupAllMensaRows",
components: [ {
kind: "toggleItem",
classes: "item enyo-border-box"
} ]
} ]
}, {
kind: "onyx.Button",
content: "Speichern",
style: "width: 100%;",
classes: "onyx-affirmative",
onclick: "saveMensen"
} ]
}, {
name: "filter",
showing: !1,
fit: !0,
kind: "FittableRows",
components: [ {
kind: "onyx.Toolbar",
components: [ {
content: "Gerichte filtern"
} ]
}, {
name: "preserveFilters",
kind: "toggleItem",
onclick: "changePreserveFilters",
onSetupItem: "setupNameRow"
}, {
kind: "Scroller",
fit: !0,
components: [ {
kind: "onyx.Groupbox",
components: [ {
kind: "onyx.GroupboxHeader",
content: "Nach Gericht filtern"
}, {
name: "nameFilter",
kind: "Repeater",
onSetupItem: "setupNameRow",
components: [ {
kind: "toggleItem"
} ]
} ]
}, {
kind: "onyx.Groupbox",
components: [ {
kind: "onyx.GroupboxHeader",
content: "Nach Mensa filtern"
}, {
name: "mensaFilter",
kind: "Repeater",
onSetupItem: "setupMensaRow",
components: [ {
kind: "toggleItem",
classes: "item enyo-border-box"
} ]
} ]
} ]
}, {
kind: "onyx.Button",
content: "Filtern",
style: "width: 100%;",
classes: "onyx-affirmative",
onclick: "applyFilters"
} ]
}, {
kind: "onyx.Toolbar",
components: [ {
kind: "onyx.IconButton",
name: "menuButton",
style: "width: 25%;height: 32px;",
src: "img/menu.png",
ontap: "menuView",
classes: "navButton active"
}, {
kind: "onyx.IconButton",
name: "settingsButton",
style: "width: 25%;height: 32px;",
src: "img/settings.png",
ontap: "settings",
classes: "navButton"
}, {
kind: "onyx.IconButton",
name: "filterButton",
style: "width: 25%;height: 32px;",
src: "img/filter.png",
ontap: "filter",
classes: "navButton"
}, {
kind: "onyx.IconButton",
name: "infoButton",
style: "width: 25%;height: 32px;",
src: "img/info.png",
ontap: "info",
classes: "navButton"
} ]
} ]
}, {
name: "popup",
kind: "onyx.Popup",
centered: !0,
modal: !0,
floating: !0,
style: "margin: 10px",
content: info.notConfText
} ],
menu: [],
cache: {
name: [],
mensa: [],
availableMensen: conf.getMensaInfo()
},
create: function() {
this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments);
},
setupRow: function(a, b) {
var c = b.index, d = this.menu[c];
d.type === "header" ? (this.$.divider.canGenerate = !0, this.$.item.canGenerate = !1, this.$.divider.setContent(d.header)) : (this.$.divider.canGenerate = !1, this.$.item.canGenerate = !0, this.$.item.setMenuItem(d));
},
setupMensaRow: function(a, b) {
var c = b.index, d = this.cache.mensa[c];
b.item.$.toggleItem.setItem(d.active, d.name || d.label);
},
setupAllMensaRows: function(a, b) {
var c = b.index, d = this.cache.availableMensen[c];
b.item.$.toggleItem.setItem(d.active, d.name || d.label);
},
setupNameRow: function(a, b) {
var c = b.index, d = this.cache.name[c];
b.item.$.toggleItem.setItem(d.active, d.label);
},
changePreserveFilters: function(a) {
storage.setPersistentFilters(a.$.toggle.getValue());
},
applyFilters: function() {
this.setFilter("name").setFilter("mensa").display("thisDay").openPage("menu");
},
setFilter: function(a) {
var b = this.$[a + "Filter"].children, c = b.length, d = [], e, f;
for (var g = 0; g < c; g++) e = b[g].children[0].children[0], f = e.children[0].getValue(), this.cache[a][g].active = f, f && d.push(e.children[1].content);
return d.length === 0 || d.length === c ? storage.unsetFilter(a) : storage.setFilter(a, d), this;
},
setHeader: function(a) {
var b = this.$.mainHeader;
b.content = a, b.render();
},
moreInfo: function(a, b) {
location.href = info.appURL;
},
email: function(a, b) {
location.href = "mailto:" + info.appEmail + "?subject=Mensa%20Hamburg%20App&body=Moin!";
},
reset: function(a, b) {
data.clear(), location.reload();
},
loading: function(a) {
var b = 100, c = 1e3, d = this;
this.timer && !a ? (this.showloadingMessage(!1), this.showloadingSpinner(!1), clearTimeout(this.timer), clearTimeout(this.long_timer), delete this.timer, delete this.long_timer) : a && typeof this.timer != "number" && (this.timer = setTimeout(function() {
d.showloadingMessage(!0);
}, b), this.long_timer = setTimeout(function() {
d.showloadingSpinner(!0);
}, c));
},
showloadingMessage: function(a) {
var b = [ "Bin dabei...", "Kommt gleich...", "abwarten...", "wird geladen...", "Eile mit Weile..." ];
a && (this.$.menu.setCount(0), this.$.menu.render(), this.$.loadingMessage.content = b[Math.round(Math.random() * (b.length - 1))], this.$.loadingMessage.render()), this.$.loadingMessage.setShowing(a);
},
showloadingSpinner: function(a) {
this.$.spinner.setShowing(a);
},
today: function(a) {
this.display("today");
},
yesterday: function(a) {
a = a || this.$.yesterdayControl, a.addClass("active"), this.display("prevDay", function() {
a.removeClass("active");
});
},
tomorrow: function(a) {
a = a || this.$.tomorrowControl, a.addClass("active"), this.display("nextDay", function(b) {
a.removeClass("active");
var c = storage.getAvailableDates(1);
c.indexOf(b) === c.length + 1 && a.setShowing(!1);
});
},
display: function(a, b) {
var c = this;
return this.loading(!0), setTimeout(function() {
storage[a](function(a, d, e) {
c.menu = a, c.$.menu.setCount(a.length), c.$.menu.render(), c.setHeader(dateToString(d)), c.loading(!1), b && b(d);
});
}, 1), this;
},
filter: function(a) {
var b = this;
this.$.preserveFilters.setItem(storage.getPersistentFilters(), "Filter permanent"), storage.getMensaInfo(function(a) {
var c = a.filter(function(a) {
return a.filtered;
}).length === 0;
b.cache.mensa = [ {
label: "Alle",
active: c
} ], a.forEach(function(a) {
b.cache.mensa.push({
label: a.name,
active: a.filtered || c
});
}), b.$.mensaFilter.setCount(b.cache.mensa.length);
}), storage.getTypeInfo(function(a) {
var c = a.filter(function(a) {
return a.filtered;
}).length === 0;
b.cache.name = [ {
label: "Alle",
active: c
} ], a.forEach(function(a) {
b.cache.name.push({
label: a.name,
active: a.filtered || c
});
}), b.$.nameFilter.setCount(b.cache.name.length);
}), this.openPage("filter");
},
info: function() {
this.openPage("info");
},
menuView: function() {
this.openPage("menu");
},
setPrices: function(a) {
conf.setStudentPrices(a.children[a.selected].value);
},
settings: function() {
this.$.availableMensen.setCount(this.cache.availableMensen.length), this.openPage("settings");
},
openPage: function(a) {
var b = [ "settings", "info", "menu", "filter" ], c = this;
b.forEach(function(b) {
b === a ? (c.$[b].setShowing(!0), c.$[b + "Header"] && c.$[b + "Header"].setShowing(!0), c.$[b + "Button"].addClass("active")) : (c.$[b].setShowing(!1), c.$[b + "Header"] && c.$[b + "Header"].setShowing(!1), c.$[b + "Button"].removeClass("active"));
}), this.render();
},
saveMensen: function(a) {
var b = this, c = [], d = document.getElementById("app_availableMensen").getElementsByClassName("enyo-checkbox");
Array.prototype.forEach.call(d, function(a, d) {
a.checked && c.push(b.cache.availableMensen[d].name);
}), conf.setURLs(c), this.cache.availableMensen = conf.getMensaInfo(), storage.cleanData(), this.display("thisDay"), this.openPage("menu");
},
showNotConfigured: function() {
var a = this.$.popup;
a.show(), a.applyStyle("left", 0);
}
}), enyo.kind({
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
} ],
setMenuItem: function(a) {
this.removeClass("first"), this.removeClass("last"), a.first && this.addClass("first"), a.last && this.addClass("last"), this.$.name.setContent(a.name), this.$.price.setContent((conf.displayStudentPrices() ? a.studPrice : a.normalPrice) + "\u20ac"), this.$.dish.setContent(a.dish), this.$.mensa.setContent(a.mensa);
}
}), enyo.kind({
name: "toggleItem",
classes: "item",
components: [ {
kind: "FittableRows",
ontap: "toggleItemClick",
components: [ {
name: "toggle",
kind: "onyx.Checkbox"
}, {
name: "label",
fit: !0,
style: "display:inline;"
} ]
} ],
setItem: function(a, b) {
this.$.toggle.setValue(a), this.$.label.setContent(b);
},
toggleItemClick: function(a) {
this.$.toggle.setValue(!this.$.toggle.getValue());
var b = this.parent.parent.children.length;
try {
if (this.$.label.getContent() === "Alle") for (var c = 1; c < b; c++) this.parent.parent.children[c].children[0].children[0].children[0].setValue(!0); else this.parent.parent.children[0].children[0].children[0].children[1].getContent() === "Alle" && this.parent.parent.children[0].children[0].children[0].children[0].setValue(!1);
} catch (d) {}
}
});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: ""
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged();
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
ondown: "downHandler",
onclick: ""
},
downHandler: function(a, b) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !0;
},
tap: function(a, b) {
return !this.disabled;
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
classes: "onyx-popup"
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
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
receiveFocus: function() {
this.addClass("onyx-focused");
},
receiveBlur: function() {
this.removeClass("onyx-focused");
},
disabledChange: function(a, b) {
this.addRemoveClass("onyx-disabled", b.originator.disabled);
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
highlander: !0,
defaultKind: "onyx.RadioButton"
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
this.inherited(arguments), this.valueChanged();
},
valueChanged: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value);
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
updateValue: function(a) {
this.disabled || (this.setValue(a), this.doChange({
value: this.value
}));
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(a, b) {
if (b.horizontal) return b.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(a, b) {
if (this.dragging) {
var c = b.dx;
return Math.abs(c) > 10 && (this.updateValue(c > 0), this.dragged = !0), !0;
}
},
dragfinish: function(a, b) {
this.dragging = !1, this.dragged && b.preventTap();
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline"
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
animateStripes: !0
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
barClassesChanged: function(a) {
this.$.bar.removeClass(a), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var a = this.calcPercent(this.progress);
this.updateBarPosition(a);
},
clampValue: function(a, b, c) {
return Math.max(a, Math.min(c, b));
},
calcRatio: function(a) {
return (a - this.min) / (this.max - this.min);
},
calcPercent: function(a) {
return this.calcRatio(a) * 100;
},
updateBarPosition: function(a) {
this.$.bar.applyStyle("width", a + "%");
},
animateProgressTo: function(a) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: a,
node: this.hasNode()
});
},
progressAnimatorStep: function(a) {
return this.setProgress(a.value), !0;
},
progressAnimatorComplete: function(a) {
return this.doAnimateProgressFinish(a), !0;
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
var a = this.calcPercent(this.value);
this.updateKnobPosition(a), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(a) {
this.$.knob.applyStyle("left", a + "%");
},
calcKnobPosition: function(a) {
var b = a.clientX - this.hasNode().getBoundingClientRect().left;
return b / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(a, b) {
if (b.horizontal) return b.preventDefault(), this.dragging = !0, !0;
},
drag: function(a, b) {
if (this.dragging) {
var c = this.calcKnobPosition(b);
return this.setValue(c), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(a, b) {
return this.dragging = !1, b.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(a, b) {
if (this.tappable) {
var c = this.calcKnobPosition(b);
return this.tapped = !0, this.animateTo(c), !0;
}
},
animateTo: function(a) {
this.$.animator.play({
startValue: this.value,
endValue: a,
node: this.hasNode()
});
},
animatorStep: function(a) {
return this.setValue(a.value), !0;
},
animatorComplete: function(a) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(a), !0;
}
});

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var a = 0, b = this.container.children, c; c = b[a]; a++) if (c.fit && c.showing) return a;
},
getFitControl: function() {
var a = this.container.children, b = a[this.fitIndex];
return b && b.fit && b.showing || (this.fitIndex = this.calcFitIndex(), b = a[this.fitIndex]), b;
},
getLastControl: function() {
var a = this.container.children, b = a.length - 1, c = a[b];
while ((c = a[b]) && !c.showing) b--;
return c;
},
_reflow: function(a, b, c, d) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var e = this.getFitControl();
if (!e) return;
var f = 0, g = 0, h = 0, i, j = this.container.hasNode();
j && (i = enyo.FittableLayout.calcPaddingExtents(j), f = j[b] - (i[c] + i[d]));
var k = e.getBounds();
g = k[c] - (i && i[c] || 0);
var l = this.getLastControl();
if (l) {
var m = enyo.FittableLayout.getComputedStyleValue(l.hasNode(), "margin-" + d) || 0;
if (l != e) {
var n = l.getBounds(), o = k[c] + k[a], p = n[c] + n[a] + m;
h = p - o;
} else h = m;
}
var q = f - (g + h);
e.applyStyle(a, q + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
},
statics: {
_ieCssToPixelValue: function(a, b) {
var c = b, d = a.style, e = d.left, f = a.runtimeStyle && a.runtimeStyle.left;
return f && (a.runtimeStyle.left = a.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, f && (d.runtimeStyle.left = f), c;
},
_pxMatch: /px/i,
getComputedStyleValue: function(a, b, c) {
var d = c || enyo.dom.getComputedStyle(a);
if (d) return parseInt(d.getPropertyValue(b));
if (a && a.currentStyle) {
var e = a.currentStyle[b];
return e.match(this._pxMatch) || (e = this._ieCssToPixelValue(a, e)), parseInt(e);
}
return 0;
},
calcBoxExtents: function(a, b) {
var c = enyo.dom.getComputedStyle(a);
return {
top: this.getComputedStyleValue(a, b + "-top", c),
right: this.getComputedStyleValue(a, b + "-right", c),
bottom: this.getComputedStyleValue(a, b + "-bottom", c),
left: this.getComputedStyleValue(a, b + "-left", c)
};
},
calcPaddingExtents: function(a) {
return this.calcBoxExtents(a, "padding");
},
calcMarginExtents: function(a) {
return this.calcBoxExtents(a, "margin");
}
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

// Selection.js

enyo.kind({
name: "enyo.Selection",
kind: enyo.Component,
published: {
multi: !1
},
events: {
onSelect: "",
onDeselect: "",
onChange: ""
},
create: function() {
this.clear(), this.inherited(arguments);
},
multiChanged: function() {
this.multi || this.clear(), this.doChange();
},
highlander: function(a) {
this.multi || this.deselect(this.lastSelected);
},
clear: function() {
this.selected = [];
},
isSelected: function(a) {
return this.selected[a];
},
setByKey: function(a, b, c) {
if (b) this.selected[a] = c || !0, this.lastSelected = a, this.doSelect({
key: a,
data: this.selected[a]
}); else {
var d = this.isSelected(a);
delete this.selected[a], this.doDeselect({
key: a,
data: d
});
}
this.doChange();
},
deselect: function(a) {
this.isSelected(a) && this.setByKey(a, !1);
},
select: function(a, b) {
this.multi ? this.setByKey(a, !this.isSelected(a), b) : this.isSelected(a) || (this.highlander(), this.setByKey(a, !0, b));
},
toggle: function(a, b) {
!this.multi && this.lastSelected != a && this.deselect(this.lastSelected), this.setByKey(a, !this.isSelected(a), b);
},
getSelected: function() {
return this.selected;
}
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
multiSelect: !1,
toggleSelected: !1
},
events: {
onSetupItem: ""
},
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
bottomUp: !1,
create: function() {
this.inherited(arguments), this.multiSelectChanged();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
setupItem: function(a) {
this.doSetupItem({
index: a,
selected: this.isSelected(a)
});
},
generateChildHtml: function() {
var a = "";
this.index = null;
for (var b = 0, c = 0; b < this.count; b++) c = this.rowOffset + (this.bottomUp ? this.count - b - 1 : b), this.setupItem(c), this.$.client.setAttribute("index", c), a += this.inherited(arguments), this.$.client.teardownRender();
return a;
},
previewDomEvent: function(a) {
var b = this.index = this.rowForEvent(a);
a.rowIndex = a.index = b, a.flyweight = this;
},
decorateEvent: function(a, b, c) {
var d = b && b.index != null ? b.index : this.index;
b && d != null && (b.index = d, b.flyweight = this), this.inherited(arguments);
},
tap: function(a, b) {
this.toggleSelected ? this.$.selection.toggle(b.index) : this.$.selection.select(b.index);
},
selectDeselect: function(a, b) {
this.renderRow(b.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(a) {
return this.getSelection().isSelected(a);
},
renderRow: function(a) {
var b = this.fetchRowNode(a);
b && (this.setupItem(a), b.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(a) {
if (this.hasNode()) {
var b = this.node.querySelectorAll('[index="' + a + '"]');
return b && b[0];
}
},
rowForEvent: function(a) {
var b = a.target, c = this.hasNode().id;
while (b && b.parentNode && b.id != c) {
var d = b.getAttribute && b.getAttribute("index");
if (d !== null) return Number(d);
b = b.parentNode;
}
return -1;
},
prepareRow: function(a) {
var b = this.fetchRowNode(a);
enyo.FlyweightRepeater.claimNode(this.$.client, b);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(a, b, c) {
b && (this.prepareRow(a), enyo.call(c || null, b), this.lockRow());
},
statics: {
claimNode: function(a, b) {
var c = b && b.querySelectorAll("#" + a.id);
c = c && c[0], a.generated = Boolean(c || !a.tag), a.node = c, a.node && a.rendered();
for (var d = 0, e = a.children, f; f = e[d]; d++) this.claimNode(f, b);
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
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
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
for (var a = 0; a < this.pageCount; a++) this.portSize += this.getPageHeight(a);
this.adjustPortSize();
},
generatePage: function(a, b) {
this.page = a;
var c = this.$.generator.rowOffset = this.rowsPerPage * this.page, d = this.$.generator.count = Math.min(this.count - c, this.rowsPerPage), e = this.$.generator.generateChildHtml();
b.setContent(e), this.rowHeight || (this.rowHeight = Math.floor(b.getBounds().height / d), this.updateMetrics());
if (!this.fixedHeight) {
var f = this.getPageHeight(a), g = this.pageHeights[a] = b.getBounds().height;
f != g && (this.portSize += g - f);
}
},
update: function(a) {
var b = !1, c = this.positionToPageInfo(a), d = c.pos + this.scrollerHeight / 2, e = Math.floor(d / Math.max(c.height, this.scrollerHeight) + .5) + c.no, f = e % 2 == 0 ? e : e - 1;
this.p0 != f && this.isPageInRange(f) && (this.generatePage(f, this.$.page0), this.positionPage(f, this.$.page0), this.p0 = f, b = !0), f = e % 2 == 0 ? Math.max(1, e - 1) : e, this.p1 != f && this.isPageInRange(f) && (this.generatePage(f, this.$.page1), this.positionPage(f, this.$.page1), this.p1 = f, b = !0), b && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(a) {
this.update(this.calcPos(a));
},
calcPos: function(a) {
return this.bottomUp ? this.portSize - this.scrollerHeight - a : a;
},
adjustBottomPage: function() {
var a = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(a.pageNo, a);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var a = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", a + "px");
},
positionPage: function(a, b) {
b.pageNo = a;
var c = this.pageToPosition(a);
b.applyStyle(this.pageBound, c + "px");
},
pageToPosition: function(a) {
var b = 0, c = a;
while (c > 0) c--, b += this.getPageHeight(c);
return b;
},
positionToPageInfo: function(a) {
var b = -1, c = this.calcPos(a), d = this.defaultPageHeight;
while (c >= 0) b++, d = this.getPageHeight(b), c -= d;
return {
no: b,
height: d,
pos: c + d
};
},
isPageInRange: function(a) {
return a == Math.max(0, Math.min(this.pageCount - 1, a));
},
getPageHeight: function(a) {
return this.pageHeights[a] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(a, b) {
var c = this.inherited(arguments);
return this.update(this.getScrollTop()), c;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(a) {
this.update(a), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(a) {
this.setScrollTop(this.calcPos(a));
},
scrollToRow: function(a) {
var b = Math.floor(a / this.rowsPerPage), c = a % this.rowsPerPage, d = this.pageToPosition(b);
this.updateForPosition(d), d = this.pageToPosition(b), this.setScrollPosition(d);
if (b == this.p0 || b == this.p1) {
var e = this.$.generator.fetchRowNode(a);
if (e) {
var f = e.offsetTop;
this.bottomUp && (f = this.getPageHeight(b) - e.offsetHeight - f);
var g = this.getScrollPosition() + f;
this.setScrollPosition(g);
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
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(a, b) {
return this.getSelection().select(a, b);
},
isSelected: function(a) {
return this.$.generator.isSelected(a);
},
renderRow: function(a) {
this.$.generator.renderRow(a);
},
prepareRow: function(a) {
this.$.generator.prepareRow(a);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(a, b, c) {
this.$.generator.performOnRow(a, b, c);
},
animateFinish: function(a) {
return this.twiddle(), !0;
},
twiddle: function() {
var a = this.getStrategy();
enyo.call(a, "twiddle");
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
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
updateDragScalar: function() {
if (this.unit == "%") {
var a = this.getBounds()[this.dimension];
this.kDragScalar = a ? 100 / a : 1;
}
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var a = this.axis == "h";
this.dragMoveProp = a ? "dx" : "dy", this.shouldDragProp = a ? "horizontal" : "vertical", this.transform = a ? "translateX" : "translateY", this.dimension = a ? "width" : "height";
},
valueChanged: function(a) {
var b = this.value;
this.isOob(b) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(b) : this.clampValue(b)), enyo.platform.android > 2 && (this.value ? (a == 0 || a == undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), enyo.dom.transformValue(this, this.transform, this.value + this.unit), this.doChange();
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
clampValue: function(a) {
var b = this.calcMin(), c = this.calcMax();
return Math.max(b, Math.min(a, c));
},
dampValue: function(a) {
return this.dampBound(this.dampBound(a, this.min, 1), this.max, -1);
},
dampBound: function(a, b, c) {
var d = a;
return d * c < b * c && (d = b + (d - b) / 4), d;
},
shouldDrag: function(a) {
return this.draggable && a[this.shouldDragProp];
},
isOob: function(a) {
return a > this.calcMax() || a < this.calcMin();
},
dragstart: function(a, b) {
if (this.shouldDrag(b)) return b.preventDefault(), this.$.animator.stop(), b.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(a, b) {
if (this.dragging) {
b.preventDefault();
var c = b[this.dragMoveProp] * this.kDragScalar, d = this.drag0 + c, e = c - this.dragd0;
return this.dragd0 = c, e && (b.dragInfo.minimizing = e < 0), this.setValue(d), this.preventDragPropagation;
}
},
dragfinish: function(a, b) {
if (this.dragging) return this.dragging = !1, this.completeDrag(b), b.preventTap(), this.preventDragPropagation;
},
completeDrag: function(a) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(a.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(a, b) {
this.$.animator.play({
startValue: a,
endValue: b,
node: this.hasNode()
});
},
animateTo: function(a) {
this.play(this.value, a);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(a) {
a ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(a) {
return this.setValue(a.value), !0;
},
animatorComplete: function(a) {
return this.doAnimateFinish(a), !0;
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
destroy: function() {
var a = this.container.children;
for (var b = 0, c; c = a[b]; b++) c._arranger = null;
this.inherited(arguments);
},
arrange: function(a, b) {},
size: function() {},
start: function() {
var a = this.container.fromIndex, b = this.container.toIndex, c = this.container.transitionPoints = [ a ];
if (this.incrementalPoints) {
var d = Math.abs(b - a) - 2, e = a;
while (d >= 0) e += b < a ? -1 : 1, c.push(e), d--;
}
c.push(this.container.toIndex);
},
finish: function() {},
canDragEvent: function(a) {
return a[this.canDragProp];
},
calcDragDirection: function(a) {
return a[this.dragDirectionProp];
},
calcDrag: function(a) {
return a[this.dragProp];
},
drag: function(a, b, c, d, e) {
var f = this.measureArrangementDelta(-a, b, c, d, e);
return f;
},
measureArrangementDelta: function(a, b, c, d, e) {
var f = this.calcArrangementDifference(b, c, d, e), g = f ? a / Math.abs(f) : 0;
return g *= this.container.fromIndex > this.container.toIndex ? -1 : 1, g;
},
calcArrangementDifference: function(a, b, c, d) {},
_arrange: function(a) {
var b = this.getOrderedControls(a);
this.arrange(b, a);
},
arrangeControl: function(a, b) {
a._arranger = enyo.mixin(a._arranger || {}, b);
},
flow: function() {
this.c$ = [].concat(this.container.children), this.controlsIndex = 0;
for (var a = 0, b = this.container.children, c; c = b[a]; a++) enyo.dom.accelerate(c, this.accelerated);
},
reflow: function() {
var a = this.container.hasNode();
this.containerBounds = a ? {
width: a.clientWidth,
height: a.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var a = this.container.arrangement;
if (a) for (var b = 0, c = this.container.children, d; d = c[b]; b++) this.flowControl(d, a[b]);
},
flowControl: function(a, b) {
enyo.Arranger.positionControl(a, b);
var c = b.opacity;
c != null && enyo.Arranger.opacifyControl(a, c);
},
getOrderedControls: function(a) {
var b = Math.floor(a), c = b - this.controlsIndex, d = c > 0, e = this.c$ || [];
for (var f = 0; f < Math.abs(c); f++) d ? e.push(e.shift()) : e.unshift(e.pop());
return this.controlsIndex = b, e;
},
statics: {
positionControl: function(a, b, c) {
var d = c || "px";
if (!this.updating) if (enyo.dom.canTransform()) {
var e = b.left, f = b.top, e = enyo.isString(e) ? e : e && e + d, f = enyo.isString(f) ? f : f && f + d;
enyo.dom.transform(a, {
translateX: e || null,
translateY: f || null
});
} else a.setBounds(b, c);
},
opacifyControl: function(a, b) {
var c = b;
c = c > .99 ? 1 : c < .01 ? 0 : c, enyo.platform.ie < 9 ? a.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + c * 100 + ")") : a.applyStyle("opacity", c);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(a, b, c, d) {
return this.containerBounds.width;
},
destroy: function() {
var a = this.container.children;
for (var b = 0, c; c = a[b]; b++) enyo.Arranger.opacifyControl(c, 1), c.setShowing(!0), c.resized();
this.inherited(arguments);
},
arrange: function(a, b) {
for (var c = 0, d, e, f; d = a[c]; c++) f = c == 0 ? 1 : 0, this.arrangeControl(d, {
opacity: f
});
},
start: function() {
this.inherited(arguments);
var a = this.container.children;
for (var b = 0, c; c = a[b]; b++) c.setShowing(b == this.container.fromIndex || b == this.container.toIndex), c.showing && c.resized();
},
finish: function() {
this.inherited(arguments);
var a = this.container.children;
for (var b = 0, c; c = a[b]; b++) c.setShowing(b == this.container.toIndex);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var a = this.container.children;
for (var b = 0, c; c = a[b]; b++) c.setShowing(b == this.container.fromIndex || b == this.container.toIndex), c.showing && c.resized();
var d = this.container.fromIndex, b = this.container.toIndex;
this.container.transitionPoints = [ b + "." + d + ".s", b + "." + d + ".f" ];
},
finish: function() {
this.inherited(arguments);
var a = this.container.children;
for (var b = 0, c; c = a[b]; b++) c.setShowing(b == this.container.toIndex);
},
arrange: function(a, b) {
var c = b.split("."), d = c[0], e = c[1], f = c[2] == "s", g = this.containerBounds.width;
for (var h = 0, i = this.container.children, j, g, k; j = i[h]; h++) k = g, e == h && (k = f ? 0 : -g), d == h && (k = f ? g : 0), e == h && e == d && (k = 0), this.arrangeControl(j, {
left: k
});
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var a = this.container.children, b = this.containerPadding = this.container.hasNode() ? enyo.FittableLayout.calcPaddingExtents(this.container.node) : {}, c = this.containerBounds;
c.height -= b.top + b.bottom, c.width -= b.left + b.right;
var d;
for (var e = 0, f = 0, g, h; h = a[e]; e++) g = enyo.FittableLayout.calcMarginExtents(h.hasNode()), h.width = h.getBounds().width, h.marginWidth = g.right + g.left, f += (h.fit ? 0 : h.width) + h.marginWidth, h.fit && (d = h);
if (d) {
var i = c.width - f;
d.width = i >= 0 ? i : d.width;
}
for (var e = 0, j = b.left, g, h; h = a[e]; e++) h.setBounds({
top: b.top,
bottom: b.bottom,
width: h.fit ? h.width : null
});
},
arrange: function(a, b) {
this.container.wrap ? this.arrangeWrap(a, b) : this.arrangeNoWrap(a, b);
},
arrangeNoWrap: function(a, b) {
var c = this.container.children, d = this.container.clamp(b), e = this.containerBounds.width;
for (var f = d, g = 0, h; h = c[f]; f++) {
g += h.width + h.marginWidth;
if (g > e) break;
}
var i = e - g, j = 0;
if (i > 0) {
var k = d;
for (var f = d - 1, l = 0, h; h = c[f]; f--) {
l += h.width + h.marginWidth;
if (i - l <= 0) {
j = i - l, d = f;
break;
}
}
}
for (var f = 0, m = this.containerPadding.left + j, n, h; h = c[f]; f++) n = h.width + h.marginWidth, f < d ? this.arrangeControl(h, {
left: -n
}) : (this.arrangeControl(h, {
left: Math.floor(m)
}), m += n);
},
arrangeWrap: function(a, b) {
for (var c = 0, d = this.containerPadding.left, e, f; f = a[c]; c++) this.arrangeControl(f, {
left: d
}), d += f.width + f.marginWidth;
},
calcArrangementDifference: function(a, b, c, d) {
var e = Math.abs(a % this.c$.length);
return b[e].left - d[e].left;
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
for (var a = 0, b = this.container.children, c; c = b[a]; a++) c._fit && a != b.length - 1 && (c.applyStyle("width", null), c._fit = null);
},
arrange: function(a, b) {
var c = this.container.children;
for (var d = 0, e = this.containerPadding.left, f, g; g = c[d]; d++) this.arrangeControl(g, {
left: e
}), d >= b && (e += g.width + g.marginWidth), d == c.length - 1 && b < 0 && this.arrangeControl(g, {
left: e - b
});
},
calcArrangementDifference: function(a, b, c, d) {
var e = this.container.children.length - 1;
return Math.abs(d[e].left - b[e].left);
},
flowControl: function(a, b) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var c = this.container.children, d = c.length - 1, e = c[d];
a == e && this.fitControl(a, b.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var a = this.container.children, b = this.container.arrangement, c = a.length - 1, d = a[c];
this.fitControl(d, b[c].left);
}
},
fitControl: function(a, b) {
a._fit = !0, a.applyStyle("width", this.containerBounds.width - b + "px"), a.resized();
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
var a = this.container.children, b = this.containerBounds[this.axisSize], c = b - this.margin - this.margin;
for (var d = 0, e, f; f = a[d]; d++) e = {}, e[this.axisSize] = c, e[this.offAxisSize] = "100%", f.setBounds(e);
},
arrange: function(a, b) {
var c = Math.floor(this.container.children.length / 2), d = this.getOrderedControls(Math.floor(b) - c), e = this.containerBounds[this.axisSize] - this.margin - this.margin, f = this.margin - e * c, g = (d.length - 1) / 2;
for (var h = 0, i, j, k; i = d[h]; h++) j = {}, j[this.axisPosition] = f, j.opacity = h == 0 || h == d.length - 1 ? 0 : 1, this.arrangeControl(i, j), f += e;
},
calcArrangementDifference: function(a, b, c, d) {
var e = Math.abs(a % this.c$.length);
return b[e][this.axisPosition] - d[e][this.axisPosition];
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
var a = this.container.children, b = this.containerBounds, c = this.controlWidth = b.width / 3, d = this.controlHeight = b.height / 3;
for (var e = 0, f; f = a[e]; e++) f.setBounds({
width: c,
height: d
});
},
arrange: function(a, b) {
var c = this.inc;
for (var d = 0, e = a.length, f; f = a[d]; d++) {
var g = Math.cos(d / e * 2 * Math.PI) * d * c + this.controlWidth, h = Math.sin(d / e * 2 * Math.PI) * d * c + this.controlHeight;
this.arrangeControl(f, {
left: g,
top: h
});
}
},
start: function() {
this.inherited(arguments);
var a = this.getOrderedControls(this.container.toIndex);
for (var b = 0, c; c = a[b]; b++) c.applyStyle("z-index", a.length - b);
},
calcArrangementDifference: function(a, b, c, d) {
return this.controlWidth;
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var a = this.container.children, b = this.colWidth, c = this.colHeight;
for (var d = 0, e; e = a[d]; d++) e.setBounds({
width: b,
height: c
});
},
arrange: function(a, b) {
var d = this.colWidth, e = this.colHeight, f = Math.floor(this.containerBounds.width / d);
for (var g = 0, h = 0; h < a.length; g++) for (var i = 0; i < f && (c = a[h]); i++, h++) this.arrangeControl(c, {
left: d * i,
top: e * g
});
},
flowControl: function(a, b) {
this.inherited(arguments), enyo.Arranger.opacifyControl(a, b.top % this.colHeight != 0 ? .25 : 1);
},
calcArrangementDifference: function(a, b, c, d) {
return this.colWidth;
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
ondragfinish: "dragfinish"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.avoidFitChanged(), this.indexChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
avoidFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
removeControl: function(a) {
this.inherited(arguments), this.isPanel(a) && (this.flow(), this.reflow(), this.setIndex(0));
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
var a = this.controlParent || this;
return a.children;
},
getActive: function() {
var a = this.getPanels();
return a[this.index];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(a) {
this.setPropertyValue("index", a, "indexChanged");
},
setIndexDirect: function(a) {
this.setIndex(a), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(a) {
var b = this.getPanels().length - 1;
return this.wrap ? a : Math.max(0, Math.min(a, b));
},
indexChanged: function(a) {
this.lastIndex = a, this.index = this.clamp(this.index), this.dragging || (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(a) {
this.fraction = a.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(a, b) {
if (this.draggable && this.layout && this.layout.canDragEvent(b)) return b.preventDefault(), this.dragstartTransition(b), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(a, b) {
this.dragging && (b.preventDefault(), this.dragTransition(b));
},
dragfinish: function(a, b) {
this.dragging && (this.dragging = !1, b.preventTap(), this.dragfinishTransition(b));
},
dragstartTransition: function(a) {
if (!this.$.animator.isAnimating()) {
var b = this.fromIndex = this.index;
this.toIndex = b - (this.layout ? this.layout.calcDragDirection(a) : 0);
} else this.verifyDragTransition(a);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(a) {
var b = this.layout ? this.layout.calcDrag(a) : 0, c = this.transitionPoints, d = c[0], e = c[c.length - 1], f = this.fetchArrangement(d), g = this.fetchArrangement(e), h = this.layout ? this.layout.drag(b, d, f, e, g) : 0, i = b && !h;
!i, this.fraction += h;
var e = this.fraction;
if (e > 1 || e < 0 || i) (e > 0 || i) && this.dragfinishTransition(a), this.dragstartTransition(a), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(a) {
this.verifyDragTransition(a), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(a) {
var b = this.layout ? this.layout.calcDragDirection(a) : 0, c = Math.min(this.fromIndex, this.toIndex), d = Math.max(this.fromIndex, this.toIndex);
if (b > 0) {
var e = c;
c = d, d = e;
}
c != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = c, this.toIndex = d;
},
refresh: function() {
this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var a = this.startTransitionInfo;
this.hasNode() && (!a || a.fromIndex != this.fromIndex || a.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var a = this.finishTransitionInfo;
this.hasNode() && (!a || a.fromIndex != this.lastIndex || a.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo)));
},
stepTransition: function() {
if (this.hasNode()) {
var a = this.transitionPoints, b = (this.fraction || 0) * (a.length - 1), c = Math.floor(b);
b -= c;
var d = a[c], e = a[c + 1], f = this.fetchArrangement(d), g = this.fetchArrangement(e);
this.arrangement = f && g ? enyo.Panels.lerp(f, g, b) : f || g, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(a) {
return a != null && !this.arrangements[a] && this.layout && (this.layout._arrange(a), this.arrangements[a] = this.readArrangement(this.children)), this.arrangements[a];
},
readArrangement: function(a) {
var b = [];
for (var c = 0, d = a, e; e = d[c]; c++) b.push(enyo.clone(e._arranger));
return b;
},
statics: {
isScreenNarrow: function() {
return window.matchMedia && window.matchMedia("all and (max-width: 800px)").matches;
},
lerp: function(a, b, c) {
var d = [];
for (var e = 0, f = enyo.keys(a), g; g = f[e]; e++) d.push(this.lerpObject(a[g], b[g], c));
return d;
},
lerpObject: function(a, b, c) {
var d = enyo.clone(a), e, f;
for (var g in a) e = a[g], f = b[g], e != f && (d[g] = e - (e - f) * c);
return d;
}
}
});
