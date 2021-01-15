
function ge(id) {
    return document.getElementById(id);
}

//begin trim
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, "");
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}
function ltrim(stringToTrim) {
    return stringToTrim.replace(/^\s+/, "");
}
function rtrim(stringToTrim) {
    return stringToTrim.replace(/\s+$/, "");
}
// end trim

// start dateformat
/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

/*
d Day of the month as digits; no leading zero for single-digit days. 
dd Day of the month as digits; leading zero for single-digit days. 
ddd Day of the week as a three-letter abbreviation. 
dddd Day of the week as its full name. 
m Month as digits; no leading zero for single-digit months. 
mm Month as digits; leading zero for single-digit months. 
mmm Month as a three-letter abbreviation. 
mmmm Month as its full name. 
yy Year as last two digits; leading zero for years less than 10. 
yyyy Year represented by four digits. 
h Hours; no leading zero for single-digit hours (12-hour clock). 
hh Hours; leading zero for single-digit hours (12-hour clock). 
H Hours; no leading zero for single-digit hours (24-hour clock). 
HH Hours; leading zero for single-digit hours (24-hour clock). 
M Minutes; no leading zero for single-digit minutes.
Uppercase M unlike CF timeFormat's m to avoid conflict with months. 
MM Minutes; leading zero for single-digit minutes.
Uppercase MM unlike CF timeFormat's mm to avoid conflict with months. 
s Seconds; no leading zero for single-digit seconds. 
ss Seconds; leading zero for single-digit seconds. 
l or L Milliseconds. l gives 3 digits. L gives 2 digits. 
t Lowercase, single-character time marker string: a or p.
No equivalent in CF. 
tt Lowercase, two-character time marker string: am or pm.
No equivalent in CF. 
T Uppercase, single-character time marker string: A or P.
Uppercase T unlike CF's t to allow for user-specified casing. 
TT Uppercase, two-character time marker string: AM or PM.
Uppercase TT unlike CF's tt to allow for user-specified casing. 
Z US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
No equivalent in CF. 
o GMT/UTC timezone offset, e.g. -0500 or +0230.
No equivalent in CF. 
S The date's ordinal suffix (st, nd, rd, or th). Works well with d.
No equivalent in CF. 
'…' or "…" Literal character sequence. Surrounding quotes are removed.
No equivalent in CF. 
UTC: Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.
No equivalent in CF. 

And here are the named masks provided by default (you can easily change these or add your own):

Name Mask Example 
default ddd mmm dd yyyy HH:MM:ss Sat Jun 09 2007 17:46:21 
shortDate m/d/yy 6/9/07 
mediumDate mmm d, yyyy Jun 9, 2007 
longDate mmmm d, yyyy June 9, 2007 
fullDate dddd, mmmm d, yyyy Saturday, June 9, 2007 
shortTime h:MM TT 5:46 PM 
mediumTime h:MM:ss TT 5:46:21 PM 
longTime h:MM:ss TT Z 5:46:21 PM EST 
isoDate yyyy-mm-dd 2007-06-09 
isoTime HH:MM:ss 17:46:21 
isoDateTime yyyy-mm-dd'T'HH:MM:ss 2007-06-09T17:46:21 
isoUtcDateTime UTC:yyyy-mm-dd'T'HH:MM:ss'Z' 2007-06-09T22:46:21Z 

***********E.g.******************************
var now = new Date();
now.format("m/dd/yy");
*********************************************
*/

var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function(val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function(date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};

// end dateformat

//caret textarea

Selection = function(input) {
    this.isTA = (this.input = input).nodeName.toLowerCase() == "textarea";
};
with ({ o: Selection.prototype }) {
    o.setCaret = function(start, end) {
        var o = this.input;
        if (Selection.isStandard)
            o.setSelectionRange(start, end);
        else if (Selection.isSupported) {
            var t = this.input.createTextRange();
            end -= start + o.value.slice(start + 1, end).split("\n").length - 1;
            start -= o.value.slice(0, start).split("\n").length - 1;
            t.move("character", start), t.moveEnd("character", end), t.select();
        }
    };
    o.getCaret = function() {
        var o = this.input, d = document;
        if (Selection.isStandard)
            return { start: o.selectionStart, end: o.selectionEnd };
        else if (Selection.isSupported) {
            var s = (this.input.focus(), d.selection.createRange()), r, start, end, value;
            if (s.parentElement() != o)
                return { start: 0, end: 0 };
            if (this.isTA ? (r = s.duplicate()).moveToElementText(o) : r = o.createTextRange(), !this.isTA)
                return r.setEndPoint("EndToStart", s), { start: r.text.length, end: r.text.length + s.text.length };
            for (var $ = "[###]"; (value = o.value).indexOf($) + 1; $ += $);
            r.setEndPoint("StartToEnd", s), r.text = $ + r.text, end = o.value.indexOf($);
            s.text = $, start = o.value.indexOf($);
            if (d.execCommand && d.queryCommandSupported("Undo"))
                for (r = 3; --r; d.execCommand("Undo"));
            return o.value = value, this.setCaret(start, end), { start: start, end: end };
        }
        return { start: 0, end: 0 };
    };
    o.getText = function() {
        var o = this.getCaret();
        return this.input.value.slice(o.start, o.end);
    };
    o.setText = function(text) {
        var o = this.getCaret(), i = this.input, s = i.value;
        i.value = s.slice(0, o.start) + text + s.slice(o.end);
        this.setCaret(o.start += text.length, o.start);
    };
    new function() {
        var d = document, o = d.createElement("input"), s = Selection;
        s.isStandard = "selectionStart" in o;
        s.isSupported = s.isStandard || (o = d.selection) && !!o.createRange;
    };
}