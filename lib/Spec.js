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

var ALT_DEVICE_ID   = { "Android": "Nexus 5", "iOS": "iPhone 5" };
var BROWSER_ENGINES = { "Chrome": "Blink", "Firefox": "Gecko", "IE": "Trident",
                        "AOSP": "WebKit", "Safari": "WebKit", "WebKit": "WebKit" };

// --- class / interfaces ----------------------------------
function Spec() { // @desc http://git.io/Spec
    this._FEATURES = { "DEVICE": 0x0, "SOC": 0x0, "GPU": 0x0 }; // A bit pattern that indicates the features.
    this._LIMITS   = { "DEVICE": 0x0, "SOC": 0x0, "GPU": 0x0 }; // A bit pattern that indicates the limits.
    this._LOW_END  = { "DEVICE": false, "GPU": false, "MEMORY": false };
    // --- DEVICE/SOC/CPU/GPU/APP ---
    this._DEVICE_ID         = "";       // Device ID picked up from the UserAgent string. eg: "iPhone 5"
    this._BLE               = false;    // Bluetooth LE
    this._RAM               = 0;        // RAM (MB)
    this._SOC_ID            = "";       // System On Chip ID (UPPER_CASE STRING). eg: "MSM8974", "A5X"
    this._CPU_CLOCK         = 0.0;      // CPU clock, GHz.
    this._CPU_CORES         = 0;        // CPU cores. 1(single core), 2(dual core), 4(quad core)
    this._GPU_ID            = "";       // GPU ID. eg: "ADRENO 330"
    this._GPU_GFLOPS        = 0.0;      // GPU GFLOPS. 0.0 - 999.9
    this._GLES_VERSION      = 3.0;      // Open GL ES Version. 1.1, 2.0, 3.0, 3.1, 3.2
    this._WEBGL_VERSION     = 0.0;      // WebGL Version. 0.0, 1.0, 2.0
    this._MAX_TEXTURE_SIZE  = 4096;     // GL_MAX_TEXTURE_SIZE (1024 - 16384)
    this._APP               = 0;        // Preinstalled app in device.
    // --- OS ---
    this._OS_NAME           = "";       // OS name. eg: "Android", "iOS", "Windows", "Mac", "Firefox", "Console"
    this._OS_VERSION        = "";       // Detected OS version from UserAgent string. semver format "{{Major}},{{Minor}},{{Patch}}"
    this._OS_FIRST_VERSION  = "0.0.0";  // OS first(release) version. semver
    this._OS_FINAL_VERSION  = "0.0.0";  // OS final(end of life) version. semver
    // --- BROWSER ---
    this._USER_AGENT        = "";
    this._BROWSER_NAME      = "";       // Browser name. "Chrome", "Firefox", "AOSP", "IE", "Safari", "WebKit"
                                        // Android Browser, WebView, Kindle -> AOSP
                                        // Chromium WebView, SBrowser -> Chrome
    this._BROWSER_ENGINE    = "";       // Browser render engine. "Blink", "Trident", "Gecko", "WebKit"
    this._BROWSER_VERSION   = "0.0.0";  // Browser version from UserAgent String. semver
    this._LANGUAGE          = "en";     // Content language.
    this._WEB_VIEW          = false;    // WebView
    this._CHROME_TRIGGER    = false;    // Enable Chrome Trigger.
    // --- DISPLAY ---
    this._DISPLAY_DPR       = global["devicePixelRatio"] || 1.0;
    this._DISPLAY_INCH      = 0;
    this._DISPLAY_LONG      = 0;
    this._DISPLAY_SHORT     = 0;
    this._MAX_TOUCH_POINTS  = 0;

    if (global["navigator"]) {
        Spec_setUserAgent.call(this, global["navigator"]["userAgent"]);
    }
}

//{@dev
Spec["repository"] = "https://github.com/uupaa/Spec.js";
//}@dev

Spec["prototype"] = Object.create(Spec, {
    "constructor":          { "value": Spec             }, // new Spec():Spec
    // --- method ---
    "has":                  { "value": Spec_has         }, // Spec#has(id:IDString, type:String = "DEVICE"):Boolean
    "hasApp":               { "value": Spec_hasApp      }, // Spec#hasApp(name:String):Boolean
    "hasLimit":             { "value": Spec_hasLimit    }, // Spec#hasLimit(name:String, type:String = "DEVICE"):Boolean
    "hasFeature":           { "value": Spec_hasFeature  }, // Spec#hasFeature(name:String, type:String = "DEVICE"):Boolean
    // --- property accessor ---
    // --- DEVICE/SOC/CPU/GPU/APP ---
    "DEVICE_ID":            { "get":   function()  { return this._DEVICE_ID;        } },
    "LOW_END":              { "get":   function()  { return this._LOW_END;          } },
    "BLE":                  { "get":   function()  { return this._BLE;              } },
    "RAM":                  { "get":   function()  { return this._RAM;              } },
    "SOC_ID":               { "get":   function()  { return this._SOC_ID;           } },
    "CPU_CLOCK":            { "get":   function()  { return this._CPU_CLOCK;        } },
    "CPU_CORES":            { "get":   function()  { return this._CPU_CORES;        } },
    "GPU_ID":               { "get":   function()  { return this._GPU_ID;           } },
    "GPU_GFLOPS":           { "get":   function()  { return this._GPU_GFLOPS;       } },
    "GLES_VERSION":         { "get":   function()  { return this._GLES_VERSION;     } },
    "WEBGL_VERSION":        { "get":   function()  { return this._WEBGL_VERSION;    } },
    "MAX_TEXTURE_SIZE":     { "get":   function()  { return this._MAX_TEXTURE_SIZE; } },
    "APP":                  { "get":   function()  { return this._APP;              } },
    // --- OS ---
    "OS_NAME":              { "get":   function()  { return this._OS_NAME;          } },
    "OS_VERSION":           { "get":   function()  { return this._OS_VERSION;       } },
    "OS_FIRST_VERSION":     { "get":   function()  { return this._OS_FIRST_VERSION; } },
    "OS_FINAL_VERSION":     { "get":   function()  { return this._OS_FINAL_VERSION; } },
    // --- BROWSER ---
    "USER_AGENT":           { "get":   function()  { return this._USER_AGENT;       },
                              "set":   Spec_setUserAgent },
    "BROWSER_NAME":         { "get":   function()  { return this._BROWSER_NAME;     } },
    "BROWSER_ENGINE":       { "get":   function()  { return this._BROWSER_ENGINE;   } },
    "BROWSER_VERSION":      { "get":   function()  { return this._BROWSER_VERSION;  } },
    "LANGUAGE":             { "get":   function()  { return this._LANGUAGE;         } },
    "WEB_VIEW":             { "get":   function()  { return this._WEB_VIEW;         } },
    "CHROME_TRIGGER":       { "get":   function()  { return this._CHROME_TRIGGER;   } },
    // --- DISPLAY ---
    "DISPLAY_DPR":          { "get":   function()  { return this._DISPLAY_DPR;      } },
    "DISPLAY_INCH":         { "get":   function()  { return this._DISPLAY_INCH;     } },
    "DISPLAY_LONG":         { "get":   function()  { return this._DISPLAY_LONG;     } },
    "DISPLAY_SHORT":        { "get":   function()  { return this._DISPLAY_SHORT;    } },
    "MAX_TOUCH_POINTS":     { "get":   function()  { return this._MAX_TOUCH_POINTS; } },
});
Spec["DEVICE"] = { "FEATURE": {}, "LIMIT": {}, "APP": {}, "CATALOG": {} };
Spec["SOC"]    = { "FEATURE": {}, "LIMIT": {},            "CATALOG": {} };
Spec["GPU"]    = { "FEATURE": {}, "LIMIT": {},            "CATALOG": {} };

// --- implements ------------------------------------------
function Spec_has(id, type) {
    return id && (id in Spec[type || "DEVICE"]["CATALOG"]);
}
function Spec_hasApp(name) {
    return !!(this._APP & Spec["DEVICE"]["CATALOG"]["APP"][name] || 0);
}
function Spec_hasLimit(name, type) {
    type = type || "DEVICE";
    return !!(this._LIMIT[type] & Spec[type]["CATALOG"]["LIMIT"][name] || 0);
}
function Spec_hasFeature(name, type) {
    type = type || "DEVICE";
    return !!(this._FEATURE[type] & Spec[type]["CATALOG"]["FEATURE"][name] || 0);
}

function Spec_setUserAgent(ua) { // @arg UserAgentString
    if (ua && this._USER_AGENT !== ua) {
        var osName      = _detectOSName(ua);            // (Console|Android|iOS|Windows|Mac|Firefox)
        var osVer       = _detectOSVersion(osName, ua); // SemverString("major.minor.patch")
        var browserName = _detectBrowserName(ua);       // (Chrome|Firefox|AOSP|IE|Safari|WebKit)
        var deviceID    = _detectDeviceID(ua, osName, parseFloat(osVer));

        this._DEVICE_ID       = deviceID;
        this._OS_NAME         = osName;
        this._OS_VERSION      = osVer;
        this._USER_AGENT      = ua;
        this._BROWSER_NAME    = browserName;
        this._BROWSER_ENGINE  = BROWSER_ENGINES[browserName] || "";     // (Blink|Gecko|Trident|WebKit)
        this._BROWSER_VERSION = _detectBrowserVersion(browserName, ua); // SemverString("major.minor.patch")

        _collectDeviceInfo.call(this, deviceID, osName, Spec["DEVICE"]["CATALOG"][deviceID]);

        if (_runOnNodeWebKit || _runOnBrowser) {
            var nav = global["navigator"] || {};
            var ver = parseFloat(osVer);
            var fullScreen = document["fullscreenEnabled"] || document["webkitFullscreenEnabled"] || false;

            this._LANGUAGE = (nav["language"] || "en").split("-", 1)[0]; // "en-us" -> "en"
            this._WEB_VIEW = !!(browserName === "Chrome" && fullScreen);
            this._CHROME_TRIGGER = (!this._WEB_VIEW && browserName === "AOSP" && ver >= 4 && ver < 4.4);
        }
    }
}
function _collectDeviceInfo(deviceID,  // "Nexus 5"
                            osName,    // "Android"
                            devInfo) { // [ SOC_ID, OS_VERS, DISP1, DISP2, INCH, RAM, FEATURE, LIMIT, APP ]
    if (!devInfo) { // unknown device -> alternative device id
        deviceID = ALT_DEVICE_ID[osName] || deviceID;
        devInfo = Spec["DEVICE"]["CATALOG"][deviceID];
    }
    if (devInfo) {
        var nav     = global["navigator"] || {};
        var socID   = devInfo[0];
        var osVers  = devInfo[1].split("-"); // ["234", "404"]
        var socInfo = Spec["SOC"]["CATALOG"][socID]; // [ CLOCK, CORES, GPU_ID, FEATURE, LIMIT ]
        var gpuID   = socInfo[2];
        var gpuInfo = Spec["GPU"]["CATALOG"][gpuID]; // [ GFLOPS, FEATURE, LIMIT ]

        this._FEATURE = {
            "DEVICE":   devInfo[6],
            "SOC":      socInfo[3],
            "GPU":      gpuInfo[1]
        };
        this._LIMIT = {
            "DEVICE":   devInfo[7],
            "SOC":      socInfo[4],
            "GPU":      gpuInfo[2]
        };
        this._LOW_END = {
            "DEVICE":   Spec_hasLimit.call(this, "LOW_END"),
            "GPU":      Spec_hasLimit.call(this, "LOW_END", "GPU"),
            "MEMORY":   osName === "iOS"     ? this._RAM <= 512  :
                        osName === "Android" ? this._RAM <= 1024 : false
        };
        this._DISPLAY_SHORT     = devInfo[2];
        this._DISPLAY_LONG      = devInfo[3];
        this._DISPLAY_INCH      = devInfo[4];
        this._BLE               = _getBLE.call(this);
        this._RAM               = devInfo[5] * 128;
        this._APP               = devInfo[8];
        this._SOC_ID            = socID;
        this._CPU_CLOCK         = socInfo[0];
        this._CPU_CORES         = nav["hardwareConcurrency"] || socInfo[1];
        this._GPU_ID            = gpuID;
        this._GPU_GFLOPS        = gpuInfo[0];
        this._OS_FIRST_VERSION  = _toSemver(osVers[0]);
        this._OS_FINAL_VERSION  = _toSemver(osVers[1] || "99.9.9");
        this._GLES_VERSION      = _getGLESVersion.call(this);
        this._WEBGL_VERSION     = global["document"] ? _getWebGLVersion() : 0.0;
        this._MAX_TEXTURE_SIZE  = _getMaxTextureSize.call(this);
        this._MAX_TOUCH_POINTS  = nav["maxTouchPoints"] || _getMaxTouchPoints.call(this);
    }

    function _getBLE() {
        if ( Spec_hasFeature.call(this, "BLE") ) { return true; }
        if (!Spec_hasLimit.call(this, "NO_BLE", "SOC") ) { return true; }
        return false;
    }
    function _getWebGLVersion() {
        var node = document.createElement("canvas");
        if (node.getContext("webgl2"))              { return 2.0; }
        if (node.getContext("experimental-webgl2")) { return 2.0; }
        if (node.getContext("webgl"))               { return 1.0; }
        if (node.getContext("experimental-webgl"))  { return 1.0; }
        if (parseFloat(this._OS_FINAL_VERSION) < 4) { return 0.0; }
        return 0.0;
    }
    function _getGLESVersion() {
        if ( Spec_hasFeature.call(this, "GLES_33", "GPU") ) { return 3.3; }
        if ( Spec_hasFeature.call(this, "GLES_31", "GPU") ) { return 3.1; }
        if ( Spec_hasFeature.call(this, "GLES_30", "GPU") ) { return 3.0; }
        if ( Spec_hasFeature.call(this, "GLES_20", "GPU") ) { return 2.0; }
        if ( Spec_hasFeature.call(this, "GLES_11", "GPU") ) { return 1.1; }
        return 3.0;
    }
    function _getMaxTextureSize() {
        if ( Spec_hasFeature.call(this, "TEXTURE_16K", "GPU") ) { return 16 * 1024; }
        if ( Spec_hasFeature.call(this, "TEXTURE_8K",  "GPU") ) { return  8 * 1024; }
        if ( Spec_hasFeature.call(this, "TEXTURE_4K",  "GPU") ) { return  4 * 1024; }
        if ( Spec_hasFeature.call(this, "TEXTURE_2K",  "GPU") ) { return  2 * 1024; }
        if ( Spec_hasFeature.call(this, "TEXTURE_1K",  "GPU") ) { return  1 * 1024; }
        return 4096;
    }
    function _getMaxTouchPoints() {
        if ( Spec_hasLimit.call(this, "TOUCH_0") ) { return 0; }
        if ( Spec_hasLimit.call(this, "TOUCH_1") ) { return 1; }
        if ( Spec_hasLimit.call(this, "TOUCH_2") ) { return 2; }
        if ( Spec_hasLimit.call(this, "TOUCH_3") ) { return 3; }
        return 5;
    }
    function _toSemver(number) {
        var s = (10000 + number).toString();
        return parseInt(s[1] + s[2], 10) + "." + s[3] + "." + s[4];
    }
}

function _detectOSName(ua) {
    switch (true) {
    case /PlayStation|Xbox|Nintendo/i.test(ua): return "Console";
//  case /FireOS/.test(ua):                     return "Fire";
    case /Android/.test(ua):                    return "Android";
    case /iPhone|iPad|iPod/.test(ua):           return "iOS";
    case /Windows/.test(ua):                    return "Windows";
    case /Mac OS X/.test(ua):                   return "Mac";
    case /Firefox/.test(ua):                    return "Firefox";
    }
    return "";
}

function _detectOSVersion(osName, ua) {
    switch (osName) {
    case "Android": return _getVersion("Android", ua);
    case "iOS":     return _getVersion(/OS /, ua);
    case "Windows": return _getVersion(/Phone/.test(ua) ? /Windows Phone (?:OS )?/
                                                        : /Windows NT/, ua);
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

function _detectBrowserVersion(browserName, ua) {
    switch (browserName) {
    case "Chrome":  return _getVersion("Chrome/", ua);
    case "Firefox": return _getVersion("Firefox/", ua);
    case "AOSP":    return _getVersion(/Silk/.test(ua) ? "Silk/" : "Version/", ua);
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

function _detectDeviceID(ua, osName, osVer) {
    switch (osName) {
    case "Android": return _getAndroidDeviceID(ua);
    case "iOS":     return _getiOSDeviceID(ua, osVer);
    case "Windows": return /Windows Phone/.test(ua) ? _getWindowsPhoneDeviceID(ua, osVer)
                                                    : "";
    case "Console": return _getConsoleDeviceID(ua);
//  case "Fire":    return _getFireOSDeviceID(that, ua);
    case "Firefox": return _getFirefoxOSDeviceID(ua);
    }
    return "";
}

function _getAndroidDeviceID(ua) {
    if (/Firefox/.test(ua)) { return ""; }
    try {
        var result = ua.split("Build/")[0].split(";").slice(-1).join().trim().
                     replace(/^SonyEricsson/, "").replace(/ 4G$/, "");

        if (result === "Nexus 7") {
            return global["devicePixelRatio"] < 2 ? "Nexus 7"      // Nexus 7 (2012)
                                                  : "Nexus 7 2nd"; // Nexus 7 (2013)
        }
        return result;
    } catch ( o_O ) {}
    return "";
}

function _getiOSDeviceID(ua, osVer) {
    var screen   = global["screen"] || {};
    var retina   = (global["devicePixelRatio"] || 0) >= 2;
    var longEdge = Math.max(screen["width"] || 0, screen["height"] || 0); // iPhone 4S: 480, iPhone 5: 568

    if (/iPhone/.test(ua)) {
        return !retina ? "iPhone 3GS"
             : longEdge <= 480 ? (osVer < 8 ? "iPhone 4" : "iPhone 4S") // iPhone 4 stopped in iOS 7.
             : longEdge <= 568 ? "iPhone 5" // DEVICE_CANDIDATE = ["iPhone 5", "iPhone 5c", "iPhone 5s"]
             : longEdge <= 667 ? "iPhone 6"
             : longEdge <= 736 ? "iPhone 6 Plus" : "";
    } else if (/iPad/.test(ua)) {
        return !retina ? "iPad 2"  // DEVICE_CANDIDATE = ["iPad 2", "iPad mini"]
                       : "iPad 3"; // DEVICE_CANDIDATE = ["iPad 3", "iPad 4", "iPad Air", "iPad Air 2", "iPad mini 2", "iPad mini 3"]
    }
    return longEdge <= 480 ? (!retina ? "iPod touch 3" : "iPod touch 4")
                           : "iPod touch 5";
}

function _getWindowsPhoneDeviceID(ua, osVer) {
    // Dispatches to Nokia device, if not Nokia device.
    // Because of them.
    //  - http://thenextweb.com/microsoft/2013/11/27/nokia-now-controls-90-windows-phone-8-market-low-end-lumia-520-accounting-35-share/
    //  - http://www.techradar.com/news/phone-and-communications/mobile-phones/nokia-ends-2013-with-92-of-windows-phone-market-1211347
    try {
        return /Lumia/.test(ua) ? ("Lumia " + ua.split("Lumia ")[1].split(/[^\w\.]/)[0])
                                : osVer <= 8.0 ? "Lumia 520" // Windows Phone 8.0
                                : "Lumia 630";
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

