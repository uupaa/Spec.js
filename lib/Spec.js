// http://git.io/Spec

(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
var _isNodeOrNodeWebKit = !!global.global;
var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;


// easy to use.
//
//  var spec = new Spec();
//  console.log(spec.BROWSER_NAME); // "Safari"
//
// or
//
//  var spec = new Spec();
//  spec.ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36";
//  console.log(spec.BROWSER_NAME); // "Chrome"

// --- class / interfaces ----------------------------------
function Spec() { // @desc http://git.io/Spec
    // --- DEVICE/SOC/CPU/GPU/APP ---
    this._DEVICE_ID         = "";       // Device ID picked up from the UserAgent string. eg: "iPhone 5"
    this._RAM               = 0;        // RAM(MB).
    this._DEVICE_FEATURE    = 0x0;      // Device Feature. A bit pattern that indicates the features and functionality of the device.
    this._DEVICE_LIMIT      = 0x0;      // Device Limit. A bit pattern that indicates the limits of the device.
    this._APP               = 0;        // Preinstalled app in device.
    this._SOC_ID            = "";       // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    this._CPU_CLOCK         = 0.0;      // CPU clock, GHz.
    this._CPU_CORES         = 0;        // CPU cores. 1(single core), 2(dual core), 4(quad core)
    this._SOC_FEATURE       = 0x0;      // SoC Feature.
    this._SOC_LIMIT         = 0x0;      // SoC Limit.
    this._GPU_ID            = "";       // GPU ID. eg: "ADRENO 330"
    this._GPU_GFLOPS        = 0.0;      // GPU GFLOPS. 0.0 - 999.9
    this._GPU_FEATURE       = 0x0;      // GPU Feature
    this._GPU_LIMIT         = 0x0;      // GPU Limit
    this._DEVICE_DETECTED   = false;    // Device is described in the device catalog.
    this._DEVICE_CANDIDATE  = [];       // Candidate the device ID lists.
                                        // If cannot be device id determined. ["iPhone 5", "iPhone 5c", "iPhone 5s"]
    // --- OS ---
    this._OS_NAME           = "";       // OS name. eg: "Android", "iOS", "WPhone", "Windows", "Mac", "Firefox", "Fire", "Console"
    this._OS_VERSION        = "";       // Detected OS version from UserAgent string. semver format "{{Major}},{{Minor}},{{Patch}}"
                                        // Convert to a floating point number are `parseFloat(spec.OS_VERSION)`
    this._OS_FIRST_VERSION  = "0.0.0";  // OS first(release) version. semver
    this._OS_FINAL_VERSION  = "0.0.0";  // OS final(end of life) version. semver
    // --- BROWSER ---
    this._WEB_VIEW          = false;
    this._USER_AGENT        = "";
    this._BROWSER_NAME      = "";       // Browser name. "Chrome", "Firefox", "AOSP", "IE", "Safari", "WebKit"
                                        // Android Browser -> "AOSP"
                                        // Android WebView -> "AOSP"
                                        // Chrome WebView  -> "Chrome"
                                        // S Browser       -> "Chrome"
                                        // Fire Phone      -> "AOSP"
                                        // Kindle          -> "AOSP"
    this._BROWSER_ENGINE    = "";       // Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
    this._BROWSER_VERSION   = "";       // Browser version from UserAgent String. semver
    this._ENABLE_FULLSCREEN = false;
    this._LANGUAGE          = "en";     // Content language
    // --- DISPLAY ---
    this._DISPLAY_DPR       = global["devicePixelRatio"] || 1.0;
    this._DISPLAY_INCH      = 0;
    this._DISPLAY_LONG      = Math.max(screen["width"], screen["height"]);
    this._DISPLAY_SHORT     = Math.min(screen["width"], screen["height"]);
    this._MAX_TOUCH_POINTS  = 0;
    this._MAX_CONNECTIONS   = 0;

    if (global["navigator"]) {
        Spec_setUserAgent.call(this, global["navigator"]["userAgent"]);
    }
}

//{@dev
Spec["repository"] = "https://github.com/uupaa/Spec.js";
//}@dev

Spec["prototype"] = Object.create(Spec, {
    "constructor":          { "value": Spec        }, // new Spec():Spec
    // --- method ---
    "has":                  { "value": Spec_has     }, // Spec#has(id:IDString, type:String = "DEVICE"):Boolean
    "app":                  { "value": Spec_app     }, // Spec#app(name:String):Boolean
    "limit":                { "value": Spec_limit   }, // Spec#limit(name:String, type:String = "DEVICE"):Boolean
    "feature":              { "value": Spec_feature }, // Spec#feature(name:String, type:String = "DEVICE"):Boolean
    "isMobile":             { "value": function()  { return this.has(this._DEVICE_ID) &&
                                                           !this["feature"]("IS_CONSOLE"); } },
    "isGoodByeAOSPBrowser": { "value": Spec_isGoodByeAOSPBrowser }, // Spec#isGoodByeAOSPBrowser():Boolean
    // --- property accessor ---
    "DEVICE_ID":            { "get":   function()  { return this._DEVICE_ID;        } },
    "RAM":                  { "get":   function()  { return this._RAM;              } },
    "DEVICE_FEATURE":       { "get":   function()  { return this._DEVICE_FEATURE;   } },
    "DEVICE_LIMIT":         { "get":   function()  { return this._DEVICE_LIMIT;     } },
    "APP":                  { "get":   function()  { return this._APP;              } },
    "SOC_ID":               { "get":   function()  { return this._SOC_ID;           } },
    "CPU_CLOCK":            { "get":   function()  { return this._CPU_CLOCK;        } },
    "CPU_CORES":            { "get":   function()  { return this._CPU_CORES;        } },
    "SOC_FEATURE":          { "get":   function()  { return this._SOC_FEATURE;      } },
    "SOC_LIMIT":            { "get":   function()  { return this._SOC_LIMIT;        } },
    "GPU_ID":               { "get":   function()  { return this._GPU_ID;           } },
    "GPU_GFLOPS":           { "get":   function()  { return this._GPU_GFLOPS;       } },
    "GPU_FEATURE":          { "get":   function()  { return this._GPU_FEATURE;      } },
    "GPU_LIMIT":            { "get":   function()  { return this._GPU_LIMIT;        } },
    "DEVICE_DETECTED":      { "get":   function()  { return this._DEVICE_DETECTED;  } },
    "DEVICE_CANDIDATE":     { "get":   function()  { return this._DEVICE_CANDIDATE; } },
    "OS_NAME":              { "get":   function()  { return this._OS_NAME;          } },
    "OS_VERSION":           { "get":   function()  { return this._OS_VERSION;       } },
    "OS_FIRST_VERSION":     { "get":   function()  { return this._OS_FIRST_VERSION; } },
    "OS_FINAL_VERSION":     { "get":   function()  { return this._OS_FINAL_VERSION; } },
    "WEB_VIEW":             { "get":   function()  { return this._WEB_VIEW;         } },
    "USER_AGENT":           { "get":   function()  { return this._USER_AGENT;       },
                              "set":   Spec_setUserAgent },
    "BROWSER_NAME":         { "get":   function()  { return this._BROWSER_NAME;     } },
    "BROWSER_ENGINE":       { "get":   function()  { return this._BROWSER_ENGINE;   } },
    "BROWSER_VERSION":      { "get":   function()  { return this._BROWSER_VERSION;  } },
    "ENABLE_FULLSCREEN":    { "get":   function()  { return this._ENABLE_FULLSCREEN;} },
    "LANGUAGE":             { "get":   function()  { return this._LANGUAGE;         } },
    "DISPLAY_DPR":          { "get":   function()  { return this._DISPLAY_DPR;      } },
    "DISPLAY_INCH":         { "get":   function()  { return this._DISPLAY_INCH;     } },
    "DISPLAY_LONG":         { "get":   function()  { return this._DISPLAY_LONG;     } },
    "DISPLAY_SHORT":        { "get":   function()  { return this._DISPLAY_SHORT;    } },
    "MAX_TOUCH_POINTS":     { "get":   function()  { return this._MAX_TOUCH_POINTS; } },
    "MAX_CONNECTIONS":      { "get":   function()  { return this._MAX_CONNECTIONS;  } },
    "CONNECTIONS_PER_HOST": { "get":   function()  { return this._CONNECTIONS_PER_HOST; } },
});
Spec["DEVICE"] = { "FEATURE": {}, "LIMIT": {}, "APP": {}, "CATALOG": {} };
Spec["SOC"]    = { "FEATURE": {}, "LIMIT": {},            "CATALOG": {} };
Spec["GPU"]    = { "FEATURE": {}, "LIMIT": {},            "CATALOG": {} };

// --- implements ------------------------------------------
function Spec_has(id, type) {
    return id && (id in Spec[type || "DEVICE"]["CATALOG"]);
}
function Spec_app(name) {
    var feat = Spec["DEVICE"]["CATALOG"]["APP"][name] || 0;
    return feat ? !!(this._APP & feat) : false;
}
function Spec_limit(name, type) {
    var feat = Spec[type || "DEVICE"]["CATALOG"]["LIMIT"][name] || 0;
    if (feat) {
        switch (type || "DEVICE") {
        case "DEVICE": return !!(this._DEVICE_LIMIT & feat);
        case "SOC":    return !!(this._SOC_LIMIT & feat);
        case "GPU":    return !!(this._GPU_LIMIT & feat);
        }
    }
    return false;
}
function Spec_feature(name, type) {
    var feat = Spec[type || "DEVICE"]["CATALOG"]["FEATURE"][name] || 0;
    if (feat) {
        switch (type || "DEVICE") {
        case "DEVICE": return !!(this._DEVICE_FEATURE & feat);
        case "SOC":    return !!(this._SOC_FEATURE & feat);
        case "GPU":    return !!(this._GPU_FEATURE & feat);
        }
    }
    return false;
}

function Spec_setUserAgent(ua) { // @arg UserAgentString
    if (ua && this._USER_AGENT !== ua) {
        var nav            = global["navigator"] || {};
        var osName         = _detectOSName(ua);                      // (Console|Fire|Android|iOS|Windows|Mac|Firefox)
        var osVer          = _detectOSVersion(osName, ua);           // SemverString("major.minor.patch")
        var browserName    = _detectBrowserName(ua);                 // (Chrome|Firefox|AOSP|IE|Safari|WebKit)
        var browserEngine  = _detectBrowserEngine(browserName);      // (Blink|Gecko|Trident|WebKit)
        var browserVersion = _detectBrowserVersion(browserName, ua); // SemverString("major.minor.patch")
        var deviceID       = _detectDeviceID(ua, osName);
        var ver            = parseFloat(osVer);

        this._USER_AGENT      = ua;
        this._OS_NAME         = osName;
        this._OS_VERSION      = osVer;
        this._BROWSER_NAME    = browserName;
        this._BROWSER_ENGINE  = browserEngine;
        this._BROWSER_VERSION = browserVersion;
        if (_runOnNodeWebKit || _runOnBrowser) {
            this._ENABLE_FULLSCREEN = document["fullscreenEnabled"] ||
                                      document["webkitFullscreenEnabled"] || false;
        }
        this._LANGUAGE        = (nav["language"] || "en").split("-", 1)[0]; // "en-us" -> "en"
        this._WEB_VIEW        = !!(browserName === "Chrome" && this._ENABLE_FULLSCREEN);
        this._DEVICE_ID       = _detectVagueDeviceID.call(this, deviceID);
        this._MAX_CONNECTIONS = (browserName === "AOSP" && ver < 4) ? 10 : 16;
        this._CONNECTIONS_PER_HOST = browserName === "AOSP" ? (ver < 4 ? 8 : 6)
                                   : browserName === "IE"   ? (ver < 10 ? 6 : ver < 11 ? 8 : 13) : 6;

        _collectDeviceInfo.call(this, this._DEVICE_ID);

        var LIMIT = Spec["DEVICE"]["CATALOG"]["LIMIT"];
        var limit = this._DEVICE_LIMIT;

        this._MAX_TOUCH_POINTS = nav["maxTouchPoints"] ? nav["maxTouchPoints"]
                               : limit & LIMIT["IS_TOUCH_0"] ? 0
                               : limit & LIMIT["IS_TOUCH_1"] ? 1
                               : limit & LIMIT["IS_TOUCH_2"] ? 2
                               : limit & LIMIT["IS_TOUCH_3"] ? 3 : 5;
    }
}
function _detectVagueDeviceID(deviceID) {
    var osVer    = parseFloat(this._OS_VERSION);
    var retina   = this._DISPLAY_DPR >= 2;
    var longEdge = this._DISPLAY_LONG; // iPhone 4S: 480, iPhone 5: 568

    switch (deviceID) {
    case "Nexus 7":
        return !retina ? "Nexus 7"      // Nexus 7 (2012)
                       : "Nexus 7 2nd"; // Nexus 7 (2013)
    case "iPhone":
        return !retina ? "iPhone 3GS"
             : longEdge <= 480 ? (osVer < 8 ? "iPhone 4" : "iPhone 4S") // iPhone 4 stopped in iOS 7.
             : longEdge <= 568 ? "iPhone 5" // DEVICE_CANDIDATE = ["iPhone 5", "iPhone 5c", "iPhone 5s"]
             : longEdge <= 667 ? "iPhone 6"
             : longEdge <= 736 ? "iPhone 6 Plus" : "";
    case "iPad":
        return !retina ? "iPad 2"  // DEVICE_CANDIDATE = ["iPad 2", "iPad mini"]
                       : "iPad 3"; // DEVICE_CANDIDATE = ["iPad 3", "iPad 4", "iPad Air", "iPad Air 2", "iPad mini 2", "iPad mini 3"]
    case "iPod":
        return longEdge <= 480 ? (!retina ? "iPod touch 3" : "iPod touch 4")
                               : "iPod touch 5";
    case "WindowsPhone":
        return osVer <= 7.5 ? "Lumia 510" // Windows Phone 7.0, 7.5, 7.8
             : osVer <= 8.0 ? "Lumia 520" // Windows Phone 8.0
                            : "Lumia 630";
    }
    return deviceID;
}

function _collectDeviceInfo(deviceID) {
    var devInfo = Spec["DEVICE"]["CATALOG"][deviceID]; // [ SOC_ID, OS_VERS, DISP1, DISP2, INCH, RAM, FEATURE, LIMIT, APP ]

    if (devInfo) { // wellknown device
        var nav     = global["navigator"] || {};
        var socID   = devInfo[0];
        var osVers  = devInfo[1].split("-"); // ["234", "404"]
        var socInfo = Spec["SOC"]["CATALOG"][socID]; // [ CLOCK, CORES, GPU_ID, FEATURE, LIMIT ]
        var gpuID   = socInfo[2];
        var gpuInfo = Spec["GPU"]["CATALOG"][gpuID]; // [ GFLOPS, FEATURE, LIMIT ]

        this._DISPLAY_SHORT     = devInfo[2];
        this._DISPLAY_LONG      = devInfo[3];
        this._DISPLAY_INCH      = devInfo[4];
        this._RAM               = devInfo[5] * 128;
        this._DEVICE_FEATURE    = devInfo[6];
        this._DEVICE_LIMIT      = devInfo[7];
        this._APP               = devInfo[8];
        this._SOC_ID            = socID;
        this._CPU_CLOCK         = socInfo[0];
        this._CPU_CORES         = nav["hardwareConcurrency"] || socInfo[1];
        this._SOC_FEATURE       = socInfo[3];
        this._SOC_LIMIT         = socInfo[4];
        this._GPU_ID            = gpuID;
        this._GPU_GFLOPS        = gpuInfo[0];
        this._GPU_FEATURE       = gpuInfo[1];
        this._GPU_LIMIT         = gpuInfo[2];
        this._OS_FIRST_VERSION  = _toSemver(osVers[0]);
        this._OS_FINAL_VERSION  = _toSemver(osVers[1] || "99.9.9");
        this._DEVICE_DETECTED   = true;
        this._DEVICE_CANDIDATE  = _getDeviceCandidateID(deviceID);
    }

    function _toSemver(number) {
        var s = (10000 + number).toString();
        return parseInt(s[1] + s[2], 10) + "." + s[3] + "." + s[4];
    }
    function _getDeviceCandidateID(deviceID) {
        switch (deviceID) {
        case "iPhone 5": return ["iPhone 5", "iPhone 5c", "iPhone 5s"];
        case "iPad 2":   return ["iPad 2", "iPad mini"];
        case "iPad 3":   return ["iPad 3", "iPad 4", "iPad Air", "iPad Air 2", "iPad mini 2", "iPad mini 3"];
        }
        return [];
    }
}

function _detectOSName(ua) {
    switch (true) {
    case /PlayStation|Xbox|Nintendo/i.test(ua): return "Console";
//  case /FireOS/.test(ua):                     return "Fire";
    case /Android/.test(ua):                    return "Android";
    case /iPhone|iPad|iPod/.test(ua):           return "iOS";
    case /Windows Phone|Windows NT/.test(ua):   return "Windows";
    case /Mac OS X/.test(ua):                   return "Mac";
    case /Firefox/.test(ua):                    return "Firefox";
    }
    return "";
}
function _detectOSVersion(osName, ua) {
    switch (osName) {
    case "Android": return _getVersion("Android", ua);
    case "iOS":     return _getVersion(/OS /, ua);
    case "Windows": return  /Windows NT/.test(ua) ? _getVersion(/Windows NT/, ua)
                                                  : _getVersion(/Windows Phone (?:OS )?/, ua);
    case "Mac":     return _getVersion(/Mac OS X /, ua);
    case "Firefox":
        // https://developer.mozilla.org/ja/docs/Gecko_user_agent_string_reference
        var ver = parseFloat(_getVersion("Gecko/", ua)); // 0.0
        if (ver === 32.0) {
            return "2.0.0";
        }
    }
    return "0.0.0";
}
function _detectBrowserName(ua) {
    switch (true) {
    case /Chrome/.test(ua):       return "Chrome";
    case /Firefox/.test(ua):      return "Firefox";
    case /Android/.test(ua):      return "AOSP"; // AOSP stock browser. aka: Android default browser
    case /MSIE|Trident/.test(ua): return "IE";
    case /Safari/.test(ua):       return "Safari";
    case /AppleWebKit/.test(ua):  return "WebKit";
    }
    return "";
}
function _detectBrowserEngine(browserName) {
    switch (browserName) {
    case "Chrome":  return "Blink";
    case "Firefox": return "Gecko";
    case "IE":      return "Trident";
    case "AOSP":
    case "Safari":
    case "WebKit":  return "WebKit";
    }
    return "";
}
function _detectBrowserVersion(browserName, ua) {
    switch (browserName) {
    case "Chrome":  return _getVersion("Chrome/", ua);
    case "Firefox": return _getVersion("Firefox/", ua);
    case "Browser": return _getVersion(/Silk/.test(ua) ? "Silk/" : "Version/", ua);
    case "IE":      return /IEMobile/.test(ua) ? _getVersion("IEMobile/", ua)
                         : /MSIE/.test(ua)     ? _getVersion("MSIE ", ua) // IE 10.
                                               : _getVersion("rv:", ua);  // IE 11+
    case "Safari":  return _getVersion("Version/", ua);
//  case "WebKit":
    }
    return "0.0.0";
}
function _getVersion(token, ua) { // @ret SemverString - "0.0.0"
    try {
        return _normalizeSemverString( ua.split(token)[1].trim().split(/[^\w\.]/)[0] );
    } catch ( o_O ) {}
    return "0.0.0";
}
function _normalizeSemverString(version) { // @arg String - "Major.Minor.Patch"
                                           // @ret SemverString - "Major.Minor.Patch"
    var ary = version.split(/[\._]/); // "1_2_3" -> ["1", "2", "3"]
                                      // "1.2.3" -> ["1", "2", "3"]
    return ( parseInt(ary[0], 10) || 0 ) + "." +
           ( parseInt(ary[1], 10) || 0 ) + "." +
           ( parseInt(ary[2], 10) || 0 );
}
function _detectDeviceID(ua, osName) {
    switch (osName) {
    case "Android": return _getAndroidDeviceID(ua);
    case "iOS":     return /iPhone/.test(ua) ? "iPhone"
                         : /iPad/.test(ua)   ? "iPad" : "iPod";
    case "WPhone":  return _getWindowsPhoneDeviceID(ua);
    case "Console": return _getConsoleDeviceID(ua);
//  case "Fire":    return _getFireOSDeviceID(that, ua);
    case "Firefox": return _getFirefoxOSDeviceID(ua);
    }
    return "";
}
function _getAndroidDeviceID(ua) {
    if (/Firefox/.test(ua)) { return ""; }
    try {
        return ua.split("Build/")[0].split(";").slice(-1).join().trim().
               replace(/^SonyEricsson/, "").replace(/ 4G$/, "");
    } catch ( o_O ) {}
    return "";
}
function _getWindowsPhoneDeviceID(ua) {
    // Dispatches to Nokia device, if not Nokia device.
    // Because of them.
    //  - http://thenextweb.com/microsoft/2013/11/27/nokia-now-controls-90-windows-phone-8-market-low-end-lumia-520-accounting-35-share/
    //  - http://www.techradar.com/news/phone-and-communications/mobile-phones/nokia-ends-2013-with-92-of-windows-phone-market-1211347
    try {
        return /Lumia/.test(ua) ? "Lumia " + ua.split("Lumia ")[1].split(/[^\w\.]/)[0]
                                : "WindowsPhone";
    } catch ( o_O ) {}
    return "";
}
function _getConsoleDeviceID(ua) {
    switch (true) {
    case /PlayStation 4/i.test(ua): return "PS 4";
    case /Vita/i.test(ua):          return "PS Vita";
    case /Xbox One/i.test(ua):      return "Xbox One";
    case /WiiU/i.test(ua):          return "Wii U";
    }
    return "";
}
function _getFirefoxOSDeviceID(ua) {
    try {
        if (/Mobile;/.test(ua) && !/Mobile; rv:/.test(ua)) {
            return ua.split("; rv:")[0].split(";").slice(-1).join().trim();
        }
    } catch ( o_O ) {}
    return "";
}

function Spec_isGoodByeAOSPBrowser() { // @ret Boolean
                                       // @desc is AOSP stock browser (version 4.0.0 - 4.3.x)

    if (!this._WEB_VIEW && this._BROWSER_NAME === "AOSP") {
        var ver = parseFloat(this._OS_VERSION);

        return ver >= 4.0 && ver < 4.4;
    }
    return false;
}

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = Spec;
}
global["Spec" in global ? "Spec_" : "Spec"] = Spec; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

